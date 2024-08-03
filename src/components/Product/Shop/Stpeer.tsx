import React, { useState } from 'react';
import { Steps, Button, Form, Input, Checkbox, Radio, notification } from 'antd';
import { Link } from 'react-router-dom';

const { Step } = Steps;

interface FormData {
    fullName: string;
    phoneNumber: string;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    contactMethod: 'whatsapp' | 'email';
}

const steps = [
    {
        title: 'Step 1',
        // Step 1 does not require any dynamic data, so it is just a JSX element.
        content: (
            <div>
                <h2 className="text-lg font-semibold mb-4">Step 1: Personal Information</h2>
                <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input
                        placeholder="Amazia"
                        style={{
                            borderColor: 'white',
                            borderBottomColor: 'green',
                            borderWidth: '2px',
                            borderRightColor: 'white',
                            borderRadius: '0px',
                            borderTopColor: 'white',
                            outline: 'none',
                            border: 'none',
                            borderBottom: '1px solid green',
                        }}
                        className="bbbb border-b-green-600 outline-none border-t-white border-r-white border-l-white rounded-none"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Syiramo nimero ya telephone' }]}
                >
                    <Input
                        placeholder="Telephone or email"
                        style={{
                            borderColor: 'white',
                            borderBottomColor: 'green',
                            borderWidth: '2px',
                            borderRightColor: 'white',
                            borderRadius: '0px',
                            borderTopColor: 'white',
                            outline: 'none',
                            border: 'none',
                            borderBottom: '1px solid green',
                        }}
                        className="bbbb border-b-green-600 outline-none border-t-white border-r-white border-l-white rounded-none"
                    />
                </Form.Item>
                <Form.Item
                    name="checkbox1"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please agree to this term.' }]}
                >
                    <Checkbox>
                        Kugirango uhabwe telefoni kuri iki giciro ndetse unabashe kwemererwa uturusho duhabwa abakoresha uru
                        rubuga, ni ngombwa ko wuzuzamo amazina yawe ndetse na numero ya telefoni cyangwa ‘email’ yawe.
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    name="checkbox2"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please agree to this term.' }]}
                >
                    <Checkbox>
                        Uturushouhabwa iyo uguze uciye kuri uru rubuga, dukubiye muri serivisi Komparas itanga. Ushobora
                        kubona izo serivisi uciye kuri iyi ‘link/lien’ : <Link to={''}>Serivisi</Link>
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    name="checkbox3"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please agree to this term.' }]}
                >
                    <Checkbox>
                        Kugirango uhabwe utwo turusho, nyuma yo kwishyura umucuruzi usabwa kugaruka kuri uru rubuga kugirango
                        wemeze bidasubirwaho ko waguriye icyo gicuruzwa kuri uwo mucuruzi.
                    </Checkbox>
                </Form.Item>
            </div>
        ),
    },
    {
        title: 'Step 2',
        // Step 2 requires dynamic data, so it is a function that receives formData.
        content: (formData: FormData, shopData:any) => (
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <p className="w-full flex items-center mx-auto justify-center">Urakoze Cyane</p>
                    <h1 className="font-semibold w-full flex items-center mx-auto justify-center">
                        {formData.fullName}
                    </h1>
                    <p className="w-full flex items-center mx-auto justify-center">
                        Gukoresha <Link className="ml-1" to={''}> Komparas</Link>
                    </p>
                    <h1 className="font-semibold w-full flex items-center mx-auto justify-center mt-1 text-green-600">
                        Komparas Code(KC)
                    </h1>
                    <h1 className="font-semibold w-full flex items-center mx-auto justify-center text-green-600 text-lg">
                        12345676
                    </h1>
                    <div className="listOfThings flex flex-col">
                        <div className="flex">
                            <p className="flex my-auto justify-center items-center">
                                • Iyi KC niyo uzaha umucuruzi {`${shopData?.owner}`} ({`${shopData?.name}`}) kugirango aguhere iyo telefoni
                                kuri icyo giciro.
                            </p>
                        </div>
                        <div className="flex">
                            <p className="flex my-auto justify-center items-center">
                                • Nyuma yo kwishyura, ntibagirwe kugaruka kuri uru rubuga kwemeza ko iyo telefoni wayishyuye koko.
                                Kubyemeza nibyo bizatuma uhabwa uturusho duhabwa abakoresha uru rubuga. Ushobora kubona utwo
                                turusho uciye kuri iyi ‘link/lien’ : Serivisi
                            </p>
                        </div>
                        <div className="flex">
                            <p className="flex my-auto justify-center items-center">
                                • Aho wemereza ko waguze ni aha : kwemeza ko naguze iyi tel
                            </p>
                        </div>
                        <div className="flex">
                            <p className="flex my-auto justify-center items-center">
                                Iyi KC niyo uzaha umucuruzi {`${shopData?.owner}`} ({`${shopData?.name}`}) kugirango aguhere iyo telefoni kuri
                                icyo giciro.
                            </p>
                        </div>
                        <div className="flex">
                            <p className="flex my-auto justify-center items-center">
                                • Choose where we can send a Komparas code:
                            </p>
                        </div>
                    </div>

                    <Form.Item
                        name="contactMethod"
                        rules={[{ required: true, message: 'Please select a contact method.' }]}
                    >
                        <Radio.Group className="flex space-x-12 twoCheckBox mt-2">
                            <Radio value="whatsapp" className="flex">
                                <p className="flex ml-1 my-auto justify-center font-bold items-center">WhatsApp</p>
                            </Radio>
                            <Radio value="email" className="flex">
                                <p className="flex ml-1 my-auto justify-center font-bold items-center">Email</p>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div>
        ),
    },
    {
        title: 'Step 3',
        // Step 3 also needs dynamic data to display user input summary.
        content: (formData: FormData) => (
            <div className="OpenWhatsappOrEmail flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Step 3: Review Information</h2>
                <p>
                    <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p>
                    <strong>Phone Number:</strong> {formData.phoneNumber}
                </p>
                <p>
                    <strong>Komparas Code:</strong> 12345676
                </p>
                <p>
                    <strong>Send Via:</strong> {formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
                </p>
                <p>
                    <strong>Note:</strong> The code will be sent to your{' '}
                    {formData.contactMethod === 'whatsapp' ? 'WhatsApp number' : 'email address'}.
                </p>
            </div>
        ),
    },
];

const Stepper = ({shopData}:any) => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phoneNumber: '',
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        contactMethod: 'whatsapp',
    });

    const next = async () => {
        try {
            const values = await form.validateFields();
            setFormData((prev) => ({ ...prev, ...values }));
            setCurrent((prev) => prev + 1);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const prev = () => {
        setCurrent((prev) => prev - 1);
    };

    const handleSubmit = () => {
        notification.success({
            message: 'Success',
            description: `The Komparas code has been sent to your ${formData.contactMethod === 'whatsapp' ? 'WhatsApp number' : 'email address'
                }.`,
            placement: 'topRight',
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[35rem]">
                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} layout="vertical" className="mt-4">
                    <div className="steps-content mt-6 mb-4">
                        {typeof steps[current].content === 'function'
                            ? steps[current].content(formData, shopData)
                            : steps[current].content}
                    </div>
                    <div className="steps-action flex justify-end space-x-4">
                        {current < steps.length - 1 && (
                            <Button className='bg-green-500 text-white' onClick={next}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button className='bg-green-500 text-white' onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={prev}>
                                Previous
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Stepper;
