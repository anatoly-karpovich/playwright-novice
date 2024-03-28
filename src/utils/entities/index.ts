import { CreatedProducts } from "utils/entities/createdProducts.js";
import { LoggedInUsers } from "utils/entities/loggedInUsers.js";

const Products = new CreatedProducts();
const Users = new LoggedInUsers();

export { Products, Users };
