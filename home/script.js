import { serverBaseUrl } from "../assets/settings/serverURL.js";
import { checkRegistration, loadPosts, bindLikesDislikes, getAllPosts, bindShareButtons, setUserProfileLink, bindPagination, setUserAvatarNavbar  } from '../assets/utils.js';

// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

/* Homepage functionality */
document.addEventListener("DOMContentLoaded", async () => {
    checkRegistration();

    setUserProfileLink();
    setUserAvatarNavbar();
    let ratedPostsByUser = await loadPosts(await getAllPosts(), 1); // 1 = initial page number

    // bindPagination(1, ratedPostsByUser);
    bindPagination(1, await getAllPosts());
    bindLikesDislikes();
    bindShareButtons();
    bindSearchField();
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
