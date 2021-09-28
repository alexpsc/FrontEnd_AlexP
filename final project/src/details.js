import { http } from "./http.js";
import { ui } from "./ui.js";
import { addProductsInLocalStorage } from "./localstorage.js";
const spinner = document.getElementById("spinner");

window.onload = () => {
  if (window.location.search !== "") {
    const id = window.location.search.split("=")[1];
    http
      .getProducts(`https://61439425c5b553001717d012.mockapi.io/articles/${id}`)
      .then((data) => {
        spinner.setAttribute("hidden", "");
        ui.displayDetails(data);
        addDataToCart(data);
        ui.updateCartIcon();
      });
  }
};

function addDataToCart(data) {
  let addtoCart = document.querySelector(".add-to-cart");
  addtoCart.addEventListener("click", () => {
    let count = parseInt(document.querySelector("#quantity").value);

    addProductsInLocalStorage(data, count);
  });
}
