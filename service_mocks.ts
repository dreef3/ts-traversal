import {
    CallExpression,
    ClassDeclaration,
    createBlock, createBundle,
    createClassDeclaration,
    createExpressionWithTypeArguments,
    createHeritageClause,
    createIdentifier,
    createInterfaceDeclaration,
    createMethod,
    createMethodSignature, createPrinter,
    createReturn, createSourceFile,
    createToken,
    Decorator, EmitHint,
    Identifier,
    InterfaceDeclaration,
    MethodDeclaration,
    MethodSignature, ScriptTarget,
    SourceFile,
    SyntaxKind
} from 'typescript';
import {ITransform} from './visitor';

interface IServiceMocksContext {
    classes: ClassDeclaration[];
    interfaces: InterfaceDeclaration[];
    sourceFile: SourceFile;
}

const context: IServiceMocksContext = {classes: [], interfaces: [], sourceFile:  null};

export const replacements: (ITransform & { [key: string]: any })[] = [{
    SourceFile: {
        visit(node: SourceFile) {
            context.sourceFile = node;
            return node;
        },

        InterfaceDeclaration: {
            visit(node: InterfaceDeclaration) {
                context.interfaces.push(node);
                return node;
            }
        },

        ClassDeclaration: {
            filter(node: ClassDeclaration): boolean {
                return node.decorators && node.decorators.some((decorator: Decorator) => {
                    return decorator.expression.kind === SyntaxKind.CallExpression
                        && (decorator.expression as CallExpression).expression.kind === SyntaxKind.Identifier
                        && ((decorator.expression as CallExpression).expression as Identifier).text === 'Injectable';
                });
            },

            visit(node: ClassDeclaration) {
                context.classes.push(node);
                return node;
            }
        },

        leave(node: SourceFile) {
            const pending = context.classes.filter(clazz => {
                return !context.interfaces.some(iface => {
                    return iface.name.text.endsWith(clazz.name.text);
                });
            });

            const interfaces = pending.map(clazz => {
                console.log(`Will add interface for ${clazz.name.text}`);
                return createInterfaceDeclaration(
                    undefined,
                    [createToken(SyntaxKind.ExportKeyword)],
                    `I${clazz.name.text}`,
                    undefined,
                    undefined,
                    clazz.members
                        .filter(member => member.kind === SyntaxKind.MethodDeclaration)
                        .map(member => {
                            const method = member as MethodDeclaration;

                            console.log(`    - ${(method.name as Identifier).text}`);
                            console.log(method.type.getText());

                            return createMethodSignature(
                                method.typeParameters,
                                method.parameters,
                                method.type,
                                (method.name as Identifier).text,
                                undefined
                            );
                        })
                );
            });

            const mocks = interfaces.map(iface => {
                return createClassDeclaration(
                    undefined,
                    [createToken(SyntaxKind.ExportKeyword)],
                    `${iface.name.text.substring(1)}Mock`,
                    iface.typeParameters,
                    [
                        createHeritageClause(SyntaxKind.ImplementsKeyword, [
                            createExpressionWithTypeArguments([], iface.name)
                        ])
                    ],
                    iface.members
                        .filter(member => member.kind === SyntaxKind.MethodSignature)
                        .map((member) => {
                            const method = member as MethodSignature;

                            return createMethod(
                                undefined,
                                undefined,
                                undefined,
                                (method.name as Identifier).text,
                                undefined,
                                method.typeParameters,
                                method.parameters,
                                method.type,
                                createBlock([
                                    createReturn(
                                        createIdentifier('undefined')
                                    )
                                ])
                            );
                        })
                )
            });

            const printer = createPrinter();
            const interfacesContent = interfaces
                .map(iface => printer.printNode(EmitHint.Unspecified, iface, context.sourceFile))
                .join('\n');

            const newFile = createSourceFile(
                node.fileName,
                node.text + interfacesContent,
                ScriptTarget.ES2015
            );
            const mockFiles = mocks.map(mockClass => {
                // TODO correct file name
                const filename = (mockClass.name.text.substring(0, 1).toLowerCase()
                    + mockClass.name.text.substring(1)).replace('Mock', '')
                    + `.mock.ts`;

                return createSourceFile(
                    filename,
                    printer.printNode(EmitHint.Unspecified, mockClass, context.sourceFile),
                    ScriptTarget.ES2015
                );
            });

            return createBundle(
                [newFile].concat(mockFiles)
            )
        }
    }
}];