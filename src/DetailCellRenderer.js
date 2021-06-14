import React, {Component, useEffect} from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import './styles.css';

import * as moment from 'moment';



/*var tt = [
    {
        id: 2,
        "date_action": "2021-05-31T14:52:04.000Z",
        "formid_original": "XXX",

        'status': "done",
    },
    {
        id: 1,
        "date_action": "2021-05-31T14:52:04.000Z",
        "formid_original": "XXX",
        'status': "done",
    },
    {
        id: 3,
        "date_action": "2021-05-31T14:52:04.000Z",
        "formid_original": "XXX",
        'status': "done",
    }



]*/

const API_URL = '/form';
const {API_KEY} = process.env
class DetailCellRenderer extends Component {

    constructor(props)
    {
        super(props);
        this.data = {};
        this.data.name = "";
        if ( props.data && props.data.formid ){
            this.data.name = props.data.formid
        }



        this.state = {
            result: []
        }

        this.colDefs = [

            { field: 'date_action',
                valueFormatter: function (params) {
                    return moment(params.value).format('D MMM YYYY HH:mm');
                },
                sortable: true, filter: true, editable: false
            },

            { field: 'identifier' },
            {
                field: 'commission_paid',
                width: 100
            },
            { field: 'amount',
                width: 100
            },
            {
                field: 'status',
                minWidth: 10
            },
        ];

        this.defaultColDef = {
            flex: 1,
            minWidth: 120,
            resizable: true
        };


        //this.onGridReady = this.onGridReady.bind(this);
        this.onClickedHistory = this.onClickedHistory.bind(this);

    }



    onGridReady = (params) => {
        const gridInfo = {

            api: params.api,
            columnApi: params.columnApi,
        };
        const rowData = this.state.result;
        params.api.setRowData(rowData);
        params.api.refreshClientSideRowModel('aggregate');

        this.onClickedHistory("");



    };

    onClickedHistory(data) {
        console.log("onClickedHistory");
        this.setState({progressbar: true}, () => {
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
                body: JSON.stringify(this.props.data)

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
                            if ( blk.affilae_conversion && blk.affilae_conversion.status ){
                                blk.status = blk.affilae_conversion.status;
                            }
                            if ( blk.affilae_conversion && blk.affilae_conversion.conversion && blk.affilae_conversion.conversion.identifier ){
                                blk.identifier = blk.affilae_conversion.conversion.identifier;
                            }
                            if ( blk.affilae_conversion && blk.affilae_conversion.conversion && "amount" in blk.affilae_conversion.conversion ){
                                blk.amount = blk.affilae_conversion.conversion.amount;
                            }
                            if ( blk.affilae_conversion && blk.affilae_conversion.conversion && "commission_paid" in blk.affilae_conversion.conversion ){
                                blk.commission_paid = blk.affilae_conversion.conversion.commission_paid;
                            }
                        }
                        str.push( blk )
                    }
                    that.jsontheme = "apathy:inverted";
                    that.setState({
                        progressbar: false,

                        result: str,


                    })
                }



            }).catch(function (error) {
                console.log('Error on historyconversion');

                that.error = {};
                that.error.severity = "error";
                that.error.msg = error.message;
                that.setState({progressbar: false}, () => {

                })


            });
        })
    }

    render () {
        return(
            <div className="full-width-panel">
                <div className="full-width-details">
                    <h2>History</h2>


                </div>


                <AgGridReact
                    id="detailGrid"
                    className="full-width-grid ag-theme-alpine"
                    columnDefs={this.colDefs}
                    defaultColDef={this.defaultColDef}
                    //rowData={data.callRecords}
                    rowData={this.state.result}
                    modules={AllCommunityModules}
                    onGridReady={this.onGridReady}
                />

            </div>
        );
    }
}

export default DetailCellRenderer;
