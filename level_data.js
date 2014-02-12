var levels_data_all_categories = [
  "Very Very Easy",
  "Not Quite So Easy",
  "Tutorial (CARGO BOT)",
];

var levels_data = [
  {
    rating:"Very Very Easy",
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
    rating:"Very Very Easy",
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
    rating:"Very Very Easy",
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
    rating:"Not Quite So Easy",
    score:8,
    title:"My First Swap Experiment!",
    initial_state:[
      [], [], [0], [1], [], [], []
    ],
    goal_state:[
      [], [], [1], [0], [], [], []
    ],
    crane_x:2,
  },

  // CARGO BOT OFFICIAL LEVELS
  {
    rating:"Tutorial (CARGO BOT)",
    score:3,
    title:"Cargo 101",
    initial_state:[
      [0], [],
    ],
    goal_state:[
      [], [0],
    ],
    crane_x:0,
  },
  {
    rating:"Tutorial (CARGO BOT)",
    score:5,
    title:"Transporter",
    initial_state:[
      [0], [], [], [],
    ],
    goal_state:[
      [], [], [], [0],
    ],
    crane_x:0,
  },
  {
    rating:"Tutorial (CARGO BOT)",
    score:4,
    title:"Re-Curses",
    initial_state:[
      [0,0,0,0], [],
    ],
    goal_state:[
      [], [0,0,0,0],
    ],
    crane_x:0,
  },
  {
    rating:"Tutorial (CARGO BOT)",
    score:10,
    title:"Inverter",
    initial_state:[
      [3,2,1,0], [],[],[],[],[],
    ],
    goal_state:[
      [], [],[],[],[],[0,1,2,3],
    ],
    crane_x:0,
  },
  {
    rating:"Tutorial (CARGO BOT)",
    score:5,
    title:"From Beneath",
    initial_state:[
      [0,2,2,2,2], [], [],
    ],
    goal_state:[
      [], [2,2,2,2], [0],
    ],
    crane_x:0,
  },
  {
    rating:"Tutorial (CARGO BOT)",
    score:9,
    title:"Go Left",
    initial_state:[
      [], [1,1,1],[2,2,2],[3,3,3],
    ],
    goal_state:[
      [1,1,1], [2,2,2],[3,3,3],[],
    ],
    crane_x:0,
  },

];   

