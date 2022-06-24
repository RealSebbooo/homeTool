import React, { useEffect, useState } from "react";
import Button from "../components/button";
import Dropdown from "../components/dropdown/dropdown";
import Row from "../components/row";
import Textfield from "../components/textfield";
import theme from "../components/theme";
import Icon from "../icons";
import {
  MoneyContainer,
  PlayerCard,
  PlayerWrapper,
  PlayerInnerBox,
  BankWrapper,
  From,
  Amount,
  To,
  ButtonWrapper,
  EndButton,
  HorizontalLine,
  SettingsButtons,
} from "./../styles/monopoly.styled";
type PlayerType = {
  name: string;
  money: number;
};
type Move = {
  from: string;
  to: string;
  amount: number;
};
type GameType = {
  players: PlayerType[];
  moneySteps: number[];
  moves: Move[];
};
const Monopoly = () => {
  if (typeof window === "undefined") return;
  const [names, setNames] = useState(["", ""]);
  const [money, setMoney] = useState("1500");
  const [currentAmount, setCurrentAmount] = useState("0");
  const [game, setGame] = useState<GameType | undefined>();
  const [gameExists, setGameExists] = useState(false);
  const setNameToList = (name: string, key: number) => {
    names[key - 1] = name;
  };
  const removeUsername = (key: number) => {
    if (names.length > 2) setNames(names.filter((_, i) => i !== key - 1));
  };
  const addUser = () => setNames([...names, ""]);

  const startGame = () => {
    const game = {
      players: [],
      moneySteps: [1, 5, 10, 20, 50, 100, 200, 500],
      moves: [],
    };

    names.forEach((name) => {
      if (name) {
        const player = { name: name, money: parseInt(money) };
        game.players.push(player);
      }
    });

    console.log("startGame", names, money, game);

    localStorage.setItem("monopolyGame", JSON.stringify(game));
    location.reload();
  };

  useEffect(() => {
    const game = localStorage.getItem("monopolyGame") || "";
    console.log("game", game);
    if (game) {
      console.log("hiergame");
      setGameExists(true);
      setGame(JSON.parse(game));
    }
  }, []);
  const updateLocalstorageGame = () => {
    localStorage.setItem("monopolyGame", JSON.stringify(game));
  };

  const endGame = () => {
    localStorage.removeItem("monopolyGame");
    location.reload();
  };
  const dropdownItems = () => {
    const items = [{ name: "Bank", id: "Bank" }];

    game?.players?.forEach((player) => {
      items.push({ name: player.name, id: player.name });
    });

    return items;
  };
  const [fromUser, setFromUser] = useState("Bank");
  const [toUser, setToUser] = useState("Bank");

  const setTheCurrentAmount = (amount: string) => {
    if (parseInt(amount) < 0) setCurrentAmount("0");
    else setCurrentAmount(amount);
  };
  const increaseMoney = (step: number) => {
    let newValue = parseInt(currentAmount);
    newValue = newValue + step;
    console.log("newvalue", newValue, currentAmount, step);
    setCurrentAmount(newValue.toString());
  };
  const decreaseMoney = (step: number) => {
    let newValue = parseInt(currentAmount);
    newValue = newValue - step;

    if (newValue < 0) {
      setCurrentAmount("0");
    } else setCurrentAmount(newValue.toString());
  };

  const bookMoney = () => {
    console.log("bookMoney", fromUser, toUser, currentAmount);
    if (fromUser !== "Bank") {
      let userObject = game?.players.find((player) => player.name === fromUser);
      if (userObject) {
        userObject = bookUser(userObject, currentAmount, false);
        console.log("foundFrom", userObject);
      }
    }
    if (toUser !== "Bank") {
      let userObject = game?.players.find((player) => player.name === toUser);
      if (userObject) {
        console.log("foundTo", userObject);

        userObject = bookUser(userObject, currentAmount, true);
      }
    }
    if (parseInt(currentAmount) > 0)
      game?.moves.push({
        from: fromUser,
        to: toUser,
        amount: parseInt(currentAmount),
      });
    setGame(JSON.parse(JSON.stringify(game)));
    setCurrentAmount("0");
    setFromUser("Bank");
    setToUser("Bank");
    updateLocalstorageGame();
    console.log("game", game);
  };

  const bookUser = (
    userObject: PlayerType,
    amount: string,
    add: boolean
  ): PlayerType => {
    if (add) userObject.money += parseInt(amount) || 0;
    else userObject.money -= parseInt(amount) || 0;
    return userObject;
  };
  const undoLastMove = () => {
    if (game?.moves.length || 0 > 0) {
      const lastMove = game?.moves[game?.moves.length - 1];
      if (lastMove?.to !== "Bank") {
        let userObject = game?.players.find(
          (player) => player.name === lastMove?.to
        );
        if (userObject)
          userObject = bookUser(
            userObject,
            lastMove?.amount.toString() || "0",
            false
          );
      }
      if (lastMove?.from !== "Bank") {
        let userObject = game?.players.find(
          (player) => player.name === lastMove?.from
        );
        if (userObject)
          userObject = bookUser(
            userObject,
            lastMove?.amount.toString() || "0",
            true
          );
      }

      game?.moves.pop();

      setGame(JSON.parse(JSON.stringify(game)));

      console.log("game", game);
    }
  };
  return (
    <>
      <h1>Monopoly</h1>
      <div>
        {!gameExists && !game ? (
          <>
            {names?.map((name, key) => (
              <Row>
                <Textfield
                  type="text"
                  placeholder={"Name " + ++key}
                  textInputChanged={(value) => setNameToList(value, key)}
                ></Textfield>

                <Button
                  value="Benutzer Löschen"
                  onClick={() => removeUsername(key)}
                ></Button>
              </Row>
            ))}

            <Button value="Benutzer hinzufügen" onClick={addUser}></Button>
            <MoneyContainer>
              Startgeld
              <Textfield
                type="text"
                placeholder={"Geld"}
                textInputChanged={(value) => setMoney(value)}
              ></Textfield>
            </MoneyContainer>

            <Button value="Starten" onClick={startGame}></Button>
          </>
        ) : (
          <>
            <PlayerWrapper>
              {game?.players?.map((player) => (
                <PlayerCard isUserBankrupt={player.money <= 0}>
                  <PlayerInnerBox>
                    <h1 style={{ fontWeight: "normal" }}>{player.name}</h1>
                    <h2>{player.money > 0 ? player.money : 0} €</h2>
                  </PlayerInnerBox>
                </PlayerCard>
              ))}
            </PlayerWrapper>
            <HorizontalLine></HorizontalLine>
            <BankWrapper>
              <From>
                <Dropdown
                  items={dropdownItems()}
                  activeItem={{ name: fromUser, id: fromUser }}
                  itemClicked={(user) => setFromUser(user)}
                ></Dropdown>
              </From>
              <Icon name="arrowRight" light={true}></Icon>
              <Amount>
                <Textfield
                  dense
                  type="text"
                  placeholder={"Geld"}
                  value={currentAmount}
                  textInputChanged={(value) => setTheCurrentAmount(value)}
                ></Textfield>
              </Amount>
              <Icon name="arrowRight" light={true}></Icon>
              <To>
                <Dropdown
                  items={dropdownItems()}
                  activeItem={{ name: toUser, id: toUser }}
                  itemClicked={(user) => setToUser(user)}
                ></Dropdown>
              </To>
            </BankWrapper>
            <HorizontalLine></HorizontalLine>
            <ButtonWrapper>
              {game?.moneySteps.map((step) => {
                return (
                  <Button
                    strech
                    color={theme.green}
                    value={"+ " + step.toString()}
                    onClick={() => increaseMoney(step)}
                  ></Button>
                );
              })}
            </ButtonWrapper>
            <ButtonWrapper>
              {game?.moneySteps.map((step) => {
                return (
                  <Button
                    strech
                    color={theme.red}
                    value={"- " + step.toString()}
                    onClick={() => decreaseMoney(step)}
                  ></Button>
                );
              })}
            </ButtonWrapper>
            <Button value="Buchen" onClick={() => bookMoney()} strech></Button>
            <HorizontalLine></HorizontalLine>
            <SettingsButtons>
              <Button
                value="Rückgängig"
                onClick={() => undoLastMove()}
              ></Button>
              <EndButton value="Beenden" onClick={endGame}></EndButton>
            </SettingsButtons>
          </>
        )}
      </div>
    </>
  );
};

export default Monopoly;
