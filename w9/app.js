//1.a
function displayNumerFrom1to20(click) {
  for (var i = 1; i < 21; i++) {
    console.log(i);
  }
}

//1.b
function displayOddNumerFrom1to20() {
  for (var i = 1; i < 21; i += 2) {
    console.log(i);
  }
}

//displayOddNumerFrom1to20();

//2
var list = [2, 3, 5, 7, 5, 3];

//2.a
function computeSumOfElementsInArray() {
  var sum = 0;

  for (i = 0; i < list.length; i++) {
    sum = sum + list[i];
  }
  console.log(sum);
}
//computeSumOfElementsInArray();

//2.b
function computeMaxOfElementsInArray() {
  var max = 0;

  for (i = 0; i < list.length; i++) {
    if (list[i] > max) {
      max = list[i];
    }
  }
  console.log(max);
}
//computeMaxOfElementsInArray();

//2.c

function computeHowManyTimesIsAElementInArray() {
  var e = parseInt(document.getElementById("maxElement").value);

  var rep = 0;

  for (i = 0; i < list.length; i++) {
    if (list[i] === list[e]) {
      rep++;
    }
  }
  console.log(rep);
}

//3
function printFirst50FibonacciNumbers() {
  n1 = 0;
  n2 = 1;

  for (var i = 0; i <= 50; i++) {
    console.log(n1);
    nextNr = n1 + n2;
    n1 = n2;
    n2 = nextNr;
  }
}

//4

function displayFizzBuzz() {
  for (var i = 1; i < 101; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("fizzbuzz");
    } else if (i % 5 === 0) {
      console.log("buzz");
    } else if (i % 3 === 0) {
      console.log("fizz");
    } else {
      console.log(i);
    }
  }
}
//displayFizzBuzz();
