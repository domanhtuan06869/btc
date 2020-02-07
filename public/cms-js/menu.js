//<li class=""><a href="/cms/dashboard" class="sf-dashboard">Biểu đồ</a></li>
//<li class=""><a href="/cms/unitboard" class="sf-dashboard">Biểu đồ</a></li>
//<li id="sumaryfile"><a href="/cms/sumaryfile" class="sf-box-out">Nộp báo cáo tự đánh giá</a></li>
//<li id="unitupload"><a href="/cms/unitupload" class="sf-calendar-clock">Tiến độ</a></li><li id="unitlog"><a href="/cms/unitlog" class="sf-file-note">Lịch sử</a></li>
var dvMenu = document.getElementById("btcmenu");
dvMenu.innerHTML = '<img src="/img/loader.gif" alt="Trulli" width="80" height="80">';

var umenu = '<li class=""><a href="/cms/unitboard" class="sf-dashboard">Thống kê</a></li><li id="unit"><a href="/cms/unit" class="sf-box-out">Nộp minh chứng</a></li><li id="authorize"><a href="/cms/authorize" class="sf-envelope">Duyệt minh chứng từ cơ sở</a></li><li id="smart"><a href="/cms/smart" class="sf-box-out">Nộp đăng cai, sáng tạo</a></li><li class="cm-submenu pre-open"><a class="sf-window-layout">Kết quả <span class="caret"></span></a><ul><li id="reportunit"><a href="/cms/reportunit">Kết quả nộp minh chứng</a></li><li id="reportsmartunit"><a href="/cms/reportsmartunit">Kết quả đăng cai, sáng tạo</a></li></ul></li><li id="profile"><a href="/cms/profile" class="sf-profile">Thông tin cá nhân</a></li><li><a href="#" class="sf-lock" onclick="Logout()">Đăng xuất</a></li>';

var tmenuf =  '<li id="team"><a href="/cms/team" class="sf-notepad">Chấm điểm</a></li><li id="teamsmart"><a href="/cms/teamsmart" class="sf-keyring">Chấm đăng cai, sáng tạo</a></li><li id="filesmart"><a href="/cms/filesmart" class="sf-file-note">Hồ sơ đăng cai, sáng tạo</a></li><li class="cm-submenu pre-open"> <a class="sf-window-layout">Báo cáo <span class="caret"></span></a><ul><li id="report"><a href="/cms/report">Báo cáo theo tỉnh</a></li><li id="reportgr"><a href="/cms/reportgr">Báo cáo cụm</a></li><li id="reportsmart"><a href="/cms/reportsmart">Báo cáo đăng cai, sáng tạo theo tỉnh</a></li><li id="reportsmartteam"><a href="/cms/reportsmartteam">Báo cáo đăng cai, sáng tạo theo ban</a></li><li id="summary"><a href="/cms/summary">Báo cáo tổng hợp</a></li><li id="geopoint"><a href="/cms/geopoint">Báo cáo theo tiêu chí</a></li><li id="content"><a href="/cms/content">Báo cáo theo nội dung</a></li></ul></li><li id="geoupload"><a href="/cms/geoupload" class="sf-calendar-clock">Tiến độ</a></li><li id="mess"><a href="/cms/mess" class="sf-box-out">Gửi tin</a></li><li id="profile2"><a href="/cms/profile2" class="sf-profile">Thông tin cá nhân</a></li><li><a href="#" class="sf-lock" onclick="Logout()">Đăng xuất</a></li>';

var tmenu10 =  '<li class=""><a href="/cms/dashboard" class="sf-dashboard">Dashboard</a></li><li id="team"><a href="/cms/team" class="sf-notepad">Chấm điểm</a></li><li id="teamsmart"><a href="/cms/teamsmart" class="sf-keyring">Chấm đăng cai, sáng tạo</a></li><li id="filesmart"><a href="/cms/filesmart" class="sf-file-note">Hồ sơ đăng cai, sáng tạo</a></li><li class="cm-submenu pre-open"> <a class="sf-window-layout">Báo cáo <span class="caret"></span></a><ul></li><li id="report"><a href="/cms/report">Báo cáo theo tỉnh</a></li><li id="reportgr"><a href="/cms/reportgr">Báo cáo cụm</a></li><li id="reportsmart"><a href="/cms/reportsmart">Báo cáo đăng cai, sáng tạo theo tỉnh</a><li id="summary"><a href="/cms/summary">Báo cáo tổng hợp</a></li></ul></li><li id="geoupload"><a href="/cms/geoupload" class="sf-calendar-clock">Tiến độ</a></li><li id="mess"><a href="/cms/mess" class="sf-box-out">Gửi tin</a></li><li id="profile2"><a href="/cms/profile2" class="sf-profile">Thông tin cá nhân</a></li><li><a href="#" class="sf-lock" onclick="Logout()">Đăng xuất</a></li>';

