<template>
    <div>
        Default view
        <slot></slot>
        <navbar :menuItems="menuItems" class="navbar"></navbar>
    </div>
</template>

<script src="./Default.ts" />

<style src="./Default.scss" lang="scss" />
