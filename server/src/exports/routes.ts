import { TRoutes } from "../types/routes";
import BuyersRoute from "../routes/buyers";
import CategoriesRoute from "../routes/categories";
import NotificationsRoute from "../routes/notifications";
import OrdersRoute from "../routes/orders";
import PaymentsRoute from "../routes/payments";
import ProductsRoute from "../routes/products";
import SellersRoute from "../routes/sellers";
import SummariesRoute from "../routes/summaries";
import UsersRoute from "../routes/users";

export const routes: Array<TRoutes> = [
	{ route: "buyers", module: BuyersRoute },
	{ route: "categories", module: CategoriesRoute },
	{ route: "notifications", module: NotificationsRoute },
	{ route: "orders", module: OrdersRoute },
	{ route: "payments", module: PaymentsRoute },
	{ route: "products", module: ProductsRoute },
	{ route: "sellers", module: SellersRoute },
	{ route: "summaries", module: SummariesRoute },
	{ route: "users", module: UsersRoute },
];
