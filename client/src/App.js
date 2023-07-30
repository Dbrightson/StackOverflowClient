import './App.css';
import Navbar from './components/Navbar/Navbar';
import Routing from './Routing';
import { BrowserRouter as Router } from 'react-router-dom' 
import {useEffect} from 'react'
import { fetchAllQuestions } from './actions/question';
import {useDispatch} from 'react-redux'
import { fetchAllUsers } from './actions/users';
import Chatbot from './components/Chatbot/Chatbot';
 
function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])
  
  return (
    <div className="App">
      <Router >
        <Navbar />
        <Routing />
      </Router >
      <Chatbot/>
    </div>
  );
}

export default App;
