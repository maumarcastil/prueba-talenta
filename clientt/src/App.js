import "./App.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function App() {
  const urlApi = "http://localhost:3001";

  const [text, setText] = useState("");
  const [arrText, setArrText] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(urlApi)
        .then((res) => {
          if (res?.data?.arrText) setArrText(res.data.arrText);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      Swal.fire("Error!", "El campo es requerido!", "error");
    } else {
      await axios
        .post(urlApi, { text })
        .then((res) => {
          if (res?.data?.arrText) setArrText(res.data.arrText);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">Formulario</h5>
          <p className="card-text">
            <div className={"mb-3"}>
              <label htmlFor="">Texto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa un texto"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </p>
          <a
            href="#"
            className="btn btn-primary"
            onClick={(e) => {
              handlerSubmit(e);
            }}
          >
            Enviar
          </a>
        </div>

        <hr />

        <Table arr={arrText} />
      </div>
    </div>
  );
}

const Table = ({ arr }) => {
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Texto</th>
          </tr>
        </thead>
        <tbody>
          {arr?.map((item, index) => (
            <>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
