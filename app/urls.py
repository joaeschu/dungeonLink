from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('registro', views.registro, name='registro'),
    path('private-area', views.private_area, name='private-area'),
    path('combat-area', views.combat_area, name='combat-area'),
    path('logout', views.logout, name='logout'),
    path('sheet', views.sheet, name='sheet'),
    path('sheet/ajax', views.ajax_sheets, name='sheet_ajax'),
    path('sheet/spell', views.spell_sheet, name='spell'),

]