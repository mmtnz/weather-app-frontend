import './assets/css/app.css'
import 'leaflet/dist/leaflet.css';
import Router from "./Router";



function App() {
  return (
    <div className="App">
      <Router/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet"/>

      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </div>
  );
}

export default App;
