"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var TestRail = /** @class */ (function () {
    function TestRail(options) {
        this.options = options;
        this.base = "https://" + options.domain + "/index.php?/api/v2";
    }

    TestRail.prototype.publishResults = function (results,) {
        var _this = this;
        console.log("RUNID")
        console.log(_this.options.runId)

        return axios({
            method: 'post',
            url: _this.base + "/add_results_for_cases/" + _this.options.runId,
            headers: { 'Content-Type': 'application/json' },
            auth: {
                username: _this.options.username,
                password: _this.options.password,
            },
            data: JSON.stringify({ results: results }),
        }).then(function (response) {
            return response;
        }).catch(function (error) { return console.error(error); });
    };
    return TestRail;
}());
exports.TestRail = TestRail;
//# sourceMappingURL=testrail.js.map