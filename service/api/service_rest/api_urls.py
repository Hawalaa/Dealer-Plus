from django.urls import path
from .views import api_list_technicians, api_delete_technician, api_list_appointments, api_update_appointment

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/:id/", api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/:id/", api_update_appointment, name="api_delete_appointment"),
    path("appointments/:id/cancel/", api_update_appointment, name="api_cancel_appointment"),
    path("appointments/:id/finish/", api_update_appointment, name="api_finish_appointment"),
]
