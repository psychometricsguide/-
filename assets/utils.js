import { serverBaseUrl } from "../assets/settings/serverURL.js";

export async function setUserProfileLink() {
    document.getElementById('user-profile-link').href = `../profiles/profile.html?id=${await getUserID()}`;
}

export async function getUser() {
    let response = await fetch(serverBaseUrl + '/user/' + getSessionID());
    return await response.json();
}

export async function getUserProfile() {
    // Get researchId from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('id');

    let response = await fetch(serverBaseUrl + '/userProfile/' + user_id);
    return await response.json();
}

export async function getUserID() {
    const user = await getUser();
    return user._id;
}

export async function setUserAvatarNavbar() {
    const loggedUserData = await getUser();
    const avatar = document.getElementById('user-avatar');

    avatar.src = `${loggedUserData.avatarLink}`;
}

export async function getAllPosts() {
    let response = await fetch(serverBaseUrl + '/posts');
    const posts = (await response.json()).posts;

    return posts;
}

export async function checkRegistration() {

    try {
        if(getSessionID() == null || getSessionID() == undefined) {
            redirect('../sign_up/');
        } else {
            if(await getUser() == null) {
                redirect('../sign_up/');
            }
        }
    } catch (e) { }
}

export function renderRatedPosts(ratedPostsByUser) {
    const postCards = document.querySelectorAll('.content-card');

    for(let i = 0; i < postCards.length; i++)
    {
        const card = postCards[i];
        const postID = card.dataset.postid;
        const likeButton = card.querySelector(".likes");
        const dislikeButton = card.querySelector(".dislikes");

        if(ratedPostsByUser.likedPosts.includes(postID)) {
            likeButton.classList.add('active');
        }
        if(ratedPostsByUser.dislikedPosts.includes(postID)) {
            dislikeButton.classList.add('active');
        }
    }
}

export async function loadPosts(posts, pageNumber) {
    const cardContainer = document.getElementById("card-container");
    const pageSize = 12; // Number of posts per page

    // Calculate the start and end indexes for the current page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    cardContainer.innerHTML = '';

    let data = await fetch(serverBaseUrl + `/ratedPostsByUser/${await getUserID()}`);
    const ratedPostsByUser =  await data.json();

    for (let i = startIndex; i < endIndex && i < posts.length; i++)
    {
        cardContainer.innerHTML += `
        <!-- Content card -->
        <div class="col-12 col-md-6 col-xxl-4 searchable">
        <div class="content-card p-3 p-sm-4 p-lg-5 p-xxl-4 rounded-4" data-postid="${posts[i]['_id']}">
        <div class="card-img-container rounded-4" style="background-image: url('${posts[i]['image_url']}');"></div>

        <div class="card-body mt-2">
        <p class="accent-color fw-semibold mb-2">${posts[i]['article_type']}</p>
        <a href="../articles/article.html?id=${posts[i]['_id']}" class="card-title fs-3">${posts[i]['title']}</a>

        <div class="d-flex justify-content-between align-items-start mt-4">
        <!-- Author -->
        <span class="text-center">
        <a href="#"><img src="${posts[i]['author_image_url']}" class="rounded-circle" height="27" width="27" alt="author"></a>
        <span class="fw-semibold">${posts[i]['date']}</span>
        </span>

        <!-- Likes, Dislikes, Share -->
        <span class="d-flex gap-3 gap-md-2 gap-lg-3">
        <span class="text-center likes">
        <i class="fa-regular fa-thumbs-up fa-lg"></i>
        <span class="fw-semibold likes-count">${posts[i]['likes']}</span>
        </span>
        <span class="text-center dislikes">
        <i class="fa-regular fa-thumbs-down fa-flip-horizontal fa-lg"></i>
        <span class="fw-semibold dislikes-count">${posts[i]['dislikes']}</span>
        </span>
        <span><i class="fa-solid fa-share-nodes fa-xl share" data-postid="${posts[i]['_id']}"></i></span>
        </span>
        </div>
        </div>
        </div>
        </div>
        `;
    }

    if (cardContainer.childNodes.length == 0) {
        cardContainer.innerHTML = '<p class="fw-semibold fs-4 text-center my-0">🙈</p>';
        cardContainer.innerHTML += '<p class="fw-semibold fs-4 text-center">You have reached the end!</p>';
        cardContainer.innerHTML += '<p class="text-center my-0">There are no more results to show.</p>';
    }
    renderRatedPosts(ratedPostsByUser);
    return ratedPostsByUser;
}

