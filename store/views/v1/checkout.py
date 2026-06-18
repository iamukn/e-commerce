
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

@method_decorator(ensure_csrf_cookie, name="dispatch")
class CheckoutView(View):
    def get(self, request):
        return render(request, 'store/checkout.html')
