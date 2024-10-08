import { useState, ReactNode, useEffect } from 'react';
import { Steps, Button, Form, Input, Checkbox,  notification } from 'antd';
import { Link } from 'react-router-dom';
import { addKomparasCode } from '../../../api/shops';
import { useParams } from 'react-router-dom';
const { Step } = Steps;

interface FormData {
    fullName: string;
    phoneNumberOrEmail: string;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    contactMethod: 'whatsapp' | 'email' | 'none';
    komparasCode: string;
    shopId: string;
    shopName: string;
    shopEmail: string;
    product_id: string;
    sold_confirm: boolean;
}
type StepContent = ReactNode | ((formData: FormData, shopData: any) => ReactNode);
interface StepType {
    title: string;
    content: StepContent;
}
const steps: StepType[] = [
    {
        title: '',
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
                    name="phoneNumberOrEmail"
                    rules={[{ 
                        required: true, 
                        pattern: /^(\+250|0)(7[0-8]|8[0-9]|9[0-4]|9[6-8])\d{7}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Syiramo email cg numero ya telephone itangiza na (+250)' }]}
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
                        kubona izo serivisi uciye kuri iyi ‘link/lien’ : <Link className='u underline-offset-1 text-blue-700' to={'/serivisi'}>Serivisi</Link>
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
        title: '',
        content: (formData: FormData, shopData) => (
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <p className="w-full flex items-center mx-auto justify-center">Urakoze Cyane</p>
                    <h1 className="font-semibold w-full flex items-center mx-auto justify-center">
                        {formData.fullName}
                    </h1>
                    <p className="w-full flex items-center mx-auto justify-center">
                        Gukoresha <Link className="ml-1" to={''}> Komparas</Link>
                    </p>
                    
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
                    {/* <Form.Item
                        name="contactMethod"
                        rules={[{ required: true, message: 'Please select a contact method.' }]}
                    >
                        <Radio.Group className="flex md:space-x-12 space-x-3 twoCheckBox mt-2">
                            <Radio value="whatsapp" className="flex">
                                <p className="flex ml-1 my-auto justify-center font-bold items-center">WhatsApp</p>
                            </Radio>
                            <Radio value="email" className="flex">
                                <p className="flex ml-1 my-auto justify-center font-bold items-center">Email</p>
                            </Radio>
                            <Radio value="none" className="flex">
                                <p className="flex ml-1 my-auto justify-center font-bold items-center">Ntanahamwe</p>
                            </Radio>
                        </Radio.Group>
                    </Form.Item> */}
                </div>
            </div>
        ),
    },
    {
        title: '',
        content: (formData: FormData) => (
            <div className="OpenWhatsappOrEmail flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Step 3: Review Information</h2>
                <p>
                    <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p>
                    <strong>Phone Number:</strong> {formData.phoneNumberOrEmail}
                </p>
                <p className='text-green-600'>
                    <strong>Komparas Code:</strong> {formData.komparasCode}
                </p>
                {formData?.contactMethod !== 'none' && (
                    <p>
                        <strong>Send Via:</strong> {formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </p>
                )}
                {formData?.contactMethod !== 'none' && (

                    <p>
                        <strong>Note:</strong> The code will be sent to your{' '}
                        {formData.contactMethod === 'whatsapp' ? 'WhatsApp number' : 'email address'}.
                    </p>
                )}
            </div>
        ),
    },
];

const Stepper = ({ shopData, onClose }: { shopData: any, onClose: any }) => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const { productId }: any = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phoneNumberOrEmail: '',
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        contactMethod: 'whatsapp',
        komparasCode: '',
        shopId: shopData._id,
        shopName: shopData.name,
        shopEmail: shopData.email,
        product_id: productId,
        sold_confirm: false,
    });
    const phoneNumberOrEmail = form?.getFieldValue("phoneNumberOrEmail");
    const contactMethod = phoneNumberOrEmail?.match(/^(\+250|0)(7[0-8]|8[0-9]|9[0-4]|9[6-8])\d{7}$/) ? 'whatsapp' : 'email';
    useEffect(() => {
        setFormData((prev) => ({ ...prev, contactMethod }));
    }, [phoneNumberOrEmail]);
    const generateKomparasCode = () => {
        const shopName = shopData.name;
        const clientName = formData.fullName;
        const randomNumber = Math.floor(Math.random() * 100000);
        return `KC-${shopName?.slice(0, 3).toUpperCase()}-${clientName?.slice(0, 3).toUpperCase()}-${randomNumber}`;
    };
    const komparasCode = generateKomparasCode();
    useEffect(() => {
        setFormData((prev) => ({ ...prev, komparasCode }));
    }, [formData.fullName, formData.phoneNumberOrEmail, shopData.name]);
    const prev = () => {
        setCurrent((prev) => prev - 1);
    };
    const renderStepContent = (step: StepType): ReactNode => {
        if (typeof step.content === 'function') {
            return step.content(formData, shopData);
        }
        return step.content;
    };

    const handleFinish = async () => {
        setLoading(true);
        setError(false);
        try {
            await addKomparasCode(formData);
            notification.success({
                message: 'Byagenze neza',
                description: `Komparas code yawe ni ${komparasCode}.`,
                placement: 'topRight',
            });
        } catch (error) {
            console.error('Failed to add Komparas code:', error);
            notification.error({
                message: 'Ibyo ntibyagenze',
                description: 'Ntibyagenze, ongera ugerageze',
                placement: 'topRight',
            });
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const next = async () => {
        try {
            const values = await form.validateFields();
            setFormData((prev) => ({ ...prev, ...values }));
    
            if (current === steps.length - 2) {
                await handleFinish();
                if (!error) {
                    setCurrent((prev) => prev + 1);
                }
            } else {
                setCurrent((prev) => prev + 1);
            }
        } catch (validationError) {
            console.error('Validation failed:', validationError);
            notification.error({
                message: 'Validation Error',
                description: 'Please correct the errors in the form before proceeding.',
                placement: 'topRight',
            });
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center md:px-0 px-1 bg-black bg-opacity-50 z-50">
            <div className="bg-white relative rounded-lg shadow-lg md:p-4 p-2 md:w-[35rem] w-full">
                <Steps
                    direction='horizontal'
                    size='small'
                    className='w-full'
                    responsive={false}
                    current={current}
                >
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} layout="vertical" className="mt-4">
                    <div className="steps-content mt-6 mb-4">
                        {renderStepContent(steps[current])}
                    </div>
                    <div className='flex justify-between'>
                        <button className='bg-red-200 hover:bg-red-500 rounded-md px-2 text-white' onClick={onClose}>Close</button>
                        <div className="steps-action flex justify-end space-x-4">
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={prev}>
                                    Gusubira Inyuma
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button className='bg-green-500 text-white' onClick={next} loading={loading}>
                                    Komeza
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button className='bg-green-500 text-white' onClick={onClose}>
                                    Funga
                                </Button>
                            )}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Stepper;
