var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var geocode = null;
var sum_point = 0;
var sum_maxpoint = 0;
var sum_teampoint = 0;
var sum_diffpoint = 0;
var TeamId = null;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function loadStart() {
    $('#loading').show();
    $('#btcTableDiv').hide();
}

function loadStop() {
    $('#loading').hide();
    $('#btcTableDiv').show();
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
			setMenu(0,'reportunit');
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}
GetImgGeoCode();
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
            if (objProvincials.length > 1) {
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

LoadCboContent();
function InitGetData() {
    var psid = getUrlParameter('psid');
    $("#hdfpsid").val(psid);
    var e = document.getElementById("cboContent");
    var ContentId;
	if (e.options[e.selectedIndex]) ContentId = e.options[e.selectedIndex].value;
    var param = "";
    if (ContentId != '' && ContentId != null && ContentId != undefined) param += "?contentid=" + ContentId;
    
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCContent" + param,
        data: dataBTCContent,
		beforeSend: loadStart,
		complete: loadStop,
        success: function (data) {
            dataBTCContent = data;
            DrawTable(DrawPointToTable);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}


function DrawPointToTable() {
    var vnGeocode = geocode;
    
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    var param = "";
    var param_content = "";
    var param_geo = "";
    if (ContentId != null && ContentId != undefined && ContentId != '') {
        param_content += "contentid=" + ContentId;
        if (param == "") param += "?" + param_content;
        else param += "&" + param_content;
    }
    
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/cms/getBTCPoint" + param,
        data: dataBTCPoint,
        success: function (data) {
            dataBTCPoint = data;
            sum_point = 0;
            sum_teampoint = 0;
            sum_diffpoint = 0;
            for (var i = 0; i < data.length; i++) {
                var objPoint = data[i];

                $("#" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.Point);
                /*$("#team_" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.TeamPoint);
                $("#diff_" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.DiffPoint);
                $("#note_" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.TeamNote);*/
                if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
               /* if (objPoint.TeamPoint != null && objPoint.TeamPoint != '') sum_teampoint += objPoint.TeamPoint;
                if (objPoint.DiffPoint != null && objPoint.DiffPoint != '') sum_diffpoint += objPoint.DiffPoint;*/
            }

            $("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);
            $("#SumTeamPoint").html(sum_teampoint);
            $("#SumDiffPoint").html(sum_teampoint - sum_point);
        }
    });
}

function ShowDetail(RequireId, TitleId, ContentId) {
    var GeoCodeProvincial = "";
    
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
            var file_name = (objBTCContent.FileName == null ? '' : objBTCContent.FileName);
            var file_link = '<a href="' + objBTCContent.FileLink + '">' + objBTCContent.FileLink + '</a>';
            if (file_name == '') file_name += file_link;
            var tr_html = trstart + CreateTd(1, file_name) + trend;
             
            $('#btcFileTable tbody').append(tr_html);
        }
    }
}
function DrawTable(callback) {
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
            var td_content_html = CreateTd(1, objBTCContent.Code + ': ' + objBTCContent.Name);

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
                    var td_maxpoint_html = CreateMaxpoint(rowspan_title, objTitle.MaxPoint);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    //Tạo ô điểm ban chấm
                    var td_team_point_html = CreateTdTeamPoint(rowspan_title, objTitle);
                    //Tạo ô điểm chênh lệch
                    var td_diff_point_html = CreateTdDiffPoint(rowspan_title, objTitle);
                    //Tạo ô lý do chênh lệch
                    var td_note_html = CreateTdNote(rowspan_title, objTitle);
                    if (j == 0) {
                        var tr_html =   trstart + td_content_html + td_title_html  + td_maxpoint_html + td_point_html +
                                        td_team_point_html + td_diff_point_html + td_note_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                    else {
                        var tr_html = trstart + td_content_html + td_title_html + td_maxpoint_html + td_point_html + td_team_point_html +
                                        td_diff_point_html + td_note_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                }
                else {
                    var rowspan_title = 1;
                    //Tạo ô Nội dung
                    //var td_content_html = CreateTd(rowspan_require, objBTCContent.Code + ': ' + objBTCContent.Name);
                    //Tạo ô Tiêu chí
                    var td_title_html = CreateTd(rowspan_title, objTitle.Name);
                    //Tạo ô điểm tối đa
                    var td_maxpoint_html = CreateMaxpoint(rowspan_title, objTitle.MaxPoint);
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
                        var create_td_requirename = '';//CreateTdRequireName(objRequire, objTitle._id, objTitle.ContentId);
                        var create_td_require = '';//CreateTdRequire(objRequire, objTitle._id, objTitle.ContentId);
                        if (k == 0 && j == 0) {
                            var tr_html = trstart + td_content_html + td_title_html + create_td_requirename + create_td_require +
                                td_maxpoint_html + td_point_html + td_team_point_html + td_diff_point_html + td_note_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else if (k == 0 && j != 0) {
                            var tr_html = trstart + td_content_html + td_title_html + create_td_requirename + create_td_require + td_maxpoint_html +
                                td_point_html + td_team_point_html + td_diff_point_html + td_note_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else {
                            //var tr_html = trstart + create_td_requirename + create_td_require + trend;
                            //$('#btcTable tbody').append(tr_html);
                        }
                    }
                }
            }
        }
        callback();
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
        }
    });
    return dataBTCTitle;
}

