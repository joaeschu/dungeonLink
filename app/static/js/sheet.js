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



document.getElementById('clase-selector').addEventListener("change", function(event) {
    let select_subclass = document.getElementById('subclase-selector');
    let select_habilidades = document.getElementById('habilidades-selector');
    let select_equipoA = document.getElementById('equipoA-selector');
    let select_equipoB = document.getElementById('equipoB-selector');
    let select_equipoC = document.getElementById('equipoC-selector');
    clearDropown(select_subclass);
    clearDropown(select_habilidades);
    clearDropown(select_equipoA);

    let selection = this.querySelector(':checked');
    select_habilidades.tomselect.settings.maxItems =selection.getAttribute('data-habilidades-max');
    addArrayDropdown(select_subclass, convertPythonDictToJSON(selection.getAttribute('data-subclases')));
    addArrayDropdown(select_habilidades, convertPythonDictToJSON(selection.getAttribute('data-habilidades')));
    addArrayDropdown(select_equipoA, convertPythonDictToJSON(selection.getAttribute('data-equipoA')));
    addArrayDropdown(select_equipoB, convertPythonDictToJSON(selection.getAttribute('data-equipoB')));
    addArrayDropdown(select_equipoC, convertPythonDictToJSON(selection.getAttribute('data-C')));
});



new TomSelect("#habilidades-selector",{
    plugins: ['remove_button'],
	maxItems: 3
});

Array.from(document.getElementsByClassName("tomselect-basic")).forEach(
    function(element) {
        new TomSelect(element,{});
    }
);

