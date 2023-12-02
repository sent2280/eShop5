import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import {Row,Col,Form, Button,Table} from "react-bootstrap";
import  {useDispatch,useSelector} from "react-redux"
import { toast } from 'react-toastify';
import {useProfileMutation} from "../slices/userApiSlice";
import {useGetMyOrdersQuery} from "../slices/orderApiSlice";
import {setCredentials} from "../slices/authSlice"
import { FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = () => {

    const {userInfo} = useSelector((state)=>state.auth);
    const [name,setName] = useState(userInfo.name);
    const [email,setEmail] = useState(userInfo.email);
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [ updateProfile,{isLoading : loadingUpdateProfile}] = useProfileMutation(); 
    const {data: orders,isLoading,isError} = useGetMyOrdersQuery();   

    const dispatch = useDispatch();

    const submitHandler = async(e) => { 
       e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password not matching');
        } else{
            try {
              const userDetails = await updateProfile({_id: userInfo._id,name,email,password}).unwrap();
              dispatch(setCredentials({...userDetails}))
              toast.success("Profile updated successfully");
            } catch (err) {
              toast.error(err?.data?.message || err.error);
            }
         
        }
    }

  return (
   <>
    <Row>
        <Col md={4}>
         <h2>User</h2>

         <Form onSubmit={submitHandler}>
           <Form.Group>
             <Form.Label>User Name</Form.Label>
             <Form.Control type='name'
                 placeholder='Enter name'
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
             >

             </Form.Control>
           </Form.Group>

           <Form.Group>
             <Form.Label>Email</Form.Label>
             <Form.Control type='email'
                 placeholder='Enter email'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
             >

             </Form.Control>
           </Form.Group>

           <Form.Group>
             <Form.Label>Password</Form.Label>
             <Form.Control type='password'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
             >
             </Form.Control>
            </Form.Group>
               
             <Form.Group>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control type='password'
                 value={confirmPassword}
                 onChange={(e)=>setConfirmPassword(e.target.value)}
             >

             </Form.Control>
           </Form.Group>

            <Button className='my-3' type='submit'>Update</Button>  
            {loadingUpdateProfile && <Loader />}

         </Form>
        </Col>
          
        <Col md={8}>
        <h2>Order History</h2>
        {
          isLoading ? (<Loader/>): isError? (
            <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
          ) : (
            <Table striped table hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
            </Table>
          )
        }
        </Col>
    </Row>
   </>
  )
}

export default ProfileScreen