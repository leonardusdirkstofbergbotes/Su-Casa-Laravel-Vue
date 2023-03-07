<template>
    <div>
        <div class="placeholder-image">
            <v-icon v-if="previewUrl == null" icon="mdi-image" @click="$refs.fileInput.click()"></v-icon>

            <img
                v-else
                :src="previewUrl"
                @click="$refs.fileInput.click()" />

            <small class="error-message" v-if="error != ''">{{error}}</small>
        </div>

        <input ref="fileInput" @input="pickFile($event.target.files)" type="file" />
    </div>
  </template>
  <script src="./InputFile.ts" />
  <style scoped src="./InputFile.scss" lang="scss" />
