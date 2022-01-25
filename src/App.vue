<template>
  <div id="app" class="app">

    <div class="header_up_container" v-bind:class="{homePageBannerBackground: homePageBanner}">

      <div class="header">

        <h1>Supply Chain Solutions</h1>
        <nav>
          <button v-if="is_auth" v-on:click="loadHome"> Home </button>
          <button v-if="is_auth" v-on:click="loadAccount"> Account </button>
          <button v-if="is_auth" v-on:click="loadClient"> Clients </button>
          <button v-if="is_auth" v-on:click="loadSupplier"> Suppliers </button>
          <button v-if="is_auth" v-on:click="loadProduct"> Products </button>
          <button v-if="is_auth" v-on:click="loadInvoice"> Invoices </button>
          <button v-if="!is_auth" @click="loadLogIn">Log in</button>
          <!-- <button v-if="!is_auth" v-on:click="loadSignUp">Sign up</button> -->
          <button v-if="is_auth" v-on:click="logOut">Sign out</button>
        </nav>
      </div>

    </div>

    <div v-if="homePageBanner && !is_auth" class="up_container">  
      <div class="what_we_do">
        <h3>What we do?</h3>
        <p>
          Good process leads to real results. With Supply Chain Solutions, we combine a process-driven approach with action to deliver measurable business value. So you can be more efficient. Leaner. More agile. So you can free up cash flow. Save money. Deliver smarter.
        </p>
        <button>Learn more</button>
      </div>


      <div class="how_we_do_it">
        <img src="./assets/homePage/hwdi.png" alt="how_we_do_it image not found">
        <div>
          <h3>How We Do It</h3>
          <p>
            At Supply Chain Solutions, we marry business process, technology and your company culture to develop strategies and a plan so you can implement business improvements that get near-term and long-term results. Through our Consulting Group, we analyze your supply chain and make recommendations that deliver true business value. See how Supply Chain Solutions works for you.
          </p>
        </div>  
      </div>
    </div>


    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:completedClientCreation="completedClientCreation"
        v-on:completedProductCreation="completedProductCreation"
        v-on:completedSupplierCreation="completedSupplierCreation"
        v-on:logOut="logOut"
      >
      </router-view>


    </div>
    <div class="footer">
      <div class="footer_company_details">
        <p>
          COMPANY DETAILS<br>
          About us <br>
          Careers <br>
        </p>
        <p>
          COMUNITY <br>
          For everyone <br>
          Supply chain Management <br>
          Consulting <br>
        </p>
        <p>
          LEGAL <br>
          All Rights Reserved, Copyright <br>
          Privacy Policy <br>
        </p>
      </div>

      <div class="footer_social_media">
        <img src="./assets/homePage/twitter.png" alt="Twitter image not found">
        <img src="./assets/homePage/facebook.png" alt="Facebook image not found">
        <img src="./assets/homePage/whatsapp.png" alt="Whatsapp image not found">
        <img src="./assets/homePage/linkedin.png" alt="Linkedin image not found">
      </div>
    </div>
  </div>
</template>


<script>
// import image from "./assets/homePage/Background.png";

export default {
  name: "App",
  data: function() {
    return {
      is_auth: false,
      homePageBanner: true,
      // headerBackgroungImage: image,
    };
  },
  components: {},
  methods: {
    verifyAuth: function() {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false) this.$router.push({ name: "homePage" });
      else this.$router.push({ name: "home" });
    },
    loadLogIn: function() {
      this.$router.push({ name: "logIn" });
      this.homePageBanner = false;
    },
    loadSignUp: function() {
      this.$router.push({ name: "signUp" });
      this.homePageBanner = false;
    },
    loadClient: function() {
      this.$router.push({ name: "client" })
    },
    loadProduct: function() {
      this.$router.push({ name: "product" })
    },
    loadSupplier: function() {
      this.$router.push({ name: "supplier" })
    },
    loadInvoice: function() {
      this.$router.push({ name: "invoice" })
    },
    completedLogIn: function(data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth();
    },
    completedSignUp: function(data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
    completedClientCreation: function(msj){
      alert(msj);
    },
    completedProductCreation: function(msj){
      alert(msj);
    },
    completedSupplierCreation: function(msj){
      alert(msj)
    },
    loadHome: function() {
      this.$router.push({ name: "home" });
    },
    logOut: function() {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
      this.homePageBanner = true;
    },
    loadAccount: function() {
      this.$router.push({ name: "account" });
    },
  },
  created: function() {
    this.verifyAuth();
  },
};
</script>

<style>
body {
  margin: 0 0 0 0;
  position: relative;
  min-height: 100vh;
}

.main-component{
  padding-bottom: 18rem;
}

.header_up_container {
  background-image: url("./assets/homePage/navigationBackground.png");
  /* width: 1800px; */
  height: 140px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
}


.homePageBannerBackground{
  background-image: url("./assets/homePage/Background.png");
}


.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header nav {
  display: flex;
  height: 50px;
  justify-content: flex-end;
}
/* 
.what_we_do {
  display: flex;
  align-items: center;
  margin: 0 2% 2% 2%;
  flex-direction: column;
  width: 65%;
  text-align: center;
}

.how_we_do_it {
  display: flex;
  padding: 2% 0 0 0;
  justify-content: center;
  width: 75%;
  text-align: justify;
}

.how_we_do_it img {
  width: 450px;
} */


.header_up_container p{
  font-size: 2.5vh;
  margin: 3%;
  color: #dcdce0;
}

.header_up_container h3{
  font-size: 3vh;
  color: white;
  margin: 3%;
}


.header button {
  color: white;
  width: 100%;
  min-width: 100px;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 0 20px 0 20px;
  margin: 0 10px 0 0;
  font-size: 15px;
}
/* 
.what_we_do button {
  color: white;
  width: 32%;
  background: #8c86ac;
  border: 1px solid white;
  border-radius: 50px;
  padding: 12px 20px 20px 20px;
  font-size: 2vh;
} */

.header_up_container button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}


.footer {
  background-image: url("./assets/homePage/footerBackground.png");
  display: flex;
  justify-content: space-between;
  padding: 6% 3% 1% 8%;
  position: absolute;
  bottom: 0;
  width: 89%;
}

.footer_company_details {
  display: flex;
  width: 60%;
}

.footer_company_details p{
  width: 100%;
  color: white;
  font-size: 2vh;
}

.footer_social_media {
  display: flex;
  padding: 1% 8% 0 0;
}

.footer_social_media img{
  width: 40px;
  height: 40px;
  padding: 4%;
}

</style>


