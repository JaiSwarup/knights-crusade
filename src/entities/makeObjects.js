import k from "../kaboomCtx.js";
import { state, statePropsEnum } from "../states/globalStateManager.js";

export function makeDoor(initialPos){
    const door = k.make([
        k.sprite("exit"),
        k.pos(initialPos),
        k.area(),
        k.scale(1.5),
        k.body({isStatic : true}),
        k.anchor("bot"),
        k.state("idle", ["idle", "pressed"]),
        {
            setEvents(){
                this.onCollide("player", () => {
                    k.go("home");
                });
            }
        }
    ])
    return door;
}

export function makeKey(initialPos){
    const key = k.make([
        k.sprite("key"),
        k.pos(initialPos),
        k.area(),
        k.scale(1),
        k.body(),
        k.anchor("bot"),
        {
            setEvents(){
                const player = k.get("player", {recursive : true})[0];
                this.onCollide("player", () => {
                    player.hasKey = true;
                    k.destroy(this);
                });
            }
        }
    ])
    return key;
}

export function makeChest(initialPos){
    const chest = k.make([
        k.sprite("chest"),
        k.pos(initialPos),
        k.area(),
        k.scale(1),
        k.anchor("bot"),
        {
            setEvents(){
                const player = k.get("player", {recursive : true})[0];
                this.onCollide("player", () => {
                    if (player.hasKey){
                        this.play("open");
                        player.hasKey = false;
                        state.set(statePropsEnum.coins, state.current().coins + 3);
                    }
                });
            }
        }
    ])
    return chest;
}

export function makeCoin(initialPos){
    const coin = k.make([
        k.sprite("coin"),
        k.pos(initialPos),
        k.area(),
        k.scale(1),
        k.body(),
        k.anchor("bot"),
        {
            setEvents(){
                this.onCollide("player", () => {
                    state.set(statePropsEnum.coins, state.current().coins +1);
                    k.destroy(this);
                });
            }
        }
    ])
    return coin;
}