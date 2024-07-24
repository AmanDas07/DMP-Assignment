import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, ListGroup, Form, Button } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/context.js';


const HomePage = () => {

    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [state, setState] = useContext(userContext);
    useEffect(() => {
        console.log();
    }, [])




    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, newTodo]);
            setNewTodo('');
        }
    }


    return (
        <div style={styles.container}>
            <Container className="p-2">
                <h1 className='text-white'>Menu</h1>
                <ListGroup className="m-3">
                    {todos.map((todo, index) => (
                        <ListGroup.Item key={index} className='mb-1'>{todo}</ListGroup.Item>
                    ))}
                </ListGroup>

                {state != null && (
                    <Form inline="true" className="mb-5">
                        <Form.Control type="text" placeholder="Add new" className="m-2" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                        <Button variant="primary" onClick={handleAddTodo}>Add</Button>
                    </Form>

                )}


                <h2 className='text-white'>User Details</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>
                                {state && state.user && state.user.name}
                            </td>
                            <td>
                                {state && state.user && state.user.email}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )


}
const styles = {
    container: {
        background: 'linear-gradient(to right, #FF0000, #00FF00, #0000FF, #FFFF00)',
        height: '90vh',
    }
}

export default HomePage;