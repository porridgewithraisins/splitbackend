import { absolutify } from "./core/calculations";

console.log(
    absolutify({
        id: "1",
        payerSplitType: "unequally",
        payerSplits: [
            { who: "sandy", howmuch: 100 },
            { who: "vishal", howmuch: 400 },
        ],
        totalAmount: 500,
        payeeSplitType: "equally",
        payeeSplits: [
            { who: "vishal", howmuch: 1 },
            { who: "hemang", howmuch: 1 },
        ],
        settled: false,
        version: 0,
    })
);
// expected:
// sandy: 100, vishal: 400
// vishal pays sandy 40, hemang pays sandy 60
// vishal pays vishal 160, hemang pays vishal 240
