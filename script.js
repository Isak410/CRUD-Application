const mainDiv = document.querySelector('#mainDiv')
const createButton = document.querySelector('#createButton')
const deleteAllButton = document.querySelector('#deleteAllButton')
const navnFelt = document.querySelector('.navnFelt')
const alderFelt = document.querySelector('.alderFelt')
const hårfargeFelt = document.querySelector('.hårfargeFelt')
const hobbyFelt = document.querySelector('.hobbyFelt')
const favorittfagFelt = document.querySelector('.fagFelt')

var divString = ["Navn: ", "Alder: ", "Hårfarge: ", "Hobby: ", "Favorittfag: "]
var arr = []
var navn;
var alder;
var hårfarge;
var hobby;
var favorittfag;
var updating = false;
var delInt = 0
var updInt
var valueInAllFields = true
var clearLC = false
localStorage.arr


if (localStorage.getItem('navn') !== null) {
    testbool = true
}   

function loadData() {
    if (localStorage.getItem('arr') !== null) {
        arr = JSON.parse(localStorage.arr)
    }
}

function saveData() {
    localStorage.arr = JSON.stringify(arr)
}

function createInfo() {
    if (updating == false) {
    
    if (clearLC == false) {
    
        if (!navnFelt.value.length == 0 && !alderFelt.value.length == 0 && !hårfargeFelt.value.length == 0 && !hobbyFelt.value.length == 0 && !favorittfagFelt.value.length == 0) {
            person = [
                navnFelt.value,
                alderFelt.value,
                hårfargeFelt.value,
                hobbyFelt.value,
                favorittfagFelt.value
            ]
            arr[arr.length] = person
            saveData()
            Load()
        }   else {
        }
    
        }   else {
            loadData()
            
            person = [
                navnFelt.value,
                alderFelt.value,
                hårfargeFelt.value,
                hobbyFelt.value,
                favorittfagFelt.value
            ]
            arr[arr.length] = person

            clearLC = false
            saveData()
            Load()
        }
       } else {
        loadData()
        for (let i = 0; i < 5; i++) {
            arr[updInt][i] = document.getElementById("input" + i).value
        }
        saveData()

        updating = false;

        for (let t = 0; t < 5; t++) {
            document.getElementById("input" + t).value = ""
        }
        createButton.textContent = "Create"
        Load()
    }
    }


function updatePressed() {
    createButton.textContent = "Update"
    loadData()

    for (let i = 0; i < 5; i++) {
        document.getElementById("input"+i).value = arr[updInt][i]
    }
}

function delKnappTrykket() {
    if (mainDiv.childElementCount == 1) {
        localStorage.clear()
        location.reload()
    } else {
        if (updating == false) {
        arr.splice(delInt, 1);
        saveData()
        Load()
    }
    }
}

function Load() {
    loadData()
    mainDiv.innerHTML = ""
    for (var i = 0; i < arr.length; i++) {

        var liste = document.createElement("list");
        liste.className = "listklasse"
        liste.style.fontSize = "30px"
        liste.style.display = "flex"
        liste.style.flexDirection = "column"

        for (let t = 0; t < 5; t++) {
            liste.appendChild(document.createTextNode(divString[t] + arr[i][t] + ""))
            if (!t < 3) {liste.appendChild(document.createElement("br"))}
        }
        
        var knapp = document.createElement("button");
        knapp.textContent = "Delete"
        knapp.id = i
        knapp.addEventListener("click", function(index) {
        return function(){
            delInt = index
            delKnappTrykket()
            }
        }(i))
        liste.appendChild(knapp);

        var updknapp = document.createElement("button");
        updknapp.textContent = "Update"
        updknapp.id = i
        updknapp.addEventListener("click", function(index) {
            return function(){
                updInt = index
                updating = true;
                updatePressed()
            }
          }(i))
        liste.appendChild(updknapp);
        mainDiv.appendChild(liste);
    }
}

function deleteAll() {
    if (updating == false) {
        localStorage.clear()
        location.reload()
    }
}

if(typeof(localStorage.arr)=='undefined'){
    clearLC = true
}   else {
    clearLC = false
    Load()
}

createButton.addEventListener('click', createInfo)
deleteAllButton.addEventListener('click', deleteAll)