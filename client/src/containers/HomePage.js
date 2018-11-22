import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import HomeImages from '../HomeImages.json';
import HomeCards from '../components/HomeCards';


class HomePage extends Component {
  state = {
    HomeImages
  }
  render() {
    return (
      <div>
 
          <Jumbotron />
   
        <div className="row">
          <div className="col">
            <div className="card-group">
              {this.state.HomeImages.map(image => (
      
                <HomeCards
                  key={image.name}
                  image={image.image}
                  name={image.name}
                />

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