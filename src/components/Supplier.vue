<template>
  <div class="supplier_options_container">
    <h2>Supplier portal</h2>
    
    <div class="supplier_actions">

      <div class="supplier_and_assets">
        <h3>Supplier and Assets</h3>
        <p>A comprehensive review of your business strategy and how it relates to your supply chain performance provides a solid foundation for our analysis and results. Detailed data collection and evaluation of current operational activities enable the development of business modeling and solutions.</p>
      </div>
      
      <div class="supplier_options_buttons">
        <button type="submit" v-on:Click="loadSupplierCreation">
          Register Supplier
        </button>
        
        <button type="submit" v-on:Click="loadSupplierList">
          List our company suppliers
        </button>
      </div>



      <div class="search_supplier">
        <input type="text" v-model="supplierId" placeholder="Supplier ID" />
        <button type="submit" v-on:Click="loadSupplierDetails">
          ⌕
        </button>
      </div>


    </div>
    
    <div class="supplier_details">
      <p>
        How to adapt to shorter product cycles and delivery cycles is an ongoing challenge. That's why SCS designs and implements better solutions to run your supply chain. Whether managing your domestic or international business, inventory or logistics, our solutions offer complete end-to-end logistics management.
        <br>
        Our supply chain operations tools and experienced team will give you complete control over your supply chain, from the raw materials of your suppliers to the consumption of your production line, to the delivery to your customers. By lending visibility into inventory implementations, you can reduce inventory holding costs, shorten lead times, and be more responsive to quick market changes.
      </p>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import image from "../assets/supplier.jpg";

export default {
  name: "Supplier",
  data: function () {
    return {
      supplierId: "",
      supplierImage: image,
    };
  },

  methods: {
    loadSupplierDetails: async function () {
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
        .get(`http://127.0.0.1:8000/supplier/supplierBycompanyId/${this.supplierId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((result) => {
            localStorage.setItem("supplierId", result.data.id);
            this.$router.push({ name: "supplierDetails" });
        })
        .catch((error) => {
            console.log(error);
            alert("Proveedor no encontrado");
        });
    },
    loadSupplierCreation: function () {
      this.$router.push({ name: "supplierCreation" });
    },
    loadSupplierList: function () {
      this.$router.push({ name: "supplierList" });
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


.supplier_options_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.supplier_actions {
  display: flex;
  background-color: #D9E1F2;
  border-radius: 15px;
  width: 60%;
  align-items: center;
  justify-content: center;
}

.supplier_and_assets {
  width: 30%;
  padding: 3%;
  color: black;
  text-align: center;
}

.supplier_options_buttons {
  display: flex;
  width: 33%;
  margin: 2%;
}

.supplier_options_buttons button {
  color: white;
  background: #565189;
  border-radius: 50px;
  border: none;
  padding: 1% 3% 1% 3% ;
  margin: 3%;
  font-size: 15px;
}

.supplier_options_buttons button:hover {
  color: #e5e7e9;
  background: #031742;
  border: 1px solid white;
}

.search_supplier {
  display: flex;
  margin: 0 6% 0 0;
}

.search_supplier input{
  padding: 0 0 0 10%; 
  border: none;
  background-color: #f4f8f7;
  color: #031742;
  font-size: 15px;
  border-radius: 15px 0 0 15px;
}

.search_supplier button {
  background: #031742;
  border: 1px solid white;
  padding: 1% 3% 1% 3% ;
  font-size: 35px;
  color: white;
  padding: 0 5% 0 5%;
  border-radius: 0 15px 15px 0;
}


.supplier_details {
  text-align: justify;
  width: 50%;
  font-size: 2vh;
  margin: 2%;
}



</style>

