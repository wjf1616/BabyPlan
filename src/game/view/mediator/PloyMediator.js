/**
 * Created by jfwang on 2017-11-02.
 * 游戏中心-Mediator
 */

var PloyMediator = cc.GamePureMVC.define(
    // CLASS INFO
    {
        name: 'view.mediator.DengluMediator',
        parent: cc.GamePureMVC.Mediator,
        constructor: function() {
            cc.GamePureMVC.Mediator.call(this, this.constructor.NAME);
        }

    },
    // INSTANCE MEMBERS
    {
        /** @override */
        listNotificationInterests: function () {
            return [ ];
        },

        /** @override */
        handleNotification: function (note) {

        },

        /** @override */
        onRegister: function () {
        },

        /** @override */
        onRemove: function () {

        },
        init: function() {
            var me = this;
            
            //创建登陆layer
            var ployLayer = PloyLayer.create();
            me.viewComponent = ployLayer.ui;
            
            ployLayer.onLeave = function() {
                C.log("PloyLayer....");
                me.sendNotification(cc.GamePureMVC.statemachine.StateMachine.ACTION, null, SceneAction.$('MAINCITY_ACTION'));
               
                //置空view
                me.destroy();
            };

        },
        destroy: function() {
            this.viewComponent = null;
        },
        getResource: function () {
            return null;
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'PloyMediator'
    }
);
