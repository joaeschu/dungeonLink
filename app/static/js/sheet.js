$('.stat').bind('input', function()
    {
      var inputName = $(this).attr('name')
      var mod = parseInt($(this).val()) - 10

      if (mod % 2 == 0)
        mod = mod / 2
      else
        mod = (mod - 1) / 2

      if (isNaN(mod))
        mod = ""
      else if (mod >= 0)
        mod = "+" + mod

      var scoreName = inputName.slice(0, inputName.indexOf("score"))
      var modName = scoreName + "mod"

      $("[name='" + modName + "']").val(mod)
    })


$('.statmod').bind('change', function()
{
  var name = $(this).attr('name')
  name = "uses" + name.slice(0, name.indexOf('mod'))
  
})

$("[name='classlevel']").bind('input', function()
  {
    var classes = $(this).val()
    var r = new RegExp(/\d+/g)
    var total = 0
    var result
    while ((result = r.exec(classes)) != null)
    {
      var lvl = parseInt(result)
      if (!isNaN(lvl))
        total += lvl
    }
    var prof = 2
    if (total > 0)
    {
      total -= 1
      prof += Math.trunc(total/4)
      prof = "+" + prof
    }
    else
    {
      prof = ""    
    }
    $("[name='proficiencybonus']").val(prof)
  })

$("[name='totalhd']").bind('input', function()
{
  $("[name='remaininghd']").val($(this).val())
})

function totalhd_clicked()
{
  $("[name='remaininghd']").val($("[name='totalhd']").val())
}
const convertPythonDictToJSON = function (data) {
  if(data === '' || data === null){
    return null;
  }
    let d = data.replace(new RegExp(`(?<=[a-zA-Z])'(?=[a-zA-Z ])`, "g"), '__')
    d = d.replace(new RegExp("'", 'g'), '"')
    d = d.replace(new RegExp("__", 'g'), "'")
    d = d.replace(new RegExp("None", 'g'), 'null')
    d = d.replace(new RegExp("False", 'g'), 'false')
    d = d.replace(new RegExp("True", 'g'), 'true')
    return JSON.parse(d)
}
const clearDropown  = function (select){
    select.tomselect.clear()
    select.tomselect.clearOptions()
}

const addArrayDropdown  = function (select,array){
        if(Array.isArray(array)) {
            array.forEach(function (value){
                select.tomselect.addOption({value:value,text:value});
            });
        }

}

function getScoreMod(score){
      let mod = parseInt(score) - 10

      if (mod % 2 === 0)
        mod = mod / 2
      else
        mod = (mod - 1) / 2
      return mod
};

function clearFicha() {
    let checkboxes = ["Atletismo", "Acrobacias", "Juego de Manos", "Sigilo", "Arcano", "Historia",
        "Investigación", "Naturaleza", "Religión", "Trato de animales", "Medicina", "Percepción", "Perspicacia", "Supervivencia",
        "Enganyo", "Intimidación", "Interpretación", "Persuasión","Strengthsave", "Dexteritysave", "Constitutionsave", "Wisdomsave", "Intelligencesave", "Charismasave",
        "deathsuccess1", "deathsuccess2", "deathsuccess3", "deathfail1", "deathfail2", "deathfail3"];
    checkboxes.forEach(function (option) {
        document.getElementById('sheet-check-' + option.replace(/\s+/g, '')).checked = false;
    });

    let zeroes =["cp","sp","ep","gp","pp","temphp"]
    zeroes.forEach(function (option) {
        document.getElementById('sheet-' + option.replace(/\s+/g, '')).value = 0;
    });

    let blanks =["ideals", "bonds", "flaws"]
    blanks.forEach(function (option) {
        document.getElementById('sheet-' + option.replace(/\s+/g, '')).value = " ";
    });
};

function getPuntosGastados(puntuacion){
    if(puntuacion > 13){
        if(puntuacion === 14){
            return 7;
        }else{
            return 9;
        }
    }else{
        return (puntuacion - 8)
    }
};

