<template>


  <div class="supplier_detail_container">

    <div class="supplier_details_card">
      <img :src="profilePhoto" alt="No photo available">

      <div class="supplier_information">
        <div class="supplier_name_id">
          <h3>Supplier: {{supplierDetails.name}}<br></h3>
          <p>Supplier ID: {{supplierDetails.companyId}} </p> 
        </div>

        <div class="supplier_other_details">
          <p>
            <b>Address:</b>  {{supplierDetails.address}} <br>
            <b>Phone:</b>  {{supplierDetails.phone}} <br>
            <b>Email:</b>  {{supplierDetails.email}} <br>
            <b>Country:</b> {{supplierDetails.country}} <br>
            <b>Contact name:</b>  {{supplierDetails.contactName}} <br>
          </p>
        </div>

        <div class="supplier_details_action_buttons">
          <button v-on:click="loadEditSupplierInfo">✎</button>
          <button v-on:click="processSupplierDelete(supplierDetails.id)">🗑</button>
        </div>

      </div>
    </div>

  </div>




</template>


<script>
import axios from "axios";
import image from "../assets/no-image.png";

export default {
    name: "SupplierDetails",

    data: function(){
    return{
      supplierDetails: {},
      profilePhoto: image,
    }
  },

  methods: {
    processSupplierDetails: async function(){
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
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          this.supplierDetails = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.$emit("logOut");
        });
    },

    loadEditSupplierInfo: function(){
      this.$router.push( {name: "supplierEditInfo"} );
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
          this.$router.push({ name: "supplier" });
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
    this.processSupplierDetails();
  }
};
</script>


<style>


.supplier_detail_container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.supplier_details_card {
  display: flex;
  padding: 1%;
  margin: 5%;
  box-shadow: 3px 3px 3px 3px grey; 
  align-items: center;
}

.supplier_details_card img{
  width: 180px;
  height: 180px;
  border-radius: 15px;
  margin: 2%;
}

.supplier_information{
  display: flex;
  flex-direction: column;
  padding: 2%;
}


.supplier_name_id p{
  color: #888795;
}

.supplier_other_details{
  width: 100%;
}


.supplier_details_action_buttons{
  display: flex;
  justify-content: flex-end;
}

.supplier_details_action_buttons button {
  color: white;
  background: #565189;
  border: 1px solid white;
  width: 50px;
  border-radius: 50px;
  font-size: 25px;
  margin: 1%;
}

.supplier_details_action_buttons button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}

</style>

