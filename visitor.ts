import * as fs from 'fs';
import * as path from 'path';
import {
    Bundle,
    createPrinter,
    createSourceFile,
    Node,
    ScriptKind,
    ScriptTarget,
    SourceFile,
    SyntaxKind,
    transform,
    TransformationContext,
    TransformationResult,
    visitEachChild,
    visitNode,
    VisitResult
} from 'typescript';
// import {replacements} from './replace_scope';
// import {replacements} from './service_mocks';
import {SyntaxKindKeys} from './syntax_kind';

export type SyntaxKindKey = {
    [key: string]: Transformer
}

export type Visitor = (node: Node) => Node;

export interface ITransform {
    visit?(node: Node): Node;

    leave?(node: Node): Node;

    filter?(node: Node): boolean;
}

export type Transformer = ITransform | Visitor;

const Kinds = new SyntaxKindKeys();

export function logNode(node: Node, full = false) {
    const [kind] = Object.keys(Kinds).filter(key => Kinds[key] === node.kind);
    console.log(`${kind} (${node.kind})`);
    if (full) {
        console.log(console.log(node));
    }
}

export class Traversal {

    constructor(private node: Node) {
    }

    traverse(r: Transformer): TransformationResult<Node> {
        const transformer = <T extends Node>(context: TransformationContext) =>
            (rootNode: T) => {
                return visitNode(rootNode, (node) => this.traverseChild(node, r, context));
            };
        return transform<Node>(this.node, [transformer]);
    }

    traverseChild(node: Node, transformer: Transformer, context: TransformationContext): VisitResult<Node> {
        for (let key of Object.keys(transformer)) {
            if (key === 'visit' || key === 'leave' || key === 'filter' || key.indexOf('_') === 0) {
                continue;
            }

            const t = transformer[key] as ITransform;

            if (node.kind === Kinds[key] && (!t.filter || t.filter(node))) {
                logNode(node);
                return this.doTraverse(context, node, transformer[key]);
            }
        }

        return visitEachChild(node, (n) => this.traverseChild(n, transformer, context), context);
    }

    doTraverse(context: TransformationContext, rootNode: Node, r: Transformer): VisitResult<Node> {
        const transformer = r as ITransform;
        let result: Node | Node[] = rootNode;

        if (transformer.visit) {
            // console.log(`visit (kind=${rootNode.kind})`);
            result = transformer.visit(rootNode);
        }

        const traverseResult = visitEachChild(rootNode, (node) => this.traverseChild(node, r, context), context);

        if (transformer.leave) {
            // console.log('leave');
            result = transformer.leave(traverseResult);
        }

        return result === rootNode ? traverseResult : result;
    }
}

export function transformFile(inputPath: string, outputPath: string, replacements: (ITransform & { [key: string]: any })[]) {
    const filename = path.basename(inputPath);
    const sourceFile = createSourceFile(
        filename,
        fs.readFileSync(inputPath).toString(),
        ScriptTarget.ES2015,
        true,
        ScriptKind.TS
    );

    let result: TransformationResult<Node>;
    for (let replacement of replacements) {
        result = new Traversal(result ? result.transformed[0] : sourceFile).traverse(replacement);
    }

    const printer = createPrinter();

    const print = (sourceFile: SourceFile) => {
        const content = printer.printFile(sourceFile);

        // console.log('=============================================');
        // console.log(content);
        // console.log('=============================================');

        fs.writeFileSync(path.join(outputPath, sourceFile.fileName), content);
    };

    for (let node of result.transformed) {
        logNode(node);

        switch (node.kind) {
            case SyntaxKind.Bundle:
                const bundle = node as Bundle;

                for (let file of bundle.sourceFiles) {
                    print(file);
                }
                break;
            case SyntaxKind.SourceFile:
                print(node as SourceFile);
                break;
            default:
                console.log('Cannot print this node');
        }
    }

}