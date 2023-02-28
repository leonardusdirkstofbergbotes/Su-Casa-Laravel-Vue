<template>
  <h1>Login</h1>
  <vue-form>
    <vue-input v-model="email" :error="errors.email" required>Email</vue-input>
    <div class="custom-input">
        <vue-input v-model="password" :error="errors.password" required type="password">Password</vue-input>
        <span class="forgot-password">
            <router-link to="/forgot-password">Forgot Password?</router-link>
        </span>
    </div>

    <template v-slot:footer>
        <vue-button v-on:click="login()">Login</vue-button>
        <small>
            <router-link to="/register">Dont have an account yet?</router-link>
        </small>
    </template>
  </vue-form>
</template>

<script src="./Login.ts" />
<style src="./Login.scss" lang="scss" />

