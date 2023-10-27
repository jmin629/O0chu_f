import { CLICK } from "./types";

export function click(dataToSubmit) {
  return {
    type: CLICK,
    payload: dataToSubmit,
  };
}
