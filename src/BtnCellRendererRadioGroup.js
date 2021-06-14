import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


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
    }
})

class BtnCellRendererRadioGroup extends Component {
    constructor(props) {
        super(props);
        this.props.mycurrent.setState({choice:"win"});
        this.btnClickedHandler = this.btnClickedHandler.bind(this);

    }
    btnClickedHandler( event ) {

        this.props.mycurrent.setState({choice:event.target.value});
        this.props.clicked(event.target.value);
    }
    getCurrentChoice(){
        return this.state.currentChoice;
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid item xs={12} lg={12} spacing={3}   >
            <FormControl component="fieldset">
               {/*<FormLabel component="legend">Gender</FormLabel>*/}

                <RadioGroup aria-label="gender" name="gender1"   onChange={this.btnClickedHandler} className={classes.group}>
                    <FormControlLabel value="win" control={<Radio />} label="Win" />
                    <FormControlLabel value="lose" control={<Radio />} label="Lose" />


                </RadioGroup>
            </FormControl>
            </Grid>



        )
    }
}
export default withStyles(styles, {withTheme: true}) (BtnCellRendererRadioGroup);
//<Button onClick={this.btnClickedHandler} color="primary" variant="contained">Remove</Button>
//<button onClick={this.btnClickedHandler}>Remove</button>

// <IconButton aria-label="delete" className={classes.margin} onClick={this.btnClickedHandler}>
//                 <DeleteIcon />
//             </IconButton>
