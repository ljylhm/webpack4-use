/**** 方法库 积累的常用的方法  ****/
// 时间转天数
var helper = {
    version: "1.0.0",
    /************************* 数据检测类 *******************************/
    getDataType: function (obj) {
        var _type = '',
            _type_str = '';

        _type = Object.prototype.toString.call(obj);
        _type_str = _type.substring(8, _type.length - 1);

        return _type_str;
    },

    // 检测是否为空对象
    isEmptyObject: function (obj) {
        for (var key in obj) {
            return false;
        };
        return true
    },

    // 检测 argruments 是否存在且不为零
    argCheck: function () {
        if (this.isEmptyObject(arguments)) return false;
        for (var i in arguments) {
            if (!arguments[i] && arguments[i] != 0) {
                console.warn('name or value can not be null');
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
        return sessionStorage.getItem(name)
    },

    sessionClear: function (name) {
        var sessionJson = window.sessionStorage;
        if (!this.argCheck(name) && !this.isEmptyObject(sessionJson)) {
            sessionJson.clear()
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
            localStroageJson.clear()
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
            if (this.getDataType(time) != 'Date') {
                return Math.round(new Date(time).getTime());
            }
            return Math.round(time.getTime())
        }
    },

    // 转换为相差的天数 向下取整
    transformDays: function (sDate1, sDate2) {
        sDate2 = sDate2 ? sDate2 : new Date();
        var _stamp1 = this.getTimeStamp(sDate1),
            _stamp2 = this.getTimeStamp(sDate2);
        return this.praseDays(Math.abs(_stamp1 - _stamp2));
    }

    /************************* http请求 *******************************/

}

module.exports = helper;


