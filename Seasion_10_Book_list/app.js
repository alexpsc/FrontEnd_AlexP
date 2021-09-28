//book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI class
class UI {
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><i class="fa fa-trash delete"></i></td>
    `;
    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    const div = document.querySelector(".alert");
    div.className = `alert ${className}`;
    div.innerHTML = message;
    setTimeout(() => div.classList.remove(className), 2000);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}

//event listner

//add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all fields", "danger");
  } else {
    const book = new Book(title, author, isbn);

    //add book to ui
    UI.addBookToList(book);

    //clear field
    UI.clearFields();

    //show success message
    UI.showAlert("Book added!", "succes");
  }
});
//remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  UI.showAlert("Book deleted!", "info");
});
