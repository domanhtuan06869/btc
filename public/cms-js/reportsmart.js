var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var sum_point = 0;
var sum_maxpoint = 0;
var sum_teampoint = 0;
var dataCBTeam = null;
var TeamId = null;
var IsAdmin = null;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function GetTeamId() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/getTeamId",
        data: TeamId,
        success: function (data) {
            TeamId = data;
			setMenu(TeamId,'reportsmart');
        }
    });
}
GetTeamId();

function GetImgGeoCode(GeoCode, GeoName) {
    d = new Date();
    $("#imageGeoCode").attr("src", "../img/vncode/" + GeoCode + ".jpg?time=" + d.getTime());
    $("#head_vncode").html('');
	var name = GeoName;
	if (GeoName == "Ban Thanh niên Quân đội") 
		name = 'Quân đội';
	if (GeoName == "Đoàn Bộ Công an") 
		name = 'Bộ công an';      
	if (GeoCode.match(/VN.*/)) {
  		$("#head_vncode").append('BỘ TIÊU CHÍ ĐÁNH GIÁ CÔNG TÁC ĐOÀN VÀ PHONG TRÀO THANH THIẾU NHI ' + name.toUpperCase() + ' NĂM 2019');
	} else {
    	$("#head_vncode").append('BỘ TIÊU CHÍ ĐÁNH GIÁ CÔNG TÁC ĐOÀN VÀ PHONG TRÀO THANH NIÊN ' + name.toUpperCase() + ' NĂM 2019');
	}
}


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


