const urlParams = new URLSearchParams(window.location.search);

// Extract department and number from URL params
const professorNetID = urlParams.get('profnetid');
const professorData = {}
console.log('Professor NetID Param:', professorNetID);

async function setProfessorInfo(data) {
    let url = 'api/getInstructorRatings/' + professorNetID
    const response = await fetch(url, {
        method: 'GET'
    });
    let courseAvgs = {}
    classData = await response.json()
    console.log(classData)
    for (let i = 0; i < classData.length; i++){
        console.log(classData[i].class_id)
        console.log(i)
        console.log(courseAvgs)
        console.log(!(classData[i].class_id in courseAvgs))
        if (!(classData[i].class_id in courseAvgs)){
            courseAvgs[classData[i].class_id] = [classData[i].difficulty_rating, classData[i].enjoyment_rating, 1, 1]
        }else{
            courseAvgs[classData[i].class_id][0] += classData[i].difficulty_rating
            courseAvgs[classData[i].class_id][1] += classData[i].enjoyment_rating
            courseAvgs[classData[i].class_id][2] += 1
            courseAvgs[classData[i].class_id][3] += 1
        }
    }
    for (let classId in courseAvgs) {
        let avgDifficulty = courseAvgs[classId][0] / courseAvgs[classId][2];
        let avgEnjoyment = courseAvgs[classId][1] / courseAvgs[classId][2];
        courseAvgs[classId][0] = avgDifficulty.toFixed(2);
        courseAvgs[classId][1] = avgEnjoyment.toFixed(2);
    }
    console.log(courseAvgs)


    const professorNameBox = document.getElementById('professorName')
    const professorTitleBox = document.getElementById('professorTitle')
    const courseList = document.getElementById('courseList')

    console.log(data)

    professorNameBox.innerText = data['name']
    professorTitleBox.innerText = data['title']

    data = data.courses;
    data.sort((a, b) => {
        const courseNumberA = parseInt(a.courseNumber.replace(/\D/g, ''));
        const courseNumberB = parseInt(b.courseNumber.replace(/\D/g, ''));
        return courseNumberA - courseNumberB;
    });
    let tbody = document.getElementById('classList');
    tbody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        let course = data[i].department + ' ' + data[i].courseNumber;
        td1.innerText = course;
        tr.appendChild(td1);
        // console.log(data[i].department.replace(' ', '') + data[i].courseNumber)
        let avgs = ['N/A', 'N/A','N/A',0]
        if (data[i].department.replace(' ', '') + data[i].courseNumber in courseAvgs){
            avgs = courseAvgs[data[i].department.replace(' ', '') + data[i].courseNumber]
            console.log(avgs)
        }
        let td2 = document.createElement('td');
        td2.innerText = avgs[0];
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = avgs[1];
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerText = avgs[3];
        tr.appendChild(td4);
        tbody.appendChild(tr);

        // Add onclick event to the tr element
        tr.onclick = function() {
            window.location.href = `/review?department=${data[i].department}&number=${data[i].courseNumber}`;
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