<template>

  <div class="client_detail_container">

    <div class="client_details_card">
      <img :src="profilePhoto" alt="No photo available">

      <div class="client_information">
        <div class="client_name_id">
          <h3>Customer: {{clientDetails.name}}<br></h3>
          <p>Customer ID: {{clientDetails.cc}} </p> 
        </div>

        <div class="client_other_details">
          <p>
            <b>Address:</b>  {{clientDetails.address}} <br>
            <b>Phone:</b>  {{clientDetails.phone}} <br>
            <b>Email:</b>  {{clientDetails.email}} <br>
            <b>Country:</b>  {{clientDetails.country}} <br>
            <b>Contact name:</b>  {{clientDetails.contactName}} <br>
          </p>
        </div>

        <div class="client_details_action_buttons">
          <button v-on:click="loadEditClientInfo">✎</button>
          <button v-on:click="processClientDelete(clientDetails.id)">🗑</button>
        </div>

      </div>
    </div>

  </div>

</template>


<script>
import axios from "axios";
import image from "../assets/no-image.png";

export default {
  name: "ClientDetails",
  data: function(){
    return{
      clientDetails: {},
      profilePhoto: image,
    }
  },

  methods: {
    processClientDetail: async function(){
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let client_id = localStorage.getItem("clientId");

      axios
        .get(`http://127.0.0.1:8000/client/${client_id}/`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          this.clientDetails = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.$emit("logOut");
        });
    },

    loadEditClientInfo: function(){
      this.$router.push({ name: "clientEditInfo" });
    },

    processClientDelete: async function(clientElementId){
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      localStorage.setItem("clientId", clientElementId);
      let client_id = localStorage.getItem("clientId");
      
      axios
        .get(`http://127.0.0.1:8000/client/delete/${client_id}/`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          alert("Client deleted");
          this.$router.push({ name: "client" });
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
    this.processClientDetail();
  }
};
</script>



<style>
.client_detail_container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.client_details_card {
  display: flex;
  padding: 1%;
  margin: 5%;
  box-shadow: 3px 3px 3px 3px grey; 
  align-items: center;
}

.client_details_card img{
  width: 180px;
  height: 180px;
  border-radius: 15px;
  margin: 2%;
}

.client_information{
  display: flex;
  flex-direction: column;
  padding: 2%;
}


.client_name_id p{
  color: #888795;
}

.client_other_details{
  width: 100%;
}


.client_details_action_buttons{
  display: flex;
  justify-content: flex-end;
}

.client_details_action_buttons button {
  color: white;
  background: #565189;
  border: 1px solid white;
  width: 50px;
  border-radius: 50px;
  font-size: 25px;
  margin: 1%;
  min-width: 50px;
}

.client_details_action_buttons button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>

