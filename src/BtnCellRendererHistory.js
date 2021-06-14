import React, {Component} from 'react';

import IconButton from '@material-ui/core/IconButton';

import HistoryIcon from '@material-ui/icons/History';

import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    margin: {
        //margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class BtnCellRendererHistory extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.data);
    }
    render() {
        const {classes} = this.props;
		const IconTabs = [];
		//console.logs("BtnCellRendererHistory:" + this.props.affilae_conversion);
		if ( this.props && this.props.data && this.props.data.affilae_conversion ){
			IconTabs.push(
				 <IconButton aria-label="history1" className={classes.margin} onClick={this.btnClickedHandler}>
					<HistoryIcon/>
				</IconButton>
			);
		}
        return (
           <div>
				{IconTabs}
			</div>

        )
    }
}
export default withStyles(styles, {withTheme: true}) (BtnCellRendererHistory);
//<Button onClick={this.btnClickedHandler} color="primary" variant="contained">Remove</Button>
//<button onClick={this.btnClickedHandler}>Remove</button>

// <IconButton aria-label="delete" className={classes.margin} onClick={this.btnClickedHandler}>
//                 <DeleteIcon />
//             </IconButton>
