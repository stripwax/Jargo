var levels_data_all_categories = [
  "Very Very Easy",
  "Tutorial (CARGO BOT)",
  "Easy (CARGO BOT)",
  "Not Quite So Easy",
  "Medium (CARGO BOT)",
  "Hard (CARGO BOT)",
  "Crazy (CARGO BOT)",
  "Impossible (CARGO BOT)",
];

var levels_data = [
/*
  {
    rating:"DEMO - Select This First",
    score:3,
    title:"What A Mess!",
    initial_state:[
      [2,1,3], [3,0,1,2,1], [3,2,2,0], [1,2,1], [3,3,3], [0,0,0,3], [1,2,1],
    ],
    goal_state:[
      [3,1,2,0], [3,1,2,0], [3,1,2], [3,1,2], [3,1,0], [3,1,2,0], [3,1,2,0],
    ],
    crane_x:1,
    program:"GRAB,RIGHT,RIGHT,RIGHT,GRAB,RIGHT,F2:GRAB,LEFT,LEFT,LEFT,GRAB,LEFT,F1",
  },
*/
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
    program:"GRAB,RIGHT",
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
  {
    rating:"Not Quite So Easy",
    score:8,
    title:"My Second Swap Experiment!",
    initial_state:[
      [2], [3], [],
    ],
    goal_state:[
      [3], [2], [],
    ],
    crane_x:1,
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
    score:4,
    score3:9,
    title:"Go Left",
    initial_state:[
      [], [1,1,1],[2,2,2],[3,3,3],
    ],
    goal_state:[
      [1,1,1], [2,2,2],[3,3,3],[],
    ],
    crane_x:0,
  },

  {
    rating:"Easy (CARGO BOT)",
    score:5,
    title:"Double Flip",
    initial_state:[
      [3,1,2,0], [], [],
    ],
    goal_state:[
      [],[],[3,1,2,0],
    ],
    crane_x:0,
  },
  {
    rating:"Easy (CARGO BOT)",
    score:4,
    title:"Go Left 2",
    initial_state:[
      [], [3,3,3], [1,1,1], [2,2,2]
    ],
    goal_state:[
      [3,3,3],[1,1,1],[2,2,2],[],
    ],
    crane_x:0,
  },
  {
    rating:"Easy (CARGO BOT)",
    score:9,
    title:"Shuffle Sort",
    initial_state:[
      [], [2,3,2,3,2,3], [],
    ],
    goal_state:[
      [2,2,2],[],[3,3,3],
    ],
    crane_x:1,
  },
  {
    rating:"Easy (CARGO BOT)",
    score:4,
    title:"Go The Distance",
    initial_state:[
      [1],[1],[1],[1],[1],[1],[],[0,0,0,0],
    ],
    goal_state:[
      [1],[1],[1],[1],[1],[1],[0,0,0,0],[],
    ],
    crane_x:0,
  },
  {
    rating:"Easy (CARGO BOT)",
    score:5,
    title:"Color Sort",
    initial_state:[
      [],[0,0,1,0,1,1],[],
    ],
    goal_state:[
      [1,1,1],[],[0,0,0]
    ],
    crane_x:1,
  },
  {
    rating:"Easy (CARGO BOT)",
    score:8,
    title:"Walking Piles",
    initial_state:[
      [1,1,1,1],[1,1,1,1],[1,1,1,1],[],[],[],[],
    ],
    goal_state:[
      [],[],[],[],[1,1,1,1],[1,1,1,1],[1,1,1,1],
    ],
    crane_x:0,
  },

  {
    rating:"Medium (CARGO BOT)",
    score:5,
    title:"Repeat Inverter",
    initial_state:[
      [2,3,1,0],[],[2,3,1,0],[],[2,3,1,0],[],
    ],
    goal_state:[
      [],[2,3,1,0],[],[2,3,1,0],[],[2,3,1,0],
    ],
    crane_x:0,
  },
  {
    rating:"Medium (CARGO BOT)",
    score:11,
    title:"Double Sort",
    initial_state:[
      [],[3,3,1,1],[1,3,1,3],[],
    ],
    goal_state:[
      [3,3,3,3],[],[],[1,1,1,1],
    ],
    crane_x:1,
  },
  {
    rating:"Medium (CARGO BOT)",
    score:6,
    title:"Mirror",
    initial_state:[
      [2,2,2,2],[1,1],[1],[1],[1,1],[],
    ],
    goal_state:[
      [],[1,1],[1],[1],[1,1],[2,2,2,2],
    ],
    crane_x:0,
  },
  {
    rating:"Medium (CARGO BOT)",
    score:7,
    title:"Lay it out",
    initial_state:[
      [1,1,1,1,1,1],[],[],[],[],[],
    ],
    goal_state:[
      [1],[1],[1],[1],[1],[1],
    ],
    crane_x:0,
  },
  {
    rating:"Medium (CARGO BOT)",
    score:8,
    title:"The Stacker",
    initial_state:[
      [],[0],[0],[0],[0],[0],[0],[],
    ],
    goal_state:[
      [],[],[],[],[],[],[],[0,0,0,0,0,0],
    ],
    crane_x:4,
  },
  {
    rating:"Medium (CARGO BOT)",
    score:6,
    title:"Clarity",
    initial_state:[
      [2,3,2],[2,2,2,3,2],[3,2,3,2],[3,2,2],[],
    ],
    goal_state:[
      [2,3],[2,2,2,3],[3,2,3],[3],[2,2,2,2,2],
    ],
    crane_x:0,
  },

  {
    rating:"Hard (CARGO BOT)",
    score:7,
    title:"Come Together",
    initial_state:[
      [],[],[3,3,3],[3],[],[],[3,3],
    ],
    goal_state:[
      [3,3,3,3,3,3],[],[],[],[],[],[]
    ],
    crane_x:0,
  },
  {
    rating:"Hard (CARGO BOT)",
    score:8,
    title:"Come Together 2",
    initial_state:[
      [],[3],[3,0,0],[3],[3,0],[3],[0,0,0,0],
    ],
    goal_state:[
      [0,0,0,0,0,0,0],[3],[3],[3],[3],[3],[],
    ],
    crane_x:0,
  },
  {
    rating:"Hard (CARGO BOT)",
    score:8,
    title:"Up The Greens",
    initial_state:[
      // 3= green!!!!!
      [3],[2,2],[3],[],[2,2,2],[3],[2,2],[2,2],
    ],
    goal_state:[
      [3,2,2],[],[3,2,2,2],[],[],[3,2,2,2,2],[],[],
    ],
    crane_x:0,
  },
  {
    rating:"Hard (CARGO BOT)",
    score:14,
    title:"Fill The Blanks",
    initial_state:[
      [1,1,1,1],[0],[],[0],[],[],[0],[],
    ],
    goal_state:[
      [],[0],[1],[0],[1],[1],[0],[1],
    ],
    crane_x:0,
  },
  {
    rating:"Hard (CARGO BOT)",
    score:9,
    title:"Count The Blues",
    initial_state:[
      // 2= blue!!!!!
      [2,0,0],[],[],[],[2,0],[],[],
    ],
    goal_state:[
      [],[0,0],[],[2],[],[0],[2],
    ],
    crane_x:0,
  },
  {
    rating:"Hard (CARGO BOT)",
    score:11,
    title:"Multi Sort",
    initial_state:[
      [],[1,3],[],[3,3,1],[3,1,3,1],[1,3],[1],[],
    ],
    goal_state:[
      [3,3,3,3,3,3],[],[],[],[],[],[],[1,1,1,1,1,1],
    ],
    crane_x:0,
  },

  {
    rating:"Crazy (CARGO BOT)",
    score:12,
    title:"Divide by two",
    initial_state:[
      [3,3,3,3],[],[3,3],[],[3,3,3,3,3,3],[],[3,3,3,3],[],
    ],
    goal_state:[
      [3,3],[3,3],[3],[3],[3,3,3],[3,3,3],[3,3],[3,3],
    ],
    crane_x:0,
  },
  {
    rating:"Crazy (CARGO BOT)",
    score:6,
    title:"The Merger",
    initial_state:[
      [2,2,2],[],[3,3,3],
    ],
    goal_state:[
      [],[2,3,2,3,2,3],[],
    ],
    crane_x:0,
  },
  {
    rating:"Crazy (CARGO BOT)",
    score:10,
    title:"Even the Odds",
    initial_state:[
      [0,0,0,0,0],[],[1,1],[],[2,2,2],[],[3,3,3,3],[],
    ],
    goal_state:[
      [0],[0,0,0,0],[],[1,1],[2],[2,2],[],[3,3,3,3],
    ],
    crane_x:0,
  },
  {
    rating:"Crazy (CARGO BOT)",
    score:17,
    title:"Genetic Code",
    initial_state:[
      [1,0,0,1,0,1],[],[0,0,0],[],[1,1,1],
    ],
    goal_state:[
      [],[1,0,1,0,0,1],[],[1,0,0,1,0,1],[],
    ],
    crane_x:0,
  },
  {
    rating:"Crazy (CARGO BOT)",
    score:17,
    title:"Multi Sort 2",
    initial_state:[
      [],[3,0,2,1,0],[],[2,3,3,1,1,0],[],[2,1,0,2,3],[],
    ],
    goal_state:[
      [3,3,3,3],[],[2,2,2,2],[],[1,1,1,1],[],[0,0,0,0],
    ],
    crane_x:0,
  },
  {
    rating:"Crazy (CARGO BOT)",
    score:10,
    title:"The Swap",
    initial_state:[
      [2,2,2],[],[1,1,1],
    ],
    goal_state:[
      [1,1,1],[],[2,2,2],
    ],
    crane_x:1,
  },

  {
    rating:"Impossible (CARGO BOT)",
    score:16,
    title:"Restoring Order",
    initial_state:[
      [],[3,2,3,3],[2,3,2,3],[3,3,3],[2],[2,3],[3],[],
    ],
    goal_state:[
      [],[3,3,3],[3,3],[3,3,3],[],[3],[3],[2,2,2,2,2],
    ],
    crane_x:0,
  },
  {
    rating:"Impossible (CARGO BOT)",
    score:17,
    title:"Changing Places",
    initial_state:[
      [0],[0,0,0],[1,1,1],[],[0,0,0,0],[0,0],[1,1,1,1],[1],
    ],
    goal_state:[
      [0,0,0],[0],[],[1,1,1],[0,0],[0,0,0,0],[1],[1,1,1,1],
    ],
    crane_x:0,
  },
  {
    rating:"Impossible (CARGO BOT)",
    score:15,
    title:"Palette Swap",
    initial_state:[
      [],[1,3],[3,1,3,1],[3,1],[3,1,3,1],[],[3,1,3,1,3,1],[],
    ],
    goal_state:[
      [],[3,1],[1,3,1,3],[1,3],[1,3,1,3],[],[1,3,1,3,1,3],[],
    ],
    crane_x:1,
  },
  {
    rating:"Impossible (CARGO BOT)",
    score:10,
    title:"Mirror 2",
    initial_state:[
      [2,2,2],[2,2],[2],[],
    ],
    goal_state:[
      [],[2],[2,2],[2,2,2],
    ],
    crane_x:0,
  },
  {
    rating:"Impossible (CARGO BOT)",
    score:16,
    title:"Changing Places 2",
    initial_state:[
      [0],[0,0,0],[0],[0,0,0,0,0],[],[0,0],[0,0,0,0],[0,0,0],
    ],
    goal_state:[
      [0,0,0],[0],[0,0,0,0,0],[],[0,0],[0,0,0,0],[0,0,0],[0],
    ],
    crane_x:0,
  },
  {
    rating:"Impossible (CARGO BOT)",
    score:16,
    title:"Vertical Sort",
    initial_state:[
      [],[1,2,1,2,2],[2,1,2],[1,2,2,1],[2,1],[2,1,1,1,2],[],
    ],
    goal_state:[
      [],[1,1,2,2,2],[1,2,2],[1,1,2,2],[1,2],[1,1,1,2,2],[],
    ],
    crane_x:1,
  },

];   

