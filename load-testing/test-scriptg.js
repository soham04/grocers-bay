import http from "k6/http";
import { check } from "k6";

export let options = {
    stages: [
        { duration: "10s", target: 50 },  // Ramp up to 50 users
        { duration: "20s", target: 100 }, // Hold at 100 users
        { duration: "10s", target: 0 },   // Ramp down
    ],
};

export default function () {
    let res = http.get("https://google.com");
    check(res, { "status is 200": (r) => r.status === 200 });
}
