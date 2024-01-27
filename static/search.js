window.onload = function() {
    var selectElement = document.getElementById('menu');


    for (var i = 0; i < CLASS_OPTION_DATA.length; i++) {
        var option = document.createElement('option');
        option.value = CLASS_OPTION_DATA[i].value;
        option.innerText = CLASS_OPTION_DATA[i].text;
        selectElement.appendChild(option);
    }
}


function searchClass(e){
    let department = document.getElementById('menu').value;
    let num = document.getElementById('courseNumber').value;
    
    if (department.length < 1 || num.length < 1){
        alert("Please enter a department and course number.");
    } else {
        // Redirect to the review page with the parameters
        window.location.href = `/review.html?department=${department}&number=${num}`;
    }
}