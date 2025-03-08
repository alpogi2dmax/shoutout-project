import App from "./components/App";
import Home from "./components/Home";
import CommentPage from "./components/CommentPage";


const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/comments/:id',
                element: <CommentPage />
            },
        ]
    }
]

export default routes