import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './modal.scss'

const Modal = (props) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(props.active)
  }, [props.active])

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  )
}

export const ModalContent = (props) => {
  const modalContentRef = useRef(null)

  const closeModal = () => {
    modalContentRef.current.parentNode.classList.remove('active')
    if (props.onClose) props.onClose()
  }

  return (
    <div ref={modalContentRef} className="modal__content">
      {props.children}
      <div className="modal__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
}

export default Modal
