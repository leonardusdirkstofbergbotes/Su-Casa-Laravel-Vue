<template>
    <div class="wrapper" v-show="show">
        <div class="overlay"></div>

        <div class="modal" v-bind:class="{ show : show }">
            <div class="modal__header" v-if="title != ''">
                <div class="modal__header-fader"></div>
                <h3>{{ title }}</h3>
                <v-icon icon="mdi-close" v-on:click="show = false; $emit('closed')"></v-icon>
            </div>

            <div class="modal__content">
                <slot></slot>
            </div>

            <div class="modal__footer">
                <div class="modal__footer-fader"></div>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script src="./Modal.ts" />
<style lang="scss" src="./Modal.scss" />
