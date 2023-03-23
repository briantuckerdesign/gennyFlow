// filesaver.js
(function (a, b) {
    if ("function" == typeof define && define.amd) define([], b);
    else if ("undefined" != typeof exports) b();
    else {
        b(), (a.FileSaver = { exports: {} }.exports);
    }
})(this, function () {
    "use strict";
    function b(a, b) {
        return "undefined" == typeof b ? (b = { autoBom: !1 }) : "object" != typeof b && (console.warn("Depricated: Expected third argument to be a object"), (b = { autoBom: !b })), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], { type: a.type }) : a;
    }
    function c(b, c, d) {
        var e = new XMLHttpRequest();
        e.open("GET", b),
            (e.responseType = "blob"),
            (e.onload = function () {
                a(e.response, c, d);
            }),
            (e.onerror = function () {
                console.error("could not download file");
            }),
            e.send();
    }
    function d(a) {
        var b = new XMLHttpRequest();
        return b.open("HEAD", a, !1), b.send(), 200 <= b.status && 299 >= b.status;
    }
    function e(a) {
        try {
            a.dispatchEvent(new MouseEvent("click"));
        } catch (c) {
            var b = document.createEvent("MouseEvents");
            b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
        }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
        a =
            f.saveAs || "object" != typeof window || window !== f
                ? function () {}
                : "download" in HTMLAnchorElement.prototype
                ? function (b, g, h) {
                      var i = f.URL || f.webkitURL,
                          j = document.createElement("a");
                      (g = g || b.name || "download"),
                          (j.download = g),
                          (j.rel = "noopener"),
                          "string" == typeof b
                              ? ((j.href = b), j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, (j.target = "_blank")))
                              : ((j.href = i.createObjectURL(b)),
                                setTimeout(function () {
                                    i.revokeObjectURL(j.href);
                                }, 4e4),
                                setTimeout(function () {
                                    e(j);
                                }, 0));
                  }
                : "msSaveOrOpenBlob" in navigator
                ? function (f, g, h) {
                      if (((g = g || f.name || "download"), "string" != typeof f)) navigator.msSaveOrOpenBlob(b(f, h), g);
                      else if (d(f)) c(f, g, h);
                      else {
                          var i = document.createElement("a");
                          (i.href = f),
                              (i.target = "_blank"),
                              setTimeout(function () {
                                  e(i);
                              });
                      }
                  }
                : function (a, b, d, e) {
                      if (((e = e || open("", "_blank")), e && (e.document.title = e.document.body.innerText = "downloading..."), "string" == typeof a)) return c(a, b, d);
                      var g = "application/octet-stream" === a.type,
                          h = /constructor/i.test(f.HTMLElement) || f.safari,
                          i = /CriOS\/[\d]+/.test(navigator.userAgent);
                      if ((i || (g && h)) && "object" == typeof FileReader) {
                          var j = new FileReader();
                          (j.onloadend = function () {
                              var a = j.result;
                              (a = i ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;")), e ? (e.location.href = a) : (location = a), (e = null);
                          }),
                              j.readAsDataURL(a);
                      } else {
                          var k = f.URL || f.webkitURL,
                              l = k.createObjectURL(a);
                          e ? (e.location = l) : (location.href = l),
                              (e = null),
                              setTimeout(function () {
                                  k.revokeObjectURL(l);
                              }, 4e4);
                      }
                  };
    (f.saveAs = a.saveAs = a), "undefined" != typeof module && (module.exports = a);
});
// html2canvas.js
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
!(function (A, e) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((A = "undefined" != typeof globalThis ? globalThis : A || self).html2canvas = e());
})(this, function () {
    "use strict";
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var r = function (A, e) {
        return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function (A, e) {
                    A.__proto__ = e;
                }) ||
            function (A, e) {
                for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (A[t] = e[t]);
            })(A, e);
    };
    function A(A, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
        function t() {
            this.constructor = A;
        }
        r(A, e), (A.prototype = null === e ? Object.create(e) : ((t.prototype = e.prototype), new t()));
    }
    var h = function () {
        return (h =
            Object.assign ||
            function (A) {
                for (var e, t = 1, r = arguments.length; t < r; t++) for (var B in (e = arguments[t])) Object.prototype.hasOwnProperty.call(e, B) && (A[B] = e[B]);
                return A;
            }).apply(this, arguments);
    };
    function a(A, s, o, i) {
        return new (o = o || Promise)(function (t, e) {
            function r(A) {
                try {
                    n(i.next(A));
                } catch (A) {
                    e(A);
                }
            }
            function B(A) {
                try {
                    n(i.throw(A));
                } catch (A) {
                    e(A);
                }
            }
            function n(A) {
                var e;
                A.done
                    ? t(A.value)
                    : ((e = A.value) instanceof o
                          ? e
                          : new o(function (A) {
                                A(e);
                            })
                      ).then(r, B);
            }
            n((i = i.apply(A, s || [])).next());
        });
    }
    function H(t, r) {
        var B,
            n,
            s,
            o = {
                label: 0,
                sent: function () {
                    if (1 & s[0]) throw s[1];
                    return s[1];
                },
                trys: [],
                ops: [],
            },
            A = { next: e(0), throw: e(1), return: e(2) };
        return (
            "function" == typeof Symbol &&
                (A[Symbol.iterator] = function () {
                    return this;
                }),
            A
        );
        function e(e) {
            return function (A) {
                return (function (e) {
                    if (B) throw new TypeError("Generator is already executing.");
                    for (; o; )
                        try {
                            if (((B = 1), n && (s = 2 & e[0] ? n.return : e[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, e[1])).done)) return s;
                            switch (((n = 0), (e = s ? [2 & e[0], s.value] : e)[0])) {
                                case 0:
                                case 1:
                                    s = e;
                                    break;
                                case 4:
                                    return o.label++, { value: e[1], done: !1 };
                                case 5:
                                    o.label++, (n = e[1]), (e = [0]);
                                    continue;
                                case 7:
                                    (e = o.ops.pop()), o.trys.pop();
                                    continue;
                                default:
                                    if (!(s = 0 < (s = o.trys).length && s[s.length - 1]) && (6 === e[0] || 2 === e[0])) {
                                        o = 0;
                                        continue;
                                    }
                                    if (3 === e[0] && (!s || (e[1] > s[0] && e[1] < s[3]))) {
                                        o.label = e[1];
                                        break;
                                    }
                                    if (6 === e[0] && o.label < s[1]) {
                                        (o.label = s[1]), (s = e);
                                        break;
                                    }
                                    if (s && o.label < s[2]) {
                                        (o.label = s[2]), o.ops.push(e);
                                        break;
                                    }
                                    s[2] && o.ops.pop(), o.trys.pop();
                                    continue;
                            }
                            e = r.call(t, o);
                        } catch (A) {
                            (e = [6, A]), (n = 0);
                        } finally {
                            B = s = 0;
                        }
                    if (5 & e[0]) throw e[1];
                    return { value: e[0] ? e[1] : void 0, done: !0 };
                })([e, A]);
            };
        }
    }
    function t(A, e, t) {
        if (t || 2 === arguments.length) for (var r, B = 0, n = e.length; B < n; B++) (!r && B in e) || ((r = r || Array.prototype.slice.call(e, 0, B))[B] = e[B]);
        return A.concat(r || e);
    }
    var d =
        ((B.prototype.add = function (A, e, t, r) {
            return new B(this.left + A, this.top + e, this.width + t, this.height + r);
        }),
        (B.fromClientRect = function (A, e) {
            return new B(e.left + A.windowBounds.left, e.top + A.windowBounds.top, e.width, e.height);
        }),
        (B.fromDOMRectList = function (A, e) {
            e = Array.from(e).find(function (A) {
                return 0 !== A.width;
            });
            return e ? new B(e.left + A.windowBounds.left, e.top + A.windowBounds.top, e.width, e.height) : B.EMPTY;
        }),
        (B.EMPTY = new B(0, 0, 0, 0)),
        B);
    function B(A, e, t, r) {
        (this.left = A), (this.top = e), (this.width = t), (this.height = r);
    }
    for (
        var f = function (A, e) {
                return d.fromClientRect(A, e.getBoundingClientRect());
            },
            Q = function (A) {
                for (var e = [], t = 0, r = A.length; t < r; ) {
                    var B,
                        n = A.charCodeAt(t++);
                    55296 <= n && n <= 56319 && t < r ? (56320 == (64512 & (B = A.charCodeAt(t++))) ? e.push(((1023 & n) << 10) + (1023 & B) + 65536) : (e.push(n), t--)) : e.push(n);
                }
                return e;
            },
            g = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
                var t = A.length;
                if (!t) return "";
                for (var r = [], B = -1, n = ""; ++B < t; ) {
                    var s = A[B];
                    s <= 65535 ? r.push(s) : ((s -= 65536), r.push(55296 + (s >> 10), (s % 1024) + 56320)), (B + 1 === t || 16384 < r.length) && ((n += String.fromCharCode.apply(String, r)), (r.length = 0));
                }
                return n;
            },
            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            n = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            s = 0;
        s < e.length;
        s++
    )
        n[e.charCodeAt(s)] = s;
    for (var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i = 0; i < o.length; i++) c[o.charCodeAt(i)] = i;
    function w(A, e, t) {
        return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
    }
    var U =
        ((l.prototype.get = function (A) {
            var e;
            if (0 <= A) {
                if (A < 55296 || (56319 < A && A <= 65535)) return (e = this.index[A >> 5]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 65535) return (e = this.index[2048 + ((A - 55296) >> 5)]), this.data[(e = (e << 2) + (31 & A))];
                if (A < this.highStart) return (e = this.index[(e = 2080 + (A >> 11))]), (e = this.index[(e += (A >> 5) & 63)]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 1114111) return this.data[this.highValueIndex];
            }
            return this.errorValue;
        }),
        l);
    function l(A, e, t, r, B, n) {
        (this.initialValue = A), (this.errorValue = e), (this.highStart = t), (this.highValueIndex = r), (this.index = B), (this.data = n);
    }
    for (var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), F = 0; F < C.length; F++) u[C.charCodeAt(F)] = F;
    function p(A, e, t, r) {
        var B = r[t];
        if (Array.isArray(A) ? -1 !== A.indexOf(B) : A === B)
            for (var n = t; n <= r.length; ) {
                if ((o = r[++n]) === e) return 1;
                if (o !== D) break;
            }
        if (B === D)
            for (n = t; 0 < n; ) {
                var s = r[--n];
                if (Array.isArray(A) ? -1 !== A.indexOf(s) : A === s)
                    for (var o, i = t; i <= r.length; ) {
                        if ((o = r[++i]) === e) return 1;
                        if (o !== D) break;
                    }
                if (s !== D) break;
            }
    }
    function E(A, e) {
        for (var t = A; 0 <= t; ) {
            var r = e[t];
            if (r !== D) return r;
            t--;
        }
        return 0;
    }
    function I(t, A) {
        var e = (B = (function (A, r) {
                void 0 === r && (r = "strict");
                var B = [],
                    n = [],
                    s = [];
                return (
                    A.forEach(function (A, e) {
                        var t = rA.get(A);
                        if ((50 < t ? (s.push(!0), (t -= 50)) : s.push(!1), -1 !== ["normal", "auto", "loose"].indexOf(r) && -1 !== [8208, 8211, 12316, 12448].indexOf(A))) return n.push(e), B.push(16);
                        if (4 !== t && 11 !== t) return n.push(e), 31 === t ? B.push("strict" === r ? O : q) : t === AA || 29 === t ? B.push(J) : 43 === t ? ((131072 <= A && A <= 196605) || (196608 <= A && A <= 262141) ? B.push(q) : B.push(J)) : void B.push(t);
                        if (0 === e) return n.push(e), B.push(J);
                        t = B[e - 1];
                        return -1 === iA.indexOf(t) ? (n.push(n[e - 1]), B.push(t)) : (n.push(e), B.push(J));
                    }),
                    [n, B, s]
                );
            })(t, (A = A || { lineBreak: "normal", wordBreak: "normal" }).lineBreak))[0],
            r = B[1],
            B = B[2];
        return [
            e,
            (r =
                "break-all" === A.wordBreak || "break-word" === A.wordBreak
                    ? r.map(function (A) {
                          return -1 !== [R, J, AA].indexOf(A) ? q : A;
                      })
                    : r),
            "keep-all" === A.wordBreak
                ? B.map(function (A, e) {
                      return A && 19968 <= t[e] && t[e] <= 40959;
                  })
                : void 0,
        ];
    }
    var y,
        K,
        m,
        L,
        b,
        D = 10,
        v = 13,
        x = 15,
        M = 17,
        S = 18,
        T = 19,
        G = 20,
        O = 21,
        V = 22,
        k = 24,
        R = 25,
        N = 26,
        P = 27,
        X = 28,
        J = 30,
        Y = 32,
        W = 33,
        Z = 34,
        _ = 35,
        q = 37,
        j = 38,
        z = 39,
        $ = 40,
        AA = 42,
        eA = [9001, 65288],
        tA = "×",
        rA =
            ((m = (function (A) {
                var e,
                    t,
                    r,
                    B,
                    n = 0.75 * A.length,
                    s = A.length,
                    o = 0;
                "=" === A[A.length - 1] && (n--, "=" === A[A.length - 2] && n--);
                for (var n = new ("undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? ArrayBuffer : Array)(n), i = Array.isArray(n) ? n : new Uint8Array(n), Q = 0; Q < s; Q += 4)
                    (e = c[A.charCodeAt(Q)]), (t = c[A.charCodeAt(Q + 1)]), (r = c[A.charCodeAt(Q + 2)]), (B = c[A.charCodeAt(Q + 3)]), (i[o++] = (e << 2) | (t >> 4)), (i[o++] = ((15 & t) << 4) | (r >> 2)), (i[o++] = ((3 & r) << 6) | (63 & B));
                return n;
            })(
                (y =
                    "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==")
            )),
            (L = Array.isArray(m)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 4) t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
                      return t;
                  })(m)
                : new Uint32Array(m)),
            (b = Array.isArray(m)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 2) t.push((A[r + 1] << 8) | A[r]);
                      return t;
                  })(m)
                : new Uint16Array(m)),
            (y = w(b, 12, L[4] / 2)),
            (K = 2 === L[5] ? w(b, (24 + L[4]) / 2) : ((m = L), (b = Math.ceil((24 + L[4]) / 4)), m.slice ? m.slice(b, K) : new Uint32Array(Array.prototype.slice.call(m, b, K)))),
            new U(L[0], L[1], L[2], L[3], y, K)),
        BA = [J, 36],
        nA = [1, 2, 3, 5],
        sA = [D, 8],
        oA = [P, N],
        iA = nA.concat(sA),
        QA = [j, z, $, Z, _],
        cA = [x, v],
        aA =
            ((gA.prototype.slice = function () {
                return g.apply(void 0, this.codePoints.slice(this.start, this.end));
            }),
            gA);
    function gA(A, e, t, r) {
        (this.codePoints = A), (this.required = "!" === e), (this.start = t), (this.end = r);
    }
    function wA(A, e) {
        var t = Q(A),
            r = (e = I(t, e))[0],
            B = e[1],
            n = e[2],
            s = t.length,
            o = 0,
            i = 0;
        return {
            next: function () {
                if (s <= i) return { done: !0, value: null };
                for (
                    var A = tA;
                    i < s &&
                    (A = (function (A, e, t, r, B) {
                        if (0 === t[r]) return tA;
                        var n = r - 1;
                        if (Array.isArray(B) && !0 === B[n]) return tA;
                        var s = n - 1,
                            o = 1 + n,
                            i = e[n],
                            r = 0 <= s ? e[s] : 0,
                            B = e[o];
                        if (2 === i && 3 === B) return tA;
                        if (-1 !== nA.indexOf(i)) return "!";
                        if (-1 !== nA.indexOf(B)) return tA;
                        if (-1 !== sA.indexOf(B)) return tA;
                        if (8 === E(n, e)) return "÷";
                        if (11 === rA.get(A[n])) return tA;
                        if ((i === Y || i === W) && 11 === rA.get(A[o])) return tA;
                        if (7 === i || 7 === B) return tA;
                        if (9 === i) return tA;
                        if (-1 === [D, v, x].indexOf(i) && 9 === B) return tA;
                        if (-1 !== [M, S, T, k, X].indexOf(B)) return tA;
                        if (E(n, e) === V) return tA;
                        if (p(23, V, n, e)) return tA;
                        if (p([M, S], O, n, e)) return tA;
                        if (p(12, 12, n, e)) return tA;
                        if (i === D) return "÷";
                        if (23 === i || 23 === B) return tA;
                        if (16 === B || 16 === i) return "÷";
                        if (-1 !== [v, x, O].indexOf(B) || 14 === i) return tA;
                        if (36 === r && -1 !== cA.indexOf(i)) return tA;
                        if (i === X && 36 === B) return tA;
                        if (B === G) return tA;
                        if ((-1 !== BA.indexOf(B) && i === R) || (-1 !== BA.indexOf(i) && B === R)) return tA;
                        if ((i === P && -1 !== [q, Y, W].indexOf(B)) || (-1 !== [q, Y, W].indexOf(i) && B === N)) return tA;
                        if ((-1 !== BA.indexOf(i) && -1 !== oA.indexOf(B)) || (-1 !== oA.indexOf(i) && -1 !== BA.indexOf(B))) return tA;
                        if ((-1 !== [P, N].indexOf(i) && (B === R || (-1 !== [V, x].indexOf(B) && e[1 + o] === R))) || (-1 !== [V, x].indexOf(i) && B === R) || (i === R && -1 !== [R, X, k].indexOf(B))) return tA;
                        if (-1 !== [R, X, k, M, S].indexOf(B))
                            for (var Q = n; 0 <= Q; ) {
                                if ((c = e[Q]) === R) return tA;
                                if (-1 === [X, k].indexOf(c)) break;
                                Q--;
                            }
                        if (-1 !== [P, N].indexOf(B))
                            for (var c, Q = -1 !== [M, S].indexOf(i) ? s : n; 0 <= Q; ) {
                                if ((c = e[Q]) === R) return tA;
                                if (-1 === [X, k].indexOf(c)) break;
                                Q--;
                            }
                        if ((j === i && -1 !== [j, z, Z, _].indexOf(B)) || (-1 !== [z, Z].indexOf(i) && -1 !== [z, $].indexOf(B)) || (-1 !== [$, _].indexOf(i) && B === $)) return tA;
                        if ((-1 !== QA.indexOf(i) && -1 !== [G, N].indexOf(B)) || (-1 !== QA.indexOf(B) && i === P)) return tA;
                        if (-1 !== BA.indexOf(i) && -1 !== BA.indexOf(B)) return tA;
                        if (i === k && -1 !== BA.indexOf(B)) return tA;
                        if ((-1 !== BA.concat(R).indexOf(i) && B === V && -1 === eA.indexOf(A[o])) || (-1 !== BA.concat(R).indexOf(B) && i === S)) return tA;
                        if (41 === i && 41 === B) {
                            for (var a = t[n], g = 1; 0 < a && 41 === e[--a]; ) g++;
                            if (g % 2 != 0) return tA;
                        }
                        return i === Y && B === W ? tA : "÷";
                    })(t, B, r, ++i, n)) === tA;

                );
                if (A === tA && i !== s) return { done: !0, value: null };
                var e = new aA(t, A, o, i);
                return (o = i), { value: e, done: !1 };
            },
        };
    }
    function UA(A) {
        return 48 <= A && A <= 57;
    }
    function lA(A) {
        return UA(A) || (65 <= A && A <= 70) || (97 <= A && A <= 102);
    }
    function CA(A) {
        return 10 === A || 9 === A || 32 === A;
    }
    function uA(A) {
        return (97 <= (t = e = A) && t <= 122) || (65 <= (e = e) && e <= 90) || 128 <= A || 95 === A;
        var e, t;
    }
    function FA(A) {
        return uA(A) || UA(A) || 45 === A;
    }
    function hA(A, e) {
        return 92 === A && 10 !== e;
    }
    function dA(A, e, t) {
        return 45 === A ? uA(e) || hA(e, t) : !!uA(A) || (92 === A && 10 !== e);
    }
    function fA(A, e, t) {
        return 43 === A || 45 === A ? !!UA(e) || (46 === e && UA(t)) : UA(46 === A ? e : A);
    }
    var HA = { type: 2 },
        pA = { type: 3 },
        EA = { type: 4 },
        IA = { type: 13 },
        yA = { type: 8 },
        KA = { type: 21 },
        mA = { type: 9 },
        LA = { type: 10 },
        bA = { type: 11 },
        DA = { type: 12 },
        vA = { type: 14 },
        xA = { type: 23 },
        MA = { type: 1 },
        SA = { type: 25 },
        TA = { type: 24 },
        GA = { type: 26 },
        OA = { type: 27 },
        VA = { type: 28 },
        kA = { type: 29 },
        RA = { type: 31 },
        NA = { type: 32 },
        PA =
            ((XA.prototype.write = function (A) {
                this._value = this._value.concat(Q(A));
            }),
            (XA.prototype.read = function () {
                for (var A = [], e = this.consumeToken(); e !== NA; ) A.push(e), (e = this.consumeToken());
                return A;
            }),
            (XA.prototype.consumeToken = function () {
                var A = this.consumeCodePoint();
                switch (A) {
                    case 34:
                        return this.consumeStringToken(34);
                    case 35:
                        var e = this.peekCodePoint(0),
                            t = this.peekCodePoint(1),
                            r = this.peekCodePoint(2);
                        if (FA(e) || hA(t, r)) {
                            var B = dA(e, t, r) ? 2 : 1;
                            return { type: 5, value: this.consumeName(), flags: B };
                        }
                        break;
                    case 36:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), IA;
                        break;
                    case 39:
                        return this.consumeStringToken(39);
                    case 40:
                        return HA;
                    case 41:
                        return pA;
                    case 42:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), vA;
                        break;
                    case 43:
                        if (fA(A, this.peekCodePoint(0), this.peekCodePoint(1))) return this.reconsumeCodePoint(A), this.consumeNumericToken();
                        break;
                    case 44:
                        return EA;
                    case 45:
                        var r = A,
                            B = this.peekCodePoint(0),
                            n = this.peekCodePoint(1);
                        if (fA(r, B, n)) return this.reconsumeCodePoint(A), this.consumeNumericToken();
                        if (dA(r, B, n)) return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
                        if (45 === B && 62 === n) return this.consumeCodePoint(), this.consumeCodePoint(), TA;
                        break;
                    case 46:
                        if (fA(A, this.peekCodePoint(0), this.peekCodePoint(1))) return this.reconsumeCodePoint(A), this.consumeNumericToken();
                        break;
                    case 47:
                        if (42 === this.peekCodePoint(0))
                            for (this.consumeCodePoint(); ; ) {
                                var s = this.consumeCodePoint();
                                if (42 === s && 47 === (s = this.consumeCodePoint())) return this.consumeToken();
                                if (-1 === s) return this.consumeToken();
                            }
                        break;
                    case 58:
                        return GA;
                    case 59:
                        return OA;
                    case 60:
                        if (33 === this.peekCodePoint(0) && 45 === this.peekCodePoint(1) && 45 === this.peekCodePoint(2)) return this.consumeCodePoint(), this.consumeCodePoint(), SA;
                        break;
                    case 64:
                        var n = this.peekCodePoint(0),
                            o = this.peekCodePoint(1),
                            i = this.peekCodePoint(2);
                        if (dA(n, o, i)) return { type: 7, value: this.consumeName() };
                        break;
                    case 91:
                        return VA;
                    case 92:
                        if (hA(A, this.peekCodePoint(0))) return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
                        break;
                    case 93:
                        return kA;
                    case 61:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), yA;
                        break;
                    case 123:
                        return bA;
                    case 125:
                        return DA;
                    case 117:
                    case 85:
                        (o = this.peekCodePoint(0)), (i = this.peekCodePoint(1));
                        return 43 !== o || (!lA(i) && 63 !== i) || (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
                    case 124:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), mA;
                        if (124 === this.peekCodePoint(0)) return this.consumeCodePoint(), KA;
                        break;
                    case 126:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), LA;
                        break;
                    case -1:
                        return NA;
                }
                return CA(A) ? (this.consumeWhiteSpace(), RA) : UA(A) ? (this.reconsumeCodePoint(A), this.consumeNumericToken()) : uA(A) ? (this.reconsumeCodePoint(A), this.consumeIdentLikeToken()) : { type: 6, value: g(A) };
            }),
            (XA.prototype.consumeCodePoint = function () {
                var A = this._value.shift();
                return void 0 === A ? -1 : A;
            }),
            (XA.prototype.reconsumeCodePoint = function (A) {
                this._value.unshift(A);
            }),
            (XA.prototype.peekCodePoint = function (A) {
                return A >= this._value.length ? -1 : this._value[A];
            }),
            (XA.prototype.consumeUnicodeRangeToken = function () {
                for (var A = [], e = this.consumeCodePoint(); lA(e) && A.length < 6; ) A.push(e), (e = this.consumeCodePoint());
                for (var t = !1; 63 === e && A.length < 6; ) A.push(e), (e = this.consumeCodePoint()), (t = !0);
                if (t)
                    return {
                        type: 30,
                        start: parseInt(
                            g.apply(
                                void 0,
                                A.map(function (A) {
                                    return 63 === A ? 48 : A;
                                })
                            ),
                            16
                        ),
                        end: parseInt(
                            g.apply(
                                void 0,
                                A.map(function (A) {
                                    return 63 === A ? 70 : A;
                                })
                            ),
                            16
                        ),
                    };
                var r = parseInt(g.apply(void 0, A), 16);
                if (45 === this.peekCodePoint(0) && lA(this.peekCodePoint(1))) {
                    this.consumeCodePoint();
                    for (var e = this.consumeCodePoint(), B = []; lA(e) && B.length < 6; ) B.push(e), (e = this.consumeCodePoint());
                    return { type: 30, start: r, end: parseInt(g.apply(void 0, B), 16) };
                }
                return { type: 30, start: r, end: r };
            }),
            (XA.prototype.consumeIdentLikeToken = function () {
                var A = this.consumeName();
                return "url" === A.toLowerCase() && 40 === this.peekCodePoint(0) ? (this.consumeCodePoint(), this.consumeUrlToken()) : 40 === this.peekCodePoint(0) ? (this.consumeCodePoint(), { type: 19, value: A }) : { type: 20, value: A };
            }),
            (XA.prototype.consumeUrlToken = function () {
                var A = [];
                if ((this.consumeWhiteSpace(), -1 === this.peekCodePoint(0))) return { type: 22, value: "" };
                var e,
                    t = this.peekCodePoint(0);
                if (39 === t || 34 === t) {
                    t = this.consumeStringToken(this.consumeCodePoint());
                    return 0 === t.type && (this.consumeWhiteSpace(), -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0)) ? (this.consumeCodePoint(), { type: 22, value: t.value }) : (this.consumeBadUrlRemnants(), xA);
                }
                for (;;) {
                    var r = this.consumeCodePoint();
                    if (-1 === r || 41 === r) return { type: 22, value: g.apply(void 0, A) };
                    if (CA(r)) return this.consumeWhiteSpace(), -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0) ? (this.consumeCodePoint(), { type: 22, value: g.apply(void 0, A) }) : (this.consumeBadUrlRemnants(), xA);
                    if (34 === r || 39 === r || 40 === r || (0 <= (e = r) && e <= 8) || 11 === e || (14 <= e && e <= 31) || 127 === e) return this.consumeBadUrlRemnants(), xA;
                    if (92 === r) {
                        if (!hA(r, this.peekCodePoint(0))) return this.consumeBadUrlRemnants(), xA;
                        A.push(this.consumeEscapedCodePoint());
                    } else A.push(r);
                }
            }),
            (XA.prototype.consumeWhiteSpace = function () {
                for (; CA(this.peekCodePoint(0)); ) this.consumeCodePoint();
            }),
            (XA.prototype.consumeBadUrlRemnants = function () {
                for (;;) {
                    var A = this.consumeCodePoint();
                    if (41 === A || -1 === A) return;
                    hA(A, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
                }
            }),
            (XA.prototype.consumeStringSlice = function (A) {
                for (var e = ""; 0 < A; ) {
                    var t = Math.min(5e4, A);
                    (e += g.apply(void 0, this._value.splice(0, t))), (A -= t);
                }
                return this._value.shift(), e;
            }),
            (XA.prototype.consumeStringToken = function (A) {
                for (var e = "", t = 0; ; ) {
                    var r,
                        B = this._value[t];
                    if (-1 === B || void 0 === B || B === A) return { type: 0, value: (e += this.consumeStringSlice(t)) };
                    if (10 === B) return this._value.splice(0, t), MA;
                    92 !== B || (-1 !== (r = this._value[t + 1]) && void 0 !== r && (10 === r ? ((e += this.consumeStringSlice(t)), (t = -1), this._value.shift()) : hA(B, r) && ((e += this.consumeStringSlice(t)), (e += g(this.consumeEscapedCodePoint())), (t = -1)))), t++;
                }
            }),
            (XA.prototype.consumeNumber = function () {
                var A = [],
                    e = 4;
                for ((43 !== (t = this.peekCodePoint(0)) && 45 !== t) || A.push(this.consumeCodePoint()); UA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
                var t = this.peekCodePoint(0),
                    r = this.peekCodePoint(1);
                if (46 === t && UA(r)) for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8; UA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
                t = this.peekCodePoint(0);
                var r = this.peekCodePoint(1),
                    B = this.peekCodePoint(2);
                if ((69 === t || 101 === t) && (((43 === r || 45 === r) && UA(B)) || UA(r))) for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8; UA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
                return [
                    (function (A) {
                        var e = 0,
                            t = 1;
                        (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (t = -1), e++);
                        for (var r = []; UA(A[e]); ) r.push(A[e++]);
                        var B = r.length ? parseInt(g.apply(void 0, r), 10) : 0;
                        46 === A[e] && e++;
                        for (var n = []; UA(A[e]); ) n.push(A[e++]);
                        var s = n.length,
                            o = s ? parseInt(g.apply(void 0, n), 10) : 0;
                        (69 !== A[e] && 101 !== A[e]) || e++;
                        var i = 1;
                        (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (i = -1), e++);
                        for (var Q = []; UA(A[e]); ) Q.push(A[e++]);
                        var c = Q.length ? parseInt(g.apply(void 0, Q), 10) : 0;
                        return t * (B + o * Math.pow(10, -s)) * Math.pow(10, i * c);
                    })(A),
                    e,
                ];
            }),
            (XA.prototype.consumeNumericToken = function () {
                var A = this.consumeNumber(),
                    e = A[0],
                    t = A[1],
                    r = this.peekCodePoint(0),
                    B = this.peekCodePoint(1),
                    A = this.peekCodePoint(2);
                return dA(r, B, A) ? { type: 15, number: e, flags: t, unit: this.consumeName() } : 37 === r ? (this.consumeCodePoint(), { type: 16, number: e, flags: t }) : { type: 17, number: e, flags: t };
            }),
            (XA.prototype.consumeEscapedCodePoint = function () {
                var A,
                    e = this.consumeCodePoint();
                if (lA(e)) {
                    for (var t = g(e); lA(this.peekCodePoint(0)) && t.length < 6; ) t += g(this.consumeCodePoint());
                    CA(this.peekCodePoint(0)) && this.consumeCodePoint();
                    var r = parseInt(t, 16);
                    return 0 === r || (55296 <= (A = r) && A <= 57343) || 1114111 < r ? 65533 : r;
                }
                return -1 === e ? 65533 : e;
            }),
            (XA.prototype.consumeName = function () {
                for (var A = ""; ; ) {
                    var e = this.consumeCodePoint();
                    if (FA(e)) A += g(e);
                    else {
                        if (!hA(e, this.peekCodePoint(0))) return this.reconsumeCodePoint(e), A;
                        A += g(this.consumeEscapedCodePoint());
                    }
                }
            }),
            XA);
    function XA() {
        this._value = [];
    }
    var JA =
        ((YA.create = function (A) {
            var e = new PA();
            return e.write(A), new YA(e.read());
        }),
        (YA.parseValue = function (A) {
            return YA.create(A).parseComponentValue();
        }),
        (YA.parseValues = function (A) {
            return YA.create(A).parseComponentValues();
        }),
        (YA.prototype.parseComponentValue = function () {
            for (var A = this.consumeToken(); 31 === A.type; ) A = this.consumeToken();
            if (32 === A.type) throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
            this.reconsumeToken(A);
            for (var e = this.consumeComponentValue(); 31 === (A = this.consumeToken()).type; );
            if (32 === A.type) return e;
            throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
        }),
        (YA.prototype.parseComponentValues = function () {
            for (var A = []; ; ) {
                var e = this.consumeComponentValue();
                if (32 === e.type) return A;
                A.push(e), A.push();
            }
        }),
        (YA.prototype.consumeComponentValue = function () {
            var A = this.consumeToken();
            switch (A.type) {
                case 11:
                case 28:
                case 2:
                    return this.consumeSimpleBlock(A.type);
                case 19:
                    return this.consumeFunction(A);
            }
            return A;
        }),
        (YA.prototype.consumeSimpleBlock = function (A) {
            for (var e = { type: A, values: [] }, t = this.consumeToken(); ; ) {
                if (32 === t.type || ce(t, A)) return e;
                this.reconsumeToken(t), e.values.push(this.consumeComponentValue()), (t = this.consumeToken());
            }
        }),
        (YA.prototype.consumeFunction = function (A) {
            for (var e = { name: A.value, values: [], type: 18 }; ; ) {
                var t = this.consumeToken();
                if (32 === t.type || 3 === t.type) return e;
                this.reconsumeToken(t), e.values.push(this.consumeComponentValue());
            }
        }),
        (YA.prototype.consumeToken = function () {
            var A = this._tokens.shift();
            return void 0 === A ? NA : A;
        }),
        (YA.prototype.reconsumeToken = function (A) {
            this._tokens.unshift(A);
        }),
        YA);
    function YA(A) {
        this._tokens = A;
    }
    function WA(A) {
        return 15 === A.type;
    }
    function ZA(A) {
        return 17 === A.type;
    }
    function _A(A) {
        return 20 === A.type;
    }
    function qA(A) {
        return 0 === A.type;
    }
    function jA(A, e) {
        return _A(A) && A.value === e;
    }
    function zA(A) {
        return 31 !== A.type;
    }
    function $A(A) {
        return 31 !== A.type && 4 !== A.type;
    }
    function Ae(A) {
        var e = [],
            t = [];
        return (
            A.forEach(function (A) {
                if (4 === A.type) {
                    if (0 === t.length) throw new Error("Error parsing function args, zero tokens for arg");
                    return e.push(t), void (t = []);
                }
                31 !== A.type && t.push(A);
            }),
            t.length && e.push(t),
            e
        );
    }
    function ee(A) {
        return 17 === A.type || 15 === A.type;
    }
    function te(A) {
        return 16 === A.type || ee(A);
    }
    function re(A) {
        return 1 < A.length ? [A[0], A[1]] : [A[0]];
    }
    function Be(A, e, t) {
        var r = A[0],
            A = A[1];
        return [Ue(r, e), Ue(void 0 !== A ? A : r, t)];
    }
    function ne(A) {
        return 15 === A.type && ("deg" === A.unit || "grad" === A.unit || "rad" === A.unit || "turn" === A.unit);
    }
    function se(A) {
        switch (
            A.filter(_A)
                .map(function (A) {
                    return A.value;
                })
                .join(" ")
        ) {
            case "to bottom right":
            case "to right bottom":
            case "left top":
            case "top left":
                return [ae, ae];
            case "to top":
            case "bottom":
                return Ce(0);
            case "to bottom left":
            case "to left bottom":
            case "right top":
            case "top right":
                return [ae, we];
            case "to right":
            case "left":
                return Ce(90);
            case "to top left":
            case "to left top":
            case "right bottom":
            case "bottom right":
                return [we, we];
            case "to bottom":
            case "top":
                return Ce(180);
            case "to top right":
            case "to right top":
            case "left bottom":
            case "bottom left":
                return [we, ae];
            case "to left":
            case "right":
                return Ce(270);
        }
        return 0;
    }
    function oe(A) {
        return 0 == (255 & A);
    }
    function ie(A) {
        var e = 255 & A,
            t = 255 & (A >> 8),
            r = 255 & (A >> 16),
            A = 255 & (A >> 24);
        return e < 255 ? "rgba(" + A + "," + r + "," + t + "," + e / 255 + ")" : "rgb(" + A + "," + r + "," + t + ")";
    }
    function Qe(A, e) {
        if (17 === A.type) return A.number;
        if (16 !== A.type) return 0;
        var t = 3 === e ? 1 : 255;
        return 3 === e ? (A.number / 100) * t : Math.round((A.number / 100) * t);
    }
    var ce = function (A, e) {
            return (11 === e && 12 === A.type) || (28 === e && 29 === A.type) || (2 === e && 3 === A.type);
        },
        ae = { type: 17, number: 0, flags: 4 },
        ge = { type: 16, number: 50, flags: 4 },
        we = { type: 16, number: 100, flags: 4 },
        Ue = function (A, e) {
            if (16 === A.type) return (A.number / 100) * e;
            if (WA(A))
                switch (A.unit) {
                    case "rem":
                    case "em":
                        return 16 * A.number;
                    default:
                        return A.number;
                }
            return A.number;
        },
        le = function (A, e) {
            if (15 === e.type)
                switch (e.unit) {
                    case "deg":
                        return (Math.PI * e.number) / 180;
                    case "grad":
                        return (Math.PI / 200) * e.number;
                    case "rad":
                        return e.number;
                    case "turn":
                        return 2 * Math.PI * e.number;
                }
            throw new Error("Unsupported angle type");
        },
        Ce = function (A) {
            return (Math.PI * A) / 180;
        },
        ue = function (A, e) {
            if (18 === e.type) {
                var t = me[e.name];
                if (void 0 === t) throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
                return t(A, e.values);
            }
            if (5 === e.type) {
                if (3 === e.value.length) {
                    var r = e.value.substring(0, 1),
                        B = e.value.substring(1, 2),
                        n = e.value.substring(2, 3);
                    return Fe(parseInt(r + r, 16), parseInt(B + B, 16), parseInt(n + n, 16), 1);
                }
                if (4 === e.value.length) {
                    var r = e.value.substring(0, 1),
                        B = e.value.substring(1, 2),
                        n = e.value.substring(2, 3),
                        s = e.value.substring(3, 4);
                    return Fe(parseInt(r + r, 16), parseInt(B + B, 16), parseInt(n + n, 16), parseInt(s + s, 16) / 255);
                }
                if (6 === e.value.length) {
                    (r = e.value.substring(0, 2)), (B = e.value.substring(2, 4)), (n = e.value.substring(4, 6));
                    return Fe(parseInt(r, 16), parseInt(B, 16), parseInt(n, 16), 1);
                }
                if (8 === e.value.length) {
                    (r = e.value.substring(0, 2)), (B = e.value.substring(2, 4)), (n = e.value.substring(4, 6)), (s = e.value.substring(6, 8));
                    return Fe(parseInt(r, 16), parseInt(B, 16), parseInt(n, 16), parseInt(s, 16) / 255);
                }
            }
            if (20 === e.type) {
                e = Le[e.value.toUpperCase()];
                if (void 0 !== e) return e;
            }
            return Le.TRANSPARENT;
        },
        Fe = function (A, e, t, r) {
            return ((A << 24) | (e << 16) | (t << 8) | (Math.round(255 * r) << 0)) >>> 0;
        },
        he = function (A, e) {
            e = e.filter($A);
            if (3 === e.length) {
                var t = e.map(Qe),
                    r = t[0],
                    B = t[1],
                    t = t[2];
                return Fe(r, B, t, 1);
            }
            if (4 !== e.length) return 0;
            (e = e.map(Qe)), (r = e[0]), (B = e[1]), (t = e[2]), (e = e[3]);
            return Fe(r, B, t, e);
        };
    function de(A, e, t) {
        return t < 0 && (t += 1), 1 <= t && --t, t < 1 / 6 ? (e - A) * t * 6 + A : t < 0.5 ? e : t < 2 / 3 ? 6 * (e - A) * (2 / 3 - t) + A : A;
    }
    function fe(A, e) {
        return ue(A, JA.create(e).parseComponentValue());
    }
    function He(A, e) {
        return (A = ue(A, e[0])), (e = e[1]) && te(e) ? { color: A, stop: e } : { color: A, stop: null };
    }
    function pe(A, t) {
        var e = A[0],
            r = A[A.length - 1];
        null === e.stop && (e.stop = ae), null === r.stop && (r.stop = we);
        for (var B = [], n = 0, s = 0; s < A.length; s++) {
            var o = A[s].stop;
            null !== o ? (n < (o = Ue(o, t)) ? B.push(o) : B.push(n), (n = o)) : B.push(null);
        }
        for (var i = null, s = 0; s < B.length; s++) {
            var Q = B[s];
            if (null === Q) null === i && (i = s);
            else if (null !== i) {
                for (var c = s - i, a = (Q - B[i - 1]) / (1 + c), g = 1; g <= c; g++) B[i + g - 1] = a * g;
                i = null;
            }
        }
        return A.map(function (A, e) {
            return { color: A.color, stop: Math.max(Math.min(1, B[e] / t), 0) };
        });
    }
    function Ee(A, e, t) {
        var r = "number" == typeof A ? A : ((s = e / 2), (r = (n = t) / 2), (s = Ue((B = A)[0], e) - s), (n = r - Ue(B[1], n)), (Math.atan2(n, s) + 2 * Math.PI) % (2 * Math.PI)),
            B = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)),
            n = e / 2,
            s = t / 2,
            e = B / 2,
            t = Math.sin(r - Math.PI / 2) * e,
            e = Math.cos(r - Math.PI / 2) * e;
        return [B, n - e, n + e, s - t, s + t];
    }
    function Ie(A, e) {
        return Math.sqrt(A * A + e * e);
    }
    function ye(A, e, B, n, s) {
        return [
            [0, 0],
            [0, e],
            [A, 0],
            [A, e],
        ].reduce(
            function (A, e) {
                var t = e[0],
                    r = e[1],
                    r = Ie(B - t, n - r);
                return (s ? r < A.optimumDistance : r > A.optimumDistance) ? { optimumCorner: e, optimumDistance: r } : A;
            },
            { optimumDistance: s ? 1 / 0 : -1 / 0, optimumCorner: null }
        ).optimumCorner;
    }
    var Ke = function (A, e) {
            var t = e.filter($A),
                r = t[0],
                B = t[1],
                n = t[2],
                e = t[3],
                t = (17 === r.type ? Ce(r.number) : le(A, r)) / (2 * Math.PI),
                A = te(B) ? B.number / 100 : 0,
                r = te(n) ? n.number / 100 : 0,
                B = void 0 !== e && te(e) ? Ue(e, 1) : 1;
            if (0 == A) return Fe(255 * r, 255 * r, 255 * r, 1);
            (n = r <= 0.5 ? r * (1 + A) : r + A - r * A), (e = 2 * r - n), (A = de(e, n, t + 1 / 3)), (r = de(e, n, t)), (t = de(e, n, t - 1 / 3));
            return Fe(255 * A, 255 * r, 255 * t, B);
        },
        me = { hsl: Ke, hsla: Ke, rgb: he, rgba: he },
        Le = {
            ALICEBLUE: 4042850303,
            ANTIQUEWHITE: 4209760255,
            AQUA: 16777215,
            AQUAMARINE: 2147472639,
            AZURE: 4043309055,
            BEIGE: 4126530815,
            BISQUE: 4293182719,
            BLACK: 255,
            BLANCHEDALMOND: 4293643775,
            BLUE: 65535,
            BLUEVIOLET: 2318131967,
            BROWN: 2771004159,
            BURLYWOOD: 3736635391,
            CADETBLUE: 1604231423,
            CHARTREUSE: 2147418367,
            CHOCOLATE: 3530104575,
            CORAL: 4286533887,
            CORNFLOWERBLUE: 1687547391,
            CORNSILK: 4294499583,
            CRIMSON: 3692313855,
            CYAN: 16777215,
            DARKBLUE: 35839,
            DARKCYAN: 9145343,
            DARKGOLDENROD: 3095837695,
            DARKGRAY: 2846468607,
            DARKGREEN: 6553855,
            DARKGREY: 2846468607,
            DARKKHAKI: 3182914559,
            DARKMAGENTA: 2332068863,
            DARKOLIVEGREEN: 1433087999,
            DARKORANGE: 4287365375,
            DARKORCHID: 2570243327,
            DARKRED: 2332033279,
            DARKSALMON: 3918953215,
            DARKSEAGREEN: 2411499519,
            DARKSLATEBLUE: 1211993087,
            DARKSLATEGRAY: 793726975,
            DARKSLATEGREY: 793726975,
            DARKTURQUOISE: 13554175,
            DARKVIOLET: 2483082239,
            DEEPPINK: 4279538687,
            DEEPSKYBLUE: 12582911,
            DIMGRAY: 1768516095,
            DIMGREY: 1768516095,
            DODGERBLUE: 512819199,
            FIREBRICK: 2988581631,
            FLORALWHITE: 4294635775,
            FORESTGREEN: 579543807,
            FUCHSIA: 4278255615,
            GAINSBORO: 3705462015,
            GHOSTWHITE: 4177068031,
            GOLD: 4292280575,
            GOLDENROD: 3668254975,
            GRAY: 2155905279,
            GREEN: 8388863,
            GREENYELLOW: 2919182335,
            GREY: 2155905279,
            HONEYDEW: 4043305215,
            HOTPINK: 4285117695,
            INDIANRED: 3445382399,
            INDIGO: 1258324735,
            IVORY: 4294963455,
            KHAKI: 4041641215,
            LAVENDER: 3873897215,
            LAVENDERBLUSH: 4293981695,
            LAWNGREEN: 2096890111,
            LEMONCHIFFON: 4294626815,
            LIGHTBLUE: 2916673279,
            LIGHTCORAL: 4034953471,
            LIGHTCYAN: 3774873599,
            LIGHTGOLDENRODYELLOW: 4210742015,
            LIGHTGRAY: 3553874943,
            LIGHTGREEN: 2431553791,
            LIGHTGREY: 3553874943,
            LIGHTPINK: 4290167295,
            LIGHTSALMON: 4288707327,
            LIGHTSEAGREEN: 548580095,
            LIGHTSKYBLUE: 2278488831,
            LIGHTSLATEGRAY: 2005441023,
            LIGHTSLATEGREY: 2005441023,
            LIGHTSTEELBLUE: 2965692159,
            LIGHTYELLOW: 4294959359,
            LIME: 16711935,
            LIMEGREEN: 852308735,
            LINEN: 4210091775,
            MAGENTA: 4278255615,
            MAROON: 2147483903,
            MEDIUMAQUAMARINE: 1724754687,
            MEDIUMBLUE: 52735,
            MEDIUMORCHID: 3126187007,
            MEDIUMPURPLE: 2473647103,
            MEDIUMSEAGREEN: 1018393087,
            MEDIUMSLATEBLUE: 2070474495,
            MEDIUMSPRINGGREEN: 16423679,
            MEDIUMTURQUOISE: 1221709055,
            MEDIUMVIOLETRED: 3340076543,
            MIDNIGHTBLUE: 421097727,
            MINTCREAM: 4127193855,
            MISTYROSE: 4293190143,
            MOCCASIN: 4293178879,
            NAVAJOWHITE: 4292783615,
            NAVY: 33023,
            OLDLACE: 4260751103,
            OLIVE: 2155872511,
            OLIVEDRAB: 1804477439,
            ORANGE: 4289003775,
            ORANGERED: 4282712319,
            ORCHID: 3664828159,
            PALEGOLDENROD: 4008225535,
            PALEGREEN: 2566625535,
            PALETURQUOISE: 2951671551,
            PALEVIOLETRED: 3681588223,
            PAPAYAWHIP: 4293907967,
            PEACHPUFF: 4292524543,
            PERU: 3448061951,
            PINK: 4290825215,
            PLUM: 3718307327,
            POWDERBLUE: 2967529215,
            PURPLE: 2147516671,
            REBECCAPURPLE: 1714657791,
            RED: 4278190335,
            ROSYBROWN: 3163525119,
            ROYALBLUE: 1097458175,
            SADDLEBROWN: 2336560127,
            SALMON: 4202722047,
            SANDYBROWN: 4104413439,
            SEAGREEN: 780883967,
            SEASHELL: 4294307583,
            SIENNA: 2689740287,
            SILVER: 3233857791,
            SKYBLUE: 2278484991,
            SLATEBLUE: 1784335871,
            SLATEGRAY: 1887473919,
            SLATEGREY: 1887473919,
            SNOW: 4294638335,
            SPRINGGREEN: 16744447,
            STEELBLUE: 1182971135,
            TAN: 3535047935,
            TEAL: 8421631,
            THISTLE: 3636451583,
            TOMATO: 4284696575,
            TRANSPARENT: 0,
            TURQUOISE: 1088475391,
            VIOLET: 4001558271,
            WHEAT: 4125012991,
            WHITE: 4294967295,
            WHITESMOKE: 4126537215,
            YELLOW: 4294902015,
            YELLOWGREEN: 2597139199,
        },
        be = {
            name: "background-clip",
            initialValue: "border-box",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.map(function (A) {
                    if (_A(A))
                        switch (A.value) {
                            case "padding-box":
                                return 1;
                            case "content-box":
                                return 2;
                        }
                    return 0;
                });
            },
        },
        De = { name: "background-color", initialValue: "transparent", prefix: !1, type: 3, format: "color" },
        Ke = function (t, A) {
            var r = Ce(180),
                B = [];
            return (
                Ae(A).forEach(function (A, e) {
                    if (0 === e) {
                        e = A[0];
                        if (20 === e.type && -1 !== ["top", "left", "right", "bottom"].indexOf(e.value)) return void (r = se(A));
                        if (ne(e)) return void (r = (le(t, e) + Ce(270)) % Ce(360));
                    }
                    A = He(t, A);
                    B.push(A);
                }),
                { angle: r, stops: B, type: 1 }
            );
        },
        ve = "closest-side",
        xe = "farthest-side",
        Me = "closest-corner",
        Se = "farthest-corner",
        Te = "ellipse",
        Ge = "contain",
        he = function (r, A) {
            var B = 0,
                n = 3,
                s = [],
                o = [];
            return (
                Ae(A).forEach(function (A, e) {
                    var t = !0;
                    0 === e
                        ? (t = A.reduce(function (A, e) {
                              if (_A(e))
                                  switch (e.value) {
                                      case "center":
                                          return o.push(ge), !1;
                                      case "top":
                                      case "left":
                                          return o.push(ae), !1;
                                      case "right":
                                      case "bottom":
                                          return o.push(we), !1;
                                  }
                              else if (te(e) || ee(e)) return o.push(e), !1;
                              return A;
                          }, t))
                        : 1 === e &&
                          (t = A.reduce(function (A, e) {
                              if (_A(e))
                                  switch (e.value) {
                                      case "circle":
                                          return (B = 0), !1;
                                      case Te:
                                          return !(B = 1);
                                      case Ge:
                                      case ve:
                                          return (n = 0), !1;
                                      case xe:
                                          return !(n = 1);
                                      case Me:
                                          return !(n = 2);
                                      case "cover":
                                      case Se:
                                          return !(n = 3);
                                  }
                              else if (ee(e) || te(e)) return (n = !Array.isArray(n) ? [] : n).push(e), !1;
                              return A;
                          }, t)),
                        t && ((A = He(r, A)), s.push(A));
                }),
                { size: n, shape: B, stops: s, position: o, type: 2 }
            );
        },
        Oe = function (A, e) {
            if (22 === e.type) {
                var t = { url: e.value, type: 0 };
                return A.cache.addImage(e.value), t;
            }
            if (18 !== e.type) throw new Error("Unsupported image type " + e.type);
            t = ke[e.name];
            if (void 0 === t) throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
            return t(A, e.values);
        };
    var Ve,
        ke = {
            "linear-gradient": function (t, A) {
                var r = Ce(180),
                    B = [];
                return (
                    Ae(A).forEach(function (A, e) {
                        if (0 === e) {
                            e = A[0];
                            if (20 === e.type && "to" === e.value) return void (r = se(A));
                            if (ne(e)) return void (r = le(t, e));
                        }
                        A = He(t, A);
                        B.push(A);
                    }),
                    { angle: r, stops: B, type: 1 }
                );
            },
            "-moz-linear-gradient": Ke,
            "-ms-linear-gradient": Ke,
            "-o-linear-gradient": Ke,
            "-webkit-linear-gradient": Ke,
            "radial-gradient": function (B, A) {
                var n = 0,
                    s = 3,
                    o = [],
                    i = [];
                return (
                    Ae(A).forEach(function (A, e) {
                        var t,
                            r = !0;
                        0 === e &&
                            ((t = !1),
                            (r = A.reduce(function (A, e) {
                                if (t)
                                    if (_A(e))
                                        switch (e.value) {
                                            case "center":
                                                return i.push(ge), A;
                                            case "top":
                                            case "left":
                                                return i.push(ae), A;
                                            case "right":
                                            case "bottom":
                                                return i.push(we), A;
                                        }
                                    else (te(e) || ee(e)) && i.push(e);
                                else if (_A(e))
                                    switch (e.value) {
                                        case "circle":
                                            return (n = 0), !1;
                                        case Te:
                                            return !(n = 1);
                                        case "at":
                                            return !(t = !0);
                                        case ve:
                                            return (s = 0), !1;
                                        case "cover":
                                        case xe:
                                            return !(s = 1);
                                        case Ge:
                                        case Me:
                                            return !(s = 2);
                                        case Se:
                                            return !(s = 3);
                                    }
                                else if (ee(e) || te(e)) return (s = !Array.isArray(s) ? [] : s).push(e), !1;
                                return A;
                            }, r))),
                            r && ((A = He(B, A)), o.push(A));
                    }),
                    { size: s, shape: n, stops: o, position: i, type: 2 }
                );
            },
            "-moz-radial-gradient": he,
            "-ms-radial-gradient": he,
            "-o-radial-gradient": he,
            "-webkit-radial-gradient": he,
            "-webkit-gradient": function (r, A) {
                var e = Ce(180),
                    B = [],
                    n = 1;
                return (
                    Ae(A).forEach(function (A, e) {
                        var t,
                            A = A[0];
                        if (0 === e) {
                            if (_A(A) && "linear" === A.value) return void (n = 1);
                            if (_A(A) && "radial" === A.value) return void (n = 2);
                        }
                        18 === A.type && ("from" === A.name ? ((t = ue(r, A.values[0])), B.push({ stop: ae, color: t })) : "to" === A.name ? ((t = ue(r, A.values[0])), B.push({ stop: we, color: t })) : "color-stop" !== A.name || (2 === (A = A.values.filter($A)).length && ((t = ue(r, A[1])), (A = A[0]), ZA(A) && B.push({ stop: { type: 16, number: 100 * A.number, flags: A.flags }, color: t }))));
                    }),
                    1 === n ? { angle: (e + Ce(180)) % Ce(360), stops: B, type: n } : { size: 3, shape: 0, stops: B, position: [], type: n }
                );
            },
        },
        Re = {
            name: "background-image",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (e, A) {
                if (0 === A.length) return [];
                var t = A[0];
                return 20 === t.type && "none" === t.value
                    ? []
                    : A.filter(function (A) {
                          return $A(A) && !((20 === (A = A).type && "none" === A.value) || (18 === A.type && !ke[A.name]));
                      }).map(function (A) {
                          return Oe(e, A);
                      });
            },
        },
        Ne = {
            name: "background-origin",
            initialValue: "border-box",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.map(function (A) {
                    if (_A(A))
                        switch (A.value) {
                            case "padding-box":
                                return 1;
                            case "content-box":
                                return 2;
                        }
                    return 0;
                });
            },
        },
        Pe = {
            name: "background-position",
            initialValue: "0% 0%",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
                return Ae(e)
                    .map(function (A) {
                        return A.filter(te);
                    })
                    .map(re);
            },
        },
        Xe = {
            name: "background-repeat",
            initialValue: "repeat",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return Ae(e)
                    .map(function (A) {
                        return A.filter(_A)
                            .map(function (A) {
                                return A.value;
                            })
                            .join(" ");
                    })
                    .map(Je);
            },
        },
        Je = function (A) {
            switch (A) {
                case "no-repeat":
                    return 1;
                case "repeat-x":
                case "repeat no-repeat":
                    return 2;
                case "repeat-y":
                case "no-repeat repeat":
                    return 3;
                default:
                    return 0;
            }
        };
    ((he = Ve = Ve || {}).AUTO = "auto"), (he.CONTAIN = "contain");
    function Ye(A, e) {
        return _A(A) && "normal" === A.value ? 1.2 * e : 17 === A.type ? e * A.number : te(A) ? Ue(A, e) : e;
    }
    var We,
        Ze,
        _e = {
            name: "background-size",
            initialValue: "0",
            prefix: !(he.COVER = "cover"),
            type: 1,
            parse: function (A, e) {
                return Ae(e).map(function (A) {
                    return A.filter(qe);
                });
            },
        },
        qe = function (A) {
            return _A(A) || te(A);
        },
        he = function (A) {
            return { name: "border-" + A + "-color", initialValue: "transparent", prefix: !1, type: 3, format: "color" };
        },
        je = he("top"),
        ze = he("right"),
        $e = he("bottom"),
        At = he("left"),
        he = function (A) {
            return {
                name: "border-radius-" + A,
                initialValue: "0 0",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                    return re(e.filter(te));
                },
            };
        },
        et = he("top-left"),
        tt = he("top-right"),
        rt = he("bottom-right"),
        Bt = he("bottom-left"),
        he = function (A) {
            return {
                name: "border-" + A + "-style",
                initialValue: "solid",
                prefix: !1,
                type: 2,
                parse: function (A, e) {
                    switch (e) {
                        case "none":
                            return 0;
                        case "dashed":
                            return 2;
                        case "dotted":
                            return 3;
                        case "double":
                            return 4;
                    }
                    return 1;
                },
            };
        },
        nt = he("top"),
        st = he("right"),
        ot = he("bottom"),
        it = he("left"),
        he = function (A) {
            return {
                name: "border-" + A + "-width",
                initialValue: "0",
                type: 0,
                prefix: !1,
                parse: function (A, e) {
                    return WA(e) ? e.number : 0;
                },
            };
        },
        Qt = he("top"),
        ct = he("right"),
        at = he("bottom"),
        gt = he("left"),
        wt = { name: "color", initialValue: "transparent", prefix: !1, type: 3, format: "color" },
        Ut = {
            name: "direction",
            initialValue: "ltr",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                return "rtl" !== e ? 0 : 1;
            },
        },
        lt = {
            name: "display",
            initialValue: "inline-block",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.filter(_A).reduce(function (A, e) {
                    return A | Ct(e.value);
                }, 0);
            },
        },
        Ct = function (A) {
            switch (A) {
                case "block":
                case "-webkit-box":
                    return 2;
                case "inline":
                    return 4;
                case "run-in":
                    return 8;
                case "flow":
                    return 16;
                case "flow-root":
                    return 32;
                case "table":
                    return 64;
                case "flex":
                case "-webkit-flex":
                    return 128;
                case "grid":
                case "-ms-grid":
                    return 256;
                case "ruby":
                    return 512;
                case "subgrid":
                    return 1024;
                case "list-item":
                    return 2048;
                case "table-row-group":
                    return 4096;
                case "table-header-group":
                    return 8192;
                case "table-footer-group":
                    return 16384;
                case "table-row":
                    return 32768;
                case "table-cell":
                    return 65536;
                case "table-column-group":
                    return 131072;
                case "table-column":
                    return 262144;
                case "table-caption":
                    return 524288;
                case "ruby-base":
                    return 1048576;
                case "ruby-text":
                    return 2097152;
                case "ruby-base-container":
                    return 4194304;
                case "ruby-text-container":
                    return 8388608;
                case "contents":
                    return 16777216;
                case "inline-block":
                    return 33554432;
                case "inline-list-item":
                    return 67108864;
                case "inline-table":
                    return 134217728;
                case "inline-flex":
                    return 268435456;
                case "inline-grid":
                    return 536870912;
            }
            return 0;
        },
        ut = {
            name: "float",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "left":
                        return 1;
                    case "right":
                        return 2;
                    case "inline-start":
                        return 3;
                    case "inline-end":
                        return 4;
                }
                return 0;
            },
        },
        Ft = {
            name: "letter-spacing",
            initialValue: "0",
            prefix: !1,
            type: 0,
            parse: function (A, e) {
                return !((20 === e.type && "normal" === e.value) || (17 !== e.type && 15 !== e.type)) ? e.number : 0;
            },
        },
        ht = {
            name: "line-break",
            initialValue: ((he = We = We || {}).NORMAL = "normal"),
            prefix: !(he.STRICT = "strict"),
            type: 2,
            parse: function (A, e) {
                return "strict" !== e ? We.NORMAL : We.STRICT;
            },
        },
        dt = { name: "line-height", initialValue: "normal", prefix: !1, type: 4 },
        ft = {
            name: "list-style-image",
            initialValue: "none",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return 20 === e.type && "none" === e.value ? null : Oe(A, e);
            },
        },
        Ht = {
            name: "list-style-position",
            initialValue: "outside",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                return "inside" !== e ? 1 : 0;
            },
        },
        pt = {
            name: "list-style-type",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "disc":
                        return 0;
                    case "circle":
                        return 1;
                    case "square":
                        return 2;
                    case "decimal":
                        return 3;
                    case "cjk-decimal":
                        return 4;
                    case "decimal-leading-zero":
                        return 5;
                    case "lower-roman":
                        return 6;
                    case "upper-roman":
                        return 7;
                    case "lower-greek":
                        return 8;
                    case "lower-alpha":
                        return 9;
                    case "upper-alpha":
                        return 10;
                    case "arabic-indic":
                        return 11;
                    case "armenian":
                        return 12;
                    case "bengali":
                        return 13;
                    case "cambodian":
                        return 14;
                    case "cjk-earthly-branch":
                        return 15;
                    case "cjk-heavenly-stem":
                        return 16;
                    case "cjk-ideographic":
                        return 17;
                    case "devanagari":
                        return 18;
                    case "ethiopic-numeric":
                        return 19;
                    case "georgian":
                        return 20;
                    case "gujarati":
                        return 21;
                    case "gurmukhi":
                    case "hebrew":
                        return 22;
                    case "hiragana":
                        return 23;
                    case "hiragana-iroha":
                        return 24;
                    case "japanese-formal":
                        return 25;
                    case "japanese-informal":
                        return 26;
                    case "kannada":
                        return 27;
                    case "katakana":
                        return 28;
                    case "katakana-iroha":
                        return 29;
                    case "khmer":
                        return 30;
                    case "korean-hangul-formal":
                        return 31;
                    case "korean-hanja-formal":
                        return 32;
                    case "korean-hanja-informal":
                        return 33;
                    case "lao":
                        return 34;
                    case "lower-armenian":
                        return 35;
                    case "malayalam":
                        return 36;
                    case "mongolian":
                        return 37;
                    case "myanmar":
                        return 38;
                    case "oriya":
                        return 39;
                    case "persian":
                        return 40;
                    case "simp-chinese-formal":
                        return 41;
                    case "simp-chinese-informal":
                        return 42;
                    case "tamil":
                        return 43;
                    case "telugu":
                        return 44;
                    case "thai":
                        return 45;
                    case "tibetan":
                        return 46;
                    case "trad-chinese-formal":
                        return 47;
                    case "trad-chinese-informal":
                        return 48;
                    case "upper-armenian":
                        return 49;
                    case "disclosure-open":
                        return 50;
                    case "disclosure-closed":
                        return 51;
                    default:
                        return -1;
                }
            },
        },
        he = function (A) {
            return { name: "margin-" + A, initialValue: "0", prefix: !1, type: 4 };
        },
        Et = he("top"),
        It = he("right"),
        yt = he("bottom"),
        Kt = he("left"),
        mt = {
            name: "overflow",
            initialValue: "visible",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.filter(_A).map(function (A) {
                    switch (A.value) {
                        case "hidden":
                            return 1;
                        case "scroll":
                            return 2;
                        case "clip":
                            return 3;
                        case "auto":
                            return 4;
                        default:
                            return 0;
                    }
                });
            },
        },
        Lt = {
            name: "overflow-wrap",
            initialValue: "normal",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                return "break-word" !== e ? "normal" : "break-word";
            },
        },
        he = function (A) {
            return { name: "padding-" + A, initialValue: "0", prefix: !1, type: 3, format: "length-percentage" };
        },
        bt = he("top"),
        Dt = he("right"),
        vt = he("bottom"),
        xt = he("left"),
        Mt = {
            name: "text-align",
            initialValue: "left",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "right":
                        return 2;
                    case "center":
                    case "justify":
                        return 1;
                    default:
                        return 0;
                }
            },
        },
        St = {
            name: "position",
            initialValue: "static",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "relative":
                        return 1;
                    case "absolute":
                        return 2;
                    case "fixed":
                        return 3;
                    case "sticky":
                        return 4;
                }
                return 0;
            },
        },
        Tt = {
            name: "text-shadow",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (n, A) {
                return 1 === A.length && jA(A[0], "none")
                    ? []
                    : Ae(A).map(function (A) {
                          for (var e = { color: Le.TRANSPARENT, offsetX: ae, offsetY: ae, blur: ae }, t = 0, r = 0; r < A.length; r++) {
                              var B = A[r];
                              ee(B) ? (0 === t ? (e.offsetX = B) : 1 === t ? (e.offsetY = B) : (e.blur = B), t++) : (e.color = ue(n, B));
                          }
                          return e;
                      });
            },
        },
        Gt = {
            name: "text-transform",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "uppercase":
                        return 2;
                    case "lowercase":
                        return 1;
                    case "capitalize":
                        return 3;
                }
                return 0;
            },
        },
        Ot = {
            name: "transform",
            initialValue: "none",
            prefix: !0,
            type: 0,
            parse: function (A, e) {
                if (20 === e.type && "none" === e.value) return null;
                if (18 !== e.type) return null;
                var t = Vt[e.name];
                if (void 0 === t) throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
                return t(e.values);
            },
        },
        Vt = {
            matrix: function (A) {
                A = A.filter(function (A) {
                    return 17 === A.type;
                }).map(function (A) {
                    return A.number;
                });
                return 6 === A.length ? A : null;
            },
            matrix3d: function (A) {
                var e = A.filter(function (A) {
                        return 17 === A.type;
                    }).map(function (A) {
                        return A.number;
                    }),
                    t = e[0],
                    r = e[1];
                e[2], e[3];
                var B = e[4],
                    n = e[5];
                e[6], e[7], e[8], e[9], e[10], e[11];
                var s = e[12],
                    A = e[13];
                return e[14], e[15], 16 === e.length ? [t, r, B, n, s, A] : null;
            },
        },
        he = { type: 16, number: 50, flags: 4 },
        kt = [he, he],
        Rt = {
            name: "transform-origin",
            initialValue: "50% 50%",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                e = e.filter(te);
                return 2 !== e.length ? kt : [e[0], e[1]];
            },
        },
        Nt = {
            name: "visible",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "hidden":
                        return 1;
                    case "collapse":
                        return 2;
                    default:
                        return 0;
                }
            },
        };
    ((he = Ze = Ze || {}).NORMAL = "normal"), (he.BREAK_ALL = "break-all");
    function Pt(A, e) {
        return 0 != (A & e);
    }
    function Xt(A, e, t) {
        return (A = A && A[Math.min(e, A.length - 1)]) ? (t ? A.open : A.close) : "";
    }
    var Jt = {
            name: "word-break",
            initialValue: "normal",
            prefix: !(he.KEEP_ALL = "keep-all"),
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "break-all":
                        return Ze.BREAK_ALL;
                    case "keep-all":
                        return Ze.KEEP_ALL;
                    default:
                        return Ze.NORMAL;
                }
            },
        },
        Yt = {
            name: "z-index",
            initialValue: "auto",
            prefix: !1,
            type: 0,
            parse: function (A, e) {
                if (20 === e.type) return { auto: !0, order: 0 };
                if (ZA(e)) return { auto: !1, order: e.number };
                throw new Error("Invalid z-index number parsed");
            },
        },
        Wt = function (A, e) {
            if (15 === e.type)
                switch (e.unit.toLowerCase()) {
                    case "s":
                        return 1e3 * e.number;
                    case "ms":
                        return e.number;
                }
            throw new Error("Unsupported time type");
        },
        Zt = {
            name: "opacity",
            initialValue: "1",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return ZA(e) ? e.number : 1;
            },
        },
        _t = { name: "text-decoration-color", initialValue: "transparent", prefix: !1, type: 3, format: "color" },
        qt = {
            name: "text-decoration-line",
            initialValue: "none",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e
                    .filter(_A)
                    .map(function (A) {
                        switch (A.value) {
                            case "underline":
                                return 1;
                            case "overline":
                                return 2;
                            case "line-through":
                                return 3;
                            case "none":
                                return 4;
                        }
                        return 0;
                    })
                    .filter(function (A) {
                        return 0 !== A;
                    });
            },
        },
        jt = {
            name: "font-family",
            initialValue: "",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                var t = [],
                    r = [];
                return (
                    e.forEach(function (A) {
                        switch (A.type) {
                            case 20:
                            case 0:
                                t.push(A.value);
                                break;
                            case 17:
                                t.push(A.number.toString());
                                break;
                            case 4:
                                r.push(t.join(" ")), (t.length = 0);
                        }
                    }),
                    t.length && r.push(t.join(" ")),
                    r.map(function (A) {
                        return -1 === A.indexOf(" ") ? A : "'" + A + "'";
                    })
                );
            },
        },
        zt = { name: "font-size", initialValue: "0", prefix: !1, type: 3, format: "length" },
        $t = {
            name: "font-weight",
            initialValue: "normal",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return ZA(e) ? e.number : !_A(e) || "bold" !== e.value ? 400 : 700;
            },
        },
        Ar = {
            name: "font-variant",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
                return e.filter(_A).map(function (A) {
                    return A.value;
                });
            },
        },
        er = {
            name: "font-style",
            initialValue: "normal",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "oblique":
                        return "oblique";
                    case "italic":
                        return "italic";
                    default:
                        return "normal";
                }
            },
        },
        tr = {
            name: "content",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
                if (0 === e.length) return [];
                var t = e[0];
                return 20 === t.type && "none" === t.value ? [] : e;
            },
        },
        rr = {
            name: "counter-increment",
            initialValue: "none",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                if (0 === e.length) return null;
                var t = e[0];
                if (20 === t.type && "none" === t.value) return null;
                for (var r = [], B = e.filter(zA), n = 0; n < B.length; n++) {
                    var s = B[n],
                        o = B[n + 1];
                    20 === s.type && ((o = o && ZA(o) ? o.number : 1), r.push({ counter: s.value, increment: o }));
                }
                return r;
            },
        },
        Br = {
            name: "counter-reset",
            initialValue: "none",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                if (0 === e.length) return [];
                for (var t = [], r = e.filter(zA), B = 0; B < r.length; B++) {
                    var n = r[B],
                        s = r[B + 1];
                    _A(n) && "none" !== n.value && ((s = s && ZA(s) ? s.number : 0), t.push({ counter: n.value, reset: s }));
                }
                return t;
            },
        },
        nr = {
            name: "duration",
            initialValue: "0s",
            prefix: !1,
            type: 1,
            parse: function (e, A) {
                return A.filter(WA).map(function (A) {
                    return Wt(e, A);
                });
            },
        },
        sr = {
            name: "quotes",
            initialValue: "none",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                if (0 === e.length) return null;
                var t = e[0];
                if (20 === t.type && "none" === t.value) return null;
                var r = [],
                    B = e.filter(qA);
                if (B.length % 2 != 0) return null;
                for (var n = 0; n < B.length; n += 2) {
                    var s = B[n].value,
                        o = B[n + 1].value;
                    r.push({ open: s, close: o });
                }
                return r;
            },
        },
        or = {
            name: "box-shadow",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (n, A) {
                return 1 === A.length && jA(A[0], "none")
                    ? []
                    : Ae(A).map(function (A) {
                          for (var e = { color: 255, offsetX: ae, offsetY: ae, blur: ae, spread: ae, inset: !1 }, t = 0, r = 0; r < A.length; r++) {
                              var B = A[r];
                              jA(B, "inset") ? (e.inset = !0) : ee(B) ? (0 === t ? (e.offsetX = B) : 1 === t ? (e.offsetY = B) : 2 === t ? (e.blur = B) : (e.spread = B), t++) : (e.color = ue(n, B));
                          }
                          return e;
                      });
            },
        },
        ir = {
            name: "paint-order",
            initialValue: "normal",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                var t = [];
                return (
                    e.filter(_A).forEach(function (A) {
                        switch (A.value) {
                            case "stroke":
                                t.push(1);
                                break;
                            case "fill":
                                t.push(0);
                                break;
                            case "markers":
                                t.push(2);
                        }
                    }),
                    [0, 1, 2].forEach(function (A) {
                        -1 === t.indexOf(A) && t.push(A);
                    }),
                    t
                );
            },
        },
        Qr = { name: "-webkit-text-stroke-color", initialValue: "currentcolor", prefix: !1, type: 3, format: "color" },
        cr = {
            name: "-webkit-text-stroke-width",
            initialValue: "0",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return WA(e) ? e.number : 0;
            },
        },
        ar =
            ((gr.prototype.isVisible = function () {
                return 0 < this.display && 0 < this.opacity && 0 === this.visibility;
            }),
            (gr.prototype.isTransparent = function () {
                return oe(this.backgroundColor);
            }),
            (gr.prototype.isTransformed = function () {
                return null !== this.transform;
            }),
            (gr.prototype.isPositioned = function () {
                return 0 !== this.position;
            }),
            (gr.prototype.isPositionedWithZIndex = function () {
                return this.isPositioned() && !this.zIndex.auto;
            }),
            (gr.prototype.isFloating = function () {
                return 0 !== this.float;
            }),
            (gr.prototype.isInlineLevel = function () {
                return Pt(this.display, 4) || Pt(this.display, 33554432) || Pt(this.display, 268435456) || Pt(this.display, 536870912) || Pt(this.display, 67108864) || Pt(this.display, 134217728);
            }),
            gr);
    function gr(A, e) {
        (this.animationDuration = lr(A, nr, e.animationDuration)),
            (this.backgroundClip = lr(A, be, e.backgroundClip)),
            (this.backgroundColor = lr(A, De, e.backgroundColor)),
            (this.backgroundImage = lr(A, Re, e.backgroundImage)),
            (this.backgroundOrigin = lr(A, Ne, e.backgroundOrigin)),
            (this.backgroundPosition = lr(A, Pe, e.backgroundPosition)),
            (this.backgroundRepeat = lr(A, Xe, e.backgroundRepeat)),
            (this.backgroundSize = lr(A, _e, e.backgroundSize)),
            (this.borderTopColor = lr(A, je, e.borderTopColor)),
            (this.borderRightColor = lr(A, ze, e.borderRightColor)),
            (this.borderBottomColor = lr(A, $e, e.borderBottomColor)),
            (this.borderLeftColor = lr(A, At, e.borderLeftColor)),
            (this.borderTopLeftRadius = lr(A, et, e.borderTopLeftRadius)),
            (this.borderTopRightRadius = lr(A, tt, e.borderTopRightRadius)),
            (this.borderBottomRightRadius = lr(A, rt, e.borderBottomRightRadius)),
            (this.borderBottomLeftRadius = lr(A, Bt, e.borderBottomLeftRadius)),
            (this.borderTopStyle = lr(A, nt, e.borderTopStyle)),
            (this.borderRightStyle = lr(A, st, e.borderRightStyle)),
            (this.borderBottomStyle = lr(A, ot, e.borderBottomStyle)),
            (this.borderLeftStyle = lr(A, it, e.borderLeftStyle)),
            (this.borderTopWidth = lr(A, Qt, e.borderTopWidth)),
            (this.borderRightWidth = lr(A, ct, e.borderRightWidth)),
            (this.borderBottomWidth = lr(A, at, e.borderBottomWidth)),
            (this.borderLeftWidth = lr(A, gt, e.borderLeftWidth)),
            (this.boxShadow = lr(A, or, e.boxShadow)),
            (this.color = lr(A, wt, e.color)),
            (this.direction = lr(A, Ut, e.direction)),
            (this.display = lr(A, lt, e.display)),
            (this.float = lr(A, ut, e.cssFloat)),
            (this.fontFamily = lr(A, jt, e.fontFamily)),
            (this.fontSize = lr(A, zt, e.fontSize)),
            (this.fontStyle = lr(A, er, e.fontStyle)),
            (this.fontVariant = lr(A, Ar, e.fontVariant)),
            (this.fontWeight = lr(A, $t, e.fontWeight)),
            (this.letterSpacing = lr(A, Ft, e.letterSpacing)),
            (this.lineBreak = lr(A, ht, e.lineBreak)),
            (this.lineHeight = lr(A, dt, e.lineHeight)),
            (this.listStyleImage = lr(A, ft, e.listStyleImage)),
            (this.listStylePosition = lr(A, Ht, e.listStylePosition)),
            (this.listStyleType = lr(A, pt, e.listStyleType)),
            (this.marginTop = lr(A, Et, e.marginTop)),
            (this.marginRight = lr(A, It, e.marginRight)),
            (this.marginBottom = lr(A, yt, e.marginBottom)),
            (this.marginLeft = lr(A, Kt, e.marginLeft)),
            (this.opacity = lr(A, Zt, e.opacity));
        var t = lr(A, mt, e.overflow);
        (this.overflowX = t[0]),
            (this.overflowY = t[1 < t.length ? 1 : 0]),
            (this.overflowWrap = lr(A, Lt, e.overflowWrap)),
            (this.paddingTop = lr(A, bt, e.paddingTop)),
            (this.paddingRight = lr(A, Dt, e.paddingRight)),
            (this.paddingBottom = lr(A, vt, e.paddingBottom)),
            (this.paddingLeft = lr(A, xt, e.paddingLeft)),
            (this.paintOrder = lr(A, ir, e.paintOrder)),
            (this.position = lr(A, St, e.position)),
            (this.textAlign = lr(A, Mt, e.textAlign)),
            (this.textDecorationColor = lr(A, _t, null !== (t = e.textDecorationColor) && void 0 !== t ? t : e.color)),
            (this.textDecorationLine = lr(A, qt, null !== (t = e.textDecorationLine) && void 0 !== t ? t : e.textDecoration)),
            (this.textShadow = lr(A, Tt, e.textShadow)),
            (this.textTransform = lr(A, Gt, e.textTransform)),
            (this.transform = lr(A, Ot, e.transform)),
            (this.transformOrigin = lr(A, Rt, e.transformOrigin)),
            (this.visibility = lr(A, Nt, e.visibility)),
            (this.webkitTextStrokeColor = lr(A, Qr, e.webkitTextStrokeColor)),
            (this.webkitTextStrokeWidth = lr(A, cr, e.webkitTextStrokeWidth)),
            (this.wordBreak = lr(A, Jt, e.wordBreak)),
            (this.zIndex = lr(A, Yt, e.zIndex));
    }
    for (
        var wr = function (A, e) {
                (this.content = lr(A, tr, e.content)), (this.quotes = lr(A, sr, e.quotes));
            },
            Ur = function (A, e) {
                (this.counterIncrement = lr(A, rr, e.counterIncrement)), (this.counterReset = lr(A, Br, e.counterReset));
            },
            lr = function (A, e, t) {
                var r = new PA(),
                    t = null != t ? t.toString() : e.initialValue;
                r.write(t);
                var B = new JA(r.read());
                switch (e.type) {
                    case 2:
                        var n = B.parseComponentValue();
                        return e.parse(A, _A(n) ? n.value : e.initialValue);
                    case 0:
                        return e.parse(A, B.parseComponentValue());
                    case 1:
                        return e.parse(A, B.parseComponentValues());
                    case 4:
                        return B.parseComponentValue();
                    case 3:
                        switch (e.format) {
                            case "angle":
                                return le(A, B.parseComponentValue());
                            case "color":
                                return ue(A, B.parseComponentValue());
                            case "image":
                                return Oe(A, B.parseComponentValue());
                            case "length":
                                var s = B.parseComponentValue();
                                return ee(s) ? s : ae;
                            case "length-percentage":
                                s = B.parseComponentValue();
                                return te(s) ? s : ae;
                            case "time":
                                return Wt(A, B.parseComponentValue());
                        }
                }
            },
            Cr = function (A, e) {
                A = (function (A) {
                    switch (A.getAttribute("data-html2canvas-debug")) {
                        case "all":
                            return 1;
                        case "clone":
                            return 2;
                        case "parse":
                            return 3;
                        case "render":
                            return 4;
                        default:
                            return 0;
                    }
                })(A);
                return 1 === A || e === A;
            },
            ur = function (A, e) {
                (this.context = A),
                    (this.textNodes = []),
                    (this.elements = []),
                    (this.flags = 0),
                    Cr(e, 3),
                    (this.styles = new ar(A, window.getComputedStyle(e, null))),
                    JB(e) &&
                        (this.styles.animationDuration.some(function (A) {
                            return 0 < A;
                        }) && (e.style.animationDuration = "0s"),
                        null !== this.styles.transform && (e.style.transform = "none")),
                    (this.bounds = f(this.context, e)),
                    Cr(e, 4) && (this.flags |= 16);
            },
            Fr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            hr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            dr = 0;
        dr < Fr.length;
        dr++
    )
        hr[Fr.charCodeAt(dr)] = dr;
    function fr(A, e, t) {
        return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
    }
    var Hr =
        ((pr.prototype.get = function (A) {
            var e;
            if (0 <= A) {
                if (A < 55296 || (56319 < A && A <= 65535)) return (e = this.index[A >> 5]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 65535) return (e = this.index[2048 + ((A - 55296) >> 5)]), this.data[(e = (e << 2) + (31 & A))];
                if (A < this.highStart) return (e = this.index[(e = 2080 + (A >> 11))]), (e = this.index[(e += (A >> 5) & 63)]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 1114111) return this.data[this.highValueIndex];
            }
            return this.errorValue;
        }),
        pr);
    function pr(A, e, t, r, B, n) {
        (this.initialValue = A), (this.errorValue = e), (this.highStart = t), (this.highValueIndex = r), (this.index = B), (this.data = n);
    }
    for (var Er = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ir = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), yr = 0; yr < Er.length; yr++) Ir[Er.charCodeAt(yr)] = yr;
    function Kr(A) {
        return kr.get(A);
    }
    function mr(A) {
        var t = (function (A) {
                for (var e = [], t = 0, r = A.length; t < r; ) {
                    var B,
                        n = A.charCodeAt(t++);
                    55296 <= n && n <= 56319 && t < r ? (56320 == (64512 & (B = A.charCodeAt(t++))) ? e.push(((1023 & n) << 10) + (1023 & B) + 65536) : (e.push(n), t--)) : e.push(n);
                }
                return e;
            })(A),
            r = t.length,
            B = 0,
            n = 0,
            s = t.map(Kr);
        return {
            next: function () {
                if (r <= B) return { done: !0, value: null };
                for (
                    var A = Rr;
                    B < r &&
                    (A = (function (A, e) {
                        var t = e - 2,
                            r = A[t],
                            B = A[e - 1],
                            e = A[e];
                        if (2 === B && 3 === e) return Rr;
                        if (2 === B || 3 === B || 4 === B) return "÷";
                        if (2 === e || 3 === e || 4 === e) return "÷";
                        if (B === Tr && -1 !== [Tr, Gr, Or, Vr].indexOf(e)) return Rr;
                        if (!((B !== Or && B !== Gr) || (e !== Gr && 10 !== e))) return Rr;
                        if ((B === Vr || 10 === B) && 10 === e) return Rr;
                        if (13 === e || 5 === e) return Rr;
                        if (7 === e) return Rr;
                        if (1 === B) return Rr;
                        if (13 === B && 14 === e) {
                            for (; 5 === r; ) r = A[--t];
                            if (14 === r) return Rr;
                        }
                        if (15 === B && 15 === e) {
                            for (var n = 0; 15 === r; ) n++, (r = A[--t]);
                            if (n % 2 == 0) return Rr;
                        }
                        return "÷";
                    })(s, ++B)) === Rr;

                );
                if (A === Rr && B !== r) return { done: !0, value: null };
                var e = function () {
                    for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                    if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
                    var t = A.length;
                    if (!t) return "";
                    for (var r = [], B = -1, n = ""; ++B < t; ) {
                        var s = A[B];
                        s <= 65535 ? r.push(s) : ((s -= 65536), r.push(55296 + (s >> 10), (s % 1024) + 56320)), (B + 1 === t || 16384 < r.length) && ((n += String.fromCharCode.apply(String, r)), (r.length = 0));
                    }
                    return n;
                }.apply(null, t.slice(n, B));
                return (n = B), { value: e, done: !1 };
            },
        };
    }
    function Lr(A) {
        return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
    }
    var br,
        Dr,
        vr,
        xr,
        Mr,
        Sr,
        Tr = 8,
        Gr = 9,
        Or = 11,
        Vr = 12,
        kr =
            ((vr = (function (A) {
                var e,
                    t,
                    r,
                    B,
                    n = 0.75 * A.length,
                    s = A.length,
                    o = 0;
                "=" === A[A.length - 1] && (n--, "=" === A[A.length - 2] && n--);
                for (var n = new ("undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? ArrayBuffer : Array)(n), i = Array.isArray(n) ? n : new Uint8Array(n), Q = 0; Q < s; Q += 4)
                    (e = hr[A.charCodeAt(Q)]), (t = hr[A.charCodeAt(Q + 1)]), (r = hr[A.charCodeAt(Q + 2)]), (B = hr[A.charCodeAt(Q + 3)]), (i[o++] = (e << 2) | (t >> 4)), (i[o++] = ((15 & t) << 4) | (r >> 2)), (i[o++] = ((3 & r) << 6) | (63 & B));
                return n;
            })(
                (br =
                    "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=")
            )),
            (xr = Array.isArray(vr)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 4) t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
                      return t;
                  })(vr)
                : new Uint32Array(vr)),
            (Mr = Array.isArray(vr)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 2) t.push((A[r + 1] << 8) | A[r]);
                      return t;
                  })(vr)
                : new Uint16Array(vr)),
            (br = fr(Mr, 12, xr[4] / 2)),
            (Dr = 2 === xr[5] ? fr(Mr, (24 + xr[4]) / 2) : ((vr = xr), (Mr = Math.ceil((24 + xr[4]) / 4)), vr.slice ? vr.slice(Mr, Dr) : new Uint32Array(Array.prototype.slice.call(vr, Mr, Dr)))),
            new Hr(xr[0], xr[1], xr[2], xr[3], br, Dr)),
        Rr = "×",
        Nr = function (A, e, t, r, B) {
            var n = "http://www.w3.org/2000/svg",
                s = document.createElementNS(n, "svg"),
                n = document.createElementNS(n, "foreignObject");
            return s.setAttributeNS(null, "width", A.toString()), s.setAttributeNS(null, "height", e.toString()), n.setAttributeNS(null, "width", "100%"), n.setAttributeNS(null, "height", "100%"), n.setAttributeNS(null, "x", t.toString()), n.setAttributeNS(null, "y", r.toString()), n.setAttributeNS(null, "externalResourcesRequired", "true"), s.appendChild(n), n.appendChild(B), s;
        },
        Pr = function (r) {
            return new Promise(function (A, e) {
                var t = new Image();
                (t.onload = function () {
                    return A(t);
                }),
                    (t.onerror = e),
                    (t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(r)));
            });
        },
        Xr = {
            get SUPPORT_RANGE_BOUNDS() {
                var A = (function (A) {
                    if (A.createRange) {
                        var e = A.createRange();
                        if (e.getBoundingClientRect) {
                            var t = A.createElement("boundtest");
                            (t.style.height = "123px"), (t.style.display = "block"), A.body.appendChild(t), e.selectNode(t);
                            (e = e.getBoundingClientRect()), (e = Math.round(e.height));
                            if ((A.body.removeChild(t), 123 === e)) return !0;
                        }
                    }
                    return !1;
                })(document);
                return Object.defineProperty(Xr, "SUPPORT_RANGE_BOUNDS", { value: A }), A;
            },
            get SUPPORT_WORD_BREAKING() {
                var A =
                    Xr.SUPPORT_RANGE_BOUNDS &&
                    (function (A) {
                        var e = A.createElement("boundtest");
                        (e.style.width = "50px"), (e.style.display = "block"), (e.style.fontSize = "12px"), (e.style.letterSpacing = "0px"), (e.style.wordSpacing = "0px"), A.body.appendChild(e);
                        var r = A.createRange();
                        e.innerHTML = "function" == typeof "".repeat ? "&#128104;".repeat(10) : "";
                        var B = e.firstChild,
                            t = Q(B.data).map(function (A) {
                                return g(A);
                            }),
                            n = 0,
                            s = {},
                            t = t.every(function (A, e) {
                                r.setStart(B, n), r.setEnd(B, n + A.length);
                                var t = r.getBoundingClientRect();
                                n += A.length;
                                A = t.x > s.x || t.y > s.y;
                                return (s = t), 0 === e || A;
                            });
                        return A.body.removeChild(e), t;
                    })(document);
                return Object.defineProperty(Xr, "SUPPORT_WORD_BREAKING", { value: A }), A;
            },
            get SUPPORT_SVG_DRAWING() {
                var A = (function (A) {
                    var e = new Image(),
                        t = A.createElement("canvas"),
                        A = t.getContext("2d");
                    if (!A) return !1;
                    e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                    try {
                        A.drawImage(e, 0, 0), t.toDataURL();
                    } catch (A) {
                        return !1;
                    }
                    return !0;
                })(document);
                return Object.defineProperty(Xr, "SUPPORT_SVG_DRAWING", { value: A }), A;
            },
            get SUPPORT_FOREIGNOBJECT_DRAWING() {
                var A =
                    "function" == typeof Array.from && "function" == typeof window.fetch
                        ? (function (t) {
                              var A = t.createElement("canvas"),
                                  r = 100;
                              (A.width = r), (A.height = r);
                              var B = A.getContext("2d");
                              if (!B) return Promise.reject(!1);
                              (B.fillStyle = "rgb(0, 255, 0)"), B.fillRect(0, 0, r, r);
                              var e = new Image(),
                                  n = A.toDataURL();
                              e.src = n;
                              e = Nr(r, r, 0, 0, e);
                              return (
                                  (B.fillStyle = "red"),
                                  B.fillRect(0, 0, r, r),
                                  Pr(e)
                                      .then(function (A) {
                                          B.drawImage(A, 0, 0);
                                          var e = B.getImageData(0, 0, r, r).data;
                                          (B.fillStyle = "red"), B.fillRect(0, 0, r, r);
                                          A = t.createElement("div");
                                          return (A.style.backgroundImage = "url(" + n + ")"), (A.style.height = "100px"), Lr(e) ? Pr(Nr(r, r, 0, 0, A)) : Promise.reject(!1);
                                      })
                                      .then(function (A) {
                                          return B.drawImage(A, 0, 0), Lr(B.getImageData(0, 0, r, r).data);
                                      })
                                      .catch(function () {
                                          return !1;
                                      })
                              );
                          })(document)
                        : Promise.resolve(!1);
                return Object.defineProperty(Xr, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: A }), A;
            },
            get SUPPORT_CORS_IMAGES() {
                var A = void 0 !== new Image().crossOrigin;
                return Object.defineProperty(Xr, "SUPPORT_CORS_IMAGES", { value: A }), A;
            },
            get SUPPORT_RESPONSE_TYPE() {
                var A = "string" == typeof new XMLHttpRequest().responseType;
                return Object.defineProperty(Xr, "SUPPORT_RESPONSE_TYPE", { value: A }), A;
            },
            get SUPPORT_CORS_XHR() {
                var A = "withCredentials" in new XMLHttpRequest();
                return Object.defineProperty(Xr, "SUPPORT_CORS_XHR", { value: A }), A;
            },
            get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
                var A = !("undefined" == typeof Intl || !Intl.Segmenter);
                return Object.defineProperty(Xr, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: A }), A;
            },
        },
        Jr = function (A, e) {
            (this.text = A), (this.bounds = e);
        },
        Yr = function (A, e) {
            var t = e.ownerDocument;
            if (t) {
                var r = t.createElement("html2canvaswrapper");
                r.appendChild(e.cloneNode(!0));
                t = e.parentNode;
                if (t) {
                    t.replaceChild(r, e);
                    A = f(A, r);
                    return r.firstChild && t.replaceChild(r.firstChild, r), A;
                }
            }
            return d.EMPTY;
        },
        Wr = function (A, e, t) {
            var r = A.ownerDocument;
            if (!r) throw new Error("Node has no owner document");
            r = r.createRange();
            return r.setStart(A, e), r.setEnd(A, e + t), r;
        },
        Zr = function (A) {
            if (Xr.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
                var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
                return Array.from(e.segment(A)).map(function (A) {
                    return A.segment;
                });
            }
            return (function (A) {
                for (var e, t = mr(A), r = []; !(e = t.next()).done; ) e.value && r.push(e.value.slice());
                return r;
            })(A);
        },
        _r = function (A, e) {
            return 0 !== e.letterSpacing
                ? Zr(A)
                : (function (A, e) {
                      if (Xr.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
                          var t = new Intl.Segmenter(void 0, { granularity: "word" });
                          return Array.from(t.segment(A)).map(function (A) {
                              return A.segment;
                          });
                      }
                      return jr(A, e);
                  })(A, e);
        },
        qr = [32, 160, 4961, 65792, 65793, 4153, 4241],
        jr = function (A, e) {
            for (var t, r = wA(A, { lineBreak: e.lineBreak, wordBreak: "break-word" === e.overflowWrap ? "break-word" : e.wordBreak }), B = []; !(t = r.next()).done; )
                !(function () {
                    var A, e;
                    t.value &&
                        ((A = t.value.slice()),
                        (A = Q(A)),
                        (e = ""),
                        A.forEach(function (A) {
                            -1 === qr.indexOf(A) ? (e += g(A)) : (e.length && B.push(e), B.push(g(A)), (e = ""));
                        }),
                        e.length && B.push(e));
                })();
            return B;
        },
        zr = function (A, e, t) {
            var B, n, s, o, i;
            (this.text = $r(e.data, t.textTransform)),
                (this.textBounds =
                    ((B = A),
                    (A = this.text),
                    (s = e),
                    (A = _r(A, (n = t))),
                    (o = []),
                    (i = 0),
                    A.forEach(function (A) {
                        var e, t, r;
                        n.textDecorationLine.length || 0 < A.trim().length
                            ? Xr.SUPPORT_RANGE_BOUNDS
                                ? 1 < (r = Wr(s, i, A.length).getClientRects()).length
                                    ? ((e = Zr(A)),
                                      (t = 0),
                                      e.forEach(function (A) {
                                          o.push(new Jr(A, d.fromDOMRectList(B, Wr(s, t + i, A.length).getClientRects()))), (t += A.length);
                                      }))
                                    : o.push(new Jr(A, d.fromDOMRectList(B, r)))
                                : ((r = s.splitText(A.length)), o.push(new Jr(A, Yr(B, s))), (s = r))
                            : Xr.SUPPORT_RANGE_BOUNDS || (s = s.splitText(A.length)),
                            (i += A.length);
                    }),
                    o));
        },
        $r = function (A, e) {
            switch (e) {
                case 1:
                    return A.toLowerCase();
                case 3:
                    return A.replace(AB, eB);
                case 2:
                    return A.toUpperCase();
                default:
                    return A;
            }
        },
        AB = /(^|\s|:|-|\(|\))([a-z])/g,
        eB = function (A, e, t) {
            return 0 < A.length ? e + t.toUpperCase() : A;
        },
        tB = (A(rB, (Sr = ur)), rB);
    function rB(A, e) {
        A = Sr.call(this, A, e) || this;
        return (A.src = e.currentSrc || e.src), (A.intrinsicWidth = e.naturalWidth), (A.intrinsicHeight = e.naturalHeight), A.context.cache.addImage(A.src), A;
    }
    var BB,
        nB = (A(sB, (BB = ur)), sB);
    function sB(A, e) {
        A = BB.call(this, A, e) || this;
        return (A.canvas = e), (A.intrinsicWidth = e.width), (A.intrinsicHeight = e.height), A;
    }
    var oB,
        iB = (A(QB, (oB = ur)), QB);
    function QB(A, e) {
        var t = oB.call(this, A, e) || this,
            r = new XMLSerializer(),
            A = f(A, e);
        return e.setAttribute("width", A.width + "px"), e.setAttribute("height", A.height + "px"), (t.svg = "data:image/svg+xml," + encodeURIComponent(r.serializeToString(e))), (t.intrinsicWidth = e.width.baseVal.value), (t.intrinsicHeight = e.height.baseVal.value), t.context.cache.addImage(t.svg), t;
    }
    var cB,
        aB = (A(gB, (cB = ur)), gB);
    function gB(A, e) {
        A = cB.call(this, A, e) || this;
        return (A.value = e.value), A;
    }
    var wB,
        UB = (A(lB, (wB = ur)), lB);
    function lB(A, e) {
        A = wB.call(this, A, e) || this;
        return (A.start = e.start), (A.reversed = "boolean" == typeof e.reversed && !0 === e.reversed), A;
    }
    var CB,
        uB = [{ type: 15, flags: 0, unit: "px", number: 3 }],
        FB = [{ type: 16, flags: 0, number: 50 }],
        hB = "checkbox",
        dB = "radio",
        fB = "password",
        HB = 707406591,
        pB = (A(EB, (CB = ur)), EB);
    function EB(A, e) {
        var t = CB.call(this, A, e) || this;
        switch (
            ((t.type = e.type.toLowerCase()),
            (t.checked = e.checked),
            (t.value = 0 === (e = (A = e).type === fB ? new Array(A.value.length + 1).join("•") : A.value).length ? A.placeholder || "" : e),
            (t.type !== hB && t.type !== dB) ||
                ((t.styles.backgroundColor = 3739148031),
                (t.styles.borderTopColor = t.styles.borderRightColor = t.styles.borderBottomColor = t.styles.borderLeftColor = 2779096575),
                (t.styles.borderTopWidth = t.styles.borderRightWidth = t.styles.borderBottomWidth = t.styles.borderLeftWidth = 1),
                (t.styles.borderTopStyle = t.styles.borderRightStyle = t.styles.borderBottomStyle = t.styles.borderLeftStyle = 1),
                (t.styles.backgroundClip = [0]),
                (t.styles.backgroundOrigin = [0]),
                (t.bounds = (e = t.bounds).width > e.height ? new d(e.left + (e.width - e.height) / 2, e.top, e.height, e.height) : e.width < e.height ? new d(e.left, e.top + (e.height - e.width) / 2, e.width, e.width) : e)),
            t.type)
        ) {
            case hB:
                t.styles.borderTopRightRadius = t.styles.borderTopLeftRadius = t.styles.borderBottomRightRadius = t.styles.borderBottomLeftRadius = uB;
                break;
            case dB:
                t.styles.borderTopRightRadius = t.styles.borderTopLeftRadius = t.styles.borderBottomRightRadius = t.styles.borderBottomLeftRadius = FB;
        }
        return t;
    }
    var IB,
        yB = (A(KB, (IB = ur)), KB);
    function KB(A, e) {
        (A = IB.call(this, A, e) || this), (e = e.options[e.selectedIndex || 0]);
        return (A.value = (e && e.text) || ""), A;
    }
    var mB,
        LB = (A(bB, (mB = ur)), bB);
    function bB(A, e) {
        A = mB.call(this, A, e) || this;
        return (A.value = e.value), A;
    }
    var DB,
        vB = (A(xB, (DB = ur)), xB);
    function xB(A, e) {
        var t,
            r,
            B = DB.call(this, A, e) || this;
        (B.src = e.src), (B.width = parseInt(e.width, 10) || 0), (B.height = parseInt(e.height, 10) || 0), (B.backgroundColor = B.styles.backgroundColor);
        try {
            e.contentWindow &&
                e.contentWindow.document &&
                e.contentWindow.document.documentElement &&
                ((B.tree = kB(A, e.contentWindow.document.documentElement)),
                (t = e.contentWindow.document.documentElement ? fe(A, getComputedStyle(e.contentWindow.document.documentElement).backgroundColor) : Le.TRANSPARENT),
                (r = e.contentWindow.document.body ? fe(A, getComputedStyle(e.contentWindow.document.body).backgroundColor) : Le.TRANSPARENT),
                (B.backgroundColor = oe(t) ? (oe(r) ? B.styles.backgroundColor : r) : t));
        } catch (A) {}
        return B;
    }
    function MB(A) {
        return "VIDEO" === A.tagName;
    }
    function SB(A) {
        return "STYLE" === A.tagName;
    }
    function TB(A) {
        return 0 < A.tagName.indexOf("-");
    }
    var GB = ["OL", "UL", "MENU"],
        OB = function (e, A, t, r) {
            for (var B = A.firstChild; B; B = s) {
                var n,
                    s = B.nextSibling;
                PB(B) && 0 < B.data.trim().length
                    ? t.textNodes.push(new zr(e, B, t.styles))
                    : XB(B) &&
                      (rn(B) && B.assignedNodes
                          ? B.assignedNodes().forEach(function (A) {
                                return OB(e, A, t, r);
                            })
                          : (n = VB(e, B)).styles.isVisible() && (RB(B, n, r) ? (n.flags |= 4) : NB(n.styles) && (n.flags |= 2), -1 !== GB.indexOf(B.tagName) && (n.flags |= 8), t.elements.push(n), B.slot, B.shadowRoot ? OB(e, B.shadowRoot, n, r) : en(B) || qB(B) || tn(B) || OB(e, B, n, r)));
            }
        },
        VB = function (A, e) {
            return new ($B(e) ? tB : zB(e) ? nB : qB(e) ? iB : WB(e) ? aB : ZB(e) ? UB : _B(e) ? pB : tn(e) ? yB : en(e) ? LB : An(e) ? vB : ur)(A, e);
        },
        kB = function (A, e) {
            var t = VB(A, e);
            return (t.flags |= 4), OB(A, e, t, t), t;
        },
        RB = function (A, e, t) {
            return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || (jB(A) && t.styles.isTransparent());
        },
        NB = function (A) {
            return A.isPositioned() || A.isFloating();
        },
        PB = function (A) {
            return A.nodeType === Node.TEXT_NODE;
        },
        XB = function (A) {
            return A.nodeType === Node.ELEMENT_NODE;
        },
        JB = function (A) {
            return XB(A) && void 0 !== A.style && !YB(A);
        },
        YB = function (A) {
            return "object" == typeof A.className;
        },
        WB = function (A) {
            return "LI" === A.tagName;
        },
        ZB = function (A) {
            return "OL" === A.tagName;
        },
        _B = function (A) {
            return "INPUT" === A.tagName;
        },
        qB = function (A) {
            return "svg" === A.tagName;
        },
        jB = function (A) {
            return "BODY" === A.tagName;
        },
        zB = function (A) {
            return "CANVAS" === A.tagName;
        },
        $B = function (A) {
            return "IMG" === A.tagName;
        },
        An = function (A) {
            return "IFRAME" === A.tagName;
        },
        en = function (A) {
            return "TEXTAREA" === A.tagName;
        },
        tn = function (A) {
            return "SELECT" === A.tagName;
        },
        rn = function (A) {
            return "SLOT" === A.tagName;
        },
        Bn =
            ((nn.prototype.getCounterValue = function (A) {
                A = this.counters[A];
                return A && A.length ? A[A.length - 1] : 1;
            }),
            (nn.prototype.getCounterValues = function (A) {
                A = this.counters[A];
                return A || [];
            }),
            (nn.prototype.pop = function (A) {
                var e = this;
                A.forEach(function (A) {
                    return e.counters[A].pop();
                });
            }),
            (nn.prototype.parse = function (A) {
                var t = this,
                    e = A.counterIncrement,
                    A = A.counterReset,
                    r = !0;
                null !== e &&
                    e.forEach(function (A) {
                        var e = t.counters[A.counter];
                        e && 0 !== A.increment && ((r = !1), e.length || e.push(1), (e[Math.max(0, e.length - 1)] += A.increment));
                    });
                var B = [];
                return (
                    r &&
                        A.forEach(function (A) {
                            var e = t.counters[A.counter];
                            B.push(A.counter), (e = e || (t.counters[A.counter] = [])).push(A.reset);
                        }),
                    B
                );
            }),
            nn);
    function nn() {
        this.counters = {};
    }
    function sn(r, A, e, B, t, n) {
        return r < A || e < r
            ? Fn(r, t, 0 < n.length)
            : B.integers.reduce(function (A, e, t) {
                  for (; e <= r; ) (r -= e), (A += B.values[t]);
                  return A;
              }, "") + n;
    }
    function on(A, e, t, r) {
        for (var B = ""; t || A--, (B = r(A) + B), e <= (A /= e) * e; );
        return B;
    }
    function Qn(A, e, t, r, B) {
        var n = t - e + 1;
        return (
            (A < 0 ? "-" : "") +
            (on(Math.abs(A), n, r, function (A) {
                return g(Math.floor(A % n) + e);
            }) +
                B)
        );
    }
    function cn(A, e, t) {
        void 0 === t && (t = ". ");
        var r = e.length;
        return (
            on(Math.abs(A), r, !1, function (A) {
                return e[Math.floor(A % r)];
            }) + t
        );
    }
    function an(A, e, t, r, B, n) {
        if (A < -9999 || 9999 < A) return Fn(A, 4, 0 < B.length);
        var s = Math.abs(A),
            o = B;
        if (0 === s) return e[0] + o;
        for (var i = 0; 0 < s && i <= 4; i++) {
            var Q = s % 10;
            0 == Q && Pt(n, 1) && "" !== o ? (o = e[Q] + o) : 1 < Q || (1 == Q && 0 === i) || (1 == Q && 1 === i && Pt(n, 2)) || (1 == Q && 1 === i && Pt(n, 4) && 100 < A) || (1 == Q && 1 < i && Pt(n, 8)) ? (o = e[Q] + (0 < i ? t[i - 1] : "") + o) : 1 == Q && 0 < i && (o = t[i - 1] + o), (s = Math.floor(s / 10));
        }
        return (A < 0 ? r : "") + o;
    }
    var gn,
        wn = { integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] },
        Un = { integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"] },
        ln = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"] },
        Cn = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"] },
        un = "마이너스",
        Fn = function (A, e, t) {
            var r = t ? ". " : "",
                B = t ? "、" : "",
                n = t ? ", " : "",
                s = t ? " " : "";
            switch (e) {
                case 0:
                    return "•" + s;
                case 1:
                    return "◦" + s;
                case 2:
                    return "◾" + s;
                case 5:
                    var o = Qn(A, 48, 57, !0, r);
                    return o.length < 4 ? "0" + o : o;
                case 4:
                    return cn(A, "〇一二三四五六七八九", B);
                case 6:
                    return sn(A, 1, 3999, wn, 3, r).toLowerCase();
                case 7:
                    return sn(A, 1, 3999, wn, 3, r);
                case 8:
                    return Qn(A, 945, 969, !1, r);
                case 9:
                    return Qn(A, 97, 122, !1, r);
                case 10:
                    return Qn(A, 65, 90, !1, r);
                case 11:
                    return Qn(A, 1632, 1641, !0, r);
                case 12:
                case 49:
                    return sn(A, 1, 9999, Un, 3, r);
                case 35:
                    return sn(A, 1, 9999, Un, 3, r).toLowerCase();
                case 13:
                    return Qn(A, 2534, 2543, !0, r);
                case 14:
                case 30:
                    return Qn(A, 6112, 6121, !0, r);
                case 15:
                    return cn(A, "子丑寅卯辰巳午未申酉戌亥", B);
                case 16:
                    return cn(A, "甲乙丙丁戊己庚辛壬癸", B);
                case 17:
                case 48:
                    return an(A, "零一二三四五六七八九", "十百千萬", "負", B, 14);
                case 47:
                    return an(A, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", B, 15);
                case 42:
                    return an(A, "零一二三四五六七八九", "十百千萬", "负", B, 14);
                case 41:
                    return an(A, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", B, 15);
                case 26:
                    return an(A, "〇一二三四五六七八九", "十百千万", "マイナス", B, 0);
                case 25:
                    return an(A, "零壱弐参四伍六七八九", "拾百千万", "マイナス", B, 7);
                case 31:
                    return an(A, "영일이삼사오육칠팔구", "십백천만", un, n, 7);
                case 33:
                    return an(A, "零一二三四五六七八九", "十百千萬", un, n, 0);
                case 32:
                    return an(A, "零壹貳參四五六七八九", "拾百千", un, n, 7);
                case 18:
                    return Qn(A, 2406, 2415, !0, r);
                case 20:
                    return sn(A, 1, 19999, Cn, 3, r);
                case 21:
                    return Qn(A, 2790, 2799, !0, r);
                case 22:
                    return Qn(A, 2662, 2671, !0, r);
                case 22:
                    return sn(A, 1, 10999, ln, 3, r);
                case 23:
                    return cn(A, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
                case 24:
                    return cn(A, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
                case 27:
                    return Qn(A, 3302, 3311, !0, r);
                case 28:
                    return cn(A, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", B);
                case 29:
                    return cn(A, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", B);
                case 34:
                    return Qn(A, 3792, 3801, !0, r);
                case 37:
                    return Qn(A, 6160, 6169, !0, r);
                case 38:
                    return Qn(A, 4160, 4169, !0, r);
                case 39:
                    return Qn(A, 2918, 2927, !0, r);
                case 40:
                    return Qn(A, 1776, 1785, !0, r);
                case 43:
                    return Qn(A, 3046, 3055, !0, r);
                case 44:
                    return Qn(A, 3174, 3183, !0, r);
                case 45:
                    return Qn(A, 3664, 3673, !0, r);
                case 46:
                    return Qn(A, 3872, 3881, !0, r);
                default:
                    return Qn(A, 48, 57, !0, r);
            }
        },
        hn = "data-html2canvas-ignore",
        dn =
            ((fn.prototype.toIFrame = function (A, r) {
                var e = this,
                    B = pn(A, r);
                if (!B.contentWindow) return Promise.reject("Unable to find iframe window");
                var t = A.defaultView.pageXOffset,
                    n = A.defaultView.pageYOffset,
                    s = B.contentWindow,
                    o = s.document,
                    A = In(B).then(function () {
                        return a(e, void 0, void 0, function () {
                            var e, t;
                            return H(this, function (A) {
                                switch (A.label) {
                                    case 0:
                                        return (
                                            this.scrolledElements.forEach(bn),
                                            s && (s.scrollTo(r.left, r.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || (s.scrollY === r.top && s.scrollX === r.left) || (this.context.logger.warn("Unable to restore scroll position for cloned document"), (this.context.windowBounds = this.context.windowBounds.add(s.scrollX - r.left, s.scrollY - r.top, 0, 0)))),
                                            (e = this.options.onclone),
                                            void 0 === (t = this.clonedReferenceElement) ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : o.fonts && o.fonts.ready ? [4, o.fonts.ready] : [3, 2]
                                        );
                                    case 1:
                                        A.sent(), (A.label = 2);
                                    case 2:
                                        return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, En(o)] : [3, 4];
                                    case 3:
                                        A.sent(), (A.label = 4);
                                    case 4:
                                        return "function" == typeof e
                                            ? [
                                                  2,
                                                  Promise.resolve()
                                                      .then(function () {
                                                          return e(o, t);
                                                      })
                                                      .then(function () {
                                                          return B;
                                                      }),
                                              ]
                                            : [2, B];
                                }
                            });
                        });
                    });
                return o.open(), o.write(mn(document.doctype) + "<html></html>"), Ln(this.referenceElement.ownerDocument, t, n), o.replaceChild(o.adoptNode(this.documentElement), o.documentElement), o.close(), A;
            }),
            (fn.prototype.createElementClone = function (A) {
                if ((Cr(A, 2), zB(A))) return this.createCanvasClone(A);
                if (MB(A)) return this.createVideoClone(A);
                if (SB(A)) return this.createStyleClone(A);
                var e = A.cloneNode(!1);
                return $B(e) && ($B(A) && A.currentSrc && A.currentSrc !== A.src && ((e.src = A.currentSrc), (e.srcset = "")), "lazy" === e.loading && (e.loading = "eager")), TB(e) ? this.createCustomElementClone(e) : e;
            }),
            (fn.prototype.createCustomElementClone = function (A) {
                var e = document.createElement("html2canvascustomelement");
                return Kn(A.style, e), e;
            }),
            (fn.prototype.createStyleClone = function (A) {
                try {
                    var e = A.sheet;
                    if (e && e.cssRules) {
                        var t = [].slice.call(e.cssRules, 0).reduce(function (A, e) {
                                return e && "string" == typeof e.cssText ? A + e.cssText : A;
                            }, ""),
                            r = A.cloneNode(!1);
                        return (r.textContent = t), r;
                    }
                } catch (A) {
                    if ((this.context.logger.error("Unable to access cssRules property", A), "SecurityError" !== A.name)) throw A;
                }
                return A.cloneNode(!1);
            }),
            (fn.prototype.createCanvasClone = function (e) {
                var A;
                if (this.options.inlineImages && e.ownerDocument) {
                    var t = e.ownerDocument.createElement("img");
                    try {
                        return (t.src = e.toDataURL()), t;
                    } catch (A) {
                        this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e);
                    }
                }
                t = e.cloneNode(!1);
                try {
                    (t.width = e.width), (t.height = e.height);
                    var r,
                        B,
                        n = e.getContext("2d"),
                        s = t.getContext("2d");
                    return (
                        s &&
                            (!this.options.allowTaint && n
                                ? s.putImageData(n.getImageData(0, 0, e.width, e.height), 0, 0)
                                : (!(r = null !== (A = e.getContext("webgl2")) && void 0 !== A ? A : e.getContext("webgl")) || (!1 === (null == (B = r.getContextAttributes()) ? void 0 : B.preserveDrawingBuffer) && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e)), s.drawImage(e, 0, 0))),
                        t
                    );
                } catch (A) {
                    this.context.logger.info("Unable to clone canvas as it is tainted", e);
                }
                return t;
            }),
            (fn.prototype.createVideoClone = function (e) {
                var A = e.ownerDocument.createElement("canvas");
                (A.width = e.offsetWidth), (A.height = e.offsetHeight);
                var t = A.getContext("2d");
                try {
                    return t && (t.drawImage(e, 0, 0, A.width, A.height), this.options.allowTaint || t.getImageData(0, 0, A.width, A.height)), A;
                } catch (A) {
                    this.context.logger.info("Unable to clone video as it is tainted", e);
                }
                A = e.ownerDocument.createElement("canvas");
                return (A.width = e.offsetWidth), (A.height = e.offsetHeight), A;
            }),
            (fn.prototype.appendChildNode = function (A, e, t) {
                (XB(e) && ("SCRIPT" === e.tagName || e.hasAttribute(hn) || ("function" == typeof this.options.ignoreElements && this.options.ignoreElements(e)))) || (this.options.copyStyles && XB(e) && SB(e)) || A.appendChild(this.cloneNode(e, t));
            }),
            (fn.prototype.cloneChildNodes = function (A, e, t) {
                for (var r, B = this, n = (A.shadowRoot || A).firstChild; n; n = n.nextSibling)
                    XB(n) && rn(n) && "function" == typeof n.assignedNodes
                        ? (r = n.assignedNodes()).length &&
                          r.forEach(function (A) {
                              return B.appendChildNode(e, A, t);
                          })
                        : this.appendChildNode(e, n, t);
            }),
            (fn.prototype.cloneNode = function (A, e) {
                if (PB(A)) return document.createTextNode(A.data);
                if (!A.ownerDocument) return A.cloneNode(!1);
                var t = A.ownerDocument.defaultView;
                if (t && XB(A) && (JB(A) || YB(A))) {
                    var r = this.createElementClone(A);
                    r.style.transitionProperty = "none";
                    var B = t.getComputedStyle(A),
                        n = t.getComputedStyle(A, ":before"),
                        s = t.getComputedStyle(A, ":after");
                    this.referenceElement === A && JB(r) && (this.clonedReferenceElement = r), jB(r) && Mn(r);
                    (t = this.counters.parse(new Ur(this.context, B))), (n = this.resolvePseudoContent(A, r, n, gn.BEFORE));
                    TB(A) && (e = !0), MB(A) || this.cloneChildNodes(A, r, e), n && r.insertBefore(n, r.firstChild);
                    s = this.resolvePseudoContent(A, r, s, gn.AFTER);
                    return s && r.appendChild(s), this.counters.pop(t), ((B && (this.options.copyStyles || YB(A)) && !An(A)) || e) && Kn(B, r), (0 === A.scrollTop && 0 === A.scrollLeft) || this.scrolledElements.push([r, A.scrollLeft, A.scrollTop]), (en(A) || tn(A)) && (en(r) || tn(r)) && (r.value = A.value), r;
                }
                return A.cloneNode(!1);
            }),
            (fn.prototype.resolvePseudoContent = function (o, A, e, t) {
                var i = this;
                if (e) {
                    var r = e.content,
                        Q = A.ownerDocument;
                    if (Q && r && "none" !== r && "-moz-alt-content" !== r && "none" !== e.display) {
                        this.counters.parse(new Ur(this.context, e));
                        var c = new wr(this.context, e),
                            a = Q.createElement("html2canvaspseudoelement");
                        Kn(e, a),
                            c.content.forEach(function (A) {
                                if (0 === A.type) a.appendChild(Q.createTextNode(A.value));
                                else if (22 === A.type) {
                                    var e = Q.createElement("img");
                                    (e.src = A.value), (e.style.opacity = "1"), a.appendChild(e);
                                } else if (18 === A.type) {
                                    var t, r, B, n, s;
                                    "attr" === A.name
                                        ? (e = A.values.filter(_A)).length && a.appendChild(Q.createTextNode(o.getAttribute(e[0].value) || ""))
                                        : "counter" === A.name
                                        ? ((B = (r = A.values.filter($A))[0]), (r = r[1]), B && _A(B) && ((t = i.counters.getCounterValue(B.value)), (s = r && _A(r) ? pt.parse(i.context, r.value) : 3), a.appendChild(Q.createTextNode(Fn(t, s, !1)))))
                                        : "counters" === A.name &&
                                          ((B = (t = A.values.filter($A))[0]),
                                          (s = t[1]),
                                          (r = t[2]),
                                          B &&
                                              _A(B) &&
                                              ((B = i.counters.getCounterValues(B.value)),
                                              (n = r && _A(r) ? pt.parse(i.context, r.value) : 3),
                                              (s = s && 0 === s.type ? s.value : ""),
                                              (s = B.map(function (A) {
                                                  return Fn(A, n, !1);
                                              }).join(s)),
                                              a.appendChild(Q.createTextNode(s))));
                                } else if (20 === A.type)
                                    switch (A.value) {
                                        case "open-quote":
                                            a.appendChild(Q.createTextNode(Xt(c.quotes, i.quoteDepth++, !0)));
                                            break;
                                        case "close-quote":
                                            a.appendChild(Q.createTextNode(Xt(c.quotes, --i.quoteDepth, !1)));
                                            break;
                                        default:
                                            a.appendChild(Q.createTextNode(A.value));
                                    }
                            }),
                            (a.className = Dn + " " + vn);
                        t = t === gn.BEFORE ? " " + Dn : " " + vn;
                        return YB(A) ? (A.className.baseValue += t) : (A.className += t), a;
                    }
                }
            }),
            (fn.destroy = function (A) {
                return !!A.parentNode && (A.parentNode.removeChild(A), !0);
            }),
            fn);
    function fn(A, e, t) {
        if (((this.context = A), (this.options = t), (this.scrolledElements = []), (this.referenceElement = e), (this.counters = new Bn()), (this.quoteDepth = 0), !e.ownerDocument)) throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(e.ownerDocument.documentElement, !1);
    }
    ((he = gn = gn || {})[(he.BEFORE = 0)] = "BEFORE"), (he[(he.AFTER = 1)] = "AFTER");
    function Hn(e) {
        return new Promise(function (A) {
            !e.complete && e.src ? ((e.onload = A), (e.onerror = A)) : A();
        });
    }
    var pn = function (A, e) {
            var t = A.createElement("iframe");
            return (t.className = "html2canvas-container"), (t.style.visibility = "hidden"), (t.style.position = "fixed"), (t.style.left = "-10000px"), (t.style.top = "0px"), (t.style.border = "0"), (t.width = e.width.toString()), (t.height = e.height.toString()), (t.scrolling = "no"), t.setAttribute(hn, "true"), A.body.appendChild(t), t;
        },
        En = function (A) {
            return Promise.all([].slice.call(A.images, 0).map(Hn));
        },
        In = function (B) {
            return new Promise(function (e, A) {
                var t = B.contentWindow;
                if (!t) return A("No window assigned for iframe");
                var r = t.document;
                t.onload = B.onload = function () {
                    t.onload = B.onload = null;
                    var A = setInterval(function () {
                        0 < r.body.childNodes.length && "complete" === r.readyState && (clearInterval(A), e(B));
                    }, 50);
                };
            });
        },
        yn = ["all", "d", "content"],
        Kn = function (A, e) {
            for (var t = A.length - 1; 0 <= t; t--) {
                var r = A.item(t);
                -1 === yn.indexOf(r) && e.style.setProperty(r, A.getPropertyValue(r));
            }
            return e;
        },
        mn = function (A) {
            var e = "";
            return A && ((e += "<!DOCTYPE "), A.name && (e += A.name), A.internalSubset && (e += A.internalSubset), A.publicId && (e += '"' + A.publicId + '"'), A.systemId && (e += '"' + A.systemId + '"'), (e += ">")), e;
        },
        Ln = function (A, e, t) {
            A && A.defaultView && (e !== A.defaultView.pageXOffset || t !== A.defaultView.pageYOffset) && A.defaultView.scrollTo(e, t);
        },
        bn = function (A) {
            var e = A[0],
                t = A[1],
                A = A[2];
            (e.scrollLeft = t), (e.scrollTop = A);
        },
        Dn = "___html2canvas___pseudoelement_before",
        vn = "___html2canvas___pseudoelement_after",
        xn = '{\n    content: "" !important;\n    display: none !important;\n}',
        Mn = function (A) {
            Sn(A, "." + Dn + ":before" + xn + "\n         ." + vn + ":after" + xn);
        },
        Sn = function (A, e) {
            var t = A.ownerDocument;
            t && (((t = t.createElement("style")).textContent = e), A.appendChild(t));
        },
        Tn =
            ((Gn.getOrigin = function (A) {
                var e = Gn._link;
                return e ? ((e.href = A), (e.href = e.href), e.protocol + e.hostname + e.port) : "about:blank";
            }),
            (Gn.isSameOrigin = function (A) {
                return Gn.getOrigin(A) === Gn._origin;
            }),
            (Gn.setContext = function (A) {
                (Gn._link = A.document.createElement("a")), (Gn._origin = Gn.getOrigin(A.location.href));
            }),
            (Gn._origin = "about:blank"),
            Gn);
    function Gn() {}
    var On =
        ((Vn.prototype.addImage = function (A) {
            var e = Promise.resolve();
            return this.has(A) || ((Yn(A) || Pn(A)) && (this._cache[A] = this.loadImage(A)).catch(function () {})), e;
        }),
        (Vn.prototype.match = function (A) {
            return this._cache[A];
        }),
        (Vn.prototype.loadImage = function (s) {
            return a(this, void 0, void 0, function () {
                var e,
                    r,
                    t,
                    B,
                    n = this;
                return H(this, function (A) {
                    switch (A.label) {
                        case 0:
                            return ((e = Tn.isSameOrigin(s)), (r = !Xn(s) && !0 === this._options.useCORS && Xr.SUPPORT_CORS_IMAGES && !e), (t = !Xn(s) && !e && !Yn(s) && "string" == typeof this._options.proxy && Xr.SUPPORT_CORS_XHR && !r), e || !1 !== this._options.allowTaint || Xn(s) || Yn(s) || t || r) ? ((B = s), t ? [4, this.proxy(B)] : [3, 2]) : [2];
                        case 1:
                            (B = A.sent()), (A.label = 2);
                        case 2:
                            return (
                                this.context.logger.debug("Added image " + s.substring(0, 256)),
                                [
                                    4,
                                    new Promise(function (A, e) {
                                        var t = new Image();
                                        (t.onload = function () {
                                            return A(t);
                                        }),
                                            (t.onerror = e),
                                            (Jn(B) || r) && (t.crossOrigin = "anonymous"),
                                            (t.src = B),
                                            !0 === t.complete &&
                                                setTimeout(function () {
                                                    return A(t);
                                                }, 500),
                                            0 < n._options.imageTimeout &&
                                                setTimeout(function () {
                                                    return e("Timed out (" + n._options.imageTimeout + "ms) loading image");
                                                }, n._options.imageTimeout);
                                    }),
                                ]
                            );
                        case 3:
                            return [2, A.sent()];
                    }
                });
            });
        }),
        (Vn.prototype.has = function (A) {
            return void 0 !== this._cache[A];
        }),
        (Vn.prototype.keys = function () {
            return Promise.resolve(Object.keys(this._cache));
        }),
        (Vn.prototype.proxy = function (s) {
            var o = this,
                i = this._options.proxy;
            if (!i) throw new Error("No proxy defined");
            var Q = s.substring(0, 256);
            return new Promise(function (e, t) {
                var r = Xr.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
                    B = new XMLHttpRequest();
                (B.onload = function () {
                    var A;
                    200 === B.status
                        ? "text" == r
                            ? e(B.response)
                            : ((A = new FileReader()).addEventListener(
                                  "load",
                                  function () {
                                      return e(A.result);
                                  },
                                  !1
                              ),
                              A.addEventListener(
                                  "error",
                                  function (A) {
                                      return t(A);
                                  },
                                  !1
                              ),
                              A.readAsDataURL(B.response))
                        : t("Failed to proxy resource " + Q + " with status code " + B.status);
                }),
                    (B.onerror = t);
                var A,
                    n = -1 < i.indexOf("?") ? "&" : "?";
                B.open("GET", i + n + "url=" + encodeURIComponent(s) + "&responseType=" + r),
                    "text" != r && B instanceof XMLHttpRequest && (B.responseType = r),
                    o._options.imageTimeout &&
                        ((A = o._options.imageTimeout),
                        (B.timeout = A),
                        (B.ontimeout = function () {
                            return t("Timed out (" + A + "ms) proxying " + Q);
                        })),
                    B.send();
            });
        }),
        Vn);
    function Vn(A, e) {
        (this.context = A), (this._options = e), (this._cache = {});
    }
    var kn = /^data:image\/svg\+xml/i,
        Rn = /^data:image\/.*;base64,/i,
        Nn = /^data:image\/.*/i,
        Pn = function (A) {
            return Xr.SUPPORT_SVG_DRAWING || !Wn(A);
        },
        Xn = function (A) {
            return Nn.test(A);
        },
        Jn = function (A) {
            return Rn.test(A);
        },
        Yn = function (A) {
            return "blob" === A.substr(0, 4);
        },
        Wn = function (A) {
            return "svg" === A.substr(-3).toLowerCase() || kn.test(A);
        },
        Zn =
            ((_n.prototype.add = function (A, e) {
                return new _n(this.x + A, this.y + e);
            }),
            _n);
    function _n(A, e) {
        (this.type = 0), (this.x = A), (this.y = e);
    }
    function qn(A, e, t) {
        return new Zn(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
    }
    var jn =
        ((zn.prototype.subdivide = function (A, e) {
            var t = qn(this.start, this.startControl, A),
                r = qn(this.startControl, this.endControl, A),
                B = qn(this.endControl, this.end, A),
                n = qn(t, r, A),
                r = qn(r, B, A),
                A = qn(n, r, A);
            return e ? new zn(this.start, t, n, A) : new zn(A, r, B, this.end);
        }),
        (zn.prototype.add = function (A, e) {
            return new zn(this.start.add(A, e), this.startControl.add(A, e), this.endControl.add(A, e), this.end.add(A, e));
        }),
        (zn.prototype.reverse = function () {
            return new zn(this.end, this.endControl, this.startControl, this.start);
        }),
        zn);
    function zn(A, e, t, r) {
        (this.type = 1), (this.start = A), (this.startControl = e), (this.endControl = t), (this.end = r);
    }
    function $n(A) {
        return 1 === A.type;
    }
    var As,
        es = function (A) {
            var e = A.styles,
                t = A.bounds,
                r = (C = Be(e.borderTopLeftRadius, t.width, t.height))[0],
                B = C[1],
                n = (u = Be(e.borderTopRightRadius, t.width, t.height))[0],
                s = u[1],
                o = (F = Be(e.borderBottomRightRadius, t.width, t.height))[0],
                i = F[1],
                Q = (h = Be(e.borderBottomLeftRadius, t.width, t.height))[0],
                c = h[1];
            (d = []).push((r + n) / t.width), d.push((Q + o) / t.width), d.push((B + c) / t.height), d.push((s + i) / t.height), 1 < (f = Math.max.apply(Math, d)) && ((r /= f), (B /= f), (n /= f), (s /= f), (o /= f), (i /= f), (Q /= f), (c /= f));
            var a = t.width - n,
                g = t.height - i,
                w = t.width - o,
                U = t.height - c,
                l = e.borderTopWidth,
                C = e.borderRightWidth,
                u = e.borderBottomWidth,
                F = e.borderLeftWidth,
                h = Ue(e.paddingTop, A.bounds.width),
                d = Ue(e.paddingRight, A.bounds.width),
                f = Ue(e.paddingBottom, A.bounds.width),
                A = Ue(e.paddingLeft, A.bounds.width);
            (this.topLeftBorderDoubleOuterBox = 0 < r || 0 < B ? ss(t.left + F / 3, t.top + l / 3, r - F / 3, B - l / 3, As.TOP_LEFT) : new Zn(t.left + F / 3, t.top + l / 3)),
                (this.topRightBorderDoubleOuterBox = 0 < r || 0 < B ? ss(t.left + a, t.top + l / 3, n - C / 3, s - l / 3, As.TOP_RIGHT) : new Zn(t.left + t.width - C / 3, t.top + l / 3)),
                (this.bottomRightBorderDoubleOuterBox = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o - C / 3, i - u / 3, As.BOTTOM_RIGHT) : new Zn(t.left + t.width - C / 3, t.top + t.height - u / 3)),
                (this.bottomLeftBorderDoubleOuterBox = 0 < Q || 0 < c ? ss(t.left + F / 3, t.top + U, Q - F / 3, c - u / 3, As.BOTTOM_LEFT) : new Zn(t.left + F / 3, t.top + t.height - u / 3)),
                (this.topLeftBorderDoubleInnerBox = 0 < r || 0 < B ? ss(t.left + (2 * F) / 3, t.top + (2 * l) / 3, r - (2 * F) / 3, B - (2 * l) / 3, As.TOP_LEFT) : new Zn(t.left + (2 * F) / 3, t.top + (2 * l) / 3)),
                (this.topRightBorderDoubleInnerBox = 0 < r || 0 < B ? ss(t.left + a, t.top + (2 * l) / 3, n - (2 * C) / 3, s - (2 * l) / 3, As.TOP_RIGHT) : new Zn(t.left + t.width - (2 * C) / 3, t.top + (2 * l) / 3)),
                (this.bottomRightBorderDoubleInnerBox = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o - (2 * C) / 3, i - (2 * u) / 3, As.BOTTOM_RIGHT) : new Zn(t.left + t.width - (2 * C) / 3, t.top + t.height - (2 * u) / 3)),
                (this.bottomLeftBorderDoubleInnerBox = 0 < Q || 0 < c ? ss(t.left + (2 * F) / 3, t.top + U, Q - (2 * F) / 3, c - (2 * u) / 3, As.BOTTOM_LEFT) : new Zn(t.left + (2 * F) / 3, t.top + t.height - (2 * u) / 3)),
                (this.topLeftBorderStroke = 0 < r || 0 < B ? ss(t.left + F / 2, t.top + l / 2, r - F / 2, B - l / 2, As.TOP_LEFT) : new Zn(t.left + F / 2, t.top + l / 2)),
                (this.topRightBorderStroke = 0 < r || 0 < B ? ss(t.left + a, t.top + l / 2, n - C / 2, s - l / 2, As.TOP_RIGHT) : new Zn(t.left + t.width - C / 2, t.top + l / 2)),
                (this.bottomRightBorderStroke = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o - C / 2, i - u / 2, As.BOTTOM_RIGHT) : new Zn(t.left + t.width - C / 2, t.top + t.height - u / 2)),
                (this.bottomLeftBorderStroke = 0 < Q || 0 < c ? ss(t.left + F / 2, t.top + U, Q - F / 2, c - u / 2, As.BOTTOM_LEFT) : new Zn(t.left + F / 2, t.top + t.height - u / 2)),
                (this.topLeftBorderBox = 0 < r || 0 < B ? ss(t.left, t.top, r, B, As.TOP_LEFT) : new Zn(t.left, t.top)),
                (this.topRightBorderBox = 0 < n || 0 < s ? ss(t.left + a, t.top, n, s, As.TOP_RIGHT) : new Zn(t.left + t.width, t.top)),
                (this.bottomRightBorderBox = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o, i, As.BOTTOM_RIGHT) : new Zn(t.left + t.width, t.top + t.height)),
                (this.bottomLeftBorderBox = 0 < Q || 0 < c ? ss(t.left, t.top + U, Q, c, As.BOTTOM_LEFT) : new Zn(t.left, t.top + t.height)),
                (this.topLeftPaddingBox = 0 < r || 0 < B ? ss(t.left + F, t.top + l, Math.max(0, r - F), Math.max(0, B - l), As.TOP_LEFT) : new Zn(t.left + F, t.top + l)),
                (this.topRightPaddingBox = 0 < n || 0 < s ? ss(t.left + Math.min(a, t.width - C), t.top + l, a > t.width + C ? 0 : Math.max(0, n - C), Math.max(0, s - l), As.TOP_RIGHT) : new Zn(t.left + t.width - C, t.top + l)),
                (this.bottomRightPaddingBox = 0 < o || 0 < i ? ss(t.left + Math.min(w, t.width - F), t.top + Math.min(g, t.height - u), Math.max(0, o - C), Math.max(0, i - u), As.BOTTOM_RIGHT) : new Zn(t.left + t.width - C, t.top + t.height - u)),
                (this.bottomLeftPaddingBox = 0 < Q || 0 < c ? ss(t.left + F, t.top + Math.min(U, t.height - u), Math.max(0, Q - F), Math.max(0, c - u), As.BOTTOM_LEFT) : new Zn(t.left + F, t.top + t.height - u)),
                (this.topLeftContentBox = 0 < r || 0 < B ? ss(t.left + F + A, t.top + l + h, Math.max(0, r - (F + A)), Math.max(0, B - (l + h)), As.TOP_LEFT) : new Zn(t.left + F + A, t.top + l + h)),
                (this.topRightContentBox = 0 < n || 0 < s ? ss(t.left + Math.min(a, t.width + F + A), t.top + l + h, a > t.width + F + A ? 0 : n - F + A, s - (l + h), As.TOP_RIGHT) : new Zn(t.left + t.width - (C + d), t.top + l + h)),
                (this.bottomRightContentBox = 0 < o || 0 < i ? ss(t.left + Math.min(w, t.width - (F + A)), t.top + Math.min(g, t.height + l + h), Math.max(0, o - (C + d)), i - (u + f), As.BOTTOM_RIGHT) : new Zn(t.left + t.width - (C + d), t.top + t.height - (u + f))),
                (this.bottomLeftContentBox = 0 < Q || 0 < c ? ss(t.left + F + A, t.top + U, Math.max(0, Q - (F + A)), c - (u + f), As.BOTTOM_LEFT) : new Zn(t.left + F + A, t.top + t.height - (u + f)));
        };
    ((he = As = As || {})[(he.TOP_LEFT = 0)] = "TOP_LEFT"), (he[(he.TOP_RIGHT = 1)] = "TOP_RIGHT"), (he[(he.BOTTOM_RIGHT = 2)] = "BOTTOM_RIGHT"), (he[(he.BOTTOM_LEFT = 3)] = "BOTTOM_LEFT");
    function ts(A) {
        return [A.topLeftBorderBox, A.topRightBorderBox, A.bottomRightBorderBox, A.bottomLeftBorderBox];
    }
    function rs(A) {
        return [A.topLeftPaddingBox, A.topRightPaddingBox, A.bottomRightPaddingBox, A.bottomLeftPaddingBox];
    }
    function Bs(A) {
        return 1 === A.type;
    }
    function ns(A, t) {
        return (
            A.length === t.length &&
            A.some(function (A, e) {
                return A === t[e];
            })
        );
    }
    var ss = function (A, e, t, r, B) {
            var n = ((Math.sqrt(2) - 1) / 3) * 4,
                s = t * n,
                o = r * n,
                i = A + t,
                Q = e + r;
            switch (B) {
                case As.TOP_LEFT:
                    return new jn(new Zn(A, Q), new Zn(A, Q - o), new Zn(i - s, e), new Zn(i, e));
                case As.TOP_RIGHT:
                    return new jn(new Zn(A, e), new Zn(A + s, e), new Zn(i, Q - o), new Zn(i, Q));
                case As.BOTTOM_RIGHT:
                    return new jn(new Zn(i, e), new Zn(i, e + o), new Zn(A + s, Q), new Zn(A, Q));
                default:
                    As.BOTTOM_LEFT;
                    return new jn(new Zn(i, Q), new Zn(i - s, Q), new Zn(A, e + o), new Zn(A, e));
            }
        },
        os = function (A, e, t) {
            (this.offsetX = A), (this.offsetY = e), (this.matrix = t), (this.type = 0), (this.target = 6);
        },
        is = function (A, e) {
            (this.path = A), (this.target = e), (this.type = 1);
        },
        Qs = function (A) {
            (this.opacity = A), (this.type = 2), (this.target = 6);
        },
        cs = function (A) {
            (this.element = A), (this.inlineLevel = []), (this.nonInlineLevel = []), (this.negativeZIndex = []), (this.zeroOrAutoZIndexOrTransformedOrOpacity = []), (this.positiveZIndex = []), (this.nonPositionedFloats = []), (this.nonPositionedInlineLevel = []);
        },
        as =
            ((gs.prototype.getEffects = function (e) {
                for (var A = -1 === [2, 3].indexOf(this.container.styles.position), t = this.parent, r = this.effects.slice(0); t; ) {
                    var B,
                        n,
                        s = t.effects.filter(function (A) {
                            return !Bs(A);
                        });
                    A || 0 !== t.container.styles.position || !t.parent ? (r.unshift.apply(r, s), (A = -1 === [2, 3].indexOf(t.container.styles.position)), 0 !== t.container.styles.overflowX && ((B = ts(t.curves)), (n = rs(t.curves)), ns(B, n) || r.unshift(new is(n, 6)))) : r.unshift.apply(r, s), (t = t.parent);
                }
                return r.filter(function (A) {
                    return Pt(A.target, e);
                });
            }),
            gs);
    function gs(A, e) {
        var t, r;
        (this.container = A),
            (this.parent = e),
            (this.effects = []),
            (this.curves = new es(this.container)),
            this.container.styles.opacity < 1 && this.effects.push(new Qs(this.container.styles.opacity)),
            null !== this.container.styles.transform && ((e = this.container.bounds.left + this.container.styles.transformOrigin[0].number), (t = this.container.bounds.top + this.container.styles.transformOrigin[1].number), (r = this.container.styles.transform), this.effects.push(new os(e, t, r))),
            0 !== this.container.styles.overflowX && ((t = ts(this.curves)), (r = rs(this.curves)), ns(t, r) ? this.effects.push(new is(t, 6)) : (this.effects.push(new is(t, 2)), this.effects.push(new is(r, 4))));
    }
    function ws(A, e) {
        switch (e) {
            case 0:
                return Hs(A.topLeftBorderBox, A.topLeftPaddingBox, A.topRightBorderBox, A.topRightPaddingBox);
            case 1:
                return Hs(A.topRightBorderBox, A.topRightPaddingBox, A.bottomRightBorderBox, A.bottomRightPaddingBox);
            case 2:
                return Hs(A.bottomRightBorderBox, A.bottomRightPaddingBox, A.bottomLeftBorderBox, A.bottomLeftPaddingBox);
            default:
                return Hs(A.bottomLeftBorderBox, A.bottomLeftPaddingBox, A.topLeftBorderBox, A.topLeftPaddingBox);
        }
    }
    function Us(A) {
        var e = A.bounds,
            A = A.styles;
        return e.add(A.borderLeftWidth, A.borderTopWidth, -(A.borderRightWidth + A.borderLeftWidth), -(A.borderTopWidth + A.borderBottomWidth));
    }
    function ls(A) {
        var e = A.styles,
            t = A.bounds,
            r = Ue(e.paddingLeft, t.width),
            B = Ue(e.paddingRight, t.width),
            n = Ue(e.paddingTop, t.width),
            A = Ue(e.paddingBottom, t.width);
        return t.add(r + e.borderLeftWidth, n + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + r + B), -(e.borderTopWidth + e.borderBottomWidth + n + A));
    }
    function Cs(A, e, t) {
        var r = ((B = Es(A.styles.backgroundOrigin, e)), (n = A), 0 === B ? n.bounds : (2 === B ? ls : Us)(n)),
            B = ((s = Es(A.styles.backgroundClip, e)), (o = A), 0 === s ? o.bounds : (2 === s ? ls : Us)(o)),
            n = ps(Es(A.styles.backgroundSize, e), t, r),
            s = n[0],
            o = n[1],
            t = Be(Es(A.styles.backgroundPosition, e), r.width - s, r.height - o);
        return [Is(Es(A.styles.backgroundRepeat, e), t, n, r, B), Math.round(r.left + t[0]), Math.round(r.top + t[1]), s, o];
    }
    function us(A) {
        return _A(A) && A.value === Ve.AUTO;
    }
    function Fs(A) {
        return "number" == typeof A;
    }
    var hs = function (Q, c, a, g) {
            Q.container.elements.forEach(function (A) {
                var e = Pt(A.flags, 4),
                    t = Pt(A.flags, 2),
                    r = new as(A, Q);
                Pt(A.styles.display, 2048) && g.push(r);
                var B,
                    n,
                    s,
                    o,
                    i = Pt(A.flags, 8) ? [] : g;
                e || t
                    ? ((B = e || A.styles.isPositioned() ? a : c),
                      (t = new cs(r)),
                      A.styles.isPositioned() || A.styles.opacity < 1 || A.styles.isTransformed()
                          ? (n = A.styles.zIndex.order) < 0
                              ? ((s = 0),
                                B.negativeZIndex.some(function (A, e) {
                                    return n > A.element.container.styles.zIndex.order ? ((s = e), !1) : 0 < s;
                                }),
                                B.negativeZIndex.splice(s, 0, t))
                              : 0 < n
                              ? ((o = 0),
                                B.positiveZIndex.some(function (A, e) {
                                    return n >= A.element.container.styles.zIndex.order ? ((o = e + 1), !1) : 0 < o;
                                }),
                                B.positiveZIndex.splice(o, 0, t))
                              : B.zeroOrAutoZIndexOrTransformedOrOpacity.push(t)
                          : (A.styles.isFloating() ? B.nonPositionedFloats : B.nonPositionedInlineLevel).push(t),
                      hs(r, t, e ? t : a, i))
                    : ((A.styles.isInlineLevel() ? c.inlineLevel : c.nonInlineLevel).push(r), hs(r, c, a, i)),
                    Pt(A.flags, 8) && ds(A, i);
            });
        },
        ds = function (A, e) {
            for (var t = A instanceof UB ? A.start : 1, r = A instanceof UB && A.reversed, B = 0; B < e.length; B++) {
                var n = e[B];
                n.container instanceof aB && "number" == typeof n.container.value && 0 !== n.container.value && (t = n.container.value), (n.listValue = Fn(t, n.container.styles.listStyleType, !0)), (t += r ? -1 : 1);
            }
        },
        fs = function (A, e) {
            var t = [];
            return $n(A) ? t.push(A.subdivide(0.5, !1)) : t.push(A), $n(e) ? t.push(e.subdivide(0.5, !0)) : t.push(e), t;
        },
        Hs = function (A, e, t, r) {
            var B = [];
            return $n(A) ? B.push(A.subdivide(0.5, !1)) : B.push(A), $n(t) ? B.push(t.subdivide(0.5, !0)) : B.push(t), $n(r) ? B.push(r.subdivide(0.5, !0).reverse()) : B.push(r), $n(e) ? B.push(e.subdivide(0.5, !1).reverse()) : B.push(e), B;
        },
        ps = function (A, e, t) {
            var r = e[0],
                B = e[1],
                n = e[2],
                s = A[0],
                o = A[1];
            if (!s) return [0, 0];
            if (te(s) && o && te(o)) return [Ue(s, t.width), Ue(o, t.height)];
            var i = Fs(n);
            if (_A(s) && (s.value === Ve.CONTAIN || s.value === Ve.COVER)) return Fs(n) ? (t.width / t.height < n != (s.value === Ve.COVER) ? [t.width, t.width / n] : [t.height * n, t.height]) : [t.width, t.height];
            var Q = Fs(r),
                e = Fs(B),
                A = Q || e;
            if (us(s) && (!o || us(o))) return Q && e ? [r, B] : i || A ? (A && i ? [Q ? r : B * n, e ? B : r / n] : [Q ? r : t.width, e ? B : t.height]) : [t.width, t.height];
            if (i) {
                var c = 0,
                    a = 0;
                return te(s) ? (c = Ue(s, t.width)) : te(o) && (a = Ue(o, t.height)), us(s) ? (c = a * n) : (o && !us(o)) || (a = c / n), [c, a];
            }
            (c = null), (a = null);
            if ((te(s) ? (c = Ue(s, t.width)) : o && te(o) && (a = Ue(o, t.height)), null !== (c = null !== (a = null !== c && (!o || us(o)) ? (Q && e ? (c / r) * B : t.height) : a) && us(s) ? (Q && e ? (a / B) * r : t.width) : c) && null !== a)) return [c, a];
            throw new Error("Unable to calculate background-size for element");
        },
        Es = function (A, e) {
            e = A[e];
            return void 0 === e ? A[0] : e;
        },
        Is = function (A, e, t, r, B) {
            var n = e[0],
                s = e[1],
                o = t[0],
                i = t[1];
            switch (A) {
                case 2:
                    return [new Zn(Math.round(r.left), Math.round(r.top + s)), new Zn(Math.round(r.left + r.width), Math.round(r.top + s)), new Zn(Math.round(r.left + r.width), Math.round(i + r.top + s)), new Zn(Math.round(r.left), Math.round(i + r.top + s))];
                case 3:
                    return [new Zn(Math.round(r.left + n), Math.round(r.top)), new Zn(Math.round(r.left + n + o), Math.round(r.top)), new Zn(Math.round(r.left + n + o), Math.round(r.height + r.top)), new Zn(Math.round(r.left + n), Math.round(r.height + r.top))];
                case 1:
                    return [new Zn(Math.round(r.left + n), Math.round(r.top + s)), new Zn(Math.round(r.left + n + o), Math.round(r.top + s)), new Zn(Math.round(r.left + n + o), Math.round(r.top + s + i)), new Zn(Math.round(r.left + n), Math.round(r.top + s + i))];
                default:
                    return [new Zn(Math.round(B.left), Math.round(B.top)), new Zn(Math.round(B.left + B.width), Math.round(B.top)), new Zn(Math.round(B.left + B.width), Math.round(B.height + B.top)), new Zn(Math.round(B.left), Math.round(B.height + B.top))];
            }
        },
        ys = "Hidden Text",
        Ks =
            ((ms.prototype.parseMetrics = function (A, e) {
                var t = this._document.createElement("div"),
                    r = this._document.createElement("img"),
                    B = this._document.createElement("span"),
                    n = this._document.body;
                (t.style.visibility = "hidden"),
                    (t.style.fontFamily = A),
                    (t.style.fontSize = e),
                    (t.style.margin = "0"),
                    (t.style.padding = "0"),
                    (t.style.whiteSpace = "nowrap"),
                    n.appendChild(t),
                    (r.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
                    (r.width = 1),
                    (r.height = 1),
                    (r.style.margin = "0"),
                    (r.style.padding = "0"),
                    (r.style.verticalAlign = "baseline"),
                    (B.style.fontFamily = A),
                    (B.style.fontSize = e),
                    (B.style.margin = "0"),
                    (B.style.padding = "0"),
                    B.appendChild(this._document.createTextNode(ys)),
                    t.appendChild(B),
                    t.appendChild(r);
                e = r.offsetTop - B.offsetTop + 2;
                t.removeChild(B), t.appendChild(this._document.createTextNode(ys)), (t.style.lineHeight = "normal"), (r.style.verticalAlign = "super");
                r = r.offsetTop - t.offsetTop + 2;
                return n.removeChild(t), { baseline: e, middle: r };
            }),
            (ms.prototype.getMetrics = function (A, e) {
                var t = A + " " + e;
                return void 0 === this._data[t] && (this._data[t] = this.parseMetrics(A, e)), this._data[t];
            }),
            ms);
    function ms(A) {
        (this._data = {}), (this._document = A);
    }
    var Ls,
        he = function (A, e) {
            (this.context = A), (this.options = e);
        },
        bs =
            (A(Ds, (Ls = he)),
            (Ds.prototype.applyEffects = function (A) {
                for (var e = this; this._activeEffects.length; ) this.popEffect();
                A.forEach(function (A) {
                    return e.applyEffect(A);
                });
            }),
            (Ds.prototype.applyEffect = function (A) {
                this.ctx.save(), 2 === A.type && (this.ctx.globalAlpha = A.opacity), 0 === A.type && (this.ctx.translate(A.offsetX, A.offsetY), this.ctx.transform(A.matrix[0], A.matrix[1], A.matrix[2], A.matrix[3], A.matrix[4], A.matrix[5]), this.ctx.translate(-A.offsetX, -A.offsetY)), Bs(A) && (this.path(A.path), this.ctx.clip()), this._activeEffects.push(A);
            }),
            (Ds.prototype.popEffect = function () {
                this._activeEffects.pop(), this.ctx.restore();
            }),
            (Ds.prototype.renderStack = function (e) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return e.element.container.styles.isVisible() ? [4, this.renderStackContent(e)] : [3, 2];
                            case 1:
                                A.sent(), (A.label = 2);
                            case 2:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderNode = function (e) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return Pt(e.container.flags, 16), e.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(e)] : [3, 3];
                            case 1:
                                return A.sent(), [4, this.renderNodeContent(e)];
                            case 2:
                                A.sent(), (A.label = 3);
                            case 3:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderTextWithLetterSpacing = function (t, A, r) {
                var B = this;
                0 === A
                    ? this.ctx.fillText(t.text, t.bounds.left, t.bounds.top + r)
                    : Zr(t.text).reduce(function (A, e) {
                          return B.ctx.fillText(e, A, t.bounds.top + r), A + B.ctx.measureText(e).width;
                      }, t.bounds.left);
            }),
            (Ds.prototype.createFontStyle = function (A) {
                var e = A.fontVariant
                        .filter(function (A) {
                            return "normal" === A || "small-caps" === A;
                        })
                        .join(""),
                    t = Gs(A.fontFamily).join(", "),
                    r = WA(A.fontSize) ? "" + A.fontSize.number + A.fontSize.unit : A.fontSize.number + "px";
                return [[A.fontStyle, e, A.fontWeight, r, t].join(" "), t, r];
            }),
            (Ds.prototype.renderTextNode = function (i, Q) {
                return a(this, void 0, void 0, function () {
                    var e,
                        t,
                        r,
                        B,
                        n,
                        s,
                        o = this;
                    return H(this, function (A) {
                        return (
                            (r = this.createFontStyle(Q)),
                            (e = r[0]),
                            (t = r[1]),
                            (r = r[2]),
                            (this.ctx.font = e),
                            (this.ctx.direction = 1 === Q.direction ? "rtl" : "ltr"),
                            (this.ctx.textAlign = "left"),
                            (this.ctx.textBaseline = "alphabetic"),
                            (r = this.fontMetrics.getMetrics(t, r)),
                            (B = r.baseline),
                            (n = r.middle),
                            (s = Q.paintOrder),
                            i.textBounds.forEach(function (t) {
                                s.forEach(function (A) {
                                    switch (A) {
                                        case 0:
                                            (o.ctx.fillStyle = ie(Q.color)), o.renderTextWithLetterSpacing(t, Q.letterSpacing, B);
                                            var e = Q.textShadow;
                                            e.length &&
                                                t.text.trim().length &&
                                                (e
                                                    .slice(0)
                                                    .reverse()
                                                    .forEach(function (A) {
                                                        (o.ctx.shadowColor = ie(A.color)), (o.ctx.shadowOffsetX = A.offsetX.number * o.options.scale), (o.ctx.shadowOffsetY = A.offsetY.number * o.options.scale), (o.ctx.shadowBlur = A.blur.number), o.renderTextWithLetterSpacing(t, Q.letterSpacing, B);
                                                    }),
                                                (o.ctx.shadowColor = ""),
                                                (o.ctx.shadowOffsetX = 0),
                                                (o.ctx.shadowOffsetY = 0),
                                                (o.ctx.shadowBlur = 0)),
                                                Q.textDecorationLine.length &&
                                                    ((o.ctx.fillStyle = ie(Q.textDecorationColor || Q.color)),
                                                    Q.textDecorationLine.forEach(function (A) {
                                                        switch (A) {
                                                            case 1:
                                                                o.ctx.fillRect(t.bounds.left, Math.round(t.bounds.top + B), t.bounds.width, 1);
                                                                break;
                                                            case 2:
                                                                o.ctx.fillRect(t.bounds.left, Math.round(t.bounds.top), t.bounds.width, 1);
                                                                break;
                                                            case 3:
                                                                o.ctx.fillRect(t.bounds.left, Math.ceil(t.bounds.top + n), t.bounds.width, 1);
                                                        }
                                                    }));
                                            break;
                                        case 1:
                                            Q.webkitTextStrokeWidth && t.text.trim().length && ((o.ctx.strokeStyle = ie(Q.webkitTextStrokeColor)), (o.ctx.lineWidth = Q.webkitTextStrokeWidth), (o.ctx.lineJoin = window.chrome ? "miter" : "round"), o.ctx.strokeText(t.text, t.bounds.left, t.bounds.top + B)), (o.ctx.strokeStyle = ""), (o.ctx.lineWidth = 0), (o.ctx.lineJoin = "miter");
                                    }
                                });
                            }),
                            [2]
                        );
                    });
                });
            }),
            (Ds.prototype.renderReplacedElement = function (A, e, t) {
                var r;
                t && 0 < A.intrinsicWidth && 0 < A.intrinsicHeight && ((r = ls(A)), (e = rs(e)), this.path(e), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(t, 0, 0, A.intrinsicWidth, A.intrinsicHeight, r.left, r.top, r.width, r.height), this.ctx.restore());
            }),
            (Ds.prototype.renderNodeContent = function (w) {
                return a(this, void 0, void 0, function () {
                    var e, t, r, B, n, s, o, i, Q, c, a, g;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                this.applyEffects(w.getEffects(4)), (e = w.container), (t = w.curves), (r = e.styles), (B = 0), (n = e.textNodes), (A.label = 1);
                            case 1:
                                return B < n.length ? ((s = n[B]), [4, this.renderTextNode(s, r)]) : [3, 4];
                            case 2:
                                A.sent(), (A.label = 3);
                            case 3:
                                return B++, [3, 1];
                            case 4:
                                if (!(e instanceof tB)) return [3, 8];
                                A.label = 5;
                            case 5:
                                return A.trys.push([5, 7, , 8]), [4, this.context.cache.match(e.src)];
                            case 6:
                                return (Q = A.sent()), this.renderReplacedElement(e, t, Q), [3, 8];
                            case 7:
                                return A.sent(), this.context.logger.error("Error loading image " + e.src), [3, 8];
                            case 8:
                                if ((e instanceof nB && this.renderReplacedElement(e, t, e.canvas), !(e instanceof iB))) return [3, 12];
                                A.label = 9;
                            case 9:
                                return A.trys.push([9, 11, , 12]), [4, this.context.cache.match(e.svg)];
                            case 10:
                                return (Q = A.sent()), this.renderReplacedElement(e, t, Q), [3, 12];
                            case 11:
                                return A.sent(), this.context.logger.error("Error loading svg " + e.svg.substring(0, 255)), [3, 12];
                            case 12:
                                return e instanceof vB && e.tree ? [4, new Ds(this.context, { scale: this.options.scale, backgroundColor: e.backgroundColor, x: 0, y: 0, width: e.width, height: e.height }).render(e.tree)] : [3, 14];
                            case 13:
                                (s = A.sent()), e.width && e.height && this.ctx.drawImage(s, 0, 0, e.width, e.height, e.bounds.left, e.bounds.top, e.bounds.width, e.bounds.height), (A.label = 14);
                            case 14:
                                if (
                                    (e instanceof pB &&
                                        ((i = Math.min(e.bounds.width, e.bounds.height)),
                                        e.type === hB
                                            ? e.checked &&
                                              (this.ctx.save(),
                                              this.path([
                                                  new Zn(e.bounds.left + 0.39363 * i, e.bounds.top + 0.79 * i),
                                                  new Zn(e.bounds.left + 0.16 * i, e.bounds.top + 0.5549 * i),
                                                  new Zn(e.bounds.left + 0.27347 * i, e.bounds.top + 0.44071 * i),
                                                  new Zn(e.bounds.left + 0.39694 * i, e.bounds.top + 0.5649 * i),
                                                  new Zn(e.bounds.left + 0.72983 * i, e.bounds.top + 0.23 * i),
                                                  new Zn(e.bounds.left + 0.84 * i, e.bounds.top + 0.34085 * i),
                                                  new Zn(e.bounds.left + 0.39363 * i, e.bounds.top + 0.79 * i),
                                              ]),
                                              (this.ctx.fillStyle = ie(HB)),
                                              this.ctx.fill(),
                                              this.ctx.restore())
                                            : e.type === dB && e.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(e.bounds.left + i / 2, e.bounds.top + i / 2, i / 4, 0, 2 * Math.PI, !0), (this.ctx.fillStyle = ie(HB)), this.ctx.fill(), this.ctx.restore())),
                                    xs(e) && e.value.length)
                                ) {
                                    switch (((c = this.createFontStyle(r)), (a = c[0]), (i = c[1]), (c = this.fontMetrics.getMetrics(a, i).baseline), (this.ctx.font = a), (this.ctx.fillStyle = ie(r.color)), (this.ctx.textBaseline = "alphabetic"), (this.ctx.textAlign = Ss(e.styles.textAlign)), (g = ls(e)), (o = 0), e.styles.textAlign)) {
                                        case 1:
                                            o += g.width / 2;
                                            break;
                                        case 2:
                                            o += g.width;
                                    }
                                    (i = g.add(o, 0, 0, -g.height / 2 + 1)),
                                        this.ctx.save(),
                                        this.path([new Zn(g.left, g.top), new Zn(g.left + g.width, g.top), new Zn(g.left + g.width, g.top + g.height), new Zn(g.left, g.top + g.height)]),
                                        this.ctx.clip(),
                                        this.renderTextWithLetterSpacing(new Jr(e.value, i), r.letterSpacing, c),
                                        this.ctx.restore(),
                                        (this.ctx.textBaseline = "alphabetic"),
                                        (this.ctx.textAlign = "left");
                                }
                                if (!Pt(e.styles.display, 2048)) return [3, 20];
                                if (null === e.styles.listStyleImage) return [3, 19];
                                if (0 !== (c = e.styles.listStyleImage).type) return [3, 18];
                                (Q = void 0), (c = c.url), (A.label = 15);
                            case 15:
                                return A.trys.push([15, 17, , 18]), [4, this.context.cache.match(c)];
                            case 16:
                                return (Q = A.sent()), this.ctx.drawImage(Q, e.bounds.left - (Q.width + 10), e.bounds.top), [3, 18];
                            case 17:
                                return A.sent(), this.context.logger.error("Error loading list-style-image " + c), [3, 18];
                            case 18:
                                return [3, 20];
                            case 19:
                                w.listValue &&
                                    -1 !== e.styles.listStyleType &&
                                    ((a = this.createFontStyle(r)[0]),
                                    (this.ctx.font = a),
                                    (this.ctx.fillStyle = ie(r.color)),
                                    (this.ctx.textBaseline = "middle"),
                                    (this.ctx.textAlign = "right"),
                                    (g = new d(e.bounds.left, e.bounds.top + Ue(e.styles.paddingTop, e.bounds.width), e.bounds.width, Ye(r.lineHeight, r.fontSize.number) / 2 + 1)),
                                    this.renderTextWithLetterSpacing(new Jr(w.listValue, g), r.letterSpacing, Ye(r.lineHeight, r.fontSize.number) / 2 + 2),
                                    (this.ctx.textBaseline = "bottom"),
                                    (this.ctx.textAlign = "left")),
                                    (A.label = 20);
                            case 20:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderStackContent = function (C) {
                return a(this, void 0, void 0, function () {
                    var e, t, r, B, n, s, o, i, Q, c, a, g, w, U, l;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return Pt(C.element.container.flags, 16), [4, this.renderNodeBackgroundAndBorders(C.element)];
                            case 1:
                                A.sent(), (e = 0), (t = C.negativeZIndex), (A.label = 2);
                            case 2:
                                return e < t.length ? ((l = t[e]), [4, this.renderStack(l)]) : [3, 5];
                            case 3:
                                A.sent(), (A.label = 4);
                            case 4:
                                return e++, [3, 2];
                            case 5:
                                return [4, this.renderNodeContent(C.element)];
                            case 6:
                                A.sent(), (r = 0), (B = C.nonInlineLevel), (A.label = 7);
                            case 7:
                                return r < B.length ? ((l = B[r]), [4, this.renderNode(l)]) : [3, 10];
                            case 8:
                                A.sent(), (A.label = 9);
                            case 9:
                                return r++, [3, 7];
                            case 10:
                                (n = 0), (s = C.nonPositionedFloats), (A.label = 11);
                            case 11:
                                return n < s.length ? ((l = s[n]), [4, this.renderStack(l)]) : [3, 14];
                            case 12:
                                A.sent(), (A.label = 13);
                            case 13:
                                return n++, [3, 11];
                            case 14:
                                (o = 0), (i = C.nonPositionedInlineLevel), (A.label = 15);
                            case 15:
                                return o < i.length ? ((l = i[o]), [4, this.renderStack(l)]) : [3, 18];
                            case 16:
                                A.sent(), (A.label = 17);
                            case 17:
                                return o++, [3, 15];
                            case 18:
                                (Q = 0), (c = C.inlineLevel), (A.label = 19);
                            case 19:
                                return Q < c.length ? ((l = c[Q]), [4, this.renderNode(l)]) : [3, 22];
                            case 20:
                                A.sent(), (A.label = 21);
                            case 21:
                                return Q++, [3, 19];
                            case 22:
                                (a = 0), (g = C.zeroOrAutoZIndexOrTransformedOrOpacity), (A.label = 23);
                            case 23:
                                return a < g.length ? ((l = g[a]), [4, this.renderStack(l)]) : [3, 26];
                            case 24:
                                A.sent(), (A.label = 25);
                            case 25:
                                return a++, [3, 23];
                            case 26:
                                (w = 0), (U = C.positiveZIndex), (A.label = 27);
                            case 27:
                                return w < U.length ? ((l = U[w]), [4, this.renderStack(l)]) : [3, 30];
                            case 28:
                                A.sent(), (A.label = 29);
                            case 29:
                                return w++, [3, 27];
                            case 30:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.mask = function (A) {
                this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(A.slice(0).reverse()), this.ctx.closePath();
            }),
            (Ds.prototype.path = function (A) {
                this.ctx.beginPath(), this.formatPath(A), this.ctx.closePath();
            }),
            (Ds.prototype.formatPath = function (A) {
                var r = this;
                A.forEach(function (A, e) {
                    var t = $n(A) ? A.start : A;
                    0 === e ? r.ctx.moveTo(t.x, t.y) : r.ctx.lineTo(t.x, t.y), $n(A) && r.ctx.bezierCurveTo(A.startControl.x, A.startControl.y, A.endControl.x, A.endControl.y, A.end.x, A.end.y);
                });
            }),
            (Ds.prototype.renderRepeat = function (A, e, t, r) {
                this.path(A), (this.ctx.fillStyle = e), this.ctx.translate(t, r), this.ctx.fill(), this.ctx.translate(-t, -r);
            }),
            (Ds.prototype.resizeImage = function (A, e, t) {
                if (A.width === e && A.height === t) return A;
                var r = (null !== (r = this.canvas.ownerDocument) && void 0 !== r ? r : document).createElement("canvas");
                return (r.width = Math.max(1, e)), (r.height = Math.max(1, t)), r.getContext("2d").drawImage(A, 0, 0, A.width, A.height, 0, 0, e, t), r;
            }),
            (Ds.prototype.renderBackgroundImage = function (f) {
                return a(this, void 0, void 0, function () {
                    var h, e, d, t, r, B;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                (h = f.styles.backgroundImage.length - 1),
                                    (e = function (e) {
                                        var t, r, B, n, s, o, i, Q, c, a, g, w, U, l, C, u, F;
                                        return H(this, function (A) {
                                            switch (A.label) {
                                                case 0:
                                                    if (0 !== e.type) return [3, 5];
                                                    (t = void 0), (r = e.url), (A.label = 1);
                                                case 1:
                                                    return A.trys.push([1, 3, , 4]), [4, d.context.cache.match(r)];
                                                case 2:
                                                    return (t = A.sent()), [3, 4];
                                                case 3:
                                                    return A.sent(), d.context.logger.error("Error loading background-image " + r), [3, 4];
                                                case 4:
                                                    return t && ((B = Cs(f, h, [t.width, t.height, t.width / t.height])), (o = B[0]), (g = B[1]), (w = B[2]), (c = B[3]), (a = B[4]), (s = d.ctx.createPattern(d.resizeImage(t, c, a), "repeat")), d.renderRepeat(o, s, g, w)), [3, 6];
                                                case 5:
                                                    1 === e.type
                                                        ? ((F = Cs(f, h, [null, null, null])),
                                                          (o = F[0]),
                                                          (g = F[1]),
                                                          (w = F[2]),
                                                          (c = F[3]),
                                                          (a = F[4]),
                                                          (C = Ee(e.angle, c, a)),
                                                          (l = C[0]),
                                                          (B = C[1]),
                                                          (i = C[2]),
                                                          (u = C[3]),
                                                          (Q = C[4]),
                                                          ((F = document.createElement("canvas")).width = c),
                                                          (F.height = a),
                                                          (C = F.getContext("2d")),
                                                          (n = C.createLinearGradient(B, u, i, Q)),
                                                          pe(e.stops, l).forEach(function (A) {
                                                              return n.addColorStop(A.stop, ie(A.color));
                                                          }),
                                                          (C.fillStyle = n),
                                                          C.fillRect(0, 0, c, a),
                                                          0 < c && 0 < a && ((s = d.ctx.createPattern(F, "repeat")), d.renderRepeat(o, s, g, w)))
                                                        : 2 === e.type &&
                                                          ((u = Cs(f, h, [null, null, null])),
                                                          (o = u[0]),
                                                          (i = u[1]),
                                                          (Q = u[2]),
                                                          (c = u[3]),
                                                          (a = u[4]),
                                                          (l = 0 === e.position.length ? [ge] : e.position),
                                                          (g = Ue(l[0], c)),
                                                          (w = Ue(l[l.length - 1], a)),
                                                          (C = (function (A, e, t, r, B) {
                                                              var n,
                                                                  s,
                                                                  o,
                                                                  i,
                                                                  Q = 0,
                                                                  c = 0;
                                                              switch (A.size) {
                                                                  case 0:
                                                                      0 === A.shape ? (Q = c = Math.min(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - B))) : 1 === A.shape && ((Q = Math.min(Math.abs(e), Math.abs(e - r))), (c = Math.min(Math.abs(t), Math.abs(t - B))));
                                                                      break;
                                                                  case 2:
                                                                      0 === A.shape ? (Q = c = Math.min(Ie(e, t), Ie(e, t - B), Ie(e - r, t), Ie(e - r, t - B))) : 1 === A.shape && ((n = Math.min(Math.abs(t), Math.abs(t - B)) / Math.min(Math.abs(e), Math.abs(e - r))), (o = (s = ye(r, B, e, t, !0))[0]), (i = s[1]), (c = n * (Q = Ie(o - e, (i - t) / n))));
                                                                      break;
                                                                  case 1:
                                                                      0 === A.shape ? (Q = c = Math.max(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - B))) : 1 === A.shape && ((Q = Math.max(Math.abs(e), Math.abs(e - r))), (c = Math.max(Math.abs(t), Math.abs(t - B))));
                                                                      break;
                                                                  case 3:
                                                                      0 === A.shape ? (Q = c = Math.max(Ie(e, t), Ie(e, t - B), Ie(e - r, t), Ie(e - r, t - B))) : 1 === A.shape && ((n = Math.max(Math.abs(t), Math.abs(t - B)) / Math.max(Math.abs(e), Math.abs(e - r))), (o = (s = ye(r, B, e, t, !1))[0]), (i = s[1]), (c = n * (Q = Ie(o - e, (i - t) / n))));
                                                              }
                                                              return Array.isArray(A.size) && ((Q = Ue(A.size[0], r)), (c = 2 === A.size.length ? Ue(A.size[1], B) : Q)), [Q, c];
                                                          })(e, g, w, c, a)),
                                                          (F = C[0]),
                                                          (u = C[1]),
                                                          0 < F &&
                                                              0 < u &&
                                                              ((U = d.ctx.createRadialGradient(i + g, Q + w, 0, i + g, Q + w, F)),
                                                              pe(e.stops, 2 * F).forEach(function (A) {
                                                                  return U.addColorStop(A.stop, ie(A.color));
                                                              }),
                                                              d.path(o),
                                                              (d.ctx.fillStyle = U),
                                                              F !== u ? ((l = f.bounds.left + 0.5 * f.bounds.width), (C = f.bounds.top + 0.5 * f.bounds.height), (F = 1 / (u = u / F)), d.ctx.save(), d.ctx.translate(l, C), d.ctx.transform(1, 0, 0, u, 0, 0), d.ctx.translate(-l, -C), d.ctx.fillRect(i, F * (Q - C) + C, c, a * F), d.ctx.restore()) : d.ctx.fill())),
                                                        (A.label = 6);
                                                case 6:
                                                    return h--, [2];
                                            }
                                        });
                                    }),
                                    (d = this),
                                    (t = 0),
                                    (r = f.styles.backgroundImage.slice(0).reverse()),
                                    (A.label = 1);
                            case 1:
                                return t < r.length ? ((B = r[t]), [5, e(B)]) : [3, 4];
                            case 2:
                                A.sent(), (A.label = 3);
                            case 3:
                                return t++, [3, 1];
                            case 4:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderSolidBorder = function (e, t, r) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        return this.path(ws(r, t)), (this.ctx.fillStyle = ie(e)), this.ctx.fill(), [2];
                    });
                });
            }),
            (Ds.prototype.renderDoubleBorder = function (t, r, B, n) {
                return a(this, void 0, void 0, function () {
                    var e;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return r < 3 ? [4, this.renderSolidBorder(t, B, n)] : [3, 2];
                            case 1:
                                return A.sent(), [2];
                            case 2:
                                return (
                                    (e = (function (A, e) {
                                        switch (e) {
                                            case 0:
                                                return Hs(A.topLeftBorderBox, A.topLeftBorderDoubleOuterBox, A.topRightBorderBox, A.topRightBorderDoubleOuterBox);
                                            case 1:
                                                return Hs(A.topRightBorderBox, A.topRightBorderDoubleOuterBox, A.bottomRightBorderBox, A.bottomRightBorderDoubleOuterBox);
                                            case 2:
                                                return Hs(A.bottomRightBorderBox, A.bottomRightBorderDoubleOuterBox, A.bottomLeftBorderBox, A.bottomLeftBorderDoubleOuterBox);
                                            default:
                                                return Hs(A.bottomLeftBorderBox, A.bottomLeftBorderDoubleOuterBox, A.topLeftBorderBox, A.topLeftBorderDoubleOuterBox);
                                        }
                                    })(n, B)),
                                    this.path(e),
                                    (this.ctx.fillStyle = ie(t)),
                                    this.ctx.fill(),
                                    (e = (function (A, e) {
                                        switch (e) {
                                            case 0:
                                                return Hs(A.topLeftBorderDoubleInnerBox, A.topLeftPaddingBox, A.topRightBorderDoubleInnerBox, A.topRightPaddingBox);
                                            case 1:
                                                return Hs(A.topRightBorderDoubleInnerBox, A.topRightPaddingBox, A.bottomRightBorderDoubleInnerBox, A.bottomRightPaddingBox);
                                            case 2:
                                                return Hs(A.bottomRightBorderDoubleInnerBox, A.bottomRightPaddingBox, A.bottomLeftBorderDoubleInnerBox, A.bottomLeftPaddingBox);
                                            default:
                                                return Hs(A.bottomLeftBorderDoubleInnerBox, A.bottomLeftPaddingBox, A.topLeftBorderDoubleInnerBox, A.topLeftPaddingBox);
                                        }
                                    })(n, B)),
                                    this.path(e),
                                    this.ctx.fill(),
                                    [2]
                                );
                        }
                    });
                });
            }),
            (Ds.prototype.renderNodeBackgroundAndBorders = function (c) {
                return a(this, void 0, void 0, function () {
                    var e,
                        t,
                        r,
                        B,
                        n,
                        s,
                        o,
                        i,
                        Q = this;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return (this.applyEffects(c.getEffects(2)),
                                (e = c.container.styles),
                                (t = !oe(e.backgroundColor) || e.backgroundImage.length),
                                (r = [
                                    { style: e.borderTopStyle, color: e.borderTopColor, width: e.borderTopWidth },
                                    { style: e.borderRightStyle, color: e.borderRightColor, width: e.borderRightWidth },
                                    { style: e.borderBottomStyle, color: e.borderBottomColor, width: e.borderBottomWidth },
                                    { style: e.borderLeftStyle, color: e.borderLeftColor, width: e.borderLeftWidth },
                                ]),
                                (B = Ms(Es(e.backgroundClip, 0), c.curves)),
                                t || e.boxShadow.length)
                                    ? (this.ctx.save(), this.path(B), this.ctx.clip(), oe(e.backgroundColor) || ((this.ctx.fillStyle = ie(e.backgroundColor)), this.ctx.fill()), [4, this.renderBackgroundImage(c.container)])
                                    : [3, 2];
                            case 1:
                                A.sent(),
                                    this.ctx.restore(),
                                    e.boxShadow
                                        .slice(0)
                                        .reverse()
                                        .forEach(function (A) {
                                            Q.ctx.save();
                                            var t,
                                                r,
                                                B,
                                                n,
                                                e = ts(c.curves),
                                                s = A.inset ? 0 : 1e4,
                                                o =
                                                    ((t = -s + (A.inset ? 1 : -1) * A.spread.number),
                                                    (r = (A.inset ? 1 : -1) * A.spread.number),
                                                    (B = A.spread.number * (A.inset ? -2 : 2)),
                                                    (n = A.spread.number * (A.inset ? -2 : 2)),
                                                    e.map(function (A, e) {
                                                        switch (e) {
                                                            case 0:
                                                                return A.add(t, r);
                                                            case 1:
                                                                return A.add(t + B, r);
                                                            case 2:
                                                                return A.add(t + B, r + n);
                                                            case 3:
                                                                return A.add(t, r + n);
                                                        }
                                                        return A;
                                                    }));
                                            A.inset ? (Q.path(e), Q.ctx.clip(), Q.mask(o)) : (Q.mask(e), Q.ctx.clip(), Q.path(o)), (Q.ctx.shadowOffsetX = A.offsetX.number + s), (Q.ctx.shadowOffsetY = A.offsetY.number), (Q.ctx.shadowColor = ie(A.color)), (Q.ctx.shadowBlur = A.blur.number), (Q.ctx.fillStyle = A.inset ? ie(A.color) : "rgba(0,0,0,1)"), Q.ctx.fill(), Q.ctx.restore();
                                        }),
                                    (A.label = 2);
                            case 2:
                                (s = n = 0), (o = r), (A.label = 3);
                            case 3:
                                return s < o.length ? (0 !== (i = o[s]).style && !oe(i.color) && 0 < i.width ? (2 !== i.style ? [3, 5] : [4, this.renderDashedDottedBorder(i.color, i.width, n, c.curves, 2)]) : [3, 11]) : [3, 13];
                            case 4:
                                return A.sent(), [3, 11];
                            case 5:
                                return 3 !== i.style ? [3, 7] : [4, this.renderDashedDottedBorder(i.color, i.width, n, c.curves, 3)];
                            case 6:
                                return A.sent(), [3, 11];
                            case 7:
                                return 4 !== i.style ? [3, 9] : [4, this.renderDoubleBorder(i.color, i.width, n, c.curves)];
                            case 8:
                                return A.sent(), [3, 11];
                            case 9:
                                return [4, this.renderSolidBorder(i.color, n, c.curves)];
                            case 10:
                                A.sent(), (A.label = 11);
                            case 11:
                                n++, (A.label = 12);
                            case 12:
                                return s++, [3, 3];
                            case 13:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderDashedDottedBorder = function (g, w, U, l, C) {
                return a(this, void 0, void 0, function () {
                    var e, t, r, B, n, s, o, i, Q, c, a;
                    return H(this, function (A) {
                        return (
                            this.ctx.save(),
                            (Q = (function (A, e) {
                                switch (e) {
                                    case 0:
                                        return fs(A.topLeftBorderStroke, A.topRightBorderStroke);
                                    case 1:
                                        return fs(A.topRightBorderStroke, A.bottomRightBorderStroke);
                                    case 2:
                                        return fs(A.bottomRightBorderStroke, A.bottomLeftBorderStroke);
                                    default:
                                        return fs(A.bottomLeftBorderStroke, A.topLeftBorderStroke);
                                }
                            })(l, U)),
                            (e = ws(l, U)),
                            2 === C && (this.path(e), this.ctx.clip()),
                            (s = $n(e[0]) ? ((t = e[0].start.x), e[0].start.y) : ((t = e[0].x), e[0].y)),
                            (o = $n(e[1]) ? ((r = e[1].end.x), e[1].end.y) : ((r = e[1].x), e[1].y)),
                            (B = 0 === U || 2 === U ? Math.abs(t - r) : Math.abs(s - o)),
                            this.ctx.beginPath(),
                            3 === C ? this.formatPath(Q) : this.formatPath(e.slice(0, 2)),
                            (n = w < 3 ? 3 * w : 2 * w),
                            (s = w < 3 ? 2 * w : w),
                            3 === C && (s = n = w),
                            (o = !0),
                            B <= 2 * n ? (o = !1) : B <= 2 * n + s ? ((n *= i = B / (2 * n + s)), (s *= i)) : ((Q = Math.floor((B + s) / (n + s))), (i = (B - Q * n) / (Q - 1)), (s = (Q = (B - (Q + 1) * n) / Q) <= 0 || Math.abs(s - i) < Math.abs(s - Q) ? i : Q)),
                            o && (3 === C ? this.ctx.setLineDash([0, n + s]) : this.ctx.setLineDash([n, s])),
                            3 === C ? ((this.ctx.lineCap = "round"), (this.ctx.lineWidth = w)) : (this.ctx.lineWidth = 2 * w + 1.1),
                            (this.ctx.strokeStyle = ie(g)),
                            this.ctx.stroke(),
                            this.ctx.setLineDash([]),
                            2 === C && ($n(e[0]) && ((c = e[3]), (a = e[0]), this.ctx.beginPath(), this.formatPath([new Zn(c.end.x, c.end.y), new Zn(a.start.x, a.start.y)]), this.ctx.stroke()), $n(e[1]) && ((c = e[1]), (a = e[2]), this.ctx.beginPath(), this.formatPath([new Zn(c.end.x, c.end.y), new Zn(a.start.x, a.start.y)]), this.ctx.stroke())),
                            this.ctx.restore(),
                            [2]
                        );
                    });
                });
            }),
            (Ds.prototype.render = function (B) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return this.options.backgroundColor && ((this.ctx.fillStyle = ie(this.options.backgroundColor)), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), (t = new as((e = B), null)), (r = new cs(t)), hs(t, r, r, (e = [])), ds(t.container, e), [4, this.renderStack(r)];
                            case 1:
                                return A.sent(), this.applyEffects([]), [2, this.canvas];
                        }
                        var e, t, r;
                    });
                });
            }),
            Ds);
    function Ds(A, e) {
        A = Ls.call(this, A, e) || this;
        return (
            (A._activeEffects = []),
            (A.canvas = e.canvas || document.createElement("canvas")),
            (A.ctx = A.canvas.getContext("2d")),
            e.canvas || ((A.canvas.width = Math.floor(e.width * e.scale)), (A.canvas.height = Math.floor(e.height * e.scale)), (A.canvas.style.width = e.width + "px"), (A.canvas.style.height = e.height + "px")),
            (A.fontMetrics = new Ks(document)),
            A.ctx.scale(A.options.scale, A.options.scale),
            A.ctx.translate(-e.x, -e.y),
            (A.ctx.textBaseline = "bottom"),
            (A._activeEffects = []),
            A.context.logger.debug("Canvas renderer initialized (" + e.width + "x" + e.height + ") with scale " + e.scale),
            A
        );
    }
    var vs,
        xs = function (A) {
            return A instanceof LB || A instanceof yB || (A instanceof pB && A.type !== dB && A.type !== hB);
        },
        Ms = function (A, e) {
            switch (A) {
                case 0:
                    return ts(e);
                case 2:
                    return [e.topLeftContentBox, e.topRightContentBox, e.bottomRightContentBox, e.bottomLeftContentBox];
                default:
                    return rs(e);
            }
        },
        Ss = function (A) {
            switch (A) {
                case 1:
                    return "center";
                case 2:
                    return "right";
                default:
                    return "left";
            }
        },
        Ts = ["-apple-system", "system-ui"],
        Gs = function (A) {
            return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
                ? A.filter(function (A) {
                      return -1 === Ts.indexOf(A);
                  })
                : A;
        },
        Os =
            (A(Vs, (vs = he)),
            (Vs.prototype.render = function (t) {
                return a(this, void 0, void 0, function () {
                    var e;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return (e = Nr(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, t)), [4, ks(e)];
                            case 1:
                                return (e = A.sent()), this.options.backgroundColor && ((this.ctx.fillStyle = ie(this.options.backgroundColor)), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(e, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
                        }
                    });
                });
            }),
            Vs);
    function Vs(A, e) {
        A = vs.call(this, A, e) || this;
        return (
            (A.canvas = e.canvas || document.createElement("canvas")),
            (A.ctx = A.canvas.getContext("2d")),
            (A.options = e),
            (A.canvas.width = Math.floor(e.width * e.scale)),
            (A.canvas.height = Math.floor(e.height * e.scale)),
            (A.canvas.style.width = e.width + "px"),
            (A.canvas.style.height = e.height + "px"),
            A.ctx.scale(A.options.scale, A.options.scale),
            A.ctx.translate(-e.x, -e.y),
            A.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + e.scale),
            A
        );
    }
    var ks = function (r) {
            return new Promise(function (A, e) {
                var t = new Image();
                (t.onload = function () {
                    A(t);
                }),
                    (t.onerror = e),
                    (t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(r)));
            });
        },
        Rs =
            ((Ns.prototype.debug = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.debug ? console.debug.apply(console, t([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
            }),
            (Ns.prototype.getTime = function () {
                return Date.now() - this.start;
            }),
            (Ns.prototype.info = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && "undefined" != typeof window && window.console && "function" == typeof console.info && console.info.apply(console, t([this.id, this.getTime() + "ms"], A));
            }),
            (Ns.prototype.warn = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.warn ? console.warn.apply(console, t([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
            }),
            (Ns.prototype.error = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.error ? console.error.apply(console, t([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
            }),
            (Ns.instances = {}),
            Ns);
    function Ns(A) {
        var e = A.id,
            A = A.enabled;
        (this.id = e), (this.enabled = A), (this.start = Date.now());
    }
    var Ps = ((Xs.instanceCount = 1), Xs);
    function Xs(A, e) {
        (this.windowBounds = e), (this.instanceName = "#" + Xs.instanceCount++), (this.logger = new Rs({ id: this.instanceName, enabled: A.logging })), (this.cache = null !== (e = A.cache) && void 0 !== e ? e : new On(this, A));
    }
    "undefined" != typeof window && Tn.setContext(window);
    var Js = function (u, F) {
            return a(void 0, void 0, void 0, function () {
                var e, t, r, B, n, s, o, i, Q, c, a, g, w, U, l, C;
                return H(this, function (A) {
                    switch (A.label) {
                        case 0:
                            if (!u || "object" != typeof u) return [2, Promise.reject("Invalid element provided as first argument")];
                            if (!(e = u.ownerDocument)) throw new Error("Element is not attached to a Document");
                            if (!(t = e.defaultView)) throw new Error("Document is not attached to a Window");
                            return (
                                (w = { allowTaint: null !== (U = F.allowTaint) && void 0 !== U && U, imageTimeout: null !== (c = F.imageTimeout) && void 0 !== c ? c : 15e3, proxy: F.proxy, useCORS: null !== (a = F.useCORS) && void 0 !== a && a }),
                                (U = h({ logging: null === (g = F.logging) || void 0 === g || g, cache: F.cache }, w)),
                                (c = { windowWidth: null !== (c = F.windowWidth) && void 0 !== c ? c : t.innerWidth, windowHeight: null !== (a = F.windowHeight) && void 0 !== a ? a : t.innerHeight, scrollX: null !== (g = F.scrollX) && void 0 !== g ? g : t.pageXOffset, scrollY: null !== (w = F.scrollY) && void 0 !== w ? w : t.pageYOffset }),
                                (a = new d(c.scrollX, c.scrollY, c.windowWidth, c.windowHeight)),
                                (g = new Ps(U, a)),
                                (c = null !== (w = F.foreignObjectRendering) && void 0 !== w && w),
                                (w = { allowTaint: null !== (U = F.allowTaint) && void 0 !== U && U, onclone: F.onclone, ignoreElements: F.ignoreElements, inlineImages: c, copyStyles: c }),
                                g.logger.debug("Starting document clone with size " + a.width + "x" + a.height + " scrolled to " + -a.left + "," + -a.top),
                                (U = new dn(g, u, w)),
                                (w = U.clonedReferenceElement) ? [4, U.toIFrame(e, a)] : [2, Promise.reject("Unable to find element in cloned iframe")]
                            );
                        case 1:
                            return ((r = A.sent()),
                            (l =
                                jB(w) || "HTML" === w.tagName
                                    ? (function (A) {
                                          var e = A.body,
                                              t = A.documentElement;
                                          if (!e || !t) throw new Error("Unable to get document size");
                                          (A = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth))), (t = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight)));
                                          return new d(0, 0, A, t);
                                      })(w.ownerDocument)
                                    : f(g, w)),
                            (B = l.width),
                            (n = l.height),
                            (s = l.left),
                            (o = l.top),
                            (i = Ys(g, w, F.backgroundColor)),
                            (l = {
                                canvas: F.canvas,
                                backgroundColor: i,
                                scale: null !== (l = null !== (l = F.scale) && void 0 !== l ? l : t.devicePixelRatio) && void 0 !== l ? l : 1,
                                x: (null !== (l = F.x) && void 0 !== l ? l : 0) + s,
                                y: (null !== (l = F.y) && void 0 !== l ? l : 0) + o,
                                width: null !== (l = F.width) && void 0 !== l ? l : Math.ceil(B),
                                height: null !== (l = F.height) && void 0 !== l ? l : Math.ceil(n),
                            }),
                            c)
                                ? (g.logger.debug("Document cloned, using foreign object rendering"), [4, new Os(g, l).render(w)])
                                : [3, 3];
                        case 2:
                            return (Q = A.sent()), [3, 5];
                        case 3:
                            return (
                                g.logger.debug("Document cloned, element located at " + s + "," + o + " with size " + B + "x" + n + " using computed rendering"),
                                g.logger.debug("Starting DOM parsing"),
                                (C = kB(g, w)),
                                i === C.styles.backgroundColor && (C.styles.backgroundColor = Le.TRANSPARENT),
                                g.logger.debug("Starting renderer for element at " + l.x + "," + l.y + " with size " + l.width + "x" + l.height),
                                [4, new bs(g, l).render(C)]
                            );
                        case 4:
                            (Q = A.sent()), (A.label = 5);
                        case 5:
                            return (null !== (C = F.removeContainer) && void 0 !== C && !C) || dn.destroy(r) || g.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore"), g.logger.debug("Finished rendering"), [2, Q];
                    }
                });
            });
        },
        Ys = function (A, e, t) {
            var r = e.ownerDocument,
                B = r.documentElement ? fe(A, getComputedStyle(r.documentElement).backgroundColor) : Le.TRANSPARENT,
                n = r.body ? fe(A, getComputedStyle(r.body).backgroundColor) : Le.TRANSPARENT,
                t = "string" == typeof t ? fe(A, t) : null === t ? Le.TRANSPARENT : 4294967295;
            return e === r.documentElement ? (oe(B) ? (oe(n) ? t : n) : B) : t;
        };
    return function (A, e) {
        return Js(A, (e = void 0 === e ? {} : e));
    };
});
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
!(function (A, e) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((A = "undefined" != typeof globalThis ? globalThis : A || self).html2canvas = e());
})(this, function () {
    "use strict";
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var r = function (A, e) {
        return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function (A, e) {
                    A.__proto__ = e;
                }) ||
            function (A, e) {
                for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (A[t] = e[t]);
            })(A, e);
    };
    function A(A, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
        function t() {
            this.constructor = A;
        }
        r(A, e), (A.prototype = null === e ? Object.create(e) : ((t.prototype = e.prototype), new t()));
    }
    var h = function () {
        return (h =
            Object.assign ||
            function (A) {
                for (var e, t = 1, r = arguments.length; t < r; t++) for (var B in (e = arguments[t])) Object.prototype.hasOwnProperty.call(e, B) && (A[B] = e[B]);
                return A;
            }).apply(this, arguments);
    };
    function a(A, s, o, i) {
        return new (o = o || Promise)(function (t, e) {
            function r(A) {
                try {
                    n(i.next(A));
                } catch (A) {
                    e(A);
                }
            }
            function B(A) {
                try {
                    n(i.throw(A));
                } catch (A) {
                    e(A);
                }
            }
            function n(A) {
                var e;
                A.done
                    ? t(A.value)
                    : ((e = A.value) instanceof o
                          ? e
                          : new o(function (A) {
                                A(e);
                            })
                      ).then(r, B);
            }
            n((i = i.apply(A, s || [])).next());
        });
    }
    function H(t, r) {
        var B,
            n,
            s,
            o = {
                label: 0,
                sent: function () {
                    if (1 & s[0]) throw s[1];
                    return s[1];
                },
                trys: [],
                ops: [],
            },
            A = { next: e(0), throw: e(1), return: e(2) };
        return (
            "function" == typeof Symbol &&
                (A[Symbol.iterator] = function () {
                    return this;
                }),
            A
        );
        function e(e) {
            return function (A) {
                return (function (e) {
                    if (B) throw new TypeError("Generator is already executing.");
                    for (; o; )
                        try {
                            if (((B = 1), n && (s = 2 & e[0] ? n.return : e[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, e[1])).done)) return s;
                            switch (((n = 0), (e = s ? [2 & e[0], s.value] : e)[0])) {
                                case 0:
                                case 1:
                                    s = e;
                                    break;
                                case 4:
                                    return o.label++, { value: e[1], done: !1 };
                                case 5:
                                    o.label++, (n = e[1]), (e = [0]);
                                    continue;
                                case 7:
                                    (e = o.ops.pop()), o.trys.pop();
                                    continue;
                                default:
                                    if (!(s = 0 < (s = o.trys).length && s[s.length - 1]) && (6 === e[0] || 2 === e[0])) {
                                        o = 0;
                                        continue;
                                    }
                                    if (3 === e[0] && (!s || (e[1] > s[0] && e[1] < s[3]))) {
                                        o.label = e[1];
                                        break;
                                    }
                                    if (6 === e[0] && o.label < s[1]) {
                                        (o.label = s[1]), (s = e);
                                        break;
                                    }
                                    if (s && o.label < s[2]) {
                                        (o.label = s[2]), o.ops.push(e);
                                        break;
                                    }
                                    s[2] && o.ops.pop(), o.trys.pop();
                                    continue;
                            }
                            e = r.call(t, o);
                        } catch (A) {
                            (e = [6, A]), (n = 0);
                        } finally {
                            B = s = 0;
                        }
                    if (5 & e[0]) throw e[1];
                    return { value: e[0] ? e[1] : void 0, done: !0 };
                })([e, A]);
            };
        }
    }
    function t(A, e, t) {
        if (t || 2 === arguments.length) for (var r, B = 0, n = e.length; B < n; B++) (!r && B in e) || ((r = r || Array.prototype.slice.call(e, 0, B))[B] = e[B]);
        return A.concat(r || e);
    }
    var d =
        ((B.prototype.add = function (A, e, t, r) {
            return new B(this.left + A, this.top + e, this.width + t, this.height + r);
        }),
        (B.fromClientRect = function (A, e) {
            return new B(e.left + A.windowBounds.left, e.top + A.windowBounds.top, e.width, e.height);
        }),
        (B.fromDOMRectList = function (A, e) {
            e = Array.from(e).find(function (A) {
                return 0 !== A.width;
            });
            return e ? new B(e.left + A.windowBounds.left, e.top + A.windowBounds.top, e.width, e.height) : B.EMPTY;
        }),
        (B.EMPTY = new B(0, 0, 0, 0)),
        B);
    function B(A, e, t, r) {
        (this.left = A), (this.top = e), (this.width = t), (this.height = r);
    }
    for (
        var f = function (A, e) {
                return d.fromClientRect(A, e.getBoundingClientRect());
            },
            Q = function (A) {
                for (var e = [], t = 0, r = A.length; t < r; ) {
                    var B,
                        n = A.charCodeAt(t++);
                    55296 <= n && n <= 56319 && t < r ? (56320 == (64512 & (B = A.charCodeAt(t++))) ? e.push(((1023 & n) << 10) + (1023 & B) + 65536) : (e.push(n), t--)) : e.push(n);
                }
                return e;
            },
            g = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
                var t = A.length;
                if (!t) return "";
                for (var r = [], B = -1, n = ""; ++B < t; ) {
                    var s = A[B];
                    s <= 65535 ? r.push(s) : ((s -= 65536), r.push(55296 + (s >> 10), (s % 1024) + 56320)), (B + 1 === t || 16384 < r.length) && ((n += String.fromCharCode.apply(String, r)), (r.length = 0));
                }
                return n;
            },
            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            n = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            s = 0;
        s < e.length;
        s++
    )
        n[e.charCodeAt(s)] = s;
    for (var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i = 0; i < o.length; i++) c[o.charCodeAt(i)] = i;
    function w(A, e, t) {
        return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
    }
    var U =
        ((l.prototype.get = function (A) {
            var e;
            if (0 <= A) {
                if (A < 55296 || (56319 < A && A <= 65535)) return (e = this.index[A >> 5]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 65535) return (e = this.index[2048 + ((A - 55296) >> 5)]), this.data[(e = (e << 2) + (31 & A))];
                if (A < this.highStart) return (e = this.index[(e = 2080 + (A >> 11))]), (e = this.index[(e += (A >> 5) & 63)]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 1114111) return this.data[this.highValueIndex];
            }
            return this.errorValue;
        }),
        l);
    function l(A, e, t, r, B, n) {
        (this.initialValue = A), (this.errorValue = e), (this.highStart = t), (this.highValueIndex = r), (this.index = B), (this.data = n);
    }
    for (var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), F = 0; F < C.length; F++) u[C.charCodeAt(F)] = F;
    function p(A, e, t, r) {
        var B = r[t];
        if (Array.isArray(A) ? -1 !== A.indexOf(B) : A === B)
            for (var n = t; n <= r.length; ) {
                if ((o = r[++n]) === e) return 1;
                if (o !== D) break;
            }
        if (B === D)
            for (n = t; 0 < n; ) {
                var s = r[--n];
                if (Array.isArray(A) ? -1 !== A.indexOf(s) : A === s)
                    for (var o, i = t; i <= r.length; ) {
                        if ((o = r[++i]) === e) return 1;
                        if (o !== D) break;
                    }
                if (s !== D) break;
            }
    }
    function E(A, e) {
        for (var t = A; 0 <= t; ) {
            var r = e[t];
            if (r !== D) return r;
            t--;
        }
        return 0;
    }
    function I(t, A) {
        var e = (B = (function (A, r) {
                void 0 === r && (r = "strict");
                var B = [],
                    n = [],
                    s = [];
                return (
                    A.forEach(function (A, e) {
                        var t = rA.get(A);
                        if ((50 < t ? (s.push(!0), (t -= 50)) : s.push(!1), -1 !== ["normal", "auto", "loose"].indexOf(r) && -1 !== [8208, 8211, 12316, 12448].indexOf(A))) return n.push(e), B.push(16);
                        if (4 !== t && 11 !== t) return n.push(e), 31 === t ? B.push("strict" === r ? O : q) : t === AA || 29 === t ? B.push(J) : 43 === t ? ((131072 <= A && A <= 196605) || (196608 <= A && A <= 262141) ? B.push(q) : B.push(J)) : void B.push(t);
                        if (0 === e) return n.push(e), B.push(J);
                        t = B[e - 1];
                        return -1 === iA.indexOf(t) ? (n.push(n[e - 1]), B.push(t)) : (n.push(e), B.push(J));
                    }),
                    [n, B, s]
                );
            })(t, (A = A || { lineBreak: "normal", wordBreak: "normal" }).lineBreak))[0],
            r = B[1],
            B = B[2];
        return [
            e,
            (r =
                "break-all" === A.wordBreak || "break-word" === A.wordBreak
                    ? r.map(function (A) {
                          return -1 !== [R, J, AA].indexOf(A) ? q : A;
                      })
                    : r),
            "keep-all" === A.wordBreak
                ? B.map(function (A, e) {
                      return A && 19968 <= t[e] && t[e] <= 40959;
                  })
                : void 0,
        ];
    }
    var y,
        K,
        m,
        L,
        b,
        D = 10,
        v = 13,
        x = 15,
        M = 17,
        S = 18,
        T = 19,
        G = 20,
        O = 21,
        V = 22,
        k = 24,
        R = 25,
        N = 26,
        P = 27,
        X = 28,
        J = 30,
        Y = 32,
        W = 33,
        Z = 34,
        _ = 35,
        q = 37,
        j = 38,
        z = 39,
        $ = 40,
        AA = 42,
        eA = [9001, 65288],
        tA = "×",
        rA =
            ((m = (function (A) {
                var e,
                    t,
                    r,
                    B,
                    n = 0.75 * A.length,
                    s = A.length,
                    o = 0;
                "=" === A[A.length - 1] && (n--, "=" === A[A.length - 2] && n--);
                for (var n = new ("undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? ArrayBuffer : Array)(n), i = Array.isArray(n) ? n : new Uint8Array(n), Q = 0; Q < s; Q += 4)
                    (e = c[A.charCodeAt(Q)]), (t = c[A.charCodeAt(Q + 1)]), (r = c[A.charCodeAt(Q + 2)]), (B = c[A.charCodeAt(Q + 3)]), (i[o++] = (e << 2) | (t >> 4)), (i[o++] = ((15 & t) << 4) | (r >> 2)), (i[o++] = ((3 & r) << 6) | (63 & B));
                return n;
            })(
                (y =
                    "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==")
            )),
            (L = Array.isArray(m)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 4) t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
                      return t;
                  })(m)
                : new Uint32Array(m)),
            (b = Array.isArray(m)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 2) t.push((A[r + 1] << 8) | A[r]);
                      return t;
                  })(m)
                : new Uint16Array(m)),
            (y = w(b, 12, L[4] / 2)),
            (K = 2 === L[5] ? w(b, (24 + L[4]) / 2) : ((m = L), (b = Math.ceil((24 + L[4]) / 4)), m.slice ? m.slice(b, K) : new Uint32Array(Array.prototype.slice.call(m, b, K)))),
            new U(L[0], L[1], L[2], L[3], y, K)),
        BA = [J, 36],
        nA = [1, 2, 3, 5],
        sA = [D, 8],
        oA = [P, N],
        iA = nA.concat(sA),
        QA = [j, z, $, Z, _],
        cA = [x, v],
        aA =
            ((gA.prototype.slice = function () {
                return g.apply(void 0, this.codePoints.slice(this.start, this.end));
            }),
            gA);
    function gA(A, e, t, r) {
        (this.codePoints = A), (this.required = "!" === e), (this.start = t), (this.end = r);
    }
    function wA(A, e) {
        var t = Q(A),
            r = (e = I(t, e))[0],
            B = e[1],
            n = e[2],
            s = t.length,
            o = 0,
            i = 0;
        return {
            next: function () {
                if (s <= i) return { done: !0, value: null };
                for (
                    var A = tA;
                    i < s &&
                    (A = (function (A, e, t, r, B) {
                        if (0 === t[r]) return tA;
                        var n = r - 1;
                        if (Array.isArray(B) && !0 === B[n]) return tA;
                        var s = n - 1,
                            o = 1 + n,
                            i = e[n],
                            r = 0 <= s ? e[s] : 0,
                            B = e[o];
                        if (2 === i && 3 === B) return tA;
                        if (-1 !== nA.indexOf(i)) return "!";
                        if (-1 !== nA.indexOf(B)) return tA;
                        if (-1 !== sA.indexOf(B)) return tA;
                        if (8 === E(n, e)) return "÷";
                        if (11 === rA.get(A[n])) return tA;
                        if ((i === Y || i === W) && 11 === rA.get(A[o])) return tA;
                        if (7 === i || 7 === B) return tA;
                        if (9 === i) return tA;
                        if (-1 === [D, v, x].indexOf(i) && 9 === B) return tA;
                        if (-1 !== [M, S, T, k, X].indexOf(B)) return tA;
                        if (E(n, e) === V) return tA;
                        if (p(23, V, n, e)) return tA;
                        if (p([M, S], O, n, e)) return tA;
                        if (p(12, 12, n, e)) return tA;
                        if (i === D) return "÷";
                        if (23 === i || 23 === B) return tA;
                        if (16 === B || 16 === i) return "÷";
                        if (-1 !== [v, x, O].indexOf(B) || 14 === i) return tA;
                        if (36 === r && -1 !== cA.indexOf(i)) return tA;
                        if (i === X && 36 === B) return tA;
                        if (B === G) return tA;
                        if ((-1 !== BA.indexOf(B) && i === R) || (-1 !== BA.indexOf(i) && B === R)) return tA;
                        if ((i === P && -1 !== [q, Y, W].indexOf(B)) || (-1 !== [q, Y, W].indexOf(i) && B === N)) return tA;
                        if ((-1 !== BA.indexOf(i) && -1 !== oA.indexOf(B)) || (-1 !== oA.indexOf(i) && -1 !== BA.indexOf(B))) return tA;
                        if ((-1 !== [P, N].indexOf(i) && (B === R || (-1 !== [V, x].indexOf(B) && e[1 + o] === R))) || (-1 !== [V, x].indexOf(i) && B === R) || (i === R && -1 !== [R, X, k].indexOf(B))) return tA;
                        if (-1 !== [R, X, k, M, S].indexOf(B))
                            for (var Q = n; 0 <= Q; ) {
                                if ((c = e[Q]) === R) return tA;
                                if (-1 === [X, k].indexOf(c)) break;
                                Q--;
                            }
                        if (-1 !== [P, N].indexOf(B))
                            for (var c, Q = -1 !== [M, S].indexOf(i) ? s : n; 0 <= Q; ) {
                                if ((c = e[Q]) === R) return tA;
                                if (-1 === [X, k].indexOf(c)) break;
                                Q--;
                            }
                        if ((j === i && -1 !== [j, z, Z, _].indexOf(B)) || (-1 !== [z, Z].indexOf(i) && -1 !== [z, $].indexOf(B)) || (-1 !== [$, _].indexOf(i) && B === $)) return tA;
                        if ((-1 !== QA.indexOf(i) && -1 !== [G, N].indexOf(B)) || (-1 !== QA.indexOf(B) && i === P)) return tA;
                        if (-1 !== BA.indexOf(i) && -1 !== BA.indexOf(B)) return tA;
                        if (i === k && -1 !== BA.indexOf(B)) return tA;
                        if ((-1 !== BA.concat(R).indexOf(i) && B === V && -1 === eA.indexOf(A[o])) || (-1 !== BA.concat(R).indexOf(B) && i === S)) return tA;
                        if (41 === i && 41 === B) {
                            for (var a = t[n], g = 1; 0 < a && 41 === e[--a]; ) g++;
                            if (g % 2 != 0) return tA;
                        }
                        return i === Y && B === W ? tA : "÷";
                    })(t, B, r, ++i, n)) === tA;

                );
                if (A === tA && i !== s) return { done: !0, value: null };
                var e = new aA(t, A, o, i);
                return (o = i), { value: e, done: !1 };
            },
        };
    }
    function UA(A) {
        return 48 <= A && A <= 57;
    }
    function lA(A) {
        return UA(A) || (65 <= A && A <= 70) || (97 <= A && A <= 102);
    }
    function CA(A) {
        return 10 === A || 9 === A || 32 === A;
    }
    function uA(A) {
        return (97 <= (t = e = A) && t <= 122) || (65 <= (e = e) && e <= 90) || 128 <= A || 95 === A;
        var e, t;
    }
    function FA(A) {
        return uA(A) || UA(A) || 45 === A;
    }
    function hA(A, e) {
        return 92 === A && 10 !== e;
    }
    function dA(A, e, t) {
        return 45 === A ? uA(e) || hA(e, t) : !!uA(A) || (92 === A && 10 !== e);
    }
    function fA(A, e, t) {
        return 43 === A || 45 === A ? !!UA(e) || (46 === e && UA(t)) : UA(46 === A ? e : A);
    }
    var HA = { type: 2 },
        pA = { type: 3 },
        EA = { type: 4 },
        IA = { type: 13 },
        yA = { type: 8 },
        KA = { type: 21 },
        mA = { type: 9 },
        LA = { type: 10 },
        bA = { type: 11 },
        DA = { type: 12 },
        vA = { type: 14 },
        xA = { type: 23 },
        MA = { type: 1 },
        SA = { type: 25 },
        TA = { type: 24 },
        GA = { type: 26 },
        OA = { type: 27 },
        VA = { type: 28 },
        kA = { type: 29 },
        RA = { type: 31 },
        NA = { type: 32 },
        PA =
            ((XA.prototype.write = function (A) {
                this._value = this._value.concat(Q(A));
            }),
            (XA.prototype.read = function () {
                for (var A = [], e = this.consumeToken(); e !== NA; ) A.push(e), (e = this.consumeToken());
                return A;
            }),
            (XA.prototype.consumeToken = function () {
                var A = this.consumeCodePoint();
                switch (A) {
                    case 34:
                        return this.consumeStringToken(34);
                    case 35:
                        var e = this.peekCodePoint(0),
                            t = this.peekCodePoint(1),
                            r = this.peekCodePoint(2);
                        if (FA(e) || hA(t, r)) {
                            var B = dA(e, t, r) ? 2 : 1;
                            return { type: 5, value: this.consumeName(), flags: B };
                        }
                        break;
                    case 36:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), IA;
                        break;
                    case 39:
                        return this.consumeStringToken(39);
                    case 40:
                        return HA;
                    case 41:
                        return pA;
                    case 42:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), vA;
                        break;
                    case 43:
                        if (fA(A, this.peekCodePoint(0), this.peekCodePoint(1))) return this.reconsumeCodePoint(A), this.consumeNumericToken();
                        break;
                    case 44:
                        return EA;
                    case 45:
                        var r = A,
                            B = this.peekCodePoint(0),
                            n = this.peekCodePoint(1);
                        if (fA(r, B, n)) return this.reconsumeCodePoint(A), this.consumeNumericToken();
                        if (dA(r, B, n)) return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
                        if (45 === B && 62 === n) return this.consumeCodePoint(), this.consumeCodePoint(), TA;
                        break;
                    case 46:
                        if (fA(A, this.peekCodePoint(0), this.peekCodePoint(1))) return this.reconsumeCodePoint(A), this.consumeNumericToken();
                        break;
                    case 47:
                        if (42 === this.peekCodePoint(0))
                            for (this.consumeCodePoint(); ; ) {
                                var s = this.consumeCodePoint();
                                if (42 === s && 47 === (s = this.consumeCodePoint())) return this.consumeToken();
                                if (-1 === s) return this.consumeToken();
                            }
                        break;
                    case 58:
                        return GA;
                    case 59:
                        return OA;
                    case 60:
                        if (33 === this.peekCodePoint(0) && 45 === this.peekCodePoint(1) && 45 === this.peekCodePoint(2)) return this.consumeCodePoint(), this.consumeCodePoint(), SA;
                        break;
                    case 64:
                        var n = this.peekCodePoint(0),
                            o = this.peekCodePoint(1),
                            i = this.peekCodePoint(2);
                        if (dA(n, o, i)) return { type: 7, value: this.consumeName() };
                        break;
                    case 91:
                        return VA;
                    case 92:
                        if (hA(A, this.peekCodePoint(0))) return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
                        break;
                    case 93:
                        return kA;
                    case 61:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), yA;
                        break;
                    case 123:
                        return bA;
                    case 125:
                        return DA;
                    case 117:
                    case 85:
                        (o = this.peekCodePoint(0)), (i = this.peekCodePoint(1));
                        return 43 !== o || (!lA(i) && 63 !== i) || (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
                    case 124:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), mA;
                        if (124 === this.peekCodePoint(0)) return this.consumeCodePoint(), KA;
                        break;
                    case 126:
                        if (61 === this.peekCodePoint(0)) return this.consumeCodePoint(), LA;
                        break;
                    case -1:
                        return NA;
                }
                return CA(A) ? (this.consumeWhiteSpace(), RA) : UA(A) ? (this.reconsumeCodePoint(A), this.consumeNumericToken()) : uA(A) ? (this.reconsumeCodePoint(A), this.consumeIdentLikeToken()) : { type: 6, value: g(A) };
            }),
            (XA.prototype.consumeCodePoint = function () {
                var A = this._value.shift();
                return void 0 === A ? -1 : A;
            }),
            (XA.prototype.reconsumeCodePoint = function (A) {
                this._value.unshift(A);
            }),
            (XA.prototype.peekCodePoint = function (A) {
                return A >= this._value.length ? -1 : this._value[A];
            }),
            (XA.prototype.consumeUnicodeRangeToken = function () {
                for (var A = [], e = this.consumeCodePoint(); lA(e) && A.length < 6; ) A.push(e), (e = this.consumeCodePoint());
                for (var t = !1; 63 === e && A.length < 6; ) A.push(e), (e = this.consumeCodePoint()), (t = !0);
                if (t)
                    return {
                        type: 30,
                        start: parseInt(
                            g.apply(
                                void 0,
                                A.map(function (A) {
                                    return 63 === A ? 48 : A;
                                })
                            ),
                            16
                        ),
                        end: parseInt(
                            g.apply(
                                void 0,
                                A.map(function (A) {
                                    return 63 === A ? 70 : A;
                                })
                            ),
                            16
                        ),
                    };
                var r = parseInt(g.apply(void 0, A), 16);
                if (45 === this.peekCodePoint(0) && lA(this.peekCodePoint(1))) {
                    this.consumeCodePoint();
                    for (var e = this.consumeCodePoint(), B = []; lA(e) && B.length < 6; ) B.push(e), (e = this.consumeCodePoint());
                    return { type: 30, start: r, end: parseInt(g.apply(void 0, B), 16) };
                }
                return { type: 30, start: r, end: r };
            }),
            (XA.prototype.consumeIdentLikeToken = function () {
                var A = this.consumeName();
                return "url" === A.toLowerCase() && 40 === this.peekCodePoint(0) ? (this.consumeCodePoint(), this.consumeUrlToken()) : 40 === this.peekCodePoint(0) ? (this.consumeCodePoint(), { type: 19, value: A }) : { type: 20, value: A };
            }),
            (XA.prototype.consumeUrlToken = function () {
                var A = [];
                if ((this.consumeWhiteSpace(), -1 === this.peekCodePoint(0))) return { type: 22, value: "" };
                var e,
                    t = this.peekCodePoint(0);
                if (39 === t || 34 === t) {
                    t = this.consumeStringToken(this.consumeCodePoint());
                    return 0 === t.type && (this.consumeWhiteSpace(), -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0)) ? (this.consumeCodePoint(), { type: 22, value: t.value }) : (this.consumeBadUrlRemnants(), xA);
                }
                for (;;) {
                    var r = this.consumeCodePoint();
                    if (-1 === r || 41 === r) return { type: 22, value: g.apply(void 0, A) };
                    if (CA(r)) return this.consumeWhiteSpace(), -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0) ? (this.consumeCodePoint(), { type: 22, value: g.apply(void 0, A) }) : (this.consumeBadUrlRemnants(), xA);
                    if (34 === r || 39 === r || 40 === r || (0 <= (e = r) && e <= 8) || 11 === e || (14 <= e && e <= 31) || 127 === e) return this.consumeBadUrlRemnants(), xA;
                    if (92 === r) {
                        if (!hA(r, this.peekCodePoint(0))) return this.consumeBadUrlRemnants(), xA;
                        A.push(this.consumeEscapedCodePoint());
                    } else A.push(r);
                }
            }),
            (XA.prototype.consumeWhiteSpace = function () {
                for (; CA(this.peekCodePoint(0)); ) this.consumeCodePoint();
            }),
            (XA.prototype.consumeBadUrlRemnants = function () {
                for (;;) {
                    var A = this.consumeCodePoint();
                    if (41 === A || -1 === A) return;
                    hA(A, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
                }
            }),
            (XA.prototype.consumeStringSlice = function (A) {
                for (var e = ""; 0 < A; ) {
                    var t = Math.min(5e4, A);
                    (e += g.apply(void 0, this._value.splice(0, t))), (A -= t);
                }
                return this._value.shift(), e;
            }),
            (XA.prototype.consumeStringToken = function (A) {
                for (var e = "", t = 0; ; ) {
                    var r,
                        B = this._value[t];
                    if (-1 === B || void 0 === B || B === A) return { type: 0, value: (e += this.consumeStringSlice(t)) };
                    if (10 === B) return this._value.splice(0, t), MA;
                    92 !== B || (-1 !== (r = this._value[t + 1]) && void 0 !== r && (10 === r ? ((e += this.consumeStringSlice(t)), (t = -1), this._value.shift()) : hA(B, r) && ((e += this.consumeStringSlice(t)), (e += g(this.consumeEscapedCodePoint())), (t = -1)))), t++;
                }
            }),
            (XA.prototype.consumeNumber = function () {
                var A = [],
                    e = 4;
                for ((43 !== (t = this.peekCodePoint(0)) && 45 !== t) || A.push(this.consumeCodePoint()); UA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
                var t = this.peekCodePoint(0),
                    r = this.peekCodePoint(1);
                if (46 === t && UA(r)) for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8; UA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
                t = this.peekCodePoint(0);
                var r = this.peekCodePoint(1),
                    B = this.peekCodePoint(2);
                if ((69 === t || 101 === t) && (((43 === r || 45 === r) && UA(B)) || UA(r))) for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8; UA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
                return [
                    (function (A) {
                        var e = 0,
                            t = 1;
                        (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (t = -1), e++);
                        for (var r = []; UA(A[e]); ) r.push(A[e++]);
                        var B = r.length ? parseInt(g.apply(void 0, r), 10) : 0;
                        46 === A[e] && e++;
                        for (var n = []; UA(A[e]); ) n.push(A[e++]);
                        var s = n.length,
                            o = s ? parseInt(g.apply(void 0, n), 10) : 0;
                        (69 !== A[e] && 101 !== A[e]) || e++;
                        var i = 1;
                        (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (i = -1), e++);
                        for (var Q = []; UA(A[e]); ) Q.push(A[e++]);
                        var c = Q.length ? parseInt(g.apply(void 0, Q), 10) : 0;
                        return t * (B + o * Math.pow(10, -s)) * Math.pow(10, i * c);
                    })(A),
                    e,
                ];
            }),
            (XA.prototype.consumeNumericToken = function () {
                var A = this.consumeNumber(),
                    e = A[0],
                    t = A[1],
                    r = this.peekCodePoint(0),
                    B = this.peekCodePoint(1),
                    A = this.peekCodePoint(2);
                return dA(r, B, A) ? { type: 15, number: e, flags: t, unit: this.consumeName() } : 37 === r ? (this.consumeCodePoint(), { type: 16, number: e, flags: t }) : { type: 17, number: e, flags: t };
            }),
            (XA.prototype.consumeEscapedCodePoint = function () {
                var A,
                    e = this.consumeCodePoint();
                if (lA(e)) {
                    for (var t = g(e); lA(this.peekCodePoint(0)) && t.length < 6; ) t += g(this.consumeCodePoint());
                    CA(this.peekCodePoint(0)) && this.consumeCodePoint();
                    var r = parseInt(t, 16);
                    return 0 === r || (55296 <= (A = r) && A <= 57343) || 1114111 < r ? 65533 : r;
                }
                return -1 === e ? 65533 : e;
            }),
            (XA.prototype.consumeName = function () {
                for (var A = ""; ; ) {
                    var e = this.consumeCodePoint();
                    if (FA(e)) A += g(e);
                    else {
                        if (!hA(e, this.peekCodePoint(0))) return this.reconsumeCodePoint(e), A;
                        A += g(this.consumeEscapedCodePoint());
                    }
                }
            }),
            XA);
    function XA() {
        this._value = [];
    }
    var JA =
        ((YA.create = function (A) {
            var e = new PA();
            return e.write(A), new YA(e.read());
        }),
        (YA.parseValue = function (A) {
            return YA.create(A).parseComponentValue();
        }),
        (YA.parseValues = function (A) {
            return YA.create(A).parseComponentValues();
        }),
        (YA.prototype.parseComponentValue = function () {
            for (var A = this.consumeToken(); 31 === A.type; ) A = this.consumeToken();
            if (32 === A.type) throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
            this.reconsumeToken(A);
            for (var e = this.consumeComponentValue(); 31 === (A = this.consumeToken()).type; );
            if (32 === A.type) return e;
            throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
        }),
        (YA.prototype.parseComponentValues = function () {
            for (var A = []; ; ) {
                var e = this.consumeComponentValue();
                if (32 === e.type) return A;
                A.push(e), A.push();
            }
        }),
        (YA.prototype.consumeComponentValue = function () {
            var A = this.consumeToken();
            switch (A.type) {
                case 11:
                case 28:
                case 2:
                    return this.consumeSimpleBlock(A.type);
                case 19:
                    return this.consumeFunction(A);
            }
            return A;
        }),
        (YA.prototype.consumeSimpleBlock = function (A) {
            for (var e = { type: A, values: [] }, t = this.consumeToken(); ; ) {
                if (32 === t.type || ce(t, A)) return e;
                this.reconsumeToken(t), e.values.push(this.consumeComponentValue()), (t = this.consumeToken());
            }
        }),
        (YA.prototype.consumeFunction = function (A) {
            for (var e = { name: A.value, values: [], type: 18 }; ; ) {
                var t = this.consumeToken();
                if (32 === t.type || 3 === t.type) return e;
                this.reconsumeToken(t), e.values.push(this.consumeComponentValue());
            }
        }),
        (YA.prototype.consumeToken = function () {
            var A = this._tokens.shift();
            return void 0 === A ? NA : A;
        }),
        (YA.prototype.reconsumeToken = function (A) {
            this._tokens.unshift(A);
        }),
        YA);
    function YA(A) {
        this._tokens = A;
    }
    function WA(A) {
        return 15 === A.type;
    }
    function ZA(A) {
        return 17 === A.type;
    }
    function _A(A) {
        return 20 === A.type;
    }
    function qA(A) {
        return 0 === A.type;
    }
    function jA(A, e) {
        return _A(A) && A.value === e;
    }
    function zA(A) {
        return 31 !== A.type;
    }
    function $A(A) {
        return 31 !== A.type && 4 !== A.type;
    }
    function Ae(A) {
        var e = [],
            t = [];
        return (
            A.forEach(function (A) {
                if (4 === A.type) {
                    if (0 === t.length) throw new Error("Error parsing function args, zero tokens for arg");
                    return e.push(t), void (t = []);
                }
                31 !== A.type && t.push(A);
            }),
            t.length && e.push(t),
            e
        );
    }
    function ee(A) {
        return 17 === A.type || 15 === A.type;
    }
    function te(A) {
        return 16 === A.type || ee(A);
    }
    function re(A) {
        return 1 < A.length ? [A[0], A[1]] : [A[0]];
    }
    function Be(A, e, t) {
        var r = A[0],
            A = A[1];
        return [Ue(r, e), Ue(void 0 !== A ? A : r, t)];
    }
    function ne(A) {
        return 15 === A.type && ("deg" === A.unit || "grad" === A.unit || "rad" === A.unit || "turn" === A.unit);
    }
    function se(A) {
        switch (
            A.filter(_A)
                .map(function (A) {
                    return A.value;
                })
                .join(" ")
        ) {
            case "to bottom right":
            case "to right bottom":
            case "left top":
            case "top left":
                return [ae, ae];
            case "to top":
            case "bottom":
                return Ce(0);
            case "to bottom left":
            case "to left bottom":
            case "right top":
            case "top right":
                return [ae, we];
            case "to right":
            case "left":
                return Ce(90);
            case "to top left":
            case "to left top":
            case "right bottom":
            case "bottom right":
                return [we, we];
            case "to bottom":
            case "top":
                return Ce(180);
            case "to top right":
            case "to right top":
            case "left bottom":
            case "bottom left":
                return [we, ae];
            case "to left":
            case "right":
                return Ce(270);
        }
        return 0;
    }
    function oe(A) {
        return 0 == (255 & A);
    }
    function ie(A) {
        var e = 255 & A,
            t = 255 & (A >> 8),
            r = 255 & (A >> 16),
            A = 255 & (A >> 24);
        return e < 255 ? "rgba(" + A + "," + r + "," + t + "," + e / 255 + ")" : "rgb(" + A + "," + r + "," + t + ")";
    }
    function Qe(A, e) {
        if (17 === A.type) return A.number;
        if (16 !== A.type) return 0;
        var t = 3 === e ? 1 : 255;
        return 3 === e ? (A.number / 100) * t : Math.round((A.number / 100) * t);
    }
    var ce = function (A, e) {
            return (11 === e && 12 === A.type) || (28 === e && 29 === A.type) || (2 === e && 3 === A.type);
        },
        ae = { type: 17, number: 0, flags: 4 },
        ge = { type: 16, number: 50, flags: 4 },
        we = { type: 16, number: 100, flags: 4 },
        Ue = function (A, e) {
            if (16 === A.type) return (A.number / 100) * e;
            if (WA(A))
                switch (A.unit) {
                    case "rem":
                    case "em":
                        return 16 * A.number;
                    default:
                        return A.number;
                }
            return A.number;
        },
        le = function (A, e) {
            if (15 === e.type)
                switch (e.unit) {
                    case "deg":
                        return (Math.PI * e.number) / 180;
                    case "grad":
                        return (Math.PI / 200) * e.number;
                    case "rad":
                        return e.number;
                    case "turn":
                        return 2 * Math.PI * e.number;
                }
            throw new Error("Unsupported angle type");
        },
        Ce = function (A) {
            return (Math.PI * A) / 180;
        },
        ue = function (A, e) {
            if (18 === e.type) {
                var t = me[e.name];
                if (void 0 === t) throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
                return t(A, e.values);
            }
            if (5 === e.type) {
                if (3 === e.value.length) {
                    var r = e.value.substring(0, 1),
                        B = e.value.substring(1, 2),
                        n = e.value.substring(2, 3);
                    return Fe(parseInt(r + r, 16), parseInt(B + B, 16), parseInt(n + n, 16), 1);
                }
                if (4 === e.value.length) {
                    var r = e.value.substring(0, 1),
                        B = e.value.substring(1, 2),
                        n = e.value.substring(2, 3),
                        s = e.value.substring(3, 4);
                    return Fe(parseInt(r + r, 16), parseInt(B + B, 16), parseInt(n + n, 16), parseInt(s + s, 16) / 255);
                }
                if (6 === e.value.length) {
                    (r = e.value.substring(0, 2)), (B = e.value.substring(2, 4)), (n = e.value.substring(4, 6));
                    return Fe(parseInt(r, 16), parseInt(B, 16), parseInt(n, 16), 1);
                }
                if (8 === e.value.length) {
                    (r = e.value.substring(0, 2)), (B = e.value.substring(2, 4)), (n = e.value.substring(4, 6)), (s = e.value.substring(6, 8));
                    return Fe(parseInt(r, 16), parseInt(B, 16), parseInt(n, 16), parseInt(s, 16) / 255);
                }
            }
            if (20 === e.type) {
                e = Le[e.value.toUpperCase()];
                if (void 0 !== e) return e;
            }
            return Le.TRANSPARENT;
        },
        Fe = function (A, e, t, r) {
            return ((A << 24) | (e << 16) | (t << 8) | (Math.round(255 * r) << 0)) >>> 0;
        },
        he = function (A, e) {
            e = e.filter($A);
            if (3 === e.length) {
                var t = e.map(Qe),
                    r = t[0],
                    B = t[1],
                    t = t[2];
                return Fe(r, B, t, 1);
            }
            if (4 !== e.length) return 0;
            (e = e.map(Qe)), (r = e[0]), (B = e[1]), (t = e[2]), (e = e[3]);
            return Fe(r, B, t, e);
        };
    function de(A, e, t) {
        return t < 0 && (t += 1), 1 <= t && --t, t < 1 / 6 ? (e - A) * t * 6 + A : t < 0.5 ? e : t < 2 / 3 ? 6 * (e - A) * (2 / 3 - t) + A : A;
    }
    function fe(A, e) {
        return ue(A, JA.create(e).parseComponentValue());
    }
    function He(A, e) {
        return (A = ue(A, e[0])), (e = e[1]) && te(e) ? { color: A, stop: e } : { color: A, stop: null };
    }
    function pe(A, t) {
        var e = A[0],
            r = A[A.length - 1];
        null === e.stop && (e.stop = ae), null === r.stop && (r.stop = we);
        for (var B = [], n = 0, s = 0; s < A.length; s++) {
            var o = A[s].stop;
            null !== o ? (n < (o = Ue(o, t)) ? B.push(o) : B.push(n), (n = o)) : B.push(null);
        }
        for (var i = null, s = 0; s < B.length; s++) {
            var Q = B[s];
            if (null === Q) null === i && (i = s);
            else if (null !== i) {
                for (var c = s - i, a = (Q - B[i - 1]) / (1 + c), g = 1; g <= c; g++) B[i + g - 1] = a * g;
                i = null;
            }
        }
        return A.map(function (A, e) {
            return { color: A.color, stop: Math.max(Math.min(1, B[e] / t), 0) };
        });
    }
    function Ee(A, e, t) {
        var r = "number" == typeof A ? A : ((s = e / 2), (r = (n = t) / 2), (s = Ue((B = A)[0], e) - s), (n = r - Ue(B[1], n)), (Math.atan2(n, s) + 2 * Math.PI) % (2 * Math.PI)),
            B = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)),
            n = e / 2,
            s = t / 2,
            e = B / 2,
            t = Math.sin(r - Math.PI / 2) * e,
            e = Math.cos(r - Math.PI / 2) * e;
        return [B, n - e, n + e, s - t, s + t];
    }
    function Ie(A, e) {
        return Math.sqrt(A * A + e * e);
    }
    function ye(A, e, B, n, s) {
        return [
            [0, 0],
            [0, e],
            [A, 0],
            [A, e],
        ].reduce(
            function (A, e) {
                var t = e[0],
                    r = e[1],
                    r = Ie(B - t, n - r);
                return (s ? r < A.optimumDistance : r > A.optimumDistance) ? { optimumCorner: e, optimumDistance: r } : A;
            },
            { optimumDistance: s ? 1 / 0 : -1 / 0, optimumCorner: null }
        ).optimumCorner;
    }
    var Ke = function (A, e) {
            var t = e.filter($A),
                r = t[0],
                B = t[1],
                n = t[2],
                e = t[3],
                t = (17 === r.type ? Ce(r.number) : le(A, r)) / (2 * Math.PI),
                A = te(B) ? B.number / 100 : 0,
                r = te(n) ? n.number / 100 : 0,
                B = void 0 !== e && te(e) ? Ue(e, 1) : 1;
            if (0 == A) return Fe(255 * r, 255 * r, 255 * r, 1);
            (n = r <= 0.5 ? r * (1 + A) : r + A - r * A), (e = 2 * r - n), (A = de(e, n, t + 1 / 3)), (r = de(e, n, t)), (t = de(e, n, t - 1 / 3));
            return Fe(255 * A, 255 * r, 255 * t, B);
        },
        me = { hsl: Ke, hsla: Ke, rgb: he, rgba: he },
        Le = {
            ALICEBLUE: 4042850303,
            ANTIQUEWHITE: 4209760255,
            AQUA: 16777215,
            AQUAMARINE: 2147472639,
            AZURE: 4043309055,
            BEIGE: 4126530815,
            BISQUE: 4293182719,
            BLACK: 255,
            BLANCHEDALMOND: 4293643775,
            BLUE: 65535,
            BLUEVIOLET: 2318131967,
            BROWN: 2771004159,
            BURLYWOOD: 3736635391,
            CADETBLUE: 1604231423,
            CHARTREUSE: 2147418367,
            CHOCOLATE: 3530104575,
            CORAL: 4286533887,
            CORNFLOWERBLUE: 1687547391,
            CORNSILK: 4294499583,
            CRIMSON: 3692313855,
            CYAN: 16777215,
            DARKBLUE: 35839,
            DARKCYAN: 9145343,
            DARKGOLDENROD: 3095837695,
            DARKGRAY: 2846468607,
            DARKGREEN: 6553855,
            DARKGREY: 2846468607,
            DARKKHAKI: 3182914559,
            DARKMAGENTA: 2332068863,
            DARKOLIVEGREEN: 1433087999,
            DARKORANGE: 4287365375,
            DARKORCHID: 2570243327,
            DARKRED: 2332033279,
            DARKSALMON: 3918953215,
            DARKSEAGREEN: 2411499519,
            DARKSLATEBLUE: 1211993087,
            DARKSLATEGRAY: 793726975,
            DARKSLATEGREY: 793726975,
            DARKTURQUOISE: 13554175,
            DARKVIOLET: 2483082239,
            DEEPPINK: 4279538687,
            DEEPSKYBLUE: 12582911,
            DIMGRAY: 1768516095,
            DIMGREY: 1768516095,
            DODGERBLUE: 512819199,
            FIREBRICK: 2988581631,
            FLORALWHITE: 4294635775,
            FORESTGREEN: 579543807,
            FUCHSIA: 4278255615,
            GAINSBORO: 3705462015,
            GHOSTWHITE: 4177068031,
            GOLD: 4292280575,
            GOLDENROD: 3668254975,
            GRAY: 2155905279,
            GREEN: 8388863,
            GREENYELLOW: 2919182335,
            GREY: 2155905279,
            HONEYDEW: 4043305215,
            HOTPINK: 4285117695,
            INDIANRED: 3445382399,
            INDIGO: 1258324735,
            IVORY: 4294963455,
            KHAKI: 4041641215,
            LAVENDER: 3873897215,
            LAVENDERBLUSH: 4293981695,
            LAWNGREEN: 2096890111,
            LEMONCHIFFON: 4294626815,
            LIGHTBLUE: 2916673279,
            LIGHTCORAL: 4034953471,
            LIGHTCYAN: 3774873599,
            LIGHTGOLDENRODYELLOW: 4210742015,
            LIGHTGRAY: 3553874943,
            LIGHTGREEN: 2431553791,
            LIGHTGREY: 3553874943,
            LIGHTPINK: 4290167295,
            LIGHTSALMON: 4288707327,
            LIGHTSEAGREEN: 548580095,
            LIGHTSKYBLUE: 2278488831,
            LIGHTSLATEGRAY: 2005441023,
            LIGHTSLATEGREY: 2005441023,
            LIGHTSTEELBLUE: 2965692159,
            LIGHTYELLOW: 4294959359,
            LIME: 16711935,
            LIMEGREEN: 852308735,
            LINEN: 4210091775,
            MAGENTA: 4278255615,
            MAROON: 2147483903,
            MEDIUMAQUAMARINE: 1724754687,
            MEDIUMBLUE: 52735,
            MEDIUMORCHID: 3126187007,
            MEDIUMPURPLE: 2473647103,
            MEDIUMSEAGREEN: 1018393087,
            MEDIUMSLATEBLUE: 2070474495,
            MEDIUMSPRINGGREEN: 16423679,
            MEDIUMTURQUOISE: 1221709055,
            MEDIUMVIOLETRED: 3340076543,
            MIDNIGHTBLUE: 421097727,
            MINTCREAM: 4127193855,
            MISTYROSE: 4293190143,
            MOCCASIN: 4293178879,
            NAVAJOWHITE: 4292783615,
            NAVY: 33023,
            OLDLACE: 4260751103,
            OLIVE: 2155872511,
            OLIVEDRAB: 1804477439,
            ORANGE: 4289003775,
            ORANGERED: 4282712319,
            ORCHID: 3664828159,
            PALEGOLDENROD: 4008225535,
            PALEGREEN: 2566625535,
            PALETURQUOISE: 2951671551,
            PALEVIOLETRED: 3681588223,
            PAPAYAWHIP: 4293907967,
            PEACHPUFF: 4292524543,
            PERU: 3448061951,
            PINK: 4290825215,
            PLUM: 3718307327,
            POWDERBLUE: 2967529215,
            PURPLE: 2147516671,
            REBECCAPURPLE: 1714657791,
            RED: 4278190335,
            ROSYBROWN: 3163525119,
            ROYALBLUE: 1097458175,
            SADDLEBROWN: 2336560127,
            SALMON: 4202722047,
            SANDYBROWN: 4104413439,
            SEAGREEN: 780883967,
            SEASHELL: 4294307583,
            SIENNA: 2689740287,
            SILVER: 3233857791,
            SKYBLUE: 2278484991,
            SLATEBLUE: 1784335871,
            SLATEGRAY: 1887473919,
            SLATEGREY: 1887473919,
            SNOW: 4294638335,
            SPRINGGREEN: 16744447,
            STEELBLUE: 1182971135,
            TAN: 3535047935,
            TEAL: 8421631,
            THISTLE: 3636451583,
            TOMATO: 4284696575,
            TRANSPARENT: 0,
            TURQUOISE: 1088475391,
            VIOLET: 4001558271,
            WHEAT: 4125012991,
            WHITE: 4294967295,
            WHITESMOKE: 4126537215,
            YELLOW: 4294902015,
            YELLOWGREEN: 2597139199,
        },
        be = {
            name: "background-clip",
            initialValue: "border-box",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.map(function (A) {
                    if (_A(A))
                        switch (A.value) {
                            case "padding-box":
                                return 1;
                            case "content-box":
                                return 2;
                        }
                    return 0;
                });
            },
        },
        De = { name: "background-color", initialValue: "transparent", prefix: !1, type: 3, format: "color" },
        Ke = function (t, A) {
            var r = Ce(180),
                B = [];
            return (
                Ae(A).forEach(function (A, e) {
                    if (0 === e) {
                        e = A[0];
                        if (20 === e.type && -1 !== ["top", "left", "right", "bottom"].indexOf(e.value)) return void (r = se(A));
                        if (ne(e)) return void (r = (le(t, e) + Ce(270)) % Ce(360));
                    }
                    A = He(t, A);
                    B.push(A);
                }),
                { angle: r, stops: B, type: 1 }
            );
        },
        ve = "closest-side",
        xe = "farthest-side",
        Me = "closest-corner",
        Se = "farthest-corner",
        Te = "ellipse",
        Ge = "contain",
        he = function (r, A) {
            var B = 0,
                n = 3,
                s = [],
                o = [];
            return (
                Ae(A).forEach(function (A, e) {
                    var t = !0;
                    0 === e
                        ? (t = A.reduce(function (A, e) {
                              if (_A(e))
                                  switch (e.value) {
                                      case "center":
                                          return o.push(ge), !1;
                                      case "top":
                                      case "left":
                                          return o.push(ae), !1;
                                      case "right":
                                      case "bottom":
                                          return o.push(we), !1;
                                  }
                              else if (te(e) || ee(e)) return o.push(e), !1;
                              return A;
                          }, t))
                        : 1 === e &&
                          (t = A.reduce(function (A, e) {
                              if (_A(e))
                                  switch (e.value) {
                                      case "circle":
                                          return (B = 0), !1;
                                      case Te:
                                          return !(B = 1);
                                      case Ge:
                                      case ve:
                                          return (n = 0), !1;
                                      case xe:
                                          return !(n = 1);
                                      case Me:
                                          return !(n = 2);
                                      case "cover":
                                      case Se:
                                          return !(n = 3);
                                  }
                              else if (ee(e) || te(e)) return (n = !Array.isArray(n) ? [] : n).push(e), !1;
                              return A;
                          }, t)),
                        t && ((A = He(r, A)), s.push(A));
                }),
                { size: n, shape: B, stops: s, position: o, type: 2 }
            );
        },
        Oe = function (A, e) {
            if (22 === e.type) {
                var t = { url: e.value, type: 0 };
                return A.cache.addImage(e.value), t;
            }
            if (18 !== e.type) throw new Error("Unsupported image type " + e.type);
            t = ke[e.name];
            if (void 0 === t) throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
            return t(A, e.values);
        };
    var Ve,
        ke = {
            "linear-gradient": function (t, A) {
                var r = Ce(180),
                    B = [];
                return (
                    Ae(A).forEach(function (A, e) {
                        if (0 === e) {
                            e = A[0];
                            if (20 === e.type && "to" === e.value) return void (r = se(A));
                            if (ne(e)) return void (r = le(t, e));
                        }
                        A = He(t, A);
                        B.push(A);
                    }),
                    { angle: r, stops: B, type: 1 }
                );
            },
            "-moz-linear-gradient": Ke,
            "-ms-linear-gradient": Ke,
            "-o-linear-gradient": Ke,
            "-webkit-linear-gradient": Ke,
            "radial-gradient": function (B, A) {
                var n = 0,
                    s = 3,
                    o = [],
                    i = [];
                return (
                    Ae(A).forEach(function (A, e) {
                        var t,
                            r = !0;
                        0 === e &&
                            ((t = !1),
                            (r = A.reduce(function (A, e) {
                                if (t)
                                    if (_A(e))
                                        switch (e.value) {
                                            case "center":
                                                return i.push(ge), A;
                                            case "top":
                                            case "left":
                                                return i.push(ae), A;
                                            case "right":
                                            case "bottom":
                                                return i.push(we), A;
                                        }
                                    else (te(e) || ee(e)) && i.push(e);
                                else if (_A(e))
                                    switch (e.value) {
                                        case "circle":
                                            return (n = 0), !1;
                                        case Te:
                                            return !(n = 1);
                                        case "at":
                                            return !(t = !0);
                                        case ve:
                                            return (s = 0), !1;
                                        case "cover":
                                        case xe:
                                            return !(s = 1);
                                        case Ge:
                                        case Me:
                                            return !(s = 2);
                                        case Se:
                                            return !(s = 3);
                                    }
                                else if (ee(e) || te(e)) return (s = !Array.isArray(s) ? [] : s).push(e), !1;
                                return A;
                            }, r))),
                            r && ((A = He(B, A)), o.push(A));
                    }),
                    { size: s, shape: n, stops: o, position: i, type: 2 }
                );
            },
            "-moz-radial-gradient": he,
            "-ms-radial-gradient": he,
            "-o-radial-gradient": he,
            "-webkit-radial-gradient": he,
            "-webkit-gradient": function (r, A) {
                var e = Ce(180),
                    B = [],
                    n = 1;
                return (
                    Ae(A).forEach(function (A, e) {
                        var t,
                            A = A[0];
                        if (0 === e) {
                            if (_A(A) && "linear" === A.value) return void (n = 1);
                            if (_A(A) && "radial" === A.value) return void (n = 2);
                        }
                        18 === A.type && ("from" === A.name ? ((t = ue(r, A.values[0])), B.push({ stop: ae, color: t })) : "to" === A.name ? ((t = ue(r, A.values[0])), B.push({ stop: we, color: t })) : "color-stop" !== A.name || (2 === (A = A.values.filter($A)).length && ((t = ue(r, A[1])), (A = A[0]), ZA(A) && B.push({ stop: { type: 16, number: 100 * A.number, flags: A.flags }, color: t }))));
                    }),
                    1 === n ? { angle: (e + Ce(180)) % Ce(360), stops: B, type: n } : { size: 3, shape: 0, stops: B, position: [], type: n }
                );
            },
        },
        Re = {
            name: "background-image",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (e, A) {
                if (0 === A.length) return [];
                var t = A[0];
                return 20 === t.type && "none" === t.value
                    ? []
                    : A.filter(function (A) {
                          return $A(A) && !((20 === (A = A).type && "none" === A.value) || (18 === A.type && !ke[A.name]));
                      }).map(function (A) {
                          return Oe(e, A);
                      });
            },
        },
        Ne = {
            name: "background-origin",
            initialValue: "border-box",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.map(function (A) {
                    if (_A(A))
                        switch (A.value) {
                            case "padding-box":
                                return 1;
                            case "content-box":
                                return 2;
                        }
                    return 0;
                });
            },
        },
        Pe = {
            name: "background-position",
            initialValue: "0% 0%",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
                return Ae(e)
                    .map(function (A) {
                        return A.filter(te);
                    })
                    .map(re);
            },
        },
        Xe = {
            name: "background-repeat",
            initialValue: "repeat",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return Ae(e)
                    .map(function (A) {
                        return A.filter(_A)
                            .map(function (A) {
                                return A.value;
                            })
                            .join(" ");
                    })
                    .map(Je);
            },
        },
        Je = function (A) {
            switch (A) {
                case "no-repeat":
                    return 1;
                case "repeat-x":
                case "repeat no-repeat":
                    return 2;
                case "repeat-y":
                case "no-repeat repeat":
                    return 3;
                default:
                    return 0;
            }
        };
    ((he = Ve = Ve || {}).AUTO = "auto"), (he.CONTAIN = "contain");
    function Ye(A, e) {
        return _A(A) && "normal" === A.value ? 1.2 * e : 17 === A.type ? e * A.number : te(A) ? Ue(A, e) : e;
    }
    var We,
        Ze,
        _e = {
            name: "background-size",
            initialValue: "0",
            prefix: !(he.COVER = "cover"),
            type: 1,
            parse: function (A, e) {
                return Ae(e).map(function (A) {
                    return A.filter(qe);
                });
            },
        },
        qe = function (A) {
            return _A(A) || te(A);
        },
        he = function (A) {
            return { name: "border-" + A + "-color", initialValue: "transparent", prefix: !1, type: 3, format: "color" };
        },
        je = he("top"),
        ze = he("right"),
        $e = he("bottom"),
        At = he("left"),
        he = function (A) {
            return {
                name: "border-radius-" + A,
                initialValue: "0 0",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                    return re(e.filter(te));
                },
            };
        },
        et = he("top-left"),
        tt = he("top-right"),
        rt = he("bottom-right"),
        Bt = he("bottom-left"),
        he = function (A) {
            return {
                name: "border-" + A + "-style",
                initialValue: "solid",
                prefix: !1,
                type: 2,
                parse: function (A, e) {
                    switch (e) {
                        case "none":
                            return 0;
                        case "dashed":
                            return 2;
                        case "dotted":
                            return 3;
                        case "double":
                            return 4;
                    }
                    return 1;
                },
            };
        },
        nt = he("top"),
        st = he("right"),
        ot = he("bottom"),
        it = he("left"),
        he = function (A) {
            return {
                name: "border-" + A + "-width",
                initialValue: "0",
                type: 0,
                prefix: !1,
                parse: function (A, e) {
                    return WA(e) ? e.number : 0;
                },
            };
        },
        Qt = he("top"),
        ct = he("right"),
        at = he("bottom"),
        gt = he("left"),
        wt = { name: "color", initialValue: "transparent", prefix: !1, type: 3, format: "color" },
        Ut = {
            name: "direction",
            initialValue: "ltr",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                return "rtl" !== e ? 0 : 1;
            },
        },
        lt = {
            name: "display",
            initialValue: "inline-block",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.filter(_A).reduce(function (A, e) {
                    return A | Ct(e.value);
                }, 0);
            },
        },
        Ct = function (A) {
            switch (A) {
                case "block":
                case "-webkit-box":
                    return 2;
                case "inline":
                    return 4;
                case "run-in":
                    return 8;
                case "flow":
                    return 16;
                case "flow-root":
                    return 32;
                case "table":
                    return 64;
                case "flex":
                case "-webkit-flex":
                    return 128;
                case "grid":
                case "-ms-grid":
                    return 256;
                case "ruby":
                    return 512;
                case "subgrid":
                    return 1024;
                case "list-item":
                    return 2048;
                case "table-row-group":
                    return 4096;
                case "table-header-group":
                    return 8192;
                case "table-footer-group":
                    return 16384;
                case "table-row":
                    return 32768;
                case "table-cell":
                    return 65536;
                case "table-column-group":
                    return 131072;
                case "table-column":
                    return 262144;
                case "table-caption":
                    return 524288;
                case "ruby-base":
                    return 1048576;
                case "ruby-text":
                    return 2097152;
                case "ruby-base-container":
                    return 4194304;
                case "ruby-text-container":
                    return 8388608;
                case "contents":
                    return 16777216;
                case "inline-block":
                    return 33554432;
                case "inline-list-item":
                    return 67108864;
                case "inline-table":
                    return 134217728;
                case "inline-flex":
                    return 268435456;
                case "inline-grid":
                    return 536870912;
            }
            return 0;
        },
        ut = {
            name: "float",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "left":
                        return 1;
                    case "right":
                        return 2;
                    case "inline-start":
                        return 3;
                    case "inline-end":
                        return 4;
                }
                return 0;
            },
        },
        Ft = {
            name: "letter-spacing",
            initialValue: "0",
            prefix: !1,
            type: 0,
            parse: function (A, e) {
                return !((20 === e.type && "normal" === e.value) || (17 !== e.type && 15 !== e.type)) ? e.number : 0;
            },
        },
        ht = {
            name: "line-break",
            initialValue: ((he = We = We || {}).NORMAL = "normal"),
            prefix: !(he.STRICT = "strict"),
            type: 2,
            parse: function (A, e) {
                return "strict" !== e ? We.NORMAL : We.STRICT;
            },
        },
        dt = { name: "line-height", initialValue: "normal", prefix: !1, type: 4 },
        ft = {
            name: "list-style-image",
            initialValue: "none",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return 20 === e.type && "none" === e.value ? null : Oe(A, e);
            },
        },
        Ht = {
            name: "list-style-position",
            initialValue: "outside",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                return "inside" !== e ? 1 : 0;
            },
        },
        pt = {
            name: "list-style-type",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "disc":
                        return 0;
                    case "circle":
                        return 1;
                    case "square":
                        return 2;
                    case "decimal":
                        return 3;
                    case "cjk-decimal":
                        return 4;
                    case "decimal-leading-zero":
                        return 5;
                    case "lower-roman":
                        return 6;
                    case "upper-roman":
                        return 7;
                    case "lower-greek":
                        return 8;
                    case "lower-alpha":
                        return 9;
                    case "upper-alpha":
                        return 10;
                    case "arabic-indic":
                        return 11;
                    case "armenian":
                        return 12;
                    case "bengali":
                        return 13;
                    case "cambodian":
                        return 14;
                    case "cjk-earthly-branch":
                        return 15;
                    case "cjk-heavenly-stem":
                        return 16;
                    case "cjk-ideographic":
                        return 17;
                    case "devanagari":
                        return 18;
                    case "ethiopic-numeric":
                        return 19;
                    case "georgian":
                        return 20;
                    case "gujarati":
                        return 21;
                    case "gurmukhi":
                    case "hebrew":
                        return 22;
                    case "hiragana":
                        return 23;
                    case "hiragana-iroha":
                        return 24;
                    case "japanese-formal":
                        return 25;
                    case "japanese-informal":
                        return 26;
                    case "kannada":
                        return 27;
                    case "katakana":
                        return 28;
                    case "katakana-iroha":
                        return 29;
                    case "khmer":
                        return 30;
                    case "korean-hangul-formal":
                        return 31;
                    case "korean-hanja-formal":
                        return 32;
                    case "korean-hanja-informal":
                        return 33;
                    case "lao":
                        return 34;
                    case "lower-armenian":
                        return 35;
                    case "malayalam":
                        return 36;
                    case "mongolian":
                        return 37;
                    case "myanmar":
                        return 38;
                    case "oriya":
                        return 39;
                    case "persian":
                        return 40;
                    case "simp-chinese-formal":
                        return 41;
                    case "simp-chinese-informal":
                        return 42;
                    case "tamil":
                        return 43;
                    case "telugu":
                        return 44;
                    case "thai":
                        return 45;
                    case "tibetan":
                        return 46;
                    case "trad-chinese-formal":
                        return 47;
                    case "trad-chinese-informal":
                        return 48;
                    case "upper-armenian":
                        return 49;
                    case "disclosure-open":
                        return 50;
                    case "disclosure-closed":
                        return 51;
                    default:
                        return -1;
                }
            },
        },
        he = function (A) {
            return { name: "margin-" + A, initialValue: "0", prefix: !1, type: 4 };
        },
        Et = he("top"),
        It = he("right"),
        yt = he("bottom"),
        Kt = he("left"),
        mt = {
            name: "overflow",
            initialValue: "visible",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e.filter(_A).map(function (A) {
                    switch (A.value) {
                        case "hidden":
                            return 1;
                        case "scroll":
                            return 2;
                        case "clip":
                            return 3;
                        case "auto":
                            return 4;
                        default:
                            return 0;
                    }
                });
            },
        },
        Lt = {
            name: "overflow-wrap",
            initialValue: "normal",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                return "break-word" !== e ? "normal" : "break-word";
            },
        },
        he = function (A) {
            return { name: "padding-" + A, initialValue: "0", prefix: !1, type: 3, format: "length-percentage" };
        },
        bt = he("top"),
        Dt = he("right"),
        vt = he("bottom"),
        xt = he("left"),
        Mt = {
            name: "text-align",
            initialValue: "left",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "right":
                        return 2;
                    case "center":
                    case "justify":
                        return 1;
                    default:
                        return 0;
                }
            },
        },
        St = {
            name: "position",
            initialValue: "static",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "relative":
                        return 1;
                    case "absolute":
                        return 2;
                    case "fixed":
                        return 3;
                    case "sticky":
                        return 4;
                }
                return 0;
            },
        },
        Tt = {
            name: "text-shadow",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (n, A) {
                return 1 === A.length && jA(A[0], "none")
                    ? []
                    : Ae(A).map(function (A) {
                          for (var e = { color: Le.TRANSPARENT, offsetX: ae, offsetY: ae, blur: ae }, t = 0, r = 0; r < A.length; r++) {
                              var B = A[r];
                              ee(B) ? (0 === t ? (e.offsetX = B) : 1 === t ? (e.offsetY = B) : (e.blur = B), t++) : (e.color = ue(n, B));
                          }
                          return e;
                      });
            },
        },
        Gt = {
            name: "text-transform",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "uppercase":
                        return 2;
                    case "lowercase":
                        return 1;
                    case "capitalize":
                        return 3;
                }
                return 0;
            },
        },
        Ot = {
            name: "transform",
            initialValue: "none",
            prefix: !0,
            type: 0,
            parse: function (A, e) {
                if (20 === e.type && "none" === e.value) return null;
                if (18 !== e.type) return null;
                var t = Vt[e.name];
                if (void 0 === t) throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
                return t(e.values);
            },
        },
        Vt = {
            matrix: function (A) {
                A = A.filter(function (A) {
                    return 17 === A.type;
                }).map(function (A) {
                    return A.number;
                });
                return 6 === A.length ? A : null;
            },
            matrix3d: function (A) {
                var e = A.filter(function (A) {
                        return 17 === A.type;
                    }).map(function (A) {
                        return A.number;
                    }),
                    t = e[0],
                    r = e[1];
                e[2], e[3];
                var B = e[4],
                    n = e[5];
                e[6], e[7], e[8], e[9], e[10], e[11];
                var s = e[12],
                    A = e[13];
                return e[14], e[15], 16 === e.length ? [t, r, B, n, s, A] : null;
            },
        },
        he = { type: 16, number: 50, flags: 4 },
        kt = [he, he],
        Rt = {
            name: "transform-origin",
            initialValue: "50% 50%",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                e = e.filter(te);
                return 2 !== e.length ? kt : [e[0], e[1]];
            },
        },
        Nt = {
            name: "visible",
            initialValue: "none",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "hidden":
                        return 1;
                    case "collapse":
                        return 2;
                    default:
                        return 0;
                }
            },
        };
    ((he = Ze = Ze || {}).NORMAL = "normal"), (he.BREAK_ALL = "break-all");
    function Pt(A, e) {
        return 0 != (A & e);
    }
    function Xt(A, e, t) {
        return (A = A && A[Math.min(e, A.length - 1)]) ? (t ? A.open : A.close) : "";
    }
    var Jt = {
            name: "word-break",
            initialValue: "normal",
            prefix: !(he.KEEP_ALL = "keep-all"),
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "break-all":
                        return Ze.BREAK_ALL;
                    case "keep-all":
                        return Ze.KEEP_ALL;
                    default:
                        return Ze.NORMAL;
                }
            },
        },
        Yt = {
            name: "z-index",
            initialValue: "auto",
            prefix: !1,
            type: 0,
            parse: function (A, e) {
                if (20 === e.type) return { auto: !0, order: 0 };
                if (ZA(e)) return { auto: !1, order: e.number };
                throw new Error("Invalid z-index number parsed");
            },
        },
        Wt = function (A, e) {
            if (15 === e.type)
                switch (e.unit.toLowerCase()) {
                    case "s":
                        return 1e3 * e.number;
                    case "ms":
                        return e.number;
                }
            throw new Error("Unsupported time type");
        },
        Zt = {
            name: "opacity",
            initialValue: "1",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return ZA(e) ? e.number : 1;
            },
        },
        _t = { name: "text-decoration-color", initialValue: "transparent", prefix: !1, type: 3, format: "color" },
        qt = {
            name: "text-decoration-line",
            initialValue: "none",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                return e
                    .filter(_A)
                    .map(function (A) {
                        switch (A.value) {
                            case "underline":
                                return 1;
                            case "overline":
                                return 2;
                            case "line-through":
                                return 3;
                            case "none":
                                return 4;
                        }
                        return 0;
                    })
                    .filter(function (A) {
                        return 0 !== A;
                    });
            },
        },
        jt = {
            name: "font-family",
            initialValue: "",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                var t = [],
                    r = [];
                return (
                    e.forEach(function (A) {
                        switch (A.type) {
                            case 20:
                            case 0:
                                t.push(A.value);
                                break;
                            case 17:
                                t.push(A.number.toString());
                                break;
                            case 4:
                                r.push(t.join(" ")), (t.length = 0);
                        }
                    }),
                    t.length && r.push(t.join(" ")),
                    r.map(function (A) {
                        return -1 === A.indexOf(" ") ? A : "'" + A + "'";
                    })
                );
            },
        },
        zt = { name: "font-size", initialValue: "0", prefix: !1, type: 3, format: "length" },
        $t = {
            name: "font-weight",
            initialValue: "normal",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return ZA(e) ? e.number : !_A(e) || "bold" !== e.value ? 400 : 700;
            },
        },
        Ar = {
            name: "font-variant",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
                return e.filter(_A).map(function (A) {
                    return A.value;
                });
            },
        },
        er = {
            name: "font-style",
            initialValue: "normal",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
                switch (e) {
                    case "oblique":
                        return "oblique";
                    case "italic":
                        return "italic";
                    default:
                        return "normal";
                }
            },
        },
        tr = {
            name: "content",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
                if (0 === e.length) return [];
                var t = e[0];
                return 20 === t.type && "none" === t.value ? [] : e;
            },
        },
        rr = {
            name: "counter-increment",
            initialValue: "none",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                if (0 === e.length) return null;
                var t = e[0];
                if (20 === t.type && "none" === t.value) return null;
                for (var r = [], B = e.filter(zA), n = 0; n < B.length; n++) {
                    var s = B[n],
                        o = B[n + 1];
                    20 === s.type && ((o = o && ZA(o) ? o.number : 1), r.push({ counter: s.value, increment: o }));
                }
                return r;
            },
        },
        Br = {
            name: "counter-reset",
            initialValue: "none",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                if (0 === e.length) return [];
                for (var t = [], r = e.filter(zA), B = 0; B < r.length; B++) {
                    var n = r[B],
                        s = r[B + 1];
                    _A(n) && "none" !== n.value && ((s = s && ZA(s) ? s.number : 0), t.push({ counter: n.value, reset: s }));
                }
                return t;
            },
        },
        nr = {
            name: "duration",
            initialValue: "0s",
            prefix: !1,
            type: 1,
            parse: function (e, A) {
                return A.filter(WA).map(function (A) {
                    return Wt(e, A);
                });
            },
        },
        sr = {
            name: "quotes",
            initialValue: "none",
            prefix: !0,
            type: 1,
            parse: function (A, e) {
                if (0 === e.length) return null;
                var t = e[0];
                if (20 === t.type && "none" === t.value) return null;
                var r = [],
                    B = e.filter(qA);
                if (B.length % 2 != 0) return null;
                for (var n = 0; n < B.length; n += 2) {
                    var s = B[n].value,
                        o = B[n + 1].value;
                    r.push({ open: s, close: o });
                }
                return r;
            },
        },
        or = {
            name: "box-shadow",
            initialValue: "none",
            type: 1,
            prefix: !1,
            parse: function (n, A) {
                return 1 === A.length && jA(A[0], "none")
                    ? []
                    : Ae(A).map(function (A) {
                          for (var e = { color: 255, offsetX: ae, offsetY: ae, blur: ae, spread: ae, inset: !1 }, t = 0, r = 0; r < A.length; r++) {
                              var B = A[r];
                              jA(B, "inset") ? (e.inset = !0) : ee(B) ? (0 === t ? (e.offsetX = B) : 1 === t ? (e.offsetY = B) : 2 === t ? (e.blur = B) : (e.spread = B), t++) : (e.color = ue(n, B));
                          }
                          return e;
                      });
            },
        },
        ir = {
            name: "paint-order",
            initialValue: "normal",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
                var t = [];
                return (
                    e.filter(_A).forEach(function (A) {
                        switch (A.value) {
                            case "stroke":
                                t.push(1);
                                break;
                            case "fill":
                                t.push(0);
                                break;
                            case "markers":
                                t.push(2);
                        }
                    }),
                    [0, 1, 2].forEach(function (A) {
                        -1 === t.indexOf(A) && t.push(A);
                    }),
                    t
                );
            },
        },
        Qr = { name: "-webkit-text-stroke-color", initialValue: "currentcolor", prefix: !1, type: 3, format: "color" },
        cr = {
            name: "-webkit-text-stroke-width",
            initialValue: "0",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
                return WA(e) ? e.number : 0;
            },
        },
        ar =
            ((gr.prototype.isVisible = function () {
                return 0 < this.display && 0 < this.opacity && 0 === this.visibility;
            }),
            (gr.prototype.isTransparent = function () {
                return oe(this.backgroundColor);
            }),
            (gr.prototype.isTransformed = function () {
                return null !== this.transform;
            }),
            (gr.prototype.isPositioned = function () {
                return 0 !== this.position;
            }),
            (gr.prototype.isPositionedWithZIndex = function () {
                return this.isPositioned() && !this.zIndex.auto;
            }),
            (gr.prototype.isFloating = function () {
                return 0 !== this.float;
            }),
            (gr.prototype.isInlineLevel = function () {
                return Pt(this.display, 4) || Pt(this.display, 33554432) || Pt(this.display, 268435456) || Pt(this.display, 536870912) || Pt(this.display, 67108864) || Pt(this.display, 134217728);
            }),
            gr);
    function gr(A, e) {
        (this.animationDuration = lr(A, nr, e.animationDuration)),
            (this.backgroundClip = lr(A, be, e.backgroundClip)),
            (this.backgroundColor = lr(A, De, e.backgroundColor)),
            (this.backgroundImage = lr(A, Re, e.backgroundImage)),
            (this.backgroundOrigin = lr(A, Ne, e.backgroundOrigin)),
            (this.backgroundPosition = lr(A, Pe, e.backgroundPosition)),
            (this.backgroundRepeat = lr(A, Xe, e.backgroundRepeat)),
            (this.backgroundSize = lr(A, _e, e.backgroundSize)),
            (this.borderTopColor = lr(A, je, e.borderTopColor)),
            (this.borderRightColor = lr(A, ze, e.borderRightColor)),
            (this.borderBottomColor = lr(A, $e, e.borderBottomColor)),
            (this.borderLeftColor = lr(A, At, e.borderLeftColor)),
            (this.borderTopLeftRadius = lr(A, et, e.borderTopLeftRadius)),
            (this.borderTopRightRadius = lr(A, tt, e.borderTopRightRadius)),
            (this.borderBottomRightRadius = lr(A, rt, e.borderBottomRightRadius)),
            (this.borderBottomLeftRadius = lr(A, Bt, e.borderBottomLeftRadius)),
            (this.borderTopStyle = lr(A, nt, e.borderTopStyle)),
            (this.borderRightStyle = lr(A, st, e.borderRightStyle)),
            (this.borderBottomStyle = lr(A, ot, e.borderBottomStyle)),
            (this.borderLeftStyle = lr(A, it, e.borderLeftStyle)),
            (this.borderTopWidth = lr(A, Qt, e.borderTopWidth)),
            (this.borderRightWidth = lr(A, ct, e.borderRightWidth)),
            (this.borderBottomWidth = lr(A, at, e.borderBottomWidth)),
            (this.borderLeftWidth = lr(A, gt, e.borderLeftWidth)),
            (this.boxShadow = lr(A, or, e.boxShadow)),
            (this.color = lr(A, wt, e.color)),
            (this.direction = lr(A, Ut, e.direction)),
            (this.display = lr(A, lt, e.display)),
            (this.float = lr(A, ut, e.cssFloat)),
            (this.fontFamily = lr(A, jt, e.fontFamily)),
            (this.fontSize = lr(A, zt, e.fontSize)),
            (this.fontStyle = lr(A, er, e.fontStyle)),
            (this.fontVariant = lr(A, Ar, e.fontVariant)),
            (this.fontWeight = lr(A, $t, e.fontWeight)),
            (this.letterSpacing = lr(A, Ft, e.letterSpacing)),
            (this.lineBreak = lr(A, ht, e.lineBreak)),
            (this.lineHeight = lr(A, dt, e.lineHeight)),
            (this.listStyleImage = lr(A, ft, e.listStyleImage)),
            (this.listStylePosition = lr(A, Ht, e.listStylePosition)),
            (this.listStyleType = lr(A, pt, e.listStyleType)),
            (this.marginTop = lr(A, Et, e.marginTop)),
            (this.marginRight = lr(A, It, e.marginRight)),
            (this.marginBottom = lr(A, yt, e.marginBottom)),
            (this.marginLeft = lr(A, Kt, e.marginLeft)),
            (this.opacity = lr(A, Zt, e.opacity));
        var t = lr(A, mt, e.overflow);
        (this.overflowX = t[0]),
            (this.overflowY = t[1 < t.length ? 1 : 0]),
            (this.overflowWrap = lr(A, Lt, e.overflowWrap)),
            (this.paddingTop = lr(A, bt, e.paddingTop)),
            (this.paddingRight = lr(A, Dt, e.paddingRight)),
            (this.paddingBottom = lr(A, vt, e.paddingBottom)),
            (this.paddingLeft = lr(A, xt, e.paddingLeft)),
            (this.paintOrder = lr(A, ir, e.paintOrder)),
            (this.position = lr(A, St, e.position)),
            (this.textAlign = lr(A, Mt, e.textAlign)),
            (this.textDecorationColor = lr(A, _t, null !== (t = e.textDecorationColor) && void 0 !== t ? t : e.color)),
            (this.textDecorationLine = lr(A, qt, null !== (t = e.textDecorationLine) && void 0 !== t ? t : e.textDecoration)),
            (this.textShadow = lr(A, Tt, e.textShadow)),
            (this.textTransform = lr(A, Gt, e.textTransform)),
            (this.transform = lr(A, Ot, e.transform)),
            (this.transformOrigin = lr(A, Rt, e.transformOrigin)),
            (this.visibility = lr(A, Nt, e.visibility)),
            (this.webkitTextStrokeColor = lr(A, Qr, e.webkitTextStrokeColor)),
            (this.webkitTextStrokeWidth = lr(A, cr, e.webkitTextStrokeWidth)),
            (this.wordBreak = lr(A, Jt, e.wordBreak)),
            (this.zIndex = lr(A, Yt, e.zIndex));
    }
    for (
        var wr = function (A, e) {
                (this.content = lr(A, tr, e.content)), (this.quotes = lr(A, sr, e.quotes));
            },
            Ur = function (A, e) {
                (this.counterIncrement = lr(A, rr, e.counterIncrement)), (this.counterReset = lr(A, Br, e.counterReset));
            },
            lr = function (A, e, t) {
                var r = new PA(),
                    t = null != t ? t.toString() : e.initialValue;
                r.write(t);
                var B = new JA(r.read());
                switch (e.type) {
                    case 2:
                        var n = B.parseComponentValue();
                        return e.parse(A, _A(n) ? n.value : e.initialValue);
                    case 0:
                        return e.parse(A, B.parseComponentValue());
                    case 1:
                        return e.parse(A, B.parseComponentValues());
                    case 4:
                        return B.parseComponentValue();
                    case 3:
                        switch (e.format) {
                            case "angle":
                                return le(A, B.parseComponentValue());
                            case "color":
                                return ue(A, B.parseComponentValue());
                            case "image":
                                return Oe(A, B.parseComponentValue());
                            case "length":
                                var s = B.parseComponentValue();
                                return ee(s) ? s : ae;
                            case "length-percentage":
                                s = B.parseComponentValue();
                                return te(s) ? s : ae;
                            case "time":
                                return Wt(A, B.parseComponentValue());
                        }
                }
            },
            Cr = function (A, e) {
                A = (function (A) {
                    switch (A.getAttribute("data-html2canvas-debug")) {
                        case "all":
                            return 1;
                        case "clone":
                            return 2;
                        case "parse":
                            return 3;
                        case "render":
                            return 4;
                        default:
                            return 0;
                    }
                })(A);
                return 1 === A || e === A;
            },
            ur = function (A, e) {
                (this.context = A),
                    (this.textNodes = []),
                    (this.elements = []),
                    (this.flags = 0),
                    Cr(e, 3),
                    (this.styles = new ar(A, window.getComputedStyle(e, null))),
                    JB(e) &&
                        (this.styles.animationDuration.some(function (A) {
                            return 0 < A;
                        }) && (e.style.animationDuration = "0s"),
                        null !== this.styles.transform && (e.style.transform = "none")),
                    (this.bounds = f(this.context, e)),
                    Cr(e, 4) && (this.flags |= 16);
            },
            Fr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            hr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            dr = 0;
        dr < Fr.length;
        dr++
    )
        hr[Fr.charCodeAt(dr)] = dr;
    function fr(A, e, t) {
        return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
    }
    var Hr =
        ((pr.prototype.get = function (A) {
            var e;
            if (0 <= A) {
                if (A < 55296 || (56319 < A && A <= 65535)) return (e = this.index[A >> 5]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 65535) return (e = this.index[2048 + ((A - 55296) >> 5)]), this.data[(e = (e << 2) + (31 & A))];
                if (A < this.highStart) return (e = this.index[(e = 2080 + (A >> 11))]), (e = this.index[(e += (A >> 5) & 63)]), this.data[(e = (e << 2) + (31 & A))];
                if (A <= 1114111) return this.data[this.highValueIndex];
            }
            return this.errorValue;
        }),
        pr);
    function pr(A, e, t, r, B, n) {
        (this.initialValue = A), (this.errorValue = e), (this.highStart = t), (this.highValueIndex = r), (this.index = B), (this.data = n);
    }
    for (var Er = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ir = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), yr = 0; yr < Er.length; yr++) Ir[Er.charCodeAt(yr)] = yr;
    function Kr(A) {
        return kr.get(A);
    }
    function mr(A) {
        var t = (function (A) {
                for (var e = [], t = 0, r = A.length; t < r; ) {
                    var B,
                        n = A.charCodeAt(t++);
                    55296 <= n && n <= 56319 && t < r ? (56320 == (64512 & (B = A.charCodeAt(t++))) ? e.push(((1023 & n) << 10) + (1023 & B) + 65536) : (e.push(n), t--)) : e.push(n);
                }
                return e;
            })(A),
            r = t.length,
            B = 0,
            n = 0,
            s = t.map(Kr);
        return {
            next: function () {
                if (r <= B) return { done: !0, value: null };
                for (
                    var A = Rr;
                    B < r &&
                    (A = (function (A, e) {
                        var t = e - 2,
                            r = A[t],
                            B = A[e - 1],
                            e = A[e];
                        if (2 === B && 3 === e) return Rr;
                        if (2 === B || 3 === B || 4 === B) return "÷";
                        if (2 === e || 3 === e || 4 === e) return "÷";
                        if (B === Tr && -1 !== [Tr, Gr, Or, Vr].indexOf(e)) return Rr;
                        if (!((B !== Or && B !== Gr) || (e !== Gr && 10 !== e))) return Rr;
                        if ((B === Vr || 10 === B) && 10 === e) return Rr;
                        if (13 === e || 5 === e) return Rr;
                        if (7 === e) return Rr;
                        if (1 === B) return Rr;
                        if (13 === B && 14 === e) {
                            for (; 5 === r; ) r = A[--t];
                            if (14 === r) return Rr;
                        }
                        if (15 === B && 15 === e) {
                            for (var n = 0; 15 === r; ) n++, (r = A[--t]);
                            if (n % 2 == 0) return Rr;
                        }
                        return "÷";
                    })(s, ++B)) === Rr;

                );
                if (A === Rr && B !== r) return { done: !0, value: null };
                var e = function () {
                    for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                    if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
                    var t = A.length;
                    if (!t) return "";
                    for (var r = [], B = -1, n = ""; ++B < t; ) {
                        var s = A[B];
                        s <= 65535 ? r.push(s) : ((s -= 65536), r.push(55296 + (s >> 10), (s % 1024) + 56320)), (B + 1 === t || 16384 < r.length) && ((n += String.fromCharCode.apply(String, r)), (r.length = 0));
                    }
                    return n;
                }.apply(null, t.slice(n, B));
                return (n = B), { value: e, done: !1 };
            },
        };
    }
    function Lr(A) {
        return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
    }
    var br,
        Dr,
        vr,
        xr,
        Mr,
        Sr,
        Tr = 8,
        Gr = 9,
        Or = 11,
        Vr = 12,
        kr =
            ((vr = (function (A) {
                var e,
                    t,
                    r,
                    B,
                    n = 0.75 * A.length,
                    s = A.length,
                    o = 0;
                "=" === A[A.length - 1] && (n--, "=" === A[A.length - 2] && n--);
                for (var n = new ("undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? ArrayBuffer : Array)(n), i = Array.isArray(n) ? n : new Uint8Array(n), Q = 0; Q < s; Q += 4)
                    (e = hr[A.charCodeAt(Q)]), (t = hr[A.charCodeAt(Q + 1)]), (r = hr[A.charCodeAt(Q + 2)]), (B = hr[A.charCodeAt(Q + 3)]), (i[o++] = (e << 2) | (t >> 4)), (i[o++] = ((15 & t) << 4) | (r >> 2)), (i[o++] = ((3 & r) << 6) | (63 & B));
                return n;
            })(
                (br =
                    "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=")
            )),
            (xr = Array.isArray(vr)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 4) t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
                      return t;
                  })(vr)
                : new Uint32Array(vr)),
            (Mr = Array.isArray(vr)
                ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 2) t.push((A[r + 1] << 8) | A[r]);
                      return t;
                  })(vr)
                : new Uint16Array(vr)),
            (br = fr(Mr, 12, xr[4] / 2)),
            (Dr = 2 === xr[5] ? fr(Mr, (24 + xr[4]) / 2) : ((vr = xr), (Mr = Math.ceil((24 + xr[4]) / 4)), vr.slice ? vr.slice(Mr, Dr) : new Uint32Array(Array.prototype.slice.call(vr, Mr, Dr)))),
            new Hr(xr[0], xr[1], xr[2], xr[3], br, Dr)),
        Rr = "×",
        Nr = function (A, e, t, r, B) {
            var n = "http://www.w3.org/2000/svg",
                s = document.createElementNS(n, "svg"),
                n = document.createElementNS(n, "foreignObject");
            return s.setAttributeNS(null, "width", A.toString()), s.setAttributeNS(null, "height", e.toString()), n.setAttributeNS(null, "width", "100%"), n.setAttributeNS(null, "height", "100%"), n.setAttributeNS(null, "x", t.toString()), n.setAttributeNS(null, "y", r.toString()), n.setAttributeNS(null, "externalResourcesRequired", "true"), s.appendChild(n), n.appendChild(B), s;
        },
        Pr = function (r) {
            return new Promise(function (A, e) {
                var t = new Image();
                (t.onload = function () {
                    return A(t);
                }),
                    (t.onerror = e),
                    (t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(r)));
            });
        },
        Xr = {
            get SUPPORT_RANGE_BOUNDS() {
                var A = (function (A) {
                    if (A.createRange) {
                        var e = A.createRange();
                        if (e.getBoundingClientRect) {
                            var t = A.createElement("boundtest");
                            (t.style.height = "123px"), (t.style.display = "block"), A.body.appendChild(t), e.selectNode(t);
                            (e = e.getBoundingClientRect()), (e = Math.round(e.height));
                            if ((A.body.removeChild(t), 123 === e)) return !0;
                        }
                    }
                    return !1;
                })(document);
                return Object.defineProperty(Xr, "SUPPORT_RANGE_BOUNDS", { value: A }), A;
            },
            get SUPPORT_WORD_BREAKING() {
                var A =
                    Xr.SUPPORT_RANGE_BOUNDS &&
                    (function (A) {
                        var e = A.createElement("boundtest");
                        (e.style.width = "50px"), (e.style.display = "block"), (e.style.fontSize = "12px"), (e.style.letterSpacing = "0px"), (e.style.wordSpacing = "0px"), A.body.appendChild(e);
                        var r = A.createRange();
                        e.innerHTML = "function" == typeof "".repeat ? "&#128104;".repeat(10) : "";
                        var B = e.firstChild,
                            t = Q(B.data).map(function (A) {
                                return g(A);
                            }),
                            n = 0,
                            s = {},
                            t = t.every(function (A, e) {
                                r.setStart(B, n), r.setEnd(B, n + A.length);
                                var t = r.getBoundingClientRect();
                                n += A.length;
                                A = t.x > s.x || t.y > s.y;
                                return (s = t), 0 === e || A;
                            });
                        return A.body.removeChild(e), t;
                    })(document);
                return Object.defineProperty(Xr, "SUPPORT_WORD_BREAKING", { value: A }), A;
            },
            get SUPPORT_SVG_DRAWING() {
                var A = (function (A) {
                    var e = new Image(),
                        t = A.createElement("canvas"),
                        A = t.getContext("2d");
                    if (!A) return !1;
                    e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                    try {
                        A.drawImage(e, 0, 0), t.toDataURL();
                    } catch (A) {
                        return !1;
                    }
                    return !0;
                })(document);
                return Object.defineProperty(Xr, "SUPPORT_SVG_DRAWING", { value: A }), A;
            },
            get SUPPORT_FOREIGNOBJECT_DRAWING() {
                var A =
                    "function" == typeof Array.from && "function" == typeof window.fetch
                        ? (function (t) {
                              var A = t.createElement("canvas"),
                                  r = 100;
                              (A.width = r), (A.height = r);
                              var B = A.getContext("2d");
                              if (!B) return Promise.reject(!1);
                              (B.fillStyle = "rgb(0, 255, 0)"), B.fillRect(0, 0, r, r);
                              var e = new Image(),
                                  n = A.toDataURL();
                              e.src = n;
                              e = Nr(r, r, 0, 0, e);
                              return (
                                  (B.fillStyle = "red"),
                                  B.fillRect(0, 0, r, r),
                                  Pr(e)
                                      .then(function (A) {
                                          B.drawImage(A, 0, 0);
                                          var e = B.getImageData(0, 0, r, r).data;
                                          (B.fillStyle = "red"), B.fillRect(0, 0, r, r);
                                          A = t.createElement("div");
                                          return (A.style.backgroundImage = "url(" + n + ")"), (A.style.height = "100px"), Lr(e) ? Pr(Nr(r, r, 0, 0, A)) : Promise.reject(!1);
                                      })
                                      .then(function (A) {
                                          return B.drawImage(A, 0, 0), Lr(B.getImageData(0, 0, r, r).data);
                                      })
                                      .catch(function () {
                                          return !1;
                                      })
                              );
                          })(document)
                        : Promise.resolve(!1);
                return Object.defineProperty(Xr, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: A }), A;
            },
            get SUPPORT_CORS_IMAGES() {
                var A = void 0 !== new Image().crossOrigin;
                return Object.defineProperty(Xr, "SUPPORT_CORS_IMAGES", { value: A }), A;
            },
            get SUPPORT_RESPONSE_TYPE() {
                var A = "string" == typeof new XMLHttpRequest().responseType;
                return Object.defineProperty(Xr, "SUPPORT_RESPONSE_TYPE", { value: A }), A;
            },
            get SUPPORT_CORS_XHR() {
                var A = "withCredentials" in new XMLHttpRequest();
                return Object.defineProperty(Xr, "SUPPORT_CORS_XHR", { value: A }), A;
            },
            get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
                var A = !("undefined" == typeof Intl || !Intl.Segmenter);
                return Object.defineProperty(Xr, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: A }), A;
            },
        },
        Jr = function (A, e) {
            (this.text = A), (this.bounds = e);
        },
        Yr = function (A, e) {
            var t = e.ownerDocument;
            if (t) {
                var r = t.createElement("html2canvaswrapper");
                r.appendChild(e.cloneNode(!0));
                t = e.parentNode;
                if (t) {
                    t.replaceChild(r, e);
                    A = f(A, r);
                    return r.firstChild && t.replaceChild(r.firstChild, r), A;
                }
            }
            return d.EMPTY;
        },
        Wr = function (A, e, t) {
            var r = A.ownerDocument;
            if (!r) throw new Error("Node has no owner document");
            r = r.createRange();
            return r.setStart(A, e), r.setEnd(A, e + t), r;
        },
        Zr = function (A) {
            if (Xr.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
                var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
                return Array.from(e.segment(A)).map(function (A) {
                    return A.segment;
                });
            }
            return (function (A) {
                for (var e, t = mr(A), r = []; !(e = t.next()).done; ) e.value && r.push(e.value.slice());
                return r;
            })(A);
        },
        _r = function (A, e) {
            return 0 !== e.letterSpacing
                ? Zr(A)
                : (function (A, e) {
                      if (Xr.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
                          var t = new Intl.Segmenter(void 0, { granularity: "word" });
                          return Array.from(t.segment(A)).map(function (A) {
                              return A.segment;
                          });
                      }
                      return jr(A, e);
                  })(A, e);
        },
        qr = [32, 160, 4961, 65792, 65793, 4153, 4241],
        jr = function (A, e) {
            for (var t, r = wA(A, { lineBreak: e.lineBreak, wordBreak: "break-word" === e.overflowWrap ? "break-word" : e.wordBreak }), B = []; !(t = r.next()).done; )
                !(function () {
                    var A, e;
                    t.value &&
                        ((A = t.value.slice()),
                        (A = Q(A)),
                        (e = ""),
                        A.forEach(function (A) {
                            -1 === qr.indexOf(A) ? (e += g(A)) : (e.length && B.push(e), B.push(g(A)), (e = ""));
                        }),
                        e.length && B.push(e));
                })();
            return B;
        },
        zr = function (A, e, t) {
            var B, n, s, o, i;
            (this.text = $r(e.data, t.textTransform)),
                (this.textBounds =
                    ((B = A),
                    (A = this.text),
                    (s = e),
                    (A = _r(A, (n = t))),
                    (o = []),
                    (i = 0),
                    A.forEach(function (A) {
                        var e, t, r;
                        n.textDecorationLine.length || 0 < A.trim().length
                            ? Xr.SUPPORT_RANGE_BOUNDS
                                ? 1 < (r = Wr(s, i, A.length).getClientRects()).length
                                    ? ((e = Zr(A)),
                                      (t = 0),
                                      e.forEach(function (A) {
                                          o.push(new Jr(A, d.fromDOMRectList(B, Wr(s, t + i, A.length).getClientRects()))), (t += A.length);
                                      }))
                                    : o.push(new Jr(A, d.fromDOMRectList(B, r)))
                                : ((r = s.splitText(A.length)), o.push(new Jr(A, Yr(B, s))), (s = r))
                            : Xr.SUPPORT_RANGE_BOUNDS || (s = s.splitText(A.length)),
                            (i += A.length);
                    }),
                    o));
        },
        $r = function (A, e) {
            switch (e) {
                case 1:
                    return A.toLowerCase();
                case 3:
                    return A.replace(AB, eB);
                case 2:
                    return A.toUpperCase();
                default:
                    return A;
            }
        },
        AB = /(^|\s|:|-|\(|\))([a-z])/g,
        eB = function (A, e, t) {
            return 0 < A.length ? e + t.toUpperCase() : A;
        },
        tB = (A(rB, (Sr = ur)), rB);
    function rB(A, e) {
        A = Sr.call(this, A, e) || this;
        return (A.src = e.currentSrc || e.src), (A.intrinsicWidth = e.naturalWidth), (A.intrinsicHeight = e.naturalHeight), A.context.cache.addImage(A.src), A;
    }
    var BB,
        nB = (A(sB, (BB = ur)), sB);
    function sB(A, e) {
        A = BB.call(this, A, e) || this;
        return (A.canvas = e), (A.intrinsicWidth = e.width), (A.intrinsicHeight = e.height), A;
    }
    var oB,
        iB = (A(QB, (oB = ur)), QB);
    function QB(A, e) {
        var t = oB.call(this, A, e) || this,
            r = new XMLSerializer(),
            A = f(A, e);
        return e.setAttribute("width", A.width + "px"), e.setAttribute("height", A.height + "px"), (t.svg = "data:image/svg+xml," + encodeURIComponent(r.serializeToString(e))), (t.intrinsicWidth = e.width.baseVal.value), (t.intrinsicHeight = e.height.baseVal.value), t.context.cache.addImage(t.svg), t;
    }
    var cB,
        aB = (A(gB, (cB = ur)), gB);
    function gB(A, e) {
        A = cB.call(this, A, e) || this;
        return (A.value = e.value), A;
    }
    var wB,
        UB = (A(lB, (wB = ur)), lB);
    function lB(A, e) {
        A = wB.call(this, A, e) || this;
        return (A.start = e.start), (A.reversed = "boolean" == typeof e.reversed && !0 === e.reversed), A;
    }
    var CB,
        uB = [{ type: 15, flags: 0, unit: "px", number: 3 }],
        FB = [{ type: 16, flags: 0, number: 50 }],
        hB = "checkbox",
        dB = "radio",
        fB = "password",
        HB = 707406591,
        pB = (A(EB, (CB = ur)), EB);
    function EB(A, e) {
        var t = CB.call(this, A, e) || this;
        switch (
            ((t.type = e.type.toLowerCase()),
            (t.checked = e.checked),
            (t.value = 0 === (e = (A = e).type === fB ? new Array(A.value.length + 1).join("•") : A.value).length ? A.placeholder || "" : e),
            (t.type !== hB && t.type !== dB) ||
                ((t.styles.backgroundColor = 3739148031),
                (t.styles.borderTopColor = t.styles.borderRightColor = t.styles.borderBottomColor = t.styles.borderLeftColor = 2779096575),
                (t.styles.borderTopWidth = t.styles.borderRightWidth = t.styles.borderBottomWidth = t.styles.borderLeftWidth = 1),
                (t.styles.borderTopStyle = t.styles.borderRightStyle = t.styles.borderBottomStyle = t.styles.borderLeftStyle = 1),
                (t.styles.backgroundClip = [0]),
                (t.styles.backgroundOrigin = [0]),
                (t.bounds = (e = t.bounds).width > e.height ? new d(e.left + (e.width - e.height) / 2, e.top, e.height, e.height) : e.width < e.height ? new d(e.left, e.top + (e.height - e.width) / 2, e.width, e.width) : e)),
            t.type)
        ) {
            case hB:
                t.styles.borderTopRightRadius = t.styles.borderTopLeftRadius = t.styles.borderBottomRightRadius = t.styles.borderBottomLeftRadius = uB;
                break;
            case dB:
                t.styles.borderTopRightRadius = t.styles.borderTopLeftRadius = t.styles.borderBottomRightRadius = t.styles.borderBottomLeftRadius = FB;
        }
        return t;
    }
    var IB,
        yB = (A(KB, (IB = ur)), KB);
    function KB(A, e) {
        (A = IB.call(this, A, e) || this), (e = e.options[e.selectedIndex || 0]);
        return (A.value = (e && e.text) || ""), A;
    }
    var mB,
        LB = (A(bB, (mB = ur)), bB);
    function bB(A, e) {
        A = mB.call(this, A, e) || this;
        return (A.value = e.value), A;
    }
    var DB,
        vB = (A(xB, (DB = ur)), xB);
    function xB(A, e) {
        var t,
            r,
            B = DB.call(this, A, e) || this;
        (B.src = e.src), (B.width = parseInt(e.width, 10) || 0), (B.height = parseInt(e.height, 10) || 0), (B.backgroundColor = B.styles.backgroundColor);
        try {
            e.contentWindow &&
                e.contentWindow.document &&
                e.contentWindow.document.documentElement &&
                ((B.tree = kB(A, e.contentWindow.document.documentElement)),
                (t = e.contentWindow.document.documentElement ? fe(A, getComputedStyle(e.contentWindow.document.documentElement).backgroundColor) : Le.TRANSPARENT),
                (r = e.contentWindow.document.body ? fe(A, getComputedStyle(e.contentWindow.document.body).backgroundColor) : Le.TRANSPARENT),
                (B.backgroundColor = oe(t) ? (oe(r) ? B.styles.backgroundColor : r) : t));
        } catch (A) {}
        return B;
    }
    function MB(A) {
        return "VIDEO" === A.tagName;
    }
    function SB(A) {
        return "STYLE" === A.tagName;
    }
    function TB(A) {
        return 0 < A.tagName.indexOf("-");
    }
    var GB = ["OL", "UL", "MENU"],
        OB = function (e, A, t, r) {
            for (var B = A.firstChild; B; B = s) {
                var n,
                    s = B.nextSibling;
                PB(B) && 0 < B.data.trim().length
                    ? t.textNodes.push(new zr(e, B, t.styles))
                    : XB(B) &&
                      (rn(B) && B.assignedNodes
                          ? B.assignedNodes().forEach(function (A) {
                                return OB(e, A, t, r);
                            })
                          : (n = VB(e, B)).styles.isVisible() && (RB(B, n, r) ? (n.flags |= 4) : NB(n.styles) && (n.flags |= 2), -1 !== GB.indexOf(B.tagName) && (n.flags |= 8), t.elements.push(n), B.slot, B.shadowRoot ? OB(e, B.shadowRoot, n, r) : en(B) || qB(B) || tn(B) || OB(e, B, n, r)));
            }
        },
        VB = function (A, e) {
            return new ($B(e) ? tB : zB(e) ? nB : qB(e) ? iB : WB(e) ? aB : ZB(e) ? UB : _B(e) ? pB : tn(e) ? yB : en(e) ? LB : An(e) ? vB : ur)(A, e);
        },
        kB = function (A, e) {
            var t = VB(A, e);
            return (t.flags |= 4), OB(A, e, t, t), t;
        },
        RB = function (A, e, t) {
            return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || (jB(A) && t.styles.isTransparent());
        },
        NB = function (A) {
            return A.isPositioned() || A.isFloating();
        },
        PB = function (A) {
            return A.nodeType === Node.TEXT_NODE;
        },
        XB = function (A) {
            return A.nodeType === Node.ELEMENT_NODE;
        },
        JB = function (A) {
            return XB(A) && void 0 !== A.style && !YB(A);
        },
        YB = function (A) {
            return "object" == typeof A.className;
        },
        WB = function (A) {
            return "LI" === A.tagName;
        },
        ZB = function (A) {
            return "OL" === A.tagName;
        },
        _B = function (A) {
            return "INPUT" === A.tagName;
        },
        qB = function (A) {
            return "svg" === A.tagName;
        },
        jB = function (A) {
            return "BODY" === A.tagName;
        },
        zB = function (A) {
            return "CANVAS" === A.tagName;
        },
        $B = function (A) {
            return "IMG" === A.tagName;
        },
        An = function (A) {
            return "IFRAME" === A.tagName;
        },
        en = function (A) {
            return "TEXTAREA" === A.tagName;
        },
        tn = function (A) {
            return "SELECT" === A.tagName;
        },
        rn = function (A) {
            return "SLOT" === A.tagName;
        },
        Bn =
            ((nn.prototype.getCounterValue = function (A) {
                A = this.counters[A];
                return A && A.length ? A[A.length - 1] : 1;
            }),
            (nn.prototype.getCounterValues = function (A) {
                A = this.counters[A];
                return A || [];
            }),
            (nn.prototype.pop = function (A) {
                var e = this;
                A.forEach(function (A) {
                    return e.counters[A].pop();
                });
            }),
            (nn.prototype.parse = function (A) {
                var t = this,
                    e = A.counterIncrement,
                    A = A.counterReset,
                    r = !0;
                null !== e &&
                    e.forEach(function (A) {
                        var e = t.counters[A.counter];
                        e && 0 !== A.increment && ((r = !1), e.length || e.push(1), (e[Math.max(0, e.length - 1)] += A.increment));
                    });
                var B = [];
                return (
                    r &&
                        A.forEach(function (A) {
                            var e = t.counters[A.counter];
                            B.push(A.counter), (e = e || (t.counters[A.counter] = [])).push(A.reset);
                        }),
                    B
                );
            }),
            nn);
    function nn() {
        this.counters = {};
    }
    function sn(r, A, e, B, t, n) {
        return r < A || e < r
            ? Fn(r, t, 0 < n.length)
            : B.integers.reduce(function (A, e, t) {
                  for (; e <= r; ) (r -= e), (A += B.values[t]);
                  return A;
              }, "") + n;
    }
    function on(A, e, t, r) {
        for (var B = ""; t || A--, (B = r(A) + B), e <= (A /= e) * e; );
        return B;
    }
    function Qn(A, e, t, r, B) {
        var n = t - e + 1;
        return (
            (A < 0 ? "-" : "") +
            (on(Math.abs(A), n, r, function (A) {
                return g(Math.floor(A % n) + e);
            }) +
                B)
        );
    }
    function cn(A, e, t) {
        void 0 === t && (t = ". ");
        var r = e.length;
        return (
            on(Math.abs(A), r, !1, function (A) {
                return e[Math.floor(A % r)];
            }) + t
        );
    }
    function an(A, e, t, r, B, n) {
        if (A < -9999 || 9999 < A) return Fn(A, 4, 0 < B.length);
        var s = Math.abs(A),
            o = B;
        if (0 === s) return e[0] + o;
        for (var i = 0; 0 < s && i <= 4; i++) {
            var Q = s % 10;
            0 == Q && Pt(n, 1) && "" !== o ? (o = e[Q] + o) : 1 < Q || (1 == Q && 0 === i) || (1 == Q && 1 === i && Pt(n, 2)) || (1 == Q && 1 === i && Pt(n, 4) && 100 < A) || (1 == Q && 1 < i && Pt(n, 8)) ? (o = e[Q] + (0 < i ? t[i - 1] : "") + o) : 1 == Q && 0 < i && (o = t[i - 1] + o), (s = Math.floor(s / 10));
        }
        return (A < 0 ? r : "") + o;
    }
    var gn,
        wn = { integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] },
        Un = { integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"] },
        ln = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"] },
        Cn = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"] },
        un = "마이너스",
        Fn = function (A, e, t) {
            var r = t ? ". " : "",
                B = t ? "、" : "",
                n = t ? ", " : "",
                s = t ? " " : "";
            switch (e) {
                case 0:
                    return "•" + s;
                case 1:
                    return "◦" + s;
                case 2:
                    return "◾" + s;
                case 5:
                    var o = Qn(A, 48, 57, !0, r);
                    return o.length < 4 ? "0" + o : o;
                case 4:
                    return cn(A, "〇一二三四五六七八九", B);
                case 6:
                    return sn(A, 1, 3999, wn, 3, r).toLowerCase();
                case 7:
                    return sn(A, 1, 3999, wn, 3, r);
                case 8:
                    return Qn(A, 945, 969, !1, r);
                case 9:
                    return Qn(A, 97, 122, !1, r);
                case 10:
                    return Qn(A, 65, 90, !1, r);
                case 11:
                    return Qn(A, 1632, 1641, !0, r);
                case 12:
                case 49:
                    return sn(A, 1, 9999, Un, 3, r);
                case 35:
                    return sn(A, 1, 9999, Un, 3, r).toLowerCase();
                case 13:
                    return Qn(A, 2534, 2543, !0, r);
                case 14:
                case 30:
                    return Qn(A, 6112, 6121, !0, r);
                case 15:
                    return cn(A, "子丑寅卯辰巳午未申酉戌亥", B);
                case 16:
                    return cn(A, "甲乙丙丁戊己庚辛壬癸", B);
                case 17:
                case 48:
                    return an(A, "零一二三四五六七八九", "十百千萬", "負", B, 14);
                case 47:
                    return an(A, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", B, 15);
                case 42:
                    return an(A, "零一二三四五六七八九", "十百千萬", "负", B, 14);
                case 41:
                    return an(A, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", B, 15);
                case 26:
                    return an(A, "〇一二三四五六七八九", "十百千万", "マイナス", B, 0);
                case 25:
                    return an(A, "零壱弐参四伍六七八九", "拾百千万", "マイナス", B, 7);
                case 31:
                    return an(A, "영일이삼사오육칠팔구", "십백천만", un, n, 7);
                case 33:
                    return an(A, "零一二三四五六七八九", "十百千萬", un, n, 0);
                case 32:
                    return an(A, "零壹貳參四五六七八九", "拾百千", un, n, 7);
                case 18:
                    return Qn(A, 2406, 2415, !0, r);
                case 20:
                    return sn(A, 1, 19999, Cn, 3, r);
                case 21:
                    return Qn(A, 2790, 2799, !0, r);
                case 22:
                    return Qn(A, 2662, 2671, !0, r);
                case 22:
                    return sn(A, 1, 10999, ln, 3, r);
                case 23:
                    return cn(A, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
                case 24:
                    return cn(A, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
                case 27:
                    return Qn(A, 3302, 3311, !0, r);
                case 28:
                    return cn(A, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", B);
                case 29:
                    return cn(A, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", B);
                case 34:
                    return Qn(A, 3792, 3801, !0, r);
                case 37:
                    return Qn(A, 6160, 6169, !0, r);
                case 38:
                    return Qn(A, 4160, 4169, !0, r);
                case 39:
                    return Qn(A, 2918, 2927, !0, r);
                case 40:
                    return Qn(A, 1776, 1785, !0, r);
                case 43:
                    return Qn(A, 3046, 3055, !0, r);
                case 44:
                    return Qn(A, 3174, 3183, !0, r);
                case 45:
                    return Qn(A, 3664, 3673, !0, r);
                case 46:
                    return Qn(A, 3872, 3881, !0, r);
                default:
                    return Qn(A, 48, 57, !0, r);
            }
        },
        hn = "data-html2canvas-ignore",
        dn =
            ((fn.prototype.toIFrame = function (A, r) {
                var e = this,
                    B = pn(A, r);
                if (!B.contentWindow) return Promise.reject("Unable to find iframe window");
                var t = A.defaultView.pageXOffset,
                    n = A.defaultView.pageYOffset,
                    s = B.contentWindow,
                    o = s.document,
                    A = In(B).then(function () {
                        return a(e, void 0, void 0, function () {
                            var e, t;
                            return H(this, function (A) {
                                switch (A.label) {
                                    case 0:
                                        return (
                                            this.scrolledElements.forEach(bn),
                                            s && (s.scrollTo(r.left, r.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || (s.scrollY === r.top && s.scrollX === r.left) || (this.context.logger.warn("Unable to restore scroll position for cloned document"), (this.context.windowBounds = this.context.windowBounds.add(s.scrollX - r.left, s.scrollY - r.top, 0, 0)))),
                                            (e = this.options.onclone),
                                            void 0 === (t = this.clonedReferenceElement) ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : o.fonts && o.fonts.ready ? [4, o.fonts.ready] : [3, 2]
                                        );
                                    case 1:
                                        A.sent(), (A.label = 2);
                                    case 2:
                                        return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, En(o)] : [3, 4];
                                    case 3:
                                        A.sent(), (A.label = 4);
                                    case 4:
                                        return "function" == typeof e
                                            ? [
                                                  2,
                                                  Promise.resolve()
                                                      .then(function () {
                                                          return e(o, t);
                                                      })
                                                      .then(function () {
                                                          return B;
                                                      }),
                                              ]
                                            : [2, B];
                                }
                            });
                        });
                    });
                return o.open(), o.write(mn(document.doctype) + "<html></html>"), Ln(this.referenceElement.ownerDocument, t, n), o.replaceChild(o.adoptNode(this.documentElement), o.documentElement), o.close(), A;
            }),
            (fn.prototype.createElementClone = function (A) {
                if ((Cr(A, 2), zB(A))) return this.createCanvasClone(A);
                if (MB(A)) return this.createVideoClone(A);
                if (SB(A)) return this.createStyleClone(A);
                var e = A.cloneNode(!1);
                return $B(e) && ($B(A) && A.currentSrc && A.currentSrc !== A.src && ((e.src = A.currentSrc), (e.srcset = "")), "lazy" === e.loading && (e.loading = "eager")), TB(e) ? this.createCustomElementClone(e) : e;
            }),
            (fn.prototype.createCustomElementClone = function (A) {
                var e = document.createElement("html2canvascustomelement");
                return Kn(A.style, e), e;
            }),
            (fn.prototype.createStyleClone = function (A) {
                try {
                    var e = A.sheet;
                    if (e && e.cssRules) {
                        var t = [].slice.call(e.cssRules, 0).reduce(function (A, e) {
                                return e && "string" == typeof e.cssText ? A + e.cssText : A;
                            }, ""),
                            r = A.cloneNode(!1);
                        return (r.textContent = t), r;
                    }
                } catch (A) {
                    if ((this.context.logger.error("Unable to access cssRules property", A), "SecurityError" !== A.name)) throw A;
                }
                return A.cloneNode(!1);
            }),
            (fn.prototype.createCanvasClone = function (e) {
                var A;
                if (this.options.inlineImages && e.ownerDocument) {
                    var t = e.ownerDocument.createElement("img");
                    try {
                        return (t.src = e.toDataURL()), t;
                    } catch (A) {
                        this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e);
                    }
                }
                t = e.cloneNode(!1);
                try {
                    (t.width = e.width), (t.height = e.height);
                    var r,
                        B,
                        n = e.getContext("2d"),
                        s = t.getContext("2d");
                    return (
                        s &&
                            (!this.options.allowTaint && n
                                ? s.putImageData(n.getImageData(0, 0, e.width, e.height), 0, 0)
                                : (!(r = null !== (A = e.getContext("webgl2")) && void 0 !== A ? A : e.getContext("webgl")) || (!1 === (null == (B = r.getContextAttributes()) ? void 0 : B.preserveDrawingBuffer) && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e)), s.drawImage(e, 0, 0))),
                        t
                    );
                } catch (A) {
                    this.context.logger.info("Unable to clone canvas as it is tainted", e);
                }
                return t;
            }),
            (fn.prototype.createVideoClone = function (e) {
                var A = e.ownerDocument.createElement("canvas");
                (A.width = e.offsetWidth), (A.height = e.offsetHeight);
                var t = A.getContext("2d");
                try {
                    return t && (t.drawImage(e, 0, 0, A.width, A.height), this.options.allowTaint || t.getImageData(0, 0, A.width, A.height)), A;
                } catch (A) {
                    this.context.logger.info("Unable to clone video as it is tainted", e);
                }
                A = e.ownerDocument.createElement("canvas");
                return (A.width = e.offsetWidth), (A.height = e.offsetHeight), A;
            }),
            (fn.prototype.appendChildNode = function (A, e, t) {
                (XB(e) && ("SCRIPT" === e.tagName || e.hasAttribute(hn) || ("function" == typeof this.options.ignoreElements && this.options.ignoreElements(e)))) || (this.options.copyStyles && XB(e) && SB(e)) || A.appendChild(this.cloneNode(e, t));
            }),
            (fn.prototype.cloneChildNodes = function (A, e, t) {
                for (var r, B = this, n = (A.shadowRoot || A).firstChild; n; n = n.nextSibling)
                    XB(n) && rn(n) && "function" == typeof n.assignedNodes
                        ? (r = n.assignedNodes()).length &&
                          r.forEach(function (A) {
                              return B.appendChildNode(e, A, t);
                          })
                        : this.appendChildNode(e, n, t);
            }),
            (fn.prototype.cloneNode = function (A, e) {
                if (PB(A)) return document.createTextNode(A.data);
                if (!A.ownerDocument) return A.cloneNode(!1);
                var t = A.ownerDocument.defaultView;
                if (t && XB(A) && (JB(A) || YB(A))) {
                    var r = this.createElementClone(A);
                    r.style.transitionProperty = "none";
                    var B = t.getComputedStyle(A),
                        n = t.getComputedStyle(A, ":before"),
                        s = t.getComputedStyle(A, ":after");
                    this.referenceElement === A && JB(r) && (this.clonedReferenceElement = r), jB(r) && Mn(r);
                    (t = this.counters.parse(new Ur(this.context, B))), (n = this.resolvePseudoContent(A, r, n, gn.BEFORE));
                    TB(A) && (e = !0), MB(A) || this.cloneChildNodes(A, r, e), n && r.insertBefore(n, r.firstChild);
                    s = this.resolvePseudoContent(A, r, s, gn.AFTER);
                    return s && r.appendChild(s), this.counters.pop(t), ((B && (this.options.copyStyles || YB(A)) && !An(A)) || e) && Kn(B, r), (0 === A.scrollTop && 0 === A.scrollLeft) || this.scrolledElements.push([r, A.scrollLeft, A.scrollTop]), (en(A) || tn(A)) && (en(r) || tn(r)) && (r.value = A.value), r;
                }
                return A.cloneNode(!1);
            }),
            (fn.prototype.resolvePseudoContent = function (o, A, e, t) {
                var i = this;
                if (e) {
                    var r = e.content,
                        Q = A.ownerDocument;
                    if (Q && r && "none" !== r && "-moz-alt-content" !== r && "none" !== e.display) {
                        this.counters.parse(new Ur(this.context, e));
                        var c = new wr(this.context, e),
                            a = Q.createElement("html2canvaspseudoelement");
                        Kn(e, a),
                            c.content.forEach(function (A) {
                                if (0 === A.type) a.appendChild(Q.createTextNode(A.value));
                                else if (22 === A.type) {
                                    var e = Q.createElement("img");
                                    (e.src = A.value), (e.style.opacity = "1"), a.appendChild(e);
                                } else if (18 === A.type) {
                                    var t, r, B, n, s;
                                    "attr" === A.name
                                        ? (e = A.values.filter(_A)).length && a.appendChild(Q.createTextNode(o.getAttribute(e[0].value) || ""))
                                        : "counter" === A.name
                                        ? ((B = (r = A.values.filter($A))[0]), (r = r[1]), B && _A(B) && ((t = i.counters.getCounterValue(B.value)), (s = r && _A(r) ? pt.parse(i.context, r.value) : 3), a.appendChild(Q.createTextNode(Fn(t, s, !1)))))
                                        : "counters" === A.name &&
                                          ((B = (t = A.values.filter($A))[0]),
                                          (s = t[1]),
                                          (r = t[2]),
                                          B &&
                                              _A(B) &&
                                              ((B = i.counters.getCounterValues(B.value)),
                                              (n = r && _A(r) ? pt.parse(i.context, r.value) : 3),
                                              (s = s && 0 === s.type ? s.value : ""),
                                              (s = B.map(function (A) {
                                                  return Fn(A, n, !1);
                                              }).join(s)),
                                              a.appendChild(Q.createTextNode(s))));
                                } else if (20 === A.type)
                                    switch (A.value) {
                                        case "open-quote":
                                            a.appendChild(Q.createTextNode(Xt(c.quotes, i.quoteDepth++, !0)));
                                            break;
                                        case "close-quote":
                                            a.appendChild(Q.createTextNode(Xt(c.quotes, --i.quoteDepth, !1)));
                                            break;
                                        default:
                                            a.appendChild(Q.createTextNode(A.value));
                                    }
                            }),
                            (a.className = Dn + " " + vn);
                        t = t === gn.BEFORE ? " " + Dn : " " + vn;
                        return YB(A) ? (A.className.baseValue += t) : (A.className += t), a;
                    }
                }
            }),
            (fn.destroy = function (A) {
                return !!A.parentNode && (A.parentNode.removeChild(A), !0);
            }),
            fn);
    function fn(A, e, t) {
        if (((this.context = A), (this.options = t), (this.scrolledElements = []), (this.referenceElement = e), (this.counters = new Bn()), (this.quoteDepth = 0), !e.ownerDocument)) throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(e.ownerDocument.documentElement, !1);
    }
    ((he = gn = gn || {})[(he.BEFORE = 0)] = "BEFORE"), (he[(he.AFTER = 1)] = "AFTER");
    function Hn(e) {
        return new Promise(function (A) {
            !e.complete && e.src ? ((e.onload = A), (e.onerror = A)) : A();
        });
    }
    var pn = function (A, e) {
            var t = A.createElement("iframe");
            return (t.className = "html2canvas-container"), (t.style.visibility = "hidden"), (t.style.position = "fixed"), (t.style.left = "-10000px"), (t.style.top = "0px"), (t.style.border = "0"), (t.width = e.width.toString()), (t.height = e.height.toString()), (t.scrolling = "no"), t.setAttribute(hn, "true"), A.body.appendChild(t), t;
        },
        En = function (A) {
            return Promise.all([].slice.call(A.images, 0).map(Hn));
        },
        In = function (B) {
            return new Promise(function (e, A) {
                var t = B.contentWindow;
                if (!t) return A("No window assigned for iframe");
                var r = t.document;
                t.onload = B.onload = function () {
                    t.onload = B.onload = null;
                    var A = setInterval(function () {
                        0 < r.body.childNodes.length && "complete" === r.readyState && (clearInterval(A), e(B));
                    }, 50);
                };
            });
        },
        yn = ["all", "d", "content"],
        Kn = function (A, e) {
            for (var t = A.length - 1; 0 <= t; t--) {
                var r = A.item(t);
                -1 === yn.indexOf(r) && e.style.setProperty(r, A.getPropertyValue(r));
            }
            return e;
        },
        mn = function (A) {
            var e = "";
            return A && ((e += "<!DOCTYPE "), A.name && (e += A.name), A.internalSubset && (e += A.internalSubset), A.publicId && (e += '"' + A.publicId + '"'), A.systemId && (e += '"' + A.systemId + '"'), (e += ">")), e;
        },
        Ln = function (A, e, t) {
            A && A.defaultView && (e !== A.defaultView.pageXOffset || t !== A.defaultView.pageYOffset) && A.defaultView.scrollTo(e, t);
        },
        bn = function (A) {
            var e = A[0],
                t = A[1],
                A = A[2];
            (e.scrollLeft = t), (e.scrollTop = A);
        },
        Dn = "___html2canvas___pseudoelement_before",
        vn = "___html2canvas___pseudoelement_after",
        xn = '{\n    content: "" !important;\n    display: none !important;\n}',
        Mn = function (A) {
            Sn(A, "." + Dn + ":before" + xn + "\n         ." + vn + ":after" + xn);
        },
        Sn = function (A, e) {
            var t = A.ownerDocument;
            t && (((t = t.createElement("style")).textContent = e), A.appendChild(t));
        },
        Tn =
            ((Gn.getOrigin = function (A) {
                var e = Gn._link;
                return e ? ((e.href = A), (e.href = e.href), e.protocol + e.hostname + e.port) : "about:blank";
            }),
            (Gn.isSameOrigin = function (A) {
                return Gn.getOrigin(A) === Gn._origin;
            }),
            (Gn.setContext = function (A) {
                (Gn._link = A.document.createElement("a")), (Gn._origin = Gn.getOrigin(A.location.href));
            }),
            (Gn._origin = "about:blank"),
            Gn);
    function Gn() {}
    var On =
        ((Vn.prototype.addImage = function (A) {
            var e = Promise.resolve();
            return this.has(A) || ((Yn(A) || Pn(A)) && (this._cache[A] = this.loadImage(A)).catch(function () {})), e;
        }),
        (Vn.prototype.match = function (A) {
            return this._cache[A];
        }),
        (Vn.prototype.loadImage = function (s) {
            return a(this, void 0, void 0, function () {
                var e,
                    r,
                    t,
                    B,
                    n = this;
                return H(this, function (A) {
                    switch (A.label) {
                        case 0:
                            return ((e = Tn.isSameOrigin(s)), (r = !Xn(s) && !0 === this._options.useCORS && Xr.SUPPORT_CORS_IMAGES && !e), (t = !Xn(s) && !e && !Yn(s) && "string" == typeof this._options.proxy && Xr.SUPPORT_CORS_XHR && !r), e || !1 !== this._options.allowTaint || Xn(s) || Yn(s) || t || r) ? ((B = s), t ? [4, this.proxy(B)] : [3, 2]) : [2];
                        case 1:
                            (B = A.sent()), (A.label = 2);
                        case 2:
                            return (
                                this.context.logger.debug("Added image " + s.substring(0, 256)),
                                [
                                    4,
                                    new Promise(function (A, e) {
                                        var t = new Image();
                                        (t.onload = function () {
                                            return A(t);
                                        }),
                                            (t.onerror = e),
                                            (Jn(B) || r) && (t.crossOrigin = "anonymous"),
                                            (t.src = B),
                                            !0 === t.complete &&
                                                setTimeout(function () {
                                                    return A(t);
                                                }, 500),
                                            0 < n._options.imageTimeout &&
                                                setTimeout(function () {
                                                    return e("Timed out (" + n._options.imageTimeout + "ms) loading image");
                                                }, n._options.imageTimeout);
                                    }),
                                ]
                            );
                        case 3:
                            return [2, A.sent()];
                    }
                });
            });
        }),
        (Vn.prototype.has = function (A) {
            return void 0 !== this._cache[A];
        }),
        (Vn.prototype.keys = function () {
            return Promise.resolve(Object.keys(this._cache));
        }),
        (Vn.prototype.proxy = function (s) {
            var o = this,
                i = this._options.proxy;
            if (!i) throw new Error("No proxy defined");
            var Q = s.substring(0, 256);
            return new Promise(function (e, t) {
                var r = Xr.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
                    B = new XMLHttpRequest();
                (B.onload = function () {
                    var A;
                    200 === B.status
                        ? "text" == r
                            ? e(B.response)
                            : ((A = new FileReader()).addEventListener(
                                  "load",
                                  function () {
                                      return e(A.result);
                                  },
                                  !1
                              ),
                              A.addEventListener(
                                  "error",
                                  function (A) {
                                      return t(A);
                                  },
                                  !1
                              ),
                              A.readAsDataURL(B.response))
                        : t("Failed to proxy resource " + Q + " with status code " + B.status);
                }),
                    (B.onerror = t);
                var A,
                    n = -1 < i.indexOf("?") ? "&" : "?";
                B.open("GET", i + n + "url=" + encodeURIComponent(s) + "&responseType=" + r),
                    "text" != r && B instanceof XMLHttpRequest && (B.responseType = r),
                    o._options.imageTimeout &&
                        ((A = o._options.imageTimeout),
                        (B.timeout = A),
                        (B.ontimeout = function () {
                            return t("Timed out (" + A + "ms) proxying " + Q);
                        })),
                    B.send();
            });
        }),
        Vn);
    function Vn(A, e) {
        (this.context = A), (this._options = e), (this._cache = {});
    }
    var kn = /^data:image\/svg\+xml/i,
        Rn = /^data:image\/.*;base64,/i,
        Nn = /^data:image\/.*/i,
        Pn = function (A) {
            return Xr.SUPPORT_SVG_DRAWING || !Wn(A);
        },
        Xn = function (A) {
            return Nn.test(A);
        },
        Jn = function (A) {
            return Rn.test(A);
        },
        Yn = function (A) {
            return "blob" === A.substr(0, 4);
        },
        Wn = function (A) {
            return "svg" === A.substr(-3).toLowerCase() || kn.test(A);
        },
        Zn =
            ((_n.prototype.add = function (A, e) {
                return new _n(this.x + A, this.y + e);
            }),
            _n);
    function _n(A, e) {
        (this.type = 0), (this.x = A), (this.y = e);
    }
    function qn(A, e, t) {
        return new Zn(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
    }
    var jn =
        ((zn.prototype.subdivide = function (A, e) {
            var t = qn(this.start, this.startControl, A),
                r = qn(this.startControl, this.endControl, A),
                B = qn(this.endControl, this.end, A),
                n = qn(t, r, A),
                r = qn(r, B, A),
                A = qn(n, r, A);
            return e ? new zn(this.start, t, n, A) : new zn(A, r, B, this.end);
        }),
        (zn.prototype.add = function (A, e) {
            return new zn(this.start.add(A, e), this.startControl.add(A, e), this.endControl.add(A, e), this.end.add(A, e));
        }),
        (zn.prototype.reverse = function () {
            return new zn(this.end, this.endControl, this.startControl, this.start);
        }),
        zn);
    function zn(A, e, t, r) {
        (this.type = 1), (this.start = A), (this.startControl = e), (this.endControl = t), (this.end = r);
    }
    function $n(A) {
        return 1 === A.type;
    }
    var As,
        es = function (A) {
            var e = A.styles,
                t = A.bounds,
                r = (C = Be(e.borderTopLeftRadius, t.width, t.height))[0],
                B = C[1],
                n = (u = Be(e.borderTopRightRadius, t.width, t.height))[0],
                s = u[1],
                o = (F = Be(e.borderBottomRightRadius, t.width, t.height))[0],
                i = F[1],
                Q = (h = Be(e.borderBottomLeftRadius, t.width, t.height))[0],
                c = h[1];
            (d = []).push((r + n) / t.width), d.push((Q + o) / t.width), d.push((B + c) / t.height), d.push((s + i) / t.height), 1 < (f = Math.max.apply(Math, d)) && ((r /= f), (B /= f), (n /= f), (s /= f), (o /= f), (i /= f), (Q /= f), (c /= f));
            var a = t.width - n,
                g = t.height - i,
                w = t.width - o,
                U = t.height - c,
                l = e.borderTopWidth,
                C = e.borderRightWidth,
                u = e.borderBottomWidth,
                F = e.borderLeftWidth,
                h = Ue(e.paddingTop, A.bounds.width),
                d = Ue(e.paddingRight, A.bounds.width),
                f = Ue(e.paddingBottom, A.bounds.width),
                A = Ue(e.paddingLeft, A.bounds.width);
            (this.topLeftBorderDoubleOuterBox = 0 < r || 0 < B ? ss(t.left + F / 3, t.top + l / 3, r - F / 3, B - l / 3, As.TOP_LEFT) : new Zn(t.left + F / 3, t.top + l / 3)),
                (this.topRightBorderDoubleOuterBox = 0 < r || 0 < B ? ss(t.left + a, t.top + l / 3, n - C / 3, s - l / 3, As.TOP_RIGHT) : new Zn(t.left + t.width - C / 3, t.top + l / 3)),
                (this.bottomRightBorderDoubleOuterBox = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o - C / 3, i - u / 3, As.BOTTOM_RIGHT) : new Zn(t.left + t.width - C / 3, t.top + t.height - u / 3)),
                (this.bottomLeftBorderDoubleOuterBox = 0 < Q || 0 < c ? ss(t.left + F / 3, t.top + U, Q - F / 3, c - u / 3, As.BOTTOM_LEFT) : new Zn(t.left + F / 3, t.top + t.height - u / 3)),
                (this.topLeftBorderDoubleInnerBox = 0 < r || 0 < B ? ss(t.left + (2 * F) / 3, t.top + (2 * l) / 3, r - (2 * F) / 3, B - (2 * l) / 3, As.TOP_LEFT) : new Zn(t.left + (2 * F) / 3, t.top + (2 * l) / 3)),
                (this.topRightBorderDoubleInnerBox = 0 < r || 0 < B ? ss(t.left + a, t.top + (2 * l) / 3, n - (2 * C) / 3, s - (2 * l) / 3, As.TOP_RIGHT) : new Zn(t.left + t.width - (2 * C) / 3, t.top + (2 * l) / 3)),
                (this.bottomRightBorderDoubleInnerBox = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o - (2 * C) / 3, i - (2 * u) / 3, As.BOTTOM_RIGHT) : new Zn(t.left + t.width - (2 * C) / 3, t.top + t.height - (2 * u) / 3)),
                (this.bottomLeftBorderDoubleInnerBox = 0 < Q || 0 < c ? ss(t.left + (2 * F) / 3, t.top + U, Q - (2 * F) / 3, c - (2 * u) / 3, As.BOTTOM_LEFT) : new Zn(t.left + (2 * F) / 3, t.top + t.height - (2 * u) / 3)),
                (this.topLeftBorderStroke = 0 < r || 0 < B ? ss(t.left + F / 2, t.top + l / 2, r - F / 2, B - l / 2, As.TOP_LEFT) : new Zn(t.left + F / 2, t.top + l / 2)),
                (this.topRightBorderStroke = 0 < r || 0 < B ? ss(t.left + a, t.top + l / 2, n - C / 2, s - l / 2, As.TOP_RIGHT) : new Zn(t.left + t.width - C / 2, t.top + l / 2)),
                (this.bottomRightBorderStroke = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o - C / 2, i - u / 2, As.BOTTOM_RIGHT) : new Zn(t.left + t.width - C / 2, t.top + t.height - u / 2)),
                (this.bottomLeftBorderStroke = 0 < Q || 0 < c ? ss(t.left + F / 2, t.top + U, Q - F / 2, c - u / 2, As.BOTTOM_LEFT) : new Zn(t.left + F / 2, t.top + t.height - u / 2)),
                (this.topLeftBorderBox = 0 < r || 0 < B ? ss(t.left, t.top, r, B, As.TOP_LEFT) : new Zn(t.left, t.top)),
                (this.topRightBorderBox = 0 < n || 0 < s ? ss(t.left + a, t.top, n, s, As.TOP_RIGHT) : new Zn(t.left + t.width, t.top)),
                (this.bottomRightBorderBox = 0 < o || 0 < i ? ss(t.left + w, t.top + g, o, i, As.BOTTOM_RIGHT) : new Zn(t.left + t.width, t.top + t.height)),
                (this.bottomLeftBorderBox = 0 < Q || 0 < c ? ss(t.left, t.top + U, Q, c, As.BOTTOM_LEFT) : new Zn(t.left, t.top + t.height)),
                (this.topLeftPaddingBox = 0 < r || 0 < B ? ss(t.left + F, t.top + l, Math.max(0, r - F), Math.max(0, B - l), As.TOP_LEFT) : new Zn(t.left + F, t.top + l)),
                (this.topRightPaddingBox = 0 < n || 0 < s ? ss(t.left + Math.min(a, t.width - C), t.top + l, a > t.width + C ? 0 : Math.max(0, n - C), Math.max(0, s - l), As.TOP_RIGHT) : new Zn(t.left + t.width - C, t.top + l)),
                (this.bottomRightPaddingBox = 0 < o || 0 < i ? ss(t.left + Math.min(w, t.width - F), t.top + Math.min(g, t.height - u), Math.max(0, o - C), Math.max(0, i - u), As.BOTTOM_RIGHT) : new Zn(t.left + t.width - C, t.top + t.height - u)),
                (this.bottomLeftPaddingBox = 0 < Q || 0 < c ? ss(t.left + F, t.top + Math.min(U, t.height - u), Math.max(0, Q - F), Math.max(0, c - u), As.BOTTOM_LEFT) : new Zn(t.left + F, t.top + t.height - u)),
                (this.topLeftContentBox = 0 < r || 0 < B ? ss(t.left + F + A, t.top + l + h, Math.max(0, r - (F + A)), Math.max(0, B - (l + h)), As.TOP_LEFT) : new Zn(t.left + F + A, t.top + l + h)),
                (this.topRightContentBox = 0 < n || 0 < s ? ss(t.left + Math.min(a, t.width + F + A), t.top + l + h, a > t.width + F + A ? 0 : n - F + A, s - (l + h), As.TOP_RIGHT) : new Zn(t.left + t.width - (C + d), t.top + l + h)),
                (this.bottomRightContentBox = 0 < o || 0 < i ? ss(t.left + Math.min(w, t.width - (F + A)), t.top + Math.min(g, t.height + l + h), Math.max(0, o - (C + d)), i - (u + f), As.BOTTOM_RIGHT) : new Zn(t.left + t.width - (C + d), t.top + t.height - (u + f))),
                (this.bottomLeftContentBox = 0 < Q || 0 < c ? ss(t.left + F + A, t.top + U, Math.max(0, Q - (F + A)), c - (u + f), As.BOTTOM_LEFT) : new Zn(t.left + F + A, t.top + t.height - (u + f)));
        };
    ((he = As = As || {})[(he.TOP_LEFT = 0)] = "TOP_LEFT"), (he[(he.TOP_RIGHT = 1)] = "TOP_RIGHT"), (he[(he.BOTTOM_RIGHT = 2)] = "BOTTOM_RIGHT"), (he[(he.BOTTOM_LEFT = 3)] = "BOTTOM_LEFT");
    function ts(A) {
        return [A.topLeftBorderBox, A.topRightBorderBox, A.bottomRightBorderBox, A.bottomLeftBorderBox];
    }
    function rs(A) {
        return [A.topLeftPaddingBox, A.topRightPaddingBox, A.bottomRightPaddingBox, A.bottomLeftPaddingBox];
    }
    function Bs(A) {
        return 1 === A.type;
    }
    function ns(A, t) {
        return (
            A.length === t.length &&
            A.some(function (A, e) {
                return A === t[e];
            })
        );
    }
    var ss = function (A, e, t, r, B) {
            var n = ((Math.sqrt(2) - 1) / 3) * 4,
                s = t * n,
                o = r * n,
                i = A + t,
                Q = e + r;
            switch (B) {
                case As.TOP_LEFT:
                    return new jn(new Zn(A, Q), new Zn(A, Q - o), new Zn(i - s, e), new Zn(i, e));
                case As.TOP_RIGHT:
                    return new jn(new Zn(A, e), new Zn(A + s, e), new Zn(i, Q - o), new Zn(i, Q));
                case As.BOTTOM_RIGHT:
                    return new jn(new Zn(i, e), new Zn(i, e + o), new Zn(A + s, Q), new Zn(A, Q));
                default:
                    As.BOTTOM_LEFT;
                    return new jn(new Zn(i, Q), new Zn(i - s, Q), new Zn(A, e + o), new Zn(A, e));
            }
        },
        os = function (A, e, t) {
            (this.offsetX = A), (this.offsetY = e), (this.matrix = t), (this.type = 0), (this.target = 6);
        },
        is = function (A, e) {
            (this.path = A), (this.target = e), (this.type = 1);
        },
        Qs = function (A) {
            (this.opacity = A), (this.type = 2), (this.target = 6);
        },
        cs = function (A) {
            (this.element = A), (this.inlineLevel = []), (this.nonInlineLevel = []), (this.negativeZIndex = []), (this.zeroOrAutoZIndexOrTransformedOrOpacity = []), (this.positiveZIndex = []), (this.nonPositionedFloats = []), (this.nonPositionedInlineLevel = []);
        },
        as =
            ((gs.prototype.getEffects = function (e) {
                for (var A = -1 === [2, 3].indexOf(this.container.styles.position), t = this.parent, r = this.effects.slice(0); t; ) {
                    var B,
                        n,
                        s = t.effects.filter(function (A) {
                            return !Bs(A);
                        });
                    A || 0 !== t.container.styles.position || !t.parent ? (r.unshift.apply(r, s), (A = -1 === [2, 3].indexOf(t.container.styles.position)), 0 !== t.container.styles.overflowX && ((B = ts(t.curves)), (n = rs(t.curves)), ns(B, n) || r.unshift(new is(n, 6)))) : r.unshift.apply(r, s), (t = t.parent);
                }
                return r.filter(function (A) {
                    return Pt(A.target, e);
                });
            }),
            gs);
    function gs(A, e) {
        var t, r;
        (this.container = A),
            (this.parent = e),
            (this.effects = []),
            (this.curves = new es(this.container)),
            this.container.styles.opacity < 1 && this.effects.push(new Qs(this.container.styles.opacity)),
            null !== this.container.styles.transform && ((e = this.container.bounds.left + this.container.styles.transformOrigin[0].number), (t = this.container.bounds.top + this.container.styles.transformOrigin[1].number), (r = this.container.styles.transform), this.effects.push(new os(e, t, r))),
            0 !== this.container.styles.overflowX && ((t = ts(this.curves)), (r = rs(this.curves)), ns(t, r) ? this.effects.push(new is(t, 6)) : (this.effects.push(new is(t, 2)), this.effects.push(new is(r, 4))));
    }
    function ws(A, e) {
        switch (e) {
            case 0:
                return Hs(A.topLeftBorderBox, A.topLeftPaddingBox, A.topRightBorderBox, A.topRightPaddingBox);
            case 1:
                return Hs(A.topRightBorderBox, A.topRightPaddingBox, A.bottomRightBorderBox, A.bottomRightPaddingBox);
            case 2:
                return Hs(A.bottomRightBorderBox, A.bottomRightPaddingBox, A.bottomLeftBorderBox, A.bottomLeftPaddingBox);
            default:
                return Hs(A.bottomLeftBorderBox, A.bottomLeftPaddingBox, A.topLeftBorderBox, A.topLeftPaddingBox);
        }
    }
    function Us(A) {
        var e = A.bounds,
            A = A.styles;
        return e.add(A.borderLeftWidth, A.borderTopWidth, -(A.borderRightWidth + A.borderLeftWidth), -(A.borderTopWidth + A.borderBottomWidth));
    }
    function ls(A) {
        var e = A.styles,
            t = A.bounds,
            r = Ue(e.paddingLeft, t.width),
            B = Ue(e.paddingRight, t.width),
            n = Ue(e.paddingTop, t.width),
            A = Ue(e.paddingBottom, t.width);
        return t.add(r + e.borderLeftWidth, n + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + r + B), -(e.borderTopWidth + e.borderBottomWidth + n + A));
    }
    function Cs(A, e, t) {
        var r = ((B = Es(A.styles.backgroundOrigin, e)), (n = A), 0 === B ? n.bounds : (2 === B ? ls : Us)(n)),
            B = ((s = Es(A.styles.backgroundClip, e)), (o = A), 0 === s ? o.bounds : (2 === s ? ls : Us)(o)),
            n = ps(Es(A.styles.backgroundSize, e), t, r),
            s = n[0],
            o = n[1],
            t = Be(Es(A.styles.backgroundPosition, e), r.width - s, r.height - o);
        return [Is(Es(A.styles.backgroundRepeat, e), t, n, r, B), Math.round(r.left + t[0]), Math.round(r.top + t[1]), s, o];
    }
    function us(A) {
        return _A(A) && A.value === Ve.AUTO;
    }
    function Fs(A) {
        return "number" == typeof A;
    }
    var hs = function (Q, c, a, g) {
            Q.container.elements.forEach(function (A) {
                var e = Pt(A.flags, 4),
                    t = Pt(A.flags, 2),
                    r = new as(A, Q);
                Pt(A.styles.display, 2048) && g.push(r);
                var B,
                    n,
                    s,
                    o,
                    i = Pt(A.flags, 8) ? [] : g;
                e || t
                    ? ((B = e || A.styles.isPositioned() ? a : c),
                      (t = new cs(r)),
                      A.styles.isPositioned() || A.styles.opacity < 1 || A.styles.isTransformed()
                          ? (n = A.styles.zIndex.order) < 0
                              ? ((s = 0),
                                B.negativeZIndex.some(function (A, e) {
                                    return n > A.element.container.styles.zIndex.order ? ((s = e), !1) : 0 < s;
                                }),
                                B.negativeZIndex.splice(s, 0, t))
                              : 0 < n
                              ? ((o = 0),
                                B.positiveZIndex.some(function (A, e) {
                                    return n >= A.element.container.styles.zIndex.order ? ((o = e + 1), !1) : 0 < o;
                                }),
                                B.positiveZIndex.splice(o, 0, t))
                              : B.zeroOrAutoZIndexOrTransformedOrOpacity.push(t)
                          : (A.styles.isFloating() ? B.nonPositionedFloats : B.nonPositionedInlineLevel).push(t),
                      hs(r, t, e ? t : a, i))
                    : ((A.styles.isInlineLevel() ? c.inlineLevel : c.nonInlineLevel).push(r), hs(r, c, a, i)),
                    Pt(A.flags, 8) && ds(A, i);
            });
        },
        ds = function (A, e) {
            for (var t = A instanceof UB ? A.start : 1, r = A instanceof UB && A.reversed, B = 0; B < e.length; B++) {
                var n = e[B];
                n.container instanceof aB && "number" == typeof n.container.value && 0 !== n.container.value && (t = n.container.value), (n.listValue = Fn(t, n.container.styles.listStyleType, !0)), (t += r ? -1 : 1);
            }
        },
        fs = function (A, e) {
            var t = [];
            return $n(A) ? t.push(A.subdivide(0.5, !1)) : t.push(A), $n(e) ? t.push(e.subdivide(0.5, !0)) : t.push(e), t;
        },
        Hs = function (A, e, t, r) {
            var B = [];
            return $n(A) ? B.push(A.subdivide(0.5, !1)) : B.push(A), $n(t) ? B.push(t.subdivide(0.5, !0)) : B.push(t), $n(r) ? B.push(r.subdivide(0.5, !0).reverse()) : B.push(r), $n(e) ? B.push(e.subdivide(0.5, !1).reverse()) : B.push(e), B;
        },
        ps = function (A, e, t) {
            var r = e[0],
                B = e[1],
                n = e[2],
                s = A[0],
                o = A[1];
            if (!s) return [0, 0];
            if (te(s) && o && te(o)) return [Ue(s, t.width), Ue(o, t.height)];
            var i = Fs(n);
            if (_A(s) && (s.value === Ve.CONTAIN || s.value === Ve.COVER)) return Fs(n) ? (t.width / t.height < n != (s.value === Ve.COVER) ? [t.width, t.width / n] : [t.height * n, t.height]) : [t.width, t.height];
            var Q = Fs(r),
                e = Fs(B),
                A = Q || e;
            if (us(s) && (!o || us(o))) return Q && e ? [r, B] : i || A ? (A && i ? [Q ? r : B * n, e ? B : r / n] : [Q ? r : t.width, e ? B : t.height]) : [t.width, t.height];
            if (i) {
                var c = 0,
                    a = 0;
                return te(s) ? (c = Ue(s, t.width)) : te(o) && (a = Ue(o, t.height)), us(s) ? (c = a * n) : (o && !us(o)) || (a = c / n), [c, a];
            }
            (c = null), (a = null);
            if ((te(s) ? (c = Ue(s, t.width)) : o && te(o) && (a = Ue(o, t.height)), null !== (c = null !== (a = null !== c && (!o || us(o)) ? (Q && e ? (c / r) * B : t.height) : a) && us(s) ? (Q && e ? (a / B) * r : t.width) : c) && null !== a)) return [c, a];
            throw new Error("Unable to calculate background-size for element");
        },
        Es = function (A, e) {
            e = A[e];
            return void 0 === e ? A[0] : e;
        },
        Is = function (A, e, t, r, B) {
            var n = e[0],
                s = e[1],
                o = t[0],
                i = t[1];
            switch (A) {
                case 2:
                    return [new Zn(Math.round(r.left), Math.round(r.top + s)), new Zn(Math.round(r.left + r.width), Math.round(r.top + s)), new Zn(Math.round(r.left + r.width), Math.round(i + r.top + s)), new Zn(Math.round(r.left), Math.round(i + r.top + s))];
                case 3:
                    return [new Zn(Math.round(r.left + n), Math.round(r.top)), new Zn(Math.round(r.left + n + o), Math.round(r.top)), new Zn(Math.round(r.left + n + o), Math.round(r.height + r.top)), new Zn(Math.round(r.left + n), Math.round(r.height + r.top))];
                case 1:
                    return [new Zn(Math.round(r.left + n), Math.round(r.top + s)), new Zn(Math.round(r.left + n + o), Math.round(r.top + s)), new Zn(Math.round(r.left + n + o), Math.round(r.top + s + i)), new Zn(Math.round(r.left + n), Math.round(r.top + s + i))];
                default:
                    return [new Zn(Math.round(B.left), Math.round(B.top)), new Zn(Math.round(B.left + B.width), Math.round(B.top)), new Zn(Math.round(B.left + B.width), Math.round(B.height + B.top)), new Zn(Math.round(B.left), Math.round(B.height + B.top))];
            }
        },
        ys = "Hidden Text",
        Ks =
            ((ms.prototype.parseMetrics = function (A, e) {
                var t = this._document.createElement("div"),
                    r = this._document.createElement("img"),
                    B = this._document.createElement("span"),
                    n = this._document.body;
                (t.style.visibility = "hidden"),
                    (t.style.fontFamily = A),
                    (t.style.fontSize = e),
                    (t.style.margin = "0"),
                    (t.style.padding = "0"),
                    (t.style.whiteSpace = "nowrap"),
                    n.appendChild(t),
                    (r.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
                    (r.width = 1),
                    (r.height = 1),
                    (r.style.margin = "0"),
                    (r.style.padding = "0"),
                    (r.style.verticalAlign = "baseline"),
                    (B.style.fontFamily = A),
                    (B.style.fontSize = e),
                    (B.style.margin = "0"),
                    (B.style.padding = "0"),
                    B.appendChild(this._document.createTextNode(ys)),
                    t.appendChild(B),
                    t.appendChild(r);
                e = r.offsetTop - B.offsetTop + 2;
                t.removeChild(B), t.appendChild(this._document.createTextNode(ys)), (t.style.lineHeight = "normal"), (r.style.verticalAlign = "super");
                r = r.offsetTop - t.offsetTop + 2;
                return n.removeChild(t), { baseline: e, middle: r };
            }),
            (ms.prototype.getMetrics = function (A, e) {
                var t = A + " " + e;
                return void 0 === this._data[t] && (this._data[t] = this.parseMetrics(A, e)), this._data[t];
            }),
            ms);
    function ms(A) {
        (this._data = {}), (this._document = A);
    }
    var Ls,
        he = function (A, e) {
            (this.context = A), (this.options = e);
        },
        bs =
            (A(Ds, (Ls = he)),
            (Ds.prototype.applyEffects = function (A) {
                for (var e = this; this._activeEffects.length; ) this.popEffect();
                A.forEach(function (A) {
                    return e.applyEffect(A);
                });
            }),
            (Ds.prototype.applyEffect = function (A) {
                this.ctx.save(), 2 === A.type && (this.ctx.globalAlpha = A.opacity), 0 === A.type && (this.ctx.translate(A.offsetX, A.offsetY), this.ctx.transform(A.matrix[0], A.matrix[1], A.matrix[2], A.matrix[3], A.matrix[4], A.matrix[5]), this.ctx.translate(-A.offsetX, -A.offsetY)), Bs(A) && (this.path(A.path), this.ctx.clip()), this._activeEffects.push(A);
            }),
            (Ds.prototype.popEffect = function () {
                this._activeEffects.pop(), this.ctx.restore();
            }),
            (Ds.prototype.renderStack = function (e) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return e.element.container.styles.isVisible() ? [4, this.renderStackContent(e)] : [3, 2];
                            case 1:
                                A.sent(), (A.label = 2);
                            case 2:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderNode = function (e) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return Pt(e.container.flags, 16), e.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(e)] : [3, 3];
                            case 1:
                                return A.sent(), [4, this.renderNodeContent(e)];
                            case 2:
                                A.sent(), (A.label = 3);
                            case 3:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderTextWithLetterSpacing = function (t, A, r) {
                var B = this;
                0 === A
                    ? this.ctx.fillText(t.text, t.bounds.left, t.bounds.top + r)
                    : Zr(t.text).reduce(function (A, e) {
                          return B.ctx.fillText(e, A, t.bounds.top + r), A + B.ctx.measureText(e).width;
                      }, t.bounds.left);
            }),
            (Ds.prototype.createFontStyle = function (A) {
                var e = A.fontVariant
                        .filter(function (A) {
                            return "normal" === A || "small-caps" === A;
                        })
                        .join(""),
                    t = Gs(A.fontFamily).join(", "),
                    r = WA(A.fontSize) ? "" + A.fontSize.number + A.fontSize.unit : A.fontSize.number + "px";
                return [[A.fontStyle, e, A.fontWeight, r, t].join(" "), t, r];
            }),
            (Ds.prototype.renderTextNode = function (i, Q) {
                return a(this, void 0, void 0, function () {
                    var e,
                        t,
                        r,
                        B,
                        n,
                        s,
                        o = this;
                    return H(this, function (A) {
                        return (
                            (r = this.createFontStyle(Q)),
                            (e = r[0]),
                            (t = r[1]),
                            (r = r[2]),
                            (this.ctx.font = e),
                            (this.ctx.direction = 1 === Q.direction ? "rtl" : "ltr"),
                            (this.ctx.textAlign = "left"),
                            (this.ctx.textBaseline = "alphabetic"),
                            (r = this.fontMetrics.getMetrics(t, r)),
                            (B = r.baseline),
                            (n = r.middle),
                            (s = Q.paintOrder),
                            i.textBounds.forEach(function (t) {
                                s.forEach(function (A) {
                                    switch (A) {
                                        case 0:
                                            (o.ctx.fillStyle = ie(Q.color)), o.renderTextWithLetterSpacing(t, Q.letterSpacing, B);
                                            var e = Q.textShadow;
                                            e.length &&
                                                t.text.trim().length &&
                                                (e
                                                    .slice(0)
                                                    .reverse()
                                                    .forEach(function (A) {
                                                        (o.ctx.shadowColor = ie(A.color)), (o.ctx.shadowOffsetX = A.offsetX.number * o.options.scale), (o.ctx.shadowOffsetY = A.offsetY.number * o.options.scale), (o.ctx.shadowBlur = A.blur.number), o.renderTextWithLetterSpacing(t, Q.letterSpacing, B);
                                                    }),
                                                (o.ctx.shadowColor = ""),
                                                (o.ctx.shadowOffsetX = 0),
                                                (o.ctx.shadowOffsetY = 0),
                                                (o.ctx.shadowBlur = 0)),
                                                Q.textDecorationLine.length &&
                                                    ((o.ctx.fillStyle = ie(Q.textDecorationColor || Q.color)),
                                                    Q.textDecorationLine.forEach(function (A) {
                                                        switch (A) {
                                                            case 1:
                                                                o.ctx.fillRect(t.bounds.left, Math.round(t.bounds.top + B), t.bounds.width, 1);
                                                                break;
                                                            case 2:
                                                                o.ctx.fillRect(t.bounds.left, Math.round(t.bounds.top), t.bounds.width, 1);
                                                                break;
                                                            case 3:
                                                                o.ctx.fillRect(t.bounds.left, Math.ceil(t.bounds.top + n), t.bounds.width, 1);
                                                        }
                                                    }));
                                            break;
                                        case 1:
                                            Q.webkitTextStrokeWidth && t.text.trim().length && ((o.ctx.strokeStyle = ie(Q.webkitTextStrokeColor)), (o.ctx.lineWidth = Q.webkitTextStrokeWidth), (o.ctx.lineJoin = window.chrome ? "miter" : "round"), o.ctx.strokeText(t.text, t.bounds.left, t.bounds.top + B)), (o.ctx.strokeStyle = ""), (o.ctx.lineWidth = 0), (o.ctx.lineJoin = "miter");
                                    }
                                });
                            }),
                            [2]
                        );
                    });
                });
            }),
            (Ds.prototype.renderReplacedElement = function (A, e, t) {
                var r;
                t && 0 < A.intrinsicWidth && 0 < A.intrinsicHeight && ((r = ls(A)), (e = rs(e)), this.path(e), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(t, 0, 0, A.intrinsicWidth, A.intrinsicHeight, r.left, r.top, r.width, r.height), this.ctx.restore());
            }),
            (Ds.prototype.renderNodeContent = function (w) {
                return a(this, void 0, void 0, function () {
                    var e, t, r, B, n, s, o, i, Q, c, a, g;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                this.applyEffects(w.getEffects(4)), (e = w.container), (t = w.curves), (r = e.styles), (B = 0), (n = e.textNodes), (A.label = 1);
                            case 1:
                                return B < n.length ? ((s = n[B]), [4, this.renderTextNode(s, r)]) : [3, 4];
                            case 2:
                                A.sent(), (A.label = 3);
                            case 3:
                                return B++, [3, 1];
                            case 4:
                                if (!(e instanceof tB)) return [3, 8];
                                A.label = 5;
                            case 5:
                                return A.trys.push([5, 7, , 8]), [4, this.context.cache.match(e.src)];
                            case 6:
                                return (Q = A.sent()), this.renderReplacedElement(e, t, Q), [3, 8];
                            case 7:
                                return A.sent(), this.context.logger.error("Error loading image " + e.src), [3, 8];
                            case 8:
                                if ((e instanceof nB && this.renderReplacedElement(e, t, e.canvas), !(e instanceof iB))) return [3, 12];
                                A.label = 9;
                            case 9:
                                return A.trys.push([9, 11, , 12]), [4, this.context.cache.match(e.svg)];
                            case 10:
                                return (Q = A.sent()), this.renderReplacedElement(e, t, Q), [3, 12];
                            case 11:
                                return A.sent(), this.context.logger.error("Error loading svg " + e.svg.substring(0, 255)), [3, 12];
                            case 12:
                                return e instanceof vB && e.tree ? [4, new Ds(this.context, { scale: this.options.scale, backgroundColor: e.backgroundColor, x: 0, y: 0, width: e.width, height: e.height }).render(e.tree)] : [3, 14];
                            case 13:
                                (s = A.sent()), e.width && e.height && this.ctx.drawImage(s, 0, 0, e.width, e.height, e.bounds.left, e.bounds.top, e.bounds.width, e.bounds.height), (A.label = 14);
                            case 14:
                                if (
                                    (e instanceof pB &&
                                        ((i = Math.min(e.bounds.width, e.bounds.height)),
                                        e.type === hB
                                            ? e.checked &&
                                              (this.ctx.save(),
                                              this.path([
                                                  new Zn(e.bounds.left + 0.39363 * i, e.bounds.top + 0.79 * i),
                                                  new Zn(e.bounds.left + 0.16 * i, e.bounds.top + 0.5549 * i),
                                                  new Zn(e.bounds.left + 0.27347 * i, e.bounds.top + 0.44071 * i),
                                                  new Zn(e.bounds.left + 0.39694 * i, e.bounds.top + 0.5649 * i),
                                                  new Zn(e.bounds.left + 0.72983 * i, e.bounds.top + 0.23 * i),
                                                  new Zn(e.bounds.left + 0.84 * i, e.bounds.top + 0.34085 * i),
                                                  new Zn(e.bounds.left + 0.39363 * i, e.bounds.top + 0.79 * i),
                                              ]),
                                              (this.ctx.fillStyle = ie(HB)),
                                              this.ctx.fill(),
                                              this.ctx.restore())
                                            : e.type === dB && e.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(e.bounds.left + i / 2, e.bounds.top + i / 2, i / 4, 0, 2 * Math.PI, !0), (this.ctx.fillStyle = ie(HB)), this.ctx.fill(), this.ctx.restore())),
                                    xs(e) && e.value.length)
                                ) {
                                    switch (((c = this.createFontStyle(r)), (a = c[0]), (i = c[1]), (c = this.fontMetrics.getMetrics(a, i).baseline), (this.ctx.font = a), (this.ctx.fillStyle = ie(r.color)), (this.ctx.textBaseline = "alphabetic"), (this.ctx.textAlign = Ss(e.styles.textAlign)), (g = ls(e)), (o = 0), e.styles.textAlign)) {
                                        case 1:
                                            o += g.width / 2;
                                            break;
                                        case 2:
                                            o += g.width;
                                    }
                                    (i = g.add(o, 0, 0, -g.height / 2 + 1)),
                                        this.ctx.save(),
                                        this.path([new Zn(g.left, g.top), new Zn(g.left + g.width, g.top), new Zn(g.left + g.width, g.top + g.height), new Zn(g.left, g.top + g.height)]),
                                        this.ctx.clip(),
                                        this.renderTextWithLetterSpacing(new Jr(e.value, i), r.letterSpacing, c),
                                        this.ctx.restore(),
                                        (this.ctx.textBaseline = "alphabetic"),
                                        (this.ctx.textAlign = "left");
                                }
                                if (!Pt(e.styles.display, 2048)) return [3, 20];
                                if (null === e.styles.listStyleImage) return [3, 19];
                                if (0 !== (c = e.styles.listStyleImage).type) return [3, 18];
                                (Q = void 0), (c = c.url), (A.label = 15);
                            case 15:
                                return A.trys.push([15, 17, , 18]), [4, this.context.cache.match(c)];
                            case 16:
                                return (Q = A.sent()), this.ctx.drawImage(Q, e.bounds.left - (Q.width + 10), e.bounds.top), [3, 18];
                            case 17:
                                return A.sent(), this.context.logger.error("Error loading list-style-image " + c), [3, 18];
                            case 18:
                                return [3, 20];
                            case 19:
                                w.listValue &&
                                    -1 !== e.styles.listStyleType &&
                                    ((a = this.createFontStyle(r)[0]),
                                    (this.ctx.font = a),
                                    (this.ctx.fillStyle = ie(r.color)),
                                    (this.ctx.textBaseline = "middle"),
                                    (this.ctx.textAlign = "right"),
                                    (g = new d(e.bounds.left, e.bounds.top + Ue(e.styles.paddingTop, e.bounds.width), e.bounds.width, Ye(r.lineHeight, r.fontSize.number) / 2 + 1)),
                                    this.renderTextWithLetterSpacing(new Jr(w.listValue, g), r.letterSpacing, Ye(r.lineHeight, r.fontSize.number) / 2 + 2),
                                    (this.ctx.textBaseline = "bottom"),
                                    (this.ctx.textAlign = "left")),
                                    (A.label = 20);
                            case 20:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderStackContent = function (C) {
                return a(this, void 0, void 0, function () {
                    var e, t, r, B, n, s, o, i, Q, c, a, g, w, U, l;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return Pt(C.element.container.flags, 16), [4, this.renderNodeBackgroundAndBorders(C.element)];
                            case 1:
                                A.sent(), (e = 0), (t = C.negativeZIndex), (A.label = 2);
                            case 2:
                                return e < t.length ? ((l = t[e]), [4, this.renderStack(l)]) : [3, 5];
                            case 3:
                                A.sent(), (A.label = 4);
                            case 4:
                                return e++, [3, 2];
                            case 5:
                                return [4, this.renderNodeContent(C.element)];
                            case 6:
                                A.sent(), (r = 0), (B = C.nonInlineLevel), (A.label = 7);
                            case 7:
                                return r < B.length ? ((l = B[r]), [4, this.renderNode(l)]) : [3, 10];
                            case 8:
                                A.sent(), (A.label = 9);
                            case 9:
                                return r++, [3, 7];
                            case 10:
                                (n = 0), (s = C.nonPositionedFloats), (A.label = 11);
                            case 11:
                                return n < s.length ? ((l = s[n]), [4, this.renderStack(l)]) : [3, 14];
                            case 12:
                                A.sent(), (A.label = 13);
                            case 13:
                                return n++, [3, 11];
                            case 14:
                                (o = 0), (i = C.nonPositionedInlineLevel), (A.label = 15);
                            case 15:
                                return o < i.length ? ((l = i[o]), [4, this.renderStack(l)]) : [3, 18];
                            case 16:
                                A.sent(), (A.label = 17);
                            case 17:
                                return o++, [3, 15];
                            case 18:
                                (Q = 0), (c = C.inlineLevel), (A.label = 19);
                            case 19:
                                return Q < c.length ? ((l = c[Q]), [4, this.renderNode(l)]) : [3, 22];
                            case 20:
                                A.sent(), (A.label = 21);
                            case 21:
                                return Q++, [3, 19];
                            case 22:
                                (a = 0), (g = C.zeroOrAutoZIndexOrTransformedOrOpacity), (A.label = 23);
                            case 23:
                                return a < g.length ? ((l = g[a]), [4, this.renderStack(l)]) : [3, 26];
                            case 24:
                                A.sent(), (A.label = 25);
                            case 25:
                                return a++, [3, 23];
                            case 26:
                                (w = 0), (U = C.positiveZIndex), (A.label = 27);
                            case 27:
                                return w < U.length ? ((l = U[w]), [4, this.renderStack(l)]) : [3, 30];
                            case 28:
                                A.sent(), (A.label = 29);
                            case 29:
                                return w++, [3, 27];
                            case 30:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.mask = function (A) {
                this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(A.slice(0).reverse()), this.ctx.closePath();
            }),
            (Ds.prototype.path = function (A) {
                this.ctx.beginPath(), this.formatPath(A), this.ctx.closePath();
            }),
            (Ds.prototype.formatPath = function (A) {
                var r = this;
                A.forEach(function (A, e) {
                    var t = $n(A) ? A.start : A;
                    0 === e ? r.ctx.moveTo(t.x, t.y) : r.ctx.lineTo(t.x, t.y), $n(A) && r.ctx.bezierCurveTo(A.startControl.x, A.startControl.y, A.endControl.x, A.endControl.y, A.end.x, A.end.y);
                });
            }),
            (Ds.prototype.renderRepeat = function (A, e, t, r) {
                this.path(A), (this.ctx.fillStyle = e), this.ctx.translate(t, r), this.ctx.fill(), this.ctx.translate(-t, -r);
            }),
            (Ds.prototype.resizeImage = function (A, e, t) {
                if (A.width === e && A.height === t) return A;
                var r = (null !== (r = this.canvas.ownerDocument) && void 0 !== r ? r : document).createElement("canvas");
                return (r.width = Math.max(1, e)), (r.height = Math.max(1, t)), r.getContext("2d").drawImage(A, 0, 0, A.width, A.height, 0, 0, e, t), r;
            }),
            (Ds.prototype.renderBackgroundImage = function (f) {
                return a(this, void 0, void 0, function () {
                    var h, e, d, t, r, B;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                (h = f.styles.backgroundImage.length - 1),
                                    (e = function (e) {
                                        var t, r, B, n, s, o, i, Q, c, a, g, w, U, l, C, u, F;
                                        return H(this, function (A) {
                                            switch (A.label) {
                                                case 0:
                                                    if (0 !== e.type) return [3, 5];
                                                    (t = void 0), (r = e.url), (A.label = 1);
                                                case 1:
                                                    return A.trys.push([1, 3, , 4]), [4, d.context.cache.match(r)];
                                                case 2:
                                                    return (t = A.sent()), [3, 4];
                                                case 3:
                                                    return A.sent(), d.context.logger.error("Error loading background-image " + r), [3, 4];
                                                case 4:
                                                    return t && ((B = Cs(f, h, [t.width, t.height, t.width / t.height])), (o = B[0]), (g = B[1]), (w = B[2]), (c = B[3]), (a = B[4]), (s = d.ctx.createPattern(d.resizeImage(t, c, a), "repeat")), d.renderRepeat(o, s, g, w)), [3, 6];
                                                case 5:
                                                    1 === e.type
                                                        ? ((F = Cs(f, h, [null, null, null])),
                                                          (o = F[0]),
                                                          (g = F[1]),
                                                          (w = F[2]),
                                                          (c = F[3]),
                                                          (a = F[4]),
                                                          (C = Ee(e.angle, c, a)),
                                                          (l = C[0]),
                                                          (B = C[1]),
                                                          (i = C[2]),
                                                          (u = C[3]),
                                                          (Q = C[4]),
                                                          ((F = document.createElement("canvas")).width = c),
                                                          (F.height = a),
                                                          (C = F.getContext("2d")),
                                                          (n = C.createLinearGradient(B, u, i, Q)),
                                                          pe(e.stops, l).forEach(function (A) {
                                                              return n.addColorStop(A.stop, ie(A.color));
                                                          }),
                                                          (C.fillStyle = n),
                                                          C.fillRect(0, 0, c, a),
                                                          0 < c && 0 < a && ((s = d.ctx.createPattern(F, "repeat")), d.renderRepeat(o, s, g, w)))
                                                        : 2 === e.type &&
                                                          ((u = Cs(f, h, [null, null, null])),
                                                          (o = u[0]),
                                                          (i = u[1]),
                                                          (Q = u[2]),
                                                          (c = u[3]),
                                                          (a = u[4]),
                                                          (l = 0 === e.position.length ? [ge] : e.position),
                                                          (g = Ue(l[0], c)),
                                                          (w = Ue(l[l.length - 1], a)),
                                                          (C = (function (A, e, t, r, B) {
                                                              var n,
                                                                  s,
                                                                  o,
                                                                  i,
                                                                  Q = 0,
                                                                  c = 0;
                                                              switch (A.size) {
                                                                  case 0:
                                                                      0 === A.shape ? (Q = c = Math.min(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - B))) : 1 === A.shape && ((Q = Math.min(Math.abs(e), Math.abs(e - r))), (c = Math.min(Math.abs(t), Math.abs(t - B))));
                                                                      break;
                                                                  case 2:
                                                                      0 === A.shape ? (Q = c = Math.min(Ie(e, t), Ie(e, t - B), Ie(e - r, t), Ie(e - r, t - B))) : 1 === A.shape && ((n = Math.min(Math.abs(t), Math.abs(t - B)) / Math.min(Math.abs(e), Math.abs(e - r))), (o = (s = ye(r, B, e, t, !0))[0]), (i = s[1]), (c = n * (Q = Ie(o - e, (i - t) / n))));
                                                                      break;
                                                                  case 1:
                                                                      0 === A.shape ? (Q = c = Math.max(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - B))) : 1 === A.shape && ((Q = Math.max(Math.abs(e), Math.abs(e - r))), (c = Math.max(Math.abs(t), Math.abs(t - B))));
                                                                      break;
                                                                  case 3:
                                                                      0 === A.shape ? (Q = c = Math.max(Ie(e, t), Ie(e, t - B), Ie(e - r, t), Ie(e - r, t - B))) : 1 === A.shape && ((n = Math.max(Math.abs(t), Math.abs(t - B)) / Math.max(Math.abs(e), Math.abs(e - r))), (o = (s = ye(r, B, e, t, !1))[0]), (i = s[1]), (c = n * (Q = Ie(o - e, (i - t) / n))));
                                                              }
                                                              return Array.isArray(A.size) && ((Q = Ue(A.size[0], r)), (c = 2 === A.size.length ? Ue(A.size[1], B) : Q)), [Q, c];
                                                          })(e, g, w, c, a)),
                                                          (F = C[0]),
                                                          (u = C[1]),
                                                          0 < F &&
                                                              0 < u &&
                                                              ((U = d.ctx.createRadialGradient(i + g, Q + w, 0, i + g, Q + w, F)),
                                                              pe(e.stops, 2 * F).forEach(function (A) {
                                                                  return U.addColorStop(A.stop, ie(A.color));
                                                              }),
                                                              d.path(o),
                                                              (d.ctx.fillStyle = U),
                                                              F !== u ? ((l = f.bounds.left + 0.5 * f.bounds.width), (C = f.bounds.top + 0.5 * f.bounds.height), (F = 1 / (u = u / F)), d.ctx.save(), d.ctx.translate(l, C), d.ctx.transform(1, 0, 0, u, 0, 0), d.ctx.translate(-l, -C), d.ctx.fillRect(i, F * (Q - C) + C, c, a * F), d.ctx.restore()) : d.ctx.fill())),
                                                        (A.label = 6);
                                                case 6:
                                                    return h--, [2];
                                            }
                                        });
                                    }),
                                    (d = this),
                                    (t = 0),
                                    (r = f.styles.backgroundImage.slice(0).reverse()),
                                    (A.label = 1);
                            case 1:
                                return t < r.length ? ((B = r[t]), [5, e(B)]) : [3, 4];
                            case 2:
                                A.sent(), (A.label = 3);
                            case 3:
                                return t++, [3, 1];
                            case 4:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderSolidBorder = function (e, t, r) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        return this.path(ws(r, t)), (this.ctx.fillStyle = ie(e)), this.ctx.fill(), [2];
                    });
                });
            }),
            (Ds.prototype.renderDoubleBorder = function (t, r, B, n) {
                return a(this, void 0, void 0, function () {
                    var e;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return r < 3 ? [4, this.renderSolidBorder(t, B, n)] : [3, 2];
                            case 1:
                                return A.sent(), [2];
                            case 2:
                                return (
                                    (e = (function (A, e) {
                                        switch (e) {
                                            case 0:
                                                return Hs(A.topLeftBorderBox, A.topLeftBorderDoubleOuterBox, A.topRightBorderBox, A.topRightBorderDoubleOuterBox);
                                            case 1:
                                                return Hs(A.topRightBorderBox, A.topRightBorderDoubleOuterBox, A.bottomRightBorderBox, A.bottomRightBorderDoubleOuterBox);
                                            case 2:
                                                return Hs(A.bottomRightBorderBox, A.bottomRightBorderDoubleOuterBox, A.bottomLeftBorderBox, A.bottomLeftBorderDoubleOuterBox);
                                            default:
                                                return Hs(A.bottomLeftBorderBox, A.bottomLeftBorderDoubleOuterBox, A.topLeftBorderBox, A.topLeftBorderDoubleOuterBox);
                                        }
                                    })(n, B)),
                                    this.path(e),
                                    (this.ctx.fillStyle = ie(t)),
                                    this.ctx.fill(),
                                    (e = (function (A, e) {
                                        switch (e) {
                                            case 0:
                                                return Hs(A.topLeftBorderDoubleInnerBox, A.topLeftPaddingBox, A.topRightBorderDoubleInnerBox, A.topRightPaddingBox);
                                            case 1:
                                                return Hs(A.topRightBorderDoubleInnerBox, A.topRightPaddingBox, A.bottomRightBorderDoubleInnerBox, A.bottomRightPaddingBox);
                                            case 2:
                                                return Hs(A.bottomRightBorderDoubleInnerBox, A.bottomRightPaddingBox, A.bottomLeftBorderDoubleInnerBox, A.bottomLeftPaddingBox);
                                            default:
                                                return Hs(A.bottomLeftBorderDoubleInnerBox, A.bottomLeftPaddingBox, A.topLeftBorderDoubleInnerBox, A.topLeftPaddingBox);
                                        }
                                    })(n, B)),
                                    this.path(e),
                                    this.ctx.fill(),
                                    [2]
                                );
                        }
                    });
                });
            }),
            (Ds.prototype.renderNodeBackgroundAndBorders = function (c) {
                return a(this, void 0, void 0, function () {
                    var e,
                        t,
                        r,
                        B,
                        n,
                        s,
                        o,
                        i,
                        Q = this;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return (this.applyEffects(c.getEffects(2)),
                                (e = c.container.styles),
                                (t = !oe(e.backgroundColor) || e.backgroundImage.length),
                                (r = [
                                    { style: e.borderTopStyle, color: e.borderTopColor, width: e.borderTopWidth },
                                    { style: e.borderRightStyle, color: e.borderRightColor, width: e.borderRightWidth },
                                    { style: e.borderBottomStyle, color: e.borderBottomColor, width: e.borderBottomWidth },
                                    { style: e.borderLeftStyle, color: e.borderLeftColor, width: e.borderLeftWidth },
                                ]),
                                (B = Ms(Es(e.backgroundClip, 0), c.curves)),
                                t || e.boxShadow.length)
                                    ? (this.ctx.save(), this.path(B), this.ctx.clip(), oe(e.backgroundColor) || ((this.ctx.fillStyle = ie(e.backgroundColor)), this.ctx.fill()), [4, this.renderBackgroundImage(c.container)])
                                    : [3, 2];
                            case 1:
                                A.sent(),
                                    this.ctx.restore(),
                                    e.boxShadow
                                        .slice(0)
                                        .reverse()
                                        .forEach(function (A) {
                                            Q.ctx.save();
                                            var t,
                                                r,
                                                B,
                                                n,
                                                e = ts(c.curves),
                                                s = A.inset ? 0 : 1e4,
                                                o =
                                                    ((t = -s + (A.inset ? 1 : -1) * A.spread.number),
                                                    (r = (A.inset ? 1 : -1) * A.spread.number),
                                                    (B = A.spread.number * (A.inset ? -2 : 2)),
                                                    (n = A.spread.number * (A.inset ? -2 : 2)),
                                                    e.map(function (A, e) {
                                                        switch (e) {
                                                            case 0:
                                                                return A.add(t, r);
                                                            case 1:
                                                                return A.add(t + B, r);
                                                            case 2:
                                                                return A.add(t + B, r + n);
                                                            case 3:
                                                                return A.add(t, r + n);
                                                        }
                                                        return A;
                                                    }));
                                            A.inset ? (Q.path(e), Q.ctx.clip(), Q.mask(o)) : (Q.mask(e), Q.ctx.clip(), Q.path(o)), (Q.ctx.shadowOffsetX = A.offsetX.number + s), (Q.ctx.shadowOffsetY = A.offsetY.number), (Q.ctx.shadowColor = ie(A.color)), (Q.ctx.shadowBlur = A.blur.number), (Q.ctx.fillStyle = A.inset ? ie(A.color) : "rgba(0,0,0,1)"), Q.ctx.fill(), Q.ctx.restore();
                                        }),
                                    (A.label = 2);
                            case 2:
                                (s = n = 0), (o = r), (A.label = 3);
                            case 3:
                                return s < o.length ? (0 !== (i = o[s]).style && !oe(i.color) && 0 < i.width ? (2 !== i.style ? [3, 5] : [4, this.renderDashedDottedBorder(i.color, i.width, n, c.curves, 2)]) : [3, 11]) : [3, 13];
                            case 4:
                                return A.sent(), [3, 11];
                            case 5:
                                return 3 !== i.style ? [3, 7] : [4, this.renderDashedDottedBorder(i.color, i.width, n, c.curves, 3)];
                            case 6:
                                return A.sent(), [3, 11];
                            case 7:
                                return 4 !== i.style ? [3, 9] : [4, this.renderDoubleBorder(i.color, i.width, n, c.curves)];
                            case 8:
                                return A.sent(), [3, 11];
                            case 9:
                                return [4, this.renderSolidBorder(i.color, n, c.curves)];
                            case 10:
                                A.sent(), (A.label = 11);
                            case 11:
                                n++, (A.label = 12);
                            case 12:
                                return s++, [3, 3];
                            case 13:
                                return [2];
                        }
                    });
                });
            }),
            (Ds.prototype.renderDashedDottedBorder = function (g, w, U, l, C) {
                return a(this, void 0, void 0, function () {
                    var e, t, r, B, n, s, o, i, Q, c, a;
                    return H(this, function (A) {
                        return (
                            this.ctx.save(),
                            (Q = (function (A, e) {
                                switch (e) {
                                    case 0:
                                        return fs(A.topLeftBorderStroke, A.topRightBorderStroke);
                                    case 1:
                                        return fs(A.topRightBorderStroke, A.bottomRightBorderStroke);
                                    case 2:
                                        return fs(A.bottomRightBorderStroke, A.bottomLeftBorderStroke);
                                    default:
                                        return fs(A.bottomLeftBorderStroke, A.topLeftBorderStroke);
                                }
                            })(l, U)),
                            (e = ws(l, U)),
                            2 === C && (this.path(e), this.ctx.clip()),
                            (s = $n(e[0]) ? ((t = e[0].start.x), e[0].start.y) : ((t = e[0].x), e[0].y)),
                            (o = $n(e[1]) ? ((r = e[1].end.x), e[1].end.y) : ((r = e[1].x), e[1].y)),
                            (B = 0 === U || 2 === U ? Math.abs(t - r) : Math.abs(s - o)),
                            this.ctx.beginPath(),
                            3 === C ? this.formatPath(Q) : this.formatPath(e.slice(0, 2)),
                            (n = w < 3 ? 3 * w : 2 * w),
                            (s = w < 3 ? 2 * w : w),
                            3 === C && (s = n = w),
                            (o = !0),
                            B <= 2 * n ? (o = !1) : B <= 2 * n + s ? ((n *= i = B / (2 * n + s)), (s *= i)) : ((Q = Math.floor((B + s) / (n + s))), (i = (B - Q * n) / (Q - 1)), (s = (Q = (B - (Q + 1) * n) / Q) <= 0 || Math.abs(s - i) < Math.abs(s - Q) ? i : Q)),
                            o && (3 === C ? this.ctx.setLineDash([0, n + s]) : this.ctx.setLineDash([n, s])),
                            3 === C ? ((this.ctx.lineCap = "round"), (this.ctx.lineWidth = w)) : (this.ctx.lineWidth = 2 * w + 1.1),
                            (this.ctx.strokeStyle = ie(g)),
                            this.ctx.stroke(),
                            this.ctx.setLineDash([]),
                            2 === C && ($n(e[0]) && ((c = e[3]), (a = e[0]), this.ctx.beginPath(), this.formatPath([new Zn(c.end.x, c.end.y), new Zn(a.start.x, a.start.y)]), this.ctx.stroke()), $n(e[1]) && ((c = e[1]), (a = e[2]), this.ctx.beginPath(), this.formatPath([new Zn(c.end.x, c.end.y), new Zn(a.start.x, a.start.y)]), this.ctx.stroke())),
                            this.ctx.restore(),
                            [2]
                        );
                    });
                });
            }),
            (Ds.prototype.render = function (B) {
                return a(this, void 0, void 0, function () {
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return this.options.backgroundColor && ((this.ctx.fillStyle = ie(this.options.backgroundColor)), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), (t = new as((e = B), null)), (r = new cs(t)), hs(t, r, r, (e = [])), ds(t.container, e), [4, this.renderStack(r)];
                            case 1:
                                return A.sent(), this.applyEffects([]), [2, this.canvas];
                        }
                        var e, t, r;
                    });
                });
            }),
            Ds);
    function Ds(A, e) {
        A = Ls.call(this, A, e) || this;
        return (
            (A._activeEffects = []),
            (A.canvas = e.canvas || document.createElement("canvas")),
            (A.ctx = A.canvas.getContext("2d")),
            e.canvas || ((A.canvas.width = Math.floor(e.width * e.scale)), (A.canvas.height = Math.floor(e.height * e.scale)), (A.canvas.style.width = e.width + "px"), (A.canvas.style.height = e.height + "px")),
            (A.fontMetrics = new Ks(document)),
            A.ctx.scale(A.options.scale, A.options.scale),
            A.ctx.translate(-e.x, -e.y),
            (A.ctx.textBaseline = "bottom"),
            (A._activeEffects = []),
            A.context.logger.debug("Canvas renderer initialized (" + e.width + "x" + e.height + ") with scale " + e.scale),
            A
        );
    }
    var vs,
        xs = function (A) {
            return A instanceof LB || A instanceof yB || (A instanceof pB && A.type !== dB && A.type !== hB);
        },
        Ms = function (A, e) {
            switch (A) {
                case 0:
                    return ts(e);
                case 2:
                    return [e.topLeftContentBox, e.topRightContentBox, e.bottomRightContentBox, e.bottomLeftContentBox];
                default:
                    return rs(e);
            }
        },
        Ss = function (A) {
            switch (A) {
                case 1:
                    return "center";
                case 2:
                    return "right";
                default:
                    return "left";
            }
        },
        Ts = ["-apple-system", "system-ui"],
        Gs = function (A) {
            return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
                ? A.filter(function (A) {
                      return -1 === Ts.indexOf(A);
                  })
                : A;
        },
        Os =
            (A(Vs, (vs = he)),
            (Vs.prototype.render = function (t) {
                return a(this, void 0, void 0, function () {
                    var e;
                    return H(this, function (A) {
                        switch (A.label) {
                            case 0:
                                return (e = Nr(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, t)), [4, ks(e)];
                            case 1:
                                return (e = A.sent()), this.options.backgroundColor && ((this.ctx.fillStyle = ie(this.options.backgroundColor)), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(e, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
                        }
                    });
                });
            }),
            Vs);
    function Vs(A, e) {
        A = vs.call(this, A, e) || this;
        return (
            (A.canvas = e.canvas || document.createElement("canvas")),
            (A.ctx = A.canvas.getContext("2d")),
            (A.options = e),
            (A.canvas.width = Math.floor(e.width * e.scale)),
            (A.canvas.height = Math.floor(e.height * e.scale)),
            (A.canvas.style.width = e.width + "px"),
            (A.canvas.style.height = e.height + "px"),
            A.ctx.scale(A.options.scale, A.options.scale),
            A.ctx.translate(-e.x, -e.y),
            A.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + e.scale),
            A
        );
    }
    var ks = function (r) {
            return new Promise(function (A, e) {
                var t = new Image();
                (t.onload = function () {
                    A(t);
                }),
                    (t.onerror = e),
                    (t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(r)));
            });
        },
        Rs =
            ((Ns.prototype.debug = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.debug ? console.debug.apply(console, t([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
            }),
            (Ns.prototype.getTime = function () {
                return Date.now() - this.start;
            }),
            (Ns.prototype.info = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && "undefined" != typeof window && window.console && "function" == typeof console.info && console.info.apply(console, t([this.id, this.getTime() + "ms"], A));
            }),
            (Ns.prototype.warn = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.warn ? console.warn.apply(console, t([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
            }),
            (Ns.prototype.error = function () {
                for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
                this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.error ? console.error.apply(console, t([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
            }),
            (Ns.instances = {}),
            Ns);
    function Ns(A) {
        var e = A.id,
            A = A.enabled;
        (this.id = e), (this.enabled = A), (this.start = Date.now());
    }
    var Ps = ((Xs.instanceCount = 1), Xs);
    function Xs(A, e) {
        (this.windowBounds = e), (this.instanceName = "#" + Xs.instanceCount++), (this.logger = new Rs({ id: this.instanceName, enabled: A.logging })), (this.cache = null !== (e = A.cache) && void 0 !== e ? e : new On(this, A));
    }
    "undefined" != typeof window && Tn.setContext(window);
    var Js = function (u, F) {
            return a(void 0, void 0, void 0, function () {
                var e, t, r, B, n, s, o, i, Q, c, a, g, w, U, l, C;
                return H(this, function (A) {
                    switch (A.label) {
                        case 0:
                            if (!u || "object" != typeof u) return [2, Promise.reject("Invalid element provided as first argument")];
                            if (!(e = u.ownerDocument)) throw new Error("Element is not attached to a Document");
                            if (!(t = e.defaultView)) throw new Error("Document is not attached to a Window");
                            return (
                                (w = { allowTaint: null !== (U = F.allowTaint) && void 0 !== U && U, imageTimeout: null !== (c = F.imageTimeout) && void 0 !== c ? c : 15e3, proxy: F.proxy, useCORS: null !== (a = F.useCORS) && void 0 !== a && a }),
                                (U = h({ logging: null === (g = F.logging) || void 0 === g || g, cache: F.cache }, w)),
                                (c = { windowWidth: null !== (c = F.windowWidth) && void 0 !== c ? c : t.innerWidth, windowHeight: null !== (a = F.windowHeight) && void 0 !== a ? a : t.innerHeight, scrollX: null !== (g = F.scrollX) && void 0 !== g ? g : t.pageXOffset, scrollY: null !== (w = F.scrollY) && void 0 !== w ? w : t.pageYOffset }),
                                (a = new d(c.scrollX, c.scrollY, c.windowWidth, c.windowHeight)),
                                (g = new Ps(U, a)),
                                (c = null !== (w = F.foreignObjectRendering) && void 0 !== w && w),
                                (w = { allowTaint: null !== (U = F.allowTaint) && void 0 !== U && U, onclone: F.onclone, ignoreElements: F.ignoreElements, inlineImages: c, copyStyles: c }),
                                g.logger.debug("Starting document clone with size " + a.width + "x" + a.height + " scrolled to " + -a.left + "," + -a.top),
                                (U = new dn(g, u, w)),
                                (w = U.clonedReferenceElement) ? [4, U.toIFrame(e, a)] : [2, Promise.reject("Unable to find element in cloned iframe")]
                            );
                        case 1:
                            return ((r = A.sent()),
                            (l =
                                jB(w) || "HTML" === w.tagName
                                    ? (function (A) {
                                          var e = A.body,
                                              t = A.documentElement;
                                          if (!e || !t) throw new Error("Unable to get document size");
                                          (A = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth))), (t = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight)));
                                          return new d(0, 0, A, t);
                                      })(w.ownerDocument)
                                    : f(g, w)),
                            (B = l.width),
                            (n = l.height),
                            (s = l.left),
                            (o = l.top),
                            (i = Ys(g, w, F.backgroundColor)),
                            (l = {
                                canvas: F.canvas,
                                backgroundColor: i,
                                scale: null !== (l = null !== (l = F.scale) && void 0 !== l ? l : t.devicePixelRatio) && void 0 !== l ? l : 1,
                                x: (null !== (l = F.x) && void 0 !== l ? l : 0) + s,
                                y: (null !== (l = F.y) && void 0 !== l ? l : 0) + o,
                                width: null !== (l = F.width) && void 0 !== l ? l : Math.ceil(B),
                                height: null !== (l = F.height) && void 0 !== l ? l : Math.ceil(n),
                            }),
                            c)
                                ? (g.logger.debug("Document cloned, using foreign object rendering"), [4, new Os(g, l).render(w)])
                                : [3, 3];
                        case 2:
                            return (Q = A.sent()), [3, 5];
                        case 3:
                            return (
                                g.logger.debug("Document cloned, element located at " + s + "," + o + " with size " + B + "x" + n + " using computed rendering"),
                                g.logger.debug("Starting DOM parsing"),
                                (C = kB(g, w)),
                                i === C.styles.backgroundColor && (C.styles.backgroundColor = Le.TRANSPARENT),
                                g.logger.debug("Starting renderer for element at " + l.x + "," + l.y + " with size " + l.width + "x" + l.height),
                                [4, new bs(g, l).render(C)]
                            );
                        case 4:
                            (Q = A.sent()), (A.label = 5);
                        case 5:
                            return (null !== (C = F.removeContainer) && void 0 !== C && !C) || dn.destroy(r) || g.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore"), g.logger.debug("Finished rendering"), [2, Q];
                    }
                });
            });
        },
        Ys = function (A, e, t) {
            var r = e.ownerDocument,
                B = r.documentElement ? fe(A, getComputedStyle(r.documentElement).backgroundColor) : Le.TRANSPARENT,
                n = r.body ? fe(A, getComputedStyle(r.body).backgroundColor) : Le.TRANSPARENT,
                t = "string" == typeof t ? fe(A, t) : null === t ? Le.TRANSPARENT : 4294967295;
            return e === r.documentElement ? (oe(B) ? (oe(n) ? t : n) : B) : t;
        };
    return function (A, e) {
        return Js(A, (e = void 0 === e ? {} : e));
    };
});

// inline-svg
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory(root));
    } else if (typeof exports === "object") {
        module.exports = factory(root);
    } else {
        root.inlineSVG = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    // Variables
    var inlineSVG = {},
        supports = !!document.querySelector && !!root.addEventListener,
        settings;

    // Defaults
    var defaults = {
        initClass: "js-inlinesvg",
        svgSelector: "img.svg",
    };

    /**
     * Stolen from underscore.js
     * @private
     * @param {Int} times
     * @param {Function} func
     */
    var after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

    /**
     * Merge two objects together
     * @private
     * @param {Function} fn
     */
    var extend = function () {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    // Methods

    /**
     * Grab all the SVGs that match the selector
     * @public
     */
    var getAll = function () {
        var svgs = document.querySelectorAll(settings.svgSelector);
        return svgs;
    };

    var uid = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + varters), and grab the first 9 characters
        // after the decimal.
        return "_" + Math.random().toString(36).substr(2, 9);
    };

    /**
     * Inline all the SVGs in the array
     * @public
     */
    var inliner = function (cb) {
        var svgs = getAll();
        var callback = after(svgs.length, cb);

        Array.prototype.forEach.call(svgs, function (svg, i) {
            // Store some attributes of the image
            var src = svg.src || svg.getAttribute("data-src"),
                attributes = svg.attributes;

            // Get the contents of the SVG
            var request = new XMLHttpRequest();
            request.open("GET", src, true);

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // Setup a parser to convert the response to text/xml in order for it
                    // to be manipulated and changed
                    var parser = new DOMParser(),
                        result = parser.parseFromString(request.responseText, "text/xml"),
                        inlinedSVG = result.getElementsByTagName("svg")[0];

                    // Remove some of the attributes that aren't needed
                    inlinedSVG.removeAttribute("xmlns:a");
                    inlinedSVG.removeAttribute("width");
                    inlinedSVG.removeAttribute("height");
                    inlinedSVG.removeAttribute("x");
                    inlinedSVG.removeAttribute("y");
                    inlinedSVG.removeAttribute("enable-background");
                    inlinedSVG.removeAttribute("xmlns:xlink");
                    inlinedSVG.removeAttribute("xml:space");
                    inlinedSVG.removeAttribute("version");

                    // Add in the attributes from the original <img> except `src`,
                    // `alt` or `longdesc` which we don't need
                    Array.prototype.slice.call(attributes).forEach(function (attribute) {
                        if (attribute.name !== "src" && attribute.name !== "alt" && attribute.name !== "longdesc") {
                            inlinedSVG.setAttribute(attribute.name, attribute.value);
                        }
                    });

                    // Add an additional class to the inlined SVG to imply it was
                    // infact inlined, might be useful to know
                    if (inlinedSVG.classList) {
                        inlinedSVG.classList.add("inlined-svg");
                    } else {
                        inlinedSVG.setAttribute("class", inlinedSVG.getAttribute("class") + " inlined-svg");
                    }

                    // Add in some accessibility quick wins
                    inlinedSVG.setAttribute("role", "img");

                    // Use the `alt` attribute if one exists
                    if (attributes.alt) {
                        var title = document.createElementNS("http://www.w3.org/2000/svg", "title"),
                            titvarext = document.createTextNode(attributes.alt.value);

                        title.setAttribute("id", uid());
                        title.appendChild(titvarext);
                        inlinedSVG.insertBefore(title, inlinedSVG.firstChild);

                        if (attributes.id) {
                            inlinedSVG.setAttribute("aria-labelledby", attributes.id.value);
                        } else if (!attributes.id) {
                            var getTitleId = function () {
                                if (inlinedSVG.getElementsByTagName("title").length > 0) {
                                    var titleId = inlinedSVG.getElementsByTagName("title")[0].getAttribute("id");
                                    return titleId;
                                } else {
                                    return "";
                                }
                            };

                            inlinedSVG.setAttribute("aria-labelledby", getTitleId());
                        }
                    }

                    if (!attributes.alt) {
                        inlinedSVG.setAttribute("aria-hidden", "true");
                        inlinedSVG.setAttribute("role", "presentation");
                    }

                    // Use the `longdesc` attribute if one exists
                    if (attributes.longdesc) {
                        var description = document.createElementNS("http://www.w3.org/2000/svg", "desc"),
                            descriptionText = document.createTextNode(attributes.longdesc.value);

                        description.setAttribute("id", uid());
                        description.appendChild(descriptionText);
                        if (attributes.alt) {
                            inlinedSVG.insertBefore(description, inlinedSVG.firstChild.nextSibling);
                        } else {
                            inlinedSVG.insertBefore(description, inlinedSVG.firstChild);
                        }

                        var getDescId = function () {
                            if (inlinedSVG.getElementsByTagName("desc").length > 0) {
                                var descId = inlinedSVG.getElementsByTagName("desc")[0].getAttribute("id");
                                return descId;
                            } else {
                                return "";
                            }
                        };

                        if (attributes.alt) {
                            var currAttrs = inlinedSVG.getAttribute("aria-labelledby");
                            inlinedSVG.setAttribute("aria-labelledby", (currAttrs += " " + getDescId()));
                        } else {
                            inlinedSVG.setAttribute("aria-labelledby", getDescId());
                        }
                    }

                    // Replace the image with the SVG
                    if (svg.parentNode) {
                        svg.parentNode.replaceChild(inlinedSVG, svg);
                    }

                    // Fire the callback
                    if (callback) {
                        callback(settings.svgSelector);
                    }
                } else {
                    console.error("There was an error retrieving the source of the SVG.");
                }
            };

            request.onerror = function () {
                console.error("There was an error connecting to the origin server.");
            };

            request.send();
        });
    };

    /**
     * Initialise the inliner
     * @public
     */
    inlineSVG.init = function (options, callback) {
        // Test for support
        if (!supports) return;

        // Merge users option with defaults
        settings = extend(defaults, options || {});

        // Kick-off the inliner
        inliner(callback || function () {});

        // Once inlined and a class to the HTML
        document.documentElement.className += " " + settings.initClass;
    };

    return inlineSVG;
});
// jszip.js
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!(function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
    }
})(function () {
    return (function s(a, o, h) {
        function u(r, e) {
            if (!o[r]) {
                if (!a[r]) {
                    var t = "function" == typeof require && require;
                    if (!e && t) return t(r, !0);
                    if (l) return l(r, !0);
                    var n = new Error("Cannot find module '" + r + "'");
                    throw ((n.code = "MODULE_NOT_FOUND"), n);
                }
                var i = (o[r] = { exports: {} });
                a[r][0].call(
                    i.exports,
                    function (e) {
                        var t = a[r][1][e];
                        return u(t || e);
                    },
                    i,
                    i.exports,
                    s,
                    a,
                    o,
                    h
                );
            }
            return o[r].exports;
        }
        for (var l = "function" == typeof require && require, e = 0; e < h.length; e++) u(h[e]);
        return u;
    })(
        {
            1: [
                function (e, t, r) {
                    "use strict";
                    var d = e("./utils"),
                        c = e("./support"),
                        p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    (r.encode = function (e) {
                        for (var t, r, n, i, s, a, o, h = [], u = 0, l = e.length, f = l, c = "string" !== d.getTypeOf(e); u < e.length; )
                            (f = l - u), (n = c ? ((t = e[u++]), (r = u < l ? e[u++] : 0), u < l ? e[u++] : 0) : ((t = e.charCodeAt(u++)), (r = u < l ? e.charCodeAt(u++) : 0), u < l ? e.charCodeAt(u++) : 0)), (i = t >> 2), (s = ((3 & t) << 4) | (r >> 4)), (a = 1 < f ? ((15 & r) << 2) | (n >> 6) : 64), (o = 2 < f ? 63 & n : 64), h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
                        return h.join("");
                    }),
                        (r.decode = function (e) {
                            var t,
                                r,
                                n,
                                i,
                                s,
                                a,
                                o = 0,
                                h = 0,
                                u = "data:";
                            if (e.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
                            var l,
                                f = (3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length) / 4;
                            if ((e.charAt(e.length - 1) === p.charAt(64) && f--, e.charAt(e.length - 2) === p.charAt(64) && f--, f % 1 != 0)) throw new Error("Invalid base64 input, bad content length.");
                            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e.length; ) (t = (p.indexOf(e.charAt(o++)) << 2) | ((i = p.indexOf(e.charAt(o++))) >> 4)), (r = ((15 & i) << 4) | ((s = p.indexOf(e.charAt(o++))) >> 2)), (n = ((3 & s) << 6) | (a = p.indexOf(e.charAt(o++)))), (l[h++] = t), 64 !== s && (l[h++] = r), 64 !== a && (l[h++] = n);
                            return l;
                        });
                },
                { "./support": 30, "./utils": 32 },
            ],
            2: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./external"),
                        i = e("./stream/DataWorker"),
                        s = e("./stream/Crc32Probe"),
                        a = e("./stream/DataLengthProbe");
                    function o(e, t, r, n, i) {
                        (this.compressedSize = e), (this.uncompressedSize = t), (this.crc32 = r), (this.compression = n), (this.compressedContent = i);
                    }
                    (o.prototype = {
                        getContentWorker: function () {
                            var e = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                                t = this;
                            return (
                                e.on("end", function () {
                                    if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
                                }),
                                e
                            );
                        },
                        getCompressedWorker: function () {
                            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
                        },
                    }),
                        (o.createWorkerFrom = function (e, t, r) {
                            return e.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", t);
                        }),
                        (t.exports = o);
                },
                { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 },
            ],
            3: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./stream/GenericWorker");
                    (r.STORE = {
                        magic: "\0\0",
                        compressWorker: function () {
                            return new n("STORE compression");
                        },
                        uncompressWorker: function () {
                            return new n("STORE decompression");
                        },
                    }),
                        (r.DEFLATE = e("./flate"));
                },
                { "./flate": 7, "./stream/GenericWorker": 28 },
            ],
            4: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./utils");
                    var o = (function () {
                        for (var e, t = [], r = 0; r < 256; r++) {
                            e = r;
                            for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
                            t[r] = e;
                        }
                        return t;
                    })();
                    t.exports = function (e, t) {
                        return void 0 !== e && e.length
                            ? "string" !== n.getTypeOf(e)
                                ? (function (e, t, r, n) {
                                      var i = o,
                                          s = n + r;
                                      e ^= -1;
                                      for (var a = n; a < s; a++) e = (e >>> 8) ^ i[255 & (e ^ t[a])];
                                      return -1 ^ e;
                                  })(0 | t, e, e.length, 0)
                                : (function (e, t, r, n) {
                                      var i = o,
                                          s = n + r;
                                      e ^= -1;
                                      for (var a = n; a < s; a++) e = (e >>> 8) ^ i[255 & (e ^ t.charCodeAt(a))];
                                      return -1 ^ e;
                                  })(0 | t, e, e.length, 0)
                            : 0;
                    };
                },
                { "./utils": 32 },
            ],
            5: [
                function (e, t, r) {
                    "use strict";
                    (r.base64 = !1), (r.binary = !1), (r.dir = !1), (r.createFolders = !0), (r.date = null), (r.compression = null), (r.compressionOptions = null), (r.comment = null), (r.unixPermissions = null), (r.dosPermissions = null);
                },
                {},
            ],
            6: [
                function (e, t, r) {
                    "use strict";
                    var n = null;
                    (n = "undefined" != typeof Promise ? Promise : e("lie")), (t.exports = { Promise: n });
                },
                { lie: 37 },
            ],
            7: [
                function (e, t, r) {
                    "use strict";
                    var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                        i = e("pako"),
                        s = e("./utils"),
                        a = e("./stream/GenericWorker"),
                        o = n ? "uint8array" : "array";
                    function h(e, t) {
                        a.call(this, "FlateWorker/" + e), (this._pako = null), (this._pakoAction = e), (this._pakoOptions = t), (this.meta = {});
                    }
                    (r.magic = "\b\0"),
                        s.inherits(h, a),
                        (h.prototype.processChunk = function (e) {
                            (this.meta = e.meta), null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e.data), !1);
                        }),
                        (h.prototype.flush = function () {
                            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0);
                        }),
                        (h.prototype.cleanUp = function () {
                            a.prototype.cleanUp.call(this), (this._pako = null);
                        }),
                        (h.prototype._createPako = function () {
                            this._pako = new i[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
                            var t = this;
                            this._pako.onData = function (e) {
                                t.push({ data: e, meta: t.meta });
                            };
                        }),
                        (r.compressWorker = function (e) {
                            return new h("Deflate", e);
                        }),
                        (r.uncompressWorker = function () {
                            return new h("Inflate", {});
                        });
                },
                { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 },
            ],
            8: [
                function (e, t, r) {
                    "use strict";
                    function A(e, t) {
                        var r,
                            n = "";
                        for (r = 0; r < t; r++) (n += String.fromCharCode(255 & e)), (e >>>= 8);
                        return n;
                    }
                    function n(e, t, r, n, i, s) {
                        var a,
                            o,
                            h = e.file,
                            u = e.compression,
                            l = s !== O.utf8encode,
                            f = I.transformTo("string", s(h.name)),
                            c = I.transformTo("string", O.utf8encode(h.name)),
                            d = h.comment,
                            p = I.transformTo("string", s(d)),
                            m = I.transformTo("string", O.utf8encode(d)),
                            _ = c.length !== h.name.length,
                            g = m.length !== d.length,
                            b = "",
                            v = "",
                            y = "",
                            w = h.dir,
                            k = h.date,
                            x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
                        (t && !r) || ((x.crc32 = e.crc32), (x.compressedSize = e.compressedSize), (x.uncompressedSize = e.uncompressedSize));
                        var S = 0;
                        t && (S |= 8), l || (!_ && !g) || (S |= 2048);
                        var z = 0,
                            C = 0;
                        w && (z |= 16),
                            "UNIX" === i
                                ? ((C = 798),
                                  (z |= (function (e, t) {
                                      var r = e;
                                      return e || (r = t ? 16893 : 33204), (65535 & r) << 16;
                                  })(h.unixPermissions, w)))
                                : ((C = 20),
                                  (z |= (function (e) {
                                      return 63 & (e || 0);
                                  })(h.dosPermissions))),
                            (a = k.getUTCHours()),
                            (a <<= 6),
                            (a |= k.getUTCMinutes()),
                            (a <<= 5),
                            (a |= k.getUTCSeconds() / 2),
                            (o = k.getUTCFullYear() - 1980),
                            (o <<= 4),
                            (o |= k.getUTCMonth() + 1),
                            (o <<= 5),
                            (o |= k.getUTCDate()),
                            _ && ((v = A(1, 1) + A(B(f), 4) + c), (b += "up" + A(v.length, 2) + v)),
                            g && ((y = A(1, 1) + A(B(p), 4) + m), (b += "uc" + A(y.length, 2) + y));
                        var E = "";
                        return (E += "\n\0"), (E += A(S, 2)), (E += u.magic), (E += A(a, 2)), (E += A(o, 2)), (E += A(x.crc32, 4)), (E += A(x.compressedSize, 4)), (E += A(x.uncompressedSize, 4)), (E += A(f.length, 2)), (E += A(b.length, 2)), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n, 4) + f + b + p };
                    }
                    var I = e("../utils"),
                        i = e("../stream/GenericWorker"),
                        O = e("../utf8"),
                        B = e("../crc32"),
                        R = e("../signature");
                    function s(e, t, r, n) {
                        i.call(this, "ZipFileWorker"), (this.bytesWritten = 0), (this.zipComment = t), (this.zipPlatform = r), (this.encodeFileName = n), (this.streamFiles = e), (this.accumulate = !1), (this.contentBuffer = []), (this.dirRecords = []), (this.currentSourceOffset = 0), (this.entriesCount = 0), (this.currentFile = null), (this._sources = []);
                    }
                    I.inherits(s, i),
                        (s.prototype.push = function (e) {
                            var t = e.meta.percent || 0,
                                r = this.entriesCount,
                                n = this._sources.length;
                            this.accumulate ? this.contentBuffer.push(e) : ((this.bytesWritten += e.data.length), i.prototype.push.call(this, { data: e.data, meta: { currentFile: this.currentFile, percent: r ? (t + 100 * (r - n - 1)) / r : 100 } }));
                        }),
                        (s.prototype.openedSource = function (e) {
                            (this.currentSourceOffset = this.bytesWritten), (this.currentFile = e.file.name);
                            var t = this.streamFiles && !e.file.dir;
                            if (t) {
                                var r = n(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                this.push({ data: r.fileRecord, meta: { percent: 0 } });
                            } else this.accumulate = !0;
                        }),
                        (s.prototype.closedSource = function (e) {
                            this.accumulate = !1;
                            var t = this.streamFiles && !e.file.dir,
                                r = n(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                            if ((this.dirRecords.push(r.dirRecord), t))
                                this.push({
                                    data: (function (e) {
                                        return R.DATA_DESCRIPTOR + A(e.crc32, 4) + A(e.compressedSize, 4) + A(e.uncompressedSize, 4);
                                    })(e),
                                    meta: { percent: 100 },
                                });
                            else for (this.push({ data: r.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
                            this.currentFile = null;
                        }),
                        (s.prototype.flush = function () {
                            for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({ data: this.dirRecords[t], meta: { percent: 100 } });
                            var r = this.bytesWritten - e,
                                n = (function (e, t, r, n, i) {
                                    var s = I.transformTo("string", i(n));
                                    return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e, 2) + A(e, 2) + A(t, 4) + A(r, 4) + A(s.length, 2) + s;
                                })(this.dirRecords.length, r, e, this.zipComment, this.encodeFileName);
                            this.push({ data: n, meta: { percent: 100 } });
                        }),
                        (s.prototype.prepareNextSource = function () {
                            (this.previous = this._sources.shift()), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
                        }),
                        (s.prototype.registerPrevious = function (e) {
                            this._sources.push(e);
                            var t = this;
                            return (
                                e.on("data", function (e) {
                                    t.processChunk(e);
                                }),
                                e.on("end", function () {
                                    t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
                                }),
                                e.on("error", function (e) {
                                    t.error(e);
                                }),
                                this
                            );
                        }),
                        (s.prototype.resume = function () {
                            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
                        }),
                        (s.prototype.error = function (e) {
                            var t = this._sources;
                            if (!i.prototype.error.call(this, e)) return !1;
                            for (var r = 0; r < t.length; r++)
                                try {
                                    t[r].error(e);
                                } catch (e) {}
                            return !0;
                        }),
                        (s.prototype.lock = function () {
                            i.prototype.lock.call(this);
                            for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
                        }),
                        (t.exports = s);
                },
                { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 },
            ],
            9: [
                function (e, t, r) {
                    "use strict";
                    var u = e("../compressions"),
                        n = e("./ZipFileWorker");
                    r.generateWorker = function (e, a, t) {
                        var o = new n(a.streamFiles, t, a.platform, a.encodeFileName),
                            h = 0;
                        try {
                            e.forEach(function (e, t) {
                                h++;
                                var r = (function (e, t) {
                                        var r = e || t,
                                            n = u[r];
                                        if (!n) throw new Error(r + " is not a valid compression method !");
                                        return n;
                                    })(t.options.compression, a.compression),
                                    n = t.options.compressionOptions || a.compressionOptions || {},
                                    i = t.dir,
                                    s = t.date;
                                t._compressWorker(r, n)
                                    .withStreamInfo("file", { name: e, dir: i, date: s, comment: t.comment || "", unixPermissions: t.unixPermissions, dosPermissions: t.dosPermissions })
                                    .pipe(o);
                            }),
                                (o.entriesCount = h);
                        } catch (e) {
                            o.error(e);
                        }
                        return o;
                    };
                },
                { "../compressions": 3, "./ZipFileWorker": 8 },
            ],
            10: [
                function (e, t, r) {
                    "use strict";
                    function n() {
                        if (!(this instanceof n)) return new n();
                        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                        (this.files = Object.create(null)),
                            (this.comment = null),
                            (this.root = ""),
                            (this.clone = function () {
                                var e = new n();
                                for (var t in this) "function" != typeof this[t] && (e[t] = this[t]);
                                return e;
                            });
                    }
                    ((n.prototype = e("./object")).loadAsync = e("./load")),
                        (n.support = e("./support")),
                        (n.defaults = e("./defaults")),
                        (n.version = "3.10.1"),
                        (n.loadAsync = function (e, t) {
                            return new n().loadAsync(e, t);
                        }),
                        (n.external = e("./external")),
                        (t.exports = n);
                },
                { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 },
            ],
            11: [
                function (e, t, r) {
                    "use strict";
                    var u = e("./utils"),
                        i = e("./external"),
                        n = e("./utf8"),
                        s = e("./zipEntries"),
                        a = e("./stream/Crc32Probe"),
                        l = e("./nodejsUtils");
                    function f(n) {
                        return new i.Promise(function (e, t) {
                            var r = n.decompressed.getContentWorker().pipe(new a());
                            r.on("error", function (e) {
                                t(e);
                            })
                                .on("end", function () {
                                    r.streamInfo.crc32 !== n.decompressed.crc32 ? t(new Error("Corrupted zip : CRC32 mismatch")) : e();
                                })
                                .resume();
                        });
                    }
                    t.exports = function (e, o) {
                        var h = this;
                        return (
                            (o = u.extend(o || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: n.utf8decode })),
                            l.isNode && l.isStream(e)
                                ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."))
                                : u
                                      .prepareContent("the loaded zip file", e, !0, o.optimizedBinaryString, o.base64)
                                      .then(function (e) {
                                          var t = new s(o);
                                          return t.load(e), t;
                                      })
                                      .then(function (e) {
                                          var t = [i.Promise.resolve(e)],
                                              r = e.files;
                                          if (o.checkCRC32) for (var n = 0; n < r.length; n++) t.push(f(r[n]));
                                          return i.Promise.all(t);
                                      })
                                      .then(function (e) {
                                          for (var t = e.shift(), r = t.files, n = 0; n < r.length; n++) {
                                              var i = r[n],
                                                  s = i.fileNameStr,
                                                  a = u.resolve(i.fileNameStr);
                                              h.file(a, i.decompressed, { binary: !0, optimizedBinaryString: !0, date: i.date, dir: i.dir, comment: i.fileCommentStr.length ? i.fileCommentStr : null, unixPermissions: i.unixPermissions, dosPermissions: i.dosPermissions, createFolders: o.createFolders }), i.dir || (h.file(a).unsafeOriginalName = s);
                                          }
                                          return t.zipComment.length && (h.comment = t.zipComment), h;
                                      })
                        );
                    };
                },
                { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 },
            ],
            12: [
                function (e, t, r) {
                    "use strict";
                    var n = e("../utils"),
                        i = e("../stream/GenericWorker");
                    function s(e, t) {
                        i.call(this, "Nodejs stream input adapter for " + e), (this._upstreamEnded = !1), this._bindStream(t);
                    }
                    n.inherits(s, i),
                        (s.prototype._bindStream = function (e) {
                            var t = this;
                            (this._stream = e).pause(),
                                e
                                    .on("data", function (e) {
                                        t.push({ data: e, meta: { percent: 0 } });
                                    })
                                    .on("error", function (e) {
                                        t.isPaused ? (this.generatedError = e) : t.error(e);
                                    })
                                    .on("end", function () {
                                        t.isPaused ? (t._upstreamEnded = !0) : t.end();
                                    });
                        }),
                        (s.prototype.pause = function () {
                            return !!i.prototype.pause.call(this) && (this._stream.pause(), !0);
                        }),
                        (s.prototype.resume = function () {
                            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
                        }),
                        (t.exports = s);
                },
                { "../stream/GenericWorker": 28, "../utils": 32 },
            ],
            13: [
                function (e, t, r) {
                    "use strict";
                    var i = e("readable-stream").Readable;
                    function n(e, t, r) {
                        i.call(this, t), (this._helper = e);
                        var n = this;
                        e.on("data", function (e, t) {
                            n.push(e) || n._helper.pause(), r && r(t);
                        })
                            .on("error", function (e) {
                                n.emit("error", e);
                            })
                            .on("end", function () {
                                n.push(null);
                            });
                    }
                    e("../utils").inherits(n, i),
                        (n.prototype._read = function () {
                            this._helper.resume();
                        }),
                        (t.exports = n);
                },
                { "../utils": 32, "readable-stream": 16 },
            ],
            14: [
                function (e, t, r) {
                    "use strict";
                    t.exports = {
                        isNode: "undefined" != typeof Buffer,
                        newBufferFrom: function (e, t) {
                            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
                            if ("number" == typeof e) throw new Error('The "data" argument must not be a number');
                            return new Buffer(e, t);
                        },
                        allocBuffer: function (e) {
                            if (Buffer.alloc) return Buffer.alloc(e);
                            var t = new Buffer(e);
                            return t.fill(0), t;
                        },
                        isBuffer: function (e) {
                            return Buffer.isBuffer(e);
                        },
                        isStream: function (e) {
                            return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume;
                        },
                    };
                },
                {},
            ],
            15: [
                function (e, t, r) {
                    "use strict";
                    function s(e, t, r) {
                        var n,
                            i = u.getTypeOf(t),
                            s = u.extend(r || {}, f);
                        (s.date = s.date || new Date()),
                            null !== s.compression && (s.compression = s.compression.toUpperCase()),
                            "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)),
                            s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0),
                            s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0),
                            s.dir && (e = g(e)),
                            s.createFolders && (n = _(e)) && b.call(this, n, !0);
                        var a = "string" === i && !1 === s.binary && !1 === s.base64;
                        (r && void 0 !== r.binary) || (s.binary = !a), ((t instanceof c && 0 === t.uncompressedSize) || s.dir || !t || 0 === t.length) && ((s.base64 = !1), (s.binary = !0), (t = ""), (s.compression = "STORE"), (i = "string"));
                        var o = null;
                        o = t instanceof c || t instanceof l ? t : p.isNode && p.isStream(t) ? new m(e, t) : u.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
                        var h = new d(e, o, s);
                        this.files[e] = h;
                    }
                    var i = e("./utf8"),
                        u = e("./utils"),
                        l = e("./stream/GenericWorker"),
                        a = e("./stream/StreamHelper"),
                        f = e("./defaults"),
                        c = e("./compressedObject"),
                        d = e("./zipObject"),
                        o = e("./generate"),
                        p = e("./nodejsUtils"),
                        m = e("./nodejs/NodejsStreamInputAdapter"),
                        _ = function (e) {
                            "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
                            var t = e.lastIndexOf("/");
                            return 0 < t ? e.substring(0, t) : "";
                        },
                        g = function (e) {
                            return "/" !== e.slice(-1) && (e += "/"), e;
                        },
                        b = function (e, t) {
                            return (t = void 0 !== t ? t : f.createFolders), (e = g(e)), this.files[e] || s.call(this, e, null, { dir: !0, createFolders: t }), this.files[e];
                        };
                    function h(e) {
                        return "[object RegExp]" === Object.prototype.toString.call(e);
                    }
                    var n = {
                        load: function () {
                            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                        },
                        forEach: function (e) {
                            var t, r, n;
                            for (t in this.files) (n = this.files[t]), (r = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(r, n);
                        },
                        filter: function (r) {
                            var n = [];
                            return (
                                this.forEach(function (e, t) {
                                    r(e, t) && n.push(t);
                                }),
                                n
                            );
                        },
                        file: function (e, t, r) {
                            if (1 !== arguments.length) return (e = this.root + e), s.call(this, e, t, r), this;
                            if (h(e)) {
                                var n = e;
                                return this.filter(function (e, t) {
                                    return !t.dir && n.test(e);
                                });
                            }
                            var i = this.files[this.root + e];
                            return i && !i.dir ? i : null;
                        },
                        folder: function (r) {
                            if (!r) return this;
                            if (h(r))
                                return this.filter(function (e, t) {
                                    return t.dir && r.test(e);
                                });
                            var e = this.root + r,
                                t = b.call(this, e),
                                n = this.clone();
                            return (n.root = t.name), n;
                        },
                        remove: function (r) {
                            r = this.root + r;
                            var e = this.files[r];
                            if ((e || ("/" !== r.slice(-1) && (r += "/"), (e = this.files[r])), e && !e.dir)) delete this.files[r];
                            else
                                for (
                                    var t = this.filter(function (e, t) {
                                            return t.name.slice(0, r.length) === r;
                                        }),
                                        n = 0;
                                    n < t.length;
                                    n++
                                )
                                    delete this.files[t[n].name];
                            return this;
                        },
                        generate: function () {
                            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                        },
                        generateInternalStream: function (e) {
                            var t,
                                r = {};
                            try {
                                if ((((r = u.extend(e || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r.type.toLowerCase()), (r.compression = r.compression.toUpperCase()), "binarystring" === r.type && (r.type = "string"), !r.type))
                                    throw new Error("No output type specified.");
                                u.checkSupport(r.type), ("darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform) || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
                                var n = r.comment || this.comment || "";
                                t = o.generateWorker(this, r, n);
                            } catch (e) {
                                (t = new l("error")).error(e);
                            }
                            return new a(t, r.type || "string", r.mimeType);
                        },
                        generateAsync: function (e, t) {
                            return this.generateInternalStream(e).accumulate(t);
                        },
                        generateNodeStream: function (e, t) {
                            return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
                        },
                    };
                    t.exports = n;
                },
                { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 },
            ],
            16: [
                function (e, t, r) {
                    "use strict";
                    t.exports = e("stream");
                },
                { stream: void 0 },
            ],
            17: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./DataReader");
                    function i(e) {
                        n.call(this, e);
                        for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
                    }
                    e("../utils").inherits(i, n),
                        (i.prototype.byteAt = function (e) {
                            return this.data[this.zero + e];
                        }),
                        (i.prototype.lastIndexOfSignature = function (e) {
                            for (var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t && this.data[s + 1] === r && this.data[s + 2] === n && this.data[s + 3] === i) return s - this.zero;
                            return -1;
                        }),
                        (i.prototype.readAndCheckSignature = function (e) {
                            var t = e.charCodeAt(0),
                                r = e.charCodeAt(1),
                                n = e.charCodeAt(2),
                                i = e.charCodeAt(3),
                                s = this.readData(4);
                            return t === s[0] && r === s[1] && n === s[2] && i === s[3];
                        }),
                        (i.prototype.readData = function (e) {
                            if ((this.checkOffset(e), 0 === e)) return [];
                            var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                            return (this.index += e), t;
                        }),
                        (t.exports = i);
                },
                { "../utils": 32, "./DataReader": 18 },
            ],
            18: [
                function (e, t, r) {
                    "use strict";
                    var n = e("../utils");
                    function i(e) {
                        (this.data = e), (this.length = e.length), (this.index = 0), (this.zero = 0);
                    }
                    (i.prototype = {
                        checkOffset: function (e) {
                            this.checkIndex(this.index + e);
                        },
                        checkIndex: function (e) {
                            if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
                        },
                        setIndex: function (e) {
                            this.checkIndex(e), (this.index = e);
                        },
                        skip: function (e) {
                            this.setIndex(this.index + e);
                        },
                        byteAt: function () {},
                        readInt: function (e) {
                            var t,
                                r = 0;
                            for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) r = (r << 8) + this.byteAt(t);
                            return (this.index += e), r;
                        },
                        readString: function (e) {
                            return n.transformTo("string", this.readData(e));
                        },
                        readData: function () {},
                        lastIndexOfSignature: function () {},
                        readAndCheckSignature: function () {},
                        readDate: function () {
                            var e = this.readInt(4);
                            return new Date(Date.UTC(1980 + ((e >> 25) & 127), ((e >> 21) & 15) - 1, (e >> 16) & 31, (e >> 11) & 31, (e >> 5) & 63, (31 & e) << 1));
                        },
                    }),
                        (t.exports = i);
                },
                { "../utils": 32 },
            ],
            19: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./Uint8ArrayReader");
                    function i(e) {
                        n.call(this, e);
                    }
                    e("../utils").inherits(i, n),
                        (i.prototype.readData = function (e) {
                            this.checkOffset(e);
                            var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                            return (this.index += e), t;
                        }),
                        (t.exports = i);
                },
                { "../utils": 32, "./Uint8ArrayReader": 21 },
            ],
            20: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./DataReader");
                    function i(e) {
                        n.call(this, e);
                    }
                    e("../utils").inherits(i, n),
                        (i.prototype.byteAt = function (e) {
                            return this.data.charCodeAt(this.zero + e);
                        }),
                        (i.prototype.lastIndexOfSignature = function (e) {
                            return this.data.lastIndexOf(e) - this.zero;
                        }),
                        (i.prototype.readAndCheckSignature = function (e) {
                            return e === this.readData(4);
                        }),
                        (i.prototype.readData = function (e) {
                            this.checkOffset(e);
                            var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                            return (this.index += e), t;
                        }),
                        (t.exports = i);
                },
                { "../utils": 32, "./DataReader": 18 },
            ],
            21: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./ArrayReader");
                    function i(e) {
                        n.call(this, e);
                    }
                    e("../utils").inherits(i, n),
                        (i.prototype.readData = function (e) {
                            if ((this.checkOffset(e), 0 === e)) return new Uint8Array(0);
                            var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
                            return (this.index += e), t;
                        }),
                        (t.exports = i);
                },
                { "../utils": 32, "./ArrayReader": 17 },
            ],
            22: [
                function (e, t, r) {
                    "use strict";
                    var n = e("../utils"),
                        i = e("../support"),
                        s = e("./ArrayReader"),
                        a = e("./StringReader"),
                        o = e("./NodeBufferReader"),
                        h = e("./Uint8ArrayReader");
                    t.exports = function (e) {
                        var t = n.getTypeOf(e);
                        return n.checkSupport(t), "string" !== t || i.uint8array ? ("nodebuffer" === t ? new o(e) : i.uint8array ? new h(n.transformTo("uint8array", e)) : new s(n.transformTo("array", e))) : new a(e);
                    };
                },
                { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 },
            ],
            23: [
                function (e, t, r) {
                    "use strict";
                    (r.LOCAL_FILE_HEADER = "PK"), (r.CENTRAL_FILE_HEADER = "PK"), (r.CENTRAL_DIRECTORY_END = "PK"), (r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK"), (r.ZIP64_CENTRAL_DIRECTORY_END = "PK"), (r.DATA_DESCRIPTOR = "PK\b");
                },
                {},
            ],
            24: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./GenericWorker"),
                        i = e("../utils");
                    function s(e) {
                        n.call(this, "ConvertWorker to " + e), (this.destType = e);
                    }
                    i.inherits(s, n),
                        (s.prototype.processChunk = function (e) {
                            this.push({ data: i.transformTo(this.destType, e.data), meta: e.meta });
                        }),
                        (t.exports = s);
                },
                { "../utils": 32, "./GenericWorker": 28 },
            ],
            25: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./GenericWorker"),
                        i = e("../crc32");
                    function s() {
                        n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
                    }
                    e("../utils").inherits(s, n),
                        (s.prototype.processChunk = function (e) {
                            (this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0)), this.push(e);
                        }),
                        (t.exports = s);
                },
                { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 },
            ],
            26: [
                function (e, t, r) {
                    "use strict";
                    var n = e("../utils"),
                        i = e("./GenericWorker");
                    function s(e) {
                        i.call(this, "DataLengthProbe for " + e), (this.propName = e), this.withStreamInfo(e, 0);
                    }
                    n.inherits(s, i),
                        (s.prototype.processChunk = function (e) {
                            if (e) {
                                var t = this.streamInfo[this.propName] || 0;
                                this.streamInfo[this.propName] = t + e.data.length;
                            }
                            i.prototype.processChunk.call(this, e);
                        }),
                        (t.exports = s);
                },
                { "../utils": 32, "./GenericWorker": 28 },
            ],
            27: [
                function (e, t, r) {
                    "use strict";
                    var n = e("../utils"),
                        i = e("./GenericWorker");
                    function s(e) {
                        i.call(this, "DataWorker");
                        var t = this;
                        (this.dataIsReady = !1),
                            (this.index = 0),
                            (this.max = 0),
                            (this.data = null),
                            (this.type = ""),
                            (this._tickScheduled = !1),
                            e.then(
                                function (e) {
                                    (t.dataIsReady = !0), (t.data = e), (t.max = (e && e.length) || 0), (t.type = n.getTypeOf(e)), t.isPaused || t._tickAndRepeat();
                                },
                                function (e) {
                                    t.error(e);
                                }
                            );
                    }
                    n.inherits(s, i),
                        (s.prototype.cleanUp = function () {
                            i.prototype.cleanUp.call(this), (this.data = null);
                        }),
                        (s.prototype.resume = function () {
                            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && ((this._tickScheduled = !0), n.delay(this._tickAndRepeat, [], this)), !0);
                        }),
                        (s.prototype._tickAndRepeat = function () {
                            (this._tickScheduled = !1), this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), (this._tickScheduled = !0)));
                        }),
                        (s.prototype._tick = function () {
                            if (this.isPaused || this.isFinished) return !1;
                            var e = null,
                                t = Math.min(this.max, this.index + 16384);
                            if (this.index >= this.max) return this.end();
                            switch (this.type) {
                                case "string":
                                    e = this.data.substring(this.index, t);
                                    break;
                                case "uint8array":
                                    e = this.data.subarray(this.index, t);
                                    break;
                                case "array":
                                case "nodebuffer":
                                    e = this.data.slice(this.index, t);
                            }
                            return (this.index = t), this.push({ data: e, meta: { percent: this.max ? (this.index / this.max) * 100 : 0 } });
                        }),
                        (t.exports = s);
                },
                { "../utils": 32, "./GenericWorker": 28 },
            ],
            28: [
                function (e, t, r) {
                    "use strict";
                    function n(e) {
                        (this.name = e || "default"), (this.streamInfo = {}), (this.generatedError = null), (this.extraStreamInfo = {}), (this.isPaused = !0), (this.isFinished = !1), (this.isLocked = !1), (this._listeners = { data: [], end: [], error: [] }), (this.previous = null);
                    }
                    (n.prototype = {
                        push: function (e) {
                            this.emit("data", e);
                        },
                        end: function () {
                            if (this.isFinished) return !1;
                            this.flush();
                            try {
                                this.emit("end"), this.cleanUp(), (this.isFinished = !0);
                            } catch (e) {
                                this.emit("error", e);
                            }
                            return !0;
                        },
                        error: function (e) {
                            return !this.isFinished && (this.isPaused ? (this.generatedError = e) : ((this.isFinished = !0), this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
                        },
                        on: function (e, t) {
                            return this._listeners[e].push(t), this;
                        },
                        cleanUp: function () {
                            (this.streamInfo = this.generatedError = this.extraStreamInfo = null), (this._listeners = []);
                        },
                        emit: function (e, t) {
                            if (this._listeners[e]) for (var r = 0; r < this._listeners[e].length; r++) this._listeners[e][r].call(this, t);
                        },
                        pipe: function (e) {
                            return e.registerPrevious(this);
                        },
                        registerPrevious: function (e) {
                            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                            (this.streamInfo = e.streamInfo), this.mergeStreamInfo(), (this.previous = e);
                            var t = this;
                            return (
                                e.on("data", function (e) {
                                    t.processChunk(e);
                                }),
                                e.on("end", function () {
                                    t.end();
                                }),
                                e.on("error", function (e) {
                                    t.error(e);
                                }),
                                this
                            );
                        },
                        pause: function () {
                            return !this.isPaused && !this.isFinished && ((this.isPaused = !0), this.previous && this.previous.pause(), !0);
                        },
                        resume: function () {
                            if (!this.isPaused || this.isFinished) return !1;
                            var e = (this.isPaused = !1);
                            return this.generatedError && (this.error(this.generatedError), (e = !0)), this.previous && this.previous.resume(), !e;
                        },
                        flush: function () {},
                        processChunk: function (e) {
                            this.push(e);
                        },
                        withStreamInfo: function (e, t) {
                            return (this.extraStreamInfo[e] = t), this.mergeStreamInfo(), this;
                        },
                        mergeStreamInfo: function () {
                            for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
                        },
                        lock: function () {
                            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                            (this.isLocked = !0), this.previous && this.previous.lock();
                        },
                        toString: function () {
                            var e = "Worker " + this.name;
                            return this.previous ? this.previous + " -> " + e : e;
                        },
                    }),
                        (t.exports = n);
                },
                {},
            ],
            29: [
                function (e, t, r) {
                    "use strict";
                    var h = e("../utils"),
                        i = e("./ConvertWorker"),
                        s = e("./GenericWorker"),
                        u = e("../base64"),
                        n = e("../support"),
                        a = e("../external"),
                        o = null;
                    if (n.nodestream)
                        try {
                            o = e("../nodejs/NodejsStreamOutputAdapter");
                        } catch (e) {}
                    function l(e, o) {
                        return new a.Promise(function (t, r) {
                            var n = [],
                                i = e._internalType,
                                s = e._outputType,
                                a = e._mimeType;
                            e.on("data", function (e, t) {
                                n.push(e), o && o(t);
                            })
                                .on("error", function (e) {
                                    (n = []), r(e);
                                })
                                .on("end", function () {
                                    try {
                                        var e = (function (e, t, r) {
                                            switch (e) {
                                                case "blob":
                                                    return h.newBlob(h.transformTo("arraybuffer", t), r);
                                                case "base64":
                                                    return u.encode(t);
                                                default:
                                                    return h.transformTo(e, t);
                                            }
                                        })(
                                            s,
                                            (function (e, t) {
                                                var r,
                                                    n = 0,
                                                    i = null,
                                                    s = 0;
                                                for (r = 0; r < t.length; r++) s += t[r].length;
                                                switch (e) {
                                                    case "string":
                                                        return t.join("");
                                                    case "array":
                                                        return Array.prototype.concat.apply([], t);
                                                    case "uint8array":
                                                        for (i = new Uint8Array(s), r = 0; r < t.length; r++) i.set(t[r], n), (n += t[r].length);
                                                        return i;
                                                    case "nodebuffer":
                                                        return Buffer.concat(t);
                                                    default:
                                                        throw new Error("concat : unsupported type '" + e + "'");
                                                }
                                            })(i, n),
                                            a
                                        );
                                        t(e);
                                    } catch (e) {
                                        r(e);
                                    }
                                    n = [];
                                })
                                .resume();
                        });
                    }
                    function f(e, t, r) {
                        var n = t;
                        switch (t) {
                            case "blob":
                            case "arraybuffer":
                                n = "uint8array";
                                break;
                            case "base64":
                                n = "string";
                        }
                        try {
                            (this._internalType = n), (this._outputType = t), (this._mimeType = r), h.checkSupport(n), (this._worker = e.pipe(new i(n))), e.lock();
                        } catch (e) {
                            (this._worker = new s("error")), this._worker.error(e);
                        }
                    }
                    (f.prototype = {
                        accumulate: function (e) {
                            return l(this, e);
                        },
                        on: function (e, t) {
                            var r = this;
                            return (
                                "data" === e
                                    ? this._worker.on(e, function (e) {
                                          t.call(r, e.data, e.meta);
                                      })
                                    : this._worker.on(e, function () {
                                          h.delay(t, arguments, r);
                                      }),
                                this
                            );
                        },
                        resume: function () {
                            return h.delay(this._worker.resume, [], this._worker), this;
                        },
                        pause: function () {
                            return this._worker.pause(), this;
                        },
                        toNodejsStream: function (e) {
                            if ((h.checkSupport("nodestream"), "nodebuffer" !== this._outputType)) throw new Error(this._outputType + " is not supported by this method");
                            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e);
                        },
                    }),
                        (t.exports = f);
                },
                { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 },
            ],
            30: [
                function (e, t, r) {
                    "use strict";
                    if (((r.base64 = !0), (r.array = !0), (r.string = !0), (r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array), (r.nodebuffer = "undefined" != typeof Buffer), (r.uint8array = "undefined" != typeof Uint8Array), "undefined" == typeof ArrayBuffer)) r.blob = !1;
                    else {
                        var n = new ArrayBuffer(0);
                        try {
                            r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
                        } catch (e) {
                            try {
                                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                i.append(n), (r.blob = 0 === i.getBlob("application/zip").size);
                            } catch (e) {
                                r.blob = !1;
                            }
                        }
                    }
                    try {
                        r.nodestream = !!e("readable-stream").Readable;
                    } catch (e) {
                        r.nodestream = !1;
                    }
                },
                { "readable-stream": 16 },
            ],
            31: [
                function (e, t, s) {
                    "use strict";
                    for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
                    u[254] = u[254] = 1;
                    function a() {
                        n.call(this, "utf-8 decode"), (this.leftOver = null);
                    }
                    function l() {
                        n.call(this, "utf-8 encode");
                    }
                    (s.utf8encode = function (e) {
                        return h.nodebuffer
                            ? r.newBufferFrom(e, "utf-8")
                            : (function (e) {
                                  var t,
                                      r,
                                      n,
                                      i,
                                      s,
                                      a = e.length,
                                      o = 0;
                                  for (i = 0; i < a; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), i++), (o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
                                  for (t = h.uint8array ? new Uint8Array(o) : new Array(o), i = s = 0; s < o; i++)
                                      55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), i++),
                                          r < 128 ? (t[s++] = r) : (r < 2048 ? (t[s++] = 192 | (r >>> 6)) : (r < 65536 ? (t[s++] = 224 | (r >>> 12)) : ((t[s++] = 240 | (r >>> 18)), (t[s++] = 128 | ((r >>> 12) & 63))), (t[s++] = 128 | ((r >>> 6) & 63))), (t[s++] = 128 | (63 & r)));
                                  return t;
                              })(e);
                    }),
                        (s.utf8decode = function (e) {
                            return h.nodebuffer
                                ? o.transformTo("nodebuffer", e).toString("utf-8")
                                : (function (e) {
                                      var t,
                                          r,
                                          n,
                                          i,
                                          s = e.length,
                                          a = new Array(2 * s);
                                      for (t = r = 0; t < s; )
                                          if ((n = e[t++]) < 128) a[r++] = n;
                                          else if (4 < (i = u[n])) (a[r++] = 65533), (t += i - 1);
                                          else {
                                              for (n &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && t < s; ) (n = (n << 6) | (63 & e[t++])), i--;
                                              1 < i ? (a[r++] = 65533) : n < 65536 ? (a[r++] = n) : ((n -= 65536), (a[r++] = 55296 | ((n >> 10) & 1023)), (a[r++] = 56320 | (1023 & n)));
                                          }
                                      return a.length !== r && (a.subarray ? (a = a.subarray(0, r)) : (a.length = r)), o.applyFromCharCode(a);
                                  })((e = o.transformTo(h.uint8array ? "uint8array" : "array", e)));
                        }),
                        o.inherits(a, n),
                        (a.prototype.processChunk = function (e) {
                            var t = o.transformTo(h.uint8array ? "uint8array" : "array", e.data);
                            if (this.leftOver && this.leftOver.length) {
                                if (h.uint8array) {
                                    var r = t;
                                    (t = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), t.set(r, this.leftOver.length);
                                } else t = this.leftOver.concat(t);
                                this.leftOver = null;
                            }
                            var n = (function (e, t) {
                                    var r;
                                    for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]); ) r--;
                                    return r < 0 ? t : 0 === r ? t : r + u[e[r]] > t ? r : t;
                                })(t),
                                i = t;
                            n !== t.length && (h.uint8array ? ((i = t.subarray(0, n)), (this.leftOver = t.subarray(n, t.length))) : ((i = t.slice(0, n)), (this.leftOver = t.slice(n, t.length)))), this.push({ data: s.utf8decode(i), meta: e.meta });
                        }),
                        (a.prototype.flush = function () {
                            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), (this.leftOver = null));
                        }),
                        (s.Utf8DecodeWorker = a),
                        o.inherits(l, n),
                        (l.prototype.processChunk = function (e) {
                            this.push({ data: s.utf8encode(e.data), meta: e.meta });
                        }),
                        (s.Utf8EncodeWorker = l);
                },
                { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 },
            ],
            32: [
                function (e, t, a) {
                    "use strict";
                    var o = e("./support"),
                        h = e("./base64"),
                        r = e("./nodejsUtils"),
                        u = e("./external");
                    function n(e) {
                        return e;
                    }
                    function l(e, t) {
                        for (var r = 0; r < e.length; ++r) t[r] = 255 & e.charCodeAt(r);
                        return t;
                    }
                    e("setimmediate"),
                        (a.newBlob = function (t, r) {
                            a.checkSupport("blob");
                            try {
                                return new Blob([t], { type: r });
                            } catch (e) {
                                try {
                                    var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                    return n.append(t), n.getBlob(r);
                                } catch (e) {
                                    throw new Error("Bug : can't construct the Blob.");
                                }
                            }
                        });
                    var i = {
                        stringifyByChunk: function (e, t, r) {
                            var n = [],
                                i = 0,
                                s = e.length;
                            if (s <= r) return String.fromCharCode.apply(null, e);
                            for (; i < s; ) "array" === t || "nodebuffer" === t ? n.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + r, s)))) : n.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + r, s)))), (i += r);
                            return n.join("");
                        },
                        stringifyByChar: function (e) {
                            for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
                            return t;
                        },
                        applyCanBeUsed: {
                            uint8array: (function () {
                                try {
                                    return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
                                } catch (e) {
                                    return !1;
                                }
                            })(),
                            nodebuffer: (function () {
                                try {
                                    return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
                                } catch (e) {
                                    return !1;
                                }
                            })(),
                        },
                    };
                    function s(e) {
                        var t = 65536,
                            r = a.getTypeOf(e),
                            n = !0;
                        if (("uint8array" === r ? (n = i.applyCanBeUsed.uint8array) : "nodebuffer" === r && (n = i.applyCanBeUsed.nodebuffer), n))
                            for (; 1 < t; )
                                try {
                                    return i.stringifyByChunk(e, r, t);
                                } catch (e) {
                                    t = Math.floor(t / 2);
                                }
                        return i.stringifyByChar(e);
                    }
                    function f(e, t) {
                        for (var r = 0; r < e.length; r++) t[r] = e[r];
                        return t;
                    }
                    a.applyFromCharCode = s;
                    var c = {};
                    (c.string = {
                        string: n,
                        array: function (e) {
                            return l(e, new Array(e.length));
                        },
                        arraybuffer: function (e) {
                            return c.string.uint8array(e).buffer;
                        },
                        uint8array: function (e) {
                            return l(e, new Uint8Array(e.length));
                        },
                        nodebuffer: function (e) {
                            return l(e, r.allocBuffer(e.length));
                        },
                    }),
                        (c.array = {
                            string: s,
                            array: n,
                            arraybuffer: function (e) {
                                return new Uint8Array(e).buffer;
                            },
                            uint8array: function (e) {
                                return new Uint8Array(e);
                            },
                            nodebuffer: function (e) {
                                return r.newBufferFrom(e);
                            },
                        }),
                        (c.arraybuffer = {
                            string: function (e) {
                                return s(new Uint8Array(e));
                            },
                            array: function (e) {
                                return f(new Uint8Array(e), new Array(e.byteLength));
                            },
                            arraybuffer: n,
                            uint8array: function (e) {
                                return new Uint8Array(e);
                            },
                            nodebuffer: function (e) {
                                return r.newBufferFrom(new Uint8Array(e));
                            },
                        }),
                        (c.uint8array = {
                            string: s,
                            array: function (e) {
                                return f(e, new Array(e.length));
                            },
                            arraybuffer: function (e) {
                                return e.buffer;
                            },
                            uint8array: n,
                            nodebuffer: function (e) {
                                return r.newBufferFrom(e);
                            },
                        }),
                        (c.nodebuffer = {
                            string: s,
                            array: function (e) {
                                return f(e, new Array(e.length));
                            },
                            arraybuffer: function (e) {
                                return c.nodebuffer.uint8array(e).buffer;
                            },
                            uint8array: function (e) {
                                return f(e, new Uint8Array(e.length));
                            },
                            nodebuffer: n,
                        }),
                        (a.transformTo = function (e, t) {
                            if (((t = t || ""), !e)) return t;
                            a.checkSupport(e);
                            var r = a.getTypeOf(t);
                            return c[r][e](t);
                        }),
                        (a.resolve = function (e) {
                            for (var t = e.split("/"), r = [], n = 0; n < t.length; n++) {
                                var i = t[n];
                                "." === i || ("" === i && 0 !== n && n !== t.length - 1) || (".." === i ? r.pop() : r.push(i));
                            }
                            return r.join("/");
                        }),
                        (a.getTypeOf = function (e) {
                            return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : o.nodebuffer && r.isBuffer(e) ? "nodebuffer" : o.uint8array && e instanceof Uint8Array ? "uint8array" : o.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
                        }),
                        (a.checkSupport = function (e) {
                            if (!o[e.toLowerCase()]) throw new Error(e + " is not supported by this platform");
                        }),
                        (a.MAX_VALUE_16BITS = 65535),
                        (a.MAX_VALUE_32BITS = -1),
                        (a.pretty = function (e) {
                            var t,
                                r,
                                n = "";
                            for (r = 0; r < (e || "").length; r++) n += "\\x" + ((t = e.charCodeAt(r)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
                            return n;
                        }),
                        (a.delay = function (e, t, r) {
                            setImmediate(function () {
                                e.apply(r || null, t || []);
                            });
                        }),
                        (a.inherits = function (e, t) {
                            function r() {}
                            (r.prototype = t.prototype), (e.prototype = new r());
                        }),
                        (a.extend = function () {
                            var e,
                                t,
                                r = {};
                            for (e = 0; e < arguments.length; e++) for (t in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], t) && void 0 === r[t] && (r[t] = arguments[e][t]);
                            return r;
                        }),
                        (a.prepareContent = function (r, e, n, i, s) {
                            return u.Promise.resolve(e)
                                .then(function (n) {
                                    return o.blob && (n instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n))) && "undefined" != typeof FileReader
                                        ? new u.Promise(function (t, r) {
                                              var e = new FileReader();
                                              (e.onload = function (e) {
                                                  t(e.target.result);
                                              }),
                                                  (e.onerror = function (e) {
                                                      r(e.target.error);
                                                  }),
                                                  e.readAsArrayBuffer(n);
                                          })
                                        : n;
                                })
                                .then(function (e) {
                                    var t = a.getTypeOf(e);
                                    return t
                                        ? ("arraybuffer" === t
                                              ? (e = a.transformTo("uint8array", e))
                                              : "string" === t &&
                                                (s
                                                    ? (e = h.decode(e))
                                                    : n &&
                                                      !0 !== i &&
                                                      (e = (function (e) {
                                                          return l(e, o.uint8array ? new Uint8Array(e.length) : new Array(e.length));
                                                      })(e))),
                                          e)
                                        : u.Promise.reject(new Error("Can't read the data of '" + r + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
                                });
                        });
                },
                { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 },
            ],
            33: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./reader/readerFor"),
                        i = e("./utils"),
                        s = e("./signature"),
                        a = e("./zipEntry"),
                        o = e("./support");
                    function h(e) {
                        (this.files = []), (this.loadOptions = e);
                    }
                    (h.prototype = {
                        checkSignature: function (e) {
                            if (!this.reader.readAndCheckSignature(e)) {
                                this.reader.index -= 4;
                                var t = this.reader.readString(4);
                                throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
                            }
                        },
                        isSignature: function (e, t) {
                            var r = this.reader.index;
                            this.reader.setIndex(e);
                            var n = this.reader.readString(4) === t;
                            return this.reader.setIndex(r), n;
                        },
                        readBlockEndOfCentral: function () {
                            (this.diskNumber = this.reader.readInt(2)), (this.diskWithCentralDirStart = this.reader.readInt(2)), (this.centralDirRecordsOnThisDisk = this.reader.readInt(2)), (this.centralDirRecords = this.reader.readInt(2)), (this.centralDirSize = this.reader.readInt(4)), (this.centralDirOffset = this.reader.readInt(4)), (this.zipCommentLength = this.reader.readInt(2));
                            var e = this.reader.readData(this.zipCommentLength),
                                t = o.uint8array ? "uint8array" : "array",
                                r = i.transformTo(t, e);
                            this.zipComment = this.loadOptions.decodeFileName(r);
                        },
                        readBlockZip64EndOfCentral: function () {
                            (this.zip64EndOfCentralSize = this.reader.readInt(8)),
                                this.reader.skip(4),
                                (this.diskNumber = this.reader.readInt(4)),
                                (this.diskWithCentralDirStart = this.reader.readInt(4)),
                                (this.centralDirRecordsOnThisDisk = this.reader.readInt(8)),
                                (this.centralDirRecords = this.reader.readInt(8)),
                                (this.centralDirSize = this.reader.readInt(8)),
                                (this.centralDirOffset = this.reader.readInt(8)),
                                (this.zip64ExtensibleData = {});
                            for (var e, t, r, n = this.zip64EndOfCentralSize - 44; 0 < n; ) (e = this.reader.readInt(2)), (t = this.reader.readInt(4)), (r = this.reader.readData(t)), (this.zip64ExtensibleData[e] = { id: e, length: t, value: r });
                        },
                        readBlockZip64EndOfCentralLocator: function () {
                            if (((this.diskWithZip64CentralDirStart = this.reader.readInt(4)), (this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8)), (this.disksCount = this.reader.readInt(4)), 1 < this.disksCount)) throw new Error("Multi-volumes zip are not supported");
                        },
                        readLocalFiles: function () {
                            var e, t;
                            for (e = 0; e < this.files.length; e++) (t = this.files[e]), this.reader.setIndex(t.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
                        },
                        readCentralDir: function () {
                            var e;
                            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
                            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                        },
                        readEndOfCentral: function () {
                            var e = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
                            if (e < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
                            this.reader.setIndex(e);
                            var t = e;
                            if (
                                (this.checkSignature(s.CENTRAL_DIRECTORY_END),
                                this.readBlockEndOfCentral(),
                                this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS)
                            ) {
                                if (((this.zip64 = !0), (e = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                                if (
                                    (this.reader.setIndex(e),
                                    this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                                    this.readBlockZip64EndOfCentralLocator(),
                                    !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && ((this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END)), this.relativeOffsetEndOfZip64CentralDir < 0))
                                )
                                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                                this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
                            }
                            var r = this.centralDirOffset + this.centralDirSize;
                            this.zip64 && ((r += 20), (r += 12 + this.zip64EndOfCentralSize));
                            var n = t - r;
                            if (0 < n) this.isSignature(t, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n);
                            else if (n < 0) throw new Error("Corrupted zip: missing " + Math.abs(n) + " bytes.");
                        },
                        prepareReader: function (e) {
                            this.reader = n(e);
                        },
                        load: function (e) {
                            this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
                        },
                    }),
                        (t.exports = h);
                },
                { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 },
            ],
            34: [
                function (e, t, r) {
                    "use strict";
                    var n = e("./reader/readerFor"),
                        s = e("./utils"),
                        i = e("./compressedObject"),
                        a = e("./crc32"),
                        o = e("./utf8"),
                        h = e("./compressions"),
                        u = e("./support");
                    function l(e, t) {
                        (this.options = e), (this.loadOptions = t);
                    }
                    (l.prototype = {
                        isEncrypted: function () {
                            return 1 == (1 & this.bitFlag);
                        },
                        useUTF8: function () {
                            return 2048 == (2048 & this.bitFlag);
                        },
                        readLocalPart: function (e) {
                            var t, r;
                            if ((e.skip(22), (this.fileNameLength = e.readInt(2)), (r = e.readInt(2)), (this.fileName = e.readData(this.fileNameLength)), e.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize)) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                            if (
                                null ===
                                (t = (function (e) {
                                    for (var t in h) if (Object.prototype.hasOwnProperty.call(h, t) && h[t].magic === e) return h[t];
                                    return null;
                                })(this.compressionMethod))
                            )
                                throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
                            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
                        },
                        readCentralPart: function (e) {
                            (this.versionMadeBy = e.readInt(2)), e.skip(2), (this.bitFlag = e.readInt(2)), (this.compressionMethod = e.readString(2)), (this.date = e.readDate()), (this.crc32 = e.readInt(4)), (this.compressedSize = e.readInt(4)), (this.uncompressedSize = e.readInt(4));
                            var t = e.readInt(2);
                            if (((this.extraFieldsLength = e.readInt(2)), (this.fileCommentLength = e.readInt(2)), (this.diskNumberStart = e.readInt(2)), (this.internalFileAttributes = e.readInt(2)), (this.externalFileAttributes = e.readInt(4)), (this.localHeaderOffset = e.readInt(4)), this.isEncrypted())) throw new Error("Encrypted zip are not supported");
                            e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), (this.fileComment = e.readData(this.fileCommentLength));
                        },
                        processAttributes: function () {
                            (this.unixPermissions = null), (this.dosPermissions = null);
                            var e = this.versionMadeBy >> 8;
                            (this.dir = !!(16 & this.externalFileAttributes)), 0 == e && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e && (this.unixPermissions = (this.externalFileAttributes >> 16) & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0);
                        },
                        parseZIP64ExtraField: function () {
                            if (this.extraFields[1]) {
                                var e = n(this.extraFields[1].value);
                                this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
                            }
                        },
                        readExtraFields: function (e) {
                            var t,
                                r,
                                n,
                                i = e.index + this.extraFieldsLength;
                            for (this.extraFields || (this.extraFields = {}); e.index + 4 < i; ) (t = e.readInt(2)), (r = e.readInt(2)), (n = e.readData(r)), (this.extraFields[t] = { id: t, length: r, value: n });
                            e.setIndex(i);
                        },
                        handleUTF8: function () {
                            var e = u.uint8array ? "uint8array" : "array";
                            if (this.useUTF8()) (this.fileNameStr = o.utf8decode(this.fileName)), (this.fileCommentStr = o.utf8decode(this.fileComment));
                            else {
                                var t = this.findExtraFieldUnicodePath();
                                if (null !== t) this.fileNameStr = t;
                                else {
                                    var r = s.transformTo(e, this.fileName);
                                    this.fileNameStr = this.loadOptions.decodeFileName(r);
                                }
                                var n = this.findExtraFieldUnicodeComment();
                                if (null !== n) this.fileCommentStr = n;
                                else {
                                    var i = s.transformTo(e, this.fileComment);
                                    this.fileCommentStr = this.loadOptions.decodeFileName(i);
                                }
                            }
                        },
                        findExtraFieldUnicodePath: function () {
                            var e = this.extraFields[28789];
                            if (e) {
                                var t = n(e.value);
                                return 1 !== t.readInt(1) ? null : a(this.fileName) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5));
                            }
                            return null;
                        },
                        findExtraFieldUnicodeComment: function () {
                            var e = this.extraFields[25461];
                            if (e) {
                                var t = n(e.value);
                                return 1 !== t.readInt(1) ? null : a(this.fileComment) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5));
                            }
                            return null;
                        },
                    }),
                        (t.exports = l);
                },
                { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 },
            ],
            35: [
                function (e, t, r) {
                    "use strict";
                    function n(e, t, r) {
                        (this.name = e), (this.dir = r.dir), (this.date = r.date), (this.comment = r.comment), (this.unixPermissions = r.unixPermissions), (this.dosPermissions = r.dosPermissions), (this._data = t), (this._dataBinary = r.binary), (this.options = { compression: r.compression, compressionOptions: r.compressionOptions });
                    }
                    var s = e("./stream/StreamHelper"),
                        i = e("./stream/DataWorker"),
                        a = e("./utf8"),
                        o = e("./compressedObject"),
                        h = e("./stream/GenericWorker");
                    n.prototype = {
                        internalStream: function (e) {
                            var t = null,
                                r = "string";
                            try {
                                if (!e) throw new Error("No output type specified.");
                                var n = "string" === (r = e.toLowerCase()) || "text" === r;
                                ("binarystring" !== r && "text" !== r) || (r = "string"), (t = this._decompressWorker());
                                var i = !this._dataBinary;
                                i && !n && (t = t.pipe(new a.Utf8EncodeWorker())), !i && n && (t = t.pipe(new a.Utf8DecodeWorker()));
                            } catch (e) {
                                (t = new h("error")).error(e);
                            }
                            return new s(t, r, "");
                        },
                        async: function (e, t) {
                            return this.internalStream(e).accumulate(t);
                        },
                        nodeStream: function (e, t) {
                            return this.internalStream(e || "nodebuffer").toNodejsStream(t);
                        },
                        _compressWorker: function (e, t) {
                            if (this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
                            var r = this._decompressWorker();
                            return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r, e, t);
                        },
                        _decompressWorker: function () {
                            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
                        },
                    };
                    for (
                        var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"],
                            l = function () {
                                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                            },
                            f = 0;
                        f < u.length;
                        f++
                    )
                        n.prototype[u[f]] = l;
                    t.exports = n;
                },
                { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 },
            ],
            36: [
                function (e, l, t) {
                    (function (t) {
                        "use strict";
                        var r,
                            n,
                            e = t.MutationObserver || t.WebKitMutationObserver;
                        if (e) {
                            var i = 0,
                                s = new e(u),
                                a = t.document.createTextNode("");
                            s.observe(a, { characterData: !0 }),
                                (r = function () {
                                    a.data = i = ++i % 2;
                                });
                        } else if (t.setImmediate || void 0 === t.MessageChannel)
                            r =
                                "document" in t && "onreadystatechange" in t.document.createElement("script")
                                    ? function () {
                                          var e = t.document.createElement("script");
                                          (e.onreadystatechange = function () {
                                              u(), (e.onreadystatechange = null), e.parentNode.removeChild(e), (e = null);
                                          }),
                                              t.document.documentElement.appendChild(e);
                                      }
                                    : function () {
                                          setTimeout(u, 0);
                                      };
                        else {
                            var o = new t.MessageChannel();
                            (o.port1.onmessage = u),
                                (r = function () {
                                    o.port2.postMessage(0);
                                });
                        }
                        var h = [];
                        function u() {
                            var e, t;
                            n = !0;
                            for (var r = h.length; r; ) {
                                for (t = h, h = [], e = -1; ++e < r; ) t[e]();
                                r = h.length;
                            }
                            n = !1;
                        }
                        l.exports = function (e) {
                            1 !== h.push(e) || n || r();
                        };
                    }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
                },
                {},
            ],
            37: [
                function (e, t, r) {
                    "use strict";
                    var i = e("immediate");
                    function u() {}
                    var l = {},
                        s = ["REJECTED"],
                        a = ["FULFILLED"],
                        n = ["PENDING"];
                    function o(e) {
                        if ("function" != typeof e) throw new TypeError("resolver must be a function");
                        (this.state = n), (this.queue = []), (this.outcome = void 0), e !== u && d(this, e);
                    }
                    function h(e, t, r) {
                        (this.promise = e), "function" == typeof t && ((this.onFulfilled = t), (this.callFulfilled = this.otherCallFulfilled)), "function" == typeof r && ((this.onRejected = r), (this.callRejected = this.otherCallRejected));
                    }
                    function f(t, r, n) {
                        i(function () {
                            var e;
                            try {
                                e = r(n);
                            } catch (e) {
                                return l.reject(t, e);
                            }
                            e === t ? l.reject(t, new TypeError("Cannot resolve promise with itself")) : l.resolve(t, e);
                        });
                    }
                    function c(e) {
                        var t = e && e.then;
                        if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t)
                            return function () {
                                t.apply(e, arguments);
                            };
                    }
                    function d(t, e) {
                        var r = !1;
                        function n(e) {
                            r || ((r = !0), l.reject(t, e));
                        }
                        function i(e) {
                            r || ((r = !0), l.resolve(t, e));
                        }
                        var s = p(function () {
                            e(i, n);
                        });
                        "error" === s.status && n(s.value);
                    }
                    function p(e, t) {
                        var r = {};
                        try {
                            (r.value = e(t)), (r.status = "success");
                        } catch (e) {
                            (r.status = "error"), (r.value = e);
                        }
                        return r;
                    }
                    ((t.exports = o).prototype.finally = function (t) {
                        if ("function" != typeof t) return this;
                        var r = this.constructor;
                        return this.then(
                            function (e) {
                                return r.resolve(t()).then(function () {
                                    return e;
                                });
                            },
                            function (e) {
                                return r.resolve(t()).then(function () {
                                    throw e;
                                });
                            }
                        );
                    }),
                        (o.prototype.catch = function (e) {
                            return this.then(null, e);
                        }),
                        (o.prototype.then = function (e, t) {
                            if (("function" != typeof e && this.state === a) || ("function" != typeof t && this.state === s)) return this;
                            var r = new this.constructor(u);
                            this.state !== n ? f(r, this.state === a ? e : t, this.outcome) : this.queue.push(new h(r, e, t));
                            return r;
                        }),
                        (h.prototype.callFulfilled = function (e) {
                            l.resolve(this.promise, e);
                        }),
                        (h.prototype.otherCallFulfilled = function (e) {
                            f(this.promise, this.onFulfilled, e);
                        }),
                        (h.prototype.callRejected = function (e) {
                            l.reject(this.promise, e);
                        }),
                        (h.prototype.otherCallRejected = function (e) {
                            f(this.promise, this.onRejected, e);
                        }),
                        (l.resolve = function (e, t) {
                            var r = p(c, t);
                            if ("error" === r.status) return l.reject(e, r.value);
                            var n = r.value;
                            if (n) d(e, n);
                            else {
                                (e.state = a), (e.outcome = t);
                                for (var i = -1, s = e.queue.length; ++i < s; ) e.queue[i].callFulfilled(t);
                            }
                            return e;
                        }),
                        (l.reject = function (e, t) {
                            (e.state = s), (e.outcome = t);
                            for (var r = -1, n = e.queue.length; ++r < n; ) e.queue[r].callRejected(t);
                            return e;
                        }),
                        (o.resolve = function (e) {
                            if (e instanceof this) return e;
                            return l.resolve(new this(u), e);
                        }),
                        (o.reject = function (e) {
                            var t = new this(u);
                            return l.reject(t, e);
                        }),
                        (o.all = function (e) {
                            var r = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                i = !1;
                            if (!n) return this.resolve([]);
                            var s = new Array(n),
                                a = 0,
                                t = -1,
                                o = new this(u);
                            for (; ++t < n; ) h(e[t], t);
                            return o;
                            function h(e, t) {
                                r.resolve(e).then(
                                    function (e) {
                                        (s[t] = e), ++a !== n || i || ((i = !0), l.resolve(o, s));
                                    },
                                    function (e) {
                                        i || ((i = !0), l.reject(o, e));
                                    }
                                );
                            }
                        }),
                        (o.race = function (e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var r = e.length,
                                n = !1;
                            if (!r) return this.resolve([]);
                            var i = -1,
                                s = new this(u);
                            for (; ++i < r; )
                                (a = e[i]),
                                    t.resolve(a).then(
                                        function (e) {
                                            n || ((n = !0), l.resolve(s, e));
                                        },
                                        function (e) {
                                            n || ((n = !0), l.reject(s, e));
                                        }
                                    );
                            var a;
                            return s;
                        });
                },
                { immediate: 36 },
            ],
            38: [
                function (e, t, r) {
                    "use strict";
                    var n = {};
                    (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), (t.exports = n);
                },
                { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 },
            ],
            39: [
                function (e, t, r) {
                    "use strict";
                    var a = e("./zlib/deflate"),
                        o = e("./utils/common"),
                        h = e("./utils/strings"),
                        i = e("./zlib/messages"),
                        s = e("./zlib/zstream"),
                        u = Object.prototype.toString,
                        l = 0,
                        f = -1,
                        c = 0,
                        d = 8;
                    function p(e) {
                        if (!(this instanceof p)) return new p(e);
                        this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e || {});
                        var t = this.options;
                        t.raw && 0 < t.windowBits ? (t.windowBits = -t.windowBits) : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), (this.err = 0), (this.msg = ""), (this.ended = !1), (this.chunks = []), (this.strm = new s()), (this.strm.avail_out = 0);
                        var r = a.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
                        if (r !== l) throw new Error(i[r]);
                        if ((t.header && a.deflateSetHeader(this.strm, t.header), t.dictionary)) {
                            var n;
                            if (((n = "string" == typeof t.dictionary ? h.string2buf(t.dictionary) : "[object ArrayBuffer]" === u.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary), (r = a.deflateSetDictionary(this.strm, n)) !== l)) throw new Error(i[r]);
                            this._dict_set = !0;
                        }
                    }
                    function n(e, t) {
                        var r = new p(t);
                        if ((r.push(e, !0), r.err)) throw r.msg || i[r.err];
                        return r.result;
                    }
                    (p.prototype.push = function (e, t) {
                        var r,
                            n,
                            i = this.strm,
                            s = this.options.chunkSize;
                        if (this.ended) return !1;
                        (n = t === ~~t ? t : !0 === t ? 4 : 0), "string" == typeof e ? (i.input = h.string2buf(e)) : "[object ArrayBuffer]" === u.call(e) ? (i.input = new Uint8Array(e)) : (i.input = e), (i.next_in = 0), (i.avail_in = i.input.length);
                        do {
                            if ((0 === i.avail_out && ((i.output = new o.Buf8(s)), (i.next_out = 0), (i.avail_out = s)), 1 !== (r = a.deflate(i, n)) && r !== l)) return this.onEnd(r), !(this.ended = !0);
                            (0 !== i.avail_out && (0 !== i.avail_in || (4 !== n && 2 !== n))) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i.output, i.next_out))) : this.onData(o.shrinkBuf(i.output, i.next_out)));
                        } while ((0 < i.avail_in || 0 === i.avail_out) && 1 !== r);
                        return 4 === n ? ((r = a.deflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), r === l) : 2 !== n || (this.onEnd(l), !(i.avail_out = 0));
                    }),
                        (p.prototype.onData = function (e) {
                            this.chunks.push(e);
                        }),
                        (p.prototype.onEnd = function (e) {
                            e === l && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = o.flattenChunks(this.chunks))), (this.chunks = []), (this.err = e), (this.msg = this.strm.msg);
                        }),
                        (r.Deflate = p),
                        (r.deflate = n),
                        (r.deflateRaw = function (e, t) {
                            return ((t = t || {}).raw = !0), n(e, t);
                        }),
                        (r.gzip = function (e, t) {
                            return ((t = t || {}).gzip = !0), n(e, t);
                        });
                },
                { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 },
            ],
            40: [
                function (e, t, r) {
                    "use strict";
                    var c = e("./zlib/inflate"),
                        d = e("./utils/common"),
                        p = e("./utils/strings"),
                        m = e("./zlib/constants"),
                        n = e("./zlib/messages"),
                        i = e("./zlib/zstream"),
                        s = e("./zlib/gzheader"),
                        _ = Object.prototype.toString;
                    function a(e) {
                        if (!(this instanceof a)) return new a(e);
                        this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e || {});
                        var t = this.options;
                        t.raw && 0 <= t.windowBits && t.windowBits < 16 && ((t.windowBits = -t.windowBits), 0 === t.windowBits && (t.windowBits = -15)),
                            !(0 <= t.windowBits && t.windowBits < 16) || (e && e.windowBits) || (t.windowBits += 32),
                            15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                            (this.err = 0),
                            (this.msg = ""),
                            (this.ended = !1),
                            (this.chunks = []),
                            (this.strm = new i()),
                            (this.strm.avail_out = 0);
                        var r = c.inflateInit2(this.strm, t.windowBits);
                        if (r !== m.Z_OK) throw new Error(n[r]);
                        (this.header = new s()), c.inflateGetHeader(this.strm, this.header);
                    }
                    function o(e, t) {
                        var r = new a(t);
                        if ((r.push(e, !0), r.err)) throw r.msg || n[r.err];
                        return r.result;
                    }
                    (a.prototype.push = function (e, t) {
                        var r,
                            n,
                            i,
                            s,
                            a,
                            o,
                            h = this.strm,
                            u = this.options.chunkSize,
                            l = this.options.dictionary,
                            f = !1;
                        if (this.ended) return !1;
                        (n = t === ~~t ? t : !0 === t ? m.Z_FINISH : m.Z_NO_FLUSH), "string" == typeof e ? (h.input = p.binstring2buf(e)) : "[object ArrayBuffer]" === _.call(e) ? (h.input = new Uint8Array(e)) : (h.input = e), (h.next_in = 0), (h.avail_in = h.input.length);
                        do {
                            if (
                                (0 === h.avail_out && ((h.output = new d.Buf8(u)), (h.next_out = 0), (h.avail_out = u)),
                                (r = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && ((o = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l), (r = c.inflateSetDictionary(this.strm, o))),
                                r === m.Z_BUF_ERROR && !0 === f && ((r = m.Z_OK), (f = !1)),
                                r !== m.Z_STREAM_END && r !== m.Z_OK)
                            )
                                return this.onEnd(r), !(this.ended = !0);
                            h.next_out &&
                                ((0 !== h.avail_out && r !== m.Z_STREAM_END && (0 !== h.avail_in || (n !== m.Z_FINISH && n !== m.Z_SYNC_FLUSH))) ||
                                    ("string" === this.options.to ? ((i = p.utf8border(h.output, h.next_out)), (s = h.next_out - i), (a = p.buf2string(h.output, i)), (h.next_out = s), (h.avail_out = u - s), s && d.arraySet(h.output, h.output, i, s, 0), this.onData(a)) : this.onData(d.shrinkBuf(h.output, h.next_out)))),
                                0 === h.avail_in && 0 === h.avail_out && (f = !0);
                        } while ((0 < h.avail_in || 0 === h.avail_out) && r !== m.Z_STREAM_END);
                        return r === m.Z_STREAM_END && (n = m.Z_FINISH), n === m.Z_FINISH ? ((r = c.inflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), r === m.Z_OK) : n !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
                    }),
                        (a.prototype.onData = function (e) {
                            this.chunks.push(e);
                        }),
                        (a.prototype.onEnd = function (e) {
                            e === m.Z_OK && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = d.flattenChunks(this.chunks))), (this.chunks = []), (this.err = e), (this.msg = this.strm.msg);
                        }),
                        (r.Inflate = a),
                        (r.inflate = o),
                        (r.inflateRaw = function (e, t) {
                            return ((t = t || {}).raw = !0), o(e, t);
                        }),
                        (r.ungzip = o);
                },
                { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 },
            ],
            41: [
                function (e, t, r) {
                    "use strict";
                    var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                    (r.assign = function (e) {
                        for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
                            var r = t.shift();
                            if (r) {
                                if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                                for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
                            }
                        }
                        return e;
                    }),
                        (r.shrinkBuf = function (e, t) {
                            return e.length === t ? e : e.subarray ? e.subarray(0, t) : ((e.length = t), e);
                        });
                    var i = {
                            arraySet: function (e, t, r, n, i) {
                                if (t.subarray && e.subarray) e.set(t.subarray(r, r + n), i);
                                else for (var s = 0; s < n; s++) e[i + s] = t[r + s];
                            },
                            flattenChunks: function (e) {
                                var t, r, n, i, s, a;
                                for (t = n = 0, r = e.length; t < r; t++) n += e[t].length;
                                for (a = new Uint8Array(n), t = i = 0, r = e.length; t < r; t++) (s = e[t]), a.set(s, i), (i += s.length);
                                return a;
                            },
                        },
                        s = {
                            arraySet: function (e, t, r, n, i) {
                                for (var s = 0; s < n; s++) e[i + s] = t[r + s];
                            },
                            flattenChunks: function (e) {
                                return [].concat.apply([], e);
                            },
                        };
                    (r.setTyped = function (e) {
                        e ? ((r.Buf8 = Uint8Array), (r.Buf16 = Uint16Array), (r.Buf32 = Int32Array), r.assign(r, i)) : ((r.Buf8 = Array), (r.Buf16 = Array), (r.Buf32 = Array), r.assign(r, s));
                    }),
                        r.setTyped(n);
                },
                {},
            ],
            42: [
                function (e, t, r) {
                    "use strict";
                    var h = e("./common"),
                        i = !0,
                        s = !0;
                    try {
                        String.fromCharCode.apply(null, [0]);
                    } catch (e) {
                        i = !1;
                    }
                    try {
                        String.fromCharCode.apply(null, new Uint8Array(1));
                    } catch (e) {
                        s = !1;
                    }
                    for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
                    function l(e, t) {
                        if (t < 65537 && ((e.subarray && s) || (!e.subarray && i))) return String.fromCharCode.apply(null, h.shrinkBuf(e, t));
                        for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
                        return r;
                    }
                    (u[254] = u[254] = 1),
                        (r.string2buf = function (e) {
                            var t,
                                r,
                                n,
                                i,
                                s,
                                a = e.length,
                                o = 0;
                            for (i = 0; i < a; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), i++), (o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
                            for (t = new h.Buf8(o), i = s = 0; s < o; i++)
                                55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), i++),
                                    r < 128 ? (t[s++] = r) : (r < 2048 ? (t[s++] = 192 | (r >>> 6)) : (r < 65536 ? (t[s++] = 224 | (r >>> 12)) : ((t[s++] = 240 | (r >>> 18)), (t[s++] = 128 | ((r >>> 12) & 63))), (t[s++] = 128 | ((r >>> 6) & 63))), (t[s++] = 128 | (63 & r)));
                            return t;
                        }),
                        (r.buf2binstring = function (e) {
                            return l(e, e.length);
                        }),
                        (r.binstring2buf = function (e) {
                            for (var t = new h.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);
                            return t;
                        }),
                        (r.buf2string = function (e, t) {
                            var r,
                                n,
                                i,
                                s,
                                a = t || e.length,
                                o = new Array(2 * a);
                            for (r = n = 0; r < a; )
                                if ((i = e[r++]) < 128) o[n++] = i;
                                else if (4 < (s = u[i])) (o[n++] = 65533), (r += s - 1);
                                else {
                                    for (i &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a; ) (i = (i << 6) | (63 & e[r++])), s--;
                                    1 < s ? (o[n++] = 65533) : i < 65536 ? (o[n++] = i) : ((i -= 65536), (o[n++] = 55296 | ((i >> 10) & 1023)), (o[n++] = 56320 | (1023 & i)));
                                }
                            return l(o, n);
                        }),
                        (r.utf8border = function (e, t) {
                            var r;
                            for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]); ) r--;
                            return r < 0 ? t : 0 === r ? t : r + u[e[r]] > t ? r : t;
                        });
                },
                { "./common": 41 },
            ],
            43: [
                function (e, t, r) {
                    "use strict";
                    t.exports = function (e, t, r, n) {
                        for (var i = (65535 & e) | 0, s = ((e >>> 16) & 65535) | 0, a = 0; 0 !== r; ) {
                            for (r -= a = 2e3 < r ? 2e3 : r; (s = (s + (i = (i + t[n++]) | 0)) | 0), --a; );
                            (i %= 65521), (s %= 65521);
                        }
                        return i | (s << 16) | 0;
                    };
                },
                {},
            ],
            44: [
                function (e, t, r) {
                    "use strict";
                    t.exports = {
                        Z_NO_FLUSH: 0,
                        Z_PARTIAL_FLUSH: 1,
                        Z_SYNC_FLUSH: 2,
                        Z_FULL_FLUSH: 3,
                        Z_FINISH: 4,
                        Z_BLOCK: 5,
                        Z_TREES: 6,
                        Z_OK: 0,
                        Z_STREAM_END: 1,
                        Z_NEED_DICT: 2,
                        Z_ERRNO: -1,
                        Z_STREAM_ERROR: -2,
                        Z_DATA_ERROR: -3,
                        Z_BUF_ERROR: -5,
                        Z_NO_COMPRESSION: 0,
                        Z_BEST_SPEED: 1,
                        Z_BEST_COMPRESSION: 9,
                        Z_DEFAULT_COMPRESSION: -1,
                        Z_FILTERED: 1,
                        Z_HUFFMAN_ONLY: 2,
                        Z_RLE: 3,
                        Z_FIXED: 4,
                        Z_DEFAULT_STRATEGY: 0,
                        Z_BINARY: 0,
                        Z_TEXT: 1,
                        Z_UNKNOWN: 2,
                        Z_DEFLATED: 8,
                    };
                },
                {},
            ],
            45: [
                function (e, t, r) {
                    "use strict";
                    var o = (function () {
                        for (var e, t = [], r = 0; r < 256; r++) {
                            e = r;
                            for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
                            t[r] = e;
                        }
                        return t;
                    })();
                    t.exports = function (e, t, r, n) {
                        var i = o,
                            s = n + r;
                        e ^= -1;
                        for (var a = n; a < s; a++) e = (e >>> 8) ^ i[255 & (e ^ t[a])];
                        return -1 ^ e;
                    };
                },
                {},
            ],
            46: [
                function (e, t, r) {
                    "use strict";
                    var h,
                        c = e("../utils/common"),
                        u = e("./trees"),
                        d = e("./adler32"),
                        p = e("./crc32"),
                        n = e("./messages"),
                        l = 0,
                        f = 4,
                        m = 0,
                        _ = -2,
                        g = -1,
                        b = 4,
                        i = 2,
                        v = 8,
                        y = 9,
                        s = 286,
                        a = 30,
                        o = 19,
                        w = 2 * s + 1,
                        k = 15,
                        x = 3,
                        S = 258,
                        z = S + x + 1,
                        C = 42,
                        E = 113,
                        A = 1,
                        I = 2,
                        O = 3,
                        B = 4;
                    function R(e, t) {
                        return (e.msg = n[t]), t;
                    }
                    function T(e) {
                        return (e << 1) - (4 < e ? 9 : 0);
                    }
                    function D(e) {
                        for (var t = e.length; 0 <= --t; ) e[t] = 0;
                    }
                    function F(e) {
                        var t = e.state,
                            r = t.pending;
                        r > e.avail_out && (r = e.avail_out), 0 !== r && (c.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), (e.next_out += r), (t.pending_out += r), (e.total_out += r), (e.avail_out -= r), (t.pending -= r), 0 === t.pending && (t.pending_out = 0));
                    }
                    function N(e, t) {
                        u._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), (e.block_start = e.strstart), F(e.strm);
                    }
                    function U(e, t) {
                        e.pending_buf[e.pending++] = t;
                    }
                    function P(e, t) {
                        (e.pending_buf[e.pending++] = (t >>> 8) & 255), (e.pending_buf[e.pending++] = 255 & t);
                    }
                    function L(e, t) {
                        var r,
                            n,
                            i = e.max_chain_length,
                            s = e.strstart,
                            a = e.prev_length,
                            o = e.nice_match,
                            h = e.strstart > e.w_size - z ? e.strstart - (e.w_size - z) : 0,
                            u = e.window,
                            l = e.w_mask,
                            f = e.prev,
                            c = e.strstart + S,
                            d = u[s + a - 1],
                            p = u[s + a];
                        e.prev_length >= e.good_match && (i >>= 2), o > e.lookahead && (o = e.lookahead);
                        do {
                            if (u[(r = t) + a] === p && u[r + a - 1] === d && u[r] === u[s] && u[++r] === u[s + 1]) {
                                (s += 2), r++;
                                do {} while (u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && s < c);
                                if (((n = S - (c - s)), (s = c - S), a < n)) {
                                    if (((e.match_start = t), o <= (a = n))) break;
                                    (d = u[s + a - 1]), (p = u[s + a]);
                                }
                            }
                        } while ((t = f[t & l]) > h && 0 != --i);
                        return a <= e.lookahead ? a : e.lookahead;
                    }
                    function j(e) {
                        var t,
                            r,
                            n,
                            i,
                            s,
                            a,
                            o,
                            h,
                            u,
                            l,
                            f = e.w_size;
                        do {
                            if (((i = e.window_size - e.lookahead - e.strstart), e.strstart >= f + (f - z))) {
                                for (c.arraySet(e.window, e.window, f, f, 0), e.match_start -= f, e.strstart -= f, e.block_start -= f, t = r = e.hash_size; (n = e.head[--t]), (e.head[t] = f <= n ? n - f : 0), --r; );
                                for (t = r = f; (n = e.prev[--t]), (e.prev[t] = f <= n ? n - f : 0), --r; );
                                i += f;
                            }
                            if (0 === e.strm.avail_in) break;
                            if (
                                ((a = e.strm),
                                (o = e.window),
                                (h = e.strstart + e.lookahead),
                                (u = i),
                                (l = void 0),
                                (l = a.avail_in),
                                u < l && (l = u),
                                (r = 0 === l ? 0 : ((a.avail_in -= l), c.arraySet(o, a.input, a.next_in, l, h), 1 === a.state.wrap ? (a.adler = d(a.adler, o, l, h)) : 2 === a.state.wrap && (a.adler = p(a.adler, o, l, h)), (a.next_in += l), (a.total_in += l), l)),
                                (e.lookahead += r),
                                e.lookahead + e.insert >= x)
                            )
                                for (s = e.strstart - e.insert, e.ins_h = e.window[s], e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[s + 1]) & e.hash_mask; e.insert && ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[s + x - 1]) & e.hash_mask), (e.prev[s & e.w_mask] = e.head[e.ins_h]), (e.head[e.ins_h] = s), s++, e.insert--, !(e.lookahead + e.insert < x)); );
                        } while (e.lookahead < z && 0 !== e.strm.avail_in);
                    }
                    function Z(e, t) {
                        for (var r, n; ; ) {
                            if (e.lookahead < z) {
                                if ((j(e), e.lookahead < z && t === l)) return A;
                                if (0 === e.lookahead) break;
                            }
                            if (((r = 0), e.lookahead >= x && ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + x - 1]) & e.hash_mask), (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]), (e.head[e.ins_h] = e.strstart)), 0 !== r && e.strstart - r <= e.w_size - z && (e.match_length = L(e, r)), e.match_length >= x))
                                if (((n = u._tr_tally(e, e.strstart - e.match_start, e.match_length - x)), (e.lookahead -= e.match_length), e.match_length <= e.max_lazy_match && e.lookahead >= x)) {
                                    for (e.match_length--; e.strstart++, (e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + x - 1]) & e.hash_mask), (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]), (e.head[e.ins_h] = e.strstart), 0 != --e.match_length; );
                                    e.strstart++;
                                } else (e.strstart += e.match_length), (e.match_length = 0), (e.ins_h = e.window[e.strstart]), (e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) & e.hash_mask);
                            else (n = u._tr_tally(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++;
                            if (n && (N(e, !1), 0 === e.strm.avail_out)) return A;
                        }
                        return (e.insert = e.strstart < x - 1 ? e.strstart : x - 1), t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
                    }
                    function W(e, t) {
                        for (var r, n, i; ; ) {
                            if (e.lookahead < z) {
                                if ((j(e), e.lookahead < z && t === l)) return A;
                                if (0 === e.lookahead) break;
                            }
                            if (
                                ((r = 0),
                                e.lookahead >= x && ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + x - 1]) & e.hash_mask), (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]), (e.head[e.ins_h] = e.strstart)),
                                (e.prev_length = e.match_length),
                                (e.prev_match = e.match_start),
                                (e.match_length = x - 1),
                                0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - z && ((e.match_length = L(e, r)), e.match_length <= 5 && (1 === e.strategy || (e.match_length === x && 4096 < e.strstart - e.match_start)) && (e.match_length = x - 1)),
                                e.prev_length >= x && e.match_length <= e.prev_length)
                            ) {
                                for (
                                    i = e.strstart + e.lookahead - x, n = u._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - x), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
                                    ++e.strstart <= i && ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + x - 1]) & e.hash_mask), (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]), (e.head[e.ins_h] = e.strstart)), 0 != --e.prev_length;

                                );
                                if (((e.match_available = 0), (e.match_length = x - 1), e.strstart++, n && (N(e, !1), 0 === e.strm.avail_out))) return A;
                            } else if (e.match_available) {
                                if (((n = u._tr_tally(e, 0, e.window[e.strstart - 1])) && N(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out)) return A;
                            } else (e.match_available = 1), e.strstart++, e.lookahead--;
                        }
                        return e.match_available && ((n = u._tr_tally(e, 0, e.window[e.strstart - 1])), (e.match_available = 0)), (e.insert = e.strstart < x - 1 ? e.strstart : x - 1), t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
                    }
                    function M(e, t, r, n, i) {
                        (this.good_length = e), (this.max_lazy = t), (this.nice_length = r), (this.max_chain = n), (this.func = i);
                    }
                    function H() {
                        (this.strm = null),
                            (this.status = 0),
                            (this.pending_buf = null),
                            (this.pending_buf_size = 0),
                            (this.pending_out = 0),
                            (this.pending = 0),
                            (this.wrap = 0),
                            (this.gzhead = null),
                            (this.gzindex = 0),
                            (this.method = v),
                            (this.last_flush = -1),
                            (this.w_size = 0),
                            (this.w_bits = 0),
                            (this.w_mask = 0),
                            (this.window = null),
                            (this.window_size = 0),
                            (this.prev = null),
                            (this.head = null),
                            (this.ins_h = 0),
                            (this.hash_size = 0),
                            (this.hash_bits = 0),
                            (this.hash_mask = 0),
                            (this.hash_shift = 0),
                            (this.block_start = 0),
                            (this.match_length = 0),
                            (this.prev_match = 0),
                            (this.match_available = 0),
                            (this.strstart = 0),
                            (this.match_start = 0),
                            (this.lookahead = 0),
                            (this.prev_length = 0),
                            (this.max_chain_length = 0),
                            (this.max_lazy_match = 0),
                            (this.level = 0),
                            (this.strategy = 0),
                            (this.good_match = 0),
                            (this.nice_match = 0),
                            (this.dyn_ltree = new c.Buf16(2 * w)),
                            (this.dyn_dtree = new c.Buf16(2 * (2 * a + 1))),
                            (this.bl_tree = new c.Buf16(2 * (2 * o + 1))),
                            D(this.dyn_ltree),
                            D(this.dyn_dtree),
                            D(this.bl_tree),
                            (this.l_desc = null),
                            (this.d_desc = null),
                            (this.bl_desc = null),
                            (this.bl_count = new c.Buf16(k + 1)),
                            (this.heap = new c.Buf16(2 * s + 1)),
                            D(this.heap),
                            (this.heap_len = 0),
                            (this.heap_max = 0),
                            (this.depth = new c.Buf16(2 * s + 1)),
                            D(this.depth),
                            (this.l_buf = 0),
                            (this.lit_bufsize = 0),
                            (this.last_lit = 0),
                            (this.d_buf = 0),
                            (this.opt_len = 0),
                            (this.static_len = 0),
                            (this.matches = 0),
                            (this.insert = 0),
                            (this.bi_buf = 0),
                            (this.bi_valid = 0);
                    }
                    function G(e) {
                        var t;
                        return e && e.state ? ((e.total_in = e.total_out = 0), (e.data_type = i), ((t = e.state).pending = 0), (t.pending_out = 0), t.wrap < 0 && (t.wrap = -t.wrap), (t.status = t.wrap ? C : E), (e.adler = 2 === t.wrap ? 0 : 1), (t.last_flush = l), u._tr_init(t), m) : R(e, _);
                    }
                    function K(e) {
                        var t = G(e);
                        return (
                            t === m &&
                                (function (e) {
                                    (e.window_size = 2 * e.w_size),
                                        D(e.head),
                                        (e.max_lazy_match = h[e.level].max_lazy),
                                        (e.good_match = h[e.level].good_length),
                                        (e.nice_match = h[e.level].nice_length),
                                        (e.max_chain_length = h[e.level].max_chain),
                                        (e.strstart = 0),
                                        (e.block_start = 0),
                                        (e.lookahead = 0),
                                        (e.insert = 0),
                                        (e.match_length = e.prev_length = x - 1),
                                        (e.match_available = 0),
                                        (e.ins_h = 0);
                                })(e.state),
                            t
                        );
                    }
                    function Y(e, t, r, n, i, s) {
                        if (!e) return _;
                        var a = 1;
                        if ((t === g && (t = 6), n < 0 ? ((a = 0), (n = -n)) : 15 < n && ((a = 2), (n -= 16)), i < 1 || y < i || r !== v || n < 8 || 15 < n || t < 0 || 9 < t || s < 0 || b < s)) return R(e, _);
                        8 === n && (n = 9);
                        var o = new H();
                        return (
                            ((e.state = o).strm = e),
                            (o.wrap = a),
                            (o.gzhead = null),
                            (o.w_bits = n),
                            (o.w_size = 1 << o.w_bits),
                            (o.w_mask = o.w_size - 1),
                            (o.hash_bits = i + 7),
                            (o.hash_size = 1 << o.hash_bits),
                            (o.hash_mask = o.hash_size - 1),
                            (o.hash_shift = ~~((o.hash_bits + x - 1) / x)),
                            (o.window = new c.Buf8(2 * o.w_size)),
                            (o.head = new c.Buf16(o.hash_size)),
                            (o.prev = new c.Buf16(o.w_size)),
                            (o.lit_bufsize = 1 << (i + 6)),
                            (o.pending_buf_size = 4 * o.lit_bufsize),
                            (o.pending_buf = new c.Buf8(o.pending_buf_size)),
                            (o.d_buf = 1 * o.lit_bufsize),
                            (o.l_buf = 3 * o.lit_bufsize),
                            (o.level = t),
                            (o.strategy = s),
                            (o.method = r),
                            K(e)
                        );
                    }
                    (h = [
                        new M(0, 0, 0, 0, function (e, t) {
                            var r = 65535;
                            for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5); ; ) {
                                if (e.lookahead <= 1) {
                                    if ((j(e), 0 === e.lookahead && t === l)) return A;
                                    if (0 === e.lookahead) break;
                                }
                                (e.strstart += e.lookahead), (e.lookahead = 0);
                                var n = e.block_start + r;
                                if ((0 === e.strstart || e.strstart >= n) && ((e.lookahead = e.strstart - n), (e.strstart = n), N(e, !1), 0 === e.strm.avail_out)) return A;
                                if (e.strstart - e.block_start >= e.w_size - z && (N(e, !1), 0 === e.strm.avail_out)) return A;
                            }
                            return (e.insert = 0), t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : (e.strstart > e.block_start && (N(e, !1), e.strm.avail_out), A);
                        }),
                        new M(4, 4, 8, 4, Z),
                        new M(4, 5, 16, 8, Z),
                        new M(4, 6, 32, 32, Z),
                        new M(4, 4, 16, 16, W),
                        new M(8, 16, 32, 32, W),
                        new M(8, 16, 128, 128, W),
                        new M(8, 32, 128, 256, W),
                        new M(32, 128, 258, 1024, W),
                        new M(32, 258, 258, 4096, W),
                    ]),
                        (r.deflateInit = function (e, t) {
                            return Y(e, t, v, 15, 8, 0);
                        }),
                        (r.deflateInit2 = Y),
                        (r.deflateReset = K),
                        (r.deflateResetKeep = G),
                        (r.deflateSetHeader = function (e, t) {
                            return e && e.state ? (2 !== e.state.wrap ? _ : ((e.state.gzhead = t), m)) : _;
                        }),
                        (r.deflate = function (e, t) {
                            var r, n, i, s;
                            if (!e || !e.state || 5 < t || t < 0) return e ? R(e, _) : _;
                            if (((n = e.state), !e.output || (!e.input && 0 !== e.avail_in) || (666 === n.status && t !== f))) return R(e, 0 === e.avail_out ? -5 : _);
                            if (((n.strm = e), (r = n.last_flush), (n.last_flush = t), n.status === C))
                                if (2 === n.wrap)
                                    (e.adler = 0),
                                        U(n, 31),
                                        U(n, 139),
                                        U(n, 8),
                                        n.gzhead
                                            ? (U(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)),
                                              U(n, 255 & n.gzhead.time),
                                              U(n, (n.gzhead.time >> 8) & 255),
                                              U(n, (n.gzhead.time >> 16) & 255),
                                              U(n, (n.gzhead.time >> 24) & 255),
                                              U(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0),
                                              U(n, 255 & n.gzhead.os),
                                              n.gzhead.extra && n.gzhead.extra.length && (U(n, 255 & n.gzhead.extra.length), U(n, (n.gzhead.extra.length >> 8) & 255)),
                                              n.gzhead.hcrc && (e.adler = p(e.adler, n.pending_buf, n.pending, 0)),
                                              (n.gzindex = 0),
                                              (n.status = 69))
                                            : (U(n, 0), U(n, 0), U(n, 0), U(n, 0), U(n, 0), U(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), U(n, 3), (n.status = E));
                                else {
                                    var a = (v + ((n.w_bits - 8) << 4)) << 8;
                                    (a |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6), 0 !== n.strstart && (a |= 32), (a += 31 - (a % 31)), (n.status = E), P(n, a), 0 !== n.strstart && (P(n, e.adler >>> 16), P(n, 65535 & e.adler)), (e.adler = 1);
                                }
                            if (69 === n.status)
                                if (n.gzhead.extra) {
                                    for (i = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), (i = n.pending), n.pending !== n.pending_buf_size)); ) U(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
                                    n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), n.gzindex === n.gzhead.extra.length && ((n.gzindex = 0), (n.status = 73));
                                } else n.status = 73;
                            if (73 === n.status)
                                if (n.gzhead.name) {
                                    i = n.pending;
                                    do {
                                        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), (i = n.pending), n.pending === n.pending_buf_size)) {
                                            s = 1;
                                            break;
                                        }
                                        (s = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0), U(n, s);
                                    } while (0 !== s);
                                    n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), 0 === s && ((n.gzindex = 0), (n.status = 91));
                                } else n.status = 91;
                            if (91 === n.status)
                                if (n.gzhead.comment) {
                                    i = n.pending;
                                    do {
                                        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), (i = n.pending), n.pending === n.pending_buf_size)) {
                                            s = 1;
                                            break;
                                        }
                                        (s = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0), U(n, s);
                                    } while (0 !== s);
                                    n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), 0 === s && (n.status = 103);
                                } else n.status = 103;
                            if ((103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && F(e), n.pending + 2 <= n.pending_buf_size && (U(n, 255 & e.adler), U(n, (e.adler >> 8) & 255), (e.adler = 0), (n.status = E))) : (n.status = E)), 0 !== n.pending)) {
                                if ((F(e), 0 === e.avail_out)) return (n.last_flush = -1), m;
                            } else if (0 === e.avail_in && T(t) <= T(r) && t !== f) return R(e, -5);
                            if (666 === n.status && 0 !== e.avail_in) return R(e, -5);
                            if (0 !== e.avail_in || 0 !== n.lookahead || (t !== l && 666 !== n.status)) {
                                var o =
                                    2 === n.strategy
                                        ? (function (e, t) {
                                              for (var r; ; ) {
                                                  if (0 === e.lookahead && (j(e), 0 === e.lookahead)) {
                                                      if (t === l) return A;
                                                      break;
                                                  }
                                                  if (((e.match_length = 0), (r = u._tr_tally(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++, r && (N(e, !1), 0 === e.strm.avail_out))) return A;
                                              }
                                              return (e.insert = 0), t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
                                          })(n, t)
                                        : 3 === n.strategy
                                        ? (function (e, t) {
                                              for (var r, n, i, s, a = e.window; ; ) {
                                                  if (e.lookahead <= S) {
                                                      if ((j(e), e.lookahead <= S && t === l)) return A;
                                                      if (0 === e.lookahead) break;
                                                  }
                                                  if (((e.match_length = 0), e.lookahead >= x && 0 < e.strstart && (n = a[(i = e.strstart - 1)]) === a[++i] && n === a[++i] && n === a[++i])) {
                                                      s = e.strstart + S;
                                                      do {} while (n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && i < s);
                                                      (e.match_length = S - (s - i)), e.match_length > e.lookahead && (e.match_length = e.lookahead);
                                                  }
                                                  if ((e.match_length >= x ? ((r = u._tr_tally(e, 1, e.match_length - x)), (e.lookahead -= e.match_length), (e.strstart += e.match_length), (e.match_length = 0)) : ((r = u._tr_tally(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++), r && (N(e, !1), 0 === e.strm.avail_out))) return A;
                                              }
                                              return (e.insert = 0), t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
                                          })(n, t)
                                        : h[n.level].func(n, t);
                                if (((o !== O && o !== B) || (n.status = 666), o === A || o === O)) return 0 === e.avail_out && (n.last_flush = -1), m;
                                if (o === I && (1 === t ? u._tr_align(n) : 5 !== t && (u._tr_stored_block(n, 0, 0, !1), 3 === t && (D(n.head), 0 === n.lookahead && ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))), F(e), 0 === e.avail_out)) return (n.last_flush = -1), m;
                            }
                            return t !== f
                                ? m
                                : n.wrap <= 0
                                ? 1
                                : (2 === n.wrap ? (U(n, 255 & e.adler), U(n, (e.adler >> 8) & 255), U(n, (e.adler >> 16) & 255), U(n, (e.adler >> 24) & 255), U(n, 255 & e.total_in), U(n, (e.total_in >> 8) & 255), U(n, (e.total_in >> 16) & 255), U(n, (e.total_in >> 24) & 255)) : (P(n, e.adler >>> 16), P(n, 65535 & e.adler)), F(e), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? m : 1);
                        }),
                        (r.deflateEnd = function (e) {
                            var t;
                            return e && e.state ? ((t = e.state.status) !== C && 69 !== t && 73 !== t && 91 !== t && 103 !== t && t !== E && 666 !== t ? R(e, _) : ((e.state = null), t === E ? R(e, -3) : m)) : _;
                        }),
                        (r.deflateSetDictionary = function (e, t) {
                            var r,
                                n,
                                i,
                                s,
                                a,
                                o,
                                h,
                                u,
                                l = t.length;
                            if (!e || !e.state) return _;
                            if (2 === (s = (r = e.state).wrap) || (1 === s && r.status !== C) || r.lookahead) return _;
                            for (1 === s && (e.adler = d(e.adler, t, l, 0)), r.wrap = 0, l >= r.w_size && (0 === s && (D(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0)), (u = new c.Buf8(r.w_size)), c.arraySet(u, t, l - r.w_size, r.w_size, 0), (t = u), (l = r.w_size)), a = e.avail_in, o = e.next_in, h = e.input, e.avail_in = l, e.next_in = 0, e.input = t, j(r); r.lookahead >= x; ) {
                                for (n = r.strstart, i = r.lookahead - (x - 1); (r.ins_h = ((r.ins_h << r.hash_shift) ^ r.window[n + x - 1]) & r.hash_mask), (r.prev[n & r.w_mask] = r.head[r.ins_h]), (r.head[r.ins_h] = n), n++, --i; );
                                (r.strstart = n), (r.lookahead = x - 1), j(r);
                            }
                            return (r.strstart += r.lookahead), (r.block_start = r.strstart), (r.insert = r.lookahead), (r.lookahead = 0), (r.match_length = r.prev_length = x - 1), (r.match_available = 0), (e.next_in = o), (e.input = h), (e.avail_in = a), (r.wrap = s), m;
                        }),
                        (r.deflateInfo = "pako deflate (from Nodeca project)");
                },
                { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 },
            ],
            47: [
                function (e, t, r) {
                    "use strict";
                    t.exports = function () {
                        (this.text = 0), (this.time = 0), (this.xflags = 0), (this.os = 0), (this.extra = null), (this.extra_len = 0), (this.name = ""), (this.comment = ""), (this.hcrc = 0), (this.done = !1);
                    };
                },
                {},
            ],
            48: [
                function (e, t, r) {
                    "use strict";
                    t.exports = function (e, t) {
                        var r, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
                        (r = e.state), (n = e.next_in), (z = e.input), (i = n + (e.avail_in - 5)), (s = e.next_out), (C = e.output), (a = s - (t - e.avail_out)), (o = s + (e.avail_out - 257)), (h = r.dmax), (u = r.wsize), (l = r.whave), (f = r.wnext), (c = r.window), (d = r.hold), (p = r.bits), (m = r.lencode), (_ = r.distcode), (g = (1 << r.lenbits) - 1), (b = (1 << r.distbits) - 1);
                        e: do {
                            p < 15 && ((d += z[n++] << p), (p += 8), (d += z[n++] << p), (p += 8)), (v = m[d & g]);
                            t: for (;;) {
                                if (((d >>>= y = v >>> 24), (p -= y), 0 === (y = (v >>> 16) & 255))) C[s++] = 65535 & v;
                                else {
                                    if (!(16 & y)) {
                                        if (0 == (64 & y)) {
                                            v = m[(65535 & v) + (d & ((1 << y) - 1))];
                                            continue t;
                                        }
                                        if (32 & y) {
                                            r.mode = 12;
                                            break e;
                                        }
                                        (e.msg = "invalid literal/length code"), (r.mode = 30);
                                        break e;
                                    }
                                    (w = 65535 & v), (y &= 15) && (p < y && ((d += z[n++] << p), (p += 8)), (w += d & ((1 << y) - 1)), (d >>>= y), (p -= y)), p < 15 && ((d += z[n++] << p), (p += 8), (d += z[n++] << p), (p += 8)), (v = _[d & b]);
                                    r: for (;;) {
                                        if (((d >>>= y = v >>> 24), (p -= y), !(16 & (y = (v >>> 16) & 255)))) {
                                            if (0 == (64 & y)) {
                                                v = _[(65535 & v) + (d & ((1 << y) - 1))];
                                                continue r;
                                            }
                                            (e.msg = "invalid distance code"), (r.mode = 30);
                                            break e;
                                        }
                                        if (((k = 65535 & v), p < (y &= 15) && ((d += z[n++] << p), (p += 8) < y && ((d += z[n++] << p), (p += 8))), h < (k += d & ((1 << y) - 1)))) {
                                            (e.msg = "invalid distance too far back"), (r.mode = 30);
                                            break e;
                                        }
                                        if (((d >>>= y), (p -= y), (y = s - a) < k)) {
                                            if (l < (y = k - y) && r.sane) {
                                                (e.msg = "invalid distance too far back"), (r.mode = 30);
                                                break e;
                                            }
                                            if (((S = c), (x = 0) === f)) {
                                                if (((x += u - y), y < w)) {
                                                    for (w -= y; (C[s++] = c[x++]), --y; );
                                                    (x = s - k), (S = C);
                                                }
                                            } else if (f < y) {
                                                if (((x += u + f - y), (y -= f) < w)) {
                                                    for (w -= y; (C[s++] = c[x++]), --y; );
                                                    if (((x = 0), f < w)) {
                                                        for (w -= y = f; (C[s++] = c[x++]), --y; );
                                                        (x = s - k), (S = C);
                                                    }
                                                }
                                            } else if (((x += f - y), y < w)) {
                                                for (w -= y; (C[s++] = c[x++]), --y; );
                                                (x = s - k), (S = C);
                                            }
                                            for (; 2 < w; ) (C[s++] = S[x++]), (C[s++] = S[x++]), (C[s++] = S[x++]), (w -= 3);
                                            w && ((C[s++] = S[x++]), 1 < w && (C[s++] = S[x++]));
                                        } else {
                                            for (x = s - k; (C[s++] = C[x++]), (C[s++] = C[x++]), (C[s++] = C[x++]), 2 < (w -= 3); );
                                            w && ((C[s++] = C[x++]), 1 < w && (C[s++] = C[x++]));
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                        } while (n < i && s < o);
                        (n -= w = p >> 3), (d &= (1 << (p -= w << 3)) - 1), (e.next_in = n), (e.next_out = s), (e.avail_in = n < i ? i - n + 5 : 5 - (n - i)), (e.avail_out = s < o ? o - s + 257 : 257 - (s - o)), (r.hold = d), (r.bits = p);
                    };
                },
                {},
            ],
            49: [
                function (e, t, r) {
                    "use strict";
                    var I = e("../utils/common"),
                        O = e("./adler32"),
                        B = e("./crc32"),
                        R = e("./inffast"),
                        T = e("./inftrees"),
                        D = 1,
                        F = 2,
                        N = 0,
                        U = -2,
                        P = 1,
                        n = 852,
                        i = 592;
                    function L(e) {
                        return ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
                    }
                    function s() {
                        (this.mode = 0),
                            (this.last = !1),
                            (this.wrap = 0),
                            (this.havedict = !1),
                            (this.flags = 0),
                            (this.dmax = 0),
                            (this.check = 0),
                            (this.total = 0),
                            (this.head = null),
                            (this.wbits = 0),
                            (this.wsize = 0),
                            (this.whave = 0),
                            (this.wnext = 0),
                            (this.window = null),
                            (this.hold = 0),
                            (this.bits = 0),
                            (this.length = 0),
                            (this.offset = 0),
                            (this.extra = 0),
                            (this.lencode = null),
                            (this.distcode = null),
                            (this.lenbits = 0),
                            (this.distbits = 0),
                            (this.ncode = 0),
                            (this.nlen = 0),
                            (this.ndist = 0),
                            (this.have = 0),
                            (this.next = null),
                            (this.lens = new I.Buf16(320)),
                            (this.work = new I.Buf16(288)),
                            (this.lendyn = null),
                            (this.distdyn = null),
                            (this.sane = 0),
                            (this.back = 0),
                            (this.was = 0);
                    }
                    function a(e) {
                        var t;
                        return e && e.state ? ((t = e.state), (e.total_in = e.total_out = t.total = 0), (e.msg = ""), t.wrap && (e.adler = 1 & t.wrap), (t.mode = P), (t.last = 0), (t.havedict = 0), (t.dmax = 32768), (t.head = null), (t.hold = 0), (t.bits = 0), (t.lencode = t.lendyn = new I.Buf32(n)), (t.distcode = t.distdyn = new I.Buf32(i)), (t.sane = 1), (t.back = -1), N) : U;
                    }
                    function o(e) {
                        var t;
                        return e && e.state ? (((t = e.state).wsize = 0), (t.whave = 0), (t.wnext = 0), a(e)) : U;
                    }
                    function h(e, t) {
                        var r, n;
                        return e && e.state ? ((n = e.state), t < 0 ? ((r = 0), (t = -t)) : ((r = 1 + (t >> 4)), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? U : (null !== n.window && n.wbits !== t && (n.window = null), (n.wrap = r), (n.wbits = t), o(e))) : U;
                    }
                    function u(e, t) {
                        var r, n;
                        return e ? ((n = new s()), ((e.state = n).window = null), (r = h(e, t)) !== N && (e.state = null), r) : U;
                    }
                    var l,
                        f,
                        c = !0;
                    function j(e) {
                        if (c) {
                            var t;
                            for (l = new I.Buf32(512), f = new I.Buf32(32), t = 0; t < 144; ) e.lens[t++] = 8;
                            for (; t < 256; ) e.lens[t++] = 9;
                            for (; t < 280; ) e.lens[t++] = 7;
                            for (; t < 288; ) e.lens[t++] = 8;
                            for (T(D, e.lens, 0, 288, l, 0, e.work, { bits: 9 }), t = 0; t < 32; ) e.lens[t++] = 5;
                            T(F, e.lens, 0, 32, f, 0, e.work, { bits: 5 }), (c = !1);
                        }
                        (e.lencode = l), (e.lenbits = 9), (e.distcode = f), (e.distbits = 5);
                    }
                    function Z(e, t, r, n) {
                        var i,
                            s = e.state;
                        return (
                            null === s.window && ((s.wsize = 1 << s.wbits), (s.wnext = 0), (s.whave = 0), (s.window = new I.Buf8(s.wsize))),
                            n >= s.wsize ? (I.arraySet(s.window, t, r - s.wsize, s.wsize, 0), (s.wnext = 0), (s.whave = s.wsize)) : (n < (i = s.wsize - s.wnext) && (i = n), I.arraySet(s.window, t, r - n, i, s.wnext), (n -= i) ? (I.arraySet(s.window, t, r - n, n, 0), (s.wnext = n), (s.whave = s.wsize)) : ((s.wnext += i), s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += i))),
                            0
                        );
                    }
                    (r.inflateReset = o),
                        (r.inflateReset2 = h),
                        (r.inflateResetKeep = a),
                        (r.inflateInit = function (e) {
                            return u(e, 15);
                        }),
                        (r.inflateInit2 = u),
                        (r.inflate = function (e, t) {
                            var r,
                                n,
                                i,
                                s,
                                a,
                                o,
                                h,
                                u,
                                l,
                                f,
                                c,
                                d,
                                p,
                                m,
                                _,
                                g,
                                b,
                                v,
                                y,
                                w,
                                k,
                                x,
                                S,
                                z,
                                C = 0,
                                E = new I.Buf8(4),
                                A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                            if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in)) return U;
                            12 === (r = e.state).mode && (r.mode = 13), (a = e.next_out), (i = e.output), (h = e.avail_out), (s = e.next_in), (n = e.input), (o = e.avail_in), (u = r.hold), (l = r.bits), (f = o), (c = h), (x = N);
                            e: for (;;)
                                switch (r.mode) {
                                    case P:
                                        if (0 === r.wrap) {
                                            r.mode = 13;
                                            break;
                                        }
                                        for (; l < 16; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        if (2 & r.wrap && 35615 === u) {
                                            (E[(r.check = 0)] = 255 & u), (E[1] = (u >>> 8) & 255), (r.check = B(r.check, E, 2, 0)), (l = u = 0), (r.mode = 2);
                                            break;
                                        }
                                        if (((r.flags = 0), r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & u) << 8) + (u >> 8)) % 31)) {
                                            (e.msg = "incorrect header check"), (r.mode = 30);
                                            break;
                                        }
                                        if (8 != (15 & u)) {
                                            (e.msg = "unknown compression method"), (r.mode = 30);
                                            break;
                                        }
                                        if (((l -= 4), (k = 8 + (15 & (u >>>= 4))), 0 === r.wbits)) r.wbits = k;
                                        else if (k > r.wbits) {
                                            (e.msg = "invalid window size"), (r.mode = 30);
                                            break;
                                        }
                                        (r.dmax = 1 << k), (e.adler = r.check = 1), (r.mode = 512 & u ? 10 : 12), (l = u = 0);
                                        break;
                                    case 2:
                                        for (; l < 16; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        if (((r.flags = u), 8 != (255 & r.flags))) {
                                            (e.msg = "unknown compression method"), (r.mode = 30);
                                            break;
                                        }
                                        if (57344 & r.flags) {
                                            (e.msg = "unknown header flags set"), (r.mode = 30);
                                            break;
                                        }
                                        r.head && (r.head.text = (u >> 8) & 1), 512 & r.flags && ((E[0] = 255 & u), (E[1] = (u >>> 8) & 255), (r.check = B(r.check, E, 2, 0))), (l = u = 0), (r.mode = 3);
                                    case 3:
                                        for (; l < 32; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        r.head && (r.head.time = u), 512 & r.flags && ((E[0] = 255 & u), (E[1] = (u >>> 8) & 255), (E[2] = (u >>> 16) & 255), (E[3] = (u >>> 24) & 255), (r.check = B(r.check, E, 4, 0))), (l = u = 0), (r.mode = 4);
                                    case 4:
                                        for (; l < 16; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        r.head && ((r.head.xflags = 255 & u), (r.head.os = u >> 8)), 512 & r.flags && ((E[0] = 255 & u), (E[1] = (u >>> 8) & 255), (r.check = B(r.check, E, 2, 0))), (l = u = 0), (r.mode = 5);
                                    case 5:
                                        if (1024 & r.flags) {
                                            for (; l < 16; ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            (r.length = u), r.head && (r.head.extra_len = u), 512 & r.flags && ((E[0] = 255 & u), (E[1] = (u >>> 8) & 255), (r.check = B(r.check, E, 2, 0))), (l = u = 0);
                                        } else r.head && (r.head.extra = null);
                                        r.mode = 6;
                                    case 6:
                                        if (1024 & r.flags && (o < (d = r.length) && (d = o), d && (r.head && ((k = r.head.extra_len - r.length), r.head.extra || (r.head.extra = new Array(r.head.extra_len)), I.arraySet(r.head.extra, n, s, d, k)), 512 & r.flags && (r.check = B(r.check, n, d, s)), (o -= d), (s += d), (r.length -= d)), r.length)) break e;
                                        (r.length = 0), (r.mode = 7);
                                    case 7:
                                        if (2048 & r.flags) {
                                            if (0 === o) break e;
                                            for (d = 0; (k = n[s + d++]), r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k)), k && d < o; );
                                            if ((512 & r.flags && (r.check = B(r.check, n, d, s)), (o -= d), (s += d), k)) break e;
                                        } else r.head && (r.head.name = null);
                                        (r.length = 0), (r.mode = 8);
                                    case 8:
                                        if (4096 & r.flags) {
                                            if (0 === o) break e;
                                            for (d = 0; (k = n[s + d++]), r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k)), k && d < o; );
                                            if ((512 & r.flags && (r.check = B(r.check, n, d, s)), (o -= d), (s += d), k)) break e;
                                        } else r.head && (r.head.comment = null);
                                        r.mode = 9;
                                    case 9:
                                        if (512 & r.flags) {
                                            for (; l < 16; ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            if (u !== (65535 & r.check)) {
                                                (e.msg = "header crc mismatch"), (r.mode = 30);
                                                break;
                                            }
                                            l = u = 0;
                                        }
                                        r.head && ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)), (e.adler = r.check = 0), (r.mode = 12);
                                        break;
                                    case 10:
                                        for (; l < 32; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        (e.adler = r.check = L(u)), (l = u = 0), (r.mode = 11);
                                    case 11:
                                        if (0 === r.havedict) return (e.next_out = a), (e.avail_out = h), (e.next_in = s), (e.avail_in = o), (r.hold = u), (r.bits = l), 2;
                                        (e.adler = r.check = 1), (r.mode = 12);
                                    case 12:
                                        if (5 === t || 6 === t) break e;
                                    case 13:
                                        if (r.last) {
                                            (u >>>= 7 & l), (l -= 7 & l), (r.mode = 27);
                                            break;
                                        }
                                        for (; l < 3; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        switch (((r.last = 1 & u), (l -= 1), 3 & (u >>>= 1))) {
                                            case 0:
                                                r.mode = 14;
                                                break;
                                            case 1:
                                                if ((j(r), (r.mode = 20), 6 !== t)) break;
                                                (u >>>= 2), (l -= 2);
                                                break e;
                                            case 2:
                                                r.mode = 17;
                                                break;
                                            case 3:
                                                (e.msg = "invalid block type"), (r.mode = 30);
                                        }
                                        (u >>>= 2), (l -= 2);
                                        break;
                                    case 14:
                                        for (u >>>= 7 & l, l -= 7 & l; l < 32; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        if ((65535 & u) != ((u >>> 16) ^ 65535)) {
                                            (e.msg = "invalid stored block lengths"), (r.mode = 30);
                                            break;
                                        }
                                        if (((r.length = 65535 & u), (l = u = 0), (r.mode = 15), 6 === t)) break e;
                                    case 15:
                                        r.mode = 16;
                                    case 16:
                                        if ((d = r.length)) {
                                            if ((o < d && (d = o), h < d && (d = h), 0 === d)) break e;
                                            I.arraySet(i, n, s, d, a), (o -= d), (s += d), (h -= d), (a += d), (r.length -= d);
                                            break;
                                        }
                                        r.mode = 12;
                                        break;
                                    case 17:
                                        for (; l < 14; ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        if (((r.nlen = 257 + (31 & u)), (u >>>= 5), (l -= 5), (r.ndist = 1 + (31 & u)), (u >>>= 5), (l -= 5), (r.ncode = 4 + (15 & u)), (u >>>= 4), (l -= 4), 286 < r.nlen || 30 < r.ndist)) {
                                            (e.msg = "too many length or distance symbols"), (r.mode = 30);
                                            break;
                                        }
                                        (r.have = 0), (r.mode = 18);
                                    case 18:
                                        for (; r.have < r.ncode; ) {
                                            for (; l < 3; ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            (r.lens[A[r.have++]] = 7 & u), (u >>>= 3), (l -= 3);
                                        }
                                        for (; r.have < 19; ) r.lens[A[r.have++]] = 0;
                                        if (((r.lencode = r.lendyn), (r.lenbits = 7), (S = { bits: r.lenbits }), (x = T(0, r.lens, 0, 19, r.lencode, 0, r.work, S)), (r.lenbits = S.bits), x)) {
                                            (e.msg = "invalid code lengths set"), (r.mode = 30);
                                            break;
                                        }
                                        (r.have = 0), (r.mode = 19);
                                    case 19:
                                        for (; r.have < r.nlen + r.ndist; ) {
                                            for (; (g = ((C = r.lencode[u & ((1 << r.lenbits) - 1)]) >>> 16) & 255), (b = 65535 & C), !((_ = C >>> 24) <= l); ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            if (b < 16) (u >>>= _), (l -= _), (r.lens[r.have++] = b);
                                            else {
                                                if (16 === b) {
                                                    for (z = _ + 2; l < z; ) {
                                                        if (0 === o) break e;
                                                        o--, (u += n[s++] << l), (l += 8);
                                                    }
                                                    if (((u >>>= _), (l -= _), 0 === r.have)) {
                                                        (e.msg = "invalid bit length repeat"), (r.mode = 30);
                                                        break;
                                                    }
                                                    (k = r.lens[r.have - 1]), (d = 3 + (3 & u)), (u >>>= 2), (l -= 2);
                                                } else if (17 === b) {
                                                    for (z = _ + 3; l < z; ) {
                                                        if (0 === o) break e;
                                                        o--, (u += n[s++] << l), (l += 8);
                                                    }
                                                    (l -= _), (k = 0), (d = 3 + (7 & (u >>>= _))), (u >>>= 3), (l -= 3);
                                                } else {
                                                    for (z = _ + 7; l < z; ) {
                                                        if (0 === o) break e;
                                                        o--, (u += n[s++] << l), (l += 8);
                                                    }
                                                    (l -= _), (k = 0), (d = 11 + (127 & (u >>>= _))), (u >>>= 7), (l -= 7);
                                                }
                                                if (r.have + d > r.nlen + r.ndist) {
                                                    (e.msg = "invalid bit length repeat"), (r.mode = 30);
                                                    break;
                                                }
                                                for (; d--; ) r.lens[r.have++] = k;
                                            }
                                        }
                                        if (30 === r.mode) break;
                                        if (0 === r.lens[256]) {
                                            (e.msg = "invalid code -- missing end-of-block"), (r.mode = 30);
                                            break;
                                        }
                                        if (((r.lenbits = 9), (S = { bits: r.lenbits }), (x = T(D, r.lens, 0, r.nlen, r.lencode, 0, r.work, S)), (r.lenbits = S.bits), x)) {
                                            (e.msg = "invalid literal/lengths set"), (r.mode = 30);
                                            break;
                                        }
                                        if (((r.distbits = 6), (r.distcode = r.distdyn), (S = { bits: r.distbits }), (x = T(F, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S)), (r.distbits = S.bits), x)) {
                                            (e.msg = "invalid distances set"), (r.mode = 30);
                                            break;
                                        }
                                        if (((r.mode = 20), 6 === t)) break e;
                                    case 20:
                                        r.mode = 21;
                                    case 21:
                                        if (6 <= o && 258 <= h) {
                                            (e.next_out = a), (e.avail_out = h), (e.next_in = s), (e.avail_in = o), (r.hold = u), (r.bits = l), R(e, c), (a = e.next_out), (i = e.output), (h = e.avail_out), (s = e.next_in), (n = e.input), (o = e.avail_in), (u = r.hold), (l = r.bits), 12 === r.mode && (r.back = -1);
                                            break;
                                        }
                                        for (r.back = 0; (g = ((C = r.lencode[u & ((1 << r.lenbits) - 1)]) >>> 16) & 255), (b = 65535 & C), !((_ = C >>> 24) <= l); ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        if (g && 0 == (240 & g)) {
                                            for (v = _, y = g, w = b; (g = ((C = r.lencode[w + ((u & ((1 << (v + y)) - 1)) >> v)]) >>> 16) & 255), (b = 65535 & C), !(v + (_ = C >>> 24) <= l); ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            (u >>>= v), (l -= v), (r.back += v);
                                        }
                                        if (((u >>>= _), (l -= _), (r.back += _), (r.length = b), 0 === g)) {
                                            r.mode = 26;
                                            break;
                                        }
                                        if (32 & g) {
                                            (r.back = -1), (r.mode = 12);
                                            break;
                                        }
                                        if (64 & g) {
                                            (e.msg = "invalid literal/length code"), (r.mode = 30);
                                            break;
                                        }
                                        (r.extra = 15 & g), (r.mode = 22);
                                    case 22:
                                        if (r.extra) {
                                            for (z = r.extra; l < z; ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            (r.length += u & ((1 << r.extra) - 1)), (u >>>= r.extra), (l -= r.extra), (r.back += r.extra);
                                        }
                                        (r.was = r.length), (r.mode = 23);
                                    case 23:
                                        for (; (g = ((C = r.distcode[u & ((1 << r.distbits) - 1)]) >>> 16) & 255), (b = 65535 & C), !((_ = C >>> 24) <= l); ) {
                                            if (0 === o) break e;
                                            o--, (u += n[s++] << l), (l += 8);
                                        }
                                        if (0 == (240 & g)) {
                                            for (v = _, y = g, w = b; (g = ((C = r.distcode[w + ((u & ((1 << (v + y)) - 1)) >> v)]) >>> 16) & 255), (b = 65535 & C), !(v + (_ = C >>> 24) <= l); ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            (u >>>= v), (l -= v), (r.back += v);
                                        }
                                        if (((u >>>= _), (l -= _), (r.back += _), 64 & g)) {
                                            (e.msg = "invalid distance code"), (r.mode = 30);
                                            break;
                                        }
                                        (r.offset = b), (r.extra = 15 & g), (r.mode = 24);
                                    case 24:
                                        if (r.extra) {
                                            for (z = r.extra; l < z; ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            (r.offset += u & ((1 << r.extra) - 1)), (u >>>= r.extra), (l -= r.extra), (r.back += r.extra);
                                        }
                                        if (r.offset > r.dmax) {
                                            (e.msg = "invalid distance too far back"), (r.mode = 30);
                                            break;
                                        }
                                        r.mode = 25;
                                    case 25:
                                        if (0 === h) break e;
                                        if (((d = c - h), r.offset > d)) {
                                            if ((d = r.offset - d) > r.whave && r.sane) {
                                                (e.msg = "invalid distance too far back"), (r.mode = 30);
                                                break;
                                            }
                                            (p = d > r.wnext ? ((d -= r.wnext), r.wsize - d) : r.wnext - d), d > r.length && (d = r.length), (m = r.window);
                                        } else (m = i), (p = a - r.offset), (d = r.length);
                                        for (h < d && (d = h), h -= d, r.length -= d; (i[a++] = m[p++]), --d; );
                                        0 === r.length && (r.mode = 21);
                                        break;
                                    case 26:
                                        if (0 === h) break e;
                                        (i[a++] = r.length), h--, (r.mode = 21);
                                        break;
                                    case 27:
                                        if (r.wrap) {
                                            for (; l < 32; ) {
                                                if (0 === o) break e;
                                                o--, (u |= n[s++] << l), (l += 8);
                                            }
                                            if (((c -= h), (e.total_out += c), (r.total += c), c && (e.adler = r.check = r.flags ? B(r.check, i, c, a - c) : O(r.check, i, c, a - c)), (c = h), (r.flags ? u : L(u)) !== r.check)) {
                                                (e.msg = "incorrect data check"), (r.mode = 30);
                                                break;
                                            }
                                            l = u = 0;
                                        }
                                        r.mode = 28;
                                    case 28:
                                        if (r.wrap && r.flags) {
                                            for (; l < 32; ) {
                                                if (0 === o) break e;
                                                o--, (u += n[s++] << l), (l += 8);
                                            }
                                            if (u !== (4294967295 & r.total)) {
                                                (e.msg = "incorrect length check"), (r.mode = 30);
                                                break;
                                            }
                                            l = u = 0;
                                        }
                                        r.mode = 29;
                                    case 29:
                                        x = 1;
                                        break e;
                                    case 30:
                                        x = -3;
                                        break e;
                                    case 31:
                                        return -4;
                                    case 32:
                                    default:
                                        return U;
                                }
                            return (
                                (e.next_out = a),
                                (e.avail_out = h),
                                (e.next_in = s),
                                (e.avail_in = o),
                                (r.hold = u),
                                (r.bits = l),
                                (r.wsize || (c !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t))) && Z(e, e.output, e.next_out, c - e.avail_out)
                                    ? ((r.mode = 31), -4)
                                    : ((f -= e.avail_in),
                                      (c -= e.avail_out),
                                      (e.total_in += f),
                                      (e.total_out += c),
                                      (r.total += c),
                                      r.wrap && c && (e.adler = r.check = r.flags ? B(r.check, i, c, e.next_out - c) : O(r.check, i, c, e.next_out - c)),
                                      (e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0)),
                                      ((0 == f && 0 === c) || 4 === t) && x === N && (x = -5),
                                      x)
                            );
                        }),
                        (r.inflateEnd = function (e) {
                            if (!e || !e.state) return U;
                            var t = e.state;
                            return t.window && (t.window = null), (e.state = null), N;
                        }),
                        (r.inflateGetHeader = function (e, t) {
                            var r;
                            return e && e.state ? (0 == (2 & (r = e.state).wrap) ? U : (((r.head = t).done = !1), N)) : U;
                        }),
                        (r.inflateSetDictionary = function (e, t) {
                            var r,
                                n = t.length;
                            return e && e.state ? (0 !== (r = e.state).wrap && 11 !== r.mode ? U : 11 === r.mode && O(1, t, n, 0) !== r.check ? -3 : Z(e, t, n, n) ? ((r.mode = 31), -4) : ((r.havedict = 1), N)) : U;
                        }),
                        (r.inflateInfo = "pako inflate (from Nodeca project)");
                },
                { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 },
            ],
            50: [
                function (e, t, r) {
                    "use strict";
                    var D = e("../utils/common"),
                        F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                        N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                        U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                        P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                    t.exports = function (e, t, r, n, i, s, a, o) {
                        var h,
                            u,
                            l,
                            f,
                            c,
                            d,
                            p,
                            m,
                            _,
                            g = o.bits,
                            b = 0,
                            v = 0,
                            y = 0,
                            w = 0,
                            k = 0,
                            x = 0,
                            S = 0,
                            z = 0,
                            C = 0,
                            E = 0,
                            A = null,
                            I = 0,
                            O = new D.Buf16(16),
                            B = new D.Buf16(16),
                            R = null,
                            T = 0;
                        for (b = 0; b <= 15; b++) O[b] = 0;
                        for (v = 0; v < n; v++) O[t[r + v]]++;
                        for (k = g, w = 15; 1 <= w && 0 === O[w]; w--);
                        if ((w < k && (k = w), 0 === w)) return (i[s++] = 20971520), (i[s++] = 20971520), (o.bits = 1), 0;
                        for (y = 1; y < w && 0 === O[y]; y++);
                        for (k < y && (k = y), b = z = 1; b <= 15; b++) if (((z <<= 1), (z -= O[b]) < 0)) return -1;
                        if (0 < z && (0 === e || 1 !== w)) return -1;
                        for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
                        for (v = 0; v < n; v++) 0 !== t[r + v] && (a[B[t[r + v]]++] = v);
                        if (((d = 0 === e ? ((A = R = a), 19) : 1 === e ? ((A = F), (I -= 257), (R = N), (T -= 257), 256) : ((A = U), (R = P), -1)), (b = y), (c = s), (S = v = E = 0), (l = -1), (f = (C = 1 << (x = k)) - 1), (1 === e && 852 < C) || (2 === e && 592 < C))) return 1;
                        for (;;) {
                            for (p = b - S, _ = a[v] < d ? ((m = 0), a[v]) : a[v] > d ? ((m = R[T + a[v]]), A[I + a[v]]) : ((m = 96), 0), h = 1 << (b - S), y = u = 1 << x; (i[c + (E >> S) + (u -= h)] = (p << 24) | (m << 16) | _ | 0), 0 !== u; );
                            for (h = 1 << (b - 1); E & h; ) h >>= 1;
                            if ((0 !== h ? ((E &= h - 1), (E += h)) : (E = 0), v++, 0 == --O[b])) {
                                if (b === w) break;
                                b = t[r + a[v]];
                            }
                            if (k < b && (E & f) !== l) {
                                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, (z <<= 1);
                                if (((C += 1 << x), (1 === e && 852 < C) || (2 === e && 592 < C))) return 1;
                                i[(l = E & f)] = (k << 24) | (x << 16) | (c - s) | 0;
                            }
                        }
                        return 0 !== E && (i[c + E] = ((b - S) << 24) | (64 << 16) | 0), (o.bits = k), 0;
                    };
                },
                { "../utils/common": 41 },
            ],
            51: [
                function (e, t, r) {
                    "use strict";
                    t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
                },
                {},
            ],
            52: [
                function (e, t, r) {
                    "use strict";
                    var i = e("../utils/common"),
                        o = 0,
                        h = 1;
                    function n(e) {
                        for (var t = e.length; 0 <= --t; ) e[t] = 0;
                    }
                    var s = 0,
                        a = 29,
                        u = 256,
                        l = u + 1 + a,
                        f = 30,
                        c = 19,
                        _ = 2 * l + 1,
                        g = 15,
                        d = 16,
                        p = 7,
                        m = 256,
                        b = 16,
                        v = 17,
                        y = 18,
                        w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                        k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                        x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                        S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                        z = new Array(2 * (l + 2));
                    n(z);
                    var C = new Array(2 * f);
                    n(C);
                    var E = new Array(512);
                    n(E);
                    var A = new Array(256);
                    n(A);
                    var I = new Array(a);
                    n(I);
                    var O,
                        B,
                        R,
                        T = new Array(f);
                    function D(e, t, r, n, i) {
                        (this.static_tree = e), (this.extra_bits = t), (this.extra_base = r), (this.elems = n), (this.max_length = i), (this.has_stree = e && e.length);
                    }
                    function F(e, t) {
                        (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
                    }
                    function N(e) {
                        return e < 256 ? E[e] : E[256 + (e >>> 7)];
                    }
                    function U(e, t) {
                        (e.pending_buf[e.pending++] = 255 & t), (e.pending_buf[e.pending++] = (t >>> 8) & 255);
                    }
                    function P(e, t, r) {
                        e.bi_valid > d - r ? ((e.bi_buf |= (t << e.bi_valid) & 65535), U(e, e.bi_buf), (e.bi_buf = t >> (d - e.bi_valid)), (e.bi_valid += r - d)) : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += r));
                    }
                    function L(e, t, r) {
                        P(e, r[2 * t], r[2 * t + 1]);
                    }
                    function j(e, t) {
                        for (var r = 0; (r |= 1 & e), (e >>>= 1), (r <<= 1), 0 < --t; );
                        return r >>> 1;
                    }
                    function Z(e, t, r) {
                        var n,
                            i,
                            s = new Array(g + 1),
                            a = 0;
                        for (n = 1; n <= g; n++) s[n] = a = (a + r[n - 1]) << 1;
                        for (i = 0; i <= t; i++) {
                            var o = e[2 * i + 1];
                            0 !== o && (e[2 * i] = j(s[o]++, o));
                        }
                    }
                    function W(e) {
                        var t;
                        for (t = 0; t < l; t++) e.dyn_ltree[2 * t] = 0;
                        for (t = 0; t < f; t++) e.dyn_dtree[2 * t] = 0;
                        for (t = 0; t < c; t++) e.bl_tree[2 * t] = 0;
                        (e.dyn_ltree[2 * m] = 1), (e.opt_len = e.static_len = 0), (e.last_lit = e.matches = 0);
                    }
                    function M(e) {
                        8 < e.bi_valid ? U(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0);
                    }
                    function H(e, t, r, n) {
                        var i = 2 * t,
                            s = 2 * r;
                        return e[i] < e[s] || (e[i] === e[s] && n[t] <= n[r]);
                    }
                    function G(e, t, r) {
                        for (var n = e.heap[r], i = r << 1; i <= e.heap_len && (i < e.heap_len && H(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !H(t, n, e.heap[i], e.depth)); ) (e.heap[r] = e.heap[i]), (r = i), (i <<= 1);
                        e.heap[r] = n;
                    }
                    function K(e, t, r) {
                        var n,
                            i,
                            s,
                            a,
                            o = 0;
                        if (0 !== e.last_lit) for (; (n = (e.pending_buf[e.d_buf + 2 * o] << 8) | e.pending_buf[e.d_buf + 2 * o + 1]), (i = e.pending_buf[e.l_buf + o]), o++, 0 === n ? L(e, i, t) : (L(e, (s = A[i]) + u + 1, t), 0 !== (a = w[s]) && P(e, (i -= I[s]), a), L(e, (s = N(--n)), r), 0 !== (a = k[s]) && P(e, (n -= T[s]), a)), o < e.last_lit; );
                        L(e, m, t);
                    }
                    function Y(e, t) {
                        var r,
                            n,
                            i,
                            s = t.dyn_tree,
                            a = t.stat_desc.static_tree,
                            o = t.stat_desc.has_stree,
                            h = t.stat_desc.elems,
                            u = -1;
                        for (e.heap_len = 0, e.heap_max = _, r = 0; r < h; r++) 0 !== s[2 * r] ? ((e.heap[++e.heap_len] = u = r), (e.depth[r] = 0)) : (s[2 * r + 1] = 0);
                        for (; e.heap_len < 2; ) (s[2 * (i = e.heap[++e.heap_len] = u < 2 ? ++u : 0)] = 1), (e.depth[i] = 0), e.opt_len--, o && (e.static_len -= a[2 * i + 1]);
                        for (t.max_code = u, r = e.heap_len >> 1; 1 <= r; r--) G(e, s, r);
                        for (i = h; (r = e.heap[1]), (e.heap[1] = e.heap[e.heap_len--]), G(e, s, 1), (n = e.heap[1]), (e.heap[--e.heap_max] = r), (e.heap[--e.heap_max] = n), (s[2 * i] = s[2 * r] + s[2 * n]), (e.depth[i] = (e.depth[r] >= e.depth[n] ? e.depth[r] : e.depth[n]) + 1), (s[2 * r + 1] = s[2 * n + 1] = i), (e.heap[1] = i++), G(e, s, 1), 2 <= e.heap_len; );
                        (e.heap[--e.heap_max] = e.heap[1]),
                            (function (e, t) {
                                var r,
                                    n,
                                    i,
                                    s,
                                    a,
                                    o,
                                    h = t.dyn_tree,
                                    u = t.max_code,
                                    l = t.stat_desc.static_tree,
                                    f = t.stat_desc.has_stree,
                                    c = t.stat_desc.extra_bits,
                                    d = t.stat_desc.extra_base,
                                    p = t.stat_desc.max_length,
                                    m = 0;
                                for (s = 0; s <= g; s++) e.bl_count[s] = 0;
                                for (h[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1; r < _; r++) p < (s = h[2 * h[2 * (n = e.heap[r]) + 1] + 1] + 1) && ((s = p), m++), (h[2 * n + 1] = s), u < n || (e.bl_count[s]++, (a = 0), d <= n && (a = c[n - d]), (o = h[2 * n]), (e.opt_len += o * (s + a)), f && (e.static_len += o * (l[2 * n + 1] + a)));
                                if (0 !== m) {
                                    do {
                                        for (s = p - 1; 0 === e.bl_count[s]; ) s--;
                                        e.bl_count[s]--, (e.bl_count[s + 1] += 2), e.bl_count[p]--, (m -= 2);
                                    } while (0 < m);
                                    for (s = p; 0 !== s; s--) for (n = e.bl_count[s]; 0 !== n; ) u < (i = e.heap[--r]) || (h[2 * i + 1] !== s && ((e.opt_len += (s - h[2 * i + 1]) * h[2 * i]), (h[2 * i + 1] = s)), n--);
                                }
                            })(e, t),
                            Z(s, u, e.bl_count);
                    }
                    function X(e, t, r) {
                        var n,
                            i,
                            s = -1,
                            a = t[1],
                            o = 0,
                            h = 7,
                            u = 4;
                        for (0 === a && ((h = 138), (u = 3)), t[2 * (r + 1) + 1] = 65535, n = 0; n <= r; n++)
                            (i = a), (a = t[2 * (n + 1) + 1]), (++o < h && i === a) || (o < u ? (e.bl_tree[2 * i] += o) : 0 !== i ? (i !== s && e.bl_tree[2 * i]++, e.bl_tree[2 * b]++) : o <= 10 ? e.bl_tree[2 * v]++ : e.bl_tree[2 * y]++, (s = i), (u = (o = 0) === a ? ((h = 138), 3) : i === a ? ((h = 6), 3) : ((h = 7), 4)));
                    }
                    function V(e, t, r) {
                        var n,
                            i,
                            s = -1,
                            a = t[1],
                            o = 0,
                            h = 7,
                            u = 4;
                        for (0 === a && ((h = 138), (u = 3)), n = 0; n <= r; n++)
                            if (((i = a), (a = t[2 * (n + 1) + 1]), !(++o < h && i === a))) {
                                if (o < u) for (; L(e, i, e.bl_tree), 0 != --o; );
                                else 0 !== i ? (i !== s && (L(e, i, e.bl_tree), o--), L(e, b, e.bl_tree), P(e, o - 3, 2)) : o <= 10 ? (L(e, v, e.bl_tree), P(e, o - 3, 3)) : (L(e, y, e.bl_tree), P(e, o - 11, 7));
                                (s = i), (u = (o = 0) === a ? ((h = 138), 3) : i === a ? ((h = 6), 3) : ((h = 7), 4));
                            }
                    }
                    n(T);
                    var q = !1;
                    function J(e, t, r, n) {
                        P(e, (s << 1) + (n ? 1 : 0), 3),
                            (function (e, t, r, n) {
                                M(e), n && (U(e, r), U(e, ~r)), i.arraySet(e.pending_buf, e.window, t, r, e.pending), (e.pending += r);
                            })(e, t, r, !0);
                    }
                    (r._tr_init = function (e) {
                        q ||
                            ((function () {
                                var e,
                                    t,
                                    r,
                                    n,
                                    i,
                                    s = new Array(g + 1);
                                for (n = r = 0; n < a - 1; n++) for (I[n] = r, e = 0; e < 1 << w[n]; e++) A[r++] = n;
                                for (A[r - 1] = n, n = i = 0; n < 16; n++) for (T[n] = i, e = 0; e < 1 << k[n]; e++) E[i++] = n;
                                for (i >>= 7; n < f; n++) for (T[n] = i << 7, e = 0; e < 1 << (k[n] - 7); e++) E[256 + i++] = n;
                                for (t = 0; t <= g; t++) s[t] = 0;
                                for (e = 0; e <= 143; ) (z[2 * e + 1] = 8), e++, s[8]++;
                                for (; e <= 255; ) (z[2 * e + 1] = 9), e++, s[9]++;
                                for (; e <= 279; ) (z[2 * e + 1] = 7), e++, s[7]++;
                                for (; e <= 287; ) (z[2 * e + 1] = 8), e++, s[8]++;
                                for (Z(z, l + 1, s), e = 0; e < f; e++) (C[2 * e + 1] = 5), (C[2 * e] = j(e, 5));
                                (O = new D(z, w, u + 1, l, g)), (B = new D(C, k, 0, f, g)), (R = new D(new Array(0), x, 0, c, p));
                            })(),
                            (q = !0)),
                            (e.l_desc = new F(e.dyn_ltree, O)),
                            (e.d_desc = new F(e.dyn_dtree, B)),
                            (e.bl_desc = new F(e.bl_tree, R)),
                            (e.bi_buf = 0),
                            (e.bi_valid = 0),
                            W(e);
                    }),
                        (r._tr_stored_block = J),
                        (r._tr_flush_block = function (e, t, r, n) {
                            var i,
                                s,
                                a = 0;
                            0 < e.level
                                ? (2 === e.strm.data_type &&
                                      (e.strm.data_type = (function (e) {
                                          var t,
                                              r = 4093624447;
                                          for (t = 0; t <= 31; t++, r >>>= 1) if (1 & r && 0 !== e.dyn_ltree[2 * t]) return o;
                                          if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return h;
                                          for (t = 32; t < u; t++) if (0 !== e.dyn_ltree[2 * t]) return h;
                                          return o;
                                      })(e)),
                                  Y(e, e.l_desc),
                                  Y(e, e.d_desc),
                                  (a = (function (e) {
                                      var t;
                                      for (X(e, e.dyn_ltree, e.l_desc.max_code), X(e, e.dyn_dtree, e.d_desc.max_code), Y(e, e.bl_desc), t = c - 1; 3 <= t && 0 === e.bl_tree[2 * S[t] + 1]; t--);
                                      return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
                                  })(e)),
                                  (i = (e.opt_len + 3 + 7) >>> 3),
                                  (s = (e.static_len + 3 + 7) >>> 3) <= i && (i = s))
                                : (i = s = r + 5),
                                r + 4 <= i && -1 !== t
                                    ? J(e, t, r, n)
                                    : 4 === e.strategy || s === i
                                    ? (P(e, 2 + (n ? 1 : 0), 3), K(e, z, C))
                                    : (P(e, 4 + (n ? 1 : 0), 3),
                                      (function (e, t, r, n) {
                                          var i;
                                          for (P(e, t - 257, 5), P(e, r - 1, 5), P(e, n - 4, 4), i = 0; i < n; i++) P(e, e.bl_tree[2 * S[i] + 1], 3);
                                          V(e, e.dyn_ltree, t - 1), V(e, e.dyn_dtree, r - 1);
                                      })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1),
                                      K(e, e.dyn_ltree, e.dyn_dtree)),
                                W(e),
                                n && M(e);
                        }),
                        (r._tr_tally = function (e, t, r) {
                            return (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255), (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t), (e.pending_buf[e.l_buf + e.last_lit] = 255 & r), e.last_lit++, 0 === t ? e.dyn_ltree[2 * r]++ : (e.matches++, t--, e.dyn_ltree[2 * (A[r] + u + 1)]++, e.dyn_dtree[2 * N(t)]++), e.last_lit === e.lit_bufsize - 1;
                        }),
                        (r._tr_align = function (e) {
                            P(e, 2, 3),
                                L(e, m, z),
                                (function (e) {
                                    16 === e.bi_valid ? (U(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0)) : 8 <= e.bi_valid && ((e.pending_buf[e.pending++] = 255 & e.bi_buf), (e.bi_buf >>= 8), (e.bi_valid -= 8));
                                })(e);
                        });
                },
                { "../utils/common": 41 },
            ],
            53: [
                function (e, t, r) {
                    "use strict";
                    t.exports = function () {
                        (this.input = null), (this.next_in = 0), (this.avail_in = 0), (this.total_in = 0), (this.output = null), (this.next_out = 0), (this.avail_out = 0), (this.total_out = 0), (this.msg = ""), (this.state = null), (this.data_type = 2), (this.adler = 0);
                    };
                },
                {},
            ],
            54: [
                function (e, t, r) {
                    (function (e) {
                        !(function (r, n) {
                            "use strict";
                            if (!r.setImmediate) {
                                var i,
                                    s,
                                    t,
                                    a,
                                    o = 1,
                                    h = {},
                                    u = !1,
                                    l = r.document,
                                    e = Object.getPrototypeOf && Object.getPrototypeOf(r);
                                (e = e && e.setTimeout ? e : r),
                                    (i =
                                        "[object process]" === {}.toString.call(r.process)
                                            ? function (e) {
                                                  process.nextTick(function () {
                                                      c(e);
                                                  });
                                              }
                                            : (function () {
                                                  if (r.postMessage && !r.importScripts) {
                                                      var e = !0,
                                                          t = r.onmessage;
                                                      return (
                                                          (r.onmessage = function () {
                                                              e = !1;
                                                          }),
                                                          r.postMessage("", "*"),
                                                          (r.onmessage = t),
                                                          e
                                                      );
                                                  }
                                              })()
                                            ? ((a = "setImmediate$" + Math.random() + "$"),
                                              r.addEventListener ? r.addEventListener("message", d, !1) : r.attachEvent("onmessage", d),
                                              function (e) {
                                                  r.postMessage(a + e, "*");
                                              })
                                            : r.MessageChannel
                                            ? (((t = new MessageChannel()).port1.onmessage = function (e) {
                                                  c(e.data);
                                              }),
                                              function (e) {
                                                  t.port2.postMessage(e);
                                              })
                                            : l && "onreadystatechange" in l.createElement("script")
                                            ? ((s = l.documentElement),
                                              function (e) {
                                                  var t = l.createElement("script");
                                                  (t.onreadystatechange = function () {
                                                      c(e), (t.onreadystatechange = null), s.removeChild(t), (t = null);
                                                  }),
                                                      s.appendChild(t);
                                              })
                                            : function (e) {
                                                  setTimeout(c, 0, e);
                                              }),
                                    (e.setImmediate = function (e) {
                                        "function" != typeof e && (e = new Function("" + e));
                                        for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++) t[r] = arguments[r + 1];
                                        var n = { callback: e, args: t };
                                        return (h[o] = n), i(o), o++;
                                    }),
                                    (e.clearImmediate = f);
                            }
                            function f(e) {
                                delete h[e];
                            }
                            function c(e) {
                                if (u) setTimeout(c, 0, e);
                                else {
                                    var t = h[e];
                                    if (t) {
                                        u = !0;
                                        try {
                                            !(function (e) {
                                                var t = e.callback,
                                                    r = e.args;
                                                switch (r.length) {
                                                    case 0:
                                                        t();
                                                        break;
                                                    case 1:
                                                        t(r[0]);
                                                        break;
                                                    case 2:
                                                        t(r[0], r[1]);
                                                        break;
                                                    case 3:
                                                        t(r[0], r[1], r[2]);
                                                        break;
                                                    default:
                                                        t.apply(n, r);
                                                }
                                            })(t);
                                        } finally {
                                            f(e), (u = !1);
                                        }
                                    }
                                }
                            }
                            function d(e) {
                                e.source === r && "string" == typeof e.data && 0 === e.data.indexOf(a) && c(+e.data.slice(a.length));
                            }
                        })("undefined" == typeof self ? (void 0 === e ? this : e) : self);
                    }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
                },
                {},
            ],
        },
        {},
        [10]
    )(10);
});
