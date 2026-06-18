from django.shortcuts import render
from django.views import View
from store.models import Products


class ShopView(View):
    def get(self, request):
        all_products = Products.objects.all()
        return render(request, 'store/shop.html', context={'products': all_products})
