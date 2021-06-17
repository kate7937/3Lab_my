<template>
    <div id="app">
        <div class="header">
            <div class="container">
                <div class="logo">Users in ({{ this.$store.getters.groupName}})</div>
                <div class="form">
                    <input id="fnInp" style="margin-right: 10px" type="text" placeholder="First name">
                    <input id="lnInp" style="margin-right: 10px" type="text" placeholder="Last name">
                    <input id="snInp" style="margin-right: 10px" type="text" placeholder="Second name">
                    <button class="btn" v-on:click="addNewStudent()" style="margin-left: 10px;">Add a new student</button>
                </div>
            </div>
        </div>
        <div class="container">
            <h2>
                <span>User List:</span>
                <span class="mask-num">{{ users.length }}</span>
            </h2>
            <ul class="mask-list">
                <li
                        :key="mask.id"
                        v-for="(mask, index) in users"
                >
                    <div>
                        <span>{{ mask.firstName }}  </span>
                        <span>{{ mask.lastName }}  </span>
                        <span>{{ mask.secondName }}</span>
                    </div>

                    <div>
                        <div style="float: right">
                            <button class="btn-remove" v-on:click="removeStudent(index, mask._id)">Remove</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "users",
        data() {
            return {
                users: []
            };
        },
        mounted() {
            axios.get("http://localhost:3000/user?groupId=" + this.$store.getters.groupId)
                .then(response => {
                    this.users = response.data;
                });
        },
        methods: {
            addNewStudent() {
                var firstName = document.getElementById("fnInp").value;
                var lastName = document.getElementById("lnInp").value;
                var secondName = document.getElementById("snInp").value;

                if (firstName !== '' && lastName !== '' && secondName !== '') {
                    axios.post("http://localhost:3000/user?firstName=" + firstName + "&lastName=" + lastName + "&secondName=" + secondName + "&groupId=" + this.$store.getters.groupId)
                        .then(response => {
                            this.users.push({
                                _id: response.data._id,
                                firstName: response.data.firstName,
                                lastName: response.data.lastName,
                                secondName: response.data.secondName,
                                groupId: response.data.groupId});
                        });
                }
            },
            removeStudent(index, id) {
                axios.delete("http://localhost:3000/user?_id=" + id)
                    .then((response) => {
                        if (response.data === true) {
                            this.users.splice(index, 1);
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>