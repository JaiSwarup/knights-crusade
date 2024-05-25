import k from "../kaboomCtx.js";
 
export function makeTemp(initialPos){
    const platform = k.add([
        k.sprite("temp"),
        k.pos(initialPos),
        k.area({shape : new k.Rect(k.vec2(0, -8), 48, 4)}),
        k.anchor("center"),
        k.body({isStatic : true}),
        {
            lifespan : 1,
            setEvents(){
                this.onCollide("player", async () => {
                    await k.wait(this.lifespan);
                    k.destroy(this);
                });
                this.onDestroy(async ()=>{
                    await k.wait(this.lifespan);
                    k.add(this);
                })
                this.onBeforePhysicsResolve((col)=>{
                    if (col.target.is("player") && (col.isBottom() || col.isLeft() || col.isRight())){
                        col.preventResolution();
                    }
                });
            }
        },
        "passthrough"
    ])
    return platform;
}

export function makeMoving(initialPos, range){
    const platform = k.add([
        k.sprite("move"),
        k.pos(initialPos),
        k.area(),
        k.anchor("center"),
        k.body({isStatic : true}),
        {
            range : range,
            dir : 1,
        },
        "moving"  
    ])
    k.onUpdate("moving", ()=>{
        if (platform.dir === 1){
            platform.move(20, 0);
            if (platform.pos.x > initialPos.x + range){
                platform.dir = -1;
            }
        } else {
            platform.move(-20, 0);
            if (platform.pos.x < initialPos.x){
                platform.dir = 1;
            }
        }
    });
    return platform;
}
