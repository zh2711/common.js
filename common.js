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

	 //是否字符串
	 //利用substring方法排除字符串对象实例
	 Z.isString = function(str){
	 	return typeof str === 'string' || (str.substring ? true : false);
	 }

	 //将值转换为字符串
	 Z.toString = function(str){
	 	return (str === undefined || str === null) ? '' 
	 	: typeof str 'object' ? JSON.stringify(str)
	 	: String(str)
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

	 //是否对象,同时排除null
	 Z.isObject = function(obj){
	 	return typeof obj === 'object' && !!obj;
	 }

	 //是否数组
	 Z.isArray = Array.isArray || function(data){
	 	return toString.call(data) === '[object Array]';
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

	 
	 return Z
})));






















