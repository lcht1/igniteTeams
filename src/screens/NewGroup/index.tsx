import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Hightlight } from "@components/Hightlight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";

export const NewGroup = () => {
    const navigation = useNavigation();

    const [nameGroup, setNameGroup] = useState("");
    const handleNewGroup = async () => {
        try {
            if (nameGroup.trim().length === 0) {
                return Alert.alert(
                    "Novo grupo",
                    "Não foi possível criar um novo grupo"
                );
            }
            await groupCreate(nameGroup);
            navigation.navigate("players", { group: nameGroup });
        } catch (e) {
            console.log(e);
            if (e instanceof AppError) {
                Alert.alert("Novo grupo", e.message);
            } else {
                Alert.alert(
                    "Novo grupo",
                    "Não foi possível criar um novo grupo"
                );
            }
        }
    };
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />

                <Hightlight
                    title="Nova Turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />
                <Input
                    placeholder="Nome da turma"
                    onChangeText={setNameGroup}
                />
                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleNewGroup}
                />
            </Content>
        </Container>
    );
};
