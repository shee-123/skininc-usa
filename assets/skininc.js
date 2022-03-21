/*
         IMPORTANT NOTE:

         This file is the unminified JS that is used by the theme. This file is therefore not included into the "theme.liquid" Liquid. It is bundled only
         for developers who would like to add their own JavaScript or edit the existing JavaScript. Re-minifying the ile and make sure you include it into
         the "theme.liquid" is up to the developers responsibility.

         Because we are using WebPack internally to bundle our JavaScript code, even the unminified file can be quite hard to read or edit due to all the
         code added by WebPack.

         Please note that we do not provide any assistance for changes made here that may break the theme: it's at your own risk :).
      */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 55);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * Various DOM helper
   */

  var Dom = function () {
    function Dom() {
      _classCallCheck(this, Dom);
    }

    _createClass(Dom, null, [{
      key: 'getSiblings',

      /**
       * Get all the previous and next siblings, optionally filtered by a selector
       */
      value: function getSiblings(element, filter) {
        var includeSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var siblings = [];
        var currentElement = element;

        // Do the previous first
        while (currentElement = currentElement.previousElementSibling) {
          if (!filter || currentElement.matches(filter)) {
            siblings.push(currentElement);
          }
        }

        if (includeSelf) {
          siblings.push(element);
        }

        // Then the next side
        currentElement = element;

        while (currentElement = currentElement.nextElementSibling) {
          if (!filter || currentElement.matches(filter)) {
            siblings.push(currentElement);
          }
        }

        return siblings;
      }

      /**
       * By default, NodeList object are only iterable with forEach on newest browsers. To support it cross-browser,
       * we need to normalize it
       */

    }, {
      key: 'nodeListToArray',
      value: function nodeListToArray(nodeList, filter) {
        var items = [];

        for (var i = 0; i !== nodeList.length; ++i) {
          if (!filter || nodeList[i].matches(filter)) {
            items.push(nodeList[i]);
          }
        }

        return items;
      }

      /**
       * Calculate an element width with its margin
       */

    }, {
      key: 'outerWidthWithMargin',
      value: function outerWidthWithMargin(element) {
        var width = element.offsetWidth,
            style = getComputedStyle(element);

        width += parseInt(style.marginLeft) + parseInt(style.marginRight);

        return width;
      }
    }]);

    return Dom;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Dom;

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Responsive__ = __webpack_require__(2);

  var Carousel = function () {
    function Carousel(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Carousel);

      this.element = element;
      this.initialConfig = JSON.parse(element.getAttribute('data-flickity-config'));
      this.options = options;

      this._attachListeners();
      this._build();
    }

    _createClass(Carousel, [{
      key: 'destroy',
      value: function destroy() {
        this.flickityInstance.destroy();

        if (this.initialConfig['breakpoints'] !== undefined) {
          document.removeEventListener('breakpoint:changed', this._onBreakpointChangedListener);
        }
      }
    }, {
      key: 'selectCell',
      value: function selectCell(index) {
        var shouldPause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var shouldAnimate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (shouldPause) {
          this.flickityInstance.pausePlayer();
        }

        this.flickityInstance.select(index, false, !shouldAnimate);
      }
    }, {
      key: 'pausePlayer',
      value: function pausePlayer() {
        this.flickityInstance.pausePlayer();
      }
    }, {
      key: 'unpausePlayer',
      value: function unpausePlayer() {
        this.flickityInstance.unpausePlayer();
      }
    }, {
      key: 'resize',
      value: function resize() {
        this.flickityInstance.resize();
      }
    }, {
      key: 'getSelectedIndex',
      value: function getSelectedIndex() {
        return this.flickityInstance.selectedIndex;
      }
    }, {
      key: 'getSelectedCell',
      value: function getSelectedCell() {
        return this.flickityInstance.selectedCell.element;
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        if (this.initialConfig['breakpoints'] !== undefined) {
          this._onBreakpointChangedListener = this._onBreakpointChanged.bind(this);
          document.addEventListener('breakpoint:changed', this._onBreakpointChangedListener);
        }
      }

      /**
       * Create the carousel instance
       */

    }, {
      key: '_build',
      value: function _build() {
        var _this = this;

        var config = this._processConfig();

        this.flickityInstance = new Flickity(this.element, config);
        this._validateDraggable();

        this.selectedIndex = this.flickityInstance.selectedIndex;

        this.flickityInstance.on('resize', this._validateDraggable.bind(this));

        if (this.options['onSelect']) {
          this.flickityInstance.on('select', function () {
            // Flickity will send the "select" event whenever the window resize (even on mobile...), as a consequence we need to check
            // first if the slide index have changed or not (cf: https://github.com/metafizzy/flickity/issues/529)

            if (_this.selectedIndex !== _this.flickityInstance.selectedIndex) {
              _this.options['onSelect'](_this.flickityInstance.selectedIndex, _this.flickityInstance.selectedCell.element);
              _this.selectedIndex = _this.flickityInstance.selectedIndex;
            }
          });
        }

        if (this.options['onClick']) {
          this.flickityInstance.on('staticClick', function (event, pointer, cell, index) {
            _this.options['onClick'](cell, index);
          });
        }
      }

      /**
       * By default, Flickity does not disable draggable automatically if there is nothing to slide. We therefore manually do the check here by checking
       * if the displayed elements equals to the amount of elements
       */

    }, {
      key: '_validateDraggable',
      value: function _validateDraggable() {
        var isActive = this.flickityInstance.isActive || false;

        if (!isActive || !this.flickityInstance.options['draggable']) {
          return; // Not draggable, so nothing to do
        }

        if (undefined === this.flickityInstance.selectedElements || this.flickityInstance.selectedElements.length === this.flickityInstance.cells.length) {
          this.flickityInstance.unbindDrag();
        } else {
          this.flickityInstance.bindDrag();
        }
      }

      /**
       * Flickity is a CSS driven library and hence it is hard to setup some stuff in pure JS
       */

    }, {
      key: '_processConfig',
      value: function _processConfig() {
        var config = Object.assign({}, this.initialConfig);

        delete config['breakpoints'];

        if (this.initialConfig['breakpoints'] === undefined) {
          return config; // No change, we simply return the config as it is
        }

        var breakpoints = this.initialConfig['breakpoints'];

        breakpoints.forEach(function (breakpoint) {
          if (__WEBPACK_IMPORTED_MODULE_0__helper_Responsive__["default"].matchesBreakpoint(breakpoint['matches'])) {
            config = Object.assign(config, breakpoint['settings']);
          }
        });

        return config;
      }

      /**
       * Verify if the breakpoint has changed, and optionally update the carousel
       */

    }, {
      key: '_onBreakpointChanged',
      value: function _onBreakpointChanged() {
        // The breakpoint may have changed, so we delete the carousel and rebuild it
        this.flickityInstance.destroy();
        this._build();
      }
    }]);

    return Carousel;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Carousel;

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var Responsive = function () {
    function Responsive() {
      var _this2 = this;

      _classCallCheck(this, Responsive);

      this.currentBreakpoint = Responsive.getCurrentBreakpoint();

      window.addEventListener('resize', function () {
        var newBreakpoint = Responsive.getCurrentBreakpoint();

        if (_this2.currentBreakpoint === newBreakpoint) {
          return;
        }

        document.dispatchEvent(new CustomEvent('breakpoint:changed', { detail: {
            previousBreakpoint: _this2.currentBreakpoint,
            currentBreakpoint: newBreakpoint
          } }));

        _this2.currentBreakpoint = newBreakpoint;
      });
    }

    _createClass(Responsive, null, [{
      key: 'matchesBreakpoint',
      value: function matchesBreakpoint(breakpoint) {
        switch (breakpoint) {
          case 'phone':
            return window.matchMedia('screen and (max-width: 640px)').matches;

          case 'tablet':
            return window.matchMedia('screen and (min-width: 641px) and (max-width: 1007px)').matches;

          case 'tablet-and-up':
            return window.matchMedia('screen and (min-width: 641px)').matches;

          case 'pocket':
            return window.matchMedia('screen and (max-width: 1007px)').matches;

          case 'lap':
            return window.matchMedia('screen and (min-width: 1008px) and (max-width: 1279px)').matches;

          case 'lap-and-up':
            return window.matchMedia('screen and (min-width: 1008px)').matches;

          case 'desk':
            return window.matchMedia('screen and (min-width: 1280px)').matches;

          case 'widescreen':
            return window.matchMedia('screen and (min-width: 1600px)').matches;
        }
      }
    }, {
      key: 'getCurrentBreakpoint',
      value: function getCurrentBreakpoint() {
        if (window.matchMedia('screen and (max-width: 640px)').matches) {
          return 'phone';
        }

        if (window.matchMedia('screen and (min-width: 641px) and (max-width: 1007px)').matches) {
          return 'tablet';
        }

        if (window.matchMedia('screen and (min-width: 1008px) and (max-width: 1279px)').matches) {
          return 'lap';
        }

        if (window.matchMedia('screen and (min-width: 1280px)').matches) {
          return 'desk';
        }
      }
    }]);

    return Responsive;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Responsive;

  /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var Accessibility = function () {
    function Accessibility() {
      _classCallCheck(this, Accessibility);
    }

    _createClass(Accessibility, null, [{
      key: 'trapFocus',

      /**
       * Traps the focus in a particular container
       */
      value: function trapFocus(container, namespace) {
        this.listeners = this.listeners || {};

        // We check if there is an element with the attribute "autofocus"
        var elementToFocus = container.querySelector('[autofocus]') || container;

        container.setAttribute('tabindex', '-1');
        elementToFocus.focus();

        this.listeners[namespace] = function (event) {
          if (container !== event.target && !container.contains(event.target)) {
            container.focus();
          }
        };

        document.addEventListener('focusin', this.listeners[namespace]);
      }

      /**
       * Removes the trap of focus in a particular container
       */

    }, {
      key: 'removeTrapFocus',
      value: function removeTrapFocus(container, namespace) {
        if (container) {
          container.removeAttribute('tabindex');
        }

        document.removeEventListener('focusin', this.listeners[namespace]);
      }

      /**
       * Reset any previous trap focus
       */

    }, {
      key: 'clearTrapFocus',
      value: function clearTrapFocus() {
        for (var key in this.listeners) {
          if (this.listeners.hasOwnProperty(key)) {
            document.removeEventListener('focusin', this.listeners[key]);
          }
        }

        this.listeners = {};
      }
    }]);

    return Accessibility;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Accessibility;

  /***/
},
/* 4 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * Note: this was a feature that was added at the very end and couldn't do something much cleaner without rewriting large parts of the theme...
   */

  var ProductItemColorSwatch = function () {
    function ProductItemColorSwatch(element) {
      _classCallCheck(this, ProductItemColorSwatch);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);

      this.delegateElement.on('change', '.ColorSwatch__Radio', this._colorChanged.bind(this));
    }

    _createClass(ProductItemColorSwatch, [{
      key: '_colorChanged',
      value: function _colorChanged(event, target) {
        // We need to change the URL of the various links
        var productItem = target.closest('.ProductItem'),
            variantUrl = target.getAttribute('data-variant-url');

        productItem.querySelector('.ProductItem__ImageWrapper').setAttribute('href', variantUrl);
        productItem.querySelector('.ProductItem__Title > a').setAttribute('href', variantUrl);

        // If we have a custom image for the variant, we change it
        var originalImageElement = productItem.querySelector('.ProductItem__Image:not(.ProductItem__Image--alternate)');

        if (target.hasAttribute('data-image-url') && target.getAttribute('data-image-id') !== originalImageElement.getAttribute('data-image-id')) {
          var newImageElement = document.createElement('img');
          newImageElement.className = 'ProductItem__Image Image--fadeIn Image--lazyLoad';
          newImageElement.setAttribute('data-image-id', target.getAttribute('data-image-id'));
          newImageElement.setAttribute('data-src', target.getAttribute('data-image-url'));
          newImageElement.setAttribute('data-widths', target.getAttribute('data-image-widths'));
          newImageElement.setAttribute('data-sizes', 'auto');

          // Replace the original node
          if (window.theme.productImageSize === 'natural') {
            originalImageElement.parentNode.style.paddingBottom = 100.0 / target.getAttribute('data-image-aspect-ratio') + '%';
          }

          originalImageElement.parentNode.style.setProperty('--aspect-ratio', target.getAttribute('data-image-aspect-ratio'));
          originalImageElement.parentNode.replaceChild(newImageElement, originalImageElement);
        }
      }
    }]);

    return ProductItemColorSwatch;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ProductItemColorSwatch;

  /***/
},
/* 5 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Dom__ = __webpack_require__(0);

  var Currency = function () {
    function Currency() {
      _classCallCheck(this, Currency);
    }

    _createClass(Currency, null, [{
      key: 'formatMoney',

      /**
       * Format money values based on your shop currency settings
       *
       * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents or 3.00 dollars
       * @param  {String} format - shop money_format setting
       * @return {String} value - formatted value
       */
      value: function formatMoney(cents, format) {
        if (typeof cents === 'string') {
          cents = cents.replace('.', '');
        }

        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
            formatString = format || '${{amount}}';

        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
          precision = defaultTo(precision, 2);
          thousands = defaultTo(thousands, ',');
          decimal = defaultTo(decimal, '.');

          if (isNaN(number) || number == null) {
            return 0;
          }

          number = (number / 100.0).toFixed(precision);

          var parts = number.split('.'),
              dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
              centsAmount = parts[1] ? decimal + parts[1] : '';

          return dollarsAmount + centsAmount;
        }

        var value = '';

        switch (formatString.match(placeholderRegex)[1]) {
          case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
          case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
          case 'amount_with_space_separator':
            value = formatWithDelimiters(cents, 2, ' ', '.');
            break;
          case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, ',', '.');
            break;
          case 'amount_no_decimals_with_space_separator':
            value = formatWithDelimiters(cents, 0, ' ');
            break;
          case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        }

        if (formatString.indexOf('with_comma_separator') !== -1) {
          return formatString.replace(placeholderRegex, value).replace(',00', '');
        } else {
          return formatString.replace(placeholderRegex, value).replace('.00', '');
        }
      }

      /**
       * Allow to converts all elements from one currency to another. To speed up, you can pass a selector that will
       * act as the root element
       */

    }, {
      key: 'convertAll',
      value: function convertAll(selector) {
        var _this3 = this;

        var moneyFormats = {
          "USD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} USD"
          },
          "EUR": {
            "money_format": "&euro;{{amount}}",
            "money_with_currency_format": "&euro;{{amount}} EUR"
          },
          "GBP": {
            "money_format": "&pound;{{amount}}",
            "money_with_currency_format": "&pound;{{amount}} GBP"
          },
          "CAD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} CAD"
          },
          "ALL": {
            "money_format": "Lek {{amount}}",
            "money_with_currency_format": "Lek {{amount}} ALL"
          },
          "DZD": {
            "money_format": "DA {{amount}}",
            "money_with_currency_format": "DA {{amount}} DZD"
          },
          "AOA": {
            "money_format": "Kz{{amount}}",
            "money_with_currency_format": "Kz{{amount}} AOA"
          },
          "ARS": {
            "money_format": "${{amount_with_comma_separator}}",
            "money_with_currency_format": "${{amount_with_comma_separator}} ARS"
          },
          "AMD": {
            "money_format": "{{amount}} AMD",
            "money_with_currency_format": "{{amount}} AMD"
          },
          "AWG": {
            "money_format": "Afl{{amount}}",
            "money_with_currency_format": "Afl{{amount}} AWG"
          },
          "AUD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} AUD"
          },
          "BBD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} Bds"
          },
          "AZN": {
            "money_format": "m.{{amount}}",
            "money_with_currency_format": "m.{{amount}} AZN"
          },
          "BDT": {
            "money_format": "Tk {{amount}}",
            "money_with_currency_format": "Tk {{amount}} BDT"
          },
          "BSD": {
            "money_format": "BS${{amount}}",
            "money_with_currency_format": "BS${{amount}} BSD"
          },
          "BHD": {
            "money_format": "{{amount}} BD",
            "money_with_currency_format": "{{amount}} BHD"
          },
          "BYR": {
            "money_format": "Br {{amount}}",
            "money_with_currency_format": "Br {{amount}} BYR"
          },
          "BZD": {
            "money_format": "BZ${{amount}}",
            "money_with_currency_format": "BZ${{amount}} BZD"
          },
          "BTN": {
            "money_format": "Nu {{amount}}",
            "money_with_currency_format": "Nu {{amount}} BTN"
          },
          "BAM": {
            "money_format": "KM {{amount_with_comma_separator}}",
            "money_with_currency_format": "KM {{amount_with_comma_separator}} BAM"
          },
          "BRL": {
            "money_format": "R$ {{amount_with_comma_separator}}",
            "money_with_currency_format": "R$ {{amount_with_comma_separator}} BRL"
          },
          "BOB": {
            "money_format": "Bs{{amount_with_comma_separator}}",
            "money_with_currency_format": "Bs{{amount_with_comma_separator}} BOB"
          },
          "BWP": {
            "money_format": "P{{amount}}",
            "money_with_currency_format": "P{{amount}} BWP"
          },
          "BND": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} BND"
          },
          "BGN": {
            "money_format": "{{amount}} Ð»Ð²",
            "money_with_currency_format": "{{amount}} Ð»Ð² BGN"
          },
          "MMK": {
            "money_format": "K{{amount}}",
            "money_with_currency_format": "K{{amount}} MMK"
          },
          "KHR": {
            "money_format": "KHR{{amount}}",
            "money_with_currency_format": "KHR{{amount}}"
          },
          "KYD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} KYD"
          },
          "XAF": {
            "money_format": "FCFA{{amount}}",
            "money_with_currency_format": "FCFA{{amount}} XAF"
          },
          "CLP": {
            "money_format": "${{amount_no_decimals}}",
            "money_with_currency_format": "${{amount_no_decimals}} CLP"
          },
          "CNY": {
            "money_format": "&#165;{{amount}}",
            "money_with_currency_format": "&#165;{{amount}} CNY"
          },
          "COP": {
            "money_format": "${{amount_with_comma_separator}}",
            "money_with_currency_format": "${{amount_with_comma_separator}} COP"
          },
          "CRC": {
            "money_format": "&#8353; {{amount_with_comma_separator}}",
            "money_with_currency_format": "&#8353; {{amount_with_comma_separator}} CRC"
          },
          "HRK": {
            "money_format": "{{amount_with_comma_separator}} kn",
            "money_with_currency_format": "{{amount_with_comma_separator}} kn HRK"
          },
          "CZK": {
            "money_format": "{{amount_with_comma_separator}} K&#269;",
            "money_with_currency_format": "{{amount_with_comma_separator}} K&#269;"
          },
          "DKK": {
            "money_format": "{{amount_with_comma_separator}}",
            "money_with_currency_format": "kr.{{amount_with_comma_separator}}"
          },
          "DOP": {
            "money_format": "RD$ {{amount}}",
            "money_with_currency_format": "RD$ {{amount}}"
          },
          "XCD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "EC${{amount}}"
          },
          "EGP": {
            "money_format": "LE {{amount}}",
            "money_with_currency_format": "LE {{amount}} EGP"
          },
          "ETB": {
            "money_format": "Br{{amount}}",
            "money_with_currency_format": "Br{{amount}} ETB"
          },
          "XPF": {
            "money_format": "{{amount_no_decimals_with_comma_separator}} XPF",
            "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} XPF"
          },
          "FJD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "FJ${{amount}}"
          },
          "GMD": {
            "money_format": "D {{amount}}",
            "money_with_currency_format": "D {{amount}} GMD"
          },
          "GHS": {
            "money_format": "GH&#8373;{{amount}}",
            "money_with_currency_format": "GH&#8373;{{amount}}"
          },
          "GTQ": {
            "money_format": "Q{{amount}}",
            "money_with_currency_format": "{{amount}} GTQ"
          },
          "GYD": {
            "money_format": "G${{amount}}",
            "money_with_currency_format": "${{amount}} GYD"
          },
          "GEL": {
            "money_format": "{{amount}} GEL",
            "money_with_currency_format": "{{amount}} GEL"
          },
          "HNL": {
            "money_format": "L {{amount}}",
            "money_with_currency_format": "L {{amount}} HNL"
          },
          "HKD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "HK${{amount}}"
          },
          "HUF": {
            "money_format": "{{amount_no_decimals_with_comma_separator}}",
            "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} Ft"
          },
          "ISK": {
            "money_format": "{{amount_no_decimals}} kr",
            "money_with_currency_format": "{{amount_no_decimals}} kr ISK"
          },
          "INR": {
            "money_format": "Rs. {{amount}}",
            "money_with_currency_format": "Rs. {{amount}}"
          },
          "IDR": {
            "money_format": "{{amount_with_comma_separator}}",
            "money_with_currency_format": "Rp {{amount_with_comma_separator}}"
          },
          "ILS": {
            "money_format": "{{amount}} NIS",
            "money_with_currency_format": "{{amount}} NIS"
          },
          "JMD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} JMD"
          },
          "JPY": {
            "money_format": "&#165;{{amount_no_decimals}}",
            "money_with_currency_format": "&#165;{{amount_no_decimals}} JPY"
          },
          "JEP": {
            "money_format": "&pound;{{amount}}",
            "money_with_currency_format": "&pound;{{amount}} JEP"
          },
          "JOD": {
            "money_format": "{{amount}}0 JD",
            "money_with_currency_format": "{{amount}}0 JOD"
          },
          "KZT": {
            "money_format": "{{amount}} KZT",
            "money_with_currency_format": "{{amount}} KZT"
          },
          "KES": {
            "money_format": "KSh{{amount}}",
            "money_with_currency_format": "KSh{{amount}}"
          },
          "KWD": {
            "money_format": "{{amount}} KD",
            "money_with_currency_format": "{{amount}} KWD"
          },
          "KGS": {
            "money_format": "Ð»Ð²{{amount}}",
            "money_with_currency_format": "Ð»Ð²{{amount}}"
          },
          "LVL": {
            "money_format": "Ls {{amount}}",
            "money_with_currency_format": "Ls {{amount}} LVL"
          },
          "LBP": {
            "money_format": "L&pound;{{amount}}",
            "money_with_currency_format": "L&pound;{{amount}} LBP"
          },
          "LTL": {
            "money_format": "{{amount}} Lt",
            "money_with_currency_format": "{{amount}} Lt"
          },
          "MGA": {
            "money_format": "Ar {{amount}}",
            "money_with_currency_format": "Ar {{amount}} MGA"
          },
          "MKD": {
            "money_format": "Ð´ÐµÐ½ {{amount}}",
            "money_with_currency_format": "Ð´ÐµÐ½ {{amount}} MKD"
          },
          "MOP": {
            "money_format": "MOP${{amount}}",
            "money_with_currency_format": "MOP${{amount}}"
          },
          "MVR": {
            "money_format": "Rf{{amount}}",
            "money_with_currency_format": "Rf{{amount}} MRf"
          },
          "MXN": {
            "money_format": "$ {{amount}}",
            "money_with_currency_format": "$ {{amount}} MXN"
          },
          "MYR": {
            "money_format": "RM{{amount}} MYR",
            "money_with_currency_format": "RM{{amount}} MYR"
          },
          "MUR": {
            "money_format": "Rs {{amount}}",
            "money_with_currency_format": "Rs {{amount}} MUR"
          },
          "MDL": {
            "money_format": "{{amount}} MDL",
            "money_with_currency_format": "{{amount}} MDL"
          },
          "MAD": {
            "money_format": "{{amount}} dh",
            "money_with_currency_format": "Dh {{amount}} MAD"
          },
          "MNT": {
            "money_format": "{{amount_no_decimals}} &#8366",
            "money_with_currency_format": "{{amount_no_decimals}} MNT"
          },
          "MZN": {
            "money_format": "{{amount}} Mt",
            "money_with_currency_format": "Mt {{amount}} MZN"
          },
          "NAD": {
            "money_format": "N${{amount}}",
            "money_with_currency_format": "N${{amount}} NAD"
          },
          "NPR": {
            "money_format": "Rs{{amount}}",
            "money_with_currency_format": "Rs{{amount}} NPR"
          },
          "ANG": {
            "money_format": "&fnof;{{amount}}",
            "money_with_currency_format": "{{amount}} NA&fnof;"
          },
          "NZD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} NZD"
          },
          "NIO": {
            "money_format": "C${{amount}}",
            "money_with_currency_format": "C${{amount}} NIO"
          },
          "NGN": {
            "money_format": "&#8358;{{amount}}",
            "money_with_currency_format": "&#8358;{{amount}} NGN"
          },
          "NOK": {
            "money_format": "kr {{amount_with_comma_separator}}",
            "money_with_currency_format": "kr {{amount_with_comma_separator}} NOK"
          },
          "OMR": {
            "money_format": "{{amount_with_comma_separator}} OMR",
            "money_with_currency_format": "{{amount_with_comma_separator}} OMR"
          },
          "PKR": {
            "money_format": "Rs.{{amount}}",
            "money_with_currency_format": "Rs.{{amount}} PKR"
          },
          "PGK": {
            "money_format": "K {{amount}}",
            "money_with_currency_format": "K {{amount}} PGK"
          },
          "PYG": {
            "money_format": "Gs. {{amount_no_decimals_with_comma_separator}}",
            "money_with_currency_format": "Gs. {{amount_no_decimals_with_comma_separator}} PYG"
          },
          "PEN": {
            "money_format": "S/. {{amount}}",
            "money_with_currency_format": "S/. {{amount}} PEN"
          },
          "PHP": {
            "money_format": "&#8369;{{amount}}",
            "money_with_currency_format": "&#8369;{{amount}} PHP"
          },
          "PLN": {
            "money_format": "{{amount_with_comma_separator}} zl",
            "money_with_currency_format": "{{amount_with_comma_separator}} zl PLN"
          },
          "QAR": {
            "money_format": "QAR {{amount_with_comma_separator}}",
            "money_with_currency_format": "QAR {{amount_with_comma_separator}}"
          },
          "RON": {
            "money_format": "{{amount_with_comma_separator}} lei",
            "money_with_currency_format": "{{amount_with_comma_separator}} lei RON"
          },
          "RUB": {
            "money_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
            "money_with_currency_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"
          },
          "RWF": {
            "money_format": "{{amount_no_decimals}} RF",
            "money_with_currency_format": "{{amount_no_decimals}} RWF"
          },
          "WST": {
            "money_format": "WS$ {{amount}}",
            "money_with_currency_format": "WS$ {{amount}} WST"
          },
          "SAR": {
            "money_format": "{{amount}} SR",
            "money_with_currency_format": "{{amount}} SAR"
          },
          "STD": {
            "money_format": "Db {{amount}}",
            "money_with_currency_format": "Db {{amount}} STD"
          },
          "RSD": {
            "money_format": "{{amount}} RSD",
            "money_with_currency_format": "{{amount}} RSD"
          },
          "SCR": {
            "money_format": "Rs {{amount}}",
            "money_with_currency_format": "Rs {{amount}} SCR"
          },
          "SGD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} SGD"
          },
          "SYP": {
            "money_format": "S&pound;{{amount}}",
            "money_with_currency_format": "S&pound;{{amount}} SYP"
          },
          "ZAR": {
            "money_format": "R {{amount}}",
            "money_with_currency_format": "R {{amount}} ZAR"
          },
          "KRW": {
            "money_format": "&#8361;{{amount_no_decimals}}",
            "money_with_currency_format": "&#8361;{{amount_no_decimals}} KRW"
          },
          "LKR": {
            "money_format": "Rs {{amount}}",
            "money_with_currency_format": "Rs {{amount}} LKR"
          },
          "SEK": {
            "money_format": "{{amount_no_decimals}} kr",
            "money_with_currency_format": "{{amount_no_decimals}} kr SEK"
          },
          "CHF": {
            "money_format": "{{amount}} CHF",
            "money_with_currency_format": "{{amount}} CHF"
          },
          "TWD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} TWD"
          },
          "THB": {
            "money_format": "{{amount}} &#xe3f;",
            "money_with_currency_format": "{{amount}} &#xe3f; THB"
          },
          "TZS": {
            "money_format": "{{amount}} TZS",
            "money_with_currency_format": "{{amount}} TZS"
          },
          "TTD": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}} TTD"
          },
          "TND": {
            "money_format": "{{amount}}",
            "money_with_currency_format": "{{amount}} DT"
          },
          "TRY": {
            "money_format": "{{amount}}TL",
            "money_with_currency_format": "{{amount}}TL"
          },
          "UGX": {
            "money_format": "Ush {{amount_no_decimals}}",
            "money_with_currency_format": "Ush {{amount_no_decimals}} UGX"
          },
          "UAH": {
            "money_format": "â‚´{{amount}}",
            "money_with_currency_format": "â‚´{{amount}} UAH"
          },
          "AED": {
            "money_format": "Dhs. {{amount}}",
            "money_with_currency_format": "Dhs. {{amount}} AED"
          },
          "UYU": {
            "money_format": "${{amount_with_comma_separator}}",
            "money_with_currency_format": "${{amount_with_comma_separator}} UYU"
          },
          "VUV": {
            "money_format": "${{amount}}",
            "money_with_currency_format": "${{amount}}VT"
          },
          "VEF": {
            "money_format": "Bs. {{amount_with_comma_separator}}",
            "money_with_currency_format": "Bs. {{amount_with_comma_separator}} VEF"
          },
          "VND": {
            "money_format": "{{amount_no_decimals_with_comma_separator}}&#8363;",
            "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} VND"
          },
          "XBT": {
            "money_format": "{{amount_no_decimals}} BTC",
            "money_with_currency_format": "{{amount_no_decimals}} BTC"
          },
          "XOF": {
            "money_format": "CFA{{amount}}",
            "money_with_currency_format": "CFA{{amount}} XOF"
          },
          "ZMW": {
            "money_format": "K{{amount_no_decimals_with_comma_separator}}",
            "money_with_currency_format": "ZMW{{amount_no_decimals_with_comma_separator}}"
          }
        };

        var baseCurrency = window.theme.shopCurrency,
            newCurrency = document.querySelector('.CurrencySelector__Select').value;

        __WEBPACK_IMPORTED_MODULE_0__Dom__["default"].nodeListToArray((selector || document).querySelectorAll('[data-money-convertible]')).forEach(function (item) {
          if (!item.hasAttribute('data-currency-' + baseCurrency)) {
            item.setAttribute('data-currency-' + baseCurrency, item.innerHTML);
          }

          // If the amount has already been converted, we leave it alone.
          if (item.getAttribute('data-currency') === newCurrency) {
            return;
          }

          var baseAmount = item.getAttribute('data-currency-' + baseCurrency);

          // If we are converting to a currency that we have saved, we will use the saved amount.
          if (item.hasAttribute('data-currency-' + newCurrency)) {
            item.innerHTML = item.getAttribute('data-currency-' + newCurrency);
          } else {
            var newFormat = moneyFormats[newCurrency][window.theme.currencyConversionMoneyFormat] || '{{amount}}';

            // We have to normalize by replacing dot by comma and comma by dot
            if (window.theme.moneyFormat.indexOf('with_comma_separator') !== -1) {
              baseAmount = baseAmount.replace(/[,.]/g, function (match) {
                // If `,` is matched return `.`, if `.` matched return `,`
                return match === ',' ? '.' : ',';
              });
            }

            // Converting to Y for the first time? Let's get to it!
            var cents = window.Currency.convert(parseFloat(baseAmount.replace(/^[^0-9]+|[^0-9.]/g, '', ''), 10) * 100, baseCurrency, newCurrency);

            if (window.theme.currencyConversionRoundAmounts) {
              cents = Math.round(cents / 100) * 100;
            }

            var newFormattedAmount = _this3.formatMoney(cents, newFormat);

            item.innerHTML = newFormattedAmount;
            item.setAttribute('data-currency-' + newCurrency, newFormattedAmount);
          }

          // We record the new currency locally.
          item.setAttribute('data-currency', newCurrency);
        });

        localStorage.setItem('currency', newCurrency);
      }
    }]);

    return Currency;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Currency;

  /***/
},
/* 6 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Accessibility__ = __webpack_require__(3);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "AccessibilityHelper", function () {
    return __WEBPACK_IMPORTED_MODULE_0__Accessibility__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__Animation__ = __webpack_require__(7);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "AnimationHelper", function () {
    return __WEBPACK_IMPORTED_MODULE_1__Animation__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__Currency__ = __webpack_require__(5);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "CurrencyHelper", function () {
    return __WEBPACK_IMPORTED_MODULE_2__Currency__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__Dom__ = __webpack_require__(0);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "DomHelper", function () {
    return __WEBPACK_IMPORTED_MODULE_3__Dom__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__Image__ = __webpack_require__(10);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ImageHelper", function () {
    return __WEBPACK_IMPORTED_MODULE_4__Image__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__Responsive__ = __webpack_require__(2);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ResponsiveHelper", function () {
    return __WEBPACK_IMPORTED_MODULE_5__Responsive__["default"];
  });

  /***/
},
/* 7 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var Animation = function () {
    function Animation() {
      _classCallCheck(this, Animation);
    }

    _createClass(Animation, null, [{
      key: 'slideUp',

      /**
       * Slide up aims to close an element. To do that, we take the height of the element, and set it to 0 to
       * force an animation
       */
      value: function slideUp(element) {
        element.style.height = element.scrollHeight + 'px'; // Force previous height to allow CSS transition
        element.offsetHeight; // Force redraw
        element.style.height = 0;
      }

      /**
       * Slide down aims to open an element. To do that, you must make sure that the element you are trying to open
       * is set with height: 0; overflow: hidden in the CSS, and does not contain any padding nor margin.
       */

    }, {
      key: 'slideDown',
      value: function slideDown(element) {
        if (element.style.height === 'auto') {
          return;
        }

        // To do the animation we temporarily hide it, check the height, and transition to it
        element.style.height = element.firstElementChild.scrollHeight + 'px';

        var transitionEnded = function transitionEnded(event) {
          if (event.propertyName === 'height') {
            element.style.height = 'auto'; // Allows the content to grow normally
            element.removeEventListener('transitionend', transitionEnded);
          }
        };

        element.addEventListener('transitionend', transitionEnded);
      }
    }]);

    return Animation;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Animation;

  /***/
},
/* 8 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(6);

  var Drawer = function () {
    function Drawer(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Drawer);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.delegateBody = new domDelegate.Delegate(document.body);

      this.onOpen = options['onOpen'] || function () {};
      this.onClose = options['onClose'] || function () {};

      this.isOpen = false;
      this.direction = this.element.classList.contains('Drawer--fromLeft') ? 'fromLeft' : 'fromRight';

      this.pageOverlayElement = document.querySelector('.PageOverlay');

      this._attachListeners();
    }

    _createClass(Drawer, [{
      key: 'destroy',
      value: function destroy() {
        this.delegateBody.off('click', '[data-action="open-drawer"][data-drawer-id="' + this.element.id + '"]');
        this.delegateBody.off('click', '[data-action="close-drawer"][data-drawer-id="' + this.element.id + '"]');
        window.removeEventListener('resize', this._calculateMaxHeightListener);
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.isOpen ? this.close() : this.open();
      }
    }, {
      key: 'open',
      value: function open(event) {
        // if (this.isOpen) {
        //   return;
        // }

        if (event) {
          event.preventDefault();
        }

        this.element.setAttribute('aria-hidden', 'false');
        this._calculateMaxHeight();

        document.documentElement.classList.add('no-scroll');

        // This prevent the body to scroll on iOS. This is honestly a bit hacky, but until the platform supports "touch-action: none" like
        // other browsers, this is the only way to achieve that
        disableBodyScroll(true, '[data-scrollable]');
        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.element, 'drawer');

        // We attach an event to the page overlay to close it
        this.pageOverlayElement.classList.add('is-visible');
        this.pageOverlayElement.addEventListener('click', this._closeListener);

        this.isOpen = true;

        this.onOpen(); // Call the callback to allow other code to hook their logic

        return false;
      }
    }, {
      key: 'close',
      value: function close(event) {
        if (!this.isOpen) {
          return;
        }

        if (event) {
          event.preventDefault();
        }

        this.element.setAttribute('aria-hidden', 'true');

        document.documentElement.classList.remove('no-scroll');

        disableBodyScroll(false, '[data-scrollable]');
        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].removeTrapFocus(this.element, 'drawer');

        this.pageOverlayElement.classList.remove('is-visible');
        this.pageOverlayElement.removeEventListener('click', this._closeListener);

        this.isOpen = false;

        this.onClose(); // Call the callback to allow other code to hook their logic
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._openListener = this.open.bind(this);
        this._closeListener = this.close.bind(this);
        this._calculateMaxHeightListener = this._calculateMaxHeight.bind(this);

        this.delegateBody.on('click', '[data-action="open-drawer"][data-drawer-id="' + this.element.id + '"]', this._openListener);
        this.delegateBody.on('click', '[data-action="close-drawer"][data-drawer-id="' + this.element.id + '"]', this._closeListener);
        this.element.addEventListener('keyup', this._handleKeyboard.bind(this));
        window.addEventListener('resize', this._calculateMaxHeightListener);
      }

      /**
       * Make sure that we force a max-height so that the drawer always stays on screen
       */

    }, {
      key: '_calculateMaxHeight',
      value: function _calculateMaxHeight() {
        this.element.style.maxHeight = window.innerHeight + 'px';
      }
    }, {
      key: '_handleKeyboard',


      /**
       * Handle a11y events
       */
      value: function _handleKeyboard(event) {
        if (this.isOpen && event.keyCode === 27) {
          this.close();
        }
      }
    }]);

    return Drawer;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Drawer;

  /***/
},
/* 9 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__ = __webpack_require__(2);

  var Popover = function () {
    function Popover(element, options) {
      _classCallCheck(this, Popover);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);

      this.activator = options['activator'] || document.querySelector('[aria-controls="' + element.getAttribute('id') + '"]');
      this.preferredPosition = options['preferredPosition'] || 'bottom';
      this.isOpen = false;

      this.onValueChanged = options['onValueChanged'] || function () {};
      this.onOpen = options['onOpen'] || function () {};
      this.onClose = options['onClose'] || function () {};

      this.showOverlay = options['showOverlay'] === undefined ? true : options['showOverlay'];
      this.pageOverlayElement = document.querySelector('.PageOverlay');

      this._attachListeners();
    }

    _createClass(Popover, [{
      key: 'destroy',
      value: function destroy() {
        this.element.removeEventListener('keyup', this._handleKeyboardListener);
        this.delegateElement.off('click');
        this.activator.removeEventListener('click', this._toggleListener);
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.isOpen ? this.close() : this.open();
      }
    }, {
      key: 'open',
      value: function open() {
        // Note: the additional check on the aria-controls is used here so that a given activator can be used on different
        //       popovers and be modified dynamically in JavaScript
        if (this.isOpen || this.activator.getAttribute('aria-controls') !== this.element.id) {
          return;
        }

        this.element.setAttribute('aria-hidden', 'false');
        this.activator.setAttribute('aria-expanded', 'true');

        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.element, 'popover');
        disableBodyScroll(true, '[data-scrollable]');

        document.documentElement.classList.add('no-scroll'); // Prevent scrolling when popover is open

        if (__WEBPACK_IMPORTED_MODULE_2__helper_Responsive__["default"].matchesBreakpoint('lap-and-up')) {
          document.body.addEventListener('click', this._clickOutsideListener);
          this._position();
        } else {
          this.element.removeAttribute('style');

          if (this.showOverlay) {
            this.pageOverlayElement.classList.add('is-visible');
            this.pageOverlayElement.addEventListener('click', this._closeListener);
          }
        }

        this.onOpen(this); // Call the callback to allow other code to hook their logic
        this.isOpen = true;
      }
    }, {
      key: 'close',
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.element.setAttribute('aria-hidden', 'true');
        this.activator.setAttribute('aria-expanded', 'false');

        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].removeTrapFocus(this.element, 'popover');
        disableBodyScroll(false, '[data-scrollable]');

        document.documentElement.classList.remove('no-scroll');

        if (__WEBPACK_IMPORTED_MODULE_2__helper_Responsive__["default"].matchesBreakpoint('lap-and-up')) {
          document.body.removeEventListener('click', this._clickOutsideListener);
        } else if (this.showOverlay) {
          this.pageOverlayElement.classList.remove('is-visible');
          this.pageOverlayElement.removeEventListener('click', this._closeListener);
        }

        this.onClose(this); // Call the callback to allow other code to hook their logic
        this.isOpen = false;
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._handleKeyboardListener = this._handleKeyboard.bind(this);
        this._clickOutsideListener = this._clickOutside.bind(this);
        this._closeListener = this.close.bind(this);
        this._toggleListener = this.toggle.bind(this);

        this.element.addEventListener('keyup', this._handleKeyboardListener);
        this.activator.addEventListener('click', this._toggleListener);

        this.delegateElement.on('click', '[data-action="close-popover"]', this.close.bind(this));
        this.delegateElement.on('click', '[data-action="select-value"]', this._valueChanged.bind(this));
      }

      /**
       * Whenever a value is selected, it can notify a callback so that the calling code can do its own logic in response
       * of the value change
       */

    }, {
      key: '_valueChanged',
      value: function _valueChanged(event) {
        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].getSiblings(event.target, '.is-selected').forEach(function (item) {
          return item.classList.remove('is-selected');
        });
        event.target.classList.add('is-selected');

        // If there is a callback in option we call it with the value
        this.onValueChanged(event.target.getAttribute('data-value'), event.target, this.activator);
        this.close();
      }

      /**
       * Callback that is called to decide if we should close the popover when a click is captured outside
       */

    }, {
      key: '_clickOutside',
      value: function _clickOutside(event) {
        if (!event.target.closest('.Popover') && !event.target.closest('.Modal') && event.target !== this.activator && !this.activator.contains(event.target)) {
          this.close();
        }
      }

      /**
       * On desktop, we reposition the popover in JavaScript by doing some smart logic to detect the most appropriate area
       */

    }, {
      key: '_position',
      value: function _position() {
        var _this4 = this;

        var topPosition = 0,
            rightPosition = 0,
            position = '',
            alignment = '',
            threshold = 20;

        fastdom.measure(function () {
          var windowHeight = window.innerHeight,
              activatorBoundingRect = _this4.activator.getBoundingClientRect(),
              halfHeight = windowHeight / 2;

          if (_this4.preferredPosition === 'bottom') {
            alignment = 'right';

            if (_this4.element.clientHeight <= windowHeight - (activatorBoundingRect.bottom + threshold) || windowHeight - activatorBoundingRect.bottom >= halfHeight) {
              position = 'bottom';
            } else {
              position = 'top';
            }
          } else if (_this4.preferredPosition === 'top') {
            alignment = 'right';

            if (_this4.element.clientHeight <= activatorBoundingRect.top - threshold || activatorBoundingRect.top >= halfHeight) {
              position = 'top';
            } else {
              position = 'bottom';
            }
          } else {
            position = 'left';

            // Is there enough space to use the center alignment (which is preferred)?
            var halfElementHeight = _this4.element.clientHeight / 2;

            if (activatorBoundingRect.top >= halfElementHeight && windowHeight - activatorBoundingRect.bottom >= halfElementHeight) {
              alignment = 'center';
            } else if (windowHeight - activatorBoundingRect.bottom >= halfElementHeight) {
              alignment = 'bottom';
            } else {
              alignment = 'top';
            }
          }

          if (position === 'top') {
            topPosition = activatorBoundingRect.top - _this4.element.clientHeight - threshold;
            rightPosition = window.innerWidth - activatorBoundingRect.right;
          } else if (position === 'bottom') {
            topPosition = activatorBoundingRect.bottom + threshold;
            rightPosition = window.innerWidth - activatorBoundingRect.right;
          } else {
            rightPosition = window.innerWidth - activatorBoundingRect.left + threshold;

            if (alignment === 'center') {
              topPosition = activatorBoundingRect.top - _this4.element.clientHeight / 2 + _this4.activator.clientHeight / 2;
            } else if (alignment === 'top') {
              topPosition = activatorBoundingRect.bottom - _this4.element.clientHeight;
            } else {
              topPosition = activatorBoundingRect.top;
            }
          }
        });

        fastdom.mutate(function () {
          ['Popover--positionBottom', 'Popover--positionTop', 'Popover--positionCenter', 'Popover--alignTop', 'Popover--alignCenter', 'Popover--alignBottom'].map(function (item) {
            return _this4.element.classList.remove(item);
          });
          _this4.element.classList.add('Popover--position' + (position.charAt(0).toUpperCase() + position.slice(1)));
          _this4.element.classList.add('Popover--align' + (alignment.charAt(0).toUpperCase() + alignment.slice(1)));

          _this4.element.setAttribute('style', 'top: ' + parseInt(topPosition) + 'px; right: ' + parseInt(rightPosition) + 'px;');
        });
      }

      /**
       * Handle a11y events
       */

    }, {
      key: '_handleKeyboard',
      value: function _handleKeyboard(event) {
        if (this.isOpen && event.keyCode === 27) {
          this.close();
        }
      }
    }]);

    return Popover;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Popover;

  /***/
},
/* 10 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var Image = function () {
    function Image() {
      _classCallCheck(this, Image);
    }

    _createClass(Image, null, [{
      key: 'getSizedImageUrl',

      /**
       * Create a CDN URL (similar to the img_url filter in Liquid)
       */
      value: function getSizedImageUrl(src, size) {
        if (size === null) {
          return src;
        }

        if (size === 'master') {
          return src.replace(/http(s)?:/, '');
        }

        var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

        if (match) {
          var prefix = src.split(match[0]);
          var suffix = match[0];

          return (prefix[0] + '_' + size + suffix).replace(/http(s)?:/, '');
        } else {
          return null;
        }
      }

      /**
       * From a given set of desired sizes and a given image, filter out any unwanted sizes
       */

    }, {
      key: 'getSupportedSizes',
      value: function getSupportedSizes(image, desiredSizes) {
        var supportedSizes = [],
            imageWidth = image['width'];

        desiredSizes.forEach(function (width) {
          if (imageWidth >= width) {
            supportedSizes.push(width);
          }
        });

        return supportedSizes;
      }
    }]);

    return Image;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Image;

  /***/
},
/* 11 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Popover__ = __webpack_require__(9);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Form__ = __webpack_require__(19);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__components_VariantSelector__ = __webpack_require__(16);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__helper_Currency__ = __webpack_require__(5);
  /**
   * This component handles all the logic of switching variant, updating product meta...
   */

  var ProductVariants = function () {
    function ProductVariants(container, options) {
      var _this5 = this;

      _classCallCheck(this, ProductVariants);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = options;

      var jsonData = JSON.parse(this.element.querySelector('[data-product-json]').innerHTML);

      this.productData = jsonData['product'];
      this.variantsInventories = jsonData['inventories'] || {};
      this.masterSelector = this.element.querySelector('#product-select-' + this.productData['id']);

      // We init value with the first selected variant
      this.productData['variants'].forEach(function (variant) {
        if (variant['id'] === jsonData['selected_variant_id']) {
          _this5.currentVariant = variant;
          _this5.option1 = variant['option1'];
          _this5.option2 = variant['option2'];
          _this5.option3 = variant['option3'];
        }
      });

      this._attachListeners();
      this._createSelectors();

      if(this.currentVariant['featured_image'] != null){
        jQuery('.Product .Product__Gallery .Product__Slideshow .Product__SlideItem--image').removeClass("is-selected");
        jQuery('.Product .Product__Gallery .Product__Slideshow [data-image-id="' + this.currentVariant['featured_image']['id'] + '"]').addClass('is-selected');
      }
    }

    _createClass(ProductVariants, [{
      key: 'destroy',
      value: function destroy() {
        this.delegateElement.off('click');
        this.formPopovers.forEach(function (popover) {
          return popover.destroy();
        });
        this.formVariantSelectors.forEach(function (selector) {
          return selector.destroy();
        });
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '[data-action="add-to-cart"]', this._addToCart.bind(this));
        this.delegateElement.on('click', '[data-action="decrease-quantity"]', this._decreaseQuantity.bind(this));
        this.delegateElement.on('click', '[data-action="increase-quantity"]', this._increaseQuantity.bind(this));
        this.delegateElement.on('change', '[name="quantity"]', this._validateQuantity.bind(this));
        // Hook when a radio button change
        this.delegateElement.on('change', '.ProductForm__Option [type="radio"]', this._onOptionChanged.bind(this));
      }

      /**
       * Selectors can either be popovers or dedicated variant selectors. We therefore pre-create them all here
       */

    }, {
      key: '_createSelectors',
      value: function _createSelectors() {
        var _this6 = this;

        // Create the instances for each selector
        this.formPopovers = [];
        this.formVariantSelectors = [];

        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.OptionSelector')).forEach(function (item) {
          var popover = new __WEBPACK_IMPORTED_MODULE_0__components_Popover__["default"](item, { preferredPosition: 'left', onValueChanged: _this6._onOptionChanged.bind(_this6) });
          _this6.formPopovers.push(popover);
        });

        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.VariantSelector')).forEach(function (item) {
          var variantSelector = new __WEBPACK_IMPORTED_MODULE_3__components_VariantSelector__["default"](item, { onValueChanged: _this6._onOptionChanged.bind(_this6) });
          _this6.formVariantSelectors.push(variantSelector);
        });
      }

      /**
       * ---------------------------------------------------------------------------------------------------
       * CODE THAT HANDLE VARIANT CHANGES IN THE FRONT
       *
       * Please note that this code is highly dependant on the markup and classes, so make sure to NOT
       * edit this code
       * ---------------------------------------------------------------------------------------------------
       */

      /**
       * This callback is called whenever the variant changes and allows to update data about the active variant
       */

    }, {
      key: '_onVariantChanged',
      value: function _onVariantChanged(previousVariant, newVariant) {
        // 1st: the prices
        this._updateProductPrices(newVariant, previousVariant);

        // 2th: update inventory
        this._updateInventory(newVariant, previousVariant);

        // 3th: the add to cart button
        //this._updateAddToCartButton(newVariant, previousVariant);

        if (window.theme.currencyConversionEnabled) {
          __WEBPACK_IMPORTED_MODULE_4__helper_Currency__["default"].convertAll(this.element);
        }

        // Finally, we send an event so that other system could hook and do their own logic
        this.element.dispatchEvent(new CustomEvent('variant:changed', {
          bubbles: true,
          detail: { variant: newVariant, previousVariant: previousVariant }
        }));
      }

      /**
       * Update the prices (optionally showing compare at price)
       */

    }, {
      key: '_updateProductPrices',
      value: function _updateProductPrices(newVariant, previousVariant) {
        var productMetaPrices = this.element.querySelector('.ProductMeta__PriceList');

        if (!newVariant) {
          productMetaPrices.style.display = 'none';
        } else {
          if (previousVariant && previousVariant['price'] === newVariant['price'] && previousVariant['compare_at_price'] === newVariant['compare_at_price']) {
            return; // The price do not have changed so let's return to avoid changing the DOM for nothing
          }

          productMetaPrices.innerHTML = '';

          if (newVariant['compare_at_price'] > newVariant['price']) {
            productMetaPrices.innerHTML += '<span class="ProductMeta__Price Price Price--highlight Text--subdued u-h4" data-money-convertible>' + __WEBPACK_IMPORTED_MODULE_4__helper_Currency__["default"].formatMoney(newVariant['price'], window.theme.moneyFormat) + '</span>';
            productMetaPrices.innerHTML += '<span class="ProductMeta__Price Price Price--compareAt Text--subdued u-h4" data-money-convertible>' + __WEBPACK_IMPORTED_MODULE_4__helper_Currency__["default"].formatMoney(newVariant['compare_at_price'], window.theme.moneyFormat) + '</span>';
          } else {
            productMetaPrices.innerHTML += '<span class="ProductMeta__Price Price Text--subdued u-h4" data-money-convertible>' + __WEBPACK_IMPORTED_MODULE_4__helper_Currency__["default"].formatMoney(newVariant['price'], window.theme.moneyFormat) + '</span>';
          }

          productMetaPrices.style.display = '';
        }
      }

      /**
       * Update the inventory (if needed)
       */

    }, {
      key: '_updateInventory',
      value: function _updateInventory(newVariant) {
        if (!this.options['showInventoryQuantity']) {
          return;
        }

        var productFormInventory = this.element.querySelector('.ProductForm__Inventory'),
            variantInventory = newVariant ? this.variantsInventories[newVariant['id']] : null;

        if (!newVariant || null === variantInventory['inventory_management'] || variantInventory['inventory_quantity'] <= 0 || this.options['inventoryQuantityThreshold'] > 0 && variantInventory['inventory_quantity'] > this.options['inventoryQuantityThreshold']) {
          productFormInventory.style.display = 'none';
        } else {
          productFormInventory.textContent = variantInventory['inventory_message'];
          productFormInventory.style.display = '';
        }
      }

      /**
       * Update the add to cart
       */

    }, {
      key: '_updateAddToCartButton',
      value: function _updateAddToCartButton(newVariant) {
        var addToCartButton = this.element.querySelector('.ProductForm__AddToCart'),
            shopifyPaymentButton = this.element.querySelector('.shopify-payment-button'),
            newButton = document.createElement('button');

        newButton.setAttribute('type', 'submit');
        newButton.className = 'ProductForm__AddToCart Button Button--full';

        if (!newVariant) {
          newButton.setAttribute('disabled', 'disabled');
          newButton.removeAttribute('data-action');
          newButton.classList.add('Button--secondary');
          newButton.innerHTML = window.languages.productFormUnavailable;
        } else {
          if (newVariant['available']) {
            newButton.removeAttribute('disabled');
            newButton.classList.add(this.options['showPaymentButton'] ? 'Button--secondary' : 'Button--primary');
            newButton.setAttribute('data-action', 'add-to-cart');

            if (undefined === this.options['showPriceInButton'] || this.options['showPriceInButton']) {
              newButton.innerHTML = '\n            <span>' + window.languages.productFormAddToCart + '</span>\n            <span class="Button__SeparatorDot"></span>\n            <span data-money-convertible>' + __WEBPACK_IMPORTED_MODULE_4__helper_Currency__["default"].formatMoney(newVariant['price'], window.theme.moneyFormat) + '</span>\n          ';
            } else {
              newButton.innerHTML = '<span>' + window.languages.productFormAddToCart + '</span>';
            }
          } else {
            newButton.setAttribute('disabled', 'disabled');
            newButton.classList.add('Button--secondary');
            newButton.removeAttribute('data-action');
            newButton.innerHTML = window.languages.productFormSoldOut;
          }
        }

        if (this.options['showPaymentButton'] && shopifyPaymentButton) {
          if (!newVariant || !newVariant['available']) {
            shopifyPaymentButton.style.display = 'none';
          } else {
            shopifyPaymentButton.style.display = 'block';
          }
        }

        // We replace the HTML instead of editing as it prevents for the CSS transition to show up
        addToCartButton.parentNode.replaceChild(newButton, addToCartButton);
      }

      /**
       * ---------------------------------------------------------------------------------------------------
       * INTERNAL CODE THAT HANDLE VARIANT CHANGES
       * ---------------------------------------------------------------------------------------------------
       */

      /**
       * Whenever an option is changed, this code fetch the corresponding active variant
       */

    }, {
      key: '_onOptionChanged',
      value: function _onOptionChanged(newValue, target, activator) {
        // We change the value associated with the activator, and check if we have a color swatch
        if (activator) {
          this['option' + target.getAttribute('data-option-position')] = newValue;
          activator.querySelector('.ProductForm__SelectedValue').innerHTML = newValue;
        } else {
          this['option' + target.getAttribute('data-option-position')] = target.value;
          var selectedValue = target.closest('.ProductForm__Option').querySelector('.ProductForm__SelectedValue');

          if (selectedValue) {
            selectedValue.innerHTML = target.value;
          }
        }

        // Finally, we get the new variant
        var previousVariant = this.currentVariant;
        this.currentVariant = this._getCurrentVariantFromOptions();

        this._onVariantChanged(previousVariant, this.currentVariant);

        if (this.currentVariant) {
          if (this.options['enableHistoryState']) {
            this._updateHistoryState(this.currentVariant);
          }

          // We need to modify the hidden select that contain the id attribute as well
          this.masterSelector.querySelector('[selected]').removeAttribute('selected');
          this.masterSelector.querySelector('[value="' + this.currentVariant['id'] + '"]').setAttribute('selected', 'selected');

          if(this.currentVariant['featured_image'] != null){
            jQuery('.Product .Product__Gallery .Product__Slideshow .Product__SlideItem--image').removeClass("is-selected");
            jQuery('.Product .Product__Gallery .Product__Slideshow [data-image-id="' + this.currentVariant['featured_image']['id'] + '"]').addClass('is-selected');
          }
        }
      }

      /**
       * Get the active variant based on the options
       */

    }, {
      key: '_getCurrentVariantFromOptions',
      value: function _getCurrentVariantFromOptions() {
        var _this7 = this;

        var found = false;

        this.productData['variants'].forEach(function (variant) {
          if (variant['option1'] === _this7.option1 && variant['option2'] === _this7.option2 && variant['option3'] === _this7.option3) {
            found = variant;
          }
        });

        return found || null;
      }

      /**
       * Update the history state for browsers that support it
       */

    }, {
      key: '_updateHistoryState',
      value: function _updateHistoryState(variant) {
        if (!history.replaceState) {
          return;
        }

        var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;

        window.history.replaceState({ path: newUrl }, '', newUrl);
      }

      /**
       * ---------------------------------------------------------------------------------------------------
       * INTERNAL CODE THAT HANDLE PRODUCT ADD TO CART
       * ---------------------------------------------------------------------------------------------------
       */

    }, {
      key: '_addToCart',
      value: function _addToCart(event) {
        var _this8 = this;

        if (!this.options['useAjaxCart']) {
          return; // When using a cart type of page, we just simply redirect to the cart page
        }

        event.preventDefault(); // Prevent form to be submitted

        var addToCartButton = this.element.querySelector('.ProductForm__AddToCart');

        // First, we switch the status of the button
        addToCartButton.setAttribute('disabled', 'disabled');
        document.dispatchEvent(new CustomEvent('theme:loading:start'));

        // Then we add the product in Ajax
        var formElement = this.element.querySelector('form[action^="/cart/add"]');


        fetch('/cart/add.js', {
          body: JSON.stringify(__WEBPACK_IMPORTED_MODULE_2__helper_Form__["default"].serialize(formElement)),
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
          }
        }).then(function (response) {
          document.dispatchEvent(new CustomEvent('theme:loading:end'));
          if (response.ok) {
            addToCartButton.removeAttribute('disabled');
            // We simply trigger an event so the mini-cart can re-render
            _this8.element.dispatchEvent(new CustomEvent('product:added', {
              bubbles: true,
              detail: {
                variant: _this8.currentVariant,
                quantity: parseInt(formElement.querySelector('[name="quantity"]').value)
              }
            }));

            // Custom scripts from jumpstart
            addInYotpo();
           $.getJSON("/cart.js", function(result){
             calculateProgressbar(result);
             if (result.item_count > 0 ) {
               clearInterval(bigTimer);
             //timerCountDownClearCart();
             }
           });
          } else {
            response.json().then(function (content) {
              var errorMessageElement = document.createElement('span');
              errorMessageElement.className = 'ProductForm__Error Alert Alert--error';
              errorMessageElement.innerHTML = content['description'];
              addToCartButton.removeAttribute('disabled');
              addToCartButton.insertAdjacentElement('afterend', errorMessageElement);
              setTimeout(function () {
                errorMessageElement.remove();
              }, 2500);
            });
          }
        });

        event.preventDefault();
      }

      /**
       * ---------------------------------------------------------------------------------------------------
       * OTHER
       * ---------------------------------------------------------------------------------------------------
       */

      /**
       * When using the quantity selector, this can be used to decrease the quantity (be ensuring it won't be lower than 1)
       */

    }, {
      key: '_decreaseQuantity',
      value: function _decreaseQuantity(event, target) {
        target.nextElementSibling.value = Math.max(parseInt(target.nextElementSibling.value) - 1, 1);
      }

      /**
       * When using the quantity selector, this can be used to increase the quantity
       */

    }, {
      key: '_increaseQuantity',
      value: function _increaseQuantity(event, target) {
        target.previousElementSibling.value = parseInt(target.previousElementSibling.value) + 1;
      }

      /**
       * Make sure the quantity does not go below when manually changed
       */

    }, {
      key: '_validateQuantity',
      value: function _validateQuantity(event, target) {
        target.value = Math.max(parseInt(target.value) || 1, 1);
      }
    }]);

    return ProductVariants;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ProductVariants;

  /***/
},
/* 12 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var CountrySelector = function () {
    function CountrySelector(countrySelect, provinceSelect) {
      _classCallCheck(this, CountrySelector);

      this.countrySelect = countrySelect;
      this.provinceSelect = provinceSelect;

      if (this.countrySelect && this.provinceSelect) {
        this._attachListeners();
        this._initSelectors();
      }
    }

    _createClass(CountrySelector, [{
      key: 'destroy',
      value: function destroy() {
        if (this.countrySelect) {
          this.countrySelect.removeEventListener('change', this._onCountryChangedListener);
        }
      }
    }, {
      key: '_initSelectors',
      value: function _initSelectors() {
        // Check first the default value of country
        var defaultCountry = this.countrySelect.getAttribute('data-default');

        if (defaultCountry) {
          this.countrySelect.value = defaultCountry;
        } else {
          this.countrySelect.selectedIndex = 0;
        }

        var event = new Event('change', { bubbles: true });
        this.countrySelect.dispatchEvent(event);

        // Then the province
        var defaultProvince = this.provinceSelect.getAttribute('data-default');

        if (defaultProvince) {
          this.provinceSelect.value = defaultProvince;
        }
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._onCountryChangedListener = this._onCountryChanged.bind(this);
        this.countrySelect.addEventListener('change', this._onCountryChangedListener);
      }
    }, {
      key: '_onCountryChanged',
      value: function _onCountryChanged() {
        var _this9 = this;

        var selectedOption = this.countrySelect.options[this.countrySelect.selectedIndex],
            provinces = JSON.parse(selectedOption.getAttribute('data-provinces') || '[]');

        // First remove all options
        this.provinceSelect.innerHTML = '';

        if (provinces.length === 0) {
          this.provinceSelect.parentNode.style.display = 'none';
          return;
        }

        // We need to build the provinces array
        provinces.forEach(function (data) {
          _this9.provinceSelect.options.add(new Option(data[1], data[0]));
        });

        this.provinceSelect.parentNode.style.display = 'block';
      }
    }]);

    return CountrySelector;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = CountrySelector;

  /***/
},
/* 13 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * This class allows to automatically scrolls within a div when this div does not fit into the visible space
   */

  var OverflowScroller = function () {
    function OverflowScroller(element) {
      _classCallCheck(this, OverflowScroller);

      if (!element) {
        return;
      }

      this.element = element;
      this.lastKnownY = window.scrollY;
      this.currentTop = 0;
      this.initialTopOffset = parseInt(window.getComputedStyle(this.element).top);

      this._attachListeners();
    }

    _createClass(OverflowScroller, [{
      key: 'destroy',
      value: function destroy() {
        window.removeEventListener('scroll', this._checkPositionListener);
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._checkPositionListener = this._checkPosition.bind(this);
        window.addEventListener('scroll', this._checkPositionListener);
      }
    }, {
      key: '_checkPosition',
      value: function _checkPosition() {
        var _this10 = this;

        fastdom.measure(function () {
          var bounds = _this10.element.getBoundingClientRect(),
              maxTop = bounds.top + window.scrollY - _this10.element.offsetTop + _this10.initialTopOffset,
              minTop = _this10.element.clientHeight - window.innerHeight;

          if (window.scrollY < _this10.lastKnownY) {
            _this10.currentTop -= window.scrollY - _this10.lastKnownY;
          } else {
            _this10.currentTop += _this10.lastKnownY - window.scrollY;
          }

          _this10.currentTop = Math.min(Math.max(_this10.currentTop, -minTop), maxTop, _this10.initialTopOffset);
          _this10.lastKnownY = window.scrollY;
        });

        fastdom.mutate(function () {
          _this10.element.style.top = _this10.currentTop + 'px';
        });
      }
    }]);

    return OverflowScroller;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = OverflowScroller;

  /***/
},
/* 14 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Image__ = __webpack_require__(10);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__ = __webpack_require__(2);

  var ProductImageZoom = function () {
    function ProductImageZoom(element, slideshow) {
      _classCallCheck(this, ProductImageZoom);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.delegateRoot = new domDelegate.Delegate(document.body);

      this.slideshow = slideshow;

      this._attachListeners();
    }

    _createClass(ProductImageZoom, [{
      key: 'destroy',
      value: function destroy() {
        this.delegateElement.off('click');
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '[data-action="open-product-zoom"]', this._initPhotoSwipe.bind(this));
        this.delegateElement.on('click', '.Product__SlideItem--image', this._initPhotoSwipeFromImageClick.bind(this));
      }

      /**
       * To save performance, we only initialize PhotoSwipe when it's requested. All high resolution images
       * are also loaded only on demand. Also, please note that PhotoSwipe is always completely destroyed
       * whenever it is closed, so it stays super snappy
       */

    }, {
      key: '_initPhotoSwipe',
      value: function _initPhotoSwipe() {
        var images = [];

        this.slideshow.flickityInstance.cells.forEach(function (item) {
          if (item.element.classList.contains('Product__SlideItem--image')) {
            images.push(item.element.querySelector('img'));
          }
        });

        this._createPhotoSwipeInstance(this._createPhotoSwipeItemsFromImages(images), parseInt(this.slideshow.flickityInstance.selectedElement.getAttribute('data-image-position-ignoring-video')));
      }

      /**
       * On desktop we do not have the dedicated small icon, instead the zoom is triggered when clicking directly on the image
       */

    }, {
      key: '_initPhotoSwipeFromImageClick',
      value: function _initPhotoSwipeFromImageClick(event, target) {
        // Opening this way is only available on desktop
        if (__WEBPACK_IMPORTED_MODULE_2__helper_Responsive__["default"].matchesBreakpoint('pocket')) {
          return;
        }

        var images = [];

        __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].getSiblings(target, null, true).forEach(function (item) {
          if (item.classList.contains('Product__SlideItem--image')) {
            images.push(item.querySelector('img'));
          }
        });

        this._createPhotoSwipeInstance(this._createPhotoSwipeItemsFromImages(images), parseInt(target.getAttribute('data-image-position-ignoring-video')));
      }

      /**
       * Take a list of images and create a PhotoSwipe array. This is called whenever the gallery is initialized.
       */

    }, {
      key: '_createPhotoSwipeItemsFromImages',
      value: function _createPhotoSwipeItemsFromImages(images) {
        return images.map(function (image) {
          var maxWidth = parseInt(image.getAttribute('data-max-width')),
              maxHeight = parseInt(image.getAttribute('data-max-height')),
              maxDimension = __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__["default"].matchesBreakpoint('phone') ? 1200 : 1800,
              // 1200 is max size for mobile and 1800 for larger devices
          reduceFactor = 1.0;

          if (maxWidth >= maxHeight) {
            reduceFactor = Math.max(maxWidth / maxDimension, 1.0);
          } else {
            reduceFactor = Math.max(maxHeight / maxDimension, 1.0);
          }

          var requestedWidth = Math.floor(maxWidth / reduceFactor);
          var requestedHeight = Math.floor(maxHeight / reduceFactor);

          return {
            msrc: image.currentSrc || image.src, // For browser that supports srcset, currentSrc is the currently used image
            w: requestedWidth,
            h: requestedHeight,
            initialZoomLevel: 0.65,
            src: __WEBPACK_IMPORTED_MODULE_1__helper_Image__["default"].getSizedImageUrl(image.getAttribute('data-original-src'), requestedWidth + 'x' + requestedHeight)
          };
        });
      }

      /**
       * Take a list of nodes containing all images and create a PhotoSwipe array. This is called
       * whenever the gallery is initialized.
       */

    }, {
      key: '_createPhotoSwipeInstance',
      value: function _createPhotoSwipeInstance(items, selectedImageIndex) {
        var _this11 = this;

        var photoswipeContainer = document.querySelector('.pswp');

        this.photoSwipeInstance = new PhotoSwipe(photoswipeContainer, false, items, {
          index: selectedImageIndex,
          showHideOpacity: true,
          showAnimationDuration: 500,
          loop: false,
          history: false,
          closeOnVerticalDrag: false,
          allowPanToNext: false,
          pinchToClose: false,
          errorMsg: '<p class="pswp__error-msg">' + window.languages.productImageLoadingError + '</p>',
          scaleMode: 'zoom',
          getDoubleTapZoom: function getDoubleTapZoom(isMouseClick, item) {
            if (isMouseClick) {
              return 1.6;
            } else {
              return item.initialZoomLevel < 0.7 ? 1 : 1.33;
            }
          },
          getThumbBoundsFn: function getThumbBoundsFn(index) {
            var thumbnail = _this11.element.querySelector('.Product__Slideshow .Carousel__Cell:nth-child(' + (parseInt(index) + 1) + ') img'),
                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect();

            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          }
        });

        this.photoSwipeInstance.listen('beforeChange', this._onSlideChanged.bind(this));
        this.photoSwipeInstance.listen('destroy', this._destroyPhotoSwipe.bind(this));
        this.photoSwipeInstance.listen('doubleTap', this._onDoubleTap.bind(this));
        this.photoSwipeInstance.listen('initialZoomIn', this._onInitialZoomIn.bind(this));
        this.photoSwipeInstance.listen('initialZoomOut', this._onInitialZoomOut.bind(this));

        this.delegateRoot.on('pswpTap', '.pswp__scroll-wrap', this._onSingleTap.bind(this));
        this.delegateRoot.on('pswpTap', '.pswp__button--close', this.photoSwipeInstance.close);
        this.delegateRoot.on('pswpTap', '.pswp__button--prev', this.photoSwipeInstance.prev);
        this.delegateRoot.on('pswpTap', '.pswp__button--next', this.photoSwipeInstance.next);

        this.photoSwipeInstance.init();
      }

      /**
       * Update the nav
       */

    }, {
      key: '_onSlideChanged',
      value: function _onSlideChanged() {
        if (this.photoSwipeInstance.getCurrentIndex() === 0) {
          this.photoSwipeInstance.scrollWrap.querySelector('.pswp__button--prev').setAttribute('disabled', 'disabled');
        } else {
          this.photoSwipeInstance.scrollWrap.querySelector('.pswp__button--prev').removeAttribute('disabled');
        }

        if (this.photoSwipeInstance.getCurrentIndex() + 1 === this.photoSwipeInstance.options.getNumItemsFn()) {
          this.photoSwipeInstance.scrollWrap.querySelector('.pswp__button--next').setAttribute('disabled', 'disabled');
        } else {
          this.photoSwipeInstance.scrollWrap.querySelector('.pswp__button--next').removeAttribute('disabled');
        }
      }

      /**
       * This event is a bit different and is triggered when the user click somewhere. We use it do allow to zoom in and
       * zoom out in the image on desktop and use for the UI
       */

    }, {
      key: '_onSingleTap',
      value: function _onSingleTap(event) {
        if (!event.detail || event.detail.pointerType === 'mouse') {
          if (event.target.classList.contains('pswp__img')) {
            this.photoSwipeInstance.toggleDesktopZoom(event.detail.releasePoint);
          }
        } else {
          if (event.target.classList.contains('pswp__button')) {
            return;
          }

          event.target.closest('.pswp').querySelector('.pswp__ui').classList.toggle('pswp__ui--hidden');
        }
      }
    }, {
      key: '_onDoubleTap',
      value: function _onDoubleTap(point) {
        var initialZoomLevel = this.photoSwipeInstance.currItem.initialZoomLevel;

        if (this.photoSwipeInstance.getZoomLevel() !== initialZoomLevel) {
          this.photoSwipeInstance.zoomTo(initialZoomLevel, point, 333);
        } else {
          this.photoSwipeInstance.zoomTo(initialZoomLevel < 0.7 ? 1 : 1.33, point, 333);
        }
      }
    }, {
      key: '_onInitialZoomIn',
      value: function _onInitialZoomIn() {
        document.querySelector('.pswp__ui').classList.remove('pswp__ui--hidden');
      }
    }, {
      key: '_onInitialZoomOut',
      value: function _onInitialZoomOut() {
        document.querySelector('.pswp__ui').classList.add('pswp__ui--hidden');
      }

      /**
       * PhotoSwipe instance is automatically destroyed for us when it's closed. What we need to do is simply re-set
       * our in-memory instance to null and our own events
       */

    }, {
      key: '_destroyPhotoSwipe',
      value: function _destroyPhotoSwipe() {
        this.delegateRoot.off('pswpTap');
        this.photoSwipeInstance = null;
      }
    }]);

    return ProductImageZoom;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ProductImageZoom;

  /***/
},
/* 15 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var ProductReviews = function () {
    function ProductReviews(container) {
      _classCallCheck(this, ProductReviews);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);

      this.delegateElement.on('click', '.spr-summary-actions-newreview', this._onNewReviewClicked.bind(this));

      // Extending Shopify Reviews is a bit manual, but let's do it!

      window.SPRCallbacks = {};
      window.SPRCallbacks.onFormSuccess = this._onFormSuccess.bind(this);
      window.SPRCallbacks.onReviewsLoad = this._onReviewsLoad.bind(this);
    }

    _createClass(ProductReviews, [{
      key: 'destroy',
      value: function destroy() {
        this.delegateElement.off();
      }
    }, {
      key: '_updatePagination',
      value: function _updatePagination(event, target) {
        // Unfortunately, we have to use this ugly jQuery style stuff
        SPR.$(target).data('page', parseInt(target.getAttribute('data-page')) + 1);
      }
    }, {
      key: '_onFormSuccess',
      value: function _onFormSuccess() {
        var formSuccess = this.element.querySelector('.spr-form-message-success');
        window.scrollTo(0, formSuccess.offsetTop - 45);
      }
    }, {
      key: '_onReviewsLoad',
      value: function _onReviewsLoad() {
        // We want to move "spr-pagination-next" before the "new review" button in the "spr-summary-actions" div

        var sprSummaryActions = this.element.querySelector('.spr-summary-actions'),
            previousSprPaginationNext = sprSummaryActions.querySelector('.spr-pagination-next'),
            sprPaginationNext = this.element.querySelector('.spr-pagination .spr-pagination-next');

        if (previousSprPaginationNext) {
          previousSprPaginationNext.remove();
        }

        if (sprPaginationNext) {
          sprSummaryActions.insertBefore(sprPaginationNext, sprSummaryActions.firstChild);
        }
      }
    }, {
      key: '_onNewReviewClicked',
      value: function _onNewReviewClicked(event, target) {
        target.style.display = 'none';

        if (target.previousElementSibling) {
          target.previousElementSibling.style.display = 'none';
        }
      }
    }]);

    return ProductReviews;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ProductReviews;

  /***/
},
/* 16 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Dom__ = __webpack_require__(0);
  /**
   * Variant selector is a bit similar to the popover, but due to some differences, I've created a distinct class
   */

  var VariantSelector = function () {
    function VariantSelector(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, VariantSelector);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);

      this.activator = options['activator'] || document.querySelector('[aria-controls="' + element.getAttribute('id') + '"]');
      this.onValueChangedCallback = options['onValueChanged'] || function () {};
      this.isOpen = false;

      this.pageOverlayElement = document.querySelector('.PageOverlay');

      this.variantChoiceList = __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.VariantSelector__Choice'));
      this.variantCarousel = new __WEBPACK_IMPORTED_MODULE_1__Carousel__["default"](this.element.querySelector('.VariantSelector__Carousel'), {
        onSelect: this._variantChanged.bind(this),
        onClick: this._variantSelected.bind(this)
      });

      this._attachListeners();
    }

    _createClass(VariantSelector, [{
      key: 'destroy',
      value: function destroy() {
        this.element.removeEventListener('keyup', this._handleKeyboardListener);
        this.delegateElement.off('click');
        this.activator.removeEventListener('click', this._toggleListener);
        this.variantCarousel.destroy();
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.isOpen ? this.close() : this.open();
      }
    }, {
      key: 'open',
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.element.setAttribute('aria-hidden', 'false');
        this.activator.setAttribute('aria-expanded', 'true');

        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.element, 'variant-selector');

        document.documentElement.classList.add('no-scroll'); // Prevent scrolling when popover is open

        this.element.setAttribute('style', '');
        this.pageOverlayElement.classList.add('is-visible');
        this.pageOverlayElement.addEventListener('click', this._closeListener);

        this.isOpen = true;
      }
    }, {
      key: 'close',
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.element.setAttribute('aria-hidden', 'true');
        this.activator.setAttribute('aria-expanded', 'false');

        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].removeTrapFocus(this.element, 'variant-selector');

        document.documentElement.classList.remove('no-scroll');

        this.pageOverlayElement.classList.remove('is-visible');
        this.pageOverlayElement.removeEventListener('click', this._closeListener);

        this.isOpen = false;
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._handleKeyboardListener = this._handleKeyboard.bind(this);
        this._closeListener = this.close.bind(this);
        this._toggleListener = this.toggle.bind(this);

        this.element.addEventListener('keyup', this._handleKeyboardListener);
        this.activator.addEventListener('click', this._toggleListener);
        this.delegateElement.on('click', '[data-action="select-variant"]', this._onVariantSelect.bind(this));
      }

      /**
       * Called when the variant is changed (but not yet selected)
       */

    }, {
      key: '_variantChanged',
      value: function _variantChanged(selectedIndex) {
        var activeChoice = this.variantChoiceList[selectedIndex];

        activeChoice.classList.add('is-selected');
        __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].getSiblings(activeChoice, '.is-selected').forEach(function (item) {
          return item.classList.remove('is-selected');
        });
      }

      /**
       * Called when a variant is clicked or selected
       */

    }, {
      key: '_variantSelected',
      value: function _variantSelected(cellElement, cellIndex) {
        if (this.variantCarousel.getSelectedIndex() === cellIndex) {
          this.onValueChangedCallback(cellElement.getAttribute('data-option-value'), cellElement, this.activator);
          this.close();
        } else {
          this.variantCarousel.selectCell(cellIndex);
        }
      }

      /**
       * Called when the button "choose this variant" is explicitly clicked
       */

    }, {
      key: '_onVariantSelect',
      value: function _onVariantSelect() {
        var selectedCell = this.variantCarousel.flickityInstance.selectedCell.element;

        this.onValueChangedCallback(selectedCell.getAttribute('data-option-value'), selectedCell, this.activator);
        this.close();
      }

      /**
       * Handle a11y events
       */

    }, {
      key: '_handleKeyboard',
      value: function _handleKeyboard(event) {
        if (this.isOpen && event.keyCode === 27) {
          this.close();
        }
      }
    }]);

    return VariantSelector;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = VariantSelector;

  /***/
},
/* 17 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * This code has been heavily inspired by this: https://kitaitimakoto.gitlab.io/scrollspy-example/index.en.html#whatsthis
   */

  var ScrollSpy = function () {
    function ScrollSpy(container, elementsToSpy, observerOptions) {
      var _this12 = this;

      _classCallCheck(this, ScrollSpy);

      this.container = container;
      this.targets = [];
      this.targetIndices = {};
      this.indicesInViewPort = [];

      this.observer = new IntersectionObserver(this._onIntersectionChange.bind(this), observerOptions);

      elementsToSpy.forEach(function (elementToSpy, index) {
        _this12.targets.push(elementToSpy);
        _this12.targetIndices[elementToSpy.id] = index;
        _this12.observer.observe(elementToSpy);
      });
    }

    _createClass(ScrollSpy, [{
      key: 'destroy',
      value: function destroy() {
        this.observer.disconnect();
      }

      /**
       * Called whenever there is a change of visibility
       */

    }, {
      key: '_onIntersectionChange',
      value: function _onIntersectionChange(changes) {
        var oldTargetIndex = this.indicesInViewPort[0] || 0;

        for (var i = changes.length - 1; i >= 0; i--) {
          this._updateIndicesInViewPort(changes[i], oldTargetIndex);
        }

        // Firefox generates duplicates so make sure to remove
        this.indicesInViewPort = this.indicesInViewPort.filter(function (value, index, self) {
          return self.indexOf(value) === index;
        });

        if (this.indicesInViewPort.length === 0 || oldTargetIndex === this.indicesInViewPort[0]) {
          return;
        }

        var event = new CustomEvent('scrollspy:target:changed', {
          detail: {
            newTarget: this.targets[this.indicesInViewPort[0]],
            oldTarget: this.targets[oldTargetIndex]
          }
        });

        this.container.dispatchEvent(event);
      }

      /**
       * Update indices visible in the view port
       */

    }, {
      key: '_updateIndicesInViewPort',
      value: function _updateIndicesInViewPort(change, oldTargetIndex) {
        var index = this.targetIndices[change.target.id];

        if (change.intersectionRatio === 0) {
          var indexInViewPort = this.indicesInViewPort.indexOf(index);

          if (indexInViewPort !== -1) {
            this.indicesInViewPort.splice(indexInViewPort, 1);
          }
        } else {
          if (index < oldTargetIndex) {
            this.indicesInViewPort.unshift(index);
          } else if (index > this.indicesInViewPort[this.indicesInViewPort.length - 1]) {
            this.indicesInViewPort.push(index);
          } else {
            this.indicesInViewPort.push(index);
            this.indicesInViewPort.sort();
          }
        }
      }
    }]);

    return ScrollSpy;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ScrollSpy;

  /***/
},
/* 18 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Animation__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Currency__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__CountrySelector__ = __webpack_require__(12);

  var ShippingEstimator = function () {
    function ShippingEstimator(element) {
      _classCallCheck(this, ShippingEstimator);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.countrySelector = new __WEBPACK_IMPORTED_MODULE_2__CountrySelector__["default"](this.element.querySelector('[name="country"]'), this.element.querySelector('[name="province"]'));

      this._attachListeners();
    }

    _createClass(ShippingEstimator, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off('click');
        this.countrySelector.destroy();
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '.ShippingEstimator__Submit', this._fetchRates.bind(this));
      }
    }, {
      key: '_fetchRates',
      value: function _fetchRates() {
        var _this13 = this;

        var country = this.element.querySelector('[name="country"]').value,
            province = this.element.querySelector('[name="province"]').value,
            zip = this.element.querySelector('[name="zip"]').value;

        document.dispatchEvent(new CustomEvent('theme:loading:start'));

        fetch('/cart/shipping_rates.json?shipping_address[zip]=' + zip + '&shipping_address[country]=' + country + '&shipping_address[province]=' + province, {
          credentials: 'same-origin',
          method: 'GET'
        }).then(function (response) {
          response.json().then(function (result) {
            document.dispatchEvent(new CustomEvent('theme:loading:end'));

            var resultsContainer = _this13.element.querySelector('.ShippingEstimator__Results'),
                errorContainer = _this13.element.querySelector('.ShippingEstimator__Error');

            if (response.ok) {
              var shippingRates = result['shipping_rates'];

              if (shippingRates.length === 0) {
                resultsContainer.innerHTML = '<p>' + window.languages.shippingEstimatorNoResults + '</p>';
              } else {
                var html = '';

                if (shippingRates.length === 1) {
                  html += '<p>' + window.languages.shippingEstimatorOneResult + '</p><ul>';
                } else {
                  html += '<p>' + window.languages.shippingEstimatorMoreResults.replace('{{count}}', shippingRates.length) + '</p><ul>';
                }

                shippingRates.forEach(function (item) {
                  html += '<li>' + item['name'] + ': ' + __WEBPACK_IMPORTED_MODULE_1__helper_Currency__["default"].formatMoney(item['price'], window.theme.moneyFormat) + '</li>';
                });

                html += '</ul>';

                resultsContainer.firstElementChild.innerHTML = html;
              }

              TweenLite.fromTo(resultsContainer.firstElementChild, 0.6, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, delay: 0.35 });

              errorContainer.style.display = 'none';
              resultsContainer.style.display = 'block';

              __WEBPACK_IMPORTED_MODULE_0__helper_Animation__["default"].slideDown(resultsContainer);
            } else {
              var errorHtml = '';

              Object.keys(result).forEach(function (key) {
                errorHtml += '<li class="Alert__ErrorItem">' + key + ' ' + result[key] + '</li>';
              });

              errorContainer.innerHTML = '<ul class="Alert__ErrorList">' + errorHtml + '</ul>';

              resultsContainer.style.display = 'none';
              errorContainer.style.display = 'block';
            }
          });
        });
      }
    }]);

    return ShippingEstimator;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ShippingEstimator;

  /***/
},
/* 19 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * This implementation allows to serialize a form
   */

  var Form = function () {
    function Form() {
      _classCallCheck(this, Form);
    }

    _createClass(Form, null, [{
      key: 'serialize',
      value: function serialize(form) {
        function stringKey(key, value) {
          var beginBracket = key.lastIndexOf('[');

          if (beginBracket === -1) {
            var _hash = {};
            _hash[key] = value;
            return _hash;
          }

          var newKey = key.substr(0, beginBracket);
          var newValue = {};

          newValue[key.substring(beginBracket + 1, key.length - 1)] = value;

          return stringKey(newKey, newValue);
        }

        var hash = {};

        for (var i = 0, len = form.elements.length; i < len; i++) {
          var formElement = form.elements[i];

          if (formElement.name === '' || formElement.disabled) {
            continue;
          }

          if (formElement.name && !formElement.disabled && (formElement.checked || /select|textarea/i.test(formElement.nodeName) || /hidden|text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color/i.test(formElement.type))) {
            var stringKeys = stringKey(formElement.name, formElement.value);
            hash = Form.extend(hash, stringKeys);
          }
        }

        return hash;
      }
    }, {
      key: 'extend',
      value: function extend() {
        var extended = {};
        var i = 0;

        // Merge the object into the extended object
        var merge = function merge(obj) {
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              // If property is an object, merge properties
              if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                extended[prop] = Form.extend(extended[prop], obj[prop]);
              } else {
                extended[prop] = obj[prop];
              }
            }
          }
        };

        // Loop through each object and conduct a merge
        for (; i < arguments.length; i++) {
          merge(arguments[i]);
        }

        return extended;
      }
    }]);

    return Form;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Form;

  /***/
},
/* 20 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Animation__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__ = __webpack_require__(2);
  /**
   * Handle the collapsibles. This plugin is global, so it listens to any click on [data-action="toggle-collapsible"] element
   */

  var Collapsible = function () {
    function Collapsible() {
      _classCallCheck(this, Collapsible);

      this.domDelegate = new domDelegate.Delegate(document.body);
      this._attachListeners();
    }

    _createClass(Collapsible, [{
      key: '_attachListeners',
      value: function _attachListeners() {
        this.domDelegate.on('click', '[data-action="toggle-collapsible"]', this._toggleCollapsible.bind(this));
      }

      /**
       * Toggle a given collapsible
       */

    }, {
      key: '_toggleCollapsible',
      value: function _toggleCollapsible(event, target) {
        var _this14 = this;

        // If this is an auto-expand and that it reaches the needed breakpoint, we do nothing
        var parentCollapsible = target.closest('.Collapsible');

        if (parentCollapsible.classList.contains('Collapsible--autoExpand') && __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__["default"].matchesBreakpoint('tablet-and-up')) {
          return;
        }

        var isOpen = target.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          this._close(parentCollapsible, target);
        } else {
          this._open(parentCollapsible, target);
        }

        // We make sure to close any siblings collapsible as well
        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].getSiblings(parentCollapsible).forEach(function (collapsibleToClose) {
          return _this14._close(collapsibleToClose);
        });
        event.preventDefault();
      }

      /**
       * Open a given collapsible
       */

    }, {
      key: '_open',
      value: function _open(collapsible) {
        var toggleButton = collapsible.querySelector('.Collapsible__Button'),
            collapsibleInner = collapsible.querySelector('.Collapsible__Inner');

        if (!collapsibleInner || toggleButton.getAttribute('aria-expanded') === 'true') {
          return; // It's already open
        }

        toggleButton.setAttribute('aria-expanded', 'true');
        collapsibleInner.style.overflow = 'visible';
        __WEBPACK_IMPORTED_MODULE_0__helper_Animation__["default"].slideDown(collapsibleInner);
      }

      /**
       * Close a given collapsible
       */

    }, {
      key: '_close',
      value: function _close(collapsible) {
        var toggleButton = collapsible.querySelector('.Collapsible__Button'),
            collapsibleInner = collapsible.querySelector('.Collapsible__Inner');

        if (!collapsibleInner || toggleButton.getAttribute('aria-expanded') === 'false') {
          return; // It's already closed
        }

        toggleButton.setAttribute('aria-expanded', 'false');
        collapsibleInner.style.overflow = 'hidden';
        __WEBPACK_IMPORTED_MODULE_0__helper_Animation__["default"].slideUp(collapsibleInner);
      }
    }]);

    return Collapsible;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Collapsible;

  /***/
},
/* 21 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * Simple plugin that handles the loading bar actions
   *
   * This plugin uses delegate events so it's independent of the sections.
   */

  var LoadingBar = function () {
    function LoadingBar() {
      _classCallCheck(this, LoadingBar);

      this.element = document.querySelector('.LoadingBar');

      document.addEventListener('theme:loading:start', this._onLoadingStart.bind(this));
      document.addEventListener('theme:loading:end', this._onLoadingEnd.bind(this));

      this.element.addEventListener('transitionend', this._onTransitionEnd.bind(this));
    }

    _createClass(LoadingBar, [{
      key: '_onLoadingStart',
      value: function _onLoadingStart() {
        this.element.classList.add('is-visible');
        this.element.style.width = '40%';
      }
    }, {
      key: '_onLoadingEnd',
      value: function _onLoadingEnd() {
        this.element.style.width = '100%';
        this.element.classList.add('is-finished');
      }
    }, {
      key: '_onTransitionEnd',
      value: function _onTransitionEnd(event) {
        if (event.propertyName === 'width' && this.element.classList.contains('is-finished')) {
          this.element.classList.remove('is-visible');
          this.element.classList.remove('is-finished');
          this.element.style.width = '0';
        }
      }
    }]);

    return LoadingBar;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = LoadingBar;

  /***/
},
/* 22 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__ = __webpack_require__(3);
  /**
   * Handle the modals. This plugin is global, so it basically listens to any click on [data-action="open-modal"] and
   * [data-action="close-modal"] events
   */

  var Modal = function () {
    function Modal() {
      _classCallCheck(this, Modal);

      this.domDelegate = new domDelegate.Delegate(document.body);
      this.activeModal = null; // Keep track of the active modal
      this.wasLocked = false;

      this.pageOverlayElement = document.querySelector('.PageOverlay');

      this._attachListeners();
      this._checkOpenByHash();
    }

    _createClass(Modal, [{
      key: '_attachListeners',
      value: function _attachListeners() {
        this._closeListener = this._closeModal.bind(this);
        this._handleKeyboardListener = this._handleKeyboard.bind(this);

        this.domDelegate.on('click', '[data-action="open-modal"]', this._openModalEvent.bind(this));
        this.domDelegate.on('click', '[data-action="close-modal"]', this._closeModal.bind(this));
      }
    }, {
      key: '_openModalEvent',
      value: function _openModalEvent(event, target) {
        this._openModal(document.getElementById(target.getAttribute('aria-controls')));
        event.preventDefault();
        event.stopPropagation();
      }
    }, {
      key: '_openModal',
      value: function _openModal(modal) {
        var _this15 = this;

        if (this.activeModal || !modal) {
          return; // If there is already an open modal, we return as we only allows one modal at a time
        }

        this.activeModal = modal;
        this.domDelegate.on('keyup', this._handleKeyboardListener);

        if (document.documentElement.classList.contains('no-scroll')) {
          this.wasLocked = true;
        }

        fastdom.mutate(function () {
          __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].clearTrapFocus(); // Needed as the modal can be open on top of a popover

          _this15._onTransitionEndedListener = _this15._onTransitionEnded.bind(_this15);
          _this15.activeModal.addEventListener('transitionend', _this15._onTransitionEndedListener);

          _this15.activeModal.setAttribute('aria-hidden', 'false');
          document.documentElement.classList.add('no-scroll');

          // If the modal is not a fullscreen modal, then we also display the overlay
          if (!_this15.activeModal.classList.contains('Modal--fullScreen')) {
            _this15.pageOverlayElement.classList.add('is-visible');
            _this15.pageOverlayElement.addEventListener('click', _this15._closeListener);
          }
        });
      }
    }, {
      key: '_closeModal',
      value: function _closeModal() {
        var _this16 = this;

        if (!this.activeModal) {
          return; // If no modal are open, we return immediately
        }

        this.activeModal.removeEventListener('keyup', this._handleKeyboardListener);
        this.domDelegate.off('keyup');

        fastdom.mutate(function () {
          // If the modal is of video type, we need to remove the iframe to stop the video
          if (_this16.activeModal.classList.contains('Modal--videoContent')) {
            _this16._resetVideoListener = _this16._resetVideo.bind(_this16);
            _this16.activeModal.addEventListener('transitionend', _this16._resetVideoListener);
          }

          __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].removeTrapFocus(_this16.activeModal, 'modal');

          if (!_this16.activeModal.classList.contains('Modal--fullScreen')) {
            _this16.pageOverlayElement.classList.remove('is-visible');
            _this16.pageOverlayElement.removeEventListener('click', _this16._closeListener);
          }

          _this16.activeModal.setAttribute('aria-hidden', 'true');
          _this16.activeModal = null;

          if (!_this16.wasLocked) {
            document.documentElement.classList.remove('no-scroll');
          }
        });
      }
    }, {
      key: '_onTransitionEnded',
      value: function _onTransitionEnded(event) {
        if (event.propertyName !== 'visibility') {
          return;
        }

        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.activeModal, 'modal'); // Trap the focus first (as this trigger reflows)

        this.activeModal.removeEventListener('transitionend', this._onTransitionEndedListener);
      }
    }, {
      key: '_resetVideo',
      value: function _resetVideo(event) {
        if (event.propertyName !== 'visibility') {
          return; // We check the visibility property as it's the one LazySizes uses for triggering lazyloading
        }

        var iframe = event.target.querySelector('iframe');
        iframe.parentNode.innerHTML = '<iframe class="Image--lazyLoad" data-src=' + iframe.getAttribute('data-src') + ' frameborder="0" allowfullscreen>';

        event.target.removeEventListener('transitionend', this._resetVideoListener);
      }

      /**
       * Some forms needs to be open inside a modal, and on page reload we must make sure to properly open the modal again
       */

    }, {
      key: '_checkOpenByHash',
      value: function _checkOpenByHash() {
        var hash = window.location.hash,
            modal = document.getElementById(hash.replace('#', ''));

        if (modal && modal.classList.contains('Modal')) {
          this._openModal(modal);
        }
      }

      /**
       * Handle a11y events
       */

    }, {
      key: '_handleKeyboard',
      value: function _handleKeyboard(event) {
        if (null !== this.activeModal && event.keyCode === 27) {
          this._closeModal();
        }
      }
    }]);

    return Modal;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Modal;

  /***/
},
/* 23 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /**
   * This class will coordinate all the transitions from the website
   */

  var PageTransition = function () {
    _createClass(PageTransition, null, [{
      key: 'getInstance',
      value: function getInstance() {
        if (!this.instance) {
          this.instance = new PageTransition();
        }

        return this.instance;
      }
    }]);

    function PageTransition() {
      _classCallCheck(this, PageTransition);

      this.domDelegate = new domDelegate.Delegate(document.body);
      this.isPageLoaded = window.theme.showPageTransition || document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive';
      this.pageTransition = document.querySelector('.PageTransition');

      if (!this.isPageLoaded) {
        document.addEventListener('DOMContentLoaded', this._onPageLoaded.bind(this));
      } else {
        this._onPageLoaded();
      }

      this._attachListeners();
    }

    _createClass(PageTransition, [{
      key: '_attachListeners',
      value: function _attachListeners() {
        this.domDelegate.on('click', 'a[href]:not([href^="#"]):not([href^="javascript:"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])', this._onPageUnload.bind(this));
      }

      /**
       * This callback is called only once, when the page is loaded
       */

    }, {
      key: '_onPageLoaded',
      value: function _onPageLoaded() {
        this.isPageLoaded = true;

        // If the merchant has enabled full page transitions, we display it
        if (window.theme.showPageTransition && this.pageTransition) {
          new TimelineLite().fromTo(this.pageTransition, 0.25, { autoAlpha: 1, ease: Linear.easeNone }, { autoAlpha: 0, ease: Linear.easeNone });
        }
      }

      /**
       * This callback captures click and transition from one page to another by doing a transition
       */

    }, {
      key: '_onPageUnload',
      value: function _onPageUnload(event, target) {
        if (event.defaultPrevented || event.metaKey || !window.theme.showPageTransition || !this.pageTransition) {
          return;
        }

        event.preventDefault(); // Prevent the click to happen

        if (window.theme.showPageTransition && this.pageTransition) {
          var timeline = new TimelineLite({
            onComplete: function onComplete() {
              window.location.href = target.href;
            }
          });

          timeline.fromTo(this.pageTransition, 0.25, { autoAlpha: 0, ease: Linear.easeNone }, { autoAlpha: 1, ease: Linear.easeNone });
        }
      }
    }]);

    return PageTransition;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = PageTransition;

  /***/
},
/* 24 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__ = __webpack_require__(3);

  var Search = function () {
    function Search() {
      _classCallCheck(this, Search);

      this.searchElement = document.querySelector('.Ajax_Search');
      this.searchGlobalElement = document.getElementById('Search');
      this.searchInputElement = this.searchElement.querySelector('[name="q"]');
      this.searchInputGlobalElement = this.searchGlobalElement.querySelector('[name="q"]');
      this.searchResultsElement = this.searchElement.querySelector('.Search__Results');
      this.searchResultsGlobalElement = this.searchGlobalElement.querySelector('.Search__Results');
                  
      this.queryMap = {};

      this.searchInputElement.addEventListener('keydown', this._preventSubmission.bind(this));
      this.searchInputElement.addEventListener('input', this._debounce(this._onInput.bind(this), 250));
      
      this.searchInputGlobalElement.addEventListener('keydown', this._preventSubmission.bind(this));
      this.searchInputGlobalElement.addEventListener('input', this._debounce(this._onInput.bind(this), 250));
    }

    /**
     * Open the search form and trap focus
     */


    _createClass(Search, [{
      key: '_openSearch',
      value: function _openSearch(event) {
        var _this17 = this;

        this.searchElement.setAttribute('aria-hidden', 'false');
        this.searchGlobalElement.setAttribute('aria-hidden', 'false');

        document.documentElement.classList.add('no-scroll');
        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.searchElement, 'search', this.searchElement.querySelector('[name="q"]'));
        document.documentElement.classList.add('no-scroll');
        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.searchGlobalElement, 'search', this.searchGlobalElement.querySelector('[name="q"]'));

        var onFocusListener = function onFocusListener() {
          _this17.searchInputElement.focus();
          _this17.searchElement.removeEventListener('transitionend', onFocusListener);
          
          _this17.searchInputGlobalElement.focus();
          _this17.searchGlobalElement.removeEventListener('transitionend', onFocusListener);
        };

        this.searchElement.addEventListener('transitionend', onFocusListener);
        this.searchGlobalElement.addEventListener('transitionend', onFocusListener);
                
        event.preventDefault();
      }

      /**
       * Close the search form and clear focus
       */

    }, {
      key: '_closeSearch',
      value: function _closeSearch() {
        this.searchElement.setAttribute('aria-hidden', 'true');
        this.searchGlobalElement.setAttribute('aria-hidden', 'true');

        document.documentElement.classList.remove('no-scroll');
        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].removeTrapFocus(this.searchElement, 'search');
        document.documentElement.classList.remove('no-scroll');
        __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].removeTrapFocus(this.searchGlobalElement, 'search');
      }

      /**
       * In order to prevent an odd UX where hitting the enter always choose the product results, if the search is set to product + something else,
       * then we disable submission using enter key
       */

    }, {
      key: '_preventSubmission',
      value: function _preventSubmission(event) {
        if (event.keyCode === 13 && window.theme.searchMode !== 'product') {
          event.preventDefault();
        }
      }

      /**
       * This is called when the user has stopped typing (after debounce delay)
       */

    }, {
      key: '_onInput',
      value: function _onInput(event) {
        var _this18 = this;

        if (event.keyCode === 13) {
          return;
        }

        // Unfortunately, fetch does not support as of today cancelling a request. As a consequence what we do is that we manually
        // keep track of sent requests, and only use the results of the last one
        this.lastInputValue = event.target.value;

        if (this.lastInputValue === '') {
          this._resetSearch();
          return;
        }

        var queryOptions = { method: 'GET', credentials: 'same-origin' };

        var queries = [fetch('/search?view=ajax&q=' + encodeURIComponent(this.lastInputValue) + '* AND tag:show&type=product', queryOptions)];

        if (window.theme.searchMode !== 'product') {
          queries.push(fetch('/search?view=ajax&q=' + encodeURIComponent(this.lastInputValue) + '*&type=' + window.theme.searchMode.replace('product,', ''), queryOptions));
        }

        this.queryMap[this.lastInputValue] = true;

        document.dispatchEvent(new CustomEvent('theme:loading:start'));

        Promise.all(queries).then(function (responses) {
          // If we receive the result for a query that is not the last one, we simply do not process the result
          if (_this18.lastInputValue !== event.target.value) {
            return;
          }

          delete _this18.queryMap[event.target.value];

          Promise.all(responses.map(function (response) {
            return response.text();
          })).then(function (contents) {
            // If we have only one content then we only have product, otherwise we have products and articles
            if (window.theme.searchMode === 'product') {
              _this18.searchResultsElement.innerHTML = contents[0];
              _this18.searchResultsGlobalElement.innerHTML = contents[0];
            } else {
              _this18.searchResultsElement.innerHTML = '<div class="PageLayout PageLayout--breakLap">\n              <div class="PageLayout__Section">' + contents[0] + '</div>\n              <div class="PageLayout__Section PageLayout__Section--secondary">' + contents[1] + '</div>\n            </div>';
              _this18.searchResultsGlobalElement.innerHTML = '<div class="PageLayout PageLayout--breakLap">\n              <div class="PageLayout__Section">' + contents[0] + '</div>\n              <div class="PageLayout__Section PageLayout__Section--secondary">' + contents[1] + '</div>\n            </div>';
            }
            
            var api = new Yotpo.API(yotpo);
          	api.refreshWidgets();
          });
          document.dispatchEvent(new CustomEvent('theme:loading:end'));
          
        });
      }
    }, {
      key: '_resetSearch',
      value: function _resetSearch() {
        if (window.theme.searchMode === 'product') {
          this.searchResultsElement.innerHTML = '';
          this.searchResultsGlobalElement.innerHTML = '';
        } else {
          this.searchResultsElement.innerHTML = '<div class="PageLayout PageLayout--breakLap">\n              <div class="PageLayout__Section"></div>\n              <div class="PageLayout__Section PageLayout__Section--secondary"></div>\n            </div>';
          this.searchResultsGlobalElement.innerHTML = '<div class="PageLayout PageLayout--breakLap">\n              <div class="PageLayout__Section"></div>\n              <div class="PageLayout__Section PageLayout__Section--secondary"></div>\n            </div>';
        }

        document.dispatchEvent(new CustomEvent('theme:loading:end')); // Just in case
      }

      /**
       * Simple function that allows to debounce
       */

    }, {
      key: '_debounce',
      value: function _debounce(fn, delay) {
        var _this19 = this;

        var timer = null;

        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          clearTimeout(timer);

          timer = setTimeout(function () {
            fn.apply(_this19, args);
          }, delay);
        };
      }
    }]);

    return Search;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Search;

  /***/
},
/* 25 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Carousel__ = __webpack_require__(1);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "Carousel", function () {
    return __WEBPACK_IMPORTED_MODULE_0__Carousel__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__Collapsible__ = __webpack_require__(20);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "Collapsible", function () {
    return __WEBPACK_IMPORTED_MODULE_1__Collapsible__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__Drawer__ = __webpack_require__(8);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "Drawer", function () {
    return __WEBPACK_IMPORTED_MODULE_2__Drawer__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__LoadingBar__ = __webpack_require__(21);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "LoadingBar", function () {
    return __WEBPACK_IMPORTED_MODULE_3__LoadingBar__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__Modal__ = __webpack_require__(22);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "Modal", function () {
    return __WEBPACK_IMPORTED_MODULE_4__Modal__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__Popover__ = __webpack_require__(9);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "Popover", function () {
    return __WEBPACK_IMPORTED_MODULE_5__Popover__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__PageTransition__ = __webpack_require__(23);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "PageTransition", function () {
    return __WEBPACK_IMPORTED_MODULE_6__PageTransition__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__ProductItemColorSwatch__ = __webpack_require__(4);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ProductItemColorSwatch", function () {
    return __WEBPACK_IMPORTED_MODULE_7__ProductItemColorSwatch__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__ProductImageZoom__ = __webpack_require__(14);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ProductImageZoom", function () {
    return __WEBPACK_IMPORTED_MODULE_8__ProductImageZoom__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_9__ProductReviews__ = __webpack_require__(15);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ProductReviews", function () {
    return __WEBPACK_IMPORTED_MODULE_9__ProductReviews__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_10__ProductVariants__ = __webpack_require__(11);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ProductVariants", function () {
    return __WEBPACK_IMPORTED_MODULE_10__ProductVariants__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_11__ScrollSpy__ = __webpack_require__(17);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ScrollSpy", function () {
    return __WEBPACK_IMPORTED_MODULE_11__ScrollSpy__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_12__Search__ = __webpack_require__(24);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "Search", function () {
    return __WEBPACK_IMPORTED_MODULE_12__Search__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_13__ShippingEstimator__ = __webpack_require__(18);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ShippingEstimator", function () {
    return __WEBPACK_IMPORTED_MODULE_13__ShippingEstimator__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_14__VariantSelector__ = __webpack_require__(16);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "VariantSelector", function () {
    return __WEBPACK_IMPORTED_MODULE_14__VariantSelector__["default"];
  });

  /***/
},
/* 26 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(6);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_CountrySelector__ = __webpack_require__(12);

  var AddressesSection = function AddressesSection() {
    var _this20 = this;

    _classCallCheck(this, AddressesSection);

    this.countrySelectors = [];

    __WEBPACK_IMPORTED_MODULE_0__helper__["DomHelper"].nodeListToArray(document.querySelectorAll('.Modal--address')).forEach(function (modal) {
      _this20.countrySelectors.push(new __WEBPACK_IMPORTED_MODULE_1__components_CountrySelector__["default"](modal.querySelector('[name="address[country]"]'), modal.querySelector('[name="address[province]"]')));
    });
  };
  /* harmony export (immutable) */

  __webpack_exports__["default"] = AddressesSection;

  /***/
},
/* 27 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);

  var ArticleList = function () {
    function ArticleList(container) {
      var _this21 = this;

      _classCallCheck(this, ArticleList);

      this.element = container;

      if (window.theme.showElementStaggering) {
        this.timeline = new TimelineLite({ delay: window.theme.showPageTransition ? 0.5 : 0 });

        this.intersectionObserver = new IntersectionObserver(this._reveal.bind(this));

        __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.ArticleItem')).forEach(function (item) {
          _this21.intersectionObserver.observe(item);
        });
      }
    }

    _createClass(ArticleList, [{
      key: 'onUnload',
      value: function onUnload() {
        if (window.theme.showElementStaggering) {
          this.intersectionObserver.disconnect();
          this.timeline.kill();
        }
      }
    }, {
      key: '_reveal',
      value: function _reveal(results) {
        var _this22 = this;

        var toReveal = [];

        results.forEach(function (result) {
          if (result.isIntersecting || result.intersectionRatio > 0) {
            // isIntersecting does not exist on Samsung Android browser
            toReveal.push(result.target);
            _this22.intersectionObserver.unobserve(result.target);
          }
        });

        if (toReveal.length === 0) {
          return;
        }

        this.timeline.staggerFromTo(toReveal, 0.45, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 0.2);
      }
    }]);

    return ArticleList;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ArticleList;

  /***/
},
/* 28 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);

  var ArticleSection = function () {
    function ArticleSection(container) {
      var _this23 = this;

      _classCallCheck(this, ArticleSection);

      this.element = container;
      this.toolbarElement = this.element.querySelector('.ArticleToolbar');
      this.articleNavElement = this.element.querySelector('.ArticleNav');

      var articleImageElement = this.element.querySelector('.Article__Image');

      if (articleImageElement && window.matchMedia('(-moz-touch-enabled: 0), (hover: hover)').matches) {
        this.parallaxInstance = new Rellax('.Article__Image', {
          speed: -7,
          center: false,
          round: true
        });
      }

      if (window.theme.showElementStaggering) {
        this.timeline = new TimelineLite({ delay: window.theme.showPageTransition ? 0.5 : 0 });
        this.intersectionObserver = new IntersectionObserver(this._reveal.bind(this));

        __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.ArticleItem')).forEach(function (item) {
          _this23.intersectionObserver.observe(item);
        });
      }

      this._attachListeners();
    }

    _createClass(ArticleSection, [{
      key: 'onUnload',
      value: function onUnload() {
        if (this.parallaxInstance) {
          this.parallaxInstance.destroy();
        }

        if (window.theme.showElementStaggering) {
          this.intersectionObserver.disconnect();
          this.timeline.kill();
        }

        window.removeEventListener('scroll', this._onScrollListener);
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._onScrollListener = this._checkToolbarVisibility.bind(this);
        window.addEventListener('scroll', this._onScrollListener);
      }
    }, {
      key: '_checkToolbarVisibility',
      value: function _checkToolbarVisibility() {
        var _this24 = this;

        var lastYPosition = 0,
            headerHeight = 0,
            navBottom = 0,
            isFixedHeader = 0,
            header = document.querySelector('.Header');

        fastdom.measure(function () {
          lastYPosition = window.pageYOffset;
          headerHeight = header.offsetHeight;
          isFixedHeader = parseInt(window.getComputedStyle(document.body).getPropertyValue('--use-sticky-header') || 0);

          if (_this24.articleNavElement) {
            navBottom = _this24.articleNavElement.offsetTop + _this24.articleNavElement.clientHeight - headerHeight;
          }
        });

        fastdom.mutate(function () {
          _this24.toolbarElement.style.top = isFixedHeader ? headerHeight + 'px' : null;

          if (_this24.articleNavElement) {
            if (lastYPosition > 150 && _this24.articleNavElement && lastYPosition < navBottom) {
              _this24.toolbarElement.classList.add('is-visible');
            } else {
              _this24.toolbarElement.classList.remove('is-visible');
            }
          } else {
            if (lastYPosition > 150) {
              _this24.toolbarElement.classList.add('is-visible');
            } else {
              _this24.toolbarElement.classList.remove('is-visible');
            }
          }
        });
      }
    }, {
      key: '_reveal',
      value: function _reveal(results) {
        var _this25 = this;

        var toReveal = [];

        results.forEach(function (result) {
          if (result.isIntersecting || result.intersectionRatio > 0) {
            // isIntersecting does not exist on Samsung Android browser
            toReveal.push(result.target);
            _this25.intersectionObserver.unobserve(result.target);
          }
        });

        if (toReveal.length === 0) {
          return;
        }

        this.timeline.staggerFromTo(toReveal, 0.45, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 0.2);
      }
    }]);

    return ArticleSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ArticleSection;

  /***/
},
/* 29 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var BackgroundVideoSection = function () {
    function BackgroundVideoSection(container) {
      _classCallCheck(this, BackgroundVideoSection);

      this.element = container;
      this.options = JSON.parse(this.element.getAttribute('data-section-settings'));

      this._loadScript().then(this._setupPlayer.bind(this));
    }

    _createClass(BackgroundVideoSection, [{
      key: '_loadScript',
      value: function _loadScript() {
        var _this26 = this;

        return new Promise(function (resolve, reject) {
          var script = document.createElement('script');
          document.body.appendChild(script);
          script.onload = resolve;
          script.onerror = reject;
          script.async = true;
          script.src = _this26.options['videoType'] === 'youtube' ? '//www.youtube.com/iframe_api' : '//player.vimeo.com/api/player.js';
        });
      }
    }, {
      key: 'onUnload',
      value: function onUnload() {
        if (this.player) {
          this.player.destroy(); // Both YouTube and Vimeo use the same function name
        }
      }
    }, {
      key: '_setupPlayer',
      value: function _setupPlayer() {
        var _this27 = this;

        var elementToInsert = this.element.querySelector('.ImageHero__VideoHolder');

        var playerLoadingInterval = setInterval(function () {
          if (_this27.options['videoType'] === 'youtube') {
            if (window.YT) {
              _this27.player = new YT.Player(elementToInsert, {
                videoId: _this27.options['videoId'],
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  fs: 0,
                  rel: 0,
                  height: '100%',
                  width: '100%',
                  iv_load_policy: 3,
                  html5: 1,
                  loop: 1,
                  playsinline: 1,
                  modestbranding: 1,
                  disablekb: 1,
                  origin: _this27.options['requestHost']
                },
                events: {
                  onReady: _this27._onYouTubeReady.bind(_this27),
                  onStateChange: _this27._onYouTubeStateChange.bind(_this27)
                }
              });

              clearInterval(playerLoadingInterval);
            }
          } else {
            if (window.Vimeo) {
              _this27.player = new Vimeo.Player(elementToInsert.parentNode, {
                id: _this27.options['videoId'],
                autoplay: true,
                muted: true,
                background: true,
                /*height: '100%',
                width: '100%',*/
                loop: true
              });
            }
          }
        }, 50);
      }
    }, {
      key: '_onYouTubeReady',
      value: function _onYouTubeReady(event) {
        this.player.mute();
        this.player.playVideo();
      }
    }, {
      key: '_onYouTubeStateChange',
      value: function _onYouTubeStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
          this.player.playVideo();
        }
      }
    }]);

    return BackgroundVideoSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = BackgroundVideoSection;

  /***/
},
/* 30 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Drawer__ = __webpack_require__(8);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Currency__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__components_ShippingEstimator__ = __webpack_require__(18);

  var CartSection = function () {
    function CartSection(container) {
      _classCallCheck(this, CartSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = JSON.parse(this.element.getAttribute('data-section-settings'));
      this.itemCount = this.options['itemCount'];
      this.isCartNoteOpen = false;

      if (this.options['drawer']) {
        this.sidebarDrawer = new __WEBPACK_IMPORTED_MODULE_0__components_Drawer__["default"](this.element, {
          onClose: this._onDrawerClosed.bind(this)
        });
      }

      if (this.options['hasShippingEstimator']) {
        this.shippingEstimator = new __WEBPACK_IMPORTED_MODULE_3__components_ShippingEstimator__["default"](this.element.querySelector('.ShippingEstimator'));
      }

      this._attachListeners();
      getThis8 = this;
    }

    _createClass(CartSection, [{
      key: 'onUnload',
      value: function onUnload() {
        if (this.options['hasShippingEstimator']) {
          this.shippingEstimator.destroy();
        }

        this.delegateElement.off();
        document.removeEventListener('product:added', this._onProductAddedListener);
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._onProductAddedListener = this._onProductAdded.bind(this);

        this.delegateElement.on('change', '#cart-note', this._updateCartNote.bind(this));

        if (this.options['type'] !== 'page') {
          this.delegateElement.on('click', '[data-action="update-item-quantity"], [data-action="remove-item"]', this._updateItemQuantity.bind(this));
          this.delegateElement.on('change', '.QuantitySelector__CurrentQuantity', this._updateItemQuantity.bind(this));
          this.delegateElement.on('click', '[data-action="add-sample"]', this._addSample.bind(this));
          this.delegateElement.on('click', '[data-action="add-free-gift"]', this._addFreeGift.bind(this));
          this.delegateElement.on('change','#gift-wrapping', this._addGiftWrapping.bind(this));
          this.delegateElement.on('click', '[data-action="add-gift-wrapping-msg"]', this._addGiftWrappingMessage.bind(this));
          this._checkCart();
        } else {
          this.delegateElement.on('change', '.QuantitySelector__CurrentQuantity', this._reloadPageWithQuantity.bind(this));
        }

        // We have some listeners that are specific to the fact it's a drawer or the dedicated cart page
        if (this.options['drawer']) {
          this.delegateElement.on('click', '[data-action="toggle-cart-note"]', this._toggleCartNote.bind(this));
        }

        document.addEventListener('product:added', this._onProductAddedListener);
      }
    }, {
      key : '_checkCart',
      value : function _checkCart(){
        var form = document.querySelectorAll('[data-cart-info]')[0];
        if(form === undefined) {
          return;
        }
        var info = JSON.parse(form.getAttribute('data-cart-info'));
        var clear = false;
        if(typeof info == "object"){
          if(info.itemCount > 0 && info.total_price === 0){
            clear = true;
          }
          if(info.gwp && info.total_price === info.gwpp){
            clear = true;
          }
        }
        if(clear){
          document.dispatchEvent(new CustomEvent('theme:loading:start'));
          fetch('/cart/clear.js', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
            }
          }).then(function () {
            window.location.reload();
            document.dispatchEvent(new CustomEvent('theme:loading:end'));
          });
        }
      }
    },{
      key : '_addSample',
      value : function _selectSample(event, target){
        event.preventDefault();
        var _$this = this;
        target.setAttribute('disabled', true)
        var variantId = parseInt(target.getAttribute('data-id'));
        document.dispatchEvent(new CustomEvent('theme:loading:start'));
        fetch('/cart/add.js', {
          body: JSON.stringify({ id: variantId, quantity: 1 }),
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
          }
        }).then(function (cart) {
          cart.json().then(function (content) {
            _$this.itemCount += 1;
            _tocart = content;
            _$this._rerenderCart();
            document.dispatchEvent(new CustomEvent('theme:loading:end'));
          });
        });
      }
    },{
      key : '_addFreeGift',
      value : function _addFreeGift(event, target){
        event.preventDefault();
        var _$this = this;
        target.setAttribute('disabled', true)
        var data = JSON.parse(target.getAttribute('data-p'));
        var payload = "id=" + data.id + "&properties%5B_g%5D=" + data.g + "&properties%5B_m%5D=" + data.m + "&properties%5B_s%5D=" + data.s + "&properties%5B_d%5D=" + data.d;
        $.getJSON("/cart.js", function(result){
           var $cart = result;
           for (var i = 0; i < $cart.items.length; i++) {
             console.log($cart.items[i], $cart.items[i].properties['_g'] );
             if ($cart.items[i].properties['_g'] == 'true') {
               CartJS.removeItem(i+1);
               break;
             }
           }
           setTimeout(function(){
             document.dispatchEvent(new CustomEvent('theme:loading:start'));
             fetch('/cart/add.js', {
               body: payload,
               credentials: 'same-origin',
               method: 'POST',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
               }
             }).then(function (cart) {
               // console.log(cart);
               cart.json().then(function (content) {
                 _$this.itemCount += 1;
                 _$this._rerenderCart();
                 document.dispatchEvent(new CustomEvent('theme:loading:end'));
               });
             }).catch((err) => {
               console.log(err)
             });
           },700)
        });
      }
    },{
      key : '_addGiftWrapping',
      value: function _addGiftWrapping(event, target){
        var _$this = this;
        document.dispatchEvent(new CustomEvent('theme:loading:start'));
        var variantId = target.getAttribute('data-id');
        var payload = {
          updates : {},
          attributes: {}
        };
        if(target.checked){
          payload.attributes['gift-wrapping'] = true;
          payload.updates[variantId] = 1;
        }else{
          payload.attributes['gift-wrapping'] = '';
          payload.updates[variantId] = 0;
        }
        fetch('/cart/update.js', {
          body: JSON.stringify(payload),
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
          }
        }).then(function (cart) {
          cart.json().then(function (content) {
            _$this.itemCount = content['item_count'];
            _$this._rerenderCart()
            document.dispatchEvent(new CustomEvent('theme:loading:end'));
          });
        });
      }
    },{
      key : '_addGiftWrappingMessage',
      value : function _addGiftWrappingMessage(event, target){
          var container = $(target).parent("div").find(".gift-message");
          container.slideToggle("fast",function(){
            container.find("textarea").focus();
          });
      }
    },{
      key: '_updateCartNote',
      value: function _updateCartNote(event, target) {
        fetch('/cart/update.js', {
          body: JSON.stringify({ note: target.value }),
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
          }
        });
      }
    }, {
      key: '_toggleCartNote',
      value: function _toggleCartNote() {
        var _this28 = this;

        var noteContainer = this.element.querySelector('.Cart__OffscreenNoteContainer'),
            cartNote = this.element.querySelector('#cart-note');

        this.element.classList.toggle('has-note-open');
        this.element.querySelector('.Cart__NoteButton').innerHTML = cartNote.value !== '' ? window.languages.cartEditNote : window.languages.cartAddNote;

        noteContainer.setAttribute('aria-hidden', noteContainer.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');

        this.isCartNoteOpen = noteContainer.getAttribute('aria-hidden') === 'false';

        if (this.element.classList.contains('has-note-open')) {
          var transitionEndListener = function transitionEndListener() {
            _this28.element.querySelector('#cart-note').focus();
            noteContainer.removeEventListener('transitionend', transitionEndListener);
          };

          noteContainer.addEventListener('transitionend', transitionEndListener);
        }
      }
    }, {
      key: '_updateItemQuantity',
      value: function _updateItemQuantity(event, target) {
        var _this29 = this;

        document.dispatchEvent(new CustomEvent('theme:loading:start'));

        var quantity = null,
            elementToAnimate = null;

        if (target.tagName === 'INPUT') {
          quantity = parseInt(Math.max(parseInt(target.value) || 1, 1));
        } else {
          quantity = parseInt(target.getAttribute('data-quantity'));
        }

        // If the quantity is 0, then we will animate the product with a removal effect
        if (quantity === 0) {
          elementToAnimate = target.closest('.CartItemWrapper');
        }

        fetch('/cart/change.js', {
          body: JSON.stringify({ id: target.getAttribute('data-line-id'), quantity: quantity }),
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
          }
        }).then(function (cart) {
          cart.json().then(function (content) {
            _this29.itemCount = content['item_count'];
            _this29._rerenderCart(elementToAnimate)
            document.dispatchEvent(new CustomEvent('theme:loading:end'));
          });
        });

        event.preventDefault();
        
      }
    }, {
      key: '_reloadPageWithQuantity',
      value: function _reloadPageWithQuantity(event, target) {
        window.location.href = '/cart/change?quantity=' + parseInt(target.value) + '&id=' + target.getAttribute('data-line-id');
      }
    }, {
      key: '_onProductAdded',
      value: function _onProductAdded(event) {
        var _this30 = this;

        this.itemCount += event.detail.quantity;


        this._rerenderCart().then(function () {
          if(_this30.sidebarDrawer){
            _this30.sidebarDrawer.open();
          }
        });
      }
    }, {
      key: '_onDrawerClosed',
      value: function _onDrawerClosed() {
        if (this.isCartNoteOpen) {
          this._toggleCartNote();
        }
      }

      /**
       * This method is called internally to rerender the cart, based on the content returned by Shopify Ajax API.
       * We could save some performance by updating directly in JavaScript instead of doing a GET call to get the HTML
       * from Shopify, but by experience, this allows for easier app integration as it allows the Liquid to re-run
       * all the time and hence having easier logic.
       */

    }, {
      key: '_rerenderCart',
      value: function _rerenderCart(elementToAnimate) {
        var _this31 = this;

        // The only thing that we do in JavaScript is checking that if there are no items, we remove the dot in the header
        var cartDot = __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(document.querySelectorAll('.Header__CartDot')),
            cartQuantity = __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(document.querySelectorAll('.Header__CartCount'));

        cartDot.forEach(function (item) {
          if (_this31.itemCount === 0) {
            item.classList.remove('is-visible'); // IE 11 and lower does not support second attribute of toggle :(
          } else {
            item.classList.add('is-visible');
          }
        });

        cartQuantity.forEach(function (item) {
          item.textContent = _this31.itemCount;
        });

        // Note: appending a timestamp is necessary as the polyfill on IE11 and lower does not support the "cache" property
        return fetch('/cart?view=' + (this.options['drawer'] ? 'drawer' : 'ajax') + '&timestamp=' + Date.now(), {
          credentials: 'same-origin',
          method: 'GET'
        }).then(function (content) {
          // If there is an element to animate, we animate it using a transition
          if (_this31.options['drawer'] && elementToAnimate) {
            var timelineLite = new TimelineLite({ onComplete: function onComplete() {
                content.text().then(function (html) {
                  _this31._replaceContent(html);
                });
              } });

            timelineLite.to(elementToAnimate, 0.5, { height: 0, opacity: 0, ease: Cubic.easeOut }, 0);

            if (_this31.itemCount === 0) {
              timelineLite.to(_this31.element.querySelector('.Drawer__Footer'), 0.5, { y: '100%', transition: 'none', ease: Cubic.easeInOut }, 0);
            }


              addInYotpo();

              $.getJSON("/cart.js", function(result){
                calculateProgressbar(result);
                if (result.item_count > 0 ) {
                  clearInterval(bigTimer);
                  //timerCountDownClearCart();
                }
                else {
                  localStorage.removeItem('carttime');
                }
              });

          } else {
            content.text().then(function (html) {
              _this31._replaceContent(html);
                addInYotpo();
                $.getJSON("/cart.js", function(result){
                  calculateProgressbar(result);
                  if (result.item_count > 0 ) {
                    clearInterval(bigTimer);
                    //timerCountDownClearCart();
                  }
                  else {
                    console.log('0 product ?');
                    localStorage.removeItem('carttime');
                  }
                });

            });
          }
        });
      }
    }, {
      key: '_replaceContent',
      value: function _replaceContent(html) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Convert in background
        if (window.theme.currencyConversionEnabled) {
          __WEBPACK_IMPORTED_MODULE_2__helper_Currency__["default"].convertAll(tempElement);
        }

        var cartNodeParent = this.element.querySelector('.Cart').parentNode;

        if (this.options['drawer']) {
          var currentScrollPosition = this.element.querySelector('.Drawer__Main').scrollTop;
          cartNodeParent.replaceChild(tempElement.querySelector('.Cart'), this.element.querySelector('.Cart'));
          this.element.querySelector('.Drawer__Main').scrollTop = currentScrollPosition;
        } else {
          // For dedicated page we replace the whole section if there is no more product
          if (this.itemCount === 0) {
            this.element.innerHTML = tempElement.querySelector('.shopify-section').firstElementChild.innerHTML;
          } else {
            cartNodeParent.replaceChild(tempElement.querySelector('.Cart'), this.element.querySelector('.Cart'));
            this.element.querySelector('.PageHeader').innerHTML = tempElement.querySelector('.PageHeader').innerHTML;
            this._checkCart();
          }
        }
        /* cart page affirm promo message Ajax update */
        affirm.ui.refresh();
      }
    }]);

    return CartSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = CartSection;

  /***/
},
/* 31 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);

  var CollectionListSection = function () {
    function CollectionListSection(container) {
      _classCallCheck(this, CollectionListSection);

      this.element = container;
      this.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.element.querySelector('[data-flickity-config]'));
    }

    _createClass(CollectionListSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.carousel.destroy();
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        this.carousel.selectCell(event.target.getAttribute('data-slide-index'), true, !event.detail.load);
      }
    }, {
      key: 'onBlockDeselect',
      value: function onBlockDeselect() {
        this.carousel.unpausePlayer();
      }
    }]);

    return CollectionListSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = CollectionListSection;

  /***/
},
/* 32 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Drawer__ = __webpack_require__(8);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_Popover__ = __webpack_require__(9);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__components_ProductItemColorSwatch__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__helper_Responsive__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__components_OverflowScroller__ = __webpack_require__(13);

  var CollectionSection = function () {
    function CollectionSection(element) {
      _classCallCheck(this, CollectionSection);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.toolbarElement = this.element.querySelector('.CollectionToolbar');
      this.collectionInnerElement = this.element.querySelector('.CollectionInner__Products');

      this.settings = JSON.parse(this.element.getAttribute('data-section-settings'));
      this.currentTags = this.settings['currentTags'];
      this.currentSortBy = this.settings['sortBy'];

      this.temporaryTags = this.currentTags.slice(); // This allows to do a deep copy of the current tags

      // Create the popover if available
      var sortPopoverElement = document.getElementById('collection-sort-popover');
      if (sortPopoverElement) {
        this.sortPopover = new __WEBPACK_IMPORTED_MODULE_1__components_Popover__["default"](sortPopoverElement, { onValueChanged: this._sortByChanged.bind(this) });
      }

      // Create the filter drawer if available
      var filterDrawerElement = document.getElementById('collection-filter-drawer');

      if (filterDrawerElement) {
        this.filterDrawer = new __WEBPACK_IMPORTED_MODULE_0__components_Drawer__["default"](filterDrawerElement, { onClose: this._removeUncommittedTags.bind(this) });
      }

      // Create scroller of sidebar
      if (this.settings['filterPosition'] === 'sidebar') {
        this.filterInnerSidebarScroller = new __WEBPACK_IMPORTED_MODULE_5__components_OverflowScroller__["default"](this.element.querySelector('.CollectionInner__Sidebar'));
      }

      // Setup parallax on image (if any)
      var collectionImageElement = this.element.querySelector('.PageHeader__ImageWrapper');

      if (collectionImageElement && window.matchMedia('(-moz-touch-enabled: 0), (hover: hover)').matches) {
        this.parallaxInstance = new Rellax('.PageHeader__ImageWrapper', {
          speed: -7,
          center: false,
          round: true
        });
      }

      // Setup product item color swatch
      new __WEBPACK_IMPORTED_MODULE_2__components_ProductItemColorSwatch__["default"](this.element);

      // Setup animation
      this.timeline = new TimelineLite({ delay: window.theme.showPageTransition ? 0.5 : 0 });
      this._setupAnimation();

      this._attachListeners();
    }

    _createClass(CollectionSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off('click');

        if (this.sortPopover) {
          this.sortPopover.destroy();
        }

        if (this.filterDrawer) {
          this.filterDrawer.destroy();
        }

        if (this.filterInnerSidebarScroller) {
          this.filterInnerSidebarScroller.destroy();
        }

        if (this.parallaxInstance) {
          this.parallaxInstance.destroy();
        }

        if (window.theme.showElementStaggering) {
          this.intersectionObserver.disconnect();
          this.timeline.kill();
        }
      }
    }, {
      key: '_setupAnimation',
      value: function _setupAnimation() {
        var _this32 = this;

        if (!window.theme.showElementStaggering) {
          return;
        }

        // If there is already an observer set up, we remove it first
        if (this.intersectionObserver) {
          this.intersectionObserver.disconnect();
        }

        this.intersectionObserver = new IntersectionObserver(this._reveal.bind(this), {
          threshold: 0.3
        });

        __WEBPACK_IMPORTED_MODULE_3__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.ProductList .ProductItem')).forEach(function (item) {
          _this32.intersectionObserver.observe(item);
        });
      }
    }, {
      key: '_reveal',
      value: function _reveal(results) {
        var _this33 = this;

        var toReveal = [];

        results.forEach(function (result) {
          if (result.isIntersecting || result.intersectionRatio > 0) {
            // isIntersecting does not exist on Samsung Android browser
            toReveal.push(result.target);
            _this33.intersectionObserver.unobserve(result.target);
          }
        });

        if (toReveal.length === 0) {
          return;
        }

        this.timeline.staggerFromTo(toReveal, 0.45, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0 }, 0.2);
      }
    }, {
      key: '_changeLayoutMode',
      value: function _changeLayoutMode(event, target) {
        var _this34 = this;

        var layoutType = target.getAttribute('data-grid-type'),
            newCount = parseInt(target.getAttribute('data-count'));

        // Otherwise we detect the mode, and change all classes
        var productList = this.collectionInnerElement.querySelector('.ProductList');

        if (productList) {
          var previousCount = parseInt(productList.getAttribute('data-' + layoutType + '-count'));

          if (previousCount === newCount) {
            return; // Nothing has changed so we just return to avoid reflow
          }

          productList.setAttribute('data-' + layoutType + '-count', newCount);

          __WEBPACK_IMPORTED_MODULE_3__helper_Dom__["default"].nodeListToArray(productList.querySelectorAll('.Grid__Cell')).forEach(function (item) {
            if (layoutType === 'mobile') {
              item.classList.remove('1/' + previousCount + '--phone'); // IE11 and lower does not support classList.replace
              item.classList.add('1/' + newCount + '--phone');
            } else {
              var previousTabletCount = previousCount === 2 ? 2 : 3,
                  newTabletCount = newCount === 2 ? 2 : 3;

              if (_this34.settings['filterPosition'] === 'drawer') {
                item.classList.remove('1/' + previousCount + '--lap-and-up');
                item.classList.add('1/' + newCount + '--lap-and-up');
              } else {
                item.classList.remove('1/' + previousCount + '--desk');
                item.classList.add('1/' + newCount + '--desk');
              }

              item.classList.remove('1/' + previousTabletCount + '--tablet-and-up');
              item.classList.add('1/' + newTabletCount + '--tablet-and-up');
            }

            if (window.theme.showElementStaggering) {
              item.firstElementChild.style.visibility = 'hidden'; // Make it as hidden so we can re-trigger the animation
            }
          });

          // Force lazy sizes to recalculate item sizes
          lazySizes.autoSizer.checkElems();
        }

        target.classList.add('is-active');
        __WEBPACK_IMPORTED_MODULE_3__helper_Dom__["default"].getSiblings(target)[0].classList.remove('is-active');

        this._setupAnimation();

        // In order to prevent reflow and provide better user experience, we save into cart attributes (those are removed before the checkout
        // is submitted) the user choices so they are preserved on page reload, without the need to use JavaScript

        fetch('/cart/update.js', {
          body: JSON.stringify({
            attributes: _defineProperty({}, 'collection_' + layoutType + '_items_per_row', newCount)
          }),
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
          }
        });
      }
    }, {
      key: '_sortByChanged',
      value: function _sortByChanged(sortBy) {
        if (this.currentSortBy === sortBy) {
          return;
        }

        this.currentSortBy = sortBy;
        this._reloadProducts();
      }
    }, {
      key: '_toggleTag',
      value: function _toggleTag(event) {
        var element = event.target;

        if (element.classList.contains('is-active')) {
          this.temporaryTags.splice(this.temporaryTags.indexOf(element.getAttribute('data-tag')), 1); // Delete the tag if already active
        } else {
          var activeSibling = element.closest('.Collapsible').querySelector('.is-active');

          if (activeSibling) {
            this.temporaryTags.splice(this.temporaryTags.indexOf(activeSibling.getAttribute('data-tag')), 1);
          }

          this.temporaryTags.push(element.getAttribute('data-tag')); // Add if not previously active
        }

        this._updateActiveTags();

        // If we have the mode set as "sidebar" and that we are on desktop, we auto-commit
        if (__WEBPACK_IMPORTED_MODULE_4__helper_Responsive__["default"].matchesBreakpoint('lap-and-up') && this.settings['filterPosition'] === 'sidebar') {
          this._commit();
        }
      }
    }, {
      key: '_removeUncommittedTags',
      value: function _removeUncommittedTags() {
        this.temporaryTags = this.currentTags.slice(); // We simply reset the temporary tags to the active tags
        this._updateActiveTags();
      }
    }, {
      key: '_applyTags',
      value: function _applyTags() {
        this._updateActiveTags();
        this._commit();
      }
    }, {
      key: '_resetTags',
      value: function _resetTags() {
        this.temporaryTags = []; // We simply remove all tags
        this._applyTags();
      }
    }, {
      key: '_updateActiveTags',
      value: function _updateActiveTags() {
        var _this35 = this;

        __WEBPACK_IMPORTED_MODULE_3__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.CollectionFilters [data-tag]')).forEach(function (item) {
          // IE11 and lower does not support classList.toggle...
          if (_this35.temporaryTags.includes(item.getAttribute('data-tag'))) {
            item.classList.add('is-active');
            item.parentNode.classList.add('is-selected'); // For the case of "ListItem"
          } else {
            item.classList.remove('is-active');
            item.parentNode.classList.remove('is-selected'); // For the case of "ListItem"
          }
        });
      }
    }, {
      key: '_commit',
      value: function _commit() {
        var _this36 = this;

        if (this.currentTags.sort().join(',') !== this.temporaryTags.sort().join(',')) {
          this.currentTags = this.temporaryTags.slice();
          this._reloadProducts();
        }

        if (this.filterDrawer.isOpen) {
          this.filterDrawer.close();
        }

        __WEBPACK_IMPORTED_MODULE_3__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('[data-action="reset-tags"]')).forEach(function (resetButton) {
          resetButton.style.display = _this36.currentTags.length === 0 ? 'none' : 'block';
        });
      }
    }, {
      key: '_reloadProducts',
      value: function _reloadProducts() {
        var _this37 = this;

        document.dispatchEvent(new CustomEvent('theme:loading:start'));

        var filterElement = this.toolbarElement.querySelector('.CollectionToolbar__Item--filter');

        if (filterElement) {
          var filterElementCount = filterElement.querySelector('span');

          if (filterElementCount) {
            filterElement.removeChild(filterElementCount);
          }

          if (this.currentTags.length === 0) {
            filterElement.classList.add('Text--subdued');
          } else {
            filterElement.classList.remove('Text--subdued');
            filterElement.innerHTML += '<span class="Text--subdued">(' + this.currentTags.length + ')</span>';
          }
        }

        // We also rewrite the URL if browser supports it
        if (history.replaceState) {
          var tags = this.currentTags.length > 0 ? this.currentTags.join('+') : '';
          var newUrl = window.location.protocol + '//' + window.location.host + this.settings['collectionUrl'] + '/' + tags + '?sort_by=' + this.currentSortBy;

          window.history.pushState({ path: newUrl }, '', newUrl);
        }

        var formData = new FormData();
        formData.append('view', 'ajax');
        formData.append('sort_by', this.currentSortBy);

        fetch(location.pathname + '?view=ajax&sort_by=' + this.currentSortBy, {
          credentials: 'same-origin',
          method: 'GET'
        }).then(function (response) {
          response.text().then(function (content) {
            var tempElement = document.createElement('div');
            tempElement.innerHTML = content;

            _this37.collectionInnerElement.innerHTML = tempElement.querySelector('.shopify-section').innerHTML;
            document.dispatchEvent(new CustomEvent('theme:loading:end'));

            _this37._setupAnimation();

            // We scroll to the top
            var elementOffset = _this37.element.querySelector('.CollectionMain').getBoundingClientRect().top - parseInt(document.documentElement.style.getPropertyValue('--header-height'));

            if (__WEBPACK_IMPORTED_MODULE_4__helper_Responsive__["default"].matchesBreakpoint('lap-and-up') && _this37.toolbarElement && _this37.toolbarElement.clientHeight === 0) {
              elementOffset -= 50;
            }

            if (elementOffset < 0) {
              window.scrollBy({ top: elementOffset, behavior: 'smooth' });
            }
          });
        });
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._toggleTagListener = this._toggleTag.bind(this);
        this._applyTagsListener = this._applyTags.bind(this);
        this._resetTagsListener = this._resetTags.bind(this);
        this._changeLayoutModeListener = this._changeLayoutMode.bind(this);

        this.delegateElement.on('click', '[data-action="toggle-tag"]', this._toggleTagListener);
        this.delegateElement.on('click', '[data-action="apply-tags"]', this._applyTagsListener);
        this.delegateElement.on('click', '[data-action="reset-tags"]', this._resetTagsListener);
        this.delegateElement.on('click', '[data-action="change-layout-mode"]', this._changeLayoutModeListener);

        window.addEventListener('popstate', function (event) {
          if (event.state.path) {
            window.location.href = event.state.path;
          }
        });
      }
    }]);

    return CollectionSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = CollectionSection;

  /***/
},
/* 33 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Animation__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);

  var FaqSection = function () {
    function FaqSection(element) {
      _classCallCheck(this, FaqSection);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);

      this._attachListeners();
    }

    _createClass(FaqSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off();
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        this._openItem(event.target);
      }
    }, {
      key: 'onBlockDeselect',
      value: function onBlockDeselect(event) {
        this._closeItem(event.target);
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '.Faq__Question', this._toggleItem.bind(this));
        this.delegateElement.on('click', '.FaqSummary__Item', this._switchToCategory.bind(this));
      }
    }, {
      key: '_switchToCategory',
      value: function _switchToCategory(event, target) {
        target.classList.add('is-active');

        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].getSiblings(target, '.is-active').forEach(function (item) {
          item.classList.remove('is-active');
        });
      }
    }, {
      key: '_toggleItem',
      value: function _toggleItem(event, target) {
        var item = target.closest('.Faq__Item');

        if (item.getAttribute('aria-expanded') === 'true') {
          this._closeItem(item);
        } else {
          this._openItem(item);
        }
      }
    }, {
      key: '_openItem',
      value: function _openItem(item) {
        var answerWrapper = item.querySelector('.Faq__AnswerWrapper');

        item.setAttribute('aria-expanded', 'true');

        answerWrapper.setAttribute('aria-hidden', 'false');
        __WEBPACK_IMPORTED_MODULE_0__helper_Animation__["default"].slideDown(answerWrapper, true);

        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].getSiblings(item, '[aria-expanded="true"]').forEach(function (siblingItem) {
          var siblingAnswerWrapper = siblingItem.querySelector('.Faq__AnswerWrapper');

          siblingItem.setAttribute('aria-expanded', 'false');

          siblingAnswerWrapper.setAttribute('aria-hidden', 'true');
          __WEBPACK_IMPORTED_MODULE_0__helper_Animation__["default"].slideUp(siblingAnswerWrapper);
        });
      }
    }, {
      key: '_closeItem',
      value: function _closeItem(item) {
        var answerWrapper = item.querySelector('.Faq__AnswerWrapper');

        item.setAttribute('aria-expanded', 'false');
        answerWrapper.setAttribute('aria-hidden', 'true');
        __WEBPACK_IMPORTED_MODULE_0__helper_Animation__["default"].slideUp(answerWrapper);
      }
    }]);

    return FaqSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = FaqSection;

  /***/
},
/* 34 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(6);

  var FeaturedCollectionsSection = function () {
    function FeaturedCollectionsSection(container) {
      var _this38 = this;

      _classCallCheck(this, FeaturedCollectionsSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = JSON.parse(this.element.getAttribute('data-settings'));

      this.carousels = [];

      __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('[data-flickity-config]')).forEach(function (item) {
        _this38.carousels.push(new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](item));
      });

      // Setup product item color swatch
      new __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__["default"](this.element);

      this._setupAnimation();
      this._attachListeners();
    }

    _createClass(FeaturedCollectionsSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.carousels.forEach(function (item) {
          return item.destroy();
        });
        this.delegateElement.off('click');

        this.intersectionObserver.disconnect();
        this.timeline.kill();
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        // We simply trigger a click on the element that controls this tab
        this.element.querySelector('[aria-controls="' + event.target.id + '"]').click();
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '[data-action="toggle-tab"]', this._switchTab.bind(this));
      }
    }, {
      key: '_switchTab',
      value: function _switchTab(event, target) {
        var _this39 = this;

        // If the tab is already active, do nothing
        if (target.classList.contains('is-active')) {
          return;
        }

        // First, switch the current tab
        target.classList.add('is-active');
        __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].getSiblings(target, '.is-active').forEach(function (item) {
          item.classList.remove('is-active');
        });

        // Then, display the panel
        var tabPanelToShow = this.element.querySelector('#' + target.getAttribute('aria-controls'));

        this.timeline.eventCallback('onReverseComplete', function () {
          tabPanelToShow.setAttribute('aria-hidden', 'false');

          __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].getSiblings(tabPanelToShow, '.TabPanel[aria-hidden="false"]').forEach(function (item) {
            item.setAttribute('aria-hidden', 'true');
          });

          if (__WEBPACK_IMPORTED_MODULE_3__helper__["ResponsiveHelper"].matchesBreakpoint('lap-and-up')) {
            _this39.carousels.forEach(function (carousel) {
              // There is a bug in Safari where it cannot detect the pseudo-element "::after" if the tab panel is hidden. As a consequence,
              // we manually activate it
              carousel.flickityInstance.activate();
              carousel.flickityInstance.resize(); // Ugly hack
            });
          }

          _this39.timeline.clear();
          _this39._setupAnimation();
        });

        if (this.options['layout'] === 'grid' && window.theme.showElementStaggering) {
          this.timeline.reverse().timeScale(3);
        } else {
          this.timeline.reverse();
        }
      }
    }, {
      key: '_setupAnimation',
      value: function _setupAnimation() {
        var _this40 = this;

        if (this.intersectionObserver) {
          this.intersectionObserver.disconnect();
        }

        this.timeline = new TimelineLite({ delay: 0.5 });

        if (this.options['layout'] === 'grid' && window.theme.showElementStaggering) {
          this.intersectionObserver = new IntersectionObserver(this._reveal.bind(this));

          __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.TabPanel[aria-hidden="false"] .ProductList .ProductItem')).forEach(function (item) {
            _this40.intersectionObserver.observe(item);
          });
        } else {
          var productList = this.element.querySelector('.TabPanel[aria-hidden="false"] .ProductList');

          if (productList) {
            this.timeline.fromTo(productList, 0.6, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0 });
          }
        }
      }
    }, {
      key: '_reveal',
      value: function _reveal(results) {
        var _this41 = this;

        var toReveal = [];

        results.forEach(function (result) {
          if (result.isIntersecting || result.intersectionRatio > 0) {
            // isIntersecting does not exist on Samsung Android browser
            toReveal.push(result.target);
            _this41.intersectionObserver.unobserve(result.target);
          }
        });

        if (toReveal.length === 0) {
          return;
        }

        this.timeline.staggerFromTo(toReveal, 0.45, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0 }, 0.2);
      }
    }]);

    return FeaturedCollectionsSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = FeaturedCollectionsSection;

  /***/
},
/* 35 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_ProductVariants__ = __webpack_require__(11);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Image__ = __webpack_require__(10);

  var FeaturedProductSection = function () {
    function FeaturedProductSection(container) {
      _classCallCheck(this, FeaturedProductSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = JSON.parse(this.element.getAttribute('data-section-settings'));

      if (!this.options['usePlaceholder'] && this.options['templateSuffix'] !== 'coming-soon') {
        this.productVariants = new __WEBPACK_IMPORTED_MODULE_0__components_ProductVariants__["default"](container, this.options);
      }

      this._attachListeners();
    }

    _createClass(FeaturedProductSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off('click');

        if (this.productVariants) {
          this.productVariants.destroy();
        }
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('variant:changed', this._updateMainImage.bind(this));
      }

      /**
       * Update the main featured image
       */

    }, {
      key: '_updateMainImage',
      value: function _updateMainImage(event) {
        var variant = event.detail.variant,
            previousVariant = event.detail.previousVariant;

        if (!variant || !variant['featured_image'] || previousVariant['featured_image'] && previousVariant['featured_image']['id'] === variant['featured_image']['id']) {
          return;
        }

        // Otherwise we are on the home page. It's a bit more complex as we have to rewrite some code normally written in Liquid
        var newImage = variant['featured_image'];

        var mainImageContainer = this.element.querySelector('.FeaturedProduct__Gallery .AspectRatio');
        mainImageContainer.style.cssText = 'max-width: ' + newImage['width'] + 'px; --aspect-ratio: ' + newImage['width'] / newImage['height'];

        var newImageElement = document.createElement('img');
        newImageElement.classList.add('Image--lazyLoad');
        newImageElement.setAttribute('data-src', __WEBPACK_IMPORTED_MODULE_1__helper_Image__["default"].getSizedImageUrl(newImage['src'], '1x1').replace('_1x1.', '_{width}x.'));
        newImageElement.setAttribute('data-widths', '[' + __WEBPACK_IMPORTED_MODULE_1__helper_Image__["default"].getSupportedSizes(newImage, [200, 400, 600, 700, 800, 900, 1000]).join(',') + ']');
        newImageElement.setAttribute('data-sizes', 'auto');

        mainImageContainer.replaceChild(newImageElement, mainImageContainer.querySelector('img'));
      }
    }]);

    return FeaturedProductSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = FeaturedProductSection;

  /***/
},
/* 36 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var GiftCardSection = function () {
    function GiftCardSection(container) {
      _classCallCheck(this, GiftCardSection);

      this.element = container;

      this._createQrCode();
      this._setupPrint();
    }

    _createClass(GiftCardSection, [{
      key: '_createQrCode',
      value: function _createQrCode() {
        var qrCodeElement = document.getElementById('QrCode');

        new QRCode(qrCodeElement, {
          text: qrCodeElement.getAttribute('data-identifier'),
          width: 120,
          height: 120
        });
      }
    }, {
      key: '_setupPrint',
      value: function _setupPrint() {
        var printElement = document.getElementById('PrintGiftCard');

        if (printElement) {
          printElement.addEventListener('click', function () {
            window.print();
          });
        }
      }
    }]);

    return GiftCardSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = GiftCardSection;

  /***/
},
/* 37 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Responsive__ = __webpack_require__(2);

  var HeaderSection = function () {
    function HeaderSection(container) {
      var _this42 = this;

      _classCallCheck(this, HeaderSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = JSON.parse(this.element.getAttribute('data-section-settings'));
      this.lastScrollPosition = -1;
      this.isTouch = window.matchMedia('(-moz-touch-enabled: 1), (hover: none)').matches;

      if (this.options['isSticky']) {
        Stickyfill.addOne(this.element.parentNode);
      }

      this._attachListeners();
      this._checkNavigationBounds();

      // We set again some CSS variables that are used for some calculations in CSS
      var mainLogo = this.element.querySelector('.Header__LogoImage--primary');

      if (mainLogo && !mainLogo.complete) {
        mainLogo.addEventListener('load', function () {
          fastdom.measure(function () {
            document.documentElement.style.setProperty('--header-height', _this42.element.clientHeight + 'px');
            document.documentElement.style.setProperty('--header-is-not-transparent', _this42.options['hasTransparentHeader'] ? 0 : 1);
          });
        });
      } else {
        fastdom.measure(function () {
          document.documentElement.style.setProperty('--header-height', _this42.element.clientHeight + 'px');
          document.documentElement.style.setProperty('--header-is-not-transparent', _this42.options['hasTransparentHeader'] ? 0 : 1);
        });
      }
    }

    _createClass(HeaderSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.element.removeEventListener('mouseleave', this._closeNavigationListener);
        this.element.removeEventListener('mouseenter', this._focusNavigationListener);
        this.element.removeEventListener('focusin', this._focusNavigationListener);

        this.delegateElement.off();

        window.removeEventListener('scroll', this._checkTransparentHeaderListener);
        window.removeEventListener('resize', this._verifyNavigationOverlapListener);

        if (this.options['isSticky']) {
          Stickyfill.removeOne(this.element.parentNode);
        }
      }
    }, {
      key: 'onSelect',
      value: function onSelect() {
        this._checkTransparentHeader();
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        var _this43 = this;

        var listItem = event.target.closest('.HorizontalList__Item');

        fastdom.mutate(function () {
          event.target.setAttribute('aria-hidden', 'false');

          if (listItem) {
            listItem.classList.add('is-expanded');

            __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].getSiblings(listItem, '.is-expanded').forEach(function (item) {
              item.classList.remove('is-expanded');
            });
          }

          _this43.element.classList.remove('Header--transparent'); // This is needed to make sure everything is visible
        });
      }
    }, {
      key: 'onBlockDeselect',
      value: function onBlockDeselect(event) {
        var listItem = event.target.closest('.HorizontalList__Item');

        fastdom.mutate(function () {
          event.target.setAttribute('aria-hidden', 'true');

          if (listItem) {
            listItem.classList.remove('is-expanded');
          }
        });

        this._checkTransparentHeader();
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._checkTransparentHeaderListener = this._checkTransparentHeader.bind(this);
        this._closeNavigationListener = this._closeNavigation.bind(this);
        this._focusNavigationListener = this._focusNavigation.bind(this);
        this._verifyNavigationOverlapListener = this._verifyNavigationOverlap.bind(this);

        this.element.addEventListener('mouseleave', this._closeNavigationListener);

        this.delegateElement.on('mouseenter', '.Header__MainNav .HorizontalList__Item, [aria-haspopup]', this._openMenu.bind(this), true);
        this.delegateElement.on('focusin', '[aria-haspopup]', this._openMenu.bind(this), true);
        this.delegateElement.on('focusout', '[aria-haspopup]', this._closeMenu.bind(this), false);
        this.delegateElement.on('mouseleave', '.DropdownMenu [aria-haspopup]', this._closeMenu.bind(this), true);
        this.delegateElement.on('mouseenter', '.DropdownMenu [aria-haspopup]', this._adjustDropdownPosition.bind(this), true);

        if (this.isTouch) {
          this.delegateElement.on('click', '.Header__MainNav [aria-haspopup]', this._handleTouchMenu.bind(this));
        }

        if (this.options['hasTransparentHeader']) {
          this.element.addEventListener('mouseenter', this._focusNavigationListener);
          this.element.addEventListener('focusin', this._focusNavigationListener);
        }

        if (this.options['isSticky'] && this.options['hasTransparentHeader']) {
          window.addEventListener('scroll', this._checkTransparentHeaderListener);
        }

        if (this.options['navigationStyle'] === 'inline') {
          window.addEventListener('resize', this._verifyNavigationOverlapListener);
        }
      }
    }, {
      key: '_focusNavigation',
      value: function _focusNavigation() {
        var _this44 = this;

        fastdom.mutate(function () {
          if (!_this44.isTouch || __WEBPACK_IMPORTED_MODULE_1__helper_Responsive__["default"].matchesBreakpoint('desk')) {
            _this44.element.classList.remove('Header--transparent');
          }
        });
      }
    }, {
      key: '_closeNavigation',
      value: function _closeNavigation() {
        var _this45 = this;

        fastdom.mutate(function () {
          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(_this45.element.querySelectorAll('.is-expanded')).forEach(function (item) {
            item.classList.remove('is-expanded');
          });

          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(_this45.element.querySelectorAll('[aria-hidden="false"]')).forEach(function (item) {
            item.setAttribute('aria-hidden', 'true');
          });
        });

        if (this.options['hasTransparentHeader']) {
          this._checkTransparentHeader();
        }
      }
    }, {
      key: '_openMenu',
      value: function _openMenu(event, target) {
        if (event.type === 'mouseenter' && target !== event.target) {
          return;
        }

        fastdom.mutate(function () {
          target.classList.add('is-expanded');
          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(target.children, '[aria-hidden="true"]').forEach(function (item) {
            item.setAttribute('aria-hidden', 'false');
          });

          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].getSiblings(target, '.is-expanded').forEach(function (item) {
            item.classList.remove('is-expanded');

            __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(item.children, '[aria-hidden="false"]').forEach(function (item) {
              item.setAttribute('aria-hidden', 'true');
            });
          });
        });
      }
    }, {
      key: '_closeMenu',
      value: function _closeMenu(event, target) {
        if (event.type === 'mouseleave' && target !== event.target) {
          return;
        }

        fastdom.mutate(function () {
          target.classList.remove('is-expanded');

          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(target.children, '[aria-hidden="false"]').forEach(function (item) {
            item.setAttribute('aria-hidden', 'true');
          });
        });
      }
    }, {
      key: '_adjustDropdownPosition',
      value: function _adjustDropdownPosition(event, target) {
        var nestedMenus = __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(target.querySelectorAll('.DropdownMenu')),
            shouldOpenLeft = false;

        fastdom.measure(function () {
          var windowWidth = window.innerWidth,
              rightEdge = target.getBoundingClientRect().right;

          nestedMenus.forEach(function (item) {
            if (rightEdge + item.offsetWidth > windowWidth) {
              shouldOpenLeft = true;
            }
          });
        });

        fastdom.mutate(function () {
          if (shouldOpenLeft) {
            nestedMenus.forEach(function (item) {
              item.classList.add('DropdownMenu--reversed');
            });
          } else {
            nestedMenus.forEach(function (item) {
              item.classList.remove('DropdownMenu--reversed');
            });
          }
        });
      }

      // On touch devices where we display the standard menu (like landscape iPad or Surface) we need to do additional code to properly
      // handle the opening of menu. Especially, what we do is that if an item has a sub-menu, a click does not follow the link but instead open
      // the sub-menu. If this link is clicked a second twice, then the menu is followed

    }, {
      key: '_handleTouchMenu',
      value: function _handleTouchMenu(event, target) {
        if (!target.classList.contains('is-expanded')) {
          event.preventDefault();
        }
      }
    }, {
      key: '_checkNavigationBounds',
      value: function _checkNavigationBounds() {
        var _this46 = this;

        if (this.options['navigationStyle'] !== 'inline') {
          return;
        }

        var mainTopMenu = this.element.querySelector('.Header__MainNav');

        this.mainMenuWidth = 45;
        this.menuLeftOffset = 0;

        fastdom.measure(function () {
          _this46.menuLeftOffset = mainTopMenu.offsetLeft;

          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(mainTopMenu.querySelectorAll('.HorizontalList__Item')).forEach(function (item) {
            _this46.mainMenuWidth += parseInt(__WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].outerWidthWithMargin(item));
          });
        });

        this._verifyNavigationOverlap(); // Verify it once
      }
    }, {
      key: '_verifyNavigationOverlap',
      value: function _verifyNavigationOverlap() {
        var _this47 = this;

        var isOverlapping = false;

        fastdom.measure(function () {
          isOverlapping = _this47.mainMenuWidth > Math.ceil(_this47.element.querySelector('.Header__Logo').offsetLeft - _this47.menuLeftOffset);
        });

        fastdom.mutate(function () {
          if (isOverlapping) {
            _this47.element.classList.remove('Header--inline');
            _this47.element.classList.add('Header--center');
          } else {
            _this47.element.classList.add('Header--inline');
            _this47.element.classList.remove('Header--center');
          }

          _this47.element.classList.add('Header--initialized');

          fastdom.measure(function () {
            document.documentElement.style.setProperty('--header-height', _this47.element.clientHeight + 'px');
          });
        });
      }

      /**
       * If the header mode is set to "transparent", we have to do extra work to automatically make it with fill colors when the
       * user starts scrolling. For performance we are using fastDOM to do that (which relies of requestAnimationFrame instead of
       * scroll listener)
       */

    }, {
      key: '_checkTransparentHeader',
      value: function _checkTransparentHeader() {
        var _this48 = this;

        if (!this.options['hasTransparentHeader']) {
          return;
        }

        var scrollThreshold = 10;

        fastdom.measure(function () {
          _this48.lastScrollPosition = window.pageYOffset;

          /*if (ResponsiveHelper.matchesBreakpoint('pocket')) {
            let firstShopifySection = document.querySelector('#main .shopify-section:first-child');
             if (firstShopifySection && firstShopifySection.classList.contains('shopify-section--slideshow')) {
              scrollThreshold = firstShopifySection.querySelector('.Slideshow__Carousel').clientHeight - this.element.clientHeight;
            } else {
              scrollThreshold = 150;
            }
          }*/
        });

        fastdom.mutate(function () {
          if (_this48.lastScrollPosition <= scrollThreshold) {
            _this48.element.classList.add('Header--transparent');
          } else {
            _this48.element.classList.remove('Header--transparent');
          }
        });
      }
    }]);

    return HeaderSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = HeaderSection;

  /***/
},
/* 38 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var ImageWithTextBlockSection = function () {
    function ImageWithTextBlockSection(container) {
      _classCallCheck(this, ImageWithTextBlockSection);

      this.element = container;
    }

    _createClass(ImageWithTextBlockSection, [{
      key: 'onUnload',
      value: function onUnload() {}
    }]);

    return ImageWithTextBlockSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ImageWithTextBlockSection;

  /***/
},
/* 39 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);

  var InstagramSection = function () {
    function InstagramSection(element) {
      _classCallCheck(this, InstagramSection);

      this.element = element;
      this.instafeed = this.element.querySelector('.Instafeed');

      this._initFeed();
    }

    _createClass(InstagramSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.carousel.destroy();
      }
    }, {
      key: '_initFeed',
      value: function _initFeed() {
        var _this49 = this;

        if (!this.instafeed.hasAttribute('data-access-token')) {
          this.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.instafeed); // If no access token we display placeholder
        } else {
          var instafeed = new Instafeed({
            get: 'user',
            userId: 'self',
            target: this.instafeed,
            accessToken: this.instafeed.getAttribute('data-access-token'),
            sortBy: 'most-recent',
            limit: this.instafeed.getAttribute('data-image-count'),
            resolution: 'standard_resolution',
            template: '<a href="{{link}}" rel="nofollow noopener" target="_blank" class="Carousel__Cell Instafeed__Cell">' + '<div class="Instafeed__Image Image--lazyLoad Image--zoomOut" data-expand="10" data-bg="{{image}}" aria-label="Open on Instagram"></div>' + '<div class="Instafeed__Overlay">' + '<span class="Instafeed__LikeCount">' + '<svg class="Icon Icon--heart" viewBox="0 0 17 15" role="presentation">' + '<path d="M15.0349331 1.40485867C14.1287273.49933787 12.9252477 0 11.6443673 0S9.16000731.49933787 8.25448651 1.40417371c-.01164437.01164436-.02328874.02328873-.03493311.03561806-.01164436-.01232933-.02260377-.02328873-.03424813-.0349331C7.2790995.49933787 6.07561989 0 4.79473949 0 3.51385908 0 2.31037947.49933787 1.40417371 1.40485867.49796794 2.31037947 0 3.51385908 0 4.79473949 0 6.07561989.4986529 7.2790995 1.40417371 8.1846203L8.2195534 15l6.8153797-6.8153797c.9055208-.9055208 1.4041737-2.10900041 1.4041737-3.38988081 0-1.28019545-.4986529-2.48436002-1.4041737-3.38988082z"></path>' + '</svg>' + '{{likes}} likes' + '</span>' + '<p class="Instafeed__Caption">{{caption}}</p>' + '<time class="Instafeed__Date Heading u-h6">{{model.date}}</time>' + '</div>' + '</a>',
            success: function success(data) {
              var dateTimeFormatter = new Intl.DateTimeFormat(window.theme.locale, { day: 'numeric', month: 'long', year: 'numeric' });

              data['data'].forEach(function (datum) {
                datum['date'] = dateTimeFormatter.format(new Date(parseInt(datum['created_time']) * 1000));
              });
            },
            after: function after() {
              // At this stage the images have been added to the DOM, so we can use Flickity
              _this49.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](_this49.instafeed);
            }
          });

          instafeed.run();
        }
      }
    }]);

    return InstagramSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = InstagramSection;

  /***/
},
/* 40 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var LoginSection = function () {
    function LoginSection(container) {
      _classCallCheck(this, LoginSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.timelineLite = new TimelineLite();

      this.customerLoginForm = this.element.querySelector('#customer_login');
      this.recoverPasswordForm = this.element.querySelector('#recover_customer_password');

      this.delegateElement.on('click', '[data-action="toggle-recover-form"]', this._showRecoverPassword.bind(this));
    }

    _createClass(LoginSection, [{
      key: '_showRecoverPassword',
      value: function _showRecoverPassword() {
        var isLoginActive = this.customerLoginForm.style.display === 'block';

        if (isLoginActive) {
          this.timelineLite.fromTo(this.customerLoginForm, 0.5, { autoAlpha: 1, display: 'block', y: 0 }, { autoAlpha: 0, y: 20, display: 'none' }).fromTo(this.recoverPasswordForm, 0.5, { autoAlpha: 0, display: 'none', y: 20 }, { autoAlpha: 1, display: 'block', y: 0, delay: 0.25 });
        } else {
          this.timelineLite.fromTo(this.recoverPasswordForm, 0.5, { autoAlpha: 1, display: 'block', y: 0 }, { autoAlpha: 0, y: 20, display: 'none' }).fromTo(this.customerLoginForm, 0.5, { autoAlpha: 0, display: 'none', y: 20 }, { autoAlpha: 1, display: 'block', y: 0, delay: 0.25 });
        }
      }
    }]);

    return LoginSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = LoginSection;

  /***/
},
/* 41 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var MapSection = function () {
    function MapSection(element) {
      _classCallCheck(this, MapSection);

      this.element = element;
      this.options = JSON.parse(element.getAttribute('data-section-settings'));

      if (this.options['apiKey'] && this.options['mapAddress']) {
        this._loadScript().then(this._initMap.bind(this));
      }
    }

    _createClass(MapSection, [{
      key: '_loadScript',
      value: function _loadScript() {
        var _this50 = this;

        return new Promise(function (resolve, reject) {
          var script = document.createElement('script');
          document.body.appendChild(script);
          script.onload = resolve;
          script.onerror = reject;
          script.async = true;
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + _this50.options['apiKey'];
        });
      }
    }, {
      key: '_initMap',
      value: function _initMap() {
        var _this51 = this;

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: this.options['mapAddress'] }, function (results, status) {
          if (status !== google.maps.GeocoderStatus.OK) {
            if (Shopify.designMode) {}
          } else {
            var mapOptions = {
              zoom: _this51.options['zoom'],
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = new google.maps.Map(_this51.element.querySelector('.FeaturedMap__GMap'), mapOptions),
                center = map.getCenter();

            map.setCenter(center);

            var icon = {
              path: "M32.7374478,5.617 C29.1154478,1.995 24.2994478,0 19.1774478,0 C14.0544478,0 9.23944778,1.995 5.61744778,5.617 C-1.08555222,12.319 -1.91855222,24.929 3.81344778,32.569 L19.1774478,54.757 L34.5184478,32.6 C40.2734478,24.929 39.4404478,12.319 32.7374478,5.617 Z M19.3544478,26 C15.4954478,26 12.3544478,22.859 12.3544478,19 C12.3544478,15.141 15.4954478,12 19.3544478,12 C23.2134478,12 26.3544478,15.141 26.3544478,19 C26.3544478,22.859 23.2134478,26 19.3544478,26 Z",
              fillColor: _this51.options['markerColor'],
              fillOpacity: 1,
              anchor: new google.maps.Point(15, 55),
              strokeWeight: 0,
              scale: 0.6
            };

            new google.maps.Marker({
              map: map,
              position: map.getCenter(),
              icon: icon
            });

            var styledMapType = new google.maps.StyledMapType(JSON.parse(_this51.element.querySelector('[data-gmap-style]').innerHTML));

            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');

            google.maps.event.addDomListener(window, 'resize', function () {
              google.maps.event.trigger(map, 'resize');
              map.setCenter(center);
            });
          }
        });
      }
    }]);

    return MapSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = MapSection;

  /***/
},
/* 42 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

  var NewsletterPopupSection = function () {
    function NewsletterPopupSection(element) {
      _classCallCheck(this, NewsletterPopupSection);

      this.element = element;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = JSON.parse(element.getAttribute('data-section-settings'));

      // If the popup has been already displayed, we do not display it
      try {
        if (window.location.hash === '#newsletter-popup' && window.theme.template !== null) {
          this._openPopup();
        } else if (!this.options['showOnlyOnce'] || this.options['showOnlyOnce'] && localStorage.getItem('themePopup') === null) {
          setTimeout(this._openPopup.bind(this), this.options['apparitionDelay'] * 1000);
        }
      } catch (error) {
        // Some browsers (especially in private mode) throw an exception when trying to access local storage, so we protect ourselves here
      }

      this._attachListeners();
    }

    _createClass(NewsletterPopupSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off();
      }
    }, {
      key: 'onSelect',
      value: function onSelect() {
        this._openPopup();
      }
    }, {
      key: 'onDeselect',
      value: function onDeselect() {
        this._closePopup();
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '[data-action="close-popup"]', this._closePopup.bind(this));
      }
    }, {
      key: '_openPopup',
      value: function _openPopup() {
        this.element.setAttribute('aria-hidden', 'false');
        localStorage.setItem('themePopup', 'true');
      }
    }, {
      key: '_closePopup',
      value: function _closePopup() {
        this.element.setAttribute('aria-hidden', 'true');
      }
    }]);

    return NewsletterPopupSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = NewsletterPopupSection;

  /***/
},
/* 43 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_ProductVariants__ = __webpack_require__(11);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__components_ProductImageZoom__ = __webpack_require__(14);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__components_ProductReviews__ = __webpack_require__(15);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__components_ScrollSpy__ = __webpack_require__(17);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__components_OverflowScroller__ = __webpack_require__(13);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__helper_Responsive__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__helper__ = __webpack_require__(6);

  var ProductSection = function () {
    function ProductSection(container) {
      _classCallCheck(this, ProductSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.options = JSON.parse(this.element.getAttribute('data-section-settings'));

      if (this.options['templateSuffix'] !== 'coming-soon') {
        this.productVariants = new __WEBPACK_IMPORTED_MODULE_1__components_ProductVariants__["default"](container, this.options);
      }

      this.productReviews = new __WEBPACK_IMPORTED_MODULE_3__components_ProductReviews__["default"](container);

      var productSlideshowElement = this.element.querySelector('.Product__Slideshow');

      // If there is no image at all, there is nothing to init
      if (productSlideshowElement) {
        this.productSlideshow = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](productSlideshowElement, { onSelect: this._onImageChanged.bind(this) });

        this.slideshowNavDots = this.element.querySelector('.Product__SlideshowNav--dots');
        this.slideshowNavDotsItems = this.slideshowNavDots ? __WEBPACK_IMPORTED_MODULE_5__helper_Dom__["default"].nodeListToArray(this.slideshowNavDots.querySelectorAll('a')) : [];

        if (this.options['showThumbnails']) {
          this.slideshowNavThumbnails = this.element.querySelector('.Product__SlideshowNav--thumbnails');
          this.slideshowNavThumbnailsItems = this.slideshowNavThumbnails ? __WEBPACK_IMPORTED_MODULE_5__helper_Dom__["default"].nodeListToArray(this.slideshowNavThumbnails.querySelectorAll('a')) : [];
        }

        this.slideshowImages = __WEBPACK_IMPORTED_MODULE_5__helper_Dom__["default"].nodeListToArray(productSlideshowElement.querySelectorAll('.Carousel__Cell'));
      }

      this.productWrapperElement = this.element.querySelector('.Product__Wrapper');
      this.productInfoElement = this.element.querySelector('.Product__Info');
      this.productAsideElement = this.element.querySelector('.Product__Aside');
      this.quickNav = this.element.querySelector('.Product__QuickNav');

      if (this.options['enableImageZoom']) {
        this.imageZoomInstance = new __WEBPACK_IMPORTED_MODULE_2__components_ProductImageZoom__["default"](this.element, this.productSlideshow);
      }

      Stickyfill.addOne(this.productInfoElement);

      this._setupDeviceFeatures();
      this._attachListeners();
    }

    _createClass(ProductSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off('click');
        this.productReviews.destroy();

        if (this.productVariants) {
          this.productVariants.destroy();
        }

        if (this.productSlideshow) {
          this.productSlideshow.destroy();
        }

        if (this.options['enableImageZoom']) {
          this.imageZoomInstance.destroy();
        }

        if (this.carouselNavScrollSpy) {
          this.carouselNavScrollSpy.destroy();
        }

        if (this.quickNav) {
          window.removeEventListener('scroll', this._checkQuickNavListener);
        }

        if (this.productInfoScroller) {
          this.productInfoScroller.destroy();
        }

        if (this.productThumbnailsScroller) {
          this.productThumbnailsScroller.destroy();
        }

        if (window.ResizeObserver && window.theme.enableExperimentalResizeObserver && this.productInfoResizeObserver) {
          this.productInfoResizeObserver.disconnect();
        }

        Stickyfill.removeOne(this.productInfoElement);

        document.removeEventListener('breakpoint:changed', this._onBreakpointChangedListener);
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._onBreakpointChangedListener = this._setupDeviceFeatures.bind(this);
        this._checkQuickNavListener = this._checkQuickNav.bind(this);

        this.delegateElement.on('click', '[data-action="toggle-social-share"]', this._toggleSocialShare.bind(this));
        this.delegateElement.on('variant:changed', this._updateSlideshowImage.bind(this));
        this.delegateElement.on('scrollspy:target:changed', this._onScrollTargetChanged.bind(this));

        document.addEventListener('breakpoint:changed', this._onBreakpointChangedListener);

        if (this.quickNav) {
          window.addEventListener('scroll', this._checkQuickNavListener);
        }
      }

      /**
       * Update the main carousel image
       */

    }, {
      key: '_updateSlideshowImage',
      value: function _updateSlideshowImage(event) {
        var variant = event.detail.variant,
            previousVariant = event.detail.previousVariant;

        if (!variant || !variant['featured_image'] || previousVariant && previousVariant['featured_image'] && previousVariant['featured_image']['id'] === variant['featured_image']['id']) {
          return;
        }

        // Using image['position'] has always been unreliable. Further more in this theme we allow some images to be featured and not be part of
        // the main carousel, so the position can be simply wrong.
        // We have two logic here: if we are on pocket mode, we switch using the carousel, otherwise we simulate a link to the anchor

        if (__WEBPACK_IMPORTED_MODULE_8__helper__["ResponsiveHelper"].matchesBreakpoint('pocket')) {
          for (var i = 0; i !== this.productSlideshow.flickityInstance.cells.length; ++i) {
            var cellElement = this.productSlideshow.flickityInstance.cells[i].element,
                imageId = parseInt(cellElement.getAttribute('data-image-id'));

            if (imageId === variant['featured_image']['id']) {
              this.productSlideshow.selectCell(parseInt(cellElement.getAttribute('data-image-position')));
            }
          }
        } else {
          document.querySelector('[href="#Image' + variant['featured_image']['id'] + '"]').click();
          //document.getElementById(`Image${variant['featured_image']['id']}`).scrollIntoView(); For now there is a bug in Chrome that prevents to use this
        }
      }

      /**
       * Callback when the target changes
       */

    }, {
      key: '_onScrollTargetChanged',
      value: function _onScrollTargetChanged(event) {
        // The scrollspy emit also an "oldTarget", but when scrolling very fast with Firefox or Safari, it prevents the old to be removed, so we
        // manually iterate through all of them to remove it first
        this.slideshowNavDotsItems.forEach(function (item) {
          return item.classList.remove('is-selected');
        });
        this.slideshowNavDotsItems[parseInt(event.detail.newTarget.getAttribute('data-image-position'))].classList.add('is-selected');

        if (this.options['showThumbnails']) {
          this.slideshowNavThumbnailsItems.forEach(function (item) {
            return item.classList.remove('is-selected');
          });
          this.slideshowNavThumbnailsItems[parseInt(event.detail.newTarget.getAttribute('data-image-position'))].classList.add('is-selected');
        }
      }

      /**
       * Check the quick nav
       */

    }, {
      key: '_checkQuickNav',
      value: function _checkQuickNav() {
        var _this52 = this;

        var showAsideQuickNav = false;

        fastdom.measure(function () {
          showAsideQuickNav = window.scrollY >= _this52.productAsideElement.offsetTop - _this52.productAsideElement.clientHeight;
        });

        fastdom.mutate(function () {
          if (showAsideQuickNav) {
            _this52.quickNav.classList.add('is-flipped');
          } else {
            _this52.quickNav.classList.remove('is-flipped');
          }
        });
      }

      /**
       * Toggle the social share icons
       */

    }, {
      key: '_toggleSocialShare',
      value: function _toggleSocialShare(event, target) {
        target.classList.toggle('is-active');
        target.classList.toggle('RoundButton--secondaryState');

        target.setAttribute('aria-expanded', target.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        target.nextElementSibling.setAttribute('aria-hidden', target.nextElementSibling.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
      }
    }, {
      key: '_onImageChanged',
      value: function _onImageChanged(event, cell) {
        if (!__WEBPACK_IMPORTED_MODULE_8__helper__["ResponsiveHelper"].matchesBreakpoint('pocket')) {
          return;
        }

        // If cell is video, we hide the action list
        var productGalleryActionListElement = this.element.querySelector('.Product__Gallery .Product__ActionList');

        if (productGalleryActionListElement) {
          if (cell.classList.contains('Product__SlideItem--video')) {
            productGalleryActionListElement.classList.add('is-hidden');
          } else {
            productGalleryActionListElement.classList.remove('is-hidden');
          }
        }
      }

      /**
       * Verify when the screen size changes to create additional stuff on non pocket mode
       */

    }, {
      key: '_setupDeviceFeatures',
      value: function _setupDeviceFeatures(event) {
        var _this53 = this;

        var currentBreakpoint = event ? event.detail.currentBreakpoint : __WEBPACK_IMPORTED_MODULE_8__helper__["ResponsiveHelper"].getCurrentBreakpoint(),
            previousBreakpoint = event ? event.detail.previousBreakpoint : null;

        if (currentBreakpoint === previousBreakpoint) {
          return; // Nothing has changed, no specific setup to do
        }

        if (currentBreakpoint === 'phone' || currentBreakpoint === 'tablet') {
          if (this.carouselNavScrollSpy) {
            this.carouselNavScrollSpy.destroy();
          }

          if (this.productInfoScroller) {
            this.productInfoScroller.destroy();
          }

          if (this.productThumbnailsScroller) {
            this.productThumbnailsScroller.destroy();
          }

          if (this.productAsideElement) {
            this.productAsideElement.style.minHeight = null;
          } else {
            this.productWrapperElement.style.minHeight = null;
          }

          this.productInfoElement.parentNode.style.maxHeight = null;
        } else {
          // 1st: scrollspy for the dots and image
          if (this.slideshowImages && this.slideshowImages.length > 1) {
            var offsetTop = this.slideshowNavDots.firstElementChild.offsetTop;

            if (this.options['showThumbnails'] && __WEBPACK_IMPORTED_MODULE_8__helper__["ResponsiveHelper"].matchesBreakpoint('desk')) {
              offsetTop = 250;
            }

            this.carouselNavScrollSpy = new __WEBPACK_IMPORTED_MODULE_4__components_ScrollSpy__["default"](this.element, this.slideshowImages, {
              rootMargin: '-' + offsetTop + 'px 0px 0px 0px'
            });
          }

          var productInfoStyles = window.getComputedStyle(this.productInfoElement),
              productInfoPadding = parseInt(productInfoStyles.paddingTop) + parseInt(productInfoStyles.paddingBottom);

          // 2nd: making sure to set up enough space in aside part
          var calculateMinHeight = function calculateMinHeight() {
            if (_this53.productAsideElement) {
              _this53.productAsideElement.style.minHeight = _this53.productInfoElement.scrollHeight - productInfoPadding + 'px';
              _this53.productInfoElement.closest('.Product__InfoWrapper').style.maxHeight = _this53.productAsideElement.offsetTop + _this53.productInfoElement.scrollHeight - productInfoPadding + 'px';
            } else {
              _this53.productWrapperElement.style.minHeight = _this53.productInfoElement.scrollHeight - parseInt(productInfoStyles.paddingTop) + 'px';
            }
          };

          calculateMinHeight();

          // This code actually works well, but if a merchant is using an app that dynamically adds content (such as ReCharge or any other widget-based app), this
          // will mess the min height. There is a clean solution to this issue, which is by using ResizeObserver. However it's only supported in Chrome for now,
          // but I feel it's already good to have a clean fix
          if (window.ResizeObserver && window.theme.enableExperimentalResizeObserver) {
            this.productInfoResizeObserver = new ResizeObserver(function () {
              calculateMinHeight(); // We currently do not take advantage of the values returned by the observer as our calculation depends on other values
            });

            this.productInfoResizeObserver.observe(this.productInfoElement);
          }

          // 3rd: let's handle the scroll for the product info
          this.productInfoScroller = new __WEBPACK_IMPORTED_MODULE_6__components_OverflowScroller__["default"](this.productInfoElement);

          // 4th: let's handle the scroll for the thumbnails
          if (this.options['showThumbnails'] && this.slideshowNavThumbnails) {
            this.productThumbnailsScroller = new __WEBPACK_IMPORTED_MODULE_6__components_OverflowScroller__["default"](this.slideshowNavThumbnails);
          }
        }
      }
    }]);

    return ProductSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ProductSection;

  /***/
},
/* 44 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Currency__ = __webpack_require__(5);

  var RecentlyViewedProductsSection = function () {
    function RecentlyViewedProductsSection(container) {
      _classCallCheck(this, RecentlyViewedProductsSection);

      this.element = container;
      this.options = JSON.parse(this.element.getAttribute('data-section-settings'));

      if (this.options['productId']) {
        this._saveProduct(this.options['productId']);
      }

      // Setup product item color swatch
      new __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__["default"](this.element);

      this._fetchProducts();
    }

    _createClass(RecentlyViewedProductsSection, [{
      key: 'onUnload',
      value: function onUnload() {
        if (this.carousel) {
          this.carousel.destroy();
        }
      }

      /**
       * When we are on a product page, we need to save the current product into local storage
       */

    }, {
      key: '_saveProduct',
      value: function _saveProduct(productId) {
        var items = JSON.parse(localStorage.getItem('recentlyViewedProducts') || '[]');

        // We check if the current product already exists, and if it does not, we add it at the start
        if (!items.includes(productId)) {
          items.unshift(productId);
        }

        // Then, we save the current product into the local storage, by keeping only the 8 most recent
        try {
          localStorage.setItem('recentlyViewedProducts', JSON.stringify(items.slice(0, 8)));
        } catch (error) {
          // Do nothing, this may happen in Safari in incognito mode
        }
      }

      /**
       * In order to get the products to display, we hit the search template with the given IDS
       */

    }, {
      key: '_fetchProducts',
      value: function _fetchProducts() {
        var _this54 = this;

        var queryString = this._getSearchQueryString();

        if (queryString === '') {
          return;
        }

        // If we have a non empty query string we do a search query
        fetch('/search?view=recently-viewed-products&type=product&q=' + queryString, {
          credentials: 'same-origin',
          method: 'GET'
        }).then(function (response) {
          response.text().then(function (content) {
            var tempElement = document.createElement('div');
            tempElement.innerHTML = content;

            // Set the content
            _this54.element.innerHTML = tempElement.querySelector('.Section').innerHTML;

            // Show the section
            _this54.element.parentNode.style.display = 'block';

            // Convert any amount (if applicable)
            if (window.theme.currencyConversionEnabled) {
              __WEBPACK_IMPORTED_MODULE_2__helper_Currency__["default"].convertAll(_this54.element);
            }

            // And finally let's create the carousel !
            _this54.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](_this54.element.querySelector('[data-flickity-config]'));
          });
        });
      }
    }, {
      key: '_getSearchQueryString',
      value: function _getSearchQueryString() {
        var items = JSON.parse(localStorage.getItem('recentlyViewedProducts') || '[]');

        // If we are on a product template, we make sure to remove the main product from the related product
        if (items.includes(this.options['productId'])) {
          items.splice(items.indexOf(this.options['productId']), 1);
        }

        return items.map(function (item) {
          return 'id:' + item;
        }).join(' OR ');
      }
    }]);

    return RecentlyViewedProductsSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = RecentlyViewedProductsSection;

  /***/
},
/* 45 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__ = __webpack_require__(4);

  var RelatedProductsSection = function () {
    function RelatedProductsSection(container) {
      _classCallCheck(this, RelatedProductsSection);

      this.element = container;
      this.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.element.querySelector('[data-flickity-config]'));

      // Setup product item color swatch
      new __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__["default"](this.element);
    }

    _createClass(RelatedProductsSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.carousel.destroy();
      }
    }]);

    return RelatedProductsSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = RelatedProductsSection;

  /***/
},
/* 46 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);

  var SearchSection = function () {
    function SearchSection(container) {
      _classCallCheck(this, SearchSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);

      this._setupAnimation();
    }

    _createClass(SearchSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.intersectionObserver.disconnect();
        this.timeline.kill();
      }
    }, {
      key: '_setupAnimation',
      value: function _setupAnimation() {
        var _this55 = this;

        if (this.intersectionObserver) {
          this.intersectionObserver.disconnect();
        }

        this.timeline = new TimelineLite({ delay: 0.5 });

        if (window.theme.showElementStaggering) {
          this.intersectionObserver = new IntersectionObserver(this._reveal.bind(this));

          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.ProductList .ProductItem, .ArticleList .ArticleItem')).forEach(function (item) {
            _this55.intersectionObserver.observe(item);
          });
        }
      }
    }, {
      key: '_reveal',
      value: function _reveal(results) {
        var _this56 = this;

        var toReveal = [];

        results.forEach(function (result) {
          if (result.isIntersecting || result.intersectionRatio > 0) {
            // isIntersecting does not exist on Samsung Android browser
            toReveal.push(result.target);
            _this56.intersectionObserver.unobserve(result.target);
          }
        });

        if (toReveal.length === 0) {
          return;
        }

        this.timeline.staggerFromTo(toReveal, 0.6, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0 }, 0.2);
      }
    }]);

    return SearchSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = SearchSection;

  /***/
},
/* 47 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);

  /**
   * This code is extracted from Slate
   */

  var SectionContainer = function () {
    function SectionContainer() {
      _classCallCheck(this, SectionContainer);

      this.constructors = [];
      this.instances = [];

      this._attachListeners();
    }

    _createClass(SectionContainer, [{
      key: '_attachListeners',
      value: function _attachListeners() {
        document.addEventListener('shopify:section:load', this._onSectionLoad.bind(this));
        document.addEventListener('shopify:section:unload', this._onSectionUnload.bind(this));
        document.addEventListener('shopify:section:select', this._onSelect.bind(this));
        document.addEventListener('shopify:section:deselect', this._onDeselect.bind(this));
        document.addEventListener('shopify:section:reorder', this._onReorder.bind(this));
        document.addEventListener('shopify:block:select', this._onBlockSelect.bind(this));
        document.addEventListener('shopify:block:deselect', this._onBlockDeselect.bind(this));
      }
    }, {
      key: 'register',
      value: function register(type, constructor) {
        var _this57 = this;

        this.constructors[type] = constructor;

        __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(document.querySelectorAll('[data-section-type=' + type + ']')).forEach(function (container) {
          _this57._createInstance(container, constructor);
        });
      }

      /**
       * Return an object from an array of objects that matches the provided key and value
       */

    }, {
      key: '_findInstance',
      value: function _findInstance(array, key, value) {
        for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
            return array[i];
          }
        }
      }

      /**
       * Remove an object from an array of objects by matching the provided key and value
       */

    }, {
      key: '_removeInstance',
      value: function _removeInstance(array, key, value) {
        var i = array.length;

        while (i--) {
          if (array[i][key] === value) {
            array.splice(i, 1);
            break;
          }
        }

        return array;
      }
    }, {
      key: '_onSectionLoad',
      value: function _onSectionLoad(event) {
        var container = event.target.querySelector('[data-section-id]');

        if (container) {
          this._createInstance(container);
        }
      }
    }, {
      key: '_onSectionUnload',
      value: function _onSectionUnload(event) {
        var instance = this._findInstance(this.instances, 'id', event.detail.sectionId);

        if (!instance) {
          return;
        }

        if (typeof instance.onUnload === 'function') {
          instance.onUnload(event);
        }

        this.instances = this._removeInstance(this.instances, 'id', event.detail.sectionId);
      }
    }, {
      key: '_onSelect',
      value: function _onSelect(event) {
        var instance = this._findInstance(this.instances, 'id', event.detail.sectionId);

        if (instance && typeof instance.onSelect === 'function') {
          instance.onSelect(event);
        }
      }
    }, {
      key: '_onDeselect',
      value: function _onDeselect(event) {
        var instance = this._findInstance(this.instances, 'id', event.detail.sectionId);

        if (instance && typeof instance.onDeselect === 'function') {
          instance.onDeselect(event);
        }
      }
    }, {
      key: '_onReorder',
      value: function _onReorder(event) {
        var instance = this._findInstance(this.instances, 'id', event.detail.sectionId);

        if (instance && typeof instance.onReorder === 'function') {
          instance.onReorder(event);
        }
      }
    }, {
      key: '_onBlockSelect',
      value: function _onBlockSelect(event) {
        var instance = this._findInstance(this.instances, 'id', event.detail.sectionId);

        if (instance && typeof instance.onBlockSelect === 'function') {
          instance.onBlockSelect(event);
        }
      }
    }, {
      key: '_onBlockDeselect',
      value: function _onBlockDeselect(event) {
        var instance = this._findInstance(this.instances, 'id', event.detail.sectionId);

        if (instance && typeof instance.onBlockDeselect === 'function') {
          instance.onBlockDeselect(event);
        }
      }
    }, {
      key: '_createInstance',
      value: function _createInstance(container, constructor) {
        var id = container.getAttribute('data-section-id'),
            type = container.getAttribute('data-section-type');

        constructor = constructor || this.constructors[type];

        if (typeof constructor === 'undefined') {
          return;
        }

        var instance = Object.assign(new constructor(container), {
          id: id,
          type: type,
          container: container
        });

        this.instances.push(instance);
      }
    }]);

    return SectionContainer;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = SectionContainer;

  /***/
},
/* 48 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__ = __webpack_require__(4);

  var ShopNowSection = function () {
    function ShopNowSection(container) {
      _classCallCheck(this, ShopNowSection);

      this.element = container;
      this.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.element.querySelector('[data-flickity-config]'));

      // Setup product item color swatch
      new __WEBPACK_IMPORTED_MODULE_1__components_ProductItemColorSwatch__["default"](this.element);
    }

    _createClass(ShopNowSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.carousel.destroy();
      }
    }]);

    return ShopNowSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ShopNowSection;

  /***/
},
/* 49 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_Popover__ = __webpack_require__(9);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__helper_Responsive__ = __webpack_require__(2);

  var ShopTheLookSection = function () {
    function ShopTheLookSection(container) {
      _classCallCheck(this, ShopTheLookSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.usePocketMode = __WEBPACK_IMPORTED_MODULE_3__helper_Responsive__["default"].matchesBreakpoint('pocket');
      this.pocketActivatorButton = this.element.querySelector('[data-action="open-look"]');

      this._createOuterCarousel();
      this._createPocketPopovers();

      this._attachListeners();
    }

    _createClass(ShopTheLookSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.outerCarousel.destroy();
        this.innerCarousels.forEach(function (item) {
          item.forEach(function (innerItem) {
            return innerItem.destroy();
          });
        });

        this.popovers.forEach(function (item) {
          return item.destroy();
        });

        this.delegateElement.off();
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        this.outerCarousel.selectCell(event.target.getAttribute('data-slide-index'), true, !event.detail.load);
      }

      /**
       * Attach all the listeners
       */

    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '.ShopTheLook__Dot', this._onDotClicked.bind(this));
      }

      /**
       * There is one mobile and tablet popover per look, so we pre-create them
       */

    }, {
      key: '_createPocketPopovers',
      value: function _createPocketPopovers() {
        var _this58 = this;

        this.popovers = [];

        __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.Popover')).forEach(function (popover) {
          _this58.popovers.push(new __WEBPACK_IMPORTED_MODULE_1__components_Popover__["default"](popover, {
            activator: _this58.pocketActivatorButton,
            showOverlay: false,
            onOpen: _this58._openPocketZoom.bind(_this58),
            onClose: _this58._closePocketZoom.bind(_this58)
          }));
        });
      }

      /**
       * The outer carousel is the carousel that holds the main one (all the looks). Internally, it also creates
       * a sub-carousel for each inner carousel
       */

    }, {
      key: '_createOuterCarousel',
      value: function _createOuterCarousel() {
        var _this59 = this;

        this.outerCarousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.element.querySelector('.ShopTheLook'), {
          onSelect: this._onLookChanged.bind(this)
        });

        this.innerCarousels = new Array(this.outerCarousel.flickityInstance.cells.length);

        for (var i = 0; i !== this.innerCarousels.length; ++i) {
          this.innerCarousels[i] = [];
        }

        // We need to create ALL the carousels (both in desktop and mobile). Fortunately Flickity is quite fast, but
        // we have no other choices if we want to have proper animations everywhere.
        __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.ShopTheLook__ProductList')).forEach(function (item) {
          var lookIndex = parseInt(item.getAttribute('data-look-index'));
          _this59.innerCarousels[lookIndex].push(new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](item, { onSelect: _this59._onProductChanged.bind(_this59) }));

          // By default, Flickity will append the carousel, hence making the "ViewButton" before the carousel. We need to manipulate it to move it after
          item.insertBefore(item.querySelector('.flickity-viewport'), item.querySelector('.ShopTheLook__ViewButton'));
        });

        this.outerCarousel.resize(); // Needed in case the products are taller than the image
      }

      /**
       * This function is called whenever the main look has changed, so that we can modify the popover activator
       */

    }, {
      key: '_onLookChanged',
      value: function _onLookChanged(selectedIndex, selectedCell) {
        // Then, we update the mobile button so that it opens the correct block
        this.pocketActivatorButton.setAttribute('aria-controls', selectedCell.getAttribute('id') + '-popover');
      }

      /**
       * This function is called whenever a product is changed in the list for a given look. This allows to focus the main dot
       */

    }, {
      key: '_onProductChanged',
      value: function _onProductChanged(selectedIndex, selectedCell) {
        var lookItem = this.outerCarousel.getSelectedCell(),
            activeDot = null;

        __WEBPACK_IMPORTED_MODULE_2__helper_Dom__["default"].nodeListToArray(lookItem.querySelectorAll('.ShopTheLook__Dot')).forEach(function (dot, index) {
          dot.classList.remove('is-active'); // IE11 and lower does not support "toggle" with second parameter :(

          if (index === selectedIndex) {
            dot.classList.add('is-active');
            activeDot = dot;
          }
        });

        // Update the link to the product (if using the desktop view)
        lookItem.querySelector('.ShopTheLook__ViewButton').setAttribute('href', selectedCell.getAttribute('data-product-url'));

        // We trigger an event so that when the dot change we can recalculate the position
        lookItem.dispatchEvent(new CustomEvent('product:changed', { detail: { dot: activeDot } }));
      }

      /**
       * This function is called whenever you explicitly click on a dot.
       *
       * On mobile and tablet, this must open the appropriate popver
       */

    }, {
      key: '_onDotClicked',
      value: function _onDotClicked(event, target) {
        var shouldAnimateCarousel = false,
            hasOnePopoverOpen = false,
            lookIndex = this.outerCarousel.getSelectedIndex();

        this.popovers.forEach(function (item) {
          if (item.isOpen) {
            hasOnePopoverOpen = true;
            shouldAnimateCarousel = true;
          }
        });

        // Each inner carousel has a mobile AND desktop version, so we change both
        this.innerCarousels[lookIndex].forEach(function (innerCarousel) {
          innerCarousel.selectCell(parseInt(target.getAttribute('data-product-index')) - 1, false, shouldAnimateCarousel);
        });

        if (this.usePocketMode && !hasOnePopoverOpen) {
          this.popovers[lookIndex].open();
        }
      }

      /**
       * This is called when, on mobile, the popover is open. We must open the image in full resolution
       */

    }, {
      key: '_openPocketZoom',
      value: function _openPocketZoom(popover) {
        var _this60 = this;

        this._calculateImageTransform(popover);

        fastdom.mutate(function () {
          // We need to animate the header to avoid a slightly ugly effect if image overlap the header
          document.getElementById('shopify-section-header').style.cssText = 'transform: translateY(-100%); transition: transform 0.3s ease-in-out;';

          _this60.outerCarousel.flickityInstance.unbindDrag(); // Prevent changing the active slide
          _this60.outerCarousel.flickityInstance.element.classList.add('is-zoomed');
          _this60.outerCarousel.getSelectedCell().classList.add('is-expanded');
        });
      }

      /**
       * When the mobile zoom is open, and whenever the active dot changes, we need to potentially re-calculate the transform
       */

    }, {
      key: '_calculateImageTransform',
      value: function _calculateImageTransform(openPopover) {
        var _this61 = this;

        var selectedCell = this.outerCarousel.getSelectedCell();

        fastdom.measure(function () {
          // We first need to compute the initial transform and scale factor
          var scale = window.innerWidth / (selectedCell.offsetWidth - parseInt(window.getComputedStyle(selectedCell).paddingLeft) * 2),
              heightAfterScale = Math.round(selectedCell.offsetHeight * scale),
              // Height of the selected cell once the scale transform is applied
          hiddenImageHeight = Math.round(Math.max(heightAfterScale - (window.innerHeight - openPopover.element.offsetHeight), 0)),
              // Part of image that is below popover
          visibleImageHeight = heightAfterScale - hiddenImageHeight,
              // Part of the image that is visible in the viewport
          minTranslateY = Math.round(-(selectedCell.getBoundingClientRect().top - (heightAfterScale - selectedCell.offsetHeight) / 2)),
              // The minimum translate Y transform allowed so that image is visible
          maxTranslateY = Math.round(minTranslateY - hiddenImageHeight); // The maximum translate Y transform allowed so that image is visible

          _this61._calculateTransformForDotListener = function (event) {
            var dotTopPosition = Math.round((event.detail.dot.offsetTop + event.detail.dot.offsetHeight / 2) * scale),
                offsetToMove = Math.round(dotTopPosition - visibleImageHeight / 2),
                translateY = Math.min(Math.max(minTranslateY - offsetToMove, maxTranslateY), minTranslateY);

            fastdom.mutate(function () {
              _this61.outerCarousel.flickityInstance.viewport.style.transform = 'translate3d(0, ' + Math.round(translateY) + 'px, 0) scale(' + scale + ')';
            });
          };

          // We manually generate an event the first time to trigger the positioning

          selectedCell.addEventListener('product:changed', _this61._calculateTransformForDotListener);
          selectedCell.dispatchEvent(new CustomEvent('product:changed', {
            detail: { dot: selectedCell.querySelector('.ShopTheLook__Dot.is-active') }
          }));
        });
      }

      /**
       * Close the mobile zoom (which close the popover and remove any transform
       */

    }, {
      key: '_closePocketZoom',
      value: function _closePocketZoom() {
        var _this62 = this;

        var selectedCell = this.outerCarousel.getSelectedCell();

        selectedCell.removeEventListener('product:changed', this._calculateTransformForDotListener);

        fastdom.mutate(function () {
          document.getElementById('shopify-section-header').style.cssText = 'transform: translateY(0); transition: transform 0.3s ease-in-out 0.3s;';

          _this62.outerCarousel.flickityInstance.bindDrag();
          _this62.outerCarousel.flickityInstance.element.classList.remove('is-zoomed');
          _this62.outerCarousel.flickityInstance.viewport.style.transform = null;

          selectedCell.classList.remove('is-expanded');
        });
      }
    }]);

    return ShopTheLookSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = ShopTheLookSection;

  /***/
},
/* 50 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Drawer__ = __webpack_require__(8);

  var SidebarMenuSection = function () {
    function SidebarMenuSection(container) {
      _classCallCheck(this, SidebarMenuSection);

      this.element = container;
      this.sidebarDrawer = new __WEBPACK_IMPORTED_MODULE_0__components_Drawer__["default"](container);
    }

    _createClass(SidebarMenuSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.sidebarDrawer.destroy();
      }
    }, {
      key: 'onSelect',
      value: function onSelect() {
        this.sidebarDrawer.open();
      }
    }, {
      key: 'onDeselect',
      value: function onDeselect() {
        this.sidebarDrawer.close();
      }
    }]);

    return SidebarMenuSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = SidebarMenuSection;

  /***/
},
/* 51 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__ = __webpack_require__(2);

  var SlideshowSection = function () {
    function SlideshowSection(container) {
      _classCallCheck(this, SlideshowSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.slideshow = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.element.querySelector('[data-flickity-config]'), { onSelect: this._onSlideChanged.bind(this) });
      this.selectedSlide = null;
      this.shouldAnimate = true;
      this.timeline = new TimelineLite({ delay: window.theme.showPageTransition ? 0.5 : 0 });

      if (this.slideshow.flickityInstance.cells.length > 0) {
        this._transitionToSlide(this.slideshow.flickityInstance.selectedCell.element, true);
      }

      this._attachListeners();
    }

    _createClass(SlideshowSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.slideshow.destroy();
        this.timeline.kill();
        this.delegateElement.off();

        document.removeEventListener('breakpoint:changed', this._onBreakpointChangedListener);
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        if (this.slideshow.flickityInstance.options.autoPlay) {
          this.slideshow.flickityInstance.stopPlayer();
        }

        this.shouldAnimate = !event.detail.load;
        this.slideshow.selectCell(event.target.getAttribute('data-slide-index'), false, !event.detail.load);
      }
    }, {
      key: 'onBlockDeselect',
      value: function onBlockDeselect() {
        this.shouldAnimate = true;

        if (this.slideshow.flickityInstance.options.autoPlay) {
          this.slideshow.flickityInstance.playPlayer();
        }
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this._onBreakpointChangedListener = this._onBreakpointChanged.bind(this);

        this.delegateElement.on('mouseenter', '.Button', this._pauseSlideshow.bind(this), true);
        this.delegateElement.on('mouseleave', '.Button', this._resumeSlideshow.bind(this), true);

        document.addEventListener('breakpoint:changed', this._onBreakpointChangedListener);
      }
    }, {
      key: '_pauseSlideshow',
      value: function _pauseSlideshow() {
        if (this.slideshow.flickityInstance.options.autoPlay) {
          this.slideshow.flickityInstance.pausePlayer();
        }
      }
    }, {
      key: '_resumeSlideshow',
      value: function _resumeSlideshow() {
        if (this.slideshow.flickityInstance.options.autoPlay) {
          this.slideshow.flickityInstance.unpausePlayer();
        }
      }
    }, {
      key: '_onSlideChanged',
      value: function _onSlideChanged(index, element) {
        this._transitionToSlide(element);
      }
    }, {
      key: '_transitionToSlide',
      value: function _transitionToSlide(slide) {
        var _this63 = this;

        this.timeline.clear();

        // First, we check if there is a previous slide selected, if that's the case
        if (this.selectedSlide) {
          this._slideLeave(this.selectedSlide);
          this.timeline.addLabel('enter', this.shouldAnimate ? '-=0.4' : 0);
        }

        // We get the next slide (if any) to preload it
        this._lazyLoadNextImage();

        this.timeline.fromTo(slide, this.selectedSlide && this.shouldAnimate ? 0.3 : 0, { autoAlpha: 0 }, { autoAlpha: 1, ease: Cubic.easeInOut }, 'enter');

        // The image may take 1s or more to load depending on the network, so we make sure to pause the player, and restart it once it has transitioned
        if (this.slideshow.flickityInstance.options.autoPlay && this.slideshow.flickityInstance.player.state === 'playing') {
          this.slideshow.flickityInstance.pausePlayer();
        }

        __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(slide.querySelectorAll('.Slideshow__Image')).forEach(function (image) {
          if (image.classList.contains('Image--lazyLoading') || image.classList.contains('Image--lazyLoad')) {
            image.addEventListener('lazyloaded', _this63._slideEnter.bind(_this63, slide));
          } else {
            _this63._slideEnter(slide);
          }
        });

        this.selectedSlide = slide;
      }
    }, {
      key: '_slideLeave',
      value: function _slideLeave(slide) {
        var content = slide.querySelector('.SectionHeader'),
            buttonWrapper = slide.querySelector('.SectionHeader__ButtonWrapper');

        this.timeline.fromTo(slide, this.shouldAnimate ? 0.3 : 0, { autoAlpha: 1 }, { autoAlpha: 0, ease: Cubic.easeInOut, delay: this.shouldAnimate ? 0.35 : 0 });

        if (content) {
          this.timeline.fromTo(content, this.shouldAnimate ? 0.4 : 0, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 20, ease: Cubic.easeIn }, 0);
        }

        if (buttonWrapper) {
          this.timeline.fromTo(buttonWrapper, this.shouldAnimate ? 0.4 : 0, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 10, ease: Cubic.easeIn }, 0);
        }
      }
    }, {
      key: '_slideEnter',
      value: function _slideEnter(slide) {
        var images = slide.querySelectorAll('.Slideshow__Image'),
            content = slide.querySelector('.SectionHeader'),
            buttonWrapper = slide.querySelector('.SectionHeader__ButtonWrapper');

        if (this.slideshow.flickityInstance.options.autoPlay && this.slideshow.flickityInstance.player.state === 'paused') {
          this.slideshow.flickityInstance.unpausePlayer();
        }

        if (window.CSS && window.CSS.supports('(object-fit: cover) or (-o-object-fit: cover)')) {
          if (window.theme.showImageZooming) {
            this.timeline.fromTo(images, this.shouldAnimate ? 1.2 : 0, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, ease: Quad.easeOut }, 'enter');
          } else {
            this.timeline.fromTo(images, this.shouldAnimate ? 1.2 : 0, { opacity: 0 }, { opacity: 1, ease: Quad.easeOut }, 'enter');
          }
        }

        if (content) {
          this.timeline.fromTo(content, this.shouldAnimate ? 0.8 : 0, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, delay: this.shouldAnimate ? 0.8 : 0, ease: Cubic.easeOut }, 'enter');
        }

        if (buttonWrapper) {
          this.timeline.fromTo(buttonWrapper, this.shouldAnimate ? 0.8 : 0, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, delay: this.shouldAnimate ? 0.8 : 0, ease: Cubic.easeOut }, 'enter');
        }
      }
    }, {
      key: '_lazyLoadNextImage',
      value: function _lazyLoadNextImage() {
        var currentIndex = this.slideshow.flickityInstance.selectedIndex,
            breakpoint = __WEBPACK_IMPORTED_MODULE_2__helper_Responsive__["default"].getCurrentBreakpoint();

        if (this.slideshow.flickityInstance.cells.length - 1 > currentIndex) {
          var nextCellElement = this.slideshow.flickityInstance.cells[currentIndex + 1].element,
              imageContainers = __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(nextCellElement.querySelectorAll('.Slideshow__ImageContainer')),
              imageToReveal = null;

          if (breakpoint === 'phone') {
            imageToReveal = imageContainers[0];
          } else {
            imageToReveal = imageContainers[1];
          }

          if (window.lazySizes && imageToReveal && imageToReveal.classList.contains('Image--lazyLoad')) {
            lazySizes.loader.unveil(imageToReveal.firstElementChild);
          }
        }
      }
    }, {
      key: '_onBreakpointChanged',
      value: function _onBreakpointChanged(event) {
        if (event.detail.previousBreakpoint === 'phone' && event.detail.currentBreakpoint !== 'phone' || event.detail.previousBreakpoint !== 'phone' && event.detail.currentBreakpoint === 'phone') {
          this.selectedSlide = null;
          this._transitionToSlide(this.slideshow.flickityInstance.selectedElement);
        }
      }
    }]);

    return SlideshowSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = SlideshowSection;

  /***/
},
/* 52 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_Carousel__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper_Dom__ = __webpack_require__(0);

  var TestimonialsSection = function () {
    function TestimonialsSection(container) {
      _classCallCheck(this, TestimonialsSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.navItems = __WEBPACK_IMPORTED_MODULE_1__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.TestimonialNav__Item'));

      this.carousel = new __WEBPACK_IMPORTED_MODULE_0__components_Carousel__["default"](this.element.querySelector('.TestimonialList'), {
        onSelect: this._testimonialChanged.bind(this)
      });

      this._attachListeners();
    }

    _createClass(TestimonialsSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.carousel.destroy();
        this.delegateElement.off('click');
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        this.carousel.selectCell(event.target.getAttribute('data-slide-index'), true);
      }
    }, {
      key: 'onBlockDeselect',
      value: function onBlockDeselect() {
        this.carousel.unpausePlayer();
      }
    }, {
      key: '_testimonialClicked',
      value: function _testimonialClicked(event, target) {
        this.carousel.pausePlayer();
        this.carousel.selectCell(parseInt(target.getAttribute('data-index')));
        this.carousel.unpausePlayer();
      }
    }, {
      key: '_testimonialChanged',
      value: function _testimonialChanged(newIndex) {
        this.navItems.forEach(function (item, index) {
          item.classList.remove('is-selected'); // IE11 and lower does not support classList.toggle

          if (newIndex === index) {
            item.classList.add('is-selected');
          }
        });
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '.TestimonialNav__Item', this._testimonialClicked.bind(this));
      }
    }]);

    return TestimonialsSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = TestimonialsSection;

  /***/
},
/* 53 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__helper_Dom__ = __webpack_require__(0);

  var TimelineSection = function () {
    function TimelineSection(container) {
      _classCallCheck(this, TimelineSection);

      this.element = container;
      this.delegateElement = new domDelegate.Delegate(this.element);
      this.items = __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.Timeline__Item'));
      this.navItems = __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].nodeListToArray(this.element.querySelectorAll('.Timeline__NavItem'));

      this._attachListeners();
    }

    _createClass(TimelineSection, [{
      key: 'onUnload',
      value: function onUnload() {
        this.delegateElement.off('click');
      }
    }, {
      key: 'onBlockSelect',
      value: function onBlockSelect(event) {
        this.navItems[parseInt(event.target.getAttribute('data-index'))].click(); // Simulate a click on the given nav item
      }
    }, {
      key: '_attachListeners',
      value: function _attachListeners() {
        this.delegateElement.on('click', '.Timeline__NavItem', this._clickOnNavItem.bind(this));
      }
    }, {
      key: '_clickOnNavItem',
      value: function _clickOnNavItem(event, target) {
        var newItem = this.items[parseInt(target.getAttribute('data-index'))];

        if (newItem.classList.contains('is-selected')) {
          return;
        }

        var isContentLarger = false,
            navWrapper = target.parentNode,
            scrollableOffset = 0;

        fastdom.measure(function () {
          var scrollableWidth = navWrapper.scrollWidth,
              visibleWidth = navWrapper.offsetWidth;

          isContentLarger = visibleWidth < scrollableWidth;

          if (isContentLarger) {
            var beginBound = target.offsetLeft,
                endBound = beginBound + target.offsetWidth,
                closerToLeft = beginBound <= visibleWidth - endBound;

            var itemToUse = null;

            if (closerToLeft) {
              // If closer to left, we try to make the previous item visible (if possible)
              itemToUse = target.previousElementSibling || target;
            } else {
              // If closer to right, we try to make the next item visible (if possible)
              itemToUse = target.nextElementSibling || target;
            }

            var itemBeginBound = itemToUse.offsetLeft - navWrapper.scrollLeft,
                itemEndBound = itemBeginBound + itemToUse.offsetWidth;

            if (itemEndBound > visibleWidth) {
              // Element is not visible from the right, so we must move by a given amount so that endBound is within viewable screen
              scrollableOffset = itemEndBound - visibleWidth;
            } else if (itemBeginBound < 0) {
              // Element is not visible from the left, so we simply use the opposite of the negative offset
              scrollableOffset = itemBeginBound;
            }
          }
        });

        fastdom.mutate(function () {
          if (isContentLarger) {
            navWrapper.scrollBy({ behavior: 'smooth', left: scrollableOffset });
          }

          // First we set the class on the selected item and remove it on siblings
          target.classList.add('is-selected');
          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].getSiblings(target, '.is-selected').forEach(function (item) {
            item.classList.remove('is-selected');
          });

          // Then we slide to the appropriate element
          newItem.classList.add('is-selected');
          __WEBPACK_IMPORTED_MODULE_0__helper_Dom__["default"].getSiblings(newItem, '.is-selected').forEach(function (item) {
            item.classList.remove('is-selected');
          });
        });
      }
    }]);

    return TimelineSection;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = TimelineSection;

  /***/
},
/* 54 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__AddressesSection__ = __webpack_require__(26);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "AddressesSection", function () {
    return __WEBPACK_IMPORTED_MODULE_0__AddressesSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__ArticleListSection__ = __webpack_require__(27);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ArticleListSection", function () {
    return __WEBPACK_IMPORTED_MODULE_1__ArticleListSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__ArticleSection__ = __webpack_require__(28);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ArticleSection", function () {
    return __WEBPACK_IMPORTED_MODULE_2__ArticleSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__CartSection__ = __webpack_require__(30);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "CartSection", function () {
    return __WEBPACK_IMPORTED_MODULE_3__CartSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__CollectionListSection__ = __webpack_require__(31);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "CollectionListSection", function () {
    return __WEBPACK_IMPORTED_MODULE_4__CollectionListSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__CollectionSection__ = __webpack_require__(32);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "CollectionSection", function () {
    return __WEBPACK_IMPORTED_MODULE_5__CollectionSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__FaqSection__ = __webpack_require__(33);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "FaqSection", function () {
    return __WEBPACK_IMPORTED_MODULE_6__FaqSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__FeaturedCollectionsSection__ = __webpack_require__(34);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "FeaturedCollectionsSection", function () {
    return __WEBPACK_IMPORTED_MODULE_7__FeaturedCollectionsSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__FeaturedProductSection__ = __webpack_require__(35);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "FeaturedProductSection", function () {
    return __WEBPACK_IMPORTED_MODULE_8__FeaturedProductSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_9__BackgroundVideoSection__ = __webpack_require__(29);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "BackgroundVideoSection", function () {
    return __WEBPACK_IMPORTED_MODULE_9__BackgroundVideoSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_10__GiftCardSection__ = __webpack_require__(36);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "GiftCardSection", function () {
    return __WEBPACK_IMPORTED_MODULE_10__GiftCardSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_11__HeaderSection__ = __webpack_require__(37);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "HeaderSection", function () {
    return __WEBPACK_IMPORTED_MODULE_11__HeaderSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_12__ImageWithTextBlockSection__ = __webpack_require__(38);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ImageWithTextBlockSection", function () {
    return __WEBPACK_IMPORTED_MODULE_12__ImageWithTextBlockSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_13__InstagramSection__ = __webpack_require__(39);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "InstagramSection", function () {
    return __WEBPACK_IMPORTED_MODULE_13__InstagramSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_14__LoginSection__ = __webpack_require__(40);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "LoginSection", function () {
    return __WEBPACK_IMPORTED_MODULE_14__LoginSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_15__MapSection__ = __webpack_require__(41);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "MapSection", function () {
    return __WEBPACK_IMPORTED_MODULE_15__MapSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_16__NewsletterPopupSection__ = __webpack_require__(42);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "NewsletterPopupSection", function () {
    return __WEBPACK_IMPORTED_MODULE_16__NewsletterPopupSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_17__ProductSection__ = __webpack_require__(43);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ProductSection", function () {
    return __WEBPACK_IMPORTED_MODULE_17__ProductSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_18__RecentlyViewedProductsSection__ = __webpack_require__(44);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "RecentlyViewedProductsSection", function () {
    return __WEBPACK_IMPORTED_MODULE_18__RecentlyViewedProductsSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_19__RelatedProductsSection__ = __webpack_require__(45);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "RelatedProductsSection", function () {
    return __WEBPACK_IMPORTED_MODULE_19__RelatedProductsSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_20__SectionContainer__ = __webpack_require__(47);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "SectionContainer", function () {
    return __WEBPACK_IMPORTED_MODULE_20__SectionContainer__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_21__SearchSection__ = __webpack_require__(46);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "SearchSection", function () {
    return __WEBPACK_IMPORTED_MODULE_21__SearchSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_22__ShopNowSection__ = __webpack_require__(48);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ShopNowSection", function () {
    return __WEBPACK_IMPORTED_MODULE_22__ShopNowSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_23__ShopTheLookSection__ = __webpack_require__(49);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "ShopTheLookSection", function () {
    return __WEBPACK_IMPORTED_MODULE_23__ShopTheLookSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_24__SidebarMenuSection__ = __webpack_require__(50);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "SidebarMenuSection", function () {
    return __WEBPACK_IMPORTED_MODULE_24__SidebarMenuSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_25__SlideshowSection__ = __webpack_require__(51);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "SlideshowSection", function () {
    return __WEBPACK_IMPORTED_MODULE_25__SlideshowSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_26__TestimonialsSection__ = __webpack_require__(52);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "TestimonialsSection", function () {
    return __WEBPACK_IMPORTED_MODULE_26__TestimonialsSection__["default"];
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_27__TimelineSection__ = __webpack_require__(53);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "TimelineSection", function () {
    return __WEBPACK_IMPORTED_MODULE_27__TimelineSection__["default"];
  });

  /***/
},
/* 55 */
/***/function (module, exports, __webpack_require__) {

  __webpack_require__(3);
  __webpack_require__(7);
  __webpack_require__(5);
  __webpack_require__(0);
  __webpack_require__(19);
  __webpack_require__(10);
  __webpack_require__(2);
  __webpack_require__(6);
  __webpack_require__(1);
  __webpack_require__(20);
  __webpack_require__(12);
  __webpack_require__(8);
  __webpack_require__(21);
  __webpack_require__(22);
  __webpack_require__(13);
  __webpack_require__(23);
  __webpack_require__(9);
  __webpack_require__(14);
  __webpack_require__(4);
  __webpack_require__(15);
  __webpack_require__(11);
  __webpack_require__(17);
  __webpack_require__(24);
  __webpack_require__(18);
  __webpack_require__(16);
  __webpack_require__(25);
  __webpack_require__(26);
  __webpack_require__(27);
  __webpack_require__(28);
  __webpack_require__(29);
  __webpack_require__(30);
  __webpack_require__(31);
  __webpack_require__(32);
  __webpack_require__(33);
  __webpack_require__(34);
  __webpack_require__(35);
  __webpack_require__(36);
  __webpack_require__(37);
  __webpack_require__(38);
  __webpack_require__(39);
  __webpack_require__(40);
  __webpack_require__(41);
  __webpack_require__(42);
  __webpack_require__(43);
  __webpack_require__(44);
  __webpack_require__(45);
  __webpack_require__(46);
  __webpack_require__(47);
  __webpack_require__(48);
  __webpack_require__(49);
  __webpack_require__(50);
  __webpack_require__(51);
  __webpack_require__(52);
  __webpack_require__(53);
  __webpack_require__(54);
  module.exports = __webpack_require__(56);

  /***/
},
/* 56 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(25);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(6);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__sections__ = __webpack_require__(54);

  (function () {
    // First, we register all plugins that are used for all pages
    new __WEBPACK_IMPORTED_MODULE_0__components__["Collapsible"]();
    new __WEBPACK_IMPORTED_MODULE_0__components__["Modal"]();
    new __WEBPACK_IMPORTED_MODULE_1__helper__["ResponsiveHelper"]();

    if (window.theme.template !== 'password' && window.theme.template !== 'gift_card') {
      new __WEBPACK_IMPORTED_MODULE_0__components__["Search"]();
      new __WEBPACK_IMPORTED_MODULE_0__components__["LoadingBar"]();
    }

    // Then, we instantiate specific sections that may appear in all pages. In the past I used to scope the sections by the template for
    // (slightly) improving performance, but we had merchants who actually created their own sections based on home page sections to integrate them
    // on content page, for instance.

    var sections = new __WEBPACK_IMPORTED_MODULE_2__sections__["SectionContainer"]();

    sections.register('header', __WEBPACK_IMPORTED_MODULE_2__sections__["HeaderSection"]);
    sections.register('sidebar-menu', __WEBPACK_IMPORTED_MODULE_2__sections__["SidebarMenuSection"]);
    sections.register('cart', __WEBPACK_IMPORTED_MODULE_2__sections__["CartSection"]);
    sections.register('newsletter-popup', __WEBPACK_IMPORTED_MODULE_2__sections__["NewsletterPopupSection"]);

    // Sections used on index
    sections.register('slideshow', __WEBPACK_IMPORTED_MODULE_2__sections__["SlideshowSection"]);
    sections.register('collection-list', __WEBPACK_IMPORTED_MODULE_2__sections__["CollectionListSection"]);
    sections.register('article-list', __WEBPACK_IMPORTED_MODULE_2__sections__["ArticleListSection"]);
    sections.register('featured-product', __WEBPACK_IMPORTED_MODULE_2__sections__["FeaturedProductSection"]);
    sections.register('image-with-text-block', __WEBPACK_IMPORTED_MODULE_2__sections__["ImageWithTextBlockSection"]);
    sections.register('timeline', __WEBPACK_IMPORTED_MODULE_2__sections__["TimelineSection"]);
    sections.register('instagram', __WEBPACK_IMPORTED_MODULE_2__sections__["InstagramSection"]);
    sections.register('map', __WEBPACK_IMPORTED_MODULE_2__sections__["MapSection"]);
    sections.register('featured-collections', __WEBPACK_IMPORTED_MODULE_2__sections__["FeaturedCollectionsSection"]);
    sections.register('shop-the-look', __WEBPACK_IMPORTED_MODULE_2__sections__["ShopTheLookSection"]);
    sections.register('testimonials', __WEBPACK_IMPORTED_MODULE_2__sections__["TestimonialsSection"]);
    sections.register('background-video', __WEBPACK_IMPORTED_MODULE_2__sections__["BackgroundVideoSection"]);

    // Sections used on product page
    sections.register('product', __WEBPACK_IMPORTED_MODULE_2__sections__["ProductSection"]);
    sections.register('related-products', __WEBPACK_IMPORTED_MODULE_2__sections__["RelatedProductsSection"]);

    // Sections used on collection page
    sections.register('collection', __WEBPACK_IMPORTED_MODULE_2__sections__["CollectionSection"]);

    // Sections used on blog page
    sections.register('article-list', __WEBPACK_IMPORTED_MODULE_2__sections__["ArticleListSection"]);

    // Sections used on article page
    sections.register('article', __WEBPACK_IMPORTED_MODULE_2__sections__["ArticleSection"]);

    // Sections used on content pages
    sections.register('faq', __WEBPACK_IMPORTED_MODULE_2__sections__["FaqSection"]);

    // Sections used on login page
    sections.register('login', __WEBPACK_IMPORTED_MODULE_2__sections__["LoginSection"]);

    // Sections used on addresses page
    sections.register('addresses', __WEBPACK_IMPORTED_MODULE_2__sections__["AddressesSection"]);

    // Sections used on gift card page
    sections.register('gift-card', __WEBPACK_IMPORTED_MODULE_2__sections__["GiftCardSection"]);

    // Sections used on search page
    sections.register('search', __WEBPACK_IMPORTED_MODULE_2__sections__["SearchSection"]);

    // Sections used on different pages
    sections.register('recently-viewed-products', __WEBPACK_IMPORTED_MODULE_2__sections__["RecentlyViewedProductsSection"]);
    sections.register('shop-now', __WEBPACK_IMPORTED_MODULE_2__sections__["ShopNowSection"]);

    /**
     * ----------------------------------------------------------------------------
     * AUTOMATIC CURRENCY CONVERSION
     * ----------------------------------------------------------------------------
     */

    (function () {
      if (window.theme.currencyConversionEnabled) {
        var shopCurrency = window.theme.shopCurrency,
            currencySelectors = __WEBPACK_IMPORTED_MODULE_1__helper__["DomHelper"].nodeListToArray(document.querySelectorAll('.CurrencySelector__Select'));

        var currencyHasChanged = function currencyHasChanged(event) {
          var newCurrency = event.target.value;

          // As we have multiple selectors in the page, we need to update them all
          currencySelectors.forEach(function (currencySelectorToUpdate) {
            currencySelectorToUpdate.value = newCurrency;
          });

          // Then we can convert everything
          __WEBPACK_IMPORTED_MODULE_1__helper__["CurrencyHelper"].convertAll();
        };

        currencySelectors.forEach(function (currencySelector) {
          currencySelector.addEventListener('change', currencyHasChanged);
        });

        var currentCurrency = shopCurrency;

        try {
          currentCurrency = localStorage.getItem('currency') || shopCurrency;
        } catch (exception) {
          currentCurrency = shopCurrency;
        }

        if (currentCurrency !== shopCurrency) {
          currencySelectors.forEach(function (currencySelector) {
            currencySelector.value = currentCurrency;
          });

          __WEBPACK_IMPORTED_MODULE_1__helper__["CurrencyHelper"].convertAll();
        }
      }
    })();

    /**
     * ----------------------------------------------------------------------------
     * RTE
     * ----------------------------------------------------------------------------
     */

    (function () {
      // We wrap each RTE table by a specific class to allow wrapping
      __WEBPACK_IMPORTED_MODULE_1__helper__["DomHelper"].nodeListToArray(document.querySelectorAll('.Rte table')).forEach(function (table) {
        table.outerHTML = '<div class="TableWrapper">' + table.outerHTML + '</div>';
      });

      __WEBPACK_IMPORTED_MODULE_1__helper__["DomHelper"].nodeListToArray(document.querySelectorAll('.Rte iframe')).forEach(function (iframe) {
        // We scope the wrapping only for YouTube and Vimeo
        if (iframe.src.indexOf('youtube') !== -1 || iframe.src.indexOf('youtu.be') !== -1 || iframe.src.indexOf('vimeo') !== -1) {
          iframe.outerHTML = '<div class="VideoWrapper">' + iframe.outerHTML + '</div>';

          // Re-set the src attribute on each iframe after page load for Chrome's "incorrect iFrame content on 'back'" bug.
          // https://code.google.com/p/chromium/issues/detail?id=395791. Need to specifically target video and admin bar
          iframe.src = iframe.src;
        }
      });
    })();

    /**
     * ----------------------------------------------------------------------------
     * UTILS
     * ----------------------------------------------------------------------------
     */

    (function () {
      var documentDelegate = new domDelegate.Delegate(document.body),
          announcementBar = document.querySelector('.AnnouncementBar');

      documentDelegate.on('click', '[href^="#"], [data-href]', function (event, target) {
        var selector = target.hasAttribute('href') ? target.getAttribute('href') : target.getAttribute('data-href');

        if (selector === '#') {
          return;
        }

        var element = document.querySelector(selector),
            offset =  element ? element.offsetTop - parseInt(target.getAttribute('data-offset') || 0) : parseInt(target.getAttribute('data-offset') || 0);

        if (announcementBar) {
          offset -= announcementBar.clientHeight;
        }
        var el = $(element);
        if(el.hasClass("Product__SlideItem")){
          offset = el.offset().top - $("#shopify-section-header").height();
        }
        window.scrollTo({ behavior: 'smooth', top:  offset });

        event.preventDefault();
      });
    })();

    (function () {
      var windowWidth = window.innerWidth,
          headerSection = document.getElementById('shopify-section-header');

      window.addEventListener('resize', function () {
        var newWidth = -1;

        fastdom.measure(function () {
          newWidth = window.innerWidth;
        });

        fastdom.mutate(function () {
          if (newWidth === windowWidth) {
            return;
          }

          windowWidth = newWidth;

          document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px');

          if (headerSection) {
            document.documentElement.style.setProperty('--header-height', headerSection.clientHeight + 'px');
          }
        });
      });
    })();

    (function () {
      function handleFirstTab(event) {
        if (event.keyCode === 9) {
          document.body.classList.add('is-tabbing');
          window.removeEventListener('keydown', handleFirstTab);
        }
      }

      window.addEventListener('keydown', handleFirstTab);
    })();

    /**
     * ----------------------------------------------------------------------------
     * ANIMATION
     *
     * Important: this has to be at the very end of the file
     * ----------------------------------------------------------------------------
     */

    __WEBPACK_IMPORTED_MODULE_0__components__["PageTransition"].getInstance();
  })();

  /***/
}]
/******/);
;/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (<none>)
 * Config saved to config.json and <none>
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
;;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
;Shopify.Cart = Shopify.Cart || {};
Shopify.Cart.Rerender = function (data) {
  var cartDot = $('.Header__CartDot'),
  cartQuantity = $('.Header__CartCount');
  if(data.item_count === 0){
    cartDot.removeClass("is-visible");
  }else{
    cartDot.addClass("is-visible");
  }
  cartQuantity.text(data.item_count);
  return $.get('/cart', {view : "ajax", timestamp :  Date.now()} , function(content){
    content = $(content);
    var cartNodeParent = content.find('.Cart').parent();
    if (data.item_count === 0) {
      $("#" + content.attr("id")).replaceWith(content);
    } else {
      $(".Cart").replaceWith(content.find(".Cart"));
      $('.PageHeader').html(content.find(".PageHeader").html())
    }
  })
}

