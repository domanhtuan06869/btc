var listGeocode;
var objGeoCode;
var group = 0;
var list;
var mem;
var pro = 'X';
var dmem;
var datatable;
var mctable;
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
			setMenu(TeamId,'dashboard')
        }
    });
}
GetTeamId();
var makeChart = function (selector, type, colors, legend, arr) {
	c3.generate({
		bindto: selector,
		data: {
			x: 'x',
			//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
			columns: arr,
			//type: 'spline'
			type: type,
			labels: true
		},
		axis: {
			x: {
				type: 'category',

			},

		},


		legend: {
			show: legend,
			position: 'inset'
		},

		color: {
			pattern: colors
		}

	});
};

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
			for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
				if (group == 0 || objProvincials[i - 1].GroupId == group) {
					var o = new Option(objProvincials[i - 1].Name, objProvincials[i - 1].Name);
					$("#cboProvincial").append(o);
				}
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

LoadCboProvincials();

function SetCboProvincials() {
	var selectElemRef = document.getElementById("cboProvincial");
	var objProvincials = list;
	var html = '';
	while (selectElemRef.length > 0) {
		selectElemRef.remove(0);
	}
	var o = new Option("Chọn tỉnh", "0");
	$("#cboProvincial").append(o);
	for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
		if (group == 0 || objProvincials[i - 1].GroupId == group) {
			var o = new Option(objProvincials[i - 1].Name, objProvincials[i - 1].Name);
			$("#cboProvincial").append(o);
		}
	}
	if (cboProvincial.length > 1) {
		document.getElementById("cboProvincial").selectedIndex = 0;
	}
};

function profileStart() {
	$('#loadFile').show();
	$('#profile').hide();
}

function profileStop() {
	$('#loadFile').hide();
	$('#profile').show();
}

function drawTb(dataTb) {
	if (datatable == null) {
		datatable = $('#tbm').DataTable({
			scrollY: 400,
			scrollX: true,
			scrollCollapse: true,
			select: true,
			info: false,
			processing: true,
    		language: {
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
					data: 'Name',
					class: 'val-name',
					render: function (data, type, row, meta) {
						return '<a href="#" data-toggle="modal" data-target="#myModal" style="white-space: nowrap;">' + data + '</a>';
					}
				}, {
					data: null,
					render: function (data, type, row, meta) {
						if (data['Type'] == 'Cấp tỉnh') return data['Provincial'];
						else return data['Type'];
					}
				}, {
					data: 'Birthday',
					defaultContent: ""
				}, {
					data: 'Phone',
					defaultContent: ""
				}, {
					data: 'Email',
					defaultContent: ""
				}, {
					data: 'Files',
					render: function (data, type, row, meta) {
						if (data && data.length > 0) return data.length;
						else return 0;
					}
				},
				{
					data: 'Files',
					class: 'details-control',
					orderable: false,
					render: function (data, type, row, meta) {
						if (data && data.length > 0) return '<a href="#" data-toggle="modal" data-target="#mcModal" style="white-space: nowrap;"><img src="../img/viewmc.png" title="Xem minh chứng"></a>';
						else return '';
					},
					width: "20px"
				}
			],
			columnDefs: [{
				className: "img-product",
				"targets": [0, 3]
			}, ],
		});
	} else {
		datatable.clear().rows.add(dataTb).draw();
	}
	if (pro == 'X')
		datatable.column(1).visible(true);
	else
		datatable.column(1).visible(false);
	$('#tbm').on('click', 'td.details-control', function () {
		var tr = $(this).closest('tr');
		var d = datatable.row(tr).data();
		var files = d.Files;
		document.getElementById('mcLable').innerText = d.Name;		
		drawTbmc(files);
		
				
	});

	/*function format(d) {
		
		var f = d.Files;
		if (f && f.length > 0) {
			var str = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
			for (var i = 0; i < f.length; i++) {
				str = str + '<tr>' + '<td>Nội dung ' + f[i].ContentId + '.' + f[i].TitleIdx + '</td><td>';
				if (f[i].FileName) str = str + f[i].FileName;
				else str = str + '<a href="' + f[i].FileLink + '"  target="_blank">' + f[i].LinkNote + '</a></td>';
				str = str + '</tr>';
			}
			str = str + '</table>';
			return str;
		}
	}*/
	$('#tbm').on('click', 'td.val-name', function () {
		var tr = $(this).closest('tr');
        var d = datatable.row(tr).data();
		/*var tr = $(this).closest('tr');
		var d = datatable.row(tr).data();*/
		/*var index = this._DT_CellIndex.row;	
		var d = datatable.cell(index, 0).data();*/
		console.log(d);
			document.getElementById('avatar').src = d.ImgUrl;
			document.getElementById('username').innerText = d.Name;
			document.getElementById('phone').innerHTML = '<i class="glyphicon glyphicon-phone" ></i>  ' + d.Phone;
			document.getElementById('email').innerHTML = '<i class="glyphicon glyphicon-envelope" ></i>  ' + d.Email;
			document.getElementById('brithday').innerHTML = '<i class="glyphicon glyphicon-gift" ></i>  ' + d.Birthday;
			document.getElementById('uname').innerText = d.Name;
			document.getElementById('uphone').innerText = d.Phone;
			document.getElementById('umail').innerText = d.Email;
			document.getElementById('ubirth').innerText = d.Birthday;
			//document.getElementById('uwork').innerText = data.Work;
			//document.getElementById('uhobby').innerText = data.Hobby;
			
			if (d.Type=="Cấp tỉnh")
				document.getElementById('address').innerText = d.Provincial;
			else document.getElementById('address').innerText = d.Type;
			//document.getElementById('ugeo').innerText = str;
		
	});
}

