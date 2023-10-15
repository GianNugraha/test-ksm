import express from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bodyParser from "body-parser";

const app = express();
const port = 3002;

app.use(bodyParser.json());

// function of Palindrome Check

const isPalindrome = (str: string): boolean => {
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleanStr === cleanStr.split('').reverse().join('');
};

// Route to perform FizzBuzz
app.post("/fizzbuzz", (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const results: string[] = [];

  for (let i = 1; i < 100; i++) {
    var response = "";

    if (i % 3 === 0 && i % 5 === 0) {
      response += "FizzBuzz";
    } else if (i % 3 === 0) {
      response += "Fizz";
    } else if (i % 5 === 0) {
      response += "Buzz";
    } else {
      response = i.toString();
    }

    results.push(response);
  }

  res.json({ result: results });
});

// Route to Palindrome Check
app.post('/check-palindrome', (req: Request, res: Response) => {
  const  text  = "kasur11rusak";

  if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
  }

  const result = isPalindrome(text);

  res.json({ isPalindrome: result });
  
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
