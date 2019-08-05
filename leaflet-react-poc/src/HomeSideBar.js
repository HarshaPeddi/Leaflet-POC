
import React, { Component } from 'react';
class HomeSideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isGoing: true,
          numberOfGuests: 2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        console.log(event)
    }

    render(){
        return(
            <div >
            
                <div className="home-background">   
                    <div className="home-top">
                        <div className="menu-text selected-view">
                        <label>
                            Is going:
                            <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.state.isGoing}
                                onChange={this.handleInputChange} />
                        </label>

                        </div>   
                    </div>
                    <div className="home-bottom">
                        <div className="bottom-page"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeSideBar;