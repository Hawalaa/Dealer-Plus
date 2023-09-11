from django.urls import path
from .views import salesperson_list, salesperson_detail, customer_list, customer_detail, sale_list, sale_detail

urlpatterns = [
    path('salespeople/', salesperson_list, name="salesperson_list"),
    path('salespeople/<int:id>/', salesperson_detail, name="salesperson_detail"),
    path('customers/', customer_list, name="customer_list"),
    path('customers/<int:id>/', customer_detail, name="customer_detail"),
    path('sales/', sale_list, name="sale_list"),
    path('sales/<int:id>/', sale_detail, name="sale_detail"),
]
