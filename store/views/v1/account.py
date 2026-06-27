from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login
from django.contrib import messages


class AccountView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('products')
        return render(request, 'store/account.html')
    def post(self, request):
        data = request.POST
        email = data.get('email').strip('')
        password = data.get('password')

        user = authenticate(
            request=request,
            username=email,
            password=password
        )

        if user:
            login(request, user)
            return redirect('products')
        messages.warning(request, "user does not exist!❌")
        return render(request, 'store/account.html')
