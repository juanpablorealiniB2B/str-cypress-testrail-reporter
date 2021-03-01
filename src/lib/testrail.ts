const axios = require('axios');
const chalk = require('chalk');
import { TestRailOptions, TestRailResult } from './testrail.interface';
import moment = require('moment');

export class TestRail {
  private base: String;
  private runId: Number;
  private projectId: Number;
  private lastRunDate: string;
  private currentDate: string;

  constructor(private options: TestRailOptions) {
    this.base = `https://${options.domain}/index.php?/api/v2`;
  }

  public getTestRunId() {
    return axios({
      method: 'get',
      url: `${this.base}/get_runs/${this.options.projectId}`,
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: this.options.username,
        password: this.options.password,
      }
    }).then(response => {
      return response.data[0].id;
    }).catch(error => console.error(error));;
  };

  public publishResults(results: TestRailResult[]) {
    return axios({
      method: 'get',
      url: `${this.base}/get_runs/${this.options.projectId}`,
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: this.options.username,
        password: this.options.password,
      }
    }).then(response => {
      this.runId = response.data[0].id;
      console.log(`Publishing results to latest run: ${this.runId}`);
      return axios({
        method: 'post',
        url: `${this.base}/add_results_for_cases/${this.runId}`,
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: this.options.username,
          password: this.options.password,
        },
        data: JSON.stringify({ results }),
      }).then(response => {
        return response;
      }).catch(error => console.error(error));
    })
  }
}
