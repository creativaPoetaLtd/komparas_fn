import { useState, ReactNode } from 'react';
import { Steps, Button, Form, Checkbox, notification } from 'antd';
import { addKomparasCode } from '../api/shops';
import { Star } from '@phosphor-icons/react';
const { Step } = Steps;

interface FormData {
    fullName: string;
    phoneNumberOrEmail: string;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    contactMethod: 'whatsapp' | 'email' | 'none';
    komparasCode: string;
}
type StepContent = ReactNode | ((formData: FormData, handleSelect: () => void, selected: boolean) => ReactNode);
interface StepType {
    title: string;
    content: StepContent;
}
const steps: StepType[] = [
    {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
                <h2 className="text-lg font-semibold mb-4">Step 1: Kuguranirwa fone</h2>
                <p>⦁ Ndashaka guhabwa serivisi ijyanye no kuguranirwa telefoni mu gihe ntagishaka iyo mfite</p>
                <div className="flex w-full">
                    <p className="font-bold">Igiciro cya serivisi :</p>
                    <div className="flex flex-col">
                        <p className="text-sm text-red-500 line-through font-bold">15 000 RWF</p>
                        <p className="text-sm text-green-500">Ubuntu</p>
                    </div>
                </div>
                <div className='w-full flex my-4 flex-col'>
                    <div className='switcher border-yellow-500 rounded-md border  w-fit flex mx-auto justify-center'>
                        <button
                            className={`switcher__item rounded-l-md p-2 px-4 ${selected ? 'bg-green-400 ' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Yego
                        </button>
                        <button
                            className={`switcher__item rounded-r-md p-2 px-4 ${!selected ? 'bg-green-400' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Oya
                        </button>
                    </div>
                </div>
                <Form.Item
                    name="checkbox1"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please agree to this term.' }]}>
                    <Checkbox>
                        Ndemeza ko nasomye kandi numvishe neza amategeko n’amabwiriza ndetse n’ibindi bijyanye na serivisi yo kuguranirwa telefoni (yasome neza)
                    </Checkbox>
                </Form.Item>
                <div className="flex w-full">
                    <Star className="text-red-500 my-auto justify-center" />
                    <p className="ml-2">Soma amategeko n’amabwiriza agenga ibijyanye no kuguranirwa telefoni mu gihe utagishaka iyo ufite</p>
                </div>
            </div>
        ),
    },   {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
                <h2 className="text-lg font-semibold mb-4">Step 1: Kugurizwa amafaranga</h2>
                <p>⦁ Ndashaka guhabwa serivisi ijyanye no kuba nagurizwa amafaranga mu gihe nyacyeneye, ariko mbaje gutangaho ingwate iyi telefoni*</p>
                <div className="flex w-full">
                    <p className="font-bold">Igiciro cya serivisi :</p>
                    <div className="flex flex-col">
                        <p className="text-sm text-red-500 line-through font-bold">15 000 RWF</p>
                        <p className="text-sm text-green-500">Ubuntu</p>
                    </div>
                </div>
                <div className='w-full flex my-4 flex-col'>
                <div className='switcher border-yellow-500 rounded-md border  w-fit flex mx-auto justify-center'>
                        <button
                            className={`switcher__item rounded-l-md p-2 px-4 ${selected ? 'bg-green-400 ' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Yego
                        </button>
                        <button
                            className={`switcher__item rounded-r-md p-2 px-4 ${!selected ? 'bg-green-400' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Oya
                        </button>
                    </div>
                </div>
                <Form.Item
                    name="checkbox2"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please agree to this term.' }]}>
                    <Checkbox>
                        Ndemeza ko nasomye kandi numvishe neza amategeko n’amabwiriza ndetse n’ibindi bijyanye na kongera igihe garantie izamara (yasome neza)
                    </Checkbox>
                </Form.Item>
                <div className="flex w-full">
                    <Star className="text-red-500 my-auto justify-center" />
                    <p className="ml-2">Soma amategeko n’amabwiriza agenga ibijyanye no kongera igihe garantie imara</p>
                </div>
            </div>
        ),
    },   {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
            <h2 className="text-lg font-semibold mb-4">Step 2: Kuhabwa ubwishingizi</h2>
            <p>⦁	Ndashaka gufata ubwishingiza bwa byose*
            </p>
            <div className="flex w-full">
                <p className="font-bold">Igiciro cya serivisi :</p>
                <div className="w flex flex-col">
                    <p className="text-sm text-red-500 line-through font-bold">15 000 RWF</p>
                    <p className="text-sm text-green-500">Ubuntu</p>
                </div>
            </div>
            <div className='w-full flex my-4 flex-col'>
            <div className='switcher border-yellow-500 rounded-md border  w-fit flex mx-auto justify-center'>
                        <button
                            className={`switcher__item rounded-l-md p-2 px-4 ${selected ? 'bg-green-400 ' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Yego
                        </button>
                        <button
                            className={`switcher__item rounded-r-md p-2 px-4 ${!selected ? 'bg-green-400' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Oya
                        </button>
                    </div>
            </div>
            <Form.Item
                name="checkbox1"
                valuePropName="checked"
                rules={[{ required: true, message: 'Please agree to this term.' }]}
            >
                <Checkbox>
                    Ndemeza ko nasomye kandi numvishe neza amategeko n’amabwiriza ndetse n’ibindi bijyanye na kongera igihe garantie izamara (yasome neza)
                </Checkbox>
            </Form.Item>

            <div className="flex w-full">
                <Star className="text-red-500 my-auto justify-center" />
                <p className="ml-2">Soma amategeko n’amabwiriza agenga ibijyanye no kongera igihe garantie imara</p>
            </div>
        </div>
        ),
    },
    {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
            <h2 className="text-lg font-semibold mb-4">Step 1: Kugurizwa amafaranga</h2>
            <p>⦁	Ndashaka guhabwa serivisi ijyanye no kuba nagurizwa amafaranga mu gihe nyacyeneye, ariko mbaje gutangaho ingwate iyi telefoni*
            </p>
            <div className="flex w-full">
                <p className="font-bold">Igiciro cya serivisi :</p>
                <div className="w flex flex-col">
                    <p className="text-sm text-red-500 line-through font-bold">15 000 RWF</p>
                    <p className="text-sm text-green-500">Ubuntu</p>
                </div>
            </div>
            <div className='w-full flex my-4 flex-col'>
            <div className='switcher border-yellow-500 rounded-md border  w-fit flex mx-auto justify-center'>
                        <button
                            className={`switcher__item rounded-l-md p-2 px-4 ${selected ? 'bg-green-400 ' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Yego
                        </button>
                        <button
                            className={`switcher__item rounded-r-md p-2 px-4 ${!selected ? 'bg-green-400' : 'bg-white'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect();
                            }}>
                            Oya
                        </button>
                    </div>
            </div>
            <Form.Item
                name="checkbox1"
                valuePropName="checked"
                rules={[{ required: true, message: 'Please agree to this term.' }]}
            >
                <Checkbox>
                    Ndemeza ko nasomye kandi numvishe neza amategeko n’amabwiriza ndetse n’ibindi bijyanye na kongera igihe garantie izamara (yasome neza)
                </Checkbox>
            </Form.Item>

            <div className="flex w-full">
                <Star className="text-red-500 my-auto justify-center" />
                <p className="ml-2">Soma amategeko n’amabwiriza agenga ibijyanye no kongera igihe garantie imara</p>
            </div>
        </div>
        ),
    },
    {
        title: '',
        content: (formData, _ , selected) => {
            const totalAmount = selected ? 15000 : 0;

            return (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Contact:</strong> {formData.phoneNumberOrEmail}</p>
                    <p><strong>Kuguranirwa fone:</strong> {selected ? 'Yes' : 'No'}</p>
                    <p><strong>Kugurizwa amafaranga:</strong> {selected ? 'Yes' : 'No'}</p>
                    <p><strong>Kuhabwa ubwishingizi:</strong> {selected ? 'Yes' : 'No'}</p>
                    <p><strong>Kugurizwa amafaranga:</strong> {selected ? 'Yes' : 'No'}</p>
                    <p><strong>Total Amount:</strong> {totalAmount === 0 ? 'Ubuntu' : `${totalAmount} RWF`}</p>
                </div>
            );
        },
    },
];

const Stepper = ({ onClose }: { onClose: () => void }) => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phoneNumberOrEmail: '',
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        contactMethod: 'whatsapp',
        komparasCode: '',
    });
    const [selected, setSelected] = useState<boolean>(true);

    const handleSelect = () => {
        setSelected((prev) => !prev);
    };

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

    const renderStepContent = (step: StepType): ReactNode => {
        if (typeof step.content === 'function') {
            return step.content(formData, handleSelect, selected);
        }
        return step.content;
    };

    const handleFinish = async () => {
        try {
            await addKomparasCode(formData);
            notification.success({
                message: 'Byagenze neza',
                description: 'Komparas code yawe ni ntayo.',
                placement: 'topRight',
            });
            onClose();
        } catch (error) {
            console.error('Failed to add Komparas code:', error);
            notification.error({
                message: 'Ibyo ntibyagenze',
                description: 'Ntibyagenze, ongera ugerageze',
                placement: 'topRight',
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white relative rounded-lg shadow-lg md:p-4 p-2 md:w-[35rem] w-full">
                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} layout="vertical" className="mt-4">
                    <div className="steps-content mt-6 mb-4">
                        {renderStepContent(steps[current])}
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 text-white" onClick={onClose}>
                            Close
                        </button>
                        <div className="steps-action flex space-x-4">
                            {current > 0 && (
                                <Button onClick={prev}>
                                    Gusubira Inyuma
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button className="bg-green-500 text-white" onClick={next}>
                                    Komeza
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button className="bg-green-500 text-white" onClick={handleFinish}>
                                    Ohereza
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