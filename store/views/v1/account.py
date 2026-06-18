from django.shortcuts import render
from django.views import View
from django.contrib.auth import authenticate
from django.contrib import messages


class AccountView(View):
    def get(self, request):
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
            if user.is_authenticated:
                return render(request, 'store/dashboard.html')
        messages.warning(request, "user does not exist!❌")
        return render(request, 'store/account.html')
