// import produce from 'immer';
// export const initialState = {
//   start: 0,
//   end: 10,
//   current: 1,
// };

// export const updateCurrentPage = page => dispatch => {
//   dispatch({ type: UPDATE_CURRENT_PAGE, data: page });
// };

// export const updateStartEndPaGE = (start, end) => dispatch => {
//   dispatch({ type: UPDATE_START_END_PAGE, data: { start, end } });
// };

// export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
// export const UPDATE_START_END_PAGE = 'UPDATE_START_END_PAGE';

// const reducer = (state = initialState, action) => {
//   return produce(state, draft => {
//     switch (action.type) {
//       case UPDATE_CURRENT_PAGE:
//         draft.myProfileOptionVisible = false;
//         break;
//       case UPDATE_START_END_PAGE:
//         draft.postOptionVisible = false;
//         break;
//       default:
//         break;
//     }
//   });
// };

// export default reducer;
