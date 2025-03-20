import App from "./components/App";
import Home from "./components/Home";
import CommentPage from "./components/CommentPage";
import UserPage from "./components/UserPage";
import UserCommentPage from "./components/UserCommentPage";
import UserReplyPage from "./components/UserReplyPage";
import UserPageFollowers from "./components/UserPageFollowers";
import UserPageFollowing from "./components/UserPageFollowing";
import UserSettings from "./components/UserSettings";
import UserSettingsComments from "./components/UserSettingsComments";


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
            {
                path: '/user-settings',
                element: <UserSettings />,
                children: [
                    {
                        path: 'user-comments',
                        element: <UserSettingsComments />
                    }
                ]
            },
            {
                path: '/users/:id',
                element: <UserPage />,
                children: [
                    {
                        path: 'comments',
                        element: <UserCommentPage />
                    },
                    {
                        path: 'replies',
                        element: <UserReplyPage />
                    },
                    ,
                    {
                        path: 'followers',
                        element: <UserPageFollowers />
                    },
                    ,
                    {
                        path: 'following',
                        element: <UserPageFollowing />
                    }
                ]
            }
        ]
    }
]

export default routes