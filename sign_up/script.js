// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));


// Sign Up Button
let sigupBtn = document.getElementById('sigupBtn');
let loginBtn = document.getElementById('loginBtn');

sigupBtn.onclick = () => {
	window.location.href = '../home/index.html';
}

loginBtn.onclick = () => {

}
