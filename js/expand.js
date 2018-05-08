/**** 常用类的拓展 ****/
(function (S) {
    S.prototype.trim = function () {
        return this.replace(/^\s*/, '').replace(/\s*$/, '');
    }
})(String);

(function (D) {
    D.prototype.getWeek = function () {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][this.getDay()];
    };

    D.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "f+": this.getMilliseconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "w+": this.getWeek()
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return format;
    };
})(Date)