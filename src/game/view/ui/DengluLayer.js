/**
 * Created by jfwang on 2017-11-02.
 * 登陆-Layer
 */

var DengluLayer = X.bUi.extend({
    ctor: function (json,id) {
        var me = this;
        me._super(json,id);
    },

    onOpen: function () {
        var me = this;
        me.fillSize();

        me.onInit();
    },

    onInit : function(){
        var me = this;
        me.ui.finds("btn_kaishi").touch(function(sender,type){
            if(type==ccui.Widget.TOUCH_ENDED){
                C.log('开始游戏...');
                if (me.onLeave) me.onLeave();
                //me.remove();
            }
        });
    },
    
    onShow: function () {
        var me = this;


    },

    onHide: function () {
        var me = this;
        
    },

    onClose: function () {
        
    }
});

//实例化接口
DengluLayer.create = function(){
    var ID = "DengluLayer";
    var layer = new DengluLayer('DengluLayer.json',ID);
    
    //ui加入到frame管理器
    X.addFrame(ID,layer);

    layer.show();
    return layer;
};
