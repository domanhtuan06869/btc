var TeamId = null;
var Type = null;
function GetTeamId() {
    $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: "/cms/getTeamId",
        data: TeamId,
        success: function (data) {
            TeamId = data;
			setMenu(TeamId,'summary');
        }
    });
}
GetTeamId();
var datatable = $('#btcTable').DataTable({
    scrollY: 600,
    scrollX: true,
    scrollCollapse: true,
	searching: false,
    select: true,
    dom: 'Bfrtip',
	fixedColumns:   {
            leftColumns: 2
        },
    buttons: [
        /*{
            extend: 'excelHtml5',
        },
        {
            extend: 'pdfHtml5',
        }*/
    ],
    ajax: {
        dataType: "json",
        url: "/cms/getReport",
		beforeSend: loadStart,
		complete: loadStop,
        data: function (d) {
            var provincial = "";
            d.provincial = provincial;
        },
        error: function (err) {
            if (err != null && err.responseText == 'Unauthorized') {
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
                var id = data['_id'];
		 		if (id.Type=='Cấp tỉnh') {
					return id.Provincial;
				} else {
					return id.Type;
				}} 
		},
        { data: 'TotalPoint', defaultContent: "" },
        { data: 'TotalTeamPoint', defaultContent: "" },
        { data: null, render: function (data, type, row, meta) {
                var cp = data['CreativeTeamPoint'] || 0;
		 		if (cp > 50) {cp=50}
				return cp;}
		},
        { data: null, render: function (data, type, row, meta) {
		 		var cp = data['CreativeTeamPoint'] || 0;
		 		if (cp > 50) {cp=50}
                return ((data['TotalTeamPoint'] || 0) + cp);}
		},
        { data: null, render: function (data, type, row, meta) {
				var cp = data['CreativeTeamPoint'] || 0;
		 		if (cp > 50) {cp=50}
                return Math.floor(((data['TotalTeamPoint'] || 0) + cp)/0.05)/100;}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TotalTeamPoint']-data['TotalPoint']);}
		},//{ data: 'DiffPoint', defaultContent: "" },
        { data: null, render: function (data, type, row, meta) {
                return (data['Point1']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint1']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint1']-data['Point1']);}
		},//{ data: 'DiffPoint1', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point7']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint7']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint7']-data['Point7']);}
		},//{ data: 'DiffPoint7', defaultContent: "" },
        { data: null, render: function (data, type, row, meta) {
                return (data['Point2']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint2']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint2']-data['Point2']);}
		},//{ data: 'DiffPoint2', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point3']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint3']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint3']-data['Point3']);}
		},//{ data: 'DiffPoint3', defaultContent: "" },
		{ data: 'Point4', defaultContent: "" },
        { data: 'TeamPoint4', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint4']-data['Point4']);}
		},//{ data: 'DiffPoint4', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point9']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint9']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint9']-data['Point9']);}
		},//{ data: 'DiffPoint9', defaultContent: "" },
		{ data: 'Point6', defaultContent: "" },
        { data: 'TeamPoint6', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint6']-data['Point6']);}
		},//{ data: 'DiffPoint6', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point8']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint8']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint8']-data['Point8']);}
		},//{ data: 'DiffPoint8', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point10']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint10']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint10']-data['Point10']);}
		},//{ data: 'DiffPoint10', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point11']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint11']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint11']-data['Point11']);}
		},//{ data: 'DiffPoint11', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['Point12']);}
		},
        { data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint12']);}
		},
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint12']-data['Point12']);}
		},//{ data: 'DiffPoint12', defaultContent: "" },
       /* { data: 'Point5', defaultContent: "" },
        { data: 'TeamPoint5', defaultContent: "" },
		{ data: null, render: function (data, type, row, meta) {
                return (data['TeamPoint5']-data['Point5']);}
		}//{ data: 'DiffPoint5', defaultContent: "" }*/
    ]
});



function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
        }

datatable.on( 'draw.dt', function () {
    var PageInfo = $('#btcTable').DataTable().page.info();
         datatable.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );



function doExcel1() {
	//var blob,
      //  template = XLSX.write(prepareTable(), {bookType:'xlsx', bookSST:true, type: 'binary'});
		//prepareTable();
	var wb = XLSX.utils.table_to_book(document.getElementById('btcTable'), {sheet:"Report"});
	var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
		//"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"//"application/vnd.ms-excel;charset=utf-8"
    });

    saveAs(blob, "Summary.xlsx");
}

function prepareTable() {
    var html_table = document.getElementById('exportDiv').innerHTML;
		//'<table border="1">' + $('#btcTable').html() + '</table>';
    return html_table;
}
 
    /* ----- END added Code ----- */       
/*function ExportExecl() {
	var table = $('#btcTable').DataTable();
      $('<table>').append(table.$('tr').clone()).table2excel({
          exclude: ".excludeThisClass",
          name: "Báo cáo tổng hợp",
          filename: "Baocaotonghop" //do not include extension
      });
  }*/

function loadStart() {
    $('#loading').show();   
}

function loadStop() {
    $('#loading').hide();    
}

