<template>
  <div class="product_creation">
    <div class="container_product_creation">
      <h2>Create a new product</h2>

      <form v-on:submit.prevent="processProductCreation">
        <!-- <label class="product_creation_labelNames">First name: </label> -->
        <input type="text" v-model="product.name" placeholder="Name" />
        <!-- <label class="product_creation_labelNames">Category: </label> -->
        <input type="text" v-model="product.category" placeholder="Category" />
        <!-- <label class="product_creation_labelNames">Brand: </label> -->
        <input type="text" v-model="product.brand" placeholder="Brand" />
        <label class="product_creation_labelNames">  Price</label>
        <input type="number" step="any" v-model="product.sellPrice" placeholder="Price" />
        <!-- <label class="product_creation_labelNames">Packaging: </label> -->
        <input
          type="text" 
          v-model="product.packaging"
          placeholder="Packaging"
        />
        <label class="product_creation_labelNames">Volume in cm²</label>
        <input
          type="number" step="any" 
          v-model="product.volume"
          placeholder="Volume in cm2"
        />
        <label class="product_creation_labelNames">Weight in kg</label>
        <input
          type="number" step="any" 
          v-model="product.weight"
          placeholder="Weight in kg"
        />
        <!-- <label class="product_creation_labelNames">Description: </label> -->
        <input type="text" v-model="product.description" placeholder="Description" />
        <br />
        <button type="submit">Create product</button>
      </form>

      
    </div>
  </div>

</template>





<script>
import axios from "axios";

export default {
  name: "ProductCreation",

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
        status: "Active",
      },
    };
  },

  methods: {
    processProductCreation: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      console.log("Testing");

      axios
        .post("http://127.0.0.1:8000/product/", this.product, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log("Testing2");
          let messageProductCreation = "Producto creado exitosamente";
          this.$emit("completedProductCreation", messageProductCreation);
          this.product.name = "";
          this.product.description = "";
          this.product.category = "";
          this.product.brand = "";
          this.product.sellPrice = 0;
          this.product.packaging = "";
          this.product.volume = 0;
          this.product.weight = 0;
          console.log("Testing3");
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la creación del producto.");
        });
    },

    verifyToken: function () {
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
};
</script>




<style>


.product_creation {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container_product_creation {
  padding: 2% 0 2% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product_creation_labelNames {
  color: #283747;
  margin: 1% 0 1% 4%;
}

.product_creation h2 {
  color: #565189;
}


.product_creation form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
}


.product_creation input {
  width: 80%;  
  padding: 3% 3% 3% 8%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
  font-size: 15px;
}

.product_creation button {
  color: white;
  width: 95%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  font-size: 15px;
}

.product_creation button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>


