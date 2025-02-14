import http from "k6/http";
import { check } from "k6";

export let options = {
    vus: 10,  // 10 virtual users
    duration: "30s", // Run for 30 seconds
};

export default function () {
    // let res = http.get("http://gb-product-service-latest.onrender.com/v1/product/search?searchTerm=vegan");
    let res = http.get("http://34.8.218.202/v1/product/search?searchTerm=vegan");

    check(res, { "status is 200": (r) => r.status === 200 });
}
