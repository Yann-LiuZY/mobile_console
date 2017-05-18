require("../css/log.css");

var infoArr = [];		// 存储命令行信息的数组
var $logList = $("#log-list");		// 缓存命令行信息容器的jQuery对象

//缓存并重写console.log事件
window.console._log = window.console.log;
window.console.log = function(info){
	if(typeof info == "undefined")
		return;
	else if(typeof info == "object")
		info = (info instanceof Array ? "Array " : "Object ") + JSON.stringify(info);
	var temp = {};
	// 将消息存入数组
	temp.info = info;
	temp.type = "Log";
	infoArr.push(temp);
	// 将消息插入页面
	var html = '<li class="log-list-line">> ['+temp.type+'] <span>'+temp.info+'</span></li>';
	$logList.append(html);
}
//缓存并重写console.error事件
window.console._error = window.console.error;
window.console.error = function(info){
	if(typeof info == "undefined")
		return;
	else if(typeof info == "object")
		info = (info instanceof Array ? "Array " : "Object ") + JSON.stringify(info);
	// 将消息存入数组
	var temp = {};
	temp.info = info;
	temp.type = "Error";
	infoArr.push(temp);
	// 将消息插入页面
	var html = '<li class="log-list-line log-error">> ['+temp.type+'] <span>'+temp.info+'</span></li>';
	$logList.append(html);
}

window.console.warning = function(info){
	if(typeof info == "undefined")
		return;
	else if(typeof info == "object")
		info = (info instanceof Array ? "Array " : "Object ") + JSON.stringify(info);
	// 将消息存入数组
	var temp = {};
	temp.info = info;
	temp.type = "Warn";
	infoArr.push(temp);
	// 将消息插入页面
	var html = '<li class="log-list-line log-warn">> ['+temp.type+'] <span>'+temp.info+'</span></li>';
	$logList.append(html);
}
/**
 * 将infoArr或其他具有类似结构的数组中存储的命令行数据渲染生成HTML
 * data为对象数组，为命令行消息数据
 * 返回值为字符串，为需要插入页面的HTML
 */
function logHmlRender(data) {
	var html = "";
	data.forEach(function(item){
		html += '<li class="log-list-line '+(item.type=="Error"?"log-error":(item.type=="Warn"?"log-warn":""))+'">> ['+item.type+'] <span>'+item.info+'</span></li>';
	});
	return html;
}
/**
 * 清除InfoArr中的所有数据，并清除html中对应数据
 * 无返回值
 */
function clearLog(){
	infoArr.splice(0, infoArr.length);
	$logList.html("");
}
/**
 * 将所有已存储的命令行数据生成并插入到页面中
 * 无返回值
 */
function showAll(){
	var html = logHmlRender(infoArr);
	$logList.html(html);
}
/**
 * 将console.error的数据生成并插入到页面中
 * 无返回值
 */
function showError(){
	var arr = infoArr.filter(function(item){
		if(item.type == "Error")
			return true;
	});
	var html = logHmlRender(arr);
	$logList.html(html);
}
/**
 * 将console.warning的数据生成并插入到页面中
 * 无返回值
 */
function showWarning(){
	var arr = infoArr.filter(function(item){
		if(item.type == "Warn")
			return true;
	});
	var html = logHmlRender(arr);
	$logList.html(html);
}
/**
 * 将console.log的数据生成并插入到页面中
 * 无返回值
 */
function showLog(){
	var arr = infoArr.filter(function(item){
		if(item.type == "Log")
			return true;
	});
	var html = logHmlRender(arr);
	$logList.html(html);
}

exports.clearLog = clearLog;
exports.showAll = showAll;
exports.showError = showError;
exports.showWarning = showWarning;
exports.showLog = showLog;
