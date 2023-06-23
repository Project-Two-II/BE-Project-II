#include <iostream>
#include <cmath>

int countDigits(int number) {
  int count = 0;
  while (number != 0) {
    number /= 10;
    count++;
  }
  return count;
}

bool isArmstrong(int number) {
  int originalNumber = number;
  int numDigits = countDigits(number);
  int sum = 0;

  while (number != 0) {
    int digit = number % 10;
    sum += std::pow(digit, numDigits);
    number /= 10;
  }

  return sum == originalNumber;
}

int main() {
  try {
    if (!isArmstrong(153)) {
      throw "Armstrong Test case 1 failed!";
    }

    if (!isArmstrong(370)) {
      throw "Armstrong Test case 2 failed!";
    }

    if (isArmstrong(123)) {
      throw "Armstrong Test case 3 failed!";
    }

    if (!isArmstrong(407)) {
      throw "Armstrong Test case 4 failed!";
    }

    if (!isArmstrong(1634)) {
      throw "Armstrong Test case 5 failed!";
    }

    if (!isArmstrong(9474)) {
      throw "Armstrong Test case 6 failed!";
    }

    if (isArmstrong(12345)) {
      throw "Armstrong Test case 7 failed!";
    }

    std::cout << "All test cases passed!" << std::endl;
  } catch (const char* error) {
    std::cerr << "Error: " << error << std::endl;
  }

  return 0;
}
