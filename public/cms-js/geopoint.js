var btcTable;
var btcTablecq;
var btcTabledn;
var btcTableqd;
var btcTableca;
var exceltable = 'btcTable';
var dataBTC;
var TeamId;
var datat = [];
var dataca = [];
var datacq = [];
var datadn = [];
var dataqd = [];

function GetTeamId() {
	$.ajax({
		type: 'POST',
		data: '',
		contentType: 'application/json',
		url: "/cms/getTeamId",
		data: TeamId,
		success: function (data) {
			TeamId = data;
			setMenu(TeamId, 'geopoint')
		}
	});
}
GetTeamId();


$.ajax({
	dataType: "json",
	url: "/cms/getGeoReport",
	beforeSend: loadStart,
	complete: loadStop,
	data: dataBTC,
	success: function (data) {
		dataBTC = data;
		datat = [];
		dataca = [];
		datacq = [];
		datadn = [];
		dataqd = [];
		for (var j = 0; j < dataBTC.length; j++) {
			if (dataBTC[j].Type == 'Cấp tỉnh') datat.push(dataBTC[j]);
			if (dataBTC[j].Type == 'Khối các cơ quan Trung ương') datacq.push(dataBTC[j]);
			if (dataBTC[j].Type == 'Khối Doanh nghiệp Trung ương') datadn.push(dataBTC[j]);
			if (dataBTC[j].Type == 'Ban Thanh niên Quân đội') dataqd.push(dataBTC[j]);
			if (dataBTC[j].Type == 'Đoàn Bộ Công an') dataca.push(dataBTC[j]);
		}		
		/*if (datacq && datacq.length > 0) DrawTablecq(datacq);			
		if (datadn && datadn.length > 0) DrawTabledn(datadn);			
		if (dataqd && dataqd.length > 0) DrawTableqd(dataqd);
		if (dataca && dataca.length > 0) DrawTableca(dataca);	
		*/
		if (datat && datat.length > 0) DrawTable(datat);
		exceltable = 'btcTable';
		
	},
	error: function (err) {
		if (err.responseText == 'Unauthorized') {
			alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
			window.location.href = '/cms/unitlogin';
		}
	}
});

function DrawTable(data) {
	if (btcTable == null) {
		btcTable = $('#btcTable').DataTable({
			scrollY: 600,
			scrollX: true,
			scrollCollapse: true,
			searching: false,
			select: true,
			dom: 'Bfrtip',
			fixedColumns: {
				leftColumns: 2
			},
			buttons: [
				/*{
				    extend: 'excelHtml5',
				},
				{
				    extend: 'pdfHtml5',
				}*/
			],
			data: data,

			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}],

			columns: [{
				defaultContent: ""
			}, {
				data: 'Provincial',
				defaultContent: ""
			}, {
				data: 'TotalTeamPoint',
				defaultContent: ""
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_21',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_21',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_22',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_22',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_23',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_23',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_24',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_24',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_25',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_25',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_26',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_26',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_27',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_27',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_28',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_28',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_29',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_29',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, ]
		});
		btcTable.on('draw.dt', function () {
			var PageInfo = $('#btcTable').DataTable().page.info();
			btcTable.column(0, {
				page: 'current'
			}).nodes().each(function (cell, i) {
				cell.innerHTML = i + 1 + PageInfo.start;
			});
		});
	} else {
		btcTable.clear().rows.add(data).draw();
	}
}

