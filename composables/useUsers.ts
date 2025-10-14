import type { User } from '../types/user';
import { ref } from 'vue';

export const useUsers = () => {
    const users = ref<User[]>([]); //todo: stocker les users du localStorage

    const loadUsers = (): void => {
        //charge la liste des users depuis le localStorage
        const storedUsers = localStorage.getItem('users'); //getItem va chercher l'élément
        if (storedUsers) {
            users.value = JSON.parse(storedUsers);
        } else {
            users.value = [];
        }
    }

    const getUserById = (id: string): User | null => {
        //recherche un user par son ID
        const user = users.value.find((user) => user.id === id); //pour récup un élément spécifique, utiliser .value.find
        return user || null;
    }

    const saveUsers = (): void => {
        //sauvegarde la liste des users dans le localStorage
        localStorage.setItem('users', JSON.stringify(users.value));
    }

    const addUser = (user: User): void => {
        //todo: ajouter le nouveau user dans le localStorage
        users.value.push(user);
        saveUsers();
    }

    return {
        users,
        getUserById,
        loadUsers,
        saveUsers,
        addUser,
    }
}