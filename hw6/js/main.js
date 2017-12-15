"use strict";
/**
 * Home work 5
 */

/* --- 1 --- */
function bigPicture(event) {
  var picture = event.target;
  if(picture.classList.contains(classPreviewImg)) {
    mainView.innerHTML = '';

    var bigPicture = picture.cloneNode(true);
    bigPicture.classList.remove(classPreviewImg);
    bigPicture.src = bigPicture.src.replace(previewPath, mainViewPath);
    bigPicture.classList.add(classMainViewImg);

    mainView.appendChild(bigPicture);

    mainView.onerror = checkSrc;
  }
  event.stopPropagation();
}

function sliderView(){
  var viewPic = document.getElementsByClassName(classMainViewImg),
      previewPic = document.getElementsByClassName(classPreviewImg);

  gallery.addEventListener('click', bigPicture);

  if (viewPic.length <= 0){
    previewPic[0].click();
  }
  console.log(view);
}

function checkSrc(){
  alert("Ошибка: " + this.src);
}

function init() {
  for(var i = 0; i < pictures.length; i++) {
    var img = document.createElement('img');
    img.src = previewPath + pictures[i];
    img.classList.add(classPreviewImg);

    gallery.appendChild(img);

    img.onerror = checkSrc;
  }

  sliderView();

}

var classPreviewImg = 'gallery-item',
    classPreviewImgView = 'view',
    classMainViewImg = 'view-orig-img',
    classGallery = 'gallery',
    classMainView = 'mainView',
    previewPath = 'images/small/',
    mainViewPath = 'images/orig/',
    pictures = ['1.jpg', '2.jpeg', '3.jpg'],
    gallery = document.getElementById(classGallery),
    mainView = document.getElementById(classMainView);

window.onload = init;
/* --- end --- */