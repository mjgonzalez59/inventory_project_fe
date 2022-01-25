<template>
  <div class="edit_info_user_container">
    <div class="edit_info_user">
      <h2>Editing user information</h2>

      <form v-on:submit.prevent="processEditInformation">
        <label class="edit_info_user_labelNames">  Password</label>
        <input type="password" v-model="user.password" placeholder="Password" required/>
        <label class="edit_info_user_labelNames">  Name</label>
        <input type="text" v-model="user.name" placeholder="Name" required/>
        <label class="edit_info_user_labelNames">  Role</label>
        <input type="text" v-model="user.role" placeholder="Role" required/>
        <label class="edit_info_user_labelNames">  Email</label>
        <input type="email" v-model="user.email" placeholder="Email" required/>
        <label class="edit_info_user_labelNames">  Phone (+57)</label>
        <input type="text" v-model="user.phone" placeholder="Phone (+57)" required/>
        <label class="edit_info_user_labelNames">  Country</label>
        <input type="text" v-model="user.country" placeholder="Country" required/>
        <select name="gender" v-model="user.gender" required>
          <option disabled value="">Gender</option>
          <option v-for="option in genderOptions" v-bind:key="option.value">
            {{option}}
          </option>
        </select>
        <button type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";


export default {
  name: "UserEditInfo",

  data: function () {
    return {
      genderOptions: ["Male", "Female", "Prefer not to answer"],
      user: {
        username: "",
        password: "",
        name: "",
        role: "",
        email: "",
        gender: "",
        phone: "",
        country: "",
        status: "StatusSample",
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
      let userId = jwt_decode(token).user_id.toString();
      axios
        .get(`http://127.0.0.1:8000/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.user.username = result.data.username;
          this.user.name = result.data.name;
          this.user.role = result.data.role;
          this.user.email = result.data.email;
          this.user.gender = result.data.gender;
          this.user.phone  = result.data.phone;
          this.user.country  = result.data.country;
          this.user.status  = result.data.status;
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
    loadAccount: function(){
      this.$router.push({ name: "account" });
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
      let userId = jwt_decode(token).user_id.toString();
      axios
        .post(`http://127.0.0.1:8000/user/update/${userId}/`, this.user, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          let dataFromResult = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          alert("Information updated");
          this.loadAccount();
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

.edit_info_user_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_user {
  padding: 4% 3% 4% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 30%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.edit_info_user form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.edit_info_user_labelNames{
  color: #283747;
  margin: 1% 0 1% 4%;
}

.edit_info_user h2{
  color: #565189;
}

.edit_info_user input{
  width: 100%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}



.edit_info_user select {
  width: 119%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.edit_info_user button {
  color: white;
  width: 115%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  margin: 3%;
  font-size: 15px;
}

.edit_info_user button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}



</style>
