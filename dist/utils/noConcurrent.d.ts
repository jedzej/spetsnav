export declare const noConcurrent: <F extends (...args: any[]) => Promise<any>>(func: F) => (...args: any[]) => Promise<any>;
