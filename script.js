const mainDiv = document.querySelector('#mainDiv')
const createButton = document.querySelector('#createButton')
const deleteAllButton = document.querySelector('#deleteAllButton')

var divString = ["Navn: ", "Alder: ", "Hårfarge: ", "Hobby: ", "Favorittfag: "]
var arr = []
var updating = false;
var updInt
var amountofinputs = 5
var person = []
localStorage.arr

function loadData() {
    if (localStorage.getItem('arr') !== null) {
        arr = JSON.parse(localStorage.arr)
    }}


function saveData() {
    localStorage.arr = JSON.stringify(arr)
}

function createInfo() {
    if (updating == false) {
    
    if (checkLC() == false) {
        let bool = false
        for (let i = 0; i < amountofinputs; i++) {
            if (!getFieldData(i).length == 0) {
                bool = true }
        }
        if (bool == true) {
            for (let i = 0; i < amountofinputs; i++) {
                person[i] = getFieldData(i)
            }
            arr[arr.length] = person
            saveData()
            Load()
        }
        }   else {
            loadData()
            for (let i = 0; i < amountofinputs; i++) {
                person[i] = getFieldData(i)
            }
            arr.push(person)
            saveData()
            Load()
        }
       } else {
        loadData()
        for (let i = 0; i < amountofinputs; i++) {
            arr[updInt][i] = getFieldData(i)
        }
        saveData()

        updating = false;

        for (let t = 0; t < amountofinputs; t++) {
            document.getElementById("input" + t).value = ""
        }
        createButton.textContent = "Create"
        Load()
    }
    }


function updatePressed() {
    createButton.textContent = "Update"
    loadData()

    for (let i = 0; i < amountofinputs; i++) {
        getFieldData(i) = arr[updInt][i]
    }
}

function delKnappTrykket(delInt) {
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

function getFieldData(int){
    return document.getElementById('input'+int).value
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

        for (let t = 0; t < amountofinputs; t++) {
            liste.appendChild(document.createTextNode(divString[t] + arr[i][t] + ""))
            if (!t < 3) {liste.appendChild(document.createElement("br"))}
        }
        
        var knapp = document.createElement("button");
        knapp.textContent = "Delete"
        knapp.id = i
        knapp.addEventListener("click", function(index) {
        return function(){
            delKnappTrykket(index)
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

function checkLC() {
    if(typeof(localStorage.arr)=='undefined'){
    return true;
    } else {
    return false
    }
}
if (checkLC() == false) {Load()}

createButton.addEventListener('click', createInfo)
deleteAllButton.addEventListener('click', deleteAll)