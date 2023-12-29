export class UtilsService {
    constructor() {
    }

    isLoaded(loading: boolean): boolean {
        console.log(' this is called...******************* ', loading, loading === false);
        return loading === false;
    }

    /**
     * Build url parameters key and value pairs from array or object
     * @param obj
     */
    urlParam(obj: any): string {
        return Object.keys(obj)
            .map(k => k + '=' + obj[k])
            .join('&');
        /* return Object.keys(obj)
             .map(k => k + '=' + encodeURIComponent(obj[k]))
             .join('&');*/
    }

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    /**
     * Deep merge two objects.
     * @param target
     * @param ...sources
     * @see https://stackoverflow.com/a/34749873/1316921
     */
    mergeDeep(target, ...sources) {
        if (!sources.length) {
            return target;
        }
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, {[key]: {}});
                    }
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }

    /**
     * Copy source to target object
     * @param target
     * @param ...sources
     * @see https://stackoverflow.com/a/34749873/1316921
     */
    copyObject(target, ...sources) {
        if (!sources.length) {
            return target;
        }
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    Object.assign(target, {[key]: {}});
                    this.copyObject(target[key], source[key]);
                } else {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }

        return this.copyObject(target, ...sources);
    }

    getPath(obj, val, path?) {
        path = path || '';
        let fullpath = '';
        for (const b in obj) {
            if (obj[b] === val) {
                return path + '/' + b;
            } else if (typeof obj[b] === 'object') {
                fullpath =
                    this.getPath(obj[b], val, path + '/' + b) || fullpath;
            }
        }
        return fullpath;
    }

    convertNumber(val: any) {
        if (val === undefined || val === null) {
            return 0;
        }
        return val.toString().replace(/[^0-9]*/g, '');
    }
}


export function isInteger(value: any): value is number {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}


export function isString(value: any): value is string {
    return typeof value === 'string';
}
