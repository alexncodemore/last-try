import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG (USED AS-IS)
const firebaseConfig = {
  apiKey: "AIzaSyA6ZTqlQxxKO9QDTXuK_1R0oQ5gZr_-2Vc",
  authDomain: "eat-right-live-healthy.firebaseapp.com",
  projectId: "eat-right-live-healthy",
  storageBucket: "eat-right-live-healthy.firebasestorage.app",
  messagingSenderId: "1082103302889",
  appId: "1:1082103302889:web:4eccd9eb04485216d47e78",
  measurementId: "G-HCMSQDJDR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submit
document
  .getElementById("appointmentForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ READ VALUES FROM INPUTS
    const appointmentData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      consultationType: document.getElementById("consultationType").value,
      appointmentDate: document.getElementById("appointmentDate").value,
      appointmentTime: document.getElementById("appointmentTime").value,
      timezone: document.getElementById("timezone").value,
      message: document.getElementById("message").value,
      status: "pending",
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "appointments"), appointmentData);
      alert("✅ Appointment saved successfully!");
      e.target.reset();
    } catch (error) {
      console.error("❌ Firestore Error:", error);
      alert("Error saving appointment");
    }
  });
