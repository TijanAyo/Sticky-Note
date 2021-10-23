const notesContainer = document.getElementById("main");
const addnotesButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const NotesElement = CreateNotes(note.id, note.content);
    notesContainer.insertBefore(NotesElement, addnotesButton);
});

addnotesButton.addEventListener("click", () => addNotes());

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes") || "[]");
}

function SaveNotes(notes){
    localStorage.setItem("stickynotes", JSON.stringify(notes));
}


function CreateNotes(id, content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Double click on a note to delete";

    element.addEventListener("change", () =>{
        UpdateNotes(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const delete_notes = confirm(`Are you sure you want to delete "${element.value}" from your notes?`);

        if(delete_notes){
            DeleteNotes(id, element);
        }
    })

    return element;
}

function addNotes(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const NotesElement = CreateNotes(noteObject.id, noteObject.content);
    notesContainer.insertBefore(NotesElement, addnotesButton);


    notes.push(noteObject);
    SaveNotes(notes);
}

function UpdateNotes(id, newContent){
    const notes = getNotes();
    const targetnote = notes.filter(note => note.id == id)[0];

    targetnote.content = newContent;
    SaveNotes(notes); 
}

function DeleteNotes(id, element){
    const notes = getNotes().filter(note => note.id != id);
    SaveNotes(notes);
    notesContainer.removeChild(element);
}