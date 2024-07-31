import { useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const Questions = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "Nigute navugana namwe?",
            answer: "Ushobora kutuvugisha ukoresheje uburyo butandukanye buri kuri uru rubuga ahagana hasi nko kuduhamagara kuri telefoni, kutwandikira kuri emeyili, cyangwa uktwandikira ku mbuga nkoranyambaga zacu ndetse ukaba wanadusura aho dukorera i Kigali.",
            isOpen: false
        },
        {
            id: 2,
            question: "Ni bande bakoresha uru rubuga?",
            answer: "Abacuruzi ba telefoni, abaguzi ba telefoni, Abashaka kwamamaza",
            isOpen: false
        },
        {
            id: 3,
            question: "Ni uwuhe mwihariko w'uru rubuga??",
            answer: "Umwihariko uru rubuga rufite nuko rutanga serivise zitandukanye harimo nko: Gufasha amaduka mu kugurisha telefoni, gufasha abaguzi kubasha kugura telefoni mu maduka atandukanye batavuye aho bari ndetse bakagira amahitamo atandukanye.",
            isOpen: false
        },
        {
            id: 4,
            question: "Amakuru abarizwa hano aba yizewe?",
            answer: "Yego yaba amatekefoni, amaduka, ibiciro ndetse n'uburyo bwo kwishyura birizewe kubera ko gukoresh uru rubuga ari ubushake bw'umuguzi, umugurisha(Iduka) bivuze ko aribo baduha uburenganzira bbwo gukoresha amakuru yabo.",
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
                <h1 className="flex font-bold text-3xl" ><span className="text-[#EDB62E]">Ibibazo</span> <span className='ml-2'>benshi bakunze kwibaza</span> </h1>
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