var tmenu13 =  '<li class=""><a href="/cms/dashboard" class="sf-dashboard">Dashboard</a></li><li id="filesmart"><a href="/cms/filesmart" class="sf-file-note">Hồ sơ đăng cai, sáng tạo</a></li><li class="cm-submenu pre-open"> <a class="sf-window-layout">Báo cáo <span class="caret"></span></a><ul></li><li id="report"><a href="/cms/report">Báo cáo theo tỉnh</a></li><li id="reportgr"><a href="/cms/reportgr">Báo cáo cụm</a></li><li id="reportsmart"><a href="/cms/reportsmart">Báo cáo đăng cai, sáng tạo theo tỉnh</a></li><li id="reportsmartteam"><a href="/cms/reportsmartteam">Báo cáo đăng cai, sáng tạo theo ban</a><li id="summary"><a href="/cms/summary">Báo cáo tổng hợp</a></li><li id="geopoint"><a href="/cms/geopoint">Báo cáo theo tiêu chí</a></li><li id="content"><a href="/cms/content">Báo cáo theo nội dung</a></li></ul></li><li id="geoupload"><a href="/cms/geoupload" class="sf-calendar-clock">Tiến độ</a></li><li id="profile2"><a href="/cms/profile2" class="sf-profile">Thông tin cá nhân</a></li><li><a href="#" class="sf-lock" onclick="Logout()">Đăng xuất</a></li>';

var tmenu =  '<li id="team"><a href="/cms/team" class="sf-notepad">Chấm điểm</a></li><li id="teamsmart"><a href="/cms/teamsmart" class="sf-keyring">Chấm đăng cai, sáng tạo</a></li><li id="filesmart"><a href="/cms/filesmart" class="sf-file-note">Hồ sơ đăng cai, sáng tạo</a></li><li class="cm-submenu pre-open"> <a class="sf-window-layout">Báo cáo <span class="caret"></span></a><ul><li id="report"><a href="/cms/report">Báo cáo theo tỉnh</a></li><li id="reportgr"><a href="/cms/reportgr">Báo cáo cụm</a></li><li id="reportsmart"><a href="/cms/reportsmart">Báo cáo đăng cai, sáng tạo theo tỉnh</a></li></ul></li><li id="geoupload"><a href="/cms/geoupload" class="sf-calendar-clock">Tiến độ</a></li><li id="mess"><a href="/cms/mess" class="sf-box-out">Gửi tin</a></li><li id="profile2"><a href="/cms/profile2" class="sf-profile">Thông tin cá nhân</a></li><li><a href="#" class="sf-lock" onclick="Logout()">Đăng xuất</a></li>';

function setMenu(team,func) {
	var menu = tmenu;
	if (team == 13) menu = tmenu13;
	else if (team ==10) menu = tmenu10;
	else if (team ==0) menu = umenu;
	dvMenu.innerHTML = menu;
	$(".cm-submenu").click(function (k, j, g) {
        var f = $(this);
        var i = CM.getState();
        if ((!i.mobile) && (!i.open)) {
          c.setPopover(f);
          return false
        }
        var h = f.hasClass("open");
        $(".cm-submenu").removeClass("open");
        $(".cm-menu-items li").removeAttr("style");
        if (!h) {
          f.addClass("open");
          f.nextAll().css("transform", "translateY(" + f.children("ul").height() + "px)")
        }
        
      });
      var d = CM.getState();
      if ((!d.mobile) && (!d.open)) {
        $(".cm-submenu.pre-open").removeClass("pre-open")
      } else {
        var b = $(".cm-submenu.pre-open");
        b.nextAll().css("transform", "translateY(" + b.children("ul").height() + "px)");
        b.addClass("open").removeClass("pre-open")
      }
	$('#' + func).addClass("active");
}
