import codecs
import json
import os
import random

from django.shortcuts import render, redirect

from django.shortcuts import render, redirect
import json
from django.http import HttpResponse, JsonResponse

import ficheroClases
import ficheroGeneral
import ficheroHechizos
import ficheroObjetos
import ficheroRazas
import ficheroTrasfondos
from tfgrol.settings import BASE_DIR



def private_area(request):
    context = {'error': None}
    if request.session.get('user_id') is None:
        return redirect('index')
    events = ''
    with open("json/events.json", "r") as file:
        events = file.read()
    if request.method == 'POST':
        events = json.load(open(BASE_DIR / 'json/events.json', "r"))

        nombre = request.POST['nombre']
        descripcion = request.POST['descripcion']
        fecha = request.POST['fecha']
        posx = request.POST['posx']
        posy = request.POST['posy']
        textid = request.POST['textid']
        events[textid] = {
            "name": nombre,
            "description": descripcion,
            "date": fecha,
            "posx": posx,
            "posy": posy
        }
        if os.path.isfile(BASE_DIR / 'json/events.json'):
            os.remove(BASE_DIR / 'json/events.json')
        f = open(BASE_DIR / 'json/events.json', "a")
        f.write(json.dumps(events))
        f.close()
        return JsonResponse(events)

    return render(request, 'private_area.html', {'session': request.session, 'events': events})



def combat_area(request):
    if request.session.get('user_id') is None:
        return redirect('index')
    return render(request, 'combat_area.html', {'session': request.session})

def spell_sheet(request):
    if request.session.get('user_id') is None:
        return redirect('index')
    file = 'json/sheet' + str(request.session['user_id']) + '.json'
    sheet = None
    file_spell = 'json/sheet_spell' + str(request.session['user_id']) + '.json'
    spell = None
    if request.method == 'POST':
        spell = request.POST
        if (os.path.isfile(BASE_DIR / file_spell)):
            os.remove(BASE_DIR / file_spell)
        f = open(BASE_DIR / file_spell, "a")
        f.write(json.dumps(spell))
        f.close()
        return redirect('spell')

    if (os.path.isfile(BASE_DIR / file)):
        sheet = json.load(open(BASE_DIR / file, "r"))

    if (os.path.isfile(BASE_DIR / file_spell)):
        spell = json.load(open(BASE_DIR / file_spell, "r"))

    return render(request, 'spellSheet.html', {'session': request.session, 'spell': spell, 'sheet': sheet, 'ficheroClases': ficheroClases,
                                          'ficheroGeneral': ficheroGeneral, 'ficheroHechizos': ficheroHechizos, 'ficheroObjetos': ficheroObjetos,
                                          'ficheroRazas': ficheroRazas, 'ficheroTrasfondos': ficheroTrasfondos})

def ajax_sheets(request):
    if request.session.get('user_id') is None:
        return redirect('index')
    result = {}
    users = json.load(open(BASE_DIR / 'json/users.json', "r"))
    for email, user in users.items():
        file = 'json/sheet' + str(email.encode('utf-8').hex()) + '.json'
        if os.path.isfile(BASE_DIR / file):
            result[email] = json.load(open(BASE_DIR / file, "r"))
    return JsonResponse(result)


def sheet(request):
    if request.session.get('user_id') is None:
        return redirect('index')
    file = 'json/sheet' + str(request.session['user_id']) + '.json'
    sheet = None
    if request.method == 'POST':
        sheet = request.POST
        if (os.path.isfile(BASE_DIR / file)):
            os.remove(BASE_DIR / file)
        f = open(BASE_DIR / file, "a")
        f.write(json.dumps(sheet))
        f.close()
        return redirect('sheet')
# onto = get_ontology('rpg.owl').load()
#    barbarian = onto.Barbarian
#    individuals = list(onto.individuals())
#    equivalents = barbarian.equivalent_to */
    if (os.path.isfile(BASE_DIR / file)):
        sheet = json.load(open(BASE_DIR / file, "r"))
    return render(request, 'sheet.html', {'session': request.session, 'sheet': sheet, 'ficheroClases': ficheroClases,
                                          'ficheroGeneral': ficheroGeneral, 'ficheroHechizos': ficheroHechizos, 'ficheroObjetos': ficheroObjetos,
                                          'ficheroRazas': ficheroRazas, 'ficheroTrasfondos': ficheroTrasfondos})
def registro(request):
    context = {'error': None}
    if request.method == 'POST':
        users = json.load(open(BASE_DIR / 'json/users.json', "r"))

        email = request.POST['email']
        password = request.POST['password']
        nombre = request.POST['nombre']
        users[email] = {
            "name": nombre,
            "password": password
        }
        if (os.path.isfile(BASE_DIR / 'json/users.json')):
            os.remove(BASE_DIR / 'json/users.json')
        f = open(BASE_DIR / 'json/users.json', "a")
        f.write(json.dumps(users))
        f.close()

        request.session['user_id'] = email.encode('utf-8').hex()
        request.session['name'] = nombre
        context['session'] = request.session
        return redirect('private-area')


    return render(request, 'registro.html', context)

def index(request):
    context = {'error': None}
    if request.method == 'POST':
        users = json.load(open(BASE_DIR / 'json/users.json', "r"))

        email = request.POST['email']
        password = request.POST['password']
        actual_user = users.get(email)

        if actual_user is not None and password == actual_user['password']:
            request.session['user_id'] = email.encode('utf-8').hex()
            request.session['name'] = actual_user['name']
            context['session'] = request.session
            return redirect('private-area')
        else:
            context['error'] = 'Usuario o contraseña invalidos'

    return render(request, 'login.html', context)


def logout(request):
    del request.session['user_id']
    del request.session['name']
    return redirect('index')
