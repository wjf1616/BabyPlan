/**
 * Created by jfwang on 2017-11-02.
 * 游戏中心-Layer
 */

var PloyLayer = X.bUi.extend({
    ctor: function (json,id) {
        var me = this;
        me._optionCount = 3;
        me._finishCount = 3;

        me._curFinishCount = 0;
        me._selectTruck = null;
        me._dataCurConfig = null;
        me._dataConfig = null;

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

        //操作选着
        for (var i = 0; i < me._optionCount; i++) {
            var _itemCargo = me.ui.finds("cargo_0"+(i+1));
            _itemCargo.touch(function(sender,type){
                if(type==ccui.Widget.TOUCH_ENDED){
                    me.onSelectCargo(this.index);
                }
            },_itemCargo);

            //
            var _itemTruck = me.ui.finds("truck_0"+(i+1));
            _itemTruck.touch(function(sender,type){
                if(type==ccui.Widget.TOUCH_ENDED){
                    me.onSelectTruck(this);
                }
            },_itemTruck);
        }
    },
    
    onShow: function () {
        var me = this;
    },

    initPloy: function(d){
        var me = this;
        if (!d || d.length <= 0) return;
        me._dataConfig = d;

        //开始游戏
        function _onStart(){
            me._initPloy();
        };

        //显示1s之后再结束
        me.ui.setTimeout(function(){
            _onStart();
        },1000);

        
    },

    _initPloy: function(){
        var me = this;
        me.onInitFinish();

        var data = me._dataCurConfig = X.arrayRands(me._dataConfig,3);
        var indexs = X.arrayShuffle([1,2,3]);
        for (var i = 0; i < data.length; i++) {
            var _cargo = me.ui.finds("cargo_0"+(i+1));
            _cargo.index = i;
            
            var _cargoIcon = _cargo.finds("icon");
            _cargoIcon.ignoreContentAdaptWithSize(true);
            _cargoIcon.loadTexture("icon/"+data[i].icon);

            var index = indexs[i]-1;
            var _truck = me.ui.finds("truck_0"+(i+1));
            _truck.index = index;
            _truck.isFinish = 0;
            
            _truckIcon = _truck.finds("icon");
            _truckIcon.ignoreContentAdaptWithSize(true);
            _truckIcon.loadTexture("img/touming.png");
            _truck.finds("name").setString(data[index].name);
        }
    },    

    //选着cargo
    onSelectCargo: function(d){
        var me = this;
        if (me._selectTruck.index != d) return;

        me._selectTruck.finds("icon").loadTexture("icon/"+me._dataCurConfig[d].icon);
        me._selectTruck.isFinish = 1;

        //选取未完成
        if (!me.IsFinish()) return;
        function _onFinish(){
            me._curFinishCount += 1;

            //播放完成效果
            me.onPloyFinish(function(){
                //达到完成次数，离开
                if (me._curFinishCount >= me._finishCount) {
                    if (me.onLeave) me.onLeave();
                }
                else
                {
                    me._initPloy();
                }
            });
        };

        //显示1s之后再结束
        me.ui.setTimeout(function(){
            _onFinish();
        },1000);

        
    },

    //刷新获取状态
    onSelectTruck: function(d){
        var me = this;
        if (me._selectTruck != d) {
            me._selectTruck = d;
        }
    },

    //初始化动画回调
    onInitFinish: function(callback){
        var me = this;
        var _cargo = me.ui.finds("cargo");
        var _cargoX = _cargo.getPositionX();
        var _cargoY = _cargo.getContentSize().height;
        _cargo.moveTo(0.3,cc.p(_cargoX,cc.winSize.height-_cargoY)).run();

        var _truck = me.ui.finds("truck");
        var _truckY = _truck.getPositionY();
        _truck.moveTo(0.3,cc.p(0,_truckY)).then(function(){
            callback && callback();
        }).run();
    },

    //完成动画回调
    onPloyFinish: function(callback){
        var me = this;
        var _cargo = me.ui.finds("cargo");
        var _cargoX = _cargo.getPositionX();
        _cargo.moveTo(0.3,cc.p(_cargoX,cc.winSize.height)).run();

        var _truck = me.ui.finds("truck");
        var _truckY = _truck.getPositionY();
        _truck.moveTo(0.3,cc.p(-cc.winSize.width,_truckY)).then(function(){
            callback && callback();
        }).run();
    },

    //判断是否成功
    IsFinish: function(){
        var me = this;
        var count = 0;
        for (var i = 0; i < me._optionCount; i++) {
            var _itemTruck = me.ui.finds("truck_0"+(i+1));
            if (_itemTruck.isFinish == 1) {
                count += 1;
            }
        }

        return count == me._optionCount ? true : false;
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
