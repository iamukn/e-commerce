from django.shortcuts import redirect, render
from django.views import View
from store.models import Products
from django.db import transaction
from django.contrib import messages
from store.config.boto import updateAndDeleteImage
from os import environ
from uuid import uuid4

class EditProductView(View):
    def get(self, request, id):
        if request.user.is_authenticated:
            prod = Products.objects.filter(id=id)
            if prod:
                return render(request, 'store/edit_product.html', context={'product': prod[0]})
        return redirect('account')
    
    def post(self, request, id):
        if request.user.is_authenticated:
            data = request.POST
            files = request.FILES
            
            name = data.get('name')
            description = data.get('description')
            price = data.get('price')
            quantity = data.get('quantity')
            category = data.get('category')
            featured = True if data.get('mark_as_featured') == 'on' else False
            mark_as_draft = True if data.get('mark_as_draft') == 'on' else False

            product = Products.objects.filter(id=id)
            images = []
            if files:
                #do something with the files
                new_image_1 = {'id': 1,  'image': files.get('image1'), 'old_key': product[0].image1_url}
                new_image_2 = {'id': 2,  'image': files.get('image2'), 'old_key': product[0].image2_url}
                new_image_3 = {'id': 3,  'image': files.get('image3'), 'old_key': product[0].image3_url}
                
                images = [new_image_1, new_image_2, new_image_3]

            if product:
                with transaction.atomic():
                    prod = product[0]
                    if mark_as_draft:    
                        prod.is_active = not prod.is_active
                    
                    if featured:
                        prod.is_featured_product = not prod.is_featured_product
                    prod.name = name
                    prod.description = description
                    prod.price = price
                    prod.quantity = quantity
                    prod.category = category
                    
                    PUBLIC_URL = "https://pub-2b4b5916f62c498bba2ff9c67a926b83.r2.dev/"
                    # update the image in the db
                    for image in images:
                        BRAND=environ.get('BRAND')
                        if image.get('image'):
                            ext = str(image.get('image').name).split('.')[-1]
    
                            if image.get('id') == 1:
                                base_key = prod.image1_url.split('/')[-1]
                                image_uuid = base_key.split('.')[0]
                                new_key = f"{BRAND}/{image_uuid}.{ext}"
                                print(new_key)
                                prod.image1_url = f"{PUBLIC_URL}{new_key}" 
                            elif image.get('id') == 2:
                                base_key = prod.image2_url
                                if base_key:
                                    base_key = base_key.split('/')[-1]
                                    image_uuid = base_key.split('.')[0]
                                    new_key = f"{BRAND}/{image_uuid}.{ext}"
                                    prod.image2_url = f"{PUBLIC_URL}{new_key}"
                                else:
                                    new_key = f"{BRAND}/{uuid4()}.{ext}"
                                    prod.image2_url = f"{PUBLIC_URL}{new_key}"
                            elif image.get('id') == 3:
                                base_key = prod.image3_url
                                if base_key:
                                    base_key = base_key.split('/')[-1]
                                    image_uuid = base_key.split('.')[0]
                                    new_key = f"{BRAND}/{image_uuid}.{ext}"
                                    prod.image3_url = f"{PUBLIC_URL}{new_key}"
                                else:
                                    new_key = f"{BRAND}/{uuid4()}.{ext}"
                                    prod.image3_url = f"{PUBLIC_URL}{new_key}"
                            updateAndDeleteImage(
                                image=image,
                                new_key=new_key
                            )
                    # save to the db
                    prod.save()
                    
                    messages.success(request, 'Product updated successfully ✅')
                    return render(request, 'store/edit_product.html', context={'product': prod})
            return redirect('products')