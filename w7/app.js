function calculeazaMaximul(num1, num2, num3) {
  if ((num1 > num2) & (num1 > num3)) {
    console.log(num1);
  } else if ((num2 > num1) & (num2 > num3)) {
    console.log(num2);
  } else {
    console.log(num3);
  }
}

calculeazaMaximul(10, 20, 30);

function vowel(letter) {
  switch (letter) {
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
      console.log(letter + " este vocala");
      break;
    default:
      console.log("este consoana");
  }
}
vowel("a");

function calcmonth(month) {
  switch (month) {
    case 1:
      console.log("ianuarie");
    case "martie":
    case "mai":
    case "iulie":
    case "august":
    case "octombrie":
    case "decembrie":
      break;
    case "februarie":
      break;
    case "aprilie":
    case "iunie":
    case "9":
    case "11":
      break;
  }
}

calcmonth(1);

function sumOfArray(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  console.log(sum);
}

var a = [1, 4, 5, 7, 9];
sumOfArray(a);

function avgArrElem(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i] / arr.length;
  }
  console.log(sum);
}

var a = [1, 4, 5, 7, 9];
avgArrElem(a);

function FilterPosElemFromArray(arr) {
  var earr = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      earr = arr[i].push;
    }
  }
}

var a = [-1, -4, -5, 7, 9];
FilterPosElemFromArray(a);

function MultiplicationTable(n) {
  var mult = 0;
  for (var i = 0; i < 11; i++) {
    mult = 9 * n;
  }
  console.log(mult);
}

MultiplicationTable(9);
