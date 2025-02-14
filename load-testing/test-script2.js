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
    // let res = http.get("https://gb-product-service-latest.onrender.com/v1/product/search?searchTerm=vegan");
    let res = http.get("http://34.8.218.202/v1/product/search?searchTerm=vegan");

    check(res, { "status is 200": (r) => r.status === 200 });
}
