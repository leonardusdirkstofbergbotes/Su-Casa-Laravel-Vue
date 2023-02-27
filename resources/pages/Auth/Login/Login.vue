<template>
  <h1> Login page</h1>
  <vue-form>
    <vue-input required>Email</vue-input>
    <vue-input type="password">Password</vue-input>
    <router-link to="/register">Dont have an account yet?</router-link>
    <template v-slot:footer>
        <vue-button>Login</vue-button>
    </template>
  </vue-form>
</template>
<script src="./Login.ts" />
