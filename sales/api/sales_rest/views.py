from django.shortcuts import render
from django.core.serializers import serialize
from .models import AutomobileVO, Salesperson, Customer, Sale
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json
# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "import_href"]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "phone_number", "address", "id"]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salesperson", "customer", "price", "id"]

    encoders = {
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
    try:
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Salesperson does not exist"},
            status=400,
        )


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
        customer = Customer.objects.create(**content)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def customer_detail(request, id):
    try:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Customer does not exist"},
            status=400,
        )


@require_http_methods(["GET", "POST"])
def sale_list(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        serialized_data = serialize("json", sales)
        json_format = json.loads(serialized_data)

        sales_made = []
        for item in json_format:
            sales_made.append(item["fields"])

        sales_objects = []

        for sale in sales_made:
            automobile_id = sale["automobile"]
            automobile = AutomobileVO.objects.get(id=automobile_id)
            salesperson_id = sale["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            customer_id = sale["customer"]
            customer = Customer.objects.get(id=customer_id)
            price = sale["price"]
            data = {
                "salesperson_e_id": salesperson.employee_id,
                "salesperson_name": f"{salesperson.first_name} {salesperson.last_name}",
                "customer_name": f"{customer.first_name} {customer.last_name}",
                "vin": automobile.vin,
                "price": price
            }
            sales_objects.append(data)
        print("all sales objects: ", sales_objects)

        return JsonResponse(
            {"sales": sales_objects},
            encoder=SaleDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        queryset = AutomobileVO.objects.all()
        saved_object = {}
        # Loop through the QuerySet and print the vin field
        for item in queryset:
            print(item.vin)

        try:
            automobile_id = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_id)
            print("automobile: ", automobile)
            saved_object["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist"},
                status=400,
            )

        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            print("salesperson: ", salesperson)
            saved_object["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=400,
            )

        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            print("customer :", customer)
            saved_object["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
            )

        saved_object["price"] = content["price"]
        sale = Sale.objects.create(**saved_object)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )
        # try:
        #     data = json.loads(request.body)
        #     # Retrieve or create the AutomobileVO instance
        #     automobile_data = data.get("automobile", {})
        #     vin = automobile_data.get("vin", "")
        #     print("vin: ", vin)
        #     automobile, created = AutomobileVO.objects.get(vin=vin)
        #     print("automobile: ", automobile)

        #     # Retrieve or create the Salesperson instance
        #     salesperson_data = data.get("salesperson", {})
        #     salesperson, created = Salesperson.objects.get(employee_id=salesperson_data.get("employee_id", ""), defaults=salesperson_data)

        #     # Retrieve or create the Customer instance
        #     customer_data = data.get("customer", {})
        #     customer, created = Customer.objects.get(phone_number=customer_data.get("phone_number", ""), defaults=customer_data)

        #     # Create the Sale object using the retrieved or created instances
        #     price = data.get("price", 0.0)
        #     sale = Sale.objects.create(automobile=automobile, salesperson=salesperson, customer=customer, price=price)

        #     return JsonResponse({"sale": SaleDetailEncoder().encode(sale)}, status=201)
        # except Exception as e:
        #     return JsonResponse({"message": str(e)}, status=400)
    # else:
    #     content = json.loads(request.body)
    #     print("sales post: ", content)
    #     try:
    #         sale = Sale.objects.create(**content)
    #         return JsonResponse(
    #             {"sale": sale},
    #             encoder=SaleDetailEncoder,
    #             status=201,
    #         )
    #     except Exception as e:
    #         return JsonResponse({"message": str(e)}, status=400)


# @require_http_methods(["POST"])
# def create_sale(request):
#     try:
#         data = json.loads(request.body)

#         # Retrieve or create the AutomobileVO instance
#         automobile_data = data.get("automobile", {})
#         vin = automobile_data.get("vin", "")
#         automobile, created = AutomobileVO.objects.get_or_create(vin=vin, defaults=automobile_data)

#         # Retrieve or create the Salesperson instance
#         salesperson_data = data.get("salesperson", {})
#         salesperson, created = Salesperson.objects.get_or_create(employee_id=salesperson_data.get("employee_id", ""), defaults=salesperson_data)

#         # Retrieve or create the Customer instance
#         customer_data = data.get("customer", {})
#         customer, created = Customer.objects.get_or_create(phone_number=customer_data.get("phone_number", ""), defaults=customer_data)

#         # Create the Sale object using the retrieved or created instances
#         price = data.get("price", 0.0)
#         sale = Sale.objects.create(automobile=automobile, salesperson=salesperson, customer=customer, price=price)

#         return JsonResponse({"sale": SaleDetailEncoder().encode(sale)}, status=201)
#     except Exception as e:
#         return JsonResponse({"message": str(e)}, status=400)

@require_http_methods(["DELETE"])
def sale_detail(request, id):
    try:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Sale does not exist"},
            status=400,
        )
