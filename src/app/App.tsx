import Layout from "./main/components/Layout";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <AppRoutes />
        </Layout>
      </Provider>
    </>
  );
};

export default App;
