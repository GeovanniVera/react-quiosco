import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from './layouts/authLayout';
import Layout from './layouts/layout';
import Home from './views/home';
import Login from './views/login';
import Register from './views/register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/> ,
        children:[
            {
                index:true,
                element: <Home />
            }
        ]
        
    },
    {
       path: '/auth',
        element: <AuthLayout/> , 
        children:[
            {
                path:'/auth/',
                element: <Login />
            },
            {
                path:'/auth/login',
                element: <Login />
            },
            {
                path:'/auth/register',
                element: <Register />
            }
        ]
    }
]);

export default router;