Shopify.Cart.add = function(data, element){
  document.dispatchEvent(new CustomEvent('theme:loading:start'));
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    dataType: 'json',
    data: data,
    success: function(res){
      element[0].dispatchEvent(new CustomEvent('product:added', {
        bubbles: true,
        detail: {
          variant: data.id,
          quantity: 1
        }
      }));

      $.getJSON("/cart.js", function(result){
         calculateProgressbar(result);
         if (result.item_count > 0) {
           clearInterval(bigTimer);
         //timerCountDownClearCart();
         }
      });
    },
    complete: function(){
      document.dispatchEvent(new CustomEvent('theme:loading:end'));
    }
  });
}
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
			converter.write(value, key) :
			encodeURIComponent(String(value))
			.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
			.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
			.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
					decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));



$(function() {

var SkinID = function(){
	this.apiKey = "JLI8AUSACAJYYANCB04BLAALLK32LCSFVKH8X";
	this.customerID = window.theme.cid || null;
	this.bootstrap = function(){
		this.els = {};
		this.els.modal = $("#skinid-modal");
		this.els.canvas = this.els.modal.find("#skinid-canvas");
		this.attach();
		this.updateProfile();
	}
	this.initSkinID = function(e){
		e.preventDefault();
		var sessionId = getSession()
		var config = {
			canvas: this.els.canvas,
			apiKey: this.apiKey,
			platformsession:  sessionId,
			platform: 'Shopify',
			platformuid: this.customerID,
			onAddToCart: function(payload){
				this.els.modal.modal("hide");
				this.addToCart(payload.products, this.els.canvas);
				if(!this.customerID){
					delete payload.products;
					payload.sid = sessionId;
					Cookies.set("__skinid_callback", JSON.stringify(payload),{ expires: 30 });
				}
			}.bind(this)
		}
		this.els.canvas.html("");
		new Skininc(config);
		this.els.modal.modal("show");
	}
	this.reorder = function(e){
		e.preventDefault();
		var element = $(e.currentTarget);
		element.attr('disabled',true);
		var products = element.find('img').data('products');
		if($.trim(products) === ""){
			return;
		}
		if(typeof products === "number"){
			products = [products];
		}else{
			products = products.split("|")
		}
		this.addToCart(products, element);
	}
	this.attach = function(){
		$(document).on('click', 'a[href="/pages/skin-id"]',this.initSkinID.bind(this));
		$('.skinid-reorder').on('click',this.reorder.bind(this));
	}
	this.addToCart = function(products, element){
		Shopify.queue = [];
		if (!$.isArray(products) || !products.length){
			return;
		}
		for (var i = 0; i < products.length; i++) {
			product = products[i]
			Shopify.queue.push({
				variantId: product,
			});
		}
		document.dispatchEvent(new CustomEvent('theme:loading:start'));
		Shopify.moveAlong = function() {
			if (Shopify.queue.length) {
				var request = Shopify.queue.shift();
				var data = 'id='+ request.variantId + '&quantity=1'
				$.ajax({
					type: 'POST',
					url: '/cart/add.js',
					dataType: 'json',
					data: data,
					success: function(res){
						Shopify.moveAlong();
						element[0].dispatchEvent(new CustomEvent('product:added', {
							bubbles: true,
							detail: {
								variant: request.variantId,
								quantity: 1
							}
						}));
					},
					error: function(){
						if (Shopify.queue.length){
							Shopify.moveAlong()
						}else{
							document.dispatchEvent(new CustomEvent('theme:loading:end'));
							element.removeAttr('disabled');
						}
					}
				});
			}else{
				document.dispatchEvent(new CustomEvent('theme:loading:end'));
				element.removeAttr('disabled');
			}
		};
		Shopify.moveAlong();
	}
	this.updateProfile = function(){
		var session = Cookies.get("__skinid_callback");
		if(session && this.customerID){
			var sessionData = JSON.parse(session),
			payload = JSON.stringify({
				"data" : JSON.stringify({
					"apikey" : this.apiKey,
					"payload" : JSON.stringify({
						platformsession: encodeURI(sessionData.sid),
						platform: 'Shopify',
						platformuid: this.customerID,
						callback: true,
						phase: 'callback'
					})
				})
			})
			$.ajax({
				url : 'https://skininc.staging.overdose.digital/rest/V1/skininc',
				data : payload,
				method: "POST",
				dataType : 'json',
				headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
        },
				success : function(res){
					if($.isArray(res) && res.length && res[0].status == "success"){
						Cookies.remove("__skinid_callback")
					}
				}
			})
		}
	}

	function getSession(){
		var session = Cookies.get('skinid');
		if(!session){
			session = window.__st.reqid;
			Cookies.set('skinid', session, { expires: 30 });
		}
		return session
	}

	this.bootstrap();
}

new SkinID();

});
;$(function() {
  var isMobile = $("#isMobile").is(":visible");
  $('.carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite : false,
    nextArrow : '<button class="slick-next" type="button" aria-label="next"><svg viewBox="0 0 100 100"><path d="M 20,50 L 60,90 L 60,85 L 25,50  L 60,15 L 60,10 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>',
    prevArrow : '<button class="slick-prev" type="button" aria-label="previous"><svg viewBox="0 0 100 100"><path d="M 20,50 L 60,90 L 60,85 L 25,50  L 60,15 L 60,10 Z" class="arrow"></path></svg></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite : true,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('.nav-tabs').on("click", "a", function(e){
    e.preventDefault();
    var $this = $(this),
    tabs = $this.parents('.nav-tabs'),
    target = $($(this).data("target"));
    if(target.length){
      tabs.find('.active').removeClass('active');
      $this.addClass('active');
      target.siblings('.active').fadeOut('fast',function(){
        $(this).removeClass('active');
        target.addClass('active').fadeIn('slow');
      });
    }
  });
  $(document).on("click",".lightbox",function(e){
    e.preventDefault();
    var $this = $(this),
    modal = $($this.data('target')),
    imgSrc = $this.attr('href');
    if(modal.length || imgSrc){
      modal.find('.modal-content').addClass('loading');
      modal.modal('show');
      var _img = new Image();
      _img.src = imgSrc;
      _img.onload = function(){
        var img = $("<img />");
        img.attr("src", _img.src);
        modal.find('.modal-body').html(img);
        modal.find('.modal-content').removeClass('loading')
      }
    }
  })

  $(document).on("click", "button[data-task=\"add-to-cart\"]", function(e){
    e.preventDefault();
    var data = $(this).parents("form").serialize();
    Shopify.Cart.add(data, $(this));
  });

  $("#product-ritual-video").on('click','a[data-src]',function(e){
    e.preventDefault();
    $("#product-ritual-yplayer").attr('src', $(this).data('src'))
  })
  var emptyStarsInserted = false;
  document.addEventListener('animationstart', function(event) {
    if (event.animationName == 'nodeInserted') {
      if (!emptyStarsInserted){
        var wrappers = jQuery('div.yotpo.bottomLine > span.yotpo-display-wrapper:not(:has(div.star-clickable))');
        var emptyStars = jQuery('<div class="standalone-bottomline"><div class="yotpo-bottomline pull-left star-clickable"><span class="yotpo-stars"><span class="yotpo-icon yotpo-icon-empty-star pull-left"></span><span class="yotpo-icon yotpo-icon-empty-star pull-left"></span><span class="yotpo-icon yotpo-icon-empty-star pull-left"></span><span class="yotpo-icon yotpo-icon-empty-star pull-left"></span><span class="yotpo-icon yotpo-icon-empty-star pull-left"></span></span><div class="yotpo-clr"></div></div></div>');
        wrappers.append(emptyStars);
        emptyStarsInserted = true;
      }
    }
  }, false);



  var InstagramSection = {
    init : function (element) {
      this.element = element;
      this.instafeed = this.element.find('.feed');
      this._initFeed();
    },
    _initFeed : function() {
      var accessToken = this.instafeed.data('access-token');
      if (!accessToken) {
        return;
      } else {
        var instafeed = new Instafeed({
          get: 'user',
          userId: 'self',
          target: document.querySelector('.feed'),
          accessToken: accessToken,
          sortBy: 'most-recent',
          limit: this.instafeed.data('image-count'),
          resolution: 'standard_resolution',
          template: '<div class="col-md-3 col-6"><a href="{{link}}" rel="nofollow noopener" target="_blank">' + '<div class="Instafeed__Image Image--lazyLoad Image--zoomOut" data-expand="10" data-bg="{{image}}" aria-label="Open on Instagram"></div>' + '<div class="Instafeed__Overlay">' + '<span class="Instafeed__LikeCount">' + '<svg class="Icon Icon--heart" viewBox="0 0 17 15" role="presentation">' + '<path d="M15.0349331 1.40485867C14.1287273.49933787 12.9252477 0 11.6443673 0S9.16000731.49933787 8.25448651 1.40417371c-.01164437.01164436-.02328874.02328873-.03493311.03561806-.01164436-.01232933-.02260377-.02328873-.03424813-.0349331C7.2790995.49933787 6.07561989 0 4.79473949 0 3.51385908 0 2.31037947.49933787 1.40417371 1.40485867.49796794 2.31037947 0 3.51385908 0 4.79473949 0 6.07561989.4986529 7.2790995 1.40417371 8.1846203L8.2195534 15l6.8153797-6.8153797c.9055208-.9055208 1.4041737-2.10900041 1.4041737-3.38988081 0-1.28019545-.4986529-2.48436002-1.4041737-3.38988082z"></path>' + '</svg>' + '{{likes}} likes' + '</span>' + '<p class="Instafeed__Caption">{{caption}}</p>' + '<time class="Instafeed__Date Heading u-h6">{{model.date}}</time>' + '</div></a></div>',
          success: function success(data) {
            var dateTimeFormatter = new Intl.DateTimeFormat(window.theme.locale, { day: 'numeric', month: 'long', year: 'numeric' });
            data['data'].forEach(function (datum) {
              datum['date'] = dateTimeFormatter.format(new Date(parseInt(datum['created_time']) * 1000));
            });
          },
          after: function after() {
          }
        });
        instafeed.run();
      }
    }
  };
  var instagramFeed = $('.instagram-feed');
  if(instagramFeed.length){
    InstagramSection.init(instagramFeed);
  }
});
if(window.location.hash === "#reviews"){
  $(window).on('load', function(){
    var reviews = $("#shopify-section-yotpo");
    $('html,body').animate({scrollTop: reviews.offset().top - 150},'slow');
  })
}

