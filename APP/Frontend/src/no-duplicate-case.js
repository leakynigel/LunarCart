"use strict";

/**
 * @fileoverview Tests for no-duplicate-case rule.
 * @author Dieter Oberkofler
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-duplicate-case");
const { RuleTester } = require("eslint");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-duplicate-case", rule, {
    valid: [
        "switch (a) { case 1: break; case 2: break; }",
        "switch (a) { case 1: break; default: break; }",
        "switch (a) { case x: break; case y: break; }",
        "switch (a) { case 1: break; } switch (b) { case 1: break; }",
        "var a = 1, b = 2; switch (x) { case a: break; case b: break; }",
        "switch (a) { case 1: break; case (1): break; }"
    ],

    invalid: [
        {
            code: "switch (a) { case 1: break; case 1: break; }",
            errors: [{ messageId: "unexpected", type: "SwitchCase" }]
        },
        {
            code: "switch (a) { case '1': break; case '1': break; }",
            errors: [{ messageId: "unexpected", type: "SwitchCase" }]
        },
        {
            code: "switch (a) { case x: break; case x: break; }",
            errors: [{ messageId: "unexpected", type: "SwitchCase" }]
        },
        {
            code: "switch (a) { case 1 + 1: break; case 1 + 1: break; }",
            errors: [{ messageId: "unexpected", type: "SwitchCase" }]
        }
    ]
});