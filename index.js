showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let updatetaskbtn = document.getElementById("updatetaskbtn");

addtaskbtn.addEventListener("click", function () {
  let addtaskinputval = addtaskinput.value;
  //   console.log(addtaskinputval);
  let list = localStorage.getItem("localtask");
  if (list == null) {
    templist = [];
  } else {
    templist = JSON.parse(list);
  }

  templist.push(addtaskinputval);
  localStorage.setItem("localtask", JSON.stringify(templist));
  addtaskinput.value = "";
  showtask();
});

updatetaskbtn.addEventListener("click", function () {
  let updatetaskindex = document.getElementById("updatetaskindex");
  let updatetaskinput = document.getElementById("updatetaskinput");

  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveindex = updatetaskindex.value;

  taskObj[saveindex] = updatetaskinput.value;
  localStorage.setItem("localtask", JSON.stringify(taskObj));

  update_form.style.display = "none";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();

});

function showtask() {
  let html = "";
  let alllists = document.getElementById("show_all_lists");
  let list = localStorage.getItem("localtask");

  if (list == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(list);
  }

  taskObj.forEach((item, index) => {
    html += `<div class="listitem">
                    <div class="listitem1"> ${index + 1}.</div>
                    <div class="listitem2"> ${item} </div>
                    <button type="button" onclick="edititem(${index})" class="listitem3">Edit</button>
                    <button type="button" onclick="deleteitem(${index})" class="listitem4">X</button>
                </div>`;
  });

  //   console.log(taskObj.length);
  if (taskObj.length == 0) {
    alllists.innerHTML = "NO TASKS :)";
  } else {
    alllists.innerHTML = html;
  }
}

function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

function edititem(index) {
  let updatetaskinput = document.getElementById("updatetaskinput");
  let updatetaskbtn = document.getElementById("updatetaskbtn");
  let update_form = document.getElementById("update_form");
  let updatetaskindex = document.getElementById("updatetaskindex");

  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);

  update_form.style.display = "flex";
  updatetaskindex.value = index;
  updatetaskinput.value = taskObj[index];

  showtask();
}

// updatetaskbtn.addEventListener("click", function(){
//   setTimeout(() => {

//     let updatetaskbtn = document.getElementById("updatetaskbtn");
//     updatetaskbtn.style.display = "none";

//   },1000)
// })
