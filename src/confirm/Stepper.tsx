import { useState, ReactNode } from 'react';
import { Steps, Button, Form, Switch, Checkbox, notification } from 'antd';
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
type StepContent = ReactNode | ((formData: FormData) => ReactNode);
interface StepType {
    title: string;
    content: StepContent;
}
const steps: StepType[] = [
    {
        title: '',
        content: (
            <div>
                <h2 className="text-lg font-semibold mb-4">Step 1: Kuguranirwa fone</h2>
                <p>⦁	Ndashaka guhabwa serivisi ijyanye no kuguranirwa telefoni mu gihe ntagishaka iyo mfite</p>
                <div className="flex w-full">
                    <p className="font-bold">Igiciro cya serivisi :</p>
                    <div className="w flex flex-col">
                        <p className="text-sm text-red-500 line-through font-bold">15 000 RWF</p>
                        <p className="text-sm text-green-500">Ubuntu</p>
                    </div>
                </div>
                <div className='w-full flex my-4 flex-col'>
                    <Switch
                        unCheckedChildren="Oya"
                        checkedChildren="Yego"
                        className="custom-switch"
                    />
                </div>
                <Form.Item
                    name="checkbox1"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please agree to this term.' }]}
                >
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
    },
    {
        title: '',
        content: (<div>
            <h2 className="text-lg font-semibold mb-4">Step 2: Kongererwa garanti</h2>
            <p>⦁ Ndashaka kongera igihe garantie iguranwa na telefoni imara*
            </p>
            <div className="flex w-full">
                <p className=" font-bold">Igiciro cya serivisi :</p>
                <div className="w flex flex-col">
                    <p className="text-sm text-red-500 line-through font-bold">15 000 RWF</p>
                    <p className="text-sm text-green-500">Ubuntu</p>
                </div>
            </div>
            <div className='w-full flex my-4 flex-col'>
                <Switch
                    unCheckedChildren="Oya"
                    checkedChildren="Yego"
                    className="custom-switch"
                />
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
        content: (<div>
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
                <Switch
                    unCheckedChildren="Oya"
                    checkedChildren="Yego"
                    className="custom-switch"
                />
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
        content: (<div>
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
                <Switch
                    unCheckedChildren="Oya"
                    checkedChildren="Yego"
                    className="custom-switch"
                />
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
    
];


const Stepper = ({ onClose }: { onClose: any }) => {
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
            return step.content(formData);
        }
        return step.content;
    };
    const handleFinish = async () => {
        try {
            await addKomparasCode(formData);
            notification.success({
                message: 'Byagenze neza',
                description: `Komparas code yawe ni ntayo.`,
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
        <div className="fixed inset-0 flex items-center justify-center md:px-0 px-1 bg-black bg-opacity-50 z-50">
            <div className="bg-white relative rounded-lg shadow-lg md:p-4 p-2 md:w-[35rem] w-full ">
                <Steps
                    direction='horizontal'
                    size='small'
                    className='w-full'
                    responsive={false}
                    current={current}>
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
                            {current < steps.length - 1 && (
                                <Button className='bg-green-500 text-white' onClick={next}>
                                    Komeza
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button className='bg-green-500 text-white' onClick={handleFinish}>
                                    Ohereza
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={prev}>
                                    Gusubira Inyuma
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