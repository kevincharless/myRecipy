import Modal from "../components/Modal"
import Navbar from "../components/Navbar"
import PostForm from '../components/PostForm';
import Sidebar from "../components/Sidebar"

const AddNew = ({ user, isModalActive, setIsModalActive, logout }) => {
    return (
        <>
            <Navbar /> 
            <div className="container-fluid home-start">
                <div className="row">
                    <Sidebar user={user} setIsActive={setIsModalActive} logout={logout} />
                    <div className="col-md-9 addrecipe-content px-5 mb-5">
                        <div className="row">
                           <PostForm 
                                user={user?.result}
                                formTitle="Add New Recipe"
                                secondButton="Publish"
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

export default AddNew
