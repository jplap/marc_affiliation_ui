import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { v4 as uuidv4 } from 'uuid';

const styles = theme => ({
    margin: {
        //margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
	form_group_browse_red:{
		color:"red",
		fontSize: '.8rem'
	},
	form_group_browse:{
		fontSize: '.8rem'
	}

})

//export const ActionForm = ({onSubmit}) => {
class ActionForm extends Component {
    constructor(props) {
        super(props);
        console.log("ActionForm constructor");
		this.state = {
            amount: 0,
			commission: 0,
			winlosevalue: "win",
			prefix: "_focus_" + uuidv4()
        }
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleCommissionChange = this.handleCommissionChange.bind(this);
		this.handlePrefixChange = this.handlePrefixChange.bind(this);

    }

    combo(thelist, theinput) {
        console.log();
        /*
        theinput = document.getElementById(theinput);
        var idx = thelist.selectedIndex;
        var content = thelist.options[idx].innerHTML;
        theinput.value = content;
        */
    }

    btnClickedHandler(e) {
        console.log("ActionForm btnClickedHandler");


        const {name, value} = e.target;
		this.setState( {winlosevalue: value});
        if (value === "lose") {
            document.getElementById("action_amount_form").style.visibility = "hidden";
            document.getElementById("action_commission_form").style.visibility = "hidden";
        } else {
            document.getElementById("action_amount_form").style.visibility = "visible";
            document.getElementById("action_commission_form").style.visibility = "visible";
        }
    }
	handleAmountChange(e){

		console.log("ActionForm handleAmountChange");

        if(e.type === 'blur' || e.key === 'Enter'){
            const quantityWithRemovedLeadingZeroes = e.target.value !== '' ? parseFloat(e.target.value) : 0
            const tempNumberToChange = quantityWithRemovedLeadingZeroes === 0 ? 1 : 0
            this.setState({ amount: tempNumberToChange }, () => {
                this.setState({ amount: quantityWithRemovedLeadingZeroes })
            })

        } else if(e.type==='change') {
            const newQuantity = e.target.value !== '' ? parseFloat(e.target.value) : null
            this.setState({
                amount: newQuantity
            })
        }
    }

	handleCommissionChange(e){
		console.log("ActionForm handleCommissionChange");
        if(e.type === 'blur' || e.key === 'Enter'){
            const quantityWithRemovedLeadingZeroes = e.target.value !== '' ? parseFloat(e.target.value) : 0
            const tempNumberToChange = quantityWithRemovedLeadingZeroes === 0 ? 1 : 0
            this.setState({ commission: tempNumberToChange }, () => {
                this.setState({ commission: quantityWithRemovedLeadingZeroes })
            })

        } else if(e.type==='change') {
            const newQuantity = e.target.value !== '' ? parseFloat(e.target.value) : null
            this.setState({
                commission: newQuantity
            })
        }
    }


	handlePrefixChange(e){
		console.log("ActionForm handlePrefixChange");
        if(e.type === 'blur' || e.key === 'Enter'){
            const quantityWithRemovedLeadingZeroes = e.target.value !== '' ? e.target.value : 0
            const tempNumberToChange = quantityWithRemovedLeadingZeroes === 0 ? 1 : 0
            this.setState({ prefix: tempNumberToChange }, () => {
                this.setState({ prefix: quantityWithRemovedLeadingZeroes })
            })

        } else if(e.type==='change') {
            const newQuantity = e.target.value !== '' ? e.target.value : null
            this.setState({
                prefix: newQuantity
            })
        }
    }

    render() {
        const {classes} = this.props;
		console.log("jpl classes:" + JSON.stringify(classes))

        // On Affiche si on les a les arguments important pour la requete qui aura lieu sur le serveur
        var partnership_id = "";
        if (this.props.dataline && this.props.dataline.funnel) {
            var localfunnel = this.props.dataline.funnel;
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
            if ( partnership_id_status === false ){
                // pas de pourcent 100 found
                partnership_id = "pas de pourcent 100% trouve"
				console.log("partnership_id pas trouvé: " + partnership_id);
            }

        }
		console.log("partnership_id: " + partnership_id);

        const formRuleTabs = [];
        var rule_Id = "6086a760e302e67e42610b6a";
		this.props.formId.rule_Id = rule_Id;
		/*<input className="form-control" id="action_rule" type='text' value={rule_Id} readonly/>*/
        formRuleTabs.push(
            <div className={classes.form_group_browse} id="action_rule_form">
                <label htmlFor="name">rule_Id: {rule_Id}</label>

            </div>
        );
		console.log("rule_Id: " + rule_Id);

        const formIdTabs = [];
        if (this.props.formId && this.props.formId.formid) {
/*<input className="form-control" id="action_formId" type='text' value={this.props.formId.formid} readonly/>*/
            formIdTabs.push(
                <div className={classes.form_group_browse} id="action_formId_form">
                    <label htmlFor="name">formId: {this.props.formId.formid} </label>

                </div>
            );
        }

        const formProgramIdTabs = [];
        if (this.props.formId && this.props.formId.programId) {
/*"<input className="form-control" id="action_programId" type='text' value={this.props.formId.programId} readonly/>"*/
            formProgramIdTabs.push(
                <div className={classes.form_group_browse} id="action_programId_form">
                    <label htmlFor="name">programId: {this.props.formId.programId} </label>

                </div>
            );
        }

		var modesubmit = true;

		const formPartnership_idTabs = [];
		this.props.formId.partnership_id = partnership_id;
        //if (partnership_id  ) {
/*"<input className="form-control" id="action_programId" type='text' value={this.props.formId.programId} readonly/>"*/
			if ( partnership_id_status === true ) {
				formPartnership_idTabs.push(
					<div className={classes.form_group_browse} id="action_partnership_id_form">
						<label htmlFor="name">partnership_id: {partnership_id} </label>

					</div>
				);
			}else{
				formPartnership_idTabs.push(
					<div className={classes.form_group_browse_red} id="action_partnership_id_form">
						<label htmlFor="name">partnership_id: {partnership_id} </label>

					</div>
				);
				modesubmit = false

			}


		const buttonSubmit = [];

            buttonSubmit.push(

							<div id="id_submit" className="form-group" >
                                <button id="submit_Conversion" className="form-control btn btn-primary"  disabled={!modesubmit} >
                                    Submit
                                </button>
                            </div>


			);
        //}
		console.log("modesubmit: " + modesubmit);

        return (
            <div>
                <Grid item xs={12} lg={12} spacing={3}>
                    <Box m={2} pt={3}>
                        <form onSubmit={this.props.onSubmit}>
                            {formIdTabs}
                            {formRuleTabs}
                            {formProgramIdTabs}
							{formPartnership_idTabs}

							<Divider />

							<Tooltip title="Prefix" aria-label="prefix">
                                <div className="form-group" id="action_prefix_form">
                                    <label htmlFor="name">Prefix</label>
                                    <input className="form-control"
									       id="action_prefix"
										   type='string'
										    value={this.state.prefix != null ? this.state.prefix : ''}
									       onChange={this.handlePrefixChange}
									       onBlur={this.handlePrefixChange}
									       onKeyUp={this.handlePrefixChange}



										   />
                                </div>
                            </Tooltip>

							<Divider />
                            <Tooltip title="Montant Hors Taxes de la commission" aria-label="commission">
                                <div className="form-group" id="action_commission_form">
                                    <label htmlFor="name">Commission €</label>
                                    <input className="form-control"
									       id="action_commission"
										   type='number'
										    value={this.state.commission != null ? this.state.commission : ''}
									       onChange={this.handleCommissionChange}
									       onBlur={this.handleCommissionChange}
									       onKeyUp={this.handleCommissionChange}



										   />
                                </div>
                            </Tooltip>
                            <Tooltip title="Montant Hors Taxes de la conversion" aria-label="montant">
                                <div className="form-group" id="action_amount_form">
                                    <label htmlFor="amount">Amount €</label>
                                    <input className="form-control"
									       id="action_amount"
										   type='number'
										   value={this.state.amount != null ? this.state.amount : ''}
									       onChange={this.handleAmountChange}
									       onBlur={this.handleAmountChange}
									       onKeyUp={this.handleAmountChange}
								   />
                                </div>
                            </Tooltip>

                            {/* <div className="form-group">
                                <label htmlFor="Identity">Qui suis je ?</label>
                                <input type="text" id="theinput" name="theinput"/>
                                <select name="thelist" onChange={this.combo(this,'theinput')}>
                                    <option>jpl</option>
                                    <option>marc</option>
                                    <option>jules</option>
                                </select>
                            </div>*/}

                            <RadioGroup aria-label="gender" value={this.state.winlosevalue} name="gender1" onChange={this.btnClickedHandler}
                                        className={classes.group}>
                                <FormControlLabel value="win" control={<Radio/>} label="Win"/>
                                <FormControlLabel value="lose" control={<Radio/>} label="Lose"/>
                            </RadioGroup>
                            {/* <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email"
                       placeholder="name@example.com"
                />
            </div>*/}
							{buttonSubmit}
                        </form>
                    </Box>
                </Grid>
            </div>
        );
    }
};
export default withStyles(styles, {withTheme: true})(ActionForm);
