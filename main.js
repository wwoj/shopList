const LOCAL_KEY = "www.shopList.www";
window.onload = () => {
  let itemsToBuy = [];
  const inputName = document.getElementById("productName");
  const inputValue = document.getElementById("productNumber");
  const addButton = document.getElementById("addButton");
  const mainTable = document.getElementById("tBody");
  const form = document.querySelector("form");

  const dataFromLocalStorage = localStorage.getItem(LOCAL_KEY);
  if (dataFromLocalStorage != null && dataFromLocalStorage.length > 2) {
    itemsToBuy = JSON.parse(dataFromLocalStorage);
    console.log("weszlo");
    buildTable(mainTable, itemsToBuy);
  } else {
    alert("Brak zakupów dodanych");
  }

  addButton.addEventListener("click", () => {
    if (isEmptyValue(inputName.value, inputValue.value)) {
      alert("Próbowałeś dodać pusty element");
      return;
    }
    createElement(itemsToBuy, inputName.value, inputValue.value);
    saveToLocal(itemsToBuy);
    deleteList(mainTable);
    buildTable(mainTable, itemsToBuy);
    clearForm(inputName, inputValue);
  });

  form.onsubmit = elem => {
    elem.preventDefault();
  };

  // items ->[{productName: 'pomidor', productAmount: 5}, {productName:'piwo', productAmount:1}]
  function buildTable(parent, items) {
    items.forEach((elem, index) => {
      let tr = document.createElement("tr");

      let idTd = document.createElement("td");
      idTd.innerText = index + 1;
      tr.appendChild(idTd);

      let td0 = document.createElement("td");
      td0.innerText = elem.productName;
      tr.appendChild(td0);

      let td1 = document.createElement("td");
      td1.innerText = elem.productAmount;
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("id", index);
      deleteButton.innerText = "Delete item";
      deleteButton.addEventListener("click", removeElement);
      td2.appendChild(deleteButton);
      tr.appendChild(td2);

      parent.appendChild(tr); //1. modyfikacja drzewa DOM
    });
  }

  function removeElement(even) {
    let element = even.target;
    element.style.background = "green";
    let idVal = parseInt(element.getAttribute("id"));
    deleteFromArray(itemsToBuy, idVal);
    saveToLocal(itemsToBuy);
    deleteList(mainTable);
    buildTable(mainTable, itemsToBuy);
  }
};

function createElement(items, name, amount) {
  let obj = {
    productName: name,
    productAmount: amount
  };
  items.push(obj);
}

function deleteFromArray(table, i) {
  table.splice(i, 1);
}

function deleteList(dest) {
  dest.innerHTML = "";
}

function isEmptyValue(name, value) {
  return name == "" || value == "";
}

function saveToLocal(items) {
  let item = JSON.stringify(items);
  localStorage.setItem(LOCAL_KEY, item);
}

function clearForm(name, count) {
  name.value = "";
  count.value = 0;
}
