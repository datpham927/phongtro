import { Routes, Route, Navigate } from 'react-router-dom';
import { path } from "../utils/constant";
import  HomePage   from '../pages/HomePage';

 

const RouterPage = () => { 
    return (
        <Routes location={location}>
            <Route path={'*'} element={<Navigate to="/" />}></Route>
            <Route path={path.HOME} element={<HomePage />}></Route>
        </Routes>
    );
};

export default RouterPage;
