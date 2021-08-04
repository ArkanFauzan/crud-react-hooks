import {useState, useEffect, useContext} from 'react';
import {Row, Col, Button, Label, Input, FormFeedback} from 'reactstrap';
import { userContext } from '../App';
import { addUser,editUser, deleteUser } from '../services/postUser';
import '../styles/crud_hooks.css'

const CrudHooks = (props)=>{
    // data from parent
    const {users, setUsers} = useContext(userContext)

    // state for input field
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [err, setErr] = useState({
        name:false,
        username:false
    })

    // state to change field from add to edit
    const [isEditable, setIsEditable] = useState(false);
    const [idToEdit, setIdToEdit] = useState("");

    
    const enableEdit = (userObj)=>{
        const {id, name, username} = userObj;
        setIsEditable(true);
        setName(name);
        setUsername(username);
        setIdToEdit(id);
        setErr({
            name:false,
            username:false
        })
    }
    
    const disableEdit = ()=>{
        setIsEditable(false);
        setName("");
        setUsername("");
        setIdToEdit("");
        setErr({
            name:false,
            username:false
        })
    }

    const validate = async ()=>{
        let errName = name.length === 0 ? true : false;
        let errUsername = username.length === 0 ? true : false ;

        // username must be unique (error if there is a duplicate)
        if(errUsername===false){
            users.forEach(v=>{
                if(v.username === username){
                    // username can same as current username when edit
                    if(isEditable && v.id==idToEdit){
                        return
                    }
                    errUsername = true;
                }
            })
        }

        setErr({
            name: errName,
            username: errUsername
        })
        return !errName && !errUsername ? true : false;
    }
    
    const handleAdd = async ()=>{
        const valid = await validate();

        if(valid){
            let result = await addUser(name, username, users)
            if(result.status==200){
                setUsers(result.data)
                setName('')
                setUsername('')
            }
        }
    }

    const handleDelete = async (id)=>{
        const confirmDelete = confirm("Do you want to delete it?");
        if(confirmDelete){
            const result = await deleteUser(id, users)
            if(result.status==200){
                setUsers(result.data)
                disableEdit()
            }
        }
    }

    const handleEdit = async()=>{
        const valid = await validate();
        if(valid===false){return};

        let result = await editUser(idToEdit, name, username, users)
        if(result.status==200){
            setUsers(result.data)
            disableEdit();
        }
    }

    return(
        <div id="app" className="app container-fluid">
            <Row>
                <h1>CRUD App with Hooks</h1>
            </Row>
            <Row className="field_row">
                <Col md="6" sm="12" style={{marginBottom:"30px"}}>
                    <h2>{isEditable==false ? "Add user" : "Edit user"}</h2>
                    <Col className="col_field">
                        <Label>Name</Label>
                        <Input 
                        type="text"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        invalid={err.name}
                        />
                        <FormFeedback>{err.name && "nama harus diisi"}</FormFeedback>
                    </Col>
                    <Col className="col_field">
                        <Label>Username</Label>
                        <Input
                        type="text"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value.split(' ').join(''))}}
                        invalid={err.username}
                        />
                        <FormFeedback>{ err.username && "username harus diisi dan unik"}</FormFeedback>
                    </Col>
                    <Row>
                        <Col>
                            {isEditable==false ? 
                                <Button className="btn_add" color="primary" onClick={()=>handleAdd()}>Add new user</Button>
                                :
                                <>
                                <Button className="btn_edit" style={{marginRight:"15px"}} color="primary" onClick={()=>handleEdit()}>Update</Button>
                                <Button className="btn_cancel" color="light" onClick={()=>disableEdit()}>cancel</Button>
                                </>
                            }
                        </Col>
                    </Row>
                </Col>
                <Col md="6" sm="12" >
                    <h2>View Users</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* jsonbin cant null
                                so, i set the value of first object as ""
                                if lenght=1 it is same as no data,
                                if length>1, show user but hidden the empty first data
                            */}
                            {users.length===1 ? <tr><td colSpan={3}>No User</td></tr> : users.map(v=>{
                                if(v.id===""){
                                    return <></>
                                }
                                return(
                                    <tr key={v.id}>
                                        <td className="align-middle">{v.name}</td>
                                        <td className="align-middle">{v.username}</td>
                                        <td>
                                            <Button color="light" onClick={()=>enableEdit(v)}>Edit</Button>
                                            <Button color="light" onClick={()=>handleDelete(v.id)} style={{marginLeft:"10px"}}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}

export default CrudHooks;