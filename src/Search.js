import React, {Component} from 'react'
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactJson from 'react-json-view'


import IconButton from '@material-ui/core/IconButton';
//import Collapse from '@material-ui/core/Collapse';

import CloseIcon from '@material-ui/icons/Close';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import BtnCellRenderer from "./BtnCellRenderer";
import BtnCellRendererAction from "./BtnCellRendererAction";
import BtnCellRendererDetails from "./BtnCellRendererDetails";
import BtnCellRendererHistory from "./BtnCellRendererHistory";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as moment from 'moment';

import BtnCellRendererRadioGroup from "./BtnCellRendererRadioGroup";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import {Alert, AlertTitle} from '@material-ui/lab';

import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {MasterDetailModule} from '@ag-grid-enterprise/master-detail';
import {MenuModule} from '@ag-grid-enterprise/menu';
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {AllModules} from "@ag-grid-enterprise/all-modules";
import {AllCommunityModules} from '@ag-grid-community/all-modules';

import DetailCellRenderer from './DetailCellRenderer.js';


//import RadioGroup from "@material-ui/core/RadioGroup";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Radio from "@material-ui/core/Radio";
//import Button from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ActionForm from './ActionForm';
//import Chip from '@material-ui/core/Chip';

//import {TextareaAutosize} from "@material-ui/core";

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './Search.css';


import "ag-grid-community/dist/styles/ag-grid.css";
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import AlertDialog from "./AlertDialog";
import ReactDOM from 'react-dom';
import {withStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';


const {API_KEY} = process.env
//const API_URL = 'http://api.musicgraph.com/api/v2/artist/suggest'

//const API_URL = 'https://localhost:8686/form/suggest'
const API_URL = '/service/backend/form'

var tt = [{
    "name": "susan",
    "callId": 555,
    "duration": 72
}]


const styles = theme => ({
    buttonContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: 2,
        },
    },
    fabProgress: {
        color: "blue",
        position: 'absolute',
        top: "50%",
        left: "50%",
        zIndex: 1,
    },
    monokai: {}
});


class Search extends Component {