function drawTbmc(dataTbmc) {
	if (mctable == null) {
		mctable = $('#tbmc').DataTable({
//			scrollY: 350,
//			scrollX: true,
			scrollCollapse: true,
			select: true,
			info: false,
			searching: false,
			dom: 'tp',
			//responsive: true,
			data: dataTbmc,
			buttons: [],
			columns: [
				{
					data: null,
					render: function (data, type, row, meta) {
						return data['ContentId'] + '.' + data['TitleIdx'];
					}
				},{
					data: null,
					render: function (data, type, row, meta) {
						if (data['FileName']) return 'File';
						else return 'Link';
					}
				}, {
					data: null,
					render: function (data, type, row, meta) {						
						if (data['FileName']) return data['FileName'];
						else {
							var note = data['LinkNote'];
							if (note && note.length > 101) note = note.substring(0,100) + '...';
							return '<a href="' + data['FileLink'] + '"  target="_blank">' + note + '</a>';
							 }
					}
				}
			]
		});
		$('#tbmc').on('mousemove', 'tr', function(e) {
   			var rowData = mctable.row(this).data();
			var name = rowData.TitleName;			
   			$("#tooltip").text(name).animate({ left: e.pageX-170, top: e.pageY - 100}, 1);
   			if (!$("#tooltip").is(':visible')) $("#tooltip").show();
		});
		$('#tbmc').on('mouseleave', function(e) {
  			$("#tooltip").hide();
		});
	} else {
		mctable.clear().rows.add(dataTbmc).draw();
	}	
	
}


var makePie = function (selector, data) {
	c3.generate({
		bindto: selector,
		data: {
			// iris data from R
			columns: data,
			type: 'pie',
			onclick: function (d, i) {
				console.log("onclick", d, i);
			},
			onmouseover: function (d, i) {
				console.log("onmouseover", d, i);
			},
			onmouseout: function (d, i) {
				console.log("onmouseout", d, i);
			}
		}
	});
};
var creatTable = function (id, arr) {
	tb = document.getElementById(id);
	for (var i = 0; i < arr.length; i++) {
		var row = tb.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var d = arr[i];
		var mem = d.Members || 0;
		var a = d.Name; // + ' ' + p1 + '%';		
		cell1.innerHTML = a;
		cell2.innerHTML = mem; // + '(' + p + '%)';
		cell2.setAttribute('width', '65px')
	}
};

