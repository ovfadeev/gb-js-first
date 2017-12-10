"use strict";
/**
 * Home work 5
 */

/* --- 1 --- */

function bildChessBoard(){
  // wrapper
  var divWrapper = document.createElement('div');
  divWrapper.className = classWrapper;
  // bild div chess
  var divChess = document.createElement('div');
  divChess.className = classChess;
  // bild rows
  for (var i = 0; i <= countRowCells; i++) {
    // bild div row
    var divRow = document.createElement('div');
    divRow.className = classRows;
    // bild cells
    for (var j = 0; j <= countRowCells; j++) {
      var divCell = document.createElement('div');

      if ((j != 0 && j != countRowCells) && (i == 0 || i == countRowCells)){ // row cells letters
        divCell.classList.add(classCells, classCellsLetters);
        divCell.innerText = arrLetters[j-1];
      } else if ((j == 0 || j == countRowCells) && (i > 0 && i < countRowCells)){ // cells number
        divCell.classList.add(classCells, classCellsLetters);
        divCell.innerText = arrNumbers[i-1];
      } else if (j != 0 && j != countRowCells){ // cells collor

        if ((j % 2 - i % 2) == 0){ // grey
          divCell.classList.add(classCells, arrCellsClassBack[0]);
        } else { // brown
          divCell.classList.add(classCells, arrCellsClassBack[1]);
        }

        if (i > 0 && i < 3){
          divCell.classList.add(arrCellsClassText[0]);
        } else if (i > 6 && i < countRowCells){
          divCell.classList.add(arrCellsClassText[1]);
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
  return divWrapper;
}

var arrLetters = ['A', 'B', 'C', 'D', 'I', 'F', 'G', 'H'],
    arrNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'],
    arrCellsClassBack = ['grey', 'brown'],
    arrCellsClassText = ['white', 'black'],
    arrFiguresChess = ['', '', '', '', '', '', '', '', '', ''],
    classCells = 'cell',
    classCellsLetters = 'letters',
    classRows = 'row',
    classChess = 'chess',
    countRowCells = 9,
    classWrapper = 'wrapper';

document.body.appendChild(bildChessBoard());

/* --- end --- */