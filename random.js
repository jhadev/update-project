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

//goes in Main.js