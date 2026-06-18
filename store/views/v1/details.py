from django.shortcuts import render
from django.views import View
from store.models import Products


class DetailsView(View):
    def get(self, request, product_id):
        product = Products.objects.filter(id=product_id)
        size = product[0].size.split(',')
        return render(request, 'store/details.html', context={'product': product, 'sizes': size})
