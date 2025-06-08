export const MATCH_ADD = 'MATCH_ADD';
export const MATCH_ADD_ALL = 'MATCH_ADD_ALL';
export const MATCH_DELETE = 'MATCH_DELETE';
export const MATCH_UPDATE_STATE = 'MATCH_UPDATE_STATE';


export function matchAdd(_id, sportType, matchDateTime, location,
    description, is_favorite, nameTeam1, nameTeam2,
    scoreTeam1, scoreTeam2) {
    return {
        type: MATCH_ADD, _id, sportType, matchDateTime,
        location, description, is_favorite, nameTeam1, nameTeam2,
        scoreTeam1, scoreTeam2
    };
}

export function matchAddAll(match_list) {
    return { type: MATCH_ADD_ALL, match_list };
}

export function matchDelete(_id) {
    return { type: MATCH_DELETE, _id };
}

export function matchUpdateState(_id) {
    return { type: MATCH_UPDATE_STATE, _id };
}
