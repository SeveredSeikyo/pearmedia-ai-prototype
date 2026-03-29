import { useState } from 'react';
// import './App.css';
import Navbar from './components/Navbar';
import WorkflowImage from './components/WorkflowImage';
import WorkflowText from './components/WorkflowText';
import { HashLoader } from 'react-spinners';


function App() {

    const [activeTab, setActiveTab] = useState("text");
    const [isLoading, setIsLoading] = useState(false);


    return (
      <div className='relative bg-gray-200 flex items-center justify-center h-screen max-h-full w-full'>

        {
          isLoading 
            &&
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
            <HashLoader/>
          </div>
        }

        <div 
          className="flex flex-col w-[90%] h-[90%]"
        >
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "text" ? (
            <WorkflowText setIsLoading={setIsLoading} />
          ) : (
            <WorkflowImage setIsLoading={setIsLoading} />
          )}
        </div>
      </div>
    );
}

export default App;
