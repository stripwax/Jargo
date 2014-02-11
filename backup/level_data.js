

var levels_data_all_categories = [
	"Easy",
	"Medium",
];

var levels_data = [
  {
    rating:"Easy",
    score:3,
    title:"Move it from here to there!",
    initial_state:[
      [], [], [1], [], [], [], []
    ],
    goal_state:[
      [], [], [], [1], [], [], []
    ],
    crane_x:2,
  },
  {
    rating:"Easy",
    score:3,
    title:"Go there and then move it!",
    initial_state:[
      [], [], [2], [], [], [], []
    ],
    goal_state:[
      [], [], [], [2], [], [], []
    ],
    crane_x:6,
  },
  {
    rating:"Easy",
    score:5,
    title:"Move two things",
    initial_state:[
      [3,3], [], [], [], [], [], []
    ],
    goal_state:[
      [], [3,3], [], [], [], [], []
    ],
    crane_x:0,
  },
  {
    rating:"Medium",
    score:8,
    title:"My First Swap Experiment!",
    initial_state:[
      [], [], [0], [1], [], [], []
    ],
    goal_state:[
      [], [], [1], [0], [], [], []
    ],
    crane_x:2,
  }
];   