function LoadCboTeam() {
    var selectElemRef = document.getElementById("cboTeam");
    var objProvincials;
    $.ajax({
        dataType: "json",
        url: "/cms/getTeam",
        data: objProvincials,
        success: function (data) {
            objProvincials = data;
            dataCBTeam = data;
            var html = '';
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            var o = new Option("Chọn Ban chấm", "");
            $("#cboTeam").append(o);
            for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
                if (objProvincials[i - 1]._id !== 13) {
                    var o = new Option(objProvincials[i - 1].Name, objProvincials[i - 1]._id);
                    $("#cboTeam").append(o);
                }
            }
            if (data.length > 1) {
                document.getElementById("cboTeam").selectedIndex = 0;
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

/*function LoadCboContent() {
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
            if (cboProvincial.length > 1) {
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
};*/

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

function ChangeTitle() {
    var cboContent = document.getElementById("cboContent");
    var ContentId = cboContent.options[cboContent.selectedIndex].value;
    if (ContentId == 22) {
        $("#head_title").html("Danh sách hoạt động đăng cai");
        $("#name_content").html("Hoạt động đăng cai");
    }
    else if (ContentId == 23) {
        $("#head_title").html("Danh sách hoạt động, mô hình, giải pháp sáng tạo");
        $("#name_content").html("Hoạt động sáng tạo");
    }
    else {
        $("#head_title").html("Danh sách hoạt động đăng cai sáng tạo");
        $("#name_content").html("Hoạt động đăng cai sáng tạo");
    }
}

function loadStart() {
    $('#loading').show();
    $('#btcPointTable').hide();
}

function loadStop() {
    $('#loading').hide();
    $('#btcPointTable').show();
}

function DrawPointTable() {
    var cboContent = document.getElementById("cboContent");
    var ContentId = cboContent.options[cboContent.selectedIndex].value;

    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
    var param = ContentId != '' ? '&contentid=' + ContentId : '';
    $('#btcPointTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCPointSmart?geocodeprovincial=" + vnGeoCode + param,
        data: '',
		beforeSend: loadStart,
		complete: loadStop,
        success: function (data) {
            sum_point = 0;
            sum_teampoint = 0;
            var trstart = "<tr>";
            var trend = "</tr>";
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var objBTCPointSmart = data[i];
                    sum_point += objBTCPointSmart.Point == null ? 0 : objBTCPointSmart.Point;
                    sum_teampoint += objBTCPointSmart.TeamPoint == null ? 0 : objBTCPointSmart.TeamPoint;
                    var file_name = (objBTCPointSmart.FileName == null ? '' : objBTCPointSmart.FileName);
                    var tr_html = trstart;//'<tr style="display:none" id="tr_"' + objBTCPointSmart._id + '>';
                    tr_html += '<td>' + (objBTCPointSmart.TeamName == null ? '' : objBTCPointSmart.TeamName) + '</td>';
                    tr_html += '<td>' + (objBTCPointSmart.Note == null ? '' : objBTCPointSmart.Note) + '</td>';
                    /*tr_html += '<td>' + '<input type="image" id="check_' + objBTCPointSmart._id + '" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + objBTCPointSmart._id + ',' + objBTCPointSmart.ContentId + ');return false;"  />' + '</td>';*/
					tr_html += '<td>' + (objBTCPointSmart.Des == null ? '' : objBTCPointSmart.Des) + '</td>';
                    tr_html += '<td align="center" valign="center">' + objBTCPointSmart.MaxPoint + '</td>';
                    tr_html += '<td align="center" valign="center">' + (objBTCPointSmart.Point == null ? '' : objBTCPointSmart.Point) + '</td>';
                    tr_html += '<td align="center" valign="center">' + (objBTCPointSmart.TeamPoint == null ? '' : objBTCPointSmart.TeamPoint) + '</td>';
                    tr_html += '<td align="center" valign="center">' + (objBTCPointSmart.DiffPoint == null ? '' : objBTCPointSmart.DiffPoint) + '</td>';
                    tr_html += '<td>' + (objBTCPointSmart.TeamNote == null ? '' : objBTCPointSmart.TeamNote) + '</td>';
                    tr_html += trend;
                    $('#btcPointTable tbody').append(tr_html);
                }
                //CheckHasFile();
            } else {
                var tr_html = trstart + '<td colspan = "9" >Chưa có dữ liệu</td>' + trend;
                $('#btcPointTable tbody').append(tr_html);
            }
            if (ContentId == 22) {
                sum_maxpoint = 15;
            }
            else if (ContentId == 23) {
                sum_maxpoint = 50;
            }
            else {
                sum_maxpoint = 50;
            }
            if (sum_point > sum_maxpoint) sum_point = sum_maxpoint;
            if (sum_teampoint > sum_maxpoint) sum_teampoint = sum_maxpoint;

            $("#SumPoint").html(sum_point);
            $("#SumTeamPoint").html(sum_teampoint);
            $("#SumDiffPoint").html(sum_teampoint - sum_point);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    $('#btcPointTable tbody').html('');
}

function CheckHasFile() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFileSmart?geocodeprovincial=" + vnGeoCode,
        data: dataBTCFile,
        success: function (data) {
            dataBTCFile = data;
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
    if (data.length > 0 && data != null) {
        var Result = "";
        for (var i = 0; i < data.length; i++) {
            var objBTCFile = data[i];
            //var d = new Date();
            $("#check_" + objBTCFile.PointId).show();//attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
            //$("#tr_" + objBTCFile.PointId).show();
        }
    }
}

function InitGetData() {
    LoadCboProvincials();
}
InitGetData();

function LoadDataByProvincal() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
    geocode = vnGeoCode;
    var vnGeoName = cboProvincal.options[cboProvincal.selectedIndex].text;    
    var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value;
    if (t.selectedIndex == 0) {
        AlertAutoCloseError("Bạn hãy chọn đơn vị muốn xem");
        return;
    }
	if (t.selectedIndex == 1) {
		geocode = vnGeoCode;
    	GetImgGeoCode(vnGeoCode, vnGeoName);} 
	else {
		geocode = 'VN-HN';
    	GetImgGeoCode(type, type);
	}	
	if (t.selectedIndex == 1 && cboProvincal.selectedIndex == 0) {
        AlertAutoCloseError("Bạn hãy chọn tỉnh muốn xem");
        return;
    }
    DrawPointTable(vnGeoCode);
    //CheckHasFile(vnGeoCode);
    ChangeTitle();
}

function DrawCBTeam(p_id, p_value) {
    var first = document.getElementById('cboTeam');
    first.value = p_value;
    var options = first.innerHTML;
    var cbteam_id = '<select id="cboTeam_' + p_id + '" name="cboTeam_' + p_id + '" class="form-control">' + options + '</select>';
    return cbteam_id;
}

function ShowDetail(p_PointId, p_ContentId) {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
    $('#btcFileTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFileSmart?pointid=" + p_PointId + "&contentid=" + p_ContentId + "&geocodeprovincial=" + vnGeoCode,
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
        var trstart = "<tr>";
        var trend = "</tr>";
        for (var i = 0; i < data.length; i++) {
            var objBTCFile = data[i];
            var file_name = (objBTCFile.FileName == null ? '' : objBTCFile.FileName);
            var tr_html = trstart + '<td>' + file_name + '</td>' + trend;
            $('#btcFileTable tbody').append(tr_html);
        }
    } else {
        var tr_html = trstart + '<td>Chưa có dữ liệu</td>' + trend;
        $('#btcFileTable tbody').append(tr_html);
    }
}

function ShowModal(p_PointId, p_ContentId) {
    $("#hdfPointId").val(p_PointId);
    $("#hdfContentId").val(p_ContentId);
    $('#UploadFile').css('display', 'block');
    $('#sendbtn').hide();
    $('#cancelbtn').hide();
    $('#myModal').modal('show');
}

$('#sendbtn').on('click', function (e) {
    $('#sendbtn').disabled = true;

    var FileName = $("#hdfFileName").val();
    var objFileUpload = {};
    objFileUpload.PointId = $("#hdfPointId").val();
    objFileUpload.ContentId = $("#hdfContentId").val();
    objFileUpload.FileName = FileName;

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/insertBTCFileSmart",
        data: JSON.stringify(objFileUpload),
        success: function (data) {
            if (data.success == "true") {
                $('#sendbtn').disabled = false;
                AlertAutoCloseSuccess("Gửi thành công");
                $('#myModal').modal('hide');
                reloadJs();
                InitGetData();
            }
            else {
                $('#sendbtn').disabled = false;
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

function DrawPointToTable() {
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    var param = "";
    if (ContentId != '' && ContentId != null && ContentId != undefined) param += "?contentid=" + ContentId;
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCPointSmart" + param,
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
            //$("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}

function SavePoint(p_id) {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    var point = $("#txtPoint_" + p_id).val();
    var MaxPoint = $("#txtMaxPoint_" + p_id).val();
    var TeamPoint = $("#txtTeamPoint_" + p_id).val();
    var DiffPoint = $("#txtDiffPoint_" + p_id).val();
    var Note = $("#txtNote_" + p_id).val();
    if (TeamPoint == '') return AlertAutoCloseError('Bạn cần nhập số điểm ban chấm');
    if (parseInt(TeamPoint) > parseInt(MaxPoint)) { return AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + MaxPoint); }
    else {
        var objPoint = {};
        objPoint._id = p_id;
        objPoint.Point = point;
        objPoint.MaxPoint = MaxPoint;
        objPoint.TeamPoint = TeamPoint;
        objPoint.DiffPoint = DiffPoint;
        objPoint.TeamNote = Note;
        objPoint.GeoCodeProvincial = vnGeocode;

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/teamupdateBTCPointSmart",
            data: JSON.stringify(objPoint),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Lưu lại thành công");
                    DrawPointTable();
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

function SaveApprove(p_id, Status) {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    var teamnote = $("#txtNote_" + p_id).val();

    var objPoint = {};
    objPoint._id = p_id;
    objPoint.GeoCodeProvincial = vnGeocode;
    //objPoint.ContentId = ContentId;
    //objPoint.TitleId = TitleId;
    //objPoint.Point = point;
    //objPoint.TeamPoint = teampoint;
    //objPoint.DiffPoint = diffpoint;
    objPoint.TeamNote = teamnote;
    objPoint.ApproveStatus = Status == 1 ? 'ACTIVE' : 'CANCEL';

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/teamupdateStatusBTCPointSmart",
        data: JSON.stringify(objPoint),
        success: function (data) {
            if (data.success == "true") {
                AlertAutoCloseSuccess("Lưu lại thành công");
                DrawPointTable();
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

function GetIsAdmin() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/cms/getIsAdmin",
        data: IsAdmin,
        success: function (data) {
            IsAdmin = data;
        }
    });
}
GetIsAdmin();

function doExcel1() {
    var blob,
        template = prepareTable();

    blob = new Blob([template], {
        type: "application/vnd.ms-excel;charset=utf-8"
    });

    saveAs(blob, "ReportSmart");
}

function prepareTable() {
    var html_table = '<table border="1">' + $('#btcPointTable').html() + '</table>';
    return html_table;
}

function ChangePoint(PointId) {
    var point = $("#txtPoint_" + PointId).val();
    var teampoint = $("#txtTeamPoint_" + PointId).val();
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
    $("#txtDiffPoint_" + PointId).val(diffpoint);
}

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
