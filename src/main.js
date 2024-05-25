import k from "./kaboomCtx.js";
import {level1} from "./scenes/level1.js";
import {home} from "./scenes/home.js";
import { controls } from "./scenes/controls.js";
import { loader } from "./loader.js";

loader.sprites();
k.scene("level1", async () => { 
  await level1(k);
});
k.scene("home", () => { home(); });
k.scene("controls", () => { controls(); });

k.go("home");
