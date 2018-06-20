import helper from "./index";
import expand from "./expand";
import "../css/main.css";

console.log(123321);
console.log(123);

document.querySelector(".container4").onclick = function () {
    helper.scrollToHeight(20);
}

module.exports = {
    helper: helper,
    expand: expand
}