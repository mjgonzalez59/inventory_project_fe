<template>
  <div class="edit_info_client_container">
    <div class="edit_info_client">
      <h2>Editing client information</h2>

      <form v-on:submit.prevent="processEditInformation">
        <label class="edit_info_client_labelNames">  Name</label>
        <input type="text" v-model="client.name" placeholder="Name" required/>
        <label class="edit_info_client_labelNames">  Address</label>
        <input type="text" v-model="client.address" placeholder="Address" required/>
        <label class="edit_info_client_labelNames">  Phone (+57)</label>
        <input type="text" v-model="client.phone" placeholder="Phone (+57)" required/>
        <label class="edit_info_client_labelNames">  Email</label>
        <input type="email" v-model="client.email" placeholder="Email" required/>
        <label class="edit_info_client_labelNames">  Country</label>
        <input type="text" v-model="client.country" placeholder="Country" required/>
        <label class="edit_info_client_labelNames">  Contact Name</label>
        <input type="text" v-model="client.contactName" placeholder="Contact Name" />
        <button type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";


export default {
  name: "ClientEditInfo",

  data: function () {
    return {
      client: {
        name: "",
        address: "",
        phone: "",
        email: "",
        country: "",
        contactName: "",
        status: "StatusClient",
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
      let client_id = localStorage.getItem("clientId");

      axios
        .get(`http://127.0.0.1:8000/client/${client_id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.client.name = result.data.name;
          this.client.address = result.data.address;
          this.client.phone  = result.data.phone;
          this.client.email = result.data.email;
          this.client.country  = result.data.country;
          this.client.contactName  = result.data.contactName;
          this.client.status  = result.data.status;
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
      let client_id = localStorage.getItem("clientId");
      axios
        .post(`http://127.0.0.1:8000/client/update/${client_id}/`, this.client, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          alert("Information updated");
          this.loadclientDetails();
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

.edit_info_client_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_client {
  padding: 4% 3% 4% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 30%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_client form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.edit_info_client_labelNames{
  color: #283747;
  margin: 1% 0 1% 4%;
}

.edit_info_client h2{
  color: #565189;
}

.edit_info_client input{
  width: 100%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}



.edit_info_client select {
  width: 119%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.edit_info_client button {
  color: white;
  width: 115%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.edit_info_client button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>
