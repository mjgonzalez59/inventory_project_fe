<template>
  <div class="supplier_creation">
    <div class="container_supplier_creation">
      <h2>Supplier Registration</h2>

      <form v-on:submit.prevent="processSupplierCreation">
        <input type="text" v-model="supplier.name" placeholder="Name" />
        <br />
        <input
          type="text"
          v-model="supplier.companyId"
          placeholder="Company Identification"
        />
        <br />
        <input type="text" v-model="supplier.address" placeholder="Address" />
        <br />
        <input type="text" v-model="supplier.phone" placeholder="Phone" />
        <br />
        <input type="email" v-model="supplier.email" placeholder="Email" />
        <br />
        <input
          type="text"
          v-model="supplier.country"
          placeholder="Country"
        />
        <br />
        <input
          type="text"
          v-model="supplier.contactName"
          placeholder="Contact Name"
        />
        <br />

        <button type="submit">Register supplier</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SupplierCreation",

  data: function () {
    return {
      supplier: {
        name: "",
        companyId: "",
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
    processSupplierCreation: async function () {
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
        .post("http://127.0.0.1:8000/supplier/", this.supplier, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          let messageSupplierCreation = "Proveedor creado exitosamente";
          this.$emit("completedSupplierCreation", messageSupplierCreation);
          this.$router.push( {name: "supplierList"} );
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la creación del proveedor.");
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
.supplier_creation {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container_supplier_creation {
  padding: 2% 0 2% 0;
  box-shadow: 3px 3px 3px 3px grey; 
  border-radius: 2%;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.supplier_creation h2 {
  color: #565189;
}

.supplier_creation form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}

.supplier_creation input {
  width: 100%;  
  padding: 3% 3% 3% 8%; 
  border: none;
  background-color: #f4f8f7;
  box-shadow: 1px 1px 1px 1px #dbdfde; 
  color: #031742;
}

.supplier_creation button {
  color: white;
  width: 70%;
  background: #565189;
  border: 1px solid white;
  border-radius: 50px;
  padding: 15px;
  font-size: 15px;
}

.supplier_creation button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}
</style>


