import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storageConfig";

import { groupsGetAll } from "./groupsGetAll";

export const groupCreate = async (newGroupName: string) => {
    try {
        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroupName);

        if (groupAlreadyExists) {
            throw new AppError("Já existe um grupo cadastrado com esse nome");
        } else {
            const storage = JSON.stringify([...storedGroups, newGroupName]);
            await AsyncStorage.setItem(GROUP_COLLECTION, storage);
        }
    } catch (e) {
        throw e;
    }
};
