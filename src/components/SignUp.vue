<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Sign Up</h2>

      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" required/>
        <input type="password" v-model="user.password" placeholder="Password" required/>
        <input type="text" v-model="user.name" placeholder="Name" required/>
        <input type="text" v-model="user.role" placeholder="Company Role" required/>
        <input type="email" v-model="user.email" placeholder="Email" required/>
        <select name="gender" v-model="user.gender" required>
          <option disabled value="">Gender</option>
          <option v-for="option in genderOptions" v-bind:key="option.value">
            {{option}}
          </option>
        </select>
        <input type="text" v-model="user.phone" placeholder="Phone (+57)" required/>
        <input type="text" v-model="user.country" placeholder="Country" required/>
        <button type="submit">Registrarme</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "SignUp",

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
    processSignUp: function () {
      axios
        .post("http://127.0.0.1:8000/user/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataSignUp = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>





<style>

.signUp_user {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.container_signUp_user {
  padding: 4% 0 4% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 30%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.container_signUp_user form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.container_signUp_user h2{
  color: #565189;
}

.container_signUp_user input{
  width: 100%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.container_signUp_user select {
  width: 119%;  
  padding: 6% 6% 6% 13%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.container_signUp_user button {
  color: white;
  width: 100%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 20px;
  margin: 3%;
  font-size: 15px;
}

.container_signUp_user button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>
