var listGeocode;
var objGeoCode;
var list;
var mem;
var content;
var datatable;
var mctable;
var pro;
var mctable1;
var mctable2;
var TeamId;

function GetTeamId() {
	$.ajax({
		type: 'POST',
		data: '',
		contentType: 'application/json',
		url: "/cms/getTeamId",
		data: TeamId,
		success: function (data) {
			TeamId = data;
			setMenu(TeamId, 'unitboard');
		}
	});
}
GetTeamId();
function getGeoCode() {
	$.ajax({
		type: 'POST',
		data: '',
		contentType: 'application/json',
		url: "/cms/getGeoCode",
		data: '',
		success: function (data) {	
			SetCboContent(data.Type);
			if (data.Type == 'Cấp tỉnh') {
				SetCboUser(0, data.Provincial);
				pro = data.Provincial;
			} else {
				SetCboContent("Cấp tỉnh");
				SetCboUser(1, data.Type);
				pro = data.Type;
			}
		}
	});
}

/*function LoadCboProvincials() {
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

LoadCboProvincials();*/

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
			getGeoCode();
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

function SetCboContent(t) {
	var selectElemRef = document.getElementById("cboContent");
	obj = content;
	var html = '';
	while (selectElemRef.length > 0) {
		selectElemRef.remove(0);
	}
	//console.log(content);
	//console.log(t);
	var o = new Option("Nội dung", "");
	$("#cboContent").append(o);
	for (var i = 0, len = obj.length; i < len; i++) {
		if (obj[i].Type == t) {
			var tit = obj[i].BTCTitle;
			for (var j = 0, l = tit.length; j < l; j++) {
				var v = obj[i].Code + '.' + tit[j].TitleIdx;
				var vl = obj[i].ContentId * 100 + tit[j].TitleIdx;
				var o = new Option(v, vl);
				$("#cboContent").append(o);
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
					data: 'UserName',
					class: 'val-name',
					render: function (data, type, row, meta) {
						return data;
					}
				}, {
					data: 'Point',
					render: function (data, type, row, meta) {
						return data;
					}
				}, {
					data: 'Note',
					defaultContent: ""
				}, {
					data: 'TeamUserName',
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
	var ct = cboContent.options[cboContent.selectedIndex].value;
	var Titleidx = ct % 100;
	var ContentId = (ct - Titleidx) / 100;	
	
	var cboUser = document.getElementById("cboUser");
	var User = cboUser.options[cboUser.selectedIndex].value;

	if (cboContent.selectedIndex == 0) {
		AlertAutoCloseError("Bạn hãy chọn nội dung muốn xem");
		return;
	}
	var Type = "Cấp tỉnh";
	if (pro == 'Khối các cơ quan Trung ương' || pro == 'Khối Doanh nghiệp Trung ương' ||
		pro == 'Ban Thanh niên Quân đội' || pro == 'Đoàn Bộ Công an') {
		Type = pro;
		pro = 'Hà Nội';
	}

	var param = "";
	param += "?contentid=" + ContentId + "&titleidx=" + Titleidx + "&type=" + Type + "&provincial=" + pro;
	if (User != '' && User != null && User != undefined) {
		param += "&psid=" + User;
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
	var param1 = "";
	param1 += "?contentid=" + ContentId + "&titleidx=" + Titleidx;
	if (User != '' && User != null && User != undefined) {
		param1 += "&psid=" + User;
	}
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: "/cms/getBTCFile" + param1,		
		success: function (data) {			
			drawTbmc(data);
		},
		error: function (err) {
			if (err.responseText == 'Unauthorized') {
				alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
				window.location.href = '/cms/unitlogin';
			}
		}
	});
	
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: "/cms/getBTCFileLog" + param1,		
		success: function (data) {			
			drawTbmcx(data);
		},
		error: function (err) {
			if (err.responseText == 'Unauthorized') {
				alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
				window.location.href = '/cms/unitlogin';
			}
		}
	});

	
}

function drawTbmc(dataTb) {    
	if (mctable1 == null) {
		mctable1 = $('#tbmc').DataTable({
//			scrollY: "100%",
			scrollX: "100%",
			scrollCollapse: true,
			select: true,
			info: false,
			processing: true,
			language: {				
				emptyTable: "Chưa có minh chứng nào cho nội dung này",
				loadingRecords: "&nbsp;",
				processing: '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'
			},
			searching: false,
			dom: 'trp',
			//responsive: true,
			data: dataTb,
			buttons: [],
			columns: [
				{
					data: 'UserName',
					class: 'val-name',
					render: function (data, type, row, meta) {
						return data;
					}
				},{
					data: null,
					render: function (data, type, row, meta) {
						if (data['FileType'] && data['FileType']=='P') return 'Ảnh'
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
							if (note && note.length > 95) note = note.substring(0,95) + '...';
							return '<a href="' + data['FileLink'] + '"  target="_blank" title="'+ data['LinkNote'] + '">' + note + '</a>';
							 }
					}
				}, {
					data: 'InputDate',
					render: function (data, type, row, meta) {
						return formatDateDetail(data);
					}
				}
			]
		});	
		
	} else {
		mctable1.clear().rows.add(dataTb).draw();
	}	
}

function drawTbmcx(dataTb) {    
	if (mctable2 == null) {
		mctable2 = $('#tbmcx').DataTable({
//			scrollY: "100%",
			scrollX: "100%",
			scrollCollapse: true,
			select: true,
			info: false,
			processing: true,
			language: {				
				emptyTable: "Chưa có minh chứng đã xóa nào cho nội dung này",
				loadingRecords: "&nbsp;",
				processing: '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'
			},
			searching: false,
			dom: 'trp',
			//responsive: true,
			data: dataTb,
			buttons: [],
			columns: [
				{
					data: 'UserName',
					class: 'val-name',
					render: function (data, type, row, meta) {
						return data;
					}
				},{
					data: null,
					render: function (data, type, row, meta) {
						if (data['FileType'] && data['FileType']=='P') return 'Ảnh'
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
							if (note && note.length > 95) note = note.substring(0,95) + '...';
							return '<a href="' + data['FileLink'] + '"  target="_blank" title="'+ data['LinkNote'] + '">' + note + '</a>';
							 }
					}
				}, {
					data: 'InputDate',
					render: function (data, type, row, meta) {
						return formatDateDetail(data);
					}
				},{
					data: null,
					class: 'val-name',
					render: function (data, type, row, meta) {
						if (data['DeletedUserName']) return data['DeletedUserName']; else return data['UserName'];
					}
				}, {
					data: 'DeletedDate',
					render: function (data, type, row, meta) {
						return formatDateDetail(data);
					}
				}
			]
		});	
		
	} else {
		mctable2.clear().rows.add(dataTb).draw();
	}	
}

/*function onCboProvincialChange(event) {
	var value = event.value;
	pro = value;	
	if (pro == 'Khối các cơ quan Trung ương' || pro == 'Khối Doanh nghiệp Trung ương' ||
		pro == 'Ban Thanh niên Quân đội' || pro == 'Đoàn Bộ Công an') {
		SetCboContent(pro);
		SetCboUser(1, pro);
	} else {
		SetCboContent("Cấp tỉnh");
		SetCboUser(0, pro);
	}
};*/

function onCboContentChange(event) {
	
};

function onCboUserChange(event) {
	
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


