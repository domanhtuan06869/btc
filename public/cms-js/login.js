var cms_key = null;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
function GetKeyCMS() {
    $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: '/cms/getkeyCMS',
        success: function (data) {
            cms_key = data;
        }
    });
}
//GetKeyCMS();
function Login() {
    $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: '/cms/getkeyCMS',
        success: function (data) {
            cms_key = data;
            //var psid = getUrlParameter('psid');
            //if (psid == '') return alert('Mời bạn sử dụng chatbot để lấy đường dẫn đăng nhập và mã otp mới');
            //var provincial = getUrlParameter('provincial');
            var txtUsername = document.getElementById("txtUsername");
			var txtPassword = document.getElementById("txtPassword");
            if (txtUsername.value === null || txtUsername.value === undefined || txtUsername.value === "") { alert("Vui lòng nhập số điện thoại"); return; }
			if (txtPassword.value === null || txtPassword.value === undefined || txtPassword.value === "") { alert("Vui lòng nhập mật khẩu"); return; }
            var objUser = {};
            objUser.UserName = txtUsername.value;
    		objUser.Password = txtPassword.value;
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(objUser), cms_key).toString();
            var dataEncrypt = { data: ciphertext };
            $.ajax({
                type: 'POST',
                data: JSON.stringify(dataEncrypt),
                contentType: 'application/json',
                url: '/cms/loginCMS',
                success: function (data) {
                    if (data.success == "true") {
                        var objdata = data.result;
                        if (objdata.Type == 'Cấp Trung Ương') { 
							if (objdata.Team == 13 )
								window.location.href = '/cms/report?psid=' + objdata._id; 
							else window.location.href = '/cms/team?psid=' + objdata._id; 
						}
                       // else if (objdata.IsAdmin == true) { window.location.href = '/cms/teamleader?psid=' + psid; }
                        else {
							window.location.href = '/cms/unit?psid=' + objdata._id;
                            //Ban bí thư
                          //  if (objdata.TeamId == 13) { window.location.href = '/cms/teamleader?psid=' + psid; }
                           // else window.location.href = '/cms/team?psid=' + psid;
                        }
                    }
                    else {
                        //window.location.reload();
                        alert(data.message);
                    }
                }
            });
        }
    });
}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        Login();
    }
}

$(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
});
$('#idGet').click(function(){
    window.open('http://m.me/197599867569788?ref=GET_ID');
})
//Login();
// JavaScript Document