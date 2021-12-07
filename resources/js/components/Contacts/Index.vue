<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Número</th>
                    <th scope="col"><a class="btn btn-success btn-sm" @click="createContact()"><i class="fa fa-add"></i></a></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(contact, idx) in contacts" :key="idx">
                    <th scope="row">{{ contact.id }}</th>
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.phoneNumber }}</td>
                    <td>
                        <a class="btn btn-primary btn-sm" @click="showContact(contact.id)"><i class="fa fa-eye"></i></a>
                        <a class="btn btn-secondary btn-sm" @click="editContact(contact.id)"><i class="fa fa-pencil"></i></a>
                        <a class="btn btn-danger btn-sm" @click="removeContact(contact.id)"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-modal>
            <component v-model="modalData" v-if="modalComponent !== null" v-bind:is="modalComponent"></component>
        </v-modal>
    </div>
</template>
<script>
import Modal from '../Common/Modal'
import Contact from './Contact'
import DeleteContact from './DeleteContact'

export default {
    name: "ContactIndex",
    components: {
        "v-modal": Modal,
        "v-contact": Contact,
        "v-confirm-delete" : DeleteContact
    },
    data: () => ({
        contacts: null,
        modalComponent: null,
        modalData: null
    }),
    async created() {
        this.$EventBus.$emit('setLoaderVisibility', true);
        this.contacts = (await this.axios.get('api/contacts')).data;
        this.$EventBus.$emit('setLoaderVisibility', false);
    },
    methods: {
        async createContact() {
            let contact = {name: "", phoneNumber: ""};
            contact.editable = true;
            this.modalData = contact;
            let data = {
                title: "Crear contacto",
                body: contact,
                action: {
                    title: "crear",
                    fn: this.saveContact
                },
                onCreated: () => {
                    this.modalComponent = "v-contact";
                }
            };

            this.$EventBus.$emit('showModal', data);
        },
        async showContact(id) {
            this.$EventBus.$emit('setLoaderVisibility', true);

            let contact = (await this.axios.get(`api/contacts/${id}`)).data;
            contact.editable = false;
            this.modalData = contact;
            let data = {
                title: "Ver contacto",
                body: contact,
                action: null,
                onCreated: () => {
                    this.$EventBus.$emit('setLoaderVisibility', false);
                    this.modalComponent = "v-contact";
                }
            };

            this.$EventBus.$emit('showModal', data);
        },
        async editContact(id) {
            this.$EventBus.$emit('setLoaderVisibility', true);

            let contact = (await this.axios.get(`api/contacts/${id}`)).data;
            contact.editable = true;
            this.modalData = contact;
            let data = {
                title: "Editar contacto",
                body: contact,
                action: {
                    title: "Guardar",
                    fn: this.updateContact
                },
                onCreated: () => {
                    this.$EventBus.$emit('setLoaderVisibility', false);
                    this.modalComponent = "v-contact";
                }
            };

            this.$EventBus.$emit('showModal', data);
        },
        async removeContact(id) {
            this.$EventBus.$emit('setLoaderVisibility', true);

            let content = {
                id,
                text: "¿Está seguro de borrar este registro?",
            }
            this.modalData = content;

            let data = {
                title: "Eliminar contacto",
                body: content,
                action: {
                    title: "Borrar",
                    fn: this.deleteContact
                },
                onCreated: () => {
                    this.$EventBus.$emit('setLoaderVisibility', false);
                    this.modalComponent = "v-confirm-delete";
                }
            };

            this.$EventBus.$emit('showModal', data);
        },
        async saveContact() {
            let contactInfo = {
                name: this.modalData.name,
                phoneNumber: this.modalData.phoneNumber
            };
            this.$EventBus.$emit('setLoaderVisibility', true);
            this.$EventBus.$emit('hideModal');
            await this.axios.post('api/contacts', contactInfo);
            this.contacts = (await this.axios.get('api/contacts')).data;
            this.$EventBus.$emit('setLoaderVisibility', false);

        },
        async updateContact() {
            let contactInfo = {
                name: this.modalData.name,
                phoneNumber: this.modalData.phoneNumber
            };
            this.$EventBus.$emit('setLoaderVisibility', true);
            this.$EventBus.$emit('hideModal');
            await this.axios.put(`api/contacts/${this.modalData.id}`, contactInfo);
            this.contacts = (await this.axios.get('api/contacts')).data;
            this.$EventBus.$emit('setLoaderVisibility', false);
        },
        async deleteContact() {
            this.$EventBus.$emit('setLoaderVisibility', true);
            this.$EventBus.$emit('hideModal');
            await this.axios.delete(`api/contacts/${this.modalData.id}`);
            this.contacts = (await this.axios.get('api/contacts')).data;
            this.$EventBus.$emit('setLoaderVisibility', false);
        },
    }
}
</script>
