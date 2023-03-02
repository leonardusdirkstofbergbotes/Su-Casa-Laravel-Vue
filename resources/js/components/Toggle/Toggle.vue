<template>
    <div class="form-input">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
        </label>
        <div class="toggle" v-on:click="$emit('update:modelValue', !modelValue)">
            <div class="slider" v-bind:class="{ active : modelValue }">
                <div class="switch">
                    <v-icon :icon="modelValue ? 'mdi-check' : 'mdi-close'" size="small"></v-icon>
                </div>
            </div>
        </div>
    </div>
  </template>

  <script src="./Toggle.ts" />
  <style lang="scss" src="./Toggle.scss" />
