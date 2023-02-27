<template>
    <div class="form-input">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
        </label>
        <input v-bind:type="type" />
        <small class="error-message" v-if="error != ''">Error</small>
    </div>
  </template>
  <script src="./Input.ts" />
  <style src="./Input.scss" lang="scss" />
