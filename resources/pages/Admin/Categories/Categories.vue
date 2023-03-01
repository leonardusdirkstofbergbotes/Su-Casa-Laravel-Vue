<template>
    <h1>Categories</h1>
    <vue-button v-on:click="$refs.categoryForm.show = true">Create new</vue-button>
    <modal ref="categoryForm"></modal>
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
