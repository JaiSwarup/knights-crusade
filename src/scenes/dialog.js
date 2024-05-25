import k from "../kaboomCtx.js";

export function dialog(list){
    let index = 0;
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.opacity(0.5),
        "dialog",
        k.fixed()
    ])
    k.add([
        k.sprite("dialog"),
        k.z(1),
        "dialog",
        k.fixed()
    ])
    k.add([
        k.rect(448, 112),
        k.color(0, 0, 0),
        k.pos(16, 192),
        "dialog",
        k.fixed()
    ])
    const char = k.add([
        k.sprite(list[0].char, {anim: "idle"}),
        k.scale(2),
        k.pos(32, 128),
        k.z(2),
        "dialog",
        k.fixed()
    ])
    const head = k.add([
        k.text(list[0].head, {size :20}),
        k.pos(32, 200),
        "dialog",
        k.fixed()
    ])
    const msg = k.add([
        k.text(list[0].msg, {size: 16, width: 400}),
        k.area({shape: new k.Rect(k.vec2(0), 400, 72),}),
        k.pos(32, 224),
        "dialog",
        k.fixed()
    ])
    k.onKeyPress("enter", ()=>{
        if (index < list.length - 1){
            index++;
            updateDialog(index);
        } else {
            k.destroyAll("dialog");
        }
    })
    function updateDialog(index){
        char.use(k.sprite(list[index].char, {anim: "idle"}));
        head.text = list[index].head;
        msg.text = list[index].msg;
    }
}