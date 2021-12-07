<template>
    <div>
        {{ value.text }}
    </div>
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
