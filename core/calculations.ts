import * as T from "./types";
import { default as Highs } from "highs";

export function absolutify(entry: T.LedgerEntry): T.Owe[] {
    const result: T.Owe[] = [];

    const payerTotals: Record<T.PersonId, T.AbsoluteQuantity> = {};
    switch (entry.payerSplitType) {
        case "shares":
            let totalShares = 0;
            for (const { howmuch } of entry.payerSplits) {
                totalShares += howmuch;
            }
            for (const { who, howmuch } of entry.payerSplits) {
                payerTotals[who] = Math.round((howmuch / totalShares) * entry.totalAmount);
            }
        case "equally":
            let numPayers = entry.payerSplits.length;
            for (const { who } of entry.payerSplits) {
                payerTotals[who] = Math.round((1 / numPayers) * entry.totalAmount);
            }
        case "percentages":
            for (const { who, howmuch } of entry.payerSplits) {
                payerTotals[who] = Math.round((howmuch / 100) * entry.totalAmount);
            }
        case "unequally":
            for (const { who, howmuch } of entry.payerSplits) {
                payerTotals[who] = howmuch;
            }
    }

    for (const [payer, payerTotal] of Object.entries(payerTotals)) {
        switch (entry.payerSplitType) {
            case "shares":
                let totalShares = 0;
                for (const { howmuch } of entry.payeeSplits) {
                    totalShares += howmuch;
                }

                for (const { who: payee, howmuch } of entry.payeeSplits) {
                    const amountOwedToThisPayer = (howmuch / totalShares) * payerTotal;
                    result.push({ from: payee, to: payer, amount: amountOwedToThisPayer });
                }
            case "equally":
                let numPayees = entry.payeeSplits.length;
                for (const { who: payee } of entry.payeeSplits) {
                    const amountOwedToThisPayer = (1 / numPayees) * payerTotal;
                    result.push({ from: payee, to: payer, amount: amountOwedToThisPayer });
                }
            case "percentages":
                for (const { who: payee, howmuch } of entry.payeeSplits) {
                    const amountOwedToThisPayer = (howmuch / 100) * payerTotal;
                    result.push({ from: payee, to: payer, amount: amountOwedToThisPayer });
                }
            case "unequally":
                for (const { who: payee, howmuch } of entry.payeeSplits) {
                    const amountOwedToThisPayer = howmuch;
                    result.push({ from: payee, to: payer, amount: amountOwedToThisPayer });
                }
        }
    }

    return result;
}

export async function simplifyMIP(owes: T.Owe[]): Promise<T.Owe[]> {
    const balances: Record<T.PersonId, T.AbsoluteQuantity> = {};
    for (const { from, to, amount } of owes) {
        balances[from] = (balances[from] ??= 0) - amount;
        balances[to] = (balances[to] ??= 0) + amount;
    }

    const solver = await Highs({});
    solver.solve("put the CPLEX string here");

    /**
     * Let X_ij be a binary variable denoting that a transaction exists from i to j
     * Let Y_ij be a integer variable denoting the amount from i to j
     * Let Z_i be an integer variable denoting the total amount i should have at the end (credits - debts)
     * We want to minimise sum over all i,j X_ij
     * Subject to the constraints
     * for all j, sum over all i Y_ij = Z_j
     * Y_ij + Y_ji <= VeryLarge * X_ij
     * 
     * Alternatively, can make use of similar-to-lasso logic, and just minimise total money transacted
     * 
     * Even more alternatively, can add a rule saying "only adjust weights on existing edges, dont add new ones"
     * This turns it into a max-flow problem
     * 
     * Have to evaluate and do one of these
     */

    // TODO

    const simplifiedOwes: T.Owe[] = owes;
    return simplifiedOwes;
}

export function simplifyGreedy(owes: T.Owe[]): T.Owe[] {
    /**
     * Simple greedy algo
     * Just pair most owing with most owed
     * And repeat for 2nd most...
     * Not optimal, but good enough
     */
    const simplifiedOwes: T.Owe[] = owes;
    return simplifiedOwes;
}
