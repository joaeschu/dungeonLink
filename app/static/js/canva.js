$(document).ready(function(){
    var socket = io();
    let idUsuario = document.getElementById("emailUsuario").value;
    socket.emit('message',JSON.stringify({type:'load', idUser: idUsuario}));
    socket.on('message', function(msg) {
        msg = JSON.parse(msg);
        switch (msg.type){
            case 'load':
                if(msg.idUser !== idUsuario) {
                    listaImagenes.forEach(function (img) {
                        socket.emit('message', JSON.stringify({
                            type: 'movedImg',
                            idUser: idUsuario,
                            idImg: img.id,
                            srcImg: img._element.src,
                            left: img.left,
                            top: img.top,
                            width: img.width,
                            height: img.height
                        }))
                    });
                }
                break;
            case 'chat':
                escribirMensaje(msg.content);
                break;
            case 'newImg':
                if(msg.idUser !== idUsuario){
                    crearImg(msg.idImg, msg.srcImg, msg.left, msg.top);
                }
                break;
            case 'modifiedImg':
                if(msg.idUser !== idUsuario) {
                    moverImg(msg.idImg, msg.left, msg.top, msg.srcImg, msg.width, msg.height);
                }
                break;
            case 'movedImg':
                if(msg.idUser !== idUsuario) {
                    moverImg(msg.idImg, msg.left, msg.top, msg.srcImg, msg.width, msg.height);
                }
                break;
            case 'deletedImg':
                if(msg.idUser !== idUsuario) {
                    eliminarImg(msg.idImg);
                }
                break;
            case 'exchange':
                if(msg.idUser !== idUsuario) {
                    let posx = parseInt(window.localStorage.getItem('posx'));
                    let posy = parseInt(window.localStorage.getItem('posy'));
                    if(posx === parseInt(msg.posx) && posy === parseInt(msg.posy)){
                        let listaItems = getEquipmentList();
                         socket.emit('message', JSON.stringify({
                            type: 'exchangeReply',
                             player: {idUser: idUsuario, posx: posx, posy: posy, nameUser: document.getElementById("nombreUsuario").value},
                            idDest: msg.idUser,
                        }))
                    }
                }
                break;
        }
    });
});

/* Drag and Drop code adapted from http://www.html5rocks.com/en/tutorials/dnd/basics/ */

var canvas = new fabric.Canvas('canvas');
var listaImagenes = [];
var idImagen = 0;
var grid = 100;
var unitScale = 10;
var canvasWidth = 1300;
var canvasHeight = 700;
var listaUsuariosConEquipo = [];

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

for (var i = 0; i < (canvasWidth / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, canvasHeight], { type:'line', stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, canvasWidth, i * grid], { type: 'line', stroke: '#ccc', selectable: false }))
}


canvas.on('object:moving', function(options) {
    let idUsuario = document.getElementById("emailUsuario").value;
    let imgleft = Math.round(options.target.left / grid) * grid;
    let imgtop = Math.round(options.target.top / grid) * grid;
  options.target.set({
    left: imgleft,
    top: imgtop
  });
  canvas.renderAll();
    canvas.calcOffset();
 let img =  options.target;
    socket.emit('message',JSON.stringify({type:'movedImg',idUser: idUsuario, idImg: img.id,srcImg:img._element.src , left:img.left, top:img.top,
        width:img.width, height:img.height}));
});

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

canvas.on('object:modified', function(options) {
    let idUsuario = document.getElementById("emailUsuario").value;
	var newWidth = (Math.round(options.target.getWidth() / grid)) * grid;
	var newHeight = (Math.round(options.target.getHeight() / grid)) * grid;
	options.target.set({
		width: newWidth,
		height: newHeight,
		scaleX: 1,
		scaleY: 1
	});
    imgID = options.target.id;
    canvas.renderAll();
    canvas.calcOffset();
 let img =  options.target;
   socket.emit('message',JSON.stringify({type:'modifiedImg',idUser: idUsuario, idImg: img.id, srcImg: img._element.src ,left:img.left, top:img.top,
       width:img.width, height:img.height}));
});

