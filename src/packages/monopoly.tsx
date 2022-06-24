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

import db from "./../services/firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { dividerClasses } from "@mui/material";
type PlayerType = {
  name: string;
  money: number;
};
type Move = {
  from: string;
  to: string;
  amount: number;
};
enum GameState {
  Waiting = "waiting",
  Running = "running",
  Finished = "finished",
}
type GameType = {
  players: PlayerType[];
  moneySteps: number[];
  moves: Move[];
  uid: string;
  state: GameState;
  roomNumber: string;
};
const Monopoly = () => {
  if (typeof window === "undefined") return;
  const [names, setNames] = useState(["", ""]);
  const [money, setMoney] = useState("1500");
  const [userName, setUserName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("0");
  const [game, setGame] = useState<GameType | undefined>();
  const setNameToList = (name: string, key: number) => {
    names[key - 1] = name;
  };
  const removeUsername = (key: number) => {
    if (names.length > 2) setNames(names.filter((_, i) => i !== key - 1));
  };
  const addUser = () => setNames([...names, ""]);

  const startGame = () => {
    const startingGame = {
      ...game,
      players: game?.players.map((player) => ({
        ...player,
        money: parseInt(money),
      })),
    };

    startingGame.state = GameState.Running;
    setDoc(doc(db, "monopoly", startingGame.uid), startingGame);
  };

  useEffect(() => {
    const localGame = localStorage.getItem("monopolyGame") || "";
    if (localGame) {
      setUserName(JSON.parse(localGame).name);
      listenToGame(JSON.parse(localGame).uid);
    }
  }, []);
  const updateLocalstorageGame = () => {
    setDoc(doc(db, "monopoly", game.uid), game);
  };

  const endGame = () => {
    localStorage.removeItem("monopolyGame");
    updateGame({ ...game, state: GameState.Finished });
    location.reload();
  };
  const updateGame = (game: GameType) => {
    setDoc(doc(db, "monopoly", game.uid), game);
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
    if (fromUser !== "Bank") {
      let userObject = game?.players.find((player) => player.name === fromUser);
      if (userObject) {
        userObject = bookUser(userObject, currentAmount, false);
      }
    }
    if (toUser !== "Bank") {
      let userObject = game?.players.find((player) => player.name === toUser);
      if (userObject) {
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
      updateLocalstorageGame();
    }
  };

  const [createGame, setCreateGame] = useState(true);
  const [joinGame, setJoinGame] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const createNewGame = () => {
    const newGame = {
      players: [],
      moneySteps: [1, 5, 10, 20, 50, 100, 200, 500],
      moves: [],
      uid: "",
      state: GameState.Waiting,
      roomNumber: roomNumber,
    };
    checkIfGameNameIsAvailable();
    setItem("monopoly", newGame);
  };
  const checkIfGameNameIsAvailable = async (): Promise<boolean> => {
    const ref = collection(db, "monopoly");
    const q = query(ref);
    const snapshot = await getDocs(q);
    const itemsDoc = snapshot.docs.map((doc) => {
      var rObj = { ...doc.data(), uid: doc.id };
      return rObj;
    });

    return true;
  };

  const setItem = async (collectionName: string, data: object) => {
    const citiesRef = collection(db, collectionName);
    const docRef = await addDoc(citiesRef, data);
    addUidToNewList(collectionName, { ...data, uid: docRef.id }, docRef.id);
  };

  const addUidToNewList = (
    collectionName: string,
    data: object,
    uid: string
  ) => {
    setDoc(doc(db, collectionName, uid), data);
    const gameObject = {
      uid: uid,
      name: "Bank",
    };
    localStorage.setItem("monopolyGame", JSON.stringify(gameObject));
    listenToGame(uid);
  };

  const listenToGame = (uid: string) => {
    onSnapshot(doc(db, "monopoly", uid), (doc) => {
      if (doc?.data()) {
        if (doc?.data()?.state === GameState.Finished) {
          gameHasFinished();
        } else
          setGame({
            ...(doc.data() as GameType),
            uid: doc.id,
          });
      }
    });
  };
  const gameHasFinished = () => {
    localStorage.removeItem("monopolyGame");
  };
  const joinExistingGame = async () => {
    const ref = collection(db, "monopoly");
    const q = query(ref, where("roomNumber", "==", roomNumber));
    const snapshot = await getDocs(q);
    const itemsDoc = snapshot.docs.map((doc) => {
      var rObj = { ...doc.data(), uid: doc.id };
      return rObj;
    });
    const playerAlreadyExists = !!itemsDoc[0].players.find(
      (player) => player.name === userName
    );
    if (!playerAlreadyExists) {
      setDoc(doc(db, "monopoly", itemsDoc[0].uid), {
        ...itemsDoc[0],
        players: [...itemsDoc[0]?.players, { name: userName, money: 0 }],
      });
    }
    const gameObject = {
      uid: itemsDoc[0].uid,
      name: userName,
    };
    localStorage.setItem("monopolyGame", JSON.stringify(gameObject));
    listenToGame(itemsDoc[0].uid);
  };

  const userIsBank = (): boolean => {
    if (userName === "Bank") {
      return true;
    }
    return false;
  };
  return (
    <>
      <h1>Monopoly</h1>

      <div>
        {!game ? (
          <>
            <Button
              value="Erstellen"
              color={createGame ? theme.primary : theme.surface}
              onClick={() => {
                setCreateGame(true);
                setJoinGame(false);
              }}
            ></Button>
            <Button
              value="Beitreten"
              color={joinGame ? theme.primary : theme.surface}
              onClick={() => {
                setJoinGame(true);
                setCreateGame(false);
              }}
            ></Button>

            {createGame && (
              <div>
                <Textfield
                  type="text"
                  placeholder={"Raumnummer"}
                  textInputChanged={(value) => setRoomNumber(value)}
                ></Textfield>
                <Button
                  value="Spiel Erstellen"
                  onClick={() => createNewGame()}
                  disabled={!roomNumber}
                  strech
                ></Button>
              </div>
            )}
            {joinGame && (
              <div>
                <Textfield
                  type="text"
                  placeholder={"Raumnummer"}
                  textInputChanged={(value) => setRoomNumber(value)}
                ></Textfield>
                <Textfield
                  type="text"
                  placeholder={"Benutzername"}
                  textInputChanged={(value) => setUserName(value)}
                ></Textfield>
                <Button
                  value="Spiel Beitreten"
                  onClick={() => joinExistingGame()}
                  disabled={!roomNumber || !userName}
                  strech
                ></Button>
              </div>
            )}
          </>
        ) : game && game.state === GameState.Waiting ? (
          <>
            <HorizontalLine></HorizontalLine>
            <h1>Lobby "{game.roomNumber}"</h1>
            {game?.players.length > 0 && (
              <>
                <h1>Spieler</h1>
                <PlayerWrapper>
                  {game?.players?.map((player) => (
                    <PlayerCard>
                      <PlayerInnerBox>
                        <h1 style={{ fontWeight: "normal" }}>{player.name}</h1>
                      </PlayerInnerBox>
                    </PlayerCard>
                  ))}
                </PlayerWrapper>
              </>
            )}
            {userName === "Bank" && (
              <>
                <HorizontalLine></HorizontalLine>
                <MoneyContainer>
                  Startgeld
                  <Textfield
                    type="text"
                    placeholder={"Geld"}
                    textInputChanged={(value) => setMoney(value)}
                  ></Textfield>
                </MoneyContainer>

                <SettingsButtons>
                  <Button
                    disabled={game?.players.length < 2}
                    value="Starten"
                    onClick={startGame}
                  ></Button>
                  <EndButton value="Beenden" onClick={endGame}></EndButton>
                </SettingsButtons>
              </>
            )}
          </>
        ) : (
          <>
            <HorizontalLine></HorizontalLine>
            <PlayerWrapper>
              {game?.players?.map((player) => (
                <>
                  {(player.name === userName || userName === "Bank") && (
                    <PlayerCard isUserBankrupt={player.money <= 0}>
                      <PlayerInnerBox>
                        <h1 style={{ fontWeight: "normal" }}>{player.name}</h1>
                        <h2>{player.money > 0 ? player.money : 0} €</h2>
                        {userIsBank() && (
                          <SettingsButtons>
                            <Button
                              value={"Zahlt"}
                              color={
                                fromUser === player.name
                                  ? theme.primary
                                  : theme.surface
                              }
                              onClick={
                                fromUser === player.name
                                  ? () => setFromUser("Bank")
                                  : () => setFromUser(player.name)
                              }
                            ></Button>
                            <Button
                              value={"Erhält"}
                              color={
                                toUser === player.name
                                  ? theme.primary
                                  : theme.surface
                              }
                              onClick={
                                toUser === player.name
                                  ? () => setToUser("Bank")
                                  : () => setToUser(player.name)
                              }
                            ></Button>
                          </SettingsButtons>
                        )}
                      </PlayerInnerBox>
                    </PlayerCard>
                  )}
                </>
              ))}
            </PlayerWrapper>
            <HorizontalLine></HorizontalLine>
            {userIsBank() && (
              <>
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
                  {game?.moneySteps?.map((step) => {
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
                  {game?.moneySteps?.map((step) => {
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
                <Button
                  value="Buchen"
                  onClick={() => bookMoney()}
                  strech
                ></Button>
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
          </>
        )}
      </div>
    </>
  );
};

export default Monopoly;
