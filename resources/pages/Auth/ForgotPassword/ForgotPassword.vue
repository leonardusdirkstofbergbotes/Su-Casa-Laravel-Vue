<template>
    <h1>Reset Password</h1>
    <vue-form>
        <vue-input required>Email</vue-input>

        <template v-slot:footer>
            <vue-button>Reset Password</vue-button>
            <small>
                <router-link to="/login">Back to login</router-link>
            </small>
        </template>
    </vue-form>
</template>
<script src="./ForgotPassword.ts" />
<style lang="scss" src="./ForgotPassword.scss" />
