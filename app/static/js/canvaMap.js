$(document).ready(function(){
   $( "#formEvento" ).submit(function( event ) {
    event.preventDefault();
    $.ajax({
            type: "POST",
            data: $(this).serialize(),
            dataType: 'html'
        }).done(function(data) {
        })
    });


    let eventos = document.getElementById("listEventos").value
    eventos = JSON.parse(eventos); Object.keys(eventos).forEach(function (key) {
        var val = eventos[key];
        val.identificador = key;
        crearImg(key,"/static/img/dungeon.png",parseInt(val.posx), parseInt(val.posy), 100, 100);
        listaEventos.push(val);
    });
    crearCiudades();
    document.getElementById("buttonCrearEvento").addEventListener("click", function(event) {
        let src = "/static/img/dungeon.png"
        let fecha = document.getElementById("dateFechaEvento").value.toString();
        document.getElementById("textFechaEvento").value = fecha
        let evento = crearObjetoEvento(document.getElementById("textid").value, document.getElementById("textNombreEvento").value,
            document.getElementById("textDescripcionEvento").value,fecha,
            document.getElementById("textposX").value, document.getElementById("textposY").value);
        crearImg(evento.identificador,src , parseInt(evento.posx), parseInt(evento.posy), 100, 100);
        listaEventos.push(evento);
    });

    document.getElementById("buttonViajar").addEventListener("click", function(event) {
        let imgAventurero = getImagenAventurero();
        let posx = parseInt(document.getElementById("infoPosx").value);
        let posy = parseInt(document.getElementById("infoPosy").value);
        let id = idAnimation; idAnimation ++;
        window.localStorage.clear();
        window.localStorage.setItem('posx', document.getElementById("infoPosx").value);
        window.localStorage.setItem('posy', document.getElementById("infoPosy").value);
         imgAventurero.animate({left: posx, top: posy }, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function() {
            },
            easing: fabric.util.ease["easeInQuad"]
            });
    });
});

var canvas = new fabric.Canvas('canvas');
var listaImagenes = [];
var canvasWidth = 1300;
var canvasHeight = 700;
var listaEventos = [];
var idAnimation = 0;

canvas.setWidth(canvasWidth);
canvas.setHeight(canvasHeight);

var imageUrl = "/static/img/background.png";
fabric.Image.fromURL(imageUrl, function(myImg) {
     var img1 = myImg.set({ left: 0, top: 0 ,width: canvas.getWidth(),height: canvas.getHeight()});
     canvas.setBackgroundImage(img1, canvas.renderAll.bind(canvas), {
    scaleX: canvas.width / img1.width,
   scaleY: canvas.height / img1.height
    });
     });


canvas.on('object:selected', function(options) {
        let img = options.target;
    if(img.id !== 0){
        listaEventos.forEach(function (evento) {
            if (evento.identificador === img.id) {
                document.getElementById("modalTitulo").innerHTML = evento.name;
                document.getElementById("InfoDescripcion").innerHTML = evento.description;
                document.getElementById("InfoFecha").innerHTML = evento.date;
                document.getElementById("infoPosx").value = evento.posx;
                document.getElementById("infoPosy").value = evento.posy;
            }
        });
        let myModal = new bootstrap.Modal(document.getElementById('modal-informacio'), {
            keyboard: false
        })
        myModal.show();
    }
        canvas.discardActiveObject();
});



function getImagenAventurero(){
    let aventurero = null;
    listaImagenes.forEach(function(imagen){
        if(imagen.id === 0) aventurero = imagen;
        });
    return aventurero;
}


function crearImg(id, url, left, top, width = null, height = null){
    fabric.Image.fromURL(url, function(myImg) {
     var img1 = myImg.set({ left: left, top: top ,width:(width === null?100:width),height:(height === null?100:height)});
     canvas.add(img1);
     img1.id = id;
     listaImagenes.push(img1);
});
}

