import React from 'react';
import { connect } from 'react-redux';

import { buyCrop, buyAnimal, hireManager } from '../../actions/user';
import enoughFeed from './helperFunctions';
import { sellAnimal, incrementCrop, decrementCrop } from '../../actions/user';

import ProgressBar from './ProgressBar';
import CardImg from './CardImg';

import '../../styles/card-container.css';

export class CardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      ticking: false,
      touched: false
    }
  }
  componentDidMount(){
    if(!this.state.touched && this.currentCard.manager){
      this.progressTickIntervalSet();
      this.setState({touched: true});
    }   
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
  

  progressTickIntervalSet = () => {
    this.setState({ ticking: true }) // disabled button while progress bar filling     
    this.intCall = setInterval(this.progressTick, (this.currentCard.count + 7 + this.currentCard.count * 4));
    // console.log('intCall::::::',intCall);      
  }
  
  //progressTick increments percentage of progress bar to fill
  //when it fills then incrementCrop/sellAnimal is called
  progressTick = () => {
    if (this.state.percentage >= 100) {
      clearInterval(this.intCall);
      this.setState({ percentage: -1, ticking: false });

      //call again if manager, setting perpetual calls. 
      if(this.currentCard.manager){
        this.progressTickIntervalSet();
      }

      if (this.screen === 'crops') {
        this.props.dispatch(incrementCrop(this.props.type, this.currentCard.count));
      } else if (this.screen === 'animals') {
        //make sure there are enough crops to feed animal before dispatching actions
        if(enoughFeed(this.props.cropTotals[this.feed1], this.props.cropTotals[this.feed2], this.currentCard.count)){
          this.props.dispatch(sellAnimal(this.currentCard.count));
          this.props.dispatch(decrementCrop(this.currentCard.count, this.feed1, this.feed2 ));
        } else {
          console.log('not enough crops');            
        }
      }
    }
    this.setState({ percentage: this.state.percentage + 1 });
  }
  
  //increment count by 1
  incrementFieldCount = (field) => {
    if (this.currentCard.count < 9 && this.props.userCash >= this.currentCard.price ) {
      if (this.screen === 'crops') {
        this.props.dispatch(buyCrop(field));
      } else if (this.screen === 'animals') {
        this.props.dispatch(buyAnimal(field));
      }
    }
  }

  hireManager = (field, screen) => {
    if(!this.currentCard.manager && this.props.userCash >= this.currentCard.price*10){
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
              this.screen === 'animals' ? enoughFeed(this.props.cropTotals[this.feed1], this.props.cropTotals[this.feed2], this.currentCard.count) : 
              this.screen === 'crops' ? true : false
            }
          />

          <button 
            onClick={() => this.incrementFieldCount(this.props.field)} 
            disabled={this.props.userCash < this.currentCard.price}
          >
            {/* nested ternary to check card's 'this.screen' prop to render proper button text */}
            {this.screen === 'crops' && this.props.userCash >= this.currentCard.price ?
              `PLANT ${this.props.type.toUpperCase()}`  : this.screen === 'animals' && this.props.userCash >= this.currentCard.price ?
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
  cropTotals: state.user.currentUser.cropTotals,
  userCash: state.user.currentUser.cash
});

export default connect(mapStateToProps)(CardContainer);