import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogIn.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Account from "./components/Account.vue";
import UserEditInfo from "./components/UserEditInfo.vue";
import Client from "./components/Client.vue";
import ClientDetails from "./components/ClientDetails.vue";
import ClientEditInfo from "./components/ClientEditInfo.vue";
import ClientCreation from "./components/ClientCreation.vue";
import ClientList from "./components/ClientList.vue";
import Product from "./components/Product.vue";
import ProductEditInfo from "./components/ProductEditInfo.vue";
import ProductCreation from "./components/ProductCreation.vue";
import ProductList from "./components/ProductList.vue";
import Supplier from "./components/Supplier.vue";
import SupplierDetails from "./components/SupplierDetails.vue";
import SupplierEditInfo from "./components/SupplierEditInfo.vue";
import SupplierCreation from "./components/SupplierCreation.vue";
import SupplierList from "./components/SupplierList.vue";
import Invoice from "./components/Invoice.vue";
import InvoiceDetails from "./components/InvoiceDetails.vue";
import InvoiceEditInfo from "./components/InvoiceEditInfo.vue";
import InvoiceCreation from "./components/InvoiceCreation.vue";
import InvoiceList from "./components/InvoiceList.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: App,
  },
  {
    path: "/homePage",
    name: "homePage",
    component: HomePage,
  },
  {
    path: "/user/logIn",
    name: "logIn",
    component: LogIn,
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/user/home",
    name: "home",
    component: Home,
  },
  {
    path: "/user/account",
    name: "account",
    component: Account,
  },
  {
    path: "/user/editUser",
    name: "editUser",
    component: UserEditInfo,
  },
  {
    path: "/user/client",
    name: "client",
    component: Client
  },
  {
    path: "/user/clientDetails",
    name: "clientDetails",
    component: ClientDetails
  },
  {
    path: "/user/clientEditInfo",
    name: "clientEditInfo",
    component: ClientEditInfo
  },
  {
    path: "/user/clientCreation",
    name: "clientCreation",
    component: ClientCreation,
  }, 
  {
    path: "/user/clientList",
    name: "clientList",
    component: ClientList
  },
  {
    path: "/user/product",
    name: "product",
    component: Product,
  },
  {
    path: "/user/productEditInfo",
    name: "productEditInfo",
    component: ProductEditInfo,
  },
  {
    path: "/user/productCreation",
    name: "productCreation",
    component: ProductCreation,
  },
  {
    path: "/user/productList",
    name: "productList",
    component: ProductList,
  },
  {
    path: "/user/supplier",
    name: "supplier",
    component: Supplier,
  },
  {
    path: "/user/supplierDetails",
    name: "supplierDetails",
    component: SupplierDetails,
  },
  {
    path: "/user/supplierEditInfo",
    name: "supplierEditInfo",
    component: SupplierEditInfo,
  },
  {
    path: "/user/supplierCreation",
    name: "supplierCreation",
    component: SupplierCreation,
  },
  {
    path: "/user/supplierList",
    name: "supplierList",
    component: SupplierList,
  },
  {
    path: "/user/invoice",
    name: "invoice",
    component: Invoice,
  },
  {
    path: "/user/invoiceDetails",
    name: "invoiceDetails",
    component: InvoiceDetails,
  },
  {
    path: "/user/invoiceEditInfo",
    name: "invoiceEditInfo",
    component: InvoiceEditInfo,
  },
  {
    path: "/user/invoiceCreation",
    name: "invoiceCreation",
    component: InvoiceCreation,
  },
  {
    path: "/user/invoiceList",
    name: "invoiceList",
    component: InvoiceList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
