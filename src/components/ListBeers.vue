<template>
    <ul>
        <li v-for="(beer, i) in beers" :key="i" :class="{ 'cheapest' : beer.isCheapest }">
            {{ i }} {{ beer.name }} | {{ beer.size }}ml | R${{ beer.price }} | {{ beer.literPrice }} | {{ beer.isCheapest }}
            <button @click="openModal($event, i)">Edit</button>
            <button @click="removeBeer($event, i)">Remove</button>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'ListBeers',
        props: ['beers'],
        methods: {
            removeBeer: function(e, i) {
                e.preventDefault();
                this.$emit('updateBeers', i);
            },
            openModal: function(e, i) {
                e.preventDefault();
                this.$emit('modal', i);
            }
        }
    }
</script>
