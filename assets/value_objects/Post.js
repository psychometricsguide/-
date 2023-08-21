
export function Post(image_url, author_id, author_image_url, article_type, title, subtitle, mainText)
{
	this.likes = 0,
	this.dislikes = 0,
	this.image_url = image_url,
	this.author_id = author_id,
	this.author_image_url = author_image_url,
	this.date = this.getDate(),
	this.article_type = article_type,
	this.title = title,
	this.subtitle = subtitle,
	this.mainText = mainText
}

Post.prototype.getDate = function()
{
	const currentDate = new Date();

	// Get Month and Date
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');

	// Formatted Date and Time
	const formattedDate = `${day}.${month}.${currentDate.getFullYear()}`;

	return formattedDate;
}