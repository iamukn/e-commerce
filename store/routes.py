from django.urls import path

from .views.v1.checkout import CheckoutView
from .views.v1.details import DetailsView
from .views.v1.account import AccountView
from .views.v1.cart import CartView
from .views.v1.contact import ContactView
from .views.v1.privacy import PrivacyView
from .views.v1.legal import LegalView
from .views.v1.shop import ShopView
from .views.v1.collections import CollectionsView
from .views.v1.collection import CollectionView
from .views.v1.landing_page import LandingPageView
from .views.v1.payout import Payout
from .views.v1.products import ProductsView, DeleteProductView
from .views.v1.logout import LogoutView
from .views.v1.add_products import AddProductsView
from .views.v1.edit_product import EditProductView

urlpatterns = [
    path('', LandingPageView.as_view(), name='landing-page'),
    path('shop/', ShopView.as_view(), name='shop'),
    path('collections/', CollectionsView.as_view(), name='collections'),
    path('legal/', LegalView.as_view(), name='legal'),
    path('privacy/', PrivacyView.as_view(), name='privacy'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('cart/', CartView.as_view(), name='cart'),
    path('account/', AccountView.as_view(), name='account'),
    path('details/<int:product_id>', DetailsView.as_view(), name='details'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('collection/<str:collection>', CollectionView.as_view(), name='collection'),
    path('payout/', Payout.as_view(), name='payout'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('account/products/', ProductsView.as_view(), name="products"),
    path('account/products/new/', AddProductsView.as_view(), name='add_products'),
    path('account/products/delete/<int:product_id>/', DeleteProductView.as_view(), name='delete-product'),
    path('account/products/edit/<int:id>', EditProductView.as_view(), name='edit_product')
]