// ==UserScript==
// @name       QQLixianExporter
// @namespace  http://fenxiang.qq.com/
// @version    0.01
// @description  export QQ lixian url to aria2/wget
// @match      http://fenxiang.qq.com/x/*
// @run-at document-end
// @copyright  2012+, Binux <root@binux.me>
// ==/UserScript==

var script = document.createElement('script');
script.id = "TLE_script";
if (location.host == "fenxiang.qq.com") {
  script.src = "https://raw.github.com/chztv/QQFXExporter/master/QQFXExporter.js";
} else {
  script.src = "http://yx.hoolo.tv/QQLixian/vod_html5.js";
}
document.body.appendChild(script);