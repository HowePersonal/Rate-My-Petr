const urlParams = new URLSearchParams(window.location.search);

// Extract department and number from URL params
const departmentParam = urlParams.get("department");
const numberParam = urlParams.get("number");
const classId = departmentParam + numberParam;

console.log("Department Param:", departmentParam);
console.log("Number Param:", numberParam);
DATA = {};

function setProfs() {
	const selectDropdown = document.getElementById("professorDropdown");

	// Clear existing options
	selectDropdown.innerHTML = "";
    const option = document.createElement("option");
    option.textContent = 'Select Prof';
    selectDropdown.appendChild(option);
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

function findProfFromID(id) {
    return DATA.instructors.find((instructor) => instructor.ucinetid === id);
}
// function findIdFromProf(prof) {
//     return DATA.instructors.find((instructor) => instructor.name === prof);
// }

async function submitReview() {
    const professorDropdown = document.getElementById("professorDropdown");
    const gradeDropdown = document.getElementById("gradeDropdown");
    const difficultyInput = document.getElementById("difficulty");
    const enjoymentInput = document.getElementById("enjoyment");
    const commentTextarea = document.getElementById("comment");
 
    const instructorId = professorDropdown.value;
    const grade = gradeDropdown.value;
    const difficultyRating = difficultyInput.value;
    const enjoymentRating = enjoymentInput.value;
    const comment = commentTextarea.value;

    // Create the review object
    const review = {
        instructorId,
        grade,
        difficultyRating,
        enjoymentRating,
        comment,
        classId
    };
    console.log(review)
    // Perform the POST request to submit the review
    const response = await fetch("api/insertRating", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    console.log(response)
    data = await response.json();
    console.log(data)
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

	// Title Section of Review
	const titleDiv = document.createElement("div");
	titleDiv.appendChild(nameDiv);
	titleDiv.appendChild(dateDiv);
	titleDiv.classList.add("review-title");

	// Comment Section of Review
	const commentDiv = document.createElement("div");
	const commentContent = document.createElement("div");
	const commentLabel = document.createElement("div");

	commentLabel.textContent = "Course Remarks";
	commentContent.textContent = comment;
	commentDiv.classList.add("review-comment");
	commentLabel.classList.add("review-label");

	commentDiv.appendChild(commentLabel);
	commentDiv.appendChild(commentContent);

	// Rating Section of Review
	const lowerRow = document.createElement("div");
	const gradeDiv = document.createElement("div");
	const enjoymentDiv = document.createElement("div");
	const difficultyDiv = document.createElement("div");

	gradeDiv.textContent = `Grade : ${grade}`;
	enjoymentDiv.textContent = `Enjoyment : ${enjoyment}`;
	difficultyDiv.textContent = `Difficulty : ${difficulty}`;
	lowerRow.appendChild(gradeDiv);
	lowerRow.appendChild(enjoymentDiv);
	lowerRow.appendChild(difficultyDiv);
	lowerRow.classList.add("review-stats-row");

	// // Append all the elements to the review <div>
	// reviewDiv.appendChild(instructorHeading);
	// reviewDiv.appendChild(difficultyPara);

	reviewDiv.appendChild(titleDiv);
	reviewDiv.appendChild(commentDiv);
	reviewDiv.appendChild(lowerRow);

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

	generateReviewHTML(
		div,
		5,
		5,
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		"A",
		"Sally Smith",
		"1/27/2024"
	);

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
