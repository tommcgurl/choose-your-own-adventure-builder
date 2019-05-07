# Choose Your Own Adventure Builder

## Structure of JSON

### Table of Contents
+ Story Building Docs
  + [Title](#title)
  + [Intro](#intro)
  + [Items](#items)
    + [prompt](#prompt)
    + [options](#options)
    + [limit](#limit)
    + [Example Item object](#example-item)
  + [Character](#character)
  + [Main Story](#main_story--object)
    + [Story Parts](#story_parts--object)
      + [plot](#plot)
      + [next](#next)
      + [character_modifier](#character-modifier)
      + [prompt](#prompt)
        + [text](#prompt-text)
        + [choices](#prompt-choices)
        + [no-choice](#no-choice)
      + [Example Story Part object](#example-story-part)


### `title`
The title of your story that will appear on the intro screen along with the `intro` text (explained below).

### `intro`
Every app must have an intro. This is the first text that is show to your user when the application starts.

To See a completed story JSON. Take a look at `example-story.json` in this repo.

example:
```
"intro" :
    "It is the year 2005.
    The treacherous Decepticons have conquered the Autobots' home planet of Cybertron.
    But from secret staging grounds on two of Cybertron's moons the valiant Autobots
    prepare to retake their homeland."
```

### `items`
This is a list of `items` that the adventurer will take with them on their journey or whatever.
This is represented as an object with two properties.
  + `prompt` : `String` <a name="propt"></a>
    + A string representing the text you want presented to the user during item selection
    + For example:
      ```
      prompt: "Select 3 items to take with you in your backpack for your journey to through Mirkwood."
      ```
  + `options`  :  `Object` <a name="options"></a>
    + An object representing the items that can be taken.
    + Each property should be the unique identifier for that item
    + For example:
      ```
      options: {
        "map": {...},
        "flashlight": {...},
        "rope": {...},
        "matches": {...}
      }
      ```
    + Each `option` should have a `description`
    + For example:
      ```
      options: {
        "map": {
            "description":
              "A map of the area surrounding the moon base.
              This map shows the location of points of interest."
            ""
        }
      }
      ```
  + `limit` : `Int` <a name="limit"></a>
    + Limit is the number of item `options` you are allowed to carry.
    + For example:
      ` "limit": 3 `


  + Below is an example of a completed `items` object. <a name="example-item"></a>
    ```
    "items" : {
      "prompt": "Select 2 items to bring with you tonight."
      "options": {
        "map": {
          "description": "Shiny new map."
        },
        "flashlight": {
          "description": "Shiny new flashlight."
        },
        "rope": {
          "description": "Shiny new rope."
        },
        "matches": {
          "description": "Shiny new matches."
        }
      },
      "limit": 2
    }
    ```

### `character` : `Object` : `optional` <a name="character"></a>
This is an optional object that you can add to create the notion of a _character_ within the game.
>**NOTE**: This object will probably be expanded to allow for the manual alloting of values to different attributes by the user. For example maybe the author gives the user 100 points and lets the user allocate those points across different attributes. This could then be used for interesting story mechanics.

A Character is comprised of the following parts
  + `name` : `String` : `optional`
    + This is simple a name that will appear on the top of the character screen
  + `attributes` : `Object`
    + This object represents the different attributes that your character has.
    + Each attribute is an object made up of:
      + `value`: `Number`
        + Some value you would like to assign to this attribute.
        + For example you may want to track a users health so you give it a value of 100 and at different points in the story you subtract health if the user is hurt, and add health if they are healed.
      + `description`: `String` : `optional`
        + An optional description of the attribute.
        + For example for a _health_ attribute you may have a `description` of: _`Your health. Let it drop to 0 and you die!`_
      + `end_state`: `Number` : `optional`
        + This is used to trigger an event when an attribute falls below a particular number
        + The most common example is haveing an `end_state` of 0 for health. If the character's health is less than or equal to 0 then we trigger the `end_branch`
      + `end_branch` : `String (Branch ID)` : `optional`
        + This is the ID of the branch you would like to transition to once the `end_state` is reached on a given attribute.
  + Below is an example `Character` Object.
  ```
  "character": {
      "name": "Young Thug",
      "attributes": {
        "health": {
          "value": 100,
          "description": "This is your health. Let it drop to 0 and you die!",
          "end_state": 0,
          "end_branch": "bleed_out"
        },
        "mana": {
          "value": 100,
          "description": ""
        },
        "strength": {
          "value": 100,
          "description": ""
        }
      }
  }
  ```
### `main_story` : `Object`
This is where the bulk of you story structure goes. It has many parts and can get complex so read all the parts carefully.

#### `story_parts` : `Object`
This object represents the different _branches_ of your story. Their key should be a *unique ID* for linking story branches.
>**NOTE**: You should always include a branch with the ID `outro` to be used for the final screen of your story (which contains a button
  to start the story over).

Each _branch_ of your story is an object

  + They contain branching options
  + They contain a `next_branch` property directing to another branch.
  + If no `next` property is provided then the next branch will be your `outro` (explained later in the doc in more detail).
  + Example `story_parts` object
  ```
  "story_parts" : {
    "walk_down_hallway_1" : { ... },
    "open_door_1" : { ... },
    "find_way_around_1" : { ... },
    "outro" : { ... }
  }
  ```

  + Each `story_part` should be an object representing a _branch_ of your story. That object should contain the following properties:
    + `plot` : `String` : `required` <a name="plot"></a>
      + This represents the text that is displayed to the adventurer
    + `next_branch` : `String (Branch ID)` : `optional` <a name="next_branch"></a>
      + This string represents the unique ID of the `story_part` or _branch_ you would like to be read next.
       >**NOTE** If the property is not present than the following _branch_ in the `outro` branch will come next.
    + `prompt` : `Object` : `optional` <a name="prompt"></a>
      + This should be an object with a prompt and options (_choices_) provided to the user after the plot text is read.
      + These options should contain story arcs that cause the reader to proceed down different paths ( to transition to another _branch_).
      + The `prompt` object contains two properties:
        + `text` : `String` <a name="prompt-text"></a>
          + The text prompting the user to make a decision.
          + For example:
            ```
            "text":
                  "Do you open the door,
                   or try to find another way around?"
            ```
        + `choices` : `Array` <a name="prompt-choices"></a>
          + This would be an Array of `choice` objects.
          + The `choice` object should contain the following properties:
            + `text` : `String`
              + The text explaining the choice
              + For example:
              ```
              "text" : "Open the door!"
              ```
            + `next_branch` : `String ( Branch ID )`
              + This should be the ID of the branch you would like to transition to next.
              + For example:
              ```
              "next_branch" : "open_door_1"
              ```
            + `item_requirement` : `String ( Branch ID )`
              + Some choices may require the adventurer has a certain item.
              + This property should be the unique ID of the required item.
              + If the user does not have this item, this option is not shown.

          + An example `choices` array:
          ```
          "choices" : [
              {
                "text": "Open the Door!",
                "next_branch": "open_door_1"
              },
              {
                "text": "Find another way around!",
                "next_branch": "find_way_around_1"
              },
              {
                "text": "Curl into a ball and rock back and forth while crying",
                "next_branch": "horrifying_conclusion"
              }
          ]
          ```
        + `no_choice` : `Object ( Choice Object )` : `optional` <a name="no-choice"></a>
          + If for some reason the user's list of options is limited to (maybe due to lack of items), this choice will be automatically selected.
          + It should also contain a `text` and `next_branch` property.
    + `character_modifier` : `Object` : `optional` <a name="character-modifier"></a>
        + This is an object representing a change that should occur to the character.
        + The object should contain two properties
          + `attribute`: `String (AttributeID)`
            + This is the attribute you want to modify
          + `modifier` : `Number`
            + This is a number that will be **added** to the corresponding
            character attribute.
          + Here is an example of a `character_modifier`
          ```
          "character_modifier": {
              "attribute": "health",
              "modifier": -100
          },
          ```
    + Here is an example a `story-part` object: <a name="example-story-part"></a>
    ```
    "walk_down_hallway_1": {
      "plot": "You stumble down the hallway, the sounds of their breathing not far behind you! You see a door ahead. You do not see any light coming out from the bottom of the door, only darkness.",
      "prompt": {
        "text": "Do you go through the door, or keep going and try to find another way out!?",
        "choices": [
          {
            "text": "Open the Door!",
            "next_branch": "open_door_1"
          },
          {
            "text": "Keep running and try to find another way out!",
            "next_branch": "find_another_way_out_1"
          },
          {
            "text": "Curl into a ball and rock back and forth while crying.",
            "next_branch": "horrifying_conclusion"
          },
          {
            "text": "Quickly look at map to find out where door leads.",
            "item_requirement": "map",
            "next_branch": "check_map_1"
          }
        ]
      }
    }
    ```


#### `first_part` : `String (Branch ID)`
This should be the ID of the branch you would like the story to start on.

#### `color_palette` : `Object`
This section allows you to set some basic styling within the app (Very limited right now).
See the following guide for what color formats are supported https://facebook.github.io/react-native/docs/colors.html

+ `background` : `Color`
+ `main_text` : `Color`
+ `sub_text` : `Color`
+ An exampled `color_palette` object looks like:
```
"color_palette" : {
  "background": "#444",
  "main_text": "#FFF",
  "sub_text": "#AAA"
}
```

See the following screenshot to see how these values are applied.
![Example App with Colors applied](screenshots/colorPaletteExample.png)
