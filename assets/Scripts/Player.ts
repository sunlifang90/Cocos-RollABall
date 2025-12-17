import { _decorator, Collider, Component, EventKeyboard, ICollisionEvent, Input, input, KeyCode, Node, RigidBody, Vec2, Vec3 } from 'cc';
import { Food } from './Food';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property
    private speed: number = 5;
    @property
    private moveForce: number = 5;
    private movDir: Vec2 = new Vec2(0, 0);

    private rgb:RigidBody = null;
    private collider:Collider = null;

    start() {
        this.rgb = this.getComponent(RigidBody);
        this.collider = this.getComponent(Collider);

        console.log('Player script started.');
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);

        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onCollisionExit', this.onCollisionExit, this);
        this.collider.on('onCollisionStay', this.onCollisionStay, this);
    }

    update(deltaTime: number) {
         //const currentPos = this.node.position;
         //this.node.setPosition(currentPos.x + this.movDir.x * this.speed * deltaTime, currentPos.y, currentPos.z + this.movDir.y * this.speed * deltaTime);
        this.rgb.applyForce(new Vec3(this.movDir.x, 0, this.movDir.y).multiplyScalar(this.moveForce));
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);

        this.collider.off('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.off('onCollisionExit', this.onCollisionExit, this);
        this.collider.off('onCollisionStay', this.onCollisionStay, this);
    }

    /**
     * 设置移动方向
     * @param event 
     */
    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                //设置左移
                this.movDir = new Vec2(-1, this.movDir.y);
                break;
            case KeyCode.KEY_D:
                //设置右移
                this.movDir = new Vec2(1, this.movDir.y);
                break;
            case KeyCode.KEY_W:
                //设置前进
                this.movDir = new Vec2(this.movDir.x, -1);
                break;
            case KeyCode.KEY_S:
                //设置后退
                this.movDir = new Vec2(this.movDir.x, 1);
                break;
        }
    }

    /**
     * 清空移动方向
     * @param event 
     */
    private onKeyUp(event: EventKeyboard) {
                switch (event.keyCode) {
            case KeyCode.KEY_A:
                //停止左移
                this.movDir.x = 0;
                break;
            case KeyCode.KEY_D:
                //停止右移
                this.movDir.x = 0;
                break;
            case KeyCode.KEY_W:
                //停止前进
                this.movDir.y = 0;
                break;
            case KeyCode.KEY_S:
                //停止后退
                this.movDir.y = 0;
                break;
        }
    }

    private onKeyPressing(event: EventKeyboard) {


        
    }

    private onCollisionEnter(event: ICollisionEvent) {
        event.otherCollider.getComponent(Food)?.node.destroy();
    }

    private onCollisionExit(event: ICollisionEvent) {
        //console.log('Player onCollisionExit', event);
    }

    private onCollisionStay(event: ICollisionEvent) {
        //console.log('Player onCollisionStay', event);
    }
}
