window.onload = function() {
    var selectElement = document.getElementById('menu');


    for (var i = 0; i < CLASS_OPTION_DATA.length; i++) {
        var option = document.createElement('option');
        option.value = CLASS_OPTION_DATA[i].value;
        option.innerText = CLASS_OPTION_DATA[i].text;
        selectElement.appendChild(option);
    }
}


async function verifyClassExists(department, num){
    let url = 'https://api-next.peterportal.org/v1/rest/courses/' + department + num
    const response = await fetch(url, {
        method: 'GET'
    });

    data = await response.json()
    if (data.statusCode % 100 == 4){
        alert("Class does not exist.")
        return false;
    } else {
        window.location.href = `/review.html?department=${department}&number=${num}`;
    }
}

function searchClass(e){
    let department = document.getElementById('menu').value;
    let num = document.getElementById('courseNumber').value;
    
    if (department.length < 1 || num.length < 1){
        alert("Please enter a department and course number.");
        return;
    } 
  
    verifyClassExists(department, num);    
}