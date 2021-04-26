import { useHistory, useParams } from "react-router";
import Modal from "../components/Modal"
import Navbar from "../components/Navbar"
import PostForm from '../components/PostForm';
import Sidebar from "../components/Sidebar"

const EditPost = ({ user, posts, isModalActive, setIsModalActive, logout }) => {
    const { id } = useParams();
    const history = useHistory();
    const post = posts?.posts?.find(post => post?._id === id)

    const cancelEdit = () => {
        history.push('/myrecipe');
    }

    return (
        <>
            <Navbar /> 
            <div className="container-fluid home-start">
                <div className="row">
                    <Sidebar user={user} setIsActive={setIsModalActive} logout={logout} />
                    <div className="col-md-9 addrecipe-content px-5 mb-5">
                        <div className="row">
                           <PostForm 
                                editPost
                                user={user?.result}
                                post={post}
                                formTitle="Edit "
                                firstButton="Cancel Edit"
                                firstButtonFunc={cancelEdit}
                                secondButton="Edit Recipe"
                           />
                        </div>
                    </div>
                    <Modal isActive={isModalActive} setIsActive={setIsModalActive} func={logout} title="Logout Confirmation" description="Are you sure, want to logout ?" action="Yes, logout" />
                    {isModalActive && (
                        <div className="row w-100 position-absolute" style={{ backgroundColor: 'black', height: '200vh', opacity: '10%' ,top: '0', zIndex: '99999999' }}></div>
                    )}
                </div>
            </div>
        </>
    )
}

export default EditPost
