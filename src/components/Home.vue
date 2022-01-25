<template>
  <div class="greetings">
    <h1>
      ¡Welcome <span> {{ username }} </span>!
    </h1>
    <h3>We are happy to work with you</h3>
    <div class="welcome_image">
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      username: localStorage.getItem("username") || "none",
    };
  },
};
</script>

<style>
.greetings{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.greetings span{
  color:  #3f3289;  
}


.welcome_image {
  background-image: url("../assets/team_Studio_Session.jpg");
  width: 1000px;
  height: 667px;
  border-radius: 50px;
  box-shadow: 0 0 8px 8px white inset;
}



</style>
