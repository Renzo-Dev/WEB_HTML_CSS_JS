/*
Реализовать функции:
    1. Расчета квадратного уравнения
    2. Расчета растояния между двумя точками в двумерном пространстве(координаты точки задаются парой чисел)
    3. Расчета растояния между двумя точками в трехмерном пространстве(координаты точки задаются тремя числами)
    4. Вычисления количества цифр натурального числа (рекурсионно и итеративно)
    5. Вычисления суммы цифр натурального числа (рекурсионно и итеративно)
    6.* Написать рекурсивную функцию для вычисления максимального элемента массива из n элементов.
    7.* Написать рекурсивную процедуру перевода натурального числа из десятичной системы счисления в двоичную.
*/


// Task 1 - Расчет квадратного уравнения

// function kvadrat(a = 0,b = 0 , c = 0) {
//     // дескрименант
//     var d = (b * b) - (4 * a * c);
//     if (d > 0) {
//         var d1 = (-b + Math.sqrt(d)) / (2 * a);
//         var d2 = (-b - Math.sqrt(d)) / (2 * a);
//         alert(d1,d2);
//     } else {
//         if (d < 0) {
//             alert("Нет корней")
//         } else if (d == 0) {
//             var d3 = -b / (2 * a);
//             alert(d3);
//         }
//     }
// }
//
// kvadrat(2,-5,3)

// x = -4 y = -19 z = 0

// Task 2 Расчета растояния между двумя точками в двумерном пространстве(координаты точки задаются парой чисел)

// function distance2D(x1,y1,x2,y2) {
//     return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
// }
// console.log(distance2D(5,7,11,24));

// Task 3 Расчета растояния между двумя точками в трехмерном пространстве(координаты точки задаются тремя числами)

// function distance3D(x1,y1,z1,x2,y2,z2) {
//     // d = √(xb - xa)2 + (yb - ya)2 + (zb - za)2
//     return Math.sqrt((Math.pow((x2 - x1),2)) + (Math.pow((y2 - y1),2)) + (Math.pow((z2 - z1) ,2)));
// }
// console.log(distance3D(15,10,3,5,3,2));

// Task 4 Вычисления количества цифр натурального числа (рекурсионно и итеративно)

// function digitsCount(val)
// {
//     var count = 0;
//     while(val > 0) {
//         val = parseInt(val /= 10);
//         count++;
//     }
//     return count;
// }

// function digitsCount(val,counter = 0)
// {
//     if(val!==0){
//         val = parseInt(val/=10);
//         counter++;
//         return digitsCount(val,counter);
//     }
//     return counter;
// }

// Task 5 Вычисления суммы цифр натурального числа (рекурсионно и итеративно)

// function digit (number) {
//     var figures = "" + number
//     var sum = 0
//
//     for (var i = 0; i < figures.length; i++)
//         sum += +figures[i]
//
//     return sum
// }

// function digit(n) {
//     n += '';
//     return [...n].reduce((currentSum, currentNumber) => { return (+currentSum) + (+currentNumber) });
// }

// function digit(num,sum = 0, it = 0){
//     let figures = "" + num;
//     if(it < figures.length){
//         sum+= +figures[it];
//         it++;
//         return digit(figures,sum,it);
//     }
//     return sum;
// }
//
// console.log(digit(333)) // output => 2+5+5 = 12

// Task 6 Написать рекурсивную функцию для вычисления максимального элемента массива из n элементов.
//
// let arr = [3,2];
//
// const maxNum = arr => {
//     // если длинна масива
//     if (arr.length <= 1) return 0;
//     arr = [...arr];
//     // перебераем массив
//     for(let i = 0; i < arr.length; i++) {
//         if (arr[i] < arr[i + 1]) {
//             [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
//             return maxNum(arr);
//         } else continue;
//     }
//     return arr[0];
// };
// console.log(maxNum(arr));

// Task 7 Написать рекурсивную процедуру перевода натурального числа из десятичной системы счисления в двоичную.

// function toBinaryFormatter (number) {
//     if (number > 0) {
//         return toBinaryFormatter(Math.floor(number / 2)) + (number % 2);
//     }
//     return ''
// }
//
// console.log(toBinaryFormatter(15))