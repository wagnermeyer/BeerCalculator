<template>
    <div>
        <!-- <ul class="beers-list">
            <li class="beer-card">
                <h2 class="beer-card__name">Loremips</h2>
                <h3 class="beer-card__size">600ml</h3>
                <h3 class="beer-card__price">R$7,00</h3>
            </li>
        </ul> -->
        <ul>
            <li v-for="(beer, i) in beers" :key="i">
                {{ beer.name }} | {{ beer.size }}ml | R${{ floatToPrice(beer.price) }} | R${{ floatToPrice(beer.literPrice) }} | {{ beer.isCheapest }}
                <button @click="openModal($event, i)">Edit</button>
                <button @click="removeBeer($event, i)">Remove</button>
            </li>
        </ul>
    </div>
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
            },
            //METHOD: Convert float to price
            floatToPrice: function(val) {
                return val.toLocaleString('pt-br', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        }
    }
</script>

<style scoped>

    h1,
    h2,
    h3 {
        margin: 0;
        font-weight: normal;
        font-size: 17px;
    }

    .beers-list {
        margin: 0;
        padding: 15px;
        list-style: none;
    }

    .beer-card {
        background-color: rgba(0,0,0,0.05);
        padding: 17px 20px;
        border-radius: 6px;
        color: #808080;
        box-shadow: 0 0 0
    }

    .beer-card__name {
        font-size: 20px;
        font-weight: bold;
    }

    .beer-card__price {
        font-weight: bold;
    }

</style>

