<template>
    <h1>Categories</h1>
    <vue-button v-on:click="openCreateForm()">Create new</vue-button>
    <modal ref="categoryForm" title="Create new category">
            <div class="form">
                <input-file v-model="image" :error="errors.image"></input-file>
                <vue-input v-model="name" :error="errors.name" required>Name</vue-input>
                <vue-input type="textarea" rows="4" v-model="description" :error="errors.description" required>Description</vue-input>
                <div class="dual-inputs">
                    <toggle v-model="active" required>Active</toggle>
                    <input-date v-model="activeUntil" :error="errors.activeUntil" :disabled="!active">Activce until</input-date>
                </div>
                <div class="dual-inputs">
                    <toggle v-model="promote" required>Promote</toggle>
                    <input-time v-model="dailyCutoffTime">Daily cutoff</input-time>
                </div>
            </div>

            <template v-slot:footer>
                <vue-button v-on:click="save()">Save</vue-button>
                <small v-on:click="closeForm()">Cancel</small>
        </template>
    </modal>
    <div class="categories">
        <div class="category" v-for="category in categories.data" :key="category.id">
            <img :src="category.imagePath" />
            <div>
                <h4>{{ category.name }}</h4>
                <small>{{ category.description + 'fksldfjls djflsdjfl jslfj lksdjfl sdjlfj lskdjflksdjfkl jd fdsfsdf sdf sdf' }}</small>
            </div>
        </div>
    </div>
</template>

<script src="./Categories.ts" />
<style lang="scss" src="./Categories.scss" />
