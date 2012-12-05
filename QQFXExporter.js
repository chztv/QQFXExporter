// vim: set et sw=2 ts=2 sts=2 ff=unix fenc=utf8:
// Author: Paul Chan<paul@paulreina.com>
//         http://www.chztv.com
// Created on 12-12-4 AM1:19


var jsonrpc_path = "http://192.168.1.8:6800/jsonrpc";

//普通下载按钮
		$('.btn_normal2').live("click",function(){		    
			//获取选择的列表
		    var checked_list=$(".file_list_checkbox:checked");
			if(checked_list.size()>0){
			      var filename=checked_list.eq(0).parent().next().find("a").attr("title");
			      var filehash=checked_list.eq(0).parent().next().find("a").attr("filehash");
			      //开始统计
				  stat("NORMAL_DOWN\t" + filehash);
				  start_normal_down_paul(filename,filehash);
			}else{
			    XF.widget.msgbox.show("您还没选择文件呢!",2,2000);
			}
		} );

function start_normal_down_paul(filename,filehash){
	$.ajax({
			type: "POST",
			url:API_URL.handler_url+"/getComUrl",
			cache: false,
			data:{"filename":filename,"filehash":filehash},
			timeout:3000,
			dataType: "json",
			success:function(data){
			  if(data&&data.ret==0){
				 $.cookie('FTN5K',data.data.com_cookie,{path:"/",domain:"qq.com"});
				 //window.location=data.data.com_url;
				 //显示Aria2c下载命令
				 //alert( "aria2c -c -s10 -x10 --out "+filename+" --header 'Cookie: FTN5K="+data.data.com_cookie+";' '"+data.data.com_url+"'\n");				
					if (jsonrpc_path) {
					  alert("添加中...到YAAW界面查看是否添加成功");
					  $.getScript("https://raw.github.com/gist/3116833/aria2jsonrpc.js", function() {
					  	jsonrpc_path = $("#QQ_aria2_jsonrpc").val();
					  	alert(jsonrpc_path);
						var aria2 = new ARIA2(jsonrpc_path);
						aria2.addUri(data.data.com_url, {out: filename, header: 'Cookie: FTN5K='+data.data.com_cookie});
					  });

					} else {
					  alert("尚未设置Aria2 JSONRPC地址");
					};
			  }
			 },
			error:function(){
				  XF.widget.msgbox.show("获取普通下载链失败,请重试!",2,2000);
			 }
	 });
}

var TLE = TLE || {};



