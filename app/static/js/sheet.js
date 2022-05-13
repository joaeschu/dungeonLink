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
  if(data === ''){
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

document.getElementById('button-guardar').addEventListener("click", function(event) {
    console.log('test')
    document.getElementById('sheet-charname').value = document.getElementById('text-nombre').value;
    document.getElementById('sheet-classlevel').value = 1;
    document.getElementById('sheet-background').value = convertPythonDictToJSON(document.getElementById('trasfondo-selector').querySelector(':checked'));
    document.getElementById('sheet-race').value = convertPythonDictToJSON(document.getElementById('raza-selector').querySelector(':checked'));
    document.getElementById('sheet-alignment').value = convertPythonDictToJSON(document.getElementById('alineamiento-selector').querySelector(':checked'));
    document.getElementById('sheet-experiencepoints').value = "0";
});



document.getElementById('clase-selector').addEventListener("change", function(event) {
    let select_subclass = document.getElementById('subclase-selector');
    let select_habilidades = document.getElementById('habilidades-selector');
    let select_equipoA = document.getElementById('equipoA-selector');
    let select_equipoB = document.getElementById('equipoB-selector');
    let select_equipoC = document.getElementById('equipoC-selector');
    let select_herramientas = document.getElementById('herramientas-selector');
    let select_trucos = document.getElementById('trucos-selector');
    let select_conjuros= document.getElementById('conjuros-selector');

    clearDropown(select_subclass);
    clearDropown(select_habilidades);
    clearDropown(select_equipoA);
    clearDropown(select_equipoB);
    clearDropown(select_equipoC);
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
let atributos_selecionados = [];
document.getElementById('raza-selector').addEventListener("change", function(event) {

    let selection = this.querySelector(':checked');
    document.getElementById("fuerza-cartel").textContent = '+'+selection.getAttribute('data-Fuerza');
    let atributos = convertPythonDictToJSON(selection.getAttribute('data-Atributos'));
    Array.from(document.getElementsByClassName("select-atributos")).forEach(function(element) {
            if(typeof element.tomselect === 'undefined') {
                return;
            }
            clearDropown(element);
            addArrayDropdown(element,atributos);
            element.tomselect.off('dropdown_open');
            element.tomselect.on('dropdown_open', function (dropdown){
                console.log(dropdown.parent.tomselect);
            });
    });
});

//TODO
/*
Array.from(document.getElementsByClassName("select-atributos")).forEach(
    function(element) {
        element.addEventListener("change", function(event) {

        });
    }
);*/

    // select-atributos
 document.getElementById('fuerza-selector').addEventListener("change", function(event) {
    let select_destreza = document.getElementById("destreza-selector");
    let select_constitucion = document.getElementById("constitucion-selector");
    let select_sabiduria = document.getElementById("sabiduria-selector");
    let select_inteligencia = document.getElementById("inteligencia-selector");
    let select_carisma = document.getElementById("carisma-selector");

    let seleccion_fuerza = this.querySelector(':checked');
    let seleccion_destreza = select_destreza.querySelector(':checked');
    let seleccion_constitucion = select_constitucion.querySelector(':checked');
    let seleccion_sabiduria = select_sabiduria.querySelector(':checked');
    let seleccion_inteligencia = select_inteligencia.querySelector(':checked');
    let seleccion_carisma = select_carisma.querySelector(':checked');

});

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

