import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { PlayerStorageDTO } from "@storage/player/PlayersStorageDTO";

import { Header } from "@components/Header";
import { Hightlight } from "@components/Hightlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
    group?: string;
};
export const Players = () => {
    const [newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam] = useState("Time A");
    const [teams] = useState(["Time A", "Time B"]);

    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams;
    const newPlayerNameInputRef = useRef<TextInput>(null);

    const handleAddPlayer = async () => {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert(
                "Novo jogador",
                "Informe o nome da pessoa para adicionar"
            );
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        };

        try {
            await playerAddByGroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName("");
            fetchPlayersByTeam();
        } catch (e) {
            if (e instanceof AppError) {
                Alert.alert("Novo jogador", e.message);
            } else {
                console.log(e);
                Alert.alert(
                    "Novo jogador",
                    "Não foi possível inserir um novo jogador"
                );
            }
        }
    };

    const fetchPlayersByTeam = async () => {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error);
            Alert.alert("Novo jogador", "Não foi possível buscar jogadores");
        }
    };

    const handleRemovePlayer = async (playerName: string) => {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (e) {
            Alert.alert(
                "Remover jogador",
                "Não foi possível remover esse jogador"
            );
        }
    };

    const groupRemove = async () => {
        try {
            await groupRemoveByName(group);
            navigation.navigate("groups");
        } catch (e) {
            Alert.alert("Remover grupo", "Não foi possível remover esse grupo");
        }
    };

    const handleGroupRemove = async () => {
        Alert.alert("Remover", "Deseja remover o grupo?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => groupRemove() },
        ]);
    };
    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);
    return (
        <Container>
            <Header showBackButton />

            <Hightlight
                title={group}
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add" onPress={handleAddPlayer} />
            </Form>
            <HeaderList>
                <FlatList
                    data={teams}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handleRemovePlayer(item.name)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, flex: 1 }}
                ListEmptyComponent={() => (
                    <EmptyList message="Adicione jogadores" />
                )}
            />

            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </Container>
    );
};
