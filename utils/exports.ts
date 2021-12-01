import domtoimage from "dom-to-image";
import saveAs from "file-saver";

/**
 * Grab the banner element and download it as a PNG
 */
export function download() {
  let canvas = document.getElementById("wrap");
  domtoimage.toBlob(canvas).then(function (blob) {
    saveAs(blob, "wrapped.png");
  });
}

/**
 * Copies a PNG of the banner to clipboard
 */
export function copy() {
  let canvas = document.getElementById("wrap");
  domtoimage.toBlob(canvas).then(function (blob) {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  });
}
