<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold mb-4">👥 Gestion des utilisateurs</h1>
    <section class="p-4 border rounded-lg">
      <h2 class="text-xl font-semibold mb-2">🔒 Connexion</h2>
      <p>
        <strong>Utilisateur connecté :</strong>
        <span v-if="userStore.loggedUser">{{ userStore.loggedUser.name }}</span>
        <span v-else>Aucun</span>
      </p>

      <div v-if="!userStore.loggedUser" class="space-y-2 mt-2">
        <input v-model="email" placeholder="Email" class="border px-2 py-1 rounded w-full"/>
        <input v-model="password" type="password" placeholder="Mot de passe" class="border px-2 py-1 rounded w-full"/>
        <button @click="login" class="bg-green-600 text-white px-3 py-1 rounded w-full">
          Se connecter
        </button>
        <p v-if="error" class="text-red-600">{{ error }}</p>
      </div>

      <div v-else class="mt-3 space-x-2">
        <button @click="disconnectUser" class="bg-red-600 text-white px-3 py-1 rounded">
          Se déconnecter
        </button>
      </div>
    </section>

    <section class="p-4 border rounded-lg">
      <h2 class="text-xl font-semibold mb-2">➕ Ajouter un utilisateur</h2>

      <input v-model="newUser.name" placeholder="Nom" class="border px-2 py-1 rounded w-full mb-2" />
      <input v-model="newUser.email" placeholder="Email" class="border px-2 py-1 rounded w-full mb-2" />
      <input v-model="newUser.password" type="password" placeholder="Mot de passe" class="border px-2 py-1 rounded w-full mb-2" />

      <button @click="addNewUser" class="bg-green-500 text-white px-3 py-1 rounded w-full">
        Ajouter
      </button>

      <p v-if="addMessage" class="text-green-600 mt-2">{{ addMessage }}</p>
    </section>

    <!--user list-->
    <section class="p-4 border rounded-lg">
      <h2 class="text-xl font-semibold mb-2">📋 Liste des utilisateurs</h2>
      <button @click="loadAllUsers" class="bg-blue-600 text-white px-3 py-1 rounded">
        Charger les utilisateurs
      </button>

      <div v-if="users.length" class="mt-3 space-x-2">
        <button v-for="u in users" :key="u.id" @click="selectedId = u.id"
                class="bg-gray-200 px-2 py-1 rounded">
          {{ u.name }}
        </button>
      </div>

      <ul v-if="users.length" class="mt-3 list-disc list-inside">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </section>

    <!--détail du user-->
    <section class="p-4 border rounded-lg">
      <h2 class="text-xl font-semibold mb-2">ℹ️ Détail de l'utilisateur</h2>

      <label class="block mb-2">ID utilisateur à afficher :</label>
      <input
          v-model="selectedId"
          placeholder="Ex: 1, 2, 3..."
          class="border px-2 py-1 rounded"
      />
      <UserDetails v-if="selectedId" :user-id="selectedId" class="mt-4" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { useUsers } from '~/composables/useUsers'
import userDetails from '../components/userDetails.vue'

//pinia store
const userStore = useUserStore()

//compasable
const { users, loadUsers, addUser } = useUsers();
loadUsers();

//local state
const selectedId = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

//new user and adding user logics
const newUser = ref({
  name: '',
  email: '',
  password: '',
})

const addMessage = ref('')

const addNewUser = () => {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.password) {
    addMessage.value = 'Veuillez remplir tous les champs requis';
    return;
  }

  const newId = (users.value.length +1).toString();
  const user = {
    id: newId,
    name: newUser.value.name,
    email: newUser.value.email,
    password: newUser.value.password,
  }

  addUser(user)
  addMessage.value = `Utilisateur ${user.name} ajouté! 🗸`

  newUser.value = { name: '', email: '', password: '' }
  loadUsers();
}

//charge les users du localStorage
const loadAllUsers = () => {
  loadUsers()
}

// ✅ Fonction login mock
const login = () => {
  loadUsers() // s'assurer que users est chargé
  const found = users.value.find(u => u.email === email.value && u.password === password.value);
  if (found) {
    userStore.setLoggedUser(found);
    selectedId.value = found.id;
    error.value = ''
  } else {
    error.value = "Email ou mot de passe incorrect"
  }
}

const disconnectUser = () => {
  userStore.clearLoggedUser()
  selectedId.value = '';
  email.value = '';
  password.value = '';
  error.value = '';
}
</script>

<style scoped>
section {
  background: #f9fafb;
}
input {
  display: block;
}
h1, h2,p, label, button, li{
font-family: "JetBrains Mono", serif;
}
</style>
