from django.http import JsonResponse
from .models import Form
from .serializers import FormSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET', 'POST', 'DELETE'])
def user_list(request, format=None):

    if request.method == 'GET':
        # get all the forms
        forms = Form.objects.all()
        # serialize
        serializer = FormSerializer(forms, many=True)
        # return json
        return  Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = FormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
    
    elif request.method == 'DELETE':
        # get all the forms
        forms = Form.objects.all()
        forms.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id, format=None):
    try:
        # get a single form
        form = Form.objects.get(pk=id)
    except Form.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FormSerializer(form)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = FormSerializer(form, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)