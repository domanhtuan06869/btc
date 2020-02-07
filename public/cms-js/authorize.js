var geocode = null;
var id = null;

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function profileStart() {
    $('#loadFile').show();
    $('#profile').hide();
}

function profileStop() {
    $('#loadFile').hide();
    $('#profile').show();
}

function loadStart() {
    $('#loading').show();
    $('#btcTable').hide();
}

function loadStop() {
    $('#loading').hide();
    $('#btcTable').show();
}

function GetImgGeoCode() {
	$.ajax({
		type: 'POST',
		data: '',
		contentType: 'application/json',
		url: "/cms/getGeoCode",
		data: '',
		success: function (data) {
			geocode = data;
			$("#hdfpsid").val(data.psid);
			$("#hdfGeoCode").val(data.GeoCodeProvincial);
			$("#hdfGeoName").val(data.Provincial);
			$("#hdfUserName").val(data.UserName);
			d = new Date();
			$("#head_vncode").html('');
			$("#head_vncode").html('');
            $("#imageGeoCode").attr("src", "../img/vncode/" + data.Img + ".jpg?time=" + d.getTime());
			$("#head_vncode").html(data.Header);
			setMenu(0,'authorize');
		},
		error: function (err) {
			if (err.responseText == 'Unauthorized') {
				alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để đăng nhập lại");
				window.location.href = '/cms/unitlogin';
			}
		}
	});
}
GetImgGeoCode();

var datatable = $('#btcTable').DataTable({
	scrollY: 400,
	scrollX: true,
	scrollCollapse: true,
	select: true,
	dom: 'Bfrtip',
	responsive: true,
    

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
		url: "/cms/getBTCPic",
		//beforeSend: loadStart,
		//complete: loadStop,
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
	columns: [
		//{defaultContent: "" },
		{
			data: null,	
			responsivePriority: 1,
			render: function (data, type, row, meta) {
				if (data['Link'] != null) return '<img src="' + data['Link'] + '" onclick="window.open(' +
					String.fromCharCode(39) + data['Link'] + String.fromCharCode(39) + ', ' + String.fromCharCode(39) + '_blank' + String.fromCharCode(39) + ');" height="90" width="90">';
			}
		}, {
			data: 'Name',
			responsivePriority: 4,
			class: 'val-name',
			render: function (data, type, row, meta) {
                        return '<a href="#" data-toggle="modal" data-target="#myModal" style="white-space: nowrap;">' + data + '</a>';
			}
		}, {
			data: 'Note',
			responsivePriority: 5,
			defaultContent: ""
		}, {
			data: null,
			responsivePriority: 6,
			render: function (data, type, row, meta) {
				return data['ContentId'] + '. ' + data['TitleName'];
			}
		},{
			data: 'Status',
			responsivePriority: 2,
			class: 'val-true',
			render: function (data, type, row, meta) {
				if (data == 'AUTH') return '<img src="../img/ok.png">';
				else if (data == 'PENDING') return '<img src="../img/Accept.png" title="Duyệt"></a>';
				else return '';
			}
		},{
			data: 'Status',
			responsivePriority: 3,
			class: 'val-false',
			render: function (data, type, row, meta) {
				if (data == 'CANCEL') return '<img src="../img/ok1.png">';
				else if (data == 'PENDING') return '<img src="../img/cancel2.png" title="Từ chối"></a>';
				else return '';
			}
		}/*, {
			data: '_id',
			defaultContent: ""
		}, {
			data: 'UpId',
			defaultContent: ""
		}*/
	],
	columnDefs: [{
		className: "img-product",
		"targets": [0, 3]
	},/*, {
		"targets": [4, 5],
		"visible": false
	}*/],
	/*lengthMenu: [
		[10, 25, 50, -1],
		[10, 25, 50, "All"],
	],
	initComplete: function () {
		this.api().columns([1, 2, 3]).every(function () {
			var column = this;
			var select = $('<select><option value=""></option></select>')
				//.appendTo( $(column.header()) )	
				.appendTo($(column.footer()).empty())
				.on('change', function () {
					var val = $.fn.dataTable.util.escapeRegex(
						$(this).val()
					);

					column
						.search(val ? '^' + val + '$' : '', true, false)
						.draw();
				});

			column.data().unique().sort().each(function (d, j) {
				select.append('<option value="' + d + '">' + d + '</option>')
			});
		});
	}*/
});
$('#btcTable').on('click', 'td.val-true', function () {
	return AlertAutoCloseError('Thời gian nộp minh chứng đã kết thúc!');
	//e.preventDefault();
	var index = this._DT_CellIndex.row;
	//var auth = datatable.cell(index, 3).data();
	var data = datatable.cell(index, 0).data();
	var auth = data['Status'];
	if (auth == 'PENDING') {
		//var id = datatable.cell(index, 4).data();
		var id = data['_id'];	
		var title = data['ContentId'] + '.' + data['TitleIdx'];
		//var idx = datatable.row(this).index();
		//var id = datatable.cell(idx, 4).data();
		var mess = "Bạn muốn duyệt minh chứng này?";
		var r = confirm(mess);
		if (r == true) {
			var obj = {};
			obj.id = id;
			obj.title = title;
			$.ajax({
				type: 'POST',
				data: JSON.stringify(obj),
				contentType: 'application/json',
				url: '/cms/authPic',
				success: function (data) {

					//console.log(data);
					if (data == 'OK') {
						datatable.cell(index, 3).data('AUTH').render();
						datatable.cell(index, 4).data('').render();
					} else {
						alert(data);
					}
				},
				error: function (err) {
					alert(err.statusText);

				}
			});
		}
	}
});

