import { absolutify } from "./core/calculations";

console.log(
    absolutify({
        id: "1",
        payerSplitType: "shares",
        payerSplits: [
            { who: "sandy", howmuch: 1 },
            { who: "vishal", howmuch: 4 },
        ],
        totalAmount: 500,
        payeeSplitType: "shares",
        payeeSplits: [
            { who: "vishal", howmuch: 2 },
            { who: "hemang", howmuch: 3 },
        ],
        settled: false,
        version: 0,
    })
);
// expected:
// sandy: 100, vishal: 400
// vishal pays sandy 40, hemang pays sandy 60
// vishal pays vishal 160, hemang pays vishal 240
