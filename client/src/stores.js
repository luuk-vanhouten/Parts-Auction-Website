import { derived, writable } from "svelte/store";

export const token = writable("");

export const jwtPayload = derived(token, (token) => {
  if (!token) {
    return null;
  }
  const payloadJSON = atob(token.split(".")[1]);
  const payload = JSON.parse(payloadJSON);
  console.log("jwtPayload", payload);
  return payload;
});

export const items = writable(null);
