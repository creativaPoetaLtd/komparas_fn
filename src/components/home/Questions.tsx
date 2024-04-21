import { useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const Questions = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "How can I get in touch with you?",
            answer: "Lorem ipsum dolor sit amet consectetur. Proin arcu libero aliquet id sed at non. Cursus libero a volutpat adipiscing pulvinar in risus. Ac donec magna vestibulum leo nunc varius mattis. Natoque tincidunt cursus sem sapien ultrices eu.",
            isOpen: false
        },
        {
            id: 2,
            question: "Who are your internal users?",
            answer: "Lorem ipsum dolor sit amet consectetur. Proin arcu libero aliquet id sed at non. Cursus libero a volutpat adipiscing pulvinar in risus. Ac donec magna vestibulum leo nunc varius mattis. Natoque tincidunt cursus sem sapien ultrices eu.",
            isOpen: false
        },
        {
            id: 3,
            question: "Who are your internal users?",
            answer: "Lorem ipsum dolor sit amet consectetur. Proin arcu libero aliquet id sed at non. Cursus libero a volutpat adipiscing pulvinar in risus. Ac donec magna vestibulum leo nunc varius mattis. Natoque tincidunt cursus sem sapien ultrices eu.",
            isOpen: false
        },
        {
            id: 4,
            question: "Who are your internal users?",
            answer: "Lorem ipsum dolor sit amet consectetur. Proin arcu libero aliquet id sed at non. Cursus libero a volutpat adipiscing pulvinar in risus. Ac donec magna vestibulum leo nunc varius mattis. Natoque tincidunt cursus sem sapien ultrices eu.",
            isOpen: false
        },
        {
            id: 5,
            question: "Who are your internal users?",
            answer: "Lorem ipsum dolor sit amet consectetur. Proin arcu libero aliquet id sed at non. Cursus libero a volutpat adipiscing pulvinar in risus. Ac donec magna vestibulum leo nunc varius mattis. Natoque tincidunt cursus sem sapien ultrices eu.",
            isOpen: false
        },
    ]);

    const toggleAnswer = (id: number) => {
        setQuestions(questions.map((q) => {
            if (q.id === id) {
                return { ...q, isOpen: !q.isOpen };
            }
            return q;
        }));
    };

    return (
        <div className='flex flex-col w-full lg:px-[4rem] px-2 mt-6 py-12'>
            <div className="flex  lg:w-[621px] flex-col justify-center m-auto items-center text-center space-y-2 p-3">
                <h1 className="flex font-bold text-3xl" ><span>Frequently Asked</span> <span className="text-[#EDB62E] ml-2">Questions</span></h1>
            </div>
            <div className="lg:w-[1000px] md:w-[738px] w-full flex flex-col gap-3 py-12 mx-auto justify-center items-center">
                {questions.map((q) => (
                    <div key={q.id} className="w-full flex flex-col p-4 border border-[#D6D6D6] rounded-md">
                        <div className="w-full flex justify-between items-center">
                            <p className="flex font-semibold">{q.question}</p>
                            {q.isOpen ? (
                                <AiFillMinusCircle className="text-[#EDB62E] text-lg" onClick={() => toggleAnswer(q.id)} />
                            ) : (
                                <AiFillPlusCircle className="text-[#EDB62E] text-lg" onClick={() => toggleAnswer(q.id)} />
                            )}
                        </div>
                        {q.isOpen && (
                            <p className="text-sm mt-5">{q.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
