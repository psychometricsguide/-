// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

// data
export const researchData = [
	{
		id: 1,
		likes: 1345,
		dislikes: 235,
		image_url: '../assets/images/NL2_1809_art1.jpg',
		author_image_url: '../assets/images/Logo.svg',
		date: '24.07.2023',
		article_type: 'Research',
		title: "The Impact of Stress on Decision-Making Abilities",
		subtitle: "Exploring the Relationship Between Stress Levels and Cognitive Choices",
		mainText: `
		In this psychological research study, we delved into the intricate connection between stress levels and decision-making abilities among different age groups. The objective was to uncover how varying stress levels influence cognitive choices in individuals.

		<h5 class="mt-3">Age Groups Analyzed</h5>
		<span class="fw-semibold">18-25 years:</span> Young Adults <br/>
		<span class="fw-semibold">26-40 years:</span> Early Adulthood <br/>
		<span class="fw-semibold">41-60 years:</span> Middle Adulthood <br/>
		<span class="fw-semibold">61+ years:</span> Seniors <br/> <br/>

		Our findings revealed noteworthy patterns across age groups. Among young adults (18-25 years), higher stress levels were associated with a tendency to make impulsive decisions. Conversely, individuals in the early adulthood age range (26-40 years) exhibited a more cautious approach when under stress, often taking longer to arrive at decisions.
		<br/> <br/>

		Interestingly, middle adulthood participants (41-60 years) demonstrated a more diverse response. Some individuals in this group showed heightened analytical skills and decision-making precision during stress, while others experienced decision paralysis. Among seniors (61+ years), stress seemed to have a minimal impact on decision-making, suggesting that life experience and coping mechanisms play a significant role in moderating stress effects.
		<br/> <br/>

		These findings offer valuable insights into the complex relationship between stress and decision-making across different stages of life. As stress management becomes increasingly important in today's fast-paced world, understanding how stress affects our choices can aid in developing targeted interventions and strategies for individuals of all ages.
		`
	},
	{
		id: 2,
		likes: 341,
		dislikes: 25,
		image_url: '../assets/images/RKGL.jpg',
		author_image_url: '../assets/images/Logo.svg',
		date: '15.08.2023',
		article_type: 'Research',
		title: "Исследование Психического Здоровья и Ценности Жизни",
		subtitle: "Исследование Взаимосвязи Психического Здоровья и Факторов Образа Жизни",
		mainText: `
		Исследование было проведено с целью выявления сложных взаимосвязей между психическим здоровьем и различными факторами образа жизни. Участники из разных возрастных групп щедро поделились своими исследованиями, чтобы пролить свет на этот важный вопрос. <br> <br>

		<span class="fw-semibold">Молодые Люди (18-25 лет):</span> <br>
		Среди молодых взрослых 75% сообщили о стрессе, вызванном учебной нагрузкой. Удивительно, занятия творчеством, такие как рисование или музыка, коррелировали с снижением уровня стресса на 40%.
		<br> <br>

		<span class="fw-semibold">Средний Возраст (30-45 лет):</span> <br>
		Участники среднего возраста выделили стресс, связанный с работой, как значительное испытание, 65% из них испытывают выгорание. Те, кто регулярно занимается физической активностью, отметили значительное улучшение общего самочувствия, с ростом уровня удовлетворенности жизнью на 35%.
		<br> <br>

		<span class="fw-semibold">Пожилые Люди (55+ лет):</span> <br>
		Опрос показал, что пожилые люди, поддерживающие активную социальную жизнь и занимающиеся хобби, испытывают на 20% меньший риск чувства изоляции. Кроме того, внедрение практик осознанности, таких как медитация или мягкая йога, приводит к увеличению эмоционального равновесия на 30%.
		<br> <br>

		Исследование подчеркивает важность признания уникальных вызовов, с которыми сталкиваются различные возрастные группы в отношении психического здоровья. Признавая влияние выбора образа жизни на благополучие, люди могут предпринимать активные шаги для улучшения своего психического здоровья и достижения более насыщенной жизни.
		`
	}
];

// Get researchId from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const researchId = parseInt(urlParams.get('id'));

// Access the research data based on the id
const selectedResearch = researchData.find(research => research.id == researchId);

const imageElement = document.getElementById("article-image");
const articleTypeElement = document.getElementById("article-type");
const titleElement = document.getElementById("title");
const subtitleElement = document.getElementById("subtitle");
const mainTextElement = document.getElementById("mainText");
const errorMessage = document.getElementById("error-message");

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
} else if (errorMessage) {
	errorMessage.innerHTML = `
	<div class="alert alert-danger mb-0 mt-3 fade show text-center">
	<h5 class="fw-semibold">Not Found</h5>
	<p>We apologize, but the article you're looking for cannot be found.</p>
	</div>
	`;

	console.error(`Article not found for id: ${researchId}`);
}
