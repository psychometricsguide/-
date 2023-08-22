import { serverBaseUrl } from "../assets/settings/serverURL.js";
import { checkRegistration, loadPosts, getAllPosts, setUserProfileLink, bindPagination, setUserAvatarNavbar  } from '../assets/utils.js';

/* Homepage functionality */
document.addEventListener("DOMContentLoaded", async () => {
    checkRegistration();

    setUserProfileLink();
    setUserAvatarNavbar();

    loadPosts(await getAllPosts(), 1, 12);
    bindPagination(1, await getAllPosts(), 12);
    bindSearchField();

    // initialize all Bootstrap popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

/* Search field */
function bindSearchField()
{
    const searchField = document.getElementById('search_field');

    searchField.onkeyup = async (event) => {
        if (event.key == 'Enter') {
            event.preventDefault();

            let search_query = searchField.value.toLowerCase().split(' ');

            let response = await fetch(serverBaseUrl + '/findPostsBySearchQuery', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(search_query)
            });

            const posts = (await response.json()).postsArray;
            await loadPosts(posts, 1);
        }
    }
}
