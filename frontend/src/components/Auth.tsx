/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignupInput } from "@rahul2005/medium-common2";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios, { Axios } from "axios";
import {BACKEND_URL} from "../configg"
/* eslint-disable @typescript-eslint/no-unused-vars */
export const Auth = ({ type }: {type: "signup" | "signin"}) => {
  const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""   })

async function sendRequest() {
    try{
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ?"signup" : "signin"} `, postInputs);
        const jwt = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs")
    } catch (e) {
alert("Error")
    }
}


return <div className="h-screen flex justify-center flex-col">
<div className="flex justify-center">
    <div>
        <div className="px-10">
<div className="text-3xl font-extrabold ">
Create an account
</div>
<div className="text-slate-400">
  {type == "signin" ? "Don't have Account" : "Already have an account"}
    <Link className="pl-2 underline" to={type =="signin" ? "/signup" : "/signin"}>{type =="signin" ? "Sign up" : "Sign in"}</Link>
</div>
</div>
<div>
 {type == "signup" ?<LabelledInput label="Name" placeholder="Rahul Gupta..." onchange={(e) => {
 setPostInputs(c => ({
    ...postInputs,
    name: e.target.value
 }))
 }}/> : null}

 <LabelledInput label="Username" placeholder="Rahul@gmail.com" onchange={(e) => {
 setPostInputs(c => ({
    ...postInputs,
    username: e.target.value
 }))
 }}/>

 <LabelledInput label="Password" type = {"password"} placeholder="1234567" onchange={(e) => {
 setPostInputs(c => ({
    ...postInputs,
    password: e.target.value
 }))
 }}/>
 <button onClick={sendRequest}type="button" className="mt-7 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Sign up" : "Sign in"}</button>
</div>
</div>
</div>

    </div>
}

interface LabelledInput {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string;
}


function LabelledInput ({label, placeholder, onchange, value, type}: LabelledInput) {
    return <div className=" mt-2 ">
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-100 dark:text-black">{label}</label>
            <input onChange = {onchange} type= {type || "text"} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 p-2" placeholder={placeholder} required />
        </div>  
        </div>
}