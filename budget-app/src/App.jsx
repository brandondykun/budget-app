import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddTransactionPage from "./Pages/AddTransactionPage";
import LoginPage from "./Pages/LoginPage";
import NavBar from "./Components/NavBar";
import SignUpPage from "./Pages/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import RemindersPage from "./Pages/RemindersPage";
import Footer from "./Components/Footer";
import TransactionDetailsPage from "./Pages/TransactionDetailsPage";
import EditTransactionPage from "./Pages/EditTransactionPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex-invert">
          <div className="primary-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<HomePage />} />
              </Route>
              <Route exact path="/add-transaction" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/add-transaction"
                  element={<AddTransactionPage />}
                />
              </Route>
              <Route exact path="/reminders" element={<PrivateRoute />}>
                <Route exact path="/reminders" element={<RemindersPage />} />
              </Route>
              <Route exact path="/details/:id/edit" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/details/:id/edit"
                  element={<EditTransactionPage />}
                />
              </Route>
              <Route exact path="/details/:id" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/details/:id"
                  element={<TransactionDetailsPage />}
                />
              </Route>
            </Routes>
          </div>
          <NavBar />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