function DrawTablecq(data) {
	if (btcTablecq == null) {
		btcTablecq = $('#btcTablecq').DataTable({
			scrollY: 600,
			scrollX: true,
			scrollCollapse: true,
			searching: false,
			select: true,
			dom: 'Bfrtip',
			fixedColumns: {
				leftColumns: 2
			},
			buttons: [
				/*{
				    extend: 'excelHtml5',
				},
				{
				    extend: 'pdfHtml5',
				}*/
			],
			data: data,

			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}],

			columns: [{
					defaultContent: "1"
				}, {
					data: 'Type',
					defaultContent: ""
				}, {
					data: 'TotalTeamPoint',
					defaultContent: ""
				}, {
					data: 'N1_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N1_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N1_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N1_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N1_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N1_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N1_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N1_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N1_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N1_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N2_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N2_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N2_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N2_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N2_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N2_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N2_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N2_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N2_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N2_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N2_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N2_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N3_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N3_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N3_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N3_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N3_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N3_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N3_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N3_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N3_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N3_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N4_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N4_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N4_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N4_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N4_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N4_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N5_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N5_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N5_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N5_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N5_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N5_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N5_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N5_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N5_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N5_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_10',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_10',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_11',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_11',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_12',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_12',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_13',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_13',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_14',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_14',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_15',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_15',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_16',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_16',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_17',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_17',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_18',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_18',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_19',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_19',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_20',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_20',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_21',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_21',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N6_22',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N6_22',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_10',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_10',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N7_11',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N7_11',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N8_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N8_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N8_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N8_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N8_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N8_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N8_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N8_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N8_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N8_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N9_10',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N9_10',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N10_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N10_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N10_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N10_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N10_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N10_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N10_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N10_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N10_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N10_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_6',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_7',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_8',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N11_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N11_9',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N12_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N12_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N12_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N12_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N13_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N13_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N13_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N13_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N13_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N13_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N14_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N14_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N14_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N14_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N15_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N15_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N15_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N15_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N16_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N16_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N16_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N16_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N16_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N16_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				},

				{
					data: 'N16_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N16_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N17_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N17_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N17_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N17_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N17_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N17_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N17_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N17_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N17_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N17_5',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N18_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N18_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N18_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N18_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N18_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N18_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N19_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N19_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N19_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N19_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N19_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N19_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N19_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N19_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N20_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N20_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N20_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N20_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N20_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N20_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N20_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N20_4',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N21_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N21_1',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N21_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N21_2',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				}, {
					data: 'N21_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.Point;
						}
					}
				}, {
					data: 'N21_3',
					defaultContent: "",
					render: function (data, type, row, meta) {
						if (data == null) {
							return "";
						} else {
							return data.TeamPoint;
						}
					}
				},
			]
		});		
	} else {
		btcTablecq.clear().rows.add(data).draw();
	}
};

function DrawTabledn(data) {
	if (btcTabledn == null) {
		btcTabledn = $('#btcTabledn').DataTable({
			scrollY: 600,
			scrollX: true,
			scrollCollapse: true,
			searching: false,
			select: true,
			dom: 'Bfrtip',
			fixedColumns: {
				leftColumns: 2
			},
			buttons: [
				/*{
				    extend: 'excelHtml5',
				},
				{
				    extend: 'pdfHtml5',
				}*/
			],
			data: data,

			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}],

			columns: [{
				defaultContent: "1"
			}, {
				data: 'Type',
				defaultContent: ""
			}, {
				data: 'TotalTeamPoint',
				defaultContent: ""
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, ]
		});		
	} else {
		btcTabledn.clear().rows.add(data).draw();
	}
}

function DrawTableqd(data) {
	if (btcTableqd == null) {
		btcTableqd = $('#btcTableqd').DataTable({
			scrollY: 600,
			scrollX: true,
			scrollCollapse: true,
			searching: false,
			select: true,
			dom: 'Bfrtip',
			fixedColumns: {
				leftColumns: 2
			},
			buttons: [
				/*{
				    extend: 'excelHtml5',
				},
				{
				    extend: 'pdfHtml5',
				}*/
			],
			data: data,

			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}],

			columns: [{
				defaultContent: ""
			}, {
				data: 'Type',
				defaultContent: "1"
			}, {
				data: 'TotalTeamPoint',
				defaultContent: ""
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_21',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_21',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_22',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_22',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, ]
		});		
	} else {
		btcTableqd.clear().rows.add(data).draw();
	}
}

