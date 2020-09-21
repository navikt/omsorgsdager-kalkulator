import { YesOrNo } from './types';

export const isYesOrNo = (value: string): value is YesOrNo => value === YesOrNo.Yes || value === YesOrNo.No;

export const isNumber = (input: any): input is number => {
    return typeof input === 'number';
};
