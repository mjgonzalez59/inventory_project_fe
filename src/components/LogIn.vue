<template>
  <div class="logIn_user">
    <div class="container_logIn_user">
      <h2>Log in to SCS</h2>

      <form v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.username" placeholder="Username" required/>
        <input type="password" v-model="user.password" placeholder="Password" required/>
        <p>Forgot your <a href="http://">password</a>?</p> 
        <button type="submit">LOG IN</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",

  data: function() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    processLogInUser: function() {
      axios
        .post(
          "http://127.0.0.1:8000/login/",
          this.user,
          {
            headers: {},
          }
        )

        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })

        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>

<style>
.logIn_user {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.container_logIn_user {
  padding: 4% 0 4% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 25%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.container_logIn_user form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container_logIn_user h2{
  color: #565189;
}

.container_logIn_user input{
  width: 250px;
  padding: 6% 6% 6% 13%;
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
  margin: 2%;
}

.container_logIn_user button {
  color: white;
  width: 100%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 20px;
  margin: 3%;
  font-size: 15px;
}

.container_logIn_user button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


</style>
