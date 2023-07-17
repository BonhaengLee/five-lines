// 실제로 사용되지 않은 메서드가
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.m1 = function () {
        console.log('m1');
    };
    return B;
}());
var a = new B();
a.m1();
