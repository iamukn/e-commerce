
from django.shortcuts import render
from django.views import View
from store.models import Products
from django.db.models import Min

class CollectionsView(View):
    def get(self, request):
        first_ids = (
            Products.objects
            .values("category")
            .annotate(first_id=Min("id"))
            .values_list("first_id", flat=True)
        )

        collections = Products.objects.filter(id__in=first_ids)
        return render(request, 'store/collections.html', context={'collections': collections})
