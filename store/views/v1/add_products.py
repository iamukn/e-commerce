from django.shortcuts import redirect, render
from django.views import View
from store.models import Products
from django.db.models import Min
from django.core.cache import cache
from django.db import transaction
from django.contrib import messages
from os import environ
from store.config.boto import uploadToR2, BUCKET
import uuid

class AddProductsView(View):
    def get(self, request):
        if request.user.is_authenticated:
            first_ids = (
                Products.objects
                .values("category")
                .annotate(first_id=Min("id"))
                .values_list("first_id", flat=True)
            )

            collections = Products.objects.filter(id__in=first_ids)
            return render(request, 'store/add_products.html', context={'category': collections})
        return redirect('account')
    
    def post(self, request):
        if request.user.is_authenticated:
            SKU = f"{environ.get('BRAND')[0:2]}-" if environ.get('BRAND') else "EC-"
            sku = SKU
            val = cache.get('last_sku_val')
            try:
                if val:
                    print('From cache')
                    sku = sku + "00" + (str(val + 1))
                else:
                    prod = Products.objects.last()
                    if (prod):
                        val = int(str(prod.sku).split('-')[-1])
                        sku = sku + "00" +str((val + 1))
                cache.set('last_sku_val', val+1)
                files = request.FILES
                
                image1 = files.get('image1')
                image2 = files.get('image2')
                image3 = files.get('image3')

                

                data = request.POST
                name = data.get('name')
                description = data.get('description')
                price = data.get('price')
                qty = data.get('quantity')
                category = data.get('category')
                size=data.get('size')
                slogan=environ.get('BRAND')
                status = data.get('status')
                status = True if status == 'active' else False

                with transaction.atomic():
                    PUBLIC_URL = "https://pub-2b4b5916f62c498bba2ff9c67a926b83.r2.dev/"
                    BRAND=environ.get('BRAND')
                    image1_url = ''
                    image2_url = ""
                    image3_url = ""

                    if image1:
                        #push images to s3bucket
                        images = [image1]

                        for image in images:
                            key = f"{BRAND}/{uuid.uuid4()}-.{image.name.split('.')[-1]}"
                            print(key)
                            image1_url = f"{PUBLIC_URL}{key}"
                            uploadToR2(
                                image=image,
                                BUCKET=BUCKET,
                                new_key=key
                            )
                    if image2:
                        #push images to s3bucket
                        images = [image2]

                        for image in images:
                            BRAND=environ.get('BRAND')
                            key = f"{BRAND}/{uuid.uuid4()}-.{image.name.split('.')[-1]}"
                            image2_url = f"{PUBLIC_URL}{key}"
                        
                            uploadToR2(
                                image=image,
                                BUCKET=BUCKET,
                                new_key=key
                            )

                    if image3:
                        #push images to s3bucket
                        images = [image3]

                        for image in images:
                            BRAND=environ.get('BRAND')
                            key = f"{BRAND}/{uuid.uuid4()}-.{image.name.split('.')[-1]}"
                            image3_url = f"{PUBLIC_URL}{key}"
                            uploadToR2(
                                image=image,
                                BUCKET=BUCKET,
                                new_key=key
                            )
               

                    # create product
                    new_prod = Products.objects.create(
                        name=name.lower(),
                        description=description,
                        price=price,
                        size=size,
                        slogan=slogan,
                        sku=sku,
                        quantity=qty,
                        category=category.lower(),
                        is_active=status,
                        image1_url=f'{image1_url}',
                        image2_url=f'{image2_url}',
                        image3_url=f'{image3_url}'
                    )

                    new_prod.save()
                    messages.success(request, f'{name} created successfully!')
                    return render(request, 'store/add_products.html')
            except Exception as e:
                raise(e)
                print('Error occurred when creating a product')