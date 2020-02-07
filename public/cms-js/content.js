var dataContentTeam = null;
var dataContent = null;
var ContentId = null;
var TeamId;
function GetTeamId() {
    $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: "/cms/getTeamId",
        data: TeamId,
        success: function (data) {
            TeamId = data;
			setMenu(TeamId,'content')
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
	buttons: [{
			extend: 'excelHtml5',
		}
		/*,
		        {
		            extend: 'pdfHtml5',
		        }*/
	],
	ajax: {
		dataType: "json",
		url: "/cms/getContentPoint",
		complete: loadStop,
		data: function (d) {

			d.ContentId = ContentId;
		},
		error: function (err) {
			if (err != null && err.responseText == 'Unauthorized') {
				alert("Bạn đã bị time out");
				window.location.href = '/cms';
			}
		},
		dataSrc: ""
	},

	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		"targets": 0
	}],

	columns: [{
			defaultContent: ""
		}, { data: null, render: function (data, type, row, meta) {
		 		if (data['Type'] == 'Cấp tỉnh') 
					return data['Name'];
				else return data['Type']
		}
		}, {
			data: 'PointContent',
			defaultContent: ""
		}, {
			data: 'TeamPointContent',
			defaultContent: ""
		}, {
			data: null,
			defaultContent: 0,
			render: function (data, type, row, meta) {
				return (data['TeamPointContent'] - data['PointContent']);
			}
		},
		/*{
		data: 'Reason',
		defaultContent: "",
		render: function (data, type, row, meta) {
			return data.split(";").join("<br/>");
		},*/
		{
			data: 'Details',
			defaultContent: "",
			render: function (data, type, row, meta) {
				var str = '';
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];					
					if (obj.DiffPoint) {
						str = str + 'Điều kiện ' + obj.TitleIdx;
						if (obj.TeamNote) {
							str = str + ' ' + obj.TeamNote;
						}
						if (obj.DiffPoint) {
							str = str + '(' + obj.DiffPoint + ' điểm);'
						}
					}
				}
				return str.split(";").join("<br/>");
			}

		}
	]
});

datatable.on('draw.dt', function () {
	var PageInfo = $('#btcTable').DataTable().page.info();
	datatable.column(0, {
		page: 'current'
	}).nodes().each(function (cell, i) {
		cell.innerHTML = i + 1 + PageInfo.start;
	});
});

/*function CalData() {

	$.ajax({
		//type: 'POST',
		dataType: "json",
		url: "/cms/calContent",
		data: dataContent,
		success: function (data) {
			alert(data);
		},
		error: function (err) {
			if (err.responseText == 'Unauthorized') {
				alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
				window.location.href = '/cms/unitlogin';
			}
		}
	});
	alert("Hệ thống sẽ tổng hợp số liệu, vui lòng xem lại báo cáo sau ít phút...");
}*/

function loadStart() {
    $('#loading').show();
   // $('#btcTableDiv').hide();
}

function loadStop() {
    $('#loading').hide();
   // $('#btcTableDiv').show();
}

function GetData() {

	var e = document.getElementById("cboContent");
	ContentId = e.options[e.selectedIndex].value;
	if (cboContent.selectedIndex == 0) {
		alert("Bạn hãy chọn nội dung muốn xem");
		return;
	}
	var param = "";
	if (ContentId != '' && ContentId != null && ContentId != undefined) {
		if (param == '') param += "?id=" + ContentId;
		else {
			param += "&id=" + ContentId;
		}
	}
	$.ajax({
		//type: 'POST',
		dataType: "json",
		url: "/cms/getContentTeam" + param,
		data: dataContentTeam,
		beforeSend: loadStart,
		success: function (data) {
			dataContentTeam = data;
			var tTeam = document.getElementById("txtTeam");
			tTeam.innerHTML = "Ban phụ trách: " + data[0].TeamName;
			tTeam.style.display = "block";
			var tContent = document.getElementById("txtContent");
			tContent.innerHTML = "Nội dung: " + data[0].Name;
			tContent.style.display = "block";
			datatable.ajax.reload();
			datatable.draw();
		},
		error: function (err) {
			if (err.responseText == 'Unauthorized') {
				alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
				window.location.href = '/cms/unitlogin';
			}
		}
	});

	
}

