import { User } from "../../server/value_objects/User.js";

// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));


const serverBaseUrl = 'http://localhost:8080';

let errorMessageField = document.getElementById('error-message');

// Input fields
let usernameField = document.getElementById('username');
let emailField = document.getElementById('email');
let passwordField = document.getElementById('password');

// Sign Up & Login Button
let sigupBtn = document.getElementById('sigupBtn');
let loginBtn = document.getElementById('loginBtn');


/* Sign up Button */
sigupBtn.onclick = async (event) => {

	// redirect with no values (temporary)
	if (usernameField.value == '' && emailField.value == '' && passwordField.value == '') {
		redirect('../home/');
	}

	// Create account
	let user = createNewUser(usernameField.value, emailField.value, passwordField.value);

	if (user != null) {
		event.preventDefault();

		let response = await fetch(serverBaseUrl + '/createAccount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		if (response.status == 200) {
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

		let response = await fetch(serverBaseUrl + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		if (response.status == 200) {
			redirect('../home/');
		} else {
			showErrorMessage(response);
		}
	}
}


/* Helper functions */
function createNewUser(username, email, password)
{
	if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
		let user = new User(0, username, email, password);
		return user;
	} else {
		return null;
	}
}

function validateUsername(username)
{
	if (username.length >= 2 && username.length <= 20)
	return true;
	else
	return false;
}

function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (email.match(emailRegex))
	return true;
	else
	return false;
}

function validatePassword(password) {
	if(password.length >= 6 && password.length <= 30 && !password.includes(' '))
	return true;
	else
	return false;
}

async function showErrorMessage(response)
{
	errorMessageField.innerHTML =
	`
	<div class="alert alert-danger alert-dismissible mb-0 mt-3 fade show">
		<h5>Error ${response.status}</h5>
		${await response.text()}
		<div class="btn-close" data-bs-dismiss="alert"></div>
	</div>`;
}

function redirect(path) {
	window.location.href = path;
}
