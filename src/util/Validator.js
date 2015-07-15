'use strict';

import MlUtil from '../util/MlUtil';
/**
 * 使用例
 * if (validator.validate({message: {value: "検証する値"}, pubDate: {value: "検証する値"}})) {
 * 		console.log(validator.messages);
 * }
 */
var Validator = {
    /**
     * validator.types.○○という検証メソッドが入る
     * 検証メソッドはvalidateとgetMessage関数を実装する。
     */
    types:{},
    /***
     * 検証が失敗した場合に以下のオブジェクトが入る
     * {mesage: "エラーメッセージ",errorProperty: "どの検証で失敗したか。ie:isNotEmpty", isNotEmpty: true}
     */
    messages:[],
    /**
     * keyと検証関数の組
     */
    config:{
        email:['isNotEmpty', 'isEmail'],
        name:['isNotEmpty'],
        description:['isNotEmpty'],
        role:['isNotEmpty'],
        type:['isNotEmpty']
    },
    /**
     * keyとエラーメッセージの組
     */
    formatMessage:{
        email:"Email",
        name:"Name",
        description:'Description',
        role:'Role',
        type:'Type'
    },
    /**
     * 実際の検証関数
     * @param data - {message: {value: "検証する値"}, pubDate: {value: "検証する値"}}
     */
    validate:function (data) {
        var i, j, msg, type, checker, resultOk;
        this.messages = [];
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                if (!type) {
                    continue;
                }
                for (j = 0; j < type.length; j = j + 1) {
                    checker = this.types[type[j]];
                    if (!checker) {
                        throw {
                            name:"ValidationError",
                            message:"No handler to validate type " + type[j]
                        };
                    }
                    resultOk = checker.validate(data[i]);
                    if (!resultOk) {
                        msg = {
                            message: MlUtil.stringFormat(checker.getMessage(), this.formatMessage[i]),
                            errorProperty:i
                        };
                        msg[type[j]] = true;
                        this.messages.push(msg);
                        break;
                    }
                }
            }
        }
        return this.hasErrors();
    },
    /**
     * 検証の失敗があったか？
     */
    hasErrors:function () {
        return this.messages.length !== 0;
    },
    /**
     * エラーメッセージ内にemptyのエラーが含まれているか
     * @return true - 含まれる false - 含まれない
     */
    hasEmpty:function () {
        var i;
        for (i = 0; i < this.messages.length; i = i + 1) {
            if (this.messages[i].isNotEmpty) {
                return true;
            }
        }
        return false;
    },
    /**
     * 先頭のエラーメッセージを取得
     * @return 先頭のエラーメッセージ　先頭のメッセージがなければnullを返す。
     */
    getFirstMessage:function () {
        var mess = this.messages[0] || null;
        if (mess !== null) {
            return this.messages[0].message;
        }
        return null;
    },
    /**
     * empty以外の先頭のエラーメッセージを返す
     * @return empty以外の先頭のエラーメッセージ 存在しなければ、nullを返す
     */
    getFirstMessageWithoutEmpty:function () {
        var i;
        for (i = 0; i < this.messages.length; i = i + 1) {
            if (!this.messages[i].isNotEmpty) {
                return this.messages[i].message;
            }
        }
        return null;
    },
    isExistErrorProperty:function (property) {
        var ret = false;
        $.each(this.messages, function (k, v) {
            if (v.errorProperty === property) {
                ret = true;
            }
        });
        return ret;
    },
    getErrorMessage:function (property) {
        var ret = '';
        $.each(this.messages, function (k, v) {
            if (v.errorProperty === property) {
                ret = v.message;
            }
        });
        return ret;
    },
    isExistErrorPropertyWithIsNotEmpty:function (property, isNotEmpty) {
        var ret = false;
        $.each(this.messages, function (k, v) {
            if (v.errorProperty === property && v.isNotEmpty === isNotEmpty) {
                ret = true;
            }
        });
        return ret;
    }
};
Validator.types.isEmail = {
    validate:function (value) {
        var val = value.value || "";
        val = val.toString();
        // 空白許可
        if (val.length === 0) {
            return true;
        }
        // 128文字以上不可
        if (val.length > 128) {
            return false;
        }
        // 記号の連続は不可
        else if (val.match(/[_.-][_.-]/)) {
            return false;
        }
        // メールアドレス形式 aaa@aaa.aa
        //else if(val.match(/^[a-z0-9][a-z0-9_.-]*[a-z0-9]\@[a-z0-9][a-z0-9_.-]*[a-z0-9]\.[a-z0-9]+$/i)){
        else if (val.match(/^[a-z0-9][a-z0-9_.-]*\@[a-z0-9][a-z0-9_.-]*[a-z0-9]\.[a-z0-9]+$/i)) {
            return true;
        }
        return false;
    },
    getMessage:function () {
        return "*{0}をメール形式で入力してください。";
    }
};
Validator.types.isTel = {
    validate:function (value) {
        var val = value.value || "";
        val = val.toString();
        // 空白許可
        if (val.length === 0) {
            return true;
        }
        if (val.match(/^[0-9]*[0-9-]{3,18}[0-9]$/i)) {
            return true;
        }
        return false;
    },
    getMessage:function () {
        return "*{0}を電話番号形式で入力してください。";
    }
};
Validator.types.isUrl = {
    validate:function (value) {
        var val = value.value || "";
        val = val.toString();
        if (val.length === 0) {
            return true;
        }
        if (/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(val)) {
            return true;
        }
        return false;
    },
    getMessage:function () {
        return "*{0}をURL形式で入力してください。";
    }
};
Validator.types.isHostname = {
    validate:function (value) {
        var val = value.value || "";
        val = val.toString();
        // 空白許可
        if (val.length === 0) {
            return true;
        }
        if (val.match(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/i)) {
            return true;
        }
        else {
            return false;
        }
    },
    getMesasge:function () {
        return "";
    }
};
Validator.types.isPort = {
    validate:function (value) {
        var val = value.value || "";
        val = val.toString();
        // 空白許可
        if (val.length === 0) {
            return true;
        }
        if (val.match(/^[0-9]{1,5}$/i)) {
            return true;
        }
        else {
            return false;
        }
    },
    getMessage:function () {
        return "";
    }
};
Validator.types.isOverLength = {
    expectSize:0,
    realSize:0,
    validate:function (value) {
        var val = value.value || "",
            size = value.size || 0;
        val = val.toString();
        if (val.length > size) {
            this.expectSize = size;
            this.realSize = val.length;
            return false;
        }
        return true;
    },
    getMessage:function () {
        return "*{0}を" + this.expectSize + " 字以下で入力してください。";
    }
};
Validator.types.isMinLength = {
    expectSize:0,
    realSize:0,
    validate:function (value) {
        var val = value.value || "",
            size = value.size || 0;
        val = val.toString();
        if (val.length < size) {
            this.expectSize = size;
            this.realSize = val.length;
            return false;
        }
        return true;
    },
    getMessage:function () {
        return "*{0}を" + this.expectSize + " 字以上で入力してください。";
    }
};
Validator.types.isMatchLength = {
    expectSize:0,
    realSize:0,
    validate:function (value) {
        var val = value.value || "",
            size = value.size || 0;
        val = val.toString();
        if (val.length !== size) {
            this.expectSize = size;
            this.realSize = val.length;
            return false;
        }
        return true;
    },
    getMessage:function () {
        return "*{0}を" + this.expectSize + " 文字で入力してください。";
    }
};
Validator.types.isNotEmpty = {
    validate:function (value) {
        var val = value.value || "";
        if (!val) {
            val = "";
        }
        val = val.toString();
        if (val === "") {
            return false;
        } else {
            return true;
        }
    },
    getMessage:function () {
        return "*{0}を入力してください。";
    }
};
Validator.types.isNumber = {
    validate:function (value) {
        var val = value.value || "";
        val = val.toString();
        if (val.match(/[^0-9]+/)) {
            return false;
        } else {
            return true;
        }
    },
    getMessage:function () {
        return "*{0}を数値で入力してください。";
    }
};
Validator.types.isDate = {
    validate:function (value) {
        var val = value.value || "", d;
        val = val.replace(/-/g, '/');
        try {
            d = new Date(val);
        } catch (e) {
            return false;
        }
        if (isNaN(d.getYear())) {
            return false;
        }
        return true;
    },
    getMessage:function () {
        return "*{0}を日付形式で入力してください。";
    }
};
Validator.types.isPastDate = {
    validate:function (value) {
        var val = value.value || "", d;
        val = val.replace(/-/g, '/');
        try {
            d = new Date(val);
        } catch (e) {
            return false;
        }
        if (isNaN(d.getYear())) {
            return false;
        }
        var now = new Date(),
            nowTimeMill = now.getTime(),
            valTimeMill = Date.parse(val);
        if (nowTimeMill > valTimeMill) {
            return false;
        }
        return true;
    },
    getMessage:function () {
        return "*{0}を現在の日時より未来の日時で入力してください。";
    }
};

module.exports = Validator;
