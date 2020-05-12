

<template>
    <v-snackbar
        v-model="notice.show"
        :bottom="y === 'bottom'"
        :color="notice.color"
        :left="x === 'left'"
        :right="x === 'right'"
        :timeout="notice.timeout"
        :top="y === 'top'"
        :vertical="notice.mode"
        >
        {{ notice.text }}
        <v-btn
            dark
            text
            @click="notice.show = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script lang="ts">
    import Vue from 'vue'
import { AppModule } from '@/store/modules/app'

    export default Vue.extend({
        data() {
            return {
                color: '',
                mode: '',
                snackbar: false,
                text: 'Hello, I\'m a snackbar',
                timeout: 2000,
                x: null,
                y: 'top',
            }
        },
        computed: {
            notice() {
                return AppModule.notification;
            }
        },

    })
</script>

<style scoped>

</style>

