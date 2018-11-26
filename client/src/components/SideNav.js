import React, {Component} from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import BookIcon from "@material-ui/icons/Book";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './SideNav.css'
import API from "../utils/API";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';




const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "95%",
    padding: 20
  },
  textField: {
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  button: {
    width: "100%"
  }
});

class SideNav extends Component {
  state = {
    description: "",
    amount: 0,
    category: "",
    date: "",
    income: true,
    budget: {},
    value: ""
  }
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this");
    // if (
    //   this.state.description &&
    //   this.state.amount &&
    //   this.state.date &&
    //   this.state.income &&
    //   this.state.category
    // )
     {
      let budgetObject = {
        description: this.state.description,
        amount: this.state.amount,
        date: this.state.date,
        income: this.state.income,
        category: this.state.category
      };

      this.setState({ budget: budgetObject });

      API.budgetPost(budgetObject)
        .then(res => {
          console.log(res);
          console.log("BUDGET STATE OBJECT: " + this.state.budget);
          // this.setState({
          //   description: "",
          //   amount: "",
          //   date: "",
          //   income: "",
          //   income: "",
          //   category: ""})
        })
        .catch(err => console.log(err));
    }
  };
   //RADIO BUTTON METHODS
   handleChangeRadio = event => {
 
    this.setState({  value: event.target.value });
    console.log(this.state.income);
  };

  handleInputTrue = event => {
    this.setState({income: true})
    console.log(this.state.income)
  }

  handleInputFalse = event => {
    this.setState({income: false})
    console.log(this.state.income)
  }

  render = () => (
    <div className="top">
      <Typography className="logo" align="center" variant="p" color="textPrimary">
        curren$ee
      </Typography>
      <Divider />

      <List>
        <Link to={`/search`}>
          <ListItem
            button
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Charts"} />
          </ListItem>
        </Link>
        <Link to={`/saved`}>
          <ListItem
            button
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={"Table"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <div className="container">
        <form
          noValidate
          autoComplete="off"
          style={{
            width: "100%"
          }}
          onSubmit={this.handleFormSubmit}
        >
          <TextField
            id="standard-name"
            label="Description"
            className="textField"
            value={this.state.description}
            onChange={this.handleInputChange}
            margin="normal"
            name="description"
          />
          <TextField
            id="standard-amount"
            label="Amount"
            className="textField"
            onChange={this.handleInputChange}
            value={this.state.amount}
            margin="normal"
            name="amount"
          />
         {/* <TextField
            id="standard-category"
            label="Category"
            className="textField"
            onChange={this.handleInputChange}
            value={this.state.category}
            placeholder="Utilities"
            margin="normal"
            name="category"
         />*/}
          <FormControl className="dropdownCat">
          <InputLabel htmlFor="category-helper">Category</InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleChange}
            input={<Input name="category" id="category=helper" />}
          >
            <MenuItem value={'Health'}>Health & Fitness</MenuItem>
            <MenuItem value={'Home'}>Home</MenuItem>
            <MenuItem value={'Income'}>Income</MenuItem>
            <MenuItem value={'Savings'}>Savings</MenuItem>
            <MenuItem value={'Shopping'}>Shopping</MenuItem>
            <MenuItem value={'Travel'}>Travel</MenuItem>
            <MenuItem value={'Utilities'}>Utilities</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
          <FormHelperText>choose your category</FormHelperText>
        </FormControl>
          {/* <TextField
            select
            className={classNames(classes.margin, classes.textField)}
            variant="filled"
            label="With Select"
            value={props.category}
            onChange={() => props.handleChange('category')}
            InputProps={{
              startAdornment: (
                <InputAdornment variant="filled" position="start">
                  Category
                </InputAdornment>
              )
            }}
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
          <TextField
            id="standard-date"
            label="Date"
            className="textField"
            onChange={this.handleInputChange}
            value={this.state.date}
            placeholder="MM/DD/YYYY"
            margin="normal"
            name="date"
          />
          {/* RADIO BUTTONS FOR INCOME AND EXPENSE */}
          <FormControl component="fieldset" className="formControl">
            <RadioGroup
              aria-label="Income"
              name="income"
              className="group"
              value={this.state.value}
              onChange={this.handleChangeRadio}
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
                name="expense"
                onClick={this.handleInputFalse}
              />
            </RadioGroup>
          </FormControl>
          <Button
            /*disabled={
              !(
                props.description &&
                props.amount &&
                props.date &&
                props.category
              )
            }*/
            variant="outlined"
            color="primary"
            className="button"
            type="submit"
            to={`/dash`}
            onClick={this.handleFormSubmit}
          >
            Submit Budget
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withStyles(styles)(SideNav);
