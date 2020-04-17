/*import React, { useState } from 'react';

import './closeDiscipline.scss';

import ReactDOM from 'react-dom';

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    console.log(this.props, 'ghjggggg');
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

function Child() {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-content__header">СОздание дисциплины</span>
        <span className="modal-content__message">
          {' '}
          Вы уверены, что хотите выйти из раздела? <b>Изменения не сохранятся.</b>
        </span>
        <div className="modal-content__actions">
          <div className="modal-content__actions-button">отмена</div>
          <div className="modal-content__actions-button">выйти</div>
        </div>
      </div>
    </div>
  );
}

function Parent() {
  const [click, setClick] = useState(0);

  function handleClick() {
    setClick(click + 1);
  }

  console.log('ghjggggg2');
  return (
    <div style={{ backgroundColor: '#FFC0CB' }} onClick={handleClick}>
      <Modal>
        <Child />
      </Modal>
    </div>
  );
}
export default Parent;

//ReactDOM.render(<Parent />, appRoot);
*/
