import {
    ArrowFunction,
    BinaryExpression,
    Block,
    ClassDeclaration,
    createCall,
    createClassDeclaration,
    createDecorator, createEmptyStatement,
    createIdentifier,
    createKeywordTypeNode,
    createLiteral,
    createMethod,
    createParameter,
    createProperty,
    createPropertyAccess,
    createThis,
    createToken,
    FunctionDeclaration,
    Identifier,
    Node,
    ParameterDeclaration,
    PropertyAccessExpression,
    SyntaxKind, Token
} from 'typescript';
import {SyntaxKindKeys} from './syntax_kind';
import {ITransform} from './visitor';

const ROOT_SCOPE_METHODS = ['$on'];

const context: {
    expr?: PropertyAccessExpression,
    properties?: Identifier[],
    methods?: { id: Identifier, fn: ArrowFunction }[],
    functions: FunctionDeclaration[],
    match: boolean,
    parameters: string[]
} = {
    match: false,
    properties: [],
    methods: [],
    functions: [],
    parameters: []
};

const kinds = new SyntaxKindKeys();

const diagnostic = (node: Node) => {
    const [kind] = Object.keys(kinds).filter(key => kinds[key] === node.kind);
    console.log(`matches ${kind} (${node.kind})`);
    return node;
};

export const replacements: (ITransform & { [key: string]: any })[] = [{
    ClassDeclaration: {
        Constructor: {
            Parameter: {
                filter: (node: Node): boolean => {
                    const param = node as ParameterDeclaration;

                    return param.name.kind === SyntaxKind.Identifier && ((param.name as Identifier).text === '$scope');
                },

                visit: (node: Node) => {
                    const param = node as ParameterDeclaration;
                    return createParameter([
                        createDecorator(createCall(createIdentifier('Inject'), undefined, [
                            createLiteral('$rootScope')
                        ]))
                    ], param.modifiers, param.dotDotDotToken, '$rootScope');
                }
            },

            Block: {
                ExpressionStatement: {
                    BinaryExpression: {
                        PropertyAccessExpression: {
                            visit: (node: Node) => {
                                context.expr = node as PropertyAccessExpression;
                                return node;
                            },

                            Identifier: {
                                visit: (node: Node) => {
                                    const expr = node as Identifier;
                                    if (context.expr.expression !== expr || expr.text !== '$scope') {
                                        return node;
                                    }

                                    context.properties.push(context.expr.name);

                                    return createThis();
                                }
                            }
                        }
                    },

                    CallExpression: {
                        PropertyAccessExpression: {
                            visit: (node: Node) => {
                                context.expr = node as PropertyAccessExpression;
                                return node;
                            },

                            Identifier: {
                                visit: (node: Node) => {
                                    const expr = node as Identifier;

                                    if (context.expr.expression !== expr || expr.text !== '$scope') {
                                        return node;
                                    }

                                    if (!ROOT_SCOPE_METHODS.some(method => method === context.expr.name.text)) {
                                        return node;
                                    }

                                    return createIdentifier('$rootScope');
                                }
                            }
                        }
                    }
                }
            }
        },

        leave: (node: Node) => {
            const clazz = node as ClassDeclaration;

            const props = [];
            for (let prop of context.properties) {
                props.push(createProperty(undefined,
                    [createToken(SyntaxKind.PrivateKeyword)],
                    prop,
                    undefined,
                    createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    undefined
                ));
            }

            return createClassDeclaration(
                clazz.decorators,
                clazz.modifiers,
                clazz.name,
                clazz.typeParameters,
                clazz.heritageClauses,
                clazz.members.slice().concat(props)
            );
        }
    }
}, {

    PropertyAccessExpression: {
        filter: (node: Node): boolean => {
            const expr = node as PropertyAccessExpression;

            return expr.name.kind === SyntaxKind.Identifier && ((expr.name as Identifier).text === '$scope');
        },

        visit: () => {
            return createThis();
        }
    }
}, {

    PropertyAccessExpression: {
        filter: (node: Node): boolean => {
            const expr = node as PropertyAccessExpression;

            return expr.expression.kind === SyntaxKind.Identifier && ((expr.expression as Identifier).text === '$scope');
        },

        visit: (node: PropertyAccessExpression) => {
            return createPropertyAccess(
                createThis(),
                node.name
            );
        }
    }
}, {
    ClassDeclaration: {
        Constructor: {
            Block: {
                BinaryExpression: {
                    filter: (node: Node): boolean => {
                        const expr = node as BinaryExpression;

                        return expr.operatorToken.kind === SyntaxKind.EqualsToken
                            && expr.left.kind === SyntaxKind.PropertyAccessExpression
                            && ((expr.left as PropertyAccessExpression).expression.kind === SyntaxKind.ThisKeyword)
                            && ((expr.left as PropertyAccessExpression).name.kind === SyntaxKind.Identifier)
                            && expr.right.kind === SyntaxKind.ArrowFunction
                            && ((expr.right) as ArrowFunction).body.kind === SyntaxKind.Block;
                    },

                    visit: (node: Node) => {
                        const expr = node as BinaryExpression;
                        const fn = expr.right as ArrowFunction;

                        context.methods.push({
                            id: (expr.left as PropertyAccessExpression).name,
                            fn
                        });

                        return createEmptyStatement();
                    }
                }
            }
        },

        leave: (node: Node) => {
            const clazz = node as ClassDeclaration;

            const methods = [];
            for (let {id, fn} of context.methods) {
                methods.push(createMethod(
                    [],
                    [],
                    undefined,
                    id,
                    undefined,
                    fn.typeParameters,
                    fn.parameters,
                    fn.type,
                    fn.body as Block
                ));
            }

            return createClassDeclaration(
                clazz.decorators,
                clazz.modifiers,
                clazz.name,
                clazz.typeParameters,
                clazz.heritageClauses,
                clazz.members.slice().concat(methods)
            );
        }
    }
}, {
    Identifier: {
        filter: (node: Node): boolean => {
            return (node as Identifier).text === '$scope';
        },

        visit: (node: Node): Node => {
            return createThis();
        }
    }
},
    {
        ClassDeclaration: {
            Constructor: {
                Parameter: {
                    filter: (node: Node): boolean => {
                        const expr = node as ParameterDeclaration;

                        return expr.parent && expr.parent.kind === SyntaxKind.Constructor
                            && expr.name.kind === SyntaxKind.Identifier;
                    },

                    visit: (node: Node): Node => {
                        const expr = node as ParameterDeclaration;

                        context.parameters.push((expr.name as Identifier).text);

                        return node;
                    }
                }
            }
        }
    },
    {
        ClassDeclaration: {
            Constructor: {
                Block: {
                    FunctionDeclaration: {
                        _functions: [],

                        Block: {
                            CallExpression: {
                                Identifier: {
                                    filter: (node: Node): boolean => {
                                        const expr = node as Identifier;

                                        return context.parameters.some(param => expr.text === param);
                                    },

                                    visit: (node: Node): Node => {
                                        const expr = node as Identifier;

                                        console.log(expr.text);

                                        return createPropertyAccess(
                                            createThis(),
                                            expr
                                        );
                                    }
                                }
                            },

                            PropertyAccessExpression: {
                                Identifier: {
                                    filter: (node: Node): boolean => {
                                        const expr = node as Identifier;

                                        return context.parameters.some(param => expr.text === param);
                                    },

                                    visit: (node: Node): Node => {
                                        const expr = node as Identifier;

                                        console.log(expr.text);

                                        return createPropertyAccess(
                                            createThis(),
                                            expr
                                        );
                                    }
                                }
                            }
                        },

                        leave: (node: Node): Node => {
                            context.functions.push(node as FunctionDeclaration);
                            return createEmptyStatement();
                        }
                    },

                    Identifier: {
                        filter: (node: Node): boolean => {
                            const expr = node as Identifier;

                            return context.functions.some(fn => fn.name.text === expr.text);
                        },

                        visit: (node: Node): Node => {
                            const expr = node as Identifier;

                            return createPropertyAccess(
                                createThis(),
                                expr
                            );
                        }
                    }
                }
            },

            leave: (node: Node) => {
                const clazz = node as ClassDeclaration;

                const methods = [];
                for (let fn of context.functions) {
                    methods.push(createMethod(
                        [],
                        [],
                        undefined,
                        fn.name,
                        undefined,
                        fn.typeParameters,
                        fn.parameters,
                        fn.type,
                        fn.body as Block
                    ));
                }

                return createClassDeclaration(
                    clazz.decorators,
                    clazz.modifiers,
                    clazz.name,
                    clazz.typeParameters,
                    clazz.heritageClauses,
                    clazz.members.slice().concat(methods)
                );
            }
        }
    }];
