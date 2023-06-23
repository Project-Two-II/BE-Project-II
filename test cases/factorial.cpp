 //test for factorial 
 #include <iostream>

int get_factorial(int n) {
  if (n < 0) {
    throw "Factorial not defined for negative numbers!";
  }
  if (n == 0) {
    return 1;
  }
  return n * get_factorial(n - 1);
}

int main() {
  try {
    if (get_factorial(5) != 120) {
      throw "Test case 1 failed!";
    }

    if (get_factorial(0) != 1) {
      throw "Test case 2 failed!";
    }

    if (get_factorial(2) != 2) {
      throw "Test case 3 failed!";
    }

    if (get_factorial(3) != 6) {
      throw "Test case 4 failed!";
    }

    if (get_factorial(1) != 1) {
      throw "Test case 5 failed!";
    }

    // Additional test cases
    if (get_factorial(4) != 24) {
      throw "Test case 6 failed!";
    }

    if (get_factorial(6) != 720) {
      throw "Test case 7 failed!";
    }

    if (get_factorial(7) != 5040) {
      throw "Test case 8 failed!";
    }

    if (get_factorial(8) != 40320) {
      throw "Test case 9 failed!";
    }

    if (get_factorial(9) != 362880) {
      throw "Test case 10 failed!";
    }

    if (get_factorial(10) != 3628800) {
      throw "Test case 11 failed!";
    }

    if (get_factorial(11) != 39916800) {
      throw "Test case 12 failed!";
    }

    if (get_factorial(12) != 479001600) {
      throw "Test case 13 failed!";
    }

    if (get_factorial(13) != 6227020800) {
      throw "Test case 14 failed!";
    }

    if (get_factorial(14) != 87178291200) {
      throw "Test case 15 failed!";
    }

    if (get_factorial(15) != 1307674368000) {
      throw "Test case 16 failed!";
    }

    if (get_factorial(16) != 20922789888000) {
      throw "Test case 17 failed!";
    }

    if (get_factorial(17) != 355687428096000) {
      throw "Test case 18 failed!";
    }

    if (get_factorial(18) != 6402373705728000) {
      throw "Test case 19 failed!";
    }

    if (get_factorial(19) != 121645100408832000) {
      throw "Test case 20 failed!";
    }

    std::cout << "All test cases passed!" << std::endl;

  } catch (const char* error) {
    std::cerr << "Error: " << error << std::endl;
  }

  return 0;
}
