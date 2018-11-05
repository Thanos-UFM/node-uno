"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
}
exports.Card = Card;
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["green"] = 2] = "green";
    Color[Color["yellow"] = 3] = "yellow";
    Color[Color["black"] = 4] = "black";
})(Color = exports.Color || (exports.Color = {}));
var Value;
(function (Value) {
    // numbers
    Value[Value["zero"] = 0] = "zero";
    Value[Value["one"] = 1] = "one";
    Value[Value["two"] = 2] = "two";
    Value[Value["three"] = 3] = "three";
    Value[Value["four"] = 4] = "four";
    Value[Value["five"] = 5] = "five";
    Value[Value["six"] = 6] = "six";
    Value[Value["seven"] = 7] = "seven";
    Value[Value["eight"] = 8] = "eight";
    Value[Value["nine"] = 9] = "nine";
    // special cards
    Value[Value["drawTwo"] = 10] = "drawTwo";
    Value[Value["reverse"] = 11] = "reverse";
    Value[Value["skip"] = 12] = "skip";
    Value[Value["wild"] = 13] = "wild";
    Value[Value["wildDrawFour"] = 14] = "wildDrawFour";
})(Value = exports.Value || (exports.Value = {}));
//# sourceMappingURL=Card.js.map