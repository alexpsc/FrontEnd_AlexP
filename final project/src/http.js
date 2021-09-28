class CustomHTTPMethods {
  async getProducts(url, id) {
    try {
      let result = await fetch(url);
      spinner.removeAttribute("hidden");
      let products = await result.json();

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async post(url, product) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

  async put(url, product) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
}

export const http = new CustomHTTPMethods();
