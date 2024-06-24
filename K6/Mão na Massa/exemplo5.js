import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate < 0.01"],
    http_req_duration: ["p(95) < 250"],
  },
};

const BASE_URL = "https://test-api.k6.io";
export function setup() {
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: "0.38423672390501046.@gmail.com",
        password: "dutra123",
    });
        
    const token = loginRes.json('access');
    return token;
    
}

export default function (token) {
    
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const res = http.get(`${BASE_URL}/my/crocodiles/` , params );

}