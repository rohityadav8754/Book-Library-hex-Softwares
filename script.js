let books = [];
let history = [];

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;

  if (!title || !author) {
    alert("Please fill in both fields.");
    return;
  }

  const book = { title, author, category };
  books.push(book);
  displayBooks();
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
}

function displayBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  books.filter(book =>
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  ).forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br/>
      <em>Category: ${book.category}</em><br/>
      <button onclick="borrowBook(${index})">Borrow</button>
    `;
    list.appendChild(card);
  });
}

function borrowBook(index) {
  const book = books[index];
  history.push(`${book.title} by ${book.author} borrowed on ${new Date().toLocaleDateString()}`);
  books.splice(index, 1);
  displayBooks();
  displayHistory();
}

function displayHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    list.appendChild(li);
  });
}

document.getElementById("searchInput").addEventListener("input", displayBooks);
