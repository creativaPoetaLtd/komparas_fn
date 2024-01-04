import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface selectedMenu {
  selected: string;
  displaySetting:boolean;
}

const initialState: selectedMenu = {
  selected: "",
  displaySetting:false
};

export const PanelMenuSelectorSlice = createSlice({
  name: "selectedMenu",
  initialState,
  reducers: {
    handleSetSelected: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selected: action.payload,
      };
    },
    handleSettingMenus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        displaySetting: action.payload,
      };
    },
  },
});

export const { handleSetSelected,handleSettingMenus } = PanelMenuSelectorSlice.actions;
export default PanelMenuSelectorSlice.reducer;
