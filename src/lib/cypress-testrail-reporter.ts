import { reporters } from 'mocha';
import { TestRail } from './testrail';
import { titleToCaseIds } from './shared';
import { Status, TestRailResult } from './testrail.interface';
const chalk = require('chalk');

export class CypressTestRailReporter extends reporters.Spec {
  private results: TestRailResult[] = [];
  private testRail: TestRail;
  private hasBeenCreatedToday: boolean;

  constructor(runner: any, options: any) {
    super(runner);

    let reporterOptions = options.reporterOptions;
    this.testRail = new TestRail(reporterOptions);
    this.hasBeenCreatedToday = false;
    var done = false;
    var runId = 0;
    this.validate(reporterOptions, 'domain');
    this.validate(reporterOptions, 'username');
    this.validate(reporterOptions, 'password');
    this.validate(reporterOptions, 'projectId');

    runner.on('start', () => {
      console.log("Running Test Case...")
      this.testRail.getTestRunId().then(function (res) {
        this.runId = res;
      });
    });

    runner.on('pass', test => {
      const caseIds = titleToCaseIds(test.title);
      if (caseIds.length > 0) {
        const results = caseIds.map(caseId => {
          return {
            case_id: caseId,
            status_id: Status.Passed,
            comment: `Execution time: ${test.duration}ms`,
          };
        });
        this.results.push(...results);
      }
    });

    runner.on('fail', test => {
      const caseIds = titleToCaseIds(test.title);
      if (caseIds.length > 0) {
        const results = caseIds.map(caseId => {
          return {
            case_id: caseId,
            status_id: Status.Failed,
            comment: `${test.err.message}`,
          };
        });
        this.results.push(...results);
      }
    });

    runner.on('end', () => {
      if (this.results.length == 0) {
        console.log('\n', chalk.magenta.underline.bold('(TestRail Reporter)'));
        console.warn(
          '\n',
          'No testcases were matched. Ensure that your tests are declared correctly and matches Cxxx',
          '\n'
        );
        return;
      }
      this.testRail.publishResults(this.results).then(response => {
        console.log('\n', chalk.magenta.underline.bold('(TestRail Reporter)'));
        console.log(
          '\n',
          ` - Results are published `,
          '\n'
        );
      })
    });
  }

  private validate(options, name: string) {
    if (options == null) {
      throw new Error('Missing reporterOptions in cypress.json');
    }
    if (options[name] == null) {
      throw new Error(`Missing ${name} value. Please update reporterOptions in cypress.json`);
    }
  }
}
