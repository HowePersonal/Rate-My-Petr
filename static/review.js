const urlParams = new URLSearchParams(window.location.search);

// Extract department and number from URL params
const departmentParam = urlParams.get("department");
const numberParam = urlParams.get("number");

console.log("Department Param:", departmentParam);
console.log("Number Param:", numberParam);
DATA = {};

function setProfs() {
	const selectDropdown = document.getElementById("professorDropdown");

	// Clear existing options
	selectDropdown.innerHTML = "";

	// Add options for each instructor
	DATA.instructors.forEach((instructor) => {
		const option = document.createElement("option");
		option.value = instructor.ucinetid;
		option.textContent = instructor.name;
		selectDropdown.appendChild(option);
	});
	console.log(DATA);
}

async function fetchClass() {
	let url =
		"https://api-next.peterportal.org/v1/rest/courses/" +
		departmentParam +
		numberParam;
	const response = await fetch(url, {
		method: "GET",
	});

	data = await response.json();
	DATA = data.payload;

	setProfs();
}

function submitReview() {
	console.log("submit");
}

function generateReviewHTML(
	div,
	difficulty,
	enjoyment,
	comment,
	grade,
	instructor,
	date
) {
	// Create a new <div> element
	const reviewDiv = document.createElement("div");

	const nameDiv = document.createElement("div");
	const dateDiv = document.createElement("div");

	nameDiv.textContent = `Prof : ${instructor}`;
	dateDiv.textContent = date;

	const titleDiv = document.createElement("div");
	titleDiv.appendChild(nameDiv);
	titleDiv.appendChild(dateDiv);
	titleDiv.classList.add("review-title");

	const commentDiv = document.createElement("div");
	const commentLabel = document.createElement("div");
	commentLabel.textContent = "Course Remarks";
	commentDiv.classList.add("review-comment");
	commentDiv.textContent = comment;
	// // Create <p> elements for the review details
	// const difficultyPara = document.createElement("p");
	// difficultyPara.textContent = `Difficulty: ${difficulty}`;

	// const enjoymentPara = document.createElement("p");
	// enjoymentPara.textContent = `Enjoyment: ${enjoyment}`;

	// const commentPara = document.createElement("p");
	// commentPara.textContent = `Comment: ${comment}`;

	// const gradePara = document.createElement("p");
	// gradePara.textContent = `Grade: ${grade}`;

	// // Append all the elements to the review <div>
	// reviewDiv.appendChild(instructorHeading);
	// reviewDiv.appendChild(difficultyPara);
	// reviewDiv.appendChild(enjoymentPara);
	reviewDiv.appendChild(titleDiv);
	reviewDiv.appendChild(commentDiv);

	reviewDiv.classList.add("stu-review-container");

	// Append the review <div> to the provided div
	div.appendChild(reviewDiv);
}

function main() {
	fetchClass();
	let div = document.getElementById("reviews");
	div.classList.add("all-stu-review-container");

	generateReviewHTML(
		div,
		5,
		5,
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		"A",
		"Sally Smith",
		"1/27/2024"
	);
}

main();
