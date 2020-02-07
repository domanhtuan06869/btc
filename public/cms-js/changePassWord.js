function getParam(paramName) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(paramName);
}

let userId = getParam('psid');
let otp=getParam('otp')
$(() => {
    if(userId){
        $(`#userId`).val(userId)
    }
    if (otp){
        $.ajax({
            
        })
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
    // Tiếp tục
    $(`#Continue-sendMess-btn`).on('click', (event) => {
        event.preventDefault();
        if(!$(`#userId`).val() || $(`#userId`).val() == '') {
            alert("Bạn chưa nhập ID!");
        } else if(!$(`#newPass`).val() || $(`#newPass`).val() == '') {
            alert("Bạn chưa nhập mật khẩu!");
        } else if($(`#newPass`).val() != $(`#retypeNewPass`).val()) {
            alert('Mật khẩu xác nhận chưa khớp với mật khẩu mới!')
        } else {
            $.ajax({
                url: `/changePass/${$(`#userId`).val()}`,
                type:'post',
                data:{
                    password: $(`#newPass`).val()
                },
                success:function(ret){
                    if(ret.success){
                        $('#noti_text').html('Vui lòng kiểm tra tin nhắn từ Nosa (Messenger) và hoàn thành xác nhận thay đổi mật khẩu')
                    }else{
                        alert('Rất tiếc có lỗi xảy ra, vui lòng thực hiện lại')
                    }
                }
            })
            $(`#typeForm`).css('display', 'none');
            $(`#otpForm`).css('display', '');

        }    
    });
    // Quay lại
    $(`#cancelUpdatepw-btn`).on('click', (event) => {
        event.preventDefault();
        $(`#typeForm`).css('display', '');
        $(`#otpForm`).css('display', 'none');
    });
    // Hoàn thành cập nhật
    $(`#completeUpdatepw-btn`).on('click', (event) => {
        event.preventDefault();
        window.open('http://m.me/197599867569788');
    });
});