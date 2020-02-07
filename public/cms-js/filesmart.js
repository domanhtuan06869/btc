var fileTable = null;
var TeamId = null;;
var dataBTCFile;

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
			setMenu(TeamId,'filesmart')
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


function CheckHasFile() {
    var cboProvincal = document.getElementById("cboProvincial");
    var vnGeoCode = cboProvincal.options[cboProvincal.selectedIndex].value;
	var t = document.getElementById("cboType");
	var e = document.getElementById("cboContent");
    var ContentId = e.options[e.selectedIndex].value;
    var type = t.options[t.selectedIndex].value; 
	if (t.selectedIndex > 1) {
		vnGeoCode = 'VN-HN';
	}
	var param = "?geocodeprovincial=" + vnGeoCode;
	if (ContentId != '' && ContentId != null && ContentId != undefined) param += "?contentid=" + ContentId;
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "/cms/getBTCFileSmart" + param,
        data: dataBTCFile,
        success: function (data) {
            DrawFileTable(data);
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = '/cms/unitlogin';
            }
        }
    });
}

function InitGetData() {
    LoadCboProvincials();
}
InitGetData();

function LoadDataByProvincal() {
	var t = document.getElementById("cboType");
    var type = t.options[t.selectedIndex].value;
	if (t.selectedIndex == 0) {
        AlertAutoCloseError("Bạn hãy chọn đơn vị muốn xem");
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
    if (vnGeoCode == '') return AlertAutoCloseError('Bạn hãy chọn tỉnh muốn xem');
    GetImgGeoCode(type, vnGeoCode, vnGeoName);
    CheckHasFile(vnGeoCode);
}



function DrawFileTable(data) {    
	if (fileTable == null) {
		fileTable = $('#btcFileTable').DataTable({
//			scrollY: 350,
//			scrollX: true,
			scrollCollapse: true,
			select: true,
			info: false,
			searching: false,
			dom: 'tp',
			language: {				
				emptyTable: "Chưa có file",
				loadingRecords: "&nbsp;",
				processing: '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'
			},
			data: data,
			buttons: [],
			columns: [
				{
					data: 'UserName',
					class: 'val-name',
					render: function (data, type, row, meta) {
						return data;
					}
				},{
					data: 'ContentId',
					render: function (data, type, row, meta) {
						if (data == 22) return '22 Đăng cai';
							else if (data == 23) return '23 Sáng tạo';
					}
				},{
					data: null,
					render: function (data, type, row, meta) {						
						if (data['FileName']) return data['FileName'];						
					}
				},{
					data: 'InputDate',
					render: function (data, type, row, meta) {
						return formatDateDetail(data);
					}
				}
			]
		});		
	} else {
		fileTable.clear().rows.add(data).draw();
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
