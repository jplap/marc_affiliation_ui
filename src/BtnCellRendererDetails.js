import React, {Component} from 'react';

import IconButton from '@material-ui/core/IconButton';

import Details from '@material-ui/icons/Details';

import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    margin: {
        //margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class BtnCellRendererDetails extends Component {
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
		//console.logs("BtnCellRendererDetails:" + this.props.affilae_conversion);
		if ( this.props && this.props.data && this.props.data.affilae_conversion ){
			IconTabs.push(
				 <IconButton aria-label="detail1" className={classes.margin} onClick={this.btnClickedHandler}>
					<Details/>
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
export default withStyles(styles, {withTheme: true}) (BtnCellRendererDetails);
//<Button onClick={this.btnClickedHandler} color="primary" variant="contained">Remove</Button>
//<button onClick={this.btnClickedHandler}>Remove</button>

// <IconButton aria-label="delete" className={classes.margin} onClick={this.btnClickedHandler}>
//                 <DeleteIcon />
//             </IconButton>
