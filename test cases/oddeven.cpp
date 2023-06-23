#include <iostream>

bool isEven(int n) {
  return n % 2 == 0;
}

bool isOdd(int n) {
  return n % 2 != 0;
}

int main() {
  try {
    if (!isEven(4)) {
      throw "Test case 1 failed!"; 
    }

    if (isEven(7)) {
      throw "Test case 2 failed!";
    }

    if (!isOdd(9)) {
      throw "Test case 3 failed!"; 
    }

    if (isOdd(12)) {
      throw "Test case 4 failed!"; 
    }

    if (!isEven(0)) {
      throw "Test case 5 failed!"; 
    }

    if (isEven(-5)) {
      throw "Test case 6 failed!"; 
    }

    if (!isOdd(-8)) {
      throw "Test case 7 failed!"; 
    }

    if (isOdd(15)) {
      throw "Test case 8 failed!";
    }

    if (!isEven(100)) {
      throw "Test case 9 failed!"; 
    }

    if (isEven(101)) {
      throw "Test case 10 failed!"; 
    }

    
    if (!isEven(2000)) {
      throw "Test case 11 failed!"; 
    }

    if (isEven(-100)) {
      throw "Test case 12 failed!"; 
    }

    if (!isOdd(-89)) {
      throw "Test case 13 failed!"; 
    }

    if (isOdd(50)) {
      throw "Test case 14 failed!";
    }

    if (!isEven(-256)) {
      throw "Test case 15 failed!";
    }

    if (isEven(399)) {
      throw "Test case 16 failed!"; 
    }

    std::cout << "All test cases passed!" << std::endl;

  } catch (const char* error) {
    std::cerr << "Error: " << error << std::endl;
  }

  return 0;
}
