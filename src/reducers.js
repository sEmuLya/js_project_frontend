import { combineReducers } from 'redux';

import { MATCH_ADD, MATCH_ADD_ALL, MATCH_DELETE, MATCH_UPDATE_STATE } from './actions';


function match(state = [], action) {
    switch (action.type) {
        case MATCH_ADD:
            return [
                ...state,
                {
                    _id: action._id,
                    sportType: action.sportType,
                    description: action.description,
                    matchDateTime: action.matchDateTime,
                    location: action.location,
                    nameTeam1: action.nameTeam1,
                    nameTeam2: action.nameTeam2,
                    scoreTeam1: action.scoreTeam1,
                    scoreTeam2: action.scoreTeam2,
                    is_favorite: false
                }
            ]
        case MATCH_ADD_ALL:
            return [...action.match_list]
        case MATCH_DELETE:
            return state.filter(function (match) {
                return match._id !== action._id;
            })
        case MATCH_UPDATE_STATE:
            return state.map(function (match) {
                if (match._id === action._id) {
                    return { ...match, is_favorite: !match.is_favorite }
                }
                return match
            })
        default:
            return state
    }
}

export default combineReducers({
    matches: match
})
