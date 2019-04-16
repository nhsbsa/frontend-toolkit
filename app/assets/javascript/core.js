(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define('GOVUKFrontend', ['exports'], factory) : (factory((global.GOVUKFrontend = {})));
}(this, (function(exports) {
    'use strict';

    function nodeListForEach(nodes, callback) {
        if (window.NodeList.prototype.forEach) {
            return nodes.forEach(callback)
        }
        for (var i = 0; i < nodes.length; i++) {
            callback.call(window, nodes[i], i, nodes);
        }
    }

    function generateUniqueID() {
        var d = new Date().getTime();
        if (typeof window.performance !== 'undefined' && typeof window.performance.now === 'function') {
            d += window.performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
    }
    (function(undefined) {
        var detect = ('Window' in this);
        if (detect) return
        if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {
            (function(global) {
                if (global.constructor) {
                    global.Window = global.constructor;
                } else {
                    (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
                }
            }(this));
        }
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    (function(undefined) {
        var detect = ("Document" in this);
        if (detect) return
        if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {
            if (this.HTMLDocument) {
                this.Document = this.HTMLDocument;
            } else {
                this.Document = this.HTMLDocument = document.constructor = (new Function('return function Document() {}')());
                this.Document.prototype = document;
            }
        }
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    (function(undefined) {
        var detect = ('Element' in this && 'HTMLElement' in this);
        if (detect) return (function() {
            if (window.Element && !window.HTMLElement) {
                window.HTMLElement = window.Element;
                return;
            }
            window.Element = window.HTMLElement = new Function('return function Element() {}')();
            var vbody = document.appendChild(document.createElement('body'));
            var frame = vbody.appendChild(document.createElement('iframe'));
            var frameDocument = frame.contentWindow.document;
            var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
            var cache = {};
            var shiv = function(element, deep) {
                var
                    childNodes = element.childNodes || [],
                    index = -1,
                    key, value, childNode;
                if (element.nodeType === 1 && element.constructor !== Element) {
                    element.constructor = Element;
                    for (key in cache) {
                        value = cache[key];
                        element[key] = value;
                    }
                }
                while (childNode = deep && childNodes[++index]) {
                    shiv(childNode, deep);
                }
                return element;
            };
            var elements = document.getElementsByTagName('*');
            var nativeCreateElement = document.createElement;
            var interval;
            var loopLimit = 100;
            prototype.attachEvent('onpropertychange', function(event) {
                var
                    propertyName = event.propertyName,
                    nonValue = !cache.hasOwnProperty(propertyName),
                    newValue = prototype[propertyName],
                    oldValue = cache[propertyName],
                    index = -1,
                    element;
                while (element = elements[++index]) {
                    if (element.nodeType === 1) {
                        if (nonValue || element[propertyName] === oldValue) {
                            element[propertyName] = newValue;
                        }
                    }
                }
                cache[propertyName] = newValue;
            });
            prototype.constructor = Element;
            if (!prototype.hasAttribute) {
                prototype.hasAttribute = function hasAttribute(name) {
                    return this.getAttribute(name) !== null;
                };
            }

            function bodyCheck() {
                if (!(loopLimit--)) clearTimeout(interval);
                if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
                    shiv(document, true);
                    if (interval && document.body.prototype) clearTimeout(interval);
                    return (!!document.body.prototype);
                }
                return false;
            }
            if (!bodyCheck()) {
                document.onreadystatechange = bodyCheck;
                interval = setInterval(bodyCheck, 25);
            }
            document.createElement = function createElement(nodeName) {
                var element = nativeCreateElement(String(nodeName).toLowerCase());
                return shiv(element);
            };
            document.removeChild(vbody);
        }());
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    (function(undefined) {
        var detect = ('defineProperty' in Object && (function() {
            try {
                var a = {};
                Object.defineProperty(a, 'test', {
                    value: 42
                });
                return true;
            } catch (e) {
                return false
            }
        }()));
        if (detect) return (function(nativeDefineProperty) {
            var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
            var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
            var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';
            Object.defineProperty = function defineProperty(object, property, descriptor) {
                if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
                    return nativeDefineProperty(object, property, descriptor);
                }
                if (object === null || !(object instanceof Object || typeof object === 'object')) {
                    throw new TypeError('Object.defineProperty called on non-object');
                }
                if (!(descriptor instanceof Object)) {
                    throw new TypeError('Property description must be an object');
                }
                var propertyString = String(property);
                var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
                var getterType = 'get' in descriptor && typeof descriptor.get;
                var setterType = 'set' in descriptor && typeof descriptor.set;
                if (getterType) {
                    if (getterType !== 'function') {
                        throw new TypeError('Getter must be a function');
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    Object.__defineGetter__.call(object, propertyString, descriptor.get);
                } else {
                    object[propertyString] = descriptor.value;
                }
                if (setterType) {
                    if (setterType !== 'function') {
                        throw new TypeError('Setter must be a function');
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    Object.__defineSetter__.call(object, propertyString, descriptor.set);
                }
                if ('value' in descriptor) {
                    object[propertyString] = descriptor.value;
                }
                return object;
            };
        }(Object.defineProperty));
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    (function(undefined) {
        var detect = ((function(global) {
            if (!('Event' in global)) return false;
            if (typeof global.Event === 'function') return true;
            try {
                new Event('click');
                return true;
            } catch (e) {
                return false;
            }
        }(this)));
        if (detect) return (function() {
            var unlistenableWindowEvents = {
                click: 1,
                dblclick: 1,
                keyup: 1,
                keypress: 1,
                keydown: 1,
                mousedown: 1,
                mouseup: 1,
                mousemove: 1,
                mouseover: 1,
                mouseenter: 1,
                mouseleave: 1,
                mouseout: 1,
                storage: 1,
                storagecommit: 1,
                textinput: 1
            };
            if (typeof document === 'undefined' || typeof window === 'undefined') return;

            function indexOf(array, element) {
                var
                    index = -1,
                    length = array.length;
                while (++index < length) {
                    if (index in array && array[index] === element) {
                        return index;
                    }
                }
                return -1;
            }
            var existingProto = (window.Event && window.Event.prototype) || null;
            window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
                if (!type) {
                    throw new Error('Not enough arguments');
                }
                var event;
                if ('createEvent' in document) {
                    event = document.createEvent('Event');
                    var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
                    var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
                    event.initEvent(type, bubbles, cancelable);
                    return event;
                }
                event = document.createEventObject();
                event.type = type;
                event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
                event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
                return event;
            };
            if (existingProto) {
                Object.defineProperty(window.Event, 'prototype', {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: existingProto
                });
            }
            if (!('createEvent' in document)) {
                window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
                    var
                        element = this,
                        type = arguments[0],
                        listener = arguments[1];
                    if (element === window && type in unlistenableWindowEvents) {
                        throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
                    }
                    if (!element._events) {
                        element._events = {};
                    }
                    if (!element._events[type]) {
                        element._events[type] = function(event) {
                            var
                                list = element._events[event.type].list,
                                events = list.slice(),
                                index = -1,
                                length = events.length,
                                eventElement;
                            event.preventDefault = function preventDefault() {
                                if (event.cancelable !== false) {
                                    event.returnValue = false;
                                }
                            };
                            event.stopPropagation = function stopPropagation() {
                                event.cancelBubble = true;
                            };
                            event.stopImmediatePropagation = function stopImmediatePropagation() {
                                event.cancelBubble = true;
                                event.cancelImmediate = true;
                            };
                            event.currentTarget = element;
                            event.relatedTarget = event.fromElement || null;
                            event.target = event.target || event.srcElement || element;
                            event.timeStamp = new Date().getTime();
                            if (event.clientX) {
                                event.pageX = event.clientX + document.documentElement.scrollLeft;
                                event.pageY = event.clientY + document.documentElement.scrollTop;
                            }
                            while (++index < length && !event.cancelImmediate) {
                                if (index in events) {
                                    eventElement = events[index];
                                    if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                                        eventElement.call(element, event);
                                    }
                                }
                            }
                        };
                        element._events[type].list = [];
                        if (element.attachEvent) {
                            element.attachEvent('on' + type, element._events[type]);
                        }
                    }
                    element._events[type].list.push(listener);
                };
                window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
                    var
                        element = this,
                        type = arguments[0],
                        listener = arguments[1],
                        index;
                    if (element._events && element._events[type] && element._events[type].list) {
                        index = indexOf(element._events[type].list, listener);
                        if (index !== -1) {
                            element._events[type].list.splice(index, 1);
                            if (!element._events[type].list.length) {
                                if (element.detachEvent) {
                                    element.detachEvent('on' + type, element._events[type]);
                                }
                                delete element._events[type];
                            }
                        }
                    }
                };
                window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
                    if (!arguments.length) {
                        throw new Error('Not enough arguments');
                    }
                    if (!event || typeof event.type !== 'string') {
                        throw new Error('DOM Events Exception 0');
                    }
                    var element = this,
                        type = event.type;
                    try {
                        if (!event.bubbles) {
                            event.cancelBubble = true;
                            var cancelBubbleEvent = function(event) {
                                event.cancelBubble = true;
                                (element || window).detachEvent('on' + type, cancelBubbleEvent);
                            };
                            this.attachEvent('on' + type, cancelBubbleEvent);
                        }
                        this.fireEvent('on' + type, event);
                    } catch (error) {
                        event.target = element;
                        do {
                            event.currentTarget = element;
                            if ('_events' in element && typeof element._events[type] === 'function') {
                                element._events[type].call(element, event);
                            }
                            if (typeof element['on' + type] === 'function') {
                                element['on' + type].call(element, event);
                            }
                            element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
                        } while (element && !event.cancelBubble);
                    }
                    return true;
                };
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState === 'complete') {
                        document.dispatchEvent(new Event('DOMContentLoaded', {
                            bubbles: true
                        }));
                    }
                });
            }
        }());
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    var KEY_SPACE = 32;

    function Button($module) {
        this.$module = $module;
    }
    Button.prototype.handleKeyDown = function(event) {
        var target = event.target;
        if (target.getAttribute('role') === 'button' && event.keyCode === KEY_SPACE) {
            event.preventDefault();
            target.click();
        }
    };
    Button.prototype.init = function() {
        this.$module.addEventListener('keydown', this.handleKeyDown);
    };
    (function(undefined) {
        var detect = 'bind' in Function.prototype;
        if (detect) return
        Object.defineProperty(Function.prototype, 'bind', {
            value: function bind(that) {
                var $Array = Array;
                var $Object = Object;
                var ObjectPrototype = $Object.prototype;
                var ArrayPrototype = $Array.prototype;
                var Empty = function Empty() {};
                var to_string = ObjectPrototype.toString;
                var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
                var isCallable;
                var fnToStr = Function.prototype.toString,
                    tryFunctionObject = function tryFunctionObject(value) {
                        try {
                            fnToStr.call(value);
                            return true;
                        } catch (e) {
                            return false;
                        }
                    },
                    fnClass = '[object Function]',
                    genClass = '[object GeneratorFunction]';
                isCallable = function isCallable(value) {
                    if (typeof value !== 'function') {
                        return false;
                    }
                    if (hasToStringTag) {
                        return tryFunctionObject(value);
                    }
                    var strClass = to_string.call(value);
                    return strClass === fnClass || strClass === genClass;
                };
                var array_slice = ArrayPrototype.slice;
                var array_concat = ArrayPrototype.concat;
                var array_push = ArrayPrototype.push;
                var max = Math.max;
                var target = this;
                if (!isCallable(target)) {
                    throw new TypeError('Function.prototype.bind called on incompatible ' + target);
                }
                var args = array_slice.call(arguments, 1);
                var bound;
                var binder = function() {
                    if (this instanceof bound) {
                        var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));
                        if ($Object(result) === result) {
                            return result;
                        }
                        return this;
                    } else {
                        return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
                    }
                };
                var boundLength = max(0, target.length - args.length);
                var boundArgs = [];
                for (var i = 0; i < boundLength; i++) {
                    array_push.call(boundArgs, '$' + i);
                }
                bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
                if (target.prototype) {
                    Empty.prototype = target.prototype;
                    bound.prototype = new Empty();
                    Empty.prototype = null;
                }
                return bound;
            }
        });
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    var KEY_ENTER = 13;
    var KEY_SPACE$1 = 32;
    var NATIVE_DETAILS = typeof document.createElement('details').open === 'boolean';

    function Details($module) {
        this.$module = $module;
    }
    Details.prototype.handleInputs = function(node, callback) {
        node.addEventListener('keypress', function(event) {
            var target = event.target;
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_SPACE$1) {
                if (target.nodeName.toLowerCase() === 'summary') {
                    event.preventDefault();
                    if (target.click) {
                        target.click();
                    } else {
                        callback(event);
                    }
                }
            }
        });
        node.addEventListener('keyup', function(event) {
            var target = event.target;
            if (event.keyCode === KEY_SPACE$1) {
                if (target.nodeName.toLowerCase() === 'summary') {
                    event.preventDefault();
                }
            }
        });
        node.addEventListener('click', callback);
    };
    Details.prototype.init = function() {
        var $module = this.$module;
        if (!$module) {
            return
        }
        var $summary = this.$summary = $module.getElementsByTagName('summary').item(0);
        var $content = this.$content = $module.getElementsByTagName('div').item(0);
        if (!$summary || !$content) {
            return
        }
        if (!$content.id) {
            $content.id = 'details-content-' + generateUniqueID();
        }
        $module.setAttribute('role', 'group');
        $summary.setAttribute('role', 'button');
        $summary.setAttribute('aria-controls', $content.id);
        if (!NATIVE_DETAILS) {
            $summary.tabIndex = 0;
        }
        var openAttr = $module.getAttribute('open') !== null;
        if (openAttr === true) {
            $summary.setAttribute('aria-expanded', 'true');
            $content.setAttribute('aria-hidden', 'false');
        } else {
            $summary.setAttribute('aria-expanded', 'false');
            $content.setAttribute('aria-hidden', 'true');
            if (!NATIVE_DETAILS) {
                $content.style.display = 'none';
            }
        }
        this.handleInputs($summary, this.setAttributes.bind(this));
    };
    Details.prototype.setAttributes = function() {
        var $module = this.$module;
        var $summary = this.$summary;
        var $content = this.$content;
        var expanded = $summary.getAttribute('aria-expanded') === 'true';
        var hidden = $content.getAttribute('aria-hidden') === 'true';
        $summary.setAttribute('aria-expanded', (expanded ? 'false' : 'true'));
        $content.setAttribute('aria-hidden', (hidden ? 'false' : 'true'));
        if (!NATIVE_DETAILS) {
            $content.style.display = (expanded ? 'none' : '');
            var hasOpenAttr = $module.getAttribute('open') !== null;
            if (!hasOpenAttr) {
                $module.setAttribute('open', 'open');
            } else {
                $module.removeAttribute('open');
            }
        }
        return true
    };
    Details.prototype.destroy = function(node) {
        node.removeEventListener('keypress');
        node.removeEventListener('keyup');
        node.removeEventListener('click');
    };
    (function(undefined) {
        var detect = ('DOMTokenList' in this && (function(x) {
            return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
        })(document.createElement('x')));
        if (detect) return (function(global) {
            var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;
            if (!nativeImpl || (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList))) {
                global.DOMTokenList = (function() {
                    var dpSupport = true;
                    var defineGetter = function(object, name, fn, configurable) {
                        if (Object.defineProperty)
                            Object.defineProperty(object, name, {
                                configurable: false === dpSupport ? true : !!configurable,
                                get: fn
                            });
                        else object.__defineGetter__(name, fn);
                    };
                    try {
                        defineGetter({}, "support");
                    } catch (e) {
                        dpSupport = false;
                    }
                    var _DOMTokenList = function(el, prop) {
                        var that = this;
                        var tokens = [];
                        var tokenMap = {};
                        var length = 0;
                        var maxLength = 0;
                        var addIndexGetter = function(i) {
                            defineGetter(that, i, function() {
                                preop();
                                return tokens[i];
                            }, false);
                        };
                        var reindex = function() {
                            if (length >= maxLength)
                                for (; maxLength < length; ++maxLength) {
                                    addIndexGetter(maxLength);
                                }
                        };
                        var preop = function() {
                            var error;
                            var i;
                            var args = arguments;
                            var rSpace = /\s+/;
                            if (args.length)
                                for (i = 0; i < args.length; ++i)
                                    if (rSpace.test(args[i])) {
                                        error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                                        error.code = 5;
                                        error.name = "InvalidCharacterError";
                                        throw error;
                                    }
                            if (typeof el[prop] === "object") {
                                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
                            } else {
                                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
                            }
                            if ("" === tokens[0]) tokens = [];
                            tokenMap = {};
                            for (i = 0; i < tokens.length; ++i)
                                tokenMap[tokens[i]] = true;
                            length = tokens.length;
                            reindex();
                        };
                        preop();
                        defineGetter(that, "length", function() {
                            preop();
                            return length;
                        });
                        that.toLocaleString = that.toString = function() {
                            preop();
                            return tokens.join(" ");
                        };
                        that.item = function(idx) {
                            preop();
                            return tokens[idx];
                        };
                        that.contains = function(token) {
                            preop();
                            return !!tokenMap[token];
                        };
                        that.add = function() {
                            preop.apply(that, args = arguments);
                            for (var args, token, i = 0, l = args.length; i < l; ++i) {
                                token = args[i];
                                if (!tokenMap[token]) {
                                    tokens.push(token);
                                    tokenMap[token] = true;
                                }
                            }
                            if (length !== tokens.length) {
                                length = tokens.length >>> 0;
                                if (typeof el[prop] === "object") {
                                    el[prop].baseVal = tokens.join(" ");
                                } else {
                                    el[prop] = tokens.join(" ");
                                }
                                reindex();
                            }
                        };
                        that.remove = function() {
                            preop.apply(that, args = arguments);
                            for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                                ignore[args[i]] = true;
                                delete tokenMap[args[i]];
                            }
                            for (i = 0; i < tokens.length; ++i)
                                if (!ignore[tokens[i]]) t.push(tokens[i]);
                            tokens = t;
                            length = t.length >>> 0;
                            if (typeof el[prop] === "object") {
                                el[prop].baseVal = tokens.join(" ");
                            } else {
                                el[prop] = tokens.join(" ");
                            }
                            reindex();
                        };
                        that.toggle = function(token, force) {
                            preop.apply(that, [token]);
                            if (undefined !== force) {
                                if (force) {
                                    that.add(token);
                                    return true;
                                } else {
                                    that.remove(token);
                                    return false;
                                }
                            }
                            if (tokenMap[token]) {
                                that.remove(token);
                                return false;
                            }
                            that.add(token);
                            return true;
                        };
                        return that;
                    };
                    return _DOMTokenList;
                }());
            }
            (function() {
                var e = document.createElement('span');
                if (!('classList' in e)) return;
                e.classList.toggle('x', false);
                if (!e.classList.contains('x')) return;
                e.classList.constructor.prototype.toggle = function toggle(token) {
                    var force = arguments[1];
                    if (force === undefined) {
                        var add = !this.contains(token);
                        this[add ? 'add' : 'remove'](token);
                        return add;
                    }
                    force = !!force;
                    this[force ? 'add' : 'remove'](token);
                    return force;
                };
            }());
            (function() {
                var e = document.createElement('span');
                if (!('classList' in e)) return;
                e.classList.add('a', 'b');
                if (e.classList.contains('b')) return;
                var native = e.classList.constructor.prototype.add;
                e.classList.constructor.prototype.add = function() {
                    var args = arguments;
                    var l = arguments.length;
                    for (var i = 0; i < l; i++) {
                        native.call(this, args[i]);
                    }
                };
            }());
            (function() {
                var e = document.createElement('span');
                if (!('classList' in e)) return;
                e.classList.add('a');
                e.classList.add('b');
                e.classList.remove('a', 'b');
                if (!e.classList.contains('b')) return;
                var native = e.classList.constructor.prototype.remove;
                e.classList.constructor.prototype.remove = function() {
                    var args = arguments;
                    var l = arguments.length;
                    for (var i = 0; i < l; i++) {
                        native.call(this, args[i]);
                    }
                };
            }());
        }(this));
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
    (function(undefined) {
        var detect = ('document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && (function() {
            var e = document.createElement('span');
            e.classList.add('a', 'b');
            return e.classList.contains('b');
        }()));
        if (detect) return (function(global) {
            var dpSupport = true;
            var defineGetter = function(object, name, fn, configurable) {
                if (Object.defineProperty)
                    Object.defineProperty(object, name, {
                        configurable: false === dpSupport ? true : !!configurable,
                        get: fn
                    });
                else object.__defineGetter__(name, fn);
            };
            try {
                defineGetter({}, "support");
            } catch (e) {
                dpSupport = false;
            }
            var addProp = function(o, name, attr) {
                defineGetter(o.prototype, name, function() {
                    var tokenList;
                    var THIS = this,
                        gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
                    if (THIS[gibberishProperty]) return tokenList;
                    THIS[gibberishProperty] = true;
                    if (false === dpSupport) {
                        var visage;
                        var mirror = addProp.mirror || document.createElement("div");
                        var reflections = mirror.childNodes;
                        var l = reflections.length;
                        for (var i = 0; i < l; ++i)
                            if (reflections[i]._R === THIS) {
                                visage = reflections[i];
                                break;
                            }
                        visage || (visage = mirror.appendChild(document.createElement("div")));
                        tokenList = DOMTokenList.call(visage, THIS, attr);
                    } else tokenList = new DOMTokenList(THIS, attr);
                    defineGetter(THIS, name, function() {
                        return tokenList;
                    });
                    delete THIS[gibberishProperty];
                    return tokenList;
                }, true);
            };
            addProp(global.Element, "classList", "className");
            addProp(global.HTMLElement, "classList", "className");
            addProp(global.HTMLLinkElement, "relList", "rel");
            addProp(global.HTMLAnchorElement, "relList", "rel");
            addProp(global.HTMLAreaElement, "relList", "rel");
        }(this));
    }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

    function Checkboxes($module) {
        this.$module = $module;
        this.$inputs = $module.querySelectorAll('input[type="checkbox"]');
    }
    Checkboxes.prototype.init = function() {
        var $module = this.$module;
        var $inputs = this.$inputs;
        nodeListForEach($inputs, function($input) {
            var controls = $input.getAttribute('data-aria-controls');
            if (!controls || !$module.querySelector('#' + controls)) {
                return
            }
            $input.setAttribute('aria-controls', controls);
            $input.removeAttribute('data-aria-controls');
            this.setAttributes($input);
        }.bind(this));
        $module.addEventListener('click', this.handleClick.bind(this));
    };
    Checkboxes.prototype.setAttributes = function($input) {
        var inputIsChecked = $input.checked;
        $input.setAttribute('aria-expanded', inputIsChecked);
        var $content = document.querySelector('#' + $input.getAttribute('aria-controls'));
        $content.classList.toggle('govuk-checkboxes__conditional--hidden', !inputIsChecked);
    };
    Checkboxes.prototype.handleClick = function(event) {
        var $target = event.target;
        var isCheckbox = $target.getAttribute('type') === 'checkbox';
        var hasAriaControls = $target.getAttribute('aria-controls');
        if (isCheckbox && hasAriaControls) {
            this.setAttributes($target);
        }
    };

    function ErrorSummary($module) {
        this.$module = $module;
    }
    ErrorSummary.prototype.init = function() {
        var $module = this.$module;
        if (!$module) {
            return
        }
        window.addEventListener('load', function() {
            $module.focus();
        });
    };

    function Header($module) {
        this.$module = $module;
    }
    Header.prototype.init = function() {
        var $module = this.$module;
        if (!$module) {
            return
        }
        var $toggleButton = $module.querySelector('.js-header-toggle');
        if (!$toggleButton) {
            return
        }
        $toggleButton.addEventListener('click', this.handleClick.bind(this));
    };
    Header.prototype.toggleClass = function(node, className) {
        if (node.className.indexOf(className) > 0) {
            node.className = node.className.replace(' ' + className, '');
        } else {
            node.className += ' ' + className;
        }
    };
    Header.prototype.handleClick = function(event) {
        var $module = this.$module;
        var $toggleButton = event.target || event.srcElement;
        var $target = $module.querySelector('#' + $toggleButton.getAttribute('aria-controls'));
        if ($toggleButton && $target) {
            this.toggleClass($target, 'govuk-header__navigation--open');
            this.toggleClass($toggleButton, 'govuk-header__menu-button--open');
            $toggleButton.setAttribute('aria-expanded', $toggleButton.getAttribute('aria-expanded') !== 'true');
            $target.setAttribute('aria-hidden', $target.getAttribute('aria-hidden') === 'false');
        }
    };

    function Radios($module) {
        this.$module = $module;
        this.$inputs = $module.querySelectorAll('input[type="radio"]');
    }
    Radios.prototype.init = function() {
        var $module = this.$module;
        var $inputs = this.$inputs;
        nodeListForEach($inputs, function($input) {
            var controls = $input.getAttribute('data-aria-controls');
            if (!controls || !$module.querySelector('#' + controls)) {
                return
            }
            $input.setAttribute('aria-controls', controls);
            $input.removeAttribute('data-aria-controls');
            this.setAttributes($input);
        }.bind(this));
        $module.addEventListener('click', this.handleClick.bind(this));
    };
    Radios.prototype.setAttributes = function($input) {
        var inputIsChecked = $input.checked;
        $input.setAttribute('aria-expanded', inputIsChecked);
        var $content = document.querySelector('#' + $input.getAttribute('aria-controls'));
        $content.classList.toggle('govuk-radios__conditional--hidden', !inputIsChecked);
    };
    Radios.prototype.handleClick = function(event) {
        nodeListForEach(this.$inputs, function($input) {
            var isRadio = $input.getAttribute('type') === 'radio';
            var hasAriaControls = $input.getAttribute('aria-controls');
            if (isRadio && hasAriaControls) {
                this.setAttributes($input);
            }
        }.bind(this));
    };

    function Tabs($module) {
        this.$module = $module;
        this.$tabs = $module.querySelectorAll('.govuk-tabs__tab');
        this.keys = {
            left: 37,
            right: 39,
            up: 38,
            down: 40
        };
        this.jsHiddenClass = 'govuk-tabs__panel--hidden';
    }
    Tabs.prototype.init = function() {
        if (typeof window.matchMedia === 'function') {
            this.setupResponsiveChecks();
        } else {
            this.setup();
        }
    };
    Tabs.prototype.setupResponsiveChecks = function() {
        this.mql = window.matchMedia('(min-width: 40.0625em)');
        this.mql.addListener(this.checkMode.bind(this));
        this.checkMode();
    };
    Tabs.prototype.checkMode = function() {
        if (this.mql.matches) {
            this.setup();
        } else {
            this.teardown();
        }
    };
    Tabs.prototype.setup = function() {
        var $module = this.$module;
        var $tabs = this.$tabs;
        var $tabList = $module.querySelector('.govuk-tabs__list');
        var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item');
        if (!$tabs || !$tabList || !$tabListItems) {
            return
        }
        $tabList.setAttribute('role', 'tablist');
        nodeListForEach($tabListItems, function($item) {
            $item.setAttribute('role', 'presentation');
        });
        nodeListForEach($tabs, function($tab) {
            this.setAttributes($tab);
            $tab.boundTabClick = this.onTabClick.bind(this);
            $tab.boundTabKeydown = this.onTabKeydown.bind(this);
            $tab.addEventListener('click', $tab.boundTabClick, true);
            $tab.addEventListener('keydown', $tab.boundTabKeydown, true);
            this.hideTab($tab);
        }.bind(this));
        var $activeTab = this.getTab(window.location.hash) || this.$tabs[0];
        this.showTab($activeTab);
        $module.boundOnHashChange = this.onHashChange.bind(this);
        window.addEventListener('hashchange', $module.boundOnHashChange, true);
    };
    Tabs.prototype.teardown = function() {
        var $module = this.$module;
        var $tabs = this.$tabs;
        var $tabList = $module.querySelector('.govuk-tabs__list');
        var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item');
        if (!$tabs || !$tabList || !$tabListItems) {
            return
        }
        $tabList.removeAttribute('role');
        nodeListForEach($tabListItems, function($item) {
            $item.removeAttribute('role', 'presentation');
        });
        nodeListForEach($tabs, function($tab) {
            $tab.removeEventListener('click', $tab.boundTabClick, true);
            $tab.removeEventListener('keydown', $tab.boundTabKeydown, true);
            this.unsetAttributes($tab);
        }.bind(this));
        window.removeEventListener('hashchange', $module.boundOnHashChange, true);
    };
    Tabs.prototype.onHashChange = function(e) {
        var hash = window.location.hash;
        if (!this.hasTab(hash)) {
            return
        }
        if (this.changingHash) {
            this.changingHash = false;
            return
        }
        var $previousTab = this.getCurrentTab();
        var $activeTab = this.getTab(hash) || this.$tabs[0];
        this.hideTab($previousTab);
        this.showTab($activeTab);
        $activeTab.focus();
    };
    Tabs.prototype.hasTab = function(hash) {
        return this.$module.querySelector(hash)
    };
    Tabs.prototype.hideTab = function($tab) {
        this.unhighlightTab($tab);
        this.hidePanel($tab);
    };
    Tabs.prototype.showTab = function($tab) {
        this.highlightTab($tab);
        this.showPanel($tab);
    };
    Tabs.prototype.getTab = function(hash) {
        return this.$module.querySelector('a[role="tab"][href="' + hash + '"]')
    };
    Tabs.prototype.setAttributes = function($tab) {
        var panelId = this.getHref($tab).slice(1);
        $tab.setAttribute('id', 'tab_' + panelId);
        $tab.setAttribute('role', 'tab');
        $tab.setAttribute('aria-controls', panelId);
        $tab.setAttribute('tabindex', '-1');
        var $panel = this.getPanel($tab);
        $panel.setAttribute('role', 'tabpanel');
        $panel.setAttribute('aria-labelledby', $tab.id);
        $panel.classList.add(this.jsHiddenClass);
    };
    Tabs.prototype.unsetAttributes = function($tab) {
        $tab.removeAttribute('id');
        $tab.removeAttribute('role');
        $tab.removeAttribute('aria-controls');
        $tab.removeAttribute('tabindex');
        var $panel = this.getPanel($tab);
        $panel.removeAttribute('role');
        $panel.removeAttribute('aria-labelledby');
        $panel.classList.remove(this.jsHiddenClass);
    };
    Tabs.prototype.onTabClick = function(e) {
        e.preventDefault();
        var $newTab = e.target;
        var $currentTab = this.getCurrentTab();
        this.hideTab($currentTab);
        this.showTab($newTab);
        this.createHistoryEntry($newTab);
    };
    Tabs.prototype.createHistoryEntry = function($tab) {
        var $panel = this.getPanel($tab);
        var id = $panel.id;
        $panel.id = '';
        this.changingHash = true;
        window.location.hash = this.getHref($tab).slice(1);
        $panel.id = id;
    };
    Tabs.prototype.onTabKeydown = function(e) {
        switch (e.keyCode) {
            case this.keys.left:
            case this.keys.up:
                this.activatePreviousTab();
                e.preventDefault();
                break
            case this.keys.right:
            case this.keys.down:
                this.activateNextTab();
                e.preventDefault();
                break
        }
    };
    Tabs.prototype.activateNextTab = function() {
        var currentTab = this.getCurrentTab();
        var nextTabListItem = currentTab.parentNode.nextElementSibling;
        if (nextTabListItem) {
            var nextTab = nextTabListItem.firstElementChild;
        }
        if (nextTab) {
            this.hideTab(currentTab);
            this.showTab(nextTab);
            nextTab.focus();
            this.createHistoryEntry(nextTab);
        }
    };
    Tabs.prototype.activatePreviousTab = function() {
        var currentTab = this.getCurrentTab();
        var previousTabListItem = currentTab.parentNode.previousElementSibling;
        if (previousTabListItem) {
            var previousTab = previousTabListItem.firstElementChild;
        }
        if (previousTab) {
            this.hideTab(currentTab);
            this.showTab(previousTab);
            previousTab.focus();
            this.createHistoryEntry(previousTab);
        }
    };
    Tabs.prototype.getPanel = function($tab) {
        var $panel = this.$module.querySelector(this.getHref($tab));
        return $panel
    };
    Tabs.prototype.showPanel = function($tab) {
        var $panel = this.getPanel($tab);
        $panel.classList.remove(this.jsHiddenClass);
    };
    Tabs.prototype.hidePanel = function(tab) {
        var $panel = this.getPanel(tab);
        $panel.classList.add(this.jsHiddenClass);
    };
    Tabs.prototype.unhighlightTab = function($tab) {
        $tab.setAttribute('aria-selected', 'false');
        $tab.classList.remove('govuk-tabs__tab--selected');
        $tab.setAttribute('tabindex', '-1');
    };
    Tabs.prototype.highlightTab = function($tab) {
        $tab.setAttribute('aria-selected', 'true');
        $tab.classList.add('govuk-tabs__tab--selected');
        $tab.setAttribute('tabindex', '0');
    };
    Tabs.prototype.getCurrentTab = function() {
        return this.$module.querySelector('.govuk-tabs__tab--selected')
    };
    Tabs.prototype.getHref = function($tab) {
        var href = $tab.getAttribute('href');
        var hash = href.slice(href.indexOf('#'), href.length);
        return hash
    };

    function initAll() {
        new Button(document).init();
        var $details = document.querySelectorAll('details');
        nodeListForEach($details, function($detail) {
            new Details($detail).init();
        });
        var $checkboxes = document.querySelectorAll('[data-module="checkboxes"]');
        nodeListForEach($checkboxes, function($checkbox) {
            new Checkboxes($checkbox).init();
        });
        var $errorSummary = document.querySelector('[data-module="error-summary"]');
        new ErrorSummary($errorSummary).init();
        var $toggleButton = document.querySelector('[data-module="header"]');
        new Header($toggleButton).init();
        var $radios = document.querySelectorAll('[data-module="radios"]');
        nodeListForEach($radios, function($radio) {
            new Radios($radio).init();
        });
        var $tabs = document.querySelectorAll('[data-module="tabs"]');
        nodeListForEach($tabs, function($tabs) {
            new Tabs($tabs).init();
        });
    }
    exports.initAll = initAll;
    exports.Button = Button;
    exports.Details = Details;
    exports.Checkboxes = Checkboxes;
    exports.ErrorSummary = ErrorSummary;
    exports.Header = Header;
    exports.Radios = Radios;
    exports.Tabs = Tabs;
})));
window.GOVUKFrontend.initAll();