    constructor(props) {
        super(props);
        this.masterDetail = true;
        /*

                this.detailCellRendererParams =
                    {
                        detailGridOptions: {
                            columnDefs: [
                                {
                                    headerName: 'callId',
                                    field: 'callId'
                                },


                            ],
                            defaultColDef: {
                                flex: 1,
                                editable: true,
                                resizable: true
                            },

                            onGridReady: function (params) {
                                params.api.setDomLayout('autoHeight');
                            }
                        },
                        getDetailRowData: this.getDetailRowData,
                        /!* getDetailRowData: function (params) {

                             params.successCallback( tt );
                             //params.successCallback(params.data.callRecords);
                         },*!/

                    };

        */


        this.state = {
            checkedB: false,
            areaJSONDataStatus : false,

            test: "jpl1",
            query: '',
            results: [],
            removeData: {},
            show: false,
            currentProgramId: "Focus, L'école de préparation mentale",

            my_important_json: "",
            syncButtonVariant: "contained",
            syncButtonColor: "secondary",


            columnDefs: [
                //{headerName: 'id', field: 'id', sortable: true, filter: true, editable:false},


                {
                    headerName: 'formid',
                    field: 'formid',

                    // https://www.ag-grid.com/react-grid/master-detail-grids/


                    cellRenderer: "agGroupCellRenderer",


                    cellStyle: function (params) {
                        if (params.data && params.data.historyChild == 1) {

                            return {color: 'green',/* backgroundColor: 'green'*/};
                        } else {
                            return {color: 'red'/*, backgroundColor: 'green'*/};
                        }
                    },
                    minWidth: 250,
                    sortable: true, filter: true, editable: false
                },
                {headerName: 'id', field: 'id', sortable: true, filter: true, editable: true, hide: true,},
                {
                    headerName: 'programTitle',
                    field: 'programTitle',


                    sortable: true, filter: true, editable: false
                },
                /*
                {headerName: 'programId', field: 'programId', sortable: true, filter: true, editable: false},
                */
                /*
                {
                    headerName: 'status',
                    field: 'state',
                    //minWidth: 100,
                    width: 100,
                    sortable: true, filter: true, editable: false
                },

                 */
                {
                    headerName: 'date conversion ', field: 'creation_date',
                    valueFormatter: function (params) {
                        var res = moment.unix(params.value).format('D MMM YYYY HH:mm');
                        //var res = moment.unix(params.value).format('YYYY-MM-DD HH:MM:SS');

                        return res;
                    },

                    sortable: true, filter: true, editable: false
                },
                /*
                {
                    field: "Delete",
                    cellRenderer: "btnCellRenderer",
                    cellRendererParams: {
                        clicked: this.clickedRemove,
                        mycurrent: this

                    },


                    sortable: false, filter: false, editable: false
                },
                */

                /*{
                    headerName: 'Conversion status',
                    field: "conversionStatus",
                    cellStyle: function(params) {
                        if (params.data.conversionStatus == true) {

                            return {color: 'green',/!* backgroundColor: 'green'*!/};
                        } else {
                            return {color: 'red'/!*, backgroundColor: 'green'*!/};
                        }
                    },

                    sortable: false, filter: false, editable: false

                },*/
                {
                    headerName: 'Add Conversion',
                    field: "Action",
                    cellRenderer: "btnCellRendererAction",
                    cellRendererParams: {
                        clicked: this.onClickedAction,
                        mycurrent: this
                        /*clicked: function(field) {
                            alert(`${field} was clicked`);
                        }*/
                    },

                    //minWidth: 50,
                    //width: 50,
                    sortable: false, filter: false, editable: false
                },
                /*
				{
					headerName: 'Last Conversion',
                    field: "Details",
                    cellRenderer: "BtnCellRendererDetails",
                    cellRendererParams: {
                        clicked: this.onClickedDetail,
                        mycurrent: this

                    },


                    sortable: false, filter: false, editable: false
                },
    */
                /*{
                    headerName: 'Conversion History',
                    field: "ConversionHistory",
                    cellRenderer: "BtnCellRendererHistory",
                    cellRendererParams: {
                        clicked: this.onClickedHistory,
                        mycurrent: this
                        /!*clicked: function(field) {
                            alert(`${field} was clicked`);
                        }*!/
                    },

                    //minWidth: 50,
                    //width: 50,
                    sortable: false, filter: false, editable: false
                }*/


            ],
            rowData: [
                /*
                {id: 'Toyota', name: 'Celica', category: 35000},
                {id: 'Ford', name: 'Mondeo', category: 32000},
                {id: 'Porsche', name: 'Boxter', category: 72000}

                 */
            ],
            defaultColDef: {
                // set every column width
                //width: 500,
                // make every column editable
                //editable: true,
                // make every column use 'text' filter by default
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                resizable: true,

                // allow every column to be aggregated
                enableValue: true,
                // allow every column to be grouped
                enableRowGroup: true,
                // allow every column to be pivoted
                enablePivot: true,
                sortable: true,

            },

            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer,
                btnCellRendererAction: BtnCellRendererAction,
                BtnCellRendererDetails: BtnCellRendererDetails,
                BtnCellRendererHistory: BtnCellRendererHistory,


                BtnCellRendererRadioGroup: BtnCellRendererRadioGroup,
                myDetailCellRenderer: DetailCellRenderer
            },
            rowSelection: 'single',



            gridOptions: {
                // specify which rows to expand
                isRowMaster: params => {
                    console.log("==");
                    if (params && params.historyChild == 1) {

                        return true;
                    } else {

                        return false;
                    }
                },



            },



        }
        this.jsontheme = "monokai";
        this.error = "";
        this.getDBContent = this.getDBContent.bind(this);
        this.clickedRemove = this.clickedRemove.bind(this);
        this.onClickedAction = this.onClickedAction.bind(this);
        //this.onClickedDetail = this.onClickedDetail.bind(this);
        //this.onClickedHistory = this.onClickedHistory.bind(this);

        this.onCellClicked = this.onCellClicked.bind(this);

        /*this.clickedChoice = this.clickedChoice.bind(this);*/
        this.onModalDeleteResult = this.onModalDeleteResult.bind(this)
        this.handleSubmitCreateUuid = this.handleSubmitCreateUuid.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.synchronizeDBContent = this.synchronizeDBContent.bind(this);
        this.handleSelectDropDown = this.handleSelectDropDown.bind(this);
        this.getDetailRowData = this.getDetailRowData.bind(this);

