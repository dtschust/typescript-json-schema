"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var typescript_json_schema_1 = require("../typescript-json-schema");
var basicFilePath = "./file.ts";
var paths = [
    basicFilePath,
    ".",
    "@some-module",
    "@some-module/my_123",
    "/some/absolute/path-to-file",
    "../relative-path",
    "../../../relative-path/to-file.ts",
    "./relative-path/myFile123.js",
];
var objName = "objectName";
var extendedObjName = "$object12_Name";
var getValues = function (singleQuotation) {
    var quot = singleQuotation ? "'" : '"';
    return {
        path: "" + quot + basicFilePath + quot,
        quot: quot,
        quotName: singleQuotation ? "single" : "double",
    };
};
var matchSimple = function (match, singleQuotation, filePath, propertyName) {
    chai_1.assert.isArray(match);
    var quotation = singleQuotation ? "'" : '"';
    var expectedFileName = "" + quotation + filePath + quotation;
    chai_1.assert(match[2] === expectedFileName, "File doesn't match, got: " + match[2] + ", expected: " + expectedFileName);
    chai_1.assert(match[4] === propertyName, "Poperty has to be " + (propertyName === null || propertyName === void 0 ? void 0 : propertyName.toString()));
};
var commonTests = function (singleQuotation) {
    var _a = getValues(singleQuotation), quotName = _a.quotName, path = _a.path;
    it("will not match, (" + quotName + " quotation mark)", function () {
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("pre require(" + path + ")"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("  e require(" + path + ")"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("require(" + path + ")post"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("requir(" + path + ")"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("require(" + path + ").e-r"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("require(" + path));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("require" + path + ")"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("require[" + path + "]"));
        chai_1.assert.isNull(typescript_json_schema_1.regexRequire("REQUIRE[" + path + "]"));
    });
};
var tests = function (singleQuotation, objectName) {
    var _a = getValues(singleQuotation), quotName = _a.quotName, path = _a.path, quot = _a.quot;
    var objNamePath = objectName ? "." + objectName : "";
    it("basic path (" + quotName + " quotation mark)", function () {
        matchSimple(typescript_json_schema_1.regexRequire("require(" + path + ")" + objNamePath), singleQuotation, basicFilePath, objectName);
    });
    it("white spaces and basic path (" + quotName + " quotation mark)", function () {
        matchSimple(typescript_json_schema_1.regexRequire("   require(" + path + ")" + objNamePath), singleQuotation, basicFilePath, objectName);
        matchSimple(typescript_json_schema_1.regexRequire("require(" + path + ")" + objNamePath + "    "), singleQuotation, basicFilePath, objectName);
        matchSimple(typescript_json_schema_1.regexRequire("      require(" + path + ")" + objNamePath + "    "), singleQuotation, basicFilePath, objectName);
        matchSimple(typescript_json_schema_1.regexRequire("      require(" + path + ")" + objNamePath + "    comment"), singleQuotation, basicFilePath, objectName);
        matchSimple(typescript_json_schema_1.regexRequire("      require(" + path + ")" + objNamePath + "    comment   "), singleQuotation, basicFilePath, objectName);
    });
    it("paths (" + quotName + " quotation mark)", function () {
        paths.forEach(function (pathName) {
            matchSimple(typescript_json_schema_1.regexRequire("require(" + quot + pathName + quot + ")" + objNamePath), singleQuotation, pathName, objectName);
        });
    });
};
describe("Require regex pattern", function () {
    tests(false);
    commonTests(false);
    tests(true);
    commonTests(true);
    tests(false, objName);
    tests(true, objName);
    tests(false, extendedObjName);
    tests(true, extendedObjName);
});
//# sourceMappingURL=require.test.js.map