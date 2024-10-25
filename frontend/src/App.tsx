/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from 'react-router-dom';
import RouterPage from './routes/index'; 
import useFetchDetailUser from './hooks/useFetchDetailUser';
function App() {
    useFetchDetailUser();
    return (
        <BrowserRouter>
                <RouterPage />
        </BrowserRouter>
    );
}

export default App;
