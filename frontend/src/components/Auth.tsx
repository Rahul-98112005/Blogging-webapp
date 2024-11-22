/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignupInput } from "@rahul2005/medium-common2";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../configg";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Rahul Gupta..."
                value={postInputs.name}
                onChange={(e) =>
                  setPostInputs((c) => ({ ...c, name: e.target.value }))
                }
              />
            ) : null}

            <LabelledInput
              label="Username"
              placeholder="Rahul@gmail.com"
              value={postInputs.username}
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, username: e.target.value }))
              }
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="1234567"
              value={postInputs.password}
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, password: e.target.value }))
              }
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-7 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  value,
  type,
}: LabelledInputProps) {
  return (
    <div className="mt-2">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-100 dark:text-black">
          {label}
        </label>
        <input
          value={value || ""}
          onChange={onChange}
          type={type || "text"}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 p-2"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
