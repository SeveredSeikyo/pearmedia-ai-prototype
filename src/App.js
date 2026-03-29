import './App.css';
import Navbar from './components/Navbar';
import WorkflowImage from './components/WorkflowImage';
import WorkflowText from './components/WorkflowText';


function App() {

    const [activeTab, setActiveTab] = useState("text");
    const [isLoading, setIsLoading] = useState(false);


    return (
      <div className="App">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {isLoading && <div>Loading...</div>}

        {activeTab === "text" ? (
          <WorkflowText setIsLoading={setIsLoading} />
        ) : (
          <WorkflowImage setIsLoading={setIsLoading} />
        )}
      </div>
    );
}

export default App;
