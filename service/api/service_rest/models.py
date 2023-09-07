from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField()
    import_herf = models.CharField(max_length=200, unique=True)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=100, default="created")
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    vip = models.BooleanField(default=False, null=True)
