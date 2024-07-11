import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
};

const slicer = createSlice({
  name: "main",
  initialState,
  reducers: {
    setFullScreenLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setFullScreenLoading } = slicer.actions;

export default slicer.reducer;
