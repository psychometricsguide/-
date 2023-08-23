
import { serverBaseUrl } from '../assets/settings/serverURL.js';
import { checkRegistration, setUserProfileLink, redirect, setUserAvatarNavbar, showErrorMessage, getUserID, getStorageValue, deleteStorageValue  } from '../assets/utils.js';
import { Post } from '../assets/value_objects/Post.js';

/* Create Post page functionality */
document.addEventListener('DOMContentLoaded', async () => {
	checkRegistration();
	setUserProfileLink();
	setUserAvatarNavbar();

	if(new URLSearchParams(window.location.search).get('action')) {
		bindEditPostBtn();
	} else {
		bindCreatePostBtn();
	}

	// initialize all Bootstrap popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

function bindEditPostBtn() {
	const postToEdit = getStorageValue('post_to_edit');
	const update_post_btn = document.getElementById('create-post-btn');
	update_post_btn.innerHTML = 'Update Article';

	let image_url_field = document.getElementById('image');
	image_url_field.value = postToEdit.image_link;
	image_url_field.classList.add('filled');
	image_url_field.nextElementSibling.classList.add('filled');

	let title_field = document.getElementById('title');
	title_field.value = postToEdit.title;
	title_field.classList.add('filled');
	title_field.nextElementSibling.classList.add('filled');

	let subtitle_field = document.getElementById('subtitle');
	subtitle_field.value = postToEdit.subtitle;
	subtitle_field.classList.add('filled');
	subtitle_field.nextElementSibling.classList.add('filled');

	let mainText_field = document.getElementById('mainText');
	mainText_field.value = postToEdit.mainText;
	mainText_field.classList.add('filled');
	mainText_field.nextElementSibling.classList.add('filled');

	let article_type = document.getElementById('article-type');
	article_type.value = postToEdit.article_type;

	update_post_btn.onclick = async (event) => {
		let imgeValidated = true;
		let image_url = image_url_field.value.trim();
		const title = title_field.value.trim();
		const subtitle = subtitle_field.value.trim();
		const mainText = mainText_field.value.trim();

		if(image_url == '') {
			image_url = default_image_url;
		} else {
			event.preventDefault();
			imgeValidated = await validateImageUrl(image_url);
		}

		if(imgeValidated && validateTitle(title) && validateSubtitle(subtitle) && validateMainText(mainText)) {
			event.preventDefault();

			const response = await fetch(serverBaseUrl + '/updatePost/' + postToEdit.id, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					image_url: image_url,
					title: title,
					subtitle: subtitle,
					mainText: mainText,
					article_type: article_type.value
				})
			});

			if(response.status == 200) {
				deleteStorageValue('post_to_edit');
				redirect(`../profiles/profile.html?id=${await getUserID()}`);
			} else {
				showErrorMessage(response);
			}
		}
	}
}

function bindCreatePostBtn() {
	const default_image_url = '../assets/images/posts/default-article-image.png';
	const create_post_btn = document.getElementById('create-post-btn');

	create_post_btn.onclick = async (event) => {
		let imgeValidated = true;
		let image_url = document.getElementById('image').value.trim();
		const title = document.getElementById('title').value.trim();
		const subtitle = document.getElementById('subtitle').value.trim();
		const mainText = document.getElementById('mainText').value.trim();

		if(image_url == '') {
			image_url = default_image_url;
		} else {
			event.preventDefault();
			imgeValidated = await validateImageUrl(image_url);
		}

		if(imgeValidated && validateTitle(title) && validateSubtitle(subtitle) && validateMainText(mainText)) {
			event.preventDefault();
			const article_type = document.getElementById('article-type').value;

			const response = await fetch(serverBaseUrl + '/createPost', {
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
	if(title.length >= 5 && title.length <= 60) {
		return true;
	} else {
		return false;
	}
}

function validateSubtitle(subtitle) {
	if(subtitle.length >= 5 && subtitle.length <= 85) {
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