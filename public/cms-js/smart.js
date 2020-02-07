var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var geocode = null;
var sum_point = 0;
var sum_maxpoint = 50;
var dataCBTeam = null;
var file_list = [];

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

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
            $("#imageGeoCode").attr("src", "../img/vncode/" + data.Img + ".jpg?time=" + d.getTime());
			$("#head_vncode").html(data.Header);
			setMenu(0,'smart');
        }
    });
}

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

function DrawPointTable() {
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    var param = "";
    if (ContentId == '') {
        return AlertAutoCloseError('Bạn cần chọn nội dung để nộp báo cáo');
    }
    if (ContentId == 22) { $('#content_22').show(); $('#content_23').hide(); sum_maxpoint = 15; }
    else if (ContentId == 23) { $('#content_23').show(); $('#content_22').hide(); sum_maxpoint = 50;}
    else {
        $('#content_23').hide(); $('#content_22').hide();
    }
    
    param += "?contentid=" + ContentId;
    $('#btcPointTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCPointSmart" + param,
        data: '',
        success: function (data) {
            sum_point = 0;
            var trstart = "<tr>";
            var trend = "</tr>";
            if (data != null && data.length >0) {
                var final_html;
                var TitleId_old;
                var ContentId_old;
                var Result = "";
                for (var i = 0; i < data.length; i++) {
                    var objBTCPointSmart = data[i];
                    sum_point += objBTCPointSmart.Point;
                    var file_name = (objBTCPointSmart.FileName == null ? '' : objBTCPointSmart.FileName);
                    var tr_html = trstart + '<td>' + '<input id="txtNote_' + objBTCPointSmart._id + '" type="text" class="form-control" placeholder="Nội dung hoạt động" value="' + (objBTCPointSmart.Note == null ? '' : objBTCPointSmart.Note) + '" onblur="return SavePoint(' + objBTCPointSmart._id + ');" />' + '</td>';
                    
					tr_html += '<td>' + '<textarea data-toggle="popover" title="Mô tả"  style="resize: vertical!important;" type="text" class="form-control" rows="3" id="txtDes_' + objBTCPointSmart._id + '" type="text" class="form-control" placeholder="Mô tả" onblur="return SavePoint(' + objBTCPointSmart._id + ');">' + (objBTCPointSmart.Des == null ? '' : objBTCPointSmart.Des) + '</textarea></td>';
					tr_html += '<td>' + '<input type="image" style="width:28px;" title="Tải văn bản" src="../img/sf/cloud-up.svg" onclick="ShowModal(' + objBTCPointSmart._id + ',' + objBTCPointSmart.ContentId + ');return false;" />' +
                       /* '<div id="txtWarning_' + objBTCPointSmart._id + '" style="color:red" >Chưa nộp báo cáo</div>' +*/
                        '<input type="image" id="check_' + objBTCPointSmart._id + '" style="width:28px;display:none" title="Xem văn bản" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + objBTCPointSmart._id + ',' + objBTCPointSmart.ContentId + ');return false;" />' + '</td>';
                    tr_html += '<td  align="center" valign="center">' + '<input style="text-align: center;" id="txtMaxPoint_' + objBTCPointSmart._id + '" class="form-control" value="' + objBTCPointSmart.MaxPoint + '" disabled />' + '</td>';
                    tr_html += '<td  align="center" valign="center">' + '<input style="text-align: center;" id="txtPoint_' + objBTCPointSmart._id + '" class="form-control" type="number" max="5" min="0" placeholder="" disabled value="' + objBTCPointSmart.Point + '" onblur="return SavePoint(' + objBTCPointSmart._id + ');"/>' + '</td>';
                    tr_html += '<td>' + DrawCBTeam(objBTCPointSmart._id, objBTCPointSmart.TeamId) + '</td>';
                    tr_html += '<td  align="center" valign="center"> <input type ="image" style ="width:28px;height:28px" src ="../img/sf/trashcan-full.svg" title = "Xóa" onclick = "DeletePoint(' + objBTCPointSmart._id + ');return false;" />' + '</td>' + trend;
                    $('#btcPointTable tbody').append(tr_html);
                    document.getElementById("cboTeam_" + objBTCPointSmart._id).value = objBTCPointSmart.TeamId;
                }
                CheckHasFile();
            } else {
                var tr_html = trstart + '<td>Chưa có dữ liệu</td>' + trend;
                $('#btcPointTable tbody').append(tr_html);
            }
            if (sum_point > sum_maxpoint) sum_point = sum_maxpoint;
            $("#SumPoint").html(sum_point);	
			DrawPopover(data);
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

function DrawPopover(dataBTCContent) {
    if (dataBTCContent != null) {        
        for (var i = 0; i < dataBTCContent.length; i++) {
             var objBTCPointSmart = dataBTCContent[i];               				 
			$('#txtDes_' + objBTCPointSmart._id).popover({
						trigger : 'click',  
						placement : 'top', 
						html: 'true', 
						content : '<textarea id="popDes_' + objBTCPointSmart._id + '" class="popover-textarea" rows="5" onblur="return SaveNote(' + objBTCPointSmart._id + ');"> </textarea>',
						template: '<div class="popover"><div class="arrow"></div>'+
						  '<h3 class="popover-title"></h3><div class="popover-content">'+
						  '</div>'/*<div class="popover-footer"><button type="button" class="btn btn-primary popover-submit" onclick="return HidetPopover(1,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-ok"></span></button>&nbsp;'+
						  '<button type="button" class="btn btn-default popover-cancel" onclick="return HidetPopover(0,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-remove"></button></div></div>'*/ 
					}).on('shown.bs.popover', function () {
						var id = this.id;	
					 	$('[data-toggle="popover"]').not(this).popover('hide');
  						ShowPopover2(id);
					});
            
        }        
    }

}

function SaveNote(p_id) {
    var new_note = $("#popDes_" + p_id).val();
	var note = $("#txtDes_" + p_id).val();
	if (new_note!=note){
		$("#txtDes_" + p_id).val(new_note);
		SavePoint(p_id);
	}
}

function ShowPopover(){		
	var txt = $('#txtDes').val();
	$('#popDes').val(txt).focus();
}

function HidePopover(){		
	var txt = $('#popDes').val();
	$('#txtDes').val(txt).focus();
}

function ShowPopover2(id){	
	var idn = id.replace('txtDes_','');
	var txt = $('#txtDes_' + idn).val();
	$('#popDes_' + idn).val(txt).focus();
}

function CheckHasFile() {
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFileSmart?contentid=" + ContentId,
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
            //$("#check_" + objBTCFile.PointId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
            $("#check_" + objBTCFile.PointId).show();
          //  $("#txtWarning_" + objBTCFile.PointId).hide();
            $("#txtPoint_" + objBTCFile.PointId).removeAttr("disabled");
        }
    }
}

