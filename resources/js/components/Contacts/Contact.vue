<template>
    <form>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Nombre:</label>
            <input @input="updateData('name', $event.target.value)" :value="value.name" :disabled="!value.editable" type="text" class="form-control" id="recipient-name">
        </div>
        <div class="form-group">
            <label for="message-text" class="col-form-label">Número de teléfono:</label>
            <input @input="updateData('phoneNumber', $event.target.value)" :value="value.phoneNumber" :disabled="!value.editable" class="form-control" id="message-text"/>
        </div>
    </form>
</template>

<script>
export default {
    name: "Contact",
    props: ['value'],
    methods: {
        updateData(key, value) {
            this.$emit('input', { ...this.value, [key]: value })
        }
    }
}
</script>
