from django import forms

class ContactForm(forms.Form):
    firstname = forms.CharField(max_length = 100)
    lastname = forms.CharField(max_length = 100)
    dob = forms.DateField()
    gender = forms.CharField(max_length = 10)
    address = forms.CharField(max_length = 200, required = False)
    email = forms.EmailField(required = False)