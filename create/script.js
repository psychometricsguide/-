
import { serverBaseUrl } from '../assets/settings/serverURL.js';
import { checkRegistration, setUserProfileLink, redirect, getUser, setUserAvatarNavbar, showErrorMessage, getUserID  } from '../assets/utils.js';
import { Post } from '../assets/value_objects/Post.js';

/* Create Post page functionality */
document.addEventListener('DOMContentLoaded', async () => {
	checkRegistration();

	setUserProfileLink();
	setUserAvatarNavbar();
	bindCreatePostBtn();

	// initialize all Bootstrap popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

function bindCreatePostBtn() {
	const default_image_url = '../assets/images/posts/default-article-image.png';
	const create_post_btn = document.getElementById('create-post-btn');

	create_post_btn.onclick = async (event) => {
		let imgeValidated = true;
		let image_url = document.getElementById('image').value.trim();
		const title = document.getElementById('title').value.trim();
		const subtitle = document.getElementById('subtitle').value.trim();
		const mainText = document.getElementById('mainText').value;

		if(image_url == '') {
			image_url = default_image_url;
		} else {
			imgeValidated = await validateImageUrl(image_url);
		}

		if(imgeValidated && validateTitle(title) && validateSubtitle(subtitle) && validateMainText(mainText)) {
			event.preventDefault();
			const article_type = document.getElementById('article-type').value;

			let response = await fetch(serverBaseUrl + '/createPost', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(new Post(await getUserID(), image_url, article_type, title, subtitle, mainText))
			});

			if(response.status == 200) {
				redirect(`../profiles/profile.html?id=${await getUserID()}`);
			} else {
				showErrorMessage(response);
			}
		}
	}
}

async function validateImageUrl(image_url) {
	try {
		const response = await fetch(serverBaseUrl + '/validateImage/' + encodeURIComponent(image_url));

		if (response.status == 200) {
			console.log('Image validated');
			return true;
		} else {
			showErrorMessage(response);
			return false;
		}
	} catch (error) {
		return false;
	}
}

function validateTitle(title) {
	if(title.length >= 5 && title.length <= 52) {
		return true;
	} else {
		return false;
	}
}

function validateSubtitle(subtitle) {
	if(subtitle.length >= 5 && subtitle.length <= 90) {
		return true;
	} else {
		return false;
	}
}

function validateMainText(mainText) {
	if(mainText.length >= 750) {
		return true;
	} else {
		return false;
	}
}