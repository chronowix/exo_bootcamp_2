<template>
  <!--si user introuvable dans localstorage-->
  <div v-if="error" class="text-red-600">⚠️ Utilisateur introuvable! Veuillez réessayer</div>
  <!--si user trouvé-->
  <div v-else>
    <h2 class="text-xl font-bold mb-2">{{ user?.name }}</h2>
    <p class="text-gray-700">{{ user?.email }}</p>
    <!--si user connecté-->
    <span v-if="isLoggedUser" class="bg-green-200 text-green-800 px-2 py-1 rounded-md text-sm">C'est moi! 👤</span>

    <!--sinon bouton contacter-->
    <button v-else @click="contactUser" class="bg-blue-500 text-white px-3 py-1 rounded-md mt-3">
      Contacter
    </button>

    <!--si user co, possible de modif le profil-->
    <button v-if="isLoggedUser && !isEdit" @click="editProfile"
            class="bg-yellow-500 text-white px-3 py-1 rounded-md mt-3 ml-2">
      Modifier mon profil
    </button>
    <div v-if="isEdit" class="mt-3 space-y-2">
      <input v-model="editedName" placeholder="Nom" class="border px-2 py-1 rounded w-full"/>
      <input v-model="editedMail" placeholder="Email" class="border px-2 py-1 rounded w-full"/>
      <div class="space-x-2">
        <button @click="saveProfile" class="bg-green-600 text-white px-3 py-1 rounded">Enregistrer</button>
        <button @click="isEdit = false" class="bg-gray-400 text-white px-3 py-1 rounded">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/userStore'
import { useUsers } from '~/composables/useUsers'
import type { User } from '~/types/user'

// props: config option in Vue, can pass data to the components via custom attributes to the component tag
const props = defineProps<{ userId?: string }>()

// Variables réactives
const user = ref<User | null>(null)
const error = ref(false)
const route = useRoute()

//store et composables
const userStore = useUserStore()
const { getUserById, loadUsers } = useUsers()

//userId venant de props OU route
const currentUserId = computed(() => props.userId || (route.params.userId as string))

//détermine si userId match le loggedUser du store
const isLoggedUser = computed<boolean>(() => userStore.loggedUser?.id === currentUserId.value);

//for editing user
const isEdit = ref(false);
const editedName = ref(user.value?.name || '');
const editedMail = ref(user.value?.email || '');


//charge user depuis store ou localstorage
const loadUser = (): void => {
  if (!currentUserId.value) {
    error.value = true
    return
  }

  // Load users from localStorage first
  loadUsers()

  // If loggedUser
  if (isLoggedUser.value) {
    user.value = userStore.loggedUser
    error.value = false
    return
  }

  // Otherwise, get user from localStorage
  const foundUser = getUserById(currentUserId.value)
  if (foundUser) {
    user.value = foundUser
    error.value = false
  } else {
    user.value = null
    error.value = true
  }
}

//actions de l'UI: contacter, modifier...
const contactUser = (): void => {
  alert(`Contacter ${user.value?.name}`);
}
const editProfile = (): void => {
  if (user.value) {
    //init form
    editedName.value = user.value.name;
    editedMail.value = user.value.email;
    isEdit.value = true;
  }
}

//function to save user profile after editing
const saveProfile = (): void => {
  if (!user.value) return;

  //update user
  user.value.name = editedName.value;
  user.value.email = editedMail.value;

  //update in pinia store
  userStore.setLoggedUser({ ...user.value })

  //update in localstorage
  const { users, saveUsers } = useUsers();
  loadUsers();
  const index = users.value.findIndex(u => u.id === user.value!.id);
  if (index !== -1) {
    users.value[index] = { ...user.value };
    saveUsers();
  }
  isEdit.value = false;
}

//recharge user quand le prop ou la route change
watch(() => currentUserId.value, loadUser, {immediate: true});

</script>

<style scoped>
span{
  display: inline-block;
  margin-top: 0.5rem;
}
button{
  cursor: pointer;
}
</style>
