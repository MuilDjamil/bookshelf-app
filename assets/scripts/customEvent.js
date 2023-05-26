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

    if (window.location.hash === '#readListPage') {
      bookshelfData.sort((a, b) => Number(b.marked) - Number(a.marked)).forEach((book) => {
        if (book.isComplete === false) {
          if ((book.title).toLowerCase().includes(searchValue.toLowerCase())) {
            booksContainer.appendChild(bookItem(book));
          }
        }
      });
    } else if (window.location.hash === '#doneReadPage') {
      bookshelfData.sort((a, b) => Number(b.marked) - Number(a.marked)).forEach((book) => {
        if (book.isComplete) {
          if ((book.title).toLowerCase().includes(searchValue.toLowerCase())) {
            booksContainer.appendChild(bookItem(book));
          }
        }
      });
    } 
  });
});

export { renderItemEvent, navToggleEvent };