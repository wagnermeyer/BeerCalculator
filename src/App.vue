<template>
    <div>
        <Modal v-if="edit.openModal">
            <BeerForm @updateBeers="editBeerInArray" :editingBeer="beers[edit.beerIndex]"></BeerForm>
        </Modal>
        <BeerForm @updateBeers="addBeerToArray"/>
        <ListBeers :beers="beers" @updateBeers="removeBeerFromArray" @modal="openModal"/>
        {{ beers }}
    </div>
</template>

<script>
    import BeerForm from './components/BeerForm';
    import ListBeers from './components/ListBeers';
    import Modal from './components/Modal';

	export default {
		name: 'app',
        data: function() {
            return {
                beers: [],
                cheapestPrice: null,
                edit: {
                    openModal: false,
                    beerIndex: null,
                    newBeerData: {}
                }
            }
        },
        methods: {
            //METHOD: Add beer to array
            addBeerToArray: function(obj) {
                //Add beer to array
                this.beers.unshift({
                    name: obj.name,
                    size: parseInt(obj.size),
                    price: this.priceToFloat(obj.price),
                    isCheapest: false
                });
                this.defCheapestBeers();
            },
            //METHOD: Remove beer from array
            removeBeerFromArray: function(i) {
                this.beers.splice(i, 1); //Remove from array
                this.cheapestPrice = null; //Define cheapestPrice to null again
                this.defCheapestBeers(); //Run method
            },
            //METHOD: Edit beer
            editBeerInArray: function(editedBeer) {
                this.beers[this.edit.beerIndex].name = editedBeer.name;
                this.beers[this.edit.beerIndex].size = editedBeer.size;
                this.beers[this.edit.beerIndex].price = this.priceToFloat(editedBeer.price);
                this.edit.openModal = false;
                this.cheapestPrice = null;
                this.defCheapestBeers();
            },
            //METHOD: Open modal
            openModal: function(i) {
                this.edit.openModal = true;
                this.edit.beerIndex = i;
            },
            //METHOD: Calculate liter price
            calcLiterPrice: function(size, price) {
                return parseFloat(((price/size) * 1000).toFixed(2));
            },
            //METHOD: Define cheapest beers
            defCheapestBeers: function() {
                //Calculate each price per liter and define the lowest price
                for (let beer of this.beers) {
                    beer.isCheapest = false;
                    beer.literPrice = this.calcLiterPrice(beer.size, beer.price);
                    if (this.cheapestPrice === null || this.cheapestPrice >= beer.literPrice) {
                        this.cheapestPrice = beer.literPrice;
                    }
                }
                //Mark each beer with lowest beer
                for (let beer of this.beers) {
                    if (parseFloat(this.cheapestPrice) >= parseFloat(beer.literPrice)) {
                        beer.isCheapest = true
                    }
                }
            },
            //METHOD: Convert price to float
            priceToFloat: function(val) {
                return parseFloat(parseFloat(val.replace(".","").replace(",", ".")));
            }
        },
		components: {
			BeerForm,
            ListBeers,
            Modal
		}
	}
</script>

<style>
    body,
    html {
        margin: 0;
    }

    body {
        font-family: 'Roboto', sans-serif;
    }

</style>
