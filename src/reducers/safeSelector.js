

import { createSelector } from "reselect";



const selectSafe = (state) => {
  return state.safes;
};

export const selectSafeData = createSelector([selectSafe], (safe) => {
  return safe;
});