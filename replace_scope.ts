import * as ts from 'typescript';
import {SyntaxKindKey} from './visitor';

export const replacement: SyntaxKindKey = {
    ClassDeclaration: {
        Constructor: {
            Parameter: {
                visit: (node: ts.Node) => {
                    console.log(node.kind);
                    const param = node as ts.ParameterDeclaration;
                    console.log((param.name as ts.Identifier).text);
                    return node;
                }
            }
        }
    }
};
