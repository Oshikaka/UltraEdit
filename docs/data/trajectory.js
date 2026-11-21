window.UE = window.UE || {}; window.UE.traj = [
 {
  "id": "eagle",
  "title": "Eagle spreads its wings",
  "task": "pose",
  "label": "wings spread",
  "source_prompt": "A bald eagle with a white head, a yellow beak and dark brown body feathers, with its wings folded, perched on a snow-covered rock ledge in a misty snowy pine forest.",
  "target_prompt": "A bald eagle with a white head, a yellow beak and dark brown body feathers, with its wings open and spread out away from its body, perched on a snow-covered rock ledge in a misty snowy pine forest.",
  "src": "media/traj/eagle/src.jpg",
  "out": "media/traj/eagle/out.jpg",
  "t_r": 0.7,
  "t0": 0.92,
  "nfe": 38,
  "notes": {
   "x0": "target clean estimate of the step",
   "mu": "editing region used by the step"
  },
  "steps": [
   {
    "t": 1.0,
    "t_next": 0.9657,
    "x0": "media/traj/eagle/s00_x0.jpg",
    "mu": "media/traj/eagle/s00_mu.png",
    "phase": "layout",
    "mu_frac": 0.352
   },
   {
    "t": 0.9657,
    "t_next": 0.9293,
    "x0": "media/traj/eagle/s01_x0.jpg",
    "mu": "media/traj/eagle/s01_mu.png",
    "phase": "expand",
    "mu_frac": 0.413
   },
   {
    "t": 0.9293,
    "t_next": 0.8905,
    "x0": "media/traj/eagle/s02_x0.jpg",
    "mu": "media/traj/eagle/s02_mu.png",
    "phase": "expand",
    "mu_frac": 0.461
   },
   {
    "t": 0.8905,
    "t_next": 0.8492,
    "x0": "media/traj/eagle/s03_x0.jpg",
    "mu": "media/traj/eagle/s03_mu.png",
    "phase": "expand",
    "mu_frac": 0.514
   },
   {
    "t": 0.8492,
    "t_next": 0.8051,
    "x0": "media/traj/eagle/s04_x0.jpg",
    "mu": "media/traj/eagle/s04_mu.png",
    "phase": "expand",
    "mu_frac": 0.55
   },
   {
    "t": 0.8051,
    "t_next": 0.7578,
    "x0": "media/traj/eagle/s05_x0.jpg",
    "mu": "media/traj/eagle/s05_mu.png",
    "phase": "expand",
    "mu_frac": 0.602
   },
   {
    "t": 0.7578,
    "t_next": 0.7071,
    "x0": "media/traj/eagle/s06_x0.jpg",
    "mu": "media/traj/eagle/s06_mu.png",
    "phase": "expand",
    "mu_frac": 0.637
   },
   {
    "t": 0.7071,
    "t_next": 0.6525,
    "x0": "media/traj/eagle/s07_x0.jpg",
    "mu": "media/traj/eagle/s07_mu.png",
    "phase": "expand",
    "mu_frac": 0.664
   },
   {
    "t": 0.6525,
    "t_next": 0.5936,
    "x0": "media/traj/eagle/s08_x0.jpg",
    "mu": "media/traj/eagle/s08_mu.png",
    "phase": "anchor",
    "mu_frac": 0.664
   },
   {
    "t": 0.5936,
    "t_next": 0.5298,
    "x0": "media/traj/eagle/s09_x0.jpg",
    "mu": "media/traj/eagle/s09_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   },
   {
    "t": 0.5298,
    "t_next": 0.4605,
    "x0": "media/traj/eagle/s10_x0.jpg",
    "mu": "media/traj/eagle/s10_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   },
   {
    "t": 0.4605,
    "t_next": 0.3849,
    "x0": "media/traj/eagle/s11_x0.jpg",
    "mu": "media/traj/eagle/s11_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   },
   {
    "t": 0.3849,
    "t_next": 0.3023,
    "x0": "media/traj/eagle/s12_x0.jpg",
    "mu": "media/traj/eagle/s12_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   },
   {
    "t": 0.3023,
    "t_next": 0.2115,
    "x0": "media/traj/eagle/s13_x0.jpg",
    "mu": "media/traj/eagle/s13_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   },
   {
    "t": 0.2115,
    "t_next": 0.1112,
    "x0": "media/traj/eagle/s14_x0.jpg",
    "mu": "media/traj/eagle/s14_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   },
   {
    "t": 0.1112,
    "t_next": 0.0,
    "x0": "media/traj/eagle/s15_x0.jpg",
    "mu": "media/traj/eagle/s15_mu.png",
    "phase": "detail",
    "mu_frac": 0.664
   }
  ],
  "strip": [
   {
    "key": "probes",
    "label": "probes",
    "big": "media/traj/eagle/strip_probes.webp",
    "top": "media/traj/eagle/strip_probes_top.webp",
    "bot": "media/traj/eagle/strip_probes_bot.webp"
   },
   {
    "key": "t100",
    "label": "t = 1.00",
    "big": "media/traj/eagle/strip_t100.webp",
    "top": "media/traj/eagle/strip_t100_top.webp",
    "bot": "media/traj/eagle/strip_t100_bot.webp",
    "t": 1.0,
    "step": 0
   },
   {
    "key": "t089",
    "label": "t = 0.89",
    "big": "media/traj/eagle/strip_t089.webp",
    "top": "media/traj/eagle/strip_t089_top.webp",
    "bot": "media/traj/eagle/strip_t089_bot.webp",
    "t": 0.8905,
    "step": 3
   },
   {
    "key": "t071",
    "label": "t = 0.71",
    "big": "media/traj/eagle/strip_t071.webp",
    "top": "media/traj/eagle/strip_t071_top.webp",
    "bot": "media/traj/eagle/strip_t071_bot.webp",
    "t": 0.7071,
    "step": 7
   },
   {
    "key": "tr",
    "label": "t = 0.65",
    "big": "media/traj/eagle/strip_tr.webp",
    "top": "media/traj/eagle/strip_tr_top.webp",
    "bot": "media/traj/eagle/strip_tr_bot.webp",
    "t": 0.6525,
    "step": 8,
    "tr": true
   },
   {
    "key": "t038",
    "label": "t = 0.38",
    "big": "media/traj/eagle/strip_t038.webp",
    "top": "media/traj/eagle/strip_t038_top.webp",
    "bot": "media/traj/eagle/strip_t038_bot.webp",
    "t": 0.3849,
    "step": 12
   },
   {
    "key": "out",
    "label": "output",
    "label2": "change",
    "big": "media/traj/eagle/strip_out.webp",
    "bot": "media/traj/eagle/strip_change.webp",
    "top": null
   }
  ],
  "legend": {
   "png": "media/traj/eagle/legend.png",
   "attn_min": 0.0,
   "attn_max": 0.22,
   "attn_cmap": "jet",
   "d_cmap": "inferno",
   "d_max_q": 0.99,
   "d_max_value": 7.284,
   "change_max_value": 161.0,
   "small_tiles": "x\u0302^tar (top), |D| (bottom)"
  }
 },
 {
  "id": "necklace",
  "title": "Coral necklace turns to jade",
  "task": "material",
  "label": "jade necklace",
  "source_prompt": "A woman in her twenties with chin-length wavy copper hair, wearing a necklace of small red coral pieces and a pale yellow sleeveless top, looking at the camera with a serious closed-mouth expression, against a plain light gray background.",
  "target_prompt": "A woman in her twenties with chin-length wavy copper hair, wearing a necklace of small green jade pieces and a pale yellow sleeveless top, looking at the camera with a serious closed-mouth expression, against a plain light gray background.",
  "src": "media/traj/necklace/src.jpg",
  "out": "media/traj/necklace/out.jpg",
  "t_r": 0.7,
  "t0": 0.92,
  "nfe": 38,
  "notes": {
   "x0": "target clean estimate of the step",
   "mu": "editing region used by the step"
  },
  "steps": [
   {
    "t": 1.0,
    "t_next": 0.9657,
    "x0": "media/traj/necklace/s00_x0.jpg",
    "mu": "media/traj/necklace/s00_mu.png",
    "phase": "layout",
    "mu_frac": 0.116
   },
   {
    "t": 0.9657,
    "t_next": 0.9293,
    "x0": "media/traj/necklace/s01_x0.jpg",
    "mu": "media/traj/necklace/s01_mu.png",
    "phase": "expand",
    "mu_frac": 0.142
   },
   {
    "t": 0.9293,
    "t_next": 0.8905,
    "x0": "media/traj/necklace/s02_x0.jpg",
    "mu": "media/traj/necklace/s02_mu.png",
    "phase": "layout",
    "mu_frac": 0.142
   },
   {
    "t": 0.8905,
    "t_next": 0.8492,
    "x0": "media/traj/necklace/s03_x0.jpg",
    "mu": "media/traj/necklace/s03_mu.png",
    "phase": "layout",
    "mu_frac": 0.142
   },
   {
    "t": 0.8492,
    "t_next": 0.8051,
    "x0": "media/traj/necklace/s04_x0.jpg",
    "mu": "media/traj/necklace/s04_mu.png",
    "phase": "expand",
    "mu_frac": 0.144
   },
   {
    "t": 0.8051,
    "t_next": 0.7578,
    "x0": "media/traj/necklace/s05_x0.jpg",
    "mu": "media/traj/necklace/s05_mu.png",
    "phase": "layout",
    "mu_frac": 0.144
   },
   {
    "t": 0.7578,
    "t_next": 0.7071,
    "x0": "media/traj/necklace/s06_x0.jpg",
    "mu": "media/traj/necklace/s06_mu.png",
    "phase": "layout",
    "mu_frac": 0.144
   },
   {
    "t": 0.7071,
    "t_next": 0.6525,
    "x0": "media/traj/necklace/s07_x0.jpg",
    "mu": "media/traj/necklace/s07_mu.png",
    "phase": "layout",
    "mu_frac": 0.144
   },
   {
    "t": 0.6525,
    "t_next": 0.5936,
    "x0": "media/traj/necklace/s08_x0.jpg",
    "mu": "media/traj/necklace/s08_mu.png",
    "phase": "anchor",
    "mu_frac": 0.144
   },
   {
    "t": 0.5936,
    "t_next": 0.5298,
    "x0": "media/traj/necklace/s09_x0.jpg",
    "mu": "media/traj/necklace/s09_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   },
   {
    "t": 0.5298,
    "t_next": 0.4605,
    "x0": "media/traj/necklace/s10_x0.jpg",
    "mu": "media/traj/necklace/s10_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   },
   {
    "t": 0.4605,
    "t_next": 0.3849,
    "x0": "media/traj/necklace/s11_x0.jpg",
    "mu": "media/traj/necklace/s11_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   },
   {
    "t": 0.3849,
    "t_next": 0.3023,
    "x0": "media/traj/necklace/s12_x0.jpg",
    "mu": "media/traj/necklace/s12_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   },
   {
    "t": 0.3023,
    "t_next": 0.2115,
    "x0": "media/traj/necklace/s13_x0.jpg",
    "mu": "media/traj/necklace/s13_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   },
   {
    "t": 0.2115,
    "t_next": 0.1112,
    "x0": "media/traj/necklace/s14_x0.jpg",
    "mu": "media/traj/necklace/s14_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   },
   {
    "t": 0.1112,
    "t_next": 0.0,
    "x0": "media/traj/necklace/s15_x0.jpg",
    "mu": "media/traj/necklace/s15_mu.png",
    "phase": "detail",
    "mu_frac": 0.144
   }
  ],
  "strip": [
   {
    "key": "probes",
    "label": "probes",
    "big": "media/traj/necklace/strip_probes.webp",
    "top": "media/traj/necklace/strip_probes_top.webp",
    "bot": "media/traj/necklace/strip_probes_bot.webp"
   },
   {
    "key": "t100",
    "label": "t = 1.00",
    "big": "media/traj/necklace/strip_t100.webp",
    "top": "media/traj/necklace/strip_t100_top.webp",
    "bot": "media/traj/necklace/strip_t100_bot.webp",
    "t": 1.0,
    "step": 0
   },
   {
    "key": "t089",
    "label": "t = 0.89",
    "big": "media/traj/necklace/strip_t089.webp",
    "top": "media/traj/necklace/strip_t089_top.webp",
    "bot": "media/traj/necklace/strip_t089_bot.webp",
    "t": 0.8905,
    "step": 3
   },
   {
    "key": "t071",
    "label": "t = 0.71",
    "big": "media/traj/necklace/strip_t071.webp",
    "top": "media/traj/necklace/strip_t071_top.webp",
    "bot": "media/traj/necklace/strip_t071_bot.webp",
    "t": 0.7071,
    "step": 7
   },
   {
    "key": "tr",
    "label": "t = 0.65",
    "big": "media/traj/necklace/strip_tr.webp",
    "top": "media/traj/necklace/strip_tr_top.webp",
    "bot": "media/traj/necklace/strip_tr_bot.webp",
    "t": 0.6525,
    "step": 8,
    "tr": true
   },
   {
    "key": "t038",
    "label": "t = 0.38",
    "big": "media/traj/necklace/strip_t038.webp",
    "top": "media/traj/necklace/strip_t038_top.webp",
    "bot": "media/traj/necklace/strip_t038_bot.webp",
    "t": 0.3849,
    "step": 12
   },
   {
    "key": "out",
    "label": "output",
    "label2": "change",
    "big": "media/traj/necklace/strip_out.webp",
    "bot": "media/traj/necklace/strip_change.webp",
    "top": null
   }
  ],
  "legend": {
   "png": "media/traj/necklace/legend.png",
   "attn_min": 0.0,
   "attn_max": 0.22,
   "attn_cmap": "jet",
   "d_cmap": "inferno",
   "d_max_q": 0.99,
   "d_max_value": 6.634,
   "change_max_value": 112.3,
   "small_tiles": "x\u0302^tar (top), |D| (bottom)"
  }
 }
];
