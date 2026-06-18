
from django.shortcuts import render
from django.views import View
from store.models import Products
from django.db.models import Min

class CollectionView(View):
    def get(self, request, collection):
        collections = Products.objects.filter(category=collection.lower())
        category = collection.title()
        return render(request, 'store/collection.html', context={'collections': collections, 'category': category})