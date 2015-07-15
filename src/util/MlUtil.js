'use strict';

var MlUtil = {
  log: true,
  showProgress: function(){
    $('#loader').show();
    $('#fade').show();
  },
  hideProgress: function(){
    $('#loader').hide();
    $('#fade').hide();
  },
  logging: function (message){
    if(this.log){
      console.log(message);
    }
  },
  /**
    * 文字列をフォーマットする。
    * sprintのような動作をする。
    * <pre>
    * MlUtil.stringFormat("{0}さん", "かすが");
    * </pre>
    * @param 置き換え文字列, 置き換え文字列...
    * @return フォーマットされた文字列
    */
  stringFormat:function () {
      var formatted = arguments[0], i, regexp;
      for (i = 0; i < arguments.length; i = i + 1) {
          regexp = new RegExp('\\{' + i + '\\}', 'gi');
          formatted = formatted.replace(regexp, arguments[i + 1]);
      }
      return formatted;
  },
};
module.exports = MlUtil;
