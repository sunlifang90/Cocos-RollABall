import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowPlayer')
export class FollowPlayer extends Component {

    @property(Node)
    private playerNode: Node = null;

    // 相对偏移位置
    private offset: Vec3 = new Vec3();

    start() {
        // 计算初始偏移位置
        const cameraPos = this.node.position;
        const playerPos = this.playerNode.position;
        this.offset = new Vec3(
            cameraPos.x - playerPos.x,
            cameraPos.y - playerPos.y,
            cameraPos.z - playerPos.z
        );
        console.log(this.playerNode.position);
        console.log(this.node.position);
        console.log('FollowPlayer script started.', this.offset);
    }

    update(deltaTime: number) {
    }

    protected lateUpdate(dt: number): void {
        const playerPos = this.playerNode.position;
        this.node.setPosition(new Vec3(
            playerPos.x + this.offset.x,
            playerPos.y + this.offset.y,
            playerPos.z + this.offset.z
        ));
    }
}


