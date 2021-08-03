import CrudHooks from "./pages/crudHooks";
import {useState, useEffect, createContext } from 'react'
import {getUser} from './services/postUser'

export const userContext = createContext('');

const App = ()=>{
  const [users, setUsers] = useState([]);

  useEffect(async ()=>{
    let data = await getUser();
    setUsers(data.data)
  },[])

  return (
    <userContext.Provider value={{users,setUsers}}>
      <CrudHooks></CrudHooks>
    </userContext.Provider>
  )
}

export default App;
