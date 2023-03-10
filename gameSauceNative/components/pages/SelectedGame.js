import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

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

  // const navigation = useNavigation();
  // const gameID = this.props.navigation.state.routeName;
  const gameID = useRoute();
  const box = `https://statsapi.web.nhl.com/api/v1${gameID}/feed/live`;
  const url = `https://statsapi.web.nhl.com/api/v1/schedule`;

  useEffect(() => {
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
  }, [box, url]);

  return (
    <LinearGradient style={{ height: "100%" }} colors={["#43014f", "#00d4ff"]}>
      <View style={style.currentGameHeader}>
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
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  currentGameHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "40%",
  },
  headerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "45%",
  },
  headerTeam: {
    fontWeight: "600",
    fontSize: 34,
    textAlign: "center",
    color: "#fff",
  },
  teamRecord: {
    padding: "5% 0% 3% 0%",
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  headerScore: {
    // height: "10%",
    fontSize: 60,
    fontWeight: "600",
    color: "#fff",
  },
  period: {
    paddingBottom: "1%",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  },
  headerPeriod: {
    fontWeight: "800",
    fontSize: 20,
    margin: "0% 0% 3% 0%",
    textAlign: "center",
    color: "#fff",
  },
  headerTime: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
  statsColumn: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "700",
  },
  currentRow: {
    display: "flex",
    flexDirection: "row",
    height: "18%",
  },
  column: {
    width: "50%",
  },
  liveStat: {
    fontSize: 25,
    fontWeight: "600",
    textDecorationColor: "none",
    textDecorationStyle: "none",
    textAlign: "center",
    paddingTop: "5%",
    color: "#fff",
    width: "100%",
  },
  staticValue: {
    fontSize: 25,
    fontWeight: "800",
    textDecorationLine: "underline",
    color: "#fff",
    textAlign: "center",
    width: "100%",
  },
});