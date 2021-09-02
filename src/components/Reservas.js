/* eslint-disable array-callback-return */
import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";

const Reservas = () => {
  const [reservas, guardarReservas] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/api/v1/bookings")
      .then((reservasResponse) => {
        console.log(reservasResponse.data.msg);
        guardarReservas(reservasResponse.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <h1 className="my-5">Reservas</h1>
      <div className="col-12 mb-5 d-flex justify-content-center">
        <Link
          to={"/"}
          className="btn btn-success text-uppercase py-2 pz-5 font-weigth-bold"
        >
          Volver
        </Link>
      </div>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="list-group">
              {reservas ? (
                reservas.map((restaurante) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <div className="p-5 list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between mb-4">
                      <h3 className="mb-3"> {restaurante.customer_name} </h3>
                      <h3 className="mb-3"> {restaurante.restoran.name} </h3>
                      <small className="fecha-alta">
                        {new Date(restaurante.date)
                          .toISOString()
                          .substring(0, 10)}
                      </small>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-4">
                      <p className="mb-0">{restaurante.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No hay Reservas</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Reservas;
