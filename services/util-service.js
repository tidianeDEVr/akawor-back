module.exports = {
    generateSlug: function generateSlug(libelle) {
        var first = libelle.replaceAll(' ','-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return first.toLowerCase();
    }
}