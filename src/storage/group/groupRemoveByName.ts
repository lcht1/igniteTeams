import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION, GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export const groupRemoveByName = async (groupName: string) => {
    try {
        const storage = await groupsGetAll();
        const filtered = storage.filter((group) => group !== groupName);

        const groups = JSON.stringify(filtered);

        await AsyncStorage.setItem(GROUP_COLLECTION, groups);
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
    } catch (e) {
        throw e;
    }
};
