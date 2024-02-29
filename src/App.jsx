import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import EventsSingle from "./routes/EventsSingle";
import Favorites from "./routes/Favorites";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Root from "./routes/Root";
import store from "./store/store";
import Events from "./routes/Events";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <Events />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events/:single"
                element={
                  <ProtectedRoute>
                    <EventsSingle />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
      {/* </LocalizationProvider> */}
    </Provider>
  );
}

export default App;