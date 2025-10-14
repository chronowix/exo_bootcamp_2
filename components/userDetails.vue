<template>
  <div>
    <!-- TODO: afficher les infos du user
    Si c’est le loggedUser → afficher un badge "C’est moi"
    Sinon → afficher un bouton "Contacter"
    Afficher un bouton "Modifier mon profil" uniquement si c’est le loggedUser
    Afficher un message d’erreur si aucun utilisateur trouvé
    -->
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


const route = useRoute()
const userStore = useUserStore()
const { getUserById } = useUsers()

// Variables locales
const user = ref<User | null>(null)
const error = ref(false)


const isLoggedUser = computed<boolean>(() => {
  // TODO: Déterminer si le userId match le loggedUser du store
  return false
})


const loadUser = (): void => {
  /* TODO: Charger le bon utilisateur :
  Si userId === loggedUser.id → récupérer depuis le store
  Sinon → récup via useUsers().getUserById()
  Sinon → définir error.value = true si user introuvable*/
}

const contactUser = (): void => {
  // TODO: Ajouter la logique pour "Contacter" l'utilisateur
}

const editProfile = (): void => {
  // TODO: Ajouter la logique pour modifier le profil (naviguer vers une page ou ouvrir un modal)
}

// Lifecycle
onMounted(() => {
  // TODO: Appeler loadUser() au montage du composant
  loadUser()
})
</script>

<style scoped>
/* TODO: Styliser le composant (badge, bouton, erreur, etc.) */
</style>
