import {erOverAttenOgForbiDetAttendeKalenderår, erOverTolvOgForbiDetTolvteKalenderår} from '../utils';
import moment from 'moment';


describe('erOverTolvOgForbiDetTolvteKalenderår', () => {
    const currentDay = moment('2020-10-03');
    it('expected age 8', () => {
        expect(erOverTolvOgForbiDetTolvteKalenderår('2012-01-13', currentDay)).toBe(false);
    });
    it('expected age 12, and in the 12th calendar year', () => {
        expect(erOverTolvOgForbiDetTolvteKalenderår('2008-01-13', currentDay)).toBe(false);
    });
    it('expected age 12, but in the 13th calendar year', () => {
        expect(erOverTolvOgForbiDetTolvteKalenderår('2007-12-13', currentDay)).toBe(true);
    });
    it('expected age 13, and calendar year doesnt matter', () => {
        expect(erOverTolvOgForbiDetTolvteKalenderår('2006-12-13', currentDay)).toBe(true);
    });
});

describe('erOverAttenOgForbiDetAttendeKalenderår', () => {
    const currentDay = moment('2020-10-03');
    it('expected age 17', () => {
        expect(erOverAttenOgForbiDetAttendeKalenderår('2003-01-13', currentDay)).toBe(false);
    });
    it('expected age 18, and in the 18th calendar year', () => {
        expect(erOverAttenOgForbiDetAttendeKalenderår('2002-01-13', currentDay)).toBe(false);
    });
    it('expected age 18, but in the 19th calendar year', () => {
        expect(erOverAttenOgForbiDetAttendeKalenderår('2001-12-13', currentDay)).toBe(true);
    });
    it('expected age 19, and calendar year doesnt matter', () => {
        expect(erOverAttenOgForbiDetAttendeKalenderår('2001-09-13', currentDay)).toBe(true);
    });
});
