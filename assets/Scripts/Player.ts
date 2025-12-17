import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    start() {
        console.log('Player script started.');
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
    }

    private onKeyDown(event: EventKeyboard) {
        console.log('Key Down: ' + event.keyCode);
    }

    private onKeyUp(event: EventKeyboard) {
        console.log('Key Up: ' + event.keyCode);
    }

    private onKeyPressing(event: EventKeyboard) {
        const currentPos = this.node.position;
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.node.setPosition(currentPos.x - 0.2, currentPos.y, currentPos.z);
                break;
            case KeyCode.KEY_D:
                this.node.setPosition(currentPos.x + 0.2, currentPos.y, currentPos.z);
                break;
            case KeyCode.KEY_W:
                this.node.setPosition(currentPos.x, currentPos.y, currentPos.z - 0.2);
                break;
            case KeyCode.KEY_S:
                this.node.setPosition(currentPos.x, currentPos.y, currentPos.z + 0.2);
                break;
        }
    }
}
