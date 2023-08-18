// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

import { serverBaseUrl } from "../assets/settings/serverURL.js";

const imageElement = document.getElementById("article-image");
const articleTypeElement = document.getElementById("article-type");
const titleElement = document.getElementById("title");
const subtitleElement = document.getElementById("subtitle");
const mainTextElement = document.getElementById("mainText");
const errorMessage = document.getElementById("error-message");

// Get researchId from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const researchId = urlParams.get('id');

try {
	// Get a post by ID from the URI
	let response = await fetch(serverBaseUrl + `/post/${researchId}`);

	// Content of the post
	const selectedResearch = (await response.json()).post;

	// Fill placeholders with data
	if (selectedResearch) {
		if(selectedResearch.image_url) {
			imageElement.style.backgroundImage = `url(${selectedResearch.image_url})`;
			imageElement.classList.remove("d-none");
		}
		articleTypeElement.innerHTML = selectedResearch.article_type;
		titleElement.innerHTML = selectedResearch.title;
		subtitleElement.innerHTML = selectedResearch.subtitle;
		mainTextElement.innerHTML = selectedResearch.mainText;
	}
} catch (error) {
	errorMessage.innerHTML = `
	<div class="alert alert-danger mb-0 mt-3 fade show text-center">
		<h5 class="fw-semibold">Not Found</h5>
		<p>We apologize, but the article you're looking for cannot be found.</p>
	</div>
	`;

	console.error(`Article not found for id: ${researchId}`);
}