function InitGetData() {
    GetImgGeoCode();
    LoadCboTeam();
    DrawPointTable();
    //CheckHasFile();
}
InitGetData();

function DrawCBTeam(p_id, p_value) {
    var first = document.getElementById('cboTeam');
    first.value = p_value;
    var options = first.innerHTML;
    var cbteam_id = '<select id="cboTeam_' + p_id + '" name="cboTeam_' + p_id + '" class="form-control" onchange="return SavePoint(' + p_id + ');">' + options + '</select>';
    return cbteam_id;
}

function ShowDetail(p_PointId, p_ContentId) {
    $('#btcFileTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFileSmart?pointid=" + p_PointId + "&contentid=" + p_ContentId,
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
            var btnDelete = '<td align="left" width="30px"><input type="image" style="width:30px;" src="../img/del.png" title="Hủy" onclick="DeleteFile(' + objBTCFile._id + ')" /></td>';
            var file_name = (objBTCFile.FileName == null ? '' : objBTCFile.FileName); 
            var tr_html = trstart + '<td>' + file_name + '</td>' + btnDelete + trend;
            $('#btcFileTable tbody').append(tr_html); 
        }
    } else {
        var tr_html = trstart + '<td>Chưa có dữ liệu</td>' + trend;
        $('#btcFileTable tbody').append(tr_html);
    }
}

