module.exports = {
    checkCategoryBeforeInsert: function checkCategoryBeforeInsert(category){
        if(!category.categoryLibelle || category.categoryLibelle === '') return false;
        if(!category.categoryType || category.categoryType === '') return false;
        return true;
    }
}