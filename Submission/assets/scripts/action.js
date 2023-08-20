import bookshelfData from './bookshelfData.js';
import { saveStorageData, checkStorageDataId } from "./storage.js";
import { renderItemEvent } from './customEvent.js';
import { bookForm } from './template.js';

const showModal = (title, book = {}) => {
  const modal = document.getElementById('modal-container');

  modal.className += ' show';
  modal.focus();
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-content').append(bookForm(book));
  document.getElementById('close-btn').addEventListener('click', closeModal);
}

const closeModal = () => {
  const modal = document.getElementById('modal-container');
  const modalContent = document.getElementById('modal-content');

  modal.className = modal.className.replace(' show', '');
  modalContent.innerHTML = '';
}

function saveBook({ title, writer, year, lastReadPage, isComplete = false, updateId, marked = false }) {
  if (title && writer && year) {
    if (!updateId) {
      const id = +new Date();
      const book = {
        id,
        title,
        writer,
        year: parseInt(year),
        lastReadPage: parseInt(lastReadPage),
        isComplete,
        marked,
      };

      bookshelfData.push(book);
      saveStorageData();

      if (checkStorageDataId(id)) {
        alert('Book Added!');
        closeModal();
        document.dispatchEvent(renderItemEvent);
      } else {
        const index = bookshelfData.findIndex((book) => book.id === id);
        bookshelfData.splice(index, 1);
        alert('Book Failed to Add!');
      }
    } else {
      const index = bookshelfData.findIndex((b) => b.id === updateId);
      if (index !== -1) {
        bookshelfData[index] = {
          ...bookshelfData[index],
          title,
          writer,
          year: parseInt(year),
          lastReadPage: parseInt(lastReadPage),
          isComplete
        };

        saveStorageData();
        alert('Book Updated!');
        closeModal();
        document.dispatchEvent(renderItemEvent);    
      } else {
        alert('Book Failed to Update!');
      }
    }
  } else {
    alert('Complete your Form First!');
  }
}

export { showModal, closeModal, saveBook };