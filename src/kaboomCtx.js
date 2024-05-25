import kaboom from "../libs/kaboom.mjs";

const k = kaboom({
    height : 320,
    width : 480,
    global : false,
    letterbox : true,
    debug : true
});

// k.debug.inspect = true;

export default k;