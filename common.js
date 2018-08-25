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

	 //合并对象
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
          if(!obj[key]) obj[key] = src[key];
        }
      }
      return obj;
	 }

	 //克隆
	 Z.clone = function(obj){
	 	if(obj == null) return;
	 	return Z.isArray(obj) ? obj.slice(0) : Z.extend({},obj);
	 }


	 
	 return Z
})));






















