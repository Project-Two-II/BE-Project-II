#include <iostream>

int fibonacci(int n) {
  if (n < 0) {
    throw "Fibonacci not defined for negative numbers!";
  }
  if (n == 0) {
    return 0;
  }
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
  try {
    if (fibonacci(5) != 5) {
      throw "Test case 1 failed!";
    }

    if (fibonacci(0) != 0) {
      throw "Test case 2 failed!";
    }

    if (fibonacci(8) != 21) {
      throw "Test case 3 failed!";
    }

    if (fibonacci(10) != 55) {
      throw "Test case 4 failed!";
    }

    if (fibonacci(3) != 2) {
      throw "Test case 5 failed!";
    }

    if (fibonacci(1) != 1) {
      throw "Test case 6 failed!";
    }

    if (fibonacci(2) != 1) {
      throw "Test case 7 failed!";
    }

    if (fibonacci(4) != 3) {
      throw "Test case 8 failed!";
    }

    if (fibonacci(6) != 8) {
      throw "Test case 9 failed!";
    }

    if (fibonacci(7) != 13) {
      throw "Test case 10 failed!";
    }

    std::cout << "All test cases passed!" << std::endl;
  } catch (const char* error) {
    std::cerr << "Error: " << error << std::endl;
  }

  return 0;
}
