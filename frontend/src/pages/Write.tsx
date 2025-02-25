// Required imports
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Css imports
import './Write.css';


// src/Tiptap.tsx
// import the editor
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import { Level } from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'




// component imports
import { AppBar } from '../components/AppBar';


export const Write = () => {


    const nevigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('<p>Start writing your blog here... <br> <br> <br><br><br> </p>');
    const [loading, setLoading] = useState<boolean>(false);




    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }



    const handleSubmit = () => {
        setLoading(true);
        axios.post(`${BACKEND_URL}/api/v1/blog`,
            {
                title: title,
                content: content
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
            .then((response) => {
                nevigate('/blog/' + response.data.id);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }


    // create the editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
        ],
        content: content,
        autofocus: true,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });


    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div>
                <AppBar />
            </div>
            <div className='bg-gray-200 min-h-screen mt-8 flex justify-center items-center'>
                <div className='bg-white p-8 w-3xl rounded min-h-screen'>
                    <input type="text" placeholder="Title" className='w-full border-b-1 focus:outline-0 p-2 text-3xl font-bold border-gray-500 mb-y placeholder:text-gray-400' onChange={handleTitleChange} />
                    <div className='min-h-50 bg-gray-100 rounded-md p-4'>

                        <MenuBar editor={editor} />
                        <EditorContent
                            className='bg-slate-300 p-4 rounded-md outline-0'
                            editor={editor}
                            placeholder='Start writing your blog here...'
                        />
                        <button className='bg-green-600 mt-4 text-white p-2 rounded-sm' onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

interface MenuBarProps {
    editor: Editor | null;
}

export const MenuBar = ({ editor }: MenuBarProps) => {
    const [active , setActive] = React.useState('P');
    const [align, setAlign] = React.useState('L');



    if (!editor) {
        return null
    }

    const headdingActiveBackground = 'rounded-md bg-green-600 p-2 hover:bg-green-700';
    const headdingInactiveBackground = 'rounded-md bg-gray-200 p-2 hover:bg-gray-300';

    // on button click change the background color of the button and remove the background color of the other buttons
    // the background color of previously sleected button 
    // so that it look like if click on a button it stay selected
    const handleHeading = ({ level }: { level: number }) => {
        return () => {
            editor.chain().focus().toggleHeading({ level: level as Level }).run();
            setActive('H' + level);
        }
    }

    const handleParagraph = () => {
        editor.chain().focus().setParagraph().run()
        setActive('P');
    }

    const handleBold = () => {
        editor.chain().focus().toggleBold().run();

    }

    const handleItalic = () => {
        editor.chain().focus().toggleItalic().run();
    }


    const handleStrike = () => {
        editor.chain().focus().toggleStrike().run();
    }

    const handleAlignLeft = () => {
        editor.chain().focus().setTextAlign('left').run();
        setAlign('L');
    }

    const handleAlignCenter = () => {
        editor.chain().focus().setTextAlign('center').run();
        setAlign('C');
    }

    const handleAlignRight = () => {
        editor.chain().focus().setTextAlign('right').run();
        setAlign('R');
    }

    const handleAlignJustify = () => {
        editor.chain().focus().setTextAlign('justify').run();
        setAlign('J');
    }

    const handleHighlight = () => {
        editor.chain().focus().toggleHighlight().run();
    }

    return (
        <div className='flex justify-start gap-10 items-center mb-4'>
            <div className='flex gap-2'>
                <button className={active==="H1"?headdingActiveBackground:headdingInactiveBackground} onClick={handleHeading({ level: 1 })}>H1</button>
                <button className={active==="H2"?headdingActiveBackground:headdingInactiveBackground} onClick={handleHeading({ level: 2 })}>H2</button>
                <button className={active==="H3"?headdingActiveBackground:headdingInactiveBackground} onClick={handleHeading({ level: 3 })}>H3</button>
                <button className={active==="P"?headdingActiveBackground:headdingInactiveBackground} onClick={handleParagraph}>P</button>
            </div>
            <div className='flex gap-2'>
                <button className='bg-gray-200 p-2 rounded-md hover:bg-gray-300' onClick={handleBold}>B</button>
                <button className='bg-gray-200 p-2 rounded-md hover:bg-gray-300' onClick={handleItalic}>I</button>
                <button className='bg-gray-200 p-2 rounded-md hover:bg-gray-300' onClick={handleStrike}>S</button>
                <button className='bg-gray-200 p-2 rounded-md hover:bg-gray-300' onClick={handleHighlight}>HL</button>
            </div>
            <div className='flex gap-2'>
                <button className={align==="L"?headdingActiveBackground:headdingInactiveBackground} onClick={handleAlignLeft}>L</button>
                <button className={align==="C"?headdingActiveBackground:headdingInactiveBackground} onClick={handleAlignCenter}>C</button>
                <button className={align==="R"?headdingActiveBackground:headdingInactiveBackground} onClick={handleAlignRight}>R</button>
                <button className={align==="J"?headdingActiveBackground:headdingInactiveBackground} onClick={handleAlignJustify}>J</button>
            </div>
        </div>
    )

}