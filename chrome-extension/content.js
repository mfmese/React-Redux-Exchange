console.log("YapıKredi Extension is running");

setTakipListem();

timeOut();

function timeOut() {
  setTimeout(function () {
    ready();
  }, 1000);
}

function refresh(e) {
  timeOut();
}

function ready() {
  console.log("YapıKredi Portfoy is ready");

  var table = document.getElementById("openStockContractsDataTable");

  var profit = 0;
  var total = 0;
  var totalLot = 0;
  var totalLotCanSell = 0;

  if (table === null) {
    timeOut();
    return;
  }

  var refreshButton = document.getElementsByClassName(
    "btn btn-label btn-nav-action hidden-xs margin-top-15"
  )[0];
  refreshButton.addEventListener("click", refresh);

  var tableElements = table.children[0];

  var elements = Array.from(tableElements.children);
  elements.forEach((x) => {
    var elementInside = Array.from(x.children);
    profit += parseFloat(elementInside[5].textContent);
    total += parseFloat(
      elementInside[7].textContent
        .replace(".", "")
        .replace(",", ".")
        .replace(" ", "")
    );
    totalLot += parseFloat(
      elementInside[1].textContent
        .replace(".", "")
        .replace(",", ".")
        .replace(" ", "")
    );
    totalLotCanSell += parseFloat(
      elementInside[2].textContent
        .replace(".", "")
        .replace(",", ".")
        .replace(" ", "")
    );
  });

  var tr = document.createElement("tr");
  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode("Toplam"));
  table.children[0].appendChild(tr);

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(totalLot));

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(totalLotCanSell));

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(""));

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(""));

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(""));

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(profit + " TL"));

  var td = tr.appendChild(document.createElement("td"));
  td.setAttribute("class", "text-right table-row-padding-0 text-right");
  td.setAttribute("style", "color: white");
  td.appendChild(document.createTextNode(total + " TL"));

  tr.style.backgroundColor = "#333333";
  table.children[0].appendChild(tr);
}

function setTakipListem() {
  setTimeout(function () {
    document
      .getElementsByClassName("scroll")[0]
      .setAttribute("style", "max-height: 1050px; overflow: auto;");
  }, 2000);
}
