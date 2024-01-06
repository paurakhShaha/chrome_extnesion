const tabBtn = document.getElementById("tabbtn-el");
const saveBtn = document.getElementById("savebtn-el");
const delBtn = document.getElementById("delbtn-el");
const inputEl = document.getElementById("input-el");
let ulEl = document.getElementById("ul-el");
let myLeads = [];
// Retrieve leads from local storage
const localStorageValue = JSON.parse(localStorage.getItem("myleads"));
if (localStorageValue) {
  myLeads = localStorageValue;
  renderLeads(myLeads);
}

saveBtn.addEventListener("click", () => {
  if (inputEl.value) {
    // Add the input value to the leads array
    myLeads.push(inputEl.value);

    // Save leads to local storage
    setItem(myLeads);

    // Clear the input field
    inputEl.value = "";

  }
});

function renderLeads(leads) {
  // Clear existing list items
  ulEl.innerHTML = "";

  // Create a new li element for each lead
  leads.forEach(lead => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.textContent = lead;
    a.href = lead; // Adjust if leads are meant to be URLs
    a.target = "_blank";
    li.appendChild(a);

    // Append the li element to the ul element
    ulEl.appendChild(li);
  });
}

delBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = "";
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
    let url = tabs[0].url;
    console.log(url);
    myLeads.push(url)
    setItem(myLeads);
    
    // use `url` here inside the callback because it's asynchronous!
  });
  
});

function setItem(leads){
  localStorage.setItem("myleads", JSON.stringify(leads));
  renderLeads(myLeads);
}