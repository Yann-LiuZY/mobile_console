// JS错误监控
window.onerror = function(message, url, line){
	var reg = /\/([^\/]+\.(css|js|png|jpg))$/;
	var fileName = reg.exec(url);
	console.error("Javascript error: " + message + ": " + (fileName ? fileName[1] : "") + ":line" + line);
}

var _send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(){
	_send.apply(this, arguments);
	var _this = this;

	// 在onreadystatechange事件中监控，若status为40X或50X时报错
	var _onreadystatechange = _this.onreadystatechange;
	_this.onreadystatechange = function(){
		_onreadystatechange.apply(this, arguments);
		if(this.status >= 400 && this.readyState == 4)
			console.error("Ajax error: " + this.status + "  " + this.responseURL);
	}
	// 在onerror中监控
	var _onerror = _this.onerror;
	_this.onerror = function(){
		_onerror.apply(this, arguments);
		console.error("Ajax error: " + this.status + "  " + this.responseURL);
	}
}

// 文件加载错误检测，检测img、css、js
$(function(){
	// 重新加载图片，使用onerror检验图片成功加载
	$("img").each(function(index, item){
		item.onerror = function(event){
			console.error("File loading error:" + event.target.src);
		};
		item.src = item.src;
	});

	// 重新加载css文件，使用onerror检验css成功加载
	$("link").each(function(index, item){
		if(item.rel != "stylesheet")
			return;
		var cssNode = document.createElement("link");
		cssNode.rel="stylesheet";
		cssNode.type = "text/css";
		cssNode.href = item.href;
		item.remove();
		$("head").append(cssNode);
		cssNode.onerror = function(event){
			console.error("File loading error:" + event.target.href);
		};
	});

	// 获取js文件，由于其特殊性不进行重载，与performance.getEntries所获文件比较，进行检验
	$("script").each(function(index, item){
		if(!item.src)
			return;
		var url = item.src;
		if(!performance.getEntriesByName(url).length){
			console.error("File loading error:" + url);
		}
	});
});

