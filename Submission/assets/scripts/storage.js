import bookshelfData from './bookshelfData.js';

const STORAGE_KEY = 'Bookshelf-Storage';

function checkStorage() {
  if (typeof Storage === undefined) {
    alert("Your browser doesn't support localStorage. Please change your browser");
    return false;
  }

  return true;
}

function loadStorageData() {
  let storageData = localStorage.getItem(STORAGE_KEY);
  storageData = JSON.parse(storageData);

  if (storageData) {
    for (const data of storageData) {
      bookshelfData.push(data);
    }
  }
}

function saveStorageData() {
  const data = JSON.stringify(bookshelfData);
  localStorage.setItem(STORAGE_KEY, data);
}

function checkStorageDataId(id) {
  const book = JSON.parse(localStorage.getItem(STORAGE_KEY)).find(book => book.id === id);
  if (book) {
    return true;
  }

  return false;
}

export { 
  checkStorage,
  loadStorageData,
  saveStorageData,
  checkStorageDataId
};