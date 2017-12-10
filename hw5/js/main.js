"use strict";
/**
 * Home work 5
 */

/* --- 1 --- */

var arrLetters = ['A', 'B', 'C', 'D', 'I', 'F', 'G', 'H'],
    arrNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'],
    arrCellsClass = ['grey', 'brown'],
    arrFiguresChess = ['', '', '', '', '', '', '', '', '', ''],
    classCells = 'cell',
    classCellsLetters = 'letters',
    classRows = 'row',
    classChess = 'chess',
    countRowCells = 10,
    classWrapper = 'wrapper';

console.log(arrLetters);
console.log(arrNumbers);

bildChessBoard();

function bildRows(){
  // bild divs cell letters

  return divRow;
}

function bildChessBoard(){
  // wrapper
  var divWrapper = document.createElement('div');
  divWrapper.className = classWrapper;
  // bild div chess
  var divChess = document.createElement('div');
  divChess.className = classChess;
  // bild rows
  for (var i = 0; i < countRowCells; i++) {
    // bild div row
    var divRow = document.createElement('div');
    divRow.className = classRows;
    // bild cells
    for (var j = 0; j < countRowCells; j++) {
      var divCell = document.createElement('div');

      if ((j != 0 && j != countRowCells - 1) && (i == 0 || i == countRowCells - 1)){ // row cells letters
        divCell.className = classCells + ' ' + classCellsLetters;
        divCell.innerText = arrLetters[j-1];
      } else if ((j == 0 || j == countRowCells - 1) && (i > 0 && i < countRowCells - 1)){ // cells number
        divCell.className = classCells + ' ' + classCellsLetters;
        divCell.innerText = arrNumbers[i-1];
      } else if (j != 0 && j != countRowCells - 1){ // cells collor

        if ((j % 2 - i % 2) == 0){ // grey
          divCell.className = classCells + ' ' + arrCellsClass[0];
        } else { // brown
          divCell.className = classCells + ' ' + arrCellsClass[1];
        }

      } else { // cells empty
        divCell.className = classCells;
      }
      // append cell
      divRow.appendChild(divCell);
    }
    // append row
    divChess.appendChild(divRow);
  }
  // append chess to wrapper
  divWrapper.appendChild(divChess);
  // append chess to body
  document.body.appendChild(divWrapper);
}

/* --- end --- */