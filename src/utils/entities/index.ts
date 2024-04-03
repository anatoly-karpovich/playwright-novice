import { CreatedProducts } from "utils/entities/createdProducts";
import { LoggedInUsers } from "utils/entities/loggedInUsers";
import { CreatedCustomers } from "utils/entities/createdCustomers";

const Products = new CreatedProducts();
const Users = new LoggedInUsers();
const Customers = new CreatedCustomers();

export { Products, Users, Customers };
