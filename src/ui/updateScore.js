import k from "../kaboomCtx.js";
import { state } from "../states/globalStateManager.js";

export function updateScore(){
    let coins =state.current().coins;
    const HPStat = k.make([
        k.rect(48, 16),
        k.area(),
        k.pos(16, 32),
        k.color(0, 0, 0),
        k.opacity(0.5),
        k.fixed()
    ])
    HPStat.add([
        k.sprite("coin"),
    ])
    const txt = HPStat.add([
        k.text(`X ${coins}`, {size : 12}),
        k.pos(24, 4),
        "hp"
    ])
    k.onUpdate("hp", ()=>{
        txt.text = `X ${state.current().coins}`;
    })
    return HPStat;
}