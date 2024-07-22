// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwT7IjMahOKSvMvdwIxzWwnW8lhwbfPuU",
    authDomain: "e-learning-46b8d.firebaseapp.com",
    projectId: "e-learning-46b8d",
    storageBucket: "e-learning-46b8d.appspot.com",
    messagingSenderId: "992038210419",
    appId: "1:992038210419:web:68020e97b412a186fbd306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Set up our register function
window.register = function() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userName = document.getElementById('user_name').value;

    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password) || !validateField(userName)) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Create user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);

            const userData = {
                email: email,
                user_name: userName,
                last_login: Date.now()
            };

            set(userRef, userData)
                .then(() => {
                    alert('User Created!!');
                    location.href = "login.html"
                })
                .catch((error) => {
                    console.error('Error writing user data to database:', error);
                    alert('Error: ' + error.message);
                });
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            alert('Error: ' + error.message);
        });
};

// Set up our login function
window.login = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
        alert('Email or Password is incorrect.');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userRef = ref(database, 'users/' + user.uid);

            update(userRef, { last_login: Date.now() })
                .then(() => {
                    alert('User Logged In!!');
                    location.href = 'courses.html'; // Redirect to courses page
                })
                .catch((error) => {
                    console.error('Error updating last login time:', error);
                    alert('Error: ' + error.message);
                });
        })
        .catch((error) => {
            console.error('Error logging in user:', error);
            alert('Error: ' + error.message);
        });
};

// Validate Functions
function validateEmail(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateField(field) {
    return field != null && field.length > 0;
}


// firebase rules

/* {
  "rules": {
    "users": {
  "$uid": {
    ".read": "$uid === auth.uid",
    ".write": "$uid === auth.uid"
  }
}
}
}

*/

    // Function to handle the active link
    function setActiveLink() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Run the function on page load
    document.addEventListener('DOMContentLoaded', setActiveLink);


