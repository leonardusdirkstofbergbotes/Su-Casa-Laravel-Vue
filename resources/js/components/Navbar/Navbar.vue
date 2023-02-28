<template>
    <nav>
        <router-link to="/browse">
            <v-icon icon="mdi-home" size="x-large"></v-icon>
            <small>Home</small>
        </router-link>
        <router-link to="/food">
            <v-icon icon="mdi-food" size="x-large"></v-icon>
            <small>Food</small>
        </router-link>
        <router-link to="/cart">
            <v-icon icon="mdi-cart" size="x-large"></v-icon>
            <small>Cart</small>
        </router-link>
        <div>
            <v-icon icon="mdi-menu" size="x-large"></v-icon>
            <small>Menu</small>
        </div>
    </nav>
</template>
<script src="./Navbar.ts" />
<style src="./Navbar.scss" lang="scss" />
