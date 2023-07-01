import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillNoSSRWrapper from './lib/QuillNoSSRWrapper';
import { api } from '~/utils/api';
import {  useRouter } from 'next/router';

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


const RichTextEditorComment = ({subreddit, postId}: {subreddit: string, postId: string}) => {
  const [content, setContent] = useState('');
  const router = useRouter();

  const { mutate } = api.comment.create.useMutation({
    onSettled: async () => {
      await router.push('/')
    }
  })

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    mutate({
      postId: postId,
      content: content
    })
    
  };

  return (
    <div className=" bg-white p-4 rounded">
        <div className="w-full flex flex-col space-y-4">
            <div className="rich-text-editor-wrapper">
                <span className="text-sm">Post a comment</span>
                <QuillNoSSRWrapper placeholder='What are your thoughts?' value={content} onChange={handleEditorChange} theme='snow' modules={modules} formats={formats}/>
            </div>
        </div>
        <div className="flex justify-end mt-3">
            <button
            onClick={handleSave}
            disabled={ content === ''}
            className="flex items-center justify-center px-4 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600 disabled:bg-slate-300"
            >
                Comment
            </button>
        </div>
    </div>
  );
};

export default RichTextEditorComment;