import http from "k6/http";
import { check, sleep } from "k6";

// Define test scenarios
export let options = {
    scenarios: {
        baseline: {
            executor: "constant-vus",
            vus: 10, // Start with 10 users
            duration: "30s",
        },
        moderate_load: {
            executor: "ramping-vus",
            stages: [
                { duration: "30s", target: 50 },  // Ramp up to 50 users
                { duration: "30s", target: 100 }, // Ramp up to 100 users
            ],
            startTime: "30s",
        },
        breakpoint_test: {
            executor: "ramping-vus",
            stages: [
                { duration: "30s", target: 125 }, // Instead of jumping to 150 directly
                { duration: "30s", target: 150 },
                { duration: "30s", target: 175 }, // Gradual increase
                { duration: "30s", target: 200 },
                { duration: "30s", target: 225 }, // Ensure scaling is observed clearly
                { duration: "30s", target: 250 },
            ],
            startTime: "2m",
        },

        overload_test: {
            executor: "constant-vus",
            vus: 300, // Push system to extreme load
            duration: "1m",
            startTime: "3m",
        },
    },
};

// Define the test function
export default function () {
    let res = http.get("http://34.8.218.202/v1/product/search?searchTerm=vegan");

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response time < 2s": (r) => r.timings.duration < 2000,
    });

    sleep(1);
}
