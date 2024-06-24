import http from 'k6/http';

import { check } from 'k6';

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}


export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        checks: ['rate > 0.99'] 
    }
};

export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    const res = http.get(BASE_URL);

    check(res, { 
        'status code é 200': (r) => r.status === 200 
    });

}



