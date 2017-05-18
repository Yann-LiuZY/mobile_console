require("../css/network.css");

// 存储所有已发送的XMLHttpRequest对象
var ajaxArr = [];

// 重写XMLHttpRequest的open方法，获取method和url，并将其存储在XMLHttpRequest对象自身上
var __open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url){
	__open.apply(this, arguments);
	this.requestMethod = method;
	this.requestUrl = url;
}
// 重写send方法，获取发送数据data，并将其存储在XMLHttpRequest对象自身上
var __send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(data){
	__send.apply(this, arguments);
	this.requestData = data;
	// 将该请求添加到存储数组中
	ajaxArr.push(this);
	var _this = this;
	var _onreadystatechange = _this.onreadystatechange;
	var date1 = new Date();
	// 重写onreadystatechange事件，计算获取ajax请求时间，并将其存储在XMLHttpRequest对象自身上
	_this.onreadystatechange = function(){
		_onreadystatechange.apply(this, arguments);
		if(this.readyState == 4){
			var date2 = new Date();
			this.responseTime = date2 - date1;
		}
	}
}

/**
 * 生成network界面下XMLHttpRequest列表并插入#xhr-list下
 * 无返回值
 */
function XHRListRender(){
	var html = "";
	ajaxArr.forEach(function(item, index){
		html += '<li class="network-line '+(item.status>=400?"network-fail":"")+'" data-index="'+index+'"><p class="xhr-type">'+item.requestUrl+'</p><p class="xhr-status">'+item.status+'</p><p class="xhr-method">'+item.requestMethod+'</p><p class="xhr-time">'+item.responseTime+'ms</p><p class="network-url">'+window.location.href+'/'+item.requestUrl+'</p></li>'
	});
	$("#xhr-list").html("").append(html);
}
/**
 * 生成选中的XMLHttpRequest请求的network-detail页面并插入页面中
 * data为对象，是渲染network-detail页面所使用的XMLHttpRequest对象
 * 无返回值
 */
function XHRDetailRender(data) {
	var $base = $("#console-network-detail");
	$base.find("#detail-header-url").html("["+data.requestMethod+"]"+window.location.href+'/'+data.requestUrl);
	$base.find("#request-content").html('<dl class="detail-info-one"><dt>URL:</dt><dd>'+window.location.href+'/'+data.requestUrl+'</dd></dl><dl class="detail-info-one"><dt>Method:</dt><dd>'+data.requestMethod+'</dd></dl><dl class="detail-info-two"><dt>Params:</dt><dd>'+JSON.stringify(data.requestData)+'</dd></dl>');
	$base.find("#response-content").html('<dl class="detail-info-one"><dt>StatusCode:</dt><dd>'+data.status+'</dd></dl><dl class="detail-info-two"><dt>Body:</dt><dd>'+data.responseText+'</dd></dl>');
}
/**
 * 通过performance.getEntries()方法获取静态资源加载信息，以此生成resource timing列表插入页面
 * 无返回值
 */
function resourceTimeListRender(){
	var html = "";
	var reg = /\/([^\/]+\.(css|js|png|jpg|html))$/;
	performance.getEntries().forEach(function(item){
		if(reg.exec(item.name))
			html += '<li class="network-line"><p class="resource-name">'+reg.exec(item.name)[1]+'</p><p class="resource-time">'+Math.round(item.responseEnd - item.requestStart)+'ms</p><p class="network-url">'+item.name+'</p></li>';
	});
	$("#resource-list").html("").append(html);
}

$(function(){
	// 点击XMLHttpRequest列表跳转对应请求详情页面
	$("#xhr-list").on("click", "li", function(event){
		var data = ajaxArr[$(this).data("index")];
		$("#console-network").hide();
		$("#console-network-detail").show();
		XHRDetailRender(data);
	});
	// 点击network-detail页面的返回按钮跳回network主页面
	$("#detail-header-back").click(function(){
		$("#console-header-network").click();
	});
});

exports.XHRListRender = XHRListRender;
exports.resourceTimeListRender = resourceTimeListRender;
