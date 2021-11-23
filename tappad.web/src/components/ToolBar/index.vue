<template>
    <v-card>
        <v-toolbar
        flat
        height="64"
        color="accent"
        class="d-flex pa-2 align-self-center justify-end mb-6">
            <v-switch
                v-model="$vuetify.theme.dark"
                inset
                label="Dark mode"
                persistent-hint
            ></v-switch>
        </v-toolbar>
    </v-card>
</template>

<script>
export default {
        name: 'Toolbar',
        data: () => ({
        })
}
</script>