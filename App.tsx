import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { ActivityIndicator } from "react-native";

import { Groups } from "@screens/Groups";
import { Loading } from "@components/Loading";

import theme from "./src/theme";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";
import { Routes } from "./src/routes";

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? <Routes /> : <Loading />}
        </ThemeProvider>
    );
}
