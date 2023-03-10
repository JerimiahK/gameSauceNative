import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Games() {
  const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
  const [games, setTodaysGames] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      const currentData = await fetch(url, {
        method: "GET",
      }).then((res) => res.json());

      const allGames = currentData.dates[0].games;

      let gamesArray = [];

      for (let g of allGames) {
        gamesArray.push({
          id: g.gamePk,
          homeName: g.teams.home.team.name,
          homeScore: g.teams.home.score,
          awayName: g.teams.away.team.name,
          awayScore: g.teams.away.score,
          status: g.status.detailedState,
        });
      }

      const todaysGames = gamesArray;
      setTodaysGames(todaysGames);
      console.log(allGames[0].link);
    }
    getData();
  }, [url]);

  console.log(games);

  return (
    <LinearGradient style={{ height: "90%" }} colors={["#43014f", "#00d4ff"]}>
      <ScrollView>
        {games?.map((game) => (
          <View key={game.id} style={style.box}>
            <Pressable
              style={style.page}
              onPress={() => navigation.navigate("SelectedGame")}
            >
              <View style={style.gameRow}>
                <Text style={style.text}>{game.awayName}</Text>
                <Text style={style.text}>{game.awayScore}</Text>
              </View>
              <View style={style.gameRow}>
                <Text style={style.text}>{game.homeName}</Text>
                <Text style={style.text}>{game.homeScore}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  gameRow: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "800"
  },
  box: {
    borderColor: "#fff",
    borderWidth: 2,
  }
})