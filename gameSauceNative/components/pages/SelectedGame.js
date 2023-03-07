import React, { useEffect, useState } from "react";

export default function SelectedGame() {
  const [time, setTime] = useState();
  const [period, setPeriod] = useState();

  const [homeName, setHomeName] = useState();
  const [homeWins, setHomeWins] = useState();
  const [homeLosses, setHomeLosses] = useState();
  const [homeTies, setHomeTies] = useState();
  const [homeScore, setHomeScore] = useState();
  const [homeSOG, setHomeSOG] = useState();
  const [homeFO, setHomeFO] = useState();
  const [homeHits, setHomeHits] = useState();
  const [homePIM, setHomePIM] = useState();

  const [awayName, setAwayName] = useState();
  const [awayWins, setAwayWins] = useState();
  const [awayLosses, setAwayLosses] = useState();
  const [awayTies, setAwayTies] = useState();
  const [awayScore, setAwayScore] = useState();
  const [awaySOG, setAwaySOG] = useState();
  const [awayFO, setAwayFO] = useState();
  const [awayHits, setAwayHits] = useState();
  const [awayPIM, setAwayPIM] = useState();

  useEffect(() => {
    const gameID = window.location.pathname;
    const box = `https://statsapi.web.nhl.com/api/v1${gameID}/feed/live`;
    const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
    async function getData() {
      let currentTeamRecords;
      let teamRecords = [];

      const todaysGames = await fetch(url, {
        method: "GET",
      });

      const currentData = await todaysGames.json();

      const allGames = currentData.dates[0].games;

      for (let g of allGames) {
        teamRecords.push({
          id: g.gamePk,
          homeWins: g.teams.home.leagueRecord.wins,
          homeLosses: g.teams.home.leagueRecord.losses,
          homeTies: g.teams.home.leagueRecord.ot,
          awayWins: g.teams.away.leagueRecord.wins,
          awayLosses: g.teams.away.leagueRecord.losses,
          awayTies: g.teams.away.leagueRecord.ot,
        });
      }

      const gameFetch = await fetch(box, {
        method: "GET",
      });

      const liveData = await gameFetch.json();

      for (let r of teamRecords) {
        if (liveData.gamePk == r.id) {
          currentTeamRecords = {
            homeWins: r.homeWins,
            homeLosses: r.homeLosses,
            homeTies: r.homeTies,
            awayWins: r.awayWins,
            awayLosses: r.awayLosses,
            awayTies: r.awayTies,
          };
        }
      }

      const currentPeriod = liveData.liveData.linescore.currentPeriodOrdinal;
      setPeriod(currentPeriod);

      const timeLeft = liveData.liveData.linescore.currentPeriodTimeRemaining;
      setTime(timeLeft);

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Home Team Data Below~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      const homeTeamName = liveData.liveData.boxscore.teams.home.team.name;
      setHomeName(homeTeamName);

      const homeTeamWins = currentTeamRecords.homeWins;
      setHomeWins(homeTeamWins);
      console.log(homeTeamWins);

      const homeTeamLosses = currentTeamRecords.homeLosses;
      setHomeLosses(homeTeamLosses);

      const homeTeamTies = currentTeamRecords.homeTies;
      setHomeTies(homeTeamTies);

      const homeTeamScore =
        liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals;
      setHomeScore(homeTeamScore);

      const homeTeamSOG =
        liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.shots;
      setHomeSOG(homeTeamSOG);

      const homeTeamFO =
        liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats
          .faceOffWinPercentage;
      setHomeFO(homeTeamFO);

      const homeTeamHits =
        liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.hits;
      setHomeHits(homeTeamHits);

      const homeTeamPIM =
        liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.pim;
      setHomePIM(homeTeamPIM);

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Away Team Data Below ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      const awayTeamName = liveData.liveData.boxscore.teams.away.team.name;
      setAwayName(awayTeamName);

      const awayTeamWins = currentTeamRecords.awayWins;
      setAwayWins(awayTeamWins);

      const awayTeamLosses = currentTeamRecords.awayLosses;
      setAwayLosses(awayTeamLosses);

      const awayTeamTies = currentTeamRecords.awayTies;
      setAwayTies(awayTeamTies);

      const awayTeamScore =
        liveData.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals;
      setAwayScore(awayTeamScore);

      const awayTeamSOG =
        liveData.liveData.boxscore.teams.away.teamStats.teamSkaterStats.shots;
      setAwaySOG(awayTeamSOG);

      const awayTeamFO =
        liveData.liveData.boxscore.teams.away.teamStats.teamSkaterStats
          .faceOffWinPercentage;
      setAwayFO(awayTeamFO);

      const awayTeamHits =
        liveData.liveData.boxscore.teams.away.teamStats.teamSkaterStats.hits;
      setAwayHits(awayTeamHits);

      const awayTeamPIM =
        liveData.liveData.boxscore.teams.away.teamStats.teamSkaterStats.pim;
      setAwayPIM(awayTeamPIM);
    }
    getData();
  }, []);

  return (
    <div className="currentGameBox">
      <div className="currentGameHeader">
        <div className="headerRow">
          <div className="col-5 headerColumn">
            <h6 className="headerTeam">{awayName}</h6>
            <p className="teamRecord">
              {awayWins}-{awayLosses}-{awayTies}
            </p>
            <h1 className="headerScore">{awayScore}</h1>
          </div>
          <div className="period">
            <p className="headerPeriod">{period}</p>
            <p className="headerTime">{time}</p>
          </div>
          <div className="col-5 headerColumn">
            <h6 className="headerTeam">{homeName}</h6>
            <p className="teamRecord">
              {homeWins}-{homeLosses}-{homeTies}
            </p>
            <h1 className="headerScore">{homeScore}</h1>
          </div>
        </div>
      </div>
      <div id="statsColumn" className="container text-center">
        <div className="currentRow">
          <div className="column">
            <p className="staticValue">S.O.G:</p>
            <p className="liveStat">{awaySOG}</p>
          </div>
          <div className="column">
            <p className="staticValue">S.O.G:</p>
            <p className="liveStat">{homeSOG}</p>
          </div>
        </div>
        <div className="currentRow">
          <div className="column">
            <p className="staticValue">Faceoff Win %</p>
            <p className="liveStat">{awayFO}</p>
          </div>
          <div className="column">
            <p className="staticValue">Faceoff Win %</p>
            <p className="liveStat">{homeFO}</p>
          </div>
        </div>
        <div className="currentRow">
          <div className="column">
            <p className="staticValue">Hits</p>
            <p className="liveStat">{awayHits}</p>
          </div>
          <div className="column">
            <p className="staticValue">Hits</p>
            <p className="liveStat">{homeHits}</p>
          </div>
        </div>
        <div className="currentRow">
          <div className="column">
            <p className="staticValue">PIM</p>
            <p className="liveStat">{awayPIM}</p>
          </div>
          <div className="column">
            <p className="staticValue">PIM</p>
            <p className="liveStat">{homePIM}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
