
export function User(username, email, password)
{
	this.username = username,
	this.email = email,
	this.password = password,
	this.avatarLink = '../assets/images/avatars/user-placeholder.webp',
	this.bio = '---',
	this.createdPosts = [],
	this.favoritePosts = [],
	this.dislikedPosts = [],
	this.creationDate = this.getDate()
}

User.prototype.getDate = function()
{
	const currentDate = new Date();

	// Get Weekday (short form)
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const weekday = weekdays[currentDate.getDay()];

	// Get Month and Date
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');

	// Get Time
	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	const seconds = String(currentDate.getSeconds()).padStart(2, '0');

	// Formatted Date and Time
	const formattedDate = `${weekday}, ${day}.${month}.${currentDate.getFullYear()}`;
	const formattedTime = `${hours}:${minutes}:${seconds}`;

	// Combined Format
	const combinedFormat = `${formattedDate}, ${formattedTime}`;

	return combinedFormat;
}