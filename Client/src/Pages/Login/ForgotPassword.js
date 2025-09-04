import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import FlickBook from "../../Assets/FlickBook.png";
import './Login.css'
import { forgotPasswordAPI } from '../../Api/Authentication';
import BeforeLogInNavbar from '../../Component/BeforeLogInNavbar/BeforeLoggedInNavbar.js';

function ForgotPassword(){

    const navigate = useNavigate();
    const onFinish = async(values) => {
        const request = {email:values.email}

        const response = await forgotPasswordAPI(request);

        if (response.success){
            message.success(response.message);  
            navigate("/resetPassword");        
        }else{
            message.error(response.message);
        }
    };

    return <div>
        <BeforeLogInNavbar/>
            <div className='Login'>    
            <main>
                <section className='sectionHeading'>
                    <h2 className="login-heading">Enter your
                        <span className="logo-text"><img className="inline-logo" src={FlickBook} alt="FlickBook Logo" /> Email</span>
                    </h2>
                </section>
                <section>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 360 }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Forgot Password
                            </Button>
                            <Flex justify="center" align="center">Existing User ? 
                                <Link to="/"> Login here</Link>
                            </Flex>
                        </Form.Item> 
                    </Form>
                </section>
            </main>
        </div>
    </div>
}

export default ForgotPassword;