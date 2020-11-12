import logo from './logo.svg';
import './App.css';
import { getAllStudents } from './client';

function App() {
  getAllStudents().then((res) =>
    res.json().then((students) => {
      console.log(students);
    })
  );
  return <h1>Hello World Spring Boot & React</h1>;
}

export default App;
