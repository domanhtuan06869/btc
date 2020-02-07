var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var geocode = null;
var SumMaxPoint = 500;

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
                window.location.href = '/cms/unitlogin';
            }
        }
    });
};
//LoadCboProvincials();

function GetImgGeoCode() {
    var d = new Date();
    $("#imageGeoCode").attr("src", "../img/vncode/" + geocode + ".jpg?time=" + d.getTime());
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
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}

function GetProvincials(callback) {
    var objProvincials;
    $.ajax({
        dataType: "json",
        url: "/cms/getProvincial",
        data: objProvincials,
        success: function (data) {
            objProvincials = data;
            if (data != null && data.length > 0) {
                $('#btcTable tbody').html('');
                for (var i = 0; i < data.length; i++) {
                    $('#btcTable tbody').append(CreateRowProvincal(data[i]));
                }
                callback();
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
GetProvincials(GetSumpointByProvincalTeam);
function CreateRowProvincal(data) {
    var html = '';
    html = '<tr>' +
        '<td>' + data.Name + '</td>' +
        '<td><div id="SumPoint_' + data.GeoCode + '"></div></td>' +
        '<td><div id="SumTeamPoint_' + data.GeoCode + '"></div></td>' +
        '<td><div id="SumSangTaoPoint_' + data.GeoCode + '"></div></td>' +
        '<td><div id="SumAllPoint_' + data.GeoCode + '"></div></td>' +
        '<td><div id="SumPercentPoint_' + data.GeoCode + '"></div></td>' +
        '<td><div id="SumDiffPoint_' + data.GeoCode + '"></div></td>';
    for (var i = 1; i < 13; i++) {
        html += '<td><div id="SumPoint_' + data.GeoCode + '_' + i + '"></div></td>' +
            '<td><div id="SumTeamPoint_' + data.GeoCode + '_' + i + '"></div></td>' +
            '<td><div id="SumDiffPoint_' + data.GeoCode + '_' + i + '"></div></td>';
    }
        
    html +=  '</tr>';
    return html;
}

function GetSumpointByProvincalTeam() {
    var objPoint;
    $.ajax({
        dataType: "json",
        url: "/cms/getSumpointByProvincalTeam",
        data: objPoint,
        success: function (data) {
            objPoint = data;
            var sum_point = 0;
            var sum_teampoint = 0;
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var objSumpoint = data[i];
                    if (objSumpoint.SumPoint != null && objSumpoint.SumPoint != '') sum_point += objSumpoint.SumPoint;
                    if (objSumpoint.SumTeamPoint != null && objSumpoint.SumTeamPoint != '') sum_teampoint += objSumpoint.SumTeamPoint;
                    $("#SumPoint_" + objSumpoint._id.GeoCode + '_' + objSumpoint._id.TeamId).html(objSumpoint.SumPoint); 
                    $("#SumTeamPoint_" + objSumpoint._id.GeoCode + '_' + objSumpoint._id.TeamId).html(objSumpoint.SumTeamPoint);
                }
                $("#SumPoint_" + objSumpoint._id.GeoCode).html(objSumpoint.SumPoint);
                $("#SumTeamPoint_" + objSumpoint._id.GeoCode).html(objSumpoint.SumTeamPoint);
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


function DrawPointToTable() {
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCPoint",
        data: dataBTCPoint,
        success: function (data) {
            dataBTCPoint = data;
            if (data != null) {
                var sum_point = 0;
                var sum_teampoint = 0;

                for (var i = 0; i < data.length; i++) {
                    var objPoint = data[i];
                    //Tính tổng điểm tự chấm và điểm ban chấm
                    if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
                    if (objPoint.TeamPoint != null && objPoint.TeamPoint != '') sum_teampoint += objPoint.TeamPoint;

                    $("#" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.Point);
                    $("#team_" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.TeamPoint);
                    $("#diff_" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.DiffPoint);
                    $("#note_" + objPoint.ContentId + "_" + objPoint.TitleId).html(objPoint.TeamNote);

                }
            }
        }
    });
}

function ShowDetail(RequireId, TitleId, ContentId) {
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
                var list_require = objTitle.Require != null ? objTitle.Require : null;
                if (list_require == null) {
                    var rowspan_title = 1;
                    //Tạo ô Tiêu chí
                    var td_title_html = CreateTd(rowspan_title, objTitle.Name);
                    //Tạo ô điểm tối đa
                    var td_maxpoint_html = CreateTd(rowspan_title, objTitle.MaxPoint);
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
                    var td_maxpoint_html = CreateTd(rowspan_title, objTitle.MaxPoint);
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

function CreateTdMinhChung(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    return result = tdstart + data + tdend;
}

function CreateTdNote(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    var html_note = '<div id="note_' + data.ContentId + '_' + data._id + '" ></div>';
    return result = tdstart + html_note + tdend;
}

function CreateTdTeamPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var html = '<div id="team_' + data.ContentId + '_' + data._id + '" ></div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdDiffPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var html = '<div id="diff_' + data.ContentId + '_' + data._id + '" > </div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdPoint(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
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
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeocode = cboProvincal.options[cboProvincal.selectedIndex].value;

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

function ExportExcel() {
    $(".table2excel").table2excel({
        exclude: ".noExl",
        name: "Tong hop bang diem",
        filename: "BangDiem",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });
}
