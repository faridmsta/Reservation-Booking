// Part-1 Stuff
let doctor = document.querySelectorAll(".doctors_wrapper .doctor")
let steps = document.querySelectorAll(".all_wrapper")
let times = document.querySelectorAll(".times .time")

const data = []

doctor[0].addEventListener("click", function () {
    doctor[0].classList.toggle("chosen")
    doctor[1].classList.remove("chosen")



})
doctor[1].addEventListener("click", function () {
    doctor[1].classList.toggle("chosen")
    doctor[0].classList.remove("chosen")
})



//-------------
let services = document.querySelectorAll(".services_wrapper .service")
services[0].addEventListener("click", function () {
    services[0].classList.toggle("chosen")
    services[1].classList.remove("chosen")
    services[2].classList.remove("chosen")



})
services[1].addEventListener("click", function () {
    services[1].classList.toggle("chosen")
    services[0].classList.remove("chosen")
    services[2].classList.remove("chosen")
})
services[2].addEventListener("click", function () {
    services[2].classList.toggle("chosen")
    services[0].classList.remove("chosen")
    services[1].classList.remove("chosen")
})

// -------Calendar-------
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let day_section = document.querySelector(".days")
let current_date = document.querySelector(".calendar_head .month_year")
let date = new Date()
let this_year = date.getFullYear()

let real_year = this_year
let this_month_index = date.getMonth()
let real_month_index = this_month_index
let this_day = date.getDate()
let this_weekday = date.getDay()
let checkinputs = document.querySelectorAll(".month_inputs input")



function currentmoment() {
    current_date.innerHTML = `
                        <p>${months[this_month_index]}</p> 
                        <p>${this_year}</p>`
}
currentmoment()

let premonththisday = 0

function setcalendar() {

    let count_of_days = new Date(this_year, this_month_index + 1, 0).getDate()
    let count_of_days_premonth = new Date(this_year, this_month_index, 0).getDate()
    let weekday_of_firstday = new Date(this_year, this_month_index, 1).getDay()
    let weekday_of_lastday = new Date(this_year, this_month_index, count_of_days).getDay()


    let code = ''
    premonththisday = 0
    for (let j = count_of_days_premonth; j > count_of_days_premonth - weekday_of_firstday; j--) {
        code = `<li class="deactive"> </li>` + code
        premonththisday += 1

    }
    day_section.innerHTML += code
    code = ''
    for (let i = 1; i <= count_of_days; i++) {
        code += (i == this_day && (real_year == this_year && real_month_index == this_month_index)) ? `<li onclick="chose_day(${i - 1})" class="today ">${i}</li>` : `<li onclick="chose_day(${i - 1})">${i}</li>`
    }
    day_section.innerHTML += code
    code = ''
    for (let k = 1; k < 7 - weekday_of_lastday; k++) {
        code += `<li class="deactive"> </li>`
    }
    day_section.innerHTML += code





}

setcalendar()

function prev() {

    this_month_index = this_month_index - 1
    if (this_month_index == -1) {
        this_month_index = 11
        this_year -= 1
    }
    current_date.innerHTML = `
                        <p>${months[this_month_index]}</p> 
                        <p>${this_year}</p>`
    day_section.innerHTML = ""
    setcalendar()


}

function next() {


    this_month_index = this_month_index + 1
    if (this_month_index == 12) {
        this_month_index = 0
        this_year += 1
    }
    current_date.innerHTML = `
                        <p>${months[this_month_index]}</p> 
                        <p>${this_year}</p>`
    day_section.innerHTML = ""
    setcalendar()


}


let code = ""
for (let i = 0; i < months.length; i++) {
    code += `
            <div class="input_part">
                <p>${months[i].slice(0, 3)}</p>
                <input onclick="change_month()" id="${i}" name="months" type="radio">
            </div>
            `
}

function change_month() {
    let checkinputs = document.querySelectorAll(".month_inputs input")
    for (let j = 0; j < checkinputs.length; j++) {
        if (checkinputs[j].checked) {
            this_month_index = j
            current_date.innerHTML = `
                            <p>${months[this_month_index]}</p> 
                            <p>${this_year}</p>`
            day_section.innerHTML = ""
            setcalendar()

        }
    }
}


// _______End of Calendar_____


function times_hover(i) {
    for (let j = 0; j < times.length; j++) {
        times[j].classList.remove("timehover")
    }
    times[i].classList.add("timehover")
}

function chose_day(z) {
    for (let j = 0; j < times.length; j++) {
        times[j].classList.remove("hide")

    }
    let calendar_days = document.querySelectorAll(".days li")
    for (let j = 0; j < calendar_days.length; j++) {
        calendar_days[j].classList.remove("timehover")
    }
    calendar_days[z + premonththisday].classList.add("timehover")
}

// __________________________

const form = document.forms[0]
let fname = form.elements[0]
let surname = form.elements[1]
let email = form.elements[2]
let phone = form.elements[3]
let calendar_days = document.querySelectorAll(".days li")
let day_hours = document.querySelectorAll(".times .time")
let noBreak = true;

function nextprt(i) {
    steps[i + 1].classList.remove("hide")
    steps[i].classList.add("hide")

    if (i == 0) {
        if (doctor[1].classList.contains("chosen")) data.push({ Doctor: "Maria" })
        else if (doctor[0].classList.contains("chosen")) data.push({ Doctor: "Alex" })
        else {
            report()
            steps[0].classList.remove("hide")
            steps[1].classList.add("hide")
        }
    } else if (i == 1) {
        if (services[0].classList.contains("chosen")) data.push({ Service: "Oral Hygenie" })
        else if (services[1].classList.contains("chosen")) data.push({ Service: "Implants" })
        else if (services[2].classList.contains("chosen")) data.push({ Service: "Analysis" })
        else {
            report()
            steps[1].classList.remove("hide")
            steps[2].classList.add("hide")
        }

    } else if (i == 2) {

        for (let key of calendar_days) {
            if (key.classList.contains("timehover")) {
                for (let hour of day_hours) {
                    if (hour.classList.contains('timehover')) {
                        data.push({ Date: `${key.innerHTML}-${months[this_month_index]}-${this_year} / ${hour.innerHTML}  ` })
                        noBreak = false;
                        break
                    }
                }
            }
        }
        if (noBreak) {
            report()
            steps[2].classList.remove("hide")
            steps[3].classList.add("hide")
            
        }
        note()
        

    }



}


function prevprt(i) {
    steps[i - 1].classList.remove("hide")
    steps[i].classList.add("hide")
    data.pop()

}

const novigationbox = document.querySelector("#confirmation")

function confirm() {
    if (fname.value && surname.value && email.value) {
        novigationbox.style.top = "50%"
        data.push({
            Personal_Info: {
                Name: fname.value,
                Surname: surname.value, Email: email.value, Number: phone.value,
            }
        })
        console.log(data);
    } else report()


}

const rpbox = document.querySelector(".report")

function report() {
    rpbox.style.top = "70%"
    setTimeout(getdown, 2000)

}


function getdown() {
    rpbox.style.top = "100%"
}
let note1 = document.querySelector(".note")
let code1=''
function note(){
    code1=`
        <p>Staff: ${data[0].Doctor}</p>
        <p>Service: ${data[1].Service}</p>
        <p>Date: ${data[2].Date}</p>
    `
    note1.innerHTML=code1
}
