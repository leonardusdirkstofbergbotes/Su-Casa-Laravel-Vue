<template>
    <h1>Categories</h1>
    <vue-button v-on:click="openCreateForm()">Create new</vue-button>
    <modal ref="categoryForm" title="Create new category">
            <div>
                <vue-input v-model="name" required>Name</vue-input>
                <vue-input v-model="description" required>Description</vue-input>
                <vue-input v-model="active" required>Active</vue-input>
                <vue-input v-model="activeUntil" required>Activce until</vue-input>
                <vue-input v-model="dailyCutoffTime" required>Daily cutoff</vue-input>
                <vue-input v-model="promote" required>Promote</vue-input>
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
