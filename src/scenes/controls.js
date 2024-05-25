import k from "../kaboomCtx.js";
import { setBackground } from "../utils/background.js";

export function controls(){
    setBackground();
    k.add([k.text("Controls", {
        size: 32
    }), k.pos(k.width() / 2, k.height() / 2 - 60), k.anchor("center")]);
    k.add([k.text("X - Jump", {
        size: 16
    }), k.pos(k.width() / 2, k.height() / 2 - 20), k.anchor("center")]);
    k.add([k.text("Left - Move Left", {
        size: 16
    }), k.pos(k.width() / 2, k.height() / 2), k.anchor("center")]);
    k.add([k.text("Right - Move Right", {
        size: 16
    }), k.pos(k.width() / 2, k.height() / 2 + 20), k.anchor("center")]);
    k.add([k.text("Z - Attack", {
        size: 16
    }), k.pos(k.width() / 2, k.height() / 2 + 40), k.anchor("center")]);
    const back = k.add([
        k.rect(100, 30, {radius: 2}),
        k.pos(k.width() / 2, k.height() / 2 + 100),
        k.area(),
        k.anchor("center"),
        k.color(),
    ])
    back.add([
        k.text("Back", {size: 16}),
        k.pos(),
        k.anchor("center"),
        k.color(0, 0, 0),
    ])
    back.onClick(() => {
        k.go("home");
    });
    back.onHover(() => {
        back.color.r = 150;
        back.color.g = 150;
        back.color.b = 150;
    });
    back.onHoverEnd(() => {
        back.color.r = 255;
        back.color.g = 255;
        back.color.b = 255;
    });
};