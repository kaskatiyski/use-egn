<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useEgn } from '@/composables/useEgn'
import type { MaybeEgn } from '@/composables/useEgn'

interface Props {
    egn: MaybeEgn
}

const props = defineProps<Props>()

const data = computed(() => useEgn(props.egn))
</script>

<template>
    <slot v-bind="data" />
</template>