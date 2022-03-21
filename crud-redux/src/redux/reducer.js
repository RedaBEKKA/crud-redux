import * as  types from "./actionTypes";

const initialStates = {
    users:[],
    user:{},
    loading:true
}

const usersReducers = (state = initialStates,action)=>{
    switch(action.type){
        case types.GET_USERS:
            return {
                ...state,
                users:action.payload,
                loading:false
            }
        case types.DELETE_USER:
        case types.ADD_USER:
        case types.UPDATE_USER:
            return{
                ...state,
                loading:false
            }
        case types.GET_SINGLE_USER:
            return{
                ...state,
                user:action.payload,
                loading:false
            }
        default:
            return state;
    }
};

export default usersReducers