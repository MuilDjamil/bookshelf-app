import bookshelfData from './bookshelfData.js';
import { bookItem } from './template.js';

const RENDER_ITEM_EVENT = 'render-item';
const NAV_TOGGLE_EVENT = 'nav-toggle';
const renderItemEvent = new Event(RENDER_ITEM_EVENT);
const navToggleEvent = new Event(NAV_TOGGLE_EVENT);

document.addEventListener('DOMContentLoaded', () => {
  const booksContainer = document.getElementById('books-container');

  document.addEventListener(NAV_TOGGLE_EVENT, () => {
    const readListPageButton = document.getElementById('readListPage');
    const doneReadPageButton = document.getElementById('doneReadPage');

    if (window.location.hash === '#readListPage') {
      readListPageButton.classList = 'nav-toggle';
      doneReadPageButton.classList = '';
    } else if (window.location.hash === '#doneReadPage') {
      doneReadPageButton.classList = 'nav-toggle';
      readListPageButton.classList = '';
    } else {
      readListPageButton.classList = 'nav-toggle';
      doneReadPageButton.classList = '';
    }
  });

  document.addEventListener(RENDER_ITEM_EVENT, () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchValue = searchParams.get('search') || '';
    booksContainer.innerText = '';

    bookshelfData.sort((a, b) => Number(b.marked) - Number(a.marked));
    if (window.location.hash === '#readListPage') {
      const books = bookshelfData.filter((book) => book.isComplete === false);
      if (books.length > 0) {
        books.forEach((book) => {
          if ((book.title).toLowerCase().includes(searchValue.toLowerCase())) {
            booksContainer.appendChild(bookItem(book));
          }
        });
      } else {
        booksContainer.innerHTML = `<p class="books-container-message">No Books Found In the List</p>`;
      }
    } else if (window.location.hash === '#doneReadPage') {
      const books = bookshelfData.filter((book) => book.isComplete);
      if (books.length > 0) {
        books.forEach((book) => {
          if ((book.title).toLowerCase().includes(searchValue.toLowerCase())) {
            booksContainer.appendChild(bookItem(book));
          }
        });
      } else {
        booksContainer.innerHTML = `<p class="books-container-message">No Books Found In the List</p>`;
      }
    } 
  });
});

export { renderItemEvent, navToggleEvent };