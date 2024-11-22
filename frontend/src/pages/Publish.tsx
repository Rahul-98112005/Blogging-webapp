import axios from "axios";
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../configg";
import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
return <div> <Appbar/>
 <div className="flex justify-center w-full pt-8">
 
    <div className="max-w-screen-lg w-full">
    <input onChange={(e) => {
       setTitle(e.target.value)
        
    }}

    
    
    placeholder="title" type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base"/>
    <TextEditor onChange = {(e) => {
          setDescription(e.target.value)}}/>
    <button onClick={async () => {
         const response =    await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
             
            });
            navigate(`/blog/${response.data.id}`)
          }}
            type="submit"
            className="mt-4 focus:outline-none border-blue-700 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
          >
            Publish post
          </button>
</div>

</div>

</div>
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <form className="pt-8   rounded-lg ">
          <div className="px-4 py-2  rounded-lg">
            <label htmlFor="editor" className="sr-only">Publish post</label>
            <textarea onChange={onChange}
              rows="8"
              className=" focus:outline-none block w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
      
          
        </form>
      );
      
      
}