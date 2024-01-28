const urlParams = new URLSearchParams(window.location.search);

// Extract department and number from URL params
const professorNetID = urlParams.get('profnetid');
const professorData = {}
console.log('Professor NetID Param:', professorNetID);

function setProfessorInfo(data) {
    const professorNameBox = document.getElementById('professorName')
    const professorTitleBox = document.getElementById('professorTitle')
    const courseList = document.getElementById('courseList')

    console.log(data)

    professorNameBox.innerText = data['name']
    professorTitleBox.innerText = data['title']

    // data.courses.forEach(course => {
    //     const listItem = document.createElement('li')
    //     const courseLink = document.createElement('a')
    //     courseLink.href = "/review?" + "department=" + course.department + "&number=" + course.courseNumber
    //     courseLink.textContent = course.department + " " + course.courseNumber + " - " + course.title
    //     listItem.appendChild(courseLink)
    //     courseList.appendChild(listItem)
    // })
    let tbody = document.getElementById('classList');
    tbody.innerHTML = '';
    for (let i = 0; i < data.courses.length; i++) {
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        let course = data.courses[i].department + ' ' + data.courses[i].courseNumber;
        td1.innerText = course;
        tr.appendChild(td1);
        
        let td2 = document.createElement('td');
        td2.innerText = 'N/A'
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = 'N/A'
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerText = 'N/A'
        tr.appendChild(td4);
        tbody.appendChild(tr);

        // Add onclick event to the tr element
        tr.onclick = function() {
            window.location.href = `/review?department=${data.courses[i].department}&number=${data.courses[i].courseNumber}`;
        };

        tbody.appendChild(tr);
    }
}

async function fetchProfessorInfo(data) {
    let baseUrl = "https://api-next.peterportal.org/v1/rest/instructors/" + professorNetID
    const response = await fetch(baseUrl, {
        method: 'GET'
    });

    data = await response.json()
    setProfessorInfo(data.payload)
}

async function fetchReviews() {
    let baseUrl = "api/getInstructorRatings/" + professorNetID
    const response = await fetch(baseUrl, {
        method: 'GET'
    });

    data = await response.json()
    console.log(data)
    document.getElementById('reviewCount').innerText = data.length

    let totalEnjoyment = 0
    let totalDifficulty = 0
    for (let i = 0; i < data.length; i++) {
        totalEnjoyment += data[i].enjoyment_rating
        totalDifficulty += data[i].difficulty_rating
    }
    document.getElementById('avgEnjoyment').innerText = (totalEnjoyment / data.length).toFixed(2)
    document.getElementById('avgDifficulty').innerText = (totalDifficulty / data.length).toFixed(2)
}



fetchProfessorInfo()
fetchReviews()