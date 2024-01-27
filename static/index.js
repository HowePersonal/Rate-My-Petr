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

let div = document.getElementById('reviews');
generateReviewHTML(div, 5, 5, "Great class!", "A", "Sally Smith");