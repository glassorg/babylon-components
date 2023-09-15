import { Canvas } from "@glas/components/html/elements";
import { customElement } from "@glas/components/html/CustomElementFactory";
import * as BABYLON from "babylonjs";
import { FreeCamera, HemisphericLight } from "../src/nodes/nodes.js";

const RootCanvas = customElement(function () {
    const canvas = this;
    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    const createScene = function () {

        const scene = new BABYLON.Scene(engine);    // Creates a basic Babylon Scene object.

        // const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10)); // Creates and positions a free camera.
        // camera.setTarget(BABYLON.Vector3.Zero());   // Targets the camera to scene origin.
        // camera.attachControl(canvas, true);         // This attaches the camera to the canvas.
        FreeCamera({ name: "camera1", position: new BABYLON.Vector3(0, 5, -10), target: BABYLON.Vector3.Zero() }).build();

        // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0)); // Creates a light, aiming 0,1,0 - to the sky.
        // light.intensity = 0.7; // Dim the light a small amount - 0 to 1
        HemisphericLight({ name: "light", direction: new BABYLON.Vector3(0, 1, 0), intensity: 0.7 }).build();

        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }); // Built-in 'sphere' shape.
        sphere.position.y = 1; // Move the sphere upward 1/2 its height.

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }); // Built-in 'ground' shape.

        return scene;
    };
    const scene = createScene(); //Call the createScene function
    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });
    // // Watch for browser/canvas resize events
    // window.addEventListener("resize", function () {
    //     engine.resize();
    // });
    return Canvas({ width: 400, height: 400, style: { background: "beige", border: "solid 1px black" } });
}, { extends: "canvas" });


document.body.appendChild(RootCanvas().build());