        this.onChangeConversionType = this.onChangeConversionType.bind(this);
        this.onChangeAreaJSON = this.onChangeAreaJSON.bind(this);
        this.filterRowByGroup = this.filterRowByGroup.bind(this);


    }
    onChangeAreaJSON(event){
        console.log("teste");
        if (event && event.target && event.target.name) {
            this.setState({[event.target.name]: event.target.checked});
        }

    }
    filterRowByGroup( status ){
        var that = this;
        if ( status == true){
            // On redessine en supprimant
            this.state.gridOptions.api.forEachNode(function (rowNode) {
                console.log("delete")

                var selectedData = rowNode.data
                if (selectedData.historyChild == 0) {
                    var res = that.state.gridOptions.api.applyTransaction({remove: [selectedData]});
                }


            });
            this.setState({ checkedB: status   }, () => {


            })

        }else{
            // Onn remet tout
            this.setState({progressbar: true, checkedB: status   }, () => {
                this.getDBContent();
                this.gridApi.setRowData(this.state.results);

            })

        }

    }

    onChangeConversionType(event) {
        var that = this;
        if (event && event.target && event.target.name) {

            this.filterRowByGroup(event.target.checked)

            /*if (event.target.checked == true) {
                this.setState({[event.target.name]: event.target.checked});
                this.state.gridOptions.api.forEachNode(function (rowNode) {
                    console.log("delete")

                    var selectedData = rowNode.data
                    if (selectedData.historyChild == 0) {
                        var res = that.state.gridOptions.api.applyTransaction({remove: [selectedData]});
                    }


                });
            } else {
                this.setState({progressbar: true, [event.target.name]: event.target.checked}, () => {
                    that.getDBContent();
                    that.gridApi.setRowData(that.state.results);

                })
            }
*/
        }

    }

    getDetailRowData(params) {
        params.successCallback(tt);

        //setTimeout(function() {  params.api.refreshView(  );; }, 0)

        //params.successCallback(params.data.callRecords);
    }

    componentDidMount() {
        this.setState({progressbar: true}, () => {
            this.synchronizeDBContent();
            //this.getDBContent();
        })

    }

    handleSelectDropDown(e) {
        console.log("handleSelectDropDown");
    }

    /*    clickedChoice(data) {
            console.log("clickedChoice data:" + JSON.stringify(data));

        }*/


    onCellClicked(data) {

        if (data &&
            data.colDef.field === "Details" ||
            data.colDef.field === "Delete" ||
            data.colDef.field === "Action" ||
            data.colDef.field === "ConversionHistory"

        ) {

        } else {

            console.log("onCellClicked");
            this.jsontheme = "monokai"

            if (data && data.data && data.data.affilae_data) {

                var str = JSON.parse(data.data.affilae_data);
                this.setState({currentSelection: data, my_important_json: str})
            }
        }
    }


    /*onClickedHistory(data) {
        console.log("onClickedHistory");
        this.mycurrent.setState({progressbar: true}, () => {
            var session_url = `${API_URL}/historyconversion?api_key=${API_KEY}`;
            var username = 'jpl';
            var password = 'jpl';

            var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
            var config = {
                method: 'POST',
                withCredentials: true,
                "headers": {
                    "Authorization": auth,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            };
            var that = this;
            fetch( session_url, config
                ).then((res) => {

                    if (res.ok) {
                        //that.ErrorInfo = {}
                    } else {
                        //that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
                    }
                    var p = res.json();
                    return p;
                }).then(function (data) {




                        //that.setState({my_important_json: data})
                        if (data && data.results) {
                            //var str = JSON.parse(data.results);
                            var str = [];

                            for ( var i=0; i<data.results.length; i++ ){
                                var blk = data.results[i];
                                if ( blk.affilae_conversion ){
                                    blk.affilae_conversion = JSON.parse(data.results[i].affilae_conversion);
                                }
                                str.push( blk )
                            }
                             that.mycurrent.jsontheme = "apathy:inverted";
                            that.mycurrent.setState({
                                progressbar: false,

                                my_important_json: str,


                            })
                        }



                }).catch(function (error) {
                    console.log('Error on historyconversion');

                    that.mycurrent.error = {};
                    that.mycurrent.error.severity = "error";
                    that.mycurrent.error.msg = error.message;
                    that.mycurrent.setState({progressbar: false}, () => {

                    })


            });
        })
    }*/

    /*onClickedDetail(data) {
        console.log("onClickedDetail");
        if ( data && data.affilae_conversion ){
            this.mycurrent.jsontheme = "shapeshifter:inverted";


            var str = JSON.parse(data.affilae_conversion);
            this.mycurrent.setState({  currentSelection: data, my_important_json: str})
        }
    }*/

    onClickedAction(data) {
        console.log("onClickedAction");
        if (data && data.affilae_data) {

            var str = JSON.parse(data.affilae_data);
            this.mycurrent.setState({show: true, currentSelection: data, my_important_json: str})
        } else {
            this.mycurrent.setState({show: true, currentSelection: data})
        }


    }

    executeAddAffilaeRequest(data) {
        //data = {"name":"jpltest ","amount":"11111","identity":"","choice":"win","formId":"13"};

        console.log("executeAddAffilaeRequest data:" + JSON.stringify(data));

        //var currentChoice = this.mycurrent.state.choice;


        var session_url = `${API_URL}/addconversion?api_key=${API_KEY}`;
        var username = 'jpl';
        var password = 'jpl';

        var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        var config = {
            method: 'POST',
            withCredentials: true,
            "headers": {
                //"Authorization": auth,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        };
        var that = this;
        fetch(session_url, config)
            .then(response => response.json())

            .then(function (data) {

                that.setState({progressbar: false}, () => {
                    //that.setState({my_important_json: data})
                    if (data && data.status && data.status === "done") {
                        // TODO
                        that.error = {};
                        that.error.severity = "info";
                        that.error.msg = "status: " + data.status + " msg: " + data.message;
                    } else if (data && data.status) {
                        that.error = {};
                        that.error.severity = "error";
                        that.error.msg = "status: " + data.status + " msg: " + data.message;
                    } else {
                        that.error = {};
                        that.error.severity = "error";
                        that.error.msg = " msg: " + data.message;
                    }
                    console.log('action done');
                    that.getDBContent();
                })

            }).catch(function (error) {
            console.log('Error on action');
            that.setState({progressbar: false}, () => {
                alert("Error on action: Action Call failed:" + error)
            })

        });


        //event.preventDefault();

    }

    clickedRemove(data) {
        this.mycurrent.setState({removeData: data})
        const div = document.createElement("div");
        document.body.appendChild(div);
        ReactDOM.render(<AlertDialog title={"Remove"} message={'Can you confirm deletion?'}
                                     ref={this.modalDialogRef}
                                     handleCaller={this.mycurrent.onModalDeleteResult}/>, div);

        //alert(`${field} was clicked!!`);

    }

    onModalDeleteResult(status) {
        console.log("onModalDeleteResult");
        if (status === true) {
            this.gridApi.currentRemoveId = this.state.removeData.id;
            this.gridApi.forEachNode(function (node) {
                node.setSelected(node.data.id === node.gridApi.currentRemoveId);
            });
            this.deleteRowClicked();
        }
    }

    deleteRowClicked() {
        var selected = this.gridApi.getFocusedCell();
        this.deleteId(this.state.results[selected.rowIndex].id);
        this.state.results.splice(selected.rowIndex, 1);
        this.gridApi.setRowData(this.state.results);
        //this.setState({rowData: this.state.results})


        /*
                if (this.gridApi) {
                    let blockSelected = this.gridApi.getSelectedRows();
                    for (let i = 0; i < blockSelected.length; i++) {

                        // this.state.repoSourceInstance.removeBlock(blockSelected[i].id)
                        alert("delete in base");

                    }


                    // TODO this.reload()
                }
                */
        this.getDBContent()

    }

    synchronizeDBContent() {
        console.log("synchronize required");
        this.setState({progressbar: true}, () => {
            var session_url = `${API_URL}/synchronize?api_key=${API_KEY}`;
            var username = 'jpl';
            var password = 'jpl';

            var data = {};
            data.program = {};
            data.program.title = this.state.currentProgramId;
            data.limit = 20;

            var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

            var config = {
                method: 'POST',
                withCredentials: true,
                "headers": {
                    //"Authorization": auth,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
            var that = this;
            fetch(session_url, config
                //axios.get(session_url, config
            ).then((res) => {

                if (res.ok) {
                    //that.ErrorInfo = {}
                } else {
                    //that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
                }
                var p = res.json();
                return p;
            })
                .then(function (data) {

                    console.log('Synchronize Authenticated');
                    that.error = {};
                    that.error.severity = "info";
                    that.error.msg = JSON.stringify(data);
                    that.setState({
                        progressbar: false
                    }, () => {

                        that.getDBContent();

                    })
                }).catch(function (error) {
                console.log('Synchronize Error: ' + error.message);
                that.error = {};
                that.error.severity = "error";
                that.error.msg = error.message;
                that.setState({
                    progressbar: false,


                })
            });
        })
    }

    getDBContent() {

        var session_url = `${API_URL}/fetch?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`;
        var username = 'jpl';
        var password = 'jpl';

        var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        var config = {
            withCredentials: true,
            "headers": {
                //"Authorization": auth
            }
        };
        var that = this;
        fetch(session_url, config
            //axios.get(session_url, config
        ).then((res) => {

            if (res.ok) {
                //that.ErrorInfo = {}
            } else {
                //that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
            }
            var p = res.json();
            return p;
        })
            .then(function (data) {

                console.log('Fetch Authenticated');

                that.checkRuleConversionPossibility(data.results);

                that.setState({
                    progressbar: false,
                    results: data.results // MusicGraph returns an object named data,
                    // as does axios. So... data.data
                })

            }).catch(function (error) {
            console.log('Fetch Error: ' + error.message);
            that.error = {};
            that.error.severity = "error";
            that.error.msg = error.message;
            that.setState({
                progressbar: false,
                test: "jpl2",

            })
        });

    }

    deleteId(idToDelete) {
        var session_url = `${API_URL}/delete/${idToDelete}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`;
        var username = 'jpl';
        var password = 'jpl';

        var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        var config = {
            withCredentials: true,
            "headers": {
                //"Authorization": auth
            }
        };
        var that = this;
        //var that = this;
        fetch(session_url, config
            //axios.get(session_url, config
        ).then((res) => {

            if (res.ok) {
                //that.ErrorInfo = {}
            } else {
                //that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
            }

            return;
        })
            .then(function (data) {

                console.log('Delete: block deleted');

            }).catch(function (error) {
            console.log('Delete Error: ' + error.message);
            that.error = {};
            that.error.severity = "error";
            that.error.msg = error.message;
            that.setState({
                test: "jpl2",

            })
        });
    }

    /*
       onSelectionChanged = (e) => {
           var selectedRows = this.gridApi.getSelectedRows();
           document.querySelector('#selectedRows').innerHTML = selectedRows.length === 1 ? selectedRows[0].id : '';
           var str = "";
           if ( selectedRows && selectedRows[0] && selectedRows[0].affilae_data) {
               str = JSON.parse(selectedRows[0].affilae_data);
           }
           console.log("==>onSelectionChanged str: " + str);
           this.setState({my_important_json: str})
       };
       */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        //this.state.detailCellRendererParams.detailGridOptions.api = params.api;
        console.log("onGridReady")



        //this.setState ({detailCellRendererParams:{detailGridOptions: {api : params.api}}});
    }



    handleSubmitCreateUuid(event) {
        var data = [];
        data.push({"id": this.state.id, "name": this.state.name, "status": this.state.status,});

        console.log("handleSubmitCreateUuid data:" + JSON.stringify(data));

        var session_url = `${API_URL}/add?api_key=${API_KEY}`;
        var username = 'jpl';
        var password = 'jpl';

        var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        var config = {
            method: 'POST',
            withCredentials: true,
            "headers": {
                //"Authorization": auth,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        var that = this;
        fetch(session_url, config
            //axios.get(session_url, config
        ).then((res) => {

            if (res.ok) {
                //that.ErrorInfo = {}
            } else {
                //that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
            }
            //var p = res.json();
            //return p;
            return;
        })
            .then(function (data) {

                console.log('Add: Block added');
                that.getDBContent();

            }).catch(function (error) {
            console.log('Add Error: ' + error.message);
            that.error = {};
            that.error.severity = "error";
            that.error.msg = error.message;
            that.setState({
                test: "jpl2",

            })
        });


        event.preventDefault();

    }

    handleModalClose() {
        this.setState({show: false})
    }

    onFormSubmit(data) {
        console.log("Form");

        var commission = "";
        var amount = 0;
        var prefix = "";

        for (var i = 0; i < data.target.length; i++) {

            if (data.target[i].id === "action_commission") {
                commission = data.target[i].value
            } else if (data.target[i].id === "action_amount") {
                amount = data.target[i].value;

            } else if (data.target[i].id === "action_prefix") {
                prefix = data.target[i].value

            }

        }
        //this.state.my_important_json

        var dataInput = {};
        dataInput.commission = commission;
        dataInput.amount = amount;
        //dataInput.identity = identity;
        dataInput.choice = this.state.choice;
        dataInput.formId = this.state.currentSelection.formid;
        dataInput.previousrequest = this.state.currentSelection;
        if (this.state.currentSelection.programId) {
            dataInput.programId = this.state.currentSelection.programId;
        }
        if (this.state.currentSelection.partnership_id) {
            dataInput.partnership_id = this.state.currentSelection.partnership_id;
        }
        if (this.state.currentSelection.rule_Id) {
            dataInput.rule_Id = this.state.currentSelection.rule_Id;
        }
        dataInput.prefix = prefix;
        data.preventDefault();

        this.setState({show: false, progressbar: true}, () => {
            this.executeAddAffilaeRequest(dataInput)
        })


    }

    checkRuleConversionPossibility(result) {

        for (var j = 0; j < result.length; j++) {

            if (result[j] && result[j].affilae_data) {


                var dataline = JSON.parse(result[j].affilae_data);
                var partnership_id = "";
                if (dataline && dataline.funnel) {
                    var localfunnel = dataline.funnel;
                    var partnership_id_status = false;
                    for (var i = 0; i < localfunnel.length; i++) {
                        if (localfunnel[i] && localfunnel[i].partnership) {

                            if (localfunnel[i].percent && localfunnel[i].percent === 100) {

                                if (localfunnel[i].partnership.id) {
                                    partnership_id = localfunnel[i].partnership.id;
                                    console.log("partnership_id trouvé: " + partnership_id);
                                    partnership_id_status = true;
                                }
                            }

                        }

                    }
                    if (partnership_id_status === false) {
                        // pas de pourcent 100 found
                        partnership_id = "pas de pourcent 100% trouve"
                        result[j].conversionStatus = false;
                        console.log("partnership_id pas trouvé: " + partnership_id);
                    } else {
                        result[j].conversionStatus = true;
                    }

                }
                console.log("partnership_id: " + partnership_id);
            }
        }

    }


    render() {
        const {classes} = this.props;

        const jsontheme = this.jsontheme;


        const progressBar = [];
        if (this.state.progressbar === true) {
            progressBar.push(<div>
                    <CircularProgress size={100} className={classes.fabProgress} ref={this.refProgressBar}/>
                </div>
            );
        }

        const RefreshButton = [];
        var variant = this.syncButtonVariant;
        var color = this.syncButtonColor;
        RefreshButton.push(
            <Button variant={variant} color={color} onClick={() => {
                this.synchronizeDBContent()
            }}>Synchronize</Button>
        );

        const FilterDataButton = [];
        var variant = this.syncButtonVariant;
        var color = this.syncButtonColor;
        FilterDataButton.push(
            //<Button   variant={"contained"} color={"primary"}  size="small" onClick={() => { this.onChangeConversionType() }}>only group</Button>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.state.checkedB}
                        color="primary"
                        name="checkedB"
                        onChange={this.onChangeConversionType}
                        inputProps={{'aria-label': 'secondary checkbox'}}
                        only group
                    />
                }
                label="only group"
            />
        );

        const AreaJSONData = [];

        AreaJSONData.push(
            //<Button   variant={"contained"} color={"primary"}  size="small" onClick={() => { this.onChangeConversionType() }}>only group</Button>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.state.areaJSONDataStatus}
                        color="primary"
                        name="areaJSONDataStatus"
                        onChange={this.onChangeAreaJSON}
                        inputProps={{'aria-label': 'secondary checkbox'}}

                    />
                }
                label="json area"
            />
        );

        const ProgramDropdown = [];
        ProgramDropdown.push(
            <Dropdown>

                <DropdownButton
                    alignRight
                    title="Program"
                    id="dropdown-menu-align-right"
                    onSelect={this.handleSelectDropDown}
                >
                    <Dropdown.Item>
                        <Dropdown.Item href="#/action-1">"Focus, L'école de préparation mentale"</Dropdown.Item>

                    </Dropdown.Item>

                </DropdownButton>

            </Dropdown>
        );


        const AlertBlk = [];
        if (this.error && this.error.severity) {
            if (this.error.severity === "error" || this.error.severity === "abort" || this.error.severity === "failed") {

                AlertBlk.push(
                    <div className={classes.root}>
                        <Alert severity={this.error.severity} className={classes.root}>
                            <AlertTitle>Error</AlertTitle>
                            {this.error.msg}
                            action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.setState({errorPanel: false});
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        </Alert>
                    </div>
                );

            } else if (this.error.severity === "info") {
                AlertBlk.push(
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        {this.error.msg}
                    </Alert>
                );
            }
            this.error = {};
        }
        const SettingsForm = [];


        SettingsForm.push(

        );


        const CreateForm = [];
        CreateForm.push(
            <form onSubmit={this.handleSubmitCreateUuid}>
                <h1>Create UUID Formulaire </h1>

                <label>
                    id:
                    <input
                        name="id"
                        type="id"
                        value={this.state.id}
                        onChange={e => this.setState({id: e.target.value})}
                        required/>
                </label>

                <label>
                    name:
                    <input
                        name="name"
                        type="name"
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                        required/>
                </label>

                <label>
                    status:
                    <input
                        name="status"
                        //type="status"
                        type="hidden"
                        value={1}
                        onChange={e => this.setState({status: e.target.value})}
                        required/>
                </label>


                <button>Submit</button>
            </form>
        )

        const ViewForm = [];
        ViewForm.push(
            <form>


                { /*

                <div className="example-header">
                    Selection:
                    <span id="selectedRows"></span>
                </div>

                ClientSideRowModelModule,
                            MasterDetailModule,
                            MenuModule,
                            ColumnsToolPanelModule,

					*/}
                <div style={{width: "100%"}}>
                    <div className="ag-theme-alpine">
                        <AgGridReact
                            //modules= {[AllModules]}
                            modules={[AllCommunityModules, MasterDetailModule,
                                MenuModule,


                            ]}

                            masterDetail={this.masterDetail}

                            columnDefs={this.state.columnDefs}
                            detailCellRenderer={'myDetailCellRenderer'}
                            //detailCellRendererParams = {this.detailCellRendererParams}
                            pagination="true"
                            domLayout='autoHeight'
                            //ref={this.state.childRefBlockContent}
                            //columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            rowMultiSelectWithClick={true}
                            onGridReady={this.onGridReady}

                            rowSelection={this.state.rowSelection}
                            onCellClicked={this.onCellClicked}
                            rowData={this.state.results} paginationPageSize="10"
                            //onSelectionChanged={this.onSelectionChanged}
                            frameworkComponents={this.state.frameworkComponents}
                            enableRangeSelection={true}
                            allowContextMenuWithControlKey={true}
                            gridOptions={this.state.gridOptions}
                            //getContextMenuItems={this.getContextMenuItems}
                            sideBar={this.state.sideBar}

                        >


                        </AgGridReact>

                    </div>
                </div>

            </form>
        )

        const ControlledJSONAreaTabs = [];
        if (this.state.areaJSONDataStatus == true) {


            ControlledJSONAreaTabs.push(
                <ReactJson src={this.state.my_important_json} theme={jsontheme}/>
            )
        }

        const ControlledTabs = [];

        //const [key, setKey] = useState('home');

        ControlledTabs.push(
            <div>
                <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="center" spacing={2}>


                </Grid>
                <Tabs>
                    <TabList>
                        <Tab>View</Tab>

                        <Tab>Settings</Tab>

                    </TabList>


                    <TabPanel>
                        <h1>FormId list in DB </h1>
                        <Grid container
                              direction="row"
                              justify="flex-end"
                              alignItems="center" spacing={2}>


                        </Grid>
                        {FilterDataButton}
                        {ViewForm}
                        {ControlledJSONAreaTabs}

                    </TabPanel>

                    <TabPanel>

                        {ProgramDropdown}
                        {RefreshButton}
                        {AreaJSONData}

                    </TabPanel>
                </Tabs>
            </div>
        );
        console.log("this.state.my_important_json:" + this.state.my_important_json)
        console.log("this.state.currentSelection:" + this.state.currentSelection)


        return (

            <Grid item xs={12} lg={12} spacing={3}>
                {progressBar}
                <Box m={2} pt={3}>
                    {AlertBlk}
                    <Grid item xs={12} lg={12} spacing={3}>
                        {ControlledTabs}
                    </Grid>
                </Box>

                <Modal
                    show={this.state.show}
                    onHide={this.handleModalClose}
                    backdrop="static"
                    keyboard={false}

                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Conversion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <ActionForm dataline={this.state.my_important_json} formId={this.state.currentSelection}
                                onSubmit={this.onFormSubmit}/>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </Grid>


        )
    }
}

export default withStyles(styles, {withTheme: true})(Search);
