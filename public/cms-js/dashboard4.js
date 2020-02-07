var listGeocode;
var objGeoCode;
var list;
var mem;
var content;
var datatable;
var mctable;
var TeamId;
var pro;
var team = 0;
var type = "Cấp tỉnh";

function GetTeamId() {
	$.ajax({
		type: 'POST',
		data: '',
		contentType: 'application/json',
		url: "/cms/getTeamId",
		data: TeamId,
		success: function (data) {
			TeamId = data;
			setMenu(TeamId, 'dashboard')
		}
	});
}
GetTeamId();	
function LoadCboProvincials() {
	var selectElemRef = document.getElementById("cboProvincial");
	var objProvincials;
	$.ajax({
		dataType: "json",
		url: "/cms/getBTCList",
		data: objProvincials,
		success: function (data) {
			objProvincials = data;
			list = data;
			var html = '';
			while (selectElemRef.length > 0) {
				selectElemRef.remove(0);
			}
			var o = new Option("Chọn tỉnh", "0");
			$("#cboProvincial").append(o);
			for (var i = 0, len = objProvincials.length; i < len; i++) {

				var o = new Option(objProvincials[i].Name, objProvincials[i].Name);
				$("#cboProvincial").append(o);

			}
			if (selectElemRef.length > 1) {
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

LoadCboProvincials();

function LoadCboContent() {
	var selectElemRef = document.getElementById("cboContent");
	var obj;
	$.ajax({
		dataType: "json",
		url: "/cms/getBTCContentList",
		data: obj,
		success: function (data) {
			obj = data;
			content = data;
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

function SetCboContent() {
	var selectElemRef = document.getElementById("cboContent");
	obj = content;
	var html = '';
	while (selectElemRef.length > 0) {
		selectElemRef.remove(0);
	}
	/*console.log(content);
	console.log(pro);
	console.log(team);*/
	var o = new Option("Nội dung", "");
	$("#cboContent").append(o);
	for (var i = 0, len = obj.length; i < len; i++) {
		if (obj[i].Type == type) {
			var tit = obj[i].BTCTitle;
			for (var j = 0, l = tit.length; j < l; j++) {
				if (team==0 || tit[j].TeamId==team) {
					var v = obj[i].Code + '.' + tit[j].TitleIdx;
					var vl = obj[i].ContentId * 100 + tit[j].TitleIdx;
					var o = new Option(v, vl);
					$("#cboContent").append(o);
				}
			}
		}
	}
	if (selectElemRef.length > 1) {
		document.getElementById("cboContent").selectedIndex = 0;
	}
};

function SetCboUser(p, t) {
	var selectElemRef = document.getElementById("cboUser");
	obj = mem;
	var html = '';
	while (selectElemRef.length > 0) {
		selectElemRef.remove(0);
	}
	//console.log(obj);
	//console.log(p);
	//console.log(t);
	var o = new Option("Người dùng", "");
	$("#cboUser").append(o);
	for (var i = 0, len = obj.length; i < len; i++) {
		if ((p == 1 && obj[i].Type == t) || (p == 0 && obj[i].Provincial == t)) {
			var o = new Option(obj[i].Name, obj[i]._id);
			$("#cboUser").append(o);

		}
	}
	if (selectElemRef.length > 1) {
		document.getElementById("cboUser").selectedIndex = 0;
	}
};

function SetCboUser2(t) {
	var selectElemRef = document.getElementById("cboUser2");
	obj = mem;
	var html = '';
	while (selectElemRef.length > 0) {
		selectElemRef.remove(0);
	}
	//console.log(obj);
	//console.log(p);
	//console.log(t);
	var o = new Option("Người chấm", "");
	$("#cboUser2").append(o);
	for (var i = 0, len = obj.length; i < len; i++) {
		if (obj[i].TeamId == t) {
			var o = new Option(obj[i].Name, obj[i]._id);
			$("#cboUser2").append(o);

		}
	}
	if (selectElemRef.length > 1) {
		document.getElementById("cboUser2").selectedIndex = 0;
	}
};

function drawTb(dataTb) {
	if (datatable == null) {
		datatable = $('#tbm').DataTable({
			scrollY: "100%",
			scrollX: "100%",
			scrollCollapse: true,
			select: true,
			info: false,
			processing: true,
			language: {				
				emptyTable: "Chưa có hoạt động nào cho nội dung này",
				loadingRecords: "&nbsp;",
				processing: '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'
			},
			searching: false,
			dom: 'trp',
			//responsive: true,
			data: dataTb,
			buttons: [],
			columns: [
				//{defaultContent: "" },
				{
					data: null,
					render: function (data, type, row, meta) {
						return data['ContentId'] + '.' + data['TitleIdx'];
					}
				},
				{
					data: 'UserName',
					defaultContent: ""
				}, {
					data: 'Point',
					defaultContent: ""
				}, {
					data: 'Note',
					defaultContent: ""
				}, {
					data: 'TeamUserName',
					defaultContent: ""
				}, {
					data: 'TeamPoint',
					defaultContent: ""
				}, {
					data: 'TeamNote',
					defaultContent: ""
				}, {
					data: 'UpdateDate',
					render: function (data, type, row, meta) {
						return formatDateDetail(data);
					}
				}
			],			
		});
	} else {
		datatable.clear().rows.add(dataTb).draw();
	}

};

function LoadLog() {
	var cboContent = document.getElementById("cboContent");
	/*if (cboContent.selectedIndex == 0) {
		AlertAutoCloseError("Bạn hãy chọn nội dung muốn xem");
		return;
	}*/
	var ct = cboContent.options[cboContent.selectedIndex].value;
	if (cboContent.selectedIndex > 0) {
		var Titleidx = ct % 100;
		var ContentId = (ct - Titleidx) / 100;
	}
	var cboProvincal = document.getElementById("cboProvincial");
	var Provincal = cboProvincal.options[cboProvincal.selectedIndex].value;
	
	var cboTeam = document.getElementById("cboTeam");
	var Team = cboTeam.options[cboTeam.selectedIndex].value;
	
	var cboUser = document.getElementById("cboUser");
	var User = cboUser.options[cboUser.selectedIndex].value;
	
	var cboUser2 = document.getElementById("cboUser2");
	var User2 = cboUser2.options[cboUser2.selectedIndex].value;

	if (cboProvincal.selectedIndex == 0 && cboTeam.selectedIndex == 0) {
		AlertAutoCloseError("Bạn hãy chọn đơn vị hoặc ban chấm muốn xem");
		return;
	}

	
	var Type = "Cấp tỉnh";
	if (Provincal == 'Khối các cơ quan Trung ương' || Provincal == 'Khối Doanh nghiệp Trung ương' ||
		Provincal == 'Ban Thanh niên Quân đội' || Provincal == 'Đoàn Bộ Công an') {
		Type = Provincal;
		Provincal = 'Hà Nội';
	}

	var param = "";
	if (cboContent.selectedIndex > 0)
		param += "?contentid=" + ContentId + "&titleidx=" + Titleidx;
	else param += "?contentid=0";
	if (cboProvincal.selectedIndex > 0) {
		param += "&type=" + Type + "&provincial=" + Provincal;
	}
	if (cboTeam.selectedIndex > 0) {
		param += "&teamid=" + Team;
	}
	if (cboUser.selectedIndex > 0) {
		param += "&psid=" + User;
	}
	if (cboUser2.selectedIndex) {
		param += "&tid=" + User2;
	}
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: "/cms/getBTCPointLog" + param,		
		success: function (data) {			
			drawTb(data);
		},
		error: function (err) {
			if (err.responseText == 'Unauthorized') {
				alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
				window.location.href = '/cms/unitlogin';
			}
		}
	});	

	
}

function onCboProvincialChange(event) {
	var value = event.value;
	pro = value;	
	if (pro == 'Khối các cơ quan Trung ương' || pro == 'Khối Doanh nghiệp Trung ương' ||
		pro == 'Ban Thanh niên Quân đội' || pro == 'Đoàn Bộ Công an') {
		type = pro;
		SetCboContent();
		SetCboUser(1, pro);
	} else {
		type = "Cấp tỉnh"
		SetCboContent();
		SetCboUser(0, pro);
	}
};

function onCboTeamChange(event) {
	var value = event.value;
	team = Number(value);	
	SetCboContent();
		SetCboUser2(team);
};

function onCboContentChange(event) {
	
};

function onCboUserChange(event) {
	
};

function onCboUser2Change(event) {
	
};

$.ajax({
	dataType: "json",
	type: 'GET',
	url: "/cms/getMemberBTCList",
	success: function (data) {
		mem = data;
		

	},
	error: function (err) {
		alert('Mời bạn sử dụng chatbot để lấy đường dẫn đăng nhập ');
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

function round(value) {
	if (value > 0 && value < 0.5)
		return 0.5;
	else
		return value;
}

function setCookie(cname, cvalue, exhours) {
	var d = new Date();
	d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


