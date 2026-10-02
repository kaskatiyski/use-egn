<script setup lang="ts">
import { computed } from 'vue'
import { useEgn } from '@/composables/useEgn'
import type { MaybeEgn } from '@/composables/useEgn'

interface Props {
    egn: MaybeEgn
}

const props = defineProps<Props>()

const getEgn = computed(() => props.egn)

const { isValid, birthday, isMale, isFemale } = useEgn(getEgn)
</script>

<template>
    <slot
        :is-valid="isValid"
        :birthday="birthday"
        :is-male="isMale"
        :is-female="isFemale"
    />
</template>
