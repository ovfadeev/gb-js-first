"use strict";
/**
 * Home work 5
 */

/**
 * Создаём html элемент
 * @param  {[node]} node
 * @param  {[string]} classElement класс элемента
 * @return {[node]} html эелемент с классом
 */
function createElement(node, classElement){
  var element = document.createElement(node);

  element.classList.add(classElement);

  return element;
}
/**
 * Создаем шахматные фигуры в ячейке
 * @param  {[node]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[node]}
 */
function createChessPieces(element, row, cell){
  if (cell != 0 && cell != countRowCells){
    if (row > 0 && row < 3){
      element.classList.add(arrCellsClassText[0]);

      if (row == 1){
        element.innerText = arrFiguresChess[cell - 1];
      } else if (row == 2){
        element.innerText = arrFiguresChess[countRowCells - 1];
      }
    } else if (row > countRowCells - 3 && row < countRowCells){
      element.classList.add(arrCellsClassText[1]);

      if (row == countRowCells - 2){
        element.innerText = arrFiguresChess[countRowCells - 1];
      } else if (row == countRowCells - 1){
        element.innerText = arrFiguresChess[cell - 1];
      }
    }
  }

  return element;
}
/**
 * Закрашиваем ячейку
 * @param  {[node]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[node]}
 */
function addColorCells(element, row, cell){
  if (cell != 0 && cell != countRowCells){
    if ((cell % 2 - row % 2) == 0){ // grey
      element.classList.add(arrCellsClassBack[0]);
    } else { // brown
      element.classList.add(arrCellsClassBack[1]);
    }
  }

  return element;
}
/**
 * Добавлем цифру ряда в ячейку
 * @param {[node]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[node]}
 */
function addNumbersCells(element, row, cell){
  if (cell == 0 || cell == countRowCells){
    element.innerText = row;
  }

  return element;
}
/**
 * Добавляем букву в ячейку
 * @param  {[node]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[node]}
 */
function addLettersCells(element, row, cell){
  if (cell != 0 && cell != countRowCells && (row == 0 || row == countRowCells)){
    element.innerText = arrLetters[cell - 1];
  }

  return element;
}
/**
 * Создаём ячейку в шахматах
 * @param  {[node]} parentNode нода ряда
 * @param  {[number]} row числовое значение ряда
 * @return {[node]}
 */
function createCells(parentNode, row){
  // create cells
  for (var i = 0; i <= countRowCells; i++) {
    // create div cell
    var divCell = createElement('div', classCells);

    if (row > 0 && row < countRowCells){
      // add numbers rows
      divCell = addNumbersCells(divCell, row, i);
      // create color cell
      divCell = addColorCells(divCell, row, i);
      // create chess pieces
      divCell = createChessPieces(divCell, row, i);
    } else {
      // add letters cells
      divCell = addLettersCells(divCell, row, i);
    }
    // append cell
    parentNode.appendChild(divCell);
  }

  return parentNode;
}
/**
 * Создаем ряд в шахматах
 * @param  {[node]} parentNode родительский элемент
 * @return {[node]}
 */
function createRowsChess(parentNode){
  // create rows
  for (var i = 0; i <= countRowCells; i++) {
    // create div row
    var divRow = createElement('div', classRows);

    divRow = createCells(divRow, i);
    // append row
    parentNode.appendChild(divRow);
  }
  return parentNode;
}
/**
 * Создаем шахматную доску
 * @return {[node]}
 */
function createChessBoard(){
  // create div wrapper
  var divWrapper = createElement('div', classWrapper);
  // create div chess
  var divChess = createElement('div', classChess);

  divChess = createRowsChess(divChess);
  // append chess to wrapper
  divWrapper.appendChild(divChess);

  return divWrapper;
}

var arrLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    arrCellsClassBack = ['grey', 'brown'],
    arrCellsClassText = ['text-white', 'text-black'],
    arrFiguresChess = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟'],
    classCells = 'cell',
    classRows = 'row',
    classChess = 'chess',
    classWrapper = 'wrapper',
    countRowCells = 9;

document.body.appendChild(createChessBoard());