<template>
  <div class="account_container">
    <h1>User information</h1>

    <div v-if="loaded" class="account_information">
      <img :src="imageAccount" alt="">

      <div class="account_details_buttons">
        <div class="account_user_details">
          <h2>
            {{ userInformation.name }}
          </h2>
          <p>
            <b> Username:{{ userInformation.username }} </b> <br>
            Role:{{ userInformation.role }} <br>
            Email:{{ userInformation.email }} <br>
            Phone:{{ userInformation.phone }} <br>
          </p>
        </div>

        <div class="account_details_action_buttons">
          <button v-on:click="loadEditUserInfo">✎</button>
        </div>
      </div>



    </div>
  </div>



</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
import image from "../assets/no-image.png";

export default {
  name: "Account",
  data: function() {
    return {
      userInformation:{
        username: "",
        name: "",
        role: "",
        email: "",
        phone : "",
      },
      imageAccount: image,
      loaded: false,
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
      let userId = jwt_decode(token).user_id.toString();
      axios
        .get(`http://127.0.0.1:8000/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.userInformation.username = result.data.username;
          this.userInformation.name = result.data.name;
          this.userInformation.role = result.data.role;
          this.userInformation.email = result.data.email;
          this.userInformation.phone  = result.data.phone;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          this.$emit("logOut");
        });
    },
    loadEditUserInfo: function(){
      this.$router.push({ name: "editUser" });
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
  created: async function() {
    this.getData();
  },
};
</script>

<style>

.account_container{
  display: flex;
  flex-direction: column;
  align-items: center;  
}

.account_information{
  display: flex;
  align-items: center;
  padding: 3%;
  box-shadow: 3px 3px 3px 3px grey; 
  margin: 0 0 2% 0;
}


.account_container img{
  width: 180px;
  height: 180px;
}

.account_details_buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account_user_details{
  display: flex;
  flex-direction: column;
  text-align: center;
}

.account_details_action_buttons{
  display: flex;
  justify-content: flex-end;

}

.account_details_action_buttons button {
  color: white;
  background: #565189;
  border: 1px solid white;
  width: 50px;
  border-radius: 50px;
  font-size: 25px;
  margin: 1%;
}

.account_details_action_buttons button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>
