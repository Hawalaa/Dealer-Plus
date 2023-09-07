from django.urls import path
from .views import api_list_technicians, api_delete_technician, api_list_appointments, api_update_appointment, api_search_appointment

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_update_appointment, name="api_delete_appointment"),
    path("appointments/<int:pk>/cancel/", api_update_appointment, name="api_cancel_appointment"),
    path("appointments/<int:pk>/finish/", api_update_appointment, name="api_finish_appointment"),
    path("appointments/search/<vin>/", api_search_appointment, name="api_search_appointment"),
]
