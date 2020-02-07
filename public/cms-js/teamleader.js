var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var geocode = "";
var sum_point = 0;
var sum_maxpoint = 0;
var sum_teampoint = 0;
var sum_diffpoint = 0;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

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
            var o = new Option("Chọn Tỉnh", "0");
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
                alert("Bạn đã hết phiên làm việc");
                window.location.href = '/cms/unitlogin?psid=' + psid;
            }
        }
    });
};
LoadCboProvincials();

function GetImgGeoCode(code) {
    var d = new Date();
    $("#imageGeoCode").attr("src", "../img/vncode/" + code + ".jpg?time=" + d.getTime());
}
//GetImgGeoCode();

function InitGetData() {
    var psid = getUrlParameter('psid');
    $("#hdfpsid").val(psid);
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;

    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    geocode = vnGeocode;
    GetImgGeoCode(vnGeocode);
    if (cboProvincal.selectedIndex == 0) return alert("Bạn hãy chọn đơn vị muốn chấm điểm");
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCContent?id=" + ContentId,
        data: dataBTCContent,
        success: function (data) {
            dataBTCContent = data;
            DrawTable(DrawPointToTable);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc");
                window.location.href = '/cms/unitlogin?psid=' + psid;
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
                var o = new Option(objProvincials[i - 1].Code, objProvincials[i - 1]._id);
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
};
LoadCboContent();
//Hiển thị Báo cáo tổng hợp đơn vị
function ShowSumaryReport() {
    var cboProvincal = document.getElementById("cboProvincial");
    if (cboProvincal.selectedIndex == 0) {
        alert("Bạn cần chọn tỉnh muốn xem");
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
        url: "/cms/getBTCSumaryFile" + param,
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

function CheckHasFile() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    var param = "";
    if (vnGeocode != '' && vnGeocode != null && vnGeocode != undefined) {
        if (param == '') param += "?geocodeprovincial=" + vnGeocode;
        else {
            param += "&geocodeprovincial=" + vnGeocode;
        }
    }
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFile" + param,
        data: dataBTCFile,
        success: function (data) {
            DrawCheckFileTable(data);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc");
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
            //$("#check_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId + "_" + objBTCFile.RequireId).css('display', 'block');
            //var d = new Date();
            $("#check_" + objBTCFile.ContentId + "_" + objBTCFile.TitleId + "_" + objBTCFile.RequireId).show();//.attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
        }
    }
}

function DrawPointToTable() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    
    var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/cms/getBTCPoint?contentid=" + ContentId + "&geocodeprovincial=" + vnGeocode,
        data: dataBTCPoint,
        success: function (data) {
            dataBTCPoint = data;
            sum_point = 0;
            sum_teampoint = 0;
            sum_diffpoint = 0;
            for (var i = 0; i < data.length; i++) {
                var objPoint = data[i];
                if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
                if (objPoint.TeamPoint != null && objPoint.TeamPoint != '') sum_teampoint += objPoint.TeamPoint;
                if (objPoint.DiffPoint != null && objPoint.DiffPoint != '') sum_diffpoint += objPoint.DiffPoint;
                $("#" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.Point);
                $("#team_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.TeamPoint);
                $("#diff_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.DiffPoint);
                $("#note_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.TeamNote);
            }
            $("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);
            $("#SumTeamPoint").html(sum_teampoint);
            $("#SumDiffPoint").html(sum_teampoint - sum_point);
        }
    });
}

function ShowDetail(RequireId, TitleId, ContentId) {
    $('#btcFileTable tbody').html('');
    var GeoCodeProvincial = "";
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFile?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId + "&geocodeprovincial=" + vnGeocode,
        data: dataBTCFile,
        success: function (data) {
            dataBTCFile = data;
            DrawFileTable(data);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc");
                window.location.href = '/cms/unitlogin?psid=' + psid;
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
            var file_link = '<a href="' + objBTCContent.FileLink + '" target="_blank" >' + objBTCContent.FileLink + '</a>';
            var html_linkNote = CreateTd(1, objBTCContent.LinkNote == null ? '' : objBTCContent.LinkNote);
            file_name += file_link;
            var tr_html = trstart + CreateTd(1, file_name) + html_linkNote + trend;
             
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
            var td_content_html = CreateTd(rowspan_require, objBTCContent.Code + ': ' + objBTCContent.Name);

            var list_title = objBTCContent.BTCTitle;
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
                    //Tạo ô điểm tối đa
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    //Tạo ô điểm ban chấm
                    var td_team_point_html = CreateTdTeamPoint(rowspan_title, objTitle);
                    //Tạo ô điểm chênh lệch
                    var td_diff_point_html = CreateTdDiffPoint(rowspan_title, objTitle);
                    //Tạo ô lý do chênh lệch
                    var td_note_html = CreateTdNote(rowspan_title, objTitle);
                    if (j == 0) {
                        var tr_html =   trstart + td_content_html + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_maxpoint_html + td_point_html +
                                        td_team_point_html + td_diff_point_html + td_note_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                    else {
                        var tr_html =   trstart + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_maxpoint_html + td_point_html + td_team_point_html +
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
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint);
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
                        var create_td_requirename = CreateTd(1, objRequire.Name);
                        var create_td_require = CreateTdRequire(objRequire, objTitle._id, objTitle.ContentId);
                        if (k == 0 && j == 0) {
                            var tr_html = trstart + td_content_html + td_title_html + create_td_requirename + create_td_require +
                                td_maxpoint_html + td_point_html + td_team_point_html + td_diff_point_html + td_note_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else if (k == 0 && j != 0) {
                            var tr_html = trstart + td_title_html + create_td_requirename + create_td_require + td_maxpoint_html +
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
    var html = '<td  align="center" valign="center"><div id="SumMaxPoint"></div></td>' + '<td align="center" valign="center"><div id="SumPoint"></div></td>' + '<td align="center" valign="center"><div id="SumTeamPoint"></div></td>' + '<td align="center" valign="center"><div id="SumDiffPoint"></div></td>';
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
    var html_note = '<textarea style="resize: vertical!important;" rows="2" id="note_' + data.ContentId + '_' + data._id + '" type="text" class="form-control" placeholder="Nhập lý do" ></textarea>';
    html_note += '<input type="image" style="width:35px;" src="../img/sf/floppy.svg" title="Lưu lại" onclick="SavePoint(' + data.ContentId + ',' + data._id + ')" />';
    return result = tdstart + html_note + tdend;
}

function CreateTdMaxPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdTeamPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var html = '<input style="text-align: center;" id="team_' + data.ContentId + '_' + data._id + '" onchange="ChangePoint(' + data.ContentId + ',' + data._id + ')" class="form-control" type="number" max="' + data.MaxPoint + '" min="0" placeholder="" />';
    html += '<input type="image" style="width:35px;" src="../img/sf/floppy.svg" title="Lưu lại" onclick="SavePoint(' + data.ContentId + ',' + data._id + ')" />';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdDiffPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var html = '<input style="text-align: center;" id="diff_' + data.ContentId + '_' + data._id + '" class="form-control" type="number" placeholder="" disabled />';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var html = '<input style="text-align: center;" id="' + data.ContentId + '_' + data._id + '" class="form-control" type="number" max="' + data.MaxPoint + '" min="0" placeholder="" disabled />';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdRequire(data, tileid, contentid) {
    var result = "";
    var tdstart = '<td align="center" valign="center">';
    var tdend = '</td>';
    if (data.UploadFile == 'true') {
        //result += '<input type="button" value="Thêm" onclick="ShowModal(true,' + data._id + ',' + tileid + ',' + contentid + ')" />';
         //result += '<input type="image" title="Xem file minh chứng" src="../img/view.png" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" />';
        result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
    }
    else {
        //result += '<input type="button" value="Thêm" onclick="ShowModal(false,' + data._id + ',' + tileid + ',' + contentid + ')" />';
         //result += '<input type="image" title="Xem file minh chứng" src="../img/view.png" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" />';
        result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';
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
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;

    var point = $("#" + ContentId + "_" + TitleId).val();
    var teampoint = $("#team_" + ContentId + "_" + TitleId).val();
    var diffpoint = $("#diff_" + ContentId + "_" + TitleId).val();
    var teamnote = $("#note_" + ContentId + "_" + TitleId).val();
    if (parseInt(teampoint) > parseInt(MaxPoint)) { return AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + MaxPoint); }
    else {
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
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
 });

