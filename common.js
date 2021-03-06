/*!
 * commone.js v1.0.0
 * http://www.qingqingjianji.com/
 * email：953602489@qq.com
 *
 * Copyright 2018 zhanghong
 * Released under the MIT license
 *
 * Date: 2018-08-23
 */

 (function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.commone = global.Z = factory());
}(this, (function () { 'use strict';

	var objectPrototype = Object.prototype,
	    arrayPrototype = Array.prototype,
	    toString = objectPrototype.toString,
	    hasOwnProperty = objectPrototype.hasOwnProperty,
	    slice = arrayPrototype.slice;

	var Z = {};
	Z.version = '1.0.0';

	/**
	 *浏览器检测
	 */

	 var ua = window.navigator.userAgent.toLowerCase();

	 //是否ie浏览器
	 Z.isIE =  /msie|trident/.test(ua);

	 //是否android
	 Z.isAndroid = /android/.test(ua);

	 //是否iso
	 Z.isIOS = /iphone|ipad|ipod|ios/.test(ua);

	/**
	 *常用的检查函数
	 */

	 //是否字符串
	 //利用substring方法排除字符串对象实例
	 Z.isString = function(str){
	 	return typeof str === 'string' || (str.substring ? true : false);
	 }

	 //将值转换为字符串
	 Z.toString = function(str){
	 	var backStr = '';
	 	if(str === undefined || str === null){
	 	}else if(typeof str == 'object'){
	 		backStr = JSON.stringify(str)
	 	}else{
	 		backStr = String(str)
	 	}
	 	return backStr;
	 }

	 //是否数值型
	 Z.isNumber = function(num){
	 	return typeof num === 'number' || toString.call(num) === 'object Number]';
	 }

	 //将一个值转为数字
	 //如果为NAN,返回1,因为NAN === NAN为假
	 Z.toNumber = function(num){
	 	var val = parseFloat(num);
	 	return isNaN(val) ? val : 1;
	 }

	 //是否数组
	 Z.isArray = Array.isArray || function(data){
	 	return toString.call(data) === '[object Array]';
	 }

	 //转为数组,包含undefined,null,arguments,array,object
	 Z.toArray = function(obj){
	 	if(obj == null) return [];
	 	if(obj && obj.callee) return slice.call(obj,0);
	 	if(Z.isArray(obj)) return obj;
	 	return Z.map(function(val){
	 		return val
	 	});
	 }

	 //是否对象,同时排除null
	 var isObject = Z.isObject = function(obj){
	 	return typeof obj === 'object' && !!obj;
	 }

	 //检查对象是否包含某个属性
	 var hasOwn = Z.hasOwnProperty = function(obj,key){
	 	return Z.isObject(obj) && hasOwn.call(obj,key);
	 }

	 //获取对象的所有属性名
	 Z.getAllKeys = function(obj){
	 	var keys = [];
	 	if(isObject(obj)){
	 		for(var key in obj){
	 			if(!hasOwn(obj,key)) continue;
	 			keys.push(key);
	 		}
	 	}
	 	return keys;
	 }

	 //检查变量值是否为空
	 Z.isEmpty = function(obj){
	 	if(null == obj) return true;
	 	if(Z.isObject(obj)){
	 		for(var key in obj){
	 			return false;
	 		}
	 		return true;
	 	}
	 	if(Z.isString(obj) || Z.isArray(obj)){
	 		return obj.length === 0;
	 	}
	 }

	/**
	 *常用的数据操作函数
	 */

	 function isLikeArray(obj){
	 	var length = obj == null ? void 0 : obj['length'];
	 	return typeof length === 'number' && length >= 0;
	 }

	 //each方法，用于遍历每一项数据
	 //obj-传入要遍历的对象,fn-传入进行处理的函数,context-上下文环境
	 var each = Z.each = function(obj,fn,context){
	 	var i = 0,
	 	length = obj.length,
	 	isArray = isLikeArray(obj);
	 	if(isArray){
	 		for(;i<length;i++){
	 			fn.call(context, obj[i], i ,obj);
	 		}
	 	}else{
	 		for(var key in obj){
	 			if(!hasOwn(obj,key)) continue;
	 			fn.call(context, obj[key], key, obj);
	 		}
	 	}
	 }

	 //map方法,用于遍历每一项数据进行转换后返回新数据，不改变原数据
	 Z.map = function(obj,fn,context){
	 	if(obj && obj.map) return obj.map(fn,context);
	 	var temp = [];
	 	each(obj, function(val,index,obj){
	 		temp.push(fn.call(context, val, index, obj));
	 	});
	 	return temp;
	 }

	 //filter方法，过滤返回符合条件的值
	 Z.filter = function(obj,fn,context){
	 	if(obj && obj.filter) return obj.filter(fn,context);
	 	var temp = [];
	 	each(obj, function(val,index,obj){
	 		if(fn.call(context,val,index,obj)) temp[temp.length] = val;
	 	});
	 }

	 //合并对象,实现Object.assign
	 Z.extend = function(obj){
	 	var i = 1,
	 	    len = arguments.length;
      if (obj == null || len < 2) return obj;
      for (; i < len; i++) {
        var src = arguments[i],
            keys = Z.getAllKeys(src),
	 	    j = 0,
            l = keys.length;
        for (; j < l; j++) {
          var key = keys[j];
          if(hasOwn(obj,key)){
          	obj[key] = src[key];
          }else if(obj[key] == void 0){
          	obj[key] = src[key];
          }
        }
      }
      return obj;
	 }

	 //克隆
	 Z.clone = function(obj){
	 	if(obj == null) return;
	 	return Z.isArray(obj) ? obj.slice(0) : Z.extend({},obj);
	 }

	/**
	 *URL相关操作
	 *
	 */

	 //获取URL中某个参数的值
	 Z.getUrlParam = function(param){
	 	var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
	 	var value = reg.exec(location.search);
	 	return value ? value[1] : '';
	 }

	 //修改URL中的某个参数的值，返回修改后的URL
	 Z.uptUrlParam = function(url,param,val){
	 	if(arguments.length !== 3) return;
	 	if(url == null || param == null || val == null) return;
	 	var pattern = param + '=([^&]*)';
	 	var replace = param + '=' + val;
	 	if (url.match(pattern)) {
	 		var temp = '/(' + param + '=)([^&]*)/gi';
	 		temp = url.replace(eval(temp), replace);
	 		return temp;
	 	} else {
	 		if (url.match('[\?]')) {
	 			return url + '&' + replace;
	 		} else {
	 			return url + '?' + replace;
	 		}
	 	}
	 	return url + '\n' + param + '\n' + val;
	 }

	/**
	 *本地存储相关操作
	 *
	 */


	 Z.setCookie = function(name, val , days){
	 	var day = days || 30,
	 	    date = new Date();
	 	    date.setTime(date.getTime() + day*24*3600*1000);
	 	if(isObject(val)) val = JSON.stringify(val);
	 	document.cookie = name + "=" + escape(val) + ";expires=" + date.toGMTString();
	 }

	 Z.getCookie = function(name){
	 	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	 	if (arr = document.cookie.match(reg)){
	 		var val = unescape(arr[2]);
	 		if(val && val.indexOf('{') != -1 && val.indexOf('}') != -1)
	 			return JSON.parse(val);
	 		return val;
	 	}else{
	 		return '';
	 	}
	 }

	 Z.delCookie = function(name){
	 	var val = Z.getCookie(name);
	 	if(val == '') return;
	 	var date = new Date();
	 	date.setTime(date.getTime() - 24*3600*1000);
	 	document.cookie = name + "=" + val + ";expires=" + date.toGMTString();
	 }

	 //设置浏览器本地存储
	 //如果不支持localStorage，那么就用cookie存储

	 //设置本地缓存
	 Z.setLocalStorage = function(name,val){
	 	try{
	 		if(isObject(val)) val = JSON.stringify(val);
	 		localStorage.setItem(name, val);
	 	}catch{
	 		Z.setCookie(name,val);
	 	}
	 }

	 //获取本地缓存
	 Z.getLocalStorage = function(name){
	 	try{
	 		var val = localStorage.getItem(name);
	 		if(val && val.indexOf('{') != -1 && val.indexOf('}') != -1)
	 			return JSON.parse(val);
	 		return val;
	 	}catch{
	 		var val = Z.getCookie(name);
	 		if(val && val.indexOf('{') != -1 && val.indexOf('}') != -1)
	 			return JSON.parse(val);
	 		return val;
	 	}
	 }

	 //删除本地缓存
	 Z.delLocalStorage = function(name){
	 	try{
	 		localStorage.removeItem(name);
	 	}catch{
	 		Z.delCookie(name);
	 	}
	 }
	 

	/**
	 *时间相关操作
	 *
	 */
	 function setTime(date,days,type){
	 	return type && type == '-' ?
	 	 date.setTime(date.getTime() - days * 24*3600*1000)
	 	 : date.setTime(date.getTime() + days * 24*3600*1000)
	 }

	 Z.now = function(){ return +new Date()};

	 //设置日期，默认设置为当天
	 //format-要设置哪一天，日期当月第一天，日期当月最后一天，昨天，近一周，近一月，今天
	 //separator-以什么分隔符
	 Z.setDate = function(date,format,separator){
	 	if (!date || (typeof date != 'object') || (date.constructor != Date)) return;
	 	if(format && !Z.isString(format) || separator && !Z.isString(separator)) return;
	 	    var separator = separator == null ? "-" : separator,
                date = date || new Date(),
                   y = date.getFullYear(),
                   m = date.getMonth() + 1,
                   d = date.getDate(),
                time = date.getTime();
            if (format) {
                switch (format) {
                case 'monthFirstDay':
                    d = 1;
                    break;
                case 'monthLastDay':
                    var a = y,
                    b = m;
                    if (m == 12) {
                        a += 1;
                        b = 1;
                    }
                    d = 32 - new Date(a, b - 1, 32).getDate();
                    break;
                case 'oneWeek':
                    time = setTime(date,7,'-');
                    var newDate = new Date(time);
                    y = newDate.getFullYear(),
                    m = newDate.getMonth() + 1,
                    d = newDate.getDate();
                    break;
				case 'oneMonth':
					m = m == 1 ? 12 : (m-1);
					break;
				case 'yesterday':
				    time = setTime(date,1,'-');
                    var lastDay = new Date(time);
                    y = lastDay.getFullYear(),
                    m = lastDay.getMonth() + 1,
                    d = lastDay.getDate();
				    break;
                }
            }

            return y + separator + (m < 10 ? ('0' + m) : m) + separator + (d < 10 ? ('0' + d) : d);
        }

    /**
	 *常用的校验操作
	 *
	 */

	 //校验手机号-For China
	 Z.checkMobile = function(tel){
	 	return /^1[345789]\d{9}$/.test(tel);
	 }

	 //校验是否数值
	 Z.isNumeric = function(num){
	 	return /^[+-]?[0-9]+$/.test(num);
	 }

	 //校验是否数字或者几位数字
	 Z.isNum = function(num,n){
	 	return n != null && Z.isNumber(n) ? /^\d$/.test(num) && Z.toString(num).length === n : /^\d$/.test(num);
	 }

	 //校验是否字母，数字组合
	 Z.isLetterNumber = function(str){
	 	return /^[A-Za-z0-9]+$/.test(str);
	 }

	 //是否空值
	 Z.isNotInput = function(str){
	 	if(!Z.isString(str)) return;
	 	var str = str.replace(/\s/,'');
	 	return str.length === 0;
	 }

	/**
	 *特殊字符转义
	 *
	 */
	 Z.toHtml = function(str){
	 	if(!Z.isString(str)) return;
	 	return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
	 }

	 Z.unTohtml = function(str){
	 	if(!Z.isString(str)) return;
	 	return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
	 }

	/**
	 *获取随机值
	 *
	 */

	 function rgb(){
	 	return Math.floor(Math.random() * 256);
	 }

	 //获取随机颜色
	 Z.randomColor = function(){
	 	return 'rgb(' + rgb() + ',' + rgb() +',' + rgb() +')';
	 }

	 //获取一个范围内的随机数
	 //未填写范围，默认返回随机4位数
	 Z.random = function(min,max){
	 	if(min == null && max == null) return 1000 + Math.floor(Math.random() * 8999);
	 	if(arguments.length != 2 || !Z.isNumber(min) || !Z.isNumber(max)) return;
	 	return min + Math.floor(Math.random() * (max - min + 1));
	 }

	/**
	 *web loading
	 *
	 */

	 var _load = {
     	show: function(){
     		var el,
     		isHave = document.getElementById("z-loading"),
     		isHaveAnimate = document.body.style['animation'];
     		if(!isHave){
     			var warp = document.createElement("div");
     			warp.id = "z-loading";
     			warp.style.display = "none";
     			document.body.appendChild(warp);
     			var mask = document.createElement("div");
     			mask.id = "z-loading-mask";
     			warp.appendChild(mask);
     			if(isHaveAnimate != null){
     				var box = document.createElement("div");
     				box.id = "z-loading-box";
     				try{
     					box.innerHTML = '加载中';
     				}catch(e){
     					box.appendChild(document.createTextNode('加载中'));
     				}
     				warp.appendChild(box);
     				mask.style.background = '#FFF';
     			}else{
     				var boxEl = document.createElement("div");
     				boxEl.id = "z-loading-box";
     				warp.appendChild(boxEl);
     				var boxContent = document.createElement("div");
     				boxContent.id = "z-loading-content";
     				boxContent.className = 'z-loading-animate';
     				boxEl.appendChild(boxContent);
     				mask.style.background = 'none';
     			}

     			this.css();
     		}

     		// var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
     		//     winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
     		//     left = (winWidth - 80)/2,
     		//     top = (winHeight - 80)/2;
     		//     loadingBox  = document.getElementById('z-loading-box');
     		// loadingBox.style.top = top+'px';
     		// loadingBox.style.left = left+'px';
     		//loadingBox.style.zIndex = 9999;
     		el = document.getElementById("z-loading");
     		el.style.display = 'block';
     	},
     	hide:function(){
     		var el = document.getElementById("z-loading");
     		if(el == null || el.style.display == 'none') return;
     		setTimeout(function(){
     			el.style.display = 'none';
     		},500);
     	},
     	css:function(){
     		var css = [
     		    '#z-loading{',
     		    'position: fixed;',
     		    'top: 0;',
     		    'z-index: 9999;',
     		    'height: 100%;',
     		    'width: 100%;}',
     		    '#z-loading-mask{',
     		    'position: fixed;',
     		    'left: 0;',
     		    'top: 0;',
     		    'bottom: 0;',
     		    'right: 0;',
     		    'background: #FFFFFF;',
     		    'opacity: 0.60;',
     		    'filter: alpha(opacity=60);',
     		    'width:100%;',
     		    'height:100%;}',
     		    '#z-loading-box{',
     		    'position: absolute;',
     		    'top: 50%;',
     		    'left: 50%;',
     		    'margin-top: -40px;',
     		    'margin-left: -40px;',
     		    'width: 80px;',
     		    'height: 80px;',
     		    'text-align: center;',
     		    'font-size:26px;',
     		    'color: #000;}',
     		    '#z-loading-content{',
     		    'position:absolute;',
     		    'top:0;',
     		    'right:0;',
     		    'bottom:0;',
     		    'left:0;',
     		    'margin: auto;',
     		    'width:40px;',
     		    'height:40px;',
     		    'border:8px solid #333;',
     		    'border-right-color: transparent;',
     		    'border-radius: 50%;}',
     		    '.z-loading-animate{',
     		    'animation: loading-animate 1.5s infinite linear}',
     		    '@keyframes loading-animate{',
     		    '0%{',
     		    'transform:rotate(0deg);}',
     		    '50%{',
     		    'transform:rotate(180deg);}',
     		    '100%{',
     		    'transform:rotate(359deg);}}'
     		].join("");
     		var style = document.createElement('style');
     		try{
     			style.innerHTML = css;
     		}catch(e){
     			style.appendChild(document.createTextNode(css));
     		}

     		document.head.appendChild(style);
     	}
     }

     //add loading
     var __load = {
	    _timer: null,
     	show: function(){
     		var el,
     		isHave = document.getElementById("z-loading");
     		if(!isHave){
     			var warp = document.createElement("div");
     			warp.id = "z-loading";
     			warp.style.display = "none";
     			document.body.appendChild(warp);

     			var mask = document.createElement("div");
     			mask.id = "z-loading-mask";
     			warp.appendChild(mask);
     			
     			var boxEl = document.createElement("div");
     			boxEl.id = "z-loading-box";
     			warp.appendChild(boxEl);

     			for(var i = 0; i < 3; i++){
     				var addBox = document.createElement("div");
     				addBox.className = 'z-loading-box';
     				boxEl.appendChild(addBox);
     			}
     			
     			this.css();
     		}

     		el = document.getElementById("z-loading");
     		el.style.display = 'block';
     		this.startLoad();
     	},
     	hide:function(){
     		var el = document.getElementById("z-loading");
     		if(el == null || el.style.display == 'none') return;
     		setTimeout(function(){
     			el.style.display = 'none';
     		},500);
     		this.endLoad();
     	},
     	reset:function(){
     		var boxs = document.getElementsByClassName("z-loading-box");
     		for(var i=0,j=boxs.length; i<j;i++){
     			boxs[i].style.backgroundColor = "#ccc";
     		}
     	},
     	startLoad:function(){
     		var me = this;
     		var boxs = document.getElementsByClassName("z-loading-box");
     		var n = 0,
     		  len = boxs.length,
     		  color = ["#ff006a","#10c4ec","#ff8400"];
     		  if(this._timer != null) return;
     		  this._timer = setInterval(function(){
     			me.reset();
     			boxs[n].style.backgroundColor = color[n];
     			n++;
     			if(n == len){
     				n = 0;
     			}
     		},500);
     	},
     	endLoad: function(){
     		var me = this;
     		setTimeout(function(){
     			clearInterval(me._timer);
     			me._timer = null;
     		},200);
     	},
     	css:function(){
     		var css = [
     		    '#z-loading{',
     		    'position: fixed;',
     		    'top: 0;',
     		    'z-index: 9999;',
     		    'height: 100%;',
     		    'width: 100%;}',
     		    '#z-loading-mask{',
     		    'position: fixed;',
     		    'left: 0;',
     		    'top: 0;',
     		    'bottom: 0;',
     		    'right: 0;',
     		    'background: #FFFFFF;',
     		    'opacity: 0.60;',
     		    'filter: alpha(opacity=60);',
     		    'width:100%;',
     		    'height:100%;}',
     		    '#z-loading-box{',
     		    'position: absolute;',
     		    'top: 50%;',
     		    'left: 50%;',
     		    'margin-top: -40px;',
     		    'margin-left: -40px;',
     		    'width: 80px;',
     		    'height: 80px;',
     		    'text-align: center;',
     		    'font-size:26px;',
     		    'color: #000;}',
     		    '.z-loading-box{',
     		    'display: inline-block;',
     		    'width: 15px;',
		        'height: 15px;',
		        'border-radius: 50%;',
		        'background-color: #ccc;',
		        'margin-right: 10px;}'
     		].join("");
     		var style = document.createElement('style');
     		try{
     			style.innerHTML = css;
     		}catch(e){
     			style.appendChild(document.createTextNode(css));
     		}

     		document.head.appendChild(style);
     	}
     }

     Z.load = function(){
     	__load.show();
     }

     Z.endLoad = function(){
     	__load.hide();
     }
// 	ui.msg("哈哈哈");

// ui.createDialog({
//      title:'提示',
//      content:'你好吗222ui？',
//      ok:function(){
//           console.log(1);
//      }
// });

// ui.createDialog({
//      title:'提示',
//      content:'确定吗？',
//      ok:function(){
//           console.log(1);
//      },
//      cancel:function(){
//       alert(1);
//      },
//      okText:'<span style="font-size:16px;font-weight:700;">确定</span>'
// });

// ui.createDialog({
//      title:'用户名必填，请输入'
// });	      
     var ui={
  msgTimer:null,
  isAddDialogCss:false,
  isMobile:/mobile/i.test(navigator.userAgent),
  msg:function(message,timeout){
    if(!message) return;
    var timeout = timeout || 3000;
    if(!document.getElementById("z-msgs")){
      var msg = document.createElement("div");
      msg.id = "z-msgs";
      msg.innerHTML = '<div id="_msgcont"></div>';
      document.body.appendChild(msg);
    }
    var msgCont = document.getElementById("_msgcont");
    msgCont.innerHTML = message;

    var isMobile = /mobile/i.test(navigator.userAgent);
    if(!isMobile){
      msgCont.style.cssText = 
      "position: fixed;"
      + "top:50px;"
      + "left:50%;"
      + "padding:10px;"
      + "width:320px;"
      + "margin-left:-170px;"
      + "background-color:#333;"
      + "color:#fff;"
      + "font-size:16px;"
      + "border-radius:4px;"
      + "z-index:1024;"
    }else{
      msgCont.style.cssText = 
      "display: block;"
      + "padding:10px;"
      + "position: fixed;"
      + "bottom: auto;"
      + "left: 50%;"
      + "top: 50%;"
      + "transform: translate(-50%,-50%);"
      + "-webkit-transform: translate(-50%,-50%);"
      + "-ms-transform: translate(-50%,-50%);"
      + "transition: transform .3s, -webkit-transform .3s;"
      + "outline: 0px;"
      + "z-index: 1024;"
      + "background-color: #000;"
      + "border: 0px solid red;"
      + "border-radius: 6px;"
      + "background-clip: padding-box;"
      + "font-size: 14px;"
      + "line-height: 1.428571429;"
      + "color: #FFF;";
    }
    //控制定时器，如果有就把先干掉，防止刚显示就被隐藏
    if(this.msgTimer){
      clearTimeout(this.msgTimer);
      this.msgTimer = null;
    }
    msgCont.style.display = 'block';
    var hide = function(){
      msgCont.style.display = "none";
      if(this.msgTimer){
        clearTimeout(this.msgTimer);
        this.msgTimer = null;
      }
    }
    this.msgTimer = setTimeout(function(){
      hide();
    },timeout);
  },
  alert: function(title,content,fn,okText){
    var self = this;
    self.createDialog({
     title:title,
     content:content,
     ok:fn,
     okText:okText
   });
  },
  confirm: function(title,content,ok,cancel,okText,cancelText){
    var self = this;
    self.createDialog({
     title:title,
     content:content,
     ok:ok,
     cancel:cancel || function(){},
     okText:okText,
     cancelText:cancelText
   });
  },
  dialogEvent:function(el,fn){
    fn && fn();
    if(/msie|trident/.test(navigator.userAgent)){
      el.parentNode.parentNode.parentNode.parentNode.removeNode(true);
    }else{
      el.parentNode.parentNode.parentNode.parentNode.remove();
    }          
  },
  dialogCss: function(){
    this.isAddDialogCss = true;
    var style = document.createElement("style");
    style.innerHTML = ".z-dialog-mask{position:fixed;top:0;left:0;bottom:0;right:0;z-index:1024;background-color:#ccc;opacity:0.4;filter:alpha(opacity=40);height:100%;width:100%;overflow:hidden;user-select:none;}"
    + ".z-dialog-box-warp{position: fixed;bottom: auto;left: 50%;top: 50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transition: transform .3s, -webkit-transform .3s;outline: 0px;z-index: 1024;background-color: #FFF;border: 0px solid red;border-radius: 8px;background-clip: padding-box;font-size: 14px;line-height: 1.428571429;color: #c53232;}"
    + ".z-dialog-title{margin: 0;padding:20px 20px 10px;min-height: 16.43px;font-size: 14px;color: #000;font-weight: 800;text-align: center;overflow: hidden;text-overflow: ellipsis;cursor: default;}"
    + ".z-dialog-content{font-size: 14px;color: #333;padding:10px 20px 20px;}"
    + ".z-dialog-btns{border-top:1px solid #e5e5e5;color: #03A9F4;text-align: center;cursor: pointer;height:43px;overflow:hidden;}"
    + ".z-dialog-left-btn{width: 49.5%;float: left;display: inline-block;vertical-align: middle;padding: 10px 0px;}"
    + ".z-dialog-right-btn{display: inline-block;width: 49.5%;float: left;padding: 10px 0px;}"
    + ".z-dialog-btn-mid{float:left;width:1px;height:100%;background-color:#e5e5e5;}"
    + ".z-dialog-ok-btn{padding: 10px 0px;text-align: center;}";
    document.head.appendChild(style);
  },
  createDialog: function(opts){
    var self = this;
    var id = "z-" + (new Date().getTime()) + Math.random().toString().substr(-6);
    var title = opts.title || '',
    content = opts.content || '',
    okText = opts.okText || '确定',
    ok = opts.ok,
    cancelText = opts.cancelText || '取消',
    cancel = opts.cancel;

    if(title == '' && content == '') return;

    var warp = document.createElement("div");
    warp.className = 'z-dialog';
    warp.style.display = 'none';
    warp.id = id;

    var htm = "<div class='z-dialog-mask'></div>" 
    + "<div class='z-dialog-box-warp'>"
    + "<div class='z-dialog-box'>"
    + "<div class='z-dialog-title'>" + title + "</div>"
    + "<div class='z-dialog-content'>" + content + "</div>"
    + "<div class='z-dialog-btns'>";

    var haveCancel = "<div class='z-dialog-left-btn'>" + cancelText + "</div>"
    + "<div class='z-dialog-btn-mid'></div>"
    + "<div class='z-dialog-right-btn'>" + okText + "</div>"
    + "<div style='clear:both;'></div>";

    var noCancel = "<div class='z-dialog-ok-btn'>" + okText + "</div>";

    var htmfooter = "</div></div></div>";

    if(cancel){
      htm = htm + haveCancel + htmfooter;
    }else{
      htm = htm + noCancel + htmfooter;
    }

    try{
      warp.innerHTML = htm;
    }catch(e){
      throw new Error( "can not innerHTML: " + e );
    }

    document.body.appendChild(warp);

    if(cancel){
      var $elOk = document.getElementById(id).getElementsByClassName("z-dialog-right-btn")[0];
      var $elCancel = document.getElementById(id).getElementsByClassName("z-dialog-left-btn")[0];
      $elOk.onclick = function(){
        self.dialogEvent($elOk,ok);
      }
      $elCancel.onclick = function(){
        self.dialogEvent($elOk,cancel);
      }
    }else{
      var $ok = document.getElementById(id).getElementsByClassName("z-dialog-ok-btn")[0];
      $ok.onclick = function(){
        self.dialogEvent($ok,ok);
      }
    }

    if(title == ''){
      document.getElementById(id).getElementsByClassName("z-dialog-title")[0].style.display = 'none';
    }

    if(content == ''){
      document.getElementById(id).getElementsByClassName("z-dialog-content")[0].style.display = 'none';
    }

    if(self.isAddDialogCss === false){
      self.dialogCss();
    }

    if(self.isMobile){
      document.getElementById(id).getElementsByClassName("z-dialog-box-warp")[0].style.width = '80%';
    }else{
      document.getElementById(id).getElementsByClassName("z-dialog-box-warp")[0].style.width = '320px';
    }

    warp.style.display = 'block';
  }

}
     
     Z.msg = function(){
     	ui.msg(msg,time);
     }
		      
     Z.alert = function(){
     	ui.alert(title,content,fn,okText);
     }
		      
     Z.confirm = function(){
     	ui.alert(title,content,ok,cancel,okText,cancelText);
     }


	 
	 return Z
})));






















