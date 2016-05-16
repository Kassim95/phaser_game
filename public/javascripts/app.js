var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload() {
	  //we call on our game object and attach an image to it here
    //the first parameter is the variable name that we will refer to our image "background" and the second parameter is the filename of the image we are loading
    game.load.image('background', 'images/background.png');
    game.load.spritesheet('froggy', 'images/frog.png', 216, 218);
    game.load.audio('ribbit', 'sounds/ribbit.mp3');
    game.load.image('water', 'images/water.png');
    game.load.image('rock', 'images/rock.png');
    game.load.image('line', 'images/blank_line.png');
    game.load.image('cloud', 'images/cloud.png');
    game.load.spritesheet('bird', 'images/bird3.png', 84, 80);

}

function create() {
	//When adding an image we give three parameters.
	//The first is the x-axis position (from the left)
	//the second is y-axis (from the top)
	//and the third is the variable name of our preloaded image.
	var background = game.add.image(-100, 0, 'background');
	cloud = game.add.sprite(335, -50, 'cloud');
	game.physics.arcade.enable(cloud);
	//Give our cloud right (positive x-axis) velocity level of 5
	cloud.body.velocity.x = 5;
	// rock
	rock = game.add.sprite(105, 560, 'rock');
	ledge = game.add.sprite(140, 595, 'line');
	game.physics.arcade.enable(ledge);
	ledge.body.immovable = true;
	game.physics.arcade.enable(rock);
	rock.body.immovable = true;

	frog = game.add.sprite(175, 500, 'froggy')
	//this will increase our background image size by 87%
	background.scale.x = game.rnd.realInRange(1.87, 1.87);
	background.scale.y = game.rnd.realInRange(1.87, 1.87);

	frog.scale.x = game.rnd.realInRange(.18, .18);
	frog.scale.y = game.rnd.realInRange(.18, .18);
	//Pass our frog into our game physics as an argument
	game.physics.arcade.enable(frog);
	//Give our frog downward (positive y-axis) gravity level of 1000
	frog.body.gravity.y = 1000;
	var ribbit = game.add.audio('ribbit');
	//Parameters for animation
	//(the animation variable name,
	//a new array of the sprite image indices you wish to cycle through,
	//the speed of the cycle,
	//and whether or not the cycle will repeat)
	frog.animations.add('openClose', [0, 1], 2, true);
	//How we call the animation
	frog.animations.play('openClose');
	//Calling javascript's .play() within our create method will make sounds play the moment that the game begins
	ribbit.play();
	//Be sure to add our water AFTER we add our frog
	var water = game.add.image(-525, 625, 'water');
	//Add it
	birdie = game.add.sprite(750, -30, 'bird');
	//Resize it
	birdie.scale.x = game.rnd.realInRange(1.8, 1.8);
	birdie.scale.y = game.rnd.realInRange(1.8, 1.8);
	//Give it physics
	game.physics.arcade.enable(birdie);
	//Make it move
	birdie.body.velocity.x = -180;
	birdie.body.collideWorldBounds = true;
	birdie.body.bounce.setTo(1, 1);
	//The first three images of our bird sprite are facing due left
	birdie.animations.add('left', [0, 1, 2, 1], 6, true);
	birdie.animations.add('right', [9, 10, 11, 10], 6, true);

	//This will make up,down,left,and right live our keyboard
	cursors = game.input.keyboard.createCursorKeys();
	birdie.animations.add('left', [0, 1, 2, 1], 6, true);
	birdie.animations.add('right', [9, 10, 11, 10], 6, true);
	birdie.animations.add('down', [18, 19, 20, 19], 6, true);
	birdie.animations.add('left_down', [6, 7, 8, 7], 6, true);
	birdie.animations.add('right_down', [15, 16, 17, 16], 6, true);
	birdie.animations.add('up', [21, 22, 23, 22], 6, true);
	birdie.animations.add('left_up', [3, 4, 5, 4], 6, true);
	birdie.animations.add('right_up', [12, 13, 14, 13], 6, true);


}

function update() {
	 game.physics.arcade.collide(frog, ledge);
	 if (birdie.body.velocity.x >= 180){
    birdie.animations.play('right')
	} else {
    birdie.animations.play('left')    
	}
	//.isDown is checking if a key "is (pressed) down"
	//animations
if (birdie.body.velocity.x >= 180 && birdie.body.velocity.y >= 180) {
        birdie.animations.play('right_down')
} else if (birdie.body.velocity.x <= -180 && birdie.body.velocity.y >= 180) {
    birdie.animations.play('left_down')
} else if (birdie.body.velocity.x >= 180 && birdie.body.velocity.y <= -180) {
    birdie.animations.play('right_up')
} else if (birdie.body.velocity.x <= -180 && birdie.body.velocity.y <= -180) {
    birdie.animations.play('left_up')
} else if (birdie.body.velocity.x >= 140) {
    birdie.animations.play('right')
} else if (birdie.body.velocity.x <= -140) {
    birdie.animations.play('left')
} else if (birdie.body.velocity.y > 0 && (birdie.body.velocity.x < 140 && birdie.body.velocity.x > -140)) {
    if (birdie.body.velocity.y < 600) {
        birdie.animations.play('down')
    } else {
        birdie.animations.play('fall')
    }
}
else if (birdie.body.velocity.y < 0 && (birdie.body.velocity.x < 140 && birdie.body.velocity.x > -140)) {
    birdie.animations.play('up')
}

if (cursors.up.isDown) {
    if (cursors.left.isDown) {

        birdie.body.velocity.y = -180;
        birdie.body.velocity.x = -180;

    } else if (cursors.right.isDown) {

        birdie.body.velocity.y = -180;
        birdie.body.velocity.x = 180;

    } else {

        birdie.body.velocity.y = -180;
        birdie.body.velocity.x *= .99;
    }

  } else if (cursors.down.isDown) {

      if (cursors.left.isDown) {

          birdie.body.velocity.y = 180;
          birdie.body.velocity.x = -180;

      } else if (cursors.right.isDown) {

          birdie.body.velocity.y = 180;
          birdie.body.velocity.x = 180;

      } else {
          birdie.body.velocity.y = 180;
          birdie.body.velocity.x *= .99;
      }

  } else if (cursors.left.isDown) {
      birdie.body.velocity.x = -180;
      birdie.body.velocity.y *= .5;

  } else if (cursors.right.isDown) {
      birdie.body.velocity.x = 180;
      birdie.body.velocity.y *= .5;
  }

	

}