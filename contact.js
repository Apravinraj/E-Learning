import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwT7IjMahOKSvMvdwIxzWwnW8lhwbfPuU",
  authDomain: "e-learning-46b8d.firebaseapp.com",
  projectId: "e-learning-46b8d",
  storageBucket: "e-learning-46b8d.appspot.com",
  messagingSenderId: "992038210419",
  appId: "1:992038210419:web:68020e97b412a186fbd306",
  databaseURL: "https://e-learning-46b8d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form submission handler
const contactEl=document.getElementById('contact-form')
contactEl.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validate inputs
  if (validateEmail(email) && validateField(name) && validateField(message)) {
    // Create a new message entry
    const newMessageRef = ref(database, 'messages');
    push(newMessageRef, {
      name: name,
      email: email,
      message: message,
      timestamp: Date.now()
    }).then(() => {
      alert('Message sent successfully!');
      contactEl.reset();
    }).catch(error => {
      alert('Error sending message: ' + error.message);
    });
  } else {
    alert('Please fill in all fields correctly.');
  }
});

// Validate Functions
function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validateField(field) {
  return field != null && field.trim().length > 0;
}



/*firebase rules

{
    "rules": {
      ".read": "true",
      ".write": "true"
    }
  }
    */
