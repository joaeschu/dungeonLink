from django.shortcuts import render

from django.http import HttpResponse

import ficheroClases
import ficheroGeneral
import ficheroHechizos
import ficheroObjetos
import ficheroRazas
import ficheroTrasfondos
from tfgrol.settings import BASE_DIR


def private_area(request):
    if request.session.get('user_id') is None:
        return redirect('index')
    return render(request, 'private_area.html', {'session': request.session})


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


def index(request):
    context = {'error': None}
    if request.method == 'POST':
        users = json.load(open(BASE_DIR / 'json/users.json', "r"))

        email = request.POST['email']
        password = request.POST['password']
        actual_user = users.get(email)

        if actual_user is not None and password == actual_user['password']:
            request.session['user_id'] = actual_user['id']
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
