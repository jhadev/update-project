import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SideNav from "../components/SideNav";
import API from "../utils/API";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import "typeface-roboto";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Main extends Component {
  state = {
    isLoggedIn: true,
    username: "",
    itemToSearch: "",
    itemImages: [],
    mobileOpen: false,
    walmart: {},
    description: "",
    amount: 0,
    category: "",
    date: "",
    income: false,
    budget: {},
    bookQuery: "",
    bookList: [],
    activePageHeader: "Dashboard",
    activePage: "Search"
  };

  // Check login status on load
  componentDidMount() {
    this.loginCheck();
  }

  // Check login status
  loginCheck = () => {
    API.loginCheck()
      .then(res =>
        this.setState({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
   

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this")
    /*if (
      this.state.description &&
      this.state.amount &&
      this.state.date &&
      this.state.income &&
      this.state.category
    )*/ {
      API.budgetPost({
        description: this.state.description,
        amount: this.state.amount,
        date: this.state.date,
        income: this.state.income,
        category: this.state.category
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  handleSearch = event => {
    event.preventDefault();

    API.getWalmart(this.state.itemToSearch)
      .then(res => {
        console.log(res.data);
        this.setState({
          itemImages: res.data.items,
          itemToSearch: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // If user isn't logged in, don't let them see this page
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              <SideNav
                activePage={this.state.activePage}
                handleInputChange={this.handleInputChange}
                bookQuery={this.state.bookQuery}
              />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <SideNav
                activePage={this.state.activePage}
                handleInputChange={this.handleInputChange}
                bookQuery={this.state.bookQuery}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="mdc-form-field">
            <div className="mdc-checkbox">
              <input
                type="checkbox"
                id="my-checkbox"
                className="mdc-checkbox__native-control"
              />
              <div className="mdc-checkbox__background">...</div>
            </div>
            <label for="my-checkbox">This is my checkbox</label>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
