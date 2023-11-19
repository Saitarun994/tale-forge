import React from 'react';
import {BrowserRouter,Link,Route, Routes} from 'react-router-dom';
import {header_logo,default_dp} from './assets';
import {Home, CreatePost} from './pages'
function App() {
  
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center
       bg-[#ffeab6] sm:px-8 px-4 py-4 shadow-lg border-b border-b-[#ff9999]">

        <div className="rounded-full object-fill flex items-center cursor-pointer 
        hover:shadow-lg hover:transform hover:translate-y-[-2px] transition duration-300 ease-in-out hover:border border-black">
          <img src={default_dp} alt="Default DP" className="w-12 h-12 rounded-full object-fill" />
        </div>

        <Link to="/">
          <img src={header_logo} alt="logo" className="w-56 object-contain"/>
        </Link>

        <div>
          <button className="bg-[#fcc688] hover:bg-[#baa042] text-black font-bold py-2 px-4 rounded
          hover:shadow-lg hover:transform hover:translate-y-[-2px] transition duration-300 ease-in-out">
            Sign-In
          </button>
        </div>

      </header>

      <main className="flex justify-center items-center sm:p-8 px-4 py-8 w-full bg-[#fffaeb] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
