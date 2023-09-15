import * as BABYLON from "babylonjs";
import { NodeProperties, babylonNode } from "./NodeFactory.js";

interface FreeCameraProperties extends NodeProperties {
    name: string
    position: BABYLON.Vector3
    target: BABYLON.Vector3
    children: never[]
    _attach?: HTMLCanvasElement
}
export const FreeCamera = babylonNode(BABYLON.FreeCamera, ({ name, position, _attach }: FreeCameraProperties) => {
    const node = new BABYLON.FreeCamera(name, position)
    node.attachControl(_attach, true);
    return node;
});

interface HemisphericLightProperties extends NodeProperties {
    name: string
    direction: BABYLON.Vector3
    intensity?: number
    children: never[]
}
export const HemisphericLight = babylonNode(BABYLON.HemisphericLight, ({ name, direction }: HemisphericLightProperties) => new BABYLON.HemisphericLight(name, direction));
