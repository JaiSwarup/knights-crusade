import k from "../kaboomCtx.js";

export function makeCrawler(initialPos) {
    const crawler = k.make([
        k.sprite("crawler"),
        k.pos(initialPos),
        k.anchor("bot"),
        k.offscreen({ distance: 16 }),
        k.area({ shape: new k.Rect(k.vec2(1), 16, 16) }),
        k.state("patrol-left", ["patrol-right", "patrol-left", "alert", "attack", "retreat"]),
        k.body(),
        k.health(1),
        "enemy",
        "crawler",
        {
            speed: 40,
            pursuitSpeed: 100,
            range: 100,
            setBehaviour() {
                const player = k.get("player", { recursive: true })[0];

                this.onStateEnter("patrol-right", async () => {
                    await k.wait(1);
                    if (this.state === "patrol-right") {
                        this.enterState("patrol-left");
                    }
                });

                this.onStateUpdate("patrol-right", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert");
                        return;
                    }
                    this.flipX = false;
                    this.move(this.speed, 0);
                    if (this.curAnim() !== "walk") this.play("walk");
                });

                this.onStateEnter("patrol-left", async () => {
                    await k.wait(1);
                    if (this.state === "patrol-left") {
                        this.enterState("patrol-right");
                    }
                });

                this.onStateUpdate("patrol-left", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert");
                        return;
                    }
                    this.flipX = true;
                    this.move(-this.speed, 0);
                    if (this.curAnim() !== "walk") this.play("walk");
                });

                this.onStateEnter("alert", async () => {
                    await k.wait(0.5);
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("attack");
                        return;
                    }
                    this.enterState("patrol-right");
                });

                this.onStateUpdate("attack", () => {
                    if (this.pos.dist(player.pos) > this.range) {
                        this.enterState("retreat");
                        return;
                    }
                    this.moveTo(k.vec2(player.pos.x, this.pos.y), this.pursuitSpeed);
                });
                this.onStateEnter("retreat", async () => {
                    await k.wait(1);
                    if (this.state === "retreat") {
                        this.enterState("patrol-right");
                    }
                });
                this.onStateUpdate("retreat", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert");
                        return;
                    } else this.moveTo(k.vec2(initialPos.x, 0), this.pursuitSpeed);
                });
            },
            setEvents() {
                const player = k.get("player", { recursive: true })[0];

                this.onCollide("player", () => {
                    if (player.isAttacking) return;
                    this.hurt(1);
                });

                this.on("hurt", () => {
                    this.play("dead");
                });
                this.onDeath(()=>k.destroy(this));

                this.onCollide("sword-hitbox", () => {
                    this.hurt(1);
                });

                this.onExitScreen(() => {
                    if (this.pos.y > 320) k.destroy(this);
                    this.pos = initialPos;
                });
            },
        }
    ]);

    return crawler;
}


export function makeHelibug(initialPos){
    const helibug = k.make([
        k.sprite("helibug"),
        k.pos(initialPos),
        k.anchor("bot"),
        k.offscreen({ distance: 16 }),
        k.area({ shape: new k.Rect(k.vec2(1), 16, 16) }),
        k.state("patrol-left", ["patrol-right", "patrol-left", "alert", "attack"]),
        k.body({gravityScale: 0}),
        k.health(1),
        "enemy",
        "helibug",
        {
            speed: 60,
            pursuitSpeed: 60,
            range: 100,
            setBehaviour() {
                const player = k.get("player", { recursive: true })[0];

                this.onStateEnter("patrol-right", async () => {
                    await k.wait(1);
                    if (this.state === "patrol-right") {
                        this.enterState("patrol-left");
                    }
                });
                this.onStateUpdate("patrol-right", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert");
                        return;
                    }
                    this.flipX = false;
                    this.move(this.speed, 0);
                    if (this.curAnim() !== "fly") this.play("fly");
                });
                this.onStateEnter("patrol-left", async () => {
                    await k.wait(1);
                    if (this.state === "patrol-left") {
                        this.enterState("patrol-right");
                    }
                });
                this.onStateUpdate("patrol-left", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert");
                        return;
                    }
                    this.flipX = true;
                    this.move(-this.speed, 0);
                    if (this.curAnim() !== "fly") this.play("fly");
                });
                this.onStateEnter("alert", async () => {
                    await k.wait(1);
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("attack");
                        return;
                    }
                    this.enterState("patrol-left");
                });
                this.onStateUpdate("attack", () => {
                    if (this.pos.dist(player.pos) > this.range) {
                        this.enterState("alert");
                        return;
                    }
                    this.moveTo(player.pos, this.pursuitSpeed);
                });
            },
            setEvents() {
                const player = k.get("player", { recursive: true })[0];

                this.onCollide("player", () => {
                    if (player.isAttacking) return;
                    this.hurt(1);
                });

                this.onCollide("sword-hitbox", () => {
                    this.hurt(1);
                });

                this.on("hurt", () => {
                    if (this.hp() <= 0) {
                        k.destroy(this);
                        return;
                    }
                });
                this.onExitScreen(() => {
                    this.pos = initialPos;
                });
            }
        }
    ]);

    return helibug;
}