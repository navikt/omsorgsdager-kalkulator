export function stringEnum<T extends { [index: string]: U }, U extends string>(x: T) {
  return x;
}

export const AlderEnum = stringEnum({
  UNDER12: 'under12',
  OVER12: 'over12',
});

export type AlderType = typeof AlderEnum[keyof typeof AlderEnum];

interface Barn {
  kroniskSykt?: boolean;
  alder?: AlderType;
  søkerHarAleneomsorgFor?: boolean;
  id: string;
}

export default Barn;