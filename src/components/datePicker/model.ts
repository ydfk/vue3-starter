export type DisabledTime = {
  disabledHours: () => number[];
  disabledMinutes: () => number[];
  disabledSeconds: () => number[];
};
