console.log("from script file");

let up = 0;

let cursorX;
let cursorY;

let mouseleft = 0;

document.addEventListener('mouseleave', (event) => {
    mouseleft = 1;
    
});
document.addEventListener('mouseenter', (event) => {
    mouseleft = 0;
    
});

document.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    
});

function optionsHover(e){
    console.log(e.target.parentElement);
    
    if (e.target.classList.contains("options-button"))
        e.target.style.backgroundColor = "#eeeeee";
    else if (e.target.parentElement.classList.contains("options-button"))
        e.target.parentElement.style.backgroundColor = "#eeeeee";
    const newComment = document.createElement("a");
    newComment.textContent = "Open Settings menu.";
    newComment.className = "comment";
    newComment.style.top = "105%";
    newComment.style.right = "2%";
    const elements = document.querySelector("#main-header").querySelectorAll(".comment");
    if (elements.length === 0)
        document.querySelector("#main-header").appendChild(newComment);
}

function optionsUnhover(e){
    if (e.target.classList.contains("options-button"))
        e.target.style.backgroundColor = "#ffffff";
    else if (e.target.parentElement.classList.contains("options-button"))
        e.target.parentElement.style.backgroundColor = "#ffffff";
    const toDelete = document.querySelector("#main-header").querySelector(".comment");
    toDelete.remove();
}

