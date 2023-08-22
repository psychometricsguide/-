import { serverBaseUrl } from "../assets/settings/serverURL.js";
import { deletePost, getUserID, setUserAvatarNavbar, setUserProfileLink, showArticleNotFoundMessage, checkAuthorization } from "../assets/utils.js";

const imageElement = document.getElementById("article-image");
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
			titleElement.innerHTML = selectedPost.title;
			subtitleElement.innerHTML = selectedPost.subtitle;
			mainTextElement.innerText = selectedPost.mainText;

			if(checkAuthorization()) {
				if(selectedPost.author_id ==  await getUserID()) {
					const delete_button_container = document.getElementById("delete-button-container");
					delete_button_container.innerHTML = `
					<button id="delete-post-btn" class="btn btn-danger my-3 text-white px-4 py-2">
					<i class="fa-solid fa-trash"></i>
					Delete Article
					</button>`;

					const delete_button = document.getElementById('delete-post-btn');

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
