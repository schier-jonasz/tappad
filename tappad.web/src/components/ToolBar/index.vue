<template>
    <v-toolbar
    dense
    elevation=1
    class="d-flex pa-3 align-self-center justify-end mb-6">
        <v-switch
            v-model="$vuetify.theme.dark"
            inset
            label="Dark mode"
            persistent-hint
        ></v-switch>
    </v-toolbar>
</template>

<script>
export default {
        name: 'Toolbar',
        data: () => ({
        })
}
</script>