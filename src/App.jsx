import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  

  //useRef to copy password to clipboard
  const passwordRef = useRef(null);

  //password generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numAllowed, charAllowed, length, setPassword]);

  //copy password to clipboard function
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    passwordRef.current?.window.navigator.clipboard.writeText(password);
  }, [password]);

  //useEffect to call passwordGenerator function
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  //Handle visibility of password
  const handleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="max-w-md  w-full m-auto py-5 px-5 bg-linear-90 from-black to-emerald-800 shadow-2xl  rounded-2xl ">
      <h1 className="text-2xl  font-semibold text-white text-center">
        Password Generator
      </h1>
      <div className="flex  text-red-600 shadow-lg mt-5 rounded-lg bg-white">
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          readOnly
          placeholder="password"
          className={`outline-none w-full px-3 ${
            isPasswordVisible ? "text-md" : "text-2xl"
          }`}
          ref={passwordRef}
        />
        <button
          className="outline-none  text-fuchsia-800 mt-1.5 mr-1.5 cursor-pointer rounded-lg"
          onClick={handleVisibility}
        >
          <img
            src="../src/assets/hidden.png"
            alt=""
            className={`h-7 w-7 pb-1 ${isPasswordVisible ? "" : "hidden"}`}
          />
          <img
            src="../src/assets/eye.png"
            alt=""
            className={`h-7 w-7 pb-1 ${isPasswordVisible ? "hidden" : ""}`}
          />
        </button>
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none cursor-pointer hover:bg-fuchsia-500 font-semibold text-white bg-fuchsia-800 px-3 rounded-lg shrink-0"
        >
          Copy
        </button>
      </div>
      <div className=" flex sm:flex-row flex-col items-center gap-4 justify-center pt-4 text-red-600 text-sm gap-x-2">
        <div className="flex  text-md items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer accent-fuchsia-800 outline-none"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            className="cursor-pointer accent-fuchsia-800 outline-none"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            className="cursor-pointer accent-fuchsia-800 outline-none"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
