import axios from "axios";


axios.get("/proxy/").then(result => {
    console.log(result);
});

console.log("hello");
