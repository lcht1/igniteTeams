import { Text } from "react-native";
import { Container, LoadIndicator } from "./styles";
export const Loading = () => {
    return (
        <Container>
            <LoadIndicator color="red" />
        </Container>
    );
};
