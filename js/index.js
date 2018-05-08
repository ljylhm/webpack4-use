/**** 方法库 积累的常用的方法  ****/
import axios from "axios";
// 时间转天数
var name = "Ljy";
var helper = {
  version: "1.0.0",
  /************************* 数据检测类 *******************************/
  getDataType: function (obj) {
    var _type = "",
      _type_str = "";

    _type = Object.prototype.toString.call(obj);
    _type_str = _type.substring(8, _type.length - 1);

    return _type_str;
  },

  // 检测是否为空对象
  isEmptyObject: function (obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  },

  // 检测 argruments 是否存在且不为零
  argCheck: function () {
    if (this.isEmptyObject(arguments)) return false;
    for (var i in arguments) {
      if (!arguments[i] && arguments[i] != 0) {
        console.warn("name or value can not be null");
        return false;
      }
    }
    return true;
  },

  /************************* 浏览器存储 *******************************/
  sessionSet: function (name, value) {
    if (!this.argCheck(name, value)) return;
    sessionStorage.setItem(name, value);
  },

  sessionGet: function (name) {
    if (!this.argCheck(name)) return window.sessionStorage;
    return sessionStorage.getItem(name);
  },

  sessionClear: function (name) {
    var sessionJson = window.sessionStorage;
    if (!this.argCheck(name) && !this.isEmptyObject(sessionJson)) {
      sessionJson.clear();
    }
    sessionJson.removeItem(name);
  },

  localStroageSet: function (name, value) {
    if (!this.argCheck(name, value)) return;
    localStorage.setItem(name, value);
  },

  localStroageGet: function (name) {
    if (!this.argCheck(name)) return window.localStorage;
    localStorage.getItem(name);
  },

  localStroageClear: function (name) {
    var localStroageJson = window.localStroage;
    if (!this.argCheck(name) && !this.isEmptyObject(localStroageJson)) {
      localStroageJson.clear();
    }
    localStroageJson.removeItem(name);
  },

  /************************* 时间戳 *******************************/
  // 时间戳转换为天数 时间戳皆转为毫秒
  praseDays: function (timeStamp) {
    var tDayStamp = 1000 * 60 * 60 * 24;
    var tDiff = Math.floor(timeStamp / tDayStamp);
    return tDiff;
  },

  // 获取时间戳
  getTimeStamp: function (time) {
    if (!time) return Math.round(new Date().getTime());
    else {
      if (this.getDataType(time) != "Date") {
        return Math.round(new Date(time).getTime());
      }
      return Math.round(time.getTime());
    }
  },

  // 转换为相差的天数 向下取整
  transformDays: function (sDate1, sDate2) {
    sDate2 = sDate2 ? sDate2 : new Date();
    var _stamp1 = this.getTimeStamp(sDate1),
      _stamp2 = this.getTimeStamp(sDate2);
    return this.praseDays(Math.abs(_stamp1 - _stamp2));
  },

  /************************* http请求 *******************************/
  // http 请求的拦截器 暴露一个请求的内容给cb 一定要有返回值
  httpReqInterceptr: function (cb) {
    axios.interceptors.request.use(cb)
  },
  // http 返回的拦截器 暴露一个返回的内容给cb 一定要有返回值
  httpReqInterceptr: function (cb) {
    axios.interceptors.response.use(cb)
  },

  http: function (method, url, data, options) {
    method = method || "GET";
    data = data || {};
    options = options || {};
    if (!url) console.error("[http]url is must");

    var params = {
      url: url,
      method: method,
      data: data,
      timeout: 2000,
    }

    params = Object.assign(params, options);
    return axios(params);
  },

  httpGet: function (url, data, opt) {
    var method = 'get';
    return this.http(method, url, data, opt);
  },

  httpPost: function (url, data, opt) {
    var method = 'post';
    return this.http(method, url, data, opt);
  },


  /************************* 字符串方法 *******************************/
  // 获得对应字符串的数量
  getCharNum: function (str1, str2) {
    if (!this.argCheck(str1, str2)) return 0;
    var count = 0,
      reg = new RegExp(str2, "g");
    str1.replace(reg, function () {
      count++;
    });
    return count;
  },

  /************************* 对象的方法 *******************************/
  // 判断是否两个对象是否相等
  isEql: function (obj1, obj2) {
    var _arr1 = [],
      _arr2 = [];
    var isFlag = true;
    if (obj1 === obj2) return true;
    if (helper.getDataType(obj1) != "Object") return false;
    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;
    for (var i in obj1) {
      if (!obj2.hasOwnProperty(i)) return false;
      if (helper.getDataType(obj1[i]) != "Object") {
        if (obj2[i] != obj1[i]) return false;
      } else {
        _arr1.push(obj1[i]);
        _arr2.push(obj2[i]);
      }
    }
    _arr1.forEach(function (ele, index, arr) {
      isFlag = isFlag && isEql(_arr1[index], _arr2[index]);
    });
    return isFlag;
  },

  /************************* 数组的方法 *******************************/
  // 数组深拷贝
  deepClone: function (obj) {
    var type = typeof obj == "object";
    if (!type) return obj;
    else {
      var newObj = new Object();
      for (var i in obj) {
        newObj[i] = this.deepClone(obj[i]);
      }
      return newObj;
    }
  },
  // 去除数组中重复的部分
  clearRepeate: function (arr) {
    return [...new Set(arr)];
  },
  // 去除数组中重复的部分
  clearRepeateObj: function (arr, id) {
    var obj = {};
    var newArr = arr.reduce((pre, cur, index, arr) => {
      obj[cur[id]] ? "" : obj[cur[id]] = true && pre.push(cur);
      return pre;
    }, [])
    return newArr;
  },
  // 数组求和
  arrSum: function (arr) {
    return arr.reduce((pre, cur) => {
      return pre + cur;
    });
  },
  /************************* 排序的方法 *******************************/
  // 交换数组元素
  swap: function (arr, index1, index2) {
    var _tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = _tmp;
  },
  // 快速排序
  quickSort: function (arr, left, right) {
    if (arr.length < 2) return arr;
    var _mid = arr.splice(0, 1)[0];

    arr.forEach(function (ele, index, arr) {
      if (ele < _mid) left.push(ele);
      else right.push(ele);
    });
    return this.arrSort1(left, [], []).concat([_mid], this.arrSort1(right, [], []));
  },
  // 冒泡排序
  bubbleSort: function (arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
      for (var j = 0; j < len - i; j++) {
        if (arr[j] > arr[j + 1]) this.swap(arr, j, j + 1)
      }
    }
  },
  // 选择排序
  selectSort: function (arr) {
    var _cursor = "";
    for (var i = 0, len = arr.length; i < len; i++) {
      _cursor = 0;
      for (var j = 0; j < len - i; j++) {
        _cursor = arr[j] > arr[_cursor] ? j : _cursor;
      };
      this.swap(arr, _cursor, len - i - 1);
    }
  }
};

export default helper;
