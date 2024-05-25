import { setBackground } from "../utils/background.js";
import { makePlayer} from "../utils/makePlayer.js";
import { makeMap } from "../entities/makeMap.js";
import { makeCrawler, makeHelibug } from "../entities/makeEnemies.js";
import { makeMoving, makeTemp } from "../entities/makePlatforms.js";
import { makeChest, makeDoor, makeKey } from "../entities/makeObjects.js";
import { dialog } from "./dialog.js";
import { updateHp } from "../ui/updateHp.js";
import { makeCoin } from "../entities/makeObjects.js";
import { updateScore } from "../ui/updateScore.js";
import { state } from "../states/globalStateManager.js";

export async function level1(k){
    k.setGravity(800);
    setBackground();
    state.construct();

    const {map, spawnPoints} = await makeMap("level-1");
    
    const player = makePlayer();
    k.onUpdate(()=>{
        if (player.pos.x > 160 && player.pos.x < 1280){
            k.camPos(player.pos.x + 80, k.height()/2);
        }
    });
    let crawler;
    let helibug;
    let temp;
    let door;
    let key;
    let chest;
    let coin;
    console.log(spawnPoints)
    for (const point of spawnPoints){
        if (point["name"] === "player") 
            player.setPosition(point.x, point.y);
        if (point["name"] === "crawler")
            crawler = makeCrawler(k.vec2(point.x, point.y)); 
        if (point["name"] === "helibug")
            helibug = makeHelibug(k.vec2(point.x, point.y));
        if (point["name"] === "temp-plat"){
            temp = makeTemp(k.vec2(point.x, point.y));
            temp.setEvents();
        }
        if (point["name"] === "exit"){
            door = makeDoor(k.vec2(point.x, point.y));
            door.setEvents();
            map.add(door);
        }
        if (point["name"] === "moving-plat"){
            makeMoving(k.vec2(point.x, point.y), 48);
        }
        if (point["name"] === "key"){
            key = makeKey(k.vec2(point.x, point.y));
            map.add(key);
        }
        if (point["name"] === "chest"){
            chest = makeChest(k.vec2(point.x, point.y));
            map.add(chest);
        }
        if (point["name"] === "coin"){
            coin = makeCoin(k.vec2(point.x, point.y));
            coin.setEvents();
            map.add(coin);
        }
    }
    map.paused = !map.paused;
    dialog(
        [{"char":"player", "head":"Knight", "msg":"Hello, I am the Knight. I am on a quest to save the princess. I need your help to defeat the monsters and save the princess. Are you ready?"},{"char":"player", "head":"Knight", "msg":"Great! Let's go!"}]
    );
    map.paused = !map.paused;
    player.setControlHandlers();
    player.setEvents();
    map.add(player);
    helibug?.setEvents()
    helibug?.setBehaviour();
    map.add(helibug);
    crawler?.setEvents();
    crawler?.setBehaviour();
    map.add(crawler);
    key?.setEvents();
    chest?.setEvents();

    map.add(updateHp());
    map.add(updateScore());
} 