function moverImg(id,lefta, topa, src,newWidth, newHeight){
    let img = canvasGetElementById(id);
    if(img !== null){
    img.set({
		left: lefta,
		top: topa,
        width: newWidth,
        height: newHeight
	});
    canvas.renderAll();
    canvas.calcOffset();
    }else{
        crearImg(id, src, lefta, topa, newWidth, newHeight);
    }
}

function eliminarImg(id){
    let img = canvasGetElementById(id);
    canvas.remove(img);
    listaImagenes = arrayRemove(listaImagenes, img);
}

function canvasGetElementById(id){
    let img = null;
    listaImagenes.forEach(function(element) {
     if(element.id === id){
            img = element;
        }
    });
    return img;
}

function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}


function handleDrop(e) {
    e.preventDefault();
    document.getElementById("textposX").value = e.layerX - 50;
    document.getElementById("textposY").value = e.layerY - 50;
    let id = Math.random();
    document.getElementById("textid").value = id;
    let myModal = new bootstrap.Modal(document.getElementById('modal-creacion'), {
     keyboard: false
    })
    myModal.show();
    return false;
}



function crearObjetoEvento(id, nombre, descripcion, fecha, posicionx, posiciony){
    let evento = new Object();
    evento.identificador = id;
    evento.name = nombre;
    evento.description = descripcion;
    evento.date = fecha;
    evento.posx = posicionx;
    evento.posy = posiciony;
    return evento;
}

function crearCiudades(){let src = "/static/img/fortification.png"
    let ciudad = crearObjetoEvento("1", "Aguaslivianas", "Ciudad portuaria famosa por su maga-alcaldesa", " ", 511, 542);
    crearImg(ciudad.identificador,src , parseInt(ciudad.posx), parseInt(ciudad.posy), 100, 100);
    listaEventos.push(ciudad);
    ciudad = crearObjetoEvento("2", "Puerta de Bartolomeo", "Espléndida ciudad amurallada conocida pr su comercio", " ", 842, 552);
    crearImg(ciudad.identificador,src , parseInt(ciudad.posx), parseInt(ciudad.posy), 100, 100);
    listaEventos.push(ciudad);
    ciudad = crearObjetoEvento("3", "Nuncaverano", "Puesto avanzado montañoso. Es inhóspito y helado, como sus habitantes", " ", 508, 191);
    crearImg(ciudad.identificador,src , parseInt(ciudad.posx), parseInt(ciudad.posy), 100, 100);
    listaEventos.push(ciudad);
    ciudad = crearObjetoEvento("4", "Ciudad de cobre", "Antes esplendorosa, ahora en decadencia. Aquí se congregan aventureros de la peor clase", " ", 904, 128);
    crearImg(ciudad.identificador,src , parseInt(ciudad.posx), parseInt(ciudad.posy), 100, 100);
    listaEventos.push(ciudad);
    ciudad = crearObjetoEvento("5", "Casita de Helm", "Pueblo que se formó alrededor de la residencia de verano del famoso herrero", " ", 270, 282);
    crearImg(ciudad.identificador,src , parseInt(ciudad.posx), parseInt(ciudad.posy), 100, 100);
    listaEventos.push(ciudad);
    src = "/static/img/adventurer.png"
    let posx = parseInt(window.localStorage.getItem('posx'));
    let posy = parseInt(window.localStorage.getItem('posy'));
    if(posx == NaN || posy == NaN){
        posx = 511; posy = 542;
        window.localStorage.setItem('posx', posx);
        window.localStorage.setItem('posy', posy);
    }
    crearImg(0, src, posx, posy, 100, 100);
}


function handleDragEnd(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (Modernizr.draganddrop) {
    var images = document.querySelectorAll('#imagesS img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    var canvasContainer = document.getElementById('canvas-mapa');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
} else {
    alert("Este navegador no es compatible con alguna de las funcionalidades de esta aplicación, y puede que no funcione correctamente.");
}

function arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele !== value;
        });
   }
