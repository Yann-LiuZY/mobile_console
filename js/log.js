require("../css/log.css");

var infoArr = [];
var $logList = $("#log-list");

window.console._log = window.console.log;
window.console.log = function(info){
	if(typeof info == "undefined")
		return;
	var temp = {};
	temp.info = info;
	temp.type = "Log";
	infoArr.push(temp);
	var html = '<li class="log-list-line">> ['+temp.type+'] <span>'+temp.info+'</span></li>';
	$logList.append(html);
}

window.console._error = window.console.error;
window.console.error = function(info){
	if(typeof info == "undefined")
		return;
	var temp = {};
	temp.info = info;
	temp.type = "Error";
	infoArr.push(temp);
	var html = '<li class="log-list-line log-error">> ['+temp.type+'] <span>'+temp.info+'</span></li>';
	$logList.append(html);
}

window.console.warning = function(info){
	if(typeof info == "undefined")
		return;
	var temp = {};
	temp.info = info;
	temp.type = "Warn";
	infoArr.push(temp);
	var html = '<li class="log-list-line log-warn">> ['+temp.type+'] <span>'+temp.info+'</span></li>';
	$logList.append(html);
}
/**
 * 消息列表渲染
 * data为传入的消息数据
 * 返回值为需要插入页面的HTML字符串
 */
function logHmlRender(data) {
	var html = "";
	data.forEach(function(item){
		html += '<li class="log-list-line '+(item.type=="Error"?"log-error":(item.type=="Warn"?"log-warn":""))+'">> ['+item.type+'] <span>'+item.info+'</span></li>';
	});
	return html;
}

function clearLog(){
	infoArr.splice(0, infoArr.length);
	$logList.html("");
}
function showAll(){
	var html = logHmlRender(infoArr);
	$logList.html(html);
}
function showError(){
	var arr = infoArr.filter(function(item){
		if(item.type == "Error")
			return true;
	});
	var html = logHmlRender(arr);
	$logList.html(html);
}
function showWarning(){
	var arr = infoArr.filter(function(item){
		if(item.type == "Warn")
			return true;
	});
	var html = logHmlRender(arr);
	$logList.html(html);
}
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
