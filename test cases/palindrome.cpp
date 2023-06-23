#include <iostream>

bool isPalindrome(int n) {
  int originalNum = n;
  int reverseNum = 0;

  while (n > 0) {
    int remainder = n % 10;
    reverseNum = reverseNum * 10 + remainder;
    n /= 10;
  }

  return originalNum == reverseNum;
}

int main() {
  try {
    if (!isPalindrome(121)) {
      throw "Test case 1 failed!"; 
    }

    if (!isPalindrome(12321)) {
      throw "Test case 2 failed!";
    }

    if (isPalindrome(12345)) {
      throw "Test case 3 failed!"; 
    }

    if (!isPalindrome(1001)) {
      throw "Test case 4 failed!"; 
    }

    if (!isPalindrome(0)) {
      throw "Test case 5 failed!"; 
    }

    if (!isPalindrome(11)) {
      throw "Test case 6 failed!"; 
    }

    if (isPalindrome(123456)) {
      throw "Test case 7 failed!"; 
    }

    if (!isPalindrome(987656789)) {
      throw "Test case 8 failed!"; 
    }

    if (!isPalindrome(123454321)) {
      throw "Test case 9 failed!"; 
    }

    if (!isPalindrome(12344321)) {
      throw "Test case 10 failed!"; 
    }

    if (!isPalindrome(987776789)) {
      throw "Test case 11 failed!";
    }

    if (!isPalindrome(87655678)) {
      throw "Test case 12 failed!"; 
    }

    if (isPalindrome(123454320)) {
      throw "Test case 13 failed!"; 
    }

    if (isPalindrome(1233321)) {
      throw "Test case 14 failed!"; 
    }

    std::cout << "All test cases passed!" << std::endl;

  } catch (const char* error) {
    std::cerr << "Error: " << error << std::endl;
  }

  return 0;
}
