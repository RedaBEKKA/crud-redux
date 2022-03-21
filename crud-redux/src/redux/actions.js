import * as  types from "./actionTypes";
import Axios from "axios"

const getUsers = (users) =>({
    type:types.GET_USERS,
    payload:users
})

const suppUser = () =>({
    type:types.DELETE_USER
})

const userAdded = () =>({
    type:types.ADD_USER
})

const getSingleUser = (data) =>({
    type:types.GET_SINGLE_USER,
    payload:data
})

const editData = () =>({
    type:types.UPDATE_USER,
    
})

export const loadUsers=()=>{
    return function (dispatch){
        Axios.get(`${process.env.REACT_APP_API}`)
             .then(resp=>{
                 console.log("resp",resp);
                 dispatch(getUsers(resp.data))
             })
             .catch((error)=>console.log(error));
    }
}

export const deleteUser=(id)=>{
    return function (dispatch){
        Axios.delete(`${process.env.REACT_APP_API}/${id}`)
             .then(resp=>{
                 console.log("resp",resp);
                 dispatch(suppUser())
                 dispatch(loadUsers())
             })
             .catch((error)=>console.log(error));
    }
}

export const addUser=(user)=>{
    return function (dispatch){
        Axios.post(`${process.env.REACT_APP_API}`,user)
             .then(resp=>{
                 console.log("resp",resp);
                 dispatch(userAdded())
                 dispatch(loadUsers())
            })
             .catch((error)=>console.log(error));
    }
}

export const getUser=(id)=>{
    return function (dispatch){
        Axios.get(`${process.env.REACT_APP_API}/${id}`)
             .then(resp=>{
                 console.log("resp",resp);
                 dispatch(getSingleUser(resp.data));
               
             })
             .catch((error)=>console.log(error));
    }
}

export const updateUser=(user,id)=>{
    return function(dispatch){
        Axios.put(`${process.env.REACT_APP_API}/${id}`,user)
            .then(res=>{
                dispatch(editData())
            })
            .catch(e=>console.error(e))
    }
}