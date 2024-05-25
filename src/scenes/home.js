import k from "../kaboomCtx.js";
import { setBackground } from "../utils/background.js";

export function home(){
    setBackground();
    k.add([k.text("Knight's Crusade", {
        size: 32
    }), k.pos(k.width() / 2, k.height() / 2 - 20), k.anchor("center")]);
    k.onKeyPress("enter", () => {
        k.go("level1");
    });
    const start = k.add([
        k.rect(100, 30, {radius: 2}),
        k.pos(k.width() / 2, k.height() / 2 + 40),
        k.area(),
        k.anchor("center"),
        k.color(),
    ])
    start.add([
        k.text("Start", {size: 16}),
        k.pos(),
        k.anchor("center"),
        k.color(0, 0, 0),
    ])
    start.onClick(() => {
        k.go("level1");
    });
    start.onHover(() => {
        start.color.r = 150;
        start.color.g = 150;
        start.color.b = 150;
    });
    start.onHoverEnd(() => {
        start.color.r = 255;
        start.color.g = 255;
        start.color.b = 255;
    });
    const controls = k.add([
        k.rect(100, 30, {radius: 2}),
        k.pos(k.width() / 2, k.height() / 2 + 80),
        k.area(),
        k.anchor("center"),
        k.color(),
    ])
    controls.add([
        k.text("Controls", {size: 16}),
        k.pos(),
        k.anchor("center"),
        k.color(0, 0, 0),
    ])
    controls.onClick(() => {
        k.go("controls");
    });
    controls.onHover(() => {
        controls.color.r = 150;
        controls.color.g = 150;
        controls.color.b = 150;
    });
    controls.onHoverEnd(() => {
        controls.color.r = 255;
        controls.color.g = 255;
        controls.color.b = 255;
    });
}