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
import { DataTable, Column } from "primereact/datatable";
import "./Main.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";

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
    categoryRange: "",
    activePageHeader: "Dashboard",
    activePage: "Search",
    arrayForPieChart: [],
    arrayForBudgetTable: [],
    arrayForSumByIncome: [],
    budgetTotal: 0,
    arrayForTrueIncome: [],
    arrayForFalseIncome: [],
    monthLabels: []
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
      .then(res => {
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.createMonthLabels();
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  getBudgetTable = () => {
    API.getMonth().then(res => {
      // console.log("BUDGET DATA" + JSON.stringify(res.data));

      this.setState({ arrayForBudgetTable: res.data });
      console.log(
        "ARRAY FOR BUDGET DATA: " +
          JSON.stringify(this.state.arrayForBudgetTable)
      );
    });
  };

  getBudgetSum = () => {
    API.getSumByIncome().then(res => {
      console.log("BUDGET DATA" + JSON.stringify(res.data));

      this.setState({ arrayForSumByIncome: res.data });
      console.log(
        "ARRAY FOR BUDGET SUM: " +
          JSON.stringify(this.state.arrayForSumByIncome)
      );

      const budgetSumList = res.data.map(function(item) {
        return item.budgetTotal;
      });

      let income = budgetSumList[0];
      let expense = budgetSumList[1];
      let budgetTotal = income - expense;

      this.setState({ budgetTotal: budgetTotal });
    });
  };

  getCategorySum = () => {
    API.getSumByCategory().then(res => {
      // console.log("SUM BY CATEGORY DATA" + JSON.stringify(res.data));

      const categorySumList = res.data.map(function(category) {
        return category.categoryTotal;
      });

      console.log(
        "CATEGORY SUM LIST ARRAY: " + JSON.stringify(categorySumList)
      );

      this.setState({ arrayForPieChart: categorySumList });
      // console.log("ARRAY FOR PIE CHART: " + this.state.arrayForPieChart)
    });
  };

  getSumByMonthTrue = () => {
    API.getSumByMonthTrue().then(res => {
      const arraySumTrue = res.data.map(function(item) {
        return item.budgetTotal;
      });
      this.setState({ arrayForTrueIncome: arraySumTrue });
      console.log(arraySumTrue + this.state.arrayForTrueIncome);
    });
  };

  getSumByMonthFalse = () => {
    API.getSumByMonthFalse().then(res => {
      const arraySumFalse = res.data.map(function(item) {
        return item.budgetTotal;
      });
      this.setState({ arrayForFalseIncome: arraySumFalse });
      console.log(this.state.arrayForFalseIncome + arraySumFalse);
    });
  };

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

  rowClassName = rowData => {
    let incomeRow = rowData.convertedIncome;

    return { highlightRed: incomeRow === "false"}
  };

  amountTemplate(rowData, column) {
    let amount = rowData.amount;
    let fontWeight = amount >= 2500 ? 'bold' : 'normal';
    
    return <span style={{fontWeight: fontWeight}}>{rowData.amount}</span>;
}

  createMonthLabels = () => {
    const barChartLabels = [];

    const thisMonth = moment().format("MMMM");
    barChartLabels.push(thisMonth);

    for (let i = 1; i < 6; i++) {
      let newMonth = moment()
        .add(i, "M")
        .format("MMMM");
      barChartLabels.push(newMonth);
    }
    console.log("MONTH LABELS: " + barChartLabels);
    this.setState({ monthLabels: barChartLabels });
  };

  render() {
    const pieData = {
      labels: ["Health & Fitness", "Home", "Income", "Other", "Savings", "Shopping", "Travel", "Utilities"],
      datasets: [
        {
          data: this.state.arrayForPieChart,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003366", "#F0F8FF", "#7FFFD4", "#3399FF", "#8A2BE2"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003366", "#F0F8FF", "#7FFFD4", "#3399FF", "#8A2BE2"]
        }
      ]
    };

    const barData = {
      labels: this.state.monthLabels,
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgb(4, 244, 12, 0.8)",
          data: this.state.arrayForTrueIncome
        },
        {
          label: "Expense",
          backgroundColor: "rgb(255, 0, 0, 0.8)",
          data: this.state.arrayForFalseIncome
        }
      ]
    };

    const radarData = {
      labels: ["Health & Fitness", "Home", "Income", "Other", "Savings", "Shopping", "Travel", "Utilities"],
      datasets: [
        {
          label: "Amount",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.arrayForPieChart
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
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="p" className="dashtext" color="inherit" noWrap>
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
              
              />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="row">
            <div className="col">
              <Grid container justify="center">
                <Card className="total-sum">
                  <CardContent style={{ marginBottom: -10 }}>
                    <h3>DISPOSABLE INCOME: ${this.state.budgetTotal}</h3>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </div>
            {/* BUDGET TABLE */}
            <Card style={{ marginBottom: 20 }} className={classes.card}>
              <CardContent>
                <Typography
                  className="dashtext"
                  variant="p"
                  color="textPrimary"
                  gutterBottom
                >
                  Budget Table
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Click on Date or Amount to sort
                </Typography>
                <DataTable
                  className="budget-table"
                  tableStyle={{ width: "100%" }}
                  value={this.state.arrayForBudgetTable}
                  rowClassName={this.rowClassName}
                >
                  <Column
                    className="table-data"
                    field="date"
                    sortable="true"
                    header="Date"
                  />
                  <Column
                    className="table-data"
                    field="description"
                    header="Description"
                  />
                  <Column
                    className="table-data"
                    field="amount"
                    sortable="true"
                    header="Amount"
                    body={this.amountTemplate}
                  />
                  <Column
                    className="table-data"
                    field="category"
                    header="Category"
                  />
                  <Column
                    className="table-data"
                    field="convertedIncome"
                    header="Income"
                  />
                </DataTable>
              </CardContent>
            </Card>
          <div className="row">
            <div className="col-12">
              <Grid container justify="center">
                <Card
                  style={{
                    width: "80%",
                    marginBottom: 20,
                    justifyContent: "center"
                  }}
                >
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">Total by Category</h3>
                      <Chart type="pie" data={pieData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div className="col-12">
              <Grid container justify="center">
                <Card style={{ width: "80%", marginBottom: 20 }}>
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">
                        Income vs Expense By Month
                      </h3>
                      <Chart type="bar" data={barData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div className="col-12">
              <Grid container justify="center">
                <Card style={{ width: "80%", marginBottom: -20 }}>
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">Radar By Category</h3>
                      <Chart type="radar" data={radarData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </div>
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-12" />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
