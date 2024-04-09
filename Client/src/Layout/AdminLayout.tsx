import { Redirect, Route, Switch } from "wouter";
import SideBar from "../Components/SideBar";
import Dashboard from "../Page/Admin/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { getDataWithAutorization } from "../Utils/httpRequest";
import { Suspense, lazy } from "react";
import Loading from "../Components/Loading";
import Navigation from "../Components/Navigation";

const ProductAdminDashboard = lazy(
  () => import("../Page/Admin/ProductAdminDashboard"),
);
const PaymentAdminDashboard = lazy(
  () => import("../Page/Admin/PaymentAdminDashboard"),
);
const UserAdminDashboard = lazy(
  () => import("../Page/Admin/UserAdminDashboard"),
);

type AdminUserData = {
  user: User;
};

export default function AdminLayout() {
  const { data, error } = useQuery<AdminUserData>({
    queryKey: ["user"],
    queryFn: () => getDataWithAutorization(),
  });

  if (!data || !data.user.isAdmin || error) {
    // Absolute path with ~
    return <Redirect to="~/" />;
  } else {
    return (
      <>
        <header>
          <Navigation user={data.user} />
        </header>
        <Suspense fallback={<Loading />}>
          <SideBar>
            <main>
              <Switch>
                <Route path="/" component={Dashboard} />
                <Route path="/payment" component={PaymentAdminDashboard} />
                <Route path="/product" component={ProductAdminDashboard} />
                <Route path="/user" component={UserAdminDashboard} />
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </main>
          </SideBar>
        </Suspense>
      </>
    );
  }
}