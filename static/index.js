

// window.onload = function() {
//     var selectElement = document.getElementById('menu');
//     var options = selectElement.options;
//     var list = [];

//     for (var i = 0; i < options.length; i++) {
//         var optionValue = options[i].value;
//         var optionText = options[i].innerText;
//         list.push({value: optionValue, text: optionText});
//     }
//     console.log(list)
// }

window.onload = function() {
    var selectElement = document.getElementById('menu');


    for (var i = 0; i < CLASS_OPTION_DATA.length; i++) {
        var option = document.createElement('option');
        option.value = CLASS_OPTION_DATA[i].value;
        option.innerText = CLASS_OPTION_DATA[i].text;
        selectElement.appendChild(option);
    }
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

let div = document.getElementById('reviews');
generateReviewHTML(div, 5, 5, "Great class!", "A", "Sally Smith");