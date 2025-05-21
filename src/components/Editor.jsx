import React from 'react';
import  {  useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
const Editor = ({content,setContent,placeholder,}) => {
    const editor = useRef(null);

	const config = useMemo(() => ({
			readonly: false,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => setContent(newContent)}
		/>
	);
};

export default Editor;
