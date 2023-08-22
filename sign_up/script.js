// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

import { User } from "../assets/value_objects/User.js";
import { serverBaseUrl } from "../assets/settings/serverURL.js";
import { redirect, removeSessionID, setSessionID, showErrorMessage, validateEmail, validatePassword, validateUsername  } from '../assets/utils.js';

// Input fields
let usernameField = document.getElementById('username');
let emailField = document.getElementById('email');
let passwordField = document.getElementById('password');

// Sign Up & Login Button
let sigupBtn = document.getElementById('sigupBtn');
let loginBtn = document.getElementById('loginBtn');

/* Remove sessionID by redirecting on this page */
removeSessionID();

/* Sign up Button */
sigupBtn.onclick = async (event) => {
	// Create account
	let user = createNewUser(usernameField.value, emailField.value, passwordField.value);

	if (user != null) {
		event.preventDefault();

		const response = await fetch(serverBaseUrl + '/createAccount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		if (response.status == 200) {
			await setSessionID(response);
			redirect('../home/');
		} else {
			showErrorMessage(response);
		}
	}
}

/* Login Button */
loginBtn.onclick = async (event) => {
	let user = createNewUser(usernameField.value, emailField.value, passwordField.value);

	if (user != null) {
		event.preventDefault();

		const response = await fetch(serverBaseUrl + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		if (response.status == 200) {
			await setSessionID(response);
			redirect('../home/');
		} else {
			showErrorMessage(response);
		}
	}
}

/* Helper functions */
function createNewUser(username, email, password)
{
	username = username.trim();
	email = email.trim();
	password = password.trim();

	if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
		let user = new User(username, email, password);
		return user;
	} else {
		return null;
	}
}
