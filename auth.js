document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');
    const loginErrorP = document.getElementById('login-error');

    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
    const signupButton = document.getElementById('signup-button');
    const signupErrorP = document.getElementById('signup-error');

    // Ensure firebaseConfig is loaded
    if (typeof firebaseConfig === 'undefined') {
        console.error('Firebase config is not loaded. Make sure firebase-config.js is correct and included before this script.');
        loginErrorP.textContent = 'Firebase configuration is missing. Setup cannot proceed.';
        signupErrorP.textContent = 'Firebase configuration is missing. Setup cannot proceed.';
        return;
    }

    // Initialize Firebase
    // Using Firebase compat version as per the HTML script tags
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Error initializing Firebase:", e);
        loginErrorP.textContent = 'Error initializing Firebase. Check console.';
        signupErrorP.textContent = 'Error initializing Firebase. Check console.';
        return;
    }

    const auth = firebase.auth();

    // Toggle forms
    showSignupLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        loginErrorP.textContent = ''; // Clear errors
    });

    showLoginLink.addEventListener('click', function (event) {
        event.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
        signupErrorP.textContent = ''; // Clear errors
    });

    // Login logic
    loginButton.addEventListener('click', function () {
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        loginErrorP.textContent = ''; // Clear previous errors

        if (!email || !password) {
            loginErrorP.textContent = 'Please enter both email and password.';
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                console.log('User logged in:', userCredential.user);
                loginForm.innerHTML = `<h2>Welcome, ${userCredential.user.email}!</h2><button id="logout-button">Logout</button>`;
                document.getElementById('logout-button').addEventListener('click', () => {
                    auth.signOut().then(() => {
                        // This will trigger onAuthStateChanged, which will reload or update UI
                        window.location.reload(); // Simple way to reset UI
                    });
                });
            })
            .catch((error) => {
                console.error('Login error:', error);
                loginErrorP.textContent = error.message;
            });
    });

    // Signup logic
    signupButton.addEventListener('click', function () {
        const email = signupEmailInput.value;
        const password = signupPasswordInput.value;
        const confirmPassword = signupConfirmPasswordInput.value;
        signupErrorP.textContent = ''; // Clear previous errors

        if (!email || !password || !confirmPassword) {
            signupErrorP.textContent = 'Please fill in all fields.';
            return;
        }
        if (password !== confirmPassword) {
            signupErrorP.textContent = 'Passwords do not match.';
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up
                console.log('User signed up:', userCredential.user);
                // Optionally, sign them in directly or ask them to login
                signupForm.innerHTML = `<h2>Sign up successful for ${userCredential.user.email}!</h2><p>Please <a href="#" id="go-to-login-after-signup">login</a>.</p>`;
                document.getElementById('go-to-login-after-signup').addEventListener('click', (e) => {
                    e.preventDefault();
                    signupForm.style.display = 'none';
                    loginForm.style.display = 'flex';
                     // Restore login form if it was changed
                    if (!document.getElementById('login-button')) {
                        window.location.reload(); // Or rebuild the form
                    }
                });

            })
            .catch((error) => {
                console.error('Signup error:', error);
                signupErrorP.textContent = error.message;
            });
    });

    // Observer for user authentication state
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            console.log('Auth state changed: User is signed in', user);
            // If the login form is still visible and doesn't have a logout button, update it.
            // This handles the case where the user was already logged in from a previous session.
            if (loginForm.style.display !== 'none' && !document.getElementById('logout-button')) {
                 loginForm.innerHTML = `<h2>Welcome back, ${user.email}!</h2><button id="logout-button">Logout</button>`;
                 document.getElementById('logout-button').addEventListener('click', () => {
                    auth.signOut().then(() => {
                        window.location.reload();
                    });
                });
                signupForm.style.display = 'none'; // Hide signup form
            }
        } else {
            // User is signed out.
            console.log('Auth state changed: User is signed out');
            // Ensure login form is shown and signup is hidden if no user,
            // and that the login form is in its original state.
            // This check is to prevent errors if the page is reloaded after logout.
            if (!document.getElementById('login-button')) {
                 // If the login form was replaced by a welcome message, reload to restore it.
                 // A more sophisticated SPA would handle this without a reload.
                 window.location.reload();
            } else {
                loginForm.style.display = 'flex';
                signupForm.style.display = 'none';
            }
        }
    });

    console.log("auth.js executed and Firebase listeners attached.");
    // Test if firebase object and auth are available
    // console.log("Firebase App (auth.js):", firebase.app().name);
    // console.log("Firebase Auth (auth.js):", auth);
});