function onCboGroupChange(event) {
	var value = event.value;
	group = Number(value);
	SetCboProvincials();
	DrawRatioChart(list);
};

function onCboProvincialChange(event) {
	var value = event.value;
	pro = value;
	dmem = [];
	for (var i = 0; i < mem.length; i++) {
		if (pro=='X' || ((mem[i].Type == 'Cấp tỉnh' && mem[i].Provincial == pro) ||
			(mem[i].Type != 'Cấp tỉnh' && mem[i].Type == pro))) {
			dmem.push(mem[i]);
		}
	}
	drawTb(dmem);
};

$.ajax({
	dataType: "json",
	type: 'GET',
	url: "/cms/getMemList",	
	success: function (data) {
		list = data;
		DrawRatioChart(list);

		//DrawRegisterChart(data.RpRegisterDate);
		/*if (data.week.length == 0)
			document.getElementById('t2').innerText = 0;
		else
			document.getElementById('t2').innerText = data.week[0].total;
		if (data.month.length == 0)
			document.getElementById('t3').innerText = 0;
		else
			document.getElementById('t3').innerText = data.month[0].total;
		document.getElementById('month').innerText = 'Tháng ' + ((new Date).getMonth()+1);*/

	},
	error: function (err) {
		alert('Mời bạn sử dụng chatbot để lấy đường dẫn đăng nhập ');
	}
});

$.ajax({
	dataType: "json",
	type: 'GET',
	url: "/cms/getMemFile",
	success: function (data) {
		mem = data;
		dmem = [];
		for (var i = 0; i < mem.length; i++) {
		if (mem[i].Type != 'Cấp Trung Ương') {
			dmem.push(mem[i]);
		}
	}
		drawTb(dmem);
	},
	error: function (err) {
		alert('Mời bạn sử dụng chatbot để lấy đường dẫn đăng nhập ');
	}
});
/*$.ajax({
	dataType: "json",
	type: 'GET',
	data: {},
	url: "/getRatioMembers",
	success: function (data) {
		var arr1 = ['Cán bộ Đoàn, Hội'];
		var arr2 = ['Hội viên, Đoàn viên'];
		var total = 0;
		for (var i = 0; i < data.length; ++i) {
			//var o = new Option(objProvincials[i-1].Name,  objProvincials[i-1]._id);
			if (data[i]._id == 'CBDHT')
				arr1.push(data[i].count);
			else if (data[i]._id == 'DHT')
				arr2.push(data[i].count);
			else
				arr1.push(data[i].count);
			total += data[i].count;
		}
		document.getElementById('t1').innerText = total;
		makePie('#d0-c1',[arr1,arr2]);
	},
});
$.ajax({
	dataType: "json",
	type: 'GET',
	data: {},
	url: "/getGeo",
	success: function (data) {
		listGeocode = data;
		if (objGeoCode)
			creatTG();
	},
});
$.ajax({
	dataType: "json",
	type: 'GET',
	data: {},
	url: "/getReports?chart=geocode",
	success: function (data) {
		objGeoCode = data;
		if (listGeocode)
			creatTG();
	},
});*/
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

function creat3Pie(t1, t2, t3) {
	var arr1 = ['Nhóm trường học', 0];
	var arr2 = ['Nhóm dân cư', 0];
	var arr3 = ['Nhóm Đoàn khối trực thuộc', 0];
	t = t1 + t2 + t3;
	arr1[1] = parseInt(100 * t1 / t);
	arr2[1] = parseInt(100 * t2 / t);
	arr3[1] = 100 - arr1[1] - arr2[1];
	makePie('#d1-c1', [arr1, arr2, arr3]);
}

