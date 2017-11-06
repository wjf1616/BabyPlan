/**
 * Created by jfwang on 2017-07-26.
 * Ploy数据
 */

var PloyProxy = cc.GamePureMVC.define(
    // CLASS INFO
    {
        name: 'model.proxy.PloyProxy',
        parent: cc.GamePureMVC.Proxy,

        constructor: function () {
            cc.GamePureMVC.Proxy.call(this);
        }
    },

    // INSTANCE MEMBERS
    {
        _fruitConfig: null,

        /** @override */
        onRegister: function () {
            this.initConfig();
        },

        initConfig: function(){
            var me = this;

            //读取fruits配置
            X.getFileJSON('json/fruits.json',function(d){
                me._fruitConfig = d;
            });
        },

        getConfig: function(key){
            return this._fruitConfig[key];
        },

        /** @override */
        onRemove: function () {
            if (this._fruitConfig) {
                delete this._fruitConfig;
                this._fruitConfig = null;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'PloyProxy'
    }
);

