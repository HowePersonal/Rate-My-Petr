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
    let url = 'https://api-next.peterportal.org/v1/rest/courses/' + department.toUpperCase() + num.toUpperCase();
    const response = await fetch(url, {
        method: 'GET'
    });

    data = await response.json()
    console.log(data, url)
    if (data.statusCode % 100 == 4){
        alert("Class does not exist.")
        return;
    } 
    window.location.href = `/review?department=${department}&number=${num}`;
    
}

async function generateClassList(department, num){
    let url = 'https://api-next.peterportal.org/v1/rest/courses?'
    let backendAPIUrl = 'api/'
    if (department.length > 0){
        url += 'department=' + department;
        backendAPIUrl += 'getDepartmentRatings/' + department
    }
    else if (num.length > 0){
        url += 'courseNumber=' + num;
        backendAPIUrl += 'getClassCodeRatings/' + num
    }
    const response = await fetch(url, {
        method: 'GET'
    });
    console.log(backendAPIUrl)
    const responseAPI = await fetch(backendAPIUrl, {
        method: 'GET'
    })

    data = await response.json()
    //console.log(data)
    data = await data.payload;


    ratingData = await responseAPI.json()
    console.log(ratingData)

    
    data.sort((a, b) => a.courseNumeric - b.courseNumeric);
    if (data.statusCode % 100 == 4){
        alert("Something went wrong.")
        return;
    } 
    document.getElementById('course-list-container').style.display = '';
    let tbody = document.getElementById('classList');
    tbody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let courseId = data[i].id
        let difficulty = "N/A"
        let enjoyment = "N/A"
        let count = '0'
        if (courseId in ratingData) {
            difficulty = ratingData[courseId].difficulty_rating
            enjoyment = ratingData[courseId].enjoyment_rating
            count = ratingData[courseId].count
        }


        
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        let course = data[i].department + ' ' + data[i].courseNumber;
        td1.innerText = course;
        tr.appendChild(td1);
        
        let td2 = document.createElement('td');
        td2.innerText = difficulty
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = enjoyment
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerText = count
        tr.appendChild(td4);
        tbody.appendChild(tr);

        // Add onclick event to the tr element
        tr.onclick = function() {
            window.location.href = `/review?department=${data[i].department}&number=${data[i].courseNumber}`;
        };

        tbody.appendChild(tr);
    }
}

function searchClass(e){
    let department = encodeURIComponent(document.getElementById('menu').value);
    let num = encodeURIComponent(document.getElementById('courseNumber').value);
    console.log(department, num)
    if (department.length < 1 && num.length < 1){
        alert("Please enter a department and/or a course number.");
        return;
    }
    else if ((department.length < 1 && num.length > 0) || (department.length > 0 && num.length < 1)){
        generateClassList(department, num);
        return;
    }
  
    verifyClassExists(department, num);    
}