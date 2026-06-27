from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate
from django.contrib import messages
from store.models import Products
from store.config.boto import delete_from_r2, BUCKET


class ProductsView(View):
    def get(self, request):
        if (request.user.is_authenticated):
            all_products = Products.objects.all()
            return render(request, 'store/products_dashboard.html', context={'products': all_products})
        return redirect('account')
    


class DeleteProductView(View):
    def get(self, request, product_id):
        if (request.user.is_authenticated):
            product = Products.objects.filter(id=product_id)

            if product:
                # delete product
                prod = product[0]

                image1 = prod.image1_url.split('/', 3)[-1]
                image2 = prod.image2_url.split('/', 3)[-1]
                image3 = prod.image3_url.split('/', 3)[-1]
                old_keys = [image1, image2, image3]

                for key in old_keys:
                    delete_from_r2(
                        old_key=key,
                        bucket=BUCKET
                    )
                prod.delete()
                # delete from database
            # return to the products page
            return redirect('products')
