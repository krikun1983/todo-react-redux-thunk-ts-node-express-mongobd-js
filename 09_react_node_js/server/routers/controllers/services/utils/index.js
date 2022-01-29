export const findIdsForDel = (
  arrIdsDel,
  allCategories,
  payloadId,
) => {
  const currentCategory = allCategories.find(item => item.id === payloadId);

  if (currentCategory.children.length) {
    arrIdsDel.push(payloadId);

    currentCategory.children.forEach(id => {
      findIdsForDel(arrIdsDel, allCategories, id);
    });
  } else {
    arrIdsDel.push(payloadId);
  }

  return arrIdsDel;
};