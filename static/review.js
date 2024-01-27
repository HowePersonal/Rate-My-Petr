const urlParams = new URLSearchParams(window.location.search);

// Extract department and number from URL params
const departmentParam = urlParams.get('department');
const numberParam = urlParams.get('number');

console.log('Department Param:', departmentParam);
console.log('Number Param:', numberParam);
DATA = {};

function setProfs(){
    const selectDropdown = document.getElementById('professorDropdown');

    // Clear existing options
    selectDropdown.innerHTML = '';

    // Add options for each instructor
    DATA.instructors.forEach(instructor => {
        const option = document.createElement('option');
        option.value = instructor.ucinetid;
        option.textContent = instructor.name;
        selectDropdown.appendChild(option);
    });
    console.log(DATA)
}


async function fetchClass(){
    let url = 'https://api-next.peterportal.org/v1/rest/courses/' + departmentParam + numberParam
    const response = await fetch(url, {
        method: 'GET'
    });

    data = await response.json()
    DATA = data.payload

    setProfs();
}

function submitReview(){
    console.log('submit')
}


function generateReviewHTML(div, difficulty, enjoyment, comment, grade, instructor) {
    // Create a new <div> element
    const reviewDiv = document.createElement('div');

    // Create <h2> element for the instructor name
    const instructorHeading = document.createElement('h2');
    instructorHeading.textContent = instructor;

    // Create <p> elements for the review details
    const difficultyPara = document.createElement('p');
    difficultyPara.textContent = `Difficulty: ${difficulty}`;

    const enjoymentPara = document.createElement('p');
    enjoymentPara.textContent = `Enjoyment: ${enjoyment}`;

    const commentPara = document.createElement('p');
    commentPara.textContent = `Comment: ${comment}`;

    const gradePara = document.createElement('p');
    gradePara.textContent = `Grade: ${grade}`;

    // Append all the elements to the review <div>
    reviewDiv.appendChild(instructorHeading);
    reviewDiv.appendChild(difficultyPara);
    reviewDiv.appendChild(enjoymentPara);
    reviewDiv.appendChild(commentPara);
    reviewDiv.appendChild(gradePara);

    // Append the review <div> to the provided div
    div.appendChild(reviewDiv);
}

function main(){
    fetchClass();
    let div = document.getElementById('reviews');
    generateReviewHTML(div, 5, 5, "Great class!", "A", "Sally Smith");
}   

main();