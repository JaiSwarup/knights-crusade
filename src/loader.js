import k from "./kaboomCtx.js";

export const loader = {
    fonts : () =>{},
    sprites : () => {
        k.loadRoot(".")
        k.loadSpriteAtlas("/sprites/tilemap.png", {
            "coin" :{
                x : 32,
                y : 0,
                width : 16,
                height : 16,
            },
            "heart" : {
                x : 16,
                y : 32,
                width : 16,
                height : 16,
            },
            "key" : {
                x : 256,
                y : 64,
                width : 16,
                height : 16,
            },
            "exit" : {
                x : 256,
                y : 32,
                width : 64,
                height : 16,
                sliceX : 4,
                sliceY : 1,
                anims :{
                    closed : {from : 0,to : 0,},
                    open : {from : 2,to : 2,},
                }
            },
            "chest" : {
                x : 144,
                y : 304,
                width : 32,
                height : 16,
                sliceX : 2,
                sliceY : 1,
                anims : {
                    closed : {from : 0,to : 0,},
                    open : {from : 1,to : 1,},
                }
            },
            "spring" : {
                x : 48,
                y : 128,
                width : 48,
                height : 16,
                sliceX : 3,
                sliceY : 1,
                anims : {
                    idle : {from : 0,to : 0,},
                    pressed : {from : 1,to : 2,},
                }
            },
            "temp":{
                x : 64,
                y : 48,
                width : 48,
                height : 16,
            },
            "move" : {
                x : 64,
                y : 96,
                width : 48,
                height : 16,
            },
            "crawler":{
                x : 0,
                y : 256,
                width : 80,
                height : 16,
                sliceX : 5,
                sliceY : 1,
                anims : {
                    "idle" : {from : 0,to : 0,},
                    "walk" : {from : 1,to : 3,loop : true,},
                    "dead" : {from : 4,to : 4,},
                }
            },
            "helibug" : {
                x : 0,
                y : 304,
                width : 48,
                height : 16,
                sliceX : 3,
                sliceY : 1,
                anims : {
                    "fly" : {from : 0,to : 1,loop : true,},
                    "dead" : {from : 2,to : 2,},
                }
            },
            
        });
        k.loadSprite("player", "/sprites/player.png", {
            sliceX : 9,
            sliceY : 4,
            anims : {
                "idle" : {from : 31,to : 34, loop : true},
                "walk" : {from : 18,to : 23,loop : true,},
                "run" : {from : 9,to : 16,loop : true,},
                "jump" : {from : 35,to : 35,},
                "fall" : {from : 10,to : 10, loop : true},
                "attack" : {from : 0,to : 8,},
                "damage" : {from : 24,to : 25},
            }
        });
        k.loadSprite("level-1", "/sprites/level-1.png");
        k.loadSprite("slash", "/sprites/warriorslashfx-Sheet.png", {
            sliceX : 9,
            sliceY : 1,
            anims : {
                "attack" : {from : 0,to : 8,},
            }
        });
        k.loadSprite("dialog", "/sprites/dialog.png");
        k.loadSprite("background", "/sprites/background.png");
    }
}