function getMaxPuntuacionPosible(puntosRestantes, puntuacionActual){
    let suma = puntosRestantes + puntuacionActual;
    if(puntosRestantes > 8 || puntuacionActual === 15 || suma > 16){
        return 15;
    }
    if(puntosRestantes < 1){
        return 0;
    }
    if(suma < 14){
        return suma;
    }
    if(suma === 14){
        return 13;
    }
    if(suma === 15){
        return 14;
    }
    if(suma === 16){
        if(puntuacionActual === 14){return 15;}
        return 14;
    }
};

document.getElementById('button-guardar').addEventListener("click", function(event) {

    let clase = document.getElementById("clase-selector").querySelector(':checked');
    let raza = document.getElementById("raza-selector").querySelector(':checked');
    let trasfondo = document.getElementById("trasfondo-selector").querySelector(':checked');
    let habilidades = ["Atletismo", "Acrobacias", "Juego de Manos", "Sigilo", "Arcano", "Historia",
        "Investigación", "Naturaleza", "Religión", "Trato de animales", "Medicina", "Percepción", "Perspicacia", "Supervivencia",
        "Enganyo", "Intimidación", "Interpretación", "Persuasión"];
    clearFicha();

    document.getElementById('sheet-classlevel').value = document.getElementById('clase-selector').value + " 1";
    document.getElementById('sheet-charname').value = document.getElementById('text-nombre').value;
    document.getElementById('sheet-playername').value = document.getElementById('subclase-selector').value;
    document.getElementById('sheet-background').value = document.getElementById('trasfondo-selector').value;
    document.getElementById('sheet-race').value = document.getElementById('raza-selector').value;
    document.getElementById('sheet-alignment').value = document.getElementById('alineamiento-selector').value;
    document.getElementById('sheet-experiencepoints').value = "0";
    document.getElementById('sheet-proficiencybonus').value = "+2";
    document.getElementById('sheet-personality').value = document.getElementById('personalidad-selector').value;

    let mod_Fuerza = getScoreMod(document.getElementById('fuerza-selector').value);
    let mod_Destreza = getScoreMod(document.getElementById('destreza-selector').value);
    let mod_Constitucion = getScoreMod(document.getElementById('constitucion-selector').value);
    let mod_Sabiduria = getScoreMod(document.getElementById('sabiduria-selector').value);
    let mod_Inteligencia = getScoreMod(document.getElementById('inteligencia-selector').value);
    let mod_Carisma = getScoreMod(document.getElementById('carisma-selector').value);

    document.getElementById('sheet-Strengthscore').value = document.getElementById('fuerza-selector').value;
    document.getElementById('sheet-Strengthmod').value = mod_Fuerza;
    document.getElementById('sheet-Dexterityscore').value = document.getElementById('destreza-selector').value;
    document.getElementById('sheet-Dexteritymod').value = mod_Destreza;
    document.getElementById('sheet-Constitutionscore').value = document.getElementById('constitucion-selector').value;
    document.getElementById('sheet-Constitutionmod').value = mod_Constitucion;
    document.getElementById('sheet-Wisdomscore').value = document.getElementById('sabiduria-selector').value;
    document.getElementById('sheet-Wisdommod').value = mod_Sabiduria;
    document.getElementById('sheet-Intelligencescore').value = document.getElementById('inteligencia-selector').value;
    document.getElementById('sheet-Intelligencemod').value = mod_Inteligencia;
    document.getElementById('sheet-Charismascore').value = document.getElementById('carisma-selector').value;
    document.getElementById('sheet-Charismamod').value = mod_Carisma;

    document.getElementById('sheet-ac').value = 10 + mod_Destreza;
    document.getElementById('sheet-initiative').value = 10 + mod_Destreza;
    document.getElementById('sheet-speed').value = raza.getAttribute('data-Velocidad');
    let dadoGolpe = parseInt(clase.getAttribute('data-dado-golpe'));
    document.getElementById('sheet-maxhp').value = dadoGolpe + mod_Constitucion;
    document.getElementById('sheet-currenthp').value = dadoGolpe + mod_Constitucion;
    document.getElementById('sheet-totalhd').value = "1d" + dadoGolpe;
    document.getElementById('sheet-remaininghd').value = "1d" + dadoGolpe;

    let salvaciones = convertPythonDictToJSON(clase.getAttribute('data-Salvaciones'));
    if (salvaciones !== null) {
        if (salvaciones[0] > 0) {
            document.getElementById('sheet-Strengthsave').value = mod_Fuerza + 2;
            document.getElementById('sheet-check-Strengthsave').checked = true;
        } else
            document.getElementById('sheet-Strengthsave').value = mod_Fuerza
        if (salvaciones[1] > 0) {
            document.getElementById('sheet-Dexteritysave').value = mod_Destreza + 2
            document.getElementById('sheet-check-Dexteritysave').checked = true;
        } else
            document.getElementById('sheet-Dexteritysave').value = mod_Destreza
        if (salvaciones[2] > 0) {
            document.getElementById('sheet-Constitutionsave').value = mod_Constitucion + 2
            document.getElementById('sheet-check-Constitutionsave').checked = true;
        } else
            document.getElementById('sheet-Constitutionsave').value = mod_Constitucion
        if (salvaciones[3] > 0) {
            document.getElementById('sheet-Wisdomsave').value = mod_Sabiduria + 2
            document.getElementById('sheet-check-Wisdomsave').checked = true;
        } else
            document.getElementById('sheet-Wisdomsave').value = mod_Sabiduria
        if (salvaciones[4] > 0) {
            document.getElementById('sheet-Intelligencesave').value = mod_Inteligencia + 2
            document.getElementById('sheet-check-Intelligencesave').checked = true;
        } else
            document.getElementById('sheet-Intelligencesave').value = mod_Inteligencia
        if (salvaciones[5] > 0) {
            document.getElementById('sheet-Charismasave').value = mod_Carisma + 2
            document.getElementById('sheet-check-Charismasave').checked = true;
        } else
            document.getElementById('sheet-Charismasave').value = mod_Carisma
    }

    document.getElementById('sheet-Atletismo').value = mod_Fuerza;
    document.getElementById('sheet-Acrobacias').value = mod_Destreza;
    document.getElementById('sheet-JuegodeManos').value = mod_Destreza;
    document.getElementById('sheet-Sigilo').value = mod_Destreza;
    document.getElementById('sheet-Arcano').value = mod_Inteligencia;
    document.getElementById('sheet-Historia').value = mod_Inteligencia;
    document.getElementById('sheet-Investigación').value = mod_Inteligencia;
    document.getElementById('sheet-Religión').value = mod_Inteligencia;
    document.getElementById('sheet-Naturaleza').value = mod_Inteligencia;
    document.getElementById('sheet-Tratodeanimales').value = mod_Sabiduria;
    document.getElementById('sheet-Medicina').value = mod_Sabiduria;
    document.getElementById('sheet-Percepción').value = mod_Sabiduria;
    document.getElementById('sheet-Perspicacia').value = mod_Sabiduria;
    document.getElementById('sheet-Supervivencia').value = mod_Sabiduria;
    document.getElementById('sheet-Enganyo').value = mod_Carisma;
    document.getElementById('sheet-Intimidación').value = mod_Carisma;
    document.getElementById('sheet-Interpretación').value = mod_Carisma;
    document.getElementById('sheet-Persuasión').value = mod_Carisma;


    let competenciaClase = document.getElementById('habilidades-selector').tomselect.getValue();
    let competenciaTrasfondo = document.getElementById('trasfondo-habilidades-selector').tomselect.getValue();
    let competenciaRaza = convertPythonDictToJSON(raza.getAttribute('data-Habilidades'));
    let competenciaHabilidades = [];
    if (competenciaClase !== null) {
        competenciaHabilidades = competenciaClase;
    }
    if (competenciaTrasfondo !== null) {
        competenciaHabilidades = competenciaHabilidades.concat(competenciaTrasfondo.filter((item) => competenciaHabilidades.indexOf(item) < 0));
    }
    if (competenciaRaza !== null) {
        competenciaHabilidades = competenciaHabilidades.concat(competenciaRaza.filter((item) => competenciaHabilidades.indexOf(item) < 0));
    }

    competenciaHabilidades.forEach(function (option) {
        let valor = parseInt(document.getElementById('sheet-' + option.replace('ñ', 'ny').replace(/\s+/g, '')).value);
        document.getElementById('sheet-' + option.replace('ñ', 'ny').replace(/\s+/g, '')).value = valor + 2;
        document.getElementById('sheet-check-' + option.replace('ñ', 'ny').replace(/\s+/g, '')).checked = true;
    });

    document.getElementById('sheet-passiveperception').value = document.getElementById('sheet-Percepción').value + 10;

    habilidades.forEach(function (habilidad) {
        let valor = document.getElementById('sheet-' + habilidad.replace('ñ', 'ny').replace(/\s+/g, '')).value;
        if (valor > 0)
            document.getElementById('sheet-' + habilidad.replace('ñ', 'ny').replace(/\s+/g, '')).value = '+' + valor;
    });

    let listaEquipo = [];
    listaEquipo.push(document.getElementById('equipoA-selector').tomselect.getValue() + "\n");
    listaEquipo.push(document.getElementById('equipoB-selector').tomselect.getValue() + "\n");
    listaEquipo.push(document.getElementById('equipoC-selector').tomselect.getValue() + "\n");
    listaEquipo.push(trasfondo.getAttribute('data-trasfondo-equipo') + "\n");
    listaEquipo.concat(convertPythonDictToJSON(clase.getAttribute('data-Equipo-obligatorio')));

    let stringEquipo = "";
    listaEquipo.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            stringEquipo += objeto
    });
    document.getElementById('sheet-Lista-de-equipo').value = stringEquipo;

    let listaCompetencias = [];
    competencia = document.getElementById('herramientas-selector').tomselect.getValue();
    if (competencia !== null) {
     competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }
    competencia = convertPythonDictToJSON(clase.getAttribute('data-Armas'));
    if (competencia !== null) {
    competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }
    competencia = convertPythonDictToJSON(clase.getAttribute('data-Armaduras'));
    if (competencia !== null) {
    competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }
    competencia = document.getElementById('trasfondo-idiomas-selector').tomselect.getValue();
    if (competencia !== null) {
    competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }
    competencia = document.getElementById('trasfondo-herramientas-selector').tomselect.getValue();
    if (competencia !== null) {
    competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }
    competencia = convertPythonDictToJSON(raza.getAttribute('data-Competencias'));
    if (competencia !== null) {
    competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }
    competencia = convertPythonDictToJSON(raza.getAttribute('data-Lenguajes'));
    if (competencia !== null) {
    competencia.forEach(function (objeto) {
        if (objeto != null && objeto !== "")
            listaCompetencias.push(objeto);
    });
    }

    let stringCompetencias = "";
    listaCompetencias.forEach(function(competencia){
        if(competencia != null && competencia !== "") {
            competencia += "\n"
            stringCompetencias += competencia
        }
    });
    document.getElementById('sheet-otherprofs').value = stringCompetencias;

