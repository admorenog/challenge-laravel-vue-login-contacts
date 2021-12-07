const Login = () => import('./components/Auth/Login');
const Register = () => import('./components/Auth/Register');
const ContactsIndex = () => import('./components/Contacts/Index');

export const routes = [
    {
        name: 'home',
        path: '/',
        component: ContactsIndex
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    }
];
