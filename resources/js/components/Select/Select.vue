<template>
    <div class="form-input" v-bind:class="{ disabled: disabled }" ref="selectWrapper">
        <label>
            <slot></slot>
            <span class="indicator-required" v-if="required">*</span>
            <small class="indicator-optional" v-else>(optional)</small>
            <tooltip-icon v-if="tooltipText">{{ tooltipText }}</tooltip-icon>
        </label>
        <div class="select--wrapper">
            <div class="select" v-bind:class="{ error: error != '' }" @click="determinePosition($event.target)">
                <v-icon :icon="showDropdown ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="select-icon" size="small"></v-icon>
                <div v-if="multiple" class="pill--wrapper">
                    <span v-for="value in modelValue" class="pill">
                        {{ getLabel(value) }}
                        <v-icon icon="mdi-close" @click="removeItem(value)" size="small"></v-icon>
                    </span>
                </div>
                <span v-else class="placeholder"></span>
            </div>
            <div class="select-dropdown" ref="selectDropdown" :class="{ open: showDropdown }">
                <span class="disabled" :innerText="'Select one' + (multiple ? ' or more' : '')"></span>
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
