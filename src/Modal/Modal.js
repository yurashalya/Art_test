import React, { Component } from 'react';

import { Dialog, RaisedButton, FlatButton, SelectField, MenuItem, IconButton, TextField } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { styleModal } from './styleModal';

import './modal.css';

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      defaultSelectValue: 'Twin',
      defaultInputNumber: 0,
      itemsList: [],
      data: []
    };
  }

  changeSelectHandler = (event, index) => {
    const { itemsList } = this.state;
    itemsList[index].selectValue = event.target.textContent;
    this.setState({ itemsList });
  };

  changeInputHandler = (event, index) => {
    const { itemsList } = this.state;
    itemsList[index].inputNumber = event.target.value;
    this.setState({ itemsList });
  }

  saveHandler = () => {
    const { itemsList, data } = this.state;

    data.length = 0;
    itemsList.forEach(item => data.push(Object.assign({}, item)));

    this.setState({ showModal: false });
  }

  closeModalHandler = () => {
    const { data } = this.state;
    const oldItems = [];

    data.forEach(item => oldItems.push(Object.assign({}, item)));

    this.setState({
      showModal: false,
      itemsList: oldItems
    });
  }

  addItemHandler = () => {
    const newItem = {
      id: this.state.itemsList.length + 1,
      selectValue: this.state.defaultSelectValue,
      inputNumber: this.state.defaultInputNumber
    };
    this.setState({
      itemsList: [...this.state.itemsList, newItem]
    });
  }

  deleteItemHandler = (index) => {
    const { itemsList } = this.state;
    itemsList.splice(index, 1);
    this.setState({ itemsList });
  }

  render() {
    return (
      <React.Fragment>
        <RaisedButton className="Modal" label="Выбрать" primary onClick={() => this.setState({ showModal: true })} />
        <Dialog
          modal={false}
          open={this.state.showModal}
          onRequestClose={this.closeModalHandler}
        >
          <div className="MainContainer">
            <div className="MainContainer-header">
              <h3 className="Title">Структура номеров</h3>
              <IconButton ><NavigationClose onClick={this.closeModalHandler} /></IconButton>
            </div>
            {this.state.itemsList.map((item, index) => (
              <div key={index} className="Form">
                <SelectField
                  value={item.selectValue}
                  style={styleModal.selectStyle}
                  onChange={event => this.changeSelectHandler(event, index)}
                >
                  <MenuItem value="Twin" primaryText="Twin" />
                  <MenuItem value="Tripple" primaryText="Tripple" />
                  <MenuItem value="Quadro" primaryText="Quadro" />
                </SelectField>
                <TextField
                  type="number"
                  name={`number${item.id}`}
                  value={item.inputNumber}
                  style={styleModal.inputStyle}
                  onChange={event => this.changeInputHandler(event, index)}
                />
                <IconButton style={styleModal.buttonDeleteStyle} iconStyle={{ color: 'red' }}>
                  <NavigationClose onClick={() => this.deleteItemHandler(index)} />
                </IconButton>
              </div>
            ))}
            <FlatButton
              label="Добавить"
              primary
              style={styleModal.buttonAddStyle}
              onClick={this.addItemHandler}
            />
            <div className="ModalButtons">
              <RaisedButton
                label="Сохрание"
                primary
                style={styleModal.buttonModalStyle}
                onClick={this.saveHandler}
              />
              <FlatButton
                label="Отмена"
                style={styleModal.buttonModalStyle}
                onClick={this.closeModalHandler}
              />
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

