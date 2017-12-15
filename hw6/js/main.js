"use strict";
/**
 * Home work 5
 */

/* --- 1 --- */
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
 * Показываем слайд
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
    var img = createElement('img', classPreviewImg);
    img.src = previewPath + arImages[i];

    img.setAttribute('data-id', i);

    gallery.appendChild(img);

    img.onerror = checkSrc;
  }

  gallery.addEventListener('click', bigPicture);

}
/**
 * Переключение слайдов
 * @param  {[object]} event
 */
function nextSlide(event){
  event.preventDefault();
  var arrow = event.target,
      classArrowLeft = 'js-arrow-left',
      classArrowRight = 'js-arrow-right',
      activePreview = findActivePreview(),
      pic = null;
  if (arrow.classList.contains(classArrowLeft) && activePreview){
    pic = activePreview.previousElementSibling;
  } else if (arrow.classList.contains(classArrowRight) && activePreview){
    pic = activePreview.nextElementSibling;
  }
  if (pic !== null){
    pic.click();
  }
}
/**
 * Показ слайда
 */
function sliderView(){
  var viewPic = document.getElementsByClassName(classMainViewImg),
      previewPic = document.getElementsByClassName(classPreviewImg),
      mainView = document.getElementById(classMainView);

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
/**
 * Инициализация
 */
function init() {
  createPreviewImages(classGallery, arImages);
  sliderView();
}

var classPreviewImg = 'gallery-item',
    classPreviewImgView = 'view',
    classMainViewImg = 'view-orig-img',
    classGallery = 'gallery',
    classMainView = 'main-view',
    classMainViewImages = 'main-view-images',
    classSliderNavigation = 'pager',
    previewPath = 'images/small/',
    mainViewPath = 'images/orig/',
    arImages = ['1.jpg', '2.jpeg', '3.jpg'];

window.onload = init;
/* --- end --- */