import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SideNav from "../components/SideNav";
import API from "../utils/API";
import { Chart } from "primereact/chart";
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
    categoryRange: "",
    activePageHeader: "Dashboard",
    activePage: "Search",
    arrayForPieChart: []
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
      .then( res => {
        this.getCategorySum();
      }
      )
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  getCategorySum = () => {
    API
      .getSumByCategory()
      .then(res =>{
        console.log(
          "SUM BY CATEGORY DATA" +
          JSON.stringify(res.data)
        );

        const categorySumList = res.data.map(function (category) {
          return category.categoryTotal;
        })

        console.log("CATEGORY SUM LIST ARRAY: " + 
        JSON.stringify(categorySumList))

        this.setState({arrayForPieChart: categorySumList})
        console.log("ARRAY FOR PIE CHART: " +  this.state.arrayForPieChart);
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this");
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
        .then(res => { 
          console.log(res)
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
    const pieData = {
      labels: ["Home", "Utilities"],
      datasets: [
        {
          data: this.state.arrayForPieChart,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    const radarData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
  };

    // If user isn't logged in, don't let them see this page
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.state.activePageHeader}
            </Typography>
          </Toolbar>
        </AppBar>
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
          <div className="row">
            <div className="col-md-6">
              <div className="content-section implementation">
                <Chart type="pie" data={pieData} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="content-section implementation">
                <Chart type="radar" data={radarData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
