import {DataNote} from 'store/types/notes';

export const search = (arr: DataNote[], text: string): DataNote[] => {
  if (!text.length) return arr;
  const array = arr.filter(item => {
    return (
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.description.toLowerCase().includes(text.toLowerCase())
    );
  });
  return array;
};
