import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
export interface IFoo {
    bar(param: string);
}
@Injectable()
export class FooService {
    doThis(param: string): Observable<string> {
        console.log("bar");
    }
}
export interface IFooService {
    doThis(param: string): Observable<string>;
}
