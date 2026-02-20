// Демо кітаптар деректері
const books = [
  { id: 1, title: 'Қазақ әдебиеті', price: 5000, author: 'Әуезов' },
  { id: 2, title: 'Python кітабы', price: 8000, author: 'Марк Лутц' },
  { id: 3, title: 'Веб-дизайн', price: 6000, author: 'Джон Дакетт' },
  // Қосымша кітаптар қосуға болады
];

// Себет (localStorage арқылы сақтау)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Басты беттегі іздеу
const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = books.filter(b => b.title.toLowerCase().includes(query));
    displayBooks(filtered, 'featuredBooks');
  });
}

// Кітаптарды көрсету функциясы
function displayBooks(bookArray, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  bookArray.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Автор: ${book.author}</p>
      <p>Бағасы: ${book.price} тг</p>
      <button onclick="addToCart(${book.id})">Себетке қосу</button>
    `;
    container.appendChild(card);
  });
}

// Себетке қосу
window.addToCart = (id) => {
  const book = books.find(b => b.id === id);
  if (book && !cart.some(c => c.id === id)) {
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Кітап себетке қосылды!');
  }
};

// Себет бетінде көрсету
const cartItems = document.getElementById('cartItems');
if (cartItems) {
  displayBooks(cart, 'cartItems');
  // Жою үшін қосымша логика
  document.getElementById('clearCart').addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayBooks(cart, 'cartItems');
  });
}

// Бастау бетінде демо кітаптарды көрсету
if (document.getElementById('featuredBooks')) {
  displayBooks(books, 'featuredBooks');
}

// Кітаптар бетінде барлық кітаптарды көрсету
if (document.getElementById('bookCatalog')) {
  displayBooks(books, 'bookCatalog');
}