
// doc: https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=5
const firebase = require('firebase/app');
require("firebase/firestore");
const config = require('../firebase.config.json')

firebase.initializeApp(config);

module.exports = firebase.firestore();
