import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import "../style.css";

const NewTab: React.FC = () => {
    const [word, setWord] = useState('')
    const [meanings, setMeanings] = useState(null)
    const [error, setError] = useState(null)
    const langs = [
        { id: 1, name: 'Turkish-English' },
        { id: 2, name: 'French-English' },
        { id: 3, name: 'Spanish-English' },
        { id: 4, name: 'German-English' },
    ]
    const [selectedLang, setSelectedLang] = useState(langs[0])
    const handleSearch = async (e) => {
        setError(null)
        setMeanings(null)
        e.preventDefault();
        const { data } = await axios.get(`http://localhost:8080/api/${word}?lang=${selectedLang.name.toLowerCase()}`)

        if (data.meanings[0] !== "No result found") {
            setMeanings(data.meanings)
        };
        if (data.meanings[0] === "No result found") {
            setError(data.meanings[0])
        }
    }


    return (
        <div className="bg-bg h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl text-white font-light my-4 flex items-center"><p className="text-red-500">tur</p>eng</h1>
            <form onSubmit={e => handleSearch(e)} className="w-full max-w-2xl rounded-md flex items-center">
                <div className="bg-dark_gray p-3 flex items-center gap-x-2 w-full rounded-md focus-within:outline-none focus-within:border-light_gray focus-within:ring-2 focus-within:ring-light_gray">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-300 mx-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                        placeholder="Search..."
                        onChange={e => setWord(e.target.value.toLowerCase())}
                        className="w-full text-white  bg-transparent  outline-none text-lg   "
                    />
                    <Listbox as="div" value={selectedLang} onChange={setSelectedLang}>
                        <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-light_gray py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate  text-white">{selectedLang.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>

                                </span>
                            </Listbox.Button>

                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark_gray py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {langs.map((item, i) => (
                                    <Listbox.Option
                                        key={i}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pr-4 ${active ? 'bg-light_gray text-white' : 'text-gray-200'
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate text-center mx-auto ${selected ? 'font-medium text-white' : 'font-normal'}`} >
                                                    {item.name}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>
                    <button type="submit" className="text-gray-500 ml-2">Press Enter</button>
                </div>
            </form>

            <div className="w-full max-w-2xl overflow-auto custom-scroll h-4/5 flex flex-col gap-y-2 mt-2">
                {
                    error && <p className="text-red-500 text-2xl text-center font-light mt-8">{error}</p>
                }
                {
                    meanings === null ? <></> : meanings.map((item, i) => (
                        <form onSubmit={e => e.preventDefault()} key={i} className="flex justify-end items-center w-full text-sm bg-dark_gray rounded  hover:bg-light_gray">
                            <div className="border-r border-light_gray p-3 w-1/2">
                                <p className="text-gray-400">{item.usage}</p>
                            </div>
                            <div className="p-3 max-w-[300px] w-1/2">
                                <p className="text-white">{item.meaning}</p>
                            </div>
                        </form>
                    ))
                }

            </div>
        </div>
    );
};

export default NewTab;
