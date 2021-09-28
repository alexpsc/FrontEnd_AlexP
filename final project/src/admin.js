import { http } from "./http.js";
import { ui } from "./ui.js";

//modal
const modal = document.querySelectorAll(".modal-adm");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelectorAll(".btn--close-modal");

const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const addProductToDb = document.querySelector(".submit");
const msgModal = document.querySelector(".hidden-msg-modal");

//modal
const openModal = function (e) {
  msgModal.innerText = "";
  e.preventDefault();
  modal[0].classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal[0].classList.add("hidden");
  modal[1].classList.add("hidden");
  overlay.classList.add("hidden");
  ui.clearFields();
  // window.location.reload();
};

btnsOpenModal[0].addEventListener("click", openModal);

btnCloseModal[0].addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//spiner
const spinner = document.getElementById("spinner");

//display products
document.addEventListener("DOMContentLoaded", () => {
  addProductsToUi();
});

const url = "https://61439425c5b553001717d012.mockapi.io/articles";
function addProductsToUi() {
  //get all products

  http.getProducts(url).then((products) => {
    spinner.setAttribute("hidden", "");
    ui.addProductsAdmin(products);
    deleteProductFromDb();
    modifyProducts();
  });
  ui.updateCartIcon();
}

//delete product from DB
function deleteProductFromDb() {
  const deleteItemsDb = document.querySelectorAll(".delete");
  deleteItemsDb.forEach((deleteItemDb) => {
    deleteItemDb.addEventListener("click", (e) => {
      const id = e.target.id;
      e.target.parentElement.parentElement.remove(id);
      http.delete(`${url}/${id}`).then((data) => {
        console.log(data);
        ui.showConfirmation(
          `Product ${data.title} has been succesfuly deleted!`,
          "bg-info"
        );
      });
    });
  });
}

function modifyProducts() {
  const modifyBtns = document.querySelectorAll(".modify");
  modifyBtns.forEach((modifyBtn) => {
    modifyBtn.addEventListener("click", (e) => {
      const modalM = document.querySelector(".modal-modify");
      modalM.classList.remove("hidden");
      overlay.classList.remove("hidden");
      btnCloseModal[1].addEventListener("click", closeModal);

      const id = e.target.id;
      http
        .getProducts(
          `https://61439425c5b553001717d012.mockapi.io/articles/${id}`
        )
        .then((data) => {
          console.log(data);
          const name = document.querySelector("#name-mdf");
          name.value = data.title;
          const description = document.querySelector("#description-mdf");
          description.value = data.description;
          const url = document.querySelector("#url-mdf");
          url.value = data.picture;
          const price = document.querySelector("#price-mdf");
          price.value = data.price;
          const qty = document.querySelector("#qty-mdf");
          qty.value = data.stoc;

          const modify = document.querySelector(".modify");

          modify.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal();
            const product = {
              title: name.value,
              picture: url.value,
              price: price.value,
              description: description.value,
              stoc: qty.value,
            };
            http
              .put(
                `https://61439425c5b553001717d012.mockapi.io/articles/${id}`,
                product
              )
              .then(() => {
                addProductsToUi();
              });
          });
        });
    });
  });
}

//post new product
addProductToDb.addEventListener("click", addToDb);
function addToDb(e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  console.log(name);
  const pic = document.querySelector("#url").value;
  const description = document.querySelector("#description").value;
  const price = document.querySelector("#price").value;
  console.log(price);
  const qty = document.querySelector("#qty").value;

  const product = {
    title: name,
    picture: pic,
    description: description,
    price: price,
    stoc: qty,
  };

  if (
    name.length === 0 ||
    pic.length === 0 ||
    description.length === 0 ||
    price === "" ||
    qty === ""
  ) {
    msgModal.innerText = "please fill all fields";
  } else {
    http
      .post("https://61439425c5b553001717d012.mockapi.io/articles", product)
      .then((data) => {
        addProductsToUi();
        closeModal();

        ui.showConfirmation(
          `Product ${data.title} has been succesfuly added!`,
          "bg-info"
        );
      });
  }
}
