<template>

  <div class="invoice_list_container">

    <table v-if="loaded" class="invoice_table">
      <tr>
        <th>Invoice #</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Total Value</th>
        <th>More</th>
      </tr>

      <tr class="invoice_element"
      v-for="invoice in invoiceList"
      :key="invoice.id">
        <td>{{invoice.id}}</td>
        <td>{{invoice.idClient.name}}</td>
        <td>
          {{new Date(invoice.date).getDate()}}
          / {{new Date(invoice.date).getMonth()+1}}
          / {{new Date(invoice.date).getFullYear()}}
        </td>
        <td>${{ (invoice.totalValue).toFixed(2) }}</td>
        <td>
          <!-- <button v-on:click="loadEditInvoiceInfo(invoice.id)">Edit</button> -->
          <button v-on:click="processInvoiceDelete(invoice.id)">Delete</button>
        </td>
      </tr>
    </table>

    <h2 v-else> It looks like there aren't Invoices, please create one </h2>

  </div> 

</template>


<script>
import axios from "axios";

export default {
  name: "InvoiceList",
  data: function () {
    return {
      invoiceList: [],
      loaded: false,
    };
  },

  methods: {
    processInvoiceList: async function () {
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
        .get("http://127.0.0.1:8000/invoice/list/", {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          this.invoiceList = result.data;
          this.sortedData(this.invoiceList);
          if(this.invoiceList.length > 0){
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
        if (a.id < b.id) {return -1;}
        if (a.id > b.id) {return 1;}
        return 0;
      });
    },

    loadEditInvoiceInfo: function(invoiceElementId){
      localStorage.setItem("invoiceId", invoiceElementId);
      this.$router.push({ name: "invoiceEditInfo" });
    },

    processInvoiceDelete: async function(invoiceElementId){
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      localStorage.setItem("invoiceId", invoiceElementId);
      let invoice_id = localStorage.getItem("invoiceId");
      
      axios
        .get(`http://127.0.0.1:8000/invoice/delete/${invoice_id}/`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          alert("Invoice deleted");
          this.processInvoiceList();
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
      this.processInvoiceList();
  }
};
</script>



<style>
.invoice_table tr:nth-child(odd) {background-color: #D9E1F2;}
.invoice_table tr:nth-child(even) {background-color: #FFFFFF;}

.invoice_list_container {
  display: flex;
  justify-content: center;
  margin: 2%;
}

.invoice_list_container table,
.invoice_list_container th,
.invoice_list_container td {
  border-collapse: collapse;
}

.invoice_list_container table {
  width: 70%;
  empty-cells: hide;
}

.invoice_list_container td {
  text-align: center;
}

.invoice_list_container th {
  padding: 1%;
  background-color: #8c86ac;
  color: white;
}

.invoice_table th:first-of-type {
  border-top-left-radius: 10px;
}
.invoice_table th:last-of-type {
  border-top-right-radius: 10px;
}
.invoice_table tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 10px;
}
.invoice_table tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 10px;
}

.invoice_table tr:hover {
  color: #291c70;
}

.invoice_element button {
  color: white;
  background: #565189;
  border: 1px solid white;
  padding: 1% 3% 1% 3%;
  margin: 3%;
}

.invoice_element button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>


