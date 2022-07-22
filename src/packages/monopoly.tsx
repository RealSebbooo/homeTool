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
  Tabs,
  Tab,
  TabsContents,
  TabContent,
  StreetsWrapper,
  StreetGroups,
  StreetComp,
  StreetWrapper,
  StreetActions,
  StreetCompWrapper,
  BuyCardWrapper,
  Trade,
  TradeFrom,
  TradeTo,
  MoneyInput,
  TotalValue,
  TradeActions,
  TradeStreet,
  Haus,
  BuildMenu,
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
import { streetArray, StreetType } from "../services/streets";
import StreetCard from "../monopolyComponents/streetCard";
import { ListDropdownItems } from "../components/itemList";
type PlayerType = {
  name: string;
  money: number;
};
enum MoveTypes {
  Trade = "trade",
  Transaction = "transaction",
  AddHouse = "addHouse",
  RemoveHouse = "removeHouse",
  AddHypothek = "AddHypothek",
  RemoveHypothek = "removeHypothek",
  Buy = "buy",
}
type Move = {
  from: string;
  to?: string;
  toMoney?: number;
  fromMoney?: number;
  toStreets?: StreetType[];
  fromStreets?: StreetType[];
  amount?: number;
  type: MoveTypes;
  street?: string;
};
enum GameState {
  Waiting = "waiting",
  Running = "running",
  Finished = "finished",
}

type TradeType = {
  from: string;
  to: string;
  fromStreets: StreetType[];
  fromMoney: number;
  toStreets: StreetType[];
  toMoney: number;
};

type GameType = {
  players: PlayerType[];
  moneySteps: number[];
  moves: Move[];
  uid: string;
  state: GameState;
  roomNumber: string;
  streets: StreetType[];
  tradeOffer: TradeType | object;
};

