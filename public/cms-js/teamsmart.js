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
var fileTable = null;
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
			setMenu(TeamId,'teamsmart')
        }
    });
}
GetTeamId();

function GetImgGeoCode(Type, GeoCode, GeoName) {
    d = new Date();
    $("#head_vncode").html('');
	var name = GeoName;
	if (name == "Ban Thanh niên Quân đội") 
		name = 'Quân đội';
	if (name == "Đoàn Bộ Công an") 
		name = 'Bộ công an'; 
	if (Type=='Cấp tỉnh') {
		$("#imageGeoCode").attr("src", "../img/vncode/" + GeoCode + ".jpg?time=" + d.getTime());    
    	$("#head_vncode").append('BỘ TIÊU CHÍ ĐÁNH GIÁ CÔNG TÁC ĐOÀN VÀ PHONG TRÀO THANH THIẾU NHI  ' + GeoName + ' NĂM 2019');
	} else {
		$("#imageGeoCode").attr("src", "../img/vncode/" + Type + ".jpg?time=" + d.getTime());    
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

function ChangeTitle() {
    var cboContent = document.getElementById("cboContent");
    var ContentId = cboContent.options[cboContent.selectedIndex].value;
    if (ContentId == 22){
		$("#head_title").html("Danh sách hoạt động đăng cai");
		$("#name_content").html("Hoạt động đăng cai");
	} 
    else if (ContentId == 23){
		$("#head_title").html("Danh sách hoạt động, mô hình, giải pháp sáng tạo");
		$("#name_content").html("Hoạt động sáng tạo");
	} 
    else {
		$("#head_title").html("Danh sách hoạt động đăng cai sáng tạo");
		$("#name_content").html("Hoạt động đăng cai sáng tạo");
	}
}

function DrawPointTable() {
    var cboContent = document.getElementById("cboContent");
    var ContentId = cboContent.options[cboContent.selectedIndex].value;	   
	var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value; 
	if (t.selectedIndex > 1) {
		vnGeoCode = 'VN-HN';
	}
    var param = ContentId != '' ? '&contentid=' + ContentId: '';
    $('#btcPointTable tbody').html('');
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCPointSmart?geocodeprovincial=" + vnGeoCode + param,
        data: '',
        success: function (data) {
            sum_point = 0;
			sum_mpoint = 0;
            sum_teampoint = 0;
			dataBTCContent = data;
            var trstart = "<tr>";
            var trend = "</tr>";
            if (data.length > 0) {
                var final_html;
                var TitleId_old;
                var ContentId_old;
                var Result = "";
                for (var i = 0; i < data.length; i++) {
                    var objBTCPointSmart = data[i];
                    sum_point += objBTCPointSmart.Point == null ? 0 : objBTCPointSmart.Point;
					sum_mpoint += objBTCPointSmart.MaxPoint == null ? 0 : objBTCPointSmart.MaxPoint;
                    sum_teampoint += objBTCPointSmart.TeamPoint == null ? 0 : objBTCPointSmart.TeamPoint;
                    var file_name = (objBTCPointSmart.FileName == null ? '' : objBTCPointSmart.FileName);
                    var tr_html = trstart;//'<tr style="display:none" id="tr_' + objBTCPointSmart._id +'">';//trstart;
                    tr_html += '<td>' + (objBTCPointSmart.TeamName == null ? '' : objBTCPointSmart.TeamName) + '</td>';
                    tr_html += '<td>' + (objBTCPointSmart.Note == null ? '' : objBTCPointSmart.Note) + '</td>';
					tr_html += '<td>'+'<textarea data-toggle="popover" title="Mô tả"  style="resize: vertical!important;" type="text" class="form-control" rows="3" id="txtDes_' + objBTCPointSmart._id + '" type="text" class="form-control" placeholder="Mô tả" >' + (objBTCPointSmart.Des == null ? '' : objBTCPointSmart.Des) + '</textarea></td>';
                    /*tr_html += '<td>' + '<div id = "txtWarning_' + objBTCPointSmart._id + '" style = "color:red" > Chưa nộp báo cáo</div >';*/
					tr_html += '<td>' + '<input type="image" id="check_' + objBTCPointSmart._id + '" style="width:28px;display:none" title="Xem văn bản" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + objBTCPointSmart._id + ',' + objBTCPointSmart.ContentId + ');return false;"  />';/* + '</td>';
                    tr_html += '<td align="center" valign="center">' + '<input type="image" style="width:28px;" title="Duyệt" src="../img/sf/sign-check.svg" onclick="SaveApprove(' + objBTCPointSmart._id + ',1);return false;" id="active_' + objBTCPointSmart._id + '" />' +
                                        '<input type="image" style="width:28px;" title="Từ chối" src="../img/sf/sign-ban.svg" onclick="SaveApprove(' + objBTCPointSmart._id + ',2);return false;" id="cancel_' + objBTCPointSmart._id + '" />' + '</td>';*/
                    tr_html += '<td align="center" valign="center">' + '<input style="text-align: center;" id="txtMaxPoint_' + objBTCPointSmart._id + '" class="form-control" value="' + objBTCPointSmart.MaxPoint + '" disabled />' + '</td>';
                    tr_html += '<td align="center" valign="center">' + '<input style="text-align: center;" id="txtPoint_' + objBTCPointSmart._id + '" class="form-control" type="text" value="' + (objBTCPointSmart.Point == null ? 0 : objBTCPointSmart.Point) + '" disabled />' + '</td>';
                    tr_html += '<td align="center" valign="center">' + '<input style="text-align: center;" id="txtTeamPoint_' + objBTCPointSmart._id + '" onchange="ChangePoint(' + objBTCPointSmart._id + ')" class="form-control" type="number" max="5" min="0" placeholder="" value="' + (objBTCPointSmart.TeamPoint == null ? '' : objBTCPointSmart.TeamPoint) + '" onblur="return SavePoint(' + objBTCPointSmart._id + ');" />'
                        //+ '<input type ="image" style ="width:35px;" src ="../img/sf/floppy.svg" title = "Lưu lại" onclick = "SavePoint(' + objBTCPointSmart._id + ');return false;" />'
                        + '</td>';
                    tr_html += '<td align="center" valign="center">' + '<input style="text-align: center;" id="txtDiffPoint_' + objBTCPointSmart._id + '" class="form-control" type="number" max="5" min="0" placeholder="" value="' + (objBTCPointSmart.DiffPoint == null ? '' : objBTCPointSmart.DiffPoint) + '" disabled />' + '</td>';					
                    tr_html += '<td>' + '<textarea data-toggle="popover" title="Lý do chênh lệch"  style="resize: vertical!important;" type="text" class="form-control" rows="3" id="txtNote_' + objBTCPointSmart._id + '" type="text" class="form-control" placeholder="Nhập lý do lệch" onblur="return SavePoint(' + objBTCPointSmart._id + ');">' + (objBTCPointSmart.TeamNote == null ? '' : objBTCPointSmart.TeamNote) + '</textarea>' 
                        //'<input type ="image" style ="width:35px;" src ="../img/sf/floppy.svg" title = "Lưu lại" onclick = "SavePoint(' + objBTCPointSmart._id + ');return false;" />'
                        + '</td>';
                    tr_html += trend;
                    $('#btcPointTable tbody').append(tr_html);
					
                    /*if (objBTCPointSmart.ApproveStatus != null && objBTCPointSmart.ApproveStatus != '' && objBTCPointSmart.ApproveStatus != undefined) {
                        if (objBTCPointSmart.ApproveStatus == 'ACTIVE') {
                            $("#active_" + objBTCPointSmart._id).css('display', 'block');
                            $("#active_" + objBTCPointSmart._id).disabled = true;
                            $("#cancel_" + objBTCPointSmart._id).css('display', 'none');
                        }
                        else if (objBTCPointSmart.ApproveStatus == 'CANCEL') {
                            $("#cancel_" + objBTCPointSmart._id).css('display', 'block');
                            $("#cancel_" + objBTCPointSmart._id).disabled = true;
                            $("#active_" + objBTCPointSmart._id).hide();
                        }
                    }*/
                }
                //CheckHasFile();
            } else {
                var tr_html = trstart + '<td colspan = "8" >Chưa có dữ liệu</td>' + trend;
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
			var sum_dif = sum_teampoint - sum_point
            $("#SumPoint").html(sum_point);
			$("#SumDiffPoint").html(sum_dif);
            $("#SumTeamPoint").html(sum_teampoint);
            $("#SumMaxPoint").html(sum_mpoint);
			DrawPopover(dataBTCContent);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    
}

function DrawPopover(dataBTCContent) {
    if (dataBTCContent != null) {        
        for (var i = 0; i < dataBTCContent.length; i++) {
             var objBTCPointSmart = dataBTCContent[i];               
				 $('#txtNote_' + objBTCPointSmart._id).popover({
						trigger : 'click',  
						placement : 'left', 
						html: 'true', 
						content : '<textarea id="popNote_' + objBTCPointSmart._id + '" class="popover-textarea" rows="5" onblur="return SaveNote(' + objBTCPointSmart._id + ');"></textarea>',
						template: '<div class="popover"><div class="arrow"></div>'+
						  '<h3 class="popover-title"></h3><div class="popover-content">'+
						  '</div>'/*<div class="popover-footer"><button type="button" class="btn btn-primary popover-submit" onclick="return HidetPopover(1,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-ok"></span></button>&nbsp;'+
						  '<button type="button" class="btn btn-default popover-cancel" onclick="return HidetPopover(0,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-remove"></button></div></div>'*/ 
					}).on('shown.bs.popover', function () {
						var id = this.id;	
					 	$('[data-toggle="popover"]').not(this).popover('hide');
  						ShowPopover(id);
					});
			$('#txtDes_' + objBTCPointSmart._id).popover({
						trigger : 'click',  
						placement : 'top', 
						html: 'true', 
						content : '<textarea id="popDes_' + objBTCPointSmart._id + '" class="popover-textarea" rows="5"></textarea>',
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

function ShowPopover(id){	
	var idn = id.replace('txtNote_','');
	var txt = $('#txtNote_' + idn).val();
	$('#popNote_' + idn).val(txt).focus();
}

function ShowPopover2(id){	
	var idn = id.replace('txtDes_','');
	var txt = $('#txtDes_' + idn).val();
	$('#popDes_' + idn).val(txt).focus();
}

function CheckHasFile() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value; 
	if (t.selectedIndex > 1) {
		vnGeoCode = 'VN-HN';
	}
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
            $("#check_" + objBTCFile.PointId).show();//.attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
            //$("#txtWarning_" + objBTCFile.PointId).hide();
            $("#txtTeamPoint_" + objBTCFile.PointId).removeAttr("disabled"); 
            $("#txtNote_" + objBTCFile.PointId).removeAttr("disabled");
        }
    }
}

function InitGetData() {
    LoadCboProvincials();
}
InitGetData();

function LoadDataByProvincal() {
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value;
	if (t.selectedIndex == 0) {
        AlertAutoCloseError("Bạn hãy chọn đơn vị muốn chấm điểm");
        return;
    }
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
	var vnGeoName = cboProvincal.options[cboProvincal.selectedIndex].text;
    if (t.selectedIndex > 1) {
		vnGeoCode = 'VN-HN';
		vnGeoName = 'Hà Nội'
	}
	geocode = vnGeoCode;
    var vnGeoName = cboProvincal.options[cboProvincal.selectedIndex].text;
    if (vnGeoCode == '') return AlertAutoCloseError('Bạn cần chọn tỉnh để chấm điểm');
    GetImgGeoCode(type, vnGeoCode, vnGeoName);
    DrawPointTable(vnGeoCode);
    CheckHasFile(vnGeoCode);
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
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value; 
	if (t.selectedIndex > 1) {
		vnGeoCode = 'VN-HN';
	}
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
    /*$('#btcFileTable tbody').html('');
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
    }*/
	if (fileTable == null) {
		fileTable = $('#btcFileTable').DataTable({
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
						if (data['FileName']) return data['FileName'];						
					}
				}
			]
		});		
	} else {
		fileTable.clear().rows.add(data).draw();
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

function reloadJs() {
    divupload.innerHTML = '<div id="UploadFile"> <div id="uploader" style="position:relative;"><div class="driveuploader-replace"></div></div></div>';
    var src = 'https://driveuploader.com/upload/vfg9qJ0ZfG/embed.js';
    src = $('script[src$="' + src + '"]').attr("src");
    $('script[src$="' + src + '"]').remove();
    $('<script/>').attr('src', src).appendTo('body');
};

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

function SaveNote(p_id) {
    var new_note = $("#popNote_" + p_id).val();
	var note = $("#txtNote_" + p_id).val();
	if (new_note!=note){
		$("#txtNote_" + p_id).val(new_note);
		SavePoint(p_id);
	}
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