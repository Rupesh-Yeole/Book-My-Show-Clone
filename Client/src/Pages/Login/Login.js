import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import FlickBook from "../../Assets/FlickBook.png";
import { login } from '../../Api/Authentication.js';
import BeforeLogInNavbar from '../../Component/BeforeLogInNavbar/BeforeLoggedInNavbar.js';
import { useEffect } from 'react';

function Login(){
    
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('accessToken');
        if (token){
            navigate("/homeMovies");
        }
    },[navigate])

    const onFinish = async (values) => {
        const {email, password} = values;
        const input = {email, password};

        const response = await login(input);

        if (response.success){
            message.success(response.message);
            const accessToken = response.accessToken;
            localStorage.setItem("accessToken", accessToken);
            
            setTimeout(()=>{
                navigate("/homeMovies");
            },100);
            
        }
        else{
            message.error(response.message);
        }
    };

    return <div>
        <BeforeLogInNavbar/>
        <div className='Login'>
            <main>
                <section className='sectionHeading'>
                    <h2 className="login-heading">Login In<span className="logo-text"><img className="inline-logo" src={FlickBook} alt="FlickBook Logo" /></span>
                    </h2>
                </section>
                <section >
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 360 }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/forgotPassword">Forgot password</Link>
                            </Flex>
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Log in
                            </Button>
                            <Flex justify="center" align="center">
                            or__ <Link to="/registerUser">Register now!</Link>
                            </Flex>
                        </Form.Item>
                    </Form>
                </section>
            </main>
        </div>
    </div>
}

export default Login;