import ReactDom from 'react-dom'

const ModalPortal = ({ children }: any) => {
  const el: any = document.getElementById('modal')
  return ReactDom.createPortal(children, el)
}

export default ModalPortal
