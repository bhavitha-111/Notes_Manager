const apiUrl="/notes";

let notesCache=[];

/* Navigation */

function showSection(id){

const sections=document.querySelectorAll(".section");

sections.forEach(sec=>sec.style.display="none");

document.getElementById(id).style.display="block";

if(id==="important"){
loadImportantNotes();
}

if(id==="previous"){
loadPreviousNotes();
}

}

showSection("home");


/* Fetch Notes */

function fetchNotes(){

fetch(apiUrl)
.then(res=>res.json())
.then(data=>{

notesCache=data;

displayNotes(data);

});

}


/* Display Notes */

function displayNotes(notes){

const list=document.getElementById("notesList");

list.innerHTML="";

notes.forEach(note=>{

const li=document.createElement("li");

const date=new Date().toLocaleDateString();

li.innerHTML=`

<div class="noteTitle">${note.title}</div>

<div>${note.content}</div>

<div class="noteDate">Created: ${date}</div>

<div class="noteButtons">

<button class="editBtn" onclick='editNote(${JSON.stringify(note)})'>
<i class="fa fa-edit"></i> Edit
</button>

<button onclick='markImportant(${JSON.stringify(note)})'>
⭐ Important
</button>

<button class="deleteBtn" onclick="deleteNote(${note.id})">
<i class="fa fa-trash"></i> Delete
</button>

</div>

`;

list.appendChild(li);

});

}


/* Search */

function searchNotes(){

const keyword=document.getElementById("searchBox").value.toLowerCase();

const filtered=notesCache.filter(note =>
note.title.toLowerCase().includes(keyword) ||
note.content.toLowerCase().includes(keyword)
);

displayNotes(filtered);

}


/* Add or Update */

function addOrUpdateNote(){

const id=document.getElementById("noteId").value;

const title=document.getElementById("title").value;

const content=document.getElementById("content").value;

const note={title,content};

if(id){

fetch(`${apiUrl}/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(note)
}).then(()=>{
resetForm();
fetchNotes();
});

}else{

fetch(apiUrl,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(note)
}).then(()=>{
resetForm();
fetchNotes();
});

}

}


/* Edit */

function editNote(note){

document.getElementById("noteId").value=note.id;

document.getElementById("title").value=note.title;

document.getElementById("content").value=note.content;

showSection("notes");

}


/* Delete */

function deleteNote(id){

fetch(`${apiUrl}/${id}`,{
method:"DELETE"
}).then(fetchNotes);

}


/* Important Notes */

function markImportant(note){

let importantNotes=
JSON.parse(localStorage.getItem("importantNotes")) || [];

importantNotes.push(note);

localStorage.setItem(
"importantNotes",
JSON.stringify(importantNotes)
);

alert("Added to Important Notes");

}


/* Load Important */

function loadImportantNotes(){

let importantNotes=
JSON.parse(localStorage.getItem("importantNotes")) || [];

const list=document.getElementById("importantList");

list.innerHTML="";

importantNotes.forEach(note=>{

const div=document.createElement("div");

div.innerHTML=`

<h3>${note.title}</h3>

<p>${note.content}</p>

<hr>

`;

list.appendChild(div);

});

}


/* Previous Notes */

function loadPreviousNotes(){

const list=document.getElementById("previousList");

list.innerHTML="";

notesCache.forEach(note=>{

const div=document.createElement("div");

div.innerHTML=`

<h3>${note.title}</h3>

<p>${note.content}</p>

<hr>

`;

list.appendChild(div);

});

}


/* Reset */

function resetForm(){

document.getElementById("noteId").value="";
document.getElementById("title").value="";
document.getElementById("content").value="";

}

fetchNotes();