document.getElementById('form-sheet').submit();
});



document.getElementById('clase-selector').addEventListener("change", function(event) {
    let select_subclass = document.getElementById('subclase-selector');
    let select_habilidades = document.getElementById('habilidades-selector');
    let select_equipoA = document.getElementById('equipoA-selector');
    let select_equipoB = document.getElementById('equipoB-selector');
    let select_equipoC = document.getElementById('equipoC-selector');
    let select_equipoD = document.getElementById('equipoD-selector');
    let select_herramientas = document.getElementById('herramientas-selector');
    let select_trucos = document.getElementById('trucos-selector');
    let select_conjuros= document.getElementById('conjuros-selector');

    clearDropown(select_subclass);
    clearDropown(select_habilidades);
    clearDropown(select_equipoA);
    clearDropown(select_equipoB);
    clearDropown(select_equipoC);
    clearDropown(select_equipoD);
    clearDropown(select_herramientas);
    clearDropown(select_trucos);
    clearDropown(select_conjuros);

    let selection = this.querySelector(':checked');
    select_habilidades.tomselect.settings.maxItems =selection.getAttribute('data-habilidades-max');
    addArrayDropdown(select_subclass, convertPythonDictToJSON(selection.getAttribute('data-subclases')));
    addArrayDropdown(select_habilidades, convertPythonDictToJSON(selection.getAttribute('data-habilidades')));
    addArrayDropdown(select_equipoA, convertPythonDictToJSON(selection.getAttribute('data-equipoA')));
    addArrayDropdown(select_equipoB, convertPythonDictToJSON(selection.getAttribute('data-equipoB')));
    addArrayDropdown(select_equipoC, convertPythonDictToJSON(selection.getAttribute('data-equipoC')));
    addArrayDropdown(select_equipoD, convertPythonDictToJSON(selection.getAttribute('data-equipoD')));
    select_herramientas.tomselect.settings.maxItems =selection.getAttribute('data-herramientas-max');
    addArrayDropdown(select_herramientas, convertPythonDictToJSON(selection.getAttribute('data-herramientas')));
    select_trucos.tomselect.settings.maxItems =selection.getAttribute('data-Trucos-a-elegir');
    addArrayDropdown(select_trucos, convertPythonDictToJSON(selection.getAttribute('data-Trucos')));
    select_conjuros.tomselect.settings.maxItems =selection.getAttribute('data-Conjuros-a-elegir');
    addArrayDropdown(select_conjuros, convertPythonDictToJSON(selection.getAttribute('data-Conjuros-1')));
});

