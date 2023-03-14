<template>
    <div class="form-input" v-bind:class="{ disabled: disabled }">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
            <tooltip-icon v-if="tooltipText">{{ tooltipText }}</tooltip-icon>
        </label>
        <input :class="{error : error != ''}" :min="min" :max="max" id="dateInput" type="date" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <small class="error-message" v-if="error != ''">{{error}}</small>
    </div>
  </template>
  <script src="./InputDate.ts" />
  <style src="./InputDate.scss" lang="scss" />
