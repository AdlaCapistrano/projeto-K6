import http from 'k6/http';
import { Counter } from 'k6/metrics';

import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
};

const chamadas = new Counter('quantidade de chamadas');

export default function () {
    const rest = http.get('http://test.k6.io');

    check(rest, { 
        'status code é 200': (r) => r.status == 200 });

}