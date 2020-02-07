var TeamId = null;
function GetTeamId() {
    $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: "/cms/getTeamId",
        data: TeamId,
        success: function (data) {
            TeamId = data;
			setMenu(TeamId,'geoupload');
        }
    });
}
GetTeamId();
var datatable = $('#btcTable').DataTable({
    scrollY: 400,
    scrollX: true,
    scrollCollapse: true,
    select: true,
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'excelHtml5',
        }/*,
        {
            extend: 'pdfHtml5',
        }*/
    ],
    ajax: {
        dataType: "json",
        url: "/cms/getUpload",
		//beforeSend: loadStart,
		complete: loadStop,
        data: function (d) {
            var provincial = "";
            d.provincial = provincial;
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                window.location.href = '/cms';
            }
        },
        dataSrc: ""
    },
	
	"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
   
    columns: [
        {defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
		 		if (data['Type'] == 'Cấp tỉnh') 
					return data['Provincial'];
				else return data['Type']
		}
		},
        { //data: 'Percent', defaultContent: "" }
			data: null, render: function (data, type, row, meta) {
				var n = 0.0260;
				var u = data['Uploaded'] || 0;
				if (data['Type'] == 'Khối các cơ quan Trung ương') {
					n = 0.199;
				}
				if (data['Type'] == 'Khối Doanh nghiệp Trung ương') {
					n = 0.0210;
				}
				if (data['Type'] == 'Ban Thanh niên Quân đội') {
					n = 0.020;
				}
				if (data['Type'] == 'Đoàn Bộ Công an') {
					n = 0.0206;
				}
                return Math.floor(u/n)/100;
            }
		}
    ]
});

datatable.on( 'draw.dt', function () {
    var PageInfo = $('#btcTable').DataTable().page.info();
         datatable.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );

function loadStart() {
    $('#loading').show();
    $('#btcTable').hide();
}

function loadStop() {
    $('#loading').hide();
   // $('#btcTable').show();
}


