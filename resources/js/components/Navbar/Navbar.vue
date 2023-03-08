<template>
    <nav>
        <router-link v-for="menuItem in menuItems" :key="menuItem.link" :to="menuItem.link">
            <v-icon :icon="'mdi-' + menuItem.icon" size="x-large"></v-icon>
            <small>{{menuItem.name}}</small>
        </router-link>
        <div>
            <v-icon icon="mdi-menu" size="x-large"></v-icon>
            <small>Menu</small>
        </div>
    </nav>
</template>
<script src="./Navbar.ts" />
<style src="./Navbar.scss" lang="scss" />