document.getElementById('trasfondo-selector').addEventListener("change", function(event) {
    let select_habilidades = document.getElementById('trasfondo-habilidades-selector');
    let select_idiomas = document.getElementById('trasfondo-idiomas-selector');
    let select_herramientas = document.getElementById('trasfondo-herramientas-selector');

    clearDropown(select_habilidades);
    clearDropown(select_idiomas);
    clearDropown(select_herramientas);

    let selection = this.querySelector(':checked');
    addArrayDropdown(select_habilidades, convertPythonDictToJSON(selection.getAttribute('data-trasfondo-habilidades')));
    select_idiomas.tomselect.settings.maxItems =selection.getAttribute('data-trasfondo-idiomas-max');
    addArrayDropdown(select_idiomas, convertPythonDictToJSON(selection.getAttribute('data-trasfondo-idiomas')));
    select_herramientas.tomselect.settings.maxItems =selection.getAttribute('data-trasfondo-herramientas-max');
    addArrayDropdown(select_herramientas, convertPythonDictToJSON(selection.getAttribute('data-trasfondo-herramientas')));
});


document.getElementById('raza-selector').addEventListener("change", function(event) {

    let selection = this.querySelector(':checked');
    document.getElementById("fuerza-cartel").textContent = '+'+selection.getAttribute('data-Fuerza');
    atributos = convertPythonDictToJSON(selection.getAttribute('data-Atributos'));
    Array.from(document.getElementsByClassName("select-atributos")).forEach(function(element) {
            if(typeof element.tomselect === 'undefined') {
                return;
            }
            clearDropown(element);
            addArrayDropdown(element,atributos);

            element.onchange = function(event2) {
                if(typeof this.tomselect === 'undefined') {
                    return;
                }
                let atributos_selecionados = Array.prototype.map.call(document.getElementsByClassName("select-atributos"), function(element) {
                    if(typeof element.tomselect === 'undefined') {
                        return;
                    }
                    return element.tomselect.getValue();
                })

                console.log(this.tomselect.getValue());

            };
    });
});

