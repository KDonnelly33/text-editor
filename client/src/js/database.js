import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('put request started');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = await store.put({id: 1, value: content});
  const result = await request.result;
  console.log('data saved', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  try {
    console.log('get request started');
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = await store.get(1);
    const result = await request.value; 
    console.log('data retrieved', result);
    return result;
  }
  catch (error) {
    console.log(error);
  }
}




initdb();
