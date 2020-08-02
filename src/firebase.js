import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: 'AIzaSyDgu-9qkBwbsT8SU2inwlLGPteugwy_GFw',
  authDomain: 'fireapp-f6b19.firebaseapp.com',
  databaseURL: 'https://fireapp-f6b19.firebaseio.com',
  projectId: 'fireapp-f6b19',
  storageBucket: 'fireapp-f6b19.appspot.com',
  messagingSenderId: '709761802222',
  appId: '1:709761802222:web:95d8cf5908f467003378ff',
  measurementId: 'G-63D6X4NF6Y',
};

class Firebase {
  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);

    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return app.auth().signOut();
  }

  async register(name, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password);

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      name: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      app.auth().onAuthStateChanged(resolve);
    });
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid;
  }

  async getUserName(callback) {
    if (!app.auth().currentUser) {
      return null;
    }

    const uid = app.auth().currentUser.uid;

    await app
      .database()
      .ref('usuarios')
      .child(uid)
      .once('value')
      .then(callback);
  }
}

export default new Firebase();