$('#btcTable').on('click', 'td.val-false', function () {
	//e.preventDefault();
	var index = this._DT_CellIndex.row;
	//var auth = datatable.cell(index, 3).data();
	var data = datatable.cell(index, 0).data();
	var auth = data['Status'];
	if (auth == 'PENDING') {
		//var id = datatable.cell(index, 4).data();
		var id = data['_id'];
		var title = data['ContentId'] + '.' + data['TitleIdx'];
		//var idx = datatable.row(this).index();
		//var id = datatable.cell(idx, 4).data();
		var mess = "Bạn muốn từ chối minh chứng này?";
		var r = confirm(mess);
		if (r == true) {
			var obj = {};
			obj.id = id;
			obj.title = title;
			$.ajax({
				type: 'POST',
				data: JSON.stringify(obj),
				contentType: 'application/json',
				url: '/cms/refusePic',
				success: function (data) {

					//console.log(data);
					if (data == 'OK') {
						datatable.cell(index, 3).data('').render();
						datatable.cell(index, 4).data('CANCEL').render();
					} else {
						alert(data);
					}
				},
				error: function (err) {
					alert(err.statusText);

				}
			});
		}
	}
});

$('#btcTable').on('click', 'td.val-name', function () {
	//var tr = $(this).closest('tr');
	//var datarow = datatable.row(tr).data();	
	var index = this._DT_CellIndex.row;	
	var obj = {};
	var data = datatable.cell(index, 0).data();
	obj.psid = data['UpId'];
	//obj.psid = datarow.UpId;
	console.log(obj.psid);
	$.ajax({	
		type: 'POST',
		data: JSON.stringify(obj),
		contentType: 'application/json',
		url: '/cms/getMemberBTCId',		
		beforeSend: profileStart,
		complete: profileStop,
		success: function (data) {
			
			var d = data[0];
			document.getElementById('avatar').src = d.ImgUrl;
			document.getElementById('username').innerText = d.Name;
			document.getElementById('phone').innerHTML = '<i class="glyphicon glyphicon-phone" ></i>  ' + d.Phone;
			document.getElementById('email').innerHTML = '<i class="glyphicon glyphicon-envelope" ></i>  ' + d.Email;
			document.getElementById('brithday').innerHTML = '<i class="glyphicon glyphicon-gift" ></i>  ' + d.Birthday;
			document.getElementById('uname').innerText = d.Name;
			document.getElementById('uphone').innerText = d.Phone;
			document.getElementById('umail').innerText = d.Email;
			document.getElementById('ubirth').innerText = d.Birthday;
			//document.getElementById('uwork').innerText = data.Work;
			//document.getElementById('uhobby').innerText = data.Hobby;

			
			var str = '';
			if (d.Provincial != 'NA' && d.Provincial != null) str += d.Provincial;
			if (d.District != 'NA' && d.District != null) str += ' - ' + d.District;
			if (d.Ward != 'NA' && d.Ward != null) str += ' - ' + d.Ward;
			if (d.Branch != 'NA' && d.Branch != null) str += ' - ' + d.Branch;
			// if (data.BranchCD != 'NA' && data.BranchCD != null) str += ' - ' + data.BranchCD;
			document.getElementById('address').innerText = str;
			//document.getElementById('ugeo').innerText = str;
		},
		error: function (err) {
			alert(err.statusText);

		}
	});

});

