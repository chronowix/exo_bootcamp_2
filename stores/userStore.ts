import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        loggedUser: null as User | null,
    }),

    getters: {
        isConnected: (state): boolean => {
            return state.loggedUser !== null
        },

        fullName: (state): string => {
            return state.loggedUser?.name || ''
        },
    },

    actions: {
        setLoggedUser(user: { id: string; name: string; email: string; password: string }) {
            this.loggedUser = user
        },

        clearLoggedUser() {
            this.loggedUser = null
        },
    },
})
