export class FooServiceMock implements IFooService {
    doThis(param: string): Observable<string> { return undefined; }
}
