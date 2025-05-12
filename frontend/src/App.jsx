
import Nav from "./components/nav/Nav";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import { SidebarProvider } from "./components/nav/Sidebarcontext";
import {Outlet} from 'react-router-dom'


const App = () => {

  return (
    <SidebarProvider>
        <Nav />
        <Cart/>
        <Outlet/>
        <Footer />
    </SidebarProvider>
  );
};

export default App;

