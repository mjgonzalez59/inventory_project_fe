<template>
  <div class="edit_info_invoice">
    <div class="container_edit_info_invoice">
      <h2>Editing invoice information</h2>

      <!-- Adding Client to Invoice -->
      <h3>Buscar cliente: </h3>
      <div class="edit_info_invoice_search_client">
        <input type="text" placeholder="Cédula de Ciudadanía" v-model="invoiceData.idClient.cc">
        <button v-on:Click="getClientByCC">⌕</button>
      </div>
      
      <div class="payment_method_and_product_list">

        <!-- Will appear only if the client was found -->
        <div class="edit_info_invoice_payment_method">

          <!-- Adding Payment Method to Invoice -->
          <h3>Método de pago:</h3>
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
        <div class="edit_info_invoice_product_list">
          <div>
            <h3>Añade tus productos:</h3>
            <div id="productElementContainer" v-for="(product, index) in invoiceData.products" :key="product">
              <p>Nombre:</p>
                <select v-model="product.id">
                  <option disabled value="">Please select one</option>
                  <option
                    v-for="productSelected in allProducts"
                    :key="productSelected"
                    v-bind:value="productSelected.id"
                  >
                    {{ productSelected.name }}
                  </option>
                </select>
              
              <p>Cantidad:</p>  
              <input type="number" placeholder="Quantity" v-model="product.quantity">
              
              <p>Porcentaje:</p>
              <input type="number" placeholder="Tax Percentage" v-model="product.taxPercentage">
              <button v-on:click="removeProductInList(index)">Delete product</button>
            </div>

            <button v-on:click="addProductToList">Añadir producto</button>
          </div>

        </div>

      </div>

      <button id="edit_info_invoice_button" v-on:click="processEditInformation">Edit</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "InvoiceEditInfo",

  data: function () {
    return {
      invoiceData: {
        id: 0,
        createdByUser: "",
        idClient: {
            cc: "",
        },
        paymentMethod: "",
        date: "2021-10-28T11:13:33.237594Z",
        products: [ ],
        totalValue: 0,
        status: "InvoiceStatus"
      },
      paymenMethodSelected: "",
      paymenMethods: [
        "Paypal",
        "Visa",
        "MasterCard",
        "American Express",
        "Discover",
      ],
      allProducts: [],
      testvariable: "TEST VARIABLE",
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
      let invoice_id = localStorage.getItem("invoiceId");

      axios
        .get(`http://127.0.0.1:8000/invoice/${invoice_id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.invoiceData.id = result.data.id;
          this.invoiceData.createdByUser = result.data.createdByUser;
          this.invoiceData.idClient.cc = result.data.idClient.cc;
          this.invoiceData.paymentMethod = result.data.paymentMethod;
          this.invoiceData.date = result.data.date;
          this.invoiceData.products = result.data.products;
          this.invoiceData.totalValue = result.data.totalValue;
          this.invoiceData.status = result.data.status;
          this.paymenMethodSelected = result.data.paymentMethod;

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

    loadclientDetails: function(){
      this.$router.push({ name: "clientDetails" });
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
      let userId = jwt_decode(token).user_id.toString();
      let invoice_id = localStorage.getItem("invoiceId");
      let invoiceInformation = {
        "createdByUserId": userId, 
        "idClient": this.invoiceData.id, 
        "paymentMethod": this.paymenMethodSelected, 
        "date": this.invoiceData.date, 
        "status": this.invoiceData.status,
        "products":  this.productsList,
      };
      axios
        .post(`http://127.0.0.1:8000/invoice/update/${invoice_id}/`, invoiceInformation, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          alert("Information updated");
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
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
  },
  created: async function() {
    this.getAllProducts();
    this.getData();
  },
};
</script>





<style>


.edit_info_invoice {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_edit_info_invoice {
  display: flex;
  flex-direction: column;
  background-color: #D9E1F2;
  border-radius: 15px;
  width: 50%;
  padding: 1%;
  align-items: center;
  justify-content: center;
}

.edit_info_invoice_search_client {
  display: flex;
}

.edit_info_invoice_search_client input{
  padding: 0 0 0 10%; 
  border: none;
  background-color: #f4f8f7;
  color: #031742;
  font-size: 15px;
  border-radius: 15px 0 0 15px;
}

.edit_info_invoice_search_client button {
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

.edit_info_invoice_payment_method {
  display: flex;
  align-items: center;
}

.edit_info_invoice_product_list {
  width: 100%;
}

#productElementContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit_info_invoice_product_list p{
  padding: 1%;
}

.edit_info_invoice_product_list input{
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

#edit_info_invoice_button{
  color: white;
  background: #3a2e7e;
  border-radius: 50px;
  border: none;
  padding: 1% 3% 1% 3% ;
  font-size: 18px;
  margin: 3%;
}

#edit_info_invoice_button button:hover {
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
