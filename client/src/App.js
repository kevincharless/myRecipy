import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AddNew from "./pages/AddNew";
import Home from "./pages/Home";
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login";
import MyRecipe from "./pages/MyRecipe";
import Recipe from "./pages/Recipe";
import Register from "./pages/Register";
import { LOGOUT } from "./redux/constants/actionTypes";
import { getPosts } from './redux/actions/posts';
import EditPost from "./pages/EditPost";

const App = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const userProfile = useSelector(state => state.auth?.authData);
    const posts = useSelector(state => state?.posts);
    const [isModalActive, setIsModalActive] = useState(false);
    const logout = () => {
        dispatch({ type: LOGOUT });

        setUser(null);

        setIsModalActive(false);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [userProfile])

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]) 

    useEffect(() => {
        isModalActive ? document.getElementsByTagName("body")[0].style = 'overflow-y: hidden'  : document.getElementsByTagName("body")[0].style = 'overflow-y: visible'
    }, [isModalActive])

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LandingPage />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Route path="/home">
                    <Home 
                        user={user}
                        posts={posts}
                        isModalActive={isModalActive} 
                        setIsModalActive={setIsModalActive}
                        logout={logout}
                    />
                </Route>
                <Route path="/recipe/:id">
                    <Recipe 
                        user={user}
                        posts={posts}
                        isModalActive={isModalActive} 
                        setIsModalActive={setIsModalActive}
                        logout={logout}
                    />
                </Route>
                <Route path="/myrecipe">
                    <MyRecipe
                        user={user} 
                        posts={posts}
                        isModalActive={isModalActive} 
                        setIsModalActive={setIsModalActive}
                        logout={logout}
                    />
                </Route>
                <Route path="/addnew">
                    <AddNew 
                         user={user} 
                         isModalActive={isModalActive} 
                         setIsModalActive={setIsModalActive}
                         logout={logout}
                    />
                </Route>
                <Route path="/editpost/:id">
                    <EditPost 
                         user={user}
                         posts={posts} 
                         isModalActive={isModalActive} 
                         setIsModalActive={setIsModalActive}
                         logout={logout}
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
