import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import clienteAxios from "./config/axios";

import CrearReservas from "./components/CrearReservas";
import Reservas from "./components/Reservas";
import Restaurantes from "./components/Restaurantes";
import CrearRestaurante from "./components/CrearRestaurante";
import EditarRestaurante from "./components/EditarRestaurante";

function App() {
  const [restaurantesInfo, guardarRestaurantes] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect(() => {
    if (consultar) {
      const consultarApi = () => {
        clienteAxios
          .get("/api/v1/restaurants")
          .then((restaurantesResponse) => {
            guardarRestaurantes(restaurantesResponse.data);
            guardarConsultar(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      consultarApi();
    }
  }, [consultar]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Restaurantes
              restaurantesData={restaurantesInfo}
              guardarConsultar={guardarConsultar}
            />
          )}
        />
        <Route
          exact
          path="/restaurante"
          component={() => (
            <CrearRestaurante guardarConsultar={guardarConsultar} />
          )}
        />
        <Route
          exact
          path="/restaurante/:id"
          component={() => (
            <EditarRestaurante guardarConsultar={guardarConsultar} />
          )}
        />
        <Route exact path="/reservas/:id" component={CrearReservas} />
        <Route exact path="/reservas" component={Reservas} />
      </Switch>
    </Router>
  );
}

export default App;
