import * as GLOBALACTIONS from '../constants/action-types/global';

const initialState = {
  playerList: null,
  teamList: null,
};

function rc_global(state = initialState, action) {
  switch (action.type) {
    case GLOBALACTIONS.SET_PLAYER_LIST:
      return {...state, playerList: action.payload};
    case GLOBALACTIONS.SET_TEAM_LIST:
      return {...state, teamList: action.payload};
    default:
      return state;
  }
}

export default rc_global;
