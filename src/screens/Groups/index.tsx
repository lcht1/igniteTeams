import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { FlatList } from "react-native";

import { groupsGetAll } from "@storage/group/groupsGetAll";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Hightlight } from "@components/Hightlight";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

import { Container } from "./styles";

export function Groups() {
    const [groups, setGroups] = useState([]);

    const navigation = useNavigation();

    const handleNewGroup = () => {
        navigation.navigate("new");
    };

    const fetchGroups = async () => {
        try {
            const data = await groupsGetAll();
            setGroups(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleOpenGroup = (group: string) => {
        navigation.navigate("players", { group });
    };

    useFocusEffect(
        useCallback(() => {
            fetchGroups();
        }, [])
    );
    return (
        <Container>
            <Header />
            <Hightlight title="Turmas" subtitle="Jogue com a sua turma" />
            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <EmptyList message="Que tal cadastrar a primeira turma?" />
                )}
            />
            <Button title="Criar nova turma" onPress={handleNewGroup} />
        </Container>
    );
}
