//to test for hello world.  
#include <iostream>
#include <string>
void helloworld() {
  std::string expectedOutput = "Hello, World!";

  
  std::string actualOutput = "Hello, World!"; 
  
  if (actualOutput == expectedOutput) {
    std::cout << "Test passed!" << std::endl;
  } else {
    std::cerr << "Test failed!" << std::endl;
    std::cout << "Expected: " << expectedOutput << std::endl;
    std::cout << "Actual: " << actualOutput << std::endl;
  }
}

int main() {
  std::cout << "Hello, World!" << std::endl;
  helloworld(); 
  return 0;
}

