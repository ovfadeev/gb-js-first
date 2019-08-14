"use strict";
/**
 * Home work 2
 */
// 1
// var a = 1, b = 1, c, d;
// c = ++a; alert(c); // 2 // сначала инкрементирование, потом присваивание a
// d = b++; alert(d); // 1 // сначала присваивание b, потом инкрементирование
// c = (2 + ++a); alert(c); // 5 // уже было увеличение a, сначала а увеличилось потом сложилось
// d = (2 + b++); alert(d); // 4 // уже было увеличение b, сначала сложение потом увеличение b
// alert(a); // 3 // a=3
// alert(b); // 3 // b=3
//
// 2
// var a = 2;
// var x = 1 + (a *= 2); // = 5, a умножается на 2
//

/* 3 --- write sum --- */

var a = 3,
	b = -3,
	c;
if (a >= 0 && b >= 0) {
	c = a - b;
} else if (a < 0 && b < 0) {
	c = a * b;
} else {
	c = a + b;
}
alert(c);

/* --- end --- */

/* 4 --- write range --- */

var a = 5,
	c = '';
switch (a) {
	case 0:
		c += '0, ';
	case 1:
		c += '1, ';
	case 2:
		c += '2, ';
	case 3:
		c += '3, ';
	case 4:
		c += '4, ';
	case 5:
		c += '5, ';
	case 6:
		c += '6, ';
	case 7:
		c += '7, ';
	case 8:
		c += '8, ';
	case 9:
		c += '9, ';
	case 10:
		c += '10, ';
	case 11:
		c += '11, ';
	case 12:
		c += '12, ';
	case 13:
		c += '13, ';
	case 14:
		c += '14, ';
	case 15:
		c += '15 ';

}
alert(c);

/* --- end --- */

/* 5 --- write function arithmetics --- */

function numberAddition(a, b){
	return a + b;
}
function numberSubtraction(a, b){
	return a - b;
}
function numberMultiplication(a, b){
	return a * b;
}
function numberDivision(a, b){
	return a / b;
}

var a = 2,
	b = 5;
alert(numberMultiplication(a,b)); // *

var a = 10,
	b = 2;
alert(numberDivision(a,b)); // /

var a = 30,
	b = 5;
alert(numberSubtraction(a,b)); // -

var a = 3,
	b = 9;
alert(numberAddition(a,b));

/* --- end --- */

/* 6 --- write function mathOperation --- */

function mathOperation(arg1, arg2, operation) {
	switch (operation) {
		case '+':
			return numberAddition(arg1, arg2);
			break;
		case '-':
			return numberSubtraction(arg1, arg2);
			break;
		case '*':
			return numberMultiplication(arg1, arg2);
			break;
		case '/':
			return numberDivision(arg1, arg2);
			break;
	}
}

var a = 2,
	b = 5,
	op = '*';
alert(mathOperation(a,b,op));

/* --- end --- */