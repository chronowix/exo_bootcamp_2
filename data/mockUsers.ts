import type { User } from '~/types/user'

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Alice Dupont',
        email: 'alice@example.com',
        password: '123456',
    },
    {
        id: '2',
        name: 'Bob Martin',
        email: 'bob@example.com',
        password: 'abcdef',
    },
    {
        id: '3',
        name: 'Charlie Durand',
        email: 'charlie@example.com',
        password: 'password123',
    },
    {
        id: '4',
        name: 'Diane Petit',
        email: 'diane@example.com',
        password: 'azerty',
    },
]