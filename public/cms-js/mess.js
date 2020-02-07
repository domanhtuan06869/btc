// JavaScript Document
var txtMess = document.getElementById("txtMess");
var cboProvincial = document.getElementById("cboProvincial");
//var cboPosition = document.getElementById("cboPosition");
//var cboDistricts = document.getElementById("cboDistricts");
//var cboWards = document.getElementById("cboWards");
//var cboStatus = document.getElementById("cboStatus");

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
            var o = new Option("Chọn Tỉnh/TP", "0");
            //o.selected=true;
            $("#cboProvincial").append(o);
            for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
                var o = new Option(objProvincials[i - 1].Name, objProvincials[i - 1]._id);
                $("#cboProvincial").append(o);
            }
            if (cboProvincial.length > 1) {
                document.getElementById("cboProvincial").selectedIndex = 0;
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                 alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
                window.location.href = 'unitlogin.html';
            }
        }
    });
};
function onCboProvincialsChange(event) {
    if (event.selectedIndex > 0) {
        var value = event.value;
       /// LoadCboDistricts(value);
    }
};

LoadCboProvincials();
function sendMess(){
	
		var name = "";
		var provincial = "";
		///var districts = "";
		///var wards = "";
		///var blockstatus = "";
		//var position = "";
		//var layer = "";
		//var level = "";
		if ($('#txtName').val() != "" && $('#txtName').val() != undefined)
                name = $("#txtName").val();
		if (cboProvincial.selectedIndex != 0)
			provincial = cboProvincial[cboProvincial.selectedIndex].text;
		//if (cboDistricts.selectedIndex != 0)
		///	districts = cboDistricts[cboDistricts.selectedIndex].text;
		//if (cboWards.selectedIndex != 0)
		///	wards = cboWards[cboWards.selectedIndex].text;
		//if (cboStatus.selectedIndex != 0)
		///	blockstatus = cboStatus.value;
		//level = cboLevel.value;
		///if (cboPosition.selectedIndex != 0)
		///	position = cboPosition[cboPosition.selectedIndex].text;
	
		if (txtMess.value == undefined || txtMess.value == "") {
			alert("Bạn phải nhập nội dung tin nhắn");			
			txtMess.focus();
			return;
		};
		var mess = {};
		mess.Msg=txtMess.value;
        mess.phone = $("#txtPhone").val();
        mess.name = name;
	    mess.provincial=provincial;
	   // mess.districts=districts;
		///mess.wards=wards;
		///mess.blockstatus=blockstatus;
		//mess.position=position;
		//  mess.layer = "";
		//alert(objAi.Id);
		$.ajax({
		type: 'POST',
		data: JSON.stringify(mess),
		contentType: 'application/json',
		url: '/cms/sendMessageToMember',				
		success: function(data) 
				{
					
					//console.log('success');
					alert(data.message);
					console.log(data);
					
				},
		  	error: function(err) {
			 if(err.responseText=-'Unauthorized')
			   alert("Bạn đã hết phiên làm việc. Sử dụng chatbot để lấy đường đẫn đăng nhập và OTP mới");
			  window.location.href = 'unitlogin.html';
			}
	   });
	
	
	
}