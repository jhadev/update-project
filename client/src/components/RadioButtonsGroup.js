import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    income: true,
    value: ""
  };

  handleChange = event => {
 
    this.setState({  value: event.target.value });
    console.log(this.state.income);
  };

  handleInputTrue = event => {
    this.setState({income: true})
  }

  handleInputFalse = event => {
    this.setState({income: false})
  }

  render = () => {
    const { classes } = this.props;

    return (
    <div className={classes.root}>
    <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">+ / -</FormLabel>
          <RadioGroup
            aria-label="Income"
            name="income"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel 
              value="true"
              control={<Radio />} 
              label="Income"
              name="income"
              onClick={this.handleInputTrue} 
              />

            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Expense"
              name="income"
              onClick={this.handleInputFalse}
            />
          </RadioGroup>
        </FormControl>
    </div>
    ) 
}
    
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
