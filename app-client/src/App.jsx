import FileUpload from "./FileUpload";
import DataList from "./DataList";

function App() {
  return (
    <div className='p-4 min-h-screen bg-slate-200'>
      <div className='text-3xl font-bold text-center mb-4'>
        CSV Data Management App
      </div>
      <FileUpload />
      <DataList />
    </div>
  );
}

export default App;
