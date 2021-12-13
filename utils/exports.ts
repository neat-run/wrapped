import domtoimage from "dom-to-image";
import saveAs from "file-saver";
import { User } from "../types/common";
import {
  addRow,
  getImageURL,
  getRow,
  uploadImage,
  updateValue,
} from "./supabase";

/**
 * Grab the banner element and download it as a PNG
 */
export function download() {
  getImage(2).then((blob) => {
    saveAs(blob, "wrapped.png");
  });
}

/**
 * Grab the banner element and download it as a SVG
 * TODO: ensure the image is properly formatted
 */
export function downloadSVG() {
  let canvas = document.getElementById("wrap");
  domtoimage.toSvg(canvas).then((blob) => {
    saveAs(blob, "wrapped.svg");
  });
}

/**
 * Copies a PNG of the banner to clipboard
 */
export function copyImage() {
  getImage().then((blob) => {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  });
}

/**
 * Generates PNG from the canvas
 * @returns blob of PNG image
 */
export async function getImage(scale = 1) {
  let element = document.getElementById("wrap");

  // Scale image up for crispness
  const formatting = {
    height: element.offsetHeight * scale,
    width: element.offsetWidth * scale,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: element.offsetWidth + "px",
      height: element.offsetHeight + "px",
    },
  };

  return await domtoimage.toBlob(element, formatting);
}

/**
 * Serializes user data and publishes it to a Supabase database
 */
export async function publishUser(user: User) {
  // Upload a screenshot of the stats to Supabase storage
  let screenshot = await getImage(2);
  await uploadImage(screenshot, user?.username);
  let linkPreviewURL = await getImageURL(user?.username);

  return await addRow("users", { ...user, linkPreviewURL });
}

/**
 * Adds user to Supabase and returns a link to their link
 * @returns {string} https://[subdomain].wrapped.run
 */
export function getPublicLink(user: User) {
  return user.username
    ? `https://${user.username}.wrapped.run`
    : "https://wrapped.run";
}

/**
 * Generate user's public link and copy to clipboard
 */
export async function copyPublicLink(user: User) {
  // Copy to clipboard
  if ("navigator" in window) {
    let publicLink = getPublicLink(user);
    navigator.clipboard.writeText(publicLink);
  }

  // Add user to Supabase. This takes 1-2s - we assume the user won't share the link within that time.
  await publishUser(user);
}

/**
 * Get published user details from Supabase by username
 * @param {string} username GitHub username to search
 * @returns {User} user details
 */
export async function getByUsername(username: string): Promise<User> {
  let user = await getRow("users", "username", username);

  if (!user) return null;

  return user;
}

/**
 * Recaptures screenshot and uploads to Supabase
 */
export async function retakeScreenshot(user: User) {
  // Upload a screenshot of the stats to Supabase storage
  let screenshot = await getImage(2);
  await uploadImage(screenshot, user?.username);
  let linkPreviewURL = await getImageURL(user?.username);

  return await updateValue(
    "users",
    "linkPreviewURL",
    linkPreviewURL,
    user.username
  );
}
/**
 * Undo adds a previously hidden stat back in view
 * @param  {User} user user props
 * @param  {any[]} hidden array with hidden stats
 * @param  {any} setHidden used to update hidden array
 */
export function undo(user: User, hidden: any[], setHidden: any) {
  // Get the latest entry in hidden array
  const stat: keyof User = hidden.slice(-1);

  // Remove latest entry from array and update hidden array
  let updated = hidden.filter((value) => value != stat);
  setHidden(updated);

  // Update the value in Supabase database
  if (stat == "commits") {
    ["commits", "pulls", "contributions", "repos", "reviews"].map(
      (column: keyof User) =>
        updateValue("users", column, user[column], user.username)
    );
  } else updateValue("users", stat, user[stat], user.username);
}
