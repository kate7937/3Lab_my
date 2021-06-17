<template>
    <div id="app">
        <div class="header">
            <div class="container">
                <div class="logo">Groups</div>
                <div class="form">
                    <input
                            type="text"
                            v-bind:value="valueInput"
                            v-on:input="handleInput"
                            v-on:keypress.enter="addNewGroup"
                            placeholder="Group name"
                    >
                    <button class="btn" v-on:click="addNewGroup" style="margin-left: 10px">Add a new group</button>
                </div>
            </div>
        </div>
        <div class="container">
            <h2>
                <span>Group List:</span>
                <span class="mask-num">{{ groups.length }}</span>
            </h2>
            <ul class="mask-list">
                <li
                        :key="mask.id"
                        v-for="(mask, index) in groups"
                >
                    <div>
                        <span>{{ mask.name }}</span>
                    </div>

                    <div>
                        <div style="float: left; margin-right: 10px">
                            <button class="btn-open" v-on:click="openGroup(mask.id, mask.name)">Open</button>
                        </div>

                        <div style="float: right">
                            <button class="btn-remove" v-on:click="removeGroup(index, mask.id)">Remove</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import router from "@/router";

    var groups = [];

    axios.get("http://localhost:3000/group")
        .then(response => {
            response.data.forEach((td) => {
                groups.push({
                    id: td._id,
                    name: td.name
                });
            });
        });

    export default {
        name: 'groups',
        data() {
            return {
                valueInput: '',
                groups: groups
            };
        },
        methods: {
            handleInput(event) {
                this.valueInput = event.target.value;
            },
            addNewGroup() {
                if (this.valueInput !== '') {
                    axios.post("http://localhost:3000/group?name=" + this.valueInput)
                        .then(response => {
                            this.groups.push({
                                id: response.data._id,
                                name: response.data.name
                            });
                            this.valueInput = '';
                        });
                }
            },
            removeGroup(index, id) {
                axios.delete("http://localhost:3000/group?_id=" + id)
                    .then((response) => {
                        if (response.data === true) {
                            groups.splice(index, 1);
                        }
                    });
            },
            openGroup(id, name) {
                router.push("/users");
                this.$store.commit('changeGroupId', id);
                this.$store.commit('changeGroupName', name);
            }
        }
    }
</script>


<style scoped>

</style>

