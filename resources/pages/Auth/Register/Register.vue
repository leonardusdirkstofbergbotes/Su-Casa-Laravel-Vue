<template>
    <h1>Register</h1>
    <vue-form>
        <vue-input v-model="name" :error="errors.name" required>Name</vue-input>
        <vue-input v-model="email" :error="errors.email" required>Email</vue-input>
        <vue-input v-model="password" :error="errors.password" required type="password">Password</vue-input>

        <template v-slot:footer>
            <vue-button v-on:click="register()">Register</vue-button>
            <small>
                <router-link to="/login">Already have an account?</router-link>
            </small>
        </template>
    </vue-form>

</template>
<script src="./Register.ts" />
<style src="./Register.scss" lang="scss" />
