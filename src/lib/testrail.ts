const axios = require('axios');
const chalk = require('chalk');
import { TestRailOptions, TestRailResult } from './testrail.interface';

export class TestRail {
  private base: String;
  private runId: Number;
  private projectId: Number;
  private lastRunDate: string;
  private currentDate: string;

  constructor(private options: TestRailOptions) {
    this.base = `https://${options.domain}/index.php?/api/v2`;
  }

  public publishResults(results: TestRailResult[]) {
    console.log(`Publishing results to latest run: ${this.options.runId}`);
    return axios({
      method: 'post',
      url: `${this.base}/add_results_for_cases/${this.options.runId}`,
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: this.options.username,
        password: this.options.password,
      },
      data: JSON.stringify({ results }),
    }).then(response => {
      return response;
    }).catch(error => console.error(error));

  }
}
