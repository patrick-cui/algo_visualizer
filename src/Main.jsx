import React from 'react';

import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};



export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChangeSpeed = this.onInputChangeSpeed.bind(this);
    this.state = {
      array: [],
      sortMethod: 'selection',
      animationSpeed: 0,
    };
  }
  onInputChangeSpeed(e) {
    this.setState({ animationSpeed: e.target.value});
    //console.log(this.state.animationSpeed);
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    while (array.length < 360) {
      let randomNumber=randomIntFromInterval(1, 700);
      if (!array.includes(randomNumber)) {
        array.push(randomNumber);
    }
    this.setState({ array });
    console.log(this.state.sortMethod)
    }
  }

  sort() {
    const { array } = this.state;
    const { sortMethod } = this.state;

    if (sortMethod === 'merge') {
      this.mergeSort(array);
    } else if (sortMethod === 'quick') {
      this.quickSort(array);
    } else if (sortMethod === 'bubble') {
      this.bubbleSort(array);
    } else if (sortMethod === 'heap') {
      this.heapSort(array);
    } else if (sortMethod === 'insertion') {
      this.insertionSort(array);
    } else if (sortMethod === 'selection') {
      this.selectionSort(array);
    }
  }
  
  setRed(i) {
    let arrayBar = document.getElementsByClassName('array-bar');
    setTimeout(() => {
      arrayBar[i].style.backgroundColor = '#FF0000';
    }, this.state.animationSpeed*0.01);
  }
  setGreen(i) {
    let arrayBar = document.getElementsByClassName('array-bar');
    setTimeout(() => {
      arrayBar[i].style.backgroundColor = '#34D399';
    }, this.state.animationSpeed*0.01);
  }
  swap(arr, i, j) {
    let arrayBar = document.getElementsByClassName('array-bar');
    //let ih = arrayBar[i].clientHeight + 'px';
    //let jh = arrayBar[j].clientHeight + 'px';
    let ih = arr[i]+'px';
    let jh = arr[j]+'px';
    console.log(i, j,ih, jh)
    setTimeout(() => {
      arrayBar[i].style.height = jh;
      arrayBar[j].style.height = ih;
    }, this.state.animationSpeed);
  } 
  setHeight(arr) {
    let arrayBar = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBar.length; i++) {
      arrayBar[i].style.height = arr[i]+'px';
    }
  }
  setClientHeight() {
    let arrayBar = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBar.length; i++) {
      arrayBar[i].style.height = window.getComputedStyle(arrayBar[i]).getPropertyValue("height") + 'px';
    }
  }
  print() {
    let arrayBar = document.getElementsByClassName('array-bar');
    let heights = '';
    for (let i = 0; i < arrayBar.length; i++) {
      heights += arrayBar[i].offsetHeight + 'px ';
    }
    console.log(heights);
    console.log(arrayBar)
  }
  selectionSort() {
    console.log('selection');
    //console.log(this.state.array);
    let arr = this.state.array;
    let n = arr.length;
    let arrayBar = document.getElementsByClassName('array-bar');
    let speed = this.state.animationSpeed * 5;
    //console.log(arrayBar);
    this.setClientHeight();

    for(let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      //console.log(arr);
      //this.print();
      let min = i;
      //this.setRed(min);
      for(let j = i+1; j < n; j++){
        //this.setRed(j);
        if(arr[j] < arr[min]) {
          min=j; 
          this.setGreen(i);
        } else {
          this.setGreen(j);
        }
      }
      if (min !== i) {
        // Swapping the elements
        this.swap(arr, i, min);
        let tmp = arr[i]; 
        arr[i] = arr[min];
        arr[min] = tmp; 
        //console.log(i, min, arr[i], arr[min]); 
      }
      this.setGreen(i);
      this.setGreen(min);
    } 
  }
  bubbleSort() {
    console.log('bubble');
    let arr = this.state.array;
    let n = arr.length;
    this.setClientHeight();
    var i, j; var swapped;
    for (i = 0; i < n-1; i++) {
      this.setRed(i);
      swapped = false;
      for (j = 0; j < n-i-1; j++) {
        this.setRed(j);
        if (arr[j] > arr[j+1]) {
          swapped = true;
          var x = j; var y = j+1;
          var temp = arr[x];
          arr[x] = arr[y];
          arr[y] = temp;
          console.log(x, y, arr[x], arr[y]);
          setTimeout(() => {
            this.swap(arr, j, j+1);
          }, 10);
        }
        this.setGreen(j);
      }
      if (swapped == false)
        break;
      this.setGreen(i);
    }
    this.onInputChangeSpeed(0);
    this.setHeight(arr);
  }
  
  mergeSort(array) {
    console.log('merge');
  }

  quickSort() {
    console.log('quick');
  }
  
  heapSort() {
    console.log('heap');
  }
  insertionSort() {
    console.log('insertion');
  }

  render() {
    const { array } = this.state;
    const { sortMethod } = this.state;
    var {animationSpeed} = this.state;

    return (
      <div>
        <div className="absolute" >

          <div className="inline-block align-top">
            <button
              className="top=0 inline-block bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400"
              onClick={() => this.resetArray()}
            >Generate New Array</button>
          </div>

          <div className="inline-block align-top">
            <Dropdown
              className="w-100"
              placeholder="Select an sorting algorithm"
              options={['selection', 'insertion', 'bubble', 'heap', 'merge', 'quick']}
              onSelect={(value) => this.state.sortMethod = value.value}
            />
          </div>

          <div className="inline-block align-top">
            <button
              className="top=0 inline-block bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400"
              onClick={() => this.sort()}
            >Sort</button>
          </div>

          <div class="inline-block align-top border border-gray-400 h-11 top=0">
            <label class="form-label">Speed</label>
            <input
              type="range"
              className="
                form-range
                appearance-none
                w-full
                h-4
                p-0
                bg-gray-200
                focus:outline-none focus:ring-0 focus:shadow-none
              "
              min="0"
              max="3000"
              value = {animationSpeed}
              onChange={this.onInputChangeSpeed}
            />
          </div>
          
        </div>

        <div className="absolute" style={{bottom: 0}}>
          {array.map((value, idx) => (
            <div 
              className="array-bar bg-emerald-400 inline-block"
              key={idx}
              style={{height: `${value}px`, width: '2px', margin: '0 1px'}}
            >
          </div>
          ))}
        </div>
      </div>  
    );
  }
};