(function(TLE) {

  function init() {
  	//alert("这是旋风下载测试!1234——init");
  	$(".com_down").html('<dl><dt><a id="btn_normal" class="btn_normal" hidefocus="true" href="javascript:;"></a></dt><dd><a id="btn_normal2" class="btn_normal2" hidefocus="true" href="javascript:;">使用Aria2下载</a></dd></dl>');
  	$("label.check_all_text").after('<span style="height:35px;line-height:35px;padding-left:10px;">jsonrpc-Path:<input type="text" id="QQ_aria2_jsonrpc" style="width: 200px" value="'+jsonrpc_path+'"/><a href="#" class="btn_nol" id="setting_button_sure" onclick="set_notice_submit2(0);return false;" title="保存设置">保存</a></span>');
    //css
    $("head").append('<style>'
          +'.TLE_get_btnbox {position:relative; float:left; z-index:11}'
          +'.TLE_getbtn {position: absolute; top:24px; left:0; border:1px #6FB2F3 solid; background:#fff; width:115px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:2px 2px 3px #ddd;-webkit-box-shadow:2px 2px 3px #ddd;}'
          +'.TLE_getbtn a {display:block; height:22px; line-height:22px; padding-left:18px}'
          +'.TLE_getbtn a:hover {background:#E4EFF9 url(http://cloud.vip.xunlei.com/190/img/ic_dianbo.png) no-repeat 8px 8px; *background-position:8px 6px ; text-decoration:none}'
          +'.TLE_get_btnbox .TLE_getlink {width:98px; height:22px; float:left; line-height:21px;*line-height:24px;display:block;color:#000000; margin-right:5px; overflow:hidden;background:url(http://cloud.vip.xunlei.com/190/img/bg_btnall.png?197) no-repeat  0 -390px}'
          +'.TLE_get_btnbox .TLE_link_gettxt {float:left; display: inline ; width:53px; text-align:center; padding-left:24px; color:#000}'
          +'.TLE_get_btnbox .TLE_link_gettxt:hover {text-decoration:none}'
          +'.rwbox .rwset .TLE_link_getic {float:left; display:block; width:20px;height:22px;}'
          +'.TLE_hiden {display: none; }'
          +'.TLE_down_btn {background: url(http://cloud.vip.xunlei.com/190/img/lx/bg_rpx.png) no-repeat 0 999em; display: block; float: left; margin: 0 1px; overflow: hidden; color: white; height: 28px; padding-left: 8px; background-position: 0 -60px; text-decoration: none; }'
          +'.TLE_down_btn span {background: url(http://cloud.vip.xunlei.com/190/img/lx/bg_rpx.png) no-repeat 0 999em; display: block; float: left; height: 28px; line-height: 27px; cursor: pointer; padding-right: 8px; background-position:100% -60px; }'
          +'.TLE_down_btn:active {background-position:0 -28px; }'
          +'.TLE_down_btn:active span {background-position:right -28px;}'
          +'.TLE_icdwlocal { padding-left: 20px; display: inline-block; background: url(http://cloud.vip.xunlei.com/190/img/lx/bg_menu.png) no-repeat 0 999em; background-position: 0 -108px; }'

          +'.rwbtn.ic_redownloca { display: none !important; }'
          +'.menu { width: 700px !important; }'
        +'</style>');
    //pop
    $("body").append('<div id="TLE_text_pop" class="pop_rwbox" style="display: none;margin: 0;"></div>');
    $("body").append('<textarea id="TLE_text_tpl" style="display: none;"></textarea>');
    $("#TLE_text_tpl").text('<div class="p_rw_pop">'
                            +'<div class="tt_box onlytitle">'
                              +'<h3>$[title]</h3>'
                            +'</div>'
                            +'<div class="psc_info">'
                              +'$[content]'
                            +'</div>'
                            +'<a href="#" class="close" title="关闭">关闭</a>'
                          +'</div>');
    //setting
    TLE.getConfig = function(key) {
      if (window.localStorage) {
        return window.localStorage.getItem(key) || "";
      } else {
        return getCookie(key);
      }
    };
    TLE.setConfig = function(key, value) {
      if (window.localStorage) {
        window.localStorage.setItem(key, value);
      } else {
        setGdCookie(key, value, 86400*365);
      }
    };
    //set default config
    if (TLE.getConfig("TLE_exporter") == "") {
      var exporters = [];
      for (var key in TLE.exporter) {
        exporters.push(key);
      };
      TLE.setConfig("TLE_exporter", exporters.join("|"));
    };
    $("#setting_main_tpl").text($("#setting_main_tpl").text().replace(/(<\/div>\s+<div class="btnin">)/,
          '<div class="doline mag01"></div>'
            +'<h3 style="background-position: 0 -180px;">Thunder Lixian Exporter 设定</h3>'
            +'<ul>'
              +'<li><b>启用以下导出器</b></li>'
              +'<li>'+(function(){
                var enabled_exporter = TLE.getConfig("TLE_exporter").split("|");
                var str = '';
                for (var name in TLE.exporter) {
                  str += '<span class="rw_col"><input type="checkbox" class="TLE_setting_ck" name="TLE_ck_'+name+'" '+(enabled_exporter.indexOf(name) == -1 ? "" : "checked")+' />'+name+'</span>';
                }
                return str;
              })()+'</li>'
              +'<li><b>Aria2 JSON-RPC Path</b></li>'
              //+'<li>Path: <input type="text" id="TLE_aria2_jsonrpc" style="width: 350px" value="'+TLE.getConfig("TLE_aria2_jsonrpc")+'"/></li>'
            +'</ul>'
          +'$1'));
    var _set_notice_submit = set_notice_submit2;
    set_notice_submit2 = function(f) {
      _set_notice_submit(f);
      var enabled_exporter = [];
      $(".TLE_setting_ck").each(function(n, e) {
        if (e.checked) enabled_exporter.push(e.name.replace(/^TLE_ck_/, ""));
      });
      var config_str = (enabled_exporter.length == 0) ? "_" : enabled_exporter.join("|");
      var jsonrpc_path = $("#QQ_aria2_jsonrpc").val();
      alert(jsonrpc_path);
      if (TLE.getConfig("TLE_exporter") != config_str || TLE.getConfig("TLE_aria2_jsonrpc") != jsonrpc_path) {
        TLE.setConfig("TLE_exporter", config_str);
        TLE.setConfig("TLE_aria2_jsonrpc", jsonrpc_path);
        TS2.show('设置已生效',1);
        setTimeout(function(){
          setting.hide();
          location.reload(true);
        }, 1*1000);
      }
    };

    function exporter_anchors(type) {
      var enabled_exporter = TLE.getConfig("TLE_exporter").split("|");
      var str = '';
      $.each(TLE.exporter, function(n, f) {
        if (enabled_exporter.indexOf(n) == -1) return;
        str+=('<a href="#" title="'+n+'" onmouseover="this.className=\'sel_on\'" onmouseout="this.className=\'\'" onclick="'+type+'(this, TLE.exporter[\''+n+'\'])">'+n+'</a>');
      });
      return str;
    }
    //down
    $(".rwbtn.ic_redownloca").each(function(n, e) {
      $(e).after('<div class="TLE_get_btnbox">'
                  + '<span class="TLE_getlink">'
                    + '<a href="#" class="TLE_link_gettxt TLE-down-text" style="padding-left: 20px; width: 57px;" onclick='+e.getAttribute("onclick")+'>取回本地</a>'
                    + '<a href="#" class="TLE_link_getic TLE-down-btn" onclick="return TLE.getbtn(this);"></a>'
                  + '</span>'
                  + '<div class="TLE_p_getbtn TLE_getbtn" style="display: none;">'
                    + exporter_anchors("TLE.down")
                  + '</div>'
                + '</div>');
    });

    //batch_down
    $("#li_task_down").after('<a href="#" id="TLE_batch_down" title="批量导出" class="btn_m noit"><span><em class="icdwlocal">批量导出</em></span></a>')
                      .parents(".main_link").append(
                            '<div id="TLE_batch_getbtn" class="TLE_getbtn" style="top: 30px; display:none;">'
                            + exporter_anchors("TLE.batch_down")
                          + '</div>');
    var _task_check_click = task_check_click;
    task_check_click = function() {
      _task_check_click();
      if ($("#li_task_down").hasClass("noit")) {
        $("#TLE_batch_down").addClass("noit").unbind("click");
      } else {
        $("#TLE_batch_down").removeClass("noit").unbind("click").click(function() {
          $("#TLE_batch_getbtn").css("left", $("#TLE_batch_down").position().left);
          $("#TLE_batch_getbtn").toggle();
          return false;
        });
      };
      //console.log("task_check_click called");
    };
    $('input[name=ck]').click(task_check_click);

    //bt_down
    $("#view_bt_list_nav_tpl").text($("#view_bt_list_nav_tpl").text().replace('取回本地</em></span></a>',
          '取回本地</em></span></a>'
          +'<a href="#" class="btn_m noit" title="批量导出" id="TLE_bt_down"><span><em class="icdwlocal">批量导出</em></span></a>'
          +'<div id="TLE_bt_getbtn" class="TLE_getbtn" style="top: 30px; display:none;">'
            + exporter_anchors("TLE.bt_down")
          + '</div>'));
    $("#view_bt_list_tpl").text($("#view_bt_list_tpl").text().replace('ic_redownloca" title="">取回本地</a>',
        'ic_redownloca" title="">取回本地</a>'
        +'<div class="TLE_get_btnbox">'
          + '<span class="TLE_getlink">'
            + '<a href="#" class="TLE_link_gettxt TLE-down-text" style="padding-left: 20px; width: 57px;" onclick="thunder_download($[p.i],1);return false;">取回本地</a>'
            + '<a href="#" class="TLE_link_getic TLE-down-btn" onclick="return TLE.getbtn(this);"></a>'
          + '</span>'
          + '<div class="TLE_p_getbtn TLE_getbtn" style="display: none;">'
            + exporter_anchors("TLE.bt_down_one")
          + '</div>'
        + '</div>'));
    var _bt_view_nav = bt_view_nav;
    bt_view_nav = function() {
      _bt_view_nav();
      if ($("#view_bt_list_nav_down").hasClass("noit")) {
        $("#TLE_bt_down").addClass("noit").unbind("click");
      } else {
        $("#TLE_bt_down").removeClass("noit").unbind("click").click(function() {
          $("#TLE_bt_getbtn").css("left", $("#TLE_bt_down").position().left);
          $("#TLE_bt_getbtn").toggle();
          return false;
        });
      };
      $("#TLE_bt_getbtn").hide();
      //console.log("bt_view_nav called");
    };

    //close menu binding
    $(document.body).bind("click",function(){
      $("div.TLE_p_getbtn, #TLE_batch_getbtn, #TLE_bt_getbtn").hide();
    });
    $("div.rw_list").click(function(e){
      $("div.TLE_p_getbtn, #TLE_batch_getbtn, #TLE_bt_getbtn").hide();
    });
    $("div.TLE_get_btnbox").click(function(e){e.stopPropagation();});
  };
  init();
})(TLE);

