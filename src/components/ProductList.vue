<template>
  <div v-if="loaded" class="product_container">
    <div
      class="product_element"
      v-for="product in productList"
      :key="product.id"
    >
      <h3>Product: {{ product.name }}</h3>
      <p> 
        <b>Description:</b> {{ product.description }}<br>
        <b>Category:</b> {{ product.category }}<br>
        <b>Brand:</b> {{ product.brand }}<br>
        <b>Selling price: </b>${{ product.sellPrice }}<br>
        <b>Packaging:</b> {{ product.packaging }}<br>
        <b>Volume in cm²:</b> {{ product.volume }}<br>
        <b>Weight in kg:</b> {{ product.weight }}<br>
      </p>
      <button v-on:click="loadEditProductInfo(product.id)" >Edit</button>
      <button v-on:click="processProductDelete(product.id)">Delete</button>
    </div>
  </div>

  <h2 v-else> It looks like there aren't products, please create one </h2>

</template>


<script>
import axios from "axios"

export default {
  name: "ProductList",
  data: function () {
    return {
      productList: [],
      loaded: false,
    }
  },

  methods: {
    processProductList: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");

      axios
        .get("http://127.0.0.1:8000/product/list/", {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          this.productList = result.data;
          this.sortedData(this.productList);
          if(this.productList.length > 0){
            this.loaded = true;
          } else {
            this.loaded = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$$emit("logOut");
        });
    },

    sortedData: function(objectToSort){
      objectToSort.sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
        if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
        return 0;
      });
    },

    loadEditProductInfo: function(productElementId){
      localStorage.setItem("productId", productElementId);
      this.$router.push({ name: "productEditInfo" });
    },

    processProductDelete: async function(productElementId){
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      localStorage.setItem("productId", productElementId);
      let product_id = localStorage.getItem("productId");
      
      axios
        .get(`http://127.0.0.1:8000/product/delete/${product_id}/`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          alert("Product deleted");
          this.processProductList();
        })
        .catch((error) => {
          console.log(error);
          this.$$emit("logOut");
        });
    },

    verifyToken: function() {
      return axios
        .post(
          "http://127.0.0.1:8000/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
  },

  created: async function(){
      this.processProductList();
  }
};
</script>


<style>

.product_container {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 
}
.product_element {
  background-color: #e7e9f0;
  padding: 1.5%;
  margin: 1%;
  width: 250px;
}


.product_element button {
  color: white;
  background: #565189;
  border: 1px solid white;
  padding: 15px 25px 15px 25px;
  margin: 3%;
  font-size: 15px;
}

.product_element button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>

