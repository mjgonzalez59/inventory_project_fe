<template>
  <div class="edit_info_product_container">
    <div class="edit_info_product">
      <h2>Editing Product information</h2>

      <form v-on:submit.prevent="processEditInformation">
        <label class="edit_info_product_labelNames">  Name</label>
        <input type="text" v-model="product.name" placeholder="Name" required/>
        <label class="edit_info_product_labelNames">  Category</label>
        <input type="text" v-model="product.category" placeholder="Category" required/>
        <label class="edit_info_product_labelNames">  Brand (+57)</label>
        <input type="text" v-model="product.brand" placeholder="Brand" required/>
        <label class="edit_info_product_labelNames">  Price</label>
        <input type="number" step="any" v-model="product.sellPrice" placeholder="Price" required/>
        <label class="edit_info_product_labelNames">  Packaging</label>
        <input type="text" v-model="product.packaging" placeholder="Packaging" required/>
        <label class="edit_info_product_labelNames">  Volume in cm²</label>
        <input type="number" step="any" v-model="product.volume" placeholder="Volume in cm²" />
        <label class="edit_info_product_labelNames">  Weight in kg</label>
        <input type="number" step="any" v-model="product.weight" placeholder="Weight in kg" />
        <label class="edit_info_product_labelNames">  Description</label>
        <input type="text" v-model="product.description" placeholder="Description" />
        <button type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";


export default {
  name: "ProductEditInfo",

  data: function () {
    return {
      product: {
        name: "",
        description: "",
        category: "",
        brand: "",
        sellPrice: 0,
        packaging: "",
        volume: 0,
        weight: 0,
        status: "StatusProduct",
      },
    };
  },

  methods: {
    getData: async function() {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let product_id = localStorage.getItem("productId");

      axios
        .get(`http://127.0.0.1:8000/product/${product_id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.product.name = result.data.name;
          this.product.description = result.data.description;
          this.product.category = result.data.category;
          this.product.brand = result.data.brand;
          this.product.sellPrice = result.data.sellPrice;
          this.product.packaging = result.data.packaging;
          this.product.volume = result.data.volume;
          this.product.weight = result.data.weight;
          this.product.status  = result.data.status;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          this.$emit("logOut");
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
    loadProductList: function(){
      this.$router.push({ name: "productList" });
    },
    processEditInformation: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let product_id = localStorage.getItem("productId");
      axios
        .post(`http://127.0.0.1:8000/product/update/${product_id}/`, this.product, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          alert("Information updated");
          this.loadProductList();
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
  created: async function() {
    this.getData();
  },
};
</script>





<style>

.edit_info_product_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_product {
  padding: 4% 3% 4% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 30%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_product form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.edit_info_product_labelNames{
  color: #283747;
  margin: 1% 0 1% 4%;
}

.edit_info_product h2{
  color: #565189;
}

.edit_info_product input{
  width: 100%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}



.edit_info_product select {
  width: 119%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.edit_info_product button {
  color: white;
  width: 115%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.edit_info_product button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>
