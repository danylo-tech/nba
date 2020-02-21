import Axios from 'axios';
import moment from 'moment';

import * as GLOBALACTIONS from '../constants/action-types/global';
// import * as MATCHACTIONS from '../constants/action-types/match';

const d = new Date();
const currentMonth = d.getMonth() + 1;
let season;
if (currentMonth >= 10) {
  season =
    d.getFullYear().toString() +
    '-' +
    (d.getFullYear() + 1).toString().substring(2, 4);
} else {
  season =
    d.getFullYear().toString() -
    1 +
    '-' +
    d
      .getFullYear()
      .toString()
      .substring(2, 4);
}

export function handleGetMatches(matchDate, cb) {
  return (dispatch, getStore) => {
    const formDate = moment(matchDate).format('YYYYMMDD');
    // const formDate = '20200212';
    Axios.get(
      `http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${formDate}/games.json`,
    )
      .then(res => {
        cb(res.data.sports_content.games.game || []);
      })
      .catch(error => {
        cb([]);
        // console.error(error);
      });
  };
}

export function handleGetMatchDetail(matchId, matchDate, cb) {
  return (dispatch, getStore) => {
    Axios.get(
      `http://data.nba.com/data/10s/json/cms/noseason/game/${matchDate}/${matchId}/boxscore.json`,
    )
      .then(res => {
        cb(res.data.sports_content.game);
      })
      .catch(error => {
        cb(null);
      });
  };
}

export function handleGetLeagueStandings(matchDate, cb) {
  return (dispatch, getStore) => {
    const matchYear = matchDate.slice(0, 4);
    const leagueYear = parseInt(matchYear, 10) - 1;

    Axios.get(
      `http://data.nba.com/data/json/cms/${leagueYear}/league/standings.json`,
    )
      .then(res => {
        cb(res.data.sports_content.standings.team);
      })
      .catch(error => {
        cb([]);
      });
  };
}

export function handleGetPlayerList(cb) {
  return (dispatch, getStore) => {
    const Store = getStore();
    // console.log(Store);
    if (Store.rcGlobal.playerList) {
      return;
    }
    Axios.get(`http://data.nba.net/prod/v1/${season.slice(0, 4)}/players.json`)
      .then(res => {
        dispatch({
          type: GLOBALACTIONS.SET_PLAYER_LIST,
          payload: res.data.league.standard,
        });
      })
      .catch(console.error);
  };
}

export function handleGetTeamList(cb) {
  return (dispatch, getStore) => {
    const Store = getStore();
    // console.log(Store);
    if (Store.rcGlobal.teamList) {
      return;
    }

    Axios.get(`http://data.nba.net/prod/v2/${season.slice(0, 4)}/teams.json`)
      .then(res => {
        dispatch({
          type: GLOBALACTIONS.SET_TEAM_LIST,
          payload: res.data.league.standard,
        });
      })
      .catch(console.error);
  };
}

export function handleGetPlayerProfile(personId, cb) {
  return (dispatch, getStore) => {
    Axios.get(
      `http://data.nba.net/prod/v1/2019/players/${personId}_profile.json`,
    )
      .then(res => {
        cb(res.data.league.standard);
      })
      .catch(console.error);
  };
}

export function handleGetPlayerLog(personId, year, cb) {
  return (dispatch, getStore) => {
    Axios.get(
      `http://data.nba.net/prod/v1/${year}/players/${personId}_gamelog.json`,
    )
      .then(res => {
        cb(res.data.league.standard);
      })
      .catch(console.error);
  };
}
