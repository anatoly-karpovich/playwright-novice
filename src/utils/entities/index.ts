import { CreatedProducts } from "utils/entities/createdProducts";
import { LoggedInUsers } from "utils/entities/loggedInUsers";
import { CreatedCustomers } from "utils/entities/createdCustomers";
import { CreatedOrders } from "./createdOrders";

const Products = new CreatedProducts();
const Users = new LoggedInUsers();
const Customers = new CreatedCustomers();
const Orders = new CreatedOrders();

export { Products, Users, Customers, Orders };
