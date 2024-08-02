import React, { useState } from 'react';
import { Steps, Button, Form, Input } from 'antd';

const { Step } = Steps;


// Define the steps
const steps = [
    {
        title: 'Step 1',
        content: <div>
            <h2 className="text-lg font-semibold mb-4">Step 1: Personal Information</h2>
            <Form.Item
                label="Amazina"
                name="fullName"
                rules={[{ required: true, message: 'Please input your full name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Telephone"
                name="phoneNumber"
                rules={[{ required: true, message: 'Syiramo nimero ya telephone' }]}
            >
                <Input />
            </Form.Item>
        </div>,
    },
    {
        title: 'Step 2',
        content: <div className='flex flex-col'>
            <p className='names'>Names: Fab</p>
            <p className='shop'>Shop: Fab Shop</p>
            <div className='flex flex-row w-full'>
                <div className="h-full w-32 p-2 border border-yellow-500 rounded-md">
                    <img src={
                        '/image41.png'
                    } alt="phone" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col h-full justify-between ml-4">
                    <div className="flex flex-col">
                        <h1 className="text-lg">
                            Phone Name
                        </h1>
                        <p className="text-sm">Igiciro: RWF
                            200
                        </p>
                    </div>
                </div>
            </div>

            {/* add checkbox */}
            <div className='flex checkbox mt-6'>
                <input type="checkbox" name="vehicle1" value="Bike" />
                <label > I have a bike</label><br />
            </div>

        </div>,
    },
    {
        title: 'Step 3',
        content: <div>
            <h2 className="text-lg font-semibold mb-4">Step 3: Ibijyanye nafone</h2>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Alternative Phone"
                name="altPhone"
                rules={[{ required: false }]}
            >
                <Input />
            </Form.Item>
        </div>,
    },
    {
        title: 'Step 4',
        content: <div>
            <h2 className="text-lg font-semibold mb-4">Step 4: Emeza iduka</h2>
            <Form.Item
                label="Highest Qualification"
                name="qualification"
                rules={[{ required: true, message: 'Please input your qualification!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Institution"
                name="institution"
                rules={[{ required: true, message: 'Please input your institution!' }]}
            >
                <Input />
            </Form.Item>
        </div>,
    },
    {
        title: 'Step 5',
        content: <div>
            <h2 className="text-lg font-semibold mb-4">Step 5: Emeza umubare banga</h2>
            <Form.Item
                label="Current Employer"
                name="employer"
                rules={[{ required: true, message: 'Please input your employer!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Position"
                name="position"
                rules={[{ required: true, message: 'Please input your position!' }]}
            >
                <Input />
            </Form.Item>
        </div>,
    },
    {
        title: 'Step 6',
        content: <div>
            <h2 className="text-lg font-semibold mb-4">Step 6: Ese urabyemeza</h2>
            <p>Review your information and submit the form.</p>
            {/* Add a summary of all inputs here if needed */}
        </div>,
    },
];

const Stepper: React.FC = () => {
    const [current, setCurrent] = useState(0);

    // Function to go to the next step
    const next = () => {
        setCurrent((prev) => prev + 1);
    };

    // Function to go to the previous step
    const prev = () => {
        setCurrent((prev) => prev - 1);
    };

    // Submit form function
    const onFinish = (values: any) => {
        console.log('Form Values:', values);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[35rem]">

                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} />
                    ))}
                </Steps>
                <div className="mt-8">
                    <Form
                        name="stepperForm"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <div>{steps[current].content}</div>
                        <div className="flex justify-between mt-4">
                            {current > 0 && (
                                <Button onClick={prev} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Previous
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={next} className="bg-yellow-500 text-white px-4 py-2 rounded">
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" htmlType="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Stepper;
