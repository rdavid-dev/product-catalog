import { useState } from "react";
import { post } from "../helpers/axios";

const EnquiryForm = ({isOpen, onClose, product}) => {
    const [form, setForm] = useState({
        email: "",
        message: ""
    });
    const [successMessage, setSuccessMessage] = useState("");

    /**
     * Handle the form input changes
     * 
     * @param {*} e 
     */
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Handle the Send Request Form
     */
    const handleSendEnquire = async () => {
        try {
            const response = await post("/products/enquire", form)

            setSuccessMessage(response.message)
        } catch (error) {
            console.log(error)
        }
    }

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
                                
                                    <div className="relative flex flex-col justify-center overflow-hidden">
                                        <div className="w-full p-6 m-auto lg:max-w-xl">
                                            <h1 className="text-3xl font-semibold text-center text-purple-700">Enquiry Form</h1>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text">Email Address</span>
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        placeholder="Enter Email Address" 
                                                        className="w-full input input-bordered input-primary"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleForm}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text">Message</span>
                                                    </label>
                                                    <textarea 
                                                        name="message"
                                                        value={form.message}
                                                        onChange={handleForm}
                                                        className="textarea w-full input textarea-bordered textarea-primary" rows="5" placeholder="Enter your message..."></textarea>
                                                </div>

                                                {
                                                    successMessage
                                                    ? (
                                                      
                                                    <div role="alert" class="alert alert-success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        <span>{successMessage}</span>
                                                    </div>      
                                                    )
                                                    : ""
                                                }

                                                <div>
                                                    <button 
                                                        className="btn btn-wide btn-info w-full"
                                                        onClick={handleSendEnquire}
                                                        >Send Enquiry</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </dialog>
                    </>
                )
                : null
            }
        </div>
    );
}

export default EnquiryForm;