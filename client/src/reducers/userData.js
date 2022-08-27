const initialState = {user:null,
   errorHandler:null,
   succes:null
  ,
};
  
  const userReducer = (users = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
    /*  case CREATE_TUTORIAL:
        return [...tutorials, payload];
  */
      case "getUser":
        return {user:payload,succes:true};
  
      case "Logout":
        return {user:payload};
      case "getUserError":
        return {errorHandler:payload};
  /*
      case DELETE_TUTORIAL:
        return tutorials.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_TUTORIALS:
        return [];
  */
      default:
        return users;
    }
  };
  
  export default userReducer;