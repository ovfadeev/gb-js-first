"use strict";
/**
 * Home work 6
 */

/* --- 1 - 3 --- */
/**
 * Создание элементов
 * @param  {[HTMLElement]} node
 * @param  {[string]} classElement
 * @return {[HTMLElement]}
 */
function createElement(node, classElement){
  var element = document.createElement(node);

  if(typeof classElement !== "undefined"){
    element.classList.add(classElement);
  }

  return element;
}
/**
 * Генерация большой картинки в слайд
 * @param  {[object]} event
 */
function bigPicture(event) {
  var picture = event.target,
      mainViewImages = document.getElementById(classMainViewImages);
  if(picture.classList.contains(classPreviewImg) && removeClassPreview()) {
    mainViewImages.innerHTML = '';
    var bigPicture = picture.cloneNode(true);

    bigPicture.classList.remove(classPreviewImg);
    bigPicture.src = bigPicture.src.replace(previewPath, mainViewPath);
    bigPicture.classList.add(classMainViewImg);

    mainViewImages.appendChild(bigPicture);

    mainViewImages.onerror = checkSrc;

    addClassPreview(picture);
  }
  event.stopPropagation();
}
/**
 * Удаляем из коллекции класс
 */
function removeClassPreview(){
  var previewPic = document.getElementsByClassName(classPreviewImg);
  for (var i = 0; i < previewPic.length; i++) {
    previewPic[i].classList.remove(classPreviewImgView);
  }
  return true;
}
/**
 * Поиск активного элемента маленьких изображений
 * @return {[HTMLElement]} эелемент
 */
function findActivePreview(){
  var previewPic = document.getElementsByClassName(classPreviewImg);
  for (var i = 0; i < previewPic.length; i++) {
    if (previewPic[i].classList.contains(classPreviewImgView)){
      var activePreview = previewPic[i];
      return activePreview;
    }
  }
  return false;
}
/**
 * Добавить класс для элемента маленьких картинок
 * @param {[type]} element [description]
 */
function addClassPreview(element){
  return element.classList.add(classPreviewImgView);
}
/**
 * Создаем галлерею
 * @param  {[string]} galleryClass
 * @param  {[array]} arImages
 */
function createPreviewImages(galleryClass, arImages){
  var gallery = document.getElementById(galleryClass);
  for(var i = 0; i < arImages.length; i++) {
    var img = createElement('img', classPreviewImg),
        path = previewPath + arImages[i];

    img.onerror = checkSrc;

    img.src = path;

    gallery.appendChild(img);
  }

  gallery.addEventListener('click', bigPicture);

}
/**
 * Переключение слайдов
 * @param  {[object]} event
 */
function nextSlide(event){
  event.preventDefault();
  var arrow = event.target;
  var classArrowLeft = 'js-arrow-left';
  var classArrowRight = 'js-arrow-right';
  var activePreview = findActivePreview();
  var pic = null;

  if (arrow.classList.contains(classArrowLeft) && activePreview){
    pic = activePreview.previousElementSibling;
  } else if (arrow.classList.contains(classArrowRight) && activePreview){
    pic = activePreview.nextElementSibling;
  }
  if (pic){
    pic.click();
  }
}
/**
 * Показ слайда
 */
function sliderView(){

  createPreviewImages(classGallery, arImages);

  var viewPic = document.getElementsByClassName(classMainViewImg);
  var previewPic = document.getElementsByClassName(classPreviewImg);
  var mainView = document.getElementById(classMainView);

  mainView.addEventListener('click', nextSlide);

  if (viewPic.length <= 0){
    previewPic[0].click();
  }
}
/**
 * Проверка ошибки
 */
function checkSrc(){
  alert("Ошибка: " + this.src);
}

var classPreviewImg = 'gallery-item';
var classPreviewImgView = 'view';
var classMainViewImg = 'view-orig-img';
var classGallery = 'gallery';
var classMainView = 'main-view';
var classMainViewImages = 'main-view-images';
var classSliderNavigation = 'pager';
var previewPath = 'images/small/';
var mainViewPath = 'images/orig/';
var arImages = ['1.jpg', '2.jpeg', '3.jpg'];

/* --- end --- */

/**
 * Инициализация
 */
function init() {
  sliderView();
}

window.onload = init;