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

function getScoreMod(score){
      let mod = parseInt(score) - 10

      if (mod % 2 === 0)
        mod = mod / 2
      else
        mod = (mod - 1) / 2
      return mod
};

function selectCastingHability(name, value){
    let mod = getScoreMod(value)
    document.getElementById('castingAbility').value = name;
    document.getElementById('saveDC').value = parseInt(mod) + 10;
    document.getElementById('spellAttack').value = parseInt(mod) + 2;
}

document.getElementById('button-guarda').addEventListener("click", function(event) {
   deleteAllTrucos();
   deleteAllHechizos1();
   let lista_trucos = document.getElementById('trucos-selector').tomselect.getValue();
   lista_trucos.forEach(function (option) {
       addTruco(option, "");
    });

   let lista_hechizos_1 = document.getElementById('conjuros-selector').tomselect.getValue();
   lista_hechizos_1.forEach(function (option) {
       addHechizo1(option, "");
    });
   clase = document.getElementById('claseh-selector').value;
   if(clase === "Bardo" || clase === "Brujo" || clase === "Hechicero" || clase === "Paladín"){
       selectCastingHability("Carisma", document.getElementById('valorCarisma').value);
   }else if(clase === "Clérigo" || clase === "Druida" || clase === "Explorador"){
       selectCastingHability("Sabiduría", document.getElementById('valorSabiduria').value);
   }else if(clase === "Mago"){
       selectCastingHability("Inteligencia", document.getElementById('valorInteligencia').value);
   }

   document.getElementById('form-spell-sheet').submit();
});

function loadModal(){
    let select_trucos = document.getElementById('trucos-selector');
    let select_hechizos_1 = document.getElementById('conjuros-selector');

    clearDropown(select_trucos);
    clearDropown(select_hechizos_1);
    let selection = document.getElementById('claseh-selector').querySelector(':checked');
    select_trucos.tomselect.settings.maxItems =selection.getAttribute('data-nivel-0-max');
    select_hechizos_1.tomselect.settings.maxItems =selection.getAttribute('data-nivel-1-max');
    addArrayDropdown(select_trucos, convertPythonDictToJSON(selection.getAttribute('data-nivel-0')));
    addArrayDropdown(select_hechizos_1, convertPythonDictToJSON(selection.getAttribute('data-nivel-1')));
}

