import domtoimage from "dom-to-image";
import saveAs from "file-saver";
import { User } from "../types/common";
import { addRow, getRow } from "./supabase";

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
export function copyImage() {
  let canvas = document.getElementById("wrap");
  domtoimage.toBlob(canvas).then(function (blob) {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  });
}

/**
 * Serializes user data and publishes it to a Supabase database
 */
export async function publishUser(user: User) {
  return await addRow("users", user);
}

/**
 * Adds user to Supabase and returns a link to their link
 * @returns {string} https://[subdomain].wrapped.run
 */
export async function getPublicLink(user: User) {
  // Add user to Supabase
  await publishUser(user);

  // Return
  return user.username
    ? `https://${user.username}.wrapped.run`
    : "https://wrapped.run";
}

/**
 * Generate public link and copy to clipboard
 */
export async function copyPublicLink(user: User) {
  let publicLink = await getPublicLink(user);
  navigator.clipboard.writeText(publicLink);
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
