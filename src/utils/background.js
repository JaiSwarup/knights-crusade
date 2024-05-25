import k from "../kaboomCtx.js";


export function setBackground() {
    k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0), k.pos(0, 0), k.fixed(), k.z(-2)]);
}