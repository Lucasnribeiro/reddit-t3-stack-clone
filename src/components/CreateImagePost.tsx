import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PresignedPost } from "aws-sdk/clients/s3";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Image } from "~/types";
import { api } from "~/utils/api";
import Spinner from "./ui/Spinner";


const CreateImagePost =  ({subreddit}: {subreddit: string}) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('pending');
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageId, setImageId] = useState('');
    const [title, setTitle] = useState('');

    const { mutate: postMutation } = api.post.create.useMutation({
        onSettled: async () => {
          await router.push('/')
        }
      })

    const { mutateAsync: imageMutation, error } = api.post.uploadImage.useMutation()
      
    const handleSave = () => {

        postMutation({
          subredditId: subreddit,
          title: title,
          content: '',
          images: [ imageId ]
        })
        
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async () => {
                setSelectedImage(reader.result as string);
                setUploading(true)
                await imageMutation({})
                .then(async (response: { promise: PresignedPost, image: Image} | void) => {

                    if(response){
                        setImageId(response.image ? response.image.id : '')
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

    const handleRemoveImage = () => {

        setSelectedImage(null);
        setUploadStatus('pending')
        setImageId('')

        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input value to allow selecting the same image again
        }

    };

    return (
        <div className="border border-solid border-gray-400 bg-white p-4 rounded shadow">
            <div className="w-full flex flex-col space-y-4">
                <input className='border p-2' onChange={(e) => setTitle(e.target.value)} placeholder='Title'></input>
                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                />
                {selectedImage ? 
                    <>
                        <div>
                            <img src={selectedImage} alt="Preview" />
                        </div>
                        <div className="flex justify-end">
                            {(uploadStatus === 'error')  && <span className="text-red-500">There was an error uploading the image. </span>}
                            {uploading && <Spinner />}
                            <button onClick={handleRemoveImage}><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </>
                    :
                    <div className="flex justify-center items-center gap-3 min-h-[200px]">
                        <button 
                            className="flex items-center justify-center px-4 py-2 font-bold text-blue-500 border border-blue-500 rounded-3xl focus:outline-none hover:bg-blue-100 "
                            onClick={handleButtonClick}
                        >
                            Upload
                        </button> 
                        <span className="text-blue-500">a image</span>
                    </div>
                }

            </div>
            <div className="border-t border-gray-300 my-4"/>
            <div className="flex justify-end mt-3">
                <button
                onClick={handleSave}
                disabled={title.length === 0 || uploadStatus === 'error' || uploadStatus === 'pending' || subreddit === ''}
                className="flex items-center justify-center px-5 py-2 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600 disabled:bg-slate-300"
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CreateImagePost