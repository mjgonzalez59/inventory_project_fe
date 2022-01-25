<template>

  <div class="clients_container">

    <h1>Our Customers</h1>

    <table v-if="loaded" class="clients_table">
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

      <tr class="client_element"  v-for="client in clientList" :key="client.id" >
        <td>{{client.cc}}</td>
        <td>{{client.name}}</td>
        <td>{{client.address}}</td>
        <td>{{client.phone}}</td>
        <td>{{client.email}}</td>
        <td>{{client.country}}</td>
        <td>{{client.contactName}}</td>
        <td>
          <button v-on:click="loadEditClientInfo(client.id)">✎</button>
          <button v-on:click="processClientDelete(client.id)">🗑</button>
        </td>
      </tr>

    </table>


    <h2 v-else> It looks like there aren't clients, please create one </h2>

  </div>

</template>


<script>
import axios from "axios";

export default {
  name: "ClientList",

  data: function() {
    return {
      clientList: [],
      loaded: false,
    }
  },

  methods: {
    processClientList: async function(){
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
        .get("http://127.0.0.1:8000/client/list/", {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((result) => {
          this.clientList = result.data;
          this.sortedData(this.clientList);
          if(this.clientList.length > 0){
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
    
    loadEditClientInfo: function(clientElementId){
      localStorage.setItem("clientId", clientElementId);
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
          this.processClientList();
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
    this.processClientList();
  }
};
</script>



<style>
.clients_table tr:nth-child(odd) {background-color: #D9E1F2;}
.clients_table tr:nth-child(even) {background-color: #FFFFFF;}

.clients_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2%;
}

.clients_container table,
.clients_container th,
.clients_container td {
  border-collapse: collapse;
}

.clients_container table {
  width: 75%;
  empty-cells: hide;
}

.clients_container td {
  text-align: center;
}

.clients_container th {
  padding: 1%;
  background-color: #8c86ac;
  color: white;
}

.client_element button {
  color: white;
  background: #565189;
  border: 1px solid white;
  padding: 1% 3% 1% 3%;
  font-size: 25px;
  width: 50px;
  margin: 3%;
}

.client_element button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>

