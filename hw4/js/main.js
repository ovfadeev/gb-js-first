"use strict";
/**
 * Home work 4
 */

/* --- 1 --- */

/**
 * Число в объект
 * @param  {[integer]} n число
 * @return {[object]} объект
 */
function numberToObject(n){
	var obj = {};

  if (+n > 999) {
    console.log('Ошибка! Введите число меньше 1000.');

    getNumber();

  } else if (+n <= 999 && +n >= 0) {
    var arr = numberToArray(+n);

    switch(arr.length){
      case 3:
           obj = {
            'сотни': parseInt(arr[0]),
            'десятки': parseInt(arr[1]),
            'единицы': parseInt(arr[2]),
          }
        break;
      case 2:
          obj = {
            'десятки': parseInt(arr[0]),
            'единицы': parseInt(arr[1]),
          }
        break;
      case 1:
          obj = {
            'единицы': parseInt(arr[0]),
          }
        break;
    }

  } else {
    getNumber();
  }

  console.log(obj);
}
/**
 * Число в массив
 * @param  {[integer]} n число
 * @return {[array]} массив
 */
function numberToArray(n){
  return String(+n).split("");
}
/**
 * Запрос на число
 */
function getNumber(){
  var number = prompt("Введите число (меньше 1000)", 0);
  numberToObject(+number);
}

getNumber();

/* --- end --- */

/* --- 2 --- */
// папка game
/* --- end --- */

/* --- 3 --- */
// вопросы
var question = {
  '1': {
    param: "Кто написал роман: Война и мир?\n\rA - Пушкин А.С\n\rB - Чехов А.П.\n\rC - Толстой Л.Н.\n\rD - Лермонтов М.Ю.",
    correct: 'C',
  },
  '2': {
    param: "Где, если верить пословице, любопытной Варваре нос оторвали\n\rA - В магазине\n\rB - На базаре\n\rC - У палатки\n\rD - На рынке",
    correct: 'B',
  },
};
// вознаграждение
var reward = ['0 рублей', '100 рублей', '500 рублей'];
// количество правильных ответов
var correctAnswer = 0;

inviteGame();

/**
 * Приглашение на игру
 */
function inviteGame(){
  correctAnswer = 0; // обнуляем количество правильных ответов, если уже была игра
  var res = prompt('Хотите поиграть в игру? 1 - Игра, 0 - выход', 1); // запрашиваем согласие на игру
  if (+res > 1){
    inviteGame();
  } else if (+res == 1){
    onGame(); // начинаем игру
  }
}
/**
 * Конец игры
 */
function gameOver(countCorrectAnswer){
  if (countCorrectAnswer <= Object.keys(reward).length && countCorrectAnswer > 0){
    alert('Поздравляем! Ваш выйгрыш составил - ' + reward[countCorrectAnswer]); // выйгрыш
  } else {
    alert('Упс! Ваш выйгрыш составил - ' + reward[countCorrectAnswer]); // не правильный ответ
  }
  inviteGame();
}
/**
 * Првоеряем правильный ответ
 * @param  {[integer]} numberQuestion номер вопроса
 * @param  {[string]} answer ответ
 * @return {[bool]}
 */
function checkAnswer(numberQuestion, answer){
  if (answer == question[numberQuestion].correct){
    correctAnswer++;
    return true;
  }
  return false;
}
/**
 * Игра
 */
function onGame(){
  var gameRunning = true;

  while (gameRunning){

    if (!gameRunning){

      gameOver(correctAnswer);

    } else {
      var numberQuestion = correctAnswer + 1;

      if (numberQuestion > Object.keys(question).length) { // если закончились вопросы
        gameRunning = false;
      } else {
        var answer = prompt(question[numberQuestion].param), // запрашиваем ответ на вопрос

            result = checkAnswer(numberQuestion, answer); // сверяем ответ на вопрос

        if (result === false){ // если не правильный ответ
          gameRunning = false;
        }

      }

    }
  }
  gameOver(correctAnswer); // игра окончена
}


/* --- end --- */