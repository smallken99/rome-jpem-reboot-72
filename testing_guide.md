# Manual Testing Guide for Firebase Login/Signup

This guide outlines the steps to manually test the implemented login and signup functionality.

**Prerequisites:**

1.  **Firebase Project Setup:**
    *   Ensure you have a Firebase project created at [console.firebase.google.com](https://console.firebase.google.com).
    *   In your Firebase project, navigate to "Authentication" (or "Build > Authentication").
    *   Go to the "Sign-in method" tab and ensure "Email/Password" provider is **enabled**.
2.  **Configuration:**
    *   Open the `firebase-config.js` file in your project.
    *   Replace the placeholder values in the `firebaseConfig` object with your actual Firebase project's configuration details (apiKey, authDomain, projectId, etc.). You can find these details in your Firebase project settings (usually under "Project settings" > "General" > "Your apps" > "SDK setup and configuration").
3.  **Serve the HTML:**
    *   You need to serve `firebase-login.html` from a web server. Opening it directly as a file (`file://...`) might lead to issues with Firebase SDKs or JavaScript module loading in some browsers.
    *   You can use simple tools like Python's `http.server` (run `python -m http.server` in the project directory and navigate to `http://localhost:8000/firebase-login.html`) or VS Code's "Live Server" extension.

**Testing Steps:**

Open `firebase-login.html` in your web browser.

**I. Initial Page Load & UI**

1.  **Verify Login Form:**
    *   **Expected:** The page should display the "Login" form by default. Email and password fields, "Sign In" button, and a link to "Sign Up" should be visible.
2.  **Verify Signup Form Link:**
    *   Click the "Sign Up" link.
    *   **Expected:** The form should switch to the "Sign Up" view, showing email, password, confirm password fields, "Sign Up" button, and a link back to "Login".
3.  **Verify Login Form Link:**
    *   From the "Sign Up" form, click the "Login" link.
    *   **Expected:** The form should switch back to the "Login" view.

**II. User Signup**

1.  **Successful Signup:**
    *   Navigate to the "Sign Up" form.
    *   Enter a **new, valid email address**.
    *   Enter a password (e.g., `password123`).
    *   Enter the same password in the "Confirm Password" field.
    *   Click the "Sign Up" button.
    *   **Expected:**
        *   A success message like "Sign up successful for your@email.com! Please login." should appear.
        *   Check your Firebase Authentication console ("Users" tab); the new user should be listed.
2.  **Mismatched Passwords:**
    *   Enter a new email.
    *   Enter a password (e.g., `password123`).
    *   Enter a *different* password in "Confirm Password" (e.g., `password456`).
    *   Click "Sign Up".
    *   **Expected:** An error message "Passwords do not match." should appear.
3.  **Email Already in Use:**
    *   Use the email address you just successfully registered.
    *   Enter any password.
    *   Click "Sign Up".
    *   **Expected:** An error message like "The email address is already in use by another account." (or similar Firebase error) should appear.
4.  **Invalid Email Format:**
    *   Enter an invalid email (e.g., `test`, `test@domain`, `test.com`).
    *   Enter matching passwords.
    *   Click "Sign Up".
    *   **Expected:** A Firebase error message indicating an invalid email format (e.g., "The email address is badly formatted.") should appear.
5.  **Weak Password (if applicable in Firebase settings):**
    *   If your Firebase project enforces strong passwords, test with a weak password (e.g., `123`).
    *   **Expected:** A Firebase error related to password strength should appear.
6.  **Empty Fields:**
    *   Leave one or more fields empty and click "Sign Up".
    *   **Expected:** An error message like "Please fill in all fields." should appear.

**III. User Login**

1.  **Successful Login:**
    *   Navigate to the "Login" form.
    *   Enter the email and password of the user you successfully registered in step II.1.
    *   Click the "Sign In" button.
    *   **Expected:**
        *   The login form should be replaced with a welcome message (e.g., "Welcome, your@email.com!") and a "Logout" button.
        *   Console should log user information.
2.  **Incorrect Password:**
    *   Enter the correct email of a registered user.
    *   Enter an incorrect password.
    *   Click "Sign In".
    *   **Expected:** A Firebase error message (e.g., "Wrong password." or "Invalid credentials") should appear.
3.  **Unregistered Email:**
    *   Enter an email address that has not been registered.
    *   Enter any password.
    *   Click "Sign In".
    *   **Expected:** A Firebase error message (e.g., "User not found." or "Invalid credentials") should appear.
4.  **Empty Fields:**
    *   Leave email or password empty and click "Sign In".
    *   **Expected:** An error message "Please enter both email and password." should appear.

**IV. Logout**

1.  **Perform Logout:**
    *   After successfully logging in, click the "Logout" button.
    *   **Expected:**
        *   The page should refresh/update, and the "Login" form should be displayed again.
        *   Console should indicate the user is signed out.

**V. Session Persistence**

1.  **Login and Close Tab/Browser:**
    *   Log in successfully.
    *   Close the browser tab (or the entire browser).
    *   Reopen the `firebase-login.html` page in a new tab/browser.
    *   **Expected:** You should see the welcome message and "Logout" button, indicating you are still logged in.
2.  **Logout and Close Tab/Browser:**
    *   Log in successfully.
    *   Click "Logout".
    *   Close the browser tab (or the entire browser).
    *   Reopen the `firebase-login.html` page in a new tab/browser.
    *   **Expected:** You should see the "Login" form, indicating you are logged out.

**VI. Error Messages**
*   Verify that error messages are displayed clearly below the respective forms for all error scenarios tested above.
*   Verify that error messages are cleared when you switch forms or make a new attempt.

---

If you encounter any issues, check the browser's developer console (usually F12) for more detailed error messages from Firebase or the JavaScript code.
