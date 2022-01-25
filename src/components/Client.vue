<template>
    <div class="client_options_container">
        <h2>Customer portal</h2>

        <div class="client_actions">
          <h3>What do you want to do?</h3>

          <div class="client_search_option">
              <h4>Search customer by ID</h4>

              <div class="search_client">
                <input type="text" v-model="client_cc" placeholder="Customer ID"/>
                <button on v-on:Click="loadClientDetails">⌕</button>
              </div>

          </div>

          <div class="client_buttons">
            <button v-on:Click="loadClientCreation">Create customer</button>
            <button v-on:Click="loadClientList">List all customers</button>
          </div>
        </div>

        <h3>Our Customers</h3>
        <img :src="companiesImage" alt="Company image not found">

    </div>

    <Delete :callback="callbackDelete" />
</template>


<script>
import axios from "axios";
import image from "../assets/companies.png"
// import Delete from "@/components/Delete.vue";

export default {
  name: "Client",
  data: function(){
      return {
          client_cc: "",
          companiesImage: image,
      }
  },
  // components: {
  //   Delete
  // },

  methods: {
    callbackDelete: function(){
      //logic to delete...
    },

    loadClientDetails: async function() {
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
        .get(`http://127.0.0.1:8000/client/clientByCC/${this.client_cc}/`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          localStorage.setItem("clientId", result.data.id);
          this.$router.push({ name: "clientDetails" })
        })
        .catch((error) => {
          console.log(error);
          alert("Cliente no encontrado");
        });
    },

    loadClientCreation: function() {
      this.$router.push({ name: "clientCreation" })
    },

    loadClientList: function() {
      this.$router.push({ name: "clientList" })
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
  }
};
</script>



<style>

.client_options_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.client_actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 3px 3px 3px grey; 
  padding: 0 2% 2% 2%;
  width: 35%;
}

.client_search_option{
  display: flex;
  padding: 3%;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.search_client {
  display: flex;
  margin: 0 0 0 6%;
}

.client_search_option input{
  padding: 0 0 0 10%; 
  border: none;
  background-color: #e2e7e6;
  color: #031742;
  font-size: 15px;
  border-radius: 15px 0 0 15px;
}

.client_search_option button {
  background: #031742;
  border: 1px solid white;
  padding: 1% 3% 1% 3% ;
  font-size: 35px;
  color: white;
  padding: 0 5% 0 5%;
  border-radius: 0 15px 15px 0;
}

.client_buttons {
  display: flex;
  width: 100%;
}

.client_buttons button {
  color: white;
  width: 80%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.client_buttons button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>