function DeleteFile(Id) {
    var r = confirm("Bạn có chắc chắn muốn xoá?");
    if (r == true) {
        var objFile = {};
        objFile.Id = Id;
        //console.log("BTCFile: ", objFile);
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/deleteBTCFileSmart",
            data: JSON.stringify(objFile),
            success: function (data) {
                var e = document.getElementById("cboContent");
                var ContentId = e.options[e.selectedIndex].value;
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Đã xoá");
                    CheckHasFile();
                    
                } else {
                    //AlertAutoCloseError(data.message);
                    //ShowDetail(Id, ContentId);
                }
                ShowDetail(Id, ContentId);
                CheckHasFile();
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

function DeletePoint(Id) {
    var r = confirm("Bạn có chắc chắn muốn xoá?");
    if (r == true) {
        var objPoint = {};
        objPoint.Id = Id;
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/deleteBTCPointSmart",
            data: JSON.stringify(objPoint),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Xóa thành công");
                    DrawPointTable();
                    //CheckHasFile();
                } else {
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

function ShowModal(p_PointId, p_ContentId) {
	return AlertAutoCloseError('Thời gian nộp minh chứng đã kết thúc!');
    file_list = [];
    $("#hdfFileName").val('');
    $("#hdfPointId").val(p_PointId);
    $("#hdfContentId").val(p_ContentId);
    $('#UploadFile').css('display', 'block');
    $('#sendbtn').hide();
    $('#cancelbtn').hide();
    $('#myModal').modal('show');
}

function reloadJs() {
    file_list = [];
    $("#hdfFileName").val('');
    divupload.innerHTML = '<div id="UploadFile"> <div id="uploader" style="position:relative;"><div class="driveuploader-replace"></div></div></div>';
    var src = 'https://driveuploader.com/upload/vfg9qJ0ZfG/embed.js';
    src = $('script[src$="' + src + '"]').attr("src");
    $('script[src$="' + src + '"]').remove();
    $('<script/>').attr('src', src).appendTo('body');
};

$('#sendbtn').on('click', function (e) {
    $('#sendbtn').disabled = true;
    if (file_list.length > 0) {
        var FileName = $("#hdfFileName").val();
        var psid = $("#hdfpsid").val();
        var GeoCodeProvincial = $("#hdfGeoCode").val();
        var Provincial = $("#hdfGeoName").val();
        var UserName = $("#hdfUserName").val();
        for (var i = 0; i < file_list.length; i++) {
            var objFileUpload = {};
            objFileUpload.PointId = $("#hdfPointId").val();
            objFileUpload.ContentId = $("#hdfContentId").val();
            objFileUpload.FileName = file_list[i];// FileName;
            objFileUpload.psid = psid;
            objFileUpload.GeoCodeProvincial = GeoCodeProvincial;
            objFileUpload.Provincial = Provincial;
            objFileUpload.UserName = UserName;
            //objFileUpload.FileList = file_list;
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: "/cms/insertBTCFileSmart",
                data: JSON.stringify(objFileUpload),
                success: function (data) {
                    if (data.success == "true") {
                        AlertAutoCloseSuccess("Gửi thành công");
                        //var d = new Date();
                        //$("#check_" + objFileUpload.PointId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
                        $("#check_" + objFileUpload.PointId).show();
                       // $("#txtWarning_" + objFileUpload.PointId).hide();
                        $("#txtPoint_" + objFileUpload.PointId).removeAttr("disabled");
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
        reloadJs();
        $('#myModal').modal('hide');
        $('#sendbtn').disabled = false;
    }
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
			sum_maxpoint = 0;
            var trstart = "<tr>";
            var trend = "</tr>";
            for (var i = 0; i < data.length; i++) {
                var objPoint = data[i];
                $("#" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.Point);
                if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
				sum_maxpoint += objPoint.MaxPoint;
            }
            $("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);
            //var tr_html_sumtotal = trstart + '<td colspan="4">Tổng</td>' + CreateTd(1, sum_maxpoint) + CreateTd(1, sum_point) + CreateTd(1, sum_teampoint) + CreateTd(1, sum_diffpoint) + trend;
            //$('#btcTable tbody').append(tr_html_sumtotal);
        }
    });
}

function SaveHoatDong() {
	return AlertAutoCloseError('Thời gian nộp minh chứng đã kết thúc!');
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    if (ContentId == '') return AlertAutoCloseError('Bạn cần chọn nội dung cho báo cáo cần nộp');
    var point = $("#txtPoint").val();
    var MaxPoint = $("#txtMaxPoint").val();
    var ContentId = ContentId;
    var e = document.getElementById("cboTeam");
    var TeamId = e.options[e.selectedIndex].value;
    var TeamName = e.options[e.selectedIndex].text;
    var Note = $("#txtNote").val();
	var Des = $("#txtDes").val();
    if (Note == '') return AlertAutoCloseError('Bạn cần nhập tên hoạt động');
	if (Des == '') return AlertAutoCloseError('Bạn cần nhập mô tả hoạt động');
    if (point == '') return AlertAutoCloseError('Bạn cần nhập số điểm tự chấm');
    if (TeamId == '') return AlertAutoCloseError('Bạn cần chọn ban chấm');
    if (parseInt(point) > parseInt(MaxPoint)) { return AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + MaxPoint); }
    else {
        var objPoint = {};
        objPoint.ContentId = ContentId;
        objPoint.TeamId = TeamId;
        objPoint.TeamName = TeamName;
        objPoint.Point = point;
        objPoint.MaxPoint = MaxPoint;
        objPoint.Note = Note;
		objPoint.Des = Des;

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/insertBTCPointSmart",
            data: JSON.stringify(objPoint),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Lưu lại thành công");
                    $("#txtNote").val('');
					$("#txtDes").val('');
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

function SavePoint(p_id) {
	return AlertAutoCloseError('Thời gian nộp minh chứng đã kết thúc!');
    var point = $("#txtPoint_" + p_id).val();
    var MaxPoint = $("#txtMaxPoint_" + p_id).val();
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    if (ContentId == '') return AlertAutoCloseError('Bạn cần chọn nội dung cho báo cáo cần nộp');
    var e = document.getElementById("cboTeam_" + p_id);
    var TeamId = e.options[e.selectedIndex].value;
    var TeamName = e.options[e.selectedIndex].text;
    var Note = $("#txtNote_" + p_id).val();
	var Des = $("#txtDes_" + p_id).val();
    if (Note == '') return AlertAutoCloseError('Bạn cần nhập nội dung hoạt động');
	if (Des == '') return AlertAutoCloseError('Bạn cần nhập mô tả hoạt động');
    if (point == '') return AlertAutoCloseError('Bạn cần nhập số điểm tự chấm');
    if (TeamId == '') return AlertAutoCloseError('Bạn cần chọn ban chấm');
    if (parseInt(point) > parseInt(MaxPoint)) { AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + MaxPoint); }
    else {
        var objPoint = {};
        objPoint._id = p_id;
        objPoint.ContentId = ContentId;
        objPoint.Point = point;
        objPoint.MaxPoint = MaxPoint;
        objPoint.TeamId = TeamId;
        objPoint.TeamName = TeamName;
        objPoint.Note = Note;
		objPoint.Des = Des;

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/cms/updateBTCPointSmart",
            data: JSON.stringify(objPoint),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Lưu lại thành công");
                    //DrawPointTable();
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
$('#txtDes').popover({
						trigger : 'click',  
						placement : 'top', 
						html: 'true', 
						content : '<textarea id="popDes" class="popover-textarea" rows="5" onblur="return HidePopover();"> </textarea>',
						template: '<div class="popover"><div class="arrow"></div>'+
						  '<h3 class="popover-title"></h3><div class="popover-content">'+
						  '</div>'/*<div class="popover-footer"><button type="button" class="btn btn-primary popover-submit" onclick="return HidetPopover(1,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-ok"></span></button>&nbsp;'+
						  '<button type="button" class="btn btn-default popover-cancel" onclick="return HidetPopover(0,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-remove"></button></div></div>'*/ 
					}).on('shown.bs.popover', function () {						
					 	$('[data-toggle="popover"]').not(this).popover('hide');
  						ShowPopover();
					});