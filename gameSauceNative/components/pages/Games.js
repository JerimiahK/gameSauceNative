import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Games() {
  const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
  const [games, setTodaysGames] = useState();

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
    <div id="allGames" className="currentGameBox">
      {games?.map((game) => (
        <Link className="allGamesLink" to={`/game/${game.id}`}>
          <div id="allGamesBox" className="container">
            <div className="allGamesTeamsBox">
              <div id="allGamesAway" className="allGamesRow">
                <p>{game.awayName}</p>
                <p className="gameScore">{game.awayScore}</p>
              </div>
              <div id="allGamesHome" className="allGamesRow">
                <p>{game.homeName}</p>
                <p className="gameScore">{game.homeScore}</p>
              </div>
            </div>
            <p className="gameStatus">{game.status}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
