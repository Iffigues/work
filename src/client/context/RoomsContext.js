import createDataContext from "./createDataContext";

const initialState = {
  rooms: null
};

const RoomsReducer = (state, payload) => {
  switch (payload.type) {
    case "updateRooms":
      return {  ...state, rooms: payload.rooms };
    default:
      return state;
  }
};

const updateRooms = dispatch => rooms =>
  dispatch({ type: "updateRooms", rooms: rooms._data });

export const { Provider, Context } = createDataContext(
  //reducer :
  RoomsReducer,

  //action functions :
  {
    updateRooms
  },

  //initialState :
  {
   ...initialState
  }
);