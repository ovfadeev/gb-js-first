"use strict";
/**
 * Home work 3
 */

/* --- 1 вывести простые числа --- */
var i = 2;
while(i <= 100){
	var view = true;
	for (var j = 2; j < i; j++) {
		if (i % j == 0) {
			view = false;
			break;
		}
	}
	if (view) {
		console.log(i);
	}
	i++;
}
/* --- end --- */

console.log('------------');

/* --- 2 четное, не четное --- */
var i = 0;
do {
	if (i == 0){
		console.log(i + ' - это ноль');
	} else if (i % 2 == 0) {
		console.log(i + ' - четное число');
	} else {
		console.log(i + ' - нечетное число');
	}
	i++;
} while(i <= 10);
/* --- end --- */

console.log('------------');

/* --- 3 не использовать тело цикла --- */
for (var i = 0; i <= 9; console.log(i++)) { }
/* --- end --- */

console.log('------------');

/* --- 4 пирамида --- */
var i = 1,
	str = '';
while(i <= 20){
	str += 'x ';
	console.log(str);
	i++;
}
/* --- end --- */