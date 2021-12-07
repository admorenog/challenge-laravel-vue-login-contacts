<template>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 v-if="data.title !== null" class="modal-title">{{ data.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot :data="data.body" :editable="editable"></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button v-if="data.action !== null" type="button" class="btn btn-primary" @click="data.action.fn">{{ data.action.title }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    data: () => ({
        editable: false,
        data: {
            title: null,
            body: null,
            action: null,
            onCreated: null,
        },
    }),
    created() {
        let self = this;
        this.$EventBus.$on('showModal', function (data) {
            self.data = data;
            $(self.$refs.modal).modal("show");
            this.$nextTick(() => {
                if(data.onCreated !== null) {
                    data.onCreated();
                }
            });
        });
        this.$EventBus.$on('hideModal', function () {
            $(self.$refs.modal).modal("hide");
        });
    }
}
</script>

<style scoped>

</style>
