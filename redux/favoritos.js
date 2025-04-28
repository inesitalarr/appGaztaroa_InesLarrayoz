import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            const exist = state.favoritos.some((el) => el === action.payload);
            if (!exist) {
                return { ...state, favoritos: state.favoritos.concat(action.payload) };
            } else {
                return state;
            }
        default:
            return state;
    }
}; 