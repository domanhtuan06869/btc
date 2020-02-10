var dataBTCTitle = null;
var dataBTCContent = null;
var dataBTCRequire = null;
var dataBTCFile = null;
var dataBTCFileMain = null;
var dataBTCPoint = null;
var geocode = null;
var sum_point = 0;
var sum_maxpoint = 0;
var file_list = [];
var mctable;
var linktable;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
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
            $("#head_vncode").html('');
            $("#imageGeoCode").attr("src", "../img/vncode/" + data.Img + ".jpg?time=" + d.getTime());
            $("#head_vncode").html(data.Header);
            setMenu(0, 'unit');

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

function loadStart() {
    $('#loading').show();
    $('#btcTableDiv').hide();
}

function loadStop() {
    $('#loading').hide();
    $('#btcTableDiv').show();
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

function CheckHasFile() {
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
                $("#note_" + objPoint.ContentId + "_" + objPoint.TitleId).val(objPoint.Note);
                if (objPoint.Point != null && objPoint.Point != '') sum_point += objPoint.Point;
            }
            $("#SumMaxPoint").html(sum_maxpoint);
            $("#SumPoint").html(sum_point);

        }
    });
}
function optionDetail(RequireId, TitleId, ContentId, nametype) {

    if (nametype === 'Hình ảnh') {
        ShowDetailImage(RequireId, TitleId, ContentId, nametype)
    } else {
        ShowDetail(RequireId, TitleId, ContentId, nametype)
    }
}
function ShowDetail(RequireId, TitleId, ContentId, nametype) {
    $('#btcFileTable tbody').html('');
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "/cms/getBTCFile?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId,
        data: dataBTCFile,
        beforeSend: fileStart,
        complete: fileStop,
        success: function (data) {
            dataBTCFile = data;
            DrawFileTable(data, nametype);
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
function ShowDetailImage(RequireId, TitleId, ContentId,nametype) {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "/cms/getBTCFile?requireid=" + RequireId + "&titleid=" + TitleId + "&contentid=" + ContentId,
        data: dataBTCFile,
        beforeSend: fileStart,
        complete: fileStop,
        success: function (data) {
            $(`#imagebtc`)[0].innerHTML = ''
            data.map(item => {
                $('#imagebtc').append(`
                        <div style="margin-bottom:5px;border-top-left-radius:10px;border-top-right-radius:10px" class="col-md-3">
                       
                        <div class="cardimg">
                        <img  class="img-responsive img-nmc" style="height:150px" src="${item.FileLink === '' ? 'https://pluspng.com/img-png/mouse-cursor-click-png-similar-mouse-cursor-click-png-image-567.png' : item.FileLink}"></img>
                        <div  class="containerimg">
                       <div class="text-click">
                       ${item.FileName}
                       </div>
                     
                       
                         <div class="footer-img-nmc">
                        
                         <img style="padding:3px;" onclick="confirmDelete(${item._id},${item.RequireId},${item.TitleId},${item.ContentId},\'${nametype}\')" style="padding-left:86%;" src="../img/delete.png"></img>
                         </div>

                        </div>
                      </div>
                    </div>
                        `);
            })

        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    $('#myImage').modal('show');
}
function DrawFileTable(data, nametype) {

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
                        if (data['FileType'] && data['FileType'] == 'P') return 'Ảnh'
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
                            if (data['LinkNote'] && data['LinkNote'] != '' && data['LinkNote'] != null && data['LinkNote'] != undefined) note = data['LinkNote'];
                            else note = data['FileLink'];
                            if (note && note.length > 95) note = note.substring(0, 95) + '...';
                            return '<a href="' + data['FileLink'] + '"  target="_blank" title="' + data['LinkNote'] + '">' + note + '</a>';
                        }
                    }
                },
                {
                    data: null,
                    class: 'details-control',
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return '<img src="../img/delete.png" title="Xóa minh chứng">';
                    },
                    width: "20px"
                }
            ]
        });
        $('#btcFileTable').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var d = mctable.row(tr).data();
            var r = confirm("Bạn có chắc chắn muốn xoá?");
            if (r == true) {
                mctable.row($(this).parents('tr')).remove().draw(false);
                DeleteFile(d._id, d.RequireId, d.TitleId, d.ContentId, nametype);
            }
        });
    } else {
        mctable.clear().rows.add(data).draw();
    }
}

