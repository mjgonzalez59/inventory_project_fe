<template>
  <div class="product_options_container">
    <h2>What do you want to do?</h2>
    
      <div class="create_product">
        <h3>Create a new product</h3>
        <button type="submit" v-on:Click="loadProductCreation">
          Create product
        </button>
      </div>

    <ProductList></ProductList>

  </div>
</template>

<script>
import axios from "axios";
import ProductList from "./ProductList.vue";

export default {
    name: "Product",
    components: { 
      ProductList,
    },

    methods: {
        loadProductCreation: function(){
            this.$router.push({name: "productCreation"});
        },
    }
};

</script>


<style>


.product_options_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create_product {
  display: flex;
  flex-direction: column;
}

.create_product button {
  color: white;
  width: 80%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.create_product button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>

