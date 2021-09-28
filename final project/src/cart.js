import { ui } from "./ui.js";
import {
  getCartFromLocalStorage,
  removeElementFromLocalStorage,
  updateQuantityInLocalStorage,
} from "./localstorage.js";

let storageItems = getCartFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
  //display product in cart page

  ui.showProductsCart(storageItems);
  ui.updateCartIcon();
  getCartTotal();
  //remove product from cart page
  const removeBtn = document.querySelectorAll(".btn-danger");

  removeBtn.forEach((elem) => {
    elem.addEventListener("click", removeItems);

    function removeItems(e) {
      e.target.classList.contains("btn-danger");

      const id = e.target.id;
      console.log(id);

      let row = elem.parentElement.parentElement;
      row.remove();
      removeElementFromLocalStorage(id);

      return window.location.reload();
    }
  });

  //update quantity in cart
  const inputQty = document.querySelectorAll(".quantity-input");

  inputQty.forEach((elem) => {
    elem.addEventListener("change", (e) => {
      var count = e.target.value;

      let id =
        e.target.parentElement.parentElement.lastElementChild.firstElementChild
          .id;

      if (!isNaN(count) && count > 0) {
        updateQuantityInLocalStorage(id, count);

        return window.location.reload();
      } else {
        let storageElement = getElementFromLocalStorage(id);
        e.target.value = storageElement.count;
      }
    });
  });
});

function getCartTotal() {
  console.log(storageItems);
  let total = 0;
  for (let i = 0; i < storageItems.length; i++) {
    let count = storageItems[i].count;

    let price = storageItems[i].product.price;

    total += parseInt(price * count);
  }
  let totalPrice = document.querySelector("#total-price");
  totalPrice.innerText = total;
}
