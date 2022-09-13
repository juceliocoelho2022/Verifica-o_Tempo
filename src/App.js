import { useState } from "react";

function App() {
  const [city, setCity] = useState("São Paulo");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=2255c58b02614080b9d102251221309&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
      });
  };

  return (
    <div>
      <nav className="navbar  navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do Tempo
        </a>
      </nav>

      <main className="">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua Cidade!</h1>

          <p>
            Digite o nome da sua cidade no campo abaixo e em seguida pesquisar.
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {weatherForecast ? 
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForecast.current.condition.icon} />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">Temp: {weatherForecast.current.temp_c}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
