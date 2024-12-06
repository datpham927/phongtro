 
import { BrowserRouter } from 'react-router-dom';
import RouterPage from './routes/index'; 
import useFetchDetailUser from './hooks/useFetchDetailUser';
import "nprogress/nprogress.css"; // Import CSS của NProgress 
function App() {
    useFetchDetailUser();
    return ( 
        <BrowserRouter>
                <RouterPage />
        </BrowserRouter> 
    );
}

export default App;
