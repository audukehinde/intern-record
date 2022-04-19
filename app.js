let firstName = document.querySelector(".first-name");
let lastName = document.querySelector(".last-name");
let salary = document.querySelector(".salary");
let dept = document.querySelector(".dept");
let btnSub = document.querySelector(".btn-sub");
let tableBody = document.getElementById("table-body");
const updateBtn = document.getElementById("updateBtn");
const btnAddIntern = document.getElementById('btnadd');
const form = document.querySelector('.form');
const close = document.querySelector('.close');

close.addEventListener('click', () => {
  form.style.display = 'none';
})

btnAddIntern.addEventListener('click', () => {
  form.style.display = 'block';
});

let interns = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let intern = {
    id: interns.length + 1,
    firstName: firstName.value,
    lastName: lastName.value,
    salary: salary.value,
    dept: dept.value,
  };

  interns.push(intern);
  // console.log(interns);
  // console.log(intern);

  firstName.value = "";
  lastName.value = "";
  salary.value = "";
  dept.value = "";
  // console.log("added!", interns.length);
  populateTable();
  form.style.display = "none";
});

const populateTable = () => {
  tableBody.innerHTML = "";
  interns.forEach((element) => {
    const row = document.createElement("tr");
    row.classList.add("my-row");
    
    row.append(tableData(element.id));
    row.append(tableData(element.firstName + " " + element.lastName));
    row.append(tableData(element.salary));
    row.append(tableData(element.dept));
    row.append(actions(element.id));

    // [1, 2, 3, 4, 5]
    // const dataId = document.createElement("td");
    // dataId.textContent = index + 1;
    // row.append(dataId);

    // const name = document.createElement("td");
    // name.textContent = element.firstName + element.lastName;
    // row.append(name);

    // const salary = document.createElement("td");
    // salary.textContent = element.salary;
    // row.append(salary);

    // const dept = document.createElement("td");
    // dept.textContent = element.dept;
    // row.append(dept);

    tableBody.append(row);
  });
};

const tableData = (data) => {
  const element = document.createElement("td");
  element.classList.add("my-space");
  element.textContent = data;
  return element;
};

const actions = (id) => {
  console.log(interns);
  const container = document.createElement("div");
  container.classList.add("mystyle");
  const editButton = document.createElement("button");
  editButton.classList.add("editbtn");
  editButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  editButton.addEventListener("click", () => editIntern(id));

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deletebtn");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => deleteIntern(id));

  container.appendChild(editButton);
  container.appendChild(deleteButton);
  return container;
};

// this function deletes an intern from the table and database
const deleteIntern = (id) => {
  interns = interns.filter((intern) => intern.id != id);
  populateTable();
};

const editIntern = (id) => {
  const intern = interns.find((intern) => intern.id == id);

  document.getElementById("firstName").value = intern.firstName;
  document.getElementById("lastName").value = intern.lastName;
  document.getElementById("salary").value = intern.salary;
  document.getElementById("dept").value = intern.dept;

  updateBtn.dataset.id = id;
  document.getElementById("editForm").style.display = "block";
};

updateBtn.addEventListener("click", (e) => updateIntern(e));

const updateIntern = (e) => {
  e.preventDefault();
  const intern = interns.find((intern) => intern.id == updateBtn.dataset.id);
  console.log(intern);

  // getting edit values
  intern.firstName = document.getElementById("firstName").value;
  intern.lastName = document.getElementById("lastName").value;
  intern.salary = document.getElementById("salary").value;
  intern.dept = document.getElementById("dept").value;

  // update global interns array with new value of the current intern
  interns[intern.id - 1] = intern;

  populateTable();
  document.getElementById("editForm").style.display = "none";
  console.log(interns);
};

// const tableData = (data) => (document.createElement("td").textContent = data);

// console.log(intern);

// [1,2,3,4,5], delete 4
