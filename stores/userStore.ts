import { defineStore } from 'pinia';
import type { User } from '../types/user';

export const useUserStore = defineStore('user', {
    state: () => ({
        loggedUser: null as User | null, //todo: stocker ici le user connecté
    }),

    getters: {
    //todo: ajouter getters (isConnected, nom complet...)

    },

    actions: {
        setLoggedUser: (user: User) => {
            //TODO: stocker le user connecté dans le state
        },
        clearLoggedUser: () => {
            //todo: réinit le loggedUser à null
        },
    },
})