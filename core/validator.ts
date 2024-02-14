import * as T from "./types";

export function validateNewLedgerEntry(entry: Omit<T.LedgerEntry, "id" | "version">) {
    // no checks
    entry.meta

    // forcibly set
    entry.settled = false;

    // for both payers and payees
    // check if percentage adds up to 100
    // check if unequally adds up to total
    entry.payeeSplitType;
    entry.payeeSplits;
    entry.payerSplitType;
    entry.payerSplits;
    entry.totalAmount;
}

export function validateEditLedgerEntry(entry: T.LedgerEntry) {
    // should be false
    entry?.settled;
    // otherwise, same as validation for new, except we allow id and version
}

export function validateSoftDeleteLedgerEntry(entry: T.LedgerEntry) {
    // same as edit
}

export function validateDeleteLedgerEntry(entry: T.LedgerEntry) {
    return entry?.settled != true;
}