Array.from(document.getElementsByClassName("form-range")).forEach(
    function(element) {
        element.addEventListener("change", function(event) {
            let fuerza = parseInt(document.getElementById('fuerza-selector').value);
            let destreza = parseInt(document.getElementById('destreza-selector').value);
            let constitucion = parseInt(document.getElementById('constitucion-selector').value);
            let sabiduria = parseInt(document.getElementById('sabiduria-selector').value);
            let inteligencia = parseInt(document.getElementById('inteligencia-selector').value);
            let carisma = parseInt(document.getElementById('carisma-selector').value);

            let puntosGastados = getPuntosGastados(fuerza) + getPuntosGastados(destreza) + getPuntosGastados(constitucion) + getPuntosGastados(sabiduria) + getPuntosGastados(inteligencia) + getPuntosGastados(carisma);

            let puntosRestantes = 27 - puntosGastados;
            document.getElementById('fuerza-selector').max = Math.max(fuerza, getMaxPuntuacionPosible(puntosRestantes, fuerza));
            document.getElementById('destreza-selector').max = Math.max(destreza, getMaxPuntuacionPosible(puntosRestantes, destreza));
            document.getElementById('constitucion-selector').max = Math.max(constitucion, getMaxPuntuacionPosible(puntosRestantes, constitucion));
            document.getElementById('sabiduria-selector').max = Math.max(sabiduria, getMaxPuntuacionPosible(puntosRestantes, sabiduria));
            document.getElementById('inteligencia-selector').max = Math.max(inteligencia, getMaxPuntuacionPosible(puntosRestantes, inteligencia));
            document.getElementById('carisma-selector').max = Math.max(carisma, getMaxPuntuacionPosible(puntosRestantes, carisma));
            document.getElementById('fuerza-selector-etiqueta').innerHTML = fuerza;
            document.getElementById('destreza-selector-etiqueta').innerHTML = destreza;
            document.getElementById('constitucion-selector-etiqueta').innerHTML = constitucion;
            document.getElementById('sabiduria-selector-etiqueta').innerHTML = sabiduria;
            document.getElementById('inteligencia-selector-etiqueta').innerHTML = inteligencia;
            document.getElementById('carisma-selector-etiqueta').innerHTML = carisma;
            document.getElementById('etiqueta-restantes').innerHTML = 'Puntos restantes: ' + puntosRestantes + '/27';
        });
    }
);


