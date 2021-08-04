import axios from 'axios';
import {nanoid} from 'nanoid';

/* Example Data format in jsonbin.io (first data is empty)
    [
        {
            "id":""
            "name":"",
            "username":""
        },
        {
            "id":"id 1"
            "name":"name 1",
            "username":"username1"
        },
        etc.
    ]
*/

// add your api key and your bin in jsonbin.io
const apiKey = "$2b$10$8ekV/FowHJuuyml2oO4BPuLQmA2JllxQdVLVjnq6yscf59gtonLiG";
const route = `https://api.jsonbin.io/v3/b/${process.env.REACT_APP_JSONBIN_ADDRESS_BIN}`;

export const getUser = async()=>{
    let data = await axios.get(`${route}`, {
        headers:{
            "X-Master-Key": apiKey
        }
    })
    return {
        status: data.status,
        data: data.data.record
    }
}

export const addUser = async(name, username, users)=>{
    users.push({
        id: nanoid(),
        name: name,
        username: username.split(' ').join('')
    })
    let result =  await axios.put(route,users,{
        headers:{
            "X-Master-Key": apiKey,
            "Content-Type": "application/json"
        }
    })

    return {
        status: result.status,
        data: result.data.record
    }
}

export const editUser = async(id, name, username, users)=>{
    let editedUsers = users.map(v=>{
        if(v.id===id){
            return {
                id: id,
                name: name,
                username: username
            }
        }
        else{
            return {
                id: v.id,
                name: v.name,
                username: v.username
            }
        }
    });
    let result =  await axios.put(route,editedUsers,{
        headers:{
            "X-Master-Key": apiKey,
            "Content-Type": "application/json"
        }
    })

    return {
        status: result.status,
        data: result.data.record
    }
}

export const deleteUser = async(id, users)=>{
    let filterUsers = users.filter(v=>v.id!==id);
    let result =  await axios.put(route,filterUsers,{
        headers:{
            "X-Master-Key": apiKey,
            "Content-Type": "application/json"
        }
    })

    return {
        status: result.status,
        data: result.data.record
    }
}