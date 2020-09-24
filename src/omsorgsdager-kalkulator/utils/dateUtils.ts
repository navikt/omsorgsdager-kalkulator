import moment from "moment";

export const getStartDate = (): string => {
    const year = moment().year();
    if (year === 2020) {
        return '1. juli';
    }
    return '1. januar';
};
export const getYear = (): number => moment().year();
