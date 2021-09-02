import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const EditarRestaurante = (props) => {
  let idRestaurant = props.match.params.id;
  const [restaurante, guardarRestaurante] = useState({});

  useEffect(() => {
    clienteAxios
      .get(`/api/v1/restaurants/${idRestaurant}`)
      .then((restaurantesResponse) => {
        console.log(restaurantesResponse.data.msg);
        guardarRestaurante(restaurantesResponse.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idRestaurant]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actualizarState = (e) => {
    guardarRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const editarRestaurante = (e) => {
    e.preventDefault();

    clienteAxios
      .put(`/api/v1/restaurants/${idRestaurant}`, restaurante)
      .then((respuesta) => {
        props.guardarConsultar(true);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        handleClickOpen();
      });
  };

  return (
    <Fragment>
      <h1 className="my-3">Editar Restaurante</h1>

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
              onSubmit={editarRestaurante}
              className="bg-white p-5 bordered"
            >
              <div className="form-group">
                <label htmlFor="name">Nombre Restaurante</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nameForm"
                  name="name"
                  placeholder="Nombre Restaurante"
                  value={restaurante.name}
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
                  value={restaurante.city}
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
                  value={restaurante.address}
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
                  value={restaurante.photo_url}
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="6"
                  id="description"
                  value={restaurante.description}
                  onChange={actualizarState}
                ></textarea>
              </div>

              <input
                type="submit"
                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Actualizar Restaurante"
              />
            </form>
          </div>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Ah Ocurrido un Error"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ah Ocurrido un error al Editar el Restaurante
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default withRouter(EditarRestaurante);
