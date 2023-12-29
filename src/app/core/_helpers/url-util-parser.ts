import {Injectable} from '@angular/core';
import * as urlParse from 'url-parse';
import {UrlObject} from 'url';

@Injectable({
    providedIn: 'root'
})
export class UrlUtilParser {
    public parse(url: string, parseQuery = true): UrlObject {
        return urlParse(url, parseQuery);
    }
}