/*function CheckHasFile() {
    var param = "";
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    if (ContentId != "" && ContentId != null && ContentId != undefined) {
        if (param == "") param += "?contentid=" + ContentId;
        else {
            param += "&contentid=" + ContentId;
        }
    }
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getCheckBTCFile" + param,
        data: dataBTCFile,
        success: function (data) {
            DrawCheckFileTable(data);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}
function DrawCheckFileTable(data) {
    if (data != null) {
        var Result = "";
        for (var i = 0; i < data.length; i++) {
            var objBTCFile = data[i];
            //var d = new Date();
            //$("#check_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId + "_" + objBTCFile.RequireId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
            $("#check_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId + "_" + objBTCFile.RequireId).show();
        }
    }
}

function DrawPointToTable() {
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    var param = "";
    if (ContentId != '' && ContentId != null && ContentId != undefined) param += "?contentid=" + ContentId;
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCPoint" + param,
        data: dataBTCPoint,
        success: function (data) {
            dataBTCPoint = data;
            sum_point = 0;
            var trstart = "<tr>";
            var trend = "</tr>";
            for (var i = 0; i < data.length; i++) {
                var objPoint = data[i];
                $("#" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.Point);
                if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
            }
            $("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);
            //var tr_html_sumtotal = trstart + '<td colspan="4">Tổng</td>' + CreateTd(1, sum_maxpoint) + CreateTd(1, sum_point) + CreateTd(1, sum_teampoint) + CreateTd(1, sum_diffpoint) + trend;
            //$('#btcTable tbody').append(tr_html_sumtotal);
        }
    });
}

function ShowDetail(RequireId, TitleId, ContentId) {
    $('#btcFileTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFile?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId,
        data: dataBTCFile,
        success: function (data) {
            dataBTCFile = data;
            DrawFileTable(data);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    $('#myDetail').modal('show');
}
function DrawFileTable(data) {
    $('#btcFileTable tbody').html('');

	if (data != null) {
		var final_html;
		var TitleId_old;
		var ContentId_old;
		var trstart = "<tr>";
		var trend = "</tr>";
		var Result = "";
		for (var i = 0; i < data.length; i++) {
			var objBTCContent = data[i];
			var btnDelete = '<td align="left" width="30px"><input type="image" style="width:30px;" src="../img/del.png" title="Hủy" onclick="DeleteFile(' + objBTCContent._id + ','
			+ objBTCContent.RequireId + ',' + objBTCContent.TitleId + ',' + objBTCContent.ContentId 
			+ ')" /></td>';
			var file_name = (objBTCContent.FileName == null ? '' : objBTCContent.FileName);
            var file_link = '<a href="' + objBTCContent.FileLink + '" target="_blank">' + objBTCContent.FileLink + '</a>';
            var html_linkNote = CreateTd(1, objBTCContent.LinkNote == null ? '' : objBTCContent.LinkNote);
			file_name += file_link;
            var tr_html = trstart + CreateTd(1, file_name) + html_linkNote + btnDelete + trend;

            $('#btcFileTable tbody').append(tr_html);
        }
    } else {
        var tr_html = trstart + CreateTd(1, 'Chưa có dữ liệu') + trend;
        $('#btcFileTable tbody').append(tr_html);
    }
}

function DeleteFile(Id,RequireId, TitleId, ContentId) {
	var r = confirm("Bạn có chắc chắn muốn xoá?");
	if (r == true) {
		var objFile = {};
		objFile.Id = Id;
		objFile.RequireId = RequireId;
		objFile.TitleId = TitleId;
		objFile.ContentId = ContentId;
        console.log("BTCFile: ", objFile);
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: "/cms/deleteBTCFile",
			data: JSON.stringify(objFile),
			success: function (data) {
				if (data.success == "true") {
					//AlertAutoCloseSuccess("Đã xoá");
                    ShowDetail(RequireId, TitleId, ContentId);
                    CheckHasFile();
				} else {
					//AlertAutoCloseError(data.message);
					ShowDetail(RequireId, TitleId, ContentId);
				}
            },
            error: function (err) {
                if (err.responseText == 'Unauthorized') {
                    alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                    window.location.href = '/cms/unitlogin';
                }
            }
		});
	}
}
function DrawTable(callback) {
    $('#btcTable tbody').html('');
    //var table_header_html = '<table class="table table-bordered">< thead ><tr><th class="col-md-2">Nội dung đánh giá</th><th class="col-md-3">Điều kiện chấm điểm</th><th class="col-md-2">Yêu cầu</th><th class="col-md-2">Minh chứng</th><th>Điểm tối đa</th><th>Điểm tự chấm</th></tr></thead>';

    if (dataBTCContent != null) {
        var final_html;
        var TitleId_old;
        var ContentId_old;
        var trstart = "<tr>";
        var trend = "</tr>";
        var Result = "";
        sum_maxpoint = 0;
        for (var i = 0; i < dataBTCContent.length; i++) {
            var objBTCContent = dataBTCContent[i];

            var rowspan_require = GethRowspanRequire(objBTCContent);
            //Tạo ô Nội dung
            var td_content_html = CreateTd(rowspan_require, objBTCContent.Code + ': ' + objBTCContent.Name);

            var list_title = objBTCContent.BTCTitle;
            var rowspan_content = list_title.length;
            //Chạy qua các tiêu chí
            for (var j = 0; j < list_title.length; j++) {

                var objTitle = list_title[j];
                sum_maxpoint += objTitle.MaxPoint;
                var list_require = objTitle.Require != null ? objTitle.Require : null;
                if (list_require == null) {
                    var rowspan_title = 1;
                    //Tạo ô Tiêu chí
                    var td_title_html = CreateTd(rowspan_title, objTitle.Name);
                    //Tạo ô điểm tối đa
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    if (j == 0) {
                        var tr_html = trstart + td_content_html + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_maxpoint_html + td_point_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                    else {
                        var tr_html = trstart + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_maxpoint_html + td_point_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                }
                else {
                    var rowspan_title = list_require.length;
                    //Tạo ô Nội dung
                    //var td_content_html = CreateTd(rowspan_require, objBTCContent.Code + ': ' + objBTCContent.Name);
                    //Tạo ô Tiêu chí
                    var td_title_html = CreateTd(rowspan_title, objTitle.Name);
                    //Tạo ô điểm tối đa
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);

                    for (var k = 0; k < list_require.length; k++) {
                        var objRequire = list_require[k];
                        var create_td_requirename = CreateTdRequireName(objRequire, objTitle._id, objTitle.ContentId);
                        var create_td_require = CreateTdRequire(objRequire, objTitle._id, objTitle.ContentId);
                        if (k == 0 && j == 0) {
                            var tr_html = trstart + td_content_html + td_title_html + create_td_requirename + create_td_require + td_maxpoint_html + td_point_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else if (k == 0 && j != 0) {
                            var tr_html = trstart + td_title_html + create_td_requirename + create_td_require + td_maxpoint_html + td_point_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else {
                            var tr_html = trstart + create_td_requirename + create_td_require + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                    }
                }
            }
        }
        //var tr_html_sumtotal = trstart + '<td colspan="4">Tổng</td>' + CreateTd(1, sum_maxpoint) + CreateTd(1, sum_point) + trend;
        //$('#btcTable tbody').append(tr_html_sumtotal);
        var tr_html_sumtotal = trstart + '<td colspan="4">Tổng</td>' + CreateSumTd() + trend;
        $('#btcTable tbody').append(tr_html_sumtotal);
        callback();
        CheckHasFile();
    }

}

function GethRowspanRequire(BtcContent) {
    var BTCTitle = BtcContent.BTCTitle;
    var title_length = BTCTitle.length;
    var total_length_require = 0;
    for (var i = 0; i < title_length; i++) {
        var BtcRequire = BTCTitle[i].Require != null ? BTCTitle[i].Require : null;
        var length_require = BtcRequire != null ? BtcRequire.length : 1;
        total_length_require += length_require;
    }
    return total_length_require;
}

function GetTitleByContentId(ContentId) {
    var dataBTCTitle;
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCTitle?contentid=" + ContentId,
        data: dataBTCTitle,
        success: function (data) {
            dataBTCTitle = data;
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    return dataBTCTitle;
}

function CreateTd(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdMaxPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateSumTd() {
    var html = '<td  align="center" valign="center"><div id="SumMaxPoint"></div></td>' + '<td  align="center" valign="center"><div id="SumPoint"></div></td>';
    return html;
}

function CreateTdMinhChung(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center">';
    var html = '<div style="width:60px;float:left"><input id="' + data.ContentId + '_' + data._id + '" class="form-control" type="number" max="' + data.MaxPoint + '" min="0" placeholder="" onblur="return SavePoint(' + data.ContentId + ', ' + data._id + ', ' + data.MaxPoint + ', ' + data.TeamId + ');" /></div>';
    //html += '<div style="width:50px;float:left"><input type="image" style="width:35px;" src="../img/sf/floppy.svg" title="Lưu lại" onclick="SavePoint(' + data.ContentId + ',' + data._id + ',' + data.MaxPoint + ',' + data.TeamId + ')" /></div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}
function CreateTdRequireName(data, tileid, contentid) {
    var tdstart = '<td >';
    var tdend = '</td>';
    var html = '<div title="' + data.Note + '">' + data.Name;
    //if (data.Note != '')
    //html += '<img src="../img/sf/sign-info.svg" title="' + data.Note + '" width="16" height="16">';
    html += '<input type="image" src="../img/sf/sign-info.svg" title="' + data.Note + '" style="width:16px;height:16px" />';
    html += '</div>';
    return result = tdstart + html + tdend;
}
function CreateTdRequire(data, tileid, contentid) {
    var result = "";
    var tdstart = '<td align="center" valign="center">';
    var tdend = '</td>';
    if (data.UploadFile == 'true') {
        result += '<input type="image" style="width:28px;margin-right:8px" title="Tải file minh chứng lên" src="../img/sf/cloud-up.svg" onclick="ShowModal(true,' + data._id + ',' + tileid + ',' + contentid + ');return false;" />';
        result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '"/>';
        //result += '<input type="image" style="width:28px;display:none" title="Đã nộp minh chứng" src="../img/sf/sign-check.svg" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
    }
    else {
        result += '<input type="image" style="width:28px;margin-right:8px" title="Tải file minh chứng lên" src="../img/sf/cloud-up.svg" onclick="ShowModal(false,' + data._id + ',' + tileid + ',' + contentid + ');return false;" />';
        result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
        //result += '<input type="image" style="width:28px;display:none" title="Đã nộp minh chứng" src="../img/sf/sign-check.svg" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
    }

    return result = tdstart + result + tdend;
}

function ShowModal(uploadfile, requireid, tileid, contentid) {
	alert('Thời gian nộp minh chứng đã kết thúc!');
	return;
    file_list = [];
    $("#txtLink").val('');
    $("#hdfFileName").val('');
    $("#hdfRequireId").val(requireid);
    $("#hdfTitleId").val(tileid);
    $("#hdfContentId").val(contentid);
    $('#btcLinkTable tbody').html('');

    if (uploadfile === true) {
        $('#UploadFile').css('display', 'block');
        $('#UploadLink').css('display', 'none');
        $('#sendbtn').hide();
        $('#cancelbtn').hide();
    }
    else {
        $('#UploadFile').css('display', 'none');
        $('#UploadLink').css('display', 'block');
        $('#sendbtn').hide();
        $('#cancelbtn').hide();
        LoadLink(requireid, tileid, contentid);
    }
    $('#myModal').modal('show');
}
function SavePoint(ContentId, TitleId, MaxPoint, TeamId) {
    var point = $("#" + ContentId + "_" + TitleId).val();
    if (parseInt(point) > parseInt(MaxPoint)) { AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + MaxPoint); }
    else {
        var objPoint = {};
        objPoint.ContentId = ContentId;
        objPoint.TitleId = TitleId;
        objPoint.Point = point;
        objPoint.MaxPoint = MaxPoint;
        objPoint.TeamId = TeamId;

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/insertBTCPoint",
            data: JSON.stringify(objPoint),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Lưu lại thành công");
                    DrawPointToTable();
                }
                else {
                    AlertAutoCloseError(data.message);
                }
            },
            error: function (err) {
                if (err.responseText == 'Unauthorized') {
                    alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                    window.location.href = '/cms/unitlogin';
                }
            }
        });

    }
}
function reloadJs() {
    file_list = [];
    $("#txtLink").val('');
    $("#hdfFileName").val('');
    divupload.innerHTML = '<div id="UploadFile"> <div id="uploader" style="position:relative;"><div class="driveuploader-replace"></div></div></div>';
    var src = 'https://driveuploader.com/upload/vfg9qJ0ZfG/embed.js';
    src = $('script[src$="' + src + '"]').attr("src");
    $('script[src$="' + src + '"]').remove();
    $('<script/>').attr('src', src).appendTo('body');
};
$('#sendbtn').on('click', function (e) {
    //this code will run for all current 
    //and future elements with the class of .btn-success
    $('#sendbtn').disabled = true;
    var psid = $("#hdfpsid").val();
    var ContentId = $("#hdfContentId").val();
    var TitleId = $("#hdfTitleId").val();
    var RequireId = $("#hdfRequireId").val();
    var FileName = $("#hdfFileName").val();
    var GeoCodeProvincial = $("#hdfGeoCode").val();
    var Provincial = $("#hdfGeoName").val();
    var UserName = $("#hdfUserName").val();
    var FileLink = $("#txtLink").val();
	if (file_list.length > 0) {
    //return alert(FileName);
		for (var i = 0; i < file_list.length; i++) {
			var objFileUpload = {};
			//objFileUpload._id = 1;
			objFileUpload.ContentId = ContentId;
			objFileUpload.TitleId = TitleId;
			objFileUpload.RequireId = RequireId;
			objFileUpload.FileName = file_list[i];
			objFileUpload.FileLink = FileLink;
            objFileUpload.psid = psid;
            objFileUpload.GeoCodeProvincial = GeoCodeProvincial;
            objFileUpload.Provincial = Provincial;
            objFileUpload.UserName = UserName;
			//objFileUpload.InputDate = body.inputDate;

			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: "/cms/insertBTCFile",
				data: JSON.stringify(objFileUpload),
				success: function (data) {
                    if (data.success == "true") {
                        AlertAutoCloseSuccess("Gửi thành công");
                        $("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).show();//.css('display', 'block');
                        //var d = new Date();
                        //$("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
					}
					else {
                        AlertAutoCloseError(data.message);
					}
                },
                error: function (err) {
                    if (err.responseText == 'Unauthorized') {
                        alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                        window.location.href = '/cms/unitlogin';
                    }
                }
            });
        }
        
		$('#sendbtn').disabled = false;
		//$("#txtLink").val('');
		//$("#hdfFileName").val('');
		$('#myModal').modal('hide');
		//CheckHasFile();
		reloadJs();
	}
	else
    {
        if (FileLink == "" || FileLink == null) return AlertAutoCloseError("Bạn cần nhập link muốn nộp");
			var objFileUpload = {};
			//objFileUpload._id = 1;
			objFileUpload.ContentId = ContentId;
			objFileUpload.TitleId = TitleId;
			objFileUpload.RequireId = RequireId;
			objFileUpload.FileName = FileName;
			objFileUpload.FileLink = FileLink;
			objFileUpload.psid = psid;
			//objFileUpload.InputDate = body.inputDate;

			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: "/cms/insertBTCFile",
				data: JSON.stringify(objFileUpload),
				success: function (data) {
					if (data.success == "true") {
						//$("#txtLink").val('');
						//$("#hdfFileName").val('');
						AlertAutoCloseSuccess("Gửi thành công");
                        
						///$('#myModal').modal('close');
                        $("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).show();//.css('display', 'block');
                        //var d = new Date();
                        //$("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
					}
					else {
						AlertAutoCloseError(data.message);
					}
                },
                error: function (err) {
                    if (err.responseText == 'Unauthorized') {
                        alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                        window.location.href = '/cms/unitlogin';
                    }
                }
            });
        $('#myModal').modal('hide');
        $('#sendbtn').disabled = false;
        reloadJs();
    }
});

function SaveLink() {
    $('#btcLinkTable tbody').html('');
    //$('#sendbtn').disabled = true;
    var psid = $("#hdfpsid").val();
    var ContentId = $("#hdfContentId").val();
    var TitleId = $("#hdfTitleId").val();
    var RequireId = $("#hdfRequireId").val();
    var FileName = $("#hdfFileName").val();
    var FileLink = $("#txtLink").val();
    var LinkNote = $("#txtLinkNote").val();

    var objFileUpload = {};
    objFileUpload.ContentId = ContentId;
    objFileUpload.TitleId = TitleId;
    objFileUpload.RequireId = RequireId;
    objFileUpload.FileName = FileName;
    objFileUpload.FileLink = FileLink;
    objFileUpload.LinkNote = LinkNote;
    objFileUpload.psid = psid;

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/insertBTCFile",
        data: JSON.stringify(objFileUpload),
        success: function (data) {
            if (data.success == "true") {
                AlertAutoCloseSuccess("Gửi thành công");
                $("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).show();//.css('display', 'block');
                //var d = new Date();
                //$("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
                LoadLink(RequireId, TitleId, ContentId);
            }
            else {
                AlertAutoCloseError(data.message);
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    $("#txtLink").val('');
    $("#txtLinkNote").val('');
    $("#hdfFileName").val('');
}

function LoadLink(RequireId, TitleId, ContentId) {
    $('#btcLinkTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFile?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId,
        data: '',
        success: function (data) {
            DrawLinkTable(data);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}

function DrawLinkTable(data) {
    $('#btcLinkTable tbody').html('');
    if (data != null && data.length > 0) {
        var final_html;
        var TitleId_old;
        var ContentId_old;
        var trstart = "<tr>";
        var trend = "</tr>";
        var Result = "";
        for (var i = 0; i < data.length; i++) {
            var objBTCContent = data[i];
            var btnDelete = '<td align="left" width="30px"><input type="image" style="width:30px;" src="../img/del.png" title="Hủy" onclick="DeleteLink(' + objBTCContent._id + ','
                + objBTCContent.RequireId + ',' + objBTCContent.TitleId + ',' + objBTCContent.ContentId
                + ')" /></td>';
            var file_name = '';//(objBTCContent.FileName == null ? '' : objBTCContent.FileName);
            var file_link = '<a href="' + objBTCContent.FileLink + '" target="_blank">' + objBTCContent.FileLink + '</a>';
            file_name += file_link;
            var html_linkNote = CreateTd(1, objBTCContent.LinkNote == null ? '' : objBTCContent.LinkNote);
            var tr_html = trstart + CreateTd(1, file_name) + html_linkNote + btnDelete + trend;
            $('#btcLinkTable tbody').append(tr_html);
        }
    } else {
        var tr_html = trstart + CreateTd(1, 'Chưa có dữ liệu') + trend;
        $('#btcLinkTable tbody').append(tr_html);
    }
}

function DeleteLink(Id, RequireId, TitleId, ContentId) {
    var r = confirm("Bạn có chắc chắn muốn xoá?");
    if (r == true) {
        var objFile = {};
        objFile.Id = Id;
        objFile.RequireId = RequireId;
        objFile.TitleId = TitleId;
        objFile.ContentId = ContentId;
        console.log("BTCFile: ", objFile);
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/deleteBTCFile",
            data: JSON.stringify(objFile),
            success: function (data) {
                if (data.success == "true") {
                    //AlertAutoCloseSuccess("Đã xoá");
                    CheckHasFile();
                } else {
                    
                    //AlertAutoCloseError(data.message);
                    //LoadLink(RequireId, TitleId, ContentId);
                }
                LoadLink(RequireId, TitleId, ContentId);
            },
            error: function (err) {
                if (err.responseText == 'Unauthorized') {
                    alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                    window.location.href = '/cms/unitlogin';
                }
            }
        });
    }
}*/
function AlertAutoCloseSuccess(message) {
	$('#alert_success').html('');
	$('#alert_success').html(message);
	$('.alert-autocloseable-success').show();

	$('.alert-autocloseable-success').delay(3000).fadeOut("slow", function () {
		// Animation complete.
		$('#autoclosable-btn-success').prop("disabled", false);
	});
}

function AlertAutoCloseError(message) {
	$('#alert_error').html('');
	$('#alert_error').html(message);
	$('.alert-autocloseable-danger').show();

	$('.alert-autocloseable-danger').delay(3000).fadeOut("slow", function () {
		// Animation complete.
		$('#autoclosable-btn-danger').prop("disabled", false);
	});
}
$('.alert-autocloseable-success').hide();
$('.alert-autocloseable-danger').hide();
