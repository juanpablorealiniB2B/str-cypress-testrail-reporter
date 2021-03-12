# Single TestRun (STR) TestRail Reporter for Cypress

[![version](https://img.shields.io/npm/v/cypress-testrail-reporter.svg)](https://www.npmjs.com/package/cypress-testrail-reporter)
[![downloads](https://img.shields.io/npm/dt/cypress-testrail-reporter.svg)](https://www.npmjs.com/package/cypress-testrail-reporter)
[![MIT License](https://img.shields.io/github/license/Vivify-Ideas/cypress-testrail-reporter.svg)](https://github.com/Vivify-Ideas/cypress-testrail-reporter/blob/master/LICENSE.md)

Publishes [Cypress](https://www.cypress.io/) runs on TestRail.

Cloned from the original package [salty-cypress-testrail-reporter](https://github.com/skekauoha/salty-cypress-testrail-reporter) by [Spencer Skekauoha](https://github.com/skekauoha)

The original package by Spencer is awesome!

This plugin fixes the issue regarding the last spec not being reported to TestRail (Many people found a not so elegant workaround by adding an empty spec at the end of the suite). In order to accomplish this some code was changed and a dependency was added to the [deasync](https://www.npmjs.com/package/deasync) npm package

## Install

```shell
$ npm install str-cypress-testrail-reporter --D
```

## Usage

Add reporter to your `cypress.json`:

```json
...
{
  "reporter": "str-cypress-testrail-reporter",
  "reporterOptions": {
    "domain": "yourdomain.testrail.com",
    "username": "username",
    "password": "password" or "api key",
    "projectId": projectIdNumber,
    "runId": runId
  }
}
```

Your Cypress tests should include the ID of your TestRail test case. Make sure your test case IDs are distinct from your test titles:

```Javascript
// Good:
it("C123 C124 Can authenticate a valid user", ...
it("Can authenticate a valid user C321", ...

// Bad:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid userC123", ...
```

## Reporter Options

**domain**: _string_ domain name of your TestRail instance (e.g. for a hosted instance _instance.testrail.com_).

**username**: _string_ email of the user under which the test run will be created.

**password**: _string_ password or the API key for the aforementioned user.

**projectId**: _number_ project with which the tests are associated.

**runId**: _number_ test run with which the tests are associated.

## Passing the reporter options as params 

You can pass the reporter options from the "cypress run" command line options, like this:

**npx cypress run --reporter str-cypress-testrail-reporter --reporter-options domain="domain",username="username",password="password or api key",projectId=0,runId=0**

# Functionality Update 03/01/2021 - Juan P. Realini

This modified version of the salty-cypress-testrail-reporter doesn't include the option to create a test run from Cypress. This implies that the TestRun must already exist.

Also, the issue regarding the last spec test not being reported to TestRail has been fixed.

## TestRail Settings

To increase security, the TestRail team suggests using an API key instead of a password. You can see how to generate an API key [here](http://docs.gurock.com/testrail-api2/accessing#username_and_api_key).

If you maintain your own TestRail instance on your own server, it is recommended to [enable HTTPS for your TestRail installation](http://docs.gurock.com/testrail-admin/admin-securing#using_https).

For TestRail hosted accounts maintained by [Gurock](http://www.gurock.com/), all accounts will automatically use HTTPS.

You can read the whole TestRail documentation [here](http://docs.gurock.com/).

## Author

Author: Juan Pablo Realini - [github](https://github.com/juanpablorealiniB2B)

## License

This project is licensed under the [MIT license](/LICENSE.md).

## Acknowledgments
* [Spencer Skekauoha](https://github.com/skekauoha), author of the [salty-cypress-testrail-reporter](https://github.com/skekauoha/salty-cypress-testrail-reporter) repository that was used as base for this modified one
* [Milutin Savovic](https://github.com/mickosav), author of the [cypress-testrail-reporter](https://github.com/Vivify-Ideas/cypress-testrail-reporter) repository that was cloned.
* [Pierre Awaragi](https://github.com/awaragi), owner of the [mocha-testrail-reporter](https://github.com/awaragi/mocha-testrail-reporter) repository that was forked.
* [Valerie Thoma](https://github.com/ValerieThoma) and [Aileen Santos](https://github.com/asantos3026) for proofreading the README.md file and making it more understandable.
