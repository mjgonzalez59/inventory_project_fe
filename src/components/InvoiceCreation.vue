<template>
  <div class="invoice_creation">
    <div class="container_invoice_creation">
      <h2>Create new invoice</h2>

      <!-- Adding Client to Invoice -->
      <h3>Search customer by ID: </h3>
      <div class="invoice_creation_search_client">
        <input type="text" placeholder="Customer ID" v-model="clientId">
        <button v-on:Click="getClientByCC">⌕</button>
      </div>
      
      <div v-if="clientWasSelected" class="payment_method_and_product_list">

        <!-- Will appear only if the client was found -->
        <div class="invoice_creation_payment_method">

          <!-- Adding Payment Method to Invoice -->
          <h3>Payment method:</h3>
          <select v-model="paymenMethodSelected">
            <option disabled value="">Please select one</option>
            <option
              v-for="paymentMethod in paymenMethods"
              :key="paymentMethod"
              v-bind:value="paymentMethod"
            >
              {{ paymentMethod }}
            </option>
          </select>
        </div>


        <!-- Adding Products to Invoice -->
        <div class="invoice_creation_product_list">
          <div>
            <h3>Add a product:</h3>
            <div id="productElementContainer" v-for="(product, index) in productsList" :key="product">
              <p>Name:</p>
                <select v-model="product.idProduct">
                  <option disabled value="">Please select one</option>
                  <option
                    v-for="productSelected in allProducts"
                    :key="productSelected"
                    v-bind:value="productSelected.id"
                  >
                    {{ productSelected.name }}
                  </option>
                </select>
              
              <p>Quantity:</p>  
              <input type="number" placeholder="Quantity" v-model="product.quantity">
              
              <p>Tax Percentage:</p>
              <input type="number" placeholder="Tax Percentage" v-model="product.taxPercentage">
              <button v-on:click="removeProductInList(index)">Delete product</button>
            </div>

            <button v-on:click="addProductToList">Add product</button>
          </div>

        </div>

      </div>

      <button id="invoice_creation_button" v-on:click="invoiceCreation">Create Invoice</button>
    </div>
  </div>
</template>





<script>
import axios from "axios";

export default {
  name: "InvoiceCreation",

  data: function () {
    return {

      productElement: {
        idProduct: "",
        quantity: "",
        taxPercentage: ""
        },
      productsList: [],
      allProducts: [],

      clientId: "",
      clientSelected: "",
      clientWasSelected: false,

      paymenMethodSelected: "",
      paymenMethods: [
        "Paypal",
        "Visa",
        "MasterCard",
        "American Express",
        "Discover",
      ],

      invoiceData: {},

    };
  },


  methods: {

    getClientByCC: async function () {
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
        .get(`http://127.0.0.1:8000/client/clientByCC/${this.clientId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
        this.clientSelected = {
          "id": result.data.id,
          "cc": result.data.cc,
          "name": result.data.name,
          "address": result.data.address,
          "phone": result.data.phone,
          "email": result.data.email,
          "country": result.data.country,
          "contactName": result.data.contactName,
          "status": result.data.status
        };
        this.clientWasSelected = true
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Cliente no existe.");
        });
    },



    removeProductInList: function(index){
      this.productsList.splice(index, 1);
    },


    addProductToList: async function(){
      await this.getAllProducts();
      const productToBeAdd = {
        "idProduct": "",
        "quantity": "",
        "taxPercentage": ""
      };
      this.productsList.push(productToBeAdd);
    },


    getAllProducts: async function () {
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
        .get(`http://127.0.0.1:8000/product/list/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.allProducts = result.data
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la obtención de productos.");
        });
    },
    

    invoiceCreation: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      this.invoiceData = {
          "idClient": this.clientSelected.id, 
          "paymentMethod": this.paymenMethodSelected, 
          "products":  this.productsList
      };
      axios
        .post("http://127.0.0.1:8000/invoice/", this.invoiceData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          localStorage.setItem("invoiceId", result.data.id);
          alert("Factura creada con éxito");
          this.$router.push({ name: "invoiceDetails" });
          this.clientWasSelected = false;
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la creación de la factura.");
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

.invoice_creation {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_invoice_creation {
  display: flex;
  flex-direction: column;
  background-color: #D9E1F2;
  border-radius: 15px;
  width: 50%;
  padding: 1%;
  align-items: center;
  justify-content: center;
}

.invoice_creation_search_client {
  display: flex;
}

.invoice_creation_search_client input{
  padding: 0 0 0 10%; 
  border: none;
  background-color: #f4f8f7;
  color: #031742;
  font-size: 15px;
  border-radius: 15px 0 0 15px;
}

.invoice_creation_search_client button {
  background: #031742;
  border: 1px solid white;
  padding: 1% 3% 1% 3% ;
  font-size: 35px;
  color: white;
  padding: 0 5% 0 5%;
  border-radius: 0 15px 15px 0;
}

.payment_method_and_product_list {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1%;
}

.invoice_creation_payment_method {
  display: flex;
  align-items: center;
}

.invoice_creation_product_list {
  width: 100%;
}

#productElementContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.invoice_creation_product_list p{
  padding: 1%;
}

.invoice_creation_product_list input{
  width: 120px;
  margin: 0 1% 0 0;
  padding: 13px 10px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
}

.payment_method_and_product_list button {
  color: white;
  background: #565189;
  border-radius: 50px;
  border: none;
  padding: 1% 3% 1% 3% ;
}

.payment_method_and_product_list button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}

#invoice_creation_button{
  color: white;
  background: #3a2e7e;
  border-radius: 50px;
  border: none;
  padding: 1% 3% 1% 3% ;
  font-size: 18px;
  margin: 3%;
}

#invoice_creation_button button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}

.payment_method_and_product_list select{
  border: 1px solid red;
  padding: 13px 18px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
  margin: 0 0 0 8px;
}


</style>


