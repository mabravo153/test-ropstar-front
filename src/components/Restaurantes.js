import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Restaurantes = ({ restaurantesData }) => {
  if (restaurantesData.msg.length === null) return null;

  const buscarRestaurante = (e) => {
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <h1 className="my-5">Administrador de Restaurantes</h1>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 justify-content-center">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="customer_name"
                name="customer_name"
                placeholder="Nombre del Comensal"
                onChange={buscarRestaurante}
              />
            </div>
          </div>
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/restaurante"}
              className="btn btn-success text-uppercase py-2 pz-5 font-weigth-bold"
            >
              Crear Restaurante
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <div className="list-group">
              {restaurantesData.msg.map((restaurante) => (
                <a
                  key={restaurante.id}
                  className="p-5 list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between mb-4">
                    <h3 className="mb-3"> {restaurante.name} </h3>
                    <small className="fecha-alta">{restaurante.address}</small>
                    <small className="fecha-alta">{restaurante.city}</small>
                  </div>
                  <div className="d-flex w-100 justify-content-between mb-4">
                    <p className="mb-0">{restaurante.description}</p>
                    <Link
                      to={`/reservas/${restaurante.id}`}
                      className="btn btn-success text-uppercase py-2 pz-5 font-weigth-bold"
                    >
                      Crear Resersacion
                    </Link>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Restaurantes;
