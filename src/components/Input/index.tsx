import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { Container } from "./styles";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;
};

export const Input = ({ inputRef, ...rest }: Props) => {
    return <Container {...rest} ref={inputRef} />;
};
