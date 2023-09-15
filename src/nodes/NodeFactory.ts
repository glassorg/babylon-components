import { ConfigureFactory } from "@glas/components/core/ConfigureFactory";
import { Factory } from "@glas/components/core/Factory";
import { Constructor } from "@glas/components/core/types";
import * as BABYLON from "babylonjs";

export interface NodeProperties {
    children: Factory<BABYLON.Node>[];
}

export class NodeFactory<T extends BABYLON.Node, Properties extends NodeProperties> extends ConfigureFactory<T, Properties> {

    constructor(
        type: Constructor<T>,
        properties: Properties,
        protected readonly factoryFunction: (properties: Properties) => T,
    ) {
        super(type, properties);
    }

    protected construct(): T {
        return this.factoryFunction(this.properties);
    }

}

export function babylonNode<T extends BABYLON.Node, P extends NodeProperties>(
    type: Constructor<T>,
    factoryFunction: (properties: P) => T,
): CreateFunction<T, P> {
    function create(propertiesOrFirstChild: P, ...otherChildren: Factory<BABYLON.Node>[]): Factory<T> {
        let properties: P | undefined;
        if (propertiesOrFirstChild instanceof Factory) {
            otherChildren.unshift(propertiesOrFirstChild);
        }
        else {
            properties = propertiesOrFirstChild;
        }
        properties ??= {} as P;
        properties.children = otherChildren;
        return new NodeFactory(type, properties, factoryFunction);
    }
    return create as unknown as CreateFunction<T, P>;
}

type ChildrenType<P> = P extends { children: Array<infer C> } ? P["children"] : never[];

export type CreateFunction<T extends BABYLON.Node, P extends object> = { children } extends P ? {
    (properties: Omit<P, "children">, ...children: ChildrenType<P>): Factory<T>,
    (...children: ChildrenType<P>): Factory<T>,
} : {
    (properties: Omit<P, "children">, ...children: ChildrenType<P>): Factory<T>,
};

