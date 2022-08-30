import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { value: { menuModal: false, alertModal: "" } },
  reducers: {
    openAndClose: (state, action) => {
      state.value = action.payload;
    },
  },
});
// 사용할 reducer 이름을 정하고 createSluce로 지정
// name => 리듀서의 이름
// initialState => 데이터의 초기값
// reducers => 상태가 변하면 어떻게 실행되는지 정한다.

export const { openAndClose } = modalSlice.actions;
export default modalSlice.reducer;
