import django
import os
import sys
import time
import json
import requests

sys.path.append('')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


# # Function to get updated VINs from the Inventory service
# def get_updated_vins():
#     try:
#         # Make a request to the Inventory service to fetch updated VINs
#         response = requests.get("http://inventory-api:8100/api/vins")
#         response.raise_for_status()

#         updated_vins = response.json()

#         return updated_vins
#     except Exception as e:
#         print(f"Error fetching updated VINs: {e}", file=sys.stderr)
#         return []


# Function to update the AutomobileVO objects with updated VINs
# def update_automobile_vos(updated_vins):
#     for vin in updated_vins:
#         try:
#             # Check if an AutomobileVO with the given VIN exists in the database
#             automobile_vo = AutomobileVO.objects.get(vin=vin)

#             # Update the AutomobileVO object if found
#             # You can add additional logic here to update other fields as needed
#             automobile_vo.sold = True
#             automobile_vo.save()

#             print(f"Updated AutomobileVO with VIN: {vin}")
#         except AutomobileVO.DoesNotExist:
#             # Handle the case where the VIN does not exist in your database
#             print(f"AutomobileVO with VIN {vin} not found in the database")


def get_automobile():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)

    for auto in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=auto["href"],
            defaults={
                "vin": auto["vin"],
                "sold": auto["sold"],
            },
        )


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            # Get updated VINs from the Inventory service
            # updated_vins = get_updated_vins()
            get_automobile()

            # Update the AutomobileVO objects with the updated VINs
            # update_automobile_vos(updated_vins)

        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
