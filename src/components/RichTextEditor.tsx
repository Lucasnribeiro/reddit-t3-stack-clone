import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillNoSSRWrapper from './lib/QuillNoSSRWrapper';

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


const RichTextEditor = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    // Save the content to your database
    // Here, you can make an API request to save the content

    console.log(content);
  };

  return (
    <div className="border border-solid border-gray-400 bg-white p-4 rounded shadow">
        <div className="w-full flex flex-col space-y-4">
            <input placeholder='Title'></input>
            <div className="rich-text-editor-wrapper">
                <QuillNoSSRWrapper value={content} onChange={handleEditorChange} theme='snow' modules={modules} formats={formats}/>
            </div>
        </div>
        <div className="border-t border-gray-300 my-4"/>
        <div className="flex justify-end mt-3">
            <a
            className="flex items-center justify-center px-5 py-2 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600"
            href="/submit"
            >
                Post
            </a>
        </div>
    </div>
  );
};

export default RichTextEditor;