<template>
  <div class="client_creation">
    <div class="container_client_creation">
      <h2>Customer registration</h2>

      <form v-on:submit.prevent="processClientCreation">
        <input type="text" v-model="client.name" placeholder="Name" />
        <br />
        <input type="text" v-model="client.cc" placeholder="ID" />
        <br />
        <input type="text" v-model="client.address" placeholder="Address" />
        <br />
        <input type="text" v-model="client.phone" placeholder="Phone" />
        <br />
        <input type="email" v-model="client.email" placeholder="Email" />
        <br />
        <input type="text" v-model="client.country" placeholder="Country" />
        <br />
        <input type="text" v-model="client.contactName" placeholder="Contact Name" />
        <br />

        <button type="submit">Register customer</button>
      </form>
    </div>
  </div>
</template>




<script>
import axios from "axios";

export default {
  name: "ClientCreation",

  data: function () {
    return {
      client: {
        name: "",
        cc: "",
        address: "",
        phone: "",
        email: "",
        country: "",
        contactName: "",
        status: "Active",
      },
    };
  },

  methods: {
    processClientCreation: async function () {
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
        .post("http://127.0.0.1:8000/client/", this.client, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          let messageProductCreation = "Cliente creado exitosamente";
          this.$emit("completedClientCreation", messageProductCreation);
          this.$router.push( {name: "clientList"} );
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la creación del cliente.");
        });
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
.client_creation {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container_client_creation {
  padding: 2% 0 2% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.client_creation h2 {
  color: #565189;
}

.client_creation form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}

.client_creation input {
  width: 100%;  
  padding: 3% 3% 3% 8%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
}

.client_creation button {
  color: white;
  width: 70%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  font-size: 15px;
}

.client_creation button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>


