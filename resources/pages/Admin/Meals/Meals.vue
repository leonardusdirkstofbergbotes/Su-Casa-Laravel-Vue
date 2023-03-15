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
                <input-select v-model="categoryIds" multiple :error="errors.categoryIds" required :options="categoryOptions" tooltipText="Meals can be placed in 1 or more categories. Users will be able to see meals by filtering through categories.">Categories</input-select>
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
                        afterToday
                        >Activce until</input-date
                    >
                </div>
                <div class="dual-inputs">
                    <toggle v-model="promote" required>Promote</toggle>
                    <input-time v-model="dailyCutoffTime">Daily cutoff</input-time>
                </div>

                <vue-input v-model="eta" min="1" :error="errors.eta" type="number" tooltipText="A rougth estimate of how long it will take to prepare this meal. This is shown to the users">ETA (minutes)</vue-input>
                <vue-input v-model="price" min="1" type="number" :error="errors.price" required>Price</vue-input>
                <vue-input v-model="bulkBuyPortions" min="1" type="number" :error="errors.bulkBuyPortions" tooltipText="When a person buys X amount of this meal they would qualify for a discount. Use this field to enter how many of this meal they must order before recieving the discount">Bulk Buy Portions</vue-input>
                <vue-input :disabled="bulkBuyPortions == null || bulkBuyPortions == ''" v-model="bulkBuyDiscount" min="1" max="100" type="number" :error="errors.bulkBuyDiscount" tooltipText="Enter the percentage of discount that will be applied once the user has ordered the meals qualifying for discount">Bulk Buy Discount (%)</vue-input>
            </div>

            <template v-slot:footer>
                <vue-button v-if="tempMealId == null" v-on:click="save()"
                    >Save</vue-button
                >
                <vue-button v-else v-on:click="updateMeal()">Update</vue-button>
                <small v-on:click="closeForm()">Cancel</small>
            </template>
        </modal>
        <div class="meals">
            <div class="meal" v-for="meal in meals" :key="meal.id">
                <img :src="meal.imagePath" />
                <div>
                    <h4>{{ meal.name }}</h4>
                    <small>{{
                        meal.description +
                        "fksldfjls djflsdjfl jslfj lksdjfl sdjlfj lskdjflksdjfkl jd fdsfsdf sdf sdf"
                    }}</small>
                </div>
                <div class="actions">
                    <span @click="editMeal(meal)">Edit</span>
                    <v-icon
                        class="delete"
                        size="x-large"
                        icon="mdi-delete"
                        @click="deleteMeal(meal.id)"
                    ></v-icon>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script src="./Meals.ts" />
<style lang="scss" src="./Meals.scss" />
