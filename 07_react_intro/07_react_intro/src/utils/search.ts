import {DataNotes} from '../store/types/notes';

export const search = (arr: DataNotes[], text: string): DataNotes[] => {
  if (!text.length) return arr;
  const array = arr.filter(item => {
    return (
      item.title.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      item.description.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
  });
  return array;
};
