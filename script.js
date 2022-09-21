const submit = document.querySelector(".submit");
const inputamount = document.querySelector(".inputamount");
const inputdescription = document.querySelector(".inputdescription");
const select = document.querySelector("#select");
const alldescription = document.querySelectorAll(".description");
const addedElement = document.querySelector(".added-element");
const container = document.querySelector(".container");
let somevalue = "option1";
let allItems = [];

let idcount = 0;

submit.addEventListener("click", addli);

function addli(e) {
  idcount++;
  let user = {
    id: "a" + idcount,
    amount: inputamount.value,
    description: inputdescription.value,
    expenseType: somevalue,
  };
  inputamount.value = "";
  inputdescription.value = "";
  let promiseWork = async () => {
    let post = await axios.post(
      "https://crudcrud.com/api/0092682ed04e4874a68b6fb65632e154/ExpenseDetail",
      user
    );

    let got = await axios.get(
      "https://crudcrud.com/api/0092682ed04e4874a68b6fb65632e154/ExpenseDetail"
    );
    show(got.data);
  };

  promiseWork();
}

function show(arr) {
  arr.forEach((element) => {
    let addedhtml = `<div class="added" id = >
            <li class="detail">${element.amount}-${element.description}-${
      element.expenseType
    }  </li>
            <button id="${element.id + "edit"}">Edit</button>
            <button id="${element.id + "delete"}">delete</button>
        </div>`;
    let added = document.querySelector(".added");
    addedElement.insertAdjacentHTML("beforeend", addedhtml);
    const editButton = document.querySelector(`#${element.id + "edit"}`);
    const deletButton = document.querySelector(`${element.id + "delete"}`);

    editButton.addEventListener("click", function (e) {
      inputamount.value = element.amount;
      inputdescription.value = element.description;
      select.value = element.expenseType;
      e.target.parentElement.remove();
      axios.delete(
        `https://crudcrud.com/api/0092682ed04e4874a68b6fb65632e154/ExpenseDetail/${element._id}`
      );
    });

    deletButton.addEventListener("click", function (e) {
      e.target.parentElement.remove();
      axios.delete(
        `https://crudcrud.com/api/0092682ed04e4874a68b6fb65632e154/ExpenseDetail/${element._id}`
      );
    });
  });
}

axios
  .get(
    "https://crudcrud.com/api/0092682ed04e4874a68b6fb65632e154/ExpenseDetail"
  )
  .then((response) => {
    show(response.data);
  });

function getSelectedValue() {
  somevalue = select.value;
  console.log(somevalue);
}

alldescription.forEach((description) => {
  description.addEventListener("click", function (e) {
    inputdescription.value = e.target.textContent;
  });
});
