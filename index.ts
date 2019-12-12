export class Override {
    protected _overrideNamespace: string;
    protected _overrideRegex: RegExp;

    constructor(overrideNamespace: string) {
        this._overrideNamespace = overrideNamespace;
        this._overrideRegex = new RegExp(`^${overrideNamespace}_override_(.*?)$`);
    }

    /**
     * Try to obtain overrides from sessionStorage
     *
     * @returns {object} overrides
     */
    getAll(): object {
        if (!('sessionStorage' in window))
            return {};

        const overrides = {};

        Object.keys(sessionStorage)
            .forEach(item => {
                if (!this._overrideRegex.test(item)) {
                    return;
                }

                try {
                    const itemName = this._overrideRegex.exec(item)[1];

                    overrides[itemName] = JSON.parse(
                        sessionStorage[item],
                    );
                } catch (err) {
                    void err;
                }
            });

        return overrides;
    }

    get<T>(overrideName: string): T {
        try {
            return JSON.parse(
                sessionStorage[
                    `${this._overrideNamespace}_override_${overrideName}`
                ],
            );
        } catch {}

        return void 0;
    }

    set<T>(
        overrideName: string,
        overrideValue: T,
    ): void {
        if (!('sessionStorage' in window))
            return;

        console.assert(overrideName !== null && overrideName !== undefined, 'Override name is mandatory');

        try {
            sessionStorage[`${this._overrideNamespace}_override_${overrideName}`] = JSON.stringify(overrideValue);
        } catch (err) {
            void 0;
        }
    }

    delete(overrideName: string): void {
        if (!('sessionStorage' in window))
            return;

        console.assert(overrideName !== null && overrideName !== undefined, 'Override name is mandatory');

        try {
            sessionStorage.removeItem(`${this._overrideNamespace}_override_${overrideName}`);
        } catch (err) {
            void 0;
        }
    }
};

