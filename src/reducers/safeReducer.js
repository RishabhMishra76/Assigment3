
import {safeAction} from './type'

const initialState = {
    safes:[],
    selectedId:''
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case safeAction.CREATE_SAFE:
        const newSafes = [...state.safes];
        newSafes.push(action.payload);
        return{
          ...state,
          safes:newSafes
        }
      
      case safeAction.CREATE_SECRET:
          const safes = [...state.safes];
          const selectedSafe = safes.filter(item=>item.Id === action.key)
          const selectedSafeId = safes.findIndex(safe => safe.Id===action.key);
          selectedSafe[0].secret.push(action.payload);
          safes.splice(selectedSafeId,1,selectedSafe[0]);
          return{
            ...state,
            safes:safes
          }

      case safeAction.DELETE_SECRET:
            const safes2 = [...state.safes];
            const selectedSafe2 = safes2.filter(item=>item.Id === action.key)
            const selectedSafeId2 = safes2.findIndex(safe => safe.Id===action.key);
            const selectedSecretId = selectedSafe2[0].secret.findIndex(secret => secret.Id===action.payload)
            safes2[selectedSafeId2].secret.splice(selectedSecretId,1);
            return{
              ...state,
              safes:safes2
            }

      case safeAction.DELETE_SAFE:
        const deleteSafes = [...state.safes];
        const deleteId = deleteSafes.findIndex(safe => safe.Id===action.payload);
        deleteSafes.splice(deleteId,1);
        return{
          ...state,
          safes:deleteSafes,
          selectedId:deleteSafes[0]?.Id
        }

        case safeAction.UPDATE_SAFE:
          const updateSafes = [...state.safes];
          const updateId = updateSafes.findIndex(safe => safe.Id===action.key);
          updateSafes.splice(updateId,1,action.payload);
          return{
            ...state,
            safes:updateSafes,
          }
      
      case safeAction.SELECT_ID:
          return{
            ...state,
            selectedId: action.payload
          }

      default:
        return state
    }
}