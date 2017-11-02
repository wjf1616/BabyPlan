/**
 * Created by jfwang on 2017-07-25.
 * 状态机
 */

var SceneFsm = cc.GeneJS.Class({
    'public createFsm': function() {
        var fsm = {
            // 开始状态
            "@initial": SceneState.$('DENGLU_MEDIATOR'),
            "state": [
                {
                    // 登陆
                    "@name": SceneState.$('DENGLU_MEDIATOR'),
                    //"@changed": SceneTransition,
                    "transition": [
                        {
                            "@action": SceneAction.$('MAINCITY_ACTION'),
                            "@target": SceneState.$('MAINCITY_MEDIATOR')
                        }
                    ]
                },
                {
                    // 主城
                    "@name": SceneState.$('MAINCITY_MEDIATOR'),
                    //"@changed": SceneTransition ,
                    "transition": [
                        {
                            "@action": SceneAction.$('DENGLU_ACTION'),
                            "@target": SceneState.$('DENGLU_MEDIATOR')
                        },
                        {
                            "@action": SceneAction.$('PLOY_ACTION'),
                            "@target": SceneState.$('PLOY_MEDIATOR')
                        }
                    ]
                },
                {
                    // 游戏中心
                    "@name": SceneState.$('PLOY_MEDIATOR'),
                    //"@changed": SceneTransition ,
                    "transition": [
                        {
                            "@action": SceneAction.$('MAINCITY_ACTION'),
                            "@target": SceneState.$('MAINCITY_MEDIATOR')
                        }
                    ]
                }
            ]
        };

        return fsm;
    }
});
