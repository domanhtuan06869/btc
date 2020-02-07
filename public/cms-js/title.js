

var datatable = $('#grvResult').DataTable({
    scrollY: 400,
    scrollX: true,
    scrollCollapse: true,
    select: true,
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'excelHtml5',
        }
    ],
    ajax: {
        dataType: "json",
        url: "/cms/getBTCTitle",
        data: function (d) {
            var name = "";
            var contentid = "";
            var maxpoint = "";
            var teamid = "";
            var teamid2 = "";
            var id = "";
            if ($('#txtName').val() != "" && $('#txtName').val() != undefined) name = $("#txtName").val();
            if (document.getElementById("cboContent").value != "") contentid = document.getElementById("cboContent").value;
            d.name = name;
            d.contentid = contentid;
            d.teamid = teamid;
            d.teamid2 = teamid2;
            d.maxpoint = maxpoint;
            d.id = id;
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                window.location.href = '/cms';
            }
        },
        dataSrc: ""
    },
    columns: [
        { data: '_id', defaultContent: "" },
        { data: 'Name', defaultContent: "" },
        { data: 'TeamId', defaultContent: "" },
        { data: 'MaxPoint', defaultContent: "" },
        { data: 'MaxPoint', defaultContent: "" },
        { data: 'MaxPoint', defaultContent: "" }
        //{
        //    data: 'Maxpoint', render: function (data, type, row, meta) {
        //        var btn = "";
        //        return data === "ACTIVE" ? "Đã duyệt" : "Chưa duyệt";
        //    }
        //},
        //{
        //    data: 'Status', render: function (data, type, row, meta) {
        //        if (row.Status == "PENDING") {
        //            var button = '<button type="button" class="btn btn-primary btn-sm" onclick="Accept(' + row.GiftCode + ')">Duyệt</button>';
        //            return button;
        //        }
        //        else return "";
        //    }
        //}
    ]
});

function SearchMember() {
    datatable.ajax.reload();
    datatable.draw();
};
function LoadCboContent() {
    for (var i = 1, len = 24 + 1; i < len; ++i) {
        var o = new Option("Nội dung " + i.toString(), i);
        $("#cboContent").append(o);
    }
};
LoadCboContent();
function Accept(giftcode) {
    var data_query = {};
    data_query.GiftCode = giftcode;
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/updateStatusGift",
        data: JSON.stringify(data_query),
        success: function (data) {
            if (data.success == "true") {
                alert("Duyệt thành công");
                SearchMember();
            }
            else {
                alert(data.message);
            }
        }
    });
};

