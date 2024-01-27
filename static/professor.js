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

    data.courses.forEach(course => {
        const listItem = document.createElement('li')
        const courseLink = document.createElement('a')
        courseLink.href = "/review.html?" + "department=" + course.department + "&number=" + course.courseNumber
        courseLink.textContent = course.department + " " + course.courseNumber + " - " + course.title
        listItem.appendChild(courseLink)
        courseList.appendChild(listItem)
    })
}

async function fetchProfessorInfo(data) {
    let baseUrl = "https://api-next.peterportal.org/v1/rest/instructors/" + professorNetID
    const response = await fetch(baseUrl, {
        method: 'GET'
    });

    data = await response.json()
    setProfessorInfo(data.payload)
}




fetchProfessorInfo()