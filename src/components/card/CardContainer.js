import React from 'react';
import { connect } from 'react-redux';

import { buyCrop, buyAnimal, hireManager, sellAnimalProduct, incrementCrop, incrementProductionRate} from '../../actions/user';
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
      initiated: false
    }
  }
  componentDidMount() { // upon page load if card has manager initiate progress
    if (this.currentCard.manager) {
      this.progressTickIntervalSet();
      this.setState({ initiated: true });
    }
  }
  componentWillUnmount() {
    clearInterval(this.intCall);
  }
  intCall;
  field = this.props.field;
  screen = this.props.screen;
  feed1 = this.props.feed.split(' ')[0];
  feed2 = this.props.feed.split(' ')[1];
  //return currentCard based on whether its animal or crop card
 
  currentCard = this.props.screen === 'crops' ?
    this.props.crops.find(crop => crop.type === this.props.field) : this.props.screen === 'animals' ?
      this.props.animals.find(animal => animal.type === this.props.field) : null

  // currentlyEnoughFeed = enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count)

  progressTickIntervalSet = () => {

    if(!this.currentCard.manager){
      this.setState({ ticking: true }) // disabled button while progress bar filling    
      this.intCall = setInterval(this.progressTick, (10 + ((this.currentCard.count-1)*5)));//1 count -> 1 second --- 9 count -> 5 seconds
      // console.log(10 + ((this.currentCard.count-1)*5));      
    } else {
      this.setState({ ticking: true });
      clearInterval(this.intCall);
      this.setState({ percentage: -1});

    }

  }

  //progressTick increments percentage of progress bar to fill
  //when it fills then incrementCrop/sellAnimalProduct is called
  progressTick = () => {
    if (this.state.percentage >= 100) { // when progress bar is full
      clearInterval(this.intCall);
      this.setState({ percentage: -1, ticking: false });

      if (this.screen === 'crops') {
        this.props.dispatch(incrementCrop(this.currentCard));
      } else if (this.screen === 'animals') {
        this.props.dispatch(sellAnimalProduct(this.currentCard));
      }
      //call again if card has manager, setting perpetual calls. 
      if (this.currentCard.manager) {
        this.progressTickIntervalSet();
      }
    }
    // while bar is not full check for enoughFeed to reset progress bar if food runs out mid progress
    else if (this.screen === 'animals') {
      if (!enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count)) {
        clearInterval(this.intCall);
        this.setState({ percentage: -1, ticking: false });
        this.setState({ initiated: true });
        //reset but if card has manager set progress again
        if (this.currentCard.manager) {
          this.progressTickIntervalSet();
        }
      }
    } 
    this.setState({ percentage: this.state.percentage + 1 });

  }

  managerTick = () => {

  }

  //increment count by 1
  incrementFieldCount = (field) => {
    if (this.currentCard.count < 9 && this.props.userCash >= this.currentCard.price) {

      if (this.screen === 'crops') {
        this.props.dispatch(buyCrop(field));
        if(this.currentCard.manager){
          console.log('card has manager');
          // dispatch action to increment Rates in rate reducer  
          this.props.dispatch(incrementProductionRate(this.currentCard))        
        }
      } else if (this.screen === 'animals') {
        this.props.dispatch(buyAnimal(field));
        if(this.currentCard.manager){
          console.log('card has manager'); 
          // dispatch action to increment Rates in rate reducer 
          this.props.dispatch(incrementProductionRate(this.currentCard))        
        }
      }
      
    }
  }

  hireManager = (field, screen) => {
    if (!this.currentCard.manager && this.props.userCash >= this.currentCard.price*5) {
      this.props.dispatch(hireManager(field, screen));
    }
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

      <div className={this.currentCard.manager ? 'card-container manager-display' : 'card-container'}>

        <div className='image-box'>
          {cardImages}
        </div>

        <div className='progress-bar-container'>
          <ProgressBar
            percentage={this.state.percentage}
            screen={this.screen}
            type={this.props.type}
            action={this.progressTickIntervalSet}
            count={this.currentCard.count}
            ticking={this.state.ticking}
            enoughFeed={
              // if current card is an animals card call enoughFeed helperFunction,
              // else calling enoughFeed on crops is null so return true to pass into 
              // ProgressBar component to set className ternary properly
              this.screen === 'animals' ? enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count) :
                this.screen === 'crops' ? true : false
            }
            manager={this.currentCard.manager}

          />

          <button
            onClick={() => this.incrementFieldCount(this.props.field)}
            disabled={this.props.userCash < this.currentCard.price}
          >
            {/* nested ternary to check card's 'this.screen' prop to render proper button text */}
            {this.screen === 'crops' && this.props.userCash >= this.currentCard.price ?
              `PLANT ${this.props.type.toUpperCase()}` : this.screen === 'animals' && this.props.userCash >= this.currentCard.price ?
                `BUY ${this.props.type.toUpperCase()}` : this.screen === 'menu' ?
                  'menu ' : 'insufficient funds'}
          </button>
          <button
            onClick={() => this.hireManager(this.props.field, this.props.screen)}
          >
            hire manager
          </button>

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