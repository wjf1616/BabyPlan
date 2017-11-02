/**
 * Created by jfwang on 2017-11-02.
 * 游戏中心-Layer
 */

var PloyLayer = X.bUi.extend({
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
        me.ui.finds("btn_level").touch(function(sender,type){
            if(type==ccui.Widget.TOUCH_ENDED){
                C.log('离开游戏中心...');
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
PloyLayer.create = function(){
    var ID = "PloyLayer";
    var layer = new PloyLayer('PloyLayer.json',ID);
    
    //ui加入到frame管理器
    X.addFrame(ID,layer);

    layer.show();
    return layer;
};
