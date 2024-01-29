import { KeysI, KeysRowI } from "@/interfaces";

export const getEmptyKeys = (): KeysI => ([
  {
    q: {code: 'q', row: 0, status: '0'},
    w: {code: 'w', row: 0, status: '0'},
    e: {code: 'e', row: 0, status: '0'},
    r: {code: 'r', row: 0, status: '0'},
    t: {code: 't', row: 0, status: '0'},
    y: {code: 'y', row: 0, status: '0'},
    u: {code: 'u', row: 0, status: '0'},
    i: {code: 'i', row: 0, status: '0'},
    o: {code: 'o', row: 0, status: '0'},
    p: {code: 'p', row: 0, status: '0'},
  },
  {
    a: {code: 'a', row: 1, status: '0'},
    s: {code: 's', row: 1, status: '0'},
    d: {code: 'd', row: 1, status: '0'},
    f: {code: 'f', row: 1, status: '0'},
    g: {code: 'g', row: 1, status: '0'},
    h: {code: 'h', row: 1, status: '0'},
    j: {code: 'j', row: 1, status: '0'},
    k: {code: 'k', row: 1, status: '0'},
    l: {code: 'l', row: 1, status: '0'},
  },
  {
    enter: {code: 'enter', row: 2, status: '0', large: true},
    z: {code: 'z', row: 2, status: '0'},
    x: {code: 'x', row: 2, status: '0'},
    c: {code: 'c', row: 2, status: '0'},
    v: {code: 'v', row: 2, status: '0'},
    b: {code: 'b', row: 2, status: '0'},
    n: {code: 'n', row: 2, status: '0'},
    m: {code: 'm', row: 2, status: '0'},
    backspace: {code: 'backspace', row: 2, status: '0', large: true},
  }
]);

export const getClonedKeys = (keys: KeysI) => {
  const newKeys: KeysI = [];
  keys.forEach(row => {
    const newRow: KeysRowI = {};
    Object.keys(row).forEach(key => {
      newRow[key] = {...row[key]};
    });
    newKeys.push(newRow);
  });
  return newKeys;
};

export const getKeyRow = (keys: KeysI, letter: string): KeysRowI => {
  const newRow = keys.find(row => Object.keys(row).includes(letter));
  return newRow || {};
};
