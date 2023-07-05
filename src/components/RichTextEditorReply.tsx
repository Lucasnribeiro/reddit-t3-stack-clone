import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillNoSSRWrapper from './lib/QuillNoSSRWrapper';
import { api } from '~/utils/api';

 const modules = {
    toolbar: [
      ['bold', 'italic', 'link', 'strike', { 'script': 'super' }, 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

interface RichTextEditorReplyProps {
  parentId: string,
  postId: string
  reply: boolean,
  setReply: React.Dispatch<React.SetStateAction<boolean>>
}

const RichTextEditorReply = ({parentId, postId, reply, setReply}: RichTextEditorReplyProps ) => {
  const [content, setContent] = useState('');

  const trpc = api.useContext()

  const { mutate } = api.comment.reply.useMutation({
    onSettled: async () => {
      setReply(false)
      await trpc.comment.all.invalidate()
    }
  })

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    mutate({
      postId: postId,
      parentId: parentId,
      content: content
    })
    
  };

  return (
    <div className=" bg-white p-4 rounded w-full">
        <div className="flex flex-col space-y-4">
            <div className="rich-text-editor-wrapper">
                <QuillNoSSRWrapper placeholder='Reply to a comment.' value={content} onChange={handleEditorChange} theme='snow' modules={modules} formats={formats}/>
            </div>
        </div>
        <div className="flex justify-end mt-3 space-x-6">
          <button
            onClick={() => setReply(false)}
            className="flex items-center justify-center px-4 font-bold text-blue-500 rounded-3xl focus:outline-none hover:bg-gray-200 disabled:bg-slate-300"
            >
                Cancel
            </button>
            <button
            onClick={handleSave}
            disabled={ content.replace(/<(.|\n)*?>/g, '').trim().length === 0 }
            className="flex items-center justify-center px-4 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600 disabled:bg-slate-300"
            >
                Reply
            </button>
        </div>
    </div>
  );
};

export default RichTextEditorReply;