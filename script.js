let newNote = document.getElementById("newNote")
let actualNote = document.getElementById("actualNote")
let saveNote = document.getElementById("saveNote")
let titleNote = document.getElementById("titleNote")
let textAreaNote = document.getElementById("textAreaNote")
let userNotesList = document.getElementById("userNotesList")
let note1 = document.getElementById("note1")
let note2 = document.getElementById("note2")
let deleteNote = document.getElementById("deleteNote")
let search = document.getElementById("search")

let currentNote = null

newNote.addEventListener("click", function(){
    for(i=0;i<userNotesList.children.length-1;i++){
        userNotesList.children[i].style.backgroundColor = "rgb(255, 255, 255)"
    }
    currentNote = null
    actualNote.style.visibility = "visible"
    titleNote.value=''
    textAreaNote.value=''
})

saveNote.addEventListener("click", function(event){
    event.preventDefault()

    if (titleNote.value=="")
        {
        alert("Please add a title")
    }
    else if(textAreaNote.value=="")
    {
        alert("Please add to the note area")
    }
    else if(currentNote==null){
        let ListItem = document.createElement("li")
        let inputTitle = document.createElement("span")
        let noteText = document.createElement("span")
        let dateOfPost = document.createElement("span")

        let date= new Date()
        let options={
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }

        dateOfPost.textContent = (date.toLocaleDateString("en-GB", options))
        inputTitle.textContent = titleNote.value
        noteText.textContent = textAreaNote.value

        

        ListItem.classList.add("notesListItem")
        inputTitle.classList.add("title")
        let dateShorthand = document.createElement("div")
        dateShorthand.classList.add("dateShorthand")
        dateOfPost.classList.add("date")
        noteText.classList.add("user-inputShorthand")

        dateShorthand.appendChild(dateOfPost)
        dateShorthand.appendChild(noteText)
        
        ListItem.appendChild(inputTitle)
        ListItem.appendChild(dateShorthand)

        userNotesList.insertBefore(ListItem, userNotesList.firstChild)
        ListItem.addEventListener('click', openNote)
        currentNote="savedAlready"
        userNotesList.firstChild.style.backgroundColor = "rgb(185, 185, 185)"
        }
    else{
        if(currentNote!== "savedAlready"){
            const individualTitle = currentNote.querySelector(".title")
            const individualNote = currentNote.querySelector(".user-inputShorthand")
            const individualDateOfPost = currentNote.querySelector(".date")
            individualTitle.textContent=titleNote.value
            individualNote.textContent=textAreaNote.value

            let date= new Date()
        let options={
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }

        individualDateOfPost.textContent = (date.toLocaleDateString("en-GB", options))
        userNotesList.insertBefore(currentNote, userNotesList.firstChild)

        }
        else{
            const individualTitle = userNotesList.firstChild.querySelector(".title")
            const individualNote = userNotesList.firstChild.querySelector(".user-inputShorthand")
            individualTitle.textContent=titleNote.value
            individualNote.textContent=textAreaNote.value
        }
    }  
})

deleteNote.addEventListener('click', function(event){
    actualNote.style.visibility = "hidden"
    if (currentNote!==null && currentNote !== 'savedAlready'){
        currentNote.remove()
    }
    if (currentNote == 'savedAlready'){
            userNotesList.firstChild.remove()
        }
})

search.addEventListener("input", function(event){
    event.preventDefault()
    let filter = search.value.toUpperCase()
    counter = 0
    for(i=0; i<userNotesList.children.length-1 ; i++){
        postFiltering = userNotesList.children[i]
        userNotesList.children[i].style.display = ""
        const title = postFiltering.querySelector(".title").textContent.toUpperCase()
        const date = postFiltering.querySelector(".date").textContent.toUpperCase()
        const body = postFiltering.querySelector(".user-inputShorthand").textContent.toUpperCase()
        if(title.includes(filter)==true || date.includes(filter)==true || body.includes(filter)==true){
            counter++
        }
        if (counter==0){
            userNotesList.children[i].style.display = "none"
        }
        counter =0
    }
})


function openNote(event) {
    for(i=0;i<userNotesList.children.length-1;i++){
        userNotesList.children[i].style.backgroundColor = "rgb(255, 255, 255)"
    }

    const individualPost= event.currentTarget
    const individualTitle= individualPost.querySelector(".title")
    const individualNote= individualPost.querySelector(".user-inputShorthand")

    titleNote.value=individualTitle.textContent
    textAreaNote.value=individualNote.textContent
    actualNote.style.visibility = "visible"
    currentNote=event.currentTarget

    event.currentTarget.style.backgroundColor = "rgb(185, 185, 185)"
}

note1.addEventListener('click', openNote)
note2.addEventListener('click', openNote)