new TomSelect("#habilidades-selector",{
    plugins: ['remove_button'],
	maxItems: 3
});

new TomSelect("#herramientas-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

new TomSelect("#trucos-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

new TomSelect("#conjuros-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

new TomSelect("#trasfondo-habilidades-selector",{
    plugins: ['remove_button'],
	maxItems: 2
});

new TomSelect("#trasfondo-herramientas-selector",{
    plugins: ['remove_button'],
	maxItems: 2
});

new TomSelect("#trasfondo-idiomas-selector",{
    plugins: ['remove_button'],
	maxItems: 1
});

Array.from(document.getElementsByClassName("tomselect-basic")).forEach(
    function(element) {
        new TomSelect(element,{});
    }
);

function eyeEvent(){
    $('.rasgos-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });
}
eyeEvent()
function addRasgo(input = '', textarea = ''){
        let table = $('#rasgos-table');
        let total = table.data('total') + 1;
        table.data('total',total);
        let tr = '<tr>\n' +
            '<script>' +
            '$("button").on("click", function(){\n' +
            '    $(this).parent().parent().remove();\n' +
            '});' +
            '</script>' +
            '                <td  colspan="2">\n' +
            '                    <input name="rasgos_input'+total+'" type="text" value="'+input+'" />\n' +
            '                    <textarea class="d-none" id="rasgos-testarea'+total+'" name="rasgos_testarea'+total+'">'+textarea+'</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary rasgos-eye" href="#" data-textarea="rasgos-testarea'+total+'"><i class="bi bi-eye-fill"></i></a><button><i class="bi bi-x-circle-fill"></i></button>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        $("button").on("click", function(){
        $(this).parent().remove();
});
}
$('#rasgos-table').data('total',$('#rasgos-table >tr').length);
$('#rasgos-plus').click(function (e){
    e.preventDefault();
    addRasgo();
});
