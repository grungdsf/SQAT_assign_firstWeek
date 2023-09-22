import http from 'k6/http';
import { sleep, check } from 'k6';

export const BASE_URL = 'https://test-api.k6.io';

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<250'],
    },
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '20s', target: 0 },
    ],
};

export default function () {

    const res = http.get(`${BASE_URL}/public/id/1/`);

    check(res, { 'status was 200': (r) => r.status == 200 });

    if(res.timings.duration > 250)
        console.log('Response time was ' + String(res.timings.duration) + ' ms');

    sleep(1);
}