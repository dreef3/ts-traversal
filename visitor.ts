import * as fs from 'fs';
import * as ts from 'typescript';
import {replacement} from './replace_scope';
import {SyntaxKindKeys} from './syntax_kind';

export type SyntaxKindKey = {
    [key in keyof SyntaxKindKeys]: SyntaxKindKey | ITransform
    }

export type Visitor = (node: ts.Node) => ts.Node;

export interface ITransform {
    visit?(node: ts.Node): ts.Node;

    leave?(node: ts.Node): ts.Node;

    [key: string]: Transformer;
}

export type Transformer = SyntaxKindKey | ITransform | Visitor;

export class Traversal {

    private static keys = new SyntaxKindKeys();

    constructor(private node: ts.Node) {
    }

    traverse(r: Transformer): ts.TransformationResult<ts.Node> {
        const transformer = <T extends ts.Node>(context: ts.TransformationContext) =>
            (rootNode: T) => {
                return ts.visitNode(rootNode, (node) => this.doTraverse(context, node, r));
            };
        return ts.transform<ts.Node>(this.node, [transformer]);
    }

    doTraverse(context: ts.TransformationContext, rootNode: ts.Node, r: Transformer): ts.Node {
        const transformer = r as ITransform;
        let result: ts.Node = rootNode;

        if (transformer.visit) {
            console.log(`visit (kind=${rootNode.kind})`);
            result = transformer.visit(rootNode);
        }

        const traverseResult = ts.visitEachChild(rootNode, (node: ts.Node) => {
            for (let key of Object.keys(r)) {
                if (key === 'visit' || key === 'leave') {
                    continue;
                }

                console.log(`key=${key} kind=${node.kind} keyKind=${Traversal.keys[key]}`);
                if (node.kind === Traversal.keys[key]) {
                    console.log('match, traversing');
                    return this.doTraverse(context, node, r[key]);
                }
            }

            return node;
        }, context);


        if (transformer.leave) {
            console.log('leave');
            result = transformer.leave(result);
        }

        return result === rootNode ? traverseResult : result;
    }
}

const sourceFile = ts.createSourceFile(
    'example.ts',
    fs.readFileSync('./example.ts').toString(),
    ts.ScriptTarget.ES2015,
    true,
    ts.ScriptKind.TS
);

new Traversal(sourceFile).traverse(replacement);