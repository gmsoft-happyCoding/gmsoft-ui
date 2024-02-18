export enum Mode {
  // 随机抽取
  DRAW = 'draw',
  // 搜索
  SEARCH = 'search',
}

export const ModeOptions = [
  {
    label: '随机抽取',
    value: Mode.DRAW,
  },
  {
    label: '搜索',
    value: Mode.SEARCH,
  },
];
