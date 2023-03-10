import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <View id="allGames" className="currentGameBox">
      <ScrollView>
        {games?.map((game) => (
          <View id="allGamesBox" className="container">
            <Pressable onPress={() => navigation.navigate("SelectedGame")}>
              <View key={game.id} className="allGamesTeamsBox">
                <View id="allGamesAway" className="allGamesRow">
                  <Text>{game.awayName}</Text>
                  <Text className="gameScore">{game.awayScore}</Text>
                </View>
                <View id="allGamesHome" className="allGamesRow">
                  <Text>{game.homeName}</Text>
                  <Text className="gameScore">{game.homeScore}</Text>
                </View>
              </View>
              <Text className="gameStatus">{game.status}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  
})