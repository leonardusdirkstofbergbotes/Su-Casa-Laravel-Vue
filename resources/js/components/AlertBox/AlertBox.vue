<template>
    <div class="alert-box">
        <span>dsdsdsdsd</span>
        <v-icon icon="mdi-close" v-on:click="show = false; $emit('closed')"></v-icon>
    </div>
</template>

<script src="./AlertBox.ts" />
<style lang="scss" src="./AlertBox.scss" />
