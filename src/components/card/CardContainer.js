import React from 'react';
import { connect } from 'react-redux';

import { buyCrop, buyAnimal, hireManager, sellAnimalProduct, incrementCrop} from '../../actions/user';
import enoughFeed from '../../actions/helpers/enoughFeed';

import ProgressBar from './ProgressBar';
import CardImg from './CardImg';

import '../../styles/card-container.css';

export class CardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      ticking: false,
      // manager: false
    }
  }
  componentDidMount() { // upon page load if card has manager initiate progress
    if (this.currentCard.manager) {
      //dispatch action to auto increment
    }
  }
  componentWillUnmount() {

  }
  intCall;
  feed1 = this.props.feed.split(' ')[0];
  feed2 = this.props.feed.split(' ')[1];

  //return currentCard based on whether its animal or crop card
   currentCard = this.props.screen === 'crops' ?
    this.props.crops.find(crop => crop.type === this.props.field) : this.props.screen === 'animals' ?
      this.props.animals.find(animal => animal.type === this.props.field) : null

  callDispatches = () => {
    if(this.props.inventory){
      console.log('call dispatches reached');      
      this.props.screen === 'crops' ? this.props.dispatch(incrementCrop(this.currentCard)) 
        : this.props.dispatch(sellAnimalProduct(this.currentCard));
    }
  }

  progressTickIntervalSet = () => {
    if(!this.currentCard.manager){
      this.setState({ ticking: true }) // disabled button while progress bar filling    
      this.intCall = setInterval(this.progressTick, (20 + ((this.currentCard.count-1)*10)));//1 count -> 1 second --- 9 count -> 5 seconds
    } 
  }

  //progressTick increments percentage of progress bar to fill
  //when it fills to 99 then incrementCrop/sellAnimalProduct is called
  progressTick = () => {
    if (this.state.percentage >= 99) {
      clearInterval(this.intCall);
      this.setState({ percentage: -3, ticking: false });
      this.callDispatches();  
    }
    // while bar is not full check for enoughFeed to reset progress bar if food runs out mid progress
    else if (this.props.screen === 'animals') {
      if (!enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count)) {
        clearInterval(this.intCall);
        this.setState({ percentage: -3, ticking: false });
      }
    } 
    this.setState({ percentage: this.state.percentage + 3 });
  }

  //increment count by 1
  incrementFieldCount = (field) => {
    if (this.currentCard.count < 9 && this.props.userCash >= this.currentCard.price) {
      if (this.props.screen === 'crops') {
        this.props.dispatch(buyCrop(field));        
      } else if (this.props.screen === 'animals') {
        this.props.dispatch(buyAnimal(field));       
      }      
    }
  }

  // setManagerInterval = (callback, factor, times) => {

  //   let internalCallback = ((tick,counter) => {
  //     return () => {
  //       this.setTimeout(internalCallback, 20 + ((this.currentCard.count-1)*10))
  //     }
  //   })(times,0);

  //   this.setTimeout(internalCallback, factor);


  // }

  // setDeceleratingTimeout(callback, factor, times)
  // {
  //     var internalCallback = (function(tick, counter){
  //         return function(){
  //             if (--tick > 0) {
  //                 window.settimeout(internalCallback, ++counter * factor);
  //                 callback();
  //             }
  //         }
  //     })(times, 0);
  
  //     window.setTimeout(internalCallback, factor);
  // };









  hireManager = (field, screen) => {
    if (!this.currentCard.manager && this.props.userCash >= this.currentCard.price) {
      this.props.dispatch(hireManager(field, screen));
      //dispatch action here to implement auto incrementation
      this.managerInterval = setInterval(this.callDispatches, 3000 );
      // (20 + ((this.currentCard.count-1)*10))
    }
  }
  //if managerDisplay make buttons show up, else they are display-none
  displayManager = () => {
    return this.props.managerDisplay ? '': 'display-none'; 
  }

  render() {

    // const count = this.props.crops[field].count;
    let cardImages = [];
    for (let i = 1; i <= this.currentCard.count; i++) {
      cardImages.push(
        <CardImg
          source={`${this.props.type}`}
          screen={`${this.props.screen}`}
          key={`crop-index-${i}`}
        />
      );
    }

    return (

      <div className='card-container'>

        <div className={'image-box ' + (this.props.managerDisplay ? 'gray-scale' : '')}>
          {cardImages}
        </div>        

        <div className='card-buttons-container'>
          <button
            onClick={() => this.incrementFieldCount(this.props.field)}
            disabled={this.props.userCash < this.currentCard.price}
            className={this.displayManager()}
          >
            {/* nested ternary to check card's 'this.props.screen' prop to render proper button text */}
            {this.props.screen === 'crops' && this.props.userCash >= this.currentCard.price ?
              `PLANT ${this.props.type.toUpperCase()}` : this.props.screen === 'animals' && this.props.userCash >= this.currentCard.price ?
                `BUY ${this.props.type.toUpperCase()}` : this.props.screen === 'menu' ?
                  'menu ' : 'insufficient funds'}
          </button>

          <button
            onClick={() => this.hireManager(this.props.field, this.props.screen)}
            className={this.displayManager()}
          >
            hire manager
          </button>
        </div>

        <div className={this.props.managerDisplay ? 'display-none' : ''}>
          <ProgressBar
            percentage={this.state.percentage}
            screen={this.props.screen}
            type={this.props.type}
            action={this.progressTickIntervalSet}
            count={this.currentCard.count}
            ticking={this.state.ticking}
            enoughFeed={
              // if current card is an animals card call enoughFeed helperFunction,
              // else calling enoughFeed on crops is null so return true to pass into 
              // ProgressBar component to set className ternary properly
              this.props.screen === 'animals' ? enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count) :
                this.props.screen === 'crops' ? true : false
            }
            manager={this.currentCard.manager}
          />
        </div>

      </div>
    )
  }

}

const mapStateToProps = state => ({
  crops: state.user.currentUser.crops,
  animals: state.user.currentUser.animals,
  inventory: state.user.currentUser.inventory,
  userCash: state.user.currentUser.cash
});

export default connect(mapStateToProps)(CardContainer);