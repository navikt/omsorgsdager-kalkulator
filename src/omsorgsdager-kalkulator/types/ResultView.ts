export type Empty = {
    readonly _tag: 'Empty';
};
export type BeregnButton = {
    readonly _tag: 'BeregnButton';
};
export type BeregnButtonAndErrorSummary<E> = {
    readonly _tag: 'BeregnButtonAndErrorSummary';
    readonly errors: E;
};
export type NoValidChildrenOrange = {
    readonly _tag: 'NoValidChildrenOrange';
};
export type ResultBox<A> = {
    readonly _tag: 'ResultBox';
    readonly result: A;
};

export type ResultView<E, A> =
    | Empty
    | BeregnButton
    | BeregnButtonAndErrorSummary<E>
    | NoValidChildrenOrange
    | ResultBox<A>;

// constructors
export const empty: ResultView<never, never> = {
    _tag: 'Empty',
};
export const beregnButton: ResultView<never, never> = {
    _tag: 'BeregnButton',
};
export const beregnButtonAndErrorSummary = <E>(errors: E): ResultView<E, never> => ({
    _tag: 'BeregnButtonAndErrorSummary',
    errors,
});
export const noValidChildrenOrange: ResultView<never, never> = {
    _tag: 'NoValidChildrenOrange',
};
export const resultBox = <A>(result: A): ResultView<never, A> => ({
    _tag: 'ResultBox',
    result,
});
// filters
export const isEmpty = (data: ResultView<unknown, unknown>): data is Empty => data._tag === 'Empty';
export const isBeregnButton = (data: ResultView<unknown, unknown>): data is BeregnButton =>
    data._tag === 'BeregnButton';
export const isBeregnButtonAndErrorSummary = <E>(
    data: ResultView<E, unknown>
): data is BeregnButtonAndErrorSummary<E> => data._tag === 'BeregnButtonAndErrorSummary';
export const isNoValidChildrenOrange = (data: ResultView<unknown, unknown>): data is NoValidChildrenOrange =>
    data._tag === 'NoValidChildrenOrange';
export const isResultBox = <A>(data: ResultView<unknown, A>): data is ResultBox<A> => data._tag === 'ResultBox';

// fold
export const caseResultViewOf = <E, A, B>(
    empty: () => B,
    beregnButton: () => B,
    beregnButtonAndErrorSummary: (errors: E) => B,
    noValidChildrenOrange: () => B,
    resultBox: (result: A) => B
) => (resultView: ResultView<E, A>): B => {
    switch (resultView._tag) {
        case 'Empty': {
            return empty();
        }
        case 'BeregnButton': {
            return beregnButton();
        }
        case 'BeregnButtonAndErrorSummary': {
            return beregnButtonAndErrorSummary(resultView.errors);
        }
        case 'NoValidChildrenOrange': {
            return noValidChildrenOrange();
        }
        case 'ResultBox': {
            return resultBox(resultView.result);
        }
    }
};
