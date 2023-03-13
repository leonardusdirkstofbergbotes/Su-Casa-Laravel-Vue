<template>
    <admin-layout>
        <h1>Meals</h1>


        <vue-button v-on:click="openForm()">Create new</vue-button>
        <modal
            ref="foodForm"
            title="Create new meal"
            v-on:closed="resetForm()"
        >
            <div class="form">
                <input-file
                    v-model="image"
                    :initialImagePath="imagePath"
                    :error="errors.image"
                ></input-file>
                <vue-input v-model="name" :error="errors.name" required>Name</vue-input>
                <input-select v-model="categoryIds" multiple :error="errors.categoryIds" required :options="categoryOptions">Categories</input-select>
                <vue-input
                    type="textarea"
                    rows="4"
                    v-model="description"
                    :error="errors.description"
                    required
                    >Description</vue-input
                >
                <div class="dual-inputs">
                    <toggle v-model="active" required>Active</toggle>
                    <input-date
                        v-model="activeUntil"
                        :error="errors.activeUntil"
                        :disabled="!active"
                        >Activce until</input-date
                    >
                </div>
                <div class="dual-inputs">
                    <toggle v-model="promote" required>Promote</toggle>
                    <input-time v-model="dailyCutoffTime">Daily cutoff</input-time>
                </div>

                <vue-input v-model="eta" min="0" :error="errors.eta" type="number" required>ETA</vue-input>
                <vue-input v-model="price" min="0" type="number" :error="errors.price" required>Price</vue-input>
                <vue-input v-model="bulkBuyDiscount" min="0" max="100" type="number" :error="errors.bulkBuyDiscount" required>Bulk Buy Discount (%)</vue-input>
                <vue-input v-model="bulkBuyPortions" min="0" type="number" :error="errors.bulkBuyPortions" required>Bulk Buy Portions</vue-input>

            </div>

            <template v-slot:footer>
                <vue-button v-if="tempCategoryId == null" v-on:click="save()"
                    >Save</vue-button
                >
                <vue-button v-else v-on:click="updateCategory()">Update</vue-button>
                <small v-on:click="closeForm()">Cancel</small>
            </template>
        </modal>
        <div class="categories">
            <div class="category" v-for="category in categories" :key="category.id">
                <img :src="category.imagePath" />
                <div>
                    <h4>{{ category.name }}</h4>
                    <small>{{
                        category.description +
                        "fksldfjls djflsdjfl jslfj lksdjfl sdjlfj lskdjflksdjfkl jd fdsfsdf sdf sdf"
                    }}</small>
                </div>
                <div class="actions">
                    <span @click="editCategory(category)">Edit</span>
                    <v-icon
                        class="delete"
                        size="x-large"
                        icon="mdi-delete"
                        @click="deleteCategory(category.id)"
                    ></v-icon>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script src="./Meals.ts" />
<style lang="scss" src="./Meals.scss" />
