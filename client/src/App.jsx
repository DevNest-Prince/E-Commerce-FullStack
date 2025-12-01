import { Button, ThemeProvider } from "@mui/material"
import { customeTheme } from "./Theme/customeTheme.js"
import Home from "./customer/pages/Home/Home.jsx"
import Products from "./customer/pages/Product/Products.jsx"



function App() {

  return (
    <ThemeProvider theme={customeTheme}>

      <Home />
      <Products />

    </ThemeProvider>
  )
}

export default App
