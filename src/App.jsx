import {Box} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {AppRouter, Navbar} from "./Components";

const App = () => (
  <BrowserRouter>
    <Box sx={{backgroundColor: '#000'}}>
      <Navbar />
      <AppRouter />
    </Box>
  </BrowserRouter>
);

export default App;
