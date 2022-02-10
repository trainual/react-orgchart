import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import { selectNodeService } from "./service";
import JSONDigger from "json-digger";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ChartNode from "./ChartNode";
import "./ChartContainer.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const propTypes = {
  datasource: PropTypes.object.isRequired,
  pan: PropTypes.bool,
  zoom: PropTypes.bool,
  zoomAction: PropTypes.oneOf(['decrement', 'increment', 'reset']),
  containerClass: PropTypes.string,
  chartClass: PropTypes.string,
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  onClickNode: PropTypes.func,
  onClickChart: PropTypes.func
};

const defaultProps = {
  pan: false,
  zoom: false,
  containerClass: "",
  chartClass: "",
  draggable: false,
  collapsible: true,
  multipleSelect: false
};

const ChartContainer = forwardRef(
  (
    {
      datasource,
      pan,
      zoom,
      zoomAction,
      containerClass,
      chartClass,
      NodeTemplate,
      draggable,
      collapsible,
      multipleSelect,
      onClickNode,
      onClickChart
    },
    ref
  ) => {
    const container = useRef();
    const chart = useRef();
    const downloadButton = useRef();
    const transformComponentRef = useRef(null);

    const [cursor, setCursor] = useState("default");
    const [exporting, setExporting] = useState(false);
    const [dataURL, setDataURL] = useState("");
    const [download, setDownload] = useState("");

    useEffect(() => {
      if (pan) {
        setCursor("move");
      }
    }, [pan]);

    const updateScale = (zoomAction) => {
      if (!transformComponentRef.current) {
        return;
      }

      const { zoomIn, zoomOut, resetTransform } = transformComponentRef.current;

      // eslint-disable-next-line default-case
      switch (zoomAction) {
        case 'decrement':
          zoomOut();
          break;
        case 'increment':
          zoomIn();
          break;
        case 'reset':
          resetTransform();
          break;
      }
    }

    if (zoom && zoomAction) {
      updateScale(zoomAction);
    }

    const attachRel = (data, flags) => {
      data.relationship =
        flags + (data.children && data.children.length > 0 ? 1 : 0);
      if (data.children) {
        data.children.forEach(function(item) {
          attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
        });
      }
      return data;
    };

    const [ds, setDS] = useState(datasource);
    useEffect(() => {
      setDS(datasource);
    }, [datasource]);

    const dsDigger = new JSONDigger(datasource, "id", "children");

    const clickChartHandler = event => {
      if (!event.target.closest(".oc-node")) {
        if (onClickChart) {
          onClickChart();
        }
        selectNodeService.clearSelectedNodeInfo();
      }
    };

    const exportPDF = (canvas, exportFilename) => {
      const canvasWidth = Math.floor(canvas.width);
      const canvasHeight = Math.floor(canvas.height);
      const doc =
        canvasWidth > canvasHeight
          ? new jsPDF({
              orientation: "landscape",
              unit: "px",
              format: [canvasWidth, canvasHeight]
            })
          : new jsPDF({
              orientation: "portrait",
              unit: "px",
              format: [canvasHeight, canvasWidth]
            });
      doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
      doc.save(exportFilename + ".pdf");
    };

    const exportPNG = (canvas, exportFilename) => {
      const isWebkit = "WebkitAppearance" in document.documentElement.style;
      const isFf = !!window.sidebar;
      const isEdge =
        navigator.appName === "Microsoft Internet Explorer" ||
        (navigator.appName === "Netscape" &&
          navigator.appVersion.indexOf("Edge") > -1);

      if ((!isWebkit && !isFf) || isEdge) {
        window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
      } else {
        setDataURL(canvas.toDataURL());
        setDownload(exportFilename + ".png");
        downloadButton.current.click();
      }
    };

    const changeHierarchy = async (draggedItemData, dropTargetId) => {
      await dsDigger.removeNode(draggedItemData.id);
      await dsDigger.addChildren(dropTargetId, draggedItemData);
      setDS({ ...dsDigger.ds });
    };

    useImperativeHandle(ref, () => ({
      exportTo: (exportFilename, exportFileextension) => {
        exportFilename = exportFilename || "OrgChart";
        exportFileextension = exportFileextension || "png";
        setExporting(true);
        const originalScrollLeft = container.current.scrollLeft;
        container.current.scrollLeft = 0;
        const originalScrollTop = container.current.scrollTop;
        container.current.scrollTop = 0;
        html2canvas(chart.current, {
          width: chart.current.clientWidth,
          height: chart.current.clientHeight,
          onclone: function(clonedDoc) {
            clonedDoc.querySelector(".orgchart").style.background = "none";
            clonedDoc.querySelector(".orgchart").style.transform = "";
          }
        }).then(
          canvas => {
            if (exportFileextension.toLowerCase() === "pdf") {
              exportPDF(canvas, exportFilename);
            } else {
              exportPNG(canvas, exportFilename);
            }
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          },
          () => {
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          }
        );
      },
      expandAllNodes: () => {
        chart.current
          .querySelectorAll(
            ".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed"
          )
          .forEach(el => {
            el.classList.remove(
              "hidden",
              "isSiblingsCollapsed",
              "isAncestorsCollapsed"
            );
          });
      }
    }));

    return (
      <TransformWrapper
        initialScale={1}
        ref={transformComponentRef}
        disabled={!zoom && !pan}
        minScale={0.25}
        maxScale={8}
        limitToBounds={false}
        doubleClick={{
          disabled: !zoom
        }}
        panning={{
          disabled: !pan
        }}
        pinch={{
          disabled: !zoom
        }}
        wheel={{
          step: 0.05,
          disabled: !zoom
        }}
      >
        <TransformComponent
          wrapperClass="transform-wrapper"
          contentClass="transform-content"
          wrapperStyle={{
            minWidth: "100%",
          }}
          contentStyle={{
            minHeight: "100%",
            minWidth: "100%",
            display: "block",
          }}
        >
          <div ref={container} className={"orgchart-container " + containerClass}>
            <div
              ref={chart}
              className={"orgchart " + chartClass}
              style={{ cursor: cursor }}
              onClick={clickChartHandler}
            >
              <ul>
                <ChartNode
                  datasource={attachRel(ds, "00")}
                  NodeTemplate={NodeTemplate}
                  draggable={draggable}
                  collapsible={collapsible}
                  multipleSelect={multipleSelect}
                  changeHierarchy={changeHierarchy}
                  onClickNode={onClickNode}
                />
              </ul>
            </div>
            <a
              className="oc-download-btn hidden"
              ref={downloadButton}
              href={dataURL}
              download={download}
            >
              &nbsp;
            </a>
            <div className={`oc-mask ${exporting ? "" : "hidden"}`}>
              <i className="oci oci-spinner spinner"/>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    );
  }
);

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;

export default ChartContainer;
