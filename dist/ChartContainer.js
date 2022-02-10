"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _service = require("./service");

var _jsonDigger = _interopRequireDefault(require("json-digger"));

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _jspdf = _interopRequireDefault(require("jspdf"));

var _ChartNode = _interopRequireDefault(require("./ChartNode"));

require("./ChartContainer.css");

var _reactZoomPanPinch = require("react-zoom-pan-pinch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var propTypes = {
  datasource: _propTypes.default.object.isRequired,
  pan: _propTypes.default.bool,
  zoom: _propTypes.default.bool,
  zoomAction: _propTypes.default.oneOf(['decrement', 'increment', 'reset']),
  containerClass: _propTypes.default.string,
  chartClass: _propTypes.default.string,
  NodeTemplate: _propTypes.default.elementType,
  draggable: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  multipleSelect: _propTypes.default.bool,
  onClickNode: _propTypes.default.func,
  onClickChart: _propTypes.default.func
};
var defaultProps = {
  pan: false,
  zoom: false,
  containerClass: "",
  chartClass: "",
  draggable: false,
  collapsible: true,
  multipleSelect: false
};
var ChartContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var datasource = _ref.datasource,
      pan = _ref.pan,
      zoom = _ref.zoom,
      zoomAction = _ref.zoomAction,
      containerClass = _ref.containerClass,
      chartClass = _ref.chartClass,
      NodeTemplate = _ref.NodeTemplate,
      draggable = _ref.draggable,
      collapsible = _ref.collapsible,
      multipleSelect = _ref.multipleSelect,
      onClickNode = _ref.onClickNode,
      onClickChart = _ref.onClickChart;
  var container = (0, _react.useRef)();
  var chart = (0, _react.useRef)();
  var downloadButton = (0, _react.useRef)();
  var transformComponentRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)("default"),
      _useState2 = _slicedToArray(_useState, 2),
      cursor = _useState2[0],
      setCursor = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      exporting = _useState4[0],
      setExporting = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      dataURL = _useState6[0],
      setDataURL = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      download = _useState8[0],
      setDownload = _useState8[1];

  (0, _react.useEffect)(function () {
    if (pan) {
      setCursor("move");
    }
  }, [pan]);

  var updateScale = function updateScale(zoomAction) {
    if (!transformComponentRef.current) {
      return;
    }

    var _transformComponentRe = transformComponentRef.current,
        zoomIn = _transformComponentRe.zoomIn,
        zoomOut = _transformComponentRe.zoomOut,
        resetTransform = _transformComponentRe.resetTransform;

    if (zoomAction === "decrement") {
      zoomOut();
    }

    if (zoomAction === "increment") {
      zoomIn();
    }

    if (zoomAction === "reset") {
      resetTransform();
    }
  };

  if (zoom && zoomAction) {
    updateScale(zoomAction);
  }

  var attachRel = function attachRel(data, flags) {
    data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);

    if (data.children) {
      data.children.forEach(function (item) {
        attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
      });
    }

    return data;
  };

  var _useState9 = (0, _react.useState)(datasource),
      _useState10 = _slicedToArray(_useState9, 2),
      ds = _useState10[0],
      setDS = _useState10[1];

  (0, _react.useEffect)(function () {
    setDS(datasource);
  }, [datasource]);
  var dsDigger = new _jsonDigger.default(datasource, "id", "children");

  var clickChartHandler = function clickChartHandler(event) {
    if (!event.target.closest(".oc-node")) {
      if (onClickChart) {
        onClickChart();
      }

      _service.selectNodeService.clearSelectedNodeInfo();
    }
  };

  var exportPDF = function exportPDF(canvas, exportFilename) {
    var canvasWidth = Math.floor(canvas.width);
    var canvasHeight = Math.floor(canvas.height);
    var doc = canvasWidth > canvasHeight ? new _jspdf.default({
      orientation: "landscape",
      unit: "px",
      format: [canvasWidth, canvasHeight]
    }) : new _jspdf.default({
      orientation: "portrait",
      unit: "px",
      format: [canvasHeight, canvasWidth]
    });
    doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
    doc.save(exportFilename + ".pdf");
  };

  var exportPNG = function exportPNG(canvas, exportFilename) {
    var isWebkit = ("WebkitAppearance" in document.documentElement.style);
    var isFf = !!window.sidebar;
    var isEdge = navigator.appName === "Microsoft Internet Explorer" || navigator.appName === "Netscape" && navigator.appVersion.indexOf("Edge") > -1;

    if (!isWebkit && !isFf || isEdge) {
      window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
    } else {
      setDataURL(canvas.toDataURL());
      setDownload(exportFilename + ".png");
      downloadButton.current.click();
    }
  };

  var changeHierarchy = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(draggedItemData, dropTargetId) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return dsDigger.removeNode(draggedItemData.id);

            case 2:
              _context.next = 4;
              return dsDigger.addChildren(dropTargetId, draggedItemData);

            case 4:
              setDS(_objectSpread({}, dsDigger.ds));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function changeHierarchy(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      exportTo: function exportTo(exportFilename, exportFileextension) {
        exportFilename = exportFilename || "OrgChart";
        exportFileextension = exportFileextension || "png";
        setExporting(true);
        var originalScrollLeft = container.current.scrollLeft;
        container.current.scrollLeft = 0;
        var originalScrollTop = container.current.scrollTop;
        container.current.scrollTop = 0;
        (0, _html2canvas.default)(chart.current, {
          width: chart.current.clientWidth,
          height: chart.current.clientHeight,
          onclone: function onclone(clonedDoc) {
            clonedDoc.querySelector(".orgchart").style.background = "none";
            clonedDoc.querySelector(".orgchart").style.transform = "";
          }
        }).then(function (canvas) {
          if (exportFileextension.toLowerCase() === "pdf") {
            exportPDF(canvas, exportFilename);
          } else {
            exportPNG(canvas, exportFilename);
          }

          setExporting(false);
          container.current.scrollLeft = originalScrollLeft;
          container.current.scrollTop = originalScrollTop;
        }, function () {
          setExporting(false);
          container.current.scrollLeft = originalScrollLeft;
          container.current.scrollTop = originalScrollTop;
        });
      },
      expandAllNodes: function expandAllNodes() {
        chart.current.querySelectorAll(".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed").forEach(function (el) {
          el.classList.remove("hidden", "isSiblingsCollapsed", "isAncestorsCollapsed");
        });
      }
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactZoomPanPinch.TransformWrapper, {
    initialScale: 1,
    ref: transformComponentRef,
    disabled: !zoom && !pan,
    minScale: 0.25,
    maxScale: 8,
    limitToBounds: false,
    wheel: {
      step: 0.05,
      disabled: false
    },
    panning: {
      disabled: !pan
    }
  }, /*#__PURE__*/_react.default.createElement(_reactZoomPanPinch.TransformComponent, {
    wrapperClass: "transform-wrapper",
    contentClass: "transform-content",
    wrapperStyle: {
      minWidth: "100%"
    },
    contentStyle: {
      minHeight: "100%",
      minWidth: "100%",
      display: "block"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: container,
    className: "orgchart-container " + containerClass
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: chart,
    className: "orgchart " + chartClass,
    style: {
      cursor: cursor
    },
    onClick: clickChartHandler
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement(_ChartNode.default, {
    datasource: attachRel(ds, "00"),
    NodeTemplate: NodeTemplate,
    draggable: draggable,
    collapsible: collapsible,
    multipleSelect: multipleSelect,
    changeHierarchy: changeHierarchy,
    onClickNode: onClickNode
  }))), /*#__PURE__*/_react.default.createElement("a", {
    className: "oc-download-btn hidden",
    ref: downloadButton,
    href: dataURL,
    download: download
  }, "\xA0"), /*#__PURE__*/_react.default.createElement("div", {
    className: "oc-mask ".concat(exporting ? "" : "hidden")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "oci oci-spinner spinner"
  })))));
});
ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;
var _default = ChartContainer;
exports.default = _default;