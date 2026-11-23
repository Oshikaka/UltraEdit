window.UE = window.UE || {}; UE.galleryImg = [
 {
  "id": "neon",
  "modality": "image",
  "title": "Neon sign",
  "source_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"S\", mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
  "source": {
   "src": "media/img/neon/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "neon_I",
    "task": "shape",
    "label": "letter I",
    "target_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "out": "media/img/neon/neon_I.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon/neon_I__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon/neon_I__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon/neon_I__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon/neon_I__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "neon_heart",
    "task": "shape",
    "label": "heart",
    "target_prompt": "A glowing bright blue neon light tube in the shape of a heart (two rounded lobes at the top meeting in a point at the bottom), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "source_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "from": "neon_I",
    "out": "media/img/neon/neon_heart.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon/neon_heart__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon/neon_heart__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon/neon_heart__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon/neon_heart__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "neon_E",
    "task": "shape",
    "label": "letter E",
    "target_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"E\" (one vertical stroke with three horizontal bars to the right: top, middle and bottom), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "source_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "from": "neon_I",
    "out": "media/img/neon/neon_E.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon/neon_E__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon/neon_E__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon/neon_E__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon/neon_E__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "neon_D",
    "task": "shape",
    "label": "letter D",
    "target_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"D\" (one vertical stroke with a closed half-round curve on its right side), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "source_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "from": "neon_I",
    "out": "media/img/neon/neon_D.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon/neon_D__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon/neon_D__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon/neon_D__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon/neon_D__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "neon_I0",
    "task": "shape",
    "label": "letter I",
    "target_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "source_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "from": "neon_I",
    "out": "media/img/neon/neon_I0.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon/neon_I0__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon/neon_I0__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon/neon_I0__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon/neon_I0__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "neon_T",
    "task": "shape",
    "label": "letter T",
    "target_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"T\" (one horizontal bar across the top with one vertical stroke down from its middle), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "source_prompt": "A glowing bright blue neon light tube in the shape of the capital letter \"I\" (one single straight vertical stroke), mounted on a square blue sign panel with a thin dark frame on a pole, at night in front of dark blurred city buildings with small warm lights.",
    "from": "neon_I",
    "out": "media/img/neon/neon_T.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon/neon_T__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon/neon_T__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon/neon_T__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon/neon_T__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "neon_word",
  "modality": "image",
  "title": "Neon word",
  "source_prompt": "A glowing pink neon sign spelling the word \"Ultimate\" in cursive script, mounted on a red brick wall at night, photo. This single word is the only text anywhere in the image.",
  "source": {
   "src": "media/img/neon_word/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "neon_word_ultraedit",
    "task": "text",
    "label": "word \"UltraEdit\"",
    "target_prompt": "A glowing pink neon sign spelling the word \"UltraEdit\" in cursive script, mounted on a red brick wall at night, photo. This single word is the only text anywhere in the image.",
    "out": "media/img/neon_word/neon_word_ultraedit.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/neon_word/neon_word_ultraedit__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/neon_word/neon_word_ultraedit__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/neon_word/neon_word_ultraedit__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/neon_word/neon_word_ultraedit__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "bear",
  "modality": "image",
  "title": "Black bear",
  "source_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
  "source": {
   "src": "media/img/bear/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "bear_lie",
    "task": "pose",
    "label": "lying down",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, lying flat on its belly on the grass with its head resting on its outstretched front paws, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear/bear_lie.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_lie__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_lie__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_lie__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_lie__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "bear_basket",
    "task": "add",
    "label": "basket",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs past a woven wicker picnic basket standing on the grass beside its front paws, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "source_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs across open grass, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear/bear_basket.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_basket__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_basket__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_basket__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_basket__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "bear_boulders",
    "task": "delete",
    "label": "boulders",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs, on a green lawn dotted with small white clover flowers, with only dark evergreen trees and a grassy slope behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear/bear_boulders.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_boulders__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_boulders__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_boulders__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_boulders__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "bear_wall",
    "task": "delete",
    "label": "wall",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and more open lawn and evergreen trees at the right edge.",
    "out": "media/img/bear/bear_wall.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_wall__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_wall__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_wall__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_wall__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "bear_wolf",
    "task": "swap",
    "label": "wolf",
    "target_prompt": "A gray wolf with thick gray and cream fur, a long snout and pointed ears, walking toward the camera on all four legs, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear/bear_wolf.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_wolf__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_wolf__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_wolf__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_wolf__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "bear_move",
    "task": "move",
    "label": "to ①",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear/bear_move.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_move__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_move__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_move__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_move__syncsde.webp"
     }
    ],
    "marks": [
     {
      "x": 0.2188,
      "y": 0.582,
      "text": "①"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "bear_move_stand",
    "task": "move",
    "label": "to ② + standing",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, standing up on its hind legs facing the camera, its front paws hanging in front of its chest, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear/bear_move_stand.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear/bear_move_stand__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear/bear_move_stand__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear/bear_move_stand__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear/bear_move_stand__syncsde.webp"
     }
    ],
    "marks": [
     {
      "x": 0.7656,
      "y": 0.8086,
      "text": "②"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "woman",
  "modality": "image",
  "title": "Portrait",
  "source_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, holding her hair with her hands, in front of a plain muted green-gray background.",
  "source": {
   "src": "media/img/woman/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "woman_release",
    "task": "pose",
    "label": "let go of hair",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, with her arms lowered and her hair hanging down freely over her shoulders, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_release.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_release__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_release__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_release__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_release__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "woman_cover_mouth",
    "task": "gesture",
    "label": "cover mouth",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, covering her mouth with her right hand, her left arm lowered, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_cover_mouth.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_cover_mouth__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_cover_mouth__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_cover_mouth__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_cover_mouth__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "woman_sunglasses",
    "task": "add",
    "label": "sunglasses",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, putting on a pair of round dark sunglasses with both hands, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_sunglasses.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_sunglasses__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_sunglasses__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_sunglasses__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_sunglasses__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "woman_flower_crown",
    "task": "add",
    "label": "flower crown",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, holding her hair with her hands, wearing a crown of small white flowers on her head, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_flower_crown.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_flower_crown__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_flower_crown__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_flower_crown__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_flower_crown__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "woman_phone",
    "task": "action",
    "label": "phone call",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, holding a smartphone to her right ear, her left arm lowered, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_phone.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_phone__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_phone__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_phone__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_phone__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "woman_smile",
    "task": "expression",
    "label": "smile",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a sage green top, holding her hair with her hands, smiling broadly with her teeth showing, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_smile.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_smile__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_smile__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_smile__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_smile__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   },
   {
    "id": "woman_red_shirt",
    "task": "color",
    "label": "red shirt",
    "target_prompt": "A portrait of a young woman in her twenties with long wavy auburn brown hair, green eyes and full lips, wearing a bright red shirt, holding her hair with her hands, in front of a plain muted green-gray background.",
    "out": "media/img/woman/woman_red_shirt.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/woman/woman_red_shirt__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/woman/woman_red_shirt__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/woman/woman_red_shirt__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/woman/woman_red_shirt__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "eagle",
  "modality": "image",
  "title": "Bald eagle",
  "source_prompt": "A bald eagle with a white head, a yellow beak and dark brown body feathers, with its wings folded, perched on a snow-covered rock ledge in a misty snowy pine forest.",
  "source": {
   "src": "media/img/eagle/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "eagle_wings",
    "task": "pose",
    "label": "spread wings",
    "target_prompt": "A bald eagle with a white head, a yellow beak and dark brown body feathers, with its wings open and spread out away from its body, perched on a snow-covered rock ledge in a misty snowy pine forest.",
    "out": "media/img/eagle/eagle_wings.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/eagle/eagle_wings__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/eagle/eagle_wings__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/eagle/eagle_wings__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/eagle/eagle_wings__syncsde.webp"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "sign",
  "modality": "image",
  "title": "Picture Palace sign",
  "source_prompt": "The facade of a small cinema at night: a long brightly backlit cream sign band with the words \"THE ULTIMATE PICTURE PALACE\" in large dark brown sans-serif capital letters, under a white cornice with a row of small rectangular blocks, above four white columns, two pairs of white doors and a lit entrance with a red panel, round windows and a black and white checkered floor.",
  "source": {
   "src": "media/img/sign/source.webp",
   "w": 768,
   "h": 432
  },
  "items": [
   {
    "id": "sign_ultraedit",
    "task": "text",
    "label": "word \"ULTRAEDIT\"",
    "target_prompt": "The facade of a small cinema at night: a long brightly backlit cream sign band with the words \"THE UltraEdit PICTURE PALACE\" in large dark brown sans-serif capital letters, under a white cornice with a row of small rectangular blocks, above four white columns, two pairs of white doors and a lit entrance with a red panel, round windows and a black and white checkered floor.",
    "out": "media/img/sign/sign_ultraedit.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/sign/sign_ultraedit__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/sign/sign_ultraedit__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/sign/sign_ultraedit__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/sign/sign_ultraedit__syncsde.webp"
     }
    ],
    "w": 768,
    "h": 432
   }
  ]
 },
 {
  "id": "lavender",
  "modality": "image",
  "title": "Lavender field",
  "source_prompt": "A woman in her twenties with long black hair and white sunglasses pushed up on her head, wearing a long-sleeved magenta cycling jersey and black cycling shorts, standing with her arms hanging at her sides in a field of purple lavender with a dark pine tree, green hills and a clear blue sky behind her.",
  "source": {
   "src": "media/img/lavender/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "lavender_move",
    "task": "move",
    "label": "to ①",
    "target_prompt": "A woman in her twenties with long black hair and white sunglasses pushed up on her head, wearing a long-sleeved magenta cycling jersey and black cycling shorts, standing with her arms hanging at her sides in a field of purple lavender with a dark pine tree, green hills and a clear blue sky behind her.",
    "out": "media/img/lavender/lavender_move.webp",
    "marks": [
     {
      "x": 0.7812,
      "y": 0.5293,
      "text": "①"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "zebra",
  "modality": "image",
  "title": "Grazing zebra",
  "source_prompt": "A zebra with bold black and white stripes and an upright mane standing with its head lowered to the grass in green scrubland in warm low sunlight.",
  "source": {
   "src": "media/img/zebra/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "zebra_move",
    "task": "move",
    "label": "to ①",
    "target_prompt": "A zebra with bold black and white stripes and an upright mane standing with its head lowered to the grass in green scrubland in warm low sunlight.",
    "out": "media/img/zebra/zebra_move.webp",
    "marks": [
     {
      "x": 0.25,
      "y": 0.5117,
      "text": "①"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "bear_stand",
  "modality": "image",
  "title": "Bear: move, then stand",
  "source_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, walking toward the camera on all four legs, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
  "source": {
   "src": "media/img/bear_stand/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "bear_move_stand",
    "task": "move",
    "label": "to ② + standing",
    "target_prompt": "A black bear with glossy black fur, a tan muzzle and round ears, standing up on its hind legs facing the camera, its front paws hanging in front of its chest, on a green lawn dotted with small white clover flowers, with large gray boulders and dark evergreen trees behind it and a brown wooden shingle wall at the right edge.",
    "out": "media/img/bear_stand/bear_move_stand.webp",
    "baselines": [
     {
      "name": "RF-Solver-Edit",
      "out": "media/img/bear_stand/bear_move_stand__rfsolver.webp"
     },
     {
      "name": "FireFlow",
      "out": "media/img/bear_stand/bear_move_stand__fireflow.webp"
     },
     {
      "name": "FlowEdit",
      "out": "media/img/bear_stand/bear_move_stand__flowedit.webp"
     },
     {
      "name": "Sync-SDE",
      "out": "media/img/bear_stand/bear_move_stand__syncsde.webp"
     }
    ],
    "marks": [
     {
      "x": 0.7656,
      "y": 0.8086,
      "text": "②"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 },
 {
  "id": "rose",
  "modality": "image",
  "title": "Wild rose",
  "source_prompt": "A pale pink wild rose with five petals and orange-yellow stamens on a thin green stem, open almost flat, its petals spread out wide, in front of dark green leaves in soft shade.",
  "source": {
   "src": "media/img/rose/source.webp",
   "w": 512,
   "h": 512
  },
  "items": [
   {
    "id": "rose_move",
    "task": "move",
    "label": "to ①",
    "target_prompt": "A pale pink wild rose with five petals and orange-yellow stamens on a thin green stem, open almost flat, its petals spread out wide, in front of dark green leaves in soft shade.",
    "out": "media/img/rose/rose_move.webp",
    "marks": [
     {
      "x": 0.3125,
      "y": 0.3438,
      "text": "①"
     }
    ],
    "w": 512,
    "h": 512
   }
  ]
 }
];