document.getElementById('claseh-selector').addEventListener("change", loadModal);
new TomSelect("#trucos-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

new TomSelect("#conjuros-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

Array.from(document.getElementsByClassName("tomselect-basic")).forEach(
    function(element) {
        new TomSelect(element,{});
    }
);
new TomSelect('#claseh-selector',{
	onInitialize:loadModal
});

function eyeEvent(){
    $('.trucos-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos1-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos2-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos3-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos4-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos5-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos6-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos7-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos8-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });

    $('.hechizos9-eye').unbind('click').click(function (e) {
        e.preventDefault();
        let textarea = $('#'+$(this).data('textarea'));
        if(textarea.hasClass('d-none')){
            textarea.removeClass('d-none')
        }else{
            textarea.addClass('d-none')
        }
    });
}
function deleteEvent(){
    $('.trucos-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos1-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos2-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos3-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos4-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos5-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos6-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos7-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos8-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });

    $('.hechizos9-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });
}
function deleteAllTrucos(){
     var node = document.getElementById('trucos-table');
     node.innerHTML = "";
}

function deleteAllHechizos1(){
     var node = document.getElementById('hechizos1-table');
     node.innerHTML = "";
}

function deleteAllHechizos2(){
     var node = document.getElementById('hechizos2-table');
     node.innerHTML = "";
}

function deleteAllHechizos3(){
     var node = document.getElementById('hechizos3-table');
     node.innerHTML = "";
}

function deleteAllHechizos4(){
     var node = document.getElementById('hechizos4-table');
     node.innerHTML = "";
}

function deleteAllHechizos5(){
     var node = document.getElementById('hechizos5-table');
     node.innerHTML = "";
}

function deleteAllHechizos6(){
     var node = document.getElementById('hechizos6-table');
     node.innerHTML = "";
}

function deleteAllHechizos7(){
     var node = document.getElementById('hechizos7-table');
     node.innerHTML = "";
}

function deleteAllHechizos8(){
     var node = document.getElementById('hechizos8-table');
     node.innerHTML = "";
}

function deleteAllHechizos9(){
     var node = document.getElementById('hechizos9-table');
     node.innerHTML = "";
}

eyeEvent()
deleteEvent()
function addTruco(input = '', textarea = '', ){
        let table = $('#trucos-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="trucos_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="trucos-testarea' + total + '" name="trucos_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary trucos-eye" href="#" data-textarea="trucos-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary trucos-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#trucos-table').data('total',$('#trucos-table >tr').length);
$('#trucos-plus').click(function (e){
    e.preventDefault();
    addTruco();
});

function addHechizo1(input = '', textarea = '', ){
        let table = $('#hechizos1-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos1_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos1-testarea' + total + '" name="hechizos1_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos1-eye" href="#" data-textarea="hechizos1-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos1-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos1-table').data('total',$('#hechizos1-table >tr').length);
$('#hechizos1-plus').click(function (e){
    e.preventDefault();
    addHechizo1();
});

function addHechizo2(input = '', textarea = '', ){
        let table = $('#hechizos2-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos2_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos2-testarea' + total + '" name="hechizos2_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos2-eye" href="#" data-textarea="hechizos2-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos2-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos2-table').data('total',$('#hechizos2-table >tr').length);
$('#hechizos2-plus').click(function (e){
    e.preventDefault();
    addHechizo2();
});

function addHechizo3(input = '', textarea = '', ){
        let table = $('#hechizos3-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos3_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos3-testarea' + total + '" name="hechizos3_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos3-eye" href="#" data-textarea="hechizos3-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos3-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos3-table').data('total',$('#hechizos3-table >tr').length);
$('#hechizos3-plus').click(function (e){
    e.preventDefault();
    addHechizo3();
});

function addHechizo4(input = '', textarea = '', ){
        let table = $('#hechizos4-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos4_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos4-testarea' + total + '" name="hechizos4_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos4-eye" href="#" data-textarea="hechizos4-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos4-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos4-table').data('total',$('#hechizos4-table >tr').length);
$('#hechizos4-plus').click(function (e){
    e.preventDefault();
    addHechizo4();
});

function addHechizo5(input = '', textarea = '', ){
        let table = $('#hechizos5-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos5_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos5-testarea' + total + '" name="hechizos5_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos5-eye" href="#" data-textarea="hechizos5-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos5-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos5-table').data('total',$('#hechizos5-table >tr').length);
$('#hechizos5-plus').click(function (e){
    e.preventDefault();
    addHechizo5();
});

function addHechizo6(input = '', textarea = '', ){
        let table = $('#hechizos6-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos6_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos6-testarea' + total + '" name="hechizos6_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos6-eye" href="#" data-textarea="hechizos6-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos6-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos6-table').data('total',$('#hechizos6-table >tr').length);
$('#hechizos6-plus').click(function (e){
    e.preventDefault();
    addHechizo6();
});

function addHechizo7(input = '', textarea = '', ){
        let table = $('#hechizos7-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos7_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos7-testarea' + total + '" name="hechizos7_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos7-eye" href="#" data-textarea="hechizos7-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos7-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos7-table').data('total',$('#hechizos7-table >tr').length);
$('#hechizos7-plus').click(function (e){
    e.preventDefault();
    addHechizo7();
});

function addHechizo8(input = '', textarea = '', ){
        let table = $('#hechizos8-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos8_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos8-testarea' + total + '" name="hechizos8_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos8-eye" href="#" data-textarea="hechizos8-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos8-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos8-table').data('total',$('#hechizos8-table >tr').length);
$('#hechizos8-plus').click(function (e){
    e.preventDefault();
    addHechizo8();
});

function addHechizo9(input = '', textarea = '', ){
        let table = $('#hechizos9-table');
    if(table.data('total') < 6) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="hechizos9_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <textarea class="d-none" id="hechizos9-testarea' + total + '" name="hechizos9_testarea' + total + '">' + textarea + '</textarea>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary hechizos9-eye" href="#" data-textarea="hechizos9-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary hechizos9-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#hechizos9-table').data('total',$('#hechizos9-table >tr').length);
$('#hechizos9-plus').click(function (e){
    e.preventDefault();
    addHechizo9();
});