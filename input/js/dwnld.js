(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document")
            }
            return factory(w)
        }
    } else {
        factory(global)
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var arr = [];
    var document = window.document;
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var version = "2.2.4",
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context)
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return letter.toUpperCase()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(num) {
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this)
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret
        },
        each: function(callback) {
            return jQuery.each(this, callback)
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (i === length) {
            target = this;
            i--
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {}
                        }
                        target[name] = jQuery.extend(deep, clone, copy)
                    } else if (copy !== undefined) {
                        target[name] = copy
                    }
                }
            }
        }
        return target
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg)
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function"
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return obj != null && obj === obj.window
        },
        isNumeric: function(obj) {
            var realStringObj = obj && obj.toString();
            return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0
        },
        isPlainObject: function(obj) {
            var key;
            if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false
            }
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
                return false
            }
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key)
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false
            }
            return true
        },
        type: function(obj) {
            if (obj == null) {
                return obj + ""
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code);
            if (code) {
                if (code.indexOf("use strict") === 1) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild(script).parentNode.removeChild(script)
                } else {
                    indirect(code)
                }
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break
                    }
                }
            }
            return obj
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
                } else {
                    push.call(ret, arr)
                }
            }
            return ret
        },
        inArray: function(elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i)
        },
        merge: function(first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j]
            }
            first.length = i;
            return first
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i])
                }
            }
            return matches
        },
        map: function(elems, callback, arg) {
            var length, value, i = 0,
                ret = [];
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value)
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value)
                    }
                }
            }
            return concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp
            }
            if (!jQuery.isFunction(fn)) {
                return undefined
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy
        },
        now: Date.now,
        support: support
    });
    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
    }
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });

    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj
    }
    var Sizzle = function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date,
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true
                }
                return 0
            },
            MAX_NEGATIVE = 1 << 31,
            hasOwn = {}.hasOwnProperty,
            arr = [],
            pop = arr.pop,
            push_native = arr.push,
            push = arr.push,
            slice = arr.slice,
            indexOf = function(list, elem) {
                var i = 0,
                    len = list.length;
                for (; i < len; i++) {
                    if (list[i] === elem) {
                        return i
                    }
                }
                return -1
            },
            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            whitespace = "[\\x20\\t\\r\\n\\f]",
            identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
            pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
            rwhitespace = new RegExp(whitespace + "+", "g"),
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
            rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
                ID: new RegExp("^#(" + identifier + ")"),
                CLASS: new RegExp("^\\.(" + identifier + ")"),
                TAG: new RegExp("^(" + identifier + "|[*])"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + booleans + ")$", "i"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            },
            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rnative = /^[^{]+\{\s*\[native \w/,
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rsibling = /[+~]/,
            rescape = /'|\\/g,
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
            funescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 65536;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
            },
            unloadHandler = function() {
                setDocument()
            };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els))
                } : function(target, els) {
                    var j = target.length,
                        i = 0;
                    while (target[j++] = els[i++]) {}
                    target.length = j - 1
                }
            }
        }

        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument,
                nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results
            }
            if (!seed) {
                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context)
                }
                context = context || document;
                if (documentIsHTML) {
                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                        if (m = match[1]) {
                            if (nodeType === 9) {
                                if (elem = context.getElementById(m)) {
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results
                                    }
                                } else {
                                    return results
                                }
                            } else {
                                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results
                                }
                            }
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results
                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results
                        }
                    }
                    if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (nodeType !== 1) {
                            newContext = context;
                            newSelector = selector
                        } else if (context.nodeName.toLowerCase() !== "object") {
                            if (nid = context.getAttribute("id")) {
                                nid = nid.replace(rescape, "\\$&")
                            } else {
                                context.setAttribute("id", nid = expando)
                            }
                            groups = tokenize(selector);
                            i = groups.length;
                            nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
                            while (i--) {
                                groups[i] = nidselect + " " + toSelector(groups[i])
                            }
                            newSelector = groups.join(",");
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, newContext.querySelectorAll(newSelector));
                                return results
                            } catch (qsaError) {} finally {
                                if (nid === expando) {
                                    context.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed)
        }

        function createCache() {
            var keys = [];

            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()]
                }
                return cache[key + " "] = value
            }
            return cache
        }

        function markFunction(fn) {
            fn[expando] = true;
            return fn
        }

        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div)
            } catch (e) {
                return false
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div)
                }
                div = null
            }
        }

        function addHandle(attrs, handler) {
            var arr = attrs.split("|"),
                i = arr.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler
            }
        }

        function siblingCheck(a, b) {
            var cur = b && a,
                diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff
            }
            if (cur) {
                while (cur = cur.nextSibling) {
                    if (cur === b) {
                        return -1
                    }
                }
            }
            return a ? 1 : -1
        }

        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type
            }
        }

        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type
            }
        }

        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[j = matchIndexes[i]]) {
                            seed[j] = !(matches[j] = seed[j])
                        }
                    }
                })
            })
        }

        function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false
        };
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document
            }
            document = doc;
            docElem = document.documentElement;
            documentIsHTML = !isXML(document);
            if ((parent = document.defaultView) && parent.top !== parent) {
                if (parent.addEventListener) {
                    parent.addEventListener("unload", unloadHandler, false)
                } else if (parent.attachEvent) {
                    parent.attachEvent("onunload", unloadHandler)
                }
            }
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className")
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(document.createComment(""));
                return !div.getElementsByTagName("*").length
            });
            support.getElementsByClassName = rnative.test(document.getElementsByClassName);
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !document.getElementsByName || !document.getElementsByName(expando).length
            });
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m ? [m] : []
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId
                    }
                }
            } else {
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                        return node && node.value === attrId
                    }
                }
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== "undefined") {
                    return context.getElementsByTagName(tag)
                } else if (support.qsa) {
                    return context.querySelectorAll(tag)
                }
            } : function(tag, context) {
                var elem, tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while (elem = results[i++]) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem)
                        }
                    }
                    return tmp
                }
                return results
            };
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                    return context.getElementsByClassName(className)
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support.qsa = rnative.test(document.querySelectorAll)) {
                assert(function(div) {
                    docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
                    if (div.querySelectorAll("[msallowcapture^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
                    }
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
                    }
                    if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=")
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked")
                    }
                    if (!div.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]")
                    }
                });
                assert(function(div) {
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=")
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled")
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:")
                })
            }
            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos)
                })
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
            } : function(a, b) {
                if (b) {
                    while (b = b.parentNode) {
                        if (b === a) {
                            return true
                        }
                    }
                }
                return false
            };
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                    if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1
                    }
                    if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1
                    }
                    return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0
                }
                return compare & 4 ? -1 : 1
            } : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                }
                var cur, i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];
                if (!aup || !bup) {
                    return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0
                } else if (aup === bup) {
                    return siblingCheck(a, b)
                }
                cur = a;
                while (cur = cur.parentNode) {
                    ap.unshift(cur)
                }
                cur = b;
                while (cur = cur.parentNode) {
                    bp.unshift(cur)
                }
                while (ap[i] === bp[i]) {
                    i++
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
            };
            return document
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem)
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [elem]).length > 0
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context)
            }
            return contains(context, elem)
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem)
            }
            var fn = Expr.attrHandle[name.toLowerCase()],
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [],
                j = 0,
                i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) {
                    if (elem === results[i]) {
                        j = duplicates.push(i)
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1)
                }
            }
            sortInput = null;
            return results
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (!nodeType) {
                while (node = elem[i++]) {
                    ret += getText(node)
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem)
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue
            }
            return ret
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " "
                    }
                    return match.slice(0, 4)
                },
                CHILD: function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0])
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +(match[7] + match[8] || match[3] === "odd")
                    } else if (match[3]) {
                        Sizzle.error(match[0])
                    }
                    return match
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || ""
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess)
                    }
                    return match.slice(0, 3)
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "")
                    })
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!="
                        }
                        if (!operator) {
                            return true
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
                    }
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode
                    } : function(elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType,
                            diff = false;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling"
                                }
                                return true
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                node = parent;
                                outerCache = node[expando] || (node[expando] = {});
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                cache = uniqueCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = nodeIndex && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        uniqueCache[type] = [dirruns, nodeIndex, diff];
                                        break
                                    }
                                }
                            } else {
                                if (useCache) {
                                    node = elem;
                                    outerCache = node[expando] || (node[expando] = {});
                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                    cache = uniqueCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = nodeIndex
                                }
                                if (diff === false) {
                                    while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                            if (useCache) {
                                                outerCache = node[expando] || (node[expando] = {});
                                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                uniqueCache[type] = [dirruns, diff]
                                            }
                                            if (node === elem) {
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0
                        }
                    }
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument)
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i])
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }
                    }
                    return fn
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--) {
                            if (elem = unmatched[i]) {
                                seed[i] = !(matches[i] = elem)
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        input[0] = null;
                        return !results.pop()
                    }
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                contains: markFunction(function(text) {
                    text = text.replace(runescape, funescape);
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                lang: markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang)
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false
                    }
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                },
                root: function(elem) {
                    return elem === docElem
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                enabled: function(elem) {
                    return elem.disabled === false
                },
                disabled: function(elem) {
                    return elem.disabled === true
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex
                    }
                    return elem.selected === true
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false
                        }
                    }
                    return true
                },
                parent: function(elem) {
                    return !Expr.pseudos["empty"](elem)
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName)
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button"
                },
                text: function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
                },
                first: createPositionalPseudo(function() {
                    return [0]
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument]
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
            Expr.pseudos[i] = createInputPseudo(i)
        }
        for (i in {
                submit: true,
                reset: true
            }) {
            Expr.pseudos[i] = createButtonPseudo(i)
        }

        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters;
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0)
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar
                    }
                    groups.push(tokens = [])
                }
                matched = false;
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length)
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length)
                    }
                }
                if (!matched) {
                    break
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        };

        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value
            }
            return selector
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while (elem = elem[dir]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml)
                    }
                }
            } : function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true
                            }
                        }
                    }
                } else {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                            if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return newCache[2] = oldCache[2]
                            } else {
                                uniqueCache[dir] = newCache;
                                if (newCache[2] = matcher(elem, context, xml)) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false
                    }
                }
                return true
            } : matchers[0]
        }

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results)
            }
            return results
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if (elem = unmatched[i]) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i)
                        }
                    }
                }
            }
            return newUnmatched
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter)
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector)
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml)
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if (elem = temp[i]) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if (elem = matcherOut[i]) {
                                    temp.push(matcherIn[i] = elem)
                                }
                            }
                            postFinder(null, matcherOut = [], temp, xml)
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem)
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml)
                    } else {
                        push.apply(results, matcherOut)
                    }
                }
            })
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(function(elem) {
                    return elem === checkContext
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function(elem) {
                    return indexOf(checkContext, elem) > -1
                }, implicitRelative, true),
                matchers = [function(elem, context, xml) {
                    var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                    checkContext = null;
                    return ret
                }];
            for (; i < len; i++) {
                if (matcher = Expr.relative[tokens[i].type]) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)]
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens))
                    }
                    matchers.push(matcher)
                }
            }
            return elementMatcher(matchers)
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function(seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        setMatched = [],
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1,
                        len = elems.length;
                    if (outermost) {
                        outermostContext = context === document || context || outermost
                    }
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            if (!context && elem.ownerDocument !== document) {
                                setDocument(elem);
                                xml = !documentIsHTML
                            }
                            while (matcher = elementMatchers[j++]) {
                                if (matcher(elem, context || document, xml)) {
                                    results.push(elem);
                                    break
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique
                            }
                        }
                        if (bySet) {
                            if (elem = !matcher && elem) {
                                matchedCount--
                            }
                            if (seed) {
                                unmatched.push(elem)
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while (matcher = setMatchers[j++]) {
                            matcher(unmatched, setMatched, context, xml)
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results)
                                    }
                                }
                            }
                            setMatched = condense(setMatched)
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                            Sizzle.uniqueSort(results)
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup
                    }
                    return unmatched
                };
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector)
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached)
                    } else {
                        elementMatchers.push(cached)
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector
            }
            return cached
        };
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector,
                match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results
                    } else if (compiled) {
                        context = context.parentNode
                    }
                    selector = selector.slice(tokens.shift().value.length)
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[type = token.type]) {
                        break
                    }
                    if (find = Expr.find[type]) {
                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results
                            }
                            break
                        }
                    }
                }
            }(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
            return results
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1
        });
        if (!assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild.getAttribute("href") === "#"
            })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
                }
            })
        }
        if (!support.attributes || !assert(function(div) {
                div.innerHTML = "<input/>";
                div.firstChild.setAttribute("value", "");
                return div.firstChild.getAttribute("value") === ""
            })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue
                }
            })
        }
        if (!assert(function(div) {
                return div.getAttribute("disabled") == null
            })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
                }
            })
        }
        return Sizzle
    }(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var dir = function(elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;
        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break
                }
                matched.push(elem)
            }
        }
        return matched
    };
    var siblings = function(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n)
            }
        }
        return matched
    };
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple = /^.[^:#\[\.,]*$/;

    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            })
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            })
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not)
            }
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not
        })
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")"
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1
        }))
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length,
                ret = [],
                self = this;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true
                        }
                    }
                }))
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret)
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false))
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true))
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function(selector, context, root) {
            var match, elem;
            if (!selector) {
                return this
            }
            root = root || rootjQuery;
            if (typeof selector === "string") {
                if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                    match = [null, selector, null]
                } else {
                    match = rquickExpr.exec(selector)
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match])
                                } else {
                                    this.attr(match, context[match])
                                }
                            }
                        }
                        return this
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            this.length = 1;
                            this[0] = elem
                        }
                        this.context = document;
                        this.selector = selector;
                        return this
                    }
                } else if (!context || context.jquery) {
                    return (context || root).find(selector)
                } else {
                    return this.constructor(context).find(selector)
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this
            } else if (jQuery.isFunction(selector)) {
                return root.ready !== undefined ? root.ready(selector) : selector(jQuery)
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context
            }
            return jQuery.makeArray(selector, this)
        };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this),
                l = targets.length;
            return this.filter(function() {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true
                    }
                }
            })
        },
        closest: function(selectors, context) {
            var cur, i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
        },
        index: function(elem) {
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0])
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem)
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))))
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
        }
    });

    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null
        },
        parents: function(elem) {
            return dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return siblings(elem.firstChild)
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until
            }
            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched)
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched)
                }
                if (rparentsprev.test(name)) {
                    matched.reverse()
                }
            }
            return this.pushStack(matched)
        }
    });
    var rnotwhite = /\S+/g;

    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true
        });
        return object
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [],
            queue = [],
            firingIndex = -1,
            fire = function() {
                locked = options.once;
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                            firingIndex = list.length;
                            memory = false
                        }
                    }
                }
                if (!options.memory) {
                    memory = false
                }
                firing = false;
                if (locked) {
                    if (memory) {
                        list = []
                    } else {
                        list = ""
                    }
                }
            },
            self = {
                add: function() {
                    if (list) {
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory)
                        }(function add(args) {
                            jQuery.each(args, function(_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg)
                                    }
                                } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                                    add(arg)
                                }
                            })
                        })(arguments);
                        if (memory && !firing) {
                            fire()
                        }
                    }
                    return this
                },
                remove: function() {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (index <= firingIndex) {
                                firingIndex--
                            }
                        }
                    });
                    return this
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0
                },
                empty: function() {
                    if (list) {
                        list = []
                    }
                    return this
                },
                disable: function() {
                    locked = queue = [];
                    list = memory = "";
                    return this
                },
                disabled: function() {
                    return !list
                },
                lock: function() {
                    locked = queue = [];
                    if (!memory) {
                        list = memory = ""
                    }
                    return this
                },
                locked: function() {
                    return !!locked
                },
                fireWith: function(context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire()
                        }
                    }
                    return this
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!fired
                }
            };
        return self
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject)
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                    }
                                })
                            });
                            fns = null
                        }).promise()
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise
                    }
                },
                deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock)
                }
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this
                };
                deferred[tuple[0] + "With"] = list.fireWith
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred)
            }
            return deferred
        },
        when: function(subordinate) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values)
                        } else if (!--remaining) {
                            deferred.resolveWith(contexts, values)
                        }
                    }
                },
                progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject)
                    } else {
                        --remaining
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues)
            }
            return deferred.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        jQuery.ready.promise().done(fn);
        return this
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++
            } else {
                jQuery.ready(true)
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready")
            }
        }
    });

    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready()
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
                window.setTimeout(jQuery.ready)
            } else {
                document.addEventListener("DOMContentLoaded", completed);
                window.addEventListener("load", completed)
            }
        }
        return readyList.promise(obj)
    };
    jQuery.ready.promise();
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw)
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value)
                    }
                }
            }
            if (fn) {
                for (; i < len; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
    };
    var acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType
    };

    function Data() {
        this.expando = jQuery.expando + Data.uid++
    }
    Data.uid = 1;
    Data.prototype = {
        register: function(owner, initial) {
            var value = initial || {};
            if (owner.nodeType) {
                owner[this.expando] = value
            } else {
                Object.defineProperty(owner, this.expando, {
                    value: value,
                    writable: true,
                    configurable: true
                })
            }
            return owner[this.expando]
        },
        cache: function(owner) {
            if (!acceptData(owner)) {
                return {}
            }
            var value = owner[this.expando];
            if (!value) {
                value = {};
                if (acceptData(owner)) {
                    if (owner.nodeType) {
                        owner[this.expando] = value
                    } else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        })
                    }
                }
            }
            return value
        },
        set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if (typeof data === "string") {
                cache[data] = value
            } else {
                for (prop in data) {
                    cache[prop] = data[prop]
                }
            }
            return cache
        },
        get: function(owner, key) {
            return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key]
        },
        access: function(owner, key, value) {
            var stored;
            if (key === undefined || key && typeof key === "string" && value === undefined) {
                stored = this.get(owner, key);
                return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key))
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key
        },
        remove: function(owner, key) {
            var i, name, camel, cache = owner[this.expando];
            if (cache === undefined) {
                return
            }
            if (key === undefined) {
                this.register(owner)
            } else {
                if (jQuery.isArray(key)) {
                    name = key.concat(key.map(jQuery.camelCase))
                } else {
                    camel = jQuery.camelCase(key);
                    if (key in cache) {
                        name = [key, camel]
                    } else {
                        name = camel;
                        name = name in cache ? [name] : name.match(rnotwhite) || []
                    }
                }
                i = name.length;
                while (i--) {
                    delete cache[name[i]]
                }
            }
            if (key === undefined || jQuery.isEmptyObject(cache)) {
                if (owner.nodeType) {
                    owner[this.expando] = undefined
                } else {
                    delete owner[this.expando]
                }
            }
        },
        hasData: function(owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache)
        }
    };
    var dataPriv = new Data;
    var dataUser = new Data;
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                dataUser.set(elem, key, data)
            } else {
                data = undefined
            }
        }
        return data
    }
    jQuery.extend({
        hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem)
        },
        data: function(elem, name, data) {
            return dataUser.access(elem, name, data)
        },
        removeData: function(elem, name) {
            dataUser.remove(elem, name)
        },
        _data: function(elem, name, data) {
            return dataPriv.access(elem, name, data)
        },
        _removeData: function(elem, name) {
            dataPriv.remove(elem, name)
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0],
                attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);
                    if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name])
                                }
                            }
                        }
                        dataPriv.set(elem, "hasDataAttrs", true)
                    }
                }
                return data
            }
            if (typeof key === "object") {
                return this.each(function() {
                    dataUser.set(this, key)
                })
            }
            return access(this, function(value) {
                var data, camelKey;
                if (elem && value === undefined) {
                    data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
                    if (data !== undefined) {
                        return data
                    }
                    camelKey = jQuery.camelCase(key);
                    data = dataUser.get(elem, camelKey);
                    if (data !== undefined) {
                        return data
                    }
                    data = dataAttr(elem, camelKey, undefined);
                    if (data !== undefined) {
                        return data
                    }
                    return
                }
                camelKey = jQuery.camelCase(key);
                this.each(function() {
                    var data = dataUser.get(this, camelKey);
                    dataUser.set(this, camelKey, value);
                    if (key.indexOf("-") > -1 && data !== undefined) {
                        dataUser.set(this, key, value)
                    }
                })
            }, null, value, arguments.length > 1, null, true)
        },
        removeData: function(key) {
            return this.each(function() {
                dataUser.remove(this, key)
            })
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = dataPriv.get(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = dataPriv.access(elem, type, jQuery.makeArray(data))
                    } else {
                        queue.push(data)
                    }
                }
                return queue || []
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type)
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress")
                }
                delete hooks.stop;
                fn.call(elem, next, hooks)
            }
            if (!startLength && hooks) {
                hooks.empty.fire()
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    dataPriv.remove(elem, [type + "queue", key])
                })
            })
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type)
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type)
                }
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!--count) {
                        defer.resolveWith(elements, [elements])
                    }
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined
            }
            type = type || "fx";
            while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve)
                }
            }
            resolve();
            return defer.promise(obj)
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var isHidden = function(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
    };

    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale = 1,
            maxIterations = 20,
            currentValue = tween ? function() {
                return tween.cur()
            } : function() {
                return jQuery.css(elem, prop, "")
            },
            initial = currentValue(),
            unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
            initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3];
            valueParts = valueParts || [];
            initialInUnit = +initial || 1;
            do {
                scale = scale || ".5";
                initialInUnit = initialInUnit / scale;
                jQuery.style(elem, prop, initialInUnit + unit)
            } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations)
        }
        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted
            }
        }
        return adjusted
    }
    var rcheckableType = /^(?:checkbox|radio)$/i;
    var rtagName = /<([\w:-]+)/;
    var rscriptType = /^$|\/(?:java|ecma)script/i;
    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll(context, tag) {
        var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
    }

    function setGlobalEval(elems, refElements) {
        var i = 0,
            l = elems.length;
        for (; i < l; i++) {
            dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"))
        }
    }
    var rhtml = /<|&#?\w+;/;

    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;
        for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
                if (jQuery.type(elem) === "object") {
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem))
                } else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild
                    }
                    jQuery.merge(nodes, tmp.childNodes);
                    tmp = fragment.firstChild;
                    tmp.textContent = ""
                }
            }
        }
        fragment.textContent = "";
        i = 0;
        while (elem = nodes[i++]) {
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem)
                }
                continue
            }
            contains = jQuery.contains(elem.ownerDocument, elem);
            tmp = getAll(fragment.appendChild(elem), "script");
            if (contains) {
                setGlobalEval(tmp)
            }
            if (scripts) {
                j = 0;
                while (elem = tmp[j++]) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem)
                    }
                }
            }
        }
        return fragment
    }(function() {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild(document.createElement("div")),
            input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue
    })();
    var rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true
    }

    function returnFalse() {
        return false
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (err) {}
    }

    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
            if (typeof selector !== "string") {
                data = data || selector;
                selector = undefined
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one)
            }
            return elem
        }
        if (data == null && fn == null) {
            fn = selector;
            data = selector = undefined
        } else if (fn == null) {
            if (typeof selector === "string") {
                fn = data;
                data = undefined
            } else {
                fn = data;
                data = selector;
                selector = undefined
            }
        }
        if (fn === false) {
            fn = returnFalse
        } else if (!fn) {
            return elem
        }
        if (one === 1) {
            origFn = fn;
            fn = function(event) {
                jQuery().off(event);
                return origFn.apply(this, arguments)
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
        }
        return elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector)
        })
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!elemData) {
                return
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {}
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined
                }
            }
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle)
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj)
                } else {
                    handlers.push(handleObj)
                }
                jQuery.event.global[type] = true
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
                return
            }
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true)
                    }
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj)
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle)
                    }
                    delete events[type]
                }
            }
            if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events")
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [],
                args = slice.call(arguments),
                handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event)
            }
            return event.result
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
                for (; cur !== this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length
                            }
                            if (matches[sel]) {
                                matches.push(handleObj)
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            })
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                })
            }
            return handlerQueue
        },
        props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode
                }
                return event
            }
        },
        mouseHooks: {
            props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                }
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0
                }
                return event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event
            }
            var i, prop, copy, type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop]
            }
            if (!event.target) {
                event.target = document
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode
            }
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                        this.click();
                        return false
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result
                    }
                }
            }
        }
    };
    jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle)
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props)
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse
        } else {
            this.type = src
        }
        if (props) {
            jQuery.extend(this, props)
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    };
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
                e.preventDefault()
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
                e.stopPropagation()
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
                e.stopImmediatePropagation()
            }
            this.stopPropagation()
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix
                }
                return ret
            }
        }
    });
    jQuery.fn.extend({
        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn)
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type])
                }
                return this
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined
            }
            if (fn === false) {
                fn = returnFalse
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        rnoInnerhtml = /<script|<style|<link/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }

    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1]
        } else {
            elem.removeAttribute("type")
        }
        return elem
    }

    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
            return
        }
        if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.access(src);
            pdataCur = dataPriv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i])
                    }
                }
            }
        }
        if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);
            dataUser.set(dest, udataCur)
        }
    }

    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue
        }
    }

    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[0],
            isFunction = jQuery.isFunction(value);
        if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
            return collection.each(function(index) {
                var self = collection.eq(index);
                if (isFunction) {
                    args[0] = value.call(this, index, self.html())
                }
                domManip(self, args, callback, ignored)
            })
        }
        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
                fragment = first
            }
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;
                for (; i < l; i++) {
                    node = fragment;
                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);
                        if (hasScripts) {
                            jQuery.merge(scripts, getAll(node, "script"))
                        }
                    }
                    callback.call(collection[i], node, i)
                }
                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;
                    jQuery.map(scripts, restoreScript);
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                            if (node.src) {
                                if (jQuery._evalUrl) {
                                    jQuery._evalUrl(node.src)
                                }
                            } else {
                                jQuery.globalEval(node.textContent.replace(rcleanScript, ""))
                            }
                        }
                    }
                }
            }
        }
        return collection
    }

    function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery.filter(selector, elem) : elem,
            i = 0;
        for (;
            (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node))
            }
            if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                    setGlobalEval(getAll(node, "script"))
                }
                node.parentNode.removeChild(node)
            }
        }
        return elem
    }
    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>")
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true),
                inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i])
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i])
                    }
                } else {
                    cloneCopyEvent(elem, clone)
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"))
            }
            return clone
        },
        cleanData: function(elems) {
            var data, elem, type, special = jQuery.event.special,
                i = 0;
            for (;
                (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                    if (data = elem[dataPriv.expando]) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type)
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle)
                                }
                            }
                        }
                        elem[dataPriv.expando] = undefined
                    }
                    if (elem[dataUser.expando]) {
                        elem[dataUser.expando] = undefined
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        domManip: domManip,
        detach: function(selector) {
            return remove(this, selector, true)
        },
        remove: function(selector) {
            return remove(this, selector)
        },
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = value
                    }
                })
            }, null, value, arguments.length)
        },
        append: function() {
            return domManip(this, arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            })
        },
        before: function() {
            return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this)
                }
            })
        },
        after: function() {
            return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling)
                }
            })
        },
        empty: function() {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.textContent = ""
                }
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value
                            }
                        }
                        elem = 0
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value)
                }
            }, null, value, arguments.length)
        },
        replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;
                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this)
                    }
                }
            }, ignored)
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, ret = [],
                insert = jQuery(selector),
                last = insert.length - 1,
                i = 0;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get())
            }
            return this.pushStack(ret)
        }
    });
    var iframe, elemdisplay = {
        HTML: "block",
        BODY: "block"
    };

    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = jQuery.css(elem[0], "display");
        elem.detach();
        return display
    }

    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                doc = iframe[0].contentDocument;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach()
            }
            elemdisplay[nodeName] = display
        }
        return display
    }
    var rmargin = /^margin/;
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = window
        }
        return view.getComputedStyle(elem)
    };
    var swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name]
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name]
        }
        return ret
    };
    var documentElement = document.documentElement;
    (function() {
        var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"),
            div = document.createElement("div");
        if (!div.style) {
            return
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
        container.appendChild(div);

        function computeStyleTests() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
            div.innerHTML = "";
            documentElement.appendChild(container);
            var divStyle = window.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = divStyle.marginLeft === "2px";
            boxSizingReliableVal = divStyle.width === "4px";
            div.style.marginRight = "50%";
            pixelMarginRightVal = divStyle.marginRight === "4px";
            documentElement.removeChild(container)
        }
        jQuery.extend(support, {
            pixelPosition: function() {
                computeStyleTests();
                return pixelPositionVal
            },
            boxSizingReliable: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests()
                }
                return boxSizingReliableVal
            },
            pixelMarginRight: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests()
                }
                return pixelMarginRightVal
            },
            reliableMarginLeft: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests()
                }
                return reliableMarginLeftVal
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                documentElement.appendChild(container);
                ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
                documentElement.removeChild(container);
                div.removeChild(marginDiv);
                return ret
            }
        })
    })();

    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
        if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
            ret = jQuery.style(elem, name)
        }
        if (computed) {
            if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth
            }
        }
        return ret !== undefined ? ret + "" : ret
    }

    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                if (conditionFn()) {
                    delete this.get;
                    return
                }
                return (this.get = hookFn).apply(this, arguments)
            }
        }
    }
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        cssPrefixes = ["Webkit", "O", "Moz", "ms"],
        emptyStyle = document.createElement("div").style;

    function vendorPropName(name) {
        if (name in emptyStyle) {
            return name
        }
        var capName = name[0].toUpperCase() + name.slice(1),
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name
            }
        }
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles)
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
                }
            }
        }
        return val
    }

    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name]
            }
            if (rnumnonpx.test(val)) {
                return val
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
    }

    function showHide(elements, show) {
        var display, elem, hidden, values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            values[index] = dataPriv.get(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = ""
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName))
                }
            } else {
                hidden = isHidden(elem);
                if (display !== "none" || !hidden) {
                    dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none"
            }
        }
        return elements
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: true,
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return
            }
            var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);
                    type = "number"
                }
                if (value == null || value !== value) {
                    return
                }
                if (type === "number") {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit"
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    style[name] = value
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret
                }
                return style[name]
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra)
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles)
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name]
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val
            }
            return val
        }
    });
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra)
                }
            },
            set: function(elem, value, extra) {
                var matches, styles = extra && getStyles(elem),
                    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
                if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                    elem.style[name] = value;
                    value = jQuery.css(elem, name)
                }
                return setPositiveNumber(elem, value, subtract)
            }
        }
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
        if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                marginLeft: 0
            }, function() {
                return elem.getBoundingClientRect().left
            })) + "px"
        }
    });
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            return swap(elem, {
                display: "inline-block"
            }, curCSS, [elem, "marginRight"])
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0,
                    expanded = {},
                    parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                }
                return expanded
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {},
                    i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles)
                    }
                    return map
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, true)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide()
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show()
                } else {
                    jQuery(this).hide()
                }
            })
        }
    });

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
            } else {
                this.pos = eased = percent
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (hooks && hooks.set) {
                hooks.set(this)
            } else {
                Tween.propHooks._default.set(this)
            }
            return this
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop]
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween)
                } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                } else {
                    tween.elem[tween.prop] = tween.now
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        },
        _default: "swing"
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    function createFxNow() {
        window.setTimeout(function() {
            fxNow = undefined
        });
        return fxNow = jQuery.now()
    }

    function genFx(type, includeWidth) {
        var which, i = 0,
            attrs = {
                height: type
            };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type
        }
        return attrs
    }

    function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
                return tween
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire()
                    }
                }
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire()
                    }
                })
            })
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            display = jQuery.css(elem, "display");
            checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                style.display = "inline-block"
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2]
            })
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true
                    } else {
                        continue
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else {
                display = undefined
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden
                }
            } else {
                dataShow = dataPriv.access(elem, "fxshow", {})
            }
            if (toggle) {
                dataShow.hidden = !hidden
            }
            if (hidden) {
                jQuery(elem).show()
            } else {
                anim.done(function() {
                    jQuery(elem).hide()
                })
            }
            anim.done(function() {
                var prop;
                dataPriv.remove(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop])
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0
                    }
                }
            }
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0]
            }
            if (index !== name) {
                props[name] = value;
                delete props[index]
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing
                    }
                }
            } else {
                specialEasing[name] = easing
            }
        }
    }

    function Animation(elem, properties, options) {
        var result, stopped, index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem
            }),
            tick = function() {
                if (stopped) {
                    return false
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent)
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) {
                    return remaining
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1)
                    }
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd])
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd])
                    }
                    return this
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (jQuery.isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)
                }
                return result
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation)
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value);
                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                return tween
            }]
        },
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"]
            } else {
                props = props.match(rnotwhite)
            }
            var prop, index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback)
            }
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback)
            } else {
                Animation.prefilters.push(callback)
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx"
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this)
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue)
            }
        };
        return opt
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true)
                    }
                };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd)
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", [])
            }
            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index])
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index])
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1)
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type)
                }
            })
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx"
            }
            return this.each(function() {
                var index, data = dataPriv.get(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true)
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1)
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this)
                    }
                }
                delete data.finish
            })
        }
    });
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
        }
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, i = 0,
            timers = jQuery.timers;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1)
            }
        }
        if (!timers.length) {
            jQuery.fx.stop()
        }
        fxNow = undefined
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start()
        } else {
            jQuery.timers.pop()
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval)
        }
    };
    jQuery.fx.stop = function() {
        window.clearInterval(timerId);
        timerId = null
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout)
            }
        })
    };
    (function() {
        var input = document.createElement("input"),
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t"
    })();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value)
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined)
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return
                }
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                }
                elem.setAttribute(name, value + "");
                return value
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret
            }
            ret = jQuery.find.attr(elem, name);
            return ret == null ? undefined : ret
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val
                        }
                        return value
                    }
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0,
                attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while (name = attrNames[i++]) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        elem[propName] = false
                    }
                    elem.removeAttribute(name)
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name)
            } else {
                elem.setAttribute(name, name)
            }
            return name
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle
            }
            return ret
        }
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name]
            })
        }
    });
    jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name]
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                }
                return elem[name] = value
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret
            }
            return elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    });
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex
                }
                return null
            },
            set: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                }
            }
        }
    }
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    });
    var rclass = /[\t\r\n\f]/g;

    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || ""
    }
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)))
                })
            }
            if (typeof value === "string" && value) {
                classes = value.match(rnotwhite) || [];
                while (elem = this[i++]) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " "
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)))
                })
            }
            if (!arguments.length) {
                return this.attr("class", "")
            }
            if (typeof value === "string" && value) {
                classes = value.match(rnotwhite) || [];
                while (elem = this[i++]) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ")
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue)
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value)
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal)
                })
            }
            return this.each(function() {
                var className, i, self, classNames;
                if (type === "string") {
                    i = 0;
                    self = jQuery(this);
                    classNames = value.match(rnotwhite) || [];
                    while (className = classNames[i++]) {
                        if (self.hasClass(className)) {
                            self.removeClass(className)
                        } else {
                            self.addClass(className)
                        }
                    }
                } else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {
                        dataPriv.set(this, "__className__", className)
                    }
                    if (this.setAttribute) {
                        this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "")
                    }
                }
            })
        },
        hasClass: function(selector) {
            var className, elem, i = 0;
            className = " " + selector + " ";
            while (elem = this[i++]) {
                if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true
                }
            }
            return false
        }
    });
    var rreturn = /\r/g,
        rspaces = /[\x20\t\r\n\f]+/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
                }
                return
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val())
                } else {
                    val = value
                }
                if (val == null) {
                    val = ""
                } else if (typeof val === "number") {
                    val += ""
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + ""
                    })
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val
                }
            })
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ")
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value
                            }
                            values.push(value)
                        }
                    }
                    return values
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;
                    while (i--) {
                        option = options[i];
                        if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                            optionSet = true
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1
                    }
                    return values
                }
            }
        }
    });
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value
            }
        }
    });
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
    jQuery.extend(jQuery.event, {
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return
            }
            if (type.indexOf(".") > -1) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort()
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data)
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault()
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                    if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp
                        }
                    }
                }
            }
            return event.result
        },
        simulate: function(type, elem, event) {
            var e = jQuery.extend(new jQuery.Event, event, {
                type: type,
                isSimulated: true
            });
            jQuery.event.trigger(e, null, elem)
        }
    });
    jQuery.fn.extend({
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true)
            }
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    });
    support.focusin = "onfocusin" in window;
    if (!support.focusin) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event))
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true)
                    }
                    dataPriv.access(doc, fix, (attaches || 0) + 1)
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        dataPriv.remove(doc, fix)
                    } else {
                        dataPriv.access(doc, fix, attaches)
                    }
                }
            }
        })
    }
    var location = window.location;
    var nonce = jQuery.now();
    var rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "")
    };
    jQuery.parseXML = function(data) {
        var xml;
        if (!data || typeof data !== "string") {
            return null
        }
        try {
            xml = (new window.DOMParser).parseFromString(data, "text/xml")
        } catch (e) {
            xml = undefined
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data)
        }
        return xml
    };
    var rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*"),
        originAnchor = document.createElement("a");
    originAnchor.href = location.href;

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*"
            }
            var dataType, i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while (dataType = dataTypes[i++]) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func)
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func)
                    }
                }
            }
        }
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {},
            seekingTransport = structure === transports;

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport)
                }
            });
            return selected
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }

    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep)
        }
        return target
    }

    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents,
            dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0]
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                if (!firstDataType) {
                    firstDataType = type
                }
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType)
            }
            return responses[finalDataType]
        }
    }

    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {},
            dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv]
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType)
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev
                } else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2]
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1])
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s.throws) {
                            response = conv(response)
                        } else {
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        }
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while (match = rheaders.exec(responseHeadersString)) {
                                    responseHeaders[match[1].toLowerCase()] = match[2]
                                }
                            }
                            match = responseHeaders[key.toLowerCase()]
                        }
                        return match == null ? null : match
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null
                    },
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value
                        }
                        return this
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type
                        }
                        return this
                    },
                    statusCode: function(map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]]
                                }
                            } else {
                                jqXHR.always(map[jqXHR.status])
                            }
                        }
                        return this
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText)
                        }
                        done(0, finalText);
                        return this
                    }
                };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");
                try {
                    urlAnchor.href = s.url;
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
                } catch (e) {
                    s.crossDomain = true
                }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional)
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart")
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType)
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i])
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort()
            }
            strAbort = "abort";
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i])
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport")
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s])
                }
                if (state === 2) {
                    return jqXHR
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout)
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (state < 2) {
                        done(-1, e)
                    } else {
                        throw e
                    }
                }
            }

            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return
                }
                state = 2;
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer)
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses)
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent"
                    } else if (status === 304) {
                        statusText = "notmodified"
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!--jQuery.active) {
                        jQuery.event.trigger("ajaxStop")
                    }
                }
            }
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined
            }
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url))
        }
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            throws: true
        })
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                })
            }
            if (this[0]) {
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0])
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild
                    }
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                })
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html)
                } else {
                    self.append(html)
                }
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes)
                }
            }).end()
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        return !jQuery.expr.filters.visible(elem)
    };
    jQuery.expr.filters.visible = function(elem) {
        return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0
    };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v)
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add)
                }
            })
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
            }
        } else {
            add(prefix, obj)
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix, s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
        }
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
                add(this.name, this.value)
            })
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add)
            }
        }
        return s.join("&").replace(r20, "+")
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    });
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest
        } catch (e) {}
    };
    var xhrSuccessStatus = {
            0: 200,
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr();
                    xhr.open(options.type, options.url, options.async, options.username, options.password);
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i]
                        }
                    }
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType)
                    }
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest"
                    }
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i])
                    }
                    callback = function(type) {
                        return function() {
                            if (callback) {
                                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                                if (type === "abort") {
                                    xhr.abort()
                                } else if (type === "error") {
                                    if (typeof xhr.status !== "number") {
                                        complete(0, "error")
                                    } else {
                                        complete(xhr.status, xhr.statusText)
                                    }
                                } else {
                                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                                        binary: xhr.response
                                    } : {
                                        text: xhr.responseText
                                    }, xhr.getAllResponseHeaders())
                                }
                            }
                        }
                    };
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = callback("error");
                    if (xhr.onabort !== undefined) {
                        xhr.onabort = errorCallback
                    } else {
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4) {
                                window.setTimeout(function() {
                                    if (callback) {
                                        errorCallback()
                                    }
                                })
                            }
                        }
                    }
                    callback = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null)
                    } catch (e) {
                        if (callback) {
                            throw e
                        }
                    }
                },
                abort: function() {
                    if (callback) {
                        callback()
                    }
                }
            }
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false
        }
        if (s.crossDomain) {
            s.type = "GET"
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                            complete(evt.type === "error" ? 404 : 200, evt.type)
                        }
                    });
                    document.head.appendChild(script[0])
                },
                abort: function() {
                    if (callback) {
                        callback()
                    }
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            this[callback] = true;
            return callback
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called")
                }
                return responseContainer[0]
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments
            };
            jqXHR.always(function() {
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName)
                } else {
                    window[callbackName] = overwritten
                }
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName)
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0])
                }
                responseContainer = overwritten = undefined
            });
            return "script"
        }
    });
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false
        }
        context = context || document;
        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];
        if (parsed) {
            return [context.createElement(parsed[1])]
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove()
        }
        return jQuery.merge([], parsed.childNodes)
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments)
        }
        var selector, type, response, self = this,
            off = url.indexOf(" ");
        if (off > -1) {
            selector = jQuery.trim(url.slice(off));
            url = url.slice(0, off)
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined
        } else if (params && typeof params === "object") {
            type = "POST"
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
            }).always(callback && function(jqXHR, status) {
                self.each(function() {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR])
                })
            })
        }
        return this
    };
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    });
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }).length
    };

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};
            if (position === "static") {
                elem.style.position = "relative"
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, jQuery.extend({}, curOffset))
            }
            if (options.top != null) {
                props.top = options.top - curOffset.top + curTop
            }
            if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft
            }
            if ("using" in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                })
            }
            var docElem, win, elem = this[0],
                box = {
                    top: 0,
                    left: 0
                },
                doc = elem && elem.ownerDocument;
            if (!doc) {
                return
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box
            }
            box = elem.getBoundingClientRect();
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }
        },
        position: function() {
            if (!this[0]) {
                return
            }
            var offsetParent, offset, elem = this[0],
                parentOffset = {
                    top: 0,
                    left: 0
                };
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect()
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset()
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent;
                while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent
                }
                return offsetParent || documentElement
            })
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? win[prop] : elem[method]
                }
                if (win) {
                    win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset)
                } else {
                    elem[method] = val
                }
            }, method, val, arguments.length)
        }
    });
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
            }
        })
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name]
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    });
    jQuery.fn.extend({
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        },
        size: function() {
            return this.length
        }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery
        })
    }
    var _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery
        }
        return jQuery
    };
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery
    }
    return jQuery
});
! function($) {
    "use strict";
    var FOUNDATION_VERSION = "6.2.4";
    var Foundation = {
        version: FOUNDATION_VERSION,
        _plugins: {},
        _uuids: [],
        rtl: function() {
            return $("html").attr("dir") === "rtl"
        },
        plugin: function(plugin, name) {
            var className = name || functionName(plugin);
            var attrName = hyphenate(className);
            this._plugins[attrName] = this[className] = plugin
        },
        registerPlugin: function(plugin, name) {
            var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
            plugin.uuid = this.GetYoDigits(6, pluginName);
            if (!plugin.$element.attr("data-" + pluginName)) {
                plugin.$element.attr("data-" + pluginName, plugin.uuid)
            }
            if (!plugin.$element.data("zfPlugin")) {
                plugin.$element.data("zfPlugin", plugin)
            }
            plugin.$element.trigger("init.zf." + pluginName);
            this._uuids.push(plugin.uuid);
            return
        },
        unregisterPlugin: function(plugin) {
            var pluginName = hyphenate(functionName(plugin.$element.data("zfPlugin").constructor));
            this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
            plugin.$element.removeAttr("data-" + pluginName).removeData("zfPlugin").trigger("destroyed.zf." + pluginName);
            for (var prop in plugin) {
                plugin[prop] = null
            }
            return
        },
        reInit: function(plugins) {
            var isJQ = plugins instanceof $;
            try {
                if (isJQ) {
                    plugins.each(function() {
                        $(this).data("zfPlugin")._init()
                    })
                } else {
                    var type = typeof plugins,
                        _this = this,
                        fns = {
                            object: function(plgs) {
                                plgs.forEach(function(p) {
                                    p = hyphenate(p);
                                    $("[data-" + p + "]").foundation("_init")
                                })
                            },
                            string: function() {
                                plugins = hyphenate(plugins);
                                $("[data-" + plugins + "]").foundation("_init")
                            },
                            undefined: function() {
                                this["object"](Object.keys(_this._plugins))
                            }
                        };
                    fns[type](plugins)
                }
            } catch (err) {
                console.error(err)
            } finally {
                return plugins
            }
        },
        GetYoDigits: function(length, namespace) {
            length = length || 6;
            return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? "-" + namespace : "")
        },
        reflow: function(elem, plugins) {
            if (typeof plugins === "undefined") {
                plugins = Object.keys(this._plugins)
            } else if (typeof plugins === "string") {
                plugins = [plugins]
            }
            var _this = this;
            $.each(plugins, function(i, name) {
                var plugin = _this._plugins[name];
                var $elem = $(elem).find("[data-" + name + "]").addBack("[data-" + name + "]");
                $elem.each(function() {
                    var $el = $(this),
                        opts = {};
                    if ($el.data("zfPlugin")) {
                        console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
                        return
                    }
                    if ($el.attr("data-options")) {
                        var thing = $el.attr("data-options").split(";").forEach(function(e, i) {
                            var opt = e.split(":").map(function(el) {
                                return el.trim()
                            });
                            if (opt[0]) opts[opt[0]] = parseValue(opt[1])
                        })
                    }
                    try {
                        $el.data("zfPlugin", new plugin($(this), opts))
                    } catch (er) {
                        console.error(er)
                    } finally {
                        return
                    }
                })
            })
        },
        getFnName: functionName,
        transitionend: function($elem) {
            var transitions = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            };
            var elem = document.createElement("div"),
                end;
            for (var t in transitions) {
                if (typeof elem.style[t] !== "undefined") {
                    end = transitions[t]
                }
            }
            if (end) {
                return end
            } else {
                end = setTimeout(function() {
                    $elem.triggerHandler("transitionend", [$elem])
                }, 1);
                return "transitionend"
            }
        }
    };
    Foundation.util = {
        throttle: function(func, delay) {
            var timer = null;
            return function() {
                var context = this,
                    args = arguments;
                if (timer === null) {
                    timer = setTimeout(function() {
                        func.apply(context, args);
                        timer = null
                    }, delay)
                }
            }
        }
    };
    var foundation = function(method) {
        var type = typeof method,
            $meta = $("meta.foundation-mq"),
            $noJS = $(".no-js");
        if (!$meta.length) {
            $('<meta class="foundation-mq">').appendTo(document.head)
        }
        if ($noJS.length) {
            $noJS.removeClass("no-js")
        }
        if (type === "undefined") {
            Foundation.MediaQuery._init();
            Foundation.reflow(this)
        } else if (type === "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            var plugClass = this.data("zfPlugin");
            if (plugClass !== undefined && plugClass[method] !== undefined) {
                if (this.length === 1) {
                    plugClass[method].apply(plugClass, args)
                } else {
                    this.each(function(i, el) {
                        plugClass[method].apply($(el).data("zfPlugin"), args)
                    })
                }
            } else {
                throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : "this element") + ".")
            }
        } else {
            throw new TypeError("We're sorry, " + type + " is not a valid parameter. You must use a string representing the method you wish to invoke.")
        }
        return this
    };
    window.Foundation = Foundation;
    $.fn.foundation = foundation;
    (function() {
        if (!Date.now || !window.Date.now) window.Date.now = Date.now = function() {
            return (new Date).getTime()
        };
        var vendors = ["webkit", "moz"];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() {
                    callback(lastTime = nextTime)
                }, nextTime - now)
            };
            window.cancelAnimationFrame = clearTimeout
        }
        if (!window.performance || !window.performance.now) {
            window.performance = {
                start: Date.now(),
                now: function() {
                    return Date.now() - this.start
                }
            }
        }
    })();
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
                };
            if (this.prototype) {
                fNOP.prototype = this.prototype
            }
            fBound.prototype = new fNOP;
            return fBound
        }
    }

    function functionName(fn) {
        if (Function.prototype.name === undefined) {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = funcNameRegex.exec(fn.toString());
            return results && results.length > 1 ? results[1].trim() : ""
        } else if (fn.prototype === undefined) {
            return fn.constructor.name
        } else {
            return fn.prototype.constructor.name
        }
    }

    function parseValue(str) {
        if (/true/.test(str)) return true;
        else if (/false/.test(str)) return false;
        else if (!isNaN(str * 1)) return parseFloat(str);
        return str
    }

    function hyphenate(str) {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }
}(jQuery);
"use strict";
! function($) {
    Foundation.Box = {
        ImNotTouchingYou: ImNotTouchingYou,
        GetDimensions: GetDimensions,
        GetOffsets: GetOffsets
    };

    function ImNotTouchingYou(element, parent, lrOnly, tbOnly) {
        var eleDims = GetDimensions(element),
            top, bottom, left, right;
        if (parent) {
            var parDims = GetDimensions(parent);
            bottom = eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top;
            top = eleDims.offset.top >= parDims.offset.top;
            left = eleDims.offset.left >= parDims.offset.left;
            right = eleDims.offset.left + eleDims.width <= parDims.width + parDims.offset.left
        } else {
            bottom = eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top;
            top = eleDims.offset.top >= eleDims.windowDims.offset.top;
            left = eleDims.offset.left >= eleDims.windowDims.offset.left;
            right = eleDims.offset.left + eleDims.width <= eleDims.windowDims.width
        }
        var allDirs = [bottom, top, left, right];
        if (lrOnly) {
            return left === right === true
        }
        if (tbOnly) {
            return top === bottom === true
        }
        return allDirs.indexOf(false) === -1
    }

    function GetDimensions(elem, test) {
        elem = elem.length ? elem[0] : elem;
        if (elem === window || elem === document) {
            throw new Error("I'm sorry, Dave. I'm afraid I can't do that.")
        }
        var rect = elem.getBoundingClientRect(),
            parRect = elem.parentNode.getBoundingClientRect(),
            winRect = document.body.getBoundingClientRect(),
            winY = window.pageYOffset,
            winX = window.pageXOffset;
        return {
            width: rect.width,
            height: rect.height,
            offset: {
                top: rect.top + winY,
                left: rect.left + winX
            },
            parentDims: {
                width: parRect.width,
                height: parRect.height,
                offset: {
                    top: parRect.top + winY,
                    left: parRect.left + winX
                }
            },
            windowDims: {
                width: winRect.width,
                height: winRect.height,
                offset: {
                    top: winY,
                    left: winX
                }
            }
        }
    }

    function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
        var $eleDims = GetDimensions(element),
            $anchorDims = anchor ? GetDimensions(anchor) : null;
        switch (position) {
            case "top":
                return {
                    left: Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left,
                    top: $anchorDims.offset.top - ($eleDims.height + vOffset)
                };
                break;
            case "left":
                return {
                    left: $anchorDims.offset.left - ($eleDims.width + hOffset),
                    top: $anchorDims.offset.top
                };
                break;
            case "right":
                return {
                    left: $anchorDims.offset.left + $anchorDims.width + hOffset,
                    top: $anchorDims.offset.top
                };
                break;
            case "center top":
                return {
                    left: $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
                    top: $anchorDims.offset.top - ($eleDims.height + vOffset)
                };
                break;
            case "center bottom":
                return {
                    left: isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
                    top: $anchorDims.offset.top + $anchorDims.height + vOffset
                };
                break;
            case "center left":
                return {
                    left: $anchorDims.offset.left - ($eleDims.width + hOffset),
                    top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
                };
                break;
            case "center right":
                return {
                    left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
                    top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
                };
                break;
            case "center":
                return {
                    left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2,
                    top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - $eleDims.height / 2
                };
                break;
            case "reveal":
                return {
                    left: ($eleDims.windowDims.width - $eleDims.width) / 2,
                    top: $eleDims.windowDims.offset.top + vOffset
                };
            case "reveal full":
                return {
                    left: $eleDims.windowDims.offset.left,
                    top: $eleDims.windowDims.offset.top
                };
                break;
            case "left bottom":
                return {
                    left: $anchorDims.offset.left,
                    top: $anchorDims.offset.top + $anchorDims.height
                };
                break;
            case "right bottom":
                return {
                    left: $anchorDims.offset.left + $anchorDims.width + hOffset - $eleDims.width,
                    top: $anchorDims.offset.top + $anchorDims.height
                };
                break;
            default:
                return {
                    left: Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left + hOffset,
                    top: $anchorDims.offset.top + $anchorDims.height + vOffset
                }
        }
    }
}(jQuery);
"use strict";
! function($) {
    var keyCodes = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    };
    var commands = {};
    var Keyboard = {
        keys: getKeyCodes(keyCodes),
        parseKey: function(event) {
            var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();
            if (event.shiftKey) key = "SHIFT_" + key;
            if (event.ctrlKey) key = "CTRL_" + key;
            if (event.altKey) key = "ALT_" + key;
            return key
        },
        handleKey: function(event, component, functions) {
            var commandList = commands[component],
                keyCode = this.parseKey(event),
                cmds, command, fn;
            if (!commandList) return console.warn("Component not defined!");
            if (typeof commandList.ltr === "undefined") {
                cmds = commandList
            } else {
                if (Foundation.rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl);
                else cmds = $.extend({}, commandList.rtl, commandList.ltr)
            }
            command = cmds[keyCode];
            fn = functions[command];
            if (fn && typeof fn === "function") {
                var returnValue = fn.apply();
                if (functions.handled || typeof functions.handled === "function") {
                    functions.handled(returnValue)
                }
            } else {
                if (functions.unhandled || typeof functions.unhandled === "function") {
                    functions.unhandled()
                }
            }
        },
        findFocusable: function($element) {
            return $element.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
                if (!$(this).is(":visible") || $(this).attr("tabindex") < 0) {
                    return false
                }
                return true
            })
        },
        register: function(componentName, cmds) {
            commands[componentName] = cmds
        }
    };

    function getKeyCodes(kcs) {
        var k = {};
        for (var kc in kcs) {
            k[kcs[kc]] = kcs[kc]
        }
        return k
    }
    Foundation.Keyboard = Keyboard
}(jQuery);
"use strict";
! function($) {
    var defaultQueries = {
        default: "only screen",
        landscape: "only screen and (orientation: landscape)",
        portrait: "only screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2)," + "only screen and (min--moz-device-pixel-ratio: 2)," + "only screen and (-o-min-device-pixel-ratio: 2/1)," + "only screen and (min-device-pixel-ratio: 2)," + "only screen and (min-resolution: 192dpi)," + "only screen and (min-resolution: 2dppx)"
    };
    var MediaQuery = {
        queries: [],
        current: "",
        _init: function() {
            var self = this;
            var extractedStyles = $(".foundation-mq").css("font-family");
            var namedQueries;
            namedQueries = parseStyleToObject(extractedStyles);
            for (var key in namedQueries) {
                if (namedQueries.hasOwnProperty(key)) {
                    self.queries.push({
                        name: key,
                        value: "only screen and (min-width: " + namedQueries[key] + ")"
                    })
                }
            }
            this.current = this._getCurrentSize();
            this._watcher()
        },
        atLeast: function(size) {
            var query = this.get(size);
            if (query) {
                return window.matchMedia(query).matches
            }
            return false
        },
        get: function(size) {
            for (var i in this.queries) {
                if (this.queries.hasOwnProperty(i)) {
                    var query = this.queries[i];
                    if (size === query.name) return query.value
                }
            }
            return null
        },
        _getCurrentSize: function() {
            var matched;
            for (var i = 0; i < this.queries.length; i++) {
                var query = this.queries[i];
                if (window.matchMedia(query.value).matches) {
                    matched = query
                }
            }
            if (typeof matched === "object") {
                return matched.name
            } else {
                return matched
            }
        },
        _watcher: function() {
            var _this = this;
            $(window).on("resize.zf.mediaquery", function() {
                var newSize = _this._getCurrentSize(),
                    currentSize = _this.current;
                if (newSize !== currentSize) {
                    _this.current = newSize;
                    $(window).trigger("changed.zf.mediaquery", [newSize, currentSize])
                }
            })
        }
    };
    Foundation.MediaQuery = MediaQuery;
    window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var styleMedia = window.styleMedia || window.media;
        if (!styleMedia) {
            var style = document.createElement("style"),
                script = document.getElementsByTagName("script")[0],
                info = null;
            style.type = "text/css";
            style.id = "matchmediajs-test";
            script && script.parentNode && script.parentNode.insertBefore(style, script);
            info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle;
            styleMedia = {
                matchMedium: function(media) {
                    var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text
                    } else {
                        style.textContent = text
                    }
                    return info.width === "1px"
                }
            }
        }
        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || "all"),
                media: media || "all"
            }
        }
    }());

    function parseStyleToObject(str) {
        var styleObject = {};
        if (typeof str !== "string") {
            return styleObject
        }
        str = str.trim().slice(1, -1);
        if (!str) {
            return styleObject
        }
        styleObject = str.split("&").reduce(function(ret, param) {
            var parts = param.replace(/\+/g, " ").split("=");
            var key = parts[0];
            var val = parts[1];
            key = decodeURIComponent(key);
            val = val === undefined ? null : decodeURIComponent(val);
            if (!ret.hasOwnProperty(key)) {
                ret[key] = val
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val)
            } else {
                ret[key] = [ret[key], val]
            }
            return ret
        }, {});
        return styleObject
    }
    Foundation.MediaQuery = MediaQuery
}(jQuery);
"use strict";
! function($) {
    var initClasses = ["mui-enter", "mui-leave"];
    var activeClasses = ["mui-enter-active", "mui-leave-active"];
    var Motion = {
        animateIn: function(element, animation, cb) {
            animate(true, element, animation, cb)
        },
        animateOut: function(element, animation, cb) {
            animate(false, element, animation, cb)
        }
    };

    function Move(duration, elem, fn) {
        var anim, prog, start = null;

        function move(ts) {
            if (!start) start = window.performance.now();
            prog = ts - start;
            fn.apply(elem);
            if (prog < duration) {
                anim = window.requestAnimationFrame(move, elem)
            } else {
                window.cancelAnimationFrame(anim);
                elem.trigger("finished.zf.animate", [elem]).triggerHandler("finished.zf.animate", [elem])
            }
        }
        anim = window.requestAnimationFrame(move)
    }

    function animate(isIn, element, animation, cb) {
        element = $(element).eq(0);
        if (!element.length) return;
        var initClass = isIn ? initClasses[0] : initClasses[1];
        var activeClass = isIn ? activeClasses[0] : activeClasses[1];
        reset();
        element.addClass(animation).css("transition", "none");
        requestAnimationFrame(function() {
            element.addClass(initClass);
            if (isIn) element.show()
        });
        requestAnimationFrame(function() {
            element[0].offsetWidth;
            element.css("transition", "").addClass(activeClass)
        });
        element.one(Foundation.transitionend(element), finish);

        function finish() {
            if (!isIn) element.hide();
            reset();
            if (cb) cb.apply(element)
        }

        function reset() {
            element[0].style.transitionDuration = 0;
            element.removeClass(initClass + " " + activeClass + " " + animation)
        }
    }
    Foundation.Move = Move;
    Foundation.Motion = Motion
}(jQuery);
"use strict";
! function($) {
    var Nest = {
        Feather: function(menu) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "zf";
            menu.attr("role", "menubar");
            var items = menu.find("li").attr({
                    role: "menuitem"
                }),
                subMenuClass = "is-" + type + "-submenu",
                subItemClass = subMenuClass + "-item",
                hasSubClass = "is-" + type + "-submenu-parent";
            menu.find("a:first").attr("tabindex", 0);
            items.each(function() {
                var $item = $(this),
                    $sub = $item.children("ul");
                if ($sub.length) {
                    $item.addClass(hasSubClass).attr({
                        "aria-haspopup": true,
                        "aria-expanded": false,
                        "aria-label": $item.children("a:first").text()
                    });
                    $sub.addClass("submenu " + subMenuClass).attr({
                        "data-submenu": "",
                        "aria-hidden": true,
                        role: "menu"
                    })
                }
                if ($item.parent("[data-submenu]").length) {
                    $item.addClass("is-submenu-item " + subItemClass)
                }
            });
            return
        },
        Burn: function(menu, type) {
            var items = menu.find("li").removeAttr("tabindex"),
                subMenuClass = "is-" + type + "-submenu",
                subItemClass = subMenuClass + "-item",
                hasSubClass = "is-" + type + "-submenu-parent";
            menu.find(">li, .menu, .menu > li").removeClass(subMenuClass + " " + subItemClass + " " + hasSubClass + " is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "")
        }
    };
    Foundation.Nest = Nest
}(jQuery);
"use strict";
! function($) {
    function Timer(elem, options, cb) {
        var _this = this,
            duration = options.duration,
            nameSpace = Object.keys(elem.data())[0] || "timer",
            remain = -1,
            start, timer;
        this.isPaused = false;
        this.restart = function() {
            remain = -1;
            clearTimeout(timer);
            this.start()
        };
        this.start = function() {
            this.isPaused = false;
            clearTimeout(timer);
            remain = remain <= 0 ? duration : remain;
            elem.data("paused", false);
            start = Date.now();
            timer = setTimeout(function() {
                if (options.infinite) {
                    _this.restart()
                }
                if (cb && typeof cb === "function") {
                    cb()
                }
            }, remain);
            elem.trigger("timerstart.zf." + nameSpace)
        };
        this.pause = function() {
            this.isPaused = true;
            clearTimeout(timer);
            elem.data("paused", true);
            var end = Date.now();
            remain = remain - (end - start);
            elem.trigger("timerpaused.zf." + nameSpace)
        }
    }

    function onImagesLoaded(images, callback) {
        var self = this,
            unloaded = images.length;
        if (unloaded === 0) {
            callback()
        }
        images.each(function() {
            if (this.complete) {
                singleImageLoaded()
            } else if (typeof this.naturalWidth !== "undefined" && this.naturalWidth > 0) {
                singleImageLoaded()
            } else {
                $(this).one("load", function() {
                    singleImageLoaded()
                })
            }
        });

        function singleImageLoaded() {
            unloaded--;
            if (unloaded === 0) {
                callback()
            }
        }
    }
    Foundation.Timer = Timer;
    Foundation.onImagesLoaded = onImagesLoaded
}(jQuery);
(function($) {
    $.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: false,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var startPosX, startPosY, startTime, elapsedTime, isMoving = false;

    function onTouchEnd() {
        this.removeEventListener("touchmove", onTouchMove);
        this.removeEventListener("touchend", onTouchEnd);
        isMoving = false
    }

    function onTouchMove(e) {
        if ($.spotSwipe.preventDefault) {
            e.preventDefault()
        }
        if (isMoving) {
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            var dx = startPosX - x;
            var dy = startPosY - y;
            var dir;
            elapsedTime = (new Date).getTime() - startTime;
            if (Math.abs(dx) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
                dir = dx > 0 ? "left" : "right"
            }
            if (dir) {
                e.preventDefault();
                onTouchEnd.call(this);
                $(this).trigger("swipe", dir).trigger("swipe" + dir)
            }
        }
    }

    function onTouchStart(e) {
        if (e.touches.length == 1) {
            startPosX = e.touches[0].pageX;
            startPosY = e.touches[0].pageY;
            isMoving = true;
            startTime = (new Date).getTime();
            this.addEventListener("touchmove", onTouchMove, false);
            this.addEventListener("touchend", onTouchEnd, false)
        }
    }

    function init() {
        this.addEventListener && this.addEventListener("touchstart", onTouchStart, false)
    }

    function teardown() {
        this.removeEventListener("touchstart", onTouchStart)
    }
    $.event.special.swipe = {
        setup: init
    };
    $.each(["left", "up", "down", "right"], function() {
        $.event.special["swipe" + this] = {
            setup: function() {
                $(this).on("swipe", $.noop)
            }
        }
    })
})(jQuery);
! function($) {
    $.fn.addTouch = function() {
        this.each(function(i, el) {
            $(el).bind("touchstart touchmove touchend touchcancel", function() {
                handleTouch(event)
            })
        });
        var handleTouch = function(event) {
            var touches = event.changedTouches,
                first = touches[0],
                eventTypes = {
                    touchstart: "mousedown",
                    touchmove: "mousemove",
                    touchend: "mouseup"
                },
                type = eventTypes[event.type],
                simulatedEvent;
            if ("MouseEvent" in window && typeof window.MouseEvent === "function") {
                simulatedEvent = new window.MouseEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    screenX: first.screenX,
                    screenY: first.screenY,
                    clientX: first.clientX,
                    clientY: first.clientY
                })
            } else {
                simulatedEvent = document.createEvent("MouseEvent");
                simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null)
            }
            first.target.dispatchEvent(simulatedEvent)
        }
    }
}(jQuery);
"use strict";
! function($) {
    var MutationObserver = function() {
        var prefixes = ["WebKit", "Moz", "O", "Ms", ""];
        for (var i = 0; i < prefixes.length; i++) {
            if (prefixes[i] + "MutationObserver" in window) {
                return window[prefixes[i] + "MutationObserver"]
            }
        }
        return false
    }();
    var triggers = function(el, type) {
        el.data(type).split(" ").forEach(function(id) {
            $("#" + id)[type === "close" ? "trigger" : "triggerHandler"](type + ".zf.trigger", [el])
        })
    };
    $(document).on("click.zf.trigger", "[data-open]", function() {
        triggers($(this), "open")
    });
    $(document).on("click.zf.trigger", "[data-close]", function() {
        var id = $(this).data("close");
        if (id) {
            triggers($(this), "close")
        } else {
            $(this).trigger("close.zf.trigger")
        }
    });
    $(document).on("click.zf.trigger", "[data-toggle]", function() {
        triggers($(this), "toggle")
    });
    $(document).on("close.zf.trigger", "[data-closable]", function(e) {
        e.stopPropagation();
        var animation = $(this).data("closable");
        if (animation !== "") {
            Foundation.Motion.animateOut($(this), animation, function() {
                $(this).trigger("closed.zf")
            })
        } else {
            $(this).fadeOut().trigger("closed.zf")
        }
    });
    $(document).on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", function() {
        var id = $(this).data("toggle-focus");
        $("#" + id).triggerHandler("toggle.zf.trigger", [$(this)])
    });
    $(window).on("load", function() {
        checkListeners()
    });

    function checkListeners() {
        eventsListener();
        resizeListener();
        scrollListener();
        closemeListener()
    }

    function closemeListener(pluginName) {
        var yetiBoxes = $("[data-yeti-box]"),
            plugNames = ["dropdown", "tooltip", "reveal"];
        if (pluginName) {
            if (typeof pluginName === "string") {
                plugNames.push(pluginName)
            } else if (typeof pluginName === "object" && typeof pluginName[0] === "string") {
                plugNames.concat(pluginName)
            } else {
                console.error("Plugin names must be strings")
            }
        }
        if (yetiBoxes.length) {
            var listeners = plugNames.map(function(name) {
                return "closeme.zf." + name
            }).join(" ");
            $(window).off(listeners).on(listeners, function(e, pluginId) {
                var plugin = e.namespace.split(".")[0];
                var plugins = $("[data-" + plugin + "]").not('[data-yeti-box="' + pluginId + '"]');
                plugins.each(function() {
                    var _this = $(this);
                    _this.triggerHandler("close.zf.trigger", [_this])
                })
            })
        }
    }

    function resizeListener(debounce) {
        var timer = void 0,
            $nodes = $("[data-resize]");
        if ($nodes.length) {
            $(window).off("resize.zf.trigger").on("resize.zf.trigger", function(e) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(function() {
                    if (!MutationObserver) {
                        $nodes.each(function() {
                            $(this).triggerHandler("resizeme.zf.trigger")
                        })
                    }
                    $nodes.attr("data-events", "resize")
                }, debounce || 10)
            })
        }
    }

    function scrollListener(debounce) {
        var timer = void 0,
            $nodes = $("[data-scroll]");
        if ($nodes.length) {
            $(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function(e) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(function() {
                    if (!MutationObserver) {
                        $nodes.each(function() {
                            $(this).triggerHandler("scrollme.zf.trigger")
                        })
                    }
                    $nodes.attr("data-events", "scroll")
                }, debounce || 10)
            })
        }
    }

    function eventsListener() {
        if (!MutationObserver) {
            return false
        }
        var nodes = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]");
        var listeningElementsMutation = function(mutationRecordsList) {
            var $target = $(mutationRecordsList[0].target);
            switch ($target.attr("data-events")) {
                case "resize":
                    $target.triggerHandler("resizeme.zf.trigger", [$target]);
                    break;
                case "scroll":
                    $target.triggerHandler("scrollme.zf.trigger", [$target, window.pageYOffset]);
                    break;
                default:
                    return false
            }
        };
        if (nodes.length) {
            for (var i = 0; i <= nodes.length - 1; i++) {
                var elementObserver = new MutationObserver(listeningElementsMutation);
                elementObserver.observe(nodes[i], {
                    attributes: true,
                    childList: false,
                    characterData: false,
                    subtree: false,
                    attributeFilter: ["data-events"]
                })
            }
        }
    }
    Foundation.IHearYou = checkListeners
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Abide = function() {
        function Abide(element) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, Abide);
            this.$element = element;
            this.options = $.extend({}, Abide.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Abide")
        }
        _createClass(Abide, [{
            key: "_init",
            value: function _init() {
                this.$inputs = this.$element.find("input, textarea, select");
                this._events()
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this2 = this;
                this.$element.off(".abide").on("reset.zf.abide", function() {
                    _this2.resetForm()
                }).on("submit.zf.abide", function() {
                    return _this2.validateForm()
                });
                if (this.options.validateOn === "fieldChange") {
                    this.$inputs.off("change.zf.abide").on("change.zf.abide", function(e) {
                        _this2.validateInput($(e.target))
                    })
                }
                if (this.options.liveValidate) {
                    this.$inputs.off("input.zf.abide").on("input.zf.abide", function(e) {
                        _this2.validateInput($(e.target))
                    })
                }
            }
        }, {
            key: "_reflow",
            value: function _reflow() {
                this._init()
            }
        }, {
            key: "requiredCheck",
            value: function requiredCheck($el) {
                if (!$el.attr("required")) return true;
                var isGood = true;
                switch ($el[0].type) {
                    case "checkbox":
                        isGood = $el[0].checked;
                        break;
                    case "select":
                    case "select-one":
                    case "select-multiple":
                        var opt = $el.find("option:selected");
                        if (!opt.length || !opt.val()) isGood = false;
                        break;
                    default:
                        if (!$el.val() || !$el.val().length) isGood = false
                }
                return isGood
            }
        }, {
            key: "findFormError",
            value: function findFormError($el) {
                var $error = $el.siblings(this.options.formErrorSelector);
                if (!$error.length) {
                    $error = $el.parent().find(this.options.formErrorSelector)
                }
                return $error
            }
        }, {
            key: "findLabel",
            value: function findLabel($el) {
                var id = $el[0].id;
                var $label = this.$element.find('label[for="' + id + '"]');
                if (!$label.length) {
                    return $el.closest("label")
                }
                return $label
            }
        }, {
            key: "findRadioLabels",
            value: function findRadioLabels($els) {
                var _this3 = this;
                var labels = $els.map(function(i, el) {
                    var id = el.id;
                    var $label = _this3.$element.find('label[for="' + id + '"]');
                    if (!$label.length) {
                        $label = $(el).closest("label")
                    }
                    return $label[0]
                });
                return $(labels)
            }
        }, {
            key: "addErrorClasses",
            value: function addErrorClasses($el) {
                var $label = this.findLabel($el);
                var $formError = this.findFormError($el);
                if ($label.length) {
                    $label.addClass(this.options.labelErrorClass)
                }
                if ($formError.length) {
                    $formError.addClass(this.options.formErrorClass)
                }
                $el.addClass(this.options.inputErrorClass).attr("data-invalid", "")
            }
        }, {
            key: "removeRadioErrorClasses",
            value: function removeRadioErrorClasses(groupName) {
                var $els = this.$element.find(':radio[name="' + groupName + '"]');
                var $labels = this.findRadioLabels($els);
                var $formErrors = this.findFormError($els);
                if ($labels.length) {
                    $labels.removeClass(this.options.labelErrorClass)
                }
                if ($formErrors.length) {
                    $formErrors.removeClass(this.options.formErrorClass)
                }
                $els.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
            }
        }, {
            key: "removeErrorClasses",
            value: function removeErrorClasses($el) {
                if ($el[0].type == "radio") {
                    return this.removeRadioErrorClasses($el.attr("name"))
                }
                var $label = this.findLabel($el);
                var $formError = this.findFormError($el);
                if ($label.length) {
                    $label.removeClass(this.options.labelErrorClass)
                }
                if ($formError.length) {
                    $formError.removeClass(this.options.formErrorClass)
                }
                $el.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
            }
        }, {
            key: "validateInput",
            value: function validateInput($el) {
                var clearRequire = this.requiredCheck($el),
                    validated = false,
                    customValidator = true,
                    validator = $el.attr("data-validator"),
                    equalTo = true;
                if ($el.is("[data-abide-ignore]") || $el.is('[type="hidden"]')) {
                    return true
                }
                switch ($el[0].type) {
                    case "radio":
                        validated = this.validateRadio($el.attr("name"));
                        break;
                    case "checkbox":
                        validated = clearRequire;
                        break;
                    case "select":
                    case "select-one":
                    case "select-multiple":
                        validated = clearRequire;
                        break;
                    default:
                        validated = this.validateText($el)
                }
                if (validator) {
                    customValidator = this.matchValidation($el, validator, $el.attr("required"))
                }
                if ($el.attr("data-equalto")) {
                    equalTo = this.options.validators.equalTo($el)
                }
                var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
                var message = (goodToGo ? "valid" : "invalid") + ".zf.abide";
                this[goodToGo ? "removeErrorClasses" : "addErrorClasses"]($el);
                $el.trigger(message, [$el]);
                return goodToGo
            }
        }, {
            key: "validateForm",
            value: function validateForm() {
                var acc = [];
                var _this = this;
                this.$inputs.each(function() {
                    acc.push(_this.validateInput($(this)))
                });
                var noError = acc.indexOf(false) === -1;
                this.$element.find("[data-abide-error]").css("display", noError ? "none" : "block");
                this.$element.trigger((noError ? "formvalid" : "forminvalid") + ".zf.abide", [this.$element]);
                return noError
            }
        }, {
            key: "validateText",
            value: function validateText($el, pattern) {
                pattern = pattern || $el.attr("pattern") || $el.attr("type");
                var inputText = $el.val();
                var valid = false;
                if (inputText.length) {
                    if (this.options.patterns.hasOwnProperty(pattern)) {
                        valid = this.options.patterns[pattern].test(inputText)
                    } else if (pattern !== $el.attr("type")) {
                        valid = new RegExp(pattern).test(inputText)
                    } else {
                        valid = true
                    }
                } else if (!$el.prop("required")) {
                    valid = true
                }
                return valid
            }
        }, {
            key: "validateRadio",
            value: function validateRadio(groupName) {
                var $group = this.$element.find(':radio[name="' + groupName + '"]');
                var valid = false,
                    required = false;
                $group.each(function(i, e) {
                    if ($(e).attr("required")) {
                        required = true
                    }
                });
                if (!required) valid = true;
                if (!valid) {
                    $group.each(function(i, e) {
                        if ($(e).prop("checked")) {
                            valid = true
                        }
                    })
                }
                return valid
            }
        }, {
            key: "matchValidation",
            value: function matchValidation($el, validators, required) {
                var _this4 = this;
                required = required ? true : false;
                var clear = validators.split(" ").map(function(v) {
                    return _this4.options.validators[v]($el, required, $el.parent())
                });
                return clear.indexOf(false) === -1
            }
        }, {
            key: "resetForm",
            value: function resetForm() {
                var $form = this.$element,
                    opts = this.options;
                $("." + opts.labelErrorClass, $form).not("small").removeClass(opts.labelErrorClass);
                $("." + opts.inputErrorClass, $form).not("small").removeClass(opts.inputErrorClass);
                $(opts.formErrorSelector + "." + opts.formErrorClass).removeClass(opts.formErrorClass);
                $form.find("[data-abide-error]").css("display", "none");
                $(":input", $form).not(":button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]").val("").removeAttr("data-invalid");
                $(":input:radio", $form).not("[data-abide-ignore]").prop("checked", false).removeAttr("data-invalid");
                $(":input:checkbox", $form).not("[data-abide-ignore]").prop("checked", false).removeAttr("data-invalid");
                $form.trigger("formreset.zf.abide", [$form])
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var _this = this;
                this.$element.off(".abide").find("[data-abide-error]").css("display", "none");
                this.$inputs.off(".abide").each(function() {
                    _this.removeErrorClasses($(this))
                });
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Abide
    }();
    Abide.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        liveValidate: false,
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        },
        validators: {
            equalTo: function(el, required, parent) {
                return $("#" + el.attr("data-equalto")).val() === el.val()
            }
        }
    };
    Foundation.plugin(Abide, "Abide")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Accordion = function() {
        function Accordion(element, options) {
            _classCallCheck(this, Accordion);
            this.$element = element;
            this.options = $.extend({}, Accordion.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Accordion");
            Foundation.Keyboard.register("Accordion", {
                ENTER: "toggle",
                SPACE: "toggle",
                ARROW_DOWN: "next",
                ARROW_UP: "previous"
            })
        }
        _createClass(Accordion, [{
            key: "_init",
            value: function _init() {
                this.$element.attr("role", "tablist");
                this.$tabs = this.$element.children("li, [data-accordion-item]");
                this.$tabs.each(function(idx, el) {
                    var $el = $(el),
                        $content = $el.children("[data-tab-content]"),
                        id = $content[0].id || Foundation.GetYoDigits(6, "accordion"),
                        linkId = el.id || id + "-label";
                    $el.find("a:first").attr({
                        "aria-controls": id,
                        role: "tab",
                        id: linkId,
                        "aria-expanded": false,
                        "aria-selected": false
                    });
                    $content.attr({
                        role: "tabpanel",
                        "aria-labelledby": linkId,
                        "aria-hidden": true,
                        id: id
                    })
                });
                var $initActive = this.$element.find(".is-active").children("[data-tab-content]");
                if ($initActive.length) {
                    this.down($initActive, true)
                }
                this._events()
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                this.$tabs.each(function() {
                    var $elem = $(this);
                    var $tabContent = $elem.children("[data-tab-content]");
                    if ($tabContent.length) {
                        $elem.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function(e) {
                            e.preventDefault();
                            _this.toggle($tabContent)
                        }).on("keydown.zf.accordion", function(e) {
                            Foundation.Keyboard.handleKey(e, "Accordion", {
                                toggle: function() {
                                    _this.toggle($tabContent)
                                },
                                next: function() {
                                    var $a = $elem.next().find("a").focus();
                                    if (!_this.options.multiExpand) {
                                        $a.trigger("click.zf.accordion")
                                    }
                                },
                                previous: function() {
                                    var $a = $elem.prev().find("a").focus();
                                    if (!_this.options.multiExpand) {
                                        $a.trigger("click.zf.accordion")
                                    }
                                },
                                handled: function() {
                                    e.preventDefault();
                                    e.stopPropagation()
                                }
                            })
                        })
                    }
                })
            }
        }, {
            key: "toggle",
            value: function toggle($target) {
                if ($target.parent().hasClass("is-active")) {
                    this.up($target)
                } else {
                    this.down($target)
                }
            }
        }, {
            key: "down",
            value: function down($target, firstTime) {
                var _this2 = this;
                $target.attr("aria-hidden", false).parent("[data-tab-content]").addBack().parent().addClass("is-active");
                if (!this.options.multiExpand && !firstTime) {
                    var $currentActive = this.$element.children(".is-active").children("[data-tab-content]");
                    if ($currentActive.length) {
                        this.up($currentActive.not($target))
                    }
                }
                $target.slideDown(this.options.slideSpeed, function() {
                    _this2.$element.trigger("down.zf.accordion", [$target])
                });
                $("#" + $target.attr("aria-labelledby")).attr({
                    "aria-expanded": true,
                    "aria-selected": true
                })
            }
        }, {
            key: "up",
            value: function up($target) {
                var $aunts = $target.parent().siblings(),
                    _this = this;
                if (!this.options.allowAllClosed && !$aunts.hasClass("is-active") || !$target.parent().hasClass("is-active")) {
                    return
                }
                $target.slideUp(_this.options.slideSpeed, function() {
                    _this.$element.trigger("up.zf.accordion", [$target])
                });
                $target.attr("aria-hidden", true).parent().removeClass("is-active");
                $("#" + $target.attr("aria-labelledby")).attr({
                    "aria-expanded": false,
                    "aria-selected": false
                })
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.find("[data-tab-content]").stop(true).slideUp(0).css("display", "");
                this.$element.find("a").off(".zf.accordion");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Accordion
    }();
    Accordion.defaults = {
        slideSpeed: 250,
        multiExpand: false,
        allowAllClosed: false
    };
    Foundation.plugin(Accordion, "Accordion")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var AccordionMenu = function() {
        function AccordionMenu(element, options) {
            _classCallCheck(this, AccordionMenu);
            this.$element = element;
            this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options);
            Foundation.Nest.Feather(this.$element, "accordion");
            this._init();
            Foundation.registerPlugin(this, "AccordionMenu");
            Foundation.Keyboard.register("AccordionMenu", {
                ENTER: "toggle",
                SPACE: "toggle",
                ARROW_RIGHT: "open",
                ARROW_UP: "up",
                ARROW_DOWN: "down",
                ARROW_LEFT: "close",
                ESCAPE: "closeAll"
            })
        }
        _createClass(AccordionMenu, [{
            key: "_init",
            value: function _init() {
                this.$element.find("[data-submenu]").not(".is-active").slideUp(0);
                this.$element.attr({
                    role: "menu",
                    "aria-multiselectable": this.options.multiOpen
                });
                this.$menuLinks = this.$element.find(".is-accordion-submenu-parent");
                this.$menuLinks.each(function() {
                    var linkId = this.id || Foundation.GetYoDigits(6, "acc-menu-link"),
                        $elem = $(this),
                        $sub = $elem.children("[data-submenu]"),
                        subId = $sub[0].id || Foundation.GetYoDigits(6, "acc-menu"),
                        isActive = $sub.hasClass("is-active");
                    $elem.attr({
                        "aria-controls": subId,
                        "aria-expanded": isActive,
                        role: "menuitem",
                        id: linkId
                    });
                    $sub.attr({
                        "aria-labelledby": linkId,
                        "aria-hidden": !isActive,
                        role: "menu",
                        id: subId
                    })
                });
                var initPanes = this.$element.find(".is-active");
                if (initPanes.length) {
                    var _this = this;
                    initPanes.each(function() {
                        _this.down($(this))
                    })
                }
                this._events()
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                this.$element.find("li").each(function() {
                    var $submenu = $(this).children("[data-submenu]");
                    if ($submenu.length) {
                        $(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu", function(e) {
                            e.preventDefault();
                            _this.toggle($submenu)
                        })
                    }
                }).on("keydown.zf.accordionmenu", function(e) {
                    var $element = $(this),
                        $elements = $element.parent("ul").children("li"),
                        $prevElement, $nextElement, $target = $element.children("[data-submenu]");
                    $elements.each(function(i) {
                        if ($(this).is($element)) {
                            $prevElement = $elements.eq(Math.max(0, i - 1)).find("a").first();
                            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find("a").first();
                            if ($(this).children("[data-submenu]:visible").length) {
                                $nextElement = $element.find("li:first-child").find("a").first()
                            }
                            if ($(this).is(":first-child")) {
                                $prevElement = $element.parents("li").first().find("a").first()
                            } else if ($prevElement.parents("li").first().children("[data-submenu]:visible").length) {
                                $prevElement = $prevElement.parents("li").find("li:last-child").find("a").first()
                            }
                            if ($(this).is(":last-child")) {
                                $nextElement = $element.parents("li").first().next("li").find("a").first()
                            }
                            return
                        }
                    });
                    Foundation.Keyboard.handleKey(e, "AccordionMenu", {
                        open: function() {
                            if ($target.is(":hidden")) {
                                _this.down($target);
                                $target.find("li").first().find("a").first().focus()
                            }
                        },
                        close: function() {
                            if ($target.length && !$target.is(":hidden")) {
                                _this.up($target)
                            } else if ($element.parent("[data-submenu]").length) {
                                _this.up($element.parent("[data-submenu]"));
                                $element.parents("li").first().find("a").first().focus()
                            }
                        },
                        up: function() {
                            $prevElement.focus();
                            return true
                        },
                        down: function() {
                            $nextElement.focus();
                            return true
                        },
                        toggle: function() {
                            if ($element.children("[data-submenu]").length) {
                                _this.toggle($element.children("[data-submenu]"))
                            }
                        },
                        closeAll: function() {
                            _this.hideAll()
                        },
                        handled: function(preventDefault) {
                            if (preventDefault) {
                                e.preventDefault()
                            }
                            e.stopImmediatePropagation()
                        }
                    })
                })
            }
        }, {
            key: "hideAll",
            value: function hideAll() {
                this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed)
            }
        }, {
            key: "toggle",
            value: function toggle($target) {
                if (!$target.is(":animated")) {
                    if (!$target.is(":hidden")) {
                        this.up($target)
                    } else {
                        this.down($target)
                    }
                }
            }
        }, {
            key: "down",
            value: function down($target) {
                var _this = this;
                if (!this.options.multiOpen) {
                    this.up(this.$element.find(".is-active").not($target.parentsUntil(this.$element).add($target)))
                }
                $target.addClass("is-active").attr({
                    "aria-hidden": false
                }).parent(".is-accordion-submenu-parent").attr({
                    "aria-expanded": true
                });
                $target.slideDown(_this.options.slideSpeed, function() {
                    _this.$element.trigger("down.zf.accordionMenu", [$target])
                })
            }
        }, {
            key: "up",
            value: function up($target) {
                var _this = this;
                $target.slideUp(_this.options.slideSpeed, function() {
                    _this.$element.trigger("up.zf.accordionMenu", [$target])
                });
                var $menus = $target.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden", true);
                $menus.parent(".is-accordion-submenu-parent").attr("aria-expanded", false)
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.find("[data-submenu]").slideDown(0).css("display", "");
                this.$element.find("a").off("click.zf.accordionMenu");
                Foundation.Nest.Burn(this.$element, "accordion");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return AccordionMenu
    }();
    AccordionMenu.defaults = {
        slideSpeed: 250,
        multiOpen: true
    };
    Foundation.plugin(AccordionMenu, "AccordionMenu")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Drilldown = function() {
        function Drilldown(element, options) {
            _classCallCheck(this, Drilldown);
            this.$element = element;
            this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);
            Foundation.Nest.Feather(this.$element, "drilldown");
            this._init();
            Foundation.registerPlugin(this, "Drilldown");
            Foundation.Keyboard.register("Drilldown", {
                ENTER: "open",
                SPACE: "open",
                ARROW_RIGHT: "next",
                ARROW_UP: "up",
                ARROW_DOWN: "down",
                ARROW_LEFT: "previous",
                ESCAPE: "close",
                TAB: "down",
                SHIFT_TAB: "up"
            })
        }
        _createClass(Drilldown, [{
            key: "_init",
            value: function _init() {
                this.$submenuAnchors = this.$element.find("li.is-drilldown-submenu-parent").children("a");
                this.$submenus = this.$submenuAnchors.parent("li").children("[data-submenu]");
                this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "menuitem").find("a");
                this._prepareMenu();
                this._keyboardEvents()
            }
        }, {
            key: "_prepareMenu",
            value: function _prepareMenu() {
                var _this = this;
                this.$submenuAnchors.each(function() {
                    var $link = $(this);
                    var $sub = $link.parent();
                    if (_this.options.parentLink) {
                        $link.clone().prependTo($sub.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>')
                    }
                    $link.data("savedHref", $link.attr("href")).removeAttr("href").attr("tabindex", 0);
                    $link.children("[data-submenu]").attr({
                        "aria-hidden": true,
                        tabindex: 0,
                        role: "menu"
                    });
                    _this._events($link)
                });
                this.$submenus.each(function() {
                    var $menu = $(this),
                        $back = $menu.find(".js-drilldown-back");
                    if (!$back.length) {
                        $menu.prepend(_this.options.backButton)
                    }
                    _this._back($menu)
                });
                if (!this.$element.parent().hasClass("is-drilldown")) {
                    this.$wrapper = $(this.options.wrapper).addClass("is-drilldown");
                    this.$wrapper = this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims())
                }
            }
        }, {
            key: "_events",
            value: function _events($elem) {
                var _this = this;
                $elem.off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
                    if ($(e.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent")) {
                        e.stopImmediatePropagation();
                        e.preventDefault()
                    }
                    _this._show($elem.parent("li"));
                    if (_this.options.closeOnClick) {
                        var $body = $("body");
                        $body.off(".zf.drilldown").on("click.zf.drilldown", function(e) {
                            if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target)) {
                                return
                            }
                            e.preventDefault();
                            _this._hideAll();
                            $body.off(".zf.drilldown")
                        })
                    }
                })
            }
        }, {
            key: "_keyboardEvents",
            value: function _keyboardEvents() {
                var _this = this;
                this.$menuItems.add(this.$element.find(".js-drilldown-back > a")).on("keydown.zf.drilldown", function(e) {
                    var $element = $(this),
                        $elements = $element.parent("li").parent("ul").children("li").children("a"),
                        $prevElement, $nextElement;
                    $elements.each(function(i) {
                        if ($(this).is($element)) {
                            $prevElement = $elements.eq(Math.max(0, i - 1));
                            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                            return
                        }
                    });
                    Foundation.Keyboard.handleKey(e, "Drilldown", {
                        next: function() {
                            if ($element.is(_this.$submenuAnchors)) {
                                _this._show($element.parent("li"));
                                $element.parent("li").one(Foundation.transitionend($element), function() {
                                    $element.parent("li").find("ul li a").filter(_this.$menuItems).first().focus()
                                });
                                return true
                            }
                        },
                        previous: function() {
                            _this._hide($element.parent("li").parent("ul"));
                            $element.parent("li").parent("ul").one(Foundation.transitionend($element), function() {
                                setTimeout(function() {
                                    $element.parent("li").parent("ul").parent("li").children("a").first().focus()
                                }, 1)
                            });
                            return true
                        },
                        up: function() {
                            $prevElement.focus();
                            return true
                        },
                        down: function() {
                            $nextElement.focus();
                            return true
                        },
                        close: function() {
                            _this._back()
                        },
                        open: function() {
                            if (!$element.is(_this.$menuItems)) {
                                _this._hide($element.parent("li").parent("ul"));
                                $element.parent("li").parent("ul").one(Foundation.transitionend($element), function() {
                                    setTimeout(function() {
                                        $element.parent("li").parent("ul").parent("li").children("a").first().focus()
                                    }, 1)
                                });
                                return true
                            } else if ($element.is(_this.$submenuAnchors)) {
                                _this._show($element.parent("li"));
                                $element.parent("li").one(Foundation.transitionend($element), function() {
                                    $element.parent("li").find("ul li a").filter(_this.$menuItems).first().focus()
                                });
                                return true
                            }
                        },
                        handled: function(preventDefault) {
                            if (preventDefault) {
                                e.preventDefault()
                            }
                            e.stopImmediatePropagation()
                        }
                    })
                })
            }
        }, {
            key: "_hideAll",
            value: function _hideAll() {
                var $elem = this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");
                $elem.one(Foundation.transitionend($elem), function(e) {
                    $elem.removeClass("is-active is-closing")
                });
                this.$element.trigger("closed.zf.drilldown")
            }
        }, {
            key: "_back",
            value: function _back($elem) {
                var _this = this;
                $elem.off("click.zf.drilldown");
                $elem.children(".js-drilldown-back").on("click.zf.drilldown", function(e) {
                    e.stopImmediatePropagation();
                    _this._hide($elem);
                    var parentSubMenu = $elem.parent("li").parent("ul").parent("li");
                    if (parentSubMenu.length) {
                        _this._show(parentSubMenu)
                    }
                })
            }
        }, {
            key: "_menuLinkEvents",
            value: function _menuLinkEvents() {
                var _this = this;
                this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
                    setTimeout(function() {
                        _this._hideAll()
                    }, 0)
                })
            }
        }, {
            key: "_show",
            value: function _show($elem) {
                $elem.attr("aria-expanded", true);
                $elem.children("[data-submenu]").addClass("is-active").attr("aria-hidden", false);
                this.$element.trigger("open.zf.drilldown", [$elem])
            }
        }, {
            key: "_hide",
            value: function _hide($elem) {
                var _this = this;
                $elem.parent("li").attr("aria-expanded", false);
                $elem.attr("aria-hidden", true).addClass("is-closing").one(Foundation.transitionend($elem), function() {
                    $elem.removeClass("is-active is-closing");
                    $elem.blur()
                });
                $elem.trigger("hide.zf.drilldown", [$elem])
            }
        }, {
            key: "_getMaxDims",
            value: function _getMaxDims() {
                var biggest = 0;
                var result = {};
                this.$submenus.add(this.$element).each(function(i, elem) {
                    var height = elem.getBoundingClientRect().height;
                    if (height > biggest) biggest = height
                });
                result["min-height"] = biggest + "px";
                result["max-width"] = this.$element[0].getBoundingClientRect().width + "px";
                return result
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this._hideAll();
                Foundation.Nest.Burn(this.$element, "drilldown");
                this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role");
                this.$submenuAnchors.each(function() {
                    $(this).off(".zf.drilldown")
                });
                this.$element.find("a").each(function() {
                    var $link = $(this);
                    $link.removeAttr("tabindex");
                    if ($link.data("savedHref")) {
                        $link.attr("href", $link.data("savedHref")).removeData("savedHref")
                    } else {
                        return
                    }
                });
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Drilldown
    }();
    Drilldown.defaults = {
        backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
        wrapper: "<div></div>",
        parentLink: false,
        closeOnClick: false
    };
    Foundation.plugin(Drilldown, "Drilldown")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Dropdown = function() {
        function Dropdown(element, options) {
            _classCallCheck(this, Dropdown);
            this.$element = element;
            this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Dropdown");
            Foundation.Keyboard.register("Dropdown", {
                ENTER: "open",
                SPACE: "open",
                ESCAPE: "close",
                TAB: "tab_forward",
                SHIFT_TAB: "tab_backward"
            })
        }
        _createClass(Dropdown, [{
            key: "_init",
            value: function _init() {
                var $id = this.$element.attr("id");
                this.$anchor = $('[data-toggle="' + $id + '"]').length ? $('[data-toggle="' + $id + '"]') : $('[data-open="' + $id + '"]');
                this.$anchor.attr({
                    "aria-controls": $id,
                    "data-is-focus": false,
                    "data-yeti-box": $id,
                    "aria-haspopup": true,
                    "aria-expanded": false
                });
                this.options.positionClass = this.getPositionClass();
                this.counter = 4;
                this.usedPositions = [];
                this.$element.attr({
                    "aria-hidden": "true",
                    "data-yeti-box": $id,
                    "data-resize": $id,
                    "aria-labelledby": this.$anchor[0].id || Foundation.GetYoDigits(6, "dd-anchor")
                });
                this._events()
            }
        }, {
            key: "getPositionClass",
            value: function getPositionClass() {
                var verticalPosition = this.$element[0].className.match(/(top|left|right|bottom)/g);
                verticalPosition = verticalPosition ? verticalPosition[0] : "";
                var horizontalPosition = /float-(\S+)/.exec(this.$anchor[0].className);
                horizontalPosition = horizontalPosition ? horizontalPosition[1] : "";
                var position = horizontalPosition ? horizontalPosition + " " + verticalPosition : verticalPosition;
                return position
            }
        }, {
            key: "_reposition",
            value: function _reposition(position) {
                this.usedPositions.push(position ? position : "bottom");
                if (!position && this.usedPositions.indexOf("top") < 0) {
                    this.$element.addClass("top")
                } else if (position === "top" && this.usedPositions.indexOf("bottom") < 0) {
                    this.$element.removeClass(position)
                } else if (position === "left" && this.usedPositions.indexOf("right") < 0) {
                    this.$element.removeClass(position).addClass("right")
                } else if (position === "right" && this.usedPositions.indexOf("left") < 0) {
                    this.$element.removeClass(position).addClass("left")
                } else if (!position && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0) {
                    this.$element.addClass("left")
                } else if (position === "top" && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0) {
                    this.$element.removeClass(position).addClass("left")
                } else if (position === "left" && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0) {
                    this.$element.removeClass(position)
                } else if (position === "right" && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0) {
                    this.$element.removeClass(position)
                } else {
                    this.$element.removeClass(position)
                }
                this.classChanged = true;
                this.counter--
            }
        }, {
            key: "_setPosition",
            value: function _setPosition() {
                if (this.$anchor.attr("aria-expanded") === "false") {
                    return false
                }
                var position = this.getPositionClass(),
                    $eleDims = Foundation.Box.GetDimensions(this.$element),
                    $anchorDims = Foundation.Box.GetDimensions(this.$anchor),
                    _this = this,
                    direction = position === "left" ? "left" : position === "right" ? "left" : "top",
                    param = direction === "top" ? "height" : "width",
                    offset = param === "height" ? this.options.vOffset : this.options.hOffset;
                if ($eleDims.width >= $eleDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element)) {
                    this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, "center bottom", this.options.vOffset, this.options.hOffset, true)).css({
                        width: $eleDims.windowDims.width - this.options.hOffset * 2,
                        height: "auto"
                    });
                    this.classChanged = true;
                    return false
                }
                this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));
                while (!Foundation.Box.ImNotTouchingYou(this.$element, false, true) && this.counter) {
                    this._reposition(position);
                    this._setPosition()
                }
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                this.$element.on({
                    "open.zf.trigger": this.open.bind(this),
                    "close.zf.trigger": this.close.bind(this),
                    "toggle.zf.trigger": this.toggle.bind(this),
                    "resizeme.zf.trigger": this._setPosition.bind(this)
                });
                if (this.options.hover) {
                    this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                        if ($('body[data-whatinput="mouse"]').is("*")) {
                            clearTimeout(_this.timeout);
                            _this.timeout = setTimeout(function() {
                                _this.open();
                                _this.$anchor.data("hover", true)
                            }, _this.options.hoverDelay)
                        }
                    }).on("mouseleave.zf.dropdown", function() {
                        clearTimeout(_this.timeout);
                        _this.timeout = setTimeout(function() {
                            _this.close();
                            _this.$anchor.data("hover", false)
                        }, _this.options.hoverDelay)
                    });
                    if (this.options.hoverPane) {
                        this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                            clearTimeout(_this.timeout)
                        }).on("mouseleave.zf.dropdown", function() {
                            clearTimeout(_this.timeout);
                            _this.timeout = setTimeout(function() {
                                _this.close();
                                _this.$anchor.data("hover", false)
                            }, _this.options.hoverDelay)
                        })
                    }
                }
                this.$anchor.add(this.$element).on("keydown.zf.dropdown", function(e) {
                    var $target = $(this),
                        visibleFocusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                    Foundation.Keyboard.handleKey(e, "Dropdown", {
                        tab_forward: function() {
                            if (_this.$element.find(":focus").is(visibleFocusableElements.eq(-1))) {
                                if (_this.options.trapFocus) {
                                    visibleFocusableElements.eq(0).focus();
                                    e.preventDefault()
                                } else {
                                    _this.close()
                                }
                            }
                        },
                        tab_backward: function() {
                            if (_this.$element.find(":focus").is(visibleFocusableElements.eq(0)) || _this.$element.is(":focus")) {
                                if (_this.options.trapFocus) {
                                    visibleFocusableElements.eq(-1).focus();
                                    e.preventDefault()
                                } else {
                                    _this.close()
                                }
                            }
                        },
                        open: function() {
                            if ($target.is(_this.$anchor)) {
                                _this.open();
                                _this.$element.attr("tabindex", -1).focus();
                                e.preventDefault()
                            }
                        },
                        close: function() {
                            _this.close();
                            _this.$anchor.focus()
                        }
                    })
                })
            }
        }, {
            key: "_addBodyHandler",
            value: function _addBodyHandler() {
                var $body = $(document.body).not(this.$element),
                    _this = this;
                $body.off("click.zf.dropdown").on("click.zf.dropdown", function(e) {
                    if (_this.$anchor.is(e.target) || _this.$anchor.find(e.target).length) {
                        return
                    }
                    if (_this.$element.find(e.target).length) {
                        return
                    }
                    _this.close();
                    $body.off("click.zf.dropdown")
                })
            }
        }, {
            key: "open",
            value: function open() {
                this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id"));
                this.$anchor.addClass("hover").attr({
                    "aria-expanded": true
                });
                this._setPosition();
                this.$element.addClass("is-open").attr({
                    "aria-hidden": false
                });
                if (this.options.autoFocus) {
                    var $focusable = Foundation.Keyboard.findFocusable(this.$element);
                    if ($focusable.length) {
                        $focusable.eq(0).focus()
                    }
                }
                if (this.options.closeOnClick) {
                    this._addBodyHandler()
                }
                this.$element.trigger("show.zf.dropdown", [this.$element])
            }
        }, {
            key: "close",
            value: function close() {
                if (!this.$element.hasClass("is-open")) {
                    return false
                }
                this.$element.removeClass("is-open").attr({
                    "aria-hidden": true
                });
                this.$anchor.removeClass("hover").attr("aria-expanded", false);
                if (this.classChanged) {
                    var curPositionClass = this.getPositionClass();
                    if (curPositionClass) {
                        this.$element.removeClass(curPositionClass)
                    }
                    this.$element.addClass(this.options.positionClass).css({
                        height: "",
                        width: ""
                    });
                    this.classChanged = false;
                    this.counter = 4;
                    this.usedPositions.length = 0
                }
                this.$element.trigger("hide.zf.dropdown", [this.$element])
            }
        }, {
            key: "toggle",
            value: function toggle() {
                if (this.$element.hasClass("is-open")) {
                    if (this.$anchor.data("hover")) return;
                    this.close()
                } else {
                    this.open()
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.off(".zf.trigger").hide();
                this.$anchor.off(".zf.dropdown");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Dropdown
    }();
    Dropdown.defaults = {
        hoverDelay: 250,
        hover: false,
        hoverPane: false,
        vOffset: 1,
        hOffset: 1,
        positionClass: "",
        trapFocus: false,
        autoFocus: false,
        closeOnClick: false
    };
    Foundation.plugin(Dropdown, "Dropdown")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var DropdownMenu = function() {
        function DropdownMenu(element, options) {
            _classCallCheck(this, DropdownMenu);
            this.$element = element;
            this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);
            Foundation.Nest.Feather(this.$element, "dropdown");
            this._init();
            Foundation.registerPlugin(this, "DropdownMenu");
            Foundation.Keyboard.register("DropdownMenu", {
                ENTER: "open",
                SPACE: "open",
                ARROW_RIGHT: "next",
                ARROW_UP: "up",
                ARROW_DOWN: "down",
                ARROW_LEFT: "previous",
                ESCAPE: "close"
            })
        }
        _createClass(DropdownMenu, [{
            key: "_init",
            value: function _init() {
                var subs = this.$element.find("li.is-dropdown-submenu-parent");
                this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub");
                this.$menuItems = this.$element.find('[role="menuitem"]');
                this.$tabs = this.$element.children('[role="menuitem"]');
                this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass);
                if (this.$element.hasClass(this.options.rightClass) || this.options.alignment === "right" || Foundation.rtl() || this.$element.parents(".top-bar-right").is("*")) {
                    this.options.alignment = "right";
                    subs.addClass("opens-left")
                } else {
                    subs.addClass("opens-right")
                }
                this.changed = false;
                this._events()
            }
        }, {
            key: "_isVertical",
            value: function _isVertical() {
                return this.$tabs.css("display") === "block"
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this,
                    hasTouch = "ontouchstart" in window || typeof window.ontouchstart !== "undefined",
                    parClass = "is-dropdown-submenu-parent";
                var handleClickFn = function(e) {
                    var $elem = $(e.target).parentsUntil("ul", "." + parClass),
                        hasSub = $elem.hasClass(parClass),
                        hasClicked = $elem.attr("data-is-click") === "true",
                        $sub = $elem.children(".is-dropdown-submenu");
                    if (hasSub) {
                        if (hasClicked) {
                            if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
                                return
                            } else {
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                _this._hide($elem)
                            }
                        } else {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            _this._show($sub);
                            $elem.add($elem.parentsUntil(_this.$element, "." + parClass)).attr("data-is-click", true)
                        }
                    } else {
                        if (_this.options.closeOnClickInside) {
                            _this._hide($elem)
                        }
                        return
                    }
                };
                if (this.options.clickOpen || hasTouch) {
                    this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu", handleClickFn)
                }
                if (!this.options.disableHover) {
                    this.$menuItems.on("mouseenter.zf.dropdownmenu", function(e) {
                        var $elem = $(this),
                            hasSub = $elem.hasClass(parClass);
                        if (hasSub) {
                            clearTimeout(_this.delay);
                            _this.delay = setTimeout(function() {
                                _this._show($elem.children(".is-dropdown-submenu"))
                            }, _this.options.hoverDelay)
                        }
                    }).on("mouseleave.zf.dropdownmenu", function(e) {
                        var $elem = $(this),
                            hasSub = $elem.hasClass(parClass);
                        if (hasSub && _this.options.autoclose) {
                            if ($elem.attr("data-is-click") === "true" && _this.options.clickOpen) {
                                return false
                            }
                            clearTimeout(_this.delay);
                            _this.delay = setTimeout(function() {
                                _this._hide($elem)
                            }, _this.options.closingTime)
                        }
                    })
                }
                this.$menuItems.on("keydown.zf.dropdownmenu", function(e) {
                    var $element = $(e.target).parentsUntil("ul", '[role="menuitem"]'),
                        isTab = _this.$tabs.index($element) > -1,
                        $elements = isTab ? _this.$tabs : $element.siblings("li").add($element),
                        $prevElement, $nextElement;
                    $elements.each(function(i) {
                        if ($(this).is($element)) {
                            $prevElement = $elements.eq(i - 1);
                            $nextElement = $elements.eq(i + 1);
                            return
                        }
                    });
                    var nextSibling = function() {
                            if (!$element.is(":last-child")) {
                                $nextElement.children("a:first").focus();
                                e.preventDefault()
                            }
                        },
                        prevSibling = function() {
                            $prevElement.children("a:first").focus();
                            e.preventDefault()
                        },
                        openSub = function() {
                            var $sub = $element.children("ul.is-dropdown-submenu");
                            if ($sub.length) {
                                _this._show($sub);
                                $element.find("li > a:first").focus();
                                e.preventDefault()
                            } else {
                                return
                            }
                        },
                        closeSub = function() {
                            var close = $element.parent("ul").parent("li");
                            close.children("a:first").focus();
                            _this._hide(close);
                            e.preventDefault()
                        };
                    var functions = {
                        open: openSub,
                        close: function() {
                            _this._hide(_this.$element);
                            _this.$menuItems.find("a:first").focus();
                            e.preventDefault()
                        },
                        handled: function() {
                            e.stopImmediatePropagation()
                        }
                    };
                    if (isTab) {
                        if (_this._isVertical()) {
                            if (Foundation.rtl()) {
                                $.extend(functions, {
                                    down: nextSibling,
                                    up: prevSibling,
                                    next: closeSub,
                                    previous: openSub
                                })
                            } else {
                                $.extend(functions, {
                                    down: nextSibling,
                                    up: prevSibling,
                                    next: openSub,
                                    previous: closeSub
                                })
                            }
                        } else {
                            if (Foundation.rtl()) {
                                $.extend(functions, {
                                    next: prevSibling,
                                    previous: nextSibling,
                                    down: openSub,
                                    up: closeSub
                                })
                            } else {
                                $.extend(functions, {
                                    next: nextSibling,
                                    previous: prevSibling,
                                    down: openSub,
                                    up: closeSub
                                })
                            }
                        }
                    } else {
                        if (Foundation.rtl()) {
                            $.extend(functions, {
                                next: closeSub,
                                previous: openSub,
                                down: nextSibling,
                                up: prevSibling
                            })
                        } else {
                            $.extend(functions, {
                                next: openSub,
                                previous: closeSub,
                                down: nextSibling,
                                up: prevSibling
                            })
                        }
                    }
                    Foundation.Keyboard.handleKey(e, "DropdownMenu", functions)
                })
            }
        }, {
            key: "_addBodyHandler",
            value: function _addBodyHandler() {
                var $body = $(document.body),
                    _this = this;
                $body.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu", function(e) {
                    var $link = _this.$element.find(e.target);
                    if ($link.length) {
                        return
                    }
                    _this._hide();
                    $body.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu")
                })
            }
        }, {
            key: "_show",
            value: function _show($sub) {
                var idx = this.$tabs.index(this.$tabs.filter(function(i, el) {
                    return $(el).find($sub).length > 0
                }));
                var $sibs = $sub.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
                this._hide($sibs, idx);
                $sub.css("visibility", "hidden").addClass("js-dropdown-active").attr({
                    "aria-hidden": false
                }).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({
                    "aria-expanded": true
                });
                var clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
                if (!clear) {
                    var oldClass = this.options.alignment === "left" ? "-right" : "-left",
                        $parentLi = $sub.parent(".is-dropdown-submenu-parent");
                    $parentLi.removeClass("opens" + oldClass).addClass("opens-" + this.options.alignment);
                    clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
                    if (!clear) {
                        $parentLi.removeClass("opens-" + this.options.alignment).addClass("opens-inner")
                    }
                    this.changed = true
                }
                $sub.css("visibility", "");
                if (this.options.closeOnClick) {
                    this._addBodyHandler()
                }
                this.$element.trigger("show.zf.dropdownmenu", [$sub])
            }
        }, {
            key: "_hide",
            value: function _hide($elem, idx) {
                var $toClose;
                if ($elem && $elem.length) {
                    $toClose = $elem
                } else if (idx !== undefined) {
                    $toClose = this.$tabs.not(function(i, el) {
                        return i === idx
                    })
                } else {
                    $toClose = this.$element
                }
                var somethingToClose = $toClose.hasClass("is-active") || $toClose.find(".is-active").length > 0;
                if (somethingToClose) {
                    $toClose.find("li.is-active").add($toClose).attr({
                        "aria-expanded": false,
                        "data-is-click": false
                    }).removeClass("is-active");
                    $toClose.find("ul.js-dropdown-active").attr({
                        "aria-hidden": true
                    }).removeClass("js-dropdown-active");
                    if (this.changed || $toClose.find("opens-inner").length) {
                        var oldClass = this.options.alignment === "left" ? "right" : "left";
                        $toClose.find("li.is-dropdown-submenu-parent").add($toClose).removeClass("opens-inner opens-" + this.options.alignment).addClass("opens-" + oldClass);
                        this.changed = false
                    }
                    this.$element.trigger("hide.zf.dropdownmenu", [$toClose])
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner");
                $(document.body).off(".zf.dropdownmenu");
                Foundation.Nest.Burn(this.$element, "dropdown");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return DropdownMenu
    }();
    DropdownMenu.defaults = {
        disableHover: false,
        autoclose: true,
        hoverDelay: 50,
        clickOpen: false,
        closingTime: 500,
        alignment: "left",
        closeOnClick: true,
        closeOnClickInside: true,
        verticalClass: "vertical",
        rightClass: "align-right",
        forceFollow: true
    };
    Foundation.plugin(DropdownMenu, "DropdownMenu")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Equalizer = function() {
        function Equalizer(element, options) {
            _classCallCheck(this, Equalizer);
            this.$element = element;
            this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Equalizer")
        }
        _createClass(Equalizer, [{
            key: "_init",
            value: function _init() {
                var eqId = this.$element.attr("data-equalizer") || "";
                var $watched = this.$element.find('[data-equalizer-watch="' + eqId + '"]');
                this.$watched = $watched.length ? $watched : this.$element.find("[data-equalizer-watch]");
                this.$element.attr("data-resize", eqId || Foundation.GetYoDigits(6, "eq"));
                this.hasNested = this.$element.find("[data-equalizer]").length > 0;
                this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0;
                this.isOn = false;
                this._bindHandler = {
                    onResizeMeBound: this._onResizeMe.bind(this),
                    onPostEqualizedBound: this._onPostEqualized.bind(this)
                };
                var imgs = this.$element.find("img");
                var tooSmall;
                if (this.options.equalizeOn) {
                    tooSmall = this._checkMQ();
                    $(window).on("changed.zf.mediaquery", this._checkMQ.bind(this))
                } else {
                    this._events()
                }
                if (tooSmall !== undefined && tooSmall === false || tooSmall === undefined) {
                    if (imgs.length) {
                        Foundation.onImagesLoaded(imgs, this._reflow.bind(this))
                    } else {
                        this._reflow()
                    }
                }
            }
        }, {
            key: "_pauseEvents",
            value: function _pauseEvents() {
                this.isOn = false;
                this.$element.off({
                    ".zf.equalizer": this._bindHandler.onPostEqualizedBound,
                    "resizeme.zf.trigger": this._bindHandler.onResizeMeBound
                })
            }
        }, {
            key: "_onResizeMe",
            value: function _onResizeMe(e) {
                this._reflow()
            }
        }, {
            key: "_onPostEqualized",
            value: function _onPostEqualized(e) {
                if (e.target !== this.$element[0]) {
                    this._reflow()
                }
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                this._pauseEvents();
                if (this.hasNested) {
                    this.$element.on("postequalized.zf.equalizer", this._bindHandler.onPostEqualizedBound)
                } else {
                    this.$element.on("resizeme.zf.trigger", this._bindHandler.onResizeMeBound)
                }
                this.isOn = true
            }
        }, {
            key: "_checkMQ",
            value: function _checkMQ() {
                var tooSmall = !Foundation.MediaQuery.atLeast(this.options.equalizeOn);
                if (tooSmall) {
                    if (this.isOn) {
                        this._pauseEvents();
                        this.$watched.css("height", "auto")
                    }
                } else {
                    if (!this.isOn) {
                        this._events()
                    }
                }
                return tooSmall
            }
        }, {
            key: "_killswitch",
            value: function _killswitch() {
                return
            }
        }, {
            key: "_reflow",
            value: function _reflow() {
                if (!this.options.equalizeOnStack) {
                    if (this._isStacked()) {
                        this.$watched.css("height", "auto");
                        return false
                    }
                }
                if (this.options.equalizeByRow) {
                    this.getHeightsByRow(this.applyHeightByRow.bind(this))
                } else {
                    this.getHeights(this.applyHeight.bind(this))
                }
            }
        }, {
            key: "_isStacked",
            value: function _isStacked() {
                return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top
            }
        }, {
            key: "getHeights",
            value: function getHeights(cb) {
                var heights = [];
                for (var i = 0, len = this.$watched.length; i < len; i++) {
                    this.$watched[i].style.height = "auto";
                    heights.push(this.$watched[i].offsetHeight)
                }
                cb(heights)
            }
        }, {
            key: "getHeightsByRow",
            value: function getHeightsByRow(cb) {
                var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
                    groups = [],
                    group = 0;
                groups[group] = [];
                for (var i = 0, len = this.$watched.length; i < len; i++) {
                    this.$watched[i].style.height = "auto";
                    var elOffsetTop = $(this.$watched[i]).offset().top;
                    if (elOffsetTop != lastElTopOffset) {
                        group++;
                        groups[group] = [];
                        lastElTopOffset = elOffsetTop
                    }
                    groups[group].push([this.$watched[i], this.$watched[i].offsetHeight])
                }
                for (var j = 0, ln = groups.length; j < ln; j++) {
                    var heights = $(groups[j]).map(function() {
                        return this[1]
                    }).get();
                    var max = Math.max.apply(null, heights);
                    groups[j].push(max)
                }
                cb(groups)
            }
        }, {
            key: "applyHeight",
            value: function applyHeight(heights) {
                var max = Math.max.apply(null, heights);
                this.$element.trigger("preequalized.zf.equalizer");
                this.$watched.css("height", max);
                this.$element.trigger("postequalized.zf.equalizer")
            }
        }, {
            key: "applyHeightByRow",
            value: function applyHeightByRow(groups) {
                this.$element.trigger("preequalized.zf.equalizer");
                for (var i = 0, len = groups.length; i < len; i++) {
                    var groupsILength = groups[i].length,
                        max = groups[i][groupsILength - 1];
                    if (groupsILength <= 2) {
                        $(groups[i][0][0]).css({
                            height: "auto"
                        });
                        continue
                    }
                    this.$element.trigger("preequalizedrow.zf.equalizer");
                    for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
                        $(groups[i][j][0]).css({
                            height: max
                        })
                    }
                    this.$element.trigger("postequalizedrow.zf.equalizer")
                }
                this.$element.trigger("postequalized.zf.equalizer")
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this._pauseEvents();
                this.$watched.css("height", "auto");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Equalizer
    }();
    Equalizer.defaults = {
        equalizeOnStack: false,
        equalizeByRow: false,
        equalizeOn: ""
    };
    Foundation.plugin(Equalizer, "Equalizer")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Interchange = function() {
        function Interchange(element, options) {
            _classCallCheck(this, Interchange);
            this.$element = element;
            this.options = $.extend({}, Interchange.defaults, options);
            this.rules = [];
            this.currentPath = "";
            this._init();
            this._events();
            Foundation.registerPlugin(this, "Interchange")
        }
        _createClass(Interchange, [{
            key: "_init",
            value: function _init() {
                this._addBreakpoints();
                this._generateRules();
                this._reflow()
            }
        }, {
            key: "_events",
            value: function _events() {
                $(window).on("resize.zf.interchange", Foundation.util.throttle(this._reflow.bind(this), 50))
            }
        }, {
            key: "_reflow",
            value: function _reflow() {
                var match;
                for (var i in this.rules) {
                    if (this.rules.hasOwnProperty(i)) {
                        var rule = this.rules[i];
                        if (window.matchMedia(rule.query).matches) {
                            match = rule
                        }
                    }
                }
                if (match) {
                    this.replace(match.path)
                }
            }
        }, {
            key: "_addBreakpoints",
            value: function _addBreakpoints() {
                for (var i in Foundation.MediaQuery.queries) {
                    if (Foundation.MediaQuery.queries.hasOwnProperty(i)) {
                        var query = Foundation.MediaQuery.queries[i];
                        Interchange.SPECIAL_QUERIES[query.name] = query.value
                    }
                }
            }
        }, {
            key: "_generateRules",
            value: function _generateRules(element) {
                var rulesList = [];
                var rules;
                if (this.options.rules) {
                    rules = this.options.rules
                } else {
                    rules = this.$element.data("interchange").match(/\[.*?\]/g)
                }
                for (var i in rules) {
                    if (rules.hasOwnProperty(i)) {
                        var rule = rules[i].slice(1, -1).split(", ");
                        var path = rule.slice(0, -1).join("");
                        var query = rule[rule.length - 1];
                        if (Interchange.SPECIAL_QUERIES[query]) {
                            query = Interchange.SPECIAL_QUERIES[query]
                        }
                        rulesList.push({
                            path: path,
                            query: query
                        })
                    }
                }
                this.rules = rulesList
            }
        }, {
            key: "replace",
            value: function replace(path) {
                if (this.currentPath === path) return;
                var _this = this,
                    trigger = "replaced.zf.interchange";
                if (this.$element[0].nodeName === "IMG") {
                    this.$element.attr("src", path).on("load", function() {
                        _this.currentPath = path
                    }).trigger(trigger)
                } else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
                    this.$element.css({
                        "background-image": "url(" + path + ")"
                    }).trigger(trigger)
                } else {
                    $.get(path, function(response) {
                        _this.$element.html(response).trigger(trigger);
                        $(response).foundation();
                        _this.currentPath = path
                    })
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {}
        }]);
        return Interchange
    }();
    Interchange.defaults = {
        rules: null
    };
    Interchange.SPECIAL_QUERIES = {
        landscape: "screen and (orientation: landscape)",
        portrait: "screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
    };
    Foundation.plugin(Interchange, "Interchange")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Magellan = function() {
        function Magellan(element, options) {
            _classCallCheck(this, Magellan);
            this.$element = element;
            this.options = $.extend({}, Magellan.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Magellan")
        }
        _createClass(Magellan, [{
            key: "_init",
            value: function _init() {
                var id = this.$element[0].id || Foundation.GetYoDigits(6, "magellan");
                var _this = this;
                this.$targets = $("[data-magellan-target]");
                this.$links = this.$element.find("a");
                this.$element.attr({
                    "data-resize": id,
                    "data-scroll": id,
                    id: id
                });
                this.$active = $();
                this.scrollPos = parseInt(window.pageYOffset, 10);
                this._events()
            }
        }, {
            key: "calcPoints",
            value: function calcPoints() {
                var _this = this,
                    body = document.body,
                    html = document.documentElement;
                this.points = [];
                this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
                this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
                this.$targets.each(function() {
                    var $tar = $(this),
                        pt = Math.round($tar.offset().top - _this.options.threshold);
                    $tar.targetPoint = pt;
                    _this.points.push(pt)
                })
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this,
                    $body = $("html, body"),
                    opts = {
                        duration: _this.options.animationDuration,
                        easing: _this.options.animationEasing
                    };
                $(window).one("load", function() {
                    if (_this.options.deepLinking) {
                        if (location.hash) {
                            _this.scrollToLoc(location.hash)
                        }
                    }
                    _this.calcPoints();
                    _this._updateActive()
                });
                this.$element.on({
                    "resizeme.zf.trigger": this.reflow.bind(this),
                    "scrollme.zf.trigger": this._updateActive.bind(this)
                }).on("click.zf.magellan", 'a[href^="#"]', function(e) {
                    e.preventDefault();
                    var arrival = this.getAttribute("href");
                    _this.scrollToLoc(arrival)
                })
            }
        }, {
            key: "scrollToLoc",
            value: function scrollToLoc(loc) {
                if (!$(loc).length) {
                    return false
                }
                var scrollPos = Math.round($(loc).offset().top - this.options.threshold / 2 - this.options.barOffset);
                $("html, body").stop(true).animate({
                    scrollTop: scrollPos
                }, this.options.animationDuration, this.options.animationEasing)
            }
        }, {
            key: "reflow",
            value: function reflow() {
                this.calcPoints();
                this._updateActive()
            }
        }, {
            key: "_updateActive",
            value: function _updateActive() {
                var winPos = parseInt(window.pageYOffset, 10),
                    curIdx;
                if (winPos + this.winHeight === this.docHeight) {
                    curIdx = this.points.length - 1
                } else if (winPos < this.points[0]) {
                    curIdx = 0
                } else {
                    var isDown = this.scrollPos < winPos,
                        _this = this,
                        curVisible = this.points.filter(function(p, i) {
                            return isDown ? p - _this.options.barOffset <= winPos : p - _this.options.barOffset - _this.options.threshold <= winPos
                        });
                    curIdx = curVisible.length ? curVisible.length - 1 : 0
                }
                this.$active.removeClass(this.options.activeClass);
                this.$active = this.$links.filter('[href="#' + this.$targets.eq(curIdx).data("magellan-target") + '"]').addClass(this.options.activeClass);
                if (this.options.deepLinking) {
                    var hash = this.$active[0].getAttribute("href");
                    if (window.history.pushState) {
                        window.history.pushState(null, null, hash)
                    } else {
                        window.location.hash = hash
                    }
                }
                this.scrollPos = winPos;
                this.$element.trigger("update.zf.magellan", [this.$active])
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass);
                if (this.options.deepLinking) {
                    var hash = this.$active[0].getAttribute("href");
                    window.location.hash.replace(hash, "")
                }
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Magellan
    }();
    Magellan.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: false,
        barOffset: 0
    };
    Foundation.plugin(Magellan, "Magellan")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var OffCanvas = function() {
        function OffCanvas(element, options) {
            _classCallCheck(this, OffCanvas);
            this.$element = element;
            this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options);
            this.$lastTrigger = $();
            this.$triggers = $();
            this._init();
            this._events();
            Foundation.registerPlugin(this, "OffCanvas");
            Foundation.Keyboard.register("OffCanvas", {
                ESCAPE: "close"
            })
        }
        _createClass(OffCanvas, [{
            key: "_init",
            value: function _init() {
                var id = this.$element.attr("id");
                this.$element.attr("aria-hidden", "true");
                this.$triggers = $(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-expanded", "false").attr("aria-controls", id);
                if (this.options.closeOnClick) {
                    if ($(".js-off-canvas-exit").length) {
                        this.$exiter = $(".js-off-canvas-exit")
                    } else {
                        var exiter = document.createElement("div");
                        exiter.setAttribute("class", "js-off-canvas-exit");
                        $("[data-off-canvas-content]").append(exiter);
                        this.$exiter = $(exiter)
                    }
                }
                this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, "g").test(this.$element[0].className);
                if (this.options.isRevealed) {
                    this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2];
                    this._setMQChecker()
                }
                if (!this.options.transitionTime) {
                    this.options.transitionTime = parseFloat(window.getComputedStyle($("[data-off-canvas-wrapper]")[0]).transitionDuration) * 1e3
                }
            }
        }, {
            key: "_events",
            value: function _events() {
                this.$element.off(".zf.trigger .zf.offcanvas").on({
                    "open.zf.trigger": this.open.bind(this),
                    "close.zf.trigger": this.close.bind(this),
                    "toggle.zf.trigger": this.toggle.bind(this),
                    "keydown.zf.offcanvas": this._handleKeyboard.bind(this)
                });
                if (this.options.closeOnClick && this.$exiter.length) {
                    this.$exiter.on({
                        "click.zf.offcanvas": this.close.bind(this)
                    })
                }
            }
        }, {
            key: "_setMQChecker",
            value: function _setMQChecker() {
                var _this = this;
                $(window).on("changed.zf.mediaquery", function() {
                    if (Foundation.MediaQuery.atLeast(_this.options.revealOn)) {
                        _this.reveal(true)
                    } else {
                        _this.reveal(false)
                    }
                }).one("load.zf.offcanvas", function() {
                    if (Foundation.MediaQuery.atLeast(_this.options.revealOn)) {
                        _this.reveal(true)
                    }
                })
            }
        }, {
            key: "reveal",
            value: function reveal(isRevealed) {
                var $closer = this.$element.find("[data-close]");
                if (isRevealed) {
                    this.close();
                    this.isRevealed = true;
                    this.$element.off("open.zf.trigger toggle.zf.trigger");
                    if ($closer.length) {
                        $closer.hide()
                    }
                } else {
                    this.isRevealed = false;
                    this.$element.on({
                        "open.zf.trigger": this.open.bind(this),
                        "toggle.zf.trigger": this.toggle.bind(this)
                    });
                    if ($closer.length) {
                        $closer.show()
                    }
                }
            }
        }, {
            key: "open",
            value: function open(event, trigger) {
                if (this.$element.hasClass("is-open") || this.isRevealed) {
                    return
                }
                var _this = this,
                    $body = $(document.body);
                if (this.options.forceTop) {
                    $("body").scrollTop(0)
                }
                var $wrapper = $("[data-off-canvas-wrapper]");
                $wrapper.addClass("is-off-canvas-open is-open-" + _this.options.position);
                _this.$element.addClass("is-open");
                this.$triggers.attr("aria-expanded", "true");
                this.$element.attr("aria-hidden", "false").trigger("opened.zf.offcanvas");
                if (this.options.closeOnClick) {
                    this.$exiter.addClass("is-visible")
                }
                if (trigger) {
                    this.$lastTrigger = trigger
                }
                if (this.options.autoFocus) {
                    $wrapper.one(Foundation.transitionend($wrapper), function() {
                        if (_this.$element.hasClass("is-open")) {
                            _this.$element.attr("tabindex", "-1");
                            _this.$element.focus()
                        }
                    })
                }
                if (this.options.trapFocus) {
                    $wrapper.one(Foundation.transitionend($wrapper), function() {
                        if (_this.$element.hasClass("is-open")) {
                            _this.$element.attr("tabindex", "-1");
                            _this.trapFocus()
                        }
                    })
                }
            }
        }, {
            key: "_trapFocus",
            value: function _trapFocus() {
                var focusable = Foundation.Keyboard.findFocusable(this.$element),
                    first = focusable.eq(0),
                    last = focusable.eq(-1);
                focusable.off(".zf.offcanvas").on("keydown.zf.offcanvas", function(e) {
                    var key = Foundation.Keyboard.parseKey(e);
                    if (key === "TAB" && e.target === last[0]) {
                        e.preventDefault();
                        first.focus()
                    }
                    if (key === "SHIFT_TAB" && e.target === first[0]) {
                        e.preventDefault();
                        last.focus()
                    }
                })
            }
        }, {
            key: "close",
            value: function close(cb) {
                if (!this.$element.hasClass("is-open") || this.isRevealed) {
                    return
                }
                var _this = this;
                $("[data-off-canvas-wrapper]").removeClass("is-off-canvas-open is-open-" + _this.options.position);
                _this.$element.removeClass("is-open");
                this.$element.attr("aria-hidden", "true").trigger("closed.zf.offcanvas");
                if (this.options.closeOnClick) {
                    this.$exiter.removeClass("is-visible")
                }
                this.$triggers.attr("aria-expanded", "false");
                if (this.options.trapFocus) {
                    $("[data-off-canvas-content]").removeAttr("tabindex")
                }
            }
        }, {
            key: "toggle",
            value: function toggle(event, trigger) {
                if (this.$element.hasClass("is-open")) {
                    this.close(event, trigger)
                } else {
                    this.open(event, trigger)
                }
            }
        }, {
            key: "_handleKeyboard",
            value: function _handleKeyboard(e) {
                var _this2 = this;
                Foundation.Keyboard.handleKey(e, "OffCanvas", {
                    close: function() {
                        _this2.close();
                        _this2.$lastTrigger.focus();
                        return true
                    },
                    handled: function() {
                        e.stopPropagation();
                        e.preventDefault()
                    }
                })
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.close();
                this.$element.off(".zf.trigger .zf.offcanvas");
                this.$exiter.off(".zf.offcanvas");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return OffCanvas
    }();
    OffCanvas.defaults = {
        closeOnClick: true,
        transitionTime: 0,
        position: "left",
        forceTop: true,
        isRevealed: false,
        revealOn: null,
        autoFocus: true,
        revealClass: "reveal-for-",
        trapFocus: false
    };
    Foundation.plugin(OffCanvas, "OffCanvas")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Orbit = function() {
        function Orbit(element, options) {
            _classCallCheck(this, Orbit);
            this.$element = element;
            this.options = $.extend({}, Orbit.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Orbit");
            Foundation.Keyboard.register("Orbit", {
                ltr: {
                    ARROW_RIGHT: "next",
                    ARROW_LEFT: "previous"
                },
                rtl: {
                    ARROW_LEFT: "next",
                    ARROW_RIGHT: "previous"
                }
            })
        }
        _createClass(Orbit, [{
            key: "_init",
            value: function _init() {
                this.$wrapper = this.$element.find("." + this.options.containerClass);
                this.$slides = this.$element.find("." + this.options.slideClass);
                var $images = this.$element.find("img"),
                    initActive = this.$slides.filter(".is-active");
                if (!initActive.length) {
                    this.$slides.eq(0).addClass("is-active")
                }
                if (!this.options.useMUI) {
                    this.$slides.addClass("no-motionui")
                }
                if ($images.length) {
                    Foundation.onImagesLoaded($images, this._prepareForOrbit.bind(this))
                } else {
                    this._prepareForOrbit()
                }
                if (this.options.bullets) {
                    this._loadBullets()
                }
                this._events();
                if (this.options.autoPlay && this.$slides.length > 1) {
                    this.geoSync()
                }
                if (this.options.accessible) {
                    this.$wrapper.attr("tabindex", 0)
                }
            }
        }, {
            key: "_loadBullets",
            value: function _loadBullets() {
                this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button")
            }
        }, {
            key: "geoSync",
            value: function geoSync() {
                var _this = this;
                this.timer = new Foundation.Timer(this.$element, {
                    duration: this.options.timerDelay,
                    infinite: false
                }, function() {
                    _this.changeSlide(true)
                });
                this.timer.start()
            }
        }, {
            key: "_prepareForOrbit",
            value: function _prepareForOrbit() {
                var _this = this;
                this._setWrapperHeight(function(max) {
                    _this._setSlideHeight(max)
                })
            }
        }, {
            key: "_setWrapperHeight",
            value: function _setWrapperHeight(cb) {
                var max = 0,
                    temp, counter = 0;
                this.$slides.each(function() {
                    temp = this.getBoundingClientRect().height;
                    $(this).attr("data-slide", counter);
                    if (counter) {
                        $(this).css({
                            position: "relative",
                            display: "none"
                        })
                    }
                    max = temp > max ? temp : max;
                    counter++
                });
                if (counter === this.$slides.length) {
                    this.$wrapper.css({
                        height: max
                    });
                    cb(max)
                }
            }
        }, {
            key: "_setSlideHeight",
            value: function _setSlideHeight(height) {
                this.$slides.each(function() {
                    $(this).css("max-height", height)
                })
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                if (this.$slides.length > 1) {
                    if (this.options.swipe) {
                        this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function(e) {
                            e.preventDefault();
                            _this.changeSlide(true)
                        }).on("swiperight.zf.orbit", function(e) {
                            e.preventDefault();
                            _this.changeSlide(false)
                        })
                    }
                    if (this.options.autoPlay) {
                        this.$slides.on("click.zf.orbit", function() {
                            _this.$element.data("clickedOn", _this.$element.data("clickedOn") ? false : true);
                            _this.timer[_this.$element.data("clickedOn") ? "pause" : "start"]()
                        });
                        if (this.options.pauseOnHover) {
                            this.$element.on("mouseenter.zf.orbit", function() {
                                _this.timer.pause()
                            }).on("mouseleave.zf.orbit", function() {
                                if (!_this.$element.data("clickedOn")) {
                                    _this.timer.start()
                                }
                            })
                        }
                    }
                    if (this.options.navButtons) {
                        var $controls = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass);
                        $controls.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function(e) {
                            e.preventDefault();
                            _this.changeSlide($(this).hasClass(_this.options.nextClass))
                        })
                    }
                    if (this.options.bullets) {
                        this.$bullets.on("click.zf.orbit touchend.zf.orbit", function() {
                            if (/is-active/g.test(this.className)) {
                                return false
                            }
                            var idx = $(this).data("slide"),
                                ltr = idx > _this.$slides.filter(".is-active").data("slide"),
                                $slide = _this.$slides.eq(idx);
                            _this.changeSlide(ltr, $slide, idx)
                        })
                    }
                    if (this.options.accessible) {
                        this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function(e) {
                            Foundation.Keyboard.handleKey(e, "Orbit", {
                                next: function() {
                                    _this.changeSlide(true)
                                },
                                previous: function() {
                                    _this.changeSlide(false)
                                },
                                handled: function() {
                                    if ($(e.target).is(_this.$bullets)) {
                                        _this.$bullets.filter(".is-active").focus()
                                    }
                                }
                            })
                        })
                    }
                }
            }
        }, {
            key: "changeSlide",
            value: function changeSlide(isLTR, chosenSlide, idx) {
                var $curSlide = this.$slides.filter(".is-active").eq(0);
                if (/mui/g.test($curSlide[0].className)) {
                    return false
                }
                var $firstSlide = this.$slides.first(),
                    $lastSlide = this.$slides.last(),
                    dirIn = isLTR ? "Right" : "Left",
                    dirOut = isLTR ? "Left" : "Right",
                    _this = this,
                    $newSlide;
                if (!chosenSlide) {
                    $newSlide = isLTR ? this.options.infiniteWrap ? $curSlide.next("." + this.options.slideClass).length ? $curSlide.next("." + this.options.slideClass) : $firstSlide : $curSlide.next("." + this.options.slideClass) : this.options.infiniteWrap ? $curSlide.prev("." + this.options.slideClass).length ? $curSlide.prev("." + this.options.slideClass) : $lastSlide : $curSlide.prev("." + this.options.slideClass)
                } else {
                    $newSlide = chosenSlide
                }
                if ($newSlide.length) {
                    this.$element.trigger("beforeslidechange.zf.orbit", [$curSlide, $newSlide]);
                    if (this.options.bullets) {
                        idx = idx || this.$slides.index($newSlide);
                        this._updateBullets(idx)
                    }
                    if (this.options.useMUI) {
                        Foundation.Motion.animateIn($newSlide.addClass("is-active").css({
                            position: "absolute",
                            top: 0
                        }), this.options["animInFrom" + dirIn], function() {
                            $newSlide.css({
                                position: "relative",
                                display: "block"
                            }).attr("aria-live", "polite")
                        });
                        Foundation.Motion.animateOut($curSlide.removeClass("is-active"), this.options["animOutTo" + dirOut], function() {
                            $curSlide.removeAttr("aria-live");
                            if (_this.options.autoPlay && !_this.timer.isPaused) {
                                _this.timer.restart()
                            }
                        })
                    } else {
                        $curSlide.removeClass("is-active is-in").removeAttr("aria-live").hide();
                        $newSlide.addClass("is-active is-in").attr("aria-live", "polite").show();
                        if (this.options.autoPlay && !this.timer.isPaused) {
                            this.timer.restart()
                        }
                    }
                    this.$element.trigger("slidechange.zf.orbit", [$newSlide])
                }
            }
        }, {
            key: "_updateBullets",
            value: function _updateBullets(idx) {
                var $oldBullet = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),
                    span = $oldBullet.find("span:last").detach(),
                    $newBullet = this.$bullets.eq(idx).addClass("is-active").append(span)
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide();
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Orbit
    }();
    Orbit.defaults = {
        bullets: true,
        navButtons: true,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: true,
        timerDelay: 5e3,
        infiniteWrap: true,
        swipe: true,
        pauseOnHover: true,
        accessible: true,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: true
    };
    Foundation.plugin(Orbit, "Orbit")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var ResponsiveMenu = function() {
        function ResponsiveMenu(element, options) {
            _classCallCheck(this, ResponsiveMenu);
            this.$element = $(element);
            this.rules = this.$element.data("responsive-menu");
            this.currentMq = null;
            this.currentPlugin = null;
            this._init();
            this._events();
            Foundation.registerPlugin(this, "ResponsiveMenu")
        }
        _createClass(ResponsiveMenu, [{
            key: "_init",
            value: function _init() {
                if (typeof this.rules === "string") {
                    var rulesTree = {};
                    var rules = this.rules.split(" ");
                    for (var i = 0; i < rules.length; i++) {
                        var rule = rules[i].split("-");
                        var ruleSize = rule.length > 1 ? rule[0] : "small";
                        var rulePlugin = rule.length > 1 ? rule[1] : rule[0];
                        if (MenuPlugins[rulePlugin] !== null) {
                            rulesTree[ruleSize] = MenuPlugins[rulePlugin]
                        }
                    }
                    this.rules = rulesTree
                }
                if (!$.isEmptyObject(this.rules)) {
                    this._checkMediaQueries()
                }
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                $(window).on("changed.zf.mediaquery", function() {
                    _this._checkMediaQueries()
                })
            }
        }, {
            key: "_checkMediaQueries",
            value: function _checkMediaQueries() {
                var matchedMq, _this = this;
                $.each(this.rules, function(key) {
                    if (Foundation.MediaQuery.atLeast(key)) {
                        matchedMq = key
                    }
                });
                if (!matchedMq) return;
                if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;
                $.each(MenuPlugins, function(key, value) {
                    _this.$element.removeClass(value.cssClass)
                });
                this.$element.addClass(this.rules[matchedMq].cssClass);
                if (this.currentPlugin) this.currentPlugin.destroy();
                this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {})
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.currentPlugin.destroy();
                $(window).off(".zf.ResponsiveMenu");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return ResponsiveMenu
    }();
    ResponsiveMenu.defaults = {};
    var MenuPlugins = {
        dropdown: {
            cssClass: "dropdown",
            plugin: Foundation._plugins["dropdown-menu"] || null
        },
        drilldown: {
            cssClass: "drilldown",
            plugin: Foundation._plugins["drilldown"] || null
        },
        accordion: {
            cssClass: "accordion-menu",
            plugin: Foundation._plugins["accordion-menu"] || null
        }
    };
    Foundation.plugin(ResponsiveMenu, "ResponsiveMenu")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var ResponsiveToggle = function() {
        function ResponsiveToggle(element, options) {
            _classCallCheck(this, ResponsiveToggle);
            this.$element = $(element);
            this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
            this._init();
            this._events();
            Foundation.registerPlugin(this, "ResponsiveToggle")
        }
        _createClass(ResponsiveToggle, [{
            key: "_init",
            value: function _init() {
                var targetID = this.$element.data("responsive-toggle");
                if (!targetID) {
                    console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar.")
                }
                this.$targetMenu = $("#" + targetID);
                this.$toggler = this.$element.find("[data-toggle]");
                this._update()
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                this._updateMqHandler = this._update.bind(this);
                $(window).on("changed.zf.mediaquery", this._updateMqHandler);
                this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this))
            }
        }, {
            key: "_update",
            value: function _update() {
                if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
                    this.$element.show();
                    this.$targetMenu.hide()
                } else {
                    this.$element.hide();
                    this.$targetMenu.show()
                }
            }
        }, {
            key: "toggleMenu",
            value: function toggleMenu() {
                if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
                    this.$targetMenu.toggle(0);
                    this.$element.trigger("toggled.zf.responsiveToggle")
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.off(".zf.responsiveToggle");
                this.$toggler.off(".zf.responsiveToggle");
                $(window).off("changed.zf.mediaquery", this._updateMqHandler);
                Foundation.unregisterPlugin(this)
            }
        }]);
        return ResponsiveToggle
    }();
    ResponsiveToggle.defaults = {
        hideFor: "medium"
    };
    Foundation.plugin(ResponsiveToggle, "ResponsiveToggle")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Reveal = function() {
        function Reveal(element, options) {
            _classCallCheck(this, Reveal);
            this.$element = element;
            this.options = $.extend({}, Reveal.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Reveal");
            Foundation.Keyboard.register("Reveal", {
                ENTER: "open",
                SPACE: "open",
                ESCAPE: "close",
                TAB: "tab_forward",
                SHIFT_TAB: "tab_backward"
            })
        }
        _createClass(Reveal, [{
            key: "_init",
            value: function _init() {
                this.id = this.$element.attr("id");
                this.isActive = false;
                this.cached = {
                    mq: Foundation.MediaQuery.current
                };
                this.isMobile = mobileSniff();
                this.$anchor = $('[data-open="' + this.id + '"]').length ? $('[data-open="' + this.id + '"]') : $('[data-toggle="' + this.id + '"]');
                this.$anchor.attr({
                    "aria-controls": this.id,
                    "aria-haspopup": true,
                    tabindex: 0
                });
                if (this.options.fullScreen || this.$element.hasClass("full")) {
                    this.options.fullScreen = true;
                    this.options.overlay = false
                }
                if (this.options.overlay && !this.$overlay) {
                    this.$overlay = this._makeOverlay(this.id)
                }
                this.$element.attr({
                    role: "dialog",
                    "aria-hidden": true,
                    "data-yeti-box": this.id,
                    "data-resize": this.id
                });
                if (this.$overlay) {
                    this.$element.detach().appendTo(this.$overlay)
                } else {
                    this.$element.detach().appendTo($("body"));
                    this.$element.addClass("without-overlay")
                }
                this._events();
                if (this.options.deepLink && window.location.hash === "#" + this.id) {
                    $(window).one("load.zf.reveal", this.open.bind(this))
                }
            }
        }, {
            key: "_makeOverlay",
            value: function _makeOverlay(id) {
                var $overlay = $("<div></div>").addClass("reveal-overlay").appendTo("body");
                return $overlay
            }
        }, {
            key: "_updatePosition",
            value: function _updatePosition() {
                var width = this.$element.outerWidth();
                var outerWidth = $(window).width();
                var height = this.$element.outerHeight();
                var outerHeight = $(window).height();
                var left, top;
                if (this.options.hOffset === "auto") {
                    left = parseInt((outerWidth - width) / 2, 10)
                } else {
                    left = parseInt(this.options.hOffset, 10)
                }
                if (this.options.vOffset === "auto") {
                    if (height > outerHeight) {
                        top = parseInt(Math.min(100, outerHeight / 10), 10)
                    } else {
                        top = parseInt((outerHeight - height) / 4, 10)
                    }
                } else {
                    top = parseInt(this.options.vOffset, 10)
                }
                this.$element.css({
                    top: top + "px"
                });
                if (!this.$overlay || this.options.hOffset !== "auto") {
                    this.$element.css({
                        left: left + "px"
                    });
                    this.$element.css({
                        margin: "0px"
                    })
                }
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this2 = this;
                var _this = this;
                this.$element.on({
                    "open.zf.trigger": this.open.bind(this),
                    "close.zf.trigger": function(event, $element) {
                        if (event.target === _this.$element[0] || $(event.target).parents("[data-closable]")[0] === $element) {
                            return _this2.close.apply(_this2)
                        }
                    },
                    "toggle.zf.trigger": this.toggle.bind(this),
                    "resizeme.zf.trigger": function() {
                        _this._updatePosition()
                    }
                });
                if (this.$anchor.length) {
                    this.$anchor.on("keydown.zf.reveal", function(e) {
                        if (e.which === 13 || e.which === 32) {
                            e.stopPropagation();
                            e.preventDefault();
                            _this.open()
                        }
                    })
                }
                if (this.options.closeOnClick && this.options.overlay) {
                    this.$overlay.off(".zf.reveal").on("click.zf.reveal", function(e) {
                        if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target) || !$.contains(document, e.target)) {
                            return
                        }
                        _this.close()
                    })
                }
                if (this.options.deepLink) {
                    $(window).on("popstate.zf.reveal:" + this.id, this._handleState.bind(this))
                }
            }
        }, {
            key: "_handleState",
            value: function _handleState(e) {
                if (window.location.hash === "#" + this.id && !this.isActive) {
                    this.open()
                } else {
                    this.close()
                }
            }
        }, {
            key: "open",
            value: function open() {
                var _this3 = this;
                if (this.options.deepLink) {
                    var hash = "#" + this.id;
                    if (window.history.pushState) {
                        window.history.pushState(null, null, hash)
                    } else {
                        window.location.hash = hash
                    }
                }
                this.isActive = true;
                this.$element.css({
                    visibility: "hidden"
                }).show().scrollTop(0);
                if (this.options.overlay) {
                    this.$overlay.css({
                        visibility: "hidden"
                    }).show()
                }
                this._updatePosition();
                this.$element.hide().css({
                    visibility: ""
                });
                if (this.$overlay) {
                    this.$overlay.css({
                        visibility: ""
                    }).hide();
                    if (this.$element.hasClass("fast")) {
                        this.$overlay.addClass("fast")
                    } else if (this.$element.hasClass("slow")) {
                        this.$overlay.addClass("slow")
                    }
                }
                if (!this.options.multipleOpened) {
                    this.$element.trigger("closeme.zf.reveal", this.id)
                }
                if (this.options.animationIn) {
                    var _this;
                    (function() {
                        var afterAnimationFocus = function() {
                            _this.$element.attr({
                                "aria-hidden": false,
                                tabindex: -1
                            }).focus()
                        };
                        _this = _this3;
                        if (_this3.options.overlay) {
                            Foundation.Motion.animateIn(_this3.$overlay, "fade-in")
                        }
                        Foundation.Motion.animateIn(_this3.$element, _this3.options.animationIn, function() {
                            _this3.focusableElements = Foundation.Keyboard.findFocusable(_this3.$element);
                            afterAnimationFocus()
                        })
                    })()
                } else {
                    if (this.options.overlay) {
                        this.$overlay.show(0)
                    }
                    this.$element.show(this.options.showDelay)
                }
                this.$element.attr({
                    "aria-hidden": false,
                    tabindex: -1
                }).focus();
                this.$element.trigger("open.zf.reveal");
                if (this.isMobile) {
                    this.originalScrollPos = window.pageYOffset;
                    $("html, body").addClass("is-reveal-open")
                } else {
                    $("body").addClass("is-reveal-open")
                }
                setTimeout(function() {
                    _this3._extraHandlers()
                }, 0)
            }
        }, {
            key: "_extraHandlers",
            value: function _extraHandlers() {
                var _this = this;
                this.focusableElements = Foundation.Keyboard.findFocusable(this.$element);
                if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
                    $("body").on("click.zf.reveal", function(e) {
                        if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target) || !$.contains(document, e.target)) {
                            return
                        }
                        _this.close()
                    })
                }
                if (this.options.closeOnEsc) {
                    $(window).on("keydown.zf.reveal", function(e) {
                        Foundation.Keyboard.handleKey(e, "Reveal", {
                            close: function() {
                                if (_this.options.closeOnEsc) {
                                    _this.close();
                                    _this.$anchor.focus()
                                }
                            }
                        })
                    })
                }
                this.$element.on("keydown.zf.reveal", function(e) {
                    var $target = $(this);
                    Foundation.Keyboard.handleKey(e, "Reveal", {
                        tab_forward: function() {
                            _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                            if (_this.$element.find(":focus").is(_this.focusableElements.eq(-1))) {
                                _this.focusableElements.eq(0).focus();
                                return true
                            }
                            if (_this.focusableElements.length === 0) {
                                return true
                            }
                        },
                        tab_backward: function() {
                            _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                            if (_this.$element.find(":focus").is(_this.focusableElements.eq(0)) || _this.$element.is(":focus")) {
                                _this.focusableElements.eq(-1).focus();
                                return true
                            }
                            if (_this.focusableElements.length === 0) {
                                return true
                            }
                        },
                        open: function() {
                            if (_this.$element.find(":focus").is(_this.$element.find("[data-close]"))) {
                                setTimeout(function() {
                                    _this.$anchor.focus()
                                }, 1)
                            } else if ($target.is(_this.focusableElements)) {
                                _this.open()
                            }
                        },
                        close: function() {
                            if (_this.options.closeOnEsc) {
                                _this.close();
                                _this.$anchor.focus()
                            }
                        },
                        handled: function(preventDefault) {
                            if (preventDefault) {
                                e.preventDefault()
                            }
                        }
                    })
                })
            }
        }, {
            key: "close",
            value: function close() {
                if (!this.isActive || !this.$element.is(":visible")) {
                    return false
                }
                var _this = this;
                if (this.options.animationOut) {
                    if (this.options.overlay) {
                        Foundation.Motion.animateOut(this.$overlay, "fade-out", finishUp)
                    } else {
                        finishUp()
                    }
                    Foundation.Motion.animateOut(this.$element, this.options.animationOut)
                } else {
                    if (this.options.overlay) {
                        this.$overlay.hide(0, finishUp)
                    } else {
                        finishUp()
                    }
                    this.$element.hide(this.options.hideDelay)
                }
                if (this.options.closeOnEsc) {
                    $(window).off("keydown.zf.reveal")
                }
                if (!this.options.overlay && this.options.closeOnClick) {
                    $("body").off("click.zf.reveal")
                }
                this.$element.off("keydown.zf.reveal");

                function finishUp() {
                    if (_this.isMobile) {
                        $("html, body").removeClass("is-reveal-open");
                        if (_this.originalScrollPos) {
                            $("body").scrollTop(_this.originalScrollPos);
                            _this.originalScrollPos = null
                        }
                    } else {
                        $("body").removeClass("is-reveal-open")
                    }
                    _this.$element.attr("aria-hidden", true);
                    _this.$element.trigger("closed.zf.reveal")
                }
                if (this.options.resetOnClose) {
                    this.$element.html(this.$element.html())
                }
                this.isActive = false;
                if (_this.options.deepLink) {
                    if (window.history.replaceState) {
                        window.history.replaceState("", document.title, window.location.pathname)
                    } else {
                        window.location.hash = ""
                    }
                }
            }
        }, {
            key: "toggle",
            value: function toggle() {
                if (this.isActive) {
                    this.close()
                } else {
                    this.open()
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                if (this.options.overlay) {
                    this.$element.appendTo($("body"));
                    this.$overlay.hide().off().remove()
                }
                this.$element.hide().off();
                this.$anchor.off(".zf");
                $(window).off(".zf.reveal:" + this.id);
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Reveal
    }();
    Reveal.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: true,
        closeOnEsc: true,
        multipleOpened: false,
        vOffset: "auto",
        hOffset: "auto",
        fullScreen: false,
        btmOffsetPct: 10,
        overlay: true,
        resetOnClose: false,
        deepLink: false
    };
    Foundation.plugin(Reveal, "Reveal");

    function iPhoneSniff() {
        return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
    }

    function androidSniff() {
        return /Android/.test(window.navigator.userAgent)
    }

    function mobileSniff() {
        return iPhoneSniff() || androidSniff()
    }
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Slider = function() {
        function Slider(element, options) {
            _classCallCheck(this, Slider);
            this.$element = element;
            this.options = $.extend({}, Slider.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Slider");
            Foundation.Keyboard.register("Slider", {
                ltr: {
                    ARROW_RIGHT: "increase",
                    ARROW_UP: "increase",
                    ARROW_DOWN: "decrease",
                    ARROW_LEFT: "decrease",
                    SHIFT_ARROW_RIGHT: "increase_fast",
                    SHIFT_ARROW_UP: "increase_fast",
                    SHIFT_ARROW_DOWN: "decrease_fast",
                    SHIFT_ARROW_LEFT: "decrease_fast"
                },
                rtl: {
                    ARROW_LEFT: "increase",
                    ARROW_RIGHT: "decrease",
                    SHIFT_ARROW_LEFT: "increase_fast",
                    SHIFT_ARROW_RIGHT: "decrease_fast"
                }
            })
        }
        _createClass(Slider, [{
            key: "_init",
            value: function _init() {
                this.inputs = this.$element.find("input");
                this.handles = this.$element.find("[data-slider-handle]");
                this.$handle = this.handles.eq(0);
                this.$input = this.inputs.length ? this.inputs.eq(0) : $("#" + this.$handle.attr("aria-controls"));
                this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
                var isDbl = false,
                    _this = this;
                if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
                    this.options.disabled = true;
                    this.$element.addClass(this.options.disabledClass)
                }
                if (!this.inputs.length) {
                    this.inputs = $().add(this.$input);
                    this.options.binding = true
                }
                this._setInitAttr(0);
                this._events(this.$handle);
                if (this.handles[1]) {
                    this.options.doubleSided = true;
                    this.$handle2 = this.handles.eq(1);
                    this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : $("#" + this.$handle2.attr("aria-controls"));
                    if (!this.inputs[1]) {
                        this.inputs = this.inputs.add(this.$input2)
                    }
                    isDbl = true;
                    this._setHandlePos(this.$handle, this.options.initialStart, true, function() {
                        _this._setHandlePos(_this.$handle2, _this.options.initialEnd, true)
                    });
                    this._setInitAttr(1);
                    this._events(this.$handle2)
                }
                if (!isDbl) {
                    this._setHandlePos(this.$handle, this.options.initialStart, true)
                }
            }
        }, {
            key: "_setHandlePos",
            value: function _setHandlePos($hndl, location, noInvert, cb) {
                if (this.$element.hasClass(this.options.disabledClass)) {
                    return
                }
                location = parseFloat(location);
                if (location < this.options.start) {
                    location = this.options.start
                } else if (location > this.options.end) {
                    location = this.options.end
                }
                var isDbl = this.options.doubleSided;
                if (isDbl) {
                    if (this.handles.index($hndl) === 0) {
                        var h2Val = parseFloat(this.$handle2.attr("aria-valuenow"));
                        location = location >= h2Val ? h2Val - this.options.step : location
                    } else {
                        var h1Val = parseFloat(this.$handle.attr("aria-valuenow"));
                        location = location <= h1Val ? h1Val + this.options.step : location
                    }
                }
                if (this.options.vertical && !noInvert) {
                    location = this.options.end - location
                }
                var _this = this,
                    vert = this.options.vertical,
                    hOrW = vert ? "height" : "width",
                    lOrT = vert ? "top" : "left",
                    handleDim = $hndl[0].getBoundingClientRect()[hOrW],
                    elemDim = this.$element[0].getBoundingClientRect()[hOrW],
                    pctOfBar = percent(location - this.options.start, this.options.end - this.options.start).toFixed(2),
                    pxToMove = (elemDim - handleDim) * pctOfBar,
                    movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal);
                location = parseFloat(location.toFixed(this.options.decimal));
                var css = {};
                this._setValues($hndl, location);
                if (isDbl) {
                    var isLeftHndl = this.handles.index($hndl) === 0,
                        dim, handlePct = ~~(percent(handleDim, elemDim) * 100);
                    if (isLeftHndl) {
                        css[lOrT] = movement + "%";
                        dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct;
                        if (cb && typeof cb === "function") {
                            cb()
                        }
                    } else {
                        var handlePos = parseFloat(this.$handle[0].style[lOrT]);
                        dim = movement - (isNaN(handlePos) ? this.options.initialStart / ((this.options.end - this.options.start) / 100) : handlePos) + handlePct
                    }
                    css["min-" + hOrW] = dim + "%"
                }
                this.$element.one("finished.zf.animate", function() {
                    _this.$element.trigger("moved.zf.slider", [$hndl])
                });
                var moveTime = this.$element.data("dragging") ? 1e3 / 60 : this.options.moveTime;
                Foundation.Move(moveTime, $hndl, function() {
                    $hndl.css(lOrT, movement + "%");
                    if (!_this.options.doubleSided) {
                        _this.$fill.css(hOrW, pctOfBar * 100 + "%")
                    } else {
                        _this.$fill.css(css)
                    }
                });
                clearTimeout(_this.timeout);
                _this.timeout = setTimeout(function() {
                    _this.$element.trigger("changed.zf.slider", [$hndl])
                }, _this.options.changedDelay)
            }
        }, {
            key: "_setInitAttr",
            value: function _setInitAttr(idx) {
                var id = this.inputs.eq(idx).attr("id") || Foundation.GetYoDigits(6, "slider");
                this.inputs.eq(idx).attr({
                    id: id,
                    max: this.options.end,
                    min: this.options.start,
                    step: this.options.step
                });
                this.handles.eq(idx).attr({
                    role: "slider",
                    "aria-controls": id,
                    "aria-valuemax": this.options.end,
                    "aria-valuemin": this.options.start,
                    "aria-valuenow": idx === 0 ? this.options.initialStart : this.options.initialEnd,
                    "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
                    tabindex: 0
                })
            }
        }, {
            key: "_setValues",
            value: function _setValues($handle, val) {
                var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
                this.inputs.eq(idx).val(val);
                $handle.attr("aria-valuenow", val)
            }
        }, {
            key: "_handleEvent",
            value: function _handleEvent(e, $handle, val) {
                var value, hasVal;
                if (!val) {
                    e.preventDefault();
                    var _this = this,
                        vertical = this.options.vertical,
                        param = vertical ? "height" : "width",
                        direction = vertical ? "top" : "left",
                        eventOffset = vertical ? e.pageY : e.pageX,
                        halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
                        barDim = this.$element[0].getBoundingClientRect()[param],
                        windowScroll = vertical ? $(window).scrollTop() : $(window).scrollLeft();
                    var elemOffset = this.$element.offset()[direction];
                    if (e.clientY === e.pageY) {
                        eventOffset = eventOffset + windowScroll
                    }
                    var eventFromBar = eventOffset - elemOffset;
                    var barXY;
                    if (eventFromBar < 0) {
                        barXY = 0
                    } else if (eventFromBar > barDim) {
                        barXY = barDim
                    } else {
                        barXY = eventFromBar
                    }
                    var offsetPct = percent(barXY, barDim);
                    value = (this.options.end - this.options.start) * offsetPct + this.options.start;
                    if (Foundation.rtl() && !this.options.vertical) {
                        value = this.options.end - value
                    }
                    value = _this._adjustValue(null, value);
                    hasVal = false;
                    if (!$handle) {
                        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
                            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
                        $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2
                    }
                } else {
                    value = this._adjustValue(null, val);
                    hasVal = true
                }
                this._setHandlePos($handle, value, hasVal)
            }
        }, {
            key: "_adjustValue",
            value: function _adjustValue($handle, value) {
                var val, step = this.options.step,
                    div = parseFloat(step / 2),
                    left, prev_val, next_val;
                if (!!$handle) {
                    val = parseFloat($handle.attr("aria-valuenow"))
                } else {
                    val = value
                }
                left = val % step;
                prev_val = val - left;
                next_val = prev_val + step;
                if (left === 0) {
                    return val
                }
                val = val >= prev_val + div ? next_val : prev_val;
                return val
            }
        }, {
            key: "_events",
            value: function _events($handle) {
                var _this = this,
                    curHandle, timer;
                this.inputs.off("change.zf.slider").on("change.zf.slider", function(e) {
                    var idx = _this.inputs.index($(this));
                    _this._handleEvent(e, _this.handles.eq(idx), $(this).val())
                });
                if (this.options.clickSelect) {
                    this.$element.off("click.zf.slider").on("click.zf.slider", function(e) {
                        if (_this.$element.data("dragging")) {
                            return false
                        }
                        if (!$(e.target).is("[data-slider-handle]")) {
                            if (_this.options.doubleSided) {
                                _this._handleEvent(e)
                            } else {
                                _this._handleEvent(e, _this.$handle)
                            }
                        }
                    })
                }
                if (this.options.draggable) {
                    this.handles.addTouch();
                    var $body = $("body");
                    $handle.off("mousedown.zf.slider").on("mousedown.zf.slider", function(e) {
                        $handle.addClass("is-dragging");
                        _this.$fill.addClass("is-dragging");
                        _this.$element.data("dragging", true);
                        curHandle = $(e.currentTarget);
                        $body.on("mousemove.zf.slider", function(e) {
                            e.preventDefault();
                            _this._handleEvent(e, curHandle)
                        }).on("mouseup.zf.slider", function(e) {
                            _this._handleEvent(e, curHandle);
                            $handle.removeClass("is-dragging");
                            _this.$fill.removeClass("is-dragging");
                            _this.$element.data("dragging", false);
                            $body.off("mousemove.zf.slider mouseup.zf.slider")
                        })
                    }).on("selectstart.zf.slider touchmove.zf.slider", function(e) {
                        e.preventDefault()
                    })
                }
                $handle.off("keydown.zf.slider").on("keydown.zf.slider", function(e) {
                    var _$handle = $(this),
                        idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
                        oldValue = parseFloat(_this.inputs.eq(idx).val()),
                        newValue;
                    Foundation.Keyboard.handleKey(e, "Slider", {
                        decrease: function() {
                            newValue = oldValue - _this.options.step
                        },
                        increase: function() {
                            newValue = oldValue + _this.options.step
                        },
                        decrease_fast: function() {
                            newValue = oldValue - _this.options.step * 10
                        },
                        increase_fast: function() {
                            newValue = oldValue + _this.options.step * 10
                        },
                        handled: function() {
                            e.preventDefault();
                            _this._setHandlePos(_$handle, newValue, true)
                        }
                    })
                })
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.handles.off(".zf.slider");
                this.inputs.off(".zf.slider");
                this.$element.off(".zf.slider");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Slider
    }();
    Slider.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: false,
        clickSelect: true,
        vertical: false,
        draggable: true,
        disabled: false,
        doubleSided: false,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled",
        invertVertical: false,
        changedDelay: 500
    };

    function percent(frac, num) {
        return frac / num
    }

    function absPosition($handle, dir, clickPos, param) {
        return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos)
    }
    Foundation.plugin(Slider, "Slider")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Sticky = function() {
        function Sticky(element, options) {
            _classCallCheck(this, Sticky);
            this.$element = element;
            this.options = $.extend({}, Sticky.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Sticky")
        }
        _createClass(Sticky, [{
            key: "_init",
            value: function _init() {
                var $parent = this.$element.parent("[data-sticky-container]"),
                    id = this.$element[0].id || Foundation.GetYoDigits(6, "sticky"),
                    _this = this;
                if (!$parent.length) {
                    this.wasWrapped = true
                }
                this.$container = $parent.length ? $parent : $(this.options.container).wrapInner(this.$element);
                this.$container.addClass(this.options.containerClass);
                this.$element.addClass(this.options.stickyClass).attr({
                    "data-resize": id
                });
                this.scrollCount = this.options.checkEvery;
                this.isStuck = false;
                $(window).one("load.zf.sticky", function() {
                    _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;
                    _this.$container.css("height", _this.containerHeight);
                    _this.elemHeight = _this.containerHeight;
                    if (_this.options.anchor !== "") {
                        _this.$anchor = $("#" + _this.options.anchor)
                    } else {
                        _this._parsePoints()
                    }
                    _this._setSizes(function() {
                        _this._calc(false)
                    });
                    _this._events(id.split("-").reverse().join("-"))
                })
            }
        }, {
            key: "_parsePoints",
            value: function _parsePoints() {
                var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
                    btm = this.options.btmAnchor == "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
                    pts = [top, btm],
                    breaks = {};
                for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
                    var pt;
                    if (typeof pts[i] === "number") {
                        pt = pts[i]
                    } else {
                        var place = pts[i].split(":"),
                            anchor = $("#" + place[0]);
                        pt = anchor.offset().top;
                        if (place[1] && place[1].toLowerCase() === "bottom") {
                            pt += anchor[0].getBoundingClientRect().height
                        }
                    }
                    breaks[i] = pt
                }
                this.points = breaks;
                return
            }
        }, {
            key: "_events",
            value: function _events(id) {
                var _this = this,
                    scrollListener = this.scrollListener = "scroll.zf." + id;
                if (this.isOn) {
                    return
                }
                if (this.canStick) {
                    this.isOn = true;
                    $(window).off(scrollListener).on(scrollListener, function(e) {
                        if (_this.scrollCount === 0) {
                            _this.scrollCount = _this.options.checkEvery;
                            _this._setSizes(function() {
                                _this._calc(false, window.pageYOffset)
                            })
                        } else {
                            _this.scrollCount--;
                            _this._calc(false, window.pageYOffset)
                        }
                    })
                }
                this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function(e, el) {
                    _this._setSizes(function() {
                        _this._calc(false);
                        if (_this.canStick) {
                            if (!_this.isOn) {
                                _this._events(id)
                            }
                        } else if (_this.isOn) {
                            _this._pauseListeners(scrollListener)
                        }
                    })
                })
            }
        }, {
            key: "_pauseListeners",
            value: function _pauseListeners(scrollListener) {
                this.isOn = false;
                $(window).off(scrollListener);
                this.$element.trigger("pause.zf.sticky")
            }
        }, {
            key: "_calc",
            value: function _calc(checkSizes, scroll) {
                if (checkSizes) {
                    this._setSizes()
                }
                if (!this.canStick) {
                    if (this.isStuck) {
                        this._removeSticky(true)
                    }
                    return false
                }
                if (!scroll) {
                    scroll = window.pageYOffset
                }
                if (scroll >= this.topPoint) {
                    if (scroll <= this.bottomPoint) {
                        if (!this.isStuck) {
                            this._setSticky()
                        }
                    } else {
                        if (this.isStuck) {
                            this._removeSticky(false)
                        }
                    }
                } else {
                    if (this.isStuck) {
                        this._removeSticky(true)
                    }
                }
            }
        }, {
            key: "_setSticky",
            value: function _setSticky() {
                var _this = this,
                    stickTo = this.options.stickTo,
                    mrgn = stickTo === "top" ? "marginTop" : "marginBottom",
                    notStuckTo = stickTo === "top" ? "bottom" : "top",
                    css = {};
                css[mrgn] = this.options[mrgn] + "em";
                css[stickTo] = 0;
                css[notStuckTo] = "auto";
                css["left"] = this.$container.offset().left + parseInt(window.getComputedStyle(this.$container[0])["padding-left"], 10);
                this.isStuck = true;
                this.$element.removeClass("is-anchored is-at-" + notStuckTo).addClass("is-stuck is-at-" + stickTo).css(css).trigger("sticky.zf.stuckto:" + stickTo);
                this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                    _this._setSizes()
                })
            }
        }, {
            key: "_removeSticky",
            value: function _removeSticky(isTop) {
                var stickTo = this.options.stickTo,
                    stickToTop = stickTo === "top",
                    css = {},
                    anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                    mrgn = stickToTop ? "marginTop" : "marginBottom",
                    notStuckTo = stickToTop ? "bottom" : "top",
                    topOrBottom = isTop ? "top" : "bottom";
                css[mrgn] = 0;
                css["bottom"] = "auto";
                if (isTop) {
                    css["top"] = 0
                } else {
                    css["top"] = anchorPt
                }
                css["left"] = "";
                this.isStuck = false;
                this.$element.removeClass("is-stuck is-at-" + stickTo).addClass("is-anchored is-at-" + topOrBottom).css(css).trigger("sticky.zf.unstuckfrom:" + topOrBottom)
            }
        }, {
            key: "_setSizes",
            value: function _setSizes(cb) {
                this.canStick = Foundation.MediaQuery.atLeast(this.options.stickyOn);
                if (!this.canStick) {
                    if (cb && typeof cb === "function") {
                        cb()
                    }
                }
                var _this = this,
                    newElemWidth = this.$container[0].getBoundingClientRect().width,
                    comp = window.getComputedStyle(this.$container[0]),
                    pdng = parseInt(comp["padding-right"], 10);
                if (this.$anchor && this.$anchor.length) {
                    this.anchorHeight = this.$anchor[0].getBoundingClientRect().height
                } else {
                    this._parsePoints()
                }
                this.$element.css({
                    "max-width": newElemWidth - pdng + "px"
                });
                var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
                if (this.$element.css("display") == "none") {
                    newContainerHeight = 0
                }
                this.containerHeight = newContainerHeight;
                this.$container.css({
                    height: newContainerHeight
                });
                this.elemHeight = newContainerHeight;
                if (this.isStuck) {
                    this.$element.css({
                        left: this.$container.offset().left + parseInt(comp["padding-left"], 10)
                    })
                } else {
                    if (this.$element.hasClass("is-at-bottom")) {
                        var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                        this.$element.css("top", anchorPt)
                    }
                }
                this._setBreakPoints(newContainerHeight, function() {
                    if (cb && typeof cb === "function") {
                        cb()
                    }
                })
            }
        }, {
            key: "_setBreakPoints",
            value: function _setBreakPoints(elemHeight, cb) {
                if (!this.canStick) {
                    if (cb && typeof cb === "function") {
                        cb()
                    } else {
                        return false
                    }
                }
                var mTop = emCalc(this.options.marginTop),
                    mBtm = emCalc(this.options.marginBottom),
                    topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
                    bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,
                    winHeight = window.innerHeight;
                if (this.options.stickTo === "top") {
                    topPoint -= mTop;
                    bottomPoint -= elemHeight + mTop
                } else if (this.options.stickTo === "bottom") {
                    topPoint -= winHeight - (elemHeight + mBtm);
                    bottomPoint -= winHeight - mBtm
                } else {}
                this.topPoint = topPoint;
                this.bottomPoint = bottomPoint;
                if (cb && typeof cb === "function") {
                    cb()
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this._removeSticky(true);
                this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
                    height: "",
                    top: "",
                    bottom: "",
                    "max-width": ""
                }).off("resizeme.zf.trigger");
                if (this.$anchor && this.$anchor.length) {
                    this.$anchor.off("change.zf.sticky")
                }
                $(window).off(this.scrollListener);
                if (this.wasWrapped) {
                    this.$element.unwrap()
                } else {
                    this.$container.removeClass(this.options.containerClass).css({
                        height: ""
                    })
                }
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Sticky
    }();
    Sticky.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    };

    function emCalc(em) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em
    }
    Foundation.plugin(Sticky, "Sticky")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Tabs = function() {
        function Tabs(element, options) {
            _classCallCheck(this, Tabs);
            this.$element = element;
            this.options = $.extend({}, Tabs.defaults, this.$element.data(), options);
            this._init();
            Foundation.registerPlugin(this, "Tabs");
            Foundation.Keyboard.register("Tabs", {
                ENTER: "open",
                SPACE: "open",
                ARROW_RIGHT: "next",
                ARROW_UP: "previous",
                ARROW_DOWN: "next",
                ARROW_LEFT: "previous"
            })
        }
        _createClass(Tabs, [{
            key: "_init",
            value: function _init() {
                var _this = this;
                this.$tabTitles = this.$element.find("." + this.options.linkClass);
                this.$tabContent = $('[data-tabs-content="' + this.$element[0].id + '"]');
                this.$tabTitles.each(function() {
                    var $elem = $(this),
                        $link = $elem.find("a"),
                        isActive = $elem.hasClass("is-active"),
                        hash = $link[0].hash.slice(1),
                        linkId = $link[0].id ? $link[0].id : hash + "-label",
                        $tabContent = $("#" + hash);
                    $elem.attr({
                        role: "presentation"
                    });
                    $link.attr({
                        role: "tab",
                        "aria-controls": hash,
                        "aria-selected": isActive,
                        id: linkId
                    });
                    $tabContent.attr({
                        role: "tabpanel",
                        "aria-hidden": !isActive,
                        "aria-labelledby": linkId
                    });
                    if (isActive && _this.options.autoFocus) {
                        $link.focus()
                    }
                });
                if (this.options.matchHeight) {
                    var $images = this.$tabContent.find("img");
                    if ($images.length) {
                        Foundation.onImagesLoaded($images, this._setHeight.bind(this))
                    } else {
                        this._setHeight()
                    }
                }
                this._events()
            }
        }, {
            key: "_events",
            value: function _events() {
                this._addKeyHandler();
                this._addClickHandler();
                this._setHeightMqHandler = null;
                if (this.options.matchHeight) {
                    this._setHeightMqHandler = this._setHeight.bind(this);
                    $(window).on("changed.zf.mediaquery", this._setHeightMqHandler)
                }
            }
        }, {
            key: "_addClickHandler",
            value: function _addClickHandler() {
                var _this = this;
                this.$element.off("click.zf.tabs").on("click.zf.tabs", "." + this.options.linkClass, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ($(this).hasClass("is-active")) {
                        return
                    }
                    _this._handleTabChange($(this))
                })
            }
        }, {
            key: "_addKeyHandler",
            value: function _addKeyHandler() {
                var _this = this;
                var $firstTab = _this.$element.find("li:first-of-type");
                var $lastTab = _this.$element.find("li:last-of-type");
                this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function(e) {
                    if (e.which === 9) return;
                    var $element = $(this),
                        $elements = $element.parent("ul").children("li"),
                        $prevElement, $nextElement;
                    $elements.each(function(i) {
                        if ($(this).is($element)) {
                            if (_this.options.wrapOnKeys) {
                                $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
                                $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1)
                            } else {
                                $prevElement = $elements.eq(Math.max(0, i - 1));
                                $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1))
                            }
                            return
                        }
                    });
                    Foundation.Keyboard.handleKey(e, "Tabs", {
                        open: function() {
                            $element.find('[role="tab"]').focus();
                            _this._handleTabChange($element)
                        },
                        previous: function() {
                            $prevElement.find('[role="tab"]').focus();
                            _this._handleTabChange($prevElement)
                        },
                        next: function() {
                            $nextElement.find('[role="tab"]').focus();
                            _this._handleTabChange($nextElement)
                        },
                        handled: function() {
                            e.stopPropagation();
                            e.preventDefault()
                        }
                    })
                })
            }
        }, {
            key: "_handleTabChange",
            value: function _handleTabChange($target) {
                var $tabLink = $target.find('[role="tab"]'),
                    hash = $tabLink[0].hash,
                    $targetContent = this.$tabContent.find(hash),
                    $oldTab = this.$element.find("." + this.options.linkClass + ".is-active").removeClass("is-active").find('[role="tab"]').attr({
                        "aria-selected": "false"
                    });
                $("#" + $oldTab.attr("aria-controls")).removeClass("is-active").attr({
                    "aria-hidden": "true"
                });
                $target.addClass("is-active");
                $tabLink.attr({
                    "aria-selected": "true"
                });
                $targetContent.addClass("is-active").attr({
                    "aria-hidden": "false"
                });
                this.$element.trigger("change.zf.tabs", [$target])
            }
        }, {
            key: "selectTab",
            value: function selectTab(elem) {
                var idStr;
                if (typeof elem === "object") {
                    idStr = elem[0].id
                } else {
                    idStr = elem
                }
                if (idStr.indexOf("#") < 0) {
                    idStr = "#" + idStr
                }
                var $target = this.$tabTitles.find('[href="' + idStr + '"]').parent("." + this.options.linkClass);
                this._handleTabChange($target)
            }
        }, {
            key: "_setHeight",
            value: function _setHeight() {
                var max = 0;
                this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function() {
                    var panel = $(this),
                        isActive = panel.hasClass("is-active");
                    if (!isActive) {
                        panel.css({
                            visibility: "hidden",
                            display: "block"
                        })
                    }
                    var temp = this.getBoundingClientRect().height;
                    if (!isActive) {
                        panel.css({
                            visibility: "",
                            display: ""
                        })
                    }
                    max = temp > max ? temp : max
                }).css("height", max + "px")
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide();
                if (this.options.matchHeight) {
                    if (this._setHeightMqHandler != null) {
                        $(window).off("changed.zf.mediaquery", this._setHeightMqHandler)
                    }
                }
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Tabs
    }();
    Tabs.defaults = {
        autoFocus: false,
        wrapOnKeys: true,
        matchHeight: false,
        linkClass: "tabs-title",
        panelClass: "tabs-panel"
    };

    function checkClass($elem) {
        return $elem.hasClass("is-active")
    }
    Foundation.plugin(Tabs, "Tabs")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Toggler = function() {
        function Toggler(element, options) {
            _classCallCheck(this, Toggler);
            this.$element = element;
            this.options = $.extend({}, Toggler.defaults, element.data(), options);
            this.className = "";
            this._init();
            this._events();
            Foundation.registerPlugin(this, "Toggler")
        }
        _createClass(Toggler, [{
            key: "_init",
            value: function _init() {
                var input;
                if (this.options.animate) {
                    input = this.options.animate.split(" ");
                    this.animationIn = input[0];
                    this.animationOut = input[1] || null
                } else {
                    input = this.$element.data("toggler");
                    this.className = input[0] === "." ? input.slice(1) : input
                }
                var id = this.$element[0].id;
                $('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-controls", id);
                this.$element.attr("aria-expanded", this.$element.is(":hidden") ? false : true)
            }
        }, {
            key: "_events",
            value: function _events() {
                this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this))
            }
        }, {
            key: "toggle",
            value: function toggle() {
                this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]()
            }
        }, {
            key: "_toggleClass",
            value: function _toggleClass() {
                this.$element.toggleClass(this.className);
                var isOn = this.$element.hasClass(this.className);
                if (isOn) {
                    this.$element.trigger("on.zf.toggler")
                } else {
                    this.$element.trigger("off.zf.toggler")
                }
                this._updateARIA(isOn)
            }
        }, {
            key: "_toggleAnimate",
            value: function _toggleAnimate() {
                var _this = this;
                if (this.$element.is(":hidden")) {
                    Foundation.Motion.animateIn(this.$element, this.animationIn, function() {
                        _this._updateARIA(true);
                        this.trigger("on.zf.toggler")
                    })
                } else {
                    Foundation.Motion.animateOut(this.$element, this.animationOut, function() {
                        _this._updateARIA(false);
                        this.trigger("off.zf.toggler")
                    })
                }
            }
        }, {
            key: "_updateARIA",
            value: function _updateARIA(isOn) {
                this.$element.attr("aria-expanded", isOn ? true : false)
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.off(".zf.toggler");
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Toggler
    }();
    Toggler.defaults = {
        animate: false
    };
    Foundation.plugin(Toggler, "Toggler")
}(jQuery);
"use strict";
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor
    }
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}! function($) {
    var Tooltip = function() {
        function Tooltip(element, options) {
            _classCallCheck(this, Tooltip);
            this.$element = element;
            this.options = $.extend({}, Tooltip.defaults, this.$element.data(), options);
            this.isActive = false;
            this.isClick = false;
            this._init();
            Foundation.registerPlugin(this, "Tooltip")
        }
        _createClass(Tooltip, [{
            key: "_init",
            value: function _init() {
                var elemId = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
                this.options.positionClass = this.options.positionClass || this._getPositionClass(this.$element);
                this.options.tipText = this.options.tipText || this.$element.attr("title");
                this.template = this.options.template ? $(this.options.template) : this._buildTemplate(elemId);
                this.template.appendTo(document.body).text(this.options.tipText).hide();
                this.$element.attr({
                    title: "",
                    "aria-describedby": elemId,
                    "data-yeti-box": elemId,
                    "data-toggle": elemId,
                    "data-resize": elemId
                }).addClass(this.options.triggerClass);
                this.usedPositions = [];
                this.counter = 4;
                this.classChanged = false;
                this._events()
            }
        }, {
            key: "_getPositionClass",
            value: function _getPositionClass(element) {
                if (!element) {
                    return ""
                }
                var position = element[0].className.match(/\b(top|left|right)\b/g);
                position = position ? position[0] : "";
                return position
            }
        }, {
            key: "_buildTemplate",
            value: function _buildTemplate(id) {
                var templateClasses = (this.options.tooltipClass + " " + this.options.positionClass + " " + this.options.templateClasses).trim();
                var $template = $("<div></div>").addClass(templateClasses).attr({
                    role: "tooltip",
                    "aria-hidden": true,
                    "data-is-active": false,
                    "data-is-focus": false,
                    id: id
                });
                return $template
            }
        }, {
            key: "_reposition",
            value: function _reposition(position) {
                this.usedPositions.push(position ? position : "bottom");
                if (!position && this.usedPositions.indexOf("top") < 0) {
                    this.template.addClass("top")
                } else if (position === "top" && this.usedPositions.indexOf("bottom") < 0) {
                    this.template.removeClass(position)
                } else if (position === "left" && this.usedPositions.indexOf("right") < 0) {
                    this.template.removeClass(position).addClass("right")
                } else if (position === "right" && this.usedPositions.indexOf("left") < 0) {
                    this.template.removeClass(position).addClass("left")
                } else if (!position && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0) {
                    this.template.addClass("left")
                } else if (position === "top" && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0) {
                    this.template.removeClass(position).addClass("left")
                } else if (position === "left" && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0) {
                    this.template.removeClass(position)
                } else if (position === "right" && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0) {
                    this.template.removeClass(position)
                } else {
                    this.template.removeClass(position)
                }
                this.classChanged = true;
                this.counter--
            }
        }, {
            key: "_setPosition",
            value: function _setPosition() {
                var position = this._getPositionClass(this.template),
                    $tipDims = Foundation.Box.GetDimensions(this.template),
                    $anchorDims = Foundation.Box.GetDimensions(this.$element),
                    direction = position === "left" ? "left" : position === "right" ? "left" : "top",
                    param = direction === "top" ? "height" : "width",
                    offset = param === "height" ? this.options.vOffset : this.options.hOffset,
                    _this = this;
                if ($tipDims.width >= $tipDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) {
                    this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, true)).css({
                        width: $anchorDims.windowDims.width - this.options.hOffset * 2,
                        height: "auto"
                    });
                    return false
                }
                this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (position || "bottom"), this.options.vOffset, this.options.hOffset));
                while (!Foundation.Box.ImNotTouchingYou(this.template) && this.counter) {
                    this._reposition(position);
                    this._setPosition()
                }
            }
        }, {
            key: "show",
            value: function show() {
                if (this.options.showOn !== "all" && !Foundation.MediaQuery.atLeast(this.options.showOn)) {
                    return false
                }
                var _this = this;
                this.template.css("visibility", "hidden").show();
                this._setPosition();
                this.$element.trigger("closeme.zf.tooltip", this.template.attr("id"));
                this.template.attr({
                    "data-is-active": true,
                    "aria-hidden": false
                });
                _this.isActive = true;
                this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {});
                this.$element.trigger("show.zf.tooltip")
            }
        }, {
            key: "hide",
            value: function hide() {
                var _this = this;
                this.template.stop().attr({
                    "aria-hidden": true,
                    "data-is-active": false
                }).fadeOut(this.options.fadeOutDuration, function() {
                    _this.isActive = false;
                    _this.isClick = false;
                    if (_this.classChanged) {
                        _this.template.removeClass(_this._getPositionClass(_this.template)).addClass(_this.options.positionClass);
                        _this.usedPositions = [];
                        _this.counter = 4;
                        _this.classChanged = false
                    }
                });
                this.$element.trigger("hide.zf.tooltip")
            }
        }, {
            key: "_events",
            value: function _events() {
                var _this = this;
                var $template = this.template;
                var isFocus = false;
                if (!this.options.disableHover) {
                    this.$element.on("mouseenter.zf.tooltip", function(e) {
                        if (!_this.isActive) {
                            _this.timeout = setTimeout(function() {
                                _this.show()
                            }, _this.options.hoverDelay)
                        }
                    }).on("mouseleave.zf.tooltip", function(e) {
                        clearTimeout(_this.timeout);
                        if (!isFocus || _this.isClick && !_this.options.clickOpen) {
                            _this.hide()
                        }
                    })
                }
                if (this.options.clickOpen) {
                    this.$element.on("mousedown.zf.tooltip", function(e) {
                        e.stopImmediatePropagation();
                        if (_this.isClick) {} else {
                            _this.isClick = true;
                            if ((_this.options.disableHover || !_this.$element.attr("tabindex")) && !_this.isActive) {
                                _this.show()
                            }
                        }
                    })
                } else {
                    this.$element.on("mousedown.zf.tooltip", function(e) {
                        e.stopImmediatePropagation();
                        _this.isClick = true
                    })
                }
                if (!this.options.disableForTouch) {
                    this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function(e) {
                        _this.isActive ? _this.hide() : _this.show()
                    })
                }
                this.$element.on({
                    "close.zf.trigger": this.hide.bind(this)
                });
                this.$element.on("focus.zf.tooltip", function(e) {
                    isFocus = true;
                    if (_this.isClick) {
                        if (!_this.options.clickOpen) {
                            isFocus = false
                        }
                        return false
                    } else {
                        _this.show()
                    }
                }).on("focusout.zf.tooltip", function(e) {
                    isFocus = false;
                    _this.isClick = false;
                    _this.hide()
                }).on("resizeme.zf.trigger", function() {
                    if (_this.isActive) {
                        _this._setPosition()
                    }
                })
            }
        }, {
            key: "toggle",
            value: function toggle() {
                if (this.isActive) {
                    this.hide()
                } else {
                    this.show()
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize");
                this.template.remove();
                Foundation.unregisterPlugin(this)
            }
        }]);
        return Tooltip
    }();
    Tooltip.defaults = {
        disableForTouch: false,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: false,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: true,
        positionClass: "",
        vOffset: 10,
        hOffset: 12
    };
    Foundation.plugin(Tooltip, "Tooltip")
}(jQuery);
(function() {
    var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX, bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments)
            }
        },
        indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i
            }
            return -1
        };
    Util = function() {
        function Util() {}
        Util.prototype.extend = function(custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value
                }
            }
            return custom
        };
        Util.prototype.isMobile = function(agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
        };
        Util.prototype.createEvent = function(event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false
            }
            if (cancel == null) {
                cancel = false
            }
            if (detail == null) {
                detail = null
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent("CustomEvent");
                customEvent.initCustomEvent(event, bubble, cancel, detail)
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event
            } else {
                customEvent.eventName = event
            }
            return customEvent
        };
        Util.prototype.emitEvent = function(elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event)
            } else if (event in (elem != null)) {
                return elem[event]()
            } else if ("on" + event in (elem != null)) {
                return elem["on" + event]()
            }
        };
        Util.prototype.addEvent = function(elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false)
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn)
            } else {
                return elem[event] = fn
            }
        };
        Util.prototype.removeEvent = function(elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false)
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn)
            } else {
                return delete elem[event]
            }
        };
        Util.prototype.innerHeight = function() {
            if ("innerHeight" in window) {
                return window.innerHeight
            } else {
                return document.documentElement.clientHeight
            }
        };
        return Util
    }();
    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = function() {
        function WeakMap() {
            this.keys = [];
            this.values = []
        }
        WeakMap.prototype.get = function(key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i]
                }
            }
        };
        WeakMap.prototype.set = function(key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return
                }
            }
            this.keys.push(key);
            return this.values.push(value)
        };
        return WeakMap
    }());
    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = function() {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn("MutationObserver is not supported by your browser.")
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
        }
        MutationObserver.notSupported = true;
        MutationObserver.prototype.observe = function() {};
        return MutationObserver
    }());
    getComputedStyle = this.getComputedStyle || function(el, pseudo) {
        this.getPropertyValue = function(prop) {
            var ref;
            if (prop === "float") {
                prop = "styleFloat"
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function(_, _char) {
                    return _char.toUpperCase()
                })
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null
        };
        return this
    };
    getComputedStyleRX = /(\-([a-z]){1})/g;
    this.WOW = function() {
        WOW.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: true,
            live: true,
            callback: null,
            scrollContainer: null
        };

        function WOW(options) {
            if (options == null) {
                options = {}
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            if (options.scrollContainer != null) {
                this.config.scrollContainer = document.querySelector(options.scrollContainer)
            }
            this.animationNameCache = new WeakMap;
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        WOW.prototype.init = function() {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start()
            } else {
                this.util().addEvent(document, "DOMContentLoaded", this.start)
            }
            return this.finished = []
        };
        WOW.prototype.start = function() {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = function() {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box)
                }
                return results
            }.call(this);
            this.all = function() {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box)
                }
                return results
            }.call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle()
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true)
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                this.util().addEvent(window, "resize", this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50)
            }
            if (this.config.live) {
                return new MutationObserver(function(_this) {
                    return function(records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push(function() {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node))
                                }
                                return results1
                            }.call(_this))
                        }
                        return results
                    }
                }(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                })
            }
        };
        WOW.prototype.stop = function() {
            this.stopped = true;
            this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
            this.util().removeEvent(window, "resize", this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval)
            }
        };
        WOW.prototype.sync = function(element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element)
            }
        };
        WOW.prototype.doSync = function(element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element
            }
            if (element.nodeType !== 1) {
                return
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle()
                    } else {
                        this.applyStyle(box, true)
                    }
                    results.push(this.scrolled = true)
                } else {
                    results.push(void 0)
                }
            }
            return results
        };
        WOW.prototype.show = function(box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box)
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, "animationend", this.resetAnimation);
            this.util().addEvent(box, "oanimationend", this.resetAnimation);
            this.util().addEvent(box, "webkitAnimationEnd", this.resetAnimation);
            this.util().addEvent(box, "MSAnimationEnd", this.resetAnimation);
            return box
        };
        WOW.prototype.applyStyle = function(box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute("data-wow-duration");
            delay = box.getAttribute("data-wow-delay");
            iteration = box.getAttribute("data-wow-iteration");
            return this.animate(function(_this) {
                return function() {
                    return _this.customStyle(box, hidden, duration, delay, iteration)
                }
            }(this))
        };
        WOW.prototype.animate = function() {
            if ("requestAnimationFrame" in window) {
                return function(callback) {
                    return window.requestAnimationFrame(callback)
                }
            } else {
                return function(callback) {
                    return callback()
                }
            }
        }();
        WOW.prototype.resetStyle = function() {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = "visible")
            }
            return results
        };
        WOW.prototype.resetAnimation = function(event) {
            var target;
            if (event.type.toLowerCase().indexOf("animationend") >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, "").trim()
            }
        };
        WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box)
            }
            box.style.visibility = hidden ? "hidden" : "visible";
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                })
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                })
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                })
            }
            this.vendorSet(box.style, {
                animationName: hidden ? "none" : this.cachedAnimationName(box)
            });
            return box
        };
        WOW.prototype.vendors = ["moz", "webkit"];
        WOW.prototype.vendorSet = function(elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push(function() {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value)
                    }
                    return results1
                }.call(this))
            }
            return results
        };
        WOW.prototype.vendorCSS = function(elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property)
            }
            return result
        };
        WOW.prototype.animationName = function(box) {
            var animationName, error;
            try {
                animationName = this.vendorCSS(box, "animation-name").cssText
            } catch (error) {
                animationName = getComputedStyle(box).getPropertyValue("animation-name")
            }
            if (animationName === "none") {
                return ""
            } else {
                return animationName
            }
        };
        WOW.prototype.cacheAnimationName = function(box) {
            return this.animationNameCache.set(box, this.animationName(box))
        };
        WOW.prototype.cachedAnimationName = function(box) {
            return this.animationNameCache.get(box)
        };
        WOW.prototype.scrollHandler = function() {
            return this.scrolled = true
        };
        WOW.prototype.scrollCallback = function() {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = function() {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!box) {
                            continue
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue
                        }
                        results.push(box)
                    }
                    return results
                }.call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop()
                }
            }
        };
        WOW.prototype.offsetTop = function(element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop
            }
            return top
        };
        WOW.prototype.isVisible = function(box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute("data-wow-offset") || this.config.offset;
            viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop
        };
        WOW.prototype.util = function() {
            return this._util != null ? this._util : this._util = new Util
        };
        WOW.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        };
        return WOW
    }()
}).call(this);
(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([], factory)
    } else if (typeof exports === "object") {
        module.exports = factory()
    } else {
        root.Headroom = factory()
    }
})(this, function() {
    "use strict";
    var features = {
        bind: !! function() {}.bind,
        classList: "classList" in document.documentElement,
        rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
    };
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    function Debouncer(callback) {
        this.callback = callback;
        this.ticking = false
    }
    Debouncer.prototype = {
        constructor: Debouncer,
        update: function() {
            this.callback && this.callback();
            this.ticking = false
        },
        requestTick: function() {
            if (!this.ticking) {
                requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
                this.ticking = true
            }
        },
        handleEvent: function() {
            this.requestTick()
        }
    };

    function isDOMElement(obj) {
        return obj && typeof window !== "undefined" && (obj === window || obj.nodeType)
    }

    function extend(object) {
        if (arguments.length <= 0) {
            throw new Error("Missing arguments in extend function")
        }
        var result = object || {},
            key, i;
        for (i = 1; i < arguments.length; i++) {
            var replacement = arguments[i] || {};
            for (key in replacement) {
                if (typeof result[key] === "object" && !isDOMElement(result[key])) {
                    result[key] = extend(result[key], replacement[key])
                } else {
                    result[key] = result[key] || replacement[key]
                }
            }
        }
        return result
    }

    function normalizeTolerance(t) {
        return t === Object(t) ? t : {
            down: t,
            up: t
        }
    }

    function Headroom(elem, options) {
        options = extend(options, Headroom.options);
        this.lastKnownScrollY = 0;
        this.elem = elem;
        this.tolerance = normalizeTolerance(options.tolerance);
        this.classes = options.classes;
        this.offset = options.offset;
        this.scroller = options.scroller;
        this.initialised = false;
        this.onPin = options.onPin;
        this.onUnpin = options.onUnpin;
        this.onTop = options.onTop;
        this.onNotTop = options.onNotTop;
        this.onBottom = options.onBottom;
        this.onNotBottom = options.onNotBottom
    }
    Headroom.prototype = {
        constructor: Headroom,
        init: function() {
            if (!Headroom.cutsTheMustard) {
                return
            }
            this.debouncer = new Debouncer(this.update.bind(this));
            this.elem.classList.add(this.classes.initial);
            setTimeout(this.attachEvent.bind(this), 100);
            return this
        },
        destroy: function() {
            var classes = this.classes;
            this.initialised = false;
            this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.notTop, classes.initial);
            this.scroller.removeEventListener("scroll", this.debouncer, false)
        },
        attachEvent: function() {
            if (!this.initialised) {
                this.lastKnownScrollY = this.getScrollY();
                this.initialised = true;
                this.scroller.addEventListener("scroll", this.debouncer, false);
                this.debouncer.handleEvent()
            }
        },
        unpin: function() {
            var classList = this.elem.classList,
                classes = this.classes;
            if (classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
                classList.add(classes.unpinned);
                classList.remove(classes.pinned);
                this.onUnpin && this.onUnpin.call(this)
            }
        },
        pin: function() {
            var classList = this.elem.classList,
                classes = this.classes;
            if (classList.contains(classes.unpinned)) {
                classList.remove(classes.unpinned);
                classList.add(classes.pinned);
                this.onPin && this.onPin.call(this)
            }
        },
        top: function() {
            var classList = this.elem.classList,
                classes = this.classes;
            if (!classList.contains(classes.top)) {
                classList.add(classes.top);
                classList.remove(classes.notTop);
                this.onTop && this.onTop.call(this)
            }
        },
        notTop: function() {
            var classList = this.elem.classList,
                classes = this.classes;
            if (!classList.contains(classes.notTop)) {
                classList.add(classes.notTop);
                classList.remove(classes.top);
                this.onNotTop && this.onNotTop.call(this)
            }
        },
        bottom: function() {
            var classList = this.elem.classList,
                classes = this.classes;
            if (!classList.contains(classes.bottom)) {
                classList.add(classes.bottom);
                classList.remove(classes.notBottom);
                this.onBottom && this.onBottom.call(this)
            }
        },
        notBottom: function() {
            var classList = this.elem.classList,
                classes = this.classes;
            if (!classList.contains(classes.notBottom)) {
                classList.add(classes.notBottom);
                classList.remove(classes.bottom);
                this.onNotBottom && this.onNotBottom.call(this)
            }
        },
        getScrollY: function() {
            return this.scroller.pageYOffset !== undefined ? this.scroller.pageYOffset : this.scroller.scrollTop !== undefined ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
        },
        getViewportHeight: function() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        },
        getElementPhysicalHeight: function(elm) {
            return Math.max(elm.offsetHeight, elm.clientHeight)
        },
        getScrollerPhysicalHeight: function() {
            return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
        },
        getDocumentHeight: function() {
            var body = document.body,
                documentElement = document.documentElement;
            return Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight)
        },
        getElementHeight: function(elm) {
            return Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight)
        },
        getScrollerHeight: function() {
            return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        },
        isOutOfBounds: function(currentScrollY) {
            var pastTop = currentScrollY < 0,
                pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
            return pastTop || pastBottom
        },
        toleranceExceeded: function(currentScrollY, direction) {
            return Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance[direction]
        },
        shouldUnpin: function(currentScrollY, toleranceExceeded) {
            var scrollingDown = currentScrollY > this.lastKnownScrollY,
                pastOffset = currentScrollY >= this.offset;
            return scrollingDown && pastOffset && toleranceExceeded
        },
        shouldPin: function(currentScrollY, toleranceExceeded) {
            var scrollingUp = currentScrollY < this.lastKnownScrollY,
                pastOffset = currentScrollY <= this.offset;
            return scrollingUp && toleranceExceeded || pastOffset
        },
        update: function() {
            var currentScrollY = this.getScrollY(),
                scrollDirection = currentScrollY > this.lastKnownScrollY ? "down" : "up",
                toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
            if (this.isOutOfBounds(currentScrollY)) {
                return
            }
            if (currentScrollY <= this.offset) {
                this.top()
            } else {
                this.notTop()
            }
            if (currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
                this.bottom()
            } else {
                this.notBottom()
            }
            if (this.shouldUnpin(currentScrollY, toleranceExceeded)) {
                this.unpin()
            } else if (this.shouldPin(currentScrollY, toleranceExceeded)) {
                this.pin()
            }
            this.lastKnownScrollY = currentScrollY
        }
    };
    Headroom.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: window,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            bottom: "headroom--bottom",
            notBottom: "headroom--not-bottom",
            initial: "headroom"
        }
    };
    Headroom.cutsTheMustard = typeof features !== "undefined" && features.rAF && features.bind && features.classList;
    return Headroom
});
(function($) {
    if (!$) {
        return
    }
    $.fn.headroom = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("headroom"),
                options = typeof option === "object" && option;
            options = $.extend(true, {}, Headroom.options, options);
            if (!data) {
                data = new Headroom(this, options);
                data.init();
                $this.data("headroom", data)
            }
            if (typeof option === "string") {
                data[option]();
                if (option === "destroy") {
                    $this.removeData("headroom")
                }
            }
        })
    };
    $("[data-headroom]").each(function() {
        var $this = $(this);
        $this.headroom($this.data())
    })
})(window.Zepto || window.jQuery);
! function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else if (typeof exports === "object") {
        factory(require("jquery"))
    } else {
        factory(root.jQuery)
    }
}(this, function($) {
    "use strict";
    var PLUGIN_NAME = "vide";
    var DEFAULTS = {
        volume: 1,
        playbackRate: 1,
        muted: true,
        loop: true,
        autoplay: true,
        position: "50% 50%",
        posterType: "detect",
        resizing: true,
        bgColor: "transparent",
        className: ""
    };
    var NOT_IMPLEMENTED_MSG = "Not implemented";

    function parseOptions(str) {
        var obj = {};
        var delimiterIndex;
        var option;
        var prop;
        var val;
        var arr;
        var len;
        var i;
        arr = str.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(",");
        for (i = 0, len = arr.length; i < len; i++) {
            option = arr[i];
            if (option.search(/^(http|https|ftp):\/\//) !== -1 || option.search(":") === -1) {
                break
            }
            delimiterIndex = option.indexOf(":");
            prop = option.substring(0, delimiterIndex);
            val = option.substring(delimiterIndex + 1);
            if (!val) {
                val = undefined
            }
            if (typeof val === "string") {
                val = val === "true" || (val === "false" ? false : val)
            }
            if (typeof val === "string") {
                val = !isNaN(val) ? +val : val
            }
            obj[prop] = val
        }
        if (prop == null && val == null) {
            return str
        }
        return obj
    }

    function parsePosition(str) {
        str = "" + str;
        var args = str.split(/\s+/);
        var x = "50%";
        var y = "50%";
        var len;
        var arg;
        var i;
        for (i = 0, len = args.length; i < len; i++) {
            arg = args[i];
            if (arg === "left") {
                x = "0%"
            } else if (arg === "right") {
                x = "100%"
            } else if (arg === "top") {
                y = "0%"
            } else if (arg === "bottom") {
                y = "100%"
            } else if (arg === "center") {
                if (i === 0) {
                    x = "50%"
                } else {
                    y = "50%"
                }
            } else {
                if (i === 0) {
                    x = arg
                } else {
                    y = arg
                }
            }
        }
        return {
            x: x,
            y: y
        }
    }

    function findPoster(path, callback) {
        var onLoad = function() {
            callback(this.src)
        };
        $('<img src="' + path + '.gif">').on("load", onLoad);
        $('<img src="' + path + '.jpg">').on("load", onLoad);
        $('<img src="' + path + '.jpeg">').on("load", onLoad);
        $('<img src="' + path + '.png">').on("load", onLoad)
    }

    function Vide(element, path, options) {
        this.$element = $(element);
        if (typeof path === "string") {
            path = parseOptions(path)
        }
        if (!options) {
            options = {}
        } else if (typeof options === "string") {
            options = parseOptions(options)
        }
        if (typeof path === "string") {
            path = path.replace(/\.\w*$/, "")
        } else if (typeof path === "object") {
            for (var i in path) {
                if (path.hasOwnProperty(i)) {
                    path[i] = path[i].replace(/\.\w*$/, "")
                }
            }
        }
        this.settings = $.extend({}, DEFAULTS, options);
        this.path = path;
        try {
            this.init()
        } catch (e) {
            if (e.message !== NOT_IMPLEMENTED_MSG) {
                throw e
            }
        }
    }
    Vide.prototype.init = function() {
        var vide = this;
        var path = vide.path;
        var poster = path;
        var sources = "";
        var $element = vide.$element;
        var settings = vide.settings;
        var position = parsePosition(settings.position);
        var posterType = settings.posterType;
        var $video;
        var $wrapper;
        $wrapper = vide.$wrapper = $("<div>").addClass(settings.className).css({
            position: "absolute",
            "z-index": -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-color": settings.bgColor,
            "background-repeat": "no-repeat",
            "background-position": position.x + " " + position.y
        });
        if (typeof path === "object") {
            if (path.poster) {
                poster = path.poster
            } else {
                if (path.mp4) {
                    poster = path.mp4
                } else if (path.webm) {
                    poster = path.webm
                } else if (path.ogv) {
                    poster = path.ogv
                }
            }
        }
        if (posterType === "detect") {
            findPoster(poster, function(url) {
                $wrapper.css("background-image", "url(" + url + ")")
            })
        } else if (posterType !== "none") {
            $wrapper.css("background-image", "url(" + poster + "." + posterType + ")")
        }
        if ($element.css("position") === "static") {
            $element.css("position", "relative")
        }
        $element.prepend($wrapper);
        if (typeof path === "object") {
            if (path.mp4) {
                sources += '<source src="' + path.mp4 + '.mp4" type="video/mp4">'
            }
            if (path.webm) {
                sources += '<source src="' + path.webm + '.webm" type="video/webm">'
            }
            if (path.ogv) {
                sources += '<source src="' + path.ogv + '.ogv" type="video/ogg">'
            }
            $video = vide.$video = $("<video>" + sources + "</video>")
        } else {
            $video = vide.$video = $("<video>" + '<source src="' + path + '.mp4" type="video/mp4">' + '<source src="' + path + '.webm" type="video/webm">' + '<source src="' + path + '.ogv" type="video/ogg">' + "</video>")
        }
        try {
            $video.prop({
                autoplay: settings.autoplay,
                loop: settings.loop,
                volume: settings.volume,
                muted: settings.muted,
                defaultMuted: settings.muted,
                playbackRate: settings.playbackRate,
                defaultPlaybackRate: settings.playbackRate
            })
        } catch (e) {
            throw new Error(NOT_IMPLEMENTED_MSG)
        }
        $video.css({
            margin: "auto",
            position: "absolute",
            "z-index": -1,
            top: position.y,
            left: position.x,
            "-webkit-transform": "translate(-" + position.x + ", -" + position.y + ")",
            "-ms-transform": "translate(-" + position.x + ", -" + position.y + ")",
            "-moz-transform": "translate(-" + position.x + ", -" + position.y + ")",
            transform: "translate(-" + position.x + ", -" + position.y + ")",
            visibility: "hidden",
            opacity: 0
        }).one("canplaythrough." + PLUGIN_NAME, function() {
            vide.resize()
        }).one("playing." + PLUGIN_NAME, function() {
            $video.css({
                visibility: "visible",
                opacity: 1
            });
            $wrapper.css("background-image", "none")
        });
        $element.on("resize." + PLUGIN_NAME, function() {
            if (settings.resizing) {
                vide.resize()
            }
        });
        $wrapper.append($video)
    };
    Vide.prototype.getVideoObject = function() {
        return this.$video[0]
    };
    Vide.prototype.resize = function() {
        if (!this.$video) {
            return
        }
        var $wrapper = this.$wrapper;
        var $video = this.$video;
        var video = $video[0];
        var videoHeight = video.videoHeight;
        var videoWidth = video.videoWidth;
        var wrapperHeight = $wrapper.height();
        var wrapperWidth = $wrapper.width();
        if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
            $video.css({
                width: wrapperWidth + 2,
                height: "auto"
            })
        } else {
            $video.css({
                width: "auto",
                height: wrapperHeight + 2
            })
        }
    };
    Vide.prototype.destroy = function() {
        delete $[PLUGIN_NAME].lookup[this.index];
        this.$video && this.$video.off(PLUGIN_NAME);
        this.$element.off(PLUGIN_NAME).removeData(PLUGIN_NAME);
        this.$wrapper.remove()
    };
    $[PLUGIN_NAME] = {
        lookup: []
    };
    $.fn[PLUGIN_NAME] = function(path, options) {
        var instance;
        this.each(function() {
            instance = $.data(this, PLUGIN_NAME);
            instance && instance.destroy();
            instance = new Vide(this, path, options);
            instance.index = $[PLUGIN_NAME].lookup.push(instance) - 1;
            $.data(this, PLUGIN_NAME, instance)
        });
        return this
    };
    $(document).ready(function() {
        var $window = $(window);
        $window.on("resize." + PLUGIN_NAME, function() {
            for (var len = $[PLUGIN_NAME].lookup.length, i = 0, instance; i < len; i++) {
                instance = $[PLUGIN_NAME].lookup[i];
                if (instance && instance.settings.resizing) {
                    instance.resize()
                }
            }
        });
        $window.on("unload." + PLUGIN_NAME, function() {
            return false
        });
        $(document).find("[data-" + PLUGIN_NAME + "-bg]").each(function(i, element) {
            var $element = $(element);
            var options = $element.data(PLUGIN_NAME + "-options");
            var path = $element.data(PLUGIN_NAME + "-bg");
            $element[PLUGIN_NAME](path, options)
        })
    })
});
(function($) {
    $.fn.autogrow = function(opts) {
        var that = $(this).css({
                overflow: "hidden",
                resize: "none"
            }),
            selector = that.selector,
            defaults = {
                context: $(document),
                animate: true,
                speed: 200,
                fixMinHeight: true,
                cloneClass: "autogrowclone",
                onInitialize: false
            };
        opts = $.isPlainObject(opts) ? opts : {
            context: opts ? opts : $(document)
        };
        opts = $.extend({}, defaults, opts);
        that.each(function(i, elem) {
            var min, clone;
            elem = $(elem);
            if (elem.is(":visible") || parseInt(elem.css("height"), 10) > 0) {
                min = parseInt(elem.css("height"), 10) || elem.innerHeight()
            } else {
                clone = elem.clone().addClass(opts.cloneClass).val(elem.val()).css({
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                });
                $("body").append(clone);
                min = clone.innerHeight();
                clone.remove()
            }
            if (opts.fixMinHeight) {
                elem.data("autogrow-start-height", min)
            }
            elem.css("height", min);
            if (opts.onInitialize && elem.length) {
                resize.call(elem[0])
            }
        });
        opts.context.on("keyup paste", selector, resize);

        function resize(e) {
            var box = $(this),
                oldHeight = box.innerHeight(),
                newHeight = this.scrollHeight,
                minHeight = box.data("autogrow-start-height") || 0,
                clone;
            if (oldHeight < newHeight) {
                this.scrollTop = 0;
                if (opts.animate) {
                    box.stop().animate({
                        height: newHeight
                    }, {
                        duration: opts.speed,
                        complete: notifyGrown
                    })
                } else {
                    box.innerHeight(newHeight);
                    notifyGrown()
                }
            } else if (!e || e.which == 8 || e.which == 46 || e.ctrlKey && e.which == 88) {
                if (oldHeight > minHeight) {
                    clone = box.clone().addClass(opts.cloneClass).css({
                        position: "absolute",
                        zIndex: -10,
                        height: ""
                    }).val(box.val());
                    box.after(clone);
                    do {
                        newHeight = clone[0].scrollHeight - 1;
                        clone.innerHeight(newHeight)
                    } while (newHeight === clone[0].scrollHeight);
                    newHeight++;
                    clone.remove();
                    box.focus();
                    newHeight < minHeight && (newHeight = minHeight);
                    if (oldHeight > newHeight) {
                        if (opts.animate) {
                            box.stop().animate({
                                height: newHeight
                            }, {
                                duration: opts.speed,
                                complete: notifyShrunk
                            })
                        } else {
                            box.innerHeight(newHeight);
                            notifyShrunk()
                        }
                    }
                } else {
                    box.innerHeight(minHeight)
                }
            }
        }

        function notifyGrown() {
            opts.context.trigger("autogrow:grow")
        }

        function notifyShrunk() {
            opts.context.trigger("autogrow:shrink")
        }
        return that
    }
})(jQuery);
$(document).foundation();
$(".nav--new").headroom({
    tolerance: {
        down: 0,
        up: 5
    }
});
$(function() {
    if (Foundation.MediaQuery.atLeast("medium")) {
        var videoContainer = $(".hero--videobackground");
        videoContainer.vide({
            mp4: videoContainer.data("video-mp4"),
            webm: videoContainer.data("video-webm"),
            ogv: videoContainer.data("video-ogv")
        }, {
            posterType: "none",
            muted: true,
            loop: true,
            autoplay: true,
            position: "0% 0%",
            resizing: true
        })
    }
    $("textarea").autogrow();
    var wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 100,
        mobile: false,
        live: true,
        callback: function(box) {},
        scrollContainer: null
    });
    wow.init();
    var animateSvg = function($svg) {
        $svg.find("g").each(function(index, element) {
            $(element).css("opacity", 0);
            setTimeout(function() {
                $(element).animate({
                    opacity: 1
                }, 500)
            }, i * 200);
            i += 1
        })
    };
    if ($("#final-results").length > 0) {
        var animated = false;
        targetScrollTop = $("#final-results").offset().top;
        $(document).bind("scroll", function(event) {
            scrollTop = $(this).scrollTop();
            if (scrollTop > targetScrollTop - 750 && !animated) {
                animated = true;
                i = 1;
                $object = $("#final-results object");
                $svg = $object.contents().find("svg");
                if ($svg.length) {
                    return animateSvg($svg)
                }
                setTimeout(function() {
                    $svg = $object.contents().find("svg");
                    animateSvg($svg)
                }, 1e3)
            }
        })
    }
    $("a.js__smoothscroll").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate({
                    scrollTop: target.offset().top
                }, 700);
                return false
            }
        }
    })
});
(function($) {
    function Char(el, options) {
        this.$el = $(el);
        this.options = options;
        this.timeout = null;
        this.generate()
    }
    Char.prototype = {
        generate: function() {
            if (!this.$char) {
                var _self = this;
                this.$container = $('<div style="position:relative; display:inline-block; *display:inline; zoom:1;"></div>');
                this.$el.after(this.$container).appendTo(this.$container);
                this.$char = $('<div class="wChar">123</div>').hide();
                this.$char.appendTo(this.$container);
                this.setTheme(this.options.theme);
                this.setOpacity(this.options.opacity);
                this.setPosition(this.options.position);
                this.$el.keyup(function(e) {
                    _self.onKeyup(e)
                })
            }
            return this.$char
        },
        onKeyup: function(e) {
            var length = this.$el.val().length,
                charsLeft = this.options.max - length;
            this.setTimeout();
            if (charsLeft < 0) {
                this.$el.val(this.$el.val().substring(0, this.options.max));
                charsLeft = 0
            }
            if (this.options.showMinCount && this.options.min > 0 && length < this.options.min) {
                this.$char.html(length + (this.options.messageMin ? " " + this.options.messageMin : ""));
                this.$char.addClass("wChar-min")
            } else {
                if (charsLeft <= 0) {
                    this.$char.addClass("wChar-min")
                } else {
                    this.$char.removeClass("wChar-min")
                }
                this.$char.html(charsLeft + (this.options.message ? " " + this.options.message : ""))
            }
        },
        setTimeout: function() {
            var _self = this;
            window.setTimeout(function() {
                _self.$char.fadeIn(_self.options.fadeIn)
            }, _self.options.delayIn);
            window.clearTimeout(this.timeout);
            this.timeout = window.setTimeout(function() {
                _self.$char.fadeOut(_self.options.fadeOut)
            }, _self.options.delayOut)
        },
        setTheme: function(theme) {
            this.$char.attr("class", this.$char.attr("class").replace(/wChar-theme-.+\s|wChar-theme-.+$/, ""));
            this.$char.addClass("wChar-theme-" + theme)
        },
        setOpacity: function(opacity) {
            this.$char.css("opacity", opacity)
        },
        setPosition: function(position) {
            var width = this.$char.outerWidth(true),
                height = this.$char.outerHeight(true),
                center = this.$el.outerWidth() / 2 - width / 2,
                middle = this.$el.outerHeight() / 2 - height / 2;
            this.$char.css({
                left: "",
                right: "",
                top: "",
                bottom: ""
            });
            switch (position) {
                case "tl":
                    this.$char.css({
                        left: 0,
                        top: -1 * height
                    });
                    break;
                case "tc":
                    this.$char.css({
                        left: center,
                        top: -1 * height
                    });
                    break;
                case "tr":
                    this.$char.css({
                        right: 0,
                        top: -1 * height
                    });
                    break;
                case "rt":
                    this.$char.css({
                        right: -1 * width,
                        top: 0
                    });
                    break;
                case "rm":
                    this.$char.css({
                        right: -1 * width,
                        top: middle
                    });
                    break;
                case "rb":
                    this.$char.css({
                        right: -1 * width,
                        bottom: 0
                    });
                    break;
                case "br":
                    this.$char.css({
                        right: 0,
                        bottom: -1 * height
                    });
                    break;
                case "bc":
                    this.$char.css({
                        left: center,
                        bottom: -1 * height
                    });
                    break;
                case "bl":
                    this.$char.css({
                        left: 0,
                        bottom: -1 * height
                    });
                    break;
                case "lb":
                    this.$char.css({
                        left: -1 * width,
                        bottom: 0
                    });
                    break;
                case "lm":
                    this.$char.css({
                        left: -1 * width,
                        top: middle
                    });
                    break;
                case "lt":
                    this.$char.css({
                        left: -1 * width,
                        top: 0
                    });
                    break
            }
        }
    };
    $.fn.wChar = function(options, value) {
        if (typeof options === "string") {
            var values = [];
            var elements = this.each(function() {
                var wChar = $(this).data("wChar");
                if (wChar) {
                    var func = (value ? "set" : "get") + options.charAt(0).toUpperCase() + options.substring(1).toLowerCase();
                    if (wChar[options]) {
                        wChar[options].apply(wChar, [value])
                    } else if (value) {
                        if (wChar[func]) {
                            wChar[func].apply(wChar, [value])
                        }
                        if (wChar.options[options]) {
                            wChar.options[options] = value
                        }
                    } else {
                        if (wChar[func]) {
                            values.push(wChar[func].apply(wChar, [value]))
                        } else if (wChar.options[options]) {
                            values.push(wChar.options[options])
                        } else {
                            values.push(null)
                        }
                    }
                }
            });
            if (values.length === 1) {
                return values[0]
            } else if (values.length > 0) {
                return values
            } else {
                return elements
            }
        }
        options = $.extend({}, $.fn.wChar.defaults, options);

        function get(el) {
            var wChar = $.data(el, "wChar");
            if (!wChar) {
                var _options = $.extend(true, {}, options);
                _options.min = $(el).attr("data-minlength") || _options.min;
                _options.max = $(el).attr("data-maxlength") || _options.max;
                wChar = new Char(el, _options);
                $.data(el, "wChar", wChar)
            }
            return wChar
        }
        return this.each(function() {
            get(this)
        })
    };
    $.fn.wChar.defaults = {
        theme: "classic",
        position: "tr",
        opacity: .9,
        showMinCount: true,
        min: 0,
        max: 100,
        fadeIn: 500,
        fadeOut: 500,
        delayIn: 0,
        delayOut: 2e3,
        message: "",
        messageMin: ""
    }
})(jQuery);
$(".wchar-input").wChar({
    message: "left"
});
if ($("#location").length > 0) {
    $.ajax({
        url: "//freegeoip.net/json/",
        type: "POST",
        dataType: "jsonp",
        success: function(location) {
            if ($("#location").val().length === 0) {
                $("#location").val(location.city + ", " + location.country_name)
            }
        }
    })
}(function(d) {
    var e = function(a, b, c, f) {
        this.target = a;
        this.url = b;
        this.html = [];
        this.effectQueue = [];
        this.options = d.extend({
            ssl: !1,
            host: "www.feedrapp.info",
            limit: null,
            key: null,
            layoutTemplate: "<ul>{entries}</ul>",
            entryTemplate: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',
            tokens: {},
            outputMode: "json",
            dateFormat: "dddd MMM Do",
            dateLocale: "en",
            effect: "show",
            offsetStart: !1,
            offsetEnd: !1,
            error: function() {
                console.log("jQuery RSS: url doesn't link to RSS-Feed")
            },
            onData: function() {},
            success: function() {}
        }, c || {});
        this.callback = f || this.options.success
    };
    e.htmlTags = "doctype,html,head,title,base,link,meta,style,script,noscript,body,article,nav,aside,section,header,footer,h1-h6,hgroup,address,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,figure,figcaption,div,table,caption,thead,tbody,tfoot,tr,th,td,col,colgroup,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,details,summary,command,menu,del,ins,img,iframe,embed,object,param,video,audio,source,canvas,track,map,area,a,em,strong,i,b,u,s,small,abbr,q,cite,dfn,sub,sup,time,code,kbd,samp,var,mark,bdi,bdo,ruby,rt,rp,span,br,wbr".split(",");
    e.prototype.load = function(a) {
        var b = "http" + (this.options.ssl ? "s" : "") + "://" + this.options.host + "?callback=?&q=" + encodeURIComponent(this.url);
        this.options.offsetStart && this.options.offsetEnd && (this.options.limit = this.options.offsetEnd);
        null !== this.options.limit && (b += "&num=" + this.options.limit);
        null !== this.options.key && (b += "&key=" + this.options.key);
        d.getJSON(b, a)
    };
    e.prototype.render = function() {
        var a = this;
        this.load(function(b) {
            try {
                a.feed = b.responseData.feed, a.entries = b.responseData.feed.entries
            } catch (c) {
                return a.entries = [], a.feed = null, a.options.error.call(a)
            }
            b = a.generateHTMLForEntries();
            a.target.append(b.layout);
            if (0 !== b.entries.length) {
                d.isFunction(a.options.onData) && a.options.onData.call(a);
                var f = d(b.layout).is("entries") ? b.layout : d("entries", b.layout);
                a.appendEntriesAndApplyEffects(f, b.entries)
            }
            0 < a.effectQueue.length ? a.executeEffectQueue(a.callback) : d.isFunction(a.callback) && a.callback.call(a)
        })
    };
    e.prototype.appendEntriesAndApplyEffects = function(a, b) {
        var c = this;
        d.each(b, function(b, e) {
            var d = c.wrapContent(e);
            "show" === c.options.effect ? a.before(d) : (d.css({
                display: "none"
            }), a.before(d), c.applyEffect(d, c.options.effect))
        });
        a.remove()
    };
    e.prototype.generateHTMLForEntries = function() {
        var a = this,
            b = {
                entries: [],
                layout: null
            };
        d(this.entries).each(function() {
            var c = a.options.offsetStart,
                f = a.options.offsetEnd;
            c && f ? index >= c && index <= f && a.isRelevant(this, b.entries) && (c = a.evaluateStringForEntry(a.options.entryTemplate, this), b.entries.push(c)) : a.isRelevant(this, b.entries) && (c = a.evaluateStringForEntry(a.options.entryTemplate, this), b.entries.push(c))
        });
        b.layout = this.options.entryTemplate ? this.wrapContent(this.options.layoutTemplate.replace("{entries}", "<entries></entries>")) : this.wrapContent("<div><entries></entries></div>");
        return b
    };
    e.prototype.wrapContent = function(a) {
        return 0 !== d.trim(a).indexOf("<") ? d("<div>" + a + "</div>") : d(a)
    };
    e.prototype.applyEffect = function(a, b, c) {
        switch (b) {
            case "slide":
                a.slideDown("slow", c);
                break;
            case "slideFast":
                a.slideDown(c);
                break;
            case "slideSynced":
                this.effectQueue.push({
                    element: a,
                    effect: "slide"
                });
                break;
            case "slideFastSynced":
                this.effectQueue.push({
                    element: a,
                    effect: "slideFast"
                })
        }
    };
    e.prototype.executeEffectQueue = function(a) {
        var b = this;
        this.effectQueue.reverse();
        var c = function() {
            var f = b.effectQueue.pop();
            f ? b.applyEffect(f.element, f.effect, c) : a && a()
        };
        c()
    };
    e.prototype.evaluateStringForEntry = function(a, b) {
        var c = a,
            f = this;
        d(a.match(/(\{.*?\})/g)).each(function() {
            var a = this.toString();
            c = c.replace(a, f.getValueForToken(a, b))
        });
        return c
    };
    e.prototype.isRelevant = function(a, b) {
        var c = this.getTokenMap(a);
        return this.options.filter ? this.options.filterLimit && this.options.filterLimit === b.length ? !1 : this.options.filter(a, c) : !0
    };
    e.prototype.getFormattedDate = function(a) {
        if (this.options.dateFormatFunction) return this.options.dateFormatFunction(a);
        return "undefined" !== typeof moment ? (a = moment(new Date(a)), a = a.locale ? a.locale(this.options.dateLocale) : a.lang(this.options.dateLocale), a.format(this.options.dateFormat)) : a
    };
    e.prototype.getTokenMap = function(a) {
        if (!this.feedTokens) {
            var b = JSON.parse(JSON.stringify(this.feed));
            delete b.entries;
            this.feedTokens = b
        }
        return d.extend({
            feed: this.feedTokens,
            url: a.link,
            author: a.author,
            date: this.getFormattedDate(a.publishedDate),
            title: a.title,
            body: a.content,
            shortBody: a.contentSnippet,
            bodyPlain: function(a) {
                for (var a = a.content.replace(/<script[\\r\\\s\S]*<\/script>/gim, "").replace(/<\/?[^>]+>/gi, ""), b = 0; b < e.htmlTags.length; b++) a = a.replace(RegExp("<" + e.htmlTags[b], "gi"), "");
                return a
            }(a),
            shortBodyPlain: a.contentSnippet.replace(/<\/?[^>]+>/gi, ""),
            index: d.inArray(a, this.entries),
            totalEntries: this.entries.length,
            teaserImage: function(a) {
                try {
                    return a.content.match(/(<img.*?>)/gi)[0]
                } catch (b) {
                    return ""
                }
            }(a),
            teaserImageUrl: function(a) {
                try {
                    return a.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1]
                } catch (b) {
                    return ""
                }
            }(a)
        }, this.options.tokens)
    };
    e.prototype.getValueForToken = function(a, b) {
        var c = this.getTokenMap(b),
            d = a.replace(/[\{\}]/g, ""),
            d = c[d];
        if ("undefined" !== typeof d) return "function" === typeof d ? d(b, c) : d;
        throw Error("Unknown token: " + a + ", url:" + this.url)
    };
    d.fn.rss = function(a, b, c) {
        new e(this, a, b, c).render();
        return this
    }
})(jQuery);
$(".js__feed").each(function(index, feed) {
    var url = $(feed).data("rss");
    $(feed).rss(url, {
        entryTemplate: "<li><a href='{url}'>{title}</a></li>",
        limit: 5
    })
});
(function($, window, document, undefined) {
    "use strict";
    var pluginName = "photosetGrid",
        defaults = {
            width: "100%",
            gutter: "0px",
            highresLinks: false,
            lowresWidth: 500,
            rel: "",
            onInit: function() {},
            onComplete: function() {}
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init()
    }
    Plugin.prototype = {
        init: function() {
            this.options.onInit();
            this._setupRows(this.element, this.options);
            this._setupColumns(this.element, this.options)
        },
        _callback: function(elem) {
            this.options.onComplete(elem)
        },
        _setupRows: function(elem, options) {
            if (options.layout) {
                this.layout = options.layout
            } else if ($(elem).attr("data-layout")) {
                this.layout = $(elem).attr("data-layout")
            } else {
                var stackedLayout = "";
                var defaultColumns = 1;
                for (var imgs = 0; imgs < $(elem).find("img").length; imgs++) {
                    stackedLayout = stackedLayout + defaultColumns.toString()
                }
                this.layout = stackedLayout
            }
            this.rows = this.layout.split("");
            for (var i in this.rows) {
                this.rows[i] = parseInt(this.rows[i], 10)
            }
            var $images = $(elem).find("img");
            var imageIndex = 0;
            $.each(this.rows, function(i, val) {
                var rowStart = imageIndex;
                var rowEnd = imageIndex + val;
                $images.slice(rowStart, rowEnd).wrapAll('<div class="photoset-row cols-' + val + '"></div>');
                imageIndex = rowEnd
            });
            $(elem).find(".photoset-row:not(:last-child)").css({
                "margin-bottom": options.gutter
            })
        },
        _setupColumns: function(elem, options) {
            var $this = this;
            var setupStyles = function(waitForImagesLoaded) {
                var $rows = $(elem).find(".photoset-row");
                var $images = $(elem).find("img");
                if (options.highresLinks) {
                    $images.each(function() {
                        var highres;
                        if ($(this).attr("data-highres")) {
                            highres = $(this).attr("data-highres")
                        } else {
                            highres = $(this).attr("src")
                        }
                        $(this).wrapAll('<a href="' + highres + '" class="photoset-cell highres-link" />')
                    });
                    if (options.rel) {
                        $images.parent().attr("rel", options.rel)
                    }
                } else {
                    $images.each(function() {
                        $(this).wrapAll('<div class="photoset-cell" />')
                    })
                }
                var $cells = $(elem).find(".photoset-cell");
                var $cols1 = $(elem).find(".cols-1 .photoset-cell");
                var $cols2 = $(elem).find(".cols-2 .photoset-cell");
                var $cols3 = $(elem).find(".cols-3 .photoset-cell");
                var $cols4 = $(elem).find(".cols-4 .photoset-cell");
                var $cols5 = $(elem).find(".cols-5 .photoset-cell");
                $(elem).css({
                    width: options.width
                });
                $rows.css({
                    clear: "left",
                    display: "block",
                    overflow: "hidden"
                });
                $cells.css({
                    float: "left",
                    display: "block",
                    "line-height": "0",
                    "-webkit-box-sizing": "border-box",
                    "-moz-box-sizing": "border-box",
                    "box-sizing": "border-box"
                });
                $images.css({
                    width: "100%",
                    height: "auto"
                });
                if (waitForImagesLoaded) {
                    $images.each(function() {
                        $(this).attr("height", $(this).height());
                        $(this).attr("width", $(this).width())
                    })
                }
                $cols1.css({
                    width: "100%"
                });
                $cols2.css({
                    width: "50%"
                });
                $cols3.css({
                    width: "33.3%"
                });
                $cols4.css({
                    width: "25%"
                });
                $cols5.css({
                    width: "20%"
                });
                var gutterVal = parseInt(options.gutter, 10);
                $(elem).find(".photoset-cell:not(:last-child)").css({
                    "padding-right": gutterVal / 2 + "px"
                });
                $(elem).find(".photoset-cell:not(:first-child)").css({
                    "padding-left": gutterVal / 2 + "px"
                });

                function resizePhotosetGrid() {
                    var w = $(elem).width().toString();
                    if (w !== $(elem).attr("data-width")) {
                        $rows.each(function() {
                            var $shortestImg = $(this).find("img:eq(0)");
                            $(this).find("img").each(function() {
                                var $img = $(this);
                                if ($img.attr("height") < $shortestImg.attr("height")) {
                                    $shortestImg = $(this)
                                }
                                if (parseInt($img.css("width"), 10) > options.lowresWidth && $img.attr("data-highres")) {
                                    $img.attr("src", $img.attr("data-highres"))
                                }
                            });
                            var rowHeight = $shortestImg.attr("height") * parseInt($shortestImg.css("width"), 10) / $shortestImg.attr("width");
                            var bufferHeight = Math.floor(rowHeight * .025);
                            $(this).height(rowHeight - bufferHeight);
                            $(this).find("img").each(function() {
                                var imageHeight = $(this).attr("height") * parseInt($(this).css("width"), 10) / $(this).attr("width");
                                var marginOffset = (rowHeight - imageHeight) * .5 + "px";
                                $(this).css({
                                    "margin-top": marginOffset
                                })
                            })
                        });
                        $(elem).attr("data-width", w)
                    }
                }
                resizePhotosetGrid();
                $(window).on("resize", function() {
                    resizePhotosetGrid()
                })
            };
            var waitForImagesLoaded = true;
            var hasDimensions = true;
            $(elem).find("img").each(function() {
                hasDimensions = hasDimensions & (!!$(this).attr("height") & !!$(this).attr("width"))
            });
            waitForImagesLoaded = !hasDimensions;
            if (waitForImagesLoaded) {
                $(elem).imagesLoaded(function() {
                    setupStyles(waitForImagesLoaded);
                    $this._callback(elem)
                })
            } else {
                setupStyles(waitForImagesLoaded);
                $this._callback(elem)
            }
        }
    };
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
            }
        })
    };
    var BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    $.fn.imagesLoaded = function(callback) {
        var $this = this,
            deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
            hasNotify = $.isFunction(deferred.notify),
            $images = $this.find("img").add($this.filter("img")),
            loaded = [],
            proper = [],
            broken = [];
        if ($.isPlainObject(callback)) {
            $.each(callback, function(key, value) {
                if (key === "callback") {
                    callback = value
                } else if (deferred) {
                    deferred[key](value)
                }
            })
        }

        function doneLoading() {
            var $proper = $(proper),
                $broken = $(broken);
            if (deferred) {
                if (broken.length) {
                    deferred.reject($images, $proper, $broken)
                } else {
                    deferred.resolve($images)
                }
            }
            if ($.isFunction(callback)) {
                callback.call($this, $images, $proper, $broken)
            }
        }

        function imgLoadedHandler(event) {
            imgLoaded(event.target, event.type === "error")
        }

        function imgLoaded(img, isBroken) {
            if (img.src === BLANK || $.inArray(img, loaded) !== -1) {
                return
            }
            loaded.push(img);
            if (isBroken) {
                broken.push(img)
            } else {
                proper.push(img)
            }
            $.data(img, "imagesLoaded", {
                isBroken: isBroken,
                src: img.src
            });
            if (hasNotify) {
                deferred.notifyWith($(img), [isBroken, $images, $(proper), $(broken)])
            }
            if ($images.length === loaded.length) {
                setTimeout(doneLoading);
                $images.unbind(".imagesLoaded", imgLoadedHandler)
            }
        }
        if (!$images.length) {
            doneLoading()
        } else {
            $images.bind("load.imagesLoaded error.imagesLoaded", imgLoadedHandler).each(function(i, el) {
                var src = el.src;
                var cached = $.data(el, "imagesLoaded");
                if (cached && cached.src === src) {
                    imgLoaded(el, cached.isBroken);
                    return
                }
                if (el.complete && el.naturalWidth !== undefined) {
                    imgLoaded(el, el.naturalWidth === 0 || el.naturalHeight === 0);
                    return
                }
                if (el.readyState || el.complete) {
                    el.src = BLANK;
                    el.src = src
                }
            })
        }
        return deferred ? deferred.promise($this) : $this
    };
    var $event = $.event,
        $special, dummy = {
            _: 0
        },
        frame = 0,
        wasResized, animRunning;
    $special = $event.special.throttledresize = {
        setup: function() {
            $(this).on("resize", $special.handler)
        },
        teardown: function() {
            $(this).off("resize", $special.handler)
        },
        handler: function(event, execAsap) {
            var context = this,
                args = arguments;
            wasResized = true;
            if (!animRunning) {
                setInterval(function() {
                    frame++;
                    if (frame > $special.threshold && wasResized || execAsap) {
                        event.type = "throttledresize";
                        $event.dispatch.apply(context, args);
                        wasResized = false;
                        frame = 0
                    }
                    if (frame > 9) {
                        $(dummy).stop();
                        animRunning = false;
                        frame = 0
                    }
                }, 30);
                animRunning = true
            }
        },
        threshold: 0
    }
})(jQuery, window, document);
$(function() {
    $(".photoset-grid-basic").photosetGrid()
});