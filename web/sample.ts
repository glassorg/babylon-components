import { hello } from "../src/index.js";

const element = document.createElement("div");
element.innerHTML = `Hello ${hello}`;

document.body.appendChild(element);

