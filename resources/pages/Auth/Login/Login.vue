<template>
  <h1>Login</h1>
  <vue-form>
    <vue-input required>Email</vue-input>
    <vue-input required type="password">Password</vue-input>

    <template v-slot:footer>
        <vue-button>Login</vue-button>
        <small>
            <router-link to="/register">Dont have an account yet?</router-link>
        </small>
    </template>
  </vue-form>
</template>
<script src="./Login.ts" />