function confirmDelete(Id, RequireId, TitleId, ContentId,nametype) {
    var r = confirm("Bạn có chắc chắn muốn xoá?");
    if (r == true) {
        DeleteFile(Id, RequireId, TitleId, ContentId,nametype)
    }
}
function DeleteFile(Id, RequireId, TitleId, ContentId, nametype) {
    //var r = confirm("Bạn có chắc chắn muốn xoá?");
    //if (r == true) {
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
                AlertAutoCloseSuccess("Đã xoá");
                if (nametype === 'Hình ảnh') {
                    CheckHasFile();
                    ShowDetailImage(RequireId, TitleId, ContentId,nametype)
                }else{
                    ShowDetail(RequireId, TitleId, ContentId,nametype); 
                }

            } else {
                AlertAutoCloseError(data.message);
                if(nametype==='Hình ảnh'){
                    ShowDetailImage(RequireId, TitleId, ContentId,nametype)

                }else{
                    ShowDetail(RequireId, TitleId, ContentId,nametype); 
                }
                //ShowDetail(RequireId, TitleId, ContentId);
                //   ShowDetailImage(RequireId, TitleId, ContentId)
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    //}
}
function DrawTable(callback) {
    $('#btcTable tbody').html('');
    //var table_header_html = '<table class="table table-bordered">< thead ><tr><th class="col-md-2">Nội dung đánh giá</th><th class="col-md-3">Điều kiện chấm điểm</th><th class="col-md-2">Yêu cầu</th><th class="col-md-2">Minh chứng</th><th>Điểm tối đa</th><th>Điểm tự chấm</th></tr></thead>';

    if (dataBTCContent != null) {
        var trstart = "<tr>";
        var trend = "</tr>";
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
                    var td_maxpoint_html = CreateTdMaxPoint(rowspan_title, objTitle.MaxPoint, objTitle.Note);
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    var td_note_html = CreateTdNote(rowspan_title, objTitle);
                    if (j == 0) {
                        var tr_html = trstart + td_content_html + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_maxpoint_html + td_point_html + td_note_html + trend;
                        $('#btcTable tbody').append(tr_html);
                    }
                    else {
                        var tr_html = trstart + td_title_html + '<td>Không yêu cầu</td><td></td>' + td_maxpoint_html + td_point_html + td_note_html + trend;
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
                    //Tạo ô điểm tự chấm
                    var td_point_html = CreateTdPoint(rowspan_title, objTitle);
                    var td_note_html = CreateTdNote(rowspan_title, objTitle);
                    for (var k = 0; k < list_require.length; k++) {
                        var objRequire = list_require[k];
                        var create_td_requirename = CreateTdRequireName(objRequire, objTitle._id, objTitle.ContentId);
                        var create_td_require = CreateTdRequire(objRequire, objTitle._id, objTitle.ContentId, objTitle.TitleIdx, list_require[k].Name);

                        if (k == 0 && j == 0) {
                            var tr_html = trstart + td_content_html + td_title_html + create_td_requirename + create_td_require + td_maxpoint_html + td_point_html + td_note_html + trend;
                            $('#btcTable tbody').append(tr_html);
                        }
                        else if (k == 0 && j != 0) {
                            var tr_html = trstart + td_title_html + create_td_requirename + create_td_require + td_maxpoint_html + td_point_html + td_note_html + trend;
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
        DrawPopover();
        callback();

        CheckHasFile();
    }

}

function DrawPopover() {
    if (dataBTCContent != null) {
        for (var i = 0; i < dataBTCContent.length; i++) {
            var objBTCContent = dataBTCContent[i];
            var list_title = objBTCContent.BTCTitle;
            for (var j = 0; j < list_title.length; j++) {
                var data = list_title[j];
                //$('#te_' + data.ContentId + '_' + data._id).popover({
                $('#note_' + data.ContentId + '_' + data._id).popover({
                    trigger: 'click',
                    placement: 'top',
                    html: 'true',
                    content: '<textarea id="tet_' + data.ContentId + '_' + data._id + '" class="popover-textarea" rows="5" onblur="return SaveNote(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',' + data.TeamId + ',this);"></textarea>',
                    template: '<div class="popover"><div class="arrow"></div>' +
                        '<h3 class="popover-title" width: 300px;></h3><div class="popover-content">' +
                        '</div>'/*<div class="popover-footer"><button type="button" class="btn btn-primary popover-submit" onclick="return HidePopover(1,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-ok"></span></button>&nbsp;'+
						  '<button type="button" class="btn btn-default popover-cancel" onclick="return HidePopover(0,' + data.ContentId + ',' + data._id + ');">'+
						  '<span class="glyphicon glyphicon-remove"></button></div></div>' */
                }).on('shown.bs.popover', function () {
                    var id = this.id;
                    $('[data-toggle="popover"]').not(this).popover('hide');
                    ShowPopover(id);
                });
				/*$('#note_' + data.ContentId + '_' + data._id).on('hidden.bs.popover', function () {
						var id = this.id;
  						HidePopover(id);
					});*/
            }
        }
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

function CreateTdMaxPoint(rowspan, data, note) {
    var tdstart = '<td rowspan="' + rowspan + '" align="center" valign="center">';
    var tdend = '</td>';
    var html = '<div title="' + note + '">' + data;
    html += '<input type="image" src="../img/sf/sign-info.svg" title="' + note + '" style="width:16px;height:16px" />';
    html += '</div>';
    return result = tdstart + html + tdend;
 
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
    var html = '<div style="width:60px;float:left"><input id="' + data.ContentId + '_' + data._id + '" class="form-control" type="number" max="' + data.MaxPoint + '" min="0" placeholder="" onblur="return SavePoint(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',' + data.TeamId + ',this);" /></div>';
    //html += '<div style="width:50px;float:left"><input type="image" style="width:35px;" src="../img/sf/floppy.svg" title="Lưu lại" onclick="SavePoint(' + data.ContentId + ',' + data._id + ',' + data.MaxPoint + ',' + data.TeamId + ')" /></div>';
    var tdend = '</td>';
    return result = tdstart + html + tdend;
}

function CreateTdNote(rowspan, data) {
    var tdstart = '<td rowspan="' + rowspan + '">';
    var tdend = '</td>';
    var html_note = '<textarea data-toggle="popover" title="Tự đánh giá" style="resize: vertical!important;" rows="3" id="note_' + data.ContentId + '_' + data._id + '" type="text" class="form-control" placeholder="Tự đánh giá" onblur="return SavePoint(' + data.ContentId + ',' + data._id + ',' + data.TitleIdx + ',' + data.MaxPoint + ',' + data.TeamId + ',this);"></textarea>';
    return result = tdstart + html_note + tdend;
}

function CreateTdRequireName(data, tileid, contentid) {
    var tdstart = '<td >';
    var tdend = '</td>';
    var html = '';
    if (data) {
        html = '<div title="' + data.Note + '">' + data.Name;
        html += '<input type="image" src="../img/sf/sign-info.svg" title="' + data.Note + '" style="width:16px;height:16px" />';
        html += '</div>';
    }
    return result = tdstart + html + tdend;
}

function CreateTdRequire(data, tileid, contentid, titleidx, nametype) {
    var result = "";
    var tdstart = '<td align="center" valign="center">';
    var tdend = '</td>';
    if (data) {
        if (data.Name != 'Không yêu cầu minh chứng') {
            if (data.UploadFile == 'true') {
                result += '<input type="image" style="width:28px;margin-right:8px" title="Tải file minh chứng lên" src="../img/sf/cloud-up.svg" onclick="ShowModal(true,' + data._id + ',' + tileid + ',' + contentid + ',' + titleidx + ',' + '\'' + nametype + '\'' + ');return false;" />';
                result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="optionDetail(' + data._id + ',' + tileid + ',' + contentid + ',' + '\'' + nametype + '\'' + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '"/>';
            }
            else {
                result += '<input type="image" style="width:28px;margin-right:8px" title="Tải file minh chứng lên" src="../img/sf/cloud-up.svg" onclick="ShowModal(false,' + data._id + ',' + tileid + ',' + contentid + ',' + titleidx + ',' + '\'' + nametype + '\'' + ');return false;" />';
                result += '<input type="image" style="width:28px;display:none" title="Xem file minh chứng" src="../img/sf/file-excel.svg" onclick="ShowDetail(' + data._id + ',' + tileid + ',' + contentid + ');return false;" id="check_' + contentid + '_' + tileid + '_' + data._id + '" />';

            }
        }
    }

    return result = tdstart + result + tdend;
}

function ShowModal(uploadfile, requireid, titleid, contentid, titleidx, nametype) {
    //return AlertAutoCloseError('Thời gian nộp minh chứng đã kết thúc!');
    file_list = [];
    $("#txtLink").val('');
    $("#hdfFileName").val('');
    $("#hdfRequireId").val(requireid);
    $("#hdfTitleId").val(titleid);
    $("#hdfTitleIdx").val(titleidx);
    $("#hdfContentId").val(contentid);
    $("#nametype").val(nametype);


    //$('#btcLinkTable tbody').html('');
    if (uploadfile === true && nametype === 'Hình ảnh') {
        $('.dz-hidden-input').attr('accept', '.jpg, .png, .jpeg');
        $('#UploadFile').css('display', 'block');
        $('#UploadLink').css('display', 'none');
        //     $('#sendbtn').hide();
        $('#cancelbtn').hide();
    } else if (uploadfile === true && nametype === 'Sản phẩm minh chứng' || nametype === 'Văn bản') {
        $('#UploadFile').css('display', 'block');
        $('#UploadLink').css('display', 'none');
        //      $('#sendbtn').hide();
        $('#cancelbtn').hide();
    }
    else {
        $('#UploadFile').css('display', 'none');
        $('#UploadLink').css('display', 'block');
        $('#sendbtn').hide();
        $('#cancelbtn').hide();
        //$('#buttoncs').css('display', 'none');
        LoadLink(requireid, titleid, contentid);
    }
    $('#myModal').modal('show');
}

function SaveNote(contentId, titleId, titleIdx, maxPoint, teamId, obj) {
    var new_note = $("#tet_" + contentId + "_" + titleId).val();
    var note = $("#note_" + contentId + "_" + titleId).val();
    if (new_note != note) {
        $("#note_" + contentId + "_" + titleId).val(new_note);
        SavePoint(contentId, titleId, titleIdx, maxPoint, teamId, obj);
    }
}

function SavePoint(contentId, titleId, titleIdx, maxPoint, teamId, obj) {
    //	return AlertAutoCloseError('Thời gian nộp minh chứng đã kết thúc!');
    var point = $("#" + contentId + "_" + titleId).val() || 0;
    if (parseInt(point) > parseInt(maxPoint)) { AlertAutoCloseError('Bạn không thể cho điểm vượt quá ' + maxPoint); }
    else {
        var objPoint = {};
        objPoint.ContentId = contentId;
        objPoint.TitleId = titleId;
        objPoint.Point = point;
        objPoint.MaxPoint = maxPoint;
        objPoint.TitleIdx = titleIdx;
        objPoint.TeamId = teamId;
        objPoint.Unit = 1;
        objPoint.Note = $("#note_" + contentId + "_" + titleId).val();
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
function reloadJs() {
    /*  file_list = [];
      $("#txtLink").val('');
      $("#hdfFileName").val('');
      divupload.innerHTML = '<div id="UploadFile"> <div id="uploader" style="position:relative;"><div class="driveuploader-replace"></div></div></div>';
      var src = 'https://driveuploader.com/upload/vfg9qJ0ZfG/embed.js';
      src = $('script[src$="' + src + '"]').attr("src");
      $('script[src$="' + src + '"]').remove();
      $('<script/>').attr('src', src).appendTo('body');*/
    array = []
    Dropzone.forElement('#mydropzone').removeAllFiles(true)
    $('.dz-preview').empty();
};
$('#sendbtn').on('click', function (e) {
    $('#sendbtn').disabled = true;
    var psid = $("#hdfpsid").val();
    var ContentId = $("#hdfContentId").val();
    var TitleId = $("#hdfTitleId").val();
    var TitleIdx = $("#hdfTitleIdx").val();
    var RequireId = $("#hdfRequireId").val();
    var FileName = $("#hdfFileName").val();
    var GeoCodeProvincial = $("#hdfGeoCode").val();
    var Provincial = $("#hdfGeoName").val();
    var UserName = $("#hdfUserName").val();
    var FileLink = $("#txtLink").val();
    var nametype = $("#nametype").val();

    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].filename && array[i].location != "") {
                var objFileUpload = {};
                //objFileUpload._id = 1;
                objFileUpload.ContentId = ContentId;
                objFileUpload.TitleId = TitleId;
                objFileUpload.TitleIdx = TitleIdx;
                objFileUpload.RequireId = RequireId;
                if (nametype === 'Hình ảnh') { objFileUpload.FileName = '<a  href=' + array[i].location + ' target="_blank">' + array[i].filename + '</a>'; }
                if (nametype === 'Văn bản') { objFileUpload.FileName = array[i].type === 'application/pdf' ? '<a href=' + array[i].location + 'target="_blank">' + array[i].filename + '</a><br>' : '<a href="https://view.officeapps.live.com/op/view.aspx?src=' + array[i].location + '" target="_blank">' + array[i].filename + '</a><br>'; }
                if (nametype === 'Sản phẩm minh chứng') { objFileUpload.FileName = '<a href=' + array[i].location + ' target="_blank">' + array[i].filename + '</a><br>'; }

                objFileUpload.FileLink = array[i].location;
                objFileUpload.psid = psid;
                objFileUpload.GeoCodeProvincial = GeoCodeProvincial;
                objFileUpload.Provincial = Provincial;
                objFileUpload.UserName = UserName;

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: "/cms/insertBTCFile",
                    data: JSON.stringify(objFileUpload),
                    success: function (data) {
                        if (data.success == "true") {
                            AlertAutoCloseSuccess("Gửi thành công");
                            $("#check_" + objFileUpload.ContentId + "_" + objFileUpload.TitleId + "_" + objFileUpload.RequireId).show();//.css('display', 'block');
                            Dropzone.forElement('#mydropzone').removeAllFiles(true)
                            array = []
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

        $('#sendbtn').disabled = false;
        $('#myModal').modal('hide');
        reloadJs();
    }
    else {
        if (FileLink == "" || FileLink == null) return AlertAutoCloseError("Bạn cần nhập link muốn nộp");
        var objFileUpload = {};
        objFileUpload.ContentId = ContentId;
        objFileUpload.TitleId = TitleId;
        objFileUpload.TitleIdx = TitleIdx;
        objFileUpload.RequireId = RequireId;
        objFileUpload.FileName = FileName;
        objFileUpload.FileLink = FileLink;
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
    var psid = $("#hdfpsid").val();
    var ContentId = $("#hdfContentId").val();
    var TitleId = $("#hdfTitleId").val();
    var TitleIdx = $("#hdfTitleIdx").val();
    var RequireId = $("#hdfRequireId").val();
    var FileName = $("#hdfFileName").val();
    var FileLink = $("#txtLink").val();
    var LinkNote = $("#txtLinkNote").val();
    if (FileLink == null || FileLink == "") {
        alert('Mời bạn nhập thông tin minh chứng!');
        return;
    }
    var objFileUpload = {};
    objFileUpload.ContentId = ContentId;
    objFileUpload.TitleId = TitleId;
    objFileUpload.TitleIdx = TitleIdx;
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
    $.ajax({
        type: 'GET',
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

    if (linktable == null) {
        linktable = $('#btcLinkTable').DataTable({
            "language": {
                "emptyTable": "Chưa có minh chứng cho nội dung này"
            },
            scrollCollapse: true,
            select: true,
            info: false,
            searching: false,
            dom: 'tp',
            data: data,
            buttons: [],
            columns: [
                {
                    data: null,
                    render: function (data, type, row, meta) {
                        if (data['FileType'] && data['FileType'] == 'P') return 'Ảnh'
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
                            if (note && note.length > 95) note = note.substring(0, 95) + '...';
                            return '<a href="' + data['FileLink'] + '"  target="_blank" title="' + data['LinkNote'] + '">' + note + '</a>';
                        }
                    }
                },
                {
                    data: null,
                    class: 'details-control',
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return '<img src="../img/delete.png" title="Xóa minh chứng">';
                    },
                    width: "20px"
                }
            ]
        });
        $('#btcLinkTable').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var d = linktable.row(tr).data();
            var r = confirm("Bạn có chắc chắn muốn xoá?");
            if (r == true) {
                linktable.row($(this).parents('tr')).remove().draw(false);
                DeleteLink(d._id, d.RequireId, d.TitleId, d.ContentId);
            }
        });
    } else {
        linktable.clear().rows.add(data).draw();
    }

}

function DeleteLink(Id, RequireId, TitleId, ContentId) {
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
                CheckHasFile();
            } else {

                //AlertAutoCloseError(data.message);
                //LoadLink(RequireId, TitleId, ContentId);
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
    // }
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

$(document).ready(function () {
    if (isMobile.any()) { }
    else {
        var $table = $("#btcTable");
        $table.on("floatThead", function (e, isFloated, $floatContainer) {
            if (isFloated) {
                $floatContainer.addClass("floated"); // the div containing the table containing the thead
                $(this).addClass("floated"); // $table
            } else {
                $floatContainer.removeClass("floated");
                $(this).removeClass("floated");
            }
        });
        $(document).on("click", ".menu-title", function () {

            /*var reinit = $table.floatThead('destroy');  		*/
            setTimeout(function () {
                $table.floatThead('reflow');//reinit();
            }, 200);
        });
        $table.floatThead({ top: 50, autoReflow: true });
    }
    //InitGetData();
});
function ShowPopover(id) {
    //var idn = id.replace('te_','');	
    var idn = id.replace('note_', '');
    var txt = $('#note_' + idn).val();
    $('#tet_' + idn).val(txt).focus();
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