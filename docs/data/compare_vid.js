window.UE = window.UE || {};
UE.compareVid = [
 {
  "id": "cmp_dancer",
  "task": "action",
  "label": "pirouette",
  "title": "Dancer spins a pirouette",
  "source_prompt": "A woman with black hair in a bun and a white sleeveless dress standing still with arms at the sides in the middle of an empty dance studio with a wooden floor and large windows.",
  "target_prompt": "A woman with black hair in a bun and a white sleeveless dress spinning in a pirouette with arms raised above the head in the middle of an empty dance studio with a wooden floor and large windows.",
  "src": "media/vid/dancer/source.mp4",
  "poster": "media/vid/dancer/source.jpg",
  "w": 832,
  "h": 480,
  "fps": 16,
  "frames": 41,
  "methods": [
   {
    "name": "Wan-Edit",
    "out": "media/vid/dancer/pirouette_wanedit.mp4",
    "poster": "media/vid/dancer/pirouette_wanedit.jpg"
   },
   {
    "name": "UltraEdit",
    "out": "media/vid/dancer/pirouette.mp4",
    "poster": "media/vid/dancer/pirouette.jpg",
    "ours": true
   }
  ]
 },
 {
  "id": "cmp_fox",
  "task": "swap",
  "label": "robot",
  "title": "Fox becomes a robot",
  "source_prompt": "A fox is trotting cautiously through a snowy forest, leaving small paw prints behind. The camera follows the fox's movement with a slow pan.",
  "target_prompt": "A robot is navigating cautiously through a snowy forest, leaving small tracks behind. The camera follows the robot's movement with a slow pan.",
  "src": "media/vid/fox/source.mp4",
  "poster": "media/vid/fox/source.jpg",
  "w": 832,
  "h": 480,
  "fps": 16,
  "frames": 41,
  "methods": [
   {
    "name": "Wan-Edit",
    "out": "media/vid/fox/robot_wanedit.mp4",
    "poster": "media/vid/fox/robot_wanedit.jpg"
   },
   {
    "name": "UltraEdit",
    "out": "media/vid/fox/robot.mp4",
    "poster": "media/vid/fox/robot.jpg",
    "ours": true
   }
  ]
 },
 {
  "id": "cmp_woman",
  "task": "swap",
  "label": "tabby cat",
  "title": "Woman becomes a tabby cat",
  "source_prompt": "A woman with long curly black hair in a denim jacket over a red top sitting at a small round wooden table with her hands around a white coffee cup, looking out of a cafe window.",
  "target_prompt": "A large orange tabby cat sitting at a small round wooden table with her hands around a white coffee cup, looking out of a cafe window.",
  "src": "media/vid/woman_cafe/source.mp4",
  "poster": "media/vid/woman_cafe/source.jpg",
  "w": 832,
  "h": 480,
  "fps": 16,
  "frames": 41,
  "methods": [
   {
    "name": "Wan-Edit",
    "out": "media/vid/woman_cafe/tabby_cat_wanedit.mp4",
    "poster": "media/vid/woman_cafe/tabby_cat_wanedit.jpg"
   },
   {
    "name": "UltraEdit",
    "out": "media/vid/woman_cafe/tabby_cat.mp4",
    "poster": "media/vid/woman_cafe/tabby_cat.jpg",
    "ours": true
   }
  ]
 }
];
