from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('private-area', views.private_area, name='private-area'),
    path('logout', views.logout, name='logout'),
    path('sheet', views.sheet, name='sheet'),

]