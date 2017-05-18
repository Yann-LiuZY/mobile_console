/**
 * 此文件为页面主要功能入口
 */
require("../css/main.css");

// 往页面中插入主要页面
var mainHtml = '<div class="console-container" id="console-container"><header class="console-header"><ul class="ul-default"><li><a id="console-header-log" href="javascript:;">Console</a></li><li><a id="console-header-network" href="javascript:;">Network</a></li><li><a id="console-header-element" href="javascript:;">Element</a></li></ul></header><div class="console-log js-console-body" id="console-log"><div class="log-opers"><ul class="ul-default"><li><a class="log-btn-clear" id="log-opres-clear" href="javascript:;"></a></li><li><a class="log-btn-word log-btn-hover" id="log-opres-all" href="javascript:;">All</a></li><li><a class="log-btn-word" id="log-opres-error" href="javascript:;">Error</a></li><li><a class="log-btn-word" id="log-opres-warning" href="javascript:;">Warning</a></li><li><a class="log-btn-word" id="log-opres-log" href="javascript:;">Log</a></li></ul></div><ul class="log-list" id="log-list"></ul></div><div class="console-network js-console-body" id="console-network"><div class="network"><div class="network-header">Resource Timing</div><ul class="network-list" id="resource-list"></ul></div><div class="network"><div class="network-header">XMLHttpRequest</div><ul class="network-list" id="xhr-list"></ul></div></div><div class="console-network-detail js-console-body" id="console-network-detail"><div class="detail-header"><div class="detail-header-back" id="detail-header-back"><</div><div class="detail-header-url" id="detail-header-url"></div></div><div class="detail-panel"><div class="detail-panel-header">Request</div><div class="detail-panel-content" id="request-content"></div></div><div class="detail-panel"><div class="detail-panel-header">Response</div><div class="detail-panel-content" id="response-content"></div></div></div><div class="console-element js-console-body" id="console-element"><ul class="ztree" id="ztree"></ul></div></div><div class="index-btn" id="index-btn"><a class="log-btn" id="log-btn" href="javascript:;"></a><a class="network-btn" id="network-btn" href="javascript:;"></a><a class="element-btn" id="element-btn" href="javascript:;"></a></div>';
$("body").append(mainHtml);

// 引入命令行模块
var log = require("./log.js");
// 引入错误捕获模块
require("./error.js");
// 引入element模块
var element = require("./element.js");
// 引入network模块
var network = require("./network.js");

$(function(){
	// 主页面小图标点击事件
	$("#index-btn").click(function(){
		$(this).toggleClass("index-btn-hover");
	});
	$("#log-btn").click(function(){
		$(".console-container").show();
		$("#console-header-log").click();
	});
	$("#network-btn").click(function(){
		$(".console-container").show();
		$("#console-header-network").click();
	});
	$("#element-btn").click(function(){
		$(".console-container").show();
		$("#console-header-element").click();
	});

	// log选项点击事件
	$("#console-header-log").click(function(){
		$(".console-header a").removeClass('console-header-hover');
		$(this).addClass("console-header-hover");
		$(".js-console-body").hide();
		$("#console-log").show();
	});
	// log下各个按钮的点击事件
	$("#log-opres-clear").click(log.clearLog);
	$("#log-opres-all").click(log.showAll);
	$("#log-opres-warning").click(log.showWarning);
	$("#log-opres-log").click(log.showLog);
	$("#log-opres-error").click(log.showError);
	$(".log-btn-word").click(function(){
		$(".log-btn-word").removeClass("log-btn-hover");
		$(this).addClass("log-btn-hover");
	});	

	// network选项点击事件
	$("#console-header-network").click(function(){
		$(".console-header a").removeClass('console-header-hover');
		$(this).addClass("console-header-hover");
		$(".js-console-body").hide();
		$("#console-network").show();
		network.XHRListRender();
		network.resourceTimeListRender();
	});

	// element选项点击事件
	$("#console-header-element").click(function(){
		$(".console-header a").removeClass('console-header-hover');
		$(this).addClass("console-header-hover");
		$(".js-console-body").hide();
		$("#console-element").show();
		element.treeFresh();
	});
});
