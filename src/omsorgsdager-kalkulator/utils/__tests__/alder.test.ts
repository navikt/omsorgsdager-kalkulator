import {erForbiDetAttendeKalenderår, erForbiDetTolvteKalenderår} from '../utils';
import moment from 'moment';


describe('erForbiDetTolvteKalenderår', () => {
    const currentDay = moment('2020-10-03');
    it('2009 -> det 11 kalenderår -> false', () => {
        expect(erForbiDetTolvteKalenderår(2009, currentDay)).toBe(false);
    });
    it('2008 -> det 12 kalenderår -> false', () => {
        expect(erForbiDetTolvteKalenderår(2008, currentDay)).toBe(false);
    });
    it('2007 -> det 13 kalenderår -> true', () => {
        expect(erForbiDetTolvteKalenderår(2007, currentDay)).toBe(true);
    });
});

describe('erForbiDetAttendeKalenderår', () => {
    const currentDay = moment('2020-10-03');
    it('2003 -> det 17 kalenderår -> true', () => {
        expect(erForbiDetAttendeKalenderår(2003, currentDay)).toBe(false);
    });
    it('2002 -> det 18 kalenderår -> true', () => {
        expect(erForbiDetAttendeKalenderår(2002, currentDay)).toBe(false);
    });
    it('2001 -> det 19 kalenderår -> true', () => {
        expect(erForbiDetAttendeKalenderår(2001, currentDay)).toBe(true);
    });
});
