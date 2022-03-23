

import {safeAction} from './type'

export const createSafeAction = (data)=>{
   return {
      type: safeAction.CREATE_SAFE,
      payload: data
   }
}

export const createSecretAction = (Id, data)=>{
    return {
       type: safeAction.CREATE_SECRET,
       payload: data,
       key: Id
    }
 }

export const deleteSafeAction = (data)=>{
    return{
        type: safeAction.DELETE_SAFE,
        payload: data
    }
}

export const deleteSecretAction = (Id, data)=>{
    return{
        type: safeAction.DELETE_SECRET,
        payload: data,
        key: Id
    }
}

export const updateSafeAction = (Id, data)=>{
    return{
        type: safeAction.UPDATE_SAFE,
        payload: data,
        key: Id
    }
}

export const selectIDAction = (Id)=>{
    return{
        type: safeAction.SELECT_ID,
        payload: Id
    }
}