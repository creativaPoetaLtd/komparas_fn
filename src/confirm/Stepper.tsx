import { useState, ReactNode } from 'react';
import { Steps, Button, Form, notification } from 'antd';
import { addKomparasCode } from '../api/shops';
import PriceCard from './PriceCard';
import CheckCard from './CheckCard';
import Switcher from './Switcher';

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

type StepContent = ReactNode | ((formData: FormData, handleSelect: (index: number, value: boolean) => void, selected: boolean[]) => ReactNode);

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
                <PriceCard price={200} />
                <div className='w-full flex my-4 flex-col'>
                    <Switcher selected={selected[3]} onSelect={(value) => handleSelect(3, value)} />
                </div>
                <CheckCard />
            </div>
        ),
    },
    {
        title: '',
        content: (formData, _, selected) => {
            const totalAmount = selected.filter(Boolean).length * 15000; // Each 'Yego' selected adds 15000 to the total

            return (
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td><strong className='text-green-600'>Amaserivise</strong></td>
                            <td>{formData.phoneNumberOrEmail}</td>
                        </tr>
                        <tr>
                            <td><strong>Kuguranirwa fone:</strong></td>
                            <td>{selected[0] ? 'Yego' : 'Oya'}</td>
                        </tr>
                        <tr>
                            <td><strong>Kugurizwa amafaranga:</strong></td>
                            <td>{selected[1] ? 'Yego' : 'Oya'}</td>
                        </tr>
                        <tr>
                            <td><strong>Kuhabwa ubwishingizi:</strong></td>
                            <td>{selected[2] ? 'Yego' : 'Oya'}</td>
                        </tr>
                        <tr>
                            <td><strong>Kugurizwa amafaranga:</strong></td>
                            <td>{selected[3] ? 'Yego' : 'Oya'}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Amount:</strong></td>
                            <td>{totalAmount === 0 ? 'Ubuntu' : `${totalAmount} RWF`}</td>
                        </tr>
                    </tbody>
                </table>
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
    const [selected, setSelected] = useState<boolean[]>([false, false, false, false]);

    const handleSelect = (index: number, value: boolean) => {
        setSelected((prev) => {
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
