#!/usr/bin/env python3
"""
Number Guessing Game
A simple console-based game where the user tries to guess a random number.
"""

import random
import time

def display_welcome():
    """Display welcome message and game rules."""
    print("=" * 50)
    print("🎯 WELCOME TO THE NUMBER GUESSING GAME! 🎯")
    print("=" * 50)
    print("\n📋 GAME RULES:")
    print("• I'll think of a number between 1 and 100")
    print("• You have to guess what it is")
    print("• I'll give you hints after each guess")
    print("• Try to guess it in as few attempts as possible!")
    print("=" * 50)

def get_user_guess():
    """Get and validate user input for their guess."""
    while True:
        try:
            guess = input("\n🎲 Enter your guess (1-100): ").strip()
            guess_num = int(guess)
            
            if 1 <= guess_num <= 100:
                return guess_num
            else:
                print("❌ Please enter a number between 1 and 100!")
                
        except ValueError:
            print("❌ That's not a valid number! Please try again.")
        except KeyboardInterrupt:
            print("\n\n👋 Thanks for playing! Goodbye!")
            exit()

def give_hint(secret_number, user_guess):
    """Provide a hint based on the user's guess."""
    if user_guess < secret_number:
        if secret_number - user_guess <= 10:
            print("🔥 You're getting warm! Try a higher number.")
        else:
            print("❄️ Too low! Try a much higher number.")
    else:
        if user_guess - secret_number <= 10:
            print("🔥 You're getting warm! Try a lower number.")
        else:
            print("❄️ Too high! Try a much lower number.")

def play_game():
    """Main game loop."""
    # Generate random number
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print(f"\n🤔 I'm thinking of a number between 1 and 100...")
    time.sleep(1)
    print("🤔 Thinking...")
    time.sleep(1)
    print("🤔 Got it!")
    
    while attempts < max_attempts:
        attempts += 1
        remaining = max_attempts - attempts
        
        print(f"\n📊 Attempt {attempts}/{max_attempts} (Remaining: {remaining})")
        
        # Get user's guess
        user_guess = get_user_guess()
        
        # Check if guess is correct
        if user_guess == secret_number:
            print(f"\n🎉 CONGRATULATIONS! 🎉")
            print(f"You guessed the number {secret_number} in {attempts} attempt(s)!")
            
            if attempts == 1:
                print("🏆 PERFECT! First try - you're amazing!")
            elif attempts <= 3:
                print("🥇 Excellent! You're a great guesser!")
            elif attempts <= 5:
                print("🥈 Good job! You did well!")
            else:
                print("🥉 Nice work! You got there in the end!")
            
            return True
        
        # Give hint and continue
        give_hint(secret_number, user_guess)
        
        if remaining > 0:
            print(f"💡 You have {remaining} attempt(s) left!")
    
    # Game over - out of attempts
    print(f"\n💀 GAME OVER! 💀")
    print(f"The number was {secret_number}")
    print("Better luck next time!")
    return False

def play_again():
    """Ask if user wants to play again."""
    while True:
        choice = input("\n🔄 Would you like to play again? (yes/no): ").strip().lower()
        
        if choice in ['yes', 'y', '1']:
            return True
        elif choice in ['no', 'n', '0']:
            return False
        else:
            print("❌ Please enter 'yes' or 'no'")

def main():
    """Main program entry point."""
    print("🎮 Starting Number Guessing Game...")
    time.sleep(1)
    
    while True:
        # Display welcome and play game
        display_welcome()
        play_game()
        
        # Ask to play again
        if not play_again():
            break
    
    print("\n👋 Thanks for playing! Come back soon!")
    print("=" * 50)

if __name__ == "__main__":
    main()
