from django.shortcuts import render
from django.views import View
from store.models import Products

class LandingPageView(View):
    def get(self, request):
        all_products = Products.objects.filter(is_active=True)
        return render(request, 'store/landingPage.html', context={'products': all_products})
