<template>
    <div>
        <div class="placeholder-image" >
            <v-icon v-if="previewUrl == null" icon="mdi-image" @click="$refs.fileInput.click()"></v-icon>
            <div
                v-else
                class="preview-image"
                :style="{ 'background-image': `url(${previewUrl})` }"
                @click="$refs.fileInput.click()">
            </div>
        </div>

        <input ref="fileInput" @input="pickFile($event.target.files)" type="file" />
    </div>
  </template>
  <script src="./InputFile.ts" />
  <style scoped src="./InputFile.scss" lang="scss" />
