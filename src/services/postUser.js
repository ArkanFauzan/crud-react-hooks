import axios from 'axios';
import {nanoid} from 'nanoid';

// const apiKey = "$2b$10$vRR8WZTgpGmJgS8AUCte3eepFI1wcoqamqSWnd1uFSDLWriYQEUsy";
// const route = process.env.REACT_APP_POST_USER;

export const getUser = async()=>{
    // let data = await axios.get(`${route}`, {
    //     headers:{
    //         "X-Master-Key": apiKey
    //     }
    // })
    return {
        status: 200,
        data: []
    }
}

export const addUser = async(name, username, users)=>{
    users.push({
        id: nanoid(),
        name: name,
        username: username.split(' ').join('')
    })
    // let result =  await axios.put(route,users,{
    //     headers:{
    //         "X-Master-Key": apiKey,
    //         "Content-Type": "application/json"
    //     }
    // })

    return {
        status: 200,
        data: users
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
    // let result =  await axios.put(route,editedUsers,{
    //     headers:{
    //         "X-Master-Key": apiKey,
    //         "Content-Type": "application/json"
    //     }
    // })

    return {
        status: 200,
        data: editedUsers
    }
}

export const deleteUser = async(id, users)=>{
    let filterUsers = users.filter(v=>v.id!==id);
    // let result =  await axios.put(route,filterUsers,{
    //     headers:{
    //         "X-Master-Key": apiKey,
    //         "Content-Type": "application/json"
    //     }
    // })

    return {
        status: 200,
        data: filterUsers
    }
}