// function - collapse remember
function cacheCollapse() {
  //variables
    var index;
    var getStorageIndex;
    var storageName = 'activeCollapseBlock';

    // get index from Local Storage and add last opened container will be active
    if(localStorage.getItem(storageName) !== null){
        var getStorageIndex =  localStorage.getItem(storageName);

        // set collapse active
        var collapse = $('.Collapsible--large').eq(getStorageIndex);

        // added styles
        collapse.find('.Collapsible__Button').attr('aria-expanded', 'true');
        collapse.find('.Collapsible__Inner').css({'overflow':'visible', 'height': 'auto'});
    }

    $('.template-cart .Collapsible--large').on('click', function(){
        // $(this).removeClass('active');

        var index = $(this).index();

        // set index to Local Storage open container if new index
        localStorage.setItem(storageName, index);

        return index;
    });
}


cacheCollapse();

$(document).ready(function() {

  var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
              // console.log(mutation.type);

              cacheCollapse();
          }
      });
  });
  
  var target = document.getElementById('shopify-section-cart-template');
  
  if(target) {
    var config = {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    };
//note this observe method
    observer.observe(target, config);
    console.log("registered");
  }

  //Custom Mega Menu function - Alex
  $(".Header__MainNav .MegaMenu__Item .sub_child_menu").on("click", function () {
    $(this).toggleClass("active").children(".sub_child_menu_items").toggle(500);
  });
  
  $(".SidebarMenu__Nav .Linklist .sub_child_menu").on("click", function () {
    $(this).toggleClass("active").children(".sub_child_menu_items").toggle(500);
  });

});




// Later, you can stop observing
// observer.disconnect();
// const btns = document.getElementsByClassName('Linklist__Item');
// const menu = document.getElementById('sidebar-menu');
// const overlay = document.getElementById('overlay');
// console.log(menu.getAttribute('aria-hidden'));
// for (let i =0; i < btns.length; i++) {
//   btns[i].addEventListener('click', function() {
//     menu.setAttribute('aria-hidden', 'true');
//     menu.removeAttribute('tabindex');
//     overlay.classList.remove('is-visible');
//     document.documentElement.classList.remove('no-scroll');
//   });
// }