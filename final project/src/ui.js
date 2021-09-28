//display products
class UI {
  constructor() {
    this.productsDom = document.querySelector(".products-center");
    this.productDetail = document.querySelector(".container-details");
    this.cartBody = document.querySelector("#cart-table-products");
    this.message = document.querySelector(".message");
    this.cartItems = document.querySelector(".cart-items");
    this.adminTable = document.querySelector("#admin-table-body");
  }

  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        
        <article class="product">
        <div class="img-container">
          <img src="${product.picture}" alt="product" class="product-img">
         
        </div>
        <h3>${product.title}</h3>
        <h4>${product.price} lei</h4>
        <button class="details-btn" data-id="${product.id}">details
        </button>
      </article>`;
    });
    this.productsDom.innerHTML = result;
  }

  displayDetails(products) {
    let result = "";

    result += `
    <div class="picture-detail"><img src="${products.picture}" alt="product" class="product-img zoom"></div>
    <div class="product-wrapper">
        <h2 class="title">${products.title}</h1>
        <h3 class="price">Price: ${products.price} lei</h2>
        <div class="description">${products.description}</div>
        <h4 class="stoc">Stoc: ${products.stoc} buc</h4>
        <dl class="param param-inline quantity">
        <dt>Quantity: </dt>
         <dd>
                                 <div class="field-product">
                                    <input class="quantity field-product--input" id="quantity" min="1" max="${products.stoc}" name="quantity"  value="1" type="number" >
                                 </div>                  
                                 </dd>
        </dl>
        <button class="add-to-cart banner-btn">Add to cart</button>
        </div>
          `;

    this.productDetail.innerHTML = result;
  }

  showProductsCart(storageItems) {
    let output = "";
    storageItems.forEach((item) => {
      output += `
      <tr class="table-row-cart">
      <td><img src="${item.product.picture}" width="42" height="42"/> </td>
      <td><a href='details.html?id=${item.product.id}'>${item.product.title}</a></td>
      <td><p id="stock">Stoc: ${item.product.stoc}</p></td>
      <td><input class="form-control quantity-input" type="number" value="${item.count}" max="${item.product.stoc}"  min="1"/></td>
      <td class="text-right product-price">${item.product.price} lei</td>
      <td class="text-right">
      <button class="btn btn-sm btn-danger" id="${item.product.id}"><i class="fa fa-trash" ></i> </button> </td>
      </tr>
  `;
    });
    this.cartBody.innerHTML = output;
  }
  updateCartIcon() {
    const icons = localStorage.length;
    this.cartItems.innerHTML = icons;
  }

  showConfirmation(message, className) {
    this.message.innerHTML = `<h5 class="${className}" class="u-full-width" style="opacity:0.6;">${message}</h5>`;

    setTimeout(() => (this.message.innerHTML = ""), 3000);
  }

  addProductsAdmin(products) {
    let output = "";
    products.forEach((product) => {
      output += `
      <tr id="table-row">
      <td><img src="${product.picture}" width="40" height="40"/> </td>
      <td><a href='details.html?id=${product.id}'>${product.title}</td>
      <td>${product.price} lei</td>
      <td>${product.stoc}</td>
      <td>
        <button
          type="button"
          class="btn btn-danger delete"
          id="${product.id}"
          data-toggle="modal"
          data-target="#deleteModal"
        >
          Delete
        </button>
      </td>
      <td>
      <button
        type="button"
        class="btn btn-dark modify-product"
        id="${product.id}"
        data-toggle="modal"
        data-target="#deleteModal"
      >
        Modify
      </button>
    </td>
    </tr>`;
    });
    this.adminTable.innerHTML = output;
  }
  clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
  }
}

export const ui = new UI();
