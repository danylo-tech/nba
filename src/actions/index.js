import Axios from 'axios';
import moment from 'moment';

// import * as GLOBALACTIONS from '../constants/action-types/global';
// import * as MATCHACTIONS from '../constants/action-types/match';

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
