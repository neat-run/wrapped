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
