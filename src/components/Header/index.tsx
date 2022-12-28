import { BackIcon, Container, Logo, BackButon } from "./styles";
import logoImg from "../../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
    showBackButton?: boolean;
};

export const Header = ({ showBackButton = false }: Props) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate("groups");
    };
    return (
        <Container>
            {showBackButton && (
                <BackButon onPress={handleGoBack}>
                    <BackIcon />
                </BackButon>
            )}
            <Logo source={logoImg} />
        </Container>
    );
};
