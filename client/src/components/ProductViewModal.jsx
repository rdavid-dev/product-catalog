const ProductViewModal = ({isOpen, onClose, product}) => {
    return (
        <div>
            {
                isOpen
                ? (
                    <>
                        <input checked={isOpen} readOnly type="checkbox" className="modal-toggle" />
                        <dialog className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                                </form>
                            
                                <img src={product.image} className="mb-3 p-2" />
                                <h1 className="font-bold text-lg mb-3">{product.title}</h1>
                                <p>{product.description}</p>
                                <h2 className="font-semibold mt-5">${product.price}</h2>
                            </div>
                        </dialog>
                    </>
                )
                : null
            }
        </div>
    );
}

export default ProductViewModal;