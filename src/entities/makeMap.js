import k from "../kaboomCtx.js";
import { loader } from "../loader.js";
export async function makeMap(level){

    const data = await (await fetch(`./sprites/${level}.json`)).json();

    loader.sprites();
    
    const spawnPoints = data["layers"].find((layer) => layer["id"] === 4)["objects"];

    const colliders = data["layers"].find((layer) => layer["id"] === 2)["objects"];

    const map = k.add([k.sprite(level), k.pos(0, 0), k.timer(),]);
    for (let collider of colliders){
        k.add([
            k.pos(collider["x"], collider["y"]),
            k.area({shape : new k.Rect(k.vec2(0),collider["width"], collider["height"]), collisionIgnore : ["collider"]}),
            k.body({isStatic : true}),
            "collider",
        ]);
    }
    return {map, spawnPoints};
}
   