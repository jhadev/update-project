import React, { Component } from 'react';
import Jumbotron from './components/Jumbotron';
import HomeImages from './HomeImages.json';
import HomeCards from './components/HomeCards';
import Popover from 'react-tiny-popover';


class HomePage extends Component {
  state = {
    HomeImages,
    isOpen: false
  }
  render() {
    return (
      <div>
 
          <Jumbotron />
   
        <div className="row">
          <div className="col">
            <div className="card-group">
              {this.state.HomeImages.map(image => (
                <Popover
                  isOpen={this.state.isOpen}
                  position={'top'}
                  content = {(<div>{image.body}</div>)}
                >
                <HomeCards
                  onClick = {() => this.setState({ isOpen: true})}
                  key={image.name}
                  image={image.image}
                  name={image.name}
                />
                </Popover>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
        
        </div>

      </div>
    );
  }
}


export default HomePage;