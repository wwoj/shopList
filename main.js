const localKey = "www.shopList.www"
window.onload = () => {
    let localdata
        //localStorage.clear();
        //moj klucz do zakopow: www.shopList.www
    let shopTable = [];
    const inputName = document.getElementById("productName");
    const inputValue = document.getElementById("productNumber");
    const addButton = document.getElementById("addButton");
    const mainTable = document.getElementById("tBody");
    const form = document.querySelector("form");

    // checking if any list is present;
    if ((localStorage.getItem(localKey) != null) && (localStorage.getItem(localKey).length > 2)) {
        shopTable = JSON.parse(localStorage.getItem(localKey));
        console.log("weszlo");
        deleteList(mainTable);
        buildTable(mainTable, shopTable);
        //console.log(localStorage.getItem(localKey));
    } else {
        alert("Brak zakupów dodanych");
    }

    addButton.addEventListener("click", () => {
        if (emptyInput(inputName.value, inputValue.value)) {
            createElement(shopTable, inputName.value, inputValue.value);
            saveToLocal(shopTable);
            deleteList(mainTable);
            buildTable(mainTable, shopTable);
        } else {
            alert("Próbowałeś dodać pusty element");
        }

    });




    /////////////// Blokowanie dzialania formularza
    form.onsubmit = elem => {
        elem.preventDefault();
    };




    function buildTable(parent, table) {

        table.forEach((elem, index) => {
            let tr = document.createElement("tr");
            parent.appendChild(tr);
            let td0 = document.createElement("td");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            td0.innerText = elem.productName;
            td1.innerText = elem.productAmount;
            let deleteButton = document.createElement("button");
            td2.appendChild(deleteButton);
            deleteButton.setAttribute("id", index);
            deleteButton.innerText = "Delete item";
            deleteButton.addEventListener("click", changColor);

        });
    }


    function changColor(even) {
        let element = even.target;
        element.style.background = "green";
        let idVal = parseInt(element.getAttribute("id"));

        // Delete from table

        deleteFromTable(shopTable, idVal);
        shopTable.splice(idVal, 1);
        //Save to localstorage
        let updatedTable = JSON.stringify(shopTable);
        localStorage.setItem(localKey, updatedTable)
            //Delete from TR
        let parent = element.parent;

        let grandParent = element.parentNode.parentNode;

        grandParent.remove();
    }
};

function createElement(table, name, amount) {
    let obj = {
        productName: name,
        productAmount: amount
    }
    table.push(obj);
}

function deleteFromTable(table, i) {
    table.splice(i, 0);
}





function deleteList(dest) {
    while (dest.hasChildNodes()) {
        dest.removeChild(dest.firstChild);
    }
}


//Przerobic na obiekty\
//Przerobic na JSON

// check if value is not empty:
function emptyInput(name, value) {
    if (value == "" || name == "" || value == 0) {
        return 0;
    } else {
        return 1;
    }

}
// convert to JSON
function saveToLocal(table) {
    let item = JSON.stringify(table);
    localStorage.setItem(localKey, item);
}