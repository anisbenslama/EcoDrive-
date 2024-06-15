


// ad hoverded class to selected list item 

let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach(item => {
    item.classList.remove("hovered");
  })
  this.classList.add("hovered");
}

list.forEach(item => item.addEventListener("mouseover", activeLink))

//menu toggle 

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
}


// sort tableau // 
function sortTable(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("candidatTable");
  switching = true;
  // Set the sorting direction initially to ascending
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[columnIndex];
      y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
      // Compare the content of the cells depending on the sorting direction
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// Add event listeners to delete coloumn 
window.onload = function () {
  var deleteButtons = document.querySelectorAll('ion-icon[name="trash-outline"]');
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var row = this.closest('tr');
      row.parentNode.removeChild(row);
    });
  });
};



// Ajoutez un écouteur d'événements à l'input de recherche selon candidat et selon Etat 
window.onload = function () {
  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function () {
    var filter = this.value.toLowerCase();
    var rows = document.querySelectorAll('#candidatTable tbody tr');
    rows.forEach(function (row) {
      var etat = row.cells[4].innerText.toLowerCase(); // La cinquième colonne contient l'état du candidat
      var candidat = row.cells[1].innerText.toLowerCase(); // La deuxième colonne contient le nom du candidat
      if (etat.indexOf(filter) > -1 || candidat.indexOf(filter) > -1) {
        row.style.display = ""; // Affiche la ligne si l'état du candidat ou le nom du candidat correspond
      } else {
        row.style.display = "none"; // Cache la ligne sinon
      }
    });
  });
};


window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/vehicules", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var vehicules = JSON.parse(xhr.responseText);
      var tableBody = document.querySelector('#candidatTable tbody');
      tableBody.innerHTML = '';
      vehicules.forEach(function (vehicule) {
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
          <td>${vehicule.id}</td>
          <td>${vehicule.marque}</td>
          <td>${vehicule.modele}</td>
          <td>${vehicule.disponibilite}</td>
          <td>${vehicule.numero_serie}</td>
          <td onclick="deleteVehicule(${vehicule.id})"><ion-icon name="trash-outline"></ion-icon></td>
        `;
      });
    }
  };
  xhr.send();
};


