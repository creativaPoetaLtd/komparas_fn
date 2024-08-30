import { useState, ReactNode } from 'react';
import { Steps, Button, Form, notification } from 'antd';
import { addKomparasCode } from '../api/shops';
import PriceCard from './PriceCard';
import CheckCard from './CheckCard';
import Switcher from './Switcher';
import { FaTimes } from 'react-icons/fa';

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

type StepContent = ReactNode | ((formData: FormData, handleSelect: (index: number, value: boolean) => void, selected: boolean[], setSelected: any) => ReactNode);

interface StepType {
    title: string;
    content: StepContent;
}
const steps: StepType[] = [
    {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
                <p>⦁ Ndashaka guhabwa serivisi ijyanye no kuguranirwa telefoni mu gihe ntagishaka iyo mfite</p>
                <PriceCard price={200} />
                <div className='w-full flex my-4 flex-col'>
                    <Switcher selected={selected[0]} onSelect={(value) => handleSelect(0, value)} />
                </div>
                <CheckCard />
            </div>
        ),
    },
    {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
                <p>⦁ Ndashaka guhabwa serivisi ijyanye no kuba nagurizwa amafaranga mu gihe nyacyeneye, ariko mbaje gutangaho ingwate iyi telefoni*</p>
                <PriceCard price={200} />
                <div className='w-full flex my-4 flex-col'>
                    <Switcher selected={selected[1]} onSelect={(value) => handleSelect(1, value)} />
                </div>
                <CheckCard />
            </div>
        ),
    },
    {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
                <p>⦁ Ndashaka gufata ubwishingiza bwa byose*</p>
                <PriceCard price={200} />
                <div className='w-full flex my-4 flex-col'>
                    <Switcher selected={selected[2]} onSelect={(value) => handleSelect(2, value)} />
                </div>
                <CheckCard />
            </div>
        ),
    },
    {
        title: '',
        content: (_, handleSelect, selected) => (
            <div>
                <p>⦁ Ndashaka guhabwa serivisi ijyanye no kuba nagurizwa amafaranga mu gihe nyacyeneye, ariko mbaje gutangaho ingwate iyi telefoni*</p>
                <PriceCard price={1500} />
                <div className='w-full flex my-4 flex-col'>
                    <Switcher selected={selected[3]} onSelect={(value) => handleSelect(3, value)} />
                </div>
                <CheckCard />
            </div>
        ),
    },
    {
        title: '',
        content: (formData, _, selected, setSelected) => {
            const totalAmount = selected.filter(Boolean).length * 15000;

            // Handler for removing a selected service
            const handleRemoveService = (index: number) => {
                const newSelected = [...selected];
                newSelected[index] = false; // Set the service as unselected
                setSelected(newSelected);
            };

            return (
                <>
                    <table className="w-full">

                        <tbody>
                            <div className='rounded-xl w-fit mb-4 border-2 border-black px-4 py-2'>Serivise zafashwe
                            </div>
                            {selected[0] && (
                                <tr className='mt-12 py-12'>
                                    <td className='flex space-x-3 py-2'>
                                        <button className='text-red-600 border flex justify-center items-center w-5 p-2 rounded-full h-5 border-red-500' onClick={() => handleRemoveService(0)}>X</button>
                                        <strong>Kuguranirwa fone:</strong>
                                    </td>
                                    <td>
                                    <div className='flex space-x-4 font-medium'>
                                            <p className='f text-gray-700 line-through
                                            '>1500rwf</p>
                                            <p>0</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {selected[1] && (
                                <tr>
                                    <td className='flex space-x-3 py-2'>
                                        <button className='text-red-600 border flex justify-center items-center w-5 p-2 rounded-full h-5 border-red-500' onClick={() => handleRemoveService(1)}>X</button>
                                        <strong>Kugurizwa amafaranga:</strong>
                                    </td>
                                    <td>
                                    <div className='flex space-x-4 font-medium'>
                                            <p className='f text-gray-700 line-through
                                            '>1500rwf</p>
                                            <p>0</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {selected[2] && (
                                <tr>
                                    {formData.checkbox1 ? '' : ''}
                                    <td className='flex space-x-3 py-2'>
                                        <button className='text-red-600 border flex justify-center items-center w-5 p-2 rounded-full h-5 border-red-500' onClick={() => handleRemoveService(2)}>X</button>
                                        <strong>Kuhabwa ubwishingizi:</strong>
                                    </td>
                                    <td>
                                        <div className='flex space-x-4 font-medium'>
                                            <p className='f text-gray-700 line-through
                                            '>1500rwf</p>
                                            <p>0</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {selected[3] && (
                                <tr>
                                    <td className='flex space-x-3 py-2'>
                                        <button className='text-red-600 border flex justify-center items-center w-5 p-2 rounded-full h-5 border-red-500' onClick={() => handleRemoveService(3)}>X</button>
                                        <strong>Kugurizwa amafaranga:</strong>
                                    </td>
                                    <td>
                                    <div className='flex space-x-4 font-medium'>
                                            <p className='f text-gray-700 line-through
                                            '>1500rwf</p>
                                            <p>0</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {!selected.some(Boolean) && (
                                <tr className='w w-full m-auto flex justify-center'>
                                    <td className='text-red-500 p-12 m-auto flex justify-center'>Nta serivisi wahisemo🫤</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {selected.some(Boolean) &&
                        <div className='flex w-full ml-auto mt-4'>
                            <div className='flex space-x-5 justify-end ml-auto border-2 border-black rounded-xl py-2 px-4 w-fit'>
                                <p className='text-green-500 font-bold'>Total</p>
                                <p className='t text-red-500  line-through'>{totalAmount === 0 ? 'Ubuntu' : `${totalAmount} RWF`}</p>
                                <p className='text-green-500 font-bold'>{totalAmount === 0 ? 'Ubuntu' : '0 RWF'}</p>
                            </div>
                        </div>
                    }
                </>
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
    const [selected, setSelected] = useState<boolean[] | any>([false, false, false, false]);

    const handleSelect = (index: number, value: boolean) => {
        setSelected((prev: any) => {
            const newSelected = [...prev];
            newSelected[index] = value;
            return newSelected;
        });
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
            return step.content(formData, handleSelect, selected, setSelected);
        }
        return step.content;
    };

    const handleFinish = async () => {
            notification.success({
                message: 'Byagenze neza',
                description: 'Urakoze gihitamo izo serivise.',
                placement: 'topRight',
            });
            onClose();
    };

    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black py-12 bg-opacity-50 z-50">
            <div className="bg-white relative rounded-lg shadow-lg md:p-4  p-2 md:w-[35rem] w-full">
                <Steps current={current} className='mt-6'>
                    {steps.map((item) => (
                        <Step
                            style={{ fontSize: '0.01rem', color: "yellow" }}
                            key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} layout="vertical" className="mt-4">
                    <div className="steps-content mt-6 mb-4">
                        {renderStepContent(steps[current])}
                    </div>
                    <div className="flex ">
                        <button className=" absolute top-0 right-0 bg-red-500 hover:bg-red-600  px-2 py-2 text-white rounded-full" onClick={onClose}>
                            <FaTimes />
                        </button>
                        <div className="steps-action w-full justify-between flex">
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
                                    Emeza
                                </Button>
                            )}
                        </div>
                    </div>
                    {current < steps.length - 1 && (
                        <div className="flex mt-3 w-full">
                            <p className="ml-2 text-xs">Soma amategeko n’amabwiriza agenga ibijyanye no kuguranirwa telefoni mu gihe utagishaka iyo ufite</p>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default Stepper;