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
setMenu(0,'sumaryfile');
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
			$("#head_vncode").html('');
            $("#imageGeoCode").attr("src", "../img/vncode/" + data.Img + ".jpg?time=" + d.getTime());
			$("#head_vncode").html(data.Header);
			setMenu(0,'smart');
        }
    });
}
GetImgGeoCode();

function InitGetData() {
    ShowDetail();
}
InitGetData();

function ShowDetail() {
    $('#btcFileTable tbody').html('');
    $.ajax({
        dataType: "json",
        url: "/cms/getBTCSumaryFile",
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
    //$('#myDetail').modal('show');
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
            var btnDelete = '<td align="left" width="30px"><input type="image" style="width:30px;" src="../img/del.png" title="Hủy" onclick="DeleteFile(' + objBTCContent._id + ')" /></td>';
            var file_name = (objBTCContent.FileName == null ? '' : objBTCContent.FileName); 
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
            url: "/cms/deleteBTCSumaryFile",
            data: JSON.stringify(objFile),
            success: function (data) {
                if (data.success == "true") {
                    AlertAutoCloseSuccess("Xóa thành công");
                } else {
                    AlertAutoCloseError(data.message);
                }
                InitGetData();
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

function ShowModal(uploadfile) {
    
    $('#UploadFile').css('display', 'block');
    //$('#UploadLink').css('display', 'none');
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
    if (file_list.length > 0) {
        var FileName = $("#hdfFileName").val();
        var psid = $("#hdfpsid").val();
        var GeoCodeProvincial = $("#hdfGeoCode").val();
        var Provincial = $("#hdfGeoName").val();
        var UserName = $("#hdfUserName").val();
        //var FileLink = $("#txtLink").val();
        for (var i = 0; i < file_list.length; i++) {
            var objFileUpload = {};
            objFileUpload.FileName = file_list[i];// FileName;
            objFileUpload.psid = psid;
            objFileUpload.GeoCodeProvincial = GeoCodeProvincial;
            objFileUpload.Provincial = Provincial;
            objFileUpload.UserName = UserName;
            //objFileUpload.FileList = file_list;
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: "/cms/insertBTCSumaryFile",
                data: JSON.stringify(objFileUpload),
                success: function (data) {
                    if (data.success == "true") {
                        AlertAutoCloseSuccess("Gửi thành công");
                        var d = new Date();
                        $("#check_" + objFileUpload.PointId).attr("src", "../img/sf/file-excel.svg?time=" + d.getTime());
                    }
                    else {
                        AlertAutoCloseError(data.message);
                    }
                    InitGetData();
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

        //var objFileUpload = {};
        //objFileUpload.FileName = FileName;
        //objFileUpload.psid = psid;
        //objFileUpload.GeoCodeProvincial = GeoCodeProvincial;
        //objFileUpload.Provincial = Provincial;
        //objFileUpload.UserName = UserName;
        ////objFileUpload.FileLink = FileLink;

        //$.ajax({
        //    type: 'POST',
        //    contentType: 'application/json',
        //    url: "/cms/insertBTCSumaryFile",
        //    data: JSON.stringify(objFileUpload),
        //    success: function (data) {
        //        if (data.success == "true") {
        //            $('#sendbtn').disabled = false;
        //            AlertAutoCloseSuccess("Gửi thành công");
        //            $('#myModal').modal('hide');
        //            reloadJs();
        //            InitGetData();
        //        }
        //        else {
        //            $('#sendbtn').disabled = false;
        //            AlertAutoCloseError(data.message);
        //        }
        //    }
        //});
    }
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