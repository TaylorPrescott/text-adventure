(function() {
    let inventory = [];

    const Room = {
        description: '&emsp;A ceiling light illuminates the room with an light orange hue. In front of you is a <b>door</b>. To your left is a <b>bookshelf</b> with some items strewn across the floor. To your right is a <b>coffee table</b>. An old hardwood <b>floor</b> lies beneath your feet. There has to be a way out of this room.',

        door: 'The door is locked from the outside, but a keyhole is apparent on the door <b>knob</b>. On either side of the door hangs a painting. To the left of the door is a painting that depicts a swamp covered with fog. Moss grows on the many trees. The painting to the right depicts a cave. A lantern illuminates the area near it, but darkness envelopes the area further into the cave. These certainly don\'t invoke warm emotions. ',

        doorknob: 'The painted doorknob has seen better days. The amount of paint chips missing indicates a lot of use. The doorknob has a key hole, could the key be in this room somewhere?',

        bookShelf: 'A large bookshelf that\'s nearly filled with books. Virtually every book shows signs of extensive use. On the third shelf down, an ornate <b>box</b> sits. On the floor beside the bookshelf lie paper plates, with rotting leftovers present on some of them. The smell is not pleasant.',

        card: 'The card reads, “Thank you so much for joining me. I eagerly await our time together.”. Could this be your abductor’s handwriting? Maybe you should take this card with you to use as evidence if you can escape.',

        coffeeTable: 'A few items are resting on the table. Three unlit candles that have sit side by side, with only a small amount of wax remaining above their bases. A drawing depicts a person inside a room who appears to be crying. A crumpled piece of <b>paper</b> rests beside a pen. A pile of dirty clothes rests near the table with a thank you <b>card</b> beside them.',

        box: 'The ornately decorated box is adorned with faces that seemingly have vines wrapping around them. Oddly, none of the faces have eyes, yet their mouth and ears still remain. The box is locked with a three digit combination lock. Each of the three wheels display the numbers zero through nine.',

        boxOpen: false,

        floor: 'The hardwood floor has certainly seen some wear and tear. It\'s covered in scratches. Some barely penetrate the surface, while others are quiet deep. You notice a floor <b>mat</b> near the back corner of the room. It reads, “There\'s no place like home”.',

        mat: 'You move the floor mat and a see a small latch beneath it. Pulling on it reveals a secret compartment that in the floor.  Residing inside the compartment is a <b>safe</b> and an <b>envelope</b>.',

        safe: 'The safe has a digital lock. It accepts a five digit combination.',

        safeOpen: false
        
    };

    const Messages = {
        aboutMsg: 'This game was created with HTML, CSS, and vanilla JavaScript. My aim was to keep things simple and not make any of the game challenges too hard. I simply wanted to make an easy game to demonstrate some of what I\'ve learned.',

        helpMsg: 'You can only inspect and interact with items that have <b>bold</b> text. Below each description will be an example of the command. <br><br> To inspect an item, type the following format inside the text box (the brackets represent the text box): <br> [inspect box] <br><br> To add an item to your inventory, use the following: <br> [take card] <br><br> To view your inventory: <br> [view inventory] <br><br> To use an item that\'s in your inventory, use: <br> [use key on door] <br><br> To enter a combination on an item\'s lock: <br> [enter 123 on box]',
        
        exitWithCard: 'As you rush out of the room, you enter a hallway that is lit with blacklights. At the end of the hall is an exit sign. While running towards it, you drop the thank you card. Upon picking it back up you notice text that was written in invisible ink. It reads, "Did you really think I would leave my own handwriting here?". You throw the card down, rush out of the exit door, and are now standing on a sidewalk downtown. The building you just exited looks similar to all the others that line the street. People walk past you thinking about they need to do that day. By the time the police search the building, the room is empty. Some of them are having a hard time believing this really happened, and seem frustrated that you brought them here. At home that night, all you hope is that this nightmare won\'t happen again.',

        exitWithoutCard: 'As you rush out of the room, you enter a hallway that is lit with blacklights. At the end of the hall is an exit sign. You rush out of it and are now standing on a sidewalk downtown. The building you just exited looks similar to all the others that line the street. People walk past you thinking about they need to do that day. By the time the police search the building, the room is empty. Some of them are having a hard time believing this really happened, and seem frustrated that you brought them here. At home that night, all you hope is that this nightmare won\'t happen again.'
    };

    const images = {
        paperSrc: '../images/paper.jpg',
        safe: '../images/safe.jpg',
        envelope: '../images/envelope1.jpg'
    };

    const GameElements = {
        text: document.querySelector('#text'),
        form: document.querySelector('#user-form'),
        input: document.querySelector('#user-input')
    };

    const Buttons = {
        about: document.querySelector('#about'),
        help: document.querySelector('#help'),
        submit: document.querySelector('#submit'),
        aboutHandler() {
            GameElements.text.innerHTML = Messages.aboutMsg;
        },
        helpHandler() {
            GameElements.text.innerHTML = Messages.helpMsg;
        }
    };

    const viewInventory = function() {
        if (inventory.length === 0) {
            GameElements.text.innerHTML = 'No items in inventory.';
        } else if (inventory.length === 2) {
            GameElements.text.innerHTML = `${inventory[0]}, ${inventory[1]}`;
        } else {
            GameElements.text.innerHTML = inventory;
        }
    };

    const useHandler = function(item, obj) {
        
        if (item === 'key') {
            if (obj === 'door' && inventory.includes('card')) {
                Room.description = Messages.exitWithCard;
                GameElements.text.innerHTML = Room.description;
            } else if (obj === 'door') {
                Room.description = Messages.exitWithoutCard;
                GameElements.text.innerHTML = Room.description;
            } else {
                GameElements.text.innerHTML = 'You can\'t use that item here.';
            }
        }
    };

    const enterHandler = function(code, obj) {
        if (Room.boxOpen || Room.safeOpen) {
           return GameElements.text.innerHTML = 'Item already opened.';
        }

        if (obj === 'box') {
            if (code === '297') {
                Room.boxOpen = true;
                Room.box = 'Inside the box is a bracelet, a pair of earrings, and seventy five cents. The quarters seem to be very old.'
                GameElements.text.innerHTML = Room.box;
            } else {
                GameElements.text.innerHTML = 'Combination didn\'t work.';
            }
        } else if (obj === 'safe') {
            if (code === '38975') {
                const openSafe = 'You find a golden <b>key</b> inside the safe.';
                Room.safeOpen = true;
                Room.safe = openSafe;
                GameElements.text.innerHTML = Room.safe;
            } else {
                GameElements.text.innerHTML = 'It didn\'t work!';
            }
        } else {
            GameElements.text.innerHTML = 'That item doesn\'t have a combination lock.';
        }
    };  

    const takeHandler = function(item) {

        switch(item) {
            case 'key':
                if (Room.safeOpen === false) {
                    return GameElements.text.innerHTML = 'What key?';
                }
                if(inventory.includes('key')) {
                  return GameElements.text.innerHTML = 'Item already taken';
                }
                GameElements.text.innerHTML = 'Key taken.';
                inventory.push('key');
                break;
            case 'card':
                if(inventory.includes('card')) {
                    return GameElements.text.innerHTML = 'Item already taken';
                  }
                GameElements.text.innerHTML = 'Card taken.';
                inventory.push('card');
                break;
            default:
                GameElements.text.innerHTML = 'What would you like to take?';
        }
    };

    const displayImg = function(item) {
        const textArea = document.querySelector('.text-area');
        const img = document.createElement('img');
        img.className = 'item-img';
        GameElements.text.innerHTML = '';

        if (item === 'paper') {
            img.src = images.paperSrc;
            textArea.append(img);
        } else if (item === 'safe') {
            GameElements.text.innerHTML = Room.safe;
            img.src = images.safe;
            textArea.append(img);
        } else if (item === 'envelope') {
            img.src = images.envelope;
            textArea.append(img);
        }
    };

    //show item descriptions or display images based on item name
    const inspectHandler = function(item) {
        switch(item) {
            case 'door':
                GameElements.text.innerHTML = Room.door;
                break;
            case 'knob':
                GameElements.text.innerHTML = Room.doorknob;
                break;
            case 'bookshelf':
                GameElements.text.innerHTML = Room.bookShelf;
                break;
            case 'box':
                GameElements.text.innerHTML = Room.box;
                break;
            case 'coffee':
                GameElements.text.innerHTML = Room.coffeeTable;
                break;
            case 'card':
                GameElements.text.innerHTML = Room.card;
                break;
            case 'paper':
                displayImg('paper');
                break;
            case 'floor':
                GameElements.text.innerHTML = Room.floor;
                break;
            case 'mat':
                GameElements.text.innerHTML = Room.mat;
                Room.mat = 'The mat lies beside the compartment in the floor. A <b>safe</b> and an <b>envelope</b> are inside.';
                break;
            case 'safe':
                if (inventory.includes('key')) {
                    Room.safe = 'The safe is now empty';
                 }
                GameElements.text.innerHTML = Room.safe;
                displayImg('safe');
                break;
            case 'envelope':
                displayImg('envelope');
                break;
            default:
                GameElements.text.innerHTML = 'What do you want to inspect? Make sure you\'re typing the item name in exactly as the bold letters appeared on the screen.';
        }
    };

    const formHandler = function(e) {
        const gameForm = GameElements.form;
        const userInput = GameElements.input.value.toLowerCase();
        const inputArr = userInput.split(' ');
        const textArea = document.querySelector('.text-area');
        const img = document.querySelector('.item-img');
        
        if (img !== null) {
            textArea.removeChild(img);
        }

        switch(inputArr[0]) {
            case 'inspect':
                inspectHandler(inputArr[1]);
                break;
            case 'take':
                takeHandler(inputArr[1]);
                break;
            case 'enter':
                if (!isNaN(inputArr[1])) {
                    enterHandler(inputArr[1], inputArr[3]);
                } else {
                    GameElements.text.innerHTML = 'Only numbers can be entered';
                }
                break;
            case 'use':
                if (inventory.includes(inputArr[1])) {
                        useHandler(inputArr[1], inputArr[3]);
                    } else {
                        GameElements.text.innerHTML = 'Item not in inventory.';
                    }
                break;
            case 'view':
                if (inputArr[1] === 'inventory') {
                    viewInventory();
                } else {
                    GameElements.text.innerHTML = 'Command not entered correctly.';
                }
                break;
            default:
                GameElements.text.innerHTML = Room.description;
        }
        
        gameForm.reset();
        e.preventDefault();
    };

    const addListener = function(elem, handler) {
        elem.addEventListener('click', handler);
    };

    addListener(Buttons.about, Buttons.aboutHandler);
    addListener(Buttons.help, Buttons.helpHandler);
    addListener(Buttons.submit, formHandler);
    GameElements.form.addEventListener('submit', formHandler);

}());