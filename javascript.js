console.log("js loaded");

const inputs = document.querySelectorAll("input");

invalidMessages = { "firstname": "Tell me your first name.", "lastname": "Tell me your last name.", "email": "Give me a valid email address.", "phonenumber": "This phone number isn't valid.", "password": "Your password does not meet the requirements.", "confirmpassword": "These passwords don't match." }

//can't get this to work. later maybe
// inputs.forEach(input => {
//     input.addEventListener('input', function (e) {
//         if (!input.validity.valid || input.validity.valueMissing) {
//             e.target.setCustomValidity(invalidMessages[input.id]);
//             e.target.classList.remove('valid');
//             console.log("invalid")
//         }
//         else{
//             e.target.setCustomValidity('');
//             e.target.classList.add('valid');
//             console.log("valid")
//         }
//     }, false);
// })

phoneregex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/g
inputs[3].addEventListener("input", (e) => {

    if (e.inputType == "deleteContentBackward") {
        if (e.target.value.charAt(e.target.value.length - 1) == "-") {
            e.target.value = e.target.value.slice(0, -1)
        }
        return
    }

    if (!e.data.match(/[0-9]/g) || e.target.value.length == 13) {
        e.target.value = e.target.value.slice(0, -1)
        return
    }

    if (e.target.value.length == 4 && !e.target.value.match(/[0-9]{3}-[0-9]/g)) {
        e.target.value = e.target.value.slice(0, 3) + "-" + e.target.value.slice(3, 4)
    }
    else if (e.target.value.length == 8 && !e.target.value.match(/[0-9]{3}-[0-9]{3}-[0-9]/g)) {
        e.target.value = e.target.value.slice(0, 7) + "-" + e.target.value.slice(7, 8)
    }
})


reqregex = /(?=^.{8,}$)(?=.*\d)(?=.*[!?@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g

const req_list = document.querySelectorAll("#password-req li");
const parent = document.getElementById("password-req");

inputs[4].addEventListener("input", (e) => {
    console.log(e)
    let reqCount = 0

    req_list.forEach(element => {
        const req = element.dataset.req;
        const regex = new RegExp(req)

        if (regex.test(e.target.value)) {
            element.classList.add("req-met");
            reqCount++;
        }
        else {
            element.classList.remove("req-met");
        }
    });

    if (reqCount === req_list.length) {
        parent.classList.add("blue-text");

    } else {
        parent.classList.remove("blue-text");
    }
    validateConfirmPassword() ? inputs[5].classList.add("valid") : inputs[5].classList.remove("valid")
    if (e.target.value.length == 0) {
        inputs[5].classList.remove("valid")
    }
})

const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    // console.log("submit event called")
    validateConfirmPassword() ? true : (e.preventDefault(), inputs[5].focus())
    // form.reportValidity();
})

inputs[5].addEventListener("input", (e) => {
    validateConfirmPassword() ? e.target.classList.add("valid") : e.target.classList.remove("valid")
})

function validateConfirmPassword() {
    return inputs[4].value === inputs[5].value
}

const panel = document.querySelector("#panel_left div");

function createCross() {
    let cross = document.createElement('div')
    cross.classList.add("cross");

    cross.innerHTML = `<svg class="svgcross" width="100%" height="100%" viewBox="0 0 71 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <path d="M46.107,46.107l0,53.893l-22.1,0l0,-53.893l-24.007,0l0,-22.1l24.007,0l0,-24.007l22.1,0l0,24.007l24.008,0l-0,22.1l-24.008,0Z"/>
    </svg>`

    return cross

}

for (let i = 1; i < 8 * 5 - 4 + 1; i++) {
    panel.appendChild(createCross())
}