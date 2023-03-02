<template>
    <div class="form-input" v-bind:class="{ disabled: disabled }">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
        </label>
        <textarea v-if="type == 'textarea'" v-bind:rows="rows" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
        <input v-else v-bind:disabled="disabled" v-bind:type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <small class="error-message" v-if="error != ''">{{error}}</small>
    </div>
  </template>
  <script src="./Input.ts" />
  <style src="./Input.scss" lang="scss" />