function DrawRegisterChart(data) {
	if (data.length == 0)
		data = [
			[
				[],
				[],
				[]
			]
		]
	var arr = Object.values(data[0]);
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var i = 0;
	while (i < 7) {
		d.setDate(d.getDate() + 1);
		if (arr[0].length > i) {
			var sdate = arr[0][i].split('/');
			var day = new Date(sdate[1] + '/' + sdate[0] + '/' + sdate[2]);
			if (day.toLocaleDateString() != d.toLocaleDateString()) {
				arr[0].splice(i, 0, d.toLocaleDateString());
				arr[1].splice(i, 0, 0);
				arr[2].splice(i, 0, 0);
			}
		} else {
			arr[0].splice(i, 0, d.toLocaleDateString());
			arr[1].splice(i, 0, 0);
			arr[2].splice(i, 0, 0);
		}

		i++;
	}
	arr[0].splice(0, 0, 'x');
	arr[1].splice(0, 0, 'Cán Bộ');
	arr[2].splice(0, 0, 'Đoàn viên, Hội viên');
	document.getElementById('t4').innerText = (arr[1][7] + arr[2][7]);
	makeChart('#d1-c5', 'bar', ['#3498db', '#2980b9'], true, arr);

}

function DrawRatioChart(data) {
	var arr1 = ['Điểm danh'];
	var arr2 = ['Chưa điểm danh'];
	var ar1 = [];
	var ar2 = [];
	var t1 = 0;
	var t2 = 0;
	for (var i = 0; i < data.length; ++i) {
		if (group == '0' || data[i].GroupId == group) {
			//var o = new Option(objProvincials[i-1].Name,  objProvincials[i-1]._id);
			var mem = data[i].Members || 0;


			if (mem != 0) {
				arr1.push(1);
				ar1.push(data[i]);
				t1++;
			} else {
				ar2.push(data[i]);
				arr2.push(1);
				t2++;
			}

			//total += data[i].count;
		}
	}
	document.getElementById('t1').innerText = t1;
	document.getElementById('t2').innerText = t2;
	document.getElementById('tb1').innerHTML = '';
	document.getElementById('tb2').innerHTML = '';
	//document.getElementById('t1').innerText = total;
	makePie('#d0-c1', [arr1, arr2]);
	creatTable('tb1', ar1);
	creatTable('tb2', ar2);
}

function creatTG(list) {

	var arr1 = [];
	var arr2 = [];
	var arr3 = [];

	for (a = 0; a < list.length; a++) {
		var el = list[a];
		let type = el.Type;
		let group = el.Group;
		let d;
		for (let index = 0; index < objGeoCode.length; index++) {
			const element = objGeoCode[index];
			if (element._id == el._id) {
				d = element;
				objGeoCode.splice(index, 1);
				index--;
			}
		}
		if (d == null) {
			if (type == 'Đoàn trường' || group == 'Trường') {
				arr1.push([type + ' ' + el.Name, 0, 0]);
			} else if (group == 'Ngành' || group == 'DTT') {
				arr2.push([type + ' ' + el.Name, 0, 0]);
			} else {
				arr3.push([type + ' ' + el.Name, 0, 0]);
			}
		} else {
			let v = d.DHT ? d.DHT : 0;
			let count = d.count ? d.count : 0;
			let cb = count - v;
			total += count;
			if (count > max) max = count;
			name = el.Name;
			if (type == 'Đoàn trường' || group == 'Trường') {
				arr1.push([type + ' ' + name, cb, v]);
				t1 += cb + v;
			} else if (group == 'Ngành' || group == 'DTT') {
				arr2.push([type + ' ' + name, cb, v]);
				t2 += cb + v;
			} else {
				arr3.push([type + ' ' + name, cb, v]);
				t3 += cb + v;
			}
		}
	}
	let k = {
		cb: 0,
		v: 0
	};
	objGeoCode.forEach(element => {
		k.cb += element.count - element.DHT;
		k.v += element.DHT;
	});
	if ((k.cb + k.v) > max) max = (k.cb + k.v);
	if (listGeocode.length > 1) {
		arr3[arr3.length - 1][1] += k.cb;
		arr3[arr3.length - 1][2] += k.v;
	}
	creatTable('tb1', arr1, max);
	creatTable('tb3', arr2, max);
	creatTable('tb2', arr3, max);
	//creat3Pie(t1, t3, t2);
	$('.tooltip-test').tooltip();
	$('[data-toggle="popover"]').popover();
}