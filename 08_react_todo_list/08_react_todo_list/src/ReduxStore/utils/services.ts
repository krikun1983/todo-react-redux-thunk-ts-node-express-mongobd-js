import {DataCategory} from 'ReduxStore/reducers/categoryState';

export const findIdsForDel = (
  arrOfIdsDel: number[],
  objCategoriesState: {[key: number]: DataCategory},
  payloadId: number,
): number[] => {
  if (objCategoriesState[payloadId].children.length > 0) {
    arrOfIdsDel.push(payloadId);
    objCategoriesState[payloadId].children.forEach(id => {
      findIdsForDel(arrOfIdsDel, objCategoriesState, id);
    });
  } else {
    arrOfIdsDel.push(payloadId);
  }
  return arrOfIdsDel;
};

export const getDataIdsStateWithoutIdsDel = (
  arrIdsState: number[],
  arrOfIdsDel: number[],
): number[] =>
  arrIdsState.reduce((acc, ids) => {
    if (!arrOfIdsDel.includes(ids)) {
      acc.push(ids);
    }
    return acc;
  }, [] as number[]);

export const getDataCategoryStateClone = (
  objCategoriesState: {[key: number]: DataCategory},
  objPayload: DataCategory,
): {[key: number]: DataCategory} => {
  const objCategoriesStateClone = JSON.parse(
    JSON.stringify(objCategoriesState),
  );

  if (objCategoriesStateClone[objPayload.id].parentId !== null) {
    objCategoriesStateClone[objPayload.parentId as number].children.splice(
      objCategoriesStateClone[objPayload.parentId as number].children.indexOf(
        objPayload.id,
      ),
      1,
    );
  }

  const arrOfIdsDel = findIdsForDel([], objCategoriesStateClone, objPayload.id);
  arrOfIdsDel.forEach(id => {
    delete objCategoriesStateClone[id];
  });

  return objCategoriesStateClone;
};
