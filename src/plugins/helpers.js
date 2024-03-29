import CryptoJS from 'crypto-js'

const Helpers = {
    /*
     * Crypto
     * - Bu method vasitesi ile istenilen
     *   text sifreleyirik
     * */
    crypto(type, text, key) {
        if (type === 'decode') return text ? CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8) : null;
        return text ? CryptoJS.AES.encrypt(text, key).toString() : null;
    },
    /*
     * Merge Nested
     * */
    mergeNested(array, key = 'children') {
        if (!array.filter(a => a[key]).length) {
            return array;
        }
        else {
            array.map(a => {
                if (a[key]) {
                    array = array.concat(a[key] || []);
                    delete a[key];
                }
            })
            return this.mergeNested(array.map(i => {
                return {...i}
            }))
        }
    },
    /*
     * Replace All
     * */
    replaceAll(str, find, replace) {
        for (let i = 0; i < find.length; i++) {
            str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
        }
        return str;
    },
    /*
     * Recursive Search
     * */
    recursiveSearch(find, search, arr, objectName = 'children') {
        return arr.reduce((a, item) => {
            if (a) return a;
            if (item[find] === search) return item;
            if (item[objectName]) return this.recursiveSearch(find, search, item[objectName], objectName)
        }, null);
    },
    /*
     * Recursive Not Search
     * */
    recursiveNotSearch(find, search, arr, objectName = 'children') {
        return arr.filter(o => {
            const keep = o[find] !== search;
            if (keep && o[objectName]) o[objectName] = this.recursiveNotSearch(find, search, o[objectName], objectName);
            return keep;
        });
    },
    /*
     * Can
     * */
    can(value) {
        let permission = Array.isArray(value) ? value : (value ? value.split('.') : []);
        let permissions = localStorage._p ? JSON.parse(this.crypto('decode', localStorage._p, 'Permission')) : [];
        let result = value === 'accept';

        if (permissions.length && value !== 'accept') {
            if (Array.isArray(value)) {
                let newPermission = [];
                permissions.forEach(i => {
                    Object.keys(i.options).forEach(k => {
                        if (i.options[k]) newPermission.push(i.key + '.' + k)
                    });
                })
                result = newPermission.some(i => value.includes(i));
            }
            else {
                const findPermission = permissions.find(i => i.key === permission[0]);
                if (findPermission) {
                    const findOption = findPermission.options[permission[1]];
                    if (findOption) result = true;
                }
            }
        }
        return result;
    },
    /*
     * Youtube Get Id
     * */
    youtubeGetId(val) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = val.match(regExp);
        return (match && match[7].length === 11) ? 'https://www.youtube.com/embed/' + match[7] : false;
    },
    /*
     * Get Iframe Src
     * */
    getIframeSrc(val, type = null) {
        let pattern = /<iframe.*?\/iframe>/gm;
        return val.replace(pattern, function (sMatch) {
            let url = /src="(.*?)"/g.exec(sMatch);
            url = url[0].replace('src="', '');
            url = url.replace('"', '');
            if (type === 'remove_http') {
                url = url.replace('https://', '');
                url = url.replace('http://', '');
            }
            return url;
        });
    },
    /*
     * Print
     * */
    print(id) {
        const prtHtml = document.getElementById(id).innerHTML;
        let stylesHtml = '';
        for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML;
        }
        const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(`<!DOCTYPE html>
            <html>
              <head>
                ${stylesHtml}
              </head>
              <body>
                ${prtHtml}
              </body>
            </html>`
        );
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    },
    /*
     * Current Screen
     * */
    currentScreen(screen = null) {
        const size = {
            xs: {max: '480px'},
            sm: {max: '768px', min: '481px'},
            md: {max: '1024px', min: '769px'},
            lg: {max: '1440px', min: '1025px'},
            xl: {max: '1441px'},
        }
        const xs = window.matchMedia(`(max-width: ${size.xs.max})`).matches,
            sm = window.matchMedia(`(max-width: ${size.sm.max}) and (min-width:  ${size.sm.min})`).matches,
            md = window.matchMedia(`(max-width: ${size.md.max}) and (min-width:  ${size.md.min})`).matches,
            lg = window.matchMedia(`(max-width: ${size.lg.max}) and (min-width:  ${size.lg.min})`).matches,
            xl = window.matchMedia(`(min-width: ${size.xl.max})`).matches,
            result = {
                xs: {status: xs, size: size.xs},
                sm: {status: sm, size: size.sm},
                md: {status: md, size: size.md},
                lg: {status: lg, size: size.lg},
                xl: {status: xl, size: size.xl},
            };
        if (screen) return result[screen];
        return result;
    }

}

export default Helpers
