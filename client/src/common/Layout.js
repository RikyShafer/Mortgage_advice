import {  Outlet } from "react-router-dom"
import Naviage from "./Naviage"
const Layout=()=>
{
return <div className="page">
<header>
  <Naviage/>  
</header>
<main>
    <Outlet/>
</main>
{/* <footer>Footer  </footer> */}
</div>
}
export default Layout