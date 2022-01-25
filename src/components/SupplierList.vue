<template>

  <div class="supplier_container">

    <h1>Our Suppliers</h1>
    
    <table v-if="loaded" class="suppliers_table">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Country</th>
        <th>Contact Name</th>
        <th>Actions</th>
      </tr>

      <tr class="supplier_element" v-for="supplier in supplierList" :key="supplier.id">
        <td>{{supplier.companyId}}</td>
        <td>{{supplier.name}}</td>
        <td>{{supplier.address}}</td>
        <td>{{supplier.phone}}</td>
        <td>{{supplier.email}}</td>
        <td>{{supplier.country}}</td>
        <td>{{supplier.contactName}}</td>
        <td>
          <button v-on:click="loadEditSupplierInfo(supplier.id)">✎</button>
          <button v-on:click="processSupplierDelete(supplier.id)">🗑</button>
        </td>
      </tr>
    </table>

    <h2 v-else> It looks like there aren't suppliers, please create one </h2>

  </div>

</template>


<script>
import axios from "axios";

export default {
  name: "SupplierList",

  data: function() {
    return {
      supplierList: [],
      loaded: false,
    }
  },

  methods: {
    processSupplierList: async function(){
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
        .get("http://127.0.0.1:8000/supplier/list/", {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          this.supplierList = result.data;
          this.sortedData(this.supplierList);
          if(this.supplierList.length > 0){
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

    loadEditSupplierInfo: function(supplierElementId){
      localStorage.setItem("supplierId", supplierElementId);
      this.$router.push({ name: "supplierEditInfo" });
    },

    processSupplierDelete: async function(supplierElementId){
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      localStorage.setItem("supplierId", supplierElementId);
      let supplier_id = localStorage.getItem("supplierId");
      
      axios
        .get(`http://127.0.0.1:8000/supplier/delete/${supplier_id}/`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          alert("Supplier deleted");
          this.processSupplierList();
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
    this.processSupplierList();
  }
};
</script>


<style>

.suppliers_table tr:nth-child(odd) {background-color: #D9E1F2;}
.suppliers_table tr:nth-child(even) {background-color: #FFFFFF;}

.supplier_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2%;
}

.supplier_container table,
.supplier_container th,
.supplier_container td {
  border-collapse: collapse;
}

.supplier_container table {
  width: 75%;
  empty-cells: hide;
}

.supplier_container td {
  text-align: center;
}

.supplier_container th {
  padding: 1%;
  background-color: #8c86ac;
  color: white;
}

.supplier_element button {
  color: white;
  background: #565189;
  border: 1px solid white;
  padding: 1% 3% 1% 3%;
  font-size: 25px;
  width: 50px;
  margin: 3%;
}

.supplier_element button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>

