<template>
  <div class="edit_info_supplier_container">
    <div class="edit_info_supplier">
      <h2>Editing supplier information</h2>

      <form v-on:submit.prevent="processEditInformation">
        <label class="edit_info_supplier_labelNames">  Name</label>
        <input type="text" v-model="supplier.name" placeholder="Name" required/>
        <label class="edit_info_supplier_labelNames">  Address</label>
        <input type="text" v-model="supplier.address" placeholder="Address" required/>
        <label class="edit_info_supplier_labelNames">  Phone (+57)</label>
        <input type="text" v-model="supplier.phone" placeholder="Phone (+57)" required/>
        <label class="edit_info_supplier_labelNames">  Email</label>
        <input type="email" v-model="supplier.email" placeholder="Email" required/>
        <label class="edit_info_supplier_labelNames">  Country</label>
        <input type="text" v-model="supplier.country" placeholder="Country" required/>
        <label class="edit_info_supplier_labelNames">  Contact Name</label>
        <input type="text" v-model="supplier.contactName" placeholder="Contact Name" />
        <button type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";


export default {
  name: "SupplierEditInfo",

  data: function () {
    return {
      supplier: {
        name: "",
        address: "",
        phone: "",
        email: "",
        country: "",
        contactName: "",
        status: "StatusSupplier",
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
      let supplier_identification = localStorage.getItem("supplierId");

      axios
        .get(`http://127.0.0.1:8000/supplier/${supplier_identification}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.supplier.name = result.data.name;
          this.supplier.address = result.data.address;
          this.supplier.phone  = result.data.phone;
          this.supplier.email = result.data.email;
          this.supplier.country  = result.data.country;
          this.supplier.contactName  = result.data.contactName;
          this.supplier.status  = result.data.status;
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
    loadSupplierDetails: function(){
      this.$router.push({ name: "supplierDetails" });
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
      let supplier_identification = localStorage.getItem("supplierId");
      axios
        .post(`http://127.0.0.1:8000/supplier/update/${supplier_identification}/`, this.supplier, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          alert("Information updated");
          this.loadSupplierDetails();
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

.edit_info_supplier_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_supplier {
  padding: 4% 3% 4% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 30%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_supplier form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.edit_info_supplier_labelNames{
  color: #283747;
  margin: 1% 0 1% 4%;
}

.edit_info_supplier h2{
  color: #565189;
}

.edit_info_supplier input{
  width: 100%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}



.edit_info_supplier select {
  width: 119%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.edit_info_supplier button {
  color: white;
  width: 115%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.edit_info_supplier button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>