document.getElementById("deleteSelectedImage").addEventListener('click', () => {
    let idUsuario = document.getElementById("emailUsuario").value;
    img = canvas.getActiveObject();
    canvas.remove(img);
    listaImagenes = arrayRemove(listaImagenes, img);
    socket.emit('message',JSON.stringify({type:'deletedImg',idUser: idUsuario, idImg: img.id}));
})

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




function crearImg(id, url, left, top, width = null, height = null){
    fabric.Image.fromURL(url, function(myImg) {
     var img1 = myImg.set({ left: left, top: top ,width:(width === null?100:width),height:(height === null?100:height)});
     img1.id = id;
     canvas.add(img1);
     listaImagenes.push(img1);
});
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
    let idUsuario = document.getElementById("emailUsuario").value;
    var img = document.querySelector('#images img.img_dragging');
    let imgLeft = Math.round(e.layerX / grid) * grid;
    let imgTop = Math.round(e.layerY / grid) * grid ;
    var newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        // Set the center of the new object based on the event coordinates relative
        // to the canvas container.
        left: imgLeft,
        top: imgTop
    });
    let imgID =''+ idUsuario + idImagen;
    idImagen++;
    newImage.id = imgID;
    canvas.add(newImage);
    listaImagenes.push(newImage);
    socket.emit('message',JSON.stringify({type:'newImg',idUser: idUsuario,idImg: imgID,srcImg:img.src, left:imgLeft, top:imgTop}));
    canvas.setActiveObject(newImage);
    return false;
}

function handleDragEnd(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (Modernizr.draganddrop) {
    var images = document.querySelectorAll('#images img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
} else {
    alert("Este navegador no es compatible con alguna de las funcionalidades de esta aplicación, por lo que puede que no funcione correctamente.");
}

document.getElementById("drawingModeSelect").onclick = function() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
      document.getElementById("drawingModeSelect").innerHTML = 'Desactivar dibujo';
      document.getElementById("drawing-color").style.display = '';
    }
    else {
      document.getElementById("drawingModeSelect").innerHTML = 'Activar dibujo';
      document.getElementById("drawing-color").style.display = 'none';
    }
  };

document.getElementById("drawing-color").onchange = function() {
    var brush = canvas.freeDrawingBrush;
    brush.color = this.value;
  };

  document.getElementById("clearDrawing").onclick = function() {
      canvas.clear();
      listaImagenes = [];
      for (var i = 0; i < (canvasWidth / grid); i++) {
        canvas.add(new fabric.Line([ i * grid, 0, i * grid, canvasHeight], { type:'line', stroke: '#ccc', selectable: false }));
        canvas.add(new fabric.Line([ 0, i * grid, canvasWidth, i * grid], { type: 'line', stroke: '#ccc', selectable: false }))
        }
      let idUsuario = document.getElementById("emailUsuario").value;
      socket.emit('message',JSON.stringify({type:'load',idUser: idUsuario}));
  };

  function arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele !== value;
        });
   }



   //Código para emitir lo dibujado a los demás jugadores
/* var is_down = false;
canvas_left.on ('mouse:down', function (ev) {
    let idUsuario = document.getElementById("emailUsuario").value;
    let colorPincel = document.getElementById("drawing-color").value;
    if(canvas.isDrawingMode){is_down = true;
    socket.emit('message',JSON.stringify({type:'mouseDown',idUser: idUsuario, pointer: this.getPointer(ev.e), color: colorPincel}));
	return true;
    }
	});
canvas_left.on ('mouse:move', function (ev) {
	if (!is_down)
		return true;
	handle_mouse_drag (count, this.getPointer(ev.e));
	return true;
});
canvas_left.on ('mouse:up', function (ev) {
	is_down = false;
	handle_mouse_up (count, this.getPointer(ev.e));
	return true;
});


var remote_brush = {};
function handle_mouse_down (id, point, color) {
	var brush;
	if (!remote_brush[id]) {
		remote_brush [id] = new fabric.PencilBrush(canvas_right);
	}

	brush = remote_brush [id];

	brush.onMouseDown (point);
}

function handle_mouse_drag (id, point) {
	var brush = remote_brush [id];

  if (brush)
	    brush.onMouseMove (point);
}

function handle_mouse_up (id, point) {
	var brush = remote_brush [id];

	brush.onMouseUp (point);

	delete remote_brush [id];
} */