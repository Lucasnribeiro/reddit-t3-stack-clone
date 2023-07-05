import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PresignedPost } from "aws-sdk/clients/s3";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Subreddit } from "~/types";
import { api } from "~/utils/api";


export default function SubredditImage(subreddit: Subreddit){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {data: session } = useSession()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('pending');
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageId, setImageId] = useState<string | null>(subreddit.image);

    const { mutateAsync: imageMutation, error } = api.subreddit.uploadImage.useMutation()

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImageId('')
        if (file) {
            const reader = new FileReader();

            reader.onload = async () => {
                setSelectedImage(reader.result as string);
                setUploading(true)
                setUploadStatus('uploading')
                await imageMutation({subredditId: subreddit.id})
                .then(async (response: { promise: PresignedPost, image: string | null} | void) => {
                    if(response){
                        setImageId(response.image ? response.image : '')
                        try {
                            const postData = new FormData()
                            const presignedResponse = response.promise

                            for(const key in presignedResponse.fields) { 
                                postData.append(key, presignedResponse.fields[key] ?? '');
                            }
                            postData.append('Content-Type', file.type);
                            postData.append('file', file);
                            
                            const upload = await fetch(presignedResponse.url, {
                                method: "POST",
                                body: postData,
                            });
                        
                            if (upload.ok) {
                                setUploading(false)
                                setUploadStatus('uploaded')
                            } else {
                                setUploading(false)
                                setUploadStatus('error')
                            }
                        } catch (error) {
                            console.error("Error uploading image:", error);
                            setUploading(false)
                            setUploadStatus('error')
                        }
                    }
                    
                })
                .catch(() => setUploadStatus('error'))
            };

            reader.readAsDataURL(file);

            
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    if(subreddit.ownerId === session?.user.id || subreddit.admins?.some( admin => admin.id === session?.user.id) ){
        return (
            <>
            {uploadStatus === 'pending' && <img className="w-20 h-20 rounded-full transition-opacity opacity-100 group-hover:opacity-50" src={subreddit.image ? `https://react-clone-bucket.s3.us-east-1.amazonaws.com/subreddit/${subreddit.id}/${subreddit.image}` : '/images/placeholder-avatar.png'} alt=""/>}
            {uploadStatus === 'uploading' &&  
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            }
            {uploadStatus === 'uploaded' && <img className="w-20 h-20 rounded-full transition-opacity opacity-100 group-hover:opacity-50" src={ imageId ? `https://react-clone-bucket.s3.us-east-1.amazonaws.com/subreddit/${subreddit.id}/${imageId}` : '/images/placeholder-avatar.png'} alt=""/>}

            <input
                type="file"
                id="imageUpload"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
            />
            
            <FontAwesomeIcon className="top-8 left-8 absolute w-3.5 h-3.5 cursor-pointer opacity-0 group-hover:opacity-100" onClick={handleButtonClick} icon={faUpload}/>
        </>
        )
    }

    return (
        <img className="w-20 h-20 rounded-full" src={subreddit.image ? `https://react-clone-bucket.s3.us-east-1.amazonaws.com/subreddit/${subreddit.id}/${subreddit.image}` : '/images/placeholder-avatar.png'} alt=""/>
    )
}