type StreetObjectType = {
  "#965337": StreetType[];
  "#AAE1F3": StreetType[];
  "#D83996": StreetType[];
  "#F7941D": StreetType[];
  "#ED1B24": StreetType[];
  yellow: StreetType[];
  "#1FB25A": StreetType[];
  "#0072BE": StreetType[];
  "#100615": StreetType[];
  grey: StreetType[];
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
    setTimeout(() => {
      location.reload();
    }, 1000);
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
  const [tradeUser, setTradeUser] = useState(userName);
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
        type: MoveTypes.Transaction,
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
      if (!lastMove) return;
      switch (lastMove.type) {
        case MoveTypes.Trade:
          lastMove?.fromStreets?.forEach((element) => {
            game.streets.find(
              (street: StreetType) => street.name === element.name
            ).takenBy = lastMove.from === "Bank" ? "" : lastMove.from;
          });
          lastMove?.toStreets?.forEach((element) => {
            game.streets.find(
              (street: StreetType) => street.name === element.name
            ).takenBy = lastMove.to === "Bank" ? "" : lastMove.to;
          });
          if (lastMove.from !== "Bank") {
            game.players.find(
              (player: PlayerType) => player.name === lastMove.from
            ).money =
              game.players.find(
                (player: PlayerType) => player.name === lastMove.from
              )?.money -
              (lastMove.toMoney || 0) +
              (lastMove.fromMoney || 0);
          }

          if (lastMove.to !== "Bank") {
            game.players.find(
              (player: PlayerType) => player.name === lastMove.to
            ).money =
              (game.players.find(
                (player: PlayerType) => player.name === lastMove.to
              ).money || 0) -
              (lastMove.fromMoney || 0) +
              (lastMove.toMoney || 0);
          }
          break;
        case MoveTypes.Transaction:
          if (lastMove.to !== "Bank") {
            game.players.find(
              (player: PlayerType) => player.name === lastMove.to
            ).money -= lastMove.amount || 0;
          }
          if (lastMove.from !== "Bank") {
            game.players.find(
              (player: PlayerType) => player.name === lastMove.from
            ).money += lastMove.amount || 0;
          }
        case MoveTypes.AddHouse:

        default:
          break;
      }

      game?.moves.pop();

      setGame(JSON.parse(JSON.stringify(game)));
      updateLocalstorageGame();
    }
  };

  const [createGame, setCreateGame] = useState(true);
  const [joinGame, setJoinGame] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [streets, setStreets] = useState<StreetObjectType>();
  const createNewGame = () => {
    const newGame = {
      players: [],
      moneySteps: [1, 5, 10, 20, 50, 100, 200, 500],
      moves: [],
      uid: "",
      state: GameState.Waiting,
      roomNumber: roomNumber,
      streets: streetArray,
      tradeOffer: {},
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
        groupStreets(doc.data().streets);
        if (doc.data().tradeOffer?.to === userName) setActiveTab(2);
      }
    });
  };
  const groupStreets = (streets: StreetType[]) => {
    let streetObject: StreetObjectType = {
      "#965337": [],
      "#AAE1F3": [],
      "#D83996": [],
      "#F7941D": [],
      "#ED1B24": [],
      yellow: [],
      "#1FB25A": [],
      "#0072BE": [],
      "#100615": [],
      grey: [],
    };

    for (let i = 0; i < streets.length; i++) {
      if (!streetObject[streets[i].farbe]) streetObject[streets[i].farbe] = [];
      streetObject[streets[i].farbe].push(streets[i]);
    }
    setStreets(streetObject);
  };
  const gameHasFinished = () => {
    localStorage.removeItem("monopolyGame");
    location.reload();
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

  const [activeTab, setActiveTab] = useState(userIsBank() ? 0 : 1);
  const [activeCard, setActiveCard] = useState<string>("");

  const [tradeFromMoneyValue, setTradeFromMoneyValue] = useState("0");
  const [tradeToMoneyValue, setTradeToMoneyValue] = useState("0");
  const [tradeFromStreets, setTradeFromStreets] = useState<StreetType[]>([]);
  const [tradeToStreets, setTradeToStreets] = useState<StreetType[]>([]);

  const getTotalFromValue = () => {
    let value = 0;
    if (
      parseInt(tradeFromMoneyValue) >
      game?.players?.find((player) => player.name === userName)?.money
    ) {
      value = game?.players?.find((player) => player.name === userName)?.money;
    } else {
      value = parseInt(tradeFromMoneyValue);
    }

    if (tradeFromStreets?.length || 0 > 0) {
      tradeFromStreets.forEach((street) => {
        value += street.preis;
        if (street.anzahlHaus > 0) {
          value += street.anzahlHaus * street.bauenKosten;
        }
      });
    }

    return value;
  };
  const getTotalToValue = () => {
    let value = 0;

    if (
      parseInt(tradeToMoneyValue) >
      game?.players?.find((player) => player.name === tradeUser)?.money
    ) {
      value = game?.players?.find((player) => player.name === tradeUser)?.money;
    } else {
      value = parseInt(tradeToMoneyValue);
    }

    if (tradeToStreets?.length || 0 > 0) {
      tradeToStreets.forEach((street) => {
        value += street.preis;
        if (street.anzahlHaus > 0) {
          value += street.anzahlHaus * street.bauenKosten;
        }
      });
    }

    return value;
  };

  const getPossibleTradeFromStreets = (): ListDropdownItems[] => {
    let streets = JSON.parse(JSON.stringify(game?.streets));

    streets = streets
      .filter(
        (street: StreetType) =>
          street.takenBy === (userName === "Bank" ? "" : userName)
      )
      .filter(
        (street: StreetType) =>
          !tradeFromStreets?.find((item) => item.name === street.name)
      );

    return streets.map((street: StreetType) => ({
      name: street.name,
      id: street.name,
      color: street.farbe,
    }));
  };
  const getPossibleTradeToStreets = (): ListDropdownItems[] => {
    let streets = JSON.parse(JSON.stringify(game?.streets));

    streets = streets
      .filter((street: StreetType) => street.takenBy === tradeUser)
      .filter(
        (street: StreetType) =>
          !tradeToStreets?.find((item) => item.name === street.name)
      );

    return streets.map((street: StreetType) => ({
      name: street.name,
      id: street.name,
      color: street.farbe,
    }));
  };
  const removeItemFromFromList = (name: string) => {
    setTradeFromStreets(
      tradeFromStreets.filter((street) => street.name !== name)
    );
  };
  const removeItemFromToList = (name: string) => {
    setTradeToStreets(tradeToStreets.filter((street) => street.name !== name));
  };
  const sendTradeOffer = () => {
    const currentGame = JSON.parse(JSON.stringify(game));
    let fromMoney = 0;
    if (
      parseInt(tradeFromMoneyValue) >
      game?.players?.find((player) => player.name === userName)?.money
    ) {
      fromMoney = game?.players?.find(
        (player) => player.name === userName
      )?.money;
    } else {
      fromMoney = parseInt(tradeFromMoneyValue);
    }
    let toMoney = 0;
    if (
      parseInt(tradeToMoneyValue) >
      game?.players?.find((player) => player.name === tradeUser)?.money
    ) {
      toMoney = game?.players?.find(
        (player) => player.name === tradeUser
      )?.money;
    } else {
      toMoney = parseInt(tradeToMoneyValue);
    }
    const currentTrade: TradeType = {
      from: userName,
      to: tradeUser,
      fromStreets: tradeFromStreets,
      toStreets: tradeToStreets,
      fromMoney: fromMoney,
      toMoney: toMoney,
    };
    currentGame.tradeOffer = currentTrade;
    console.log("send trade offer", currentGame, currentTrade);

    updateGame(currentGame);
  };

  const tradeIsActive = () => !!(Object.keys(game.tradeOffer || {}).length > 0);

  const acceptTradeOffer = () => {
    const currentGame = JSON.parse(JSON.stringify(game));
    const tradeOffer = currentGame.tradeOffer;
    console.log("currentGame", currentGame);
    if (tradeOffer.from !== "Bank") {
      currentGame.players.find(
        (player: PlayerType) => player.name === tradeOffer.from
      ).money =
        currentGame.players.find(
          (player: PlayerType) => player.name === tradeOffer.from
        )?.money +
        tradeOffer.toMoney -
        tradeOffer.fromMoney;
    }

    if (tradeOffer.to !== "Bank") {
      currentGame.players.find(
        (player: PlayerType) => player.name === tradeOffer.to
      ).money =
        currentGame.players.find(
          (player: PlayerType) => player.name === tradeOffer.to
        )?.money +
        tradeOffer.fromMoney -
        tradeOffer.toMoney;
    }

    tradeOffer.fromStreets.forEach((element: StreetType) => {
      currentGame.streets.find(
        (street: StreetType) => street.name === element.name
      ).takenBy = tradeOffer.to === "Bank" ? "" : tradeOffer.to;
    });
    tradeOffer.toStreets.forEach((element: StreetType) => {
      currentGame.streets.find(
        (street: StreetType) => street.name === element.name
      ).takenBy = tradeOffer.from === "Bank" ? "" : tradeOffer.from;
    });

    const move: Move = {
      from: tradeOffer.from,
      to: tradeOffer.to,
      toStreets: tradeOffer.toStreets,
      fromStreets: tradeOffer.fromStreets,
      toMoney: tradeOffer.toMoney,
      fromMoney: tradeOffer.fromMoney,
      type: MoveTypes.Trade,
    };

    currentGame.moves.push(move);

    console.log("acceptTrade", currentGame);
    currentGame.tradeOffer = {};

    updateGame(currentGame);
  };

  const declineTradeOffer = () => {
    updateGame({ ...game, tradeOffer: {} });
  };

  const addHouse = () => {
    if (!game) return;
    const street = game.streets.find((s) => s.name === activeCard);
    const player = game.players.find((p) => p.name === street.takenBy);
    if (!street || !player) return;
    if (player.money < street.bauenKosten) return;
    game.players.find((p) => p.name === street.takenBy).money -=
      street.bauenKosten;
    game.streets.find((street) => street.name === activeCard).anzahlHaus += 1;
    const move: Move = {
      type: MoveTypes.AddHouse,
      from: street.takenBy,
      street: street.name,
    };
    game.moves.push(move);
    updateGame(game);
  };
  const removeHouse = () => {
    if (!game) return;
    const street = game.streets.find((s) => s.name === activeCard);
    const player = game.players.find((p) => p.name === street.takenBy);
    if (!street || !player) return;
    if (player.money < street.bauenKosten / 2) return;
    game.players.find((p) => p.name === street.takenBy).money -=
      street.bauenKosten / 2;
    game.streets.find((street) => street.name === activeCard).anzahlHaus -= 1;
    const move: Move = {
      type: MoveTypes.RemoveHouse,
      from: street.takenBy,
      street: street.name,
    };
    game.moves.push(move);
    updateGame(game);
  };
  const removeHypothek = () => {
    if (!game) return;
    const street = game.streets.find((s) => s.name === activeCard);
    const player = game.players.find((p) => p.name === street.takenBy);
    if (!street || !player) return;
    if (player.money < street.hypothek + street.hypothek * 0.1) return;
    game.players.find((p) => p.name === street.takenBy).money -= Math.round(
      street.hypothek + street.hypothek * 0.1
    );
    game.streets.find((street) => street.name === activeCard).hypothekisiert =
      false;
    const move: Move = {
      type: MoveTypes.RemoveHypothek,
      from: street.takenBy,
      street: street.name,
    };
    game.moves.push(move);
    updateGame(game);
  };
  const addHypothek = () => {
    if (!game) return;
    const street = game.streets.find((s) => s.name === activeCard);
    const player = game.players.find((p) => p.name === street.takenBy);
    if (!street || !player) return;
    game.players.find((p) => p.name === street.takenBy).money +=
      street.hypothek;
    game.streets.find((street) => street.name === activeCard).hypothekisiert =
      true;
    const move: Move = {
      type: MoveTypes.AddHypothek,
      from: street.takenBy,
      street: street.name,
    };
    game.moves.push(move);
    updateGame(game);
  };
  const [buyUser, setBuyUser] = useState("");

  const buyHouse = () => {
    const street = game.streets.find((s) => s.name === activeCard);
    const player = game.players.find((p) => p.name === buyUser);
    if (!player || !street) return;

    if (player.money < street.preis) return;

    game.streets.find((s) => s.name === activeCard).takenBy = buyUser;
    game.players.find((p) => p.name === buyUser).money -= street.preis;

    const move: Move = {
      type: MoveTypes.Buy,
      from: buyUser,
      street: street.name,
    };
    game.moves.push(move);
    updateGame(game);
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
            <Tabs>
              {userIsBank() && (
                <Tab onClick={() => setActiveTab(0)} active={activeTab === 0}>
                  Geld
                </Tab>
              )}
              <Tab onClick={() => setActiveTab(1)} active={activeTab === 1}>
                Straßen
              </Tab>
              <Tab onClick={() => setActiveTab(2)} active={activeTab === 2}>
                Handel
              </Tab>
            </Tabs>
            <TabsContents>
              {userIsBank() && (
                <TabContent shown={activeTab === 0}>
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
                </TabContent>
              )}
              <TabContent shown={activeTab === 1}>
                <StreetsWrapper>
                  {Object.keys(streets)?.map((streetGroup, key) => {
                    return (
                      <StreetGroups>
                        {streets[streetGroup]?.map((street) => {
                          return (
                            <StreetComp
                              color={
                                street.hypothekisiert ? "gray" : street.farbe
                              }
                              isTaken={
                                userName === "Bank"
                                  ? !!street.takenBy
                                  : street.takenBy === userName
                              }
                              onClick={() => setActiveCard(street.name)}
                            >
                              {street.straße && street.anzahlHaus === 5 ? (
                                <Haus hotel />
                              ) : (
                                street.anzahlHaus > 0 &&
                                Array.from({ length: street.anzahlHaus }).map(
                                  (haus) => <Haus />
                                )
                              )}
                            </StreetComp>
                          );
                        })}
                      </StreetGroups>
                    );
                  })}
                </StreetsWrapper>
                {game?.streets.find((street) => street.name === activeCard) && (
                  <StreetWrapper>
                    <StreetCard
                      street={
                        game?.streets.find(
                          (street) => street.name === activeCard
                        ) as StreetType
                      }
                    ></StreetCard>
                    {userIsBank() &&
                    game?.streets?.find((street) => street.name === activeCard)
                      ?.takenBy ? (
                      <BuildMenu>
                        {game?.streets?.find(
                          (street) => street.name === activeCard
                        )?.straße && (
                          <>
                            {game?.streets?.find(
                              (street) => street.name === activeCard
                            )?.anzahlHaus < 5 && (
                              <Button
                                color={theme.green}
                                value={`+ ${
                                  game?.streets?.find(
                                    (street) => street.name === activeCard
                                  )?.anzahlHaus === 4
                                    ? "Hotel"
                                    : "Haus"
                                }`}
                                onClick={() => addHouse()}
                              ></Button>
                            )}
                            {game?.streets?.find(
                              (street) => street.name === activeCard
                            )?.anzahlHaus > 0 && (
                              <Button
                                color={theme.red}
                                value={`- ${
                                  game?.streets?.find(
                                    (street) => street.name === activeCard
                                  )?.anzahlHaus === 5
                                    ? "Hotel"
                                    : "Haus"
                                }`}
                                onClick={() => removeHouse()}
                              ></Button>
                            )}
                            <br />
                          </>
                        )}
                        <Button
                          color={"gray"}
                          value={`${
                            game?.streets?.find(
                              (street) => street.name === activeCard
                            )?.hypothekisiert
                              ? "Hypothek auflösen (-" +
                                Math.round(
                                  game?.streets?.find(
                                    (street) => street.name === activeCard
                                  )?.hypothek +
                                    game?.streets?.find(
                                      (street) => street.name === activeCard
                                    )?.hypothek *
                                      0.1
                                ) +
                                "€)"
                              : "Hypothek aufnehmen (+" +
                                game?.streets?.find(
                                  (street) => street.name === activeCard
                                )?.hypothek +
                                "€)"
                          }`}
                          onClick={
                            game?.streets?.find(
                              (street) => street.name === activeCard
                            )?.hypothekisiert
                              ? () => removeHypothek()
                              : () => addHypothek()
                          }
                        ></Button>
                      </BuildMenu>
                    ) : (
                      <>
                        {userIsBank() && (
                          <BuildMenu>
                            <Button
                              color={theme.green}
                              value={`Kaufen (${
                                game?.streets?.find(
                                  (street) => street.name === activeCard
                                )?.preis
                              }€)`}
                              onClick={buyUser ? () => buyHouse() : () => {}}
                            ></Button>
                            <Dropdown
                              items={dropdownItems().filter(
                                (item) => item.name !== "Bank"
                              )}
                              activeItem={{ name: buyUser, id: buyUser }}
                              itemClicked={(user) => setBuyUser(user)}
                            ></Dropdown>
                          </BuildMenu>
                        )}
                      </>
                    )}
                  </StreetWrapper>
                )}
              </TabContent>
              <TabContent shown={activeTab === 2}>
                {tradeIsActive() ? (
                  <>
                    <h2>
                      Handelsangebot von {game.tradeOffer.from} an{" "}
                      {game.tradeOffer.to}
                    </h2>
                    <Trade>
                      <TradeFrom>
                        <h4>Forderung</h4>
                        {game.tradeOffer?.toMoney} €
                        {game.tradeOffer?.toStreets?.map((street) => (
                          <>
                            <br />
                            {street.name} {street.preis} €
                          </>
                        ))}
                      </TradeFrom>
                      <TradeTo>
                        <h4>Angebot</h4>
                        {game.tradeOffer.fromMoney} €
                        {game.tradeOffer.fromStreets?.map((street) => (
                          <>
                            <br />
                            {street.name} {street.preis} €
                          </>
                        ))}
                      </TradeTo>
                    </Trade>
                    {game.tradeOffer.to === userName && (
                      <TradeActions>
                        <Button
                          color={theme.green}
                          value="Annehmen"
                          onClick={() => acceptTradeOffer()}
                        ></Button>
                        <Button
                          color={theme.red}
                          value="Ablehnen"
                          onClick={() => declineTradeOffer()}
                        ></Button>
                      </TradeActions>
                    )}
                  </>
                ) : (
                  <>
                    Handeln mit
                    <Dropdown
                      items={dropdownItems().filter(
                        (item) => item.name !== userName
                      )}
                      activeItem={{ name: tradeUser, id: tradeUser }}
                      itemClicked={(user) => setTradeUser(user)}
                    ></Dropdown>
                    {tradeUser && (
                      <>
                        <Trade>
                          <TradeFrom>
                            <h4>Biete</h4>
                            <Textfield
                              type="number"
                              placeholder="Biete Geld"
                              value="0"
                              disabled={false}
                              textInputChanged={(value) =>
                                setTradeFromMoneyValue(value)
                              }
                            ></Textfield>
                            {getPossibleTradeFromStreets().length > 0 && (
                              <Dropdown
                                items={getPossibleTradeFromStreets()}
                                activeItem={getPossibleTradeFromStreets()[0]}
                                itemClicked={(streetName) =>
                                  setTradeFromStreets([
                                    ...tradeFromStreets,
                                    game.streets.find(
                                      (street) => street.name === streetName
                                    ),
                                  ])
                                }
                              ></Dropdown>
                            )}
                            <>
                              {tradeFromStreets?.map((street) => {
                                return (
                                  <TradeStreet
                                    color={street.farbe}
                                    onClick={() =>
                                      removeItemFromFromList(street.name)
                                    }
                                  >
                                    {street.name} - {street.preis}€
                                  </TradeStreet>
                                );
                              })}
                            </>
                            <TotalValue>
                              Gesamtwert {getTotalFromValue()} €
                            </TotalValue>
                          </TradeFrom>
                          <TradeTo>
                            <h4>Fordere</h4>
                            <Textfield
                              type="number"
                              placeholder="Fordere Geld"
                              value="0"
                              disabled={false}
                              textInputChanged={(value) =>
                                setTradeToMoneyValue(value)
                              }
                            ></Textfield>
                            {getPossibleTradeToStreets().length > 0 && (
                              <Dropdown
                                items={getPossibleTradeToStreets()}
                                activeItem={getPossibleTradeToStreets()[0]}
                                itemClicked={(streetName) =>
                                  setTradeToStreets([
                                    ...tradeToStreets,
                                    game.streets.find(
                                      (street) => street.name === streetName
                                    ),
                                  ])
                                }
                              ></Dropdown>
                            )}
                            <>
                              {tradeToStreets?.map((street) => {
                                return (
                                  <TradeStreet
                                    color={street.farbe}
                                    onClick={() =>
                                      removeItemFromToList(street.name)
                                    }
                                  >
                                    {street.name} - {street.preis}€
                                  </TradeStreet>
                                );
                              })}
                            </>

                            <TotalValue>
                              Gesamtwert {getTotalToValue()} €
                            </TotalValue>
                          </TradeTo>
                        </Trade>

                        <TradeActions>
                          <Button
                            strech
                            value="Handel anfragen"
                            onClick={() => sendTradeOffer()}
                          ></Button>
                        </TradeActions>
                      </>
                    )}
                  </>
                )}
              </TabContent>
            </TabsContents>

            {userIsBank() && (
              <>
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
