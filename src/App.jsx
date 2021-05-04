import React, { useState } from "react";
import shortid from "shortid";

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");

  const handleChange = (e) => {
    setTarea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("papi!! no te olvides  de poner el valor");
      return;
    }

    setTareas([...tareas, { nombreTarea: tarea, id: shortid.generate() }]);
    console.log("epale!!! guardando datos....");

    setTarea("");
  };

  const deleteItem = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editItem = (item) => {
    console.log(item);
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editar = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("campo vacio!!!");
      return;
    }

    const arrayFiltrado = tareas.map((item) =>
      item.id === id ? { nombreTarea: tarea, id: id } : item
    );
    setTareas(arrayFiltrado);

    setTarea("");
    setModoEdicion(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sistema Crud Simple</h2>
      <hr />

      <div className="row">
        <div className="col col-lg-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">{item.nombreTarea}</span>
                <button
                  className="btn btn-sm btn-danger float-right mx-2"
                  onClick={(id) => deleteItem(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-sm btn-warning float-right"
                  onClick={() => editItem(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>Formulario</h2>
          <form onSubmit={modoEdicion ? editar : handleSubmit}>
            <input
              type="text"
              className="form-control"
              value={tarea}
              onChange={handleChange}
            />
            <button
              className={
                modoEdicion
                  ? "btn btn-warning btn-block mt-3"
                  : "btn btn-dark btn-block mt-3"
              }
              type="submit"
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
