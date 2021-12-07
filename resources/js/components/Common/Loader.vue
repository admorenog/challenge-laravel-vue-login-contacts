<template>
    <div v-if="show" class="loader fa-3x">
        <i class="fa fa-cog fa-spin"></i>
    </div>
</template>

<script>
export default {
    name: "Loader",
    data: () => ({
        show: false,
    }),
    created() {
        let self = this;
        this.$EventBus.$on('setLoaderVisibility', function (visibility) {
            self.show = visibility;
        });
    }
}
</script>

<style scoped>
.loader {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding-left: 45%;
    padding-top: 45%;
    background-color: #ffffff99;
}
</style>
