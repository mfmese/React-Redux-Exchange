const $ = require("jquery");
$.DataTable = require("datatables.net");

export default function TableExtension(tableId) {
  let dataTable = $("#" + tableId).DataTable({
    destroy: true,
    responsive: {
      details: false,
    },
    scrollX: true,
    paging: false,
    columnDefs: [
      {
        targets: [1],
        // orderData: [0, 1],
        visible: false,
        searchable: false,
      },
      {
        targets: [0],
        bSortable: false, //disable sorting buttons at edit delete button's field
      },
      // {
      //   targets: [$("thead tr th").length - 1],
      //   bSortable: false,
      // },
    ],
  });

  window.addEventListener("resize", setResponsiveTable); //activate setResponsiveTable function when resize windows

  setResponsiveTable();

  return dataTable;
}

function setResponsiveTable() {
  $("tr > span").remove();
  $(".table thead tr th:nth-of-type(1)").removeClass("sorting_asc"); //remove sorting buttons at edit delete button's field

  var media = window.matchMedia("(max-width: 768px)");

  if (media.matches) {
    var headingLength = $(".table thead tr th").length / 2;

    for (let j = 1; j <= headingLength; j++) {
      let headerText = $("th:nth-of-type(" + j + ")")
        .first()
        .text();

      let element =
        "<span class='table-responsive-mobile-header'>" +
        headerText +
        "</span>";

      $("tr td:nth-of-type(" + j + ")").before(element);
    }
  }
}
