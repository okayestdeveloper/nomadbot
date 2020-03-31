
let db;
// doc: https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=5
const firebase = require('firebase/app');
require("firebase/firestore");
const config = require('../firebase.config.json')

function singleton() {
  let db;
  const getDB = () => {
    if (db) {
      return db;
    }

    firebase.initializeApp(config);
    db = firebase.firestore();
    return db;
  }
  return getDB;
}

module.exports = singleton()
