import { ref } from 'vue'
import type { User } from '~/types/user'
import { mockUsers } from '~/data/mockUsers'

const STORAGE_KEY = 'users'

export const useUsers = () => {
    const users = ref<User[]>([])

    //charge les users depuis le localStorage
    const loadUsers = (): void => {
        if (process.client) { // ✅ only run in browser
            const storedUsers = localStorage.getItem(STORAGE_KEY)
            if (storedUsers) {
                users.value = JSON.parse(storedUsers)
            } else {
                users.value = mockUsers
                saveUsers()
            }
        }
    }

    //sauvegarde les users dans le localStorage
    const saveUsers = (): void => {
        if (process.client) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value))
        }
    }

    //recherche un user par son ID
    const getUserById = (id: string): User | null => {
        return users.value.find(user => user.id === id) || null
    }

    //ajoute nouveau user
    const addUser = (user: User): void => {
        users.value.push(user)
        saveUsers()
    }

    //maj d'un user existant dans le localStorage
    const updateUser = (updatedUser: User): void => {
        const index = users.value.findIndex(user => user.id === updatedUser.id)
        if (index !== -1) {
            users.value[index] = updatedUser
            saveUsers()
        }
    }

    return {
        users,
        loadUsers,
        saveUsers,
        getUserById,
        addUser,
        updateUser,
    }
}
