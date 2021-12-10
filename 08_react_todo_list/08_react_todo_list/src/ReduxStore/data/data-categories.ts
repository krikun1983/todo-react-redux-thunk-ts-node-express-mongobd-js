export const DATA_IDS = [1, 2, 3, 4, 5, 6, 7];

export const DATA_CATEGORIES = {
  1: {
    category: '1 категория',
    parentId: null,
    children: [3, 4],
    id: 1,
  },
  2: {
    category: '2 категория',
    parentId: null,
    children: [5],
    id: 2,
  },
  3: {
    category: '3 категория',
    parentId: 1,
    children: [6],
    id: 3,
  },
  4: {
    category: '4 категория',
    parentId: 1,
    children: [],
    id: 4,
  },
  5: {
    category: '5 категория',
    parentId: 2,
    children: [],
    id: 5,
  },
  6: {
    category: '6 категория',
    parentId: 3,
    children: [7],
    id: 6,
  },
  7: {
    category: '7 категория',
    parentId: 6,
    children: [],
    id: 7,
  },
};
