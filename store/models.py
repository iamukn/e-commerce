from django.db import models
from decimal import Decimal

class Products(models.Model):
    name = models.CharField(max_length=500, null=False, blank=False, default='')
    sku = models.CharField(max_length=100, unique=True, null=False, blank=False, default='')
    size = models.CharField(max_length=10, null=False, blank=False, default='')
    description = models.TextField(max_length=1000, null=True, blank=True)
    quantity = models.IntegerField(null=False, blank=False, default=1)
    image = models.CharField(null=False, blank=False, default="")
    price = models.DecimalField(null=False, blank=False, default=Decimal('0.0'), max_digits=10, decimal_places=2)
    quantity_sold = models.IntegerField(default=0, null=True, blank=True)
    is_active = models.BooleanField(null=False, blank=False, default=False)
    is_featured_product = models.BooleanField(default=False, null=False, blank=False)
    category = models.CharField(null=False, blank=False, default="")
    slogan = models.CharField(null=False, blank=False, default="")


    @property
    def formatted_price(self):
        return f"{self.price:,}"
    