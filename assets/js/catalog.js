/* ==========================================================================
   GADGETRY — catalog
   Every product ships as a technical drawing first. Photography comes later;
   the drawing is what we can honestly show for something still in tooling.

   stage: spotted | backed | shipping | stock   (the lifecycle, in order)
   art:   inner markup for a 0 0 200 200 viewBox
   pins:  hover callouts, positioned in % of the drawing plate
   ========================================================================== */

const STAGES = {
  spotted: { label: "Spotted", cls: "chip-spotted" },
  backed: { label: "Backed", cls: "chip-backed" },
  shipping: { label: "Shipping", cls: "chip-shipping" },
  stock: { label: "In stock", cls: "chip-stock" },
};

const CATEGORIES = [
  { id: "crowdfunded", label: "Crowdfunded" },
  { id: "gadgets", label: "Gadgets" },
  { id: "household", label: "Household" },
  { id: "tools", label: "Tools" },
];

const PRODUCTS = [
  {
    id: "orbit-halo-lamp",
    name: "Orbit Halo Lamp",
    tagline: "A weighted arm and a ring of light that dims to candle-low.",
    price: 89,
    category: "crowdfunded",
    stage: "backed",
    ship: "Ships March",
    sku: "GD-0412",
    backers: 4180,
    note:
      "We backed this at prototype and asked for one change: a real detent at the lowest setting, so you can find 5% brightness in the dark without overshooting. The production run has it.",
    specs: [
      ["Output", "40–800 lumens, stepless"],
      ["Colour", "2200K–5000K"],
      ["Arm reach", "480 mm"],
      ["Power", "USB-C, 24 W"],
      ["Base", "1.9 kg cast zinc"],
    ],
    pins: [
      { x: 60, y: 22, label: "Diffuser ring" },
      { x: 46, y: 58, label: "Friction joint" },
      { x: 55, y: 86, label: "1.9 kg base" },
    ],
    art: `
      <ellipse class="ln" cx="100" cy="176" rx="44" ry="10"/>
      <path class="ln" d="M100 172c0-26 -32-30 -32-58"/>
      <path class="ln" d="M68 114c0-22 14-34 30-40"/>
      <circle class="ln" cx="68" cy="118" r="6"/>
      <circle class="ln ln-blue" cx="116" cy="62" r="42"/>
      <circle class="ln ln-blue" cx="116" cy="62" r="33"/>
      <path class="ln-thin ln" d="M116 29v-6M149 62h6M116 95v6M83 62h-6"/>
      <path class="ln ln-thin" d="M88 176h24"/>`,
  },
  {
    id: "tessera-split-keyboard",
    name: "Tessera Split Keyboard",
    tagline: "Two halves, magnetic feet, and every key remappable on-device.",
    price: 164,
    compareAt: 189,
    category: "crowdfunded",
    stage: "shipping",
    ship: "Ships in 3 days",
    sku: "GD-0088",
    backers: 9640,
    note:
      "Remapping happens on the board itself, not in an app you have to keep installed. Plug it into a borrowed machine and your layout comes with it.",
    specs: [
      ["Layout", "36 keys per half"],
      ["Switches", "Hot-swap, 5-pin"],
      ["Connection", "USB-C or 2.4 GHz"],
      ["Battery", "70 h per half"],
      ["Tilt", "0–30°, magnetic feet"],
    ],
    pins: [
      { x: 62, y: 30, label: "Hot-swap sockets" },
      { x: 56, y: 72, label: "Magnetic tenting foot" },
    ],
    art: `
      <g transform="rotate(-9 62 88)">
        <rect class="ln" x="18" y="62" width="72" height="56" rx="6"/>
        <g class="ln ln-thin">
          <rect x="26" y="70" width="13" height="12" rx="2"/><rect x="42" y="70" width="13" height="12" rx="2"/>
          <rect x="58" y="70" width="13" height="12" rx="2"/><rect x="74" y="70" width="9" height="12" rx="2"/>
          <rect x="26" y="86" width="13" height="12" rx="2"/><rect x="42" y="86" width="13" height="12" rx="2"/>
          <rect x="58" y="86" width="13" height="12" rx="2"/><rect x="74" y="86" width="9" height="12" rx="2"/>
          <rect x="34" y="102" width="13" height="12" rx="2"/><rect x="50" y="102" width="13" height="12" rx="2"/>
        </g>
      </g>
      <g transform="rotate(9 138 88)">
        <rect class="ln" x="110" y="62" width="72" height="56" rx="6"/>
        <g class="ln ln-thin">
          <rect x="117" y="70" width="9" height="12" rx="2"/><rect x="129" y="70" width="13" height="12" rx="2"/>
          <rect x="145" y="70" width="13" height="12" rx="2"/><rect x="161" y="70" width="13" height="12" rx="2"/>
          <rect x="117" y="86" width="9" height="12" rx="2"/><rect x="129" y="86" width="13" height="12" rx="2"/>
          <rect x="145" y="86" width="13" height="12" rx="2"/><rect x="161" y="86" width="13" height="12" rx="2"/>
          <rect x="137" y="102" width="13" height="12" rx="2"/><rect x="153" y="102" width="13" height="12" rx="2"/>
        </g>
      </g>
      <path class="ln ln-blue ln-thin" d="M92 96c6 6 10 6 16 0"/>
      <path class="ln ln-blue" d="M60 132c0 8-8 10-14 14M140 132c0 8 8 10 14 14"/>`,
  },
  {
    id: "kelvin-smart-mug",
    name: "Kelvin Smart Mug",
    tagline: "Holds your coffee at the temperature you actually like it.",
    price: 79,
    category: "crowdfunded",
    stage: "spotted",
    ship: "Campaign opens Sept",
    sku: "GD-0501",
    backers: 0,
    note:
      "Not funded yet — we are watching this one. Add your email and we will tell you the day the campaign opens, not a week later.",
    specs: [
      ["Range", "50–65 °C hold"],
      ["Capacity", "295 ml"],
      ["Battery", "90 min off-charger"],
      ["Charger", "Coaster, USB-C"],
      ["Body", "Stainless, ceramic-lined"],
    ],
    pins: [
      { x: 58, y: 26, label: "Ceramic lining" },
      { x: 52, y: 62, label: "Temp readout" },
    ],
    art: `
      <path class="ln" d="M62 52h74v82a16 16 0 0 1-16 16H78a16 16 0 0 1-16-16z"/>
      <ellipse class="ln" cx="99" cy="52" rx="37" ry="10"/>
      <path class="ln" d="M136 72h14a18 18 0 0 1 0 36h-14"/>
      <rect class="ln ln-blue" x="80" y="88" width="38" height="18" rx="3"/>
      <path class="ln ln-blue ln-thin" d="M88 97h6M99 92v10M108 97h4"/>
      <rect class="ln" x="66" y="158" width="66" height="8" rx="4"/>
      <path class="ln ln-thin" d="M84 36c0-6 6-6 6-12M104 36c0-6 6-6 6-12"/>`,
  },
  {
    id: "driftwave-buds",
    name: "Driftwave Open Buds",
    tagline: "Bone-conduction that leaves your ears open to the street.",
    price: 132,
    category: "crowdfunded",
    stage: "backed",
    ship: "Ships April",
    sku: "GD-0233",
    backers: 12400,
    note:
      "Built for running with traffic around you. We tested them at 30 km/h on a bike and could still hear a car close from behind.",
    specs: [
      ["Type", "Bone conduction, open ear"],
      ["Battery", "9 h, 32 h with case"],
      ["Weight", "26 g the pair"],
      ["Rating", "IP67"],
      ["Codec", "SBC / AAC / LC3"],
    ],
    pins: [
      { x: 63, y: 30, label: "Transducer pad" },
      { x: 48, y: 74, label: "Titanium band" },
    ],
    art: `
      <path class="ln" d="M46 92a54 40 0 0 1 108 0"/>
      <path class="ln" d="M46 92v26a10 10 0 0 0 10 10h6a10 10 0 0 0 10-10V96"/>
      <path class="ln" d="M154 92v26a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10V96"/>
      <rect class="ln ln-blue" x="52" y="106" width="18" height="14" rx="4"/>
      <rect class="ln ln-blue" x="130" y="106" width="18" height="14" rx="4"/>
      <path class="ln ln-thin" d="M78 68c8-8 18-12 22-12M122 68c-8-8-18-12-22-12"/>
      <path class="ln ln-thin ln-hot" d="M40 138c-6 4-10 8-12 14M160 138c6 4 10 8 12 14"/>
      <rect class="ln ln-thin" x="70" y="150" width="60" height="26" rx="10"/>`,
  },

  {
    id: "nomad-140w-brick",
    name: "Nomad 140 W Brick",
    tagline: "Charges a laptop and two phones from one outlet, cold.",
    price: 69,
    category: "gadgets",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0007",
    note:
      "GaN internals mean it stays cool enough to hold after an hour at full draw. The prongs fold, which sounds minor until you pack it.",
    specs: [
      ["Total output", "140 W"],
      ["Ports", "2× USB-C, 1× USB-A"],
      ["Standard", "PD 3.1 / PPS"],
      ["Size", "68 × 58 × 32 mm"],
      ["Prongs", "Folding"],
    ],
    pins: [
      { x: 60, y: 34, label: "Folding prongs" },
      { x: 55, y: 74, label: "2× USB-C PD" },
    ],
    art: `
      <rect class="ln" x="46" y="52" width="108" height="98" rx="14"/>
      <path class="ln" d="M78 52V34h10v18M112 52V34h10v18"/>
      <rect class="ln ln-blue" x="66" y="118" width="24" height="9" rx="4.5"/>
      <rect class="ln ln-blue" x="98" y="118" width="24" height="9" rx="4.5"/>
      <rect class="ln" x="128" y="117" width="12" height="11" rx="2"/>
      <path class="ln ln-thin" d="M66 76h68M66 90h44"/>
      <circle class="fl" cx="140" cy="82" r="3"/>`,
  },
  {
    id: "slate-eink-pad",
    name: "Slate E-Ink Pad",
    tagline: "A notebook that syncs. No feed, no notifications, no glow.",
    price: 249,
    compareAt: 279,
    category: "gadgets",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0019",
    note:
      "There is no browser and no app store on it, which is the point. It writes, it reads, and it hands the file to your computer when you plug it in.",
    specs: [
      ["Screen", '10.3" e-paper, 227 ppi'],
      ["Pen", "4096 levels, no battery"],
      ["Storage", "32 GB"],
      ["Battery", "3 weeks typical"],
      ["Export", "PDF, PNG, plain text"],
    ],
    pins: [
      { x: 58, y: 28, label: "227 ppi e-paper" },
      { x: 68, y: 78, label: "Battery-free pen" },
    ],
    art: `
      <rect class="ln" x="42" y="30" width="102" height="140" rx="8"/>
      <rect class="ln ln-thin" x="54" y="42" width="78" height="112" rx="2"/>
      <path class="ln ln-thin ln-blue" d="M64 68h44M64 82h58M64 96h34M64 110h50"/>
      <path class="ln ln-blue" d="M152 44l14 14-52 52-18 4 4-18z"/>
      <path class="ln ln-thin" d="M96 96l18 18"/>
      <path class="ln ln-thin" d="M42 160h102"/>`,
  },
  {
    id: "perch-magnetic-stand",
    name: "Perch Magnetic Stand",
    tagline: "Folds to the thickness of two coins and holds at any angle.",
    price: 39,
    category: "gadgets",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0044",
    note:
      "The hinge is the whole product. It is a machined friction joint rather than a spring, so it stops where you put it and stays there.",
    specs: [
      ["Folded", "5.8 mm"],
      ["Angle", "15–70°, stepless"],
      ["Magnet", "MagSafe compatible"],
      ["Load", "1.2 kg"],
      ["Body", "Anodised aluminium"],
    ],
    pins: [
      { x: 62, y: 40, label: "Friction hinge" },
      { x: 48, y: 80, label: "N52 magnet array" },
    ],
    art: `
      <path class="ln" d="M44 156h112"/>
      <path class="ln" d="M58 156l46-84"/>
      <path class="ln" d="M104 72l30 54"/>
      <path class="ln" d="M134 126l-16 30"/>
      <circle class="ln ln-blue" cx="104" cy="72" r="7"/>
      <circle class="ln ln-blue" cx="134" cy="126" r="5"/>
      <path class="ln ln-thin ln-blue" d="M86 104a16 16 0 0 0 16 16"/>
      <path class="ln ln-thin" d="M64 156l40-72"/>`,
  },
  {
    id: "loop-tracker-tags",
    name: "Loop Tracker Tags",
    tagline: "Four tags, one year of battery, and a ring hole that fits a key.",
    price: 54,
    category: "gadgets",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0061",
    note:
      "Most tags make you buy a separate holder because they forgot the hole. These have one moulded into the shell.",
    specs: [
      ["Pack", "4 tags"],
      ["Battery", "CR2032, ~12 months"],
      ["Range", "60 m line of sight"],
      ["Speaker", "88 dB"],
      ["Rating", "IP67"],
    ],
    pins: [
      { x: 66, y: 32, label: "Moulded key hole" },
      { x: 44, y: 70, label: "User-swappable cell" },
    ],
    art: `
      <circle class="ln" cx="70" cy="70" r="30"/><circle class="ln ln-thin" cx="70" cy="52" r="4"/>
      <circle class="ln" cx="132" cy="70" r="30"/><circle class="ln ln-thin" cx="132" cy="52" r="4"/>
      <circle class="ln" cx="70" cy="134" r="30"/><circle class="ln ln-thin" cx="70" cy="116" r="4"/>
      <circle class="ln ln-blue" cx="132" cy="134" r="30"/>
      <circle class="ln ln-blue ln-thin" cx="132" cy="134" r="14"/>
      <circle class="ln ln-thin" cx="132" cy="116" r="4"/>
      <path class="ln-thin ln ln-blue" d="M158 118a26 26 0 0 1 0 32"/>`,
  },

  {
    id: "ember-induction-hob",
    name: "Ember Portable Hob",
    tagline: "A second burner that lives in a drawer until you need it.",
    price: 149,
    category: "household",
    stage: "shipping",
    ship: "Ships in 3 days",
    sku: "GD-0121",
    note:
      "Holds a set temperature instead of cycling on and off, so a simmer stays a simmer. It also draws 1800 W, so give it its own outlet.",
    specs: [
      ["Power", "1800 W"],
      ["Range", "60–260 °C"],
      ["Control", "Dial, 20 steps"],
      ["Pan size", "12–26 cm"],
      ["Thickness", "52 mm"],
    ],
    pins: [
      { x: 55, y: 34, label: "Induction coil" },
      { x: 68, y: 74, label: "Detent dial" },
    ],
    art: `
      <rect class="ln" x="26" y="60" width="148" height="82" rx="10"/>
      <circle class="ln ln-blue" cx="86" cy="96" r="34"/>
      <circle class="ln ln-blue ln-thin" cx="86" cy="96" r="24"/>
      <circle class="ln ln-blue ln-thin" cx="86" cy="96" r="14"/>
      <circle class="ln" cx="146" cy="96" r="14"/>
      <path class="ln ln-hot" d="M146 88v-6"/>
      <path class="ln ln-thin" d="M26 130h148"/>
      <path class="ln ln-thin" d="M40 142v8M160 142v8"/>`,
  },
  {
    id: "rinse-produce-washer",
    name: "Rinse Produce Washer",
    tagline: "Drop it in the bowl and it shakes the grit off your greens.",
    price: 84,
    category: "household",
    stage: "backed",
    ship: "Ships May",
    sku: "GD-0177",
    backers: 2870,
    note:
      "It will not sterilise anything and does not claim to. What it does is get sand out of leeks and spinach without you standing at the sink.",
    specs: [
      ["Cycle", "8 min default"],
      ["Battery", "20 cycles per charge"],
      ["Charging", "USB-C, 2 h"],
      ["Diameter", "78 mm"],
      ["Rating", "IPX8, fully submersible"],
    ],
    pins: [
      { x: 60, y: 30, label: "Submersible seal" },
      { x: 42, y: 72, label: "Ultrasonic plate" },
    ],
    art: `
      <path class="ln" d="M34 92h132l-14 66a12 12 0 0 1-12 10H60a12 12 0 0 1-12-10z"/>
      <path class="ln ln-thin" d="M34 92h132"/>
      <ellipse class="ln ln-blue" cx="100" cy="132" rx="24" ry="10"/>
      <path class="ln ln-blue" d="M76 132v10a24 10 0 0 0 48 0v-10"/>
      <path class="ln ln-thin ln-blue" d="M62 116a44 44 0 0 0 0 24M138 116a44 44 0 0 1 0 24"/>
      <path class="ln ln-thin ln-blue" d="M50 108a58 58 0 0 0 0 40M150 108a58 58 0 0 1 0 40"/>
      <path class="ln ln-thin" d="M84 68c0 8 8 8 8 16M108 62c0 8 8 8 8 16"/>`,
  },
  {
    id: "quiet-hour-scrubber",
    name: "Quiet Hour Air Scrubber",
    tagline: "Runs at 19 dB, which is quieter than the room it is cleaning.",
    price: 199,
    category: "household",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0090",
    note:
      "Filters are a flat yearly cost printed on the box, not a subscription that changes price. You can also buy them from anyone who makes the size.",
    specs: [
      ["Coverage", "56 m²"],
      ["Filter", "H13 HEPA + carbon"],
      ["Noise", "19–48 dB"],
      ["Draw", "6–38 W"],
      ["Filter cost", "$44 / year"],
    ],
    pins: [
      { x: 63, y: 26, label: "Top outlet" },
      { x: 42, y: 68, label: "H13 + carbon stack" },
    ],
    art: `
      <path class="ln" d="M62 46h76v116a10 10 0 0 1-10 10H72a10 10 0 0 1-10-10z"/>
      <ellipse class="ln" cx="100" cy="46" rx="38" ry="9"/>
      <ellipse class="ln ln-blue" cx="100" cy="46" rx="22" ry="5"/>
      <g class="ln ln-thin">
        <path d="M70 84h60M70 94h60M70 104h60M70 114h60M70 124h60"/>
      </g>
      <rect class="ln ln-blue" x="82" y="140" width="36" height="14" rx="3"/>
      <path class="ln ln-thin ln-blue" d="M88 30c0-8 12-8 12-16M112 30c0-8 12-8 12-16"/>`,
  },
  {
    id: "fold-dish-rack",
    name: "Fold Dish Rack",
    tagline: "Rolls out over the sink, rolls up into a drawer.",
    price: 46,
    category: "household",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0033",
    note:
      "Silicone-wrapped stainless, so it does not scratch the counter and does not rust where the water sits. It drains into the sink instead of a tray you have to empty.",
    specs: [
      ["Rolled", "620 × 320 mm"],
      ["Load", "12 kg"],
      ["Material", "304 stainless, silicone"],
      ["Dishwasher", "Top rack safe"],
      ["Colours", "Slate, sand, cobalt"],
    ],
    pins: [
      { x: 58, y: 36, label: "Silicone sleeve" },
      { x: 66, y: 76, label: "Rolls to 40 mm" },
    ],
    art: `
      <path class="ln" d="M28 76h108a30 30 0 0 1 0 60H28z"/>
      <g class="ln ln-thin">
        <path d="M44 76v60M58 76v60M72 76v60M86 76v60M100 76v60M114 76v60M128 76v60"/>
      </g>
      <path class="ln ln-blue" d="M136 76a30 30 0 0 1 0 60"/>
      <path class="ln ln-blue ln-thin" d="M138 90a16 16 0 0 1 0 32"/>
      <path class="ln" d="M28 68v76"/>
      <path class="ln ln-thin" d="M52 150v10M92 150v10M132 150v10"/>`,
  },

  {
    id: "torq-bit-driver",
    name: "Torq Ratcheting Driver",
    tagline: "Twelve bits in the handle and a ratchet that works in tight corners.",
    price: 58,
    category: "tools",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0202",
    note:
      "Five degrees of swing arc, which is what lets it work inside a cabinet. The bits live in the handle so you stop losing them.",
    specs: [
      ["Arc", "5° per click"],
      ["Bits", "12, S2 steel"],
      ["Drive", "1/4\" hex"],
      ["Torque", "12 N·m rated"],
      ["Handle", "Glass-filled nylon"],
    ],
    pins: [
      { x: 62, y: 32, label: "5° ratchet head" },
      { x: 44, y: 74, label: "12-bit magazine" },
    ],
    art: `
      <path class="ln" d="M74 44h52v78a26 26 0 0 1-26 26 26 26 0 0 1-26-26z"/>
      <rect class="ln ln-blue" x="86" y="24" width="28" height="22" rx="4"/>
      <path class="ln ln-blue" d="M100 24V10"/>
      <path class="ln ln-thin" d="M74 62h52M74 78h52M74 94h52"/>
      <circle class="ln ln-thin" cx="100" cy="122" r="12"/>
      <path class="ln ln-thin ln-blue" d="M100 114v16M92 122h16"/>
      <path class="ln ln-thin" d="M138 60a30 30 0 0 1 0 40"/>
      <path class="ln ln-thin ln-hot" d="M144 74l8-6 -2 10 8-4"/>`,
  },
  {
    id: "plumb-laser-level",
    name: "Plumb Cross Laser",
    tagline: "Throws a level line across the wall so you stop guessing.",
    price: 112,
    category: "tools",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0148",
    note:
      "Self-levels within four degrees, so a slightly crooked shelf to sit it on is fine. The magnet mount grips a stud plate or a bracket.",
    specs: [
      ["Lines", "Horizontal + vertical"],
      ["Accuracy", "±0.3 mm / m"],
      ["Range", "15 m, 30 m with card"],
      ["Self-level", "±4°"],
      ["Mount", "1/4\"-20 and magnet"],
    ],
    pins: [
      { x: 60, y: 30, label: "Cross-beam window" },
      { x: 48, y: 76, label: "Self-levelling pendulum" },
    ],
    art: `
      <rect class="ln" x="58" y="58" width="84" height="76" rx="8"/>
      <rect class="ln ln-thin" x="70" y="70" width="60" height="34" rx="4"/>
      <path class="ln ln-hot" d="M100 70v34M70 87h60"/>
      <path class="ln ln-hot ln-thin" d="M100 58V22M100 134v14M142 87h34M58 87H24"/>
      <circle class="ln ln-blue" cx="100" cy="120" r="8"/>
      <path class="ln ln-thin" d="M76 148v10h48v-10"/>
      <path class="ln ln-thin" d="M92 158h16v8H92z"/>`,
  },
  {
    id: "grip-wrench-set",
    name: "Grip Adjustable Set",
    tagline: "Three jaws that hold metric and imperial without slipping.",
    price: 74,
    category: "tools",
    stage: "shipping",
    ship: "Ships in 3 days",
    sku: "GD-0166",
    note:
      "The jaws are ground flat and parallel, which is why they do not round off a bolt head the way a loose adjustable does.",
    specs: [
      ["Sizes", "6\", 8\", 10\""],
      ["Jaw capacity", "to 34 mm"],
      ["Finish", "Phosphate, non-slip"],
      ["Steel", "Chrome vanadium"],
      ["Scale", "mm and inch, laser-etched"],
    ],
    pins: [
      { x: 66, y: 28, label: "Parallel ground jaw" },
      { x: 46, y: 72, label: "Etched dual scale" },
    ],
    art: `
      <path class="ln" d="M62 30h30v18h26v20H80a18 18 0 0 1-18-18z"/>
      <path class="ln" d="M80 68h24v92a12 12 0 0 1-24 0z"/>
      <path class="ln ln-blue" d="M104 76h14v26h-14"/>
      <path class="ln ln-blue ln-thin" d="M108 82v14"/>
      <g class="ln ln-thin">
        <path d="M80 92h8M80 102h12M80 112h8M80 122h12M80 132h8"/>
      </g>
      <path class="ln ln-thin" d="M124 40a34 34 0 0 1 0 26"/>
      <path class="ln ln-thin" d="M136 118a16 16 0 0 1 0 30"/>`,
  },
  {
    id: "micron-precision-kit",
    name: "Micron Precision Kit",
    tagline: "Forty-eight bits for the screws nothing else in the house fits.",
    price: 42,
    category: "tools",
    stage: "stock",
    ship: "Ships today",
    sku: "GD-0210",
    note:
      "Pentalobe, tri-point, and the security Torx sizes are in here, which covers most phones, consoles and laptops made in the last decade.",
    specs: [
      ["Bits", "48, CRV steel"],
      ["Driver", "Rotating cap, magnetic"],
      ["Includes", "Pry tools, tweezers, pick"],
      ["Case", "Magnetic-hinged, tray"],
      ["Sizes", "Pentalobe, tri-point, T-security"],
    ],
    pins: [
      { x: 64, y: 30, label: "Rotating cap" },
      { x: 42, y: 76, label: "48-bit tray" },
    ],
    art: `
      <rect class="ln" x="24" y="86" width="152" height="66" rx="6"/>
      <g class="ln ln-thin">
        <path d="M24 104h152M24 122h152M24 140h152"/>
        <path d="M50 86v66M76 86v66M102 86v66M128 86v66M154 86v66"/>
      </g>
      <path class="ln ln-blue" d="M46 62h94"/>
      <rect class="ln ln-blue" x="46" y="52" width="72" height="20" rx="10"/>
      <circle class="ln ln-blue ln-thin" cx="58" cy="62" r="5"/>
      <path class="ln" d="M140 58h22l6 4-6 4h-22z"/>
      <path class="ln ln-thin" d="M24 160h152"/>`,
  },
];
