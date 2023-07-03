import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RichTextEditorReply from "./RichTextEditorReply";



export default function ReplyToComment({parentId}: {parentId: string}){
    

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full text-gray-500 space-x-4">
                <div className="text-lg flex place-items-center space-x-2 p-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faMessage} />
                    <div>
                        Reply
                    </div>
                </div>
            </div>
        </div>
    )
}