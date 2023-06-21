import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillNoSSRWrapper from './lib/QuillNoSSRWrapper';
import { api } from '~/utils/api';
import {  useRouter } from 'next/router';

 const modules = {
    toolbar: [
      ['bold', 'italic', 'link', 'strike', { 'script': 'super' }, 'blockquote'],
      [{ 'header': [1, false] }, {'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


const RichTextEditor = ({subreddit}: {subreddit: string}) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();

  const { mutate } = api.post.create.useMutation({
    onSettled: async () => {
      await router.push('/')
    }
  })

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {

    mutate({
      subredditId: subreddit,
      title: title,
      content: content
    })
    
  };

  return (
    <div className="border border-solid border-gray-400 bg-white p-4 rounded shadow">
        <div className="w-full flex flex-col space-y-4">
            <input className='' onChange={(e) => setTitle(e.target.value)} placeholder='Title'></input>
            <div className="rich-text-editor-wrapper">
                <QuillNoSSRWrapper value={content} onChange={handleEditorChange} theme='snow' modules={modules} formats={formats}/>
            </div>
        </div>
        <div className="border-t border-gray-300 my-4"/>
        <div className="flex justify-end mt-3">
            <button
            onClick={handleSave}
            disabled={title.length == 0}
            className="flex items-center justify-center px-5 py-2 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600 disabled:bg-slate-300"
            >
                Post
            </button>
        </div>
    </div>
  );
};

export default RichTextEditor;