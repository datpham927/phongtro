/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from 'react-router-dom';
import RouterPage from './routes/index';
import DefaultLayout from './layout/DefaultLayout';
 
function App() {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <RouterPage />
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
