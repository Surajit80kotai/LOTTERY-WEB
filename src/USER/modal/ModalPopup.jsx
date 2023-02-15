import React from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const ModalPopup = () => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Modal>
                <Modal.Header closeButton onClick={() => setShow(show)}>
                    <Modal.Title>Loged In Successfully</Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}

export default ModalPopup