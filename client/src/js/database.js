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
  console.log('Put to the database');

  // Create connection to database and the version of the db to use.
  const jateDb = await openDB('jate', 1);

  // Create transaction and detail the database/privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the target object store.
  const store = tx.objectStore('jate');

  // Use put method to pass in content.
  const request = store.put({ id: 1, value: content });

  // Get request confirmation.
  const result = await request;
  console.log('Data save to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
// Exporting the function to GET from the database
export const getDb = async () => {
  console.log('Get from the database');

  // Creat connection to database and the version of tthe db to use.
  const jateDb = await openDB('jate', 1);

  // Create transction and detail the database/privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open the target object store.
  const store = tx.objectStore('jate');

  // Use getall method to get all data in the db.
  const request = store.getAll();

  // Get request confirmation
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
