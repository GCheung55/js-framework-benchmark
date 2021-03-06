'use strict';

import React from 'react'
import {connect} from 'react-redux';
import {
  buildData,
  remove,
  run,
  add,
  update,
  select,
  runLots,
  clear,
  swapRows
} from './store';

export class Row extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.del = this.del.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {data,styleClass}=this.props;
        const nextStyleClass=nextProps.styleClass;
        const nextData= nextProps.data;
        return data !== nextData||styleClass!=nextStyleClass
    }
    click() {
        this.props.onClick(this.props.data.id);
    }
    del() {
        this.props.onDelete(this.props.data.id);
    }
    render() {
        let {styleClass, onClick, onDelete, data} = this.props;
        return (<tr className={styleClass}>
            <td className="col-md-1">{data.id}</td>
            <td className="col-md-4">
                <a onClick={this.click}>{data.label}</a>
            </td>
            <td className="col-md-1"><a onClick={this.del}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
            <td className="col-md-6"></td>
        </tr>);
    }
}

export class Controller extends React.Component{
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.run = this.run.bind(this);
        this.update = this.update.bind(this);
        this.runLots = this.runLots.bind(this);
        this.clear = this.clear.bind(this);
        this.swapRows = this.swapRows.bind(this);
        this.start = 0;
    }
    shouldComponentUpdate(nextProps, nextState) {

        const {data,selected}=this.props;
        const nextData= nextProps.data;
        const nextSelected= nextProps.selected;
        return data !== nextData||selected!=nextSelected;
    }
    run() {
        this.props.run();
    }
    add() {
        this.props.add();
    }
    update() {
        this.props.update();
    }
    select(id) {
        this.props.select(id);
    }
    delete(id) {
        this.props.remove(id);
    }
    runLots() {
        this.props.runLots();
    }
    clear() {
        this.props.clear();
    }
    swapRows() {
        this.props.swapRows();
    }
    render () {
        const selected = this.props.selected;
        var rows = this.props.data.map((d,i) => {
            const id = d.id;
            var className = id === selected ? 'danger':'';
            return <Row key={id} data={d} onClick={this.select} onDelete={this.delete} styleClass={className}></Row>
        })
        return (<div className="container">
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-6">
                        <h1>React + Redux-Combiner</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="run" onClick={this.run}>Create 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="runlots" onClick={this.runLots}>Create 10,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="add" onClick={this.add}>Append 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="update" onClick={this.update}>Update every 10th row</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="clear" onClick={this.clear}>Clear</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="swaprows" onClick={this.swapRows}>Swap Rows</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover table-striped test-data">
                <tbody>{rows}</tbody>
            </table>
            <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>);
 }
}

export default connect(
  state => {
      return ({
    data: state.store.data,
    selected: state.store.selected
  })
},
  {
    buildData: () => buildData(),
    remove: id => remove(id),
    run: () => run(),
    add: () => add(),
    update: () => update(),
    select: id => select(id),
    runLots: () => runLots(),
    clear: () => clear(),
    swapRows: () => swapRows()
  }
)(Controller);
