<template>
    <div class="form-input" v-bind:class="{ disabled: disabled }">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
        </label>
        <div class="select--wrapper">
            <div class="select" v-bind:class="{ error: error != '' }" @click="$refs.selectDropdown.classList.toggle('open')">
                <div v-if="multiple" class="pill--wrapper">
                    <span v-for="value in modelValue" class="pill">
                        {{ getLabel(value) }}
                        <v-icon icon="mdi-close" @click="removeItem(value)" size="small"></v-icon>
                    </span>
                </div>
                <span v-else class="placeholder"></span>
            </div>
            <div class="select-dropdown" ref="selectDropdown">
                <span class="disabled">Select one</span>
                <span v-for="option in options" :key="option.value" @click="toggleItem(option)" :class="{ selected : itemIsSelected(option.value) }">
                    <!-- <v-icon icon="mdi-check" v-if="itemIsSelected(option.value)" size="x-small"></v-icon> -->
                    {{ option.label }}
                </span>
            </div>
        </div>
        <small class="error-message" v-if="error != ''">{{error}}</small>
    </div>
  </template>
  <script src="./Select.ts" />
  <style src="./Select.scss" lang="scss" />
