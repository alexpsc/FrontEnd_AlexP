import { ui } from "./ui.js";

class StorageItem {
  constructor(count, product) {
    this.count = count;
    this.product = product;
  }
}

export function addProductsInLocalStorage(product, count) {
  let storageObject = localStorage.getItem(product.id);
  let storageItem = JSON.parse(storageObject);
  let limit = document.querySelector("#quantity").max;
  if (null !== storageObject) {
    if (storageItem.count + count <= limit) {
      storageItem.count += count;
      ui.updateCartIcon();
      ui.showConfirmation("produs adaugat cu succes", "bg-success");
    } else {
      ui.showConfirmation("stoc epuizat", "bg-danger");
    }

    localStorage.setItem(product.id, JSON.stringify(storageItem));
    return;
  } else {
    let storageItem = new StorageItem(count, product);
    if (storageItem.count <= limit) {
      localStorage.setItem(product.id, JSON.stringify(storageItem));
      ui.updateCartIcon();
      ui.showConfirmation("produs adaugat cu succes", "bg-success");
    } else {
      ui.showConfirmation(
        `Puteti adauga maxim ${limit} produse in cos`,
        "bg-danger"
      );
    }
  }
}

export function getCartFromLocalStorage() {
  let keys = Object.keys(localStorage);
  let storageItems = [];
  for (let value of keys) {
    let storageItem = JSON.parse(localStorage.getItem(value));
    storageItems.push(storageItem);
  }
  return storageItems;
}

export function updateQuantityInLocalStorage(productId, count) {
  let storageObject = localStorage.getItem(productId);
  if (null != storageObject) {
    let storageItem = JSON.parse(storageObject);
    storageItem.count = count;
    localStorage.setItem(productId, JSON.stringify(storageItem));
  }
}

export function removeElementFromLocalStorage(productId) {
  localStorage.removeItem(productId);
  ui.updateCartIcon();
}
