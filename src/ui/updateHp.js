import k from "../kaboomCtx.js";
import { state } from "../states/globalStateManager.js";

export function updateHp(){
    let hp =state.current().playerHp;
    const HPStat = k.make([
        k.rect(48, 16),
        k.area(),
        k.pos(16, 16),
        k.color(0, 0, 0),
        k.opacity(0.5),
        k.fixed()
    ])
    HPStat.add([
        k.sprite("heart"),
    ])
    const txt = HPStat.add([
        k.text(`X ${hp}`, {size : 12}),
        k.pos(24, 4),
        "hp"
    ])
    k.onUpdate("hp", ()=>{
        txt.text = `X ${state.current().playerHp}`;
    })
    return HPStat;
}