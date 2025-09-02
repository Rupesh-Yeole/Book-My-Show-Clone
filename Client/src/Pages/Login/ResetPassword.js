import { LockOutlined} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import './Login.css'
import BeforeLogInNavbar from '../../Component/BeforeLogInNavbar/BeforeLoggedInNavbar.js';
import { resetPasswordAPI } from '../../Api/Authentication.js';
import { useNavigate } from 'react-router-dom';


function ResetPassword(){
    const navigate = useNavigate();

    const onFinish = async(values) => {
        const request = {
            OTP:values.OTP,
            New_password:values.New_password
        }
        
        const response = await resetPasswordAPI(request);
        
        if (response.success){
            message.success(response.message);  
            navigate("/");        
        }else{
            message.error(response.message);
        }
    };

    return <div>
    <BeforeLogInNavbar/>
        <div className='Login'>
            <main>
                <section className='sectionHeading'>
                    <h2 className="login-heading">Enter your OTP</h2>
                </section>
                <section >
                    <Form
                        name="Reset Password"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 360 }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="OTP"
                            rules={[{ required: true, message: 'Please input your OTP!' }]}
                        >
                            <Input type="number" placeholder="OTP" />
                        </Form.Item>

                        <Form.Item
                            name="New_password"
                            rules={[{ required: true, message: 'Please input your new Password!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="New_Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </main>
        </div>
    </div>
}

export default ResetPassword;