function DrawTableca(data) {
	if (btcTableca == null) {
		btcTableca = $('#btcTableca').DataTable({
			scrollY: 600,
			scrollX: true,
			scrollCollapse: true,
			searching: false,
			select: true,
			dom: 'Bfrtip',
			fixedColumns: {
				leftColumns: 2
			},
			buttons: [
				/*{
				    extend: 'excelHtml5',
				},
				{
				    extend: 'pdfHtml5',
				}*/
			],
			data: data,

			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}],

			columns: [{
				defaultContent: "1"
			}, {
				data: 'Type',
				defaultContent: ""
			}, {
				data: 'TotalTeamPoint',
				defaultContent: ""
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N1_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N2_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N3_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N4_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N5_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N5_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_13',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_14',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_15',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_16',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_17',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_18',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_19',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_20',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_21',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_21',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N6_22',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N6_22',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N7_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N8_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N8_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N9_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N9_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N10_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_6',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_7',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_8',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_9',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_10',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_11',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N11_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N11_12',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N12_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N13_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N14_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N15_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N16_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N17_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N17_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N18_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N19_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_4',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N20_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N20_5',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_1',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_2',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.Point;
					}
				}
			}, {
				data: 'N21_3',
				defaultContent: "",
				render: function (data, type, row, meta) {
					if (data == null) {
						return "";
					} else {
						return data.TeamPoint;
					}
				}
			}, ]
		});		
	} else {
		btcTableca.clear().rows.add(data).draw();
	}
}




function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

function doExcel1() {
	//var blob,
	//  template = XLSX.write(prepareTable(), {bookType:'xlsx', bookSST:true, type: 'binary'});
	//prepareTable();
	var wb = XLSX.utils.table_to_book(document.getElementById(exceltable), {
		sheet: "Report"
	});
	var wbout = XLSX.write(wb, {
		bookType: 'xlsx',
		bookSST: true,
		type: 'binary'
	});
	blob = new Blob([s2ab(wbout)], {
		type: "application/octet-stream"
			//"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"//"application/vnd.ms-excel;charset=utf-8"
	});

	saveAs(blob, "Baocao.xlsx");
}

function onCboTypeChange(event) {
	var value = event.value;
	if (event.value == 'Cấp tỉnh') {
		exceltable = 'btcTable';
		$('#tinh').show();
		$('#cq').hide();
		$('#dn').hide();
		$('#qd').hide();
		$('#ca').hide();
		if (datat && datat.length > 0) DrawTable(datat);
	}
	if (event.value == 'Khối các cơ quan Trung ương') {
		$('#tinh').hide();
		$('#cq').show();
		$('#dn').hide();
		$('#qd').hide();
		$('#ca').hide();
		exceltable = 'btcTablecq';
		if (datacq && datacq.length > 0) DrawTablecq(datacq);
	}
	if (event.value == 'Khối Doanh nghiệp Trung ương') {
		$('#tinh').hide();
		$('#cq').hide();
		$('#dn').show();
		$('#qd').hide();
		$('#ca').hide();
		exceltable = 'btcTabledn';
		if (datadn && datadn.length > 0) DrawTabledn(datadn);
	}
	if (event.value == 'Ban Thanh niên Quân đội') {
		$('#tinh').hide();
		$('#cq').hide();
		$('#dn').hide();
		$('#qd').show();
		$('#ca').hide();
		exceltable = 'btcTableqd';
		if (dataqd && dataqd.length > 0) DrawTableqd(dataqd);
	}
	if (event.value == 'Đoàn Bộ Công an') {
		$('#tinh').hide();
		$('#cq').hide();
		$('#dn').hide();
		$('#qd').hide();
		$('#ca').show();
		exceltable = 'btcTableca';
		if (dataca && dataca.length > 0) DrawTableca(dataca);
	}
};

function loadStart() {
	$('#loading').show();
}

function loadStop() {
	$('#loading').hide();
}
