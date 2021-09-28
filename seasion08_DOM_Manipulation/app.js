var submit = document.getElementById("submit");
submit.addEventListener("click", validate);

function validate(e) {
  e.preventDefault();

  var firstNameField = document.getElementById("first_name");
  var lastNameField = document.getElementById("last_name");
  var hasNumber = /\d/;
  var radios = document.getElementsByName("gender");
  var formValid = false;

  if (firstNameField.value.length == 0) {
    firstNameField.classList.add("first_name_red");
  } else {
    firstNameField.classList.remove("first_name_red");
  }
  if (lastNameField.value.length == 0) {
    lastNameField.classList.add("last_name_red");
  } else {
    lastNameField.classList.remove("last_name_red");
  }

  if (hasNumber.test(firstNameField.value)) {
    firstNameField.classList.add("first_name_red");
  }

  if (hasNumber.test(lastNameField.value)) {
    lastNameField.classList.add("last_name_red");
  }

  var i = 0;
  while (!formValid && i < radios.length) {
    if (radios[i].checked) formValid = true;
    i++;
  }

  if (!formValid) {
    document.getElementById("radioEmpty").innerHTML =
      "Please select one option";
  }

  var text = document.getElementById("description");
  var gender = document.querySelector("input[name = gender]:checked").value;

  console.log(
    "first name: " + firstNameField.value,
    "last name: " + lastNameField.value,
    "gender: " + gender,
    "text: " + text.value
  );

  document.getElementById("confirmation_banner").style.display = "block";
  document.getElementById("confirmation_banner").innerHTML =
    "Thank you for contacting us! " + firstNameField.value;
}
