import { serverBaseUrl } from "../assets/settings/serverURL.js";
import { deletePost, getUserID, setUserAvatarNavbar, setUserProfileLink, showArticleNotFoundMessage, checkAuthorization, setStorageValue, redirect } from "../assets/utils.js";

const imageElement = document.getElementById("article-image");
const publicationDate = document.getElementById("date");
const articleTypeElement = document.getElementById("article-type");
const titleElement = document.getElementById("title");
const subtitleElement = document.getElementById("subtitle");
const mainTextElement = document.getElementById("mainText");

// Get id of the article from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get('id');

document.addEventListener("DOMContentLoaded", async () => {
	if(checkAuthorization()) {
		setUserProfileLink();
		setUserAvatarNavbar();
	}
	loadArticle();

	// initialize all Bootstrap popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

});

async function loadArticle() {
	try {
		// Get a post by ID from the URI
		let response = await fetch(serverBaseUrl + `/post/${postID}`);
		// Content of the post
		const selectedPost = (await response.json()).post;

		// Fill placeholders with data
		if (selectedPost && selectedPost != undefined) {
			if(selectedPost.image_url) {
				imageElement.style.backgroundImage = `url(${selectedPost.image_url})`;
				imageElement.classList.remove("d-none");
			}
			articleTypeElement.innerHTML = selectedPost.article_type;
			publicationDate.innerHTML = selectedPost.date;
			titleElement.innerText = selectedPost.title;
			subtitleElement.innerText = selectedPost.subtitle;
			mainTextElement.innerText = selectedPost.mainText;

			if(checkAuthorization()) {
				if(selectedPost.author_id ==  await getUserID()) {
					const modify_buttons_container = document.getElementById("modify-buttons-container");

					modify_buttons_container.innerHTML = `
					<button id="edit-post-btn" class="btn btn-primary my-3 text-white px-4 py-2">
						<i class="fa-solid fa-pen"></i>
						Edit Article
					</button>`;

					modify_buttons_container.innerHTML += `
					<button id="delete-post-btn" class="btn btn-danger my-3 text-white px-4 py-2">
						<i class="fa-solid fa-trash"></i>
						Delete Article
					</button>`;

					const edit_button = document.getElementById('edit-post-btn');
					const delete_button = document.getElementById('delete-post-btn');

					edit_button.onclick = () => {
						setStorageValue('post_to_edit', {
							id: selectedPost._id,
							image_link: selectedPost.image_url,
							title: selectedPost.title,
							subtitle: selectedPost.subtitle,
							mainText: selectedPost.mainText,
							article_type: selectedPost.article_type
						});

						redirect('../create/post.html?action=edit');
					}

					delete_button.onclick = async () => {
						const confirmation = window.confirm('Do you want to delete the article?');

						if (confirmation) {
							await deletePost(selectedPost._id);
						}
					}
				}
			}
		} else {
			showArticleNotFoundMessage();
		}
	} catch (error) {
		console.log(`error: `, error);
		showArticleNotFoundMessage();
		console.error(`Article not found for id: ${postID}`);
	}
}
