#include <iostream>

int sum(int a, int b) {
  return a + b;
}

int main() {
  try {
    if (sum(3, 4) != 7) {
      throw "Test case 1 failed!"; 
    }

    if (sum(0, 0) != 0) {
      throw "Test case 2 failed!"; 
    }

    if (sum(10, 20) != 30) {
      throw "Test case 3 failed!"; 
    }

    if (sum(100, 200) != 300) {
      throw "Test case 4 failed!"; 
    }

    if (sum(5, 5) != 10) {
      throw "Test case 5 failed!"; // 5 + 5 = 10
    }

    if (sum(12, 0) != 12) {
      throw "Test case 6 failed!"; 
    }

    if (sum(1000, 2000) != 3000) {
      throw "Test case 7 failed!"; 
    }

    if (sum(99, 1) != 100) {
      throw "Test case 8 failed!"; 
    }

    if (sum(7, 8) != 15) {
      throw "Test case 9 failed!"; 
    }

    if (sum(50, 50) != 100) {
      throw "Test case 10 failed!"; 
    }

    std::cout << "All test cases passed!" << std::endl;

  } catch (const char* error) {
    std::cerr << "Error: " << error << std::endl;
  }

  return 0;
}
