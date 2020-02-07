var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var geocode = null;
var TeamId = null;
var Type = null;
var sum_point = 0;
var sum_maxpoint = 0;
var sum_teampoint = 0;
var sum_diffpoint = 0;
var mctable;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
function CheckBrowser(){
    if(navigator.userAgent.match(/Android/i)!=null||
        navigator.userAgent.match(/BlackBerry/i)!=null||
        navigator.userAgent.match(/iPhone|iPad|iPod/i)!=null||
        navigator.userAgent.match(/Nokia/i)!=null||
        navigator.userAgent.match(/Opera M/i)!=null||
        navigator.userAgent.match(/Chrome/i)!=null)
        {
            return 'OTHER';
    }else{
            return 'IE';
    }
};
function GetTeamId() {
    $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: "/cms/getTeamId",
        data: TeamId,
        success: function (data) {
            TeamId = data;
			setMenu(TeamId,'team')
        }
    });
}
GetTeamId();
//Load thông tin Tỉnh thành
function LoadCboProvincials() {
    var selectElemRef = document.getElementById("cboProvincial");
    var objProvincials;
    $.ajax({
        dataType: "json",
        url: "/cms/getProvincial",
        data: objProvincials,
        success: function (data) {
            objProvincials = data;
            var html = '';
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            var o = new Option("Chọn Tỉnh", "");
            $("#cboProvincial").append(o);
            for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
                var o = new Option(objProvincials[i - 1].Name, objProvincials[i - 1].GeoCode);
                $("#cboProvincial").append(o);
            }
            if (cboProvincial.length > 1) {
                document.getElementById("cboProvincial").selectedIndex = 0;
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
};
LoadCboProvincials();
function LoadCboContent() {
    var selectElemRef = document.getElementById("cboContent");
    var objProvincials;
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCContent",
        data: objProvincials,
        success: function (data) {
            objProvincials = data;
            var html = '';
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            var o = new Option("Tất cả nội dung", "");
            $("#cboContent").append(o);
            for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
                var o = new Option(objProvincials[i - 1].Code, objProvincials[i - 1].ContentId);
                $("#cboContent").append(o);
            }
            if (cboContent.length > 1) {
                document.getElementById("cboContent").selectedIndex = 0;
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
};

function GetImgGeoCode(code) {
    var d = new Date();
    $("#imageGeoCode").attr("src", "../img/vncode/" + code + ".jpg?time=" + d.getTime());
}

function onCboTypeChange(event) {
	var value= event.value;
	if(event.value=='Cấp tỉnh'){
		stProvincial.style.display = "inline";
	}else{
		stProvincial.style.display = "none";
	}	
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value;
	var data = { type: type };
	$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/cms/setTeamType',
        success: function (data) {
            Type = data;
			LoadCboContent();
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
};
//GetImgGeoCode();

function loadStart() {
    $('#loading').show();
    //$('#btcTable').hide();
	$('#btcTableDiv').hide();
	//$("#btcTable").floatThead('destroy');
}

function loadStop() {
    $('#loading').hide();
    //$('#btcTable').show();
	$('#btcTableDiv').show();
//	$table.floatThead('reflow');
	//$("#btcTable").floatThead({top:50,autoReflow: true});
}

function fileStart() {
    $('#loadFile').show();
    $('#btcFileDiv').hide();
}

function fileStop() {
    $('#loadFile').hide();
    $('#btcFileDiv').show();
}

function InitGetData() {
    var psid = getUrlParameter('psid');
    $("#hdfpsid").val(psid);
	
	
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;

    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value;
    if (t.selectedIndex == 0) {
        AlertAutoCloseError("Bạn hãy chọn đơn vị muốn chấm điểm");
        return;
    }
	
	if (t.selectedIndex == 1) {
		geocode = vnGeocode;
    	GetImgGeoCode(vnGeocode);} 
	else {
		geocode = 'VN-HN';
    	GetImgGeoCode(type);
	}
	
    if (t.selectedIndex == 1 && cboProvincal.selectedIndex == 0) {
        AlertAutoCloseError("Bạn hãy chọn tỉnh muốn chấm điểm");
        return;
    }
    var param = "";
    if (ContentId != '' && ContentId != null && ContentId != undefined) {
        if (param == '') param += "?contentid=" + ContentId;
        else {
            param += "&contentid=" + ContentId;
        }
    }
	if (type != '' && type != null && type != undefined) {
        if (param == '') param += "?type=" + type;
        else {
            param += "&type=" + type;
        }
    }
    $.ajax({
        //type: 'POST',
        dataType: "json",
        url: "/cms/getBTCContent" + param,
        data: dataBTCContent,
		beforeSend: loadStart,
		complete: loadStop,
        success: function (data) {
            dataBTCContent = data;
            DrawTable(CheckHasFile);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    
    //$.ajax({
    //    dataType: "json",
    //    url: "/cms/getBTCFile?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId,
    //    data: dataBTCFile,
    //    success: function (data) {
    //        dataBTCFile = data;
    //        DrawFileTable(data);
    //    },
    //    error: function (err) {
    //        if (err.responseText == 'Unauthorized') {
    //            alert("Bạn đã hết phiên làm việc");
    //            window.location.href = '/cms/unitlogin?psid=' + psid;
    //        }
    //    }
    //});
}
//Lấy thông tin điểm của các Tỉnh
function DrawPointToTable() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    var param = "";
    if (vnGeocode != '' && vnGeocode != null && vnGeocode != undefined) {
        if (param == '') param += "?geocodeprovincial=" + vnGeocode;
        else {
            param += "&geocodeprovincial=" + vnGeocode;
        }
    }
    if (ContentId != '' && ContentId != null && ContentId != undefined) {
        if (param == '') param += "?contentid=" + ContentId;
        else {
            param += "&contentid=" + ContentId;
        }
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/cms/getBTCPoint" + param,
        data: dataBTCPoint,
        success: function (data) {
            var trstart = "<tr>";
            var trend = "</tr>";
            dataBTCPoint = data;
            sum_point = 0;
            sum_teampoint = 0;
            sum_diffpoint = 0;
            for (var i = 0; i < data.length; i++) {
                var objPoint = data[i];
                if (TeamId == objPoint.TeamId) {
                    $("#" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.Point);
                    $("#team_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.TeamPoint);
                    $("#diff_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.DiffPoint);
                    $("#note_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.TeamNote);
                    $("#unitnote_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.Note);
					/*$("#tdunitnote_" + objPoint.ContentId + "_" + objPoint.TitleId).title = objPoint.Note;*/
                    if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
                    if (objPoint.TeamPoint != null && objPoint.TeamPoint != '') sum_teampoint += objPoint.TeamPoint;
                    if (objPoint.DiffPoint != null && objPoint.DiffPoint != '') sum_diffpoint += objPoint.DiffPoint;
					
                    if (objPoint.ApproveStatus != null && objPoint.ApproveStatus != '' && objPoint.ApproveStatus != undefined) {
                        if (objPoint.ApproveStatus == 'ACTIVE') {
                            $("#active_" + objPoint.ContentId + "_" + objPoint.TitleId).css('display', 'block');
                            $("#active_" + objPoint.ContentId + "_" + objPoint.TitleId).disabled = true;
							var at=document.getElementById("active_" + objPoint.ContentId + "_" + objPoint.TitleId);
							if (at) at.disabled = true;
                            $("#cancel_" + objPoint.ContentId + "_" + objPoint.TitleId).css('display', 'none');
                        }
                        else if (objPoint.ApproveStatus == 'CANCEL') {
                            $("#cancel_" + objPoint.ContentId + "_" + objPoint.TitleId).css('display', 'block');
                            $("#cancel_" + objPoint.ContentId + "_" + objPoint.TitleId).disabled = true;
							var at=document.getElementById("cancel_" + objPoint.ContentId + "_" + objPoint.TitleId);
							if (at) at.disabled = true;
                            $("#active_" + objPoint.ContentId + "_" + objPoint.TitleId).hide();
                        }
//						else
//						{
//							 $("#active_" + objPoint.ContentId + "_" + objPoint.TitleId).css('display', 'block');
//							 $("#active_" + objPoint.ContentId + "_" + objPoint.TitleId).disabled = false;
//							 $("#cancel_" + objPoint.ContentId + "_" + objPoint.TitleId).css('display', 'block');
//							 $("#cancel_" + objPoint.ContentId + "_" + objPoint.TitleId).disabled = false;
//						}
                        
                    }
                }
            }
            $("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);
            $("#SumTeamPoint").html(sum_teampoint);
            $("#SumDiffPoint").html(sum_teampoint - sum_point);
            //var tr_html_sumtotal = trstart + '<td colspan="4">Tổng</td>' + CreateTd(1, sum_maxpoint) + CreateTd(1, sum_point) + CreateTd(1, sum_teampoint) + CreateTd(1, sum_diffpoint) + trend;
            //$('#btcTable tbody').append(tr_html_sumtotal);
        }
    });
}
//Check đánh dấu đã nộp file - lấy thông tin file
function CheckHasFile() {
	DrawPointToTable();
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    var param = "";
    if (vnGeocode != '' && vnGeocode != null && vnGeocode != undefined) {
        if (param == '') param += "?geocodeprovincial=" + vnGeocode;
        else {
            param += "&geocodeprovincial=" + vnGeocode;
        }
    }
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    if (ContentId != '' && ContentId != null && ContentId != undefined) {
        if (param == '') param += "?contentid=" + ContentId;
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
//Check đánh dấu đã nộp file - thay icon đã nộp file
function DrawCheckFileTable(data) {
    if (data != null) {
        var Result = "";
        for (var i = 0; i < data.length; i++) {
            var objBTCFile = data[i];
            //$("#check_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId + "_" + objBTCFile.RequireId).css('display', 'block');
            //var d = new Date();
            $("#check_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId + "_" + objBTCFile.RequireId).show();//attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
			$("#active_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId).css('display', 'block');
			$("#active_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId).disabled = false;
			$("#cancel_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId).css('display', 'block');
			$("#cancel_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId).disabled = false;
			////document.getElementById("#team_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId).disabled = false;
        }
		//DrawPointToTable();
    }else {//DrawPointToTable();
	}
}
//Hiển thị Báo cáo tổng hợp đơn vị
function ShowSumaryReport() {
    var cboProvincal = document.getElementById("cboProvincial");
    if (cboProvincal.selectedIndex == 0) {
        AlertAutoCloseError("Bạn cần chọn tỉnh muốn xem");
        return;
    }
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value; 
    
    var param = "";
    if (vnGeocode != '' && vnGeocode != null && vnGeocode != undefined) {
        if (param == '') param += "?geocodeprovincial=" + vnGeocode;
        else {
            param += "&geocodeprovincial=" + vnGeocode;
        }
    }
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCSumaryFile"+ param,
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

function ShowDetail(RequireId, TitleId, ContentId) {
    $('#btcFileTable tbody').html('');
    var GeoCodeProvincial = "";
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    var param = "?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId;
	if (vnGeocode != '' && vnGeocode != null && vnGeocode != undefined) {       
            param += "&geocodeprovincial=" + vnGeocode;
    }
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "/cms/getBTCFile" + param,
        data: dataBTCFile,
		beforeSend: fileStart,
		complete: fileStop,
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
    /*$('#btcFileTable tbody').html('');
    if (data != null) {
        var final_html;
        var TitleId_old;
        var ContentId_old;
        var trstart = "<tr>";
        var trend = "</tr>";
        var Result = "";
        for (var i = 0; i < data.length; i++) {
            var objBTCContent = data[i];
            var file_name = (objBTCContent.FileName == null ? '' : objBTCContent.FileName);
            var file_link = '<a href="' + objBTCContent.FileLink + '" target="_blank" >' + objBTCContent.FileLink + '</a>';
            var html_linkNote = CreateTd(1, objBTCContent.LinkNote == null ? '' : objBTCContent.LinkNote);
            file_name += file_link;
            var tr_html = trstart + CreateTd(1, file_name) + html_linkNote + trend;
             
            $('#btcFileTable tbody').append(tr_html);
        }
    }*/
	if (mctable == null) {
		mctable = $('#btcFileTable').DataTable({
//			scrollY: 350,
//			scrollX: true,
			scrollCollapse: true,
			select: true,
			info: false,
			searching: false,
			dom: 'tp',
			//responsive: true,
			data: data,
			buttons: [],
			columns: [
				{
					data: null,
					render: function (data, type, row, meta) {
						if (data['FileType'] && data['FileType']=='P') return 'Ảnh'
						else { 
								if (data['FileName']) return 'File';
								else return 'Link';
							 }
					}
				}, {
					data: null,
					render: function (data, type, row, meta) {						
						if (data['FileName']) return data['FileName'];
						else {
							var note;
							if (data['LinkNote'] && data['LinkNote'] != '' && data['LinkNote'] != null && data['LinkNote'] != undefined) note = data['LinkNote'];
							else note = data['FileLink'];
							if (note && note.length > 95) note = note.substring(0,95) + '...';
							return '<a href="' + data['FileLink'] + '"  target="_blank" title="'+ data['LinkNote'] + '">' + note + '</a>';
							 }
					}
				}/*, {
					data: null,
					render: function (data, type, row, meta) {						
						if (data['FileLink']) {	
							return '<a href="' + data['LinkImg'] + '"  target="_blank" title="Ảnh chụp link">Pdf</a>';
							 }
					}
				}*/
			]
		});		
	} else {
		mctable.clear().rows.add(data).draw();
	}	
}

function DrawTable(callback) {
    $("#btcTable tbody tr").remove(); 
    $('#btcTable tbody').html('');
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
            var list_title = GetListBTCTitle(objBTCContent.BTCTitle);
            //var list_title = objBTCContent.BTCTitle;
            var rowspan_content = list_title.length;
            //Chạy qua các tiêu chí
            for (var j = 0; j < list_title.length; j++) {

                var objTitle = list_title[j];
                var list_require = objTitle.Require != null ? objTitle.Require : null;
                sum_maxpoint += objTitle.MaxPoint;
                if (list_require == null) {
                    var rowspan_title = 1;
                    //Tạo ô Tiêu chí
                    var td_title_html = CreateTd(rowspan_title, objTitle.Name);
                    //Tạo ô duyệt hủy
                    var td_approve_html = CreateTdApprove(rowspan_title, objTitle);
                    //Tạo ô điểm tối đa
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint, objTitle.Note);
                    var td_unote_html = CreateTduNote(rowspan_title, objTitle);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    //Tạo ô điểm ban chấm
                    var td_team_point_html = CreateTdTeamPoint(rowspan_title, objTitle);
                    //Tạo ô điểm chênh lệch
                    var td_diff_point_html = CreateTdDiffPoint(rowspan_title, objTitle);
                    //Tạo ô lý do chênh lệch
                    var td_note_html = CreateTdNote(rowspan_title, objTitle);
                    if (j == 0) {
                        var tr_html = trstart + td_content_html + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_approve_html + td_maxpoint_html + td_unote_html + td_point_html +
                                        td_team_point_html + td_diff_point_html + td_note_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                    else {
                        var tr_html = trstart + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_approve_html + td_maxpoint_html + td_unote_html + td_point_html + td_team_point_html +
                                        td_diff_point_html + td_note_html + trend;
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
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint, objTitle.Note); 
                    var td_unote_html = CreateTduNote(rowspan_title, objTitle);
                    //Tạo ô duyệt hủy
                    var td_approve_html = CreateTdApprove(rowspan_title, objTitle);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    //Tạo ô điểm ban chấm
                    var td_team_point_html = CreateTdTeamPoint(rowspan_title, objTitle);
                    //Tạo ô điểm chênh lệch
                    var td_diff_point_html = CreateTdDiffPoint(rowspan_title, objTitle);
                    //Tạo ô lý do chênh lệch
                    var td_note_html = CreateTdNote(rowspan_title, objTitle);

                    for (var k = 0; k < list_require.length; k++) {
                        var objRequire = list_require[k];
                        var create_td_requirename = CreateTdRequireName(objRequire, objTitle._id, objTitle.ContentId);
                        var create_td_require = CreateTdRequire(objRequire, objTitle._id, objTitle.ContentId);
                        if (k == 0 && j == 0) {
                            var tr_html = trstart + td_content_html + td_title_html + create_td_requirename + create_td_require + td_approve_html +
                                td_maxpoint_html + td_unote_html + td_point_html + td_team_point_html + td_diff_point_html + td_note_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else if (k == 0 && j != 0) {
                            var tr_html = trstart + td_title_html + create_td_requirename + create_td_require + td_approve_html + td_maxpoint_html + td_unote_html +
                                td_point_html + td_team_point_html + td_diff_point_html + td_note_html + trend;
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
        var tr_html_sumtotal = trstart + '<td colspan="5">Tổng</td>' + CreateSumTd() + '<td></td>' + trend;
        $('#btcTable tbody').append(tr_html_sumtotal);
		DrawPopover();
        callback();
        //CheckHasFile();
    }
    
}

function DrawPopover() {
    if (dataBTCContent != null) {        
        for (var i = 0; i < dataBTCContent.length; i++) {
            var objBTCContent = dataBTCContent[i];  
			var list_title = objBTCContent.BTCTitle;
            for (var j = 0; j < list_title.length; j++) {
				var data = list_title[j];
                $('#unitnote_' + data.ContentId + '_' + data._id).popover({
						trigger : 'click',  
						placement : 'top', 
						html: 'true', 
						content : '<textarea id="utet_' + data.ContentId + '_' + data._id + '" class="popover-textarea"  readonly rows="5"></textarea>',
						template: '<div class="popover"><div class="arrow"></div>'+
						  '<h3 class="popover-title"></h3><div class="popover-content">'+
						  '</div>'/*<div class="popover-footer"><button type="button" class="btn btn-default popover-cancel" onclick="return HideuPopover(0,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-remove"></button></div></div>' */
					}).on('shown.bs.popover', function () {
						var id = this.id;	
						$('[data-toggle="popover"]').not(this).popover('hide');
  						ShowuPopover(id);
					});
				 $('#note_' + data.ContentId + '_' + data._id).popover({
						trigger : 'click',  
						placement : 'left', 
						html: 'true', 
						content : '<textarea id="ttet_' + data.ContentId + '_' + data._id + '" class="popover-textarea" rows="5" readonly onblur="return SaveNote(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',this);"></textarea>',
						template: '<div class="popover"><div class="arrow"></div>'+
						  '<h3 class="popover-title"></h3><div class="popover-content">'+
						  '</div>'/*<div class="popover-footer"><button type="button" class="btn btn-primary popover-submit" onclick="return HidetPopover(1,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-ok"></span></button>&nbsp;'+
						  '<button type="button" class="btn btn-default popover-cancel" onclick="return HidetPopover(0,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-remove"></button></div></div>'*/ 
					}).on('shown.bs.popover', function () {
						var id = this.id;	
					 	$('[data-toggle="popover"]').not(this).popover('hide');
  						ShowtPopover(id);
					});
            }
        }        
    }

}

function GetListBTCTitle(ListBTCTitle) {
    var title_length = ListBTCTitle.length;
    var list_BtcTitle = [];
    for (var i = 0; i < title_length; i++) {
        if (TeamId == ListBTCTitle[i].TeamId) {
            list_BtcTitle.push(ListBTCTitle[i]);
        }
    }
    return list_BtcTitle;
}

function GethRowspanRequire(BtcContent) {
    var BTCTitle = BtcContent.BTCTitle;
    var title_length = BTCTitle.length;
    var total_length_require = 0;
    for (var i = 0; i < title_length; i++) {
        if (TeamId == BTCTitle[i].TeamId) {
            var BtcRequire = BTCTitle[i].Require != null ? BTCTitle[i].Require : null;
            var length_require = BtcRequire != null ? BtcRequire.length : 1;
            total_length_require += length_require;
        }
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
        }
    });
    return dataBTCTitle;
}

function CreateTd(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateSumTd() {
    var html = '<td  align="center" valign="center"><div id="SumMaxPoint"></div></td><td></td>' + '<td align="center" valign="center"><div id="SumPoint"></div></td>' + '<td align="center" valign="center"><div id="SumTeamPoint"></div></td>' + '<td align="center" valign="center"><div id="SumDiffPoint"></div></td>';
    return html;
}

function CreateTdMinhChung(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdNote(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    var html_note = '<textarea data-toggle="popover" title="Lý do chênh lệch" style="resize: vertical!important;" readonly rows="3" id="note_' + data.ContentId + '_' + data._id + '" type="text" class="form-control" placeholder="Nhập lý do" onblur="return SavePoint(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',this);"></textarea>';
	//onblur="return SavePoint(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',this);"
	/*<a id="tte_' + data.ContentId + '_' + data._id + '" data-toggle="popover" href="javascript:;" title="Lý do chênh lệch">mở</a>';*/
    //html_note += '<input type="image" style="width:35px;" src="../img/sf/floppy.svg" title="Lưu lại" onclick="SavePoint(' + data.ContentId + ',' + data._id + ',' + data.MaxPoint + ')" />';
    return result = tdstart + html_note + tdend;
}

function CreateTdMaxPoint(rowspan, data, note) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var tdend = '</td>';
    var html = '<div title="' + note + '">' + data;
	html += '<input type="image" src="../img/sf/sign-info.svg" title="' + note + '" style="width:16px;height:16px" />';
    html += '</div>';
    return result = tdstart + html + tdend;
}

function CreateTduNote(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
   // var html = '<p id="unitnote_' + data.ContentId + '_' + data._id + '"></p>';	
    
	 var html = '<textarea data-toggle="popover"  title="Tự đánh giá" readonly style="resize: vertical!important;" rows="3" id="unitnote_' + data.ContentId + '_' + data._id + '" type="text" class="form-control" placeholder=""></textarea>';/*<a id="ute_' + data.ContentId + '_' + data._id + '" data-toggle="popover" href="javascript:;" title="Tự đánh giá">mở</a>';*/
    return result = tdstart + html + tdend;
}

function CreateTdTeamPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '"  align="center" valign="center">';
    var html = '<input style="text-align: center;" id="team_' + data.ContentId + '_' + data._id + '" onchange="ChangePoint(' + data.ContentId + ',' + data._id + ')" class="form-control" type="number" max="' + data.MaxPoint + '" min="0" placeholder="" onblur="return SavePoint(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',this);" disabled/>';
    //html += '<input type="image" style="width:35px;" src="../img/sf/floppy.svg" title="Lưu lại" onclick="SavePoint(' + data.ContentId + ',' + data._id + ',' + data.MaxPoint + ')" />';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdDiffPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '"  align="center" valign="center">';
    var html = '<input style="text-align: center;" id="diff_' + data.ContentId + '_' + data._id + '" class="form-control" type="number" placeholder="" disabled />';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '"  align="center" valign="center">';
    var html = '<input style="text-align: center;" id="' + data.ContentId + '_' + data._id + '" class="form-control" type="number" max="' + data.MaxPoint + '" min="0" placeholder="" disabled />';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdApprove(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center" >';
    var html = '<input type="image" style="width:28px;display: none;" title="Duyệt" src="../img/sf/sign-check.svg" onclick="SaveApprove(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',1);return false;" id="active_' + data.ContentId + '_' + data._id + '"/>';
    html += '<input type="image" style="width:28px;display: none;" title="Từ chối" src="../img/sf/sign-ban.svg" onclick="SaveApprove(' +data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',2);return false;" id="cancel_' + data.ContentId + '_' + data._id + '" />';
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
	if (data.Name != 'Không yêu cầu minh chứng') {
    if (data.UploadFile == 'true') {
        //result += '<input type="button" value="Thêm" onclick="ShowModal(true,' + data._id + ',' + tileid + ',' + contentid + ')" />';
        result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
        //result += '<input type="image" style="width:28px;display:none" title="Đã nộp minh chứng" src="../img/sf/sign-check.svg" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
    }
    else {
        //result += '<input type="button" value="Thêm" onclick="ShowModal(false,' + data._id + ',' + tileid + ',' + contentid + ')" />';
        result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
        //result += '<input type="image" style="width:28px;display:none" title="Đã nộp minh chứng" src="../img/sf/sign-check.svg" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
    }
	}
    return result = tdstart + result + tdend;
}

function ShowModal(uploadfile, requireid, tileid, contentid) {
    $("#hdfRequireId").val(requireid);
    $("#hdfTitleId").val(tileid);
    $("#hdfContentId").val(contentid);
    
    if (uploadfile === true) {
        $('#UploadFile').css('display', 'block');
        $('#UploadLink').css('display', 'none');
        $('#sendbtn').hide();
    }
    else {
        $('#UploadFile').css('display', 'none');
        $('#UploadLink').css('display', 'block');
        $('#sendbtn').show();
    }
    $('#myModal').modal('show');
}

function ChangePoint(ContentId, TitleId) {
    var point = $("#" + ContentId + "_" + TitleId).val();
    var teampoint = $("#team_" + ContentId + "_" + TitleId).val();
    if (point == "" || point == undefined || point == null) {
        point = 0;
    }
    else {
        point = parseInt(point);
    }
    if (teampoint == "" || teampoint == undefined || teampoint == null) {
        teampoint = 0;
    }
    else {
        teampoint = parseInt(teampoint);
    }
    var diffpoint = teampoint - point;
    $("#diff_" + ContentId + "_" + TitleId).val(diffpoint);
}

function SaveNote(contentId, titleId, titleIdx, maxPoint, teamId, obj) {
    var new_note = $("#ttet_" + contentId + "_" + titleId).val();
	var note = $("#note_" + contentId + "_" + titleId).val();
	if (new_note!=note){
		$("#note_" + contentId + "_" + titleId).val(new_note);
		SavePoint(contentId, titleId, titleIdx, maxPoint, teamId, obj);
	}
}

function SavePoint(ContentId, TitleId, TitleIdx, MaxPoint,obj) {
	return;
    var cboProvincal = document.getElementById("cboProvincial");
	var cboType = document.getElementById("cboType");
	var type = cboType.options[cboType.selectedIndex].value
	if (type=="Cấp tỉnh") {
    	var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    	var provincial = $('#cboProvincial option:selected').text();
	} else {
		var vnGeocode = "VN-HN";
		var provincial = "Hà Nội";
	}
    var point = $("#" + ContentId + "_" + TitleId).val();
    var teampoint = $("#team_" + ContentId + "_" + TitleId).val();
	if(parseInt(teampoint)<0)
	{
		AlertAutoCloseError('Bạn không thể nhập điểm âm'); 
		obj.focus();
		return;
	}
    if (parseInt(teampoint) > parseInt(MaxPoint)) { 
		AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + MaxPoint); 
		obj.focus();
		return;
	}
    else {
        
        var diffpoint = $("#diff_" + ContentId + "_" + TitleId).val();
        var teamnote = $("#note_" + ContentId + "_" + TitleId).val();
    
        var objPoint = {};
        objPoint.GeoCodeProvincial = vnGeocode;
        objPoint.Provincial = provincial;
        objPoint.ContentId = ContentId;
        objPoint.TitleId = TitleId;
		objPoint.TitleIdx = TitleIdx;
        objPoint.Point = point; 
        objPoint.TeamPoint = teampoint; 
        objPoint.DiffPoint = diffpoint; 
        objPoint.TeamNote = teamnote; 

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/updateBTCPoint",
            data: JSON.stringify(objPoint),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Lưu lại thành công");
                    //DrawPointToTable();
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
//Duyệt/Hủy
function ShowCancel(ContentId, TitleId, Status,des) {
	$('#myCancel').modal('show');
	var btnCancel = document.getElementById("btnDlgCancel");
	///.setAttribute( "onClick", "javascript: Boo();" );
	 if(CheckBrowser()=='IE'){
       btnCancel.setAttribute("onclick", SaveApprove(ContentId,TitleId,Status));
    }else{
       btnCancel.setAttribute("onclick", "javascript: SaveApprove("+ContentId+","+ TitleId+","+ Status+");" );
    }
	
}
function SaveApprove(ContentId, TitleId, TitleIdx, Status) {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
	var provincial = $('#cboProvincial option:selected').text()
    var des = document.getElementById("txtDes").value;
    //var point = $("#" + ContentId + "_" + TitleId).val();
    //var teampoint = $("#team_" + ContentId + "_" + TitleId).val();
    //var diffpoint = $("#diff_" + ContentId + "_" + TitleId).val();
    var teamnote = $("#note_" + ContentId + "_" + TitleId).val();

    var objPoint = {};
    objPoint.GeoCodeProvincial = vnGeocode;
	objPoint.Provincial = provincial;
    objPoint.ContentId = ContentId;
    objPoint.TitleId = TitleId;
	objPoint.TitleIdx = TitleIdx;
    //objPoint.Point = point;
    //objPoint.TeamPoint = teampoint;
    //objPoint.DiffPoint = diffpoint;
    objPoint.TeamNote = teamnote;
	objPoint.Des = des;
    objPoint.ApproveStatus = Status == 1? 'ACTIVE' : 'CANCEL';
	var mes = Status == 1? 'Lưu lại thành công' : 'Từ chối thành công';

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/updateStatusBTCPoint",
        data: JSON.stringify(objPoint),
        success: function (data) {
            if (data.success == "true") {
				document.getElementById("txtDes").value=null;
                AlertAutoCloseSuccess(mes);
                DrawPointToTable();
            }
            else {
				document.getElementById("txtDes").value=null;
                AlertAutoCloseError(data.message);
            }
        }
    });
}
//Gửi file upload
$('#sendbtn').on('click', function (e) {
    //this code will run for all current 
    //and future elements with the class of .btn-success
    var psid = $("#hdfpsid").val();
    var ContentId = $("#hdfContentId").val();
    var TitleId = $("#hdfTitleId").val();
    var RequireId = $("#hdfRequireId").val();
    var FileName = $("#hdfFileName").val();
    var FileLink = $("#txtLink").val();
    //return alert(FileName);
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
                AlertAutoCloseSuccess("Gửi thành công");
                location.reload();
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
 });

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

$(document).ready(function(){
    if (isMobile.any()) {} 
	else {		
		var $table = $("#btcTable");
		$table.on("floatThead", function(e, isFloated, $floatContainer){
			if(isFloated){
				$floatContainer.addClass("floated"); // the div containing the table containing the thead
				$(this).addClass("floated"); // $table
			} else {
				$floatContainer.removeClass("floated");
				$(this).removeClass("floated");
			}
		});
		$(document).on("click", ".menu-title", function() {
			
			/*var reinit = $table.floatThead('destroy');  		*/		
			setTimeout(function(){
					$table.floatThead('reflow');//reinit();
				  }, 200);   
			});
		$table.floatThead({top:50,autoReflow: true});
	}	
});
function ShowuPopover(id){	
	var idn = id.replace('unitnote_','');
	var txt = $('#unitnote_' + idn).val();
	$('#utet_' + idn).val(txt).focus();
}

/*function HideuPopover(p, i, j){
	var txt = $('#utet_' + i + '_' + j).val();
    if (p==1) $('#unote_' + i + '_' + j).val(txt).focus();
	$('#ute_' + i + '_' + j).popover('hide');
}*/
function ShowtPopover(id){	
	var idn = id.replace('note_','');
	var txt = $('#note_' + idn).val();
	$('#ttet_' + idn).val(txt).focus();
}
$(document.body).on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            var bsPopover = $(this).data('bs.popover'); // Here's where the magic happens
            if (bsPopover) bsPopover.hide();
        }
    });
});

/*$(document).on('click', function(e) {
  $('[data-toggle="popover"]').each(function() {
    //the 'is' for buttons that trigger popups
    //the 'has' for icons within a button that triggers a popup
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide').data('bs.popover').inState.click = false // fix for BS 3.3.6
    }

  });
});*/

/*function HidetPopover(p, i, j){
	var txt = $('#ttet_' + i + '_' + j).val();
    if (p==1) $('#note_' + i + '_' + j).val(txt).focus();
	$('#tte_' + i + '_' + j).popover('hide');
}*/
/*$(document).scroll(function () {
    var y = $(this).scrollTop();
	
    var w = $('#myHeader').offset().top;
	
    if (y > w) {
        $('#myHeader').addClass('sticky');
    } else {
        $('#myHeader').removeClass('sticky');
		
    }
});*/