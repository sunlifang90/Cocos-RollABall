import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Food')
export class Food extends Component {
    start() {

    }

    update(deltaTime: number) {
        const eulerAngles = this.node.eulerAngles;
        this.node.setRotationFromEuler(eulerAngles.x, eulerAngles.y + 1, eulerAngles.z);
    }
}


