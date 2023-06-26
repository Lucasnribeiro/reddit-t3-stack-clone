import { faCamera, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useCallback, useState } from "react";

const ProfileUserCard = () => {

    const [file, setFile] = useState<File[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target?.files?.[0]
        if( selectedFile ){
            setFile([selectedFile]);
        }
      };

    // const uploadSomeFiles = async () => {
        
    // };

    return (
        <div className="dark:!bg-navy-800 rounded-lg shadow-shadow-500 shadow-3xl relative mx-auto flex w-full max-w-[550px] flex-col items-center bg-white bg-cover bg-clip-border  dark:text-white dark:shadow-none">
            <div className="relative flex h-32 rounded-t-lg w-full justify-center bg-cover bg-blue-400" >
                <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                    <img className="h-full w-full rounded-full" src="https://i.ibb.co/6YbS9ff/avatar11.png" alt="" />
                </div>
                <div className="absolute -bottom-10 right-4 text-2xl items-center justify-center rounded-full text-blue-400 hover:text-blue-300">
                    <button><FontAwesomeIcon icon={faCog} /></button>
                </div>
                <div className="absolute bottom-4 right-2 text-2xl items-center h-[45px] w-[45px] justify-center rounded-full bg-white text-blue-400 hover:text-blue-300">
                    {/* <div>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={uploadSomeFiles}>Upload File</button>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col pt-16 text-slate-400">
                <h1></h1>
                <p>u/    · </p>

            </div>
            <div className="flex justify-around w-full mt-5 px-8">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-black">Karma</h1>
                    <p>1</p>
                </div>
                <div className="ml-16 w-1/2">
                    <h1 className="text-black">Cake Day</h1>
                    <p>1</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileUserCard;