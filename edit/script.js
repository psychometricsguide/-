
import { serverBaseUrl } from '../assets/settings/serverURL.js';
import { checkRegistration, setUserProfileLink, redirect, getUser, setUserAvatarNavbar, showErrorMessage, validateEmail, validateUsername  } from '../assets/utils.js';

/* User edit profile page functionality */
document.addEventListener("DOMContentLoaded", async () => {
	checkRegistration();

	const user = await getUser();

	setUserProfileLink();
	setUserAvatarNavbar();
	fillUserProfile(user);

	// initialize all Bootstrap popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

function fillUserProfile(user)
{
	const username_field = document.getElementById('username');
	const email_field = document.getElementById('email');
	const bio_field = document.getElementById('bio');
	const avatarImage = document.getElementById('avatar');
	const avatarsSelect = document.getElementById('user-avatars');
	const update_profile_btn = document.getElementById('update-profile-btn');

	avatarImage.src = user.avatarLink;

	username_field.value = user.username;
	username_field.classList.add('filled');
	username_field.nextElementSibling.classList.add('filled');

	email_field.value = user.email;
	email_field.classList.add('filled');
	email_field.nextElementSibling.classList.add('filled');

	bio_field.value = user.bio;
	bio_field.classList.add('filled');
	bio_field.nextElementSibling.classList.add('filled');

	avatarsSelect.onchange = () => {
		avatarImage.src = avatarsSelect.value;
	}

	update_profile_btn.onclick = async (event) =>
	{
		if (validateUsername(username_field.value) && validateEmail(email_field.value))
		{
			event.preventDefault();
			const response = await fetch(serverBaseUrl + '/updateUserProfile', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					userid: user._id,
					avatarLink: avatarImage.src,
					username: username_field.value.trim(),
					email: email_field.value.trim(),
					bio: bio_field.value.trim()
				})
			});

			if (response.status == 200) {
				console.log('response status: ' + response.status);
				redirect(`../profiles/profile.html?id=${user._id}`);
			} else {
				showErrorMessage(response);
			}
		}
	}
}