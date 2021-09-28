//selectors

const slInput = document.querySelector(".sl-input");
const slButton = document.querySelector(".sl-button");
const slList = document.querySelector(".sl-list");
const title = document.querySelector(".title");
const sortAsc = document.querySelector(".sort-asc");
const sortDsc = document.querySelector(".sort-dsc");

//event listner
slButton.addEventListener("click", addElem);
slButton.addEventListener("keypress", addElem);
slList.addEventListener("click", markAsCompleted);
sortAsc.addEventListener("click", sortUiasc);
sortDsc.addEventListener("click", sortUidesc);

//function
function addElem(event) {
  event.preventDefault();

  //create shoping list item
  const shopListItem = document.createElement("tr");
  shopListItem.classList.add("sl");
  //create li
  const newShopItem = document.createElement("td");
  newShopItem.innerText = slInput.value;
  newShopItem.classList.add("sl-item");
  shopListItem.appendChild(newShopItem);
  //mark as buyed button
  if (slInput.value == "") {
    //turn buuton red if input is empty
    document.querySelector("form button").style.color = "red";
    return;
  } else {
    //view title
    title.classList.remove("display");

    //turn buuton gree if input is ok
    document.querySelector("form button").style.color = "green";

    const markAsBuyed = document.createElement("button");
    markAsBuyed.innerHTML = '<i class="fas fa-check"></i>';
    markAsBuyed.classList.add("complete-btn");
    shopListItem.append(markAsBuyed);
  }

  slList.appendChild(shopListItem);

  //empty shoping form
  slInput.value = "";
}

function markAsCompleted(e) {
  const item = e.target;

  if (item.classList[0] === "complete-btn") {
    const mark = item.parentElement;
    mark.classList.toggle("completed");
  }
}

function sortUiasc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".sl-list");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortUidesc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".sl-list");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
