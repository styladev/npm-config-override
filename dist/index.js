var Override = /** @class */ (function () {
    function Override(overrideNamespace) {
        this._overrideNamespace = overrideNamespace;
        this._overrideRegex = new RegExp("^" + overrideNamespace + "_override_(.*?)$");
    }
    /**
     * Try to obtain overrides from sessionStorage
     *
     * @returns {object} overrides
     */
    Override.prototype.getAll = function () {
        var _this = this;
        if (!('sessionStorage' in window))
            return {};
        var overrides = {};
        Object.keys(sessionStorage)
            .forEach(function (item) {
            if (!_this._overrideRegex.test(item)) {
                return;
            }
            try {
                var itemName = _this._overrideRegex.exec(item)[1];
                overrides[itemName] = JSON.parse(sessionStorage[item]);
            }
            catch (err) {
                void err;
            }
        });
        return overrides;
    };
    Override.prototype.get = function (overrideName) {
        return this.getAll()[overrideName];
    };
    Override.prototype.set = function (overrideName, overrideValue) {
        if (!('sessionStorage' in window))
            return;
        console.assert(overrideName !== null && overrideName !== undefined, 'Override name is mandatory');
        try {
            sessionStorage[this._overrideNamespace + "_override_" + overrideName] = JSON.stringify(overrideValue);
        }
        catch (err) {
            void 0;
        }
    };
    Override.prototype.delete = function (overrideName) {
        if (!('sessionStorage' in window))
            return;
        console.assert(overrideName !== null && overrideName !== undefined, 'Override name is mandatory');
        try {
            sessionStorage.removeItem(this._overrideNamespace + "_override_" + overrideName);
        }
        catch (err) {
            void 0;
        }
    };
    return Override;
}());
export { Override };
;
//# sourceMappingURL=index.js.map