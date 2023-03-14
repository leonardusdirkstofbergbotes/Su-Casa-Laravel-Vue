<template>
    <div class="form-input" v-bind:class="{ disabled: disabled }">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
            <tooltip-icon v-if="tooltipText">{{ tooltipText }}</tooltip-icon>
        </label>
        <input type="time" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <small class="error-message" v-if="error != ''">{{error}}</small>
    </div>
  </template>
  <script src="./InputTime.ts" />
  <style src="./InputTime.scss" lang="scss" />
