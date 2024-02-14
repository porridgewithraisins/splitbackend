export type Microrupees = number;
export type Microdollars = number;
export type Microsterling = number;
export type RelativeQuantity = number;
export type AbsoluteQuantity = Microrupees | Microdollars | Microsterling;
export type PersonId = string;
export type GroupId = string;
export type NonGroupId = string;
export type TransactionId = string;
export type HasLedger = GroupId | NonGroupId;
// make these tagged later so that type system won't let you mix

export type SplitType = "shares" | "percentages" | "unequally" | "equally";

export type Split = {
    who: PersonId;
    howmuch: RelativeQuantity | AbsoluteQuantity;
};

export type LedgerEntry = {
    id: TransactionId;
    version: number;
    totalAmount: AbsoluteQuantity;
    payerSplits: Split[];
    payerSplitType: SplitType;
    payeeSplits: Split[];
    payeeSplitType: SplitType;
    settled: boolean;
};

export type Owe = {
    from: PersonId;
    to: PersonId;
    amount: AbsoluteQuantity;
};

export type Balance = {
    who: PersonId;
    amount: AbsoluteQuantity;
}

export type Ledger = { owner: HasLedger; entries: LedgerEntry[] };
