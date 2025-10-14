<template>
  <div v-if="!error">
    <h2 class="text-xl font-bold mb-2">{{user?.name}}</h2>
    <p class="text-gray-700">{{user?.email}}</p>
    <!--Si loggedUser-->
    <span v-if="isLoggedUser" class="bg-green-200 text-green-800 px-2 py-1 rounded-md text-sm">C'est moi! 👤</span>
    <!--Sinon, contacter-->
    <button v-else @click="contactUser" class="bg-blue-500 text-white px-3 py-1 rounded-md mt-3">Contacter</button>
    <!--Si loggedUser, possibilité de modif le profil-->
    <button v-if="isLoggedUser" @click="editProfile" class="bg-yellow-500 text-white px-3 py-1 rounded-md mt-3 ml-2">Modifier mon profil</button>
    <!--Si erreur-->
    <div v-else class="text-red-600">⚠️ Utilisateur introuvable! Veuillez réessayer</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useUsers } from '../composables/useUsers'
import type { User } from '../types/user'

// props: config option in Vue, can pass data to the components via custom attributes to the component tag
const props = defineProps<{
  userId?: string
}>()

// Variables réactives
const user = ref<User | null>(null)
const error = ref(false)
const route = useRoute()

//store et composables
const userStore = useUserStore()
const { getUserById, loadUsers } = useUsers()

//userId venant de props OU route
const currentUserId = computed(() => props.userId || (route.params.userId as string))

const isLoggedUser = computed<boolean>(() => {
  //Détermine si userId match le loggedUser du store
  return userStore.loggedUser?.id === currentUserId.value
});

const loadUser = (): void => {
  //charge le user
  if(!currentUserId.value) {
    error.value = true
    return;
  }
  //Si loggedUser
  if (isLoggedUser.value) {
    user.value = userStore.loggedUser
    return;
  }
  //Sinon, chercher loggedUser dans localStorage
  const foundUser = getUserById(currentUserId.value)
  if (foundUser) {
    user.value = foundUser
  } else {
    error.value = true
  }
}

//actions de l'UI: contacter, modifier...
const contactUser = (): void => {
  alert(`Contacter ${user.value?.name}`);
}
const editProfile = (): void => {
  alert(`Modifier le profil ${user.value?.name}`);
}

onMounted(() => {
  // TODO: Appeler loadUser() au montage du composant
  loadUser()
})
</script>

<style scoped>
/* TODO: Styliser le composant (badge, bouton, erreur, etc.) */
</style>
