module.exports = {
    generateSlug: function generateSlug(libelle) {
        const notAllowed = [",", "*", "'", "$", "%", "ù", ";", "|", "@", "#", " ", "+", "="]
        var slug;
        notAllowed.map(function(item){
            slug = libelle.replaceAll(item, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        });
        return slug.toLowerCase();
    }
}