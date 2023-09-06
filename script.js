let noteAdd = document.getElementById("noteTxt");
let sound = new Audio()
let addBtn = document.getElementById("addBtn");
autoShowNotes()
// 
// let notelist = []

document.getElementById("noteTxt").addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        addItemsOnLocalStrg()
    }
})
addBtn.addEventListener("click", addItemsOnLocalStrg)


function addItemsOnLocalStrg() {
    if (noteAdd.value.length == 0) {
        alert("Write something Before adding something on the list")
        return
    }
    let oldNotes = localStorage.getItem("myNotes")
    if (oldNotes === null) {

        localStorage.setItem("myNotes", JSON.stringify([noteAdd.value]))
        noteAdd.value = ""
    }
    else {
        let x = JSON.parse(localStorage.getItem("myNotes"))
        x.push(noteAdd.value)
        localStorage.setItem("myNotes", JSON.stringify(x))
        noteAdd.value = ""
    }

    showMyNotes()
}

function showMyNotes() {
    sound.src = "added.wav"
    sound.play()
    let container = document.getElementById("noteList")
    let child = document.createElement("div")
    child.classList.add("notes")
    
    let myNotes = JSON.parse(localStorage.getItem("myNotes"))
    myNotes.forEach(function (element, index) {
        child.innerHTML = `
        <div class="textContent" id="note-${index}">
        <h1><i class="fa-solid fa-list-check"></i> Notes ${index + 1}</h1>
        <p class="noteText copyTxt${index}">${myNotes[index]}</p>
        </div>
        <div class="noteIcon">
       <p onclick="removeTask(${index})">Task Completed? <i class="fa-regular fa-square-check"></i></p>
       <p onclick="copyText(${index})">Copy text <i class="fa-regular fa-copy"></i></p>
        </div>
        `
        container.appendChild(child)
    })
}


function autoShowNotes() {
    
    let container = document.getElementById("noteList")
    let myNotes = JSON.parse(localStorage.getItem("myNotes"))
    if (myNotes == null) {
        return
    }
    myNotes.forEach(function (element, index) {
        let child = document.createElement("div")
        child.classList.add("notes")
        
        child.innerHTML = `
        
            <div class="textContent" id="note-${index}">
            <h1><i class="fa-solid fa-list-check"></i> Notes ${index + 1}</h1>
            <p class="noteText copyTxt${index}">${myNotes[index]}</p>
            </div>
            <div class="noteIcon">
           <p onclick="removeTask(${index})">Task Completed? <i class="fa-regular fa-square-check"></i></p>
           <p onclick="copyText(${index})">Copy text <i class="fa-regular fa-copy"></i></p>
           
            </div>
       
        `
        container.appendChild(child)
    })
}

function removeTask(id){
    
    sound.src = "click.wav"
    sound.play()
    let myNotes = JSON.parse(localStorage.getItem("myNotes"))
    myNotes.splice(id,1)
    localStorage.setItem("myNotes",JSON.stringify(myNotes))
    document.getElementById("noteList").innerHTML = ""
    autoShowNotes()
}

function copyText(id){
    sound.src = "copy.flac"
    sound.play()
    let copyContent = document.querySelector(`.copyTxt${id}`)
    let textArea = document.createElement("textArea")
    textArea.value = copyContent.innerText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
}


document.getElementById("search").addEventListener("keyup",searchNotes)
function searchNotes(){
    let searchTxt = document.getElementById("search").value
    let noteCard = document.getElementsByClassName("notes")
    // console.log(Array.from(noteCard))
    Array.from(noteCard).forEach(function(element,index){
        let txt = element.getElementsByTagName("p")
        if(txt[0].innerText.includes(searchTxt)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
    })
}