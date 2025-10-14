<template>
  <!-- TODO: Afficher le composant UserDetails avec l'userId -->
  <UserDetails :userId="userId" />
</template>

<script setup lang="ts">
import UserDetails from '../../components/userDetails.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.userId as string // TODO: récupérer l'id depuis la route
</script>