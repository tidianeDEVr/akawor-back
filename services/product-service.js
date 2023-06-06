module.exports = {
    checkProductBeforeInsert: function checkProductBeforeInsert(product){
        if(!product.productTitle || product.productTitle === '') return false;
        if(!product.productPrice || product.productPrice === '') return false;
        if(!product.productDescription || product.productDescription === '') return false;
        return true;
    }
}