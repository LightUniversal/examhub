import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { Form, useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoding }] = useLoginMutation();
    const { userinfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if(userinfo) {
            navigate("/");
        }
    }, [userinfo], navigate);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res,}));
            navigate("/");
            toast.success("Logged In successfully...");
        } catch (error) {
            toast.error(error?.data?.message || error.message );
        }
    }


  return (
    <div>
      <Form className=' text-white w-4/5 mx-auto border border-slate-700 rounded-md shadow-md px-3 py-3' onSubmit={ (e) => {submitHandler(e)}}>
        <div className="email my-3">
            <label htmlFor="email" className=' flex items-center text-green-400'>
                Email <FaEnvelope className=' mx-1' />
            </label>
            <input type="email" name="email" id="email" className=' w-full h-11 rounded text-slate-200 bg-slate-700 px-2' placeholder = "email address" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div className="password my-3">
            <label htmlFor="password" className=' flex items-center text-green-400'>
                Password <FaLock className=' mx-1' />
            </label>
            <input type="password" name="password" id="password" className='w-full h-11 rounded text-slate-200 bg-slate-700 px-2' placeholder = "password" value={password} onChange={(e) => { setPassword(e.target.value)}} />
        </div>
        <div className="submit my-3">
            <button type='submit' className=' flex items-center bg-gray-700 py-2 px-2 rounded shadow-sm'>
                Login <FaSignInAlt className=' mx-1 text-green-400' />
            </button>
        </div>
        <div className="register border-t py-3 border-slate-500 my-2">
        New User? <Link to={ "/register" } className=' bg-green-900 p-1 px-3 rounded'>Register</Link>
        </div>
      </Form>
    </div>
  )
}

export default LoginScreen
