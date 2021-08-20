import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";

const CrearRestaurante = (props) => {
  const [restaurante, guardarRestaurante] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    photo_url: "",
  });

  const actualizarState = (e) => {
    guardarRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value,
    });
  };

  const crearNuevoRestaurante = (e) => {
    e.preventDefault();

    clienteAxios
      .post("/api/v1/restaurants", restaurante)
      .then((respuesta) => {
        props.guardarConsultar(true);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <h1 className="my-3">Crear Restaurante</h1>

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
              onSubmit={crearNuevoRestaurante}
              className="bg-white p-5 bordered"
            >
              <div className="form-group">
                <label htmlFor="name">Nombre Restaurante</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  placeholder="Nombre Restaurante"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="city"
                  name="city"
                  placeholder="Ciudad"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Direccion</label>
                <input
                  type="tex"
                  className="form-control form-control-lg"
                  id="address"
                  name="address"
                  placeholder="direccion"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Url Foto</label>
                <input
                  type="tex"
                  className="form-control form-control-lg"
                  id="photo_url"
                  name="photo_url"
                  placeholder="Url Foto"
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
                value="Crear Restaurante"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(CrearRestaurante);
