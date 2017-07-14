import * as fs from 'fs';
import * as ts from 'typescript';
import {SourceFile} from 'typescript';

const sourceFile = ts.createSourceFile(
    'example.ts',
    fs.readFileSync('./example.ts').toString(),
    ts.ScriptTarget.ES2015,
    true,
    ts.ScriptKind.TS
);

const transformer = <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
        function visit(node: ts.Node): ts.Node {
            console.log(`Visiting ${ts.SyntaxKind[node.kind]}`);
            if (node.kind === ts.SyntaxKind.BinaryExpression) {
                const binary = node as ts.BinaryExpression;

                if (binary.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
                    const pae = binary.left as ts.PropertyAccessExpression;

                    if (pae.expression.kind === ts.SyntaxKind.Identifier) {
                        const id = pae.expression as ts.Identifier;

                        if (id.text === '$scope') {
                            return ts.createAssignment(ts.createPropertyAccess(ts.createThis(), pae.name), binary.right);
                        }
                    }
                }
            }

            return ts.visitEachChild(node, visit, context);
        }

        function lookupConstructor(node: ts.Node): ts.Node {
            if (node.kind === ts.SyntaxKind.Constructor) {
                const constr = node as ts.ConstructorDeclaration;

                console.log(constr.body);
            }

            return ts.visitEachChild(node, lookupConstructor, context);
        }

        function lookupClass(node: ts.Node): ts.Node {
            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                const clazz = node as ts.ClassDeclaration;

                return ts.visitEachChild(node, lookupConstructor, context);
            }

            return ts.visitEachChild(node, lookupClass, context);
        }

        return ts.visitNode(rootNode, lookupClass);
    };

const result = ts.transform<SourceFile>(sourceFile, [transformer]);
const printer = ts.createPrinter();

for (let file of result.transformed) {
    console.log(printer.printFile(file));
}