<template>
  <UserDetails :userId="userId" />
</template>

<script setup lang="ts">
import UserDetails from '../../components/userDetails.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.userId as string //récupère l'id depuis la route
</script>