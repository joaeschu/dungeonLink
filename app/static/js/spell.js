document.getElementById('button-guarda').addEventListener("click", function(event) {
    document.getElementById('castingAbility').value = "3";
});

new TomSelect("#trucos-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

new TomSelect("#conjuros-selector",{
    plugins: ['remove_button'],
	maxItems: 4
});

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
function deleteEvent(){
    $('.rasgos-delete').unbind('click').click(function (e) {
        e.preventDefault();
               $(this).parent().parent().remove();
    });
}
function deleteAllRasgos(){
     var node = document.getElementById('rasgos-table');
     node.innerHTML = "";
}
eyeEvent()
deleteEvent()
function addRasgo(input = '', textarea = '', ){
        let table = $('#trucos-table');
    if(table.data('total') < 28) {
        let total = table.data('total') + 1;
        table.data('total', total);
        let tr = '<tr>\n' +
            '                <td  colspan="2">\n' +
            '                    <input name="rasgos_input' + total + '" type="text" value="' + input + '" />\n' +
            '                    <div class="d-none" id="rasgos-testarea' + total + '">Test1: <textarea name="rasgos_testarea' + total + '">' + textarea + '</textarea><br>Test2: <textarea name="rasgos_testarea2' + total + '">' + textarea + '</textarea></div>\n' +
            '                </td>\n' +
            '                  <td style="vertical-align:top;"><a class="badge bg-secondary rasgos-eye" href="#" data-textarea="rasgos-testarea' + total + '"><i class="bi bi-eye-fill"></i></a>' +
            '                   <a class="badge bg-secondary rasgos-delete" href="#"><i class="bi bi-x-circle-fill"></i></a>' +
            '              </tr>';
        table.append(tr);
        eyeEvent();
        deleteEvent();
    }
}
$('#trucos-table').data('total',$('#trucos-table >tr').length);
$('#rasgos-plus').click(function (e){
    e.preventDefault();
    addRasgo();
});