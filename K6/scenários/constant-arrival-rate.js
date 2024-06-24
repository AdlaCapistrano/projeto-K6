import http from "k6/http";

export const options = {
    scenarios: {
        contacts: {
            executor: "constant-arrival-rate",
            duration: "30s",
            rate: 30,
            timeUnit: "1s",
            preallocatedVUs: 50,
           
        },
        
    },
};

export default function () {
    http.get("https://test.k6.io");
    
}