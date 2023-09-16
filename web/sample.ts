import { Canvas } from "@glas/components/html/elements";
import { customElement } from "@glas/components/html/CustomElementFactory";
import * as BABYLON from "babylonjs";
import { Vector3 } from "babylonjs";
import { BabylonNode, FreeCamera, Ground, HemisphericLight, Sphere, Transform } from "../src/nodes/nodes.js";

const RootCanvas = customElement(function () {
    const canvas = this;
    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    const createScene = function () {

        const scene = new BABYLON.Scene(engine);    // Creates a basic Babylon Scene object.

        BabylonNode({ name: "root" },
            FreeCamera({ name: "camera1", position: new Vector3(0, 5, -10), target: Vector3.Zero() }),
            HemisphericLight({ name: "light", direction: new Vector3(0, 1, 0), intensity: 0.7 }),
            Transform({ name: "parent", position: new Vector3(0, 0, 0) },
                Sphere({ name: "a", diameter: 1.3, segments: 32, position: new Vector3(0, 1, 0) }),
                Sphere({ name: "b", diameter: 2.2, segments: 32, position: new Vector3(0, 2, 0) }),
                Sphere({ name: "c", diameter: 3, segments: 32, position: new Vector3(0, 3, 0) }),
                Ground({ name: "ground", width: 8, height: 4 })
            ),
        ).build()

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
