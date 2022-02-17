import React from 'react';

import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};



export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      sortMethod: 'selection',
      animationSpeed: 1,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    while (array.length < 450) {
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
      arrayBar[i].style.backgroundColor = 'FF0000';
    }, i * this.state.animationSpeed);
  }
  setGreen(i) {
    let arrayBar = document.getElementsByClassName('array-bar');
    setTimeout(() => {
      arrayBar[i].style.backgroundColor = '#34D399';
    }, i * this.state.animationSpeed);
  }
  swap(arr, i, j) {
    let arrayBar = document.getElementsByClassName('array-bar');
    //let ih = arrayBar[i].clientHeight + 'px';
    //let jh = arrayBar[j].clientHeight + 'px';
    let ih = arr[i]+'px';
    let jh = arr[j]+'px';
    //console.log(i, j,ih, jh)
    setTimeout(() => {
      arrayBar[i].style.height = jh;
      arrayBar[j].style.height = ih;
    }, i * this.state.animationSpeed);
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
    //console.log(arrayBar);
    this.setClientHeight();

    for(let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      //console.log(arr);
      //this.print();
      let min = i;
      this.setRed(min);
      for(let j = i+1; j < n; j++){
        this.setRed(j);
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

  mergeSort(array) {
    console.log('merge');
  }

  quickSort() {
    console.log('quick');
  }

  bubbleSort() {
    console.log('bubble');
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
              placeholder="Select an sorting algorithm"
              options={['selection', 'merge', 'bubble', 'heap', 'insertion','quick']}
              onSelect={(value) => this.state.sortMethod = value.value}
            />
          </div>

          <div className="inline-block align-top">
            <button
              className="top=0 inline-block bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400"
              onClick={() => this.sort()}
            >Sort</button>
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
