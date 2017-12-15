"use strict";
/**
 * Home work 6
 */

/* --- 2 --- */

function createElement(node, classElement){
  var element = document.createElement(node);

  if(classElement){
    element.classList.add(classElement);
  }

  return element;
}

function findElementCart(idProduct){
  var cartItems = document.getElementsByClassName(classCartItems);

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].dataset.product == idProduct){
      return cartItems[i];
    }
  }
}

function createElementCart(idProduct, nameProduct, priceProduct, quantity) {
  var cartItem = createElement('div', classCartItems);
  var cartItemName = createElement('div', classCartItemsName);
  var cartItemPrice = createElement('div', classCartItemsPrice);
  var cartItemCount = createElement('div', classCartItemsCount);

  cartItem.dataset.product = idProduct;
  cartItem.dataset.price = priceProduct;
  cartItem.dataset.quantity = quantity;

  cartItemCount.setAttribute('id', classCartItemsCount + '-' + idProduct);

  cartItemName.innerText = nameProduct;
  cartItemPrice.innerText = priceProduct;
  cartItemCount.innerText = quantity;

  cartItem.appendChild(cartItemName);
  cartItem.appendChild(cartItemPrice);
  cartItem.appendChild(cartItemCount);
  return cartItem;
}

function updateTotalSum(){
  var cartItems = document.getElementsByClassName(classCartItems);
  var totalSum = 0;
  var totalSumElement = document.getElementById(classTotalSum);

  if (cartItems.length > 0){
    for (var i = 0; i < cartItems.length; i++) {
      var price = cartItems[i].dataset.price;
      var quantity = cartItems[i].dataset.quantity;

      totalSum += quantity * price;
    }
    totalSumElement.innerText = totalSum;
  }
}

function updateCartItem(cartItem){
  var idProduct = cartItem.dataset.product;
  var quantity = cartItem.dataset.quantity;
  var itemQuantity = cartItem.lastChild;

  quantity = +quantity + defaultQuantityAddCart;

  cartItem.setAttribute('data-quantity', quantity);
  itemQuantity.innerText = quantity;
}

function addToCart(event){
  event.preventDefault();
  var button = event.target;
  if(button.classList.contains(classButtonAddtoCart)) {
    var idProduct = button.dataset.product;
    var nameProduct = button.dataset.name;
    var priceProduct = button.dataset.price;
    var cartItem = findElementCart(idProduct);

    if (cartItem) {
      updateCartItem(cartItem, defaultQuantityAddCart);
    } else {
      var cart = document.getElementById(classCart),
          totalSum = document.getElementById(classTotalSum),
          cartItem = createElementCart(idProduct, nameProduct, priceProduct, defaultQuantityAddCart);

      cart.appendChild(cartItem);
    }
    updateTotalSum();
  }
  event.stopPropagation();
}
/* --- end --- */

var productList = document.getElementById('product-list');
var classButtonAddtoCart = 'product-add-cart';
var classTotalSum = 'total-price';
var classCart = 'cart-items';
var classCartItems = 'cart-item';
var classCartItemsName = 'item-name';
var classCartItemsPrice = 'item-price';
var classCartItemsCount = 'item-count';
var defaultQuantityAddCart = 1;

/**
 * Инициализация
 */
function init() {
  productList.addEventListener('click', addToCart);
}



window.onload = init;