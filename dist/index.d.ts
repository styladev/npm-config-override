export declare class Override {
    protected _overrideNamespace: string;
    protected _overrideRegex: RegExp;
    constructor(overrideNamespace: string);
    /**
     * Try to obtain overrides from sessionStorage
     *
     * @returns {object} overrides
     */
    getAll(): object;
    get<T>(overrideName: string): T;
    set<T>(overrideName: string, overrideValue: T): void;
}
