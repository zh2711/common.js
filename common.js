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
	var toStoring = Object.prototype.toString;
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
	 //是否数组
	 Z.isArray = Array.isArray || function(data){
	 	return toString.call(data) === '[object Array]';
	 }
	 return Z
})));






















