import React, {Component} from 'react';

import IconButton from '@material-ui/core/IconButton';

import Add from '@material-ui/icons/Add';

import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    margin: {
        //margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class BtnCellRendererAction extends Component {
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
		/*
		if ( this.props && this.props.data && this.props.data.affilae_conversion ){
		}else{
			*/
			IconTabs.push(
				 <IconButton aria-label="action1" className={classes.margin} onClick={this.btnClickedHandler}>
                <Add />
            </IconButton>
			);
			
		//}
        return (
           
			
			
			<div>
				{IconTabs}
			</div>



        )
    }
}
export default withStyles(styles, {withTheme: true}) (BtnCellRendererAction);
//<Button onClick={this.btnClickedHandler} color="primary" variant="contained">Remove</Button>
//<button onClick={this.btnClickedHandler}>Remove</button>

// <IconButton aria-label="delete" className={classes.margin} onClick={this.btnClickedHandler}>
//                 <DeleteIcon />
//             </IconButton>
