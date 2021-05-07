import { Block } from "@solidity-parser/parser/dist/src/ast-types";

import { Location, FinderType, Node, Position } from "./Node";

export class BlockNode implements Node {
    type: string;
    uri: string;
    astNode: Block;

    nameLoc?: Location | undefined;

    expressionNode?: Node | undefined;

    parent?: Node | undefined;
    children: Node[] = [];

    typeNodes: Node[] = [];

    constructor (block: Block, uri: string) {
        this.type = block.type;
        this.uri = uri;
        this.astNode = block;
    }

    getTypeNodes(): Node[] {
        return this.typeNodes;
    }

    addTypeNode(node: Node): void {
        this.typeNodes.push(node);
    }

    getExpressionNode(): Node | undefined {
        return this.expressionNode;
    }

    setExpressionNode(node: Node | undefined): void {
        this.expressionNode = node;
    }

    getDefinitionNode(): Node {
        // TO-DO: Method not implemented
        return this;
    }

    getName(): string | undefined {
        return undefined;
    }

    addChild(child: Node): void {
        this.children.push(child);
    }

    setParent(parent: Node | undefined): void {
        this.parent = parent;
    }

    getParent(): Node | undefined {
        return this.parent;
    }

    accept(find: FinderType, orphanNodes: Node[], parent?: Node): Node {
        for (const statement of this.astNode.statements) {
            find(statement, this.uri).accept(find, orphanNodes, parent);
        }
        
        return this;
    }
}
