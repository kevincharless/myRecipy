import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import Sidebar from '../components/Sidebar'


const Home = ({ user, posts, isModalActive, setIsModalActive, logout }) => {
    const [showPosts, setShowPosts] = useState([]);
    const [searchPost, setSearchPost] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setShowPosts(posts?.posts?.filter(post => post?.isShow === true))
    }, [posts])

    useEffect(() => {
        if (searchPost !== '') {
            setSearchResult(
                showPosts.filter(post => 
                    post.title.toUpperCase().includes(searchPost.toUpperCase())
                )
            )
        }
    }, [setSearchPost, showPosts, searchPost])

    return (
        <>
            <Navbar />
            <div className="container-fluid home-start">
                <div className="row">
                    <Sidebar user={user} setIsActive={setIsModalActive} logout={logout} />
                    <div className="col-md-9 home-content px-5 mb-5">
                        <div className="row">
                            <div className="col-12 home-search-box text-right mt-4">
                                <form className="row">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" value={searchPost} onChange={e => setSearchPost(e.target.value)} placeholder="Search..." />
                                        <button className="input-group-text btn btn-warning">Search</button>
                                    </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-12 mt-2">
                                <h3 className="home-content-heading">Most Recent</h3>
                                <div className="row home-content-body py-3">
                                    {!posts?.isLoading ? (
                                        searchPost !== '' ? (
                                            searchResult?.map((post, index) => (
                                                <PostCard post={post} key={index} />
                                            ))
                                        ) : (
                                            showPosts?.map((post, index) => (
                                                <PostCard post={post} key={index} />
                                            ))
                                        )
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 mt-5">
                                <h3 className="home-content-heading">Most Popular</h3>
                                <div className="row home-content-body py-3">
                                    {!posts?.isLoading ? (
                                        searchPost !== '' ? (
                                            searchResult?.sort((a, b) => {
                                                return b.likes.length - a.likes.length;
                                            }).map((post, index) => (
                                                <PostCard post={post} key={index} />
                                            ))
                                        ) : (
                                            showPosts?.sort((a, b) => {
                                                return b.likes.length - a.likes.length;
                                            }).map((post, index) => (
                                                <PostCard post={post} key={index} />
                                            ))
                                        )
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                <Modal isActive={isModalActive} setIsActive={setIsModalActive} func={logout} title="Logout Confirmation" description="Are you sure, want to logout ?" action="Yes, logout" />
                {isModalActive && (
                    <div className="row w-100 position-absolute" style={{ backgroundColor: 'black', height: '200vh', opacity: '10%' ,top: '0', zIndex: '99999999' }}></div>
                )}
            </div>
        </>
    )
}

export default Home
