<template>
  <div class="invoice_options_container">
    <h2>What do you want to do?</h2>

    <div class="invoice_actions">

        <div class="invoice_options_buttons">
          <button type="submit" v-on:Click="loadInvoiceCreation">
            Create new invoice
          </button>
        </div>

        <div class="search_invoice">
          <input type="text" v-model="invoiceId" placeholder="Invoice ID" />
          <button type="submit" v-on:Click="loadInvoiceDetails">
            ⌕
          </button>
        </div>


    </div>

    <div class="invoice_list">
      <InvoiceList></InvoiceList>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import InvoiceList from "./InvoiceList.vue";

export default {
  name: "Invoice",
  components: {
    InvoiceList,
  },
  data: function () {
    return {
      invoiceId: "",
    };
  },
  methods: {
    loadInvoiceDetails: async function () {
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
        .get(`http://127.0.0.1:8000/invoice/${this.invoiceId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((result) => {
            localStorage.setItem("invoiceId", result.data.id);
            this.$router.push({ name: "invoiceDetails" });
        })
        .catch((error) => {
            console.log(error);
            alert("Factura no encontrada");
        });
      
    },

    loadInvoiceCreation: function () {
      this.$router.push({ name: "invoiceCreation" });
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
.invoice_options_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.invoice_actions {
  display: flex;
  flex-direction: column;
}


.invoice_options_buttons button {
  color: white;
  width: 100%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.invoice_options_buttons button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


.search_invoice {
  display: flex;
  margin: 4%;
}

.search_invoice input{
  padding: 0 0 0 10%; 
  border: none;
  background-color: #e2e7e6;
  color: #031742;
  font-size: 15px;
  border-radius: 15px 0 0 15px;
}

.search_invoice button {
  background: #031742;
  border: 1px solid white;
  padding: 1% 3% 1% 3% ;
  font-size: 35px;
  color: white;
  padding: 0 5% 0 5%;
  border-radius: 0 15px 15px 0;
}


.invoice_list {
  width: 100%;
}

</style>

