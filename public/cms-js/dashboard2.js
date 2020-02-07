var listGeocode;
var objGeoCode;
var group = 0;
var list;
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
			setMenu(TeamId, 'dashboard')
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
		var checked = d.Checked || 0;
		var p = 100 * checked / d.Require;
		var p1 = Math.round(p*100)/100;
		var a = d.Provincial;// + ' ' + p1 + '%';
		if (d.Type!='Cấp tỉnh') a = d.Type;
		if (d.Checked) {
			a += '<div class="progress">';
			a += '<div class="progress-bar progress-bar-info tooltip-test" style="width:' + p;
			a += '%;" data-toggle="tooltip" data-placement="top" title="Đã chấm ' + d.Checked + ' nội dung ~ '+ p1 +'%"></div >';			
			a += '</div>';
		} else {
			a += '<div class="progress">';
			a += '<div class="progress-bar progress-bar-info" style="width:0%;"></div>';
			a += '</div>';
		}	
		var p1 = Math.round(p*100)/100;
		cell1.innerHTML = a;
		cell2.innerHTML = '<br>' + checked + '/' + d.Require;// + '(' + p + '%)';
		cell2.setAttribute('width', '65px')
	}
};

function onCboGroupChange(event) {
	var value = event.value;
	group = Number(value);
	DrawRatioChart(list);
};

$.ajax({
	dataType: "json",
	type: 'GET',
	url: "/cms/getMarkListAll",
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
function creat3Pie(t1,t2,t3){
	var arr1 = ['Nhóm trường học', 0];
	var arr2 = ['Nhóm dân cư', 0];
	var arr3 = ['Nhóm Đoàn khối trực thuộc', 0];
	t = t1 + t2 +t3;
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
	var arr1 = ['Chấm xong'];
	var arr2 = ['Đang chấm'];
	var arr3 = ['Chưa chấm'];
	var ar1 = [];
	var ar2 = [];
	var ar3 = [];
	var t1 = 0;
	var t2 = 0;
	var t3 = 0;
	for (var i = 0; i < data.length; ++i) {
		if (group=='0'  || data[i].GroupId == group) {
		//var o = new Option(objProvincials[i-1].Name,  objProvincials[i-1]._id);
		var checked = data[i].Checked || 0;
		
		var remain = data[i].Require - checked;
		//if (data[i].Require == checked)
			
		//else 
		if (remain != 0) {
						
			if (checked==0) {
				ar3.push(data[i]);
				arr3.push(1);
				t3++;
			} else {
				ar2.push(data[i]);
				arr2.push(1);
				t2++;
			}
		} else {
			ar1.push(data[i]);
			arr1.push(1);
			t1++;
		}
		
		//total += data[i].count;
	}}
	document.getElementById('t1').innerText = t1;
	document.getElementById('t2').innerText = t2;
	document.getElementById('t3').innerText = t3;
	document.getElementById('tb1').innerHTML  = '';
	document.getElementById('tb2').innerHTML  = '';
	document.getElementById('tb3').innerHTML  = '';
	//document.getElementById('t1').innerText = total;
	makePie('#d0-c1', [arr1, arr2, arr3]);
	creatTable('tb1', ar1);
	creatTable('tb2', ar2);
	creatTable('tb3', ar3);
}
function creatTG(list) {
	
	var arr1 = [];
	var arr2 = [];
	var arr3 = [];
	
	for (a = 0; a < list.length; a++) {
		var el=list[a];
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
			let v = d.DHT?d.DHT:0;
			let count=d.count?d.count:0;
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
	if (listGeocode.length>1){
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
