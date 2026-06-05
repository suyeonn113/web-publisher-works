import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB0XwBKGm3Jtp1DGb44ykFzN0AJ0gTxSqY",
  authDomain: "suyeonn-portfolio-lab.firebaseapp.com",
  databaseURL: "https://suyeonn-portfolio-lab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suyeonn-portfolio-lab",
  storageBucket: "suyeonn-portfolio-lab.firebasestorage.app",
  messagingSenderId: "528453895610",
  appId: "1:528453895610:web:eb3d1af84c382cedffc983",
  measurementId: "G-CP4E05Y2RR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;