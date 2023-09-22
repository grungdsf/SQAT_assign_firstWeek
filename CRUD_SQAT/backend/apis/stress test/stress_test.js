import http from 'k6/http';
import { sleep, check } from 'k6';


export const BASE_URL = 'https://test-api.k6.io';

export const options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 },
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down
    ],
};

export default function () {
    const req1 = {
        method: 'GET',
        url: `${BASE_URL}/public/id/1/`,
    };
    const req2 = {
        method: 'GET',
        url: `${BASE_URL}/public/id/2/`,
    };
    const req3 = {
        method: 'GET',
        url: `${BASE_URL}/public/id/3/`,
    };
    const req4 = {
        method: 'GET',
        url: `${BASE_URL}/public/id/4/`,
    };

    const responses = http.batch([req1, req2, req3, req4]);

    check(responses, {
        'status is 500': (r) => r.status == 500,
    });

    sleep(1);
}