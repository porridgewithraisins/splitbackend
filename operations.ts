import * as T from "./core/types";

// for getting the main list of txns view
export function getLedger(name: T.HasLedger) {
    // just get from storage
}

export function addExpense(expense: T.LedgerEntry) {
    // just append to storage
}

export function editExpense(updatedExpense: T.LedgerEntry) {
    updatedExpense.version++;
    updatedExpense.meta = {
        // something here maybe...
    }
    // just append to storage, this way, can view edits and notes/comments for the same in some meta field
}

export function deleteExpense(expense: T.LedgerEntry) {
    // just nuke it from storage
}

// only required if implementing storage in append-only datastructure
export function softDeleteExpense(expense: T.LedgerEntry) {
    [expense.payerSplitType, expense.payerSplits] = [expense.payeeSplitType, expense.payeeSplits];
    expense.version++;
    // append to storage
}

// can be used e.g for the overall "simplified debts" view at the top of the group screen
export function settleUp(
    includedGroups: T.HasLedger[],
    includedPeople: T.PersonId[],
    includedTransactions: T.TransactionId[],
    excludedGroups: T.HasLedger[],
    excludedPeople: T.PersonId[],
    excludedTransactions: T.TransactionId[]
) {
    // filter ledger based on provided filters, keep only last version of each entry, and call simplify() on it.
}
