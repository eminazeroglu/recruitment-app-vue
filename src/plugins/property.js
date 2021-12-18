/*
 * Title Case
 * */
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
/*
 * Pascal Case
 * */
String.prototype.toPascalCase = function () {
    return this
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), s => s.toUpperCase());
};

/*
 * Limit
 * */
Array.prototype.limit = function (c) {
    return this.filter((x, i) => i <= (c - 1));
};

/*
 * Skip
 * */
Array.prototype.skip = function (c) {
    return this.filter((x, i) => i > (c - 1))
}

/*
 * Between
 * */
Array.prototype.between = function (from, to, inclusive = true) {
    if (inclusive) return this.filter((x, i) => i >= (from - 1) && i <= (to - 1))
    if (!inclusive) return this.filter((x, i) => i > (from - 1) && i < (to - 1))
}

/*
 * Exclude
 * */
Array.prototype.exclude = function (from, to, inclusive = true) {
    if (inclusive) return this.filter((x, i) => i <= (from - 1) || i >= (to - 1))
    if (!inclusive) return this.filter((x, i) => i < (from - 1) || i > (to - 1))
}

