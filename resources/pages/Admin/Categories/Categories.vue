<template>
    <h1>Categories</h1>
    <vue-button v-on:click="openCreateForm()">Create new</vue-button>
    <modal ref="categoryForm" title="Create new category">
            <div class="form">
                <vue-input v-model="name" required>Name</vue-input>
                <vue-input type="textarea" rows="4" v-model="description" required>Description</vue-input>
                <div class="dual-inputs">
                    <toggle v-model="active" required>Active</toggle>
                    <input-date v-model="activeUntil" :disabled="!active">Activce until</input-date>
                </div>
                <div class="dual-inputs">
                    <toggle v-model="promote" required>Promote</toggle>
                    <input-time v-model="dailyCutoffTime">Daily cutoff</input-time>
                </div>
            </div>

            <template v-slot:footer>
                <vue-button v-on:click="register()">Save</vue-button>
                <small v-on:click="closeForm()">Cancel</small>
        </template>
    </modal>
    <!-- <v-table>
        <thead>
            <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">imagePath</th>
                <th class="text-left">active</th>
                <th class="text-left">activeUntil</th>
                <th class="text-left">dailyCutoffTime</th>
                <th class="text-left">promote</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.description }}</td>
            </tr>
            <tr v-if="categories.length == 0">
                <td colspan="100%">
                    No results found
                </td>
            </tr>
        </tbody>
    </v-table> -->
</template>

<script src="./Categories.ts" />
<style lang="scss" src="./Categories.scss" />
