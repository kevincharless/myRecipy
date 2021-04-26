const Modal = ({ isActive, setIsActive, func, title, description, action }) => {
    return (
        <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: isActive ? 'block' : 'none', zIndex: '100000000' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button onClick={() => setIsActive(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{description}</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => setIsActive(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={() => func()} type="button" className="btn btn-danger">{action}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal