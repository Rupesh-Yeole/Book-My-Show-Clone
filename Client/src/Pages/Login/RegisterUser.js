import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoBookMyShow from "../../Assets/Bookmyshow-logoid.png";
import './Login.css'
import { registerUser } from '../../Api/Authentication.js';
import BeforeLogInNavbar from '../../Component/BeforeLogInNavbar/BeforeLoggedInNavbar.js';


function RegisterUser(){

    const navigate = useNavigate();

    const onFinish = async(values) => {
        const {name, email, password} = values;
        const input ={name,email, password};

        const response = await registerUser(input);

        if (response.success){
            message.success(response.message);
            navigate("/");
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
                    <h2 className="login-heading">Register In
                        <span className="logo-text"><img className="inline-logo" src={logoBookMyShow} alt="BookMyShow Logo" /></span>
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
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input prefix={<UserOutlined />} type="name" placeholder="Name" />
                        </Form.Item>
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
                            <Button block type="primary" htmlType="submit">
                            Register in
                            </Button>
                            <Flex justify="center" align="center">
                            Already User?  <Link to="/"> Login now!</Link>
                            </Flex>
                        </Form.Item>
                    </Form>
                </section>
            </main>
        </div>
    </div>
}

export default RegisterUser;