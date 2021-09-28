function sum2numbers() {
    // console.log('Salut');
    var firstNumberInput = document.getElementById("firstNumber");
    // console.log(firstNumberInput);
    // console.log(firstNumberInput.id);
    // console.log(firstNumberInput.type);
    // console.log(firstNumberInput.value);

    var firstNumber = firstNumberInput.value;
    console.log(firstNumber);

    var secondNumber = document.getElementById('secondNumber').value;
    console.log(isNaN(Number(secondNumber)));

    var sum = Number(firstNumber) + Number(secondNumber);

    var output = document.getElementById('output');
    // console.log(output.innerHTML);

    if(isNaN(Number(firstNumber)) || isNaN(Number(secondNumber))){
        output.innerHTML = 'Numere valide doar!';
        output.style.backgroundColor= 'red';
        // console.log('error');
    } else {
        console.log('success');
        output.innerHTML =  output.innerHTML = "Suma dintre " + firstNumber + " si " + secondNumber + " este " + sum;
        output.style.color ='blue'
