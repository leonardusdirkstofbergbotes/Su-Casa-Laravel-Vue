<template>
    <div>
        <v-icon icon="mdi-help-circle" class="tooltip-icon" size="small"></v-icon>
        <v-tooltip activator="parent" location="top">
            <slot></slot>
        </v-tooltip>
    </div>
</template>

<script src="./TooltipIcon.ts" />
<style lang="scss" src="./TooltipIcon.scss" />
