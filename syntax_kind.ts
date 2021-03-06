import * as ts from 'typescript';

export class SyntaxKindKeys {
    [key: string]: ts.SyntaxKind

    Unknown? = 0;
    EndOfFileToken? = 1;
    SingleLineCommentTrivia? = 2;
    MultiLineCommentTrivia? = 3;
    NewLineTrivia? = 4;
    WhitespaceTrivia? = 5;
    ShebangTrivia? = 6;
    ConflictMarkerTrivia? = 7;
    NumericLiteral? = 8;
    StringLiteral? = 9;
    JsxText? = 10;
    JsxTextAllWhiteSpaces? = 11;
    RegularExpressionLiteral? = 12;
    NoSubstitutionTemplateLiteral? = 13;
    TemplateHead? = 14;
    TemplateMiddle? = 15;
    TemplateTail? = 16;
    OpenBraceToken? = 17;
    CloseBraceToken? = 18;
    OpenParenToken? = 19;
    CloseParenToken? = 20;
    OpenBracketToken? = 21;
    CloseBracketToken? = 22;
    DotToken? = 23;
    DotDotDotToken? = 24;
    SemicolonToken? = 25;
    CommaToken? = 26;
    LessThanToken? = 27;
    LessThanSlashToken? = 28;
    GreaterThanToken? = 29;
    LessThanEqualsToken? = 30;
    GreaterThanEqualsToken? = 31;
    EqualsEqualsToken? = 32;
    ExclamationEqualsToken? = 33;
    EqualsEqualsEqualsToken? = 34;
    ExclamationEqualsEqualsToken? = 35;
    EqualsGreaterThanToken? = 36;
    PlusToken? = 37;
    MinusToken? = 38;
    AsteriskToken? = 39;
    AsteriskAsteriskToken? = 40;
    SlashToken? = 41;
    PercentToken? = 42;
    PlusPlusToken? = 43;
    MinusMinusToken? = 44;
    LessThanLessThanToken? = 45;
    GreaterThanGreaterThanToken? = 46;
    GreaterThanGreaterThanGreaterThanToken? = 47;
    AmpersandToken? = 48;
    BarToken? = 49;
    CaretToken? = 50;
    ExclamationToken? = 51;
    TildeToken? = 52;
    AmpersandAmpersandToken? = 53;
    BarBarToken? = 54;
    QuestionToken? = 55;
    ColonToken? = 56;
    AtToken? = 57;
    EqualsToken? = 58;
    PlusEqualsToken? = 59;
    MinusEqualsToken? = 60;
    AsteriskEqualsToken? = 61;
    AsteriskAsteriskEqualsToken? = 62;
    SlashEqualsToken? = 63;
    PercentEqualsToken? = 64;
    LessThanLessThanEqualsToken? = 65;
    GreaterThanGreaterThanEqualsToken? = 66;
    GreaterThanGreaterThanGreaterThanEqualsToken? = 67;
    AmpersandEqualsToken? = 68;
    BarEqualsToken? = 69;
    CaretEqualsToken? = 70;
    Identifier? = 71;
    BreakKeyword? = 72;
    CaseKeyword? = 73;
    CatchKeyword? = 74;
    ClassKeyword? = 75;
    ConstKeyword? = 76;
    ContinueKeyword? = 77;
    DebuggerKeyword? = 78;
    DefaultKeyword? = 79;
    DeleteKeyword? = 80;
    DoKeyword? = 81;
    ElseKeyword? = 82;
    EnumKeyword? = 83;
    ExportKeyword? = 84;
    ExtendsKeyword? = 85;
    FalseKeyword? = 86;
    FinallyKeyword? = 87;
    ForKeyword? = 88;
    FunctionKeyword? = 89;
    IfKeyword? = 90;
    ImportKeyword? = 91;
    InKeyword? = 92;
    InstanceOfKeyword? = 93;
    NewKeyword? = 94;
    NullKeyword? = 95;
    ReturnKeyword? = 96;
    SuperKeyword? = 97;
    SwitchKeyword? = 98;
    ThisKeyword? = 99;
    ThrowKeyword? = 100;
    TrueKeyword? = 101;
    TryKeyword? = 102;
    TypeOfKeyword? = 103;
    VarKeyword? = 104;
    VoidKeyword? = 105;
    WhileKeyword? = 106;
    WithKeyword? = 107;
    ImplementsKeyword? = 108;
    InterfaceKeyword? = 109;
    LetKeyword? = 110;
    PackageKeyword? = 111;
    PrivateKeyword? = 112;
    ProtectedKeyword? = 113;
    PublicKeyword? = 114;
    StaticKeyword? = 115;
    YieldKeyword? = 116;
    AbstractKeyword? = 117;
    AsKeyword? = 118;
    AnyKeyword? = 119;
    AsyncKeyword? = 120;
    AwaitKeyword? = 121;
    BooleanKeyword? = 122;
    ConstructorKeyword? = 123;
    DeclareKeyword? = 124;
    GetKeyword? = 125;
    IsKeyword? = 126;
    KeyOfKeyword? = 127;
    ModuleKeyword? = 128;
    NamespaceKeyword? = 129;
    NeverKeyword? = 130;
    ReadonlyKeyword? = 131;
    RequireKeyword? = 132;
    NumberKeyword? = 133;
    ObjectKeyword? = 134;
    SetKeyword? = 135;
    StringKeyword? = 136;
    SymbolKeyword? = 137;
    TypeKeyword? = 138;
    UndefinedKeyword? = 139;
    FromKeyword? = 140;
    GlobalKeyword? = 141;
    OfKeyword? = 142;
    QualifiedName? = 143;
    ComputedPropertyName? = 144;
    TypeParameter? = 145;
    Parameter? = 146;
    Decorator? = 147;
    PropertySignature? = 148;
    PropertyDeclaration? = 149;
    MethodSignature? = 150;
    MethodDeclaration? = 151;
    Constructor? = 152;
    GetAccessor? = 153;
    SetAccessor? = 154;
    CallSignature? = 155;
    ConstructSignature? = 156;
    IndexSignature? = 157;
    TypePredicate? = 158;
    TypeReference? = 159;
    FunctionType? = 160;
    ConstructorType? = 161;
    TypeQuery? = 162;
    TypeLiteral? = 163;
    ArrayType? = 164;
    TupleType? = 165;
    UnionType? = 166;
    IntersectionType? = 167;
    ParenthesizedType? = 168;
    ThisType? = 169;
    TypeOperator? = 170;
    IndexedAccessType? = 171;
    MappedType? = 172;
    LiteralType? = 173;
    ObjectBindingPattern? = 174;
    ArrayBindingPattern? = 175;
    BindingElement? = 176;
    ArrayLiteralExpression? = 177;
    ObjectLiteralExpression? = 178;
    PropertyAccessExpression? = 179;
    ElementAccessExpression? = 180;
    CallExpression? = 181;
    NewExpression? = 182;
    TaggedTemplateExpression? = 183;
    TypeAssertionExpression? = 184;
    ParenthesizedExpression? = 185;
    FunctionExpression? = 186;
    ArrowFunction? = 187;
    DeleteExpression? = 188;
    TypeOfExpression? = 189;
    VoidExpression? = 190;
    AwaitExpression? = 191;
    PrefixUnaryExpression? = 192;
    PostfixUnaryExpression? = 193;
    BinaryExpression? = 194;
    ConditionalExpression? = 195;
    TemplateExpression? = 196;
    YieldExpression? = 197;
    SpreadElement? = 198;
    ClassExpression? = 199;
    OmittedExpression? = 200;
    ExpressionWithTypeArguments? = 201;
    AsExpression? = 202;
    NonNullExpression? = 203;
    MetaProperty? = 204;
    TemplateSpan? = 205;
    SemicolonClassElement? = 206;
    Block? = 207;
    VariableStatement? = 208;
    EmptyStatement? = 209;
    ExpressionStatement? = 210;
    IfStatement? = 211;
    DoStatement? = 212;
    WhileStatement? = 213;
    ForStatement? = 214;
    ForInStatement? = 215;
    ForOfStatement? = 216;
    ContinueStatement? = 217;
    BreakStatement? = 218;
    ReturnStatement? = 219;
    WithStatement? = 220;
    SwitchStatement? = 221;
    LabeledStatement? = 222;
    ThrowStatement? = 223;
    TryStatement? = 224;
    DebuggerStatement? = 225;
    VariableDeclaration? = 226;
    VariableDeclarationList? = 227;
    FunctionDeclaration? = 228;
    ClassDeclaration? = 229;
    InterfaceDeclaration? = 230;
    TypeAliasDeclaration? = 231;
    EnumDeclaration? = 232;
    ModuleDeclaration? = 233;
    ModuleBlock? = 234;
    CaseBlock? = 235;
    NamespaceExportDeclaration? = 236;
    ImportEqualsDeclaration? = 237;
    ImportDeclaration? = 238;
    ImportClause? = 239;
    NamespaceImport? = 240;
    NamedImports? = 241;
    ImportSpecifier? = 242;
    ExportAssignment? = 243;
    ExportDeclaration? = 244;
    NamedExports? = 245;
    ExportSpecifier? = 246;
    MissingDeclaration? = 247;
    ExternalModuleReference? = 248;
    JsxElement? = 249;
    JsxSelfClosingElement? = 250;
    JsxOpeningElement? = 251;
    JsxClosingElement? = 252;
    JsxAttribute? = 253;
    JsxAttributes? = 254;
    JsxSpreadAttribute? = 255;
    JsxExpression? = 256;
    CaseClause? = 257;
    DefaultClause? = 258;
    HeritageClause? = 259;
    CatchClause? = 260;
    PropertyAssignment? = 261;
    ShorthandPropertyAssignment? = 262;
    SpreadAssignment? = 263;
    EnumMember? = 264;
    SourceFile? = 265;
    Bundle? = 266;
    JSDocTypeExpression? = 267;
    JSDocAllType? = 268;
    JSDocUnknownType? = 269;
    JSDocArrayType? = 270;
    JSDocUnionType? = 271;
    JSDocTupleType? = 272;
    JSDocNullableType? = 273;
    JSDocNonNullableType? = 274;
    JSDocRecordType? = 275;
    JSDocRecordMember? = 276;
    JSDocTypeReference? = 277;
    JSDocOptionalType? = 278;
    JSDocFunctionType? = 279;
    JSDocVariadicType? = 280;
    JSDocConstructorType? = 281;
    JSDocThisType? = 282;
    JSDocComment? = 283;
    JSDocTag? = 284;
    JSDocAugmentsTag? = 285;
    JSDocClassTag? = 286;
    JSDocParameterTag? = 287;
    JSDocReturnTag? = 288;
    JSDocTypeTag? = 289;
    JSDocTemplateTag? = 290;
    JSDocTypedefTag? = 291;
    JSDocPropertyTag? = 292;
    JSDocTypeLiteral? = 293;
    JSDocLiteralType? = 294;
    SyntaxList? = 295;
    NotEmittedStatement? = 296;
    PartiallyEmittedExpression? = 297;
    CommaListExpression? = 298;
    MergeDeclarationMarker? = 299;
    EndOfDeclarationMarker? = 300;
    Count? = 301;
    FirstAssignment? = 58;
    LastAssignment? = 70;
    FirstCompoundAssignment? = 59;
    LastCompoundAssignment? = 70;
    FirstReservedWord? = 72;
    LastReservedWord? = 107;
    FirstKeyword? = 72;
    LastKeyword? = 142;
    FirstFutureReservedWord? = 108;
    LastFutureReservedWord? = 116;
    FirstTypeNode? = 158;
    LastTypeNode? = 173;
    FirstPunctuation? = 17;
    LastPunctuation? = 70;
    FirstToken? = 0;
    LastToken? = 142;
    FirstTriviaToken? = 2;
    LastTriviaToken? = 7;
    FirstLiteralToken? = 8;
    LastLiteralToken? = 13;
    FirstTemplateToken? = 13;
    LastTemplateToken? = 16;
    FirstBinaryOperator? = 27;
    LastBinaryOperator? = 70;
    FirstNode? = 143;
    FirstJSDocNode? = 267;
    LastJSDocNode? = 294;
    FirstJSDocTagNode? = 284;
    LastJSDocTagNode? = 294
};