
function ShowDetail() {
    $("#info_name").text('');
    $("#info_level").text('');
    $("#info_position").text('');
    $("#info_birthday").text('');
    $("#info_phone").text('');
    $("#info_email").text('');
    $("#info_address").text('');
    $("#info_status").text('');
    $('#info_img').attr('src', '../img/logo.jpg');
    var imgAvatar = document.getElementById("info_img");
    var objInfo;
    $.ajax({
        dataType: "json",
        url: "/cms/getMemberBTC",
        data: objInfo,
        success: function (data) {
            objInfo = data[0];
            imgAvatar.src = objInfo.ImgUrl;
            //var status = objInfo.BlockStatus === "ACTIVE" ? "Đã duyệt" : "Chưa duyệt";
            $("#info_name").text(objInfo.Name);
            $("#info_level").text(objInfo.Type);
            //$("#info_position").text(objInfo.Position);
            $("#info_birthday").text(objInfo.Birthday);
            $("#info_phone").text(objInfo.Phone);
            $("#info_email").text(objInfo.Email);
            if (objInfo.Type == "Cấp tỉnh") {
                //$("#info_type").text(objInfo.Type + ": ");
                $("#info_address").text(objInfo.Provincial);
            }
            if (objInfo.Type == "Cấp Trung Ương")  {
                //$("#info_type").text(objInfo.Type);
                $("#info_address").text(objInfo.Team);
            }
            setMenu(0,'profile');
            //$("#info_status").text(status);
        }
    });
}
ShowDetail();
//function drawTable(objMembers) {

//    for (var i = 0; i < objMembers.length; i++) {
//        obj = objMembers[i];
//        if (obj.BlockStatus == 'PENDING' && obj.Type == 'Candidates') {
//            var img = '<img id="img_infodetail" src="' + obj.ImgUrl + '" alt="Ảnh đại diện" class="img-responsive">';
//            var strRow = '';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Họ và Tên:</label><label class="margin0 col-sm-8"> ' + obj.Name + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Cấp cán bộ:</label><label class="margin0 col-sm-8"> ' + obj.LevelName + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Chức vụ:</label><label class="margin0 col-sm-8"> ' + obj.Position + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Ngày sinh:</label><label class="margin0 col-sm-8"> ' + obj.Birthday + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Điện thoại:</label><label class="margin0 col-sm-8"> ' + obj.Phone + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Email:</label><label class="margin0 col-sm-8"> ' + obj.Email + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Địa chỉ :</label><label class="margin0 col-sm-8"> ' + obj.Ward + ' - ' + obj.District + ' - ' + obj.Provincial + '</label></div>';
//            strRow = strRow + '<div class="col-sm-12"><label class="col-sm-4 text-right margin0">Trạng thái :</label><label class="margin0 col-sm-8"> Chờ duyệt</label></div>';
//            tableInfoPending.row.add([img, strRow]).draw(false);
//        }
//    }
//    tableInfoPending.draw();

//};