// Likes, dislikes
export function bindLikesDislikes()
{
    const cardContainer = document.getElementById("card-container");

    cardContainer.onclick = (event) => {
        const target = event.target.closest('.likes') || event.target.closest('.dislikes');
        if (target && cardContainer.contains(target)) {
            updateLikesDislikes(target);
        }
    }
}

function toggleActive(button) {
    button.classList.toggle("active");
}

async function updateLikesDislikes(button) {
    const card = button.closest(".content-card");

    const likeButton = card.querySelector(".likes");
    const dislikeButton = card.querySelector(".dislikes");

    const likesCount = card.querySelector(".likes-count");
    const dislikesCount = card.querySelector(".dislikes-count");

    const currentLikes = parseInt(likesCount.textContent);
    const currentDislikes = parseInt(dislikesCount.textContent);

    if (button.classList.contains("likes")) {
        if (likeButton.classList.contains("active")) {
            toggleActive(likeButton);
            likesCount.textContent = currentLikes - 1;
        } else {
            if (dislikeButton.classList.contains("active")) {
                toggleActive(dislikeButton);
                dislikesCount.textContent = currentDislikes - 1;
            }
            toggleActive(likeButton);
            likesCount.textContent = currentLikes + 1;
        }
    } else if (button.classList.contains("dislikes")) {
        if (dislikeButton.classList.contains("active")) {
            toggleActive(dislikeButton);
            dislikesCount.textContent = currentDislikes - 1;
        } else {
            if (likeButton.classList.contains("active")) {
                toggleActive(likeButton);
                likesCount.textContent = currentLikes - 1;
            }
            toggleActive(dislikeButton);
            dislikesCount.textContent = currentDislikes + 1;
        }
    }

    // Update likes count and dislikes count of the post
    await fetch(serverBaseUrl + `/updatePostLikesDislikes/${card.dataset.postid}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            user_id: await getUserID(),
            likes: Number(likesCount.innerHTML),
            dislikes: Number(dislikesCount.innerHTML),
            liked: Boolean(likeButton.classList.contains("active")),
            disliked:Boolean(dislikeButton.classList.contains("active"))
        })
    });
}

export function bindShareButtons()
{
    const shareButtons = document.querySelectorAll('.share');

    shareButtons.forEach(shareBtn => {
        shareBtn.onclick = () => {
            if (navigator.share) {
                const newURL = new URL(window.location.href);
                newURL.pathname = '/client/articles/article.html';
                newURL.searchParams.set('id', shareBtn.dataset.postid);

                navigator.share({
                    title: 'Share Article',
                    url: newURL
                })
            }
        }
    });
}

export function bindPagination(currentPage, posts)
{
    const previousPage = document.getElementById("previous-page");
    const nextPage = document.getElementById("next-page");

    previousPage.onclick = async () => {
        if (currentPage > 1) {
            currentPage--;
            loadPosts(posts, currentPage);
        }
    };

    nextPage.onclick = async () => {
        currentPage++;
        loadPosts(posts, currentPage);
    };
}

export function redirect(path) {
    window.location.href = path;
}

export async function showErrorMessage(response)
{
    let errorMessageField = document.getElementById('error-message');

    errorMessageField.innerHTML =
    `
    <div class="alert alert-danger alert-dismissible mb-0 mt-3 fade show">
    <h5>Error ${response.status}</h5>
    ${await response.text()}
    <div class="btn-close" data-bs-dismiss="alert"></div>
    </div>`;
}


/* Validate functions */
export function validateUsername(username)
{
	if (username.length >= 2 && username.length <= 20)
	    return true;
	else
	    return false;
}

export function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (email.match(emailRegex))
	    return true;
	else
	    return false;
}

export function validatePassword(password) {
	if(password.length >= 6 && password.length <= 30 && !password.includes(' '))
	    return true;
	else
	    return false;
}

/***** Cookies - Manage SessionID *******/

export function getSessionID() {
    const sessionID = getCookie('sessionID');
    if(sessionID) {
        return sessionID;
    } else {
        redirect('../sign_up/');
    }
}

export async function setSessionID(response) {
    const sessionID = await response.json();
    setCookie('sessionID', sessionID, 2);
}

export function removeSessionID() {
    deleteCookie('sessionID');
}

// Get a cookie value
function getCookie(name)
{
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieParts = decodedCookie.split(';');

    for (let i = 0; i < cookieParts.length; i++) {
        let cookie = cookieParts[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// Set a cookie value
function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}