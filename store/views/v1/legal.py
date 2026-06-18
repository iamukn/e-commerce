from django.shortcuts import render
from django.views import View


class LegalView(View):
    def get(self, request):
        return render(request, 'store/legal.html')
