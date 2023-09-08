from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json
# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "phone_number", "address"]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "phone_number", "address"]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = ["id", "automobile", "salesperson", "customer", "price"]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ["id", "automobile", "salesperson", "customer", "price"]

    encoder = {
        "automobile": AutomobileVODetailEncoder(),
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def salesperson_list(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        print("post salesperson content: ", content)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


@require_http_methods(["DELETE"])
def salesperson_detail(request, id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                {"customer": customer},
                encoder=CustomerDetailEncoder,
                status=201,
            )
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


@require_http_methods(["DELETE"])
def customer_detail(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def sale_list(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                status=201,
            )
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


@require_http_methods(["DELETE"])
def sale_detail(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


def get_unsold_automobiles(request):
    unsold_automobiles = AutomobileVO.objects.filter(sold=False).values('id', 'vin')
    return JsonResponse({'unsold_automobiles': list(unsold_automobiles)})