function CreateTd(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateMaxpoint(rowspan, data) {
    var tdstart = '<td align="center" valign="center" rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdMinhChung(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdNote(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    var html_note = '<div class="col-md-12"><div style="max-width:200px;"><div style="max-width:100%;overflow:auto" id="note_' + data.ContentId + '_' + data._id + '" ></div></div></div>';
    return result = tdstart + html_note + tdend;
}

function CreateSumTd() {
    var html = '<td  align="center" valign="center"><div id="SumMaxPoint"></div></td>' + '<td align="center" valign="center"><div id="SumPoint"></div></td>' + '<td align="center" valign="center"><div id="SumTeamPoint"></div></td>' + '<td align="center" valign="center"><div id="SumDiffPoint"></div></td>';
    return html;
}

function CreateTdTeamPoint(rowspan, data) {
    var tdstart = '<td align="center" valign="center" rowspan="' + rowspan + '">';
    var html = '<div id="team_' + data.ContentId + '_' + data._id + '" ></div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdDiffPoint(rowspan, data) {
    var tdstart = '<td align="center" valign="center" rowspan="' + rowspan + '">';
    var html = '<div id="diff_' + data.ContentId + '_' + data._id + '" > </div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdPoint(rowspan, data) {
    var tdstart = '<td align="center" valign="center" rowspan="' + rowspan + '">';
    var html = '<div id="' + data.ContentId + '_' + data._id + '" ></div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdRequireName(data, tileid, contentid) {
    var tdstart = '<td >';
    var tdend = '</td>';
    var html = '<div title="' + data.Note + '">' + data.Name;
    //if (data.Note != '')
    //html += '<img src="../img/sf/sign-info.svg" title="' + data.Note + '" width="16" height="16">';
    html += '</div>';
    return result = tdstart + html + tdend;
}

function CreateTdRequire(data, tileid, contentid) {
    var result = "";
    var tdstart = '<td>';
    var tdend = '</td>';
    if (data.UploadFile == 'true') {
        //result += '<input type="button" value="Thêm" onclick="ShowModal(true,' + data._id + ',' + tileid + ',' + contentid + ')" />';
        result += '<input type="button" value="Xem" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ')" />';
    }
    else {
        //result += '<input type="button" value="Thêm" onclick="ShowModal(false,' + data._id + ',' + tileid + ',' + contentid + ')" />';
        result += '<input type="button" value="Xem" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ')" />';
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
function SavePoint(ContentId, TitleId) {
    var vnGeocode = geocode;

    var point = $("#" + ContentId + "_" + TitleId).val();
    var teampoint = $("#team_" + ContentId + "_" + TitleId).val();
    var diffpoint = $("#diff_" + ContentId + "_" + TitleId).val();
    var teamnote = $("#note_" + ContentId + "_" + TitleId).val();
    
    var objPoint = {};
    objPoint.GeoCodeProvincial = vnGeocode;
    objPoint.ContentId = ContentId;
    objPoint.TitleId = TitleId;
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
                alert("Lưu lại thành công");
            }
            else {
                alert(data.message);
            }
        }
    });

}

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
                alert("Gửi thành công");
                location.reload();
            }
            else {
                alert(data.message);
            }
        }
    });
});

/*function ExportExcel() {
    $(".table2excel").table2excel({
        exclude: ".noExl",
        name: "Tong hop bang diem",
        filename: "BangDiem",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });
};*/

function ExportExcel() {
    var blob,
        template = prepareTable();

    blob = new Blob([template], {
        type: "application/vnd.ms-excel;charset=utf-8"
    });

    saveAs(blob, "Report");
}

function prepareTable() {
    var html_table = '<table border="1">' + $('#btcTable').html() + '</table>';
    return html_table;
}

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
	InitGetData();
});
