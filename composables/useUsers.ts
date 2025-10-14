import type { User } from '../types/user';
import { ref } from 'vue';

export const useUsers = () => {
    const users = ref<User[]>([]); //todo: stocker les users du localStorage

    const loadUsers = (): void => {
        //todo: charger la liste des users depuis le localStorage
        JSON.parse(JSON.stringify(users));
    }

    const getUserById = (id: string): User | null => {
        //todo: rechercher un user par son ID
        return users.findById(id)
        return null }

    const saveUsers = (): void => {
        //todo: sauvegarder la liste des users dans le localStorage
    }

    const addUser = (user: User): void => {
        //todo: ajouter le nouveau user dans le localStorage
    }

    return {
        users,
        getUserById,
        loadUsers,
        saveUsers,
        addUser,
    }
}