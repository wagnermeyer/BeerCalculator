<template>
    <div>
        <form @submit="defineMethod">
            <input class="input" type="text" placeholder="Beer name" v-model="beerData.name"><br>
            <input class="input" type="text" placeholder="Ml" v-model="beerData.size"><br>
            <input class="input" type="text" placeholder="Price" v-model="beerData.price"><br>
            <button type="submit" class="button">{{ editingBeer !== null ? 'Salvar' : 'Adicionar' }}</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'BeerForm',
        props: {
            editingBeer: {
                type: Object,
                default: null
            }
        },
        data: function() {
            return {
                beerData: {
                    name: '',
                    size: '',
                    price: '',
                    isCheapest: false
                },
                edit: {
                    obj: this.editingBeer
                }
            }
        },
        methods: {
            defineMethod: function(e) {
                e.preventDefault();
                if (this.edit.obj !== null) {
                    this.editBeer();
                } else {
                    this.addBeer();
                }
            },
            addBeer: function() {
                let copyData = Object.assign({}, this.beerData);
                this.$emit('updateBeers', copyData);

                //Reset fields
                this.beerData.name = "";
                this.beerData.size = "";
                this.beerData.price = "";
            },
            editBeer: function() {
                this.$emit('updateBeers', this.beerData);
            }
        },
        created: function() {
            if (this.edit.obj !== null) {
                this.beerData = Object.assign({}, this.editingBeer);
            }
        }
    }
</script>