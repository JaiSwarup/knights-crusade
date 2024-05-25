import {state, statePropsEnum} from "../states/globalStateManager.js";
import k from "../kaboomCtx.js";

export function makePlayer() {
    const player = k.make([
        k.sprite("player", {
            anim : "idle",
        }),
        k.pos(),
        k.scale(0.75),
        k.anchor("center"),
        k.area({shape : new k.Rect(k.vec2(1), 32, 32)}),
        k.body({mass : 100, jumpForce : 400}),
        k.health(state.current().playerHp),
        {
          speed: 120,
          isAttacking: false,
          controlHandlers: [],
          hasKey: false,
          setPosition(x, y) {
            this.pos.x = x;
            this.pos.y = y;
          },
          setControlHandlers() {
            this.controlHandlers = [];
    
            this.controlHandlers.push(
              k.onKeyPress((key) => {
                if (key === "x") {
                  if (this.curAnim() !== "jump" && this.isGrounded()) {
                    this.play("jump");
                    this.jump();
                  }
                }
    
                if (key === "z" && this.curAnim() !== "attack" && this.isGrounded()) {
                  this.isAttacking = true;
                  const attack = this.add([
                    k.sprite("slash", { anim: "attack" }),
                    k.pos(this.flipX ? -48 : 16, 0),
                    k.area({ shape: new k.Rect(k.vec2(1), 32, 32) }),
                    k.anchor("left"),
                    "sword-hitbox",
                  ]);
                  if (this.flipX) attack.flipX = true;
                  this.play("attack");
    
                  this.onAnimEnd((anim) => {
                    if (anim === "attack") {
                      const swordHitbox = k.get("sword-hitbox", { recursive: true })[0];
                      if (swordHitbox) k.destroy(swordHitbox);
                      this.isAttacking = false;
                      this.play("idle");
                    }
                  });
                }
              })
            );
    
            this.controlHandlers.push(
              k.onKeyDown((key) => {
                if (key === "left" && !this.isAttacking) {
                  if (this.curAnim() !== "run" && this.isGrounded()) {
                    this.play("run");
                  }
                  this.flipX = true;
                  this.move(-this.speed, 0);
                  return;
                }
    
                if (key === "right" && !this.isAttacking) {
                  if (this.curAnim() !== "run" && this.isGrounded()) {
                    this.play("run");
                  }
                  this.flipX = false;
                  this.move(this.speed, 0);
                  return;
                }
              })
            );
    
            this.controlHandlers.push(
              k.onKeyRelease(() => {
                if (
                  this.curAnim() !== "idle" &&
                  this.curAnim() !== "jump" &&
                  this.curAnim() !== "fall" &&
                  this.curAnim() !== "attack"
                )
                  this.play("idle");
              })
            );
          },
          setEvents() {
            // when player falls after jumping
            this.onFall(() => {
              this.play("fall");
            });
    
            // when player falls off a platform
            this.onFallOff(() => {
              this.play("fall");
            });
            this.onGround(() => {
              this.play("idle");
            });
            this.onAnimEnd((anim) => {
              if (anim === "attack" || anim === "run"|| anim === "damage") {
                this.play("fall");
              }
            });
            this.onHeadbutt(() => {
              this.play("fall");
            });
    
            this.on("heal", () => {
              state.set(statePropsEnum.playerHp, this.hp());
            });
    
            this.on("hurt", () => {
              this.play("damage");
              state.set(statePropsEnum.playerHp, this.hp());
              this.moveTo(this.pos.add(k.vec2((this.flipX ? 32 : -32), -16)), 1);
            });
    
            this.onDeath(async () => {
              await k.wait(1);
              k.go("home");
            });
            this.onCollide("enemy", (enemy) => {
              if(this.isAttacking){
                  k.destroy(enemy);
              }else{
                  this.play("damage");
                  this.hurt(1);
              }
          });
          },
        },
        "player"
    ]);
    k.onUpdate(() => {
        if (player.pos.y > 320) {
            k.go("home");
        }
    });
    
    return player;
}
