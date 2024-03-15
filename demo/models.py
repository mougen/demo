from django.db import models

class Form(models.Model):
    # picture = models.ImageField()
    firstname = models.CharField(max_length = 100)
    lastname = models.CharField(max_length = 100)
    dob = models.DateField()
    gender = models.CharField(max_length = 10, choices={"M": "male", "F": "female"}, default = 1)
    address = models.CharField(max_length = 200,blank=True)
    email = models.EmailField(blank=True)

    def __str__(self) -> str:
        return self.firstname + ' ' + self.lastname