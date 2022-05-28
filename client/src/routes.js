import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Basket } from './pages/Basket';
import { DevicePage } from './pages/DevicePage';
import { Shop } from './pages/Shop';
import * as routes from './utils/consts';

export const authRoutes = [
  { path: routes.ADMIN_ROUTE, Component: Admin },
  { path: routes.BASKET_ROUTE, Component: Basket },
];
export const publicRoutes = [
  { path: routes.SHOP_ROUTE, Component: Shop },
  { path: routes.LOGIN_ROUTE, Component: Auth },
  { path: routes.REGISTRATION_ROUTE, Component: Auth },
  { path: routes.DEVICE_ROUTE, Component: DevicePage },
];
