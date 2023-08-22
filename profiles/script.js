
import { checkRegistration, loadPosts, setUserProfileLink, setUserAvatarNavbar, bindPagination, getSessionID, getUserProfile, redirect, getCreatedPostsByUser  } from '../assets/utils.js';

/* User profile page functionality */
document.addEventListener("DOMContentLoaded", async () => {
	checkRegistration();

	const user = await getUserProfile();
	const createdPosts = await getCreatedPostsByUser(user._id);

	setUserProfileLink();
	setUserAvatarNavbar();
	fillUserProfile(user, createdPosts);
	bindPagination(1, createdPosts, 6);

	// initialize all Bootstrap popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

async function fillUserProfile(user, posts)
{
	const user_profile_avatar = document.getElementById('user-profile-avatar');
	const username = document.getElementById('username');
	const bio = document.getElementById('bio');
	const created_posts = document.getElementById('created-posts');
	const favorite_posts = document.getElementById('favorite-posts');
	const edit_button_container = document.getElementById('edit-button-container');

	user_profile_avatar.src = user.avatarLink;
	username.innerHTML = user.username;
	bio.innerHTML = user.bio;
	created_posts.innerHTML = user.createdPosts.length;
	favorite_posts.innerHTML = user.favoritePosts.length;

	if(user.currentSessionID == getSessionID()) {
		edit_button_container.innerHTML = `
		<button id="edit-profile-btn" class="btn btn-default px-4 py-2">Edit Profile</button>
		`;

		const edit_profile_btn = document.getElementById('edit-profile-btn');
		edit_profile_btn.onclick = () => {
			redirect('../edit/profile.html');
		}
	}

	loadPosts(posts, 1, 6);
}