# MX51 POS

Install node and npm in your development machine.

- npm (6.x)
- node (12.x)

## Development Steps

To build and have hot-refresh, run the following command:

- `npm run dev`

## Production Steps

To build the project, run the following command:

- `npm run electron-build`

The command with initially build the project and bundle it up, afterwords, using `electron-packager` it will then create the DMG/exe files for you.

## Notes

Server REST api requirement: when submitting the payment, the price is saved to a file and also the list of items that were bought in the purchase.

With more time, I would have more options in the list of food available. Also providing more information to each food item such as categories like vegan/gluten-free/ingredients for each item. Another point to raise is the current design, with more time I would have liked to design a more modern look and feel of the shopping cart and add animation when adding items, to improve the experience of the user to entice them more.

Animation libraries that I'm comfortable with is with greensock, this was used when I was in the education sector to further enhance the learning environment of students.
