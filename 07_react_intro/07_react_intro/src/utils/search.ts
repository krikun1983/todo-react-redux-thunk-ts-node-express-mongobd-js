import {DataNotes} from '../store/types/notes';

export const search = (arr: DataNotes[], text: string): DataNotes[] => {
  if (!text.length) return arr;
  const array = arr.filter(item => {
    return (
      item.header.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      item.text.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
  });
  return array;
};
