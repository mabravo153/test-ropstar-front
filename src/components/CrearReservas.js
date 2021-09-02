import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";

const CrearReservacion = (props) => {
  let idRestaurant = props.match.params.id;
  const [reservacion, guardarReservacion] = useState({
    customer_name: "",
    description: "",
    date: "",
  });

  const actualizarState = (e) => {
    guardarReservacion({
      ...reservacion,
      [e.target.name]: e.target.value,
    });
  };

  const crearNuevaReservacion = (e) => {
    e.preventDefault();

    clienteAxios
      .post(`/api/v1/restaurants/${idRestaurant}/bookings`, reservacion)
      .then((respuesta) => {
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <h1 className="my-3">Crear Reservacion</h1>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-success text-uppercase py-2 pz-5 font-weigth-bold"
            >
              Volver
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <form
              onSubmit={crearNuevaReservacion}
              className="bg-white p-5 bordered"
            >
              <div className="form-group">
                <label htmlFor="customer_name">Nombre del Comensal</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="customer_name"
                  name="customer_name"
                  placeholder="Nombre del Comensal"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Fecha de la Reservacion</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="date"
                  name="date"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="6"
                  onChange={actualizarState}
                ></textarea>
              </div>

              <input
                type="submit"
                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Crear Reservacion"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(CrearReservacion);
