import { checkStorage, loadStorageData } from './storage.js';
import { showModal } from './action.js';
import { navToggleEvent, renderItemEvent } from './customEvent.js';

const searchParams = new URLSearchParams(window.location.search);

if (checkStorage()) {
  loadStorageData();
}

document.addEventListener('DOMContentLoaded', () => {  
  const addBookButton = document.getElementById('add-book');
  const searchBookInput = document.getElementById('search-book');

  window.location.hash = '#readListPage';
  searchBookInput.value = searchParams.get('search');
  
  window.addEventListener('hashchange', () => {
    document.dispatchEvent(navToggleEvent);
    document.dispatchEvent(renderItemEvent);
  }); 

  addBookButton.addEventListener('click', () => {
    showModal('Add New Book');
  });

  searchBookInput.addEventListener('keyup', () => {
    searchParams.set('search', searchBookInput.value);
    history.replaceState(null, null, '?' + searchParams.toString() + window.location.hash);
    document.dispatchEvent(renderItemEvent);    
  });

  document.dispatchEvent(renderItemEvent);
});