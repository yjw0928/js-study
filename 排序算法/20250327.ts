const arr = [9, 7, 6, 4, 5, 1, 2, 3, 8, 1];

// 冒泡排序
function bubbleSort(arr: number[]) {
  const sortArr = arr.slice(0);
  for (let i = 0; i < sortArr.length; i++) {
    for (let j = 0; j < sortArr.length - i; j++) {
      if (sortArr[j] > sortArr[j + 1]) {
        const temp = sortArr[j];
        sortArr[j] = sortArr[j + 1];
        sortArr[j + 1] = temp;
      }
    }
  }
  return sortArr;
}

// 选择排序
function selectSort(arr: number[]): number[] {
  if (!arr || arr.length === 0) return [];
  const sortArr = arr.slice(0);
  for (let i = 0; i < sortArr.length; i++) {
    let maxIndex = 0;
    for (let j = 0; j < sortArr.length - i; j++) {
      if (sortArr[j] > sortArr[maxIndex]) {
        maxIndex = j;
      }
    }
    [sortArr[sortArr.length - 1 - i], sortArr[maxIndex]] = [
      sortArr[maxIndex],
      sortArr[sortArr.length - 1 - i],
    ];
  }
  return sortArr;
}

// 插入排序
function insertSort(arr: number[]): number[] {
  if (!arr || arr.length === 0) return [];
  const sortArr = arr.slice(0);
  for (let i = 1; i < sortArr.length; i++) {
    const cur = sortArr[i];
    let j = i - 1;
    while (j >= 0 && sortArr[j] > cur) {
      sortArr[j + 1] = sortArr[j];
      j--;
    }
    sortArr[j + 1] = cur;
  }
  return sortArr;
}

// 快速排序
function quickSort(arr: number[]): number[] {
  if (!arr || arr.length === 0) return [];
  let left: number[] = [],
    right: number[] = [];
  const pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 归并排序
function merge(left: number[], right: number[]) {
  const result: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

function mergeSort(arr: number[]): number[] {
  if (!arr || arr.length === 0) return [];
  if (arr.length === 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const res = merge(mergeSort(left), mergeSort(right));
  return res;
}

// 计数排序
function countSort(arr: number[]): number[] {
  if (!arr || arr.length === 0) return [];
  const max = Math.max(...arr);
  const countArr = new Array(max + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    countArr[num]++;
  }
  const result: number[] = [];
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      result.push(i);
      countArr[i]--;
    }
  }
  return result;
}

// console.log(bubbleSort(arr));
// console.log(selectSort(arr));
// console.log(quickSort(arr));
// console.log(mergeSort(arr));
// console.log(countSort(arr));
console.log(insertSort(arr));
