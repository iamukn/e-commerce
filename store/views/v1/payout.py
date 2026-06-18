from django.views import View
from django.http import JsonResponse
import json

class Payout(View):
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        return JsonResponse({
        "status": "success",
        'url': 'https://www.google.com'
        })