async function optionsClick(e){
    let s = "";
    try {
        const response = await fetch('http://127.0.0.1:8000/random'); // Wait for the fetch
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        s = await response.json(); // Wait for the response text
        console.log(`s set to ${s}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    if (e.target.classList.contains("options-button"))
        e.target.style.backgroundColor = "#dddddd";
    else if (e.target.parentElement.classList.contains("options-button"))
        e.target.parentElement.style.backgroundColor = "#dddddd";
    up = 1;
    const newObjectList = document.createElement("ol");
    newObjectList.className = "popup";
    
    let li1 = document.createElement("li");
    li1.className = "popup-item";
    let li2 = document.createElement("li");
    li2.className = "popup-item";
    let li3 = document.createElement("li");
    li3.className = "popup-item";
    console.log(`li1 content set to ${s[0].li1}`);
    console.log(s);
    li1.textContent = s[0].li1;
    li2.textContent = s[1].li1;
    li3.textContent = s[2].li1;
    newObjectList.appendChild(li1);
    newObjectList.appendChild(li2);
    newObjectList.appendChild(li3);
    const elements = document.querySelectorAll(".popup");
    console.log("WEIN");
    if (elements.length < 2){
        console.log("WEADD");
        document.querySelector("#main-header").appendChild(newObjectList);
        newObjectList.style.left = "80%";
        newObjectList.style.top = "100%";
    }
        
}

function optionsUnclick(e){
    if (mouseleft){
        console.log("Outside main area.");
        document.querySelector(".options-button").focus();
        return;
    }
    if (e.target.classList.contains("options-button"))
        e.target.style.backgroundColor = "#eeeeee";
    else if (e.target.parentElement.classList.contains("options-button"))
        e.target.parentElement.style.backgroundColor = "#eeeeee";
    document.querySelector("#main-header").querySelector(".popup").remove();
}

function loginHover(e){
    if (e.target.classList.contains("login-button"))
        e.target.style.backgroundColor = "#ee4400";
    else if (e.target.parentElement.classList.contains("login-button"))
        e.target.parentElement.style.backgroundColor = "#ee4400";
    const newComment = document.createElement("a");
    newComment.textContent = 'Log in to Reddit.';
    newComment.className = "comment";
    newComment.style.top = "105%";
    console.log(document.querySelector(".login-button").style.right);
    newComment.style.right = "5%";
    const elements = document.querySelector("#main-header").querySelectorAll(".comment");
    if (elements.length === 0)
        document.querySelector("#main-header").appendChild(newComment);
    
    
}

function loginUnhover(e){
    if (e.target.classList.contains("login-button"))
        e.target.style.backgroundColor = "#ff5500";
    else if (e.target.parentElement.classList.contains("login-button"))
        e.target.parentElement.style.backgroundColor = "#ff5500";
    const toDelete = document.querySelector("#main-header").querySelector(".comment");
    toDelete.remove();
}

function loginClick(e){
    if (e.target.classList.contains("login-button"))
        e.target.style.backgroundColor = "#cc3300";
    else if (e.target.parentElement.classList.contains("login-button"))
        e.target.parentElement.style.backgroundColor = "#cc300";
}

function loginUnclick(e){
    if (e.target.classList.contains("login-button"))
        e.target.style.backgroundColor = "#ee4400";
    else if (e.target.parentElement.classList.contains("login-button"))
        e.target.parentElement.style.backgroundColor = "#ee4400";
}


// document.addEventListener('mousedown', (e)=>{
//     if (e.target !== document.querySelector(".options-button") && e.target.parentElement !== document.querySelector(".options-button")){
//         document.querySelector(".popup").remove();
//         up = 0;
//     }
// });

document.querySelector(".options-button").addEventListener('mouseover', optionsHover);
document.querySelector(".options-button").addEventListener('mouseleave', optionsUnhover);

document.querySelector(".options-button").addEventListener('focus', optionsClick);
// document.querySelector(".options-button").addEventListener('blur', optionsUnclick);

document.querySelector(".login-button").addEventListener('mouseover', loginHover);
document.querySelector(".login-button").addEventListener('mouseleave', loginUnhover);

document.querySelector(".login-button").addEventListener('mousedown', loginClick);
document.querySelector(".login-button").addEventListener('mouseup', loginUnclick);

document.querySelector(".search-container").addEventListener('mouseover', (e)=>{
    console.log("MOUSEOVER");
    document.querySelector(".search-container").style.backgroundColor = "#dddddd";
});

document.querySelector(".search-container").addEventListener('mouseleave', (e)=>{
    if (document.activeElement === document.querySelector(".search-input"))
        document.querySelector(".search-container").style.backgroundColor = "#ffffff";
    else
        document.querySelector(".search-container").style.backgroundColor = "#eeeeee";
});

document.querySelector(".options-button").addEventListener('mouseleave', optionsUnhover);

// function activate(e){
//     if (document.activeElement.classList.contains("search-input")){
//         console.log("YES");
//         console.log(document.activeElement.parentElement);
//         document.activeElement.parentElement.style.borderColor = "#ff0000";
//     }
// }

document.querySelector(".search-input").addEventListener('focus', (e) => {
    console.log(e.target);
    e.preventDefault();
    e.target.parentElement.style.borderColor = "#0000ff";
    e.target.parentElement.style.backgroundColor = "#ffffff";
    const newObjectList = document.createElement("ol");
    newObjectList.className = "popup";
    let li1 = document.createElement("li");
    li1.className = "popup-item";
    let li2 = document.createElement("li");
    li2.className = "popup-item";
    let li3 = document.createElement("li");
    li3.className = "popup-item";
    li1.textContent = "Log In/ Sign Up";
    li2.textContent = "Advertise On Reddit";
    li3.textContent = "Shop Collectible Avatars";
    newObjectList.appendChild(li1);
    newObjectList.appendChild(li2);
    newObjectList.appendChild(li3);
    const elements = document.querySelectorAll(".popup");
    console.log("WEIN");
    if (elements.length < 2){
        console.log("WEADD");
        document.querySelector("#main-header").appendChild(newObjectList);
        newObjectList.style.left = "20%";
        newObjectList.style.top = "100%";
    }
});

document.querySelector(".search-input").addEventListener('blur', (e) => {
    if (mouseleft){
        console.log("Outside main area.");
        return;
    }
    console.log(e.target);
    e.preventDefault();
    e.target.parentElement.style.borderColor = "transparent";
    e.target.parentElement.style.backgroundColor = "#eeeeee";
    let el = document.querySelector("#main-header").querySelector(".popup");
    el.remove();
});

document.querySelector(".search-container").addEventListener('mousedown', (e) => {
    // console.log(e.target);
    e.preventDefault();
    console.log(document.querySelector(".search-input"))
    document.querySelector(".search-input").focus();
});

document.addEventListener('mousedown', (e) => {
    const toDelete = document.querySelector(".popup");
    if (toDelete)
        toDelete.remove();
    const myButton = document.querySelector(".options-button");
    myButton.blur();
});

document.querySelector(".testButton").addEventListener('mousedown', async (e) => {
    try {
        console.log("FETCHING");
        const response = await fetch('http://127.0.0.1:8000/submit/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: 0,
                title: "Me", 
                content: "I''m the best"
            }),

            }
        ); // Wait for the fetch
        console.log("RECEIVED");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        s = await response.json(); // Wait for the response text
        console.log(`s set to ${s}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// document.querySelector(".search-container").addEventListener('mousedown', activate);