<template>
    <div class="alert-box" v-if="alert" :class="alert.type">
        <span>{{alert.message}}</span>
        <v-icon icon="mdi-close" v-on:click="closeMessage()"></v-icon>
    </div>
</template>

<script src="./AlertBox.ts" />
<style lang="scss" src="./AlertBox.scss" />
