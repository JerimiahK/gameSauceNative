import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Homepage() {
  const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
  let gameID;
  let currentTeamRecords;
  let gamesArray = [];
  let teamRecords = [];

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

  async function getData() {
    //fetch to NHL API for current days general information on games (ie: total games)
    const recentGames = await fetch(url, {
      method: "GET",
    }).then((res) => res.json());

    //return API information as JSON into a variable we can start extracting information from
    // const currentData = await recentGames.json();

    //grabs all of todays games information, including gameID's as an array of objects
    const games = recentGames.dates[0].games;

    //creates a new array of the games, but only with the information we need
    for (let g of games) {
      //puts just the id and status of todays games into a gamesArray
      gamesArray.push({
        id: g.gamePk,
        status: g.status.detailedState,
      });
      //puts the home and away team records into an array
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

    //filters out an array of the games that are scheduled
    const scheduled = gamesArray.filter(
      (status) => status.status === "Scheduled" || "Pre-Game"
    );

    //filters out an array of the games that are in progress
    const inProgress = gamesArray.filter(
      (status) => status.status === "In Progress"
    );

    //filters out an array of the games that are finished
    const final = gamesArray.filter((status) => status.status === "Final");

    // creates a function that contains logic to display the most current game to be played, being played, or the last game of the night that finished
    const gameIDScheduled = function () {
      if (gamesArray[0].status === "Scheduled" || "Pre-Game") {
        gameID = gamesArray[0].id;
      } else if (gamesArray[0].status === "In Progress" || "In Progress - Critical") {
        gameID = inProgress.pop().id;
      } else if (games.status === "Final") {
        gameID = final.pop().gamesArray.at(-1);
      }
    };
    
    //calls the gameIDStatus function to determine what the most current game ID is based on the games status'
    gameIDScheduled();
    //creates a for loop to find the the current teams records based on comparing the gameID with the teams record ID
    for (let r of teamRecords) {
      if (gameID === r.id) {
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

    //creates a variable containing the URL for the NHL API to get the most current game feed stats using the gameID
    const box = `https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`;

    //fetches the most current games stats information
    const liveGameFetch = await fetch(box, {
      method: "GET",
    });

    //puts the live game data into a json format inside of variable
    const liveData = await liveGameFetch.json();

    const currentPeriod = liveData.liveData.linescore.currentPeriodOrdinal;
    setPeriod(currentPeriod)

    const timeLeft = liveData.liveData.linescore.currentPeriodTimeRemaining;
    setTime(timeLeft);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Home Team Data Below~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const homeTeamName = liveData.liveData.boxscore.teams.home.team.name;
    setHomeName(homeTeamName)

    const homeTeamWins = currentTeamRecords.homeWins;
    setHomeWins(homeTeamWins)

    const homeTeamLosses = currentTeamRecords.homeLosses;
    setHomeLosses(homeTeamLosses);

    const homeTeamTies = currentTeamRecords.homeTies;
    setHomeTies(homeTeamTies);

    const homeTeamScore =
      liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals;
    setHomeScore(homeTeamScore);

    const homeTeamSOG =
      liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.shots;
    setHomeSOG(homeTeamSOG)

    const homeTeamFO =
      liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats
        .faceOffWinPercentage;
    setHomeFO(homeTeamFO)

    const homeTeamHits =
      liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.hits;
    setHomeHits(homeTeamHits)

    const homeTeamPIM =
      liveData.liveData.boxscore.teams.home.teamStats.teamSkaterStats.pim;
    setHomePIM(homeTeamPIM)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Away Team Data Below ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const awayTeamName = liveData.liveData.boxscore.teams.away.team.name;
    setAwayName(awayTeamName)
    
    const awayTeamWins = currentTeamRecords.awayWins;
    setAwayWins(awayTeamWins);

    const awayTeamLosses = currentTeamRecords.awayLosses;
    setAwayLosses(awayTeamLosses);

    const awayTeamTies = currentTeamRecords.awayTies;
    setAwayTies(awayTeamTies);

    const awayTeamScore = liveData.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals;
    setAwayScore(awayTeamScore)

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

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <View style={style.currentGameBox}>
      <View style={style.currentGameHeader}>
        <View style={style.headerRow}>
          <View style={style.headerColumn}>
            <Text style={style.headerTeam}>{awayName}</Text>
            <Text style={style.teamRecord}>
              {awayWins}-{awayLosses}-{awayTies}
            </Text>
            <Text style={style.headerScore}>{awayScore}</Text>
          </View>
          <View style={style.period}>
            <Text style={style.headerPeriod}>{period}</Text>
            <Text style={style.headerTime}>{time}</Text>
          </View>
          <View style={style.headerColumn}>
            <Text style={style.headerTeam}>{homeName}</Text>
            <Text style={style.teamRecord}>
              {homeWins}-{homeLosses}-{homeTies}
            </Text>
            <Text style={style.headerScore}>{homeScore}</Text>
          </View>
        </View>
      </View>
      {/* Stats Column */}
      <View style={style.statsColumn}>
        <View style={style.currentRow}>
          <View style={style.column}>
            <Text style={style.staticValue}>S.O.G</Text>
            <Text style={style.liveStat}>{awaySOG}</Text>
          </View>
          <View style={style.column}>
            <Text style={style.staticValue}>S.O.G</Text>
            <Text style={style.liveStat}>{homeSOG}</Text>
          </View>
        </View>
        <View style={style.currentRow}>
          <View style={style.column}>
            <Text style={style.staticValue}>FO %</Text>
            <Text style={style.liveStat}>{awayFO}%</Text>
          </View>
          <View style={style.column}>
            <Text style={style.staticValue}>FO %</Text>
            <Text style={style.liveStat}>{homeFO}%</Text>
          </View>
        </View>
        <View style={style.currentRow}>
          <View style={style.column}>
            <Text style={style.staticValue}>Hits</Text>
            <Text style={style.liveStat}>{awayHits}</Text>
          </View>
          <View style={style.column}>
            <Text style={style.staticValue}>Hits</Text>
            <Text style={style.liveStat}>{homeHits}</Text>
          </View>
        </View>
        <View style={style.currentRow}>
          <View style={style.column}>
            <Text style={style.staticValue}>PIM</Text>
            <Text style={style.liveStat}>{awayPIM}</Text>
          </View>
          <View style={style.column}>
            <Text style={style.staticValue}>PIM</Text>
            <Text style={style.liveStat}>{homePIM}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  currentGameBox: {
    padding: "2%",
    flex: "6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  currentGameHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50%",
  },
  headerTeam: {
    fontWeight: "600",
    fontSize: "30%",
    textAlign: "center",
    color: "#6c6d70",
  },
  teamRecord: {
    padding: "5% 0% 3% 0%",
    color: "#6c6d70",
    fontWeight: "800"
  },
  headerScore: {
    fontSize: "40%",
    color: "#6c6d70",
  },
  period: {
    paddingBottom: "1%",
    color: "#6c6d70",
  },
  headerPeriod: {
    fontWeight: "800",
    fontSize: "20%",
    margin: "0% 0% 3% 0%",
    textAlign: "center",
    color: "#6c6d70",
  },
  headerTime: {
    fontWeight: "800",
    fontSize: "20%",
    textAlign: "center",
    color: "#6c6d70",
  },
  statsColumn: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "700",
  },
  currentRow: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    width: "50%",
  },
  liveStat: {
    fontSize: "20%",
    fontWeight: "600",
    textDecorationColor: "none",
    textDecorationStyle: "none",
    textAlign: "center",
    paddingTop: "5%",
    color: "#6c6d70",
    width: "100%",
  },
  staticValue: {
    fontSize: "20%",
    fontWeight: "800",
    textDecorationLine: "underline",
    color: "#6c6d70",
    textAlign: "center",
    width: "100%",
  },
});