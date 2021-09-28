//selectors

const slInput = document.querySelector(".sl-input");
const slButton = document.querySelector(".sl-button");
const slList = document.querySelector(".sl-list");
const title = document.querySelector(".title");
const sortAsc = document.querySelector(".sort-asc");

//event listner
slButton.addEventListener("click", addElem);
slButton.addEventListener("keypress", addElem);
slList.addEventListener("click", markAsCompleted);
sortAsc.addEventListener("click", sortUi);

//function
function addElem(event) {
  event.preventDefault();

  //create shoping list item
  const shopListItem = document.createElement("div");
  shopListItem.classList.add("sl");
  //create li
  const newShopItem = document.createElement("li");
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

function sortUi() {
  var list, i, switching, b, shouldSwitch, d;
  list = document.querySelector(".sl-list");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list-items:
    for (i = 0; i < b.length - 1; i++) {
      // start by saying there should be no switching:
      shouldSwitch = false;
      /* check if the next item should
      switch place with the current item: */
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /* if next item is alphabetically
        lower than current item, mark as a switch
        and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    d = list.getElementsByTagName("div");
    for (i = 0; i < d.length - 1; i++) console.log